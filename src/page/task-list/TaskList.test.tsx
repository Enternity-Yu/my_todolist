import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('render TaskList', () => {
	render(<TaskList />);

	it('should render task-list component successfully', () => {
		expect(screen.getByText(/TO-DO/i)).toBeInTheDocument();
		expect(screen.getByText(/Completed/i)).toBeInTheDocument();
		expect(screen.getByText(/Task Name/i)).toBeInTheDocument();
		expect(screen.getByText(/Task Tags/i)).toBeInTheDocument();
		expect(screen.getByText(/Actions/i)).toBeInTheDocument();
	});
});
