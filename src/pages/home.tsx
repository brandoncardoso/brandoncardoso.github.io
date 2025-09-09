import { Box, Heading, Link, Text } from "@radix-ui/themes";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
	const { t } = useTranslation()
	return (
		<Box>
			<Text as="p" mb="6">
				{t('introduction')}
			</Text>

			<Heading as="h2" size="3">
				{t('projects.title')}:
			</Heading>

			<ul>
				<li>
					<Trans
						i18nKey='projects.sentinowl.description'
						components={{
							a: <Link aria-label={t('projects.sentiowl.aria')} href="https://sentinowl.com" />
						}}
					/>
				</li>
				<li>
					<Trans
						i18nKey='projects.botbros.description'
						components={{
							a: <Link aria-label={t('projects.botbros.aria')} href="https://steamcommunity.com/groups/BotBrothers" />
						}}
					/>
				</li>
				<li>
					<Trans
						i18nKey='projects.moviebot.description'
						components={{
							a: <Link href="https://github.com/brancardoso/movie-bot" aria-label={t('projects.moviebot.aria')} />
						}}
					/>
				</li>
				<li>
					<Trans
						i18nKey='projects.hima.description'
						components={{
							a: <Link href="https://github.com/brancardoso/hima" aria-label={t('projects.hima.aria')} />
						}}
					/>
				</li>
			</ul>
		</Box>
	)
}
