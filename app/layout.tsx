'use client';

import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, Group, Burger } from '@mantine/core';
import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { NavbarNested } from './components/NavBarNested/NavBarNested';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();
	return (
		<html lang="en">
			<head>
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
								<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
								Tech Tools
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
