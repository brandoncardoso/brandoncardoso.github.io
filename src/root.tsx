import {
	Anchor,
	Container,
	Group,
	Stack,
	Title,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";


type LinkInfo = {
	link: string
	label: string
}

const links: Array<LinkInfo> = [
	{ link: '/movies', label: 'Movie Night' },
]


export default function Root() {
	return (
		<>
			<Container pt="xl" size="md">
				<Stack my="md">
					<Group justify="space-between" align="flex-end">
						<Title order={1} size="h3">
							<Anchor component={Link} to="/" inherit style={{ color: "inherit" }}>
								Brandon Cardoso
							</Anchor>
						</Title>
					</Group >

					<Group>
						{links.map(({ link, label }) => {
							return <Anchor component={Link} to={link}>{label}</Anchor>
						})}
					</Group>
				</Stack>
			</Container >

			<Outlet />
		</>
	)
}
