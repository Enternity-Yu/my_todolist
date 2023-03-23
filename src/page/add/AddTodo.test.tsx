import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('render AddTodo', () => {
	let inputElement: HTMLInputElement;
	let addButtonElement: HTMLButtonElement;

	beforeEach(() => {
		render(<AddTodo />);
		inputElement = screen.getByRole(/textbox/i);
		addButtonElement = screen.getByRole(/button/i);
	});

	it('should render add-todo component successfully', () => {
		expect(inputElement).toBeInTheDocument();
		expect(addButtonElement).toBeInTheDocument();
		expect(screen.getByText('study')).toBeInTheDocument();
		expect(screen.getByText('work')).toBeInTheDocument();
		expect(screen.getByText('life')).toBeInTheDocument();
	});

	it('should show error message if name is empty and tag is not empty when click add button', () => {
		fireEvent.change(inputElement, { target: { value: ' ' } });
		fireEvent.click(screen.getByText('work'));
		fireEvent.click(addButtonElement);

		expect(screen.queryByText('Please enter the correct task content.')).toBeInTheDocument();
	});

	it('should show error message if name is not empty and tag is empty when click add button', () => {
		fireEvent.change(inputElement, { target: { value: 'New todo item' } });
		fireEvent.click(addButtonElement);

		expect(screen.queryByText('Please select the task-tag.')).toBeInTheDocument();
	});

	it('should not show error message if name and tag are not empty when click add button', () => {
		fireEvent.change(inputElement, { target: { value: 'New todo item' } });
		fireEvent.click(screen.getByText('work'));
		fireEvent.change(addButtonElement);

		expect(screen.queryByText('Please enter the correct task content.')).not.toBeInTheDocument();
		expect(screen.queryByText('Please select the task-tag.')).not.toBeInTheDocument();
	});
});
