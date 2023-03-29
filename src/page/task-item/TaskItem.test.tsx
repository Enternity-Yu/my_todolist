import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('render TaskItem', () => {
	const mockTaskItem = {
		id: '001',
		name: 'Todo item',
		tags: ['work'],
		isFinished: false,
	};

	beforeEach(() => render(<TaskItem key={mockTaskItem.id} taskItem={mockTaskItem} showValue={'TO-DO'} />));

	describe('show task item', () => {
		it('should show task name, tags and actions when add task successfully', () => {
			expect(screen.getByText('Todo item')).toBeInTheDocument();
			expect(screen.getByText('work')).toBeInTheDocument();
			expect(screen.getByText('Edit')).toBeInTheDocument();
			expect(screen.getByText('Delete')).toBeInTheDocument();
		});
	});
});
