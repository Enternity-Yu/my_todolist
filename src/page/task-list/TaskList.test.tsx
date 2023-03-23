import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('render TaskList', () => {
	beforeEach(() => render(<TaskList />));

	it('should render task-list component successfully', () => {
		expect(screen.getByText(/TO-DO/i)).toBeInTheDocument();
		expect(screen.getByText(/Completed/i)).toBeInTheDocument();
		expect(screen.getByText(/Task Name/i)).toBeInTheDocument();
		expect(screen.getByText(/Task Tags/i)).toBeInTheDocument();
		expect(screen.getByText(/Actions/i)).toBeInTheDocument();
	});

	it('should show empty message and image when task-list is empty', () => {
		expect(
			screen.queryByText('Go ahead and add a new task to your Todo-List!')
		).toBeInTheDocument();
	});

	it('should have task-actions-head-active class when change Segmented', () => {
		fireEvent.click(screen.getByText(/Completed/i));

		expect(screen.queryByText(/Actions/i)).toHaveClass(
			'task-actions-head-active'
		);
	});
});
