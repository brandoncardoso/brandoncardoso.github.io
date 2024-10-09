import {
	Anchor,
	Container,
	Table,
	Title,
} from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

type MovieNightInfo = {
	num: number,
	date: string,
	theme: string,
	themePicker: string,
	movieTitle: string,
	movieYear: number,
	tmdbUrl: string,
}

export default function Movies() {
	const [movies, setMovies] = useState<MovieNightInfo[]>([])

	useEffect(() => {
		const loadMovies = async () => {
			const res = await fetch('/data/movies.json');
			const data = await res.json()
			setMovies(data as MovieNightInfo[])
		}

		loadMovies()
	}, [])

	return (
		<>
			<Helmet>
				<title>Doggie Movie Night History</title>
			</Helmet>

			<Container size="xl">
				<Title order={2} size="h4" mb="md">Doggie Movie Night History</Title>

				<Table withRowBorders={false} highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>#</Table.Th>
							<Table.Th>Date</Table.Th>
							<Table.Th>Theme</Table.Th>
							<Table.Th>Movie</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{movies.map((movie, index) => (
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
										{movie.movieTitle} ({movie.movieYear})
									</Anchor>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Container>
		</>
	)
}
