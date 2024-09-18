import { Group, Code, ScrollArea, Text, Flex, ActionIcon } from '@mantine/core';
import classes from './NavBarNested.module.css';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import { LinksGroup } from '../NavBarLinksGroup/NavBarLinksGroup';
import { data } from './navigation';
import { IconBrandGithub } from '@tabler/icons-react';

export function NavbarNested() {
	const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

	return (
		<nav className={classes.navbar}>
			<div className={classes.header}>
				<Group justify="space-between">
					<Text
						size="xl"
						fw={700}
						variant="gradient"
						gradient={{ from: 'red', to: 'orange', deg: 90 }}
					>
						Tech Tools
					</Text>
					<Code fw={700}>v1.3.0</Code>
				</Group>
			</div>

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<div className={classes.footer}>
				<Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
					<ActionToggle />
					<ActionIcon
						component="a"
						href="https://github.com/Akashic101/tech-tools"
						color="grey"
						variant="outline"
						aria-label="Settings"
					>
						<IconBrandGithub stroke={1.5} />
					</ActionIcon>
				</Flex>
			</div>
		</nav>
	);
}
