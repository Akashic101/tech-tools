'use client';

import { Button, Center, CopyButton, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
const composerize = require('composerize');
import { useEffect, useState } from 'react';

export default function DockerRunConverter() {
	const [dockerRunCommand, setDockerRunCommand] = useState('');
	const [dockerComposeText, setDockerComposeText] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [dockerComposeVersion, setDockerComposeVersion] = useState('v2x');

	const dockerComposeVersions = [
		{ value: 'v2x', label: 'v2x' },
		{ value: 'v3x', label: 'v3x' },
		{ value: 'latest', label: 'latest' },
	];

	const convertToDockerCompose = () => {
		try {
			let result = composerize(dockerRunCommand, null, dockerComposeVersion);
			setDockerComposeText(result);
			setErrorMessage('');
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('An unknown error occurred');
			}
			setDockerComposeText('');
		}
	};

	useEffect(() => {
		if (dockerRunCommand) {
			convertToDockerCompose();
		}
	}, [dockerRunCommand, dockerComposeVersion]);

	const handleDockerComposeVersions = (value: string | null) => {
		if (value) {
			setDockerComposeVersion(value);
		}
	};

	function downloadFile(): void {
		const blob = new Blob([dockerComposeText], { type: 'text/yaml' });
		const link = document.createElement('a');
		link.download = 'docker-compose.yml';
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
	}

	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<Select
					label="Docker compose version"
					data={dockerComposeVersions}
					value={dockerComposeVersion}
					onChange={handleDockerComposeVersions}
				/>
				<TextInput
					label="Write your docker run command here"
					placeholder="docker run -d -p 8080:80 --name my-web-app nginx:latest"
					value={dockerRunCommand}
					error={errorMessage}
					onChange={(event) => {
						const inputText = event.currentTarget.value;
						setDockerRunCommand(inputText);
						convertToDockerCompose();
					}}
				/>
				<Textarea
					label="Docker-compose.yml"
					placeholder={`version: "2.4"
services:
	nginx:
        ports:
            - 8080:80
        container_name: my-web-app
        image: nginx:latest`}
					value={dockerComposeText}
					readOnly
					autosize
					minRows={10}
				/>
				<CopyButton value={dockerComposeText || ''}>
					{({ copied, copy }) => (
						<Button
							variant="outline"
							w={200}
							color={copied ? 'teal' : 'red'}
							onClick={copy}
							disabled={!dockerComposeText}
						>
							{copied ? 'Copied text' : 'Copy text'}
						</Button>
					)}
				</CopyButton>
				<Button
					disabled={!dockerComposeText}
					leftSection={<IconDownload size={14} />}
					variant="outline"
					color="red"
					onClick={downloadFile}
				>
					Download file
				</Button>
			</Stack>
		</Center>
	);
}
