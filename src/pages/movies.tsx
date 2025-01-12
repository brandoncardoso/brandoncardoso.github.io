import {
	Anchor,
	Container,
	Table,
	Title,
	Text,
	rem,
	Button,
	TextInput,
	ActionIcon,
	Center,
	Skeleton,
	Group,
} from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

type MovieNightInfo = {
	[key: string]: number | string;
	num: number,
	date: string,
	theme: string,
	themePicker: string,
	movieTitle: string,
	movieYear: number,
	tmdbUrl: string,
}

enum SortDirection {
	ASC = "asc",
	DESC = "desc",
}

type SortConfig = {
	key: keyof MovieNightInfo,
	direction: SortDirection
}

export default function Movies() {
	const { t } = useTranslation()

	const [movies, setMovies] = useState<MovieNightInfo[]>([])
	const [moviesLoading, setMoviesLoading] = useState(true)
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: SortDirection.DESC })
	const [searchText, setSearchText] = useState("")
	const [debouncedSearchText, setDebouncedSearchText] = useState("")

	useEffect(() => {
		const loadMovies = async () => {
			setMoviesLoading(true)
			const res = await fetch('/data/movies.json')
			const data = await res.json()
			setMovies(data as MovieNightInfo[])
			setMoviesLoading(false)
		}

		loadMovies()
	}, [])

	const sortFunction = useMemo(() => {
		if (sortConfig.key && sortConfig.direction) {
			return (a: MovieNightInfo, b: MovieNightInfo) => {
				const valueA = a[sortConfig.key];
				const valueB = b[sortConfig.key];

				// Handle number comparison
				if (typeof valueA === "number" && typeof valueB === "number") {
					if (sortConfig.direction === SortDirection.ASC) {
						return valueA - valueB
					}
					if (sortConfig.direction === SortDirection.DESC) {
						return valueB - valueA
					}
				}

				// Handle string comparison
				if (typeof valueA === "string" && typeof valueB === "string") {
					if (sortConfig.direction === SortDirection.ASC) {
						return valueA.localeCompare(valueB)
					}
					if (sortConfig.direction === SortDirection.DESC) {
						return valueB.localeCompare(valueA)
					}
				}

				return 0
			}
		}
	}, [sortConfig])

	const formatDate = (date: string): string => {
		return dayjs.tz(date, "America/Toronto").format("ddd, DD MMM, YYYY")
	}

	const moviesOutput = useMemo(() => {
		return [...movies].filter((movie) => {
			if (debouncedSearchText == '') return true;

			return movie.theme.toLowerCase().includes(debouncedSearchText) ||
				movie.themePicker.toLowerCase().includes(debouncedSearchText) ||
				movie.movieTitle.toLowerCase().includes(debouncedSearchText) ||
				movie.movieYear.toString().toLowerCase().includes(debouncedSearchText) ||
				movie.num.toString().toLowerCase().includes(debouncedSearchText) ||
				formatDate(movie.date).toLowerCase().includes(debouncedSearchText)
		})
			.sort(sortFunction)
	}, [movies, sortFunction, debouncedSearchText])

	const handleSearchChange = (query: string) => {
		setSearchText(query.toLowerCase())
		handleSearch()
	}

	const handleSearch = useDebouncedCallback(async () => {
		setDebouncedSearchText(searchText)
	}, 100);


	const changeSort = (key: keyof MovieNightInfo) => {
		let direction = SortDirection.ASC;
		if (sortConfig.key === key && sortConfig.direction === SortDirection.ASC) {
			direction = SortDirection.DESC
		}
		setSortConfig({ key, direction })
	}

	const getHeader = (label: string, sortKey: keyof MovieNightInfo) => {
		return (
			<Button m={0} p={0} onClick={() => changeSort(sortKey)} variant="transparent" c="unset" tt="uppercase">
				{label}
				<Text span c="blue" ml={4}>
					{sortConfig.key === sortKey
						? sortConfig.direction === SortDirection.ASC
							? '↑'
							: '↓'
						: '⇅'
					}
				</Text>
			</Button>
		)
	}

	return (
		<>
			<Helmet>
				<title>{t("movienight.title")}</title>
			</Helmet>

			<Container size="xxl">
				<Group justify="space-between" align="center" mb="sm">
					<Title order={2} size="h4">
						{t("movienight.title")}
					</Title>

					<TextInput
						placeholder={t('movienight.search')}
						size="sm"
						maw={rem(300)}
						aria-label={t('movienight.search')}
						value={searchText}
						onChange={(e) => handleSearchChange(e.currentTarget.value)}
						rightSection={
							<ActionIcon
								variant="subtle"
								onClick={() => handleSearchChange("")}
								aria-label={t("movienight.clearSearch")}>
								✕
							</ActionIcon>
						}
					/>
				</Group>

				<Skeleton visible={moviesLoading}>
					<Table.ScrollContainer minWidth={rem(500)}>
						<Table withRowBorders={false} highlightOnHover >
							<Table.Thead style={{ whiteSpace: "nowrap" }}>
								<Table.Tr>
									<Table.Th ta="right">#</Table.Th>
									<Table.Th miw={rem(100)}>{getHeader(t("movienight.table.date"), "date")}</Table.Th>
									<Table.Th>{getHeader(t("movienight.table.theme"), "theme")}</Table.Th>
									<Table.Th>{getHeader(t("movienight.table.movieTitle"), "movieTitle")}</Table.Th>
									<Table.Th ta="right">{getHeader(t("movienight.table.movieYear"), "movieYear")}</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{moviesOutput.map((movie, index) => (
									<Table.Tr key={index} style={{ verticalAlign: "top" }}>
										<Table.Td ta="right">{movie.num}</Table.Td>
										<Table.Td>
											{formatDate(movie.date)}
										</Table.Td>
										<Table.Td>{movie.theme} {movie.themePicker && `(${movie.themePicker})`}</Table.Td>
										<Table.Td>
											<Anchor
												href={movie.tmdbUrl}
												aria-label={`The Movie Database (TMDB) page for ${movie.movieTitle} ${movie.movieYear}`}>
												{movie.movieTitle}
											</Anchor>
										</Table.Td>
										<Table.Td ta="right">
											{movie.movieYear}
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
						{!moviesOutput.length &&
							<Center c="gray" my="lg">{t("movienight.noMoviesFound")}</Center>
						}
					</Table.ScrollContainer>
				</Skeleton>
			</Container >
		</>
	)
}
