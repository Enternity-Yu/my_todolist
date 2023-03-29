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

		await waitFor(() => {
			expect(screen.getByText('Welcome To The Todo-List')).toBeInTheDocument();
			expect(screen.getByText('Use this to manage your work and life, easily!')).toBeInTheDocument();
			expect(screen.getByTestId('add-todo-element')).toBeInTheDocument();
			expect(screen.getByTestId('task-list-element')).toBeInTheDocument();
		});
	});
});
