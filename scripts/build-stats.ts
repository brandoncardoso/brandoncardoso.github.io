import { readFile, writeFile, mkdir } from "node:fs/promises"
import { parse as parseToml } from "smol-toml"

const DATA_DIR = "data/movie-night/"
const OUT_DIR = "content/data/generated"

interface Person { id: string; name: string }
interface Movie { id: string; title: string; year: number; url?: string }
interface MovieNight {
  id: number
  date: string
  theme: string
  theme_picker?: string
  movie: string
}
interface Suggestion {
  movie_night: number
  suggester: string
  movie: string
  votes?: number
}

const loadToml = async <T>(file: string, key: string): Promise<T[]> => {
  const raw = await readFile(`${DATA_DIR}/${file}`, "utf-8")
  return (parseToml(raw)[key] as T[]) ?? []
}

const indexBy = <T, K extends string | number>(
  rows: T[],
  keyFn: (r: T) => K
): Map<K, T> => new Map(rows.map((r) => [keyFn(r), r]))

const writeJson = async (name: string, data: unknown): Promise<void> => {
  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(`${OUT_DIR}/${name}.json`, JSON.stringify(data, null, 2))
  console.log(`  ✓ ${OUT_DIR}/${name}.json`)
}

const main = async (): Promise<void> => {
  console.log("→ Loading data...")
  const people = await loadToml<Person>("person.toml", "person")
  const movies = await loadToml<Movie>("movie.toml", "movie")
  const nights = await loadToml<MovieNight>("movie_night.toml", "movie_night")
  const suggestions = await loadToml<Suggestion>("suggestion.toml", "suggestion")

  // indexes for O(1) lookups during joins
  const peopleById = indexBy(people, (p) => p.id)
  const moviesById = indexBy(movies, (m) => m.id)
  const nightsById = indexBy(nights, (n) => n.id)

  console.log("→ Validating...")
  const errors: string[] = []
  for (const n of nights) {
    if (!moviesById.has(n.movie)) errors.push(`night ${n.id}: unknown movie ${n.movie}`)
    if (n.theme_picker && !peopleById.has(n.theme_picker))
      errors.push(`night ${n.id}: unknown picker ${n.theme_picker}`)
  }
  for (const s of suggestions) {
    if (!nightsById.has(s.movie_night)) errors.push(`suggestion: unknown night ${s.movie_night}`)
    if (!peopleById.has(s.suggester)) errors.push(`suggestion: unknown person ${s.suggester}`)
    if (!moviesById.has(s.movie)) errors.push(`suggestion: unknown movie ${s.movie}`)
  }
  if (errors.length) throw new Error("Validation failed:\n  " + errors.join("\n  "))

  console.log("→ Building views...")

  // History: every night with its movie and picker resolved
  const history = nights
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((n) => ({
      id: n.id,
      date: n.date,
      theme: n.theme,
      picker: n.theme_picker ? peopleById.get(n.theme_picker)?.name : null,
      movie: moviesById.get(n.movie)?.title,
      year: moviesById.get(n.movie)?.year,
      url: moviesById.get(n.movie)?.url,
    }))
  await writeJson("history", history)

  // Suggestions log: every suggestion with full context
  const suggestionsLog = suggestions
    .map((s) => {
      const night = nightsById.get(s.movie_night)!
      const movie = moviesById.get(s.movie)!
      return {
        date: night.date,
        theme: night.theme,
        suggester: peopleById.get(s.suggester)?.name,
        movie: movie.title,
        votes: s.votes ?? 0,
        won: night.movie === s.movie,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
  await writeJson("suggestions_log", suggestionsLog)

  // Win rate by suggester
  const bySuggester = new Map<string, { suggested: number; won: number; votes: number }>()
  for (const s of suggestions) {
    const stats = bySuggester.get(s.suggester) ?? { suggested: 0, won: 0, votes: 0 }
    stats.suggested++
    stats.votes += s.votes ?? 0
    if (nightsById.get(s.movie_night)?.movie === s.movie) stats.won++
    bySuggester.set(s.suggester, stats)
  }
  const winRate = [...bySuggester.entries()]
    .map(([id, s]) => ({
      name: peopleById.get(id)?.name ?? id,
      suggested: s.suggested,
      won: s.won,
      win_rate: s.suggested ? Math.round((100 * s.won) / s.suggested) : 0,
      total_votes: s.votes,
    }))
    .sort((a, b) => b.win_rate - a.win_rate)
  await writeJson("win_rate_by_suggester", winRate)

  // Theme picker frequency
  const pickerCounts = new Map<string, number>()
  for (const n of nights) {
    if (!n.theme_picker) continue
    pickerCounts.set(n.theme_picker, (pickerCounts.get(n.theme_picker) ?? 0) + 1)
  }
  const themesByPicker = [...pickerCounts.entries()]
    .map(([id, count]) => ({ name: peopleById.get(id)?.name ?? id, themes_picked: count }))
    .sort((a, b) => b.themes_picked - a.themes_picked)
  await writeJson("themes_by_picker", themesByPicker)


  console.log("→ Computing picker advantage...")
  interface AdvantageRow {
    name: string
    picks: number              // nights they picked the theme
    picks_won: number          // ...and their suggestion won
    picks_win_rate: number     // % of picker-nights they won
    others: number             // nights someone else picked
    others_won: number         // ...and they still won
    others_win_rate: number    // % of non-picker-nights they won
    advantage: number          // picks_win_rate - others_win_rate (percentage points)
  }

  const advantageStats = new Map<string, {
    picks: number; picks_won: number
    others: number; others_won: number
  }>()

  for (const s of suggestions) {
    const night = nightsById.get(s.movie_night)
    if (!night) continue

    const won = night.movie === s.movie
    const wasPicker = night.theme_picker === s.suggester

    const stats = advantageStats.get(s.suggester) ?? {
      picks: 0, picks_won: 0, others: 0, others_won: 0,
    }

    if (wasPicker) {
      stats.picks++
      if (won) stats.picks_won++
    } else {
      stats.others++
      if (won) stats.others_won++
    }

    advantageStats.set(s.suggester, stats)
  }

  const pickerAdvantage: AdvantageRow[] = [...advantageStats.entries()]
    .filter(([_, s]) => s.picks > 0)   // only include people who have picked themes
    .map(([id, s]) => {
      const picksRate = Math.round((100 * s.picks_won) / s.picks)
      const othersRate = s.others > 0 ? Math.round((100 * s.others_won) / s.others) : 0
      return {
        name: peopleById.get(id)?.name ?? id,
        picks: s.picks,
        picks_won: s.picks_won,
        picks_win_rate: picksRate,
        others: s.others,
        others_won: s.others_won,
        others_win_rate: othersRate,
        advantage: picksRate - othersRate,
      }
    })
    .sort((a, b) => b.advantage - a.advantage)

  await writeJson("picker_advantage", pickerAdvantage)

  console.log("✓ Done.")
}

main().catch((err: unknown) => {
  console.error("✗", err instanceof Error ? err.message : err)
  process.exit(1)
})
