import React from 'react';
import { render, screen } from '@testing-library/react';
import { TasksProvider, tasksReducer } from './TasksContext';
import { ActionType, TaskItemObj } from '../type';

describe('TaskContext', () => {
	it('renders TasksProvider component', () => {
		render(
			<TasksProvider>
				<div>Test</div>
			</TasksProvider>
		);

		expect(screen.getByText('Test')).toBeInTheDocument();
	});

	it('adds a new task to the list', () => {
		const initialState: TaskItemObj[] = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];
		const newTask: TaskItemObj = {
			id: '3',
			name: 'Task 3',
			tags: ['work'],
			isFinished: false,
		};
		const action: ActionType = {
			type: 'add',
			task: newTask,
			id: '',
			name: '',
			isFinished: false,
		};
		const expectedState = [newTask, ...initialState];

		expect(tasksReducer(initialState, action)).toEqual(expectedState);
	});

	it('check the task', () => {
		const initialState: TaskItemObj[] = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];
		const taskToToggle = { id: '1', isFinished: true };
		const action: ActionType = {
			type: 'check',
			id: taskToToggle.id,
			isFinished: taskToToggle.isFinished,
			name: '',
			task: { id: '', name: '', tags: [], isFinished: false },
		};
		const expectedState = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: true },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];

		expect(tasksReducer(initialState, action)).toEqual(expectedState);
	});

	it('update the task', () => {
		const initialState: TaskItemObj[] = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];
		const taskToUpdate = { id: '1', name: 'Updated Task 1' };
		const action: ActionType = {
			type: 'update',
			id: taskToUpdate.id,
			name: taskToUpdate.name,
			task: { id: '', name: '', tags: [], isFinished: false },
			isFinished: false,
		};
		const expectedState = [
			{ id: '1', name: 'Updated Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];

		expect(tasksReducer(initialState, action)).toEqual(expectedState);
	});

	it('delete the task', () => {
		const initialState: TaskItemObj[] = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];
		const taskToUpdate = { id: '1' };
		const action: ActionType = {
			type: 'delete',
			id: taskToUpdate.id,
			name: '',
			task: { id: '', name: '', tags: [], isFinished: false },
			isFinished: false,
		};
		const expectedState = [{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false }];

		expect(tasksReducer(initialState, action)).toEqual(expectedState);
	});

	it('default', () => {
		const initialState: TaskItemObj[] = [
			{ id: '1', name: 'Task 1', tags: ['work'], isFinished: false },
			{ id: '2', name: 'Task 2', tags: ['work'], isFinished: false },
		];
		const taskToUpdate = { id: '1' };
		const action: ActionType = {
			type: 'test',
			id: taskToUpdate.id,
			name: '',
			task: { id: '', name: '', tags: [], isFinished: false },
			isFinished: false,
		};

		expect(tasksReducer(initialState, action)).toEqual(initialState);
	});
});
