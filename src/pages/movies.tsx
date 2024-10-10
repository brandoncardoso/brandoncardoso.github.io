import {
	ActionIcon,
	Anchor,
	Container,
	Table,
	Title,
	Text,
} from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

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
	const [movies, setMovies] = useState<MovieNightInfo[]>([])
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: SortDirection.DESC })

	useEffect(() => {
		const loadMovies = async () => {
			const res = await fetch('/data/movies.json');
			const data = await res.json()
			setMovies(data as MovieNightInfo[])
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
					console.log('numbers')
					if (sortConfig.direction === SortDirection.ASC) {
						return valueA - valueB
					}
					if (sortConfig.direction === SortDirection.DESC) {
						return valueB - valueA
					}
				}

				// Handle string comparison
				if (typeof valueA === "string" && typeof valueB === "string") {
					console.log('strings')
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

	const sortedMovies = useMemo(() => {
		return [...movies].sort(sortFunction)
	}, [movies, sortFunction])

	const changeSort = (key: keyof MovieNightInfo) => {
		let direction = SortDirection.ASC;
		if (sortConfig.key === key && sortConfig.direction === SortDirection.ASC) {
			direction = SortDirection.DESC
		}
		setSortConfig({ key, direction })
	}

	const getSortButton = (sortKey: keyof MovieNightInfo) => {
		return (
			<ActionIcon ml={4} variant="subtle" onClick={() => changeSort(sortKey)}>
				<Text>
					{sortConfig.key === sortKey
						? sortConfig.direction === SortDirection.ASC
							? '↑'
							: '↓'
						: '⇅'
					}
				</Text>
			</ActionIcon>
		)
	}

	return (
		<>
			<Helmet>
				<title>Doggie Movie Night History</title>
			</Helmet>

			<Container size="xxl">
				<Title order={2} size="h4" mb="md">Doggie Movie Night History</Title>

				<Table withRowBorders={false} highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>#</Table.Th>
							<Table.Th>Date {getSortButton("date")}</Table.Th>
							<Table.Th>Theme {getSortButton("theme")}</Table.Th>
							<Table.Th>Movie Title {getSortButton("movieTitle")}</Table.Th>
							<Table.Th>Movie Year {getSortButton("movieYear")}</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{sortedMovies.map((movie, index) => (
							<Table.Tr key={index}>
								<Table.Td>{movie.num}</Table.Td>
								<Table.Td>
									{dayjs.tz(movie.date, "America/Toronto").format("ddd, DD MMM, YYYY")}
								</Table.Td>
								<Table.Td>{movie.theme} {movie.themePicker && `(${movie.themePicker})`}</Table.Td>
								<Table.Td>
									<Anchor
										href={movie.tmdbUrl}
										aria-label={`The Movie Database (TMDB) page for ${movie.movieTitle} ${movie.movieYear}`}>
										{movie.movieTitle}
									</Anchor>
								</Table.Td>
								<Table.Td>
									{movie.movieYear}
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Container>
		</>
	)
}
