'use client';

import { Center, ColorPicker, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';
let convert = require('color-convert');

export default function ColorConverter() {
	const [colorpicker, setColorpicker] = useState('');
	const [hex, setHex] = useState<string>('');
	const [rgb, setRgb] = useState<string>('');
	const [hsl, setHsl] = useState<string>('');
	const [hwb, setHwb] = useState<string>('');
	const [lch, setLch] = useState<string>('');
	const [cmyk, setCmyk] = useState<string>('');
	const [name, setName] = useState<string>('');

	// Error states for inputs
	const [hexError, setHexError] = useState<string | null>(null);
	const [rgbError, setRgbError] = useState<string | null>(null);
	const [hslError, setHslError] = useState<string | null>(null);
	const [hwbError, setHwbError] = useState<string | null>(null);
	const [lchError, setLchError] = useState<string | null>(null);
	const [cmykError, setCmykError] = useState<string | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);

	// Function to convert any color format to all others
	function updateAllFormats(color: string, type: string) {
		let rgbColor: number[] | null = null;

		try {
			switch (type) {
				case 'hex':
					rgbColor = convert.hex.rgb(color);
					break;
				case 'rgb':
					rgbColor = color
						.split(/[ ,()]+/)
						.filter(Boolean)
						.slice(1)
						.map(Number);
					break;
				case 'hsl':
					rgbColor = convert.hsl.rgb(
						color
							.split(/[ ,()%]+/)
							.filter(Boolean)
							.map(Number),
					);
					break;
				case 'hwb':
					rgbColor = convert.hwb.rgb(
						color
							.split(/[ ,()%]+/)
							.filter(Boolean)
							.map(Number),
					);
					break;
				case 'lch':
					rgbColor = convert.lch.rgb(
						color
							.split(/[ ,()%]+/)
							.filter(Boolean)
							.map(Number),
					);
					break;
				case 'cmyk':
					rgbColor = convert.cmyk.rgb(
						color
							.split(/[ ,()%]+/)
							.filter(Boolean)
							.map(Number),
					);
					break;
				case 'name':
					rgbColor = convert.keyword.rgb(color);
					break;
				default:
					return;
			}

			const rgbString = `rgb(${rgbColor!.join(', ')})`;

			// Update all fields if the color is valid
			setRgb(rgbString);
			setHex(`#${convert.rgb.hex(rgbColor)}`);
			setHsl(`hsl(${convert.rgb.hsl(rgbColor).join(', ')})`);
			setHwb(`hwb(${convert.rgb.hwb(rgbColor).join(', ')})`);
			setLch(`lch(${convert.rgb.lch(rgbColor).join(', ')})`);
			setCmyk(`cmyk(${convert.rgb.cmyk(rgbColor).join(', ')})`);
			setName(convert.rgb.keyword(rgbColor) || 'unknown');

			// Update ColorPicker with RGB value
			setColorpicker(rgbString);

			// Clear errors when valid input is provided
			setHexError(null);
			setRgbError(null);
			setHslError(null);
			setHwbError(null);
			setLchError(null);
			setCmykError(null);
			setNameError(null);
		} catch (e) {
			// Set an error for the invalid input field
			if (type === 'hex') setHexError('Invalid HEX format');
			if (type === 'rgb') setRgbError('Invalid RGB format');
			if (type === 'hsl') setHslError('Invalid HSL format');
			if (type === 'hwb') setHwbError('Invalid HWB format');
			if (type === 'lch') setLchError('Invalid LCH format');
			if (type === 'cmyk') setCmykError('Invalid CMYK format');
			if (type === 'name') setNameError('Invalid color name');
		}
	}

	function handleHexChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setHex(value);

		// Check for valid 3 or 6 character hex code
		if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(value)) {
			// Convert 3-character shorthand hex to 6-character hex only for the conversion, but keep the original value intact
			const expandedHex =
				value.length === 4
					? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
					: value;

			updateAllFormats(expandedHex, 'hex');
			setHexError(null); // Clear error if valid
		} else {
			setHexError('Invalid HEX format');
		}
	}

	function handleRgbChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setRgb(value);
		const rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
		if (rgbRegex.test(value)) {
			updateAllFormats(value, 'rgb');
		} else {
			setRgbError('Invalid RGB format');
		}
	}

	function handleHslChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setHsl(value);
		const hslRegex = /^hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/;
		if (hslRegex.test(value)) {
			updateAllFormats(value, 'hsl');
		} else {
			setHslError('Invalid HSL format');
		}
	}

	function handleHwbChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setHwb(value);
		const hwbRegex = /^hwb\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/;
		if (hwbRegex.test(value)) {
			updateAllFormats(value, 'hwb');
		} else {
			setHwbError('Invalid HWB format');
		}
	}

	function handleLchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setLch(value);
		const lchRegex = /^lch\((\d+), (\d+), (\d+)\)$/;
		if (lchRegex.test(value)) {
			updateAllFormats(value, 'lch');
		} else {
			setLchError('Invalid LCH format');
		}
	}

	function handleCmykChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setCmyk(value);
		const cmykRegex = /^cmyk\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
		if (cmykRegex.test(value)) {
			updateAllFormats(value, 'cmyk');
		} else {
			setCmykError('Invalid CMYK format');
		}
	}

	function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		setName(value);
		try {
			updateAllFormats(value, 'name');
		} catch {
			setNameError('Invalid color name');
		}
	}

	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<ColorPicker
					fullWidth
					format="rgb"
					value={colorpicker}
					onChange={(value) => {
						setColorpicker(value);
						updateAllFormats(value, 'rgb');
					}}
				/>
				<TextInput label="HEX" value={hex} onChange={handleHexChange} error={hexError} />
				<TextInput label="RGB" value={rgb} onChange={handleRgbChange} error={rgbError} />
				<TextInput label="HSL" value={hsl} onChange={handleHslChange} error={hslError} />
				<TextInput label="HWB" value={hwb} onChange={handleHwbChange} error={hwbError} />
				<TextInput label="LCH" value={lch} onChange={handleLchChange} error={lchError} />
				<TextInput label="CMYK" value={cmyk} onChange={handleCmykChange} error={cmykError} />
				<TextInput label="Name" value={name} onChange={handleNameChange} error={nameError} />
			</Stack>
		</Center>
	);
}
