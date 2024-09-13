'use client';

import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavBarLinksGroup.module.css';
import { useRouter } from 'next/navigation';

interface LinksGroupProps {
	icon: React.FC<any>;
	label: string;
	link?: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string; icon: React.FC<any> }[];
}

export function LinksGroup({ icon: Icon, label, link, initiallyOpened, links }: LinksGroupProps) {
	const [active, setActive] = useState('Password Generator');
	const router = useRouter();

	const hasLinks = Array.isArray(links) && links.length > 0;
	const [opened, setOpened] = useState(initiallyOpened || false);

	const items = (hasLinks ? links : []).map((link) => {
		const LinkIcon = link.icon;

		return (
			<UnstyledButton
				className={classes.link}
				key={link.label}
				onClick={(event: { preventDefault: () => void }) => {
					event.preventDefault();
					setActive(link.label);
					router.push(link.link);
				}}
			>
				<Group gap={10} align="center">
					<ThemeIcon variant="light" size={24}>
						<LinkIcon size={rem(18)} />
					</ThemeIcon>
					<Text>{link.label}</Text>
				</Group>
			</UnstyledButton>
		);
	});

	return (
		<>
			<UnstyledButton
				onClick={() => {
					if (!hasLinks && link) {
						router.push(link);
					} else {
						setOpened((o) => !o);
					}
				}}
				className={classes.control}
			>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<IconChevronRight
							className={classes.chevron}
							stroke={1.5}
							style={{
								width: rem(16),
								height: rem(16),
								transform: opened ? 'rotate(-90deg)' : 'none',
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks && <Collapse in={opened}>{items}</Collapse>}
		</>
	);
}
