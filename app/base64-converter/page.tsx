'use client';

import {
	Button,
	Center,
	CopyButton,
	FileInput,
	Flex,
	Grid,
	Stack,
	Textarea,
	TextInput,
} from '@mantine/core';
import { IconDownload, IconTransform } from '@tabler/icons-react';
import { useState } from 'react';

export default function Base64Converter() {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [fileToBase64, setFileToBase64] = useState<string | undefined>('');
	const [base64Input, setBase64Input] = useState<string>(''); // Base64 string input
	const [fileName, setFileName] = useState<string>('file'); // Default file name
	const [fileExtension, setFileExtension] = useState<string>('.txt'); // Default extension

	// Convert uploaded file to Base64
	function convertToBase64(): void {
		if (!uploadedFile) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result as string;
			setFileToBase64(base64String);
		};

		reader.readAsDataURL(uploadedFile);
	}

	// Convert Base64 back to file and trigger download
	function downloadFile(): void {
		if (!base64Input || !fileName || !fileExtension) return;

		// Extract the Base64 content (after the comma)
		const base64Data = base64Input.split(',')[1]; // Ignore the DataURL part

		// Decode the Base64 string
		const byteCharacters = atob(base64Data);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);

		// Create a Blob with the decoded data
		const blob = new Blob([byteArray], { type: 'application/octet-stream' });

		// Create a link element to trigger the download
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `${fileName}${fileExtension}`;
		link.click();
	}

	return (
		<Grid grow>
			<Grid.Col span={6}>
				<Center>
					<Stack w={'80%'} align="stretch" justify="center" gap="md">
						<FileInput
							clearable
							label="File to Base 64"
							placeholder="Upload any file here"
							value={uploadedFile}
							onChange={setUploadedFile}
						/>
						<Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
							<Button
								disabled={!uploadedFile}
								leftSection={<IconTransform size={14} />}
								variant="outline"
								color="red"
								onClick={convertToBase64}
							>
								Convert to Base64
							</Button>
							<CopyButton value={fileToBase64 || ''}>
								{({ copied, copy }) => (
									<Button
										w={200}
										color={copied ? 'teal' : 'red'}
										onClick={copy}
										disabled={!fileToBase64}
									>
										{copied ? 'Copied string' : 'Copy string'}
									</Button>
								)}
							</CopyButton>
						</Flex>

						<Textarea
							readOnly
							minRows={5}
							resize="vertical"
							label="File to Base64"
							value={fileToBase64}
						/>
					</Stack>
				</Center>
			</Grid.Col>

			<Grid.Col span={6}>
				<Center>
					<Stack w={'80%'} align="stretch" justify="center" gap="md">
						<TextInput
							label="Base64 to file"
							placeholder="Put your base64 string here"
							value={base64Input}
							onChange={(event) => setBase64Input(event.currentTarget.value)}
						/>
						<Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
							<TextInput
								label="File Name"
								placeholder="file"
								value={fileName}
								onChange={(event) => setFileName(event.currentTarget.value)}
							/>
							<TextInput
								label="Extension"
								placeholder=".txt"
								value={fileExtension}
								onChange={(event) => setFileExtension(event.currentTarget.value)}
							/>
						</Flex>
						<Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
							<Button
								disabled={!base64Input}
								leftSection={<IconDownload size={14} />}
								variant="outline"
								color="red"
								onClick={downloadFile}
							>
								Download file
							</Button>
						</Flex>
					</Stack>
				</Center>
			</Grid.Col>
		</Grid>
	);
}
