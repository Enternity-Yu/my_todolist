import React from 'react';
import { render, screen } from '@testing-library/react';
import { TasksProvider } from './TasksContext';

describe('TasksContext', () => {
	it('renders TasksProvider component', () => {
		render(
			<TasksProvider>
				<div>Test</div>s{' '}
			</TasksProvider>
		);

		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
