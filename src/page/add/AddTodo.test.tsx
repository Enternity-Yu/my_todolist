import React from 'react';
import { render, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('render AddTodo', () => {
	beforeEach(() => render(<AddTodo />));

	test('should show add-input correctly', () => {
		const element = screen.getByRole(/textbox/i);

		expect(element).toBeInTheDocument();
		expect(element).toHaveAttribute('placeholder', 'Enter your todo item.');
	});
});
