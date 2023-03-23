import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('render Home', () => {
	render(<Home />);

	it('should show TodoList title correctly', () => {
		const element = screen.getAllByRole('heading');

		expect(element[0]).toHaveTextContent('Welcome To The Todo-List');
		expect(element[1]).toHaveTextContent(
			'Use this to manage your work and life, easily!'
		);
	});

	it('should render Add-Todo component correctly', () => {
		const element = screen.getByTestId('add-todo-element');

		expect(element).toBeInTheDocument();
	});
});
