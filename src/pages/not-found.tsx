import React from 'react'
import {
	Container,
	Flex,
	Heading,
	Link as RadixLink,
	Text,
} from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
	const { t } = useTranslation()

	return (
		<Container
			align="left"
			p="8"
			px={{ "initial": "4", "sm": "8" }}
			size="4"
		>
			<Flex direction="column" gap="4">
				<Heading as="h1" size="4">
					{t('notfound.title')}
				</Heading>

				<Text>{t('notfound.subtitle')}</Text>

				<RadixLink asChild>
					<Link to="/">{t('notfound.link')}</Link>
				</RadixLink>
			</Flex>
		</Container>
	)
}
