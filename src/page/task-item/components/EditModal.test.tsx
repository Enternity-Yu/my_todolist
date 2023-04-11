import React from 'react';
import '@testing-library/jest-dom/';
import { render, screen, waitFor } from '@testing-library/react';
import EditModal from './EditModal';
import userEvent from '@testing-library/user-event';

const onCancel = jest.fn();
const onSave = jest.fn();
const initialValue = { name: 'Test Task' };

describe('EditModal', () => {
	beforeEach(() =>
		render(<EditModal visible={true} onCancel={onCancel} onSave={onSave} initialValue={initialValue} />)
	);

	it('should display correct title when opened', () => {
		expect(screen.queryByText('Edit')).toBeInTheDocument();
		expect(screen.queryByText('TaskName')).toBeInTheDocument();
	});

	it('should call onSave function when click OK', async () => {
		userEvent.type(screen.getByTestId('change-name-input'), 'Updated Task');
		userEvent.click(screen.getByText('OK'));

		waitFor(() => expect(onSave).toHaveBeenCalledWith({ name: 'Updated Task' })).then();
	});

	it('should call onCancel function when click Cancel', () => {
		userEvent.click(screen.getByText('Cancel'));

		expect(onCancel).toHaveBeenCalled();
	});
});
