'use client';

import { Code, Container, Space, Title, Text, List, Avatar, Flex } from '@mantine/core';

export default function HomePage() {
	return (
		<Container fluid>
			<Flex mih={50} gap="sm" justify="flex-start" align="flex-end" direction="row" wrap="wrap">
				<Title order={1}>Tech Tools</Title>
				<Avatar src="/web-app-manifest-192x192.png" alt="Tech Tools logo" />
				<Code>v1.1.0</Code>
			</Flex>

			<Space h="xl" />
			<Title order={2}>About</Title>
			<Text>
				Tech Tools is a open-source collection of tools to make development, daily tasks and other
				stuff easier for everyone created using React and Mantine. The source-code is free to view,
				edit and copy by everyone and{' '}
				<a href="https://github.com/Akashic101/Tech-Tools">hosted on Github</a>.
				<br />
				You have a tool you want to add to the collection or need help getting an idea realized?
				Feel free to create an issue or start a discussion on Github to see what others think and if
				someone wants to help you
			</Text>
			<Space h="xl" />
			<Title order={2}>Patch notes</Title>
			<Title order={3}>1.1.0</Title>

			<List listStyleType="disc">
				<List.Item>
					<Title order={4}>Converter</Title>
					<List withPadding listStyleType="disc">
						<List.Item>Added Color Converter</List.Item>
						<List.Item>Added Temperature Converter</List.Item>
					</List>
				</List.Item>
				<List.Item>
					<Title order={4}>Password Generator</Title>
					<List withPadding listStyleType="disc">
						<List.Item>Added Password Generator</List.Item>
						<List.Item>Added Passphrase Generator</List.Item>
						<List.Item>Added Haiku Generator</List.Item>
						<List.Item>Added Password Strength Generator</List.Item>
					</List>
				</List.Item>
				<List.Item>
					<Title order={4}>General</Title>
					<List withPadding listStyleType="disc">
						<List.Item>Added Navbar and Header</List.Item>
						<List.Item>Added light/dark theme</List.Item>
						<List.Item>Added README</List.Item>
						<List.Item>Added Homepage</List.Item>
					</List>
				</List.Item>
			</List>
		</Container>
	);
}
