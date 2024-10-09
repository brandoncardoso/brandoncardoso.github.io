import { Anchor, Container, List, Space, Stack, Title } from "@mantine/core";

export default function Home() {
	return (
		<Container size="md">
			<p>
				Software Engineer from Toronto, now in Tokyo.
			</p>

			<Space h="md" />

			<Title tt="uppercase" order={2} size="h6">Projects</Title>
			<List>
				<List.Item>
					Bot Bros - Virtual item trading bots (<Anchor href="https://steamcommunity.com/groups/BotBrothers">Steam Group</Anchor>)
				</List.Item>
				<List.Item>
					Movie Bot - Discord movie search bot (<Anchor href="https://github.com/brandoncardoso/movie-bot">Github</Anchor>)
				</List.Item>
				<List.Item>
					Hima - Jekyll theme (<Anchor href="https://github.com/BrandonCardoso/hima">Github</Anchor>)
				</List.Item>
			</List>
		</Container>
	)
}
