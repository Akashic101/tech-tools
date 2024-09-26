'use client';

import { Center, Select, Stack, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

const baseValues = [
	{ value: 2, label: 'Binary' },
	{ value: 8, label: 'Octal' },
	{
		value: 10,
		label: 'Decimal',
	},
	{ value: 16, label: 'Hexadecimal' },
];

export default function BinaryConverter() {
	const [textInput, setTextInput] = useState<string>('');
	const [binary, setBinary] = useState<string>('');
	const [octal, setOctal] = useState<string>('');
	const [deximal, setDecimal] = useState<string>('');
	const [hex, setHex] = useState<string>('');
	const [base, setBase] = useState<number>(2);

	function textToNumber(text: string, base: number) {
		console.log(text, base);
		let binary = '';
		for (let i = 0; i < text.length; i++) {
			binary += text.charCodeAt(i).toString(base);
		}
		return binary;
	}

	useEffect(() => {
		textToNumber(textInput, base);
	}, [textInput, base]);

	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<Select data={baseValues} value={base} onChange={(value) => setBase(value)} />
				<TextInput
					label="Text"
					value={textInput}
					onChange={(event) => setTextInput(event.currentTarget.value)}
				/>
				<TextInput label="Binary" value={binary} readOnly />
			</Stack>
		</Center>
	);
}
