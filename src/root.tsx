import {
	AppShell,
	Box,
	Burger,
	Group,
	Image,
	NavLink,
	Stack,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink as ReactRouterNavLink, Outlet } from "react-router-dom";


type LinkInfo = {
	link: string
	label: string
}

const menuLinks = {
	main: [
		{ link: '/', label: 'Projects' },
		{ link: '/movies', label: 'Movie Night' },
	],
}


export default function Root() {
	const [menuOpen, { toggle: toggleMenuOpen }] = useDisclosure(false);

	const genSidebarLink = (item: LinkInfo) => (
		<NavLink
			p={0}
			my="sm"
			ta={{
				base: 'left',
				sm: 'right'
			}}
			key={item.label}
			label={item.label}
			onClick={() => menuOpen && toggleMenuOpen()}
			renderRoot={(props) => (<ReactRouterNavLink to={item.link} {...props} />)}
		/>
	)

	const mainMenuLinks = menuLinks.main.map(genSidebarLink)

	return (
		<AppShell
			header={{ height: { base: 60, sm: 100 } }}
			navbar={{
				width: {
					base: 300,
					xl: 600,
				},
				breakpoint: "sm",
				collapsed: { mobile: !menuOpen }
			}}
		>
			<AppShell.Header hiddenFrom="sm" px="md" withBorder={false}>
				<Group h={"100%"} align="center">
					<Burger
						opened={menuOpen}
						onClick={toggleMenuOpen}
						hiddenFrom="sm"
						size="sm"
					/>
					<Title order={1} size="h2">Brandon Cardoso</Title>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar
				withBorder={false}
				p="md"
				fz="sm"
				ta={{
					base: 'left',
					sm: 'right'
				}}
			>
				<AppShell.Section visibleFrom="sm">
					<Stack align="flex-end" ta="right">
						<Image
							w={150}
							radius={"100%"}
							src={"img/brandon.webp"}
							alt="Brandon Cardoso" />

						<Title order={1} size="h2">Brandon Cardoso</Title>
					</Stack>
				</AppShell.Section>

				<AppShell.Section>
					{mainMenuLinks}
				</AppShell.Section>

				<AppShell.Section mt="md">
					{genSidebarLink({ link: 'mailto:brandon@bcardo.so', label: 'brandon@bcardo.so' })}
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>
				<Box p="md">
					<Outlet />
				</Box>
			</AppShell.Main>
		</AppShell >
	)
}
