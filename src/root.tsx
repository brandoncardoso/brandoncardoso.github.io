import {
	ActionIcon,
	Anchor,
	Button,
	Container,
	Group,
	Popover,
	Stack,
	Title,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core"
import { Link, Outlet } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import i18next, { changeLanguage } from "i18next"
import { IconMoon, IconSunHigh, IconWorld } from "@tabler/icons-react"

type LinkInfo = {
	link: string
	label: string
	aria: string
}

export default function Root() {
	const { t } = useTranslation()

	const { setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme()

	const [currentLanguage, setCurrentLanguage] = useState<string>("en")
	const languages = [
		{ locale: "en", label: "English" },
		{ locale: "ja", label: "日本語" },
	]

	const links: Array<LinkInfo> = [
		{ link: '/movies', label: t("nav.movienight.label"), aria: t("nav.movienight.aria") },
	]

	const [scrollToTopVisible, setScrollToTopVisible] = useState(false)

	const toggleScrollToTop = () => {
		setScrollToTopVisible(window.scrollY > 300)
	}

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleScrollToTop);
		return () => window.removeEventListener('scroll', toggleScrollToTop)
	}, []);

	useEffect(() => {
		setCurrentLanguage(i18next.language)
	}, [i18next.language])

	return (
		<>
			<Helmet defaultTitle={t('name')} titleTemplate={`%s - ${t('name')}`} />

			<Container mt="xs" h={0} size="xxl">
				<Group justify="flex-end">
					<ActionIcon onClick={() => toggleColorScheme()} variant="subtle" color="gray" size="sm">
						{computedColorScheme === 'dark' && <IconSunHigh stroke={1.5} />}
						{computedColorScheme === 'light' && <IconMoon stroke={1.5} />}
					</ActionIcon>

					<Popover position="bottom-end">
						<Popover.Target>
							<ActionIcon variant="subtle" color="gray" aria-label={t("langSelectAria")} size="sm">
								<IconWorld stroke={1} />
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown p={0}>
							<Stack gap={0}>
								{languages.map(({ locale, label }) => (
									<Button
										size="xs"
										key={locale}
										radius={0}
										variant={currentLanguage.startsWith(locale) ? "filled" : "subtle"}
										onClick={() => changeLanguage(locale)}
									>
										{label}
									</Button>
								))}
							</Stack>
						</Popover.Dropdown>
					</Popover>
				</Group>
			</Container>

			<Container my="xl" size="md">
				<Stack>
					<Group justify="space-between" align="flex-end">
						<Title order={1} size="h3">
							<Anchor component={Link} to="/" inherit style={{ color: "inherit" }}>
								{t('name')}
							</Anchor>
						</Title>

						<Group>
							{links.map(({ link, label, aria }, index) => (
								<Anchor key={index} component={Link} to={link} aria-label={aria}>
									{label}
								</Anchor>
							))}
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
							aria-label={t('social.github.aria')}>
							GitHub
						</Anchor>

						<Anchor
							href="https://linkedin.com/in/brandoncardoso"
							aria-label={t('social.linkedin.aria')}>
							LinkedIn
						</Anchor>

						<Anchor
							href="mailto:brandon@bcardoso.com"
							aria-label={t('social.email.aria')}>
							brandon@bcardoso.com
						</Anchor>
					</Group>


					{scrollToTopVisible &&
						<Anchor onClick={() => window.scrollTo(0, 0)}>
							{t("backToTop")}
						</Anchor>
					}
				</Group>
			</Container>
		</>
	)
}
