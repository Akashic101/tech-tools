'use client';

import { Center, Stack, Grid, Textarea, Button, Alert, Select } from '@mantine/core';
import { IconExclamationMark, IconZoom } from '@tabler/icons-react';
import { useState } from 'react';
import { crackMethodOptions, crackMethodExplanations, zxcvbnExplanation } from './crackMethodData';
const zxcvbn = require('zxcvbn');

export default function PasswordStrength() {
	const [passwordToTest, setPasswordToTest] = useState('');
	const [estimate, setEstimate] = useState('');
	const [alertColor, setAlertColor] = useState('blue');
	const [alertTitle, setAlertTitle] = useState('Your password strength');
	const [crackMethod, setCrackMethod] = useState('offline_fast_hashing_1e10_per_second');

	const crackMethodData = Object.entries(crackMethodOptions).map(([value, label]) => ({
		value,
		label,
	}));

	function estimatePasswordStrength(): void {
		const result = zxcvbn(passwordToTest);
		const { score, crack_times_display, feedback } = result;

		const timeToCrack = crack_times_display[crackMethod] || 'Unknown';
		const explanation = crackMethodExplanations[crackMethod] || 'No explanation available.';

		const strengthMessage = `Score: ${score} / 4. Estimated time to crack: ${timeToCrack}. ${feedback.suggestions.join(
			' ',
		)}`;

		setEstimate(`${strengthMessage}<br><br>${explanation}<br><br>${zxcvbnExplanation}`);

		if (timeToCrack.includes('instant')) {
			setAlertColor('red');
		} else if (timeToCrack.includes('second')) {
			setAlertColor('red');
		} else if (timeToCrack.includes('minute')) {
			setAlertColor('orange');
		} else if (timeToCrack.includes('hour') || timeToCrack.includes('day')) {
			setAlertColor('yellow');
		} else if (timeToCrack.includes('year')) {
			setAlertColor('green');
		} else if (timeToCrack.includes('centuries') || timeToCrack.includes('millennium')) {
			setAlertColor('green');
		}

		switch (score) {
			case 0:
				setAlertTitle('Your password is very weak');
				break;
			case 1:
				setAlertTitle('Your password is weak');
				break;
			case 2:
				setAlertTitle('Your password is okay');
				break;
			case 3:
				setAlertTitle('Your password is strong');
				break;
			case 4:
				setAlertTitle('Your password is very strong');
				break;
			default:
				setAlertTitle('Password Strength');
				break;
		}
	}

	function handleSelectChange(value: string | null) {
		if (value !== null) {
			setCrackMethod(value);
		}
	}

	return (
		<Center>
			<Stack w={'70%'} align="stretch" justify="center" gap="md">
				<Grid grow>
					<Grid.Col span={6}>
						<Select
							label="Cracking Method"
							placeholder="Pick method"
							data={crackMethodData}
							value={crackMethod}
							onChange={handleSelectChange}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Textarea
							autosize
							minRows={3}
							label="Enter the password you want to test"
							value={passwordToTest}
							onChange={(event) => setPasswordToTest(event.currentTarget.value)}
						/>
					</Grid.Col>
				</Grid>
				<Button
					disabled={!passwordToTest}
					leftSection={<IconZoom size={14} />}
					variant="outline"
					color="red"
					onClick={() => estimatePasswordStrength()}
				>
					Estimate password strength
				</Button>
				{estimate ? (
					<Alert
						variant="light"
						color={alertColor}
						title={alertTitle}
						icon={<IconExclamationMark />}
					>
						<div dangerouslySetInnerHTML={{ __html: estimate }} />
					</Alert>
				) : (
					<div></div>
				)}
			</Stack>
		</Center>
	);
}
