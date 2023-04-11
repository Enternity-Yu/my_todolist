import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from './TaskItem';

const updateTask = jest.fn();
const deleteTask = jest.fn();

describe('render TaskItem', () => {
	const mockTaskItem = {
		id: 1,
		name: 'Todo item',
		tags: 'work',
		isFinished: false,
	};
	describe('show task item', () => {
		it('should show task name, tags and actions when add task successfully', () => {
			render(
				<TaskItem
					key={mockTaskItem.id}
					taskItem={mockTaskItem}
					showValue={'TO-DO'}
					updateTask={updateTask}
					deleteTask={deleteTask}
				/>
			);
			expect(screen.queryByText('Todo item')).toBeInTheDocument();
			expect(screen.queryByText('work')).toBeInTheDocument();
			expect(screen.queryByText('Edit')).toBeInTheDocument();
			expect(screen.queryByText('Delete')).toBeInTheDocument();
		});
		it('should show task name, tags and actions when add task successfully', () => {
			render(
				<TaskItem
					key={mockTaskItem.id}
					taskItem={mockTaskItem}
					showValue={'Completed'}
					updateTask={updateTask}
					deleteTask={deleteTask}
				/>
			);
			expect(screen.queryByText('Todo item')).toBeInTheDocument();
			expect(screen.queryByText('work')).toBeInTheDocument();
			expect(screen.queryByText('Edit')).not.toBeInTheDocument();
			expect(screen.queryByText('Delete')).not.toBeInTheDocument();
		});
	});
});
