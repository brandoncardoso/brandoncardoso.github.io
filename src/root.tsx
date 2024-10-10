import {
	Anchor,
	Container,
	Group,
	Stack,
	Title,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

type LinkInfo = {
	link: string
	label: string
	aria: string
}

const links: Array<LinkInfo> = [
	{ link: '/movies', label: 'Movie Night', aria: 'Doggie movie night movie history' },
]

export default function Root() {
	const [scrollToTopVisible, setScrollToTopVisible] = useState(false)

	const toggleScrollToTop = () => {
		setScrollToTopVisible(window.scrollY > 300)
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleScrollToTop);
		return () => window.removeEventListener('scroll', toggleScrollToTop)
	}, []);

	return (
		<>
			<Helmet defaultTitle="Brandon Cardoso" titleTemplate="%s - Brandon Cardoso" />

			<a id="top" />

			<Container my="xl" size="md">
				<Stack>
					<Group justify="space-between" align="flex-end">
						<Title order={1} size="h3">
							<Anchor component={Link} to="/" inherit style={{ color: "inherit" }}>
								Brandon Cardoso
							</Anchor>
						</Title>

						<Group>
							{links.map(({ link, label, aria }) => {
								return <Anchor component={Link} to={link} aria-label={aria}>{label}</Anchor>
							})}
						</Group>
					</Group >

				</Stack>
			</Container >

			<Outlet />

			<Container my="xl" size="md">
				<Group justify="space-between">
					<Group>
						<Anchor
							href="https://github.com/brandoncardoso"
							aria-label="Brandon Cardoso's GitHub profile">
							GitHub
						</Anchor>

						<Anchor
							href="https://linkedin.com/in/brandoncardoso"
							aria-label="Brandon Cardoso's LinkedIn profile">
							LinkedIn
						</Anchor>

						<Anchor
							href="mailto:brandon@bcardo.so"
							aria-label="Send an email to Brandon Cardoso">
							brandon@bcardo.so
						</Anchor>
					</Group>


					{scrollToTopVisible &&
						<Anchor href="#top">Back to top</Anchor>
					}
				</Group>
			</Container>
		</>
	)
}
