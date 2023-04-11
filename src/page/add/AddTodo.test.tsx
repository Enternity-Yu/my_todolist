import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from './AddTodo';

const createNewTask = jest.fn();
describe('render AddTodo', () => {
	let inputElement: HTMLInputElement;
	let addButtonElement: HTMLButtonElement;

	beforeEach(() => {
		render(<AddTodo createTask={createNewTask} />);
		inputElement = screen.getByRole('textbox');
		addButtonElement = screen.getByRole('button');
	});

	it('should render add-todo component successfully', () => {
		expect(inputElement).toBeInTheDocument();
		expect(addButtonElement).toBeInTheDocument();
		expect(screen.queryByText('study')).toBeInTheDocument();
		expect(screen.queryByText('work')).toBeInTheDocument();
		expect(screen.queryByText('life')).toBeInTheDocument();
	});

	it('should show error message if name is empty and tag is not empty when click add button', async () => {
		await act(() => {
			userEvent.click(screen.getByText('work'));
			userEvent.click(addButtonElement);
		});

		expect(screen.queryByText('Please enter the correct task content.') as HTMLElement).toBeInTheDocument();
	});

	it('should show error message if name is not empty and tag is empty when click add button', async () => {
		await act(() => {
			userEvent.type(inputElement, 'New todo item');
			userEvent.click(addButtonElement);
		});

		expect(screen.queryByText('Please select the task-tag.')).toBeInTheDocument();
	});

	it('should not show error message if name and tag are not empty when click add button', async () => {
		await act(() => {
			userEvent.click(screen.getByText('work'));
			userEvent.type(inputElement, 'New todo item');
			userEvent.click(addButtonElement);
		});

		expect(screen.queryByText('Please enter the correct task content.')).not.toBeInTheDocument();
		expect(screen.queryByText('Please select the task-tag.')).not.toBeInTheDocument();
		expect(createNewTask).toHaveBeenCalledWith({
			name: 'New todo item',
			tags: ['work'],
		});
	});
});
