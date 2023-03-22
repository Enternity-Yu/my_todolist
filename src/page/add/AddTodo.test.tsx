import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('render AddTodo', () => {
	let element: HTMLInputElement;
	beforeEach(() => {
		render(<AddTodo />);
		element = screen.getByRole(/textbox/i) as HTMLInputElement;
	});

	test('should show add-input correctly', () => {
		expect(element).toBeInTheDocument();
		expect(element).toHaveAttribute('placeholder', 'Enter your todo item.');
	});

	test('test onChange event of add-input', () => {
		fireEvent.change(element, { target: { value: 'task test' } });

		expect(element.value).toBe('task test');
	});

	test('should have add-input class when isShowError is false ', () => {
		expect(element).toHaveClass('add-input');
	});
});
