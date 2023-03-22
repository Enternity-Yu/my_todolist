import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('render Home', () => {
	beforeEach(() => render(<Home />));

	test('should show TodoList title correctly', () => {
		const element = screen.getAllByRole('heading');

		expect(element[0]).toHaveTextContent('Welcome To The Todo-List');
		expect(element[1]).toHaveTextContent(
			'Use this to manage your work and life, easily!'
		);
	});
});
