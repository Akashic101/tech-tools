import { Group, Code, ScrollArea, Text } from '@mantine/core';
import {
	IconAlignJustified,
	IconColorFilter,
	IconFlower,
	IconHome,
	IconLock,
	IconPassword,
	IconStethoscope,
	IconTemperature,
	IconTransform,
} from '@tabler/icons-react';
import classes from './NavBarNested.module.css';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import { LinksGroup } from '../NavBarLinksGroup/NavBarLinksGroup';

const data = [
	{ label: 'Home', icon: IconHome, link: '/' },
	{
		label: 'Password Generator',
		icon: IconPassword,
		links: [
			{ label: 'Password', link: '/password-generator', icon: IconLock },
			{
				label: 'Passphrase',
				link: '/passphrase-generator',
				icon: IconAlignJustified,
			},
			{ label: 'Haiku', link: '/haiku-generator', icon: IconFlower },
			{
				label: 'Password strength',
				link: '/password-strength',
				icon: IconStethoscope,
			},
		],
	},
	{
		label: 'Converter',
		icon: IconTransform,
		links: [
			{ label: 'Temperature converter', link: '/temperature-converter', icon: IconTemperature },
			{ label: 'Color converter', link: '/color-converter', icon: IconColorFilter },
		],
	},
];

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
					<Code fw={700}>v1.2.0</Code>
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
