'use client';

import '@mantine/core/styles.css';
import React from 'react';
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	Group,
	Burger,
	Avatar,
	Text,
} from '@mantine/core';
import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { NavbarNested } from './components/NavBarNested/NavBarNested';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="Tech Tools" />
				<link rel="manifest" href="/site.webmanifest" />
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider defaultColorScheme="dark" theme={theme}>
					<AppShell
						header={{ height: 60 }}
						navbar={{
							width: { sm: 200, lg: 300 },
							breakpoint: 'sm',
							collapsed: { mobile: !opened },
						}}
					>
						<AppShell.Header>
							<Group h="100%" px="md">
								<Avatar src="/web-app-manifest-192x192.png" alt="Tech Tools logo" />
								<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
								<Text
									size="xl"
									fw={700}
									variant="gradient"
									gradient={{ from: 'red', to: 'orange', deg: 90 }}
								>
									Tech Tools
								</Text>
							</Group>
						</AppShell.Header>
						<AppShell.Navbar>
							<NavbarNested />
						</AppShell.Navbar>
						<AppShell.Main mt={20}>{children}</AppShell.Main>
					</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
