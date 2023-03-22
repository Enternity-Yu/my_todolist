import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('render AddTodo', () => {
	beforeEach(() => render(<AddTodo />));

	test('should show add-input correctly', () => {
		const element: HTMLInputElement = screen.getByRole(/textbox/i);

		expect(element).toBeInTheDocument();
		expect(element).toHaveAttribute('placeholder', 'Enter your todo item.');
	});

	test('should test onChange event of add-input', () => {
		const element: HTMLInputElement = screen.getByRole(
			/textbox/i
		) as HTMLInputElement;
		fireEvent.change(element, { target: { value: 'task test' } });

		expect(element.value).toBe('task test');
	});
});
