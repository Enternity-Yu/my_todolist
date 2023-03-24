import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('render TaskList', () => {
	beforeEach(() => render(<TaskList />));

	it('should render task-list component successfully', () => {
		expect(screen.getByText('TO-DO')).toBeInTheDocument();
		expect(screen.getByText('Completed')).toBeInTheDocument();
		expect(screen.getByText('Task Name')).toBeInTheDocument();
		expect(screen.getByText('Task Tags')).toBeInTheDocument();
		expect(screen.getByText('Actions')).toBeInTheDocument();
	});

	it('should show empty message and image when task-list is empty', () => {
		expect(screen.queryByText('Go ahead and add a new task to your Todo-List!')).toBeInTheDocument();
	});

	it('should have task-actions-head-active class when change Segmented', () => {
		act(() => userEvent.click(screen.getByText('Completed')));

		expect(screen.queryByText('Actions')).not.toBeInTheDocument();
	});
});
