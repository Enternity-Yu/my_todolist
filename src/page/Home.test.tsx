import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

jest.mock('../api/tasks', () => ({
	getTasks: jest.fn(() => Promise.resolve([{ id: 1, name: 'mockName', tags: 'mockTag', isFinished: false }])),
	createTask: jest.fn(),
	updateTask: jest.fn(),
	deleteTask: jest.fn(),
}));
const getAllTasks = jest.fn(() => getTasks());

describe('Home', () => {
	beforeEach(() => render(<Home />));
	it('should render the title and subtitle correctly', async () => {
		expect(screen.getByText('Welcome To The Todo-List')).toBeInTheDocument();
		expect(screen.getByText('Use this to manage your work and life, easily!')).toBeInTheDocument();
		expect(screen.getByTestId('add-todo-element')).toBeInTheDocument();
		expect(screen.getByTestId('task-list-element')).toBeInTheDocument();
	});

	it('calls getTasks API function', async () => {
		await getAllTasks();

		expect(getTasks).toHaveBeenCalled();
	});

	it('calls createTask API function and calls getAllTasks', async () => {
		const data = { name: 'New Task', tags: ['test'] };
		const createNewTask = jest.fn((data) => {
			createTask(data);
			getAllTasks();
		});

		await createNewTask(data);

		expect(createTask).toHaveBeenCalledWith(data);
		expect(getAllTasks).toHaveBeenCalled;
	});

	it('calls updateTask API function and calls getAllTasks', async () => {
		const id = 1;
		const data = { name: 'Task 1 Updated', tags: ['update'], isFinished: true };
		const update = jest.fn((id, data) => {
			updateTask(id, data);
			getAllTasks();
		});

		await update(id, data);

		expect(updateTask).toHaveBeenCalledWith(id, data);
		expect(getAllTasks).toHaveBeenCalled;
	});

	it('calls deleteTask API function and calls getAllTasks', async () => {
		const id = 1;
		const remove = jest.fn((id) => {
			deleteTask(id);
			getAllTasks();
		});

		await remove(id);

		expect(deleteTask).toHaveBeenCalledWith(id);
		expect(getAllTasks).toHaveBeenCalled();
	});
});
