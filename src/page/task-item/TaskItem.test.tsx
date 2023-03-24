import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '../add/AddTodo';
import TaskItem from './TaskItem';

describe('render TaskItem', () => {
	beforeEach(() => {
		render(<AddTodo />);
		render(<TaskItem />);
		act(() => {
			userEvent.click(screen.getByText('work'));
			userEvent.type(screen.getByRole('textbox'), 'Todo item');
			userEvent.click(screen.getByRole('button'));
		});
	});

	describe('show task item', () => {
		it('should show task name, tags and actions when add task successfully', () => {
			expect(screen.getByText('Todo item')).toBeInTheDocument();
			expect(screen.getByText('work')).toBeInTheDocument();
			expect(screen.getByText('Edit')).toBeInTheDocument();
			expect(screen.getByText('Delete')).toBeInTheDocument();
		});
	});

	describe('check task', () => {
		it('should not show checked task on Todo-List when check task', () => {
			act(() => {
				userEvent.click(screen.getByRole('check'));
			});

			expect(screen.getByText('Todo item')).not.toBeInTheDocument();
		});

		it('should show checked task on Completed-List when check task', () => {
			act(() => {
				userEvent.click(screen.getByRole('check'));
				userEvent.click(screen.getByText('Completed'));
			});

			expect(screen.getByText('Todo item')).toBeInTheDocument();
		});
	});

	describe('edit task', () => {
		it('should show edit-prompt-box when click edit button', () => {
			act(() => {
				userEvent.click(screen.getByText('Edit'));
			});

			expect(screen.getByText('Edit Task Name')).toBeInTheDocument();
			expect(screen.getByText('Cancel')).toBeInTheDocument();
			expect(screen.getByText('OK')).toBeInTheDocument();
		});

		it('should show old task name when click cancel', () => {
			act(() => {
				userEvent.click(screen.getByText('Edit'));
				userEvent.click(screen.getByText('Cancel'));
			});

			expect(screen.getByText('Todo item')).toBeInTheDocument();
		});

		it('should show new task name when enter new content and click OK', () => {
			act(() => {
				userEvent.click(screen.getByText('Edit'));
				userEvent.type(screen.getByTestId('new-task-name'), 'New todo item');
				userEvent.click(screen.getByText('OK'));
			});

			expect(screen.getByText('New todo item')).toBeInTheDocument();
		});
	});

	describe('delete task', () => {
		it('should show delete-prompt-box when click delete button', () => {
			act(() => {
				userEvent.click(screen.getByText('Delete'));
			});

			expect(screen.getByText('Are you sure delete this task?')).toBeInTheDocument();
			expect(screen.getByText('Yes')).toBeInTheDocument();
			expect(screen.getByText('No')).toBeInTheDocument();
		});

		it('should show this task on TO-DO-List when click No', () => {
			act(() => {
				userEvent.click(screen.getByText('Delete'));
				userEvent.click(screen.getByText('No'));
			});

			expect(screen.getByText('Todo item')).toBeInTheDocument();
		});

		it('should not show this task when click Yes', () => {
			act(() => {
				userEvent.click(screen.getByText('Delete'));
				userEvent.click(screen.getByText('Yes'));
			});

			expect(screen.getByText('Todo item')).not.toBeInTheDocument();
		});
	});
});
