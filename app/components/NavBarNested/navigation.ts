import {
	IconHome,
	IconPassword,
	IconLock,
	IconAlignJustified,
	IconFlower,
	IconStethoscope,
	IconTransform,
	IconTemperature,
	IconColorFilter,
	IconFileIsr,
	IconAbc,
} from '@tabler/icons-react';

export const data = [
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
			{ label: 'Base64 file converter', link: '/base64-converter', icon: IconFileIsr },
			{ label: 'Text to NATO converter', link: '/nato-converter', icon: IconAbc },
		],
	},
];
