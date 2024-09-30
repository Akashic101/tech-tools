'use client';

import {
	Button,
	Center,
	CopyButton,
	FileInput,
	Flex,
	Grid,
	Select,
	Stack,
	Textarea,
	Text,
	Code,
	Pill,
	Badge,
} from '@mantine/core';
import { IconTransform, IconDownload } from '@tabler/icons-react';
import mimeTypes from 'mime-types'; // Use ES module import
import { useState } from 'react';

export default function MimeTypeLookup() {
	const [mimeType, setMimeType] = useState<string | null>(null);

	const { extensions: mimeTypeToExtension } = mimeTypes;
	const mimeInfos = Object.entries(mimeTypeToExtension).map(([mimeType, extensions]) => ({
		mimeType,
		extensions,
	}));

	const selectData = mimeInfos.map((info) => ({
		value: info.mimeType,
		label: `${info.mimeType} (${info.extensions.join(', ')})`,
	}));

	return (
		<Grid grow>
			<Grid.Col span={6}>
				<Center>
					<Stack w={'80%'} align="stretch" justify="center" gap="md">
						<Select
							data={selectData}
							value={mimeType}
							onChange={setMimeType}
							label="Select file extension"
							placeholder="application/pdf (pdf)"
							clearable
							searchable
						/>
						{mimeType && (
							<>
								<Text>
									Extensions of files with the MIME-type <Code>{mimeType}</Code>:
								</Text>
								<Flex gap="xs" wrap="wrap">
									{mimeTypeToExtension[mimeType].map((extension: string, index: number) => (
										<Badge color="red" key={index}>
											.{extension}
										</Badge>
									))}
								</Flex>
							</>
						)}
					</Stack>
				</Center>
			</Grid.Col>

			<Grid.Col span={6}>
				<Center>
					<Stack w={'80%'} align="stretch" justify="center" gap="md"></Stack>
				</Center>
			</Grid.Col>
		</Grid>
	);
}
