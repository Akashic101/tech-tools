'use client';

import { Center, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function BinaryConverter() {
	const [textInput, setTextInput] = useState<string>('');
	const [binary, setBinary] = useState<string>('');
	const [octal, setOctal] = useState<string>('');
	const [decimal, setDecimal] = useState<string>('');
	const [hex, setHex] = useState<string>('');

	function textToNumber(text: string, base: number) {
		let convertedValue = '';
		for (let i = 0; i < text.length; i++) {
			convertedValue += text.charCodeAt(i).toString(base);
		}
		return convertedValue;
	}

	useEffect(() => {
// Update all converted values based on text inputsetBinary(textToNumber(textInput, 2));
		setBinary(textToNumber(textInput, 2));
		setOctal(textToNumber(textInput, 8));
		setDecimal(textToNumber(textInput, 10));
		setHex(textToNumber(textInput, 16));
	}, [textInput]);


	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<Textarea
					label="Text"
					value={textInput}
					onChange={(event) => setTextInput(event.currentTarget.value)}
					autosize
				/>
				<Textarea label="Binary" value={binary} readOnly autosize />
				<Textarea label="Octal" value={octal} readOnly autosize/>
				<Textarea label="Decimal" value={decimal} readOnly autosize/>
				<Textarea label="Hexadecimal" value={hex} readOnly autosize/>
			</Stack>
		</Center>
	);
}
