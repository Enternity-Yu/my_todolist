import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('render App', () => {
	beforeEach(() => render(<App />));

	test('should render App correctly', () => {
		const app_div_element = screen.getByTestId('app-div-element');

		expect(app_div_element).toBeInTheDocument();
	});

	test('should render Home component correctly', () => {
		const home_element = screen.getByTestId('home-element');

		expect(home_element).toBeInTheDocument();
	});
});
