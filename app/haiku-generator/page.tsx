'use client';

import {
	Button,
	Center,
	Stack,
	CopyButton,
	Grid,
	Flex,
	Textarea,
	TextInput,
	Alert,
} from '@mantine/core';
import { IconKey, IconQuestionMark } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ToggleButton } from '../components/ToggleButton/ToggleButton';

export default function HaikuGenerator() {
	const [divider, setDivider] = useState('-');
	const [capitalizeWords, setCapitalizeWords] = useState(true);
	const [generatedHaiku, setGeneratedHaiku] = useState('');
	const [fileContent, setFileContent] = useState<string>('');

	function getRandomNumber(max: number) {
		const randomBuffer = new Uint32Array(1);
		crypto.getRandomValues(randomBuffer);
		return randomBuffer[0] % (max + 1);
	}

	function syllableCount(word: string) {
		word = word.toLowerCase();
		word = word.toLowerCase();
		var t_some = 0;
		if (word.length > 3) {
			if (word.substring(0, 4) == 'some') {
				word = word.replace('some', '');
				t_some++;
			}
		}
		word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');
		word = word.replace(/^y/, '');
		var syl = word.match(/[aeiouy]{1,2}/g);
		if (syl) {
			return syl.length + t_some;
		}
	}

	function searchLineInFile(lineNumber: number): string | undefined {
		if (fileContent) {
			const lines = fileContent.split('\n');
			const targetLine = lines[lineNumber - 1];
			if (targetLine) {
				return targetLine;
			} else {
				console.error(`Line ${lineNumber} not found in the file.`);
			}
		} else {
			console.error('File content is not loaded yet.');
		}
	}

	async function generateHaikuLine(syllableTarget: number): Promise<string> {
		const maxNumber = 7775;
		let currentSyllableCounter = 0;
		let wordArray: string[] = [];

		function addSyllables(word: string): boolean {
			const syllables = syllableCount(word);
			if (syllables) {
				currentSyllableCounter += syllables;
				if (capitalizeWords) {
					wordArray.push(word!.charAt(0).toUpperCase() + word!.slice(1));
				} else {
					wordArray.push(word);
				}
				return true;
			}
			return false;
		}

		while (currentSyllableCounter < syllableTarget) {
			const randomWord = searchLineInFile(getRandomNumber(maxNumber));
			if (randomWord) {
				if (!addSyllables(randomWord)) {
					console.log('Skipping invalid word:', randomWord);
				}
			}

			if (currentSyllableCounter > syllableTarget) {
				while (currentSyllableCounter > syllableTarget && wordArray.length > 0) {
					const removedWord = wordArray.pop();
					if (removedWord) {
						currentSyllableCounter -= syllableCount(removedWord) || 0;
					}
				}
			}

			if (currentSyllableCounter > syllableTarget * 2) {
				console.log('Too many syllables, resetting...');
				currentSyllableCounter = 0;
				wordArray = [];
			}
		}
		return wordArray.join(divider);
	}

	async function generateHaiku(): Promise<void> {
		// Generate each line of the haiku
		try {
			const line1 = await generateHaikuLine(5);
			const line2 = await generateHaikuLine(7);
			const line3 = await generateHaikuLine(5);

			// Combine the lines into the final haiku string
			setGeneratedHaiku(`${line1}\n${line2}\n${line3}`);
		} catch (error) {
			console.error('Error generating haiku:', error);
		}
	}

	useEffect(() => {
		fetch('/data/eff_large_wordlist.txt')
			.then((response) => response.text())
			.then((text) => {
				setFileContent(text);
				console.log('File content loaded.');
			})
			.catch((error) => {
				console.error('Error loading the file:', error);
			});
	}, []);

	return (
		<Center>
			<Stack w={'70%'} align="stretch" justify="center" gap="md">
				<Grid grow>
					<Grid.Col span={2}>
						<ToggleButton
							label="Capitalize words"
							text="Should the first letter be capitalized"
							checked={capitalizeWords}
							onClick={() => setCapitalizeWords(!capitalizeWords)}
						/>
					</Grid.Col>
					<Grid.Col span={2}>
						<TextInput
							label="Divider"
							value={divider}
							onChange={(event) => setDivider(event.currentTarget.value)}
						/>
					</Grid.Col>
				</Grid>
				<Grid grow>
					<Grid.Col span={8}>
						<Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
							<Button
								w={200}
								leftSection={<IconKey size={14} />}
								variant="outline"
								color="red"
								onClick={() => generateHaiku()}
							>
								Generate
							</Button>
							<CopyButton data-disabled={!generatedHaiku} value={generatedHaiku || ''}>
								{({ copied, copy }) => (
									<Button
										w={200}
										color={copied ? 'teal' : 'red'}
										onClick={copy}
										disabled={!generatedHaiku}
									>
										{copied ? 'Copied haiku' : 'Copy haiku'}
									</Button>
								)}
							</CopyButton>
						</Flex>
					</Grid.Col>

					<Grid.Col span={6}>
						<Textarea
							autosize
							minRows={3}
							readOnly
							label="Generated haiku"
							value={generatedHaiku}
						/>
					</Grid.Col>
				</Grid>
				<Alert variant="light" color="blue" title="How does this work?" icon={<IconQuestionMark />}>
					This application generates a haiku using a process that involves selecting words from a
					word list and assembling them into a traditional Japanese poem structure. Here’s a
					detailed breakdown of the process:
					<ul>
						<li>
							<strong>Word List:</strong> The haiku is composed using a word list provided by the{' '}
							<a href="https://www.eff.org/">Electronic Frontier Foundation (EFF)</a>. This list is
							curated to ensure a wide variety of words that are suitable for creating meaningful
							and diverse phrases. The word list is loaded from a file located at{' '}
							<code>/data/eff_large_wordlist.txt</code>.
						</li>
						<li>
							<strong>Random Number Generation:</strong> The application uses a Cryptographically
							Secure Pseudorandom Number Generator (CSPRNG) to ensure that the words selected are
							truly random and unpredictable. This is achieved through the{' '}
							<code>getRandomNumber(max)</code> function, which generates random indices to select
							words from the list.
						</li>
						<li>
							<strong>Syllable Counting:</strong> Each word is analyzed to count its syllables using
							the <code>syllableCount(word)</code> function. This function processes the word to
							estimate the number of syllables based on vowel patterns and common syllable
							structures.
						</li>
						<li>
							<strong>Haiku Structure:</strong> A haiku traditionally consists of three lines with a
							syllable pattern of 5-7-5. The application generates each line by accumulating words
							until the syllable count for that line meets the target (5 or 7 syllables). If the
							syllable count exceeds the target, excess words are removed, and the process is
							adjusted to fit the required structure.
						</li>
						<li>
							<strong>Passphrase Construction:</strong> Each line is constructed by selecting words
							from the word list and formatting them according to user preferences. Words can be
							capitalized, and a user-defined divider (e.g., a dash <code>-</code>) is used to
							separate words within each line.
						</li>
					</ul>
					<p>
						<strong>About the EFF Word List:</strong> The word list used in this application is
						sourced from the Electronic Frontier Foundation (EFF). The EFF is a reputable
						organization dedicated to defending civil liberties in the digital world. Their word
						list is designed to provide a diverse and reliable set of words for generating
						passphrases and poems, ensuring both security and creativity.
					</p>
					<p>
						This method ensures that each haiku is both creative and structurally accurate,
						leveraging a strong random number generator and a trusted word list to produce unique
						and aesthetically pleasing poems.
					</p>
				</Alert>
			</Stack>
		</Center>
	);
}
