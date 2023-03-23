import React from 'react';
import { render, screen } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('App', () => {
	render(<AddTodo />);

	it('should render component successful', () => {
		expect(screen.getByRole(/textbox/i)).toBeInTheDocument();
		expect(screen.getByRole(/button/i)).toBeInTheDocument();
		expect(screen.getByText(/study/i)).toBeInTheDocument();
		expect(screen.getByText(/work/i)).toBeInTheDocument();
		expect(screen.getByText(/life/i)).toBeInTheDocument();
	});
});
