import { UnstyledButton, Text, Checkbox } from '@mantine/core';
import classes from './ToggleButton.module.css';

interface ToggleButtonProps {
	label: string;
	text: string;
	checked: boolean;
	onClick: () => void;
}

export function ToggleButton({ label, text, checked, onClick }: ToggleButtonProps) {
	return (
		<UnstyledButton
			onClick={onClick}
			data-checked={checked || undefined}
			className={classes.button}
		>
			<div className={classes.body}>
				<Text c="dimmed" size="xs" lh={1} mb={5}>
					{text}
				</Text>
				<Text fw={500} size="sm" lh={1}>
					{label}
				</Text>
			</div>
			<Checkbox color="red" checked={checked} onChange={() => {}} tabIndex={-1} />
		</UnstyledButton>
	);
}
