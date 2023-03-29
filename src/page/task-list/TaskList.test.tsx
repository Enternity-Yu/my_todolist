import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import { TasksContext } from '../TasksContext';

describe('render TaskList', () => {
	const mockTask = [
		{
			id: '001',
			name: 'Todo item',
			tags: ['work'],
			isFinished: false,
		},
	];
	const mockValue = {
		tasks: mockTask,
		dispatch: jest.fn(),
	};

	describe('show taskList', () => {
		it('should render task-list component successfully', () => {
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<TaskList />{' '}
				</TasksContext.Provider>
			);
			expect(screen.getByText('TO-DO')).toBeInTheDocument();
			expect(screen.getByText('Completed')).toBeInTheDocument();
			expect(screen.getByText('Task Name')).toBeInTheDocument();
			expect(screen.getByText('Task Tags')).toBeInTheDocument();
			expect(screen.getByText('Actions')).toBeInTheDocument();
		});

		it('should have task-actions-head-active class when change Segmented', async () => {
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<TaskList />{' '}
				</TasksContext.Provider>
			);
			await act(() => userEvent.click(screen.getByText('Completed')));

			await waitFor(() => expect(screen.queryByText('Actions')).not.toBeInTheDocument());
		});
	});

	describe('check task', () => {
		it('should checked task when check task', async () => {
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<TaskList />{' '}
				</TasksContext.Provider>
			);
			await userEvent.click(screen.getByTestId('task-item-checkbox'));

			await waitFor(() =>
				expect(mockValue.dispatch).toHaveBeenCalledWith({
					type: 'check',
					id: mockValue.tasks[0].id,
					isFinished: true,
				})
			);
		});
	});

	describe('edit task', () => {
		it('should show edit-prompt-box when click edit button', async () => {
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<TaskList />{' '}
				</TasksContext.Provider>
			);

			await userEvent.click(screen.getByTestId('edit-button-element'));

			await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
		});

		it('should show old task on TO-DO-List when click Cancel', async () => {
			await waitFor(() =>
				render(
					<TasksContext.Provider value={mockValue}>
						{' '}
						<TaskList />{' '}
					</TasksContext.Provider>
				)
			);

			await userEvent.click(screen.getByText('Edit'));
			await waitFor(() => userEvent.click(screen.getByText('Cancel')));

			await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			await expect(screen.getByText('Todo item')).toBeInTheDocument();
		});

		it('should show new task when click OK', async () => {
			await waitFor(() =>
				render(
					<TasksContext.Provider value={mockValue}>
						{' '}
						<TaskList />{' '}
					</TasksContext.Provider>
				)
			);

			await waitFor(() => userEvent.click(screen.getByText('Edit')));
			await waitFor(() => userEvent.type(screen.getByTestId('change-name-input'), 'Updated Task'));
			await waitFor(() => userEvent.click(screen.getByText('OK')));

			await waitFor(() => expect(mockValue.dispatch).toHaveBeenCalled());
			await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		});
	});

	describe('delete task', () => {
		it('should show delete-prompt-box when click delete button', async () => {
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<TaskList />{' '}
				</TasksContext.Provider>
			);

			await act(() => userEvent.click(screen.getByText('Delete')));

			await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
		});

		it('should show this task on TO-DO-List when click No', async () => {
			await waitFor(() =>
				render(
					<TasksContext.Provider value={mockValue}>
						{' '}
						<TaskList />{' '}
					</TasksContext.Provider>
				)
			);

			await userEvent.click(screen.getByText('Delete'));
			await waitFor(() => userEvent.click(screen.getByText('No')));

			await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		});

		it('should not show this task when click Yes', async () => {
			await waitFor(() =>
				render(
					<TasksContext.Provider value={mockValue}>
						{' '}
						<TaskList />{' '}
					</TasksContext.Provider>
				)
			);

			await userEvent.click(screen.getByText('Delete'));
			await waitFor(() => userEvent.click(screen.getByText('Yes')));

			await waitFor(() =>
				expect(mockValue.dispatch).toHaveBeenCalledWith({
					type: 'delete',
					id: mockValue.tasks[0].id,
				})
			);
			await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		});
	});
});
