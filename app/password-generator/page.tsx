/* eslint-disable react/no-unescaped-entities */
'use client';

import {
	Button,
	Center,
	NumberInput,
	Stack,
	CopyButton,
	Grid,
	Flex,
	Textarea,
	Alert,
} from '@mantine/core';
import { IconKey, IconQuestionMark } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ToggleButton } from '../components/ToggleButton/ToggleButton';

export default function PasswordGenerator() {
	const [generatedPassword, setGeneratedPassword] = useState('');
	const [uppercaseLetters, setUppercaseLetters] = useState(true);
	const [lowercaseLetters, setLowercaseLetters] = useState(true);
	const [specialCharacters, setSpecialCharacters] = useState(true);
	const [numbers, setNumbers] = useState(true);
	const [noSimilarCharacters, setNoSimilarCharacters] = useState(true);
	const [passwordLength, setPasswordLength] = useState<string | number>(128);

	function generateCharacterPool(): string {
		let pool = '';
		const similarCharacters = 'il1Lo0O'; // TODO Add any additional similar characters

		if (uppercaseLetters) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (lowercaseLetters) pool += 'abcdefghijklmnopqrstuvwxyz';
		if (numbers) pool += '0123456789';
		if (specialCharacters) pool += '!@#$%^&*()_+[]{}|;:,.<>?';

		if (noSimilarCharacters) {
			pool = pool
				.split('')
				.filter((char) => !similarCharacters.includes(char))
				.join('');
		}

		return pool;
	}

	function generatePassword(): void {
		let pool = generateCharacterPool();

		const randomValues = window.crypto.getRandomValues(new Uint8Array(passwordLength as number));
		const password = Array.from(randomValues)
			.map((value) => pool[value % pool.length])
			.join('');
		setGeneratedPassword(password);
	}

	useEffect(() => {
		if (!uppercaseLetters && !lowercaseLetters && !numbers && !specialCharacters) {
			setLowercaseLetters(true);
		}
	}, [uppercaseLetters, lowercaseLetters, numbers, specialCharacters, noSimilarCharacters]);

	return (
		<Center>
			<Stack w={'70%'} align="stretch" justify="center" gap="md">
				<Grid grow>
					<Grid.Col span={2}>
						<ToggleButton
							label="Uppercase letters"
							text="ABCDEFGH"
							checked={uppercaseLetters}
							onClick={() => setUppercaseLetters(!uppercaseLetters)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<ToggleButton
							label="Lowercase letters"
							text="abcdefgh"
							checked={lowercaseLetters}
							onClick={() => setLowercaseLetters(!lowercaseLetters)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<ToggleButton
							label="Numbers"
							text="0123456789"
							checked={numbers}
							onClick={() => setNumbers(!numbers)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<ToggleButton
							label="Special characters"
							text={'!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'}
							checked={specialCharacters}
							onClick={() => setSpecialCharacters(!specialCharacters)}
						/>
					</Grid.Col>

					<Grid.Col span={2}>
						<ToggleButton
							label="No similar characters"
							text="i, l, 1, L, o, 0, O"
							checked={noSimilarCharacters}
							onClick={() => setNoSimilarCharacters(!noSimilarCharacters)}
						/>
					</Grid.Col>
				</Grid>
				<NumberInput
					label="Password length"
					description="Enter value between 8 and 128"
					value={passwordLength}
					onChange={setPasswordLength}
				/>
				<Grid grow>
					<Grid.Col span={8}>
						<Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
							<Button
								w={200}
								leftSection={<IconKey size={14} />}
								variant="outline"
								color="red"
								onClick={() => generatePassword()}
							>
								Generate
							</Button>
							<CopyButton data-disabled={!generatedPassword} value={generatedPassword || ''}>
								{({ copied, copy }) => (
									<Button
										w={200}
										color={copied ? 'teal' : 'red'}
										onClick={copy}
										disabled={!generatedPassword}
									>
										{copied ? 'Copied password' : 'Copy password'}
									</Button>
								)}
							</CopyButton>
						</Flex>
					</Grid.Col>

					<Grid.Col span={6}>
						<Textarea readOnly label="Generated password" value={generatedPassword} />
					</Grid.Col>
				</Grid>
				<Alert variant="light" color="blue" title="How does this work?" icon={<IconQuestionMark />}>
					This website uses a{' '}
					<a href="https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator?useskin=vector">
						Cryptographically Secure Pseudorandom Number Generator (CSPRNG)
					</a>{' '}
					to create passwords. Here’s how it works:
					<ul>
						<li>
							<strong>CSPRNG:</strong> A CSPRNG is a type of random number generator designed to be
							secure against cryptographic attacks. It ensures that the generated numbers are
							unpredictable and do not follow any discernible patterns, which is crucial for
							creating secure passwords.
						</li>
						<li>
							<strong>Character Pool:</strong> The password is generated from a pool of characters
							based on your selected preferences. You can choose to include:
							<ul>
								<li>Uppercase letters (e.g., A-Z)</li>
								<li>Lowercase letters (e.g., a-z)</li>
								<li>Numbers (e.g., 0-9)</li>
								<li>Special characters (e.g., !@#$%^&amp;*()_+[]{}|;:,.?)</li>
							</ul>
							If you enable the option to exclude similar characters, characters that can be easily
							confused (like 'i', 'l', '1', 'L', 'o', '0', 'O') are removed from the pool.
						</li>
						<li>
							<strong>Password Generation:</strong> Once the character pool is defined based on your
							choices, a specified number of random values are generated using the CSPRNG. Each
							value corresponds to a character in the pool. The final password is constructed by
							mapping these random values to characters and concatenating them to form a secure and
							random password of the desired length.
						</li>
						<li>
							<strong>Security:</strong> The use of a CSPRNG ensures that each password generated is
							not only random but also resistant to attacks. This means the passwords are highly
							secure and suitable for protecting sensitive information.
						</li>
					</ul>
					This method of password generation ensures that your passwords are strong, secure, and
					difficult to guess or predict.
				</Alert>
			</Stack>
		</Center>
	);
}
