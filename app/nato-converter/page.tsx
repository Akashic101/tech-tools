'use client';

import { Button, Center, CopyButton, Stack, Textarea, TextInput } from '@mantine/core';
import { useState } from 'react';

const natoAlphabet: { [key: string]: string } = {
	A: 'Alfa',
	B: 'Bravo',
	C: 'Charlie',
	D: 'Delta',
	E: 'Echo',
	F: 'Foxtrot',
	G: 'Golf',
	H: 'Hotel',
	I: 'India',
	J: 'Juliett',
	K: 'Kilo',
	L: 'Lima',
	M: 'Mike',
	N: 'November',
	O: 'Oscar',
	P: 'Papa',
	Q: 'Quebec',
	R: 'Romeo',
	S: 'Sierra',
	T: 'Tango',
	U: 'Uniform',
	V: 'Victor',
	W: 'Whiskey',
	X: 'X-ray',
	Y: 'Yankee',
	Z: 'Zulu',
};

export default function NatoConverter() {
	const [text, setText] = useState('');
	const [convertedText, setConvertedText] = useState('');

	const convertToNatoAlphabet = (inputText: string) => {
		const converted = inputText
			.toUpperCase()
			.split('')
			.map((char) => natoAlphabet[char] || char)
			.join(' ');

		setConvertedText(converted);
	};

	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<TextInput
					placeholder="Write your text here to get converted"
					value={text}
					onChange={(event) => {
						const inputText = event.currentTarget.value;
						setText(inputText);
						convertToNatoAlphabet(inputText);
					}}
				/>
				<Textarea placeholder="Converted text" value={convertedText} readOnly />
				<CopyButton value={convertedText || ''}>
					{({ copied, copy }) => (
						<Button
							variant="outline"
							w={200}
							color={copied ? 'teal' : 'red'}
							onClick={copy}
							disabled={!convertedText}
						>
							{copied ? 'Copied text' : 'Copy text'}
						</Button>
					)}
				</CopyButton>
			</Stack>
		</Center>
	);
}
