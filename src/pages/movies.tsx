import React from 'react'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ja from "dayjs/locale/ja";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Link } from "react-router-dom";
import {
	Button,
	Flex,
	Heading,
	IconButton,
	Link as RadixLink,
	Skeleton,
	Table,
	Text,
	TextField,
} from "@radix-ui/themes";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.locale(ja)

interface MovieNightInfo {
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

interface SortConfig {
	key: keyof MovieNightInfo,
	direction: SortDirection
}

export default function Movies() {
	const { t } = useTranslation()

	const [movies, setMovies] = useState<MovieNightInfo[]>([])
	const [moviesLoading, setMoviesLoading] = useState(true)
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: SortDirection.DESC })
	const [searchText, setSearchText] = useState("")

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
		const d = dayjs.tz(date, "America/Toronto").locale(i18next.language)
		return d.format("ll")
	}

	const moviesOutput = useMemo(() => {
		return [...movies].filter((movie) => {
			if (searchText == '') return true;

			return movie.theme.toLowerCase().includes(searchText) ||
				movie.themePicker.toLowerCase().includes(searchText) ||
				movie.movieTitle.toLowerCase().includes(searchText) ||
				movie.movieYear.toString().toLowerCase().includes(searchText) ||
				movie.num.toString().toLowerCase().includes(searchText) ||
				formatDate(movie.date).toLowerCase().includes(searchText)
		})
			.sort(sortFunction)
	}, [movies, sortFunction, searchText])

	const handleSearchChange = (query: string) => {
		setSearchText(query.toLowerCase())
	}

	const changeSort = (key: keyof MovieNightInfo) => {
		let direction = SortDirection.ASC;
		if (sortConfig.key === key && sortConfig.direction === SortDirection.ASC) {
			direction = SortDirection.DESC
		}
		setSortConfig({ key, direction })
	}

	const getHeader = (label: string, sortKey: keyof MovieNightInfo) => {
		return (
			<Button variant="ghost" onClick={() => changeSort(sortKey)}>
				<Text weight="bold">
					{label}
				</Text>
				<Text weight="bold">
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

			<Flex direction="row" align="center" mb="4" justify="between">
				<Heading as="h2">
					{t("movienight.title")}
				</Heading>

				<Skeleton loading={moviesLoading}>
					<TextField.Root
						placeholder={t('movienight.search')}
						aria-label={t('movienight.search')}
						value={searchText}
						onChange={(e) => handleSearchChange(e.currentTarget.value)}
					>
						<TextField.Slot side="right">
							<IconButton
								variant="ghost"
								onClick={() => handleSearchChange("")}
								aria-label={t("movienight.clearSearch")}>
								✕
							</IconButton>
						</TextField.Slot>
					</TextField.Root>
				</Skeleton>
			</Flex>

			<Skeleton loading={moviesLoading} minHeight="800">
				<Table.Root>
					<Table.Header style={{ whiteSpace: "nowrap" }}>
						<Table.Row>
							<Table.ColumnHeaderCell width="5em">
								#
							</Table.ColumnHeaderCell>

							<Table.ColumnHeaderCell width="12em" minWidth="6em">
								{getHeader(t("movienight.table.date"), "date")}
							</Table.ColumnHeaderCell>

							<Table.ColumnHeaderCell>
								{getHeader(t("movienight.table.theme"), "theme")}
							</Table.ColumnHeaderCell>

							<Table.ColumnHeaderCell>
								{getHeader(t("movienight.table.movieTitle"), "movieTitle")}
							</Table.ColumnHeaderCell>

							<Table.ColumnHeaderCell align="right" width="10em">
								{getHeader(t("movienight.table.movieYear"), "movieYear")}
							</Table.ColumnHeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{moviesOutput.map((movie, index) => (
							<Table.Row key={index} style={{ verticalAlign: "top" }}>
								<Table.Cell>
									{movie.num}
								</Table.Cell>

								<Table.Cell>
									{formatDate(movie.date)}
								</Table.Cell>

								<Table.Cell>
									{movie.theme} {movie.themePicker && `(${movie.themePicker})`}
								</Table.Cell>

								<Table.Cell>
									<RadixLink asChild>
										<Link
											to={movie.tmdbUrl}
											aria-label={`The Movie Database (TMDB) page for ${movie.movieTitle} ${movie.movieYear}`}>
											{movie.movieTitle}
										</Link>
									</RadixLink>
								</Table.Cell>

								<Table.Cell align="right">
									{movie.movieYear}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root >
				{!moviesOutput.length &&
					<Flex justify="center" pt="6">
						<Text>{t("movienight.noMoviesFound")}</Text>
					</Flex>
				}
			</Skeleton>
		</>
	)
}
