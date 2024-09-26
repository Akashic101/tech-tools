'use client';

import { Code, Container, Space, Title, Text, List, Avatar, Flex, Alert } from '@mantine/core';
import { IconExclamationMark } from '@tabler/icons-react';

export default function HomePage() {
	return (
		<Container fluid>
			<Flex mih={50} gap="sm" justify="flex-start" align="flex-end" direction="row" wrap="wrap">
				<Title order={1}>Tech Tools</Title>
				<Avatar src="/web-app-manifest-192x192.png" alt="Tech Tools logo" />
				<Code>v1.3.0</Code>
			</Flex>

			<Space h="xl" />
			<Title order={2}>About</Title>
			<Text>
				Tech Tools is an open-source collection of utilities designed to simplify development, daily
				tasks, and more. Created using React and Mantine, the source code is free for everyone to
				view, edit, and share. It's{' '}
				<a href="https://github.com/Akashic101/Tech-Tools">hosted on GitHub</a>.
				<br />
				Do you have a tool you'd like to contribute or need help with an idea? Feel free to create
				an issue or start a discussion on GitHub to gather feedback and potentially collaborate with
				others.
			</Text>

			<Space h="xl" />
			<Alert
				variant="light"
				color="red"
				title="Work-in-Progress Notice"
				icon={<IconExclamationMark />}
			>
				This website and its tools are currently a work in progress. Some features may not function
				as expected. If you encounter any bugs or incorrect data (e.g., from the converters), please{' '}
				<a href="https://github.com/Akashic101/Tech-Tools/issues">report the issue on GitHub</a>.
			</Alert>

			<Space h="xl" />
			<Title order={2}>Patch Notes</Title>
			<Title order={3}>v1.3.0</Title>
			<Title order={4}>Converters</Title>
			<List withPadding listStyleType="disc">
				<List.Item>Added docker run to docker-compose converter</List.Item>
				<List.Item>Added text to binary converter</List.Item>
			</List>

			<Space h="xl" />
			<details>
				<summary>
					<Title order={4} style={{ display: 'inline', cursor: 'pointer' }}>
						Previous Versions
					</Title>
				</summary>

				<List withPadding listStyleType="disc">
					<List.Item>
						<Title order={3}>v1.2.1</Title>
					</List.Item>
					<List withPadding listStyleType="disc">
						<List.Item>
							<Title order={4}>General</Title>
							<List withPadding listStyleType="disc">
								<List.Item>Added link to github in the NavBar</List.Item>
								<List.Item>Small layout changes</List.Item>
								<List.Item>Added WIP-notice</List.Item>
								<List.Item>Updated patchnotes-layout</List.Item>
							</List>
						</List.Item>
					</List>
					<Space h="xl" />
					<List.Item>
						<Title order={3}>v1.3.0</Title>
					</List.Item>
					<List withPadding listStyleType="disc">
						<List.Item>
							<Title order={4}>Converters</Title>
							<List withPadding listStyleType="disc">
								<List.Item>Added Color Converter</List.Item>
								<List.Item>Added Temperature Converter</List.Item>
							</List>
						</List.Item>
					</List>
					<Space h="xl" />
					<List.Item>
						<Title order={3}>v1.1.0</Title>
					</List.Item>
					<List withPadding listStyleType="disc">
						<List.Item>
							<Title order={4}>Password Tools</Title>
							<List withPadding listStyleType="disc">
								<List.Item>Added Password Generator</List.Item>
								<List.Item>Added Passphrase Generator</List.Item>
								<List.Item>Added Haiku Generator</List.Item>
								<List.Item>Added Password Strength Meter</List.Item>
							</List>
						</List.Item>
						<List.Item>
							<Title order={4}>General Improvements</Title>
							<List withPadding listStyleType="disc">
								<List.Item>Added Navbar and Header</List.Item>
								<List.Item>Added Light/Dark Theme</List.Item>
								<List.Item>Added README</List.Item>
								<List.Item>Added Homepage</List.Item>
							</List>
						</List.Item>
					</List>
				</List>
			</details>
		</Container>
	);
}
