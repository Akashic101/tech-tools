import { Group, Code, ScrollArea, Text } from '@mantine/core';
import classes from './NavBarNested.module.css';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import { LinksGroup } from '../NavBarLinksGroup/NavBarLinksGroup';
import { data } from './navigation';

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
					<Code fw={700}>v1.1.0</Code>
				</Group>
			</div>

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>

			<div className={classes.footer}>
				<ActionToggle />
			</div>
		</nav>
	);
}
