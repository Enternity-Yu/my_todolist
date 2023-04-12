import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import AddTodo from './AddTodo';
import userEvent from '@testing-library/user-event';

describe('AddTodo', function () {
	beforeEach(() => render(<AddTodo />));

	it('should render add-todo component correctly', () => {
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.queryByText('study')).toBeInTheDocument();
		expect(screen.queryByText('life')).toBeInTheDocument();
		expect(screen.queryByText('work')).toBeInTheDocument();
	});

	it('should show error message if name is empty and tag is not empty when click add button', async () => {
		await waitFor(() => {
			userEvent.click(screen.getByText('study'));
			userEvent.click(screen.getByRole('button'));
		});

		const element = (await waitFor(() => screen.queryByText('Please select the task tag.'))) as HTMLElement;
		console.log(111);
		expect(element).toBeInTheDocument();
	});

	it('should show error message if tag is empty and name is not empty when click add button', async () => {
		const { queryByText } = render(<AddTodo />);

		await waitFor(() => {
			userEvent.type(screen.getByRole('textbox'), 'New todo item');
			userEvent.click(screen.getByRole('button'));
		});

		expect(queryByText('Please enter the correct task content') as HTMLElement).toBeInTheDocument();
	});

	it('should not show error message if name and tag are not empty when click add button', () => {
		throw new Error();
	});
});
