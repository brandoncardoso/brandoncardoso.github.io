import { Link, Outlet } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import i18next, { changeLanguage } from "i18next"
import { SunIcon, MoonIcon, GlobeIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import {
	Button,
	Container,
	Flex,
	Heading,
	IconButton,
	Link as RadixLink,
	Popover,
	Box,
	Text,
} from "@radix-ui/themes"

type LinkInfo = {
	link: string
	label: string
	aria: string
}

export default function Root() {
	const { t } = useTranslation()
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

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
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleScrollToTop);
		return () => window.removeEventListener('scroll', toggleScrollToTop)
	}, []);

	useEffect(() => {
		setCurrentLanguage(i18next.language)
	}, [i18next.language])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<Helmet defaultTitle={t('name')} titleTemplate={`%s - ${t('name')}`} />

			<Container align="left" p="8" size="3">
				<Flex align="baseline" gap="6" mb="8">
					<Heading as="h1" size="4">
						<RadixLink asChild>
							<Link to="/" style={{ color: "inherit" }}>
								{t('name')}
							</Link>
						</RadixLink>
					</Heading>

					{links.map(({ link, label, aria }, index) => (
						<RadixLink key={index} asChild>
							<Link to={link} aria-label={aria}>{label}</Link>
						</RadixLink>
					))}
				</Flex>

				<Outlet />

				<Flex direction="column" gap="4" mt="8">
					<Flex justify="between" gap="4">
						<Flex direction="row">
							<RadixLink asChild>
								<Link
									to="https://github.com/brancardoso"
									aria-label={t('social.github.aria')}>
									GitHub
								</Link>
							</RadixLink>,&nbsp;

							<RadixLink asChild>
								<Link
									to="https://linkedin.com/in/brandoncardoso"
									aria-label={t('social.linkedin.aria')}>
									LinkedIn
								</Link>
							</RadixLink>,&nbsp;

							<RadixLink asChild>
								<Link
									to="mailto:bran@brancardoso.com"
									aria-label={t('social.email.aria')}>
									Email
								</Link>
							</RadixLink>
						</Flex>

						{scrollToTopVisible &&
							<RadixLink asChild>
								<Link to="#" onClick={() => window.scrollTo(0, 0)}>
									{t("backToTop")} ↑
								</Link>
							</RadixLink>
						}
					</Flex>
				</Flex>
			</Container>

			<Box position="absolute" top="2" right="2">
				<Flex gap="2" align="center">
					<IconButton variant="soft" onClick={() => toggleColorScheme()}>
						{theme === 'dark' && <SunIcon />}
						{theme === 'light' && <MoonIcon />}
					</IconButton>

					<Popover.Root>
						<Popover.Trigger>
							<IconButton variant="soft" aria-label={t("langSelectAria")}>
								<GlobeIcon />
							</IconButton>
						</Popover.Trigger>
						<Popover.Content size="1">
							<Flex direction="column" gap="2" align="end">
								{languages.map(({ locale, label }) => (
									<Button
										key={locale}
										variant={
											currentLanguage === locale
												? "solid"
												: "surface"
										}
										onClick={() => changeLanguage(locale)}
									>
										{label}
									</Button>
								))}
							</Flex>
						</Popover.Content>
					</Popover.Root>
				</Flex>
			</Box>
		</>
	)
}
