'use client';

import { Center, NumberInput, Stack } from '@mantine/core';
import { useState } from 'react';

export default function TemperatureConverter() {
	const [celsius, setCelsius] = useState<string | number>('');
	const [fahrenheit, setFahrenheit] = useState<string | number>('');
	const [kelvin, setKelvin] = useState<string | number>('');
	const [rankine, setRankine] = useState<string | number>('');
	const [delisle, setDelisle] = useState<string | number>('');
	const [newton, setNewton] = useState<string | number>('');
	const [reaumur, setReaumur] = useState<string | number>('');
	const [romer, setRomer] = useState<string | number>('');

	// Conversion functions
	const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
	const fahrenheitToCelsius = (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9;
	const celsiusToKelvin = (celsius: number) => celsius + 273.15;
	const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;
	const celsiusToRankine = (celsius: number) => ((celsius + 273.15) * 9) / 5;
	const rankineToCelsius = (rankine: number) => ((rankine - 491.67) * 5) / 9;
	const celsiusToDelisle = (celsius: number) => ((100 - celsius) * 3) / 2;
	const delisleToCelsius = (delisle: number) => 100 - (delisle * 2) / 3;
	const celsiusToNewton = (celsius: number) => (celsius * 33) / 100;
	const newtonToCelsius = (newton: number) => (newton * 100) / 33;
	const celsiusToReaumur = (celsius: number) => (celsius * 4) / 5;
	const reaumurToCelsius = (reaumur: number) => (reaumur * 5) / 4;
	const celsiusToRomer = (celsius: number) => (celsius * 21) / 40 + 7.5;
	const romerToCelsius = (romer: number) => ((romer - 7.5) * 40) / 21;

	// General handle change function
	const handleTemperatureChange = (type: string, value: string | number) => {
		const numValue = typeof value === 'string' ? parseFloat(value) : value;

		switch (type) {
			case 'celsius':
				setCelsius(numValue);
				setFahrenheit(celsiusToFahrenheit(numValue));
				setKelvin(celsiusToKelvin(numValue));
				setRankine(celsiusToRankine(numValue));
				setDelisle(celsiusToDelisle(numValue));
				setNewton(celsiusToNewton(numValue));
				setReaumur(celsiusToReaumur(numValue));
				setRomer(celsiusToRomer(numValue));
				break;
			case 'fahrenheit':
				setFahrenheit(numValue);
				setCelsius(fahrenheitToCelsius(numValue));
				setKelvin(celsiusToKelvin(fahrenheitToCelsius(numValue)));
				setRankine((fahrenheitToCelsius(numValue) * 9) / 5 + 491.67);
				setDelisle(celsiusToDelisle(fahrenheitToCelsius(numValue)));
				setNewton(celsiusToNewton(fahrenheitToCelsius(numValue)));
				setReaumur(celsiusToReaumur(fahrenheitToCelsius(numValue)));
				setRomer(celsiusToRomer(fahrenheitToCelsius(numValue)));
				break;
			case 'kelvin':
				setKelvin(numValue);
				setCelsius(kelvinToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(kelvinToCelsius(numValue)));
				setRankine(celsiusToRankine(kelvinToCelsius(numValue)));
				setDelisle(celsiusToDelisle(kelvinToCelsius(numValue)));
				setNewton(celsiusToNewton(kelvinToCelsius(numValue)));
				setReaumur(celsiusToReaumur(kelvinToCelsius(numValue)));
				setRomer(celsiusToRomer(kelvinToCelsius(numValue)));
				break;
			case 'rankine':
				setRankine(numValue);
				setCelsius(rankineToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(rankineToCelsius(numValue)));
				setKelvin(celsiusToKelvin(rankineToCelsius(numValue)));
				setDelisle(celsiusToDelisle(rankineToCelsius(numValue)));
				setNewton(celsiusToNewton(rankineToCelsius(numValue)));
				setReaumur(celsiusToReaumur(rankineToCelsius(numValue)));
				setRomer(celsiusToRomer(rankineToCelsius(numValue)));
				break;
			case 'delisle':
				setDelisle(numValue);
				setCelsius(delisleToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(delisleToCelsius(numValue)));
				setKelvin(celsiusToKelvin(delisleToCelsius(numValue)));
				setRankine(celsiusToRankine(delisleToCelsius(numValue)));
				setNewton(celsiusToNewton(delisleToCelsius(numValue)));
				setReaumur(celsiusToReaumur(delisleToCelsius(numValue)));
				setRomer(celsiusToRomer(delisleToCelsius(numValue)));
				break;
			case 'newton':
				setNewton(numValue);
				setCelsius(newtonToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(newtonToCelsius(numValue)));
				setKelvin(celsiusToKelvin(newtonToCelsius(numValue)));
				setRankine(celsiusToRankine(newtonToCelsius(numValue)));
				setDelisle(celsiusToDelisle(newtonToCelsius(numValue)));
				setReaumur(celsiusToReaumur(newtonToCelsius(numValue)));
				setRomer(celsiusToRomer(newtonToCelsius(numValue)));
				break;
			case 'reaumur':
				setReaumur(numValue);
				setCelsius(reaumurToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(reaumurToCelsius(numValue)));
				setKelvin(celsiusToKelvin(reaumurToCelsius(numValue)));
				setRankine(celsiusToRankine(reaumurToCelsius(numValue)));
				setDelisle(celsiusToDelisle(reaumurToCelsius(numValue)));
				setNewton(celsiusToNewton(reaumurToCelsius(numValue)));
				setRomer(celsiusToRomer(reaumurToCelsius(numValue)));
				break;
			case 'romer':
				setRomer(numValue);
				setCelsius(romerToCelsius(numValue));
				setFahrenheit(celsiusToFahrenheit(romerToCelsius(numValue)));
				setKelvin(celsiusToKelvin(romerToCelsius(numValue)));
				setRankine(celsiusToRankine(romerToCelsius(numValue)));
				setDelisle(celsiusToDelisle(romerToCelsius(numValue)));
				setNewton(celsiusToNewton(romerToCelsius(numValue)));
				setReaumur(celsiusToReaumur(romerToCelsius(numValue)));
				break;
			default:
				break;
		}
	};

	return (
		<Center>
			<Stack w={'50%'} align="stretch" justify="center" gap="md">
				<NumberInput
					label="Celsius (°C)"
					value={celsius}
					onChange={(value) => handleTemperatureChange('celsius', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Fahrenheit (°F)"
					value={fahrenheit}
					onChange={(value) => handleTemperatureChange('fahrenheit', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Kelvin (K)"
					value={kelvin}
					onChange={(value) => handleTemperatureChange('kelvin', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Rankine (°R)"
					value={rankine}
					onChange={(value) => handleTemperatureChange('rankine', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Delisle (°De)"
					value={delisle}
					onChange={(value) => handleTemperatureChange('delisle', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Newton (°N)"
					value={newton}
					onChange={(value) => handleTemperatureChange('newton', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Réaumur (°Ré)"
					value={reaumur}
					onChange={(value) => handleTemperatureChange('reaumur', value)}
					decimalScale={2}
				/>
				<NumberInput
					label="Rømer (°Rø)"
					value={romer}
					onChange={(value) => handleTemperatureChange('romer', value)}
					decimalScale={2}
				/>
			</Stack>
		</Center>
	);
}
