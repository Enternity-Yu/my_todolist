import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { TasksContext } from './TasksContext';
import { waitFor } from '@testing-library/dom';

describe('Home', () => {
	const mockTask = [
		{
			id: '001',
			name: 'Todo item',
			tags: ['work'],
			isFinished: false,
		},
	];
	const mockValue = { tasks: mockTask, dispatch: jest.fn() };

	it('should render the title and subtitle correctly', async () => {
		await waitFor(() =>
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<Home />{' '}
				</TasksContext.Provider>
			)
		);

		const title = screen.getAllByRole('heading');

		expect(title[0]).toHaveTextContent('Welcome To The Todo-List');
		expect(title[1]).toHaveTextContent('Use this to manage your work and life, easily!');
	});

	it('should render the AddTodo component correctly', async () => {
		await waitFor(() =>
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<Home />{' '}
				</TasksContext.Provider>
			)
		);

		expect(screen.getByTestId('add-todo-element')).toBeInTheDocument();
	});

	it('should render the TaskList component correctly', async () => {
		await waitFor(() =>
			render(
				<TasksContext.Provider value={mockValue}>
					{' '}
					<Home />{' '}
				</TasksContext.Provider>
			)
		);
		expect(screen.getByTestId('task-list-element')).toBeInTheDocument();
	});
});
