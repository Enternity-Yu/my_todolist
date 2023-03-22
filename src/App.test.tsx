import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('render', () => {
	test('should render App correctly', () => {
		const mockName = 'World';

		render(<App name={mockName} />);

		expect(screen.getByRole('heading')).toHaveTextContent('Hello World');
	});
});
