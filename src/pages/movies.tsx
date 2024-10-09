import {
	Anchor,
	Container,
	Table,
	Title,
} from "@mantine/core";
import { useEffect, useState } from "react";


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
							<Table.Td>{movie.date}</Table.Td>
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
	)
}
