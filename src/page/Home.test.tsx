import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import userEvent from '@testing-library/user-event';

jest.mock('../api/tasks');
(getTasks as jest.Mock).mockResolvedValue([{ id: 1, name: 'test', tags: 'test', isFinished: false }]);

describe('Home', () => {
	beforeEach(() => {
		render(<Home />);
	});

	it('should render the title and subtitle correctly', async () => {
		expect(screen.getByText('llllllllllll To The Todo-List')).toBeInTheDocument();
		expect(screen.getByText('Use this to manage your work and life, easily!')).toBeInTheDocument();
		expect(screen.getByTestId('add-todo-element')).toBeInTheDocument();
		expect(screen.getByTestId('task-list-element')).toBeInTheDocument();
	});

	it('should get taskList when render Home', () => {
		expect(getTasks).toBeCalled();
	});

	it('calls createTask API function', async () => {
		const data = { name: 'New Task', tags: ['work'] };

		await waitFor(() => userEvent.click(screen.getByText('work')));
		await waitFor(() => userEvent.type(screen.getByRole('textbox'), 'New Task'));
		await waitFor(() => userEvent.click(screen.getByRole('button')));

		expect(createTask).toHaveBeenCalledWith(data);
	});

	it('calls updateTask API function', async () => {
		const id = 1;
		const data = { name: 'test', tags: 'test', isFinished: true };

		await waitFor(() => userEvent.click(screen.getByTestId('task-item-checkbox')));

		expect(updateTask).toHaveBeenCalledWith(id, data);
	});

	it('calls deleteTask API function', async () => {
		await waitFor(() => userEvent.click(screen.getByText('Delete')));
		await waitFor(() => userEvent.click(screen.getByText('Yes')));

		expect(deleteTask).toHaveBeenCalledWith(1);
	});
});

//https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
