import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('render App', () => {
	beforeEach(() => render(<App />));

	test('should render App correctly', () => {
		expect(screen.getByTestId('app-div-element')).toBeInTheDocument();
	});

	test('should render Home component correctly', () => {
		expect(screen.getByTestId('home-element')).toBeInTheDocument();
	});
});
