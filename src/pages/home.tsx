import {
	Anchor,
	Container,
	List,
	Space,
	Title,
} from "@mantine/core";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
	const { t } = useTranslation()
	return (
		<Container size="md">
			<p>
				{t('introduction')}
			</p>

			<Space h="md" />

			<Title tt="uppercase" order={2} size="h6">{t('projects.title')}</Title>
			<List>
				<List.Item>
					<Trans
						i18nKey='projects.botbros.description'
						components={{
							a: <Anchor aria-label={t('projects.botbros.aria')} href="https://steamcommunity.com/groups/BotBrothers" />
						}}
					/>
				</List.Item>
				<List.Item>
					<Trans
						i18nKey='projects.moviebot.description'
						components={{
							a: <Anchor href="https://github.com/brancardoso/movie-bot" aria-label={t('projects.moviebot.aria')} />
						}}
					/>
				</List.Item>
				<List.Item>
					<Trans
						i18nKey='projects.hima.description'
						components={{
							a: <Anchor href="https://github.com/brancardoso/hima" aria-label={t('projects.hima.aria')} />
						}}
					/>
				</List.Item>
			</List>
		</Container>
	)
}
