import React from 'react';
import '@testing-library/jest-dom/';
import { render, screen, waitFor } from '@testing-library/react';
import EditModal from './EditModal';
import userEvent from '@testing-library/user-event';

describe('EditModal', () => {
	test('should display correct title when opened', () => {
		const onCancel = jest.fn();
		const onSave = jest.fn();
		const initialValue = {
			name: 'Test Task',
		};

		render(<EditModal visible={true} onCancel={onCancel} onSave={onSave} initialValue={initialValue} />);

		expect(screen.queryByText('Edit')).toBeInTheDocument();
		expect(screen.queryByText('TaskName')).toBeInTheDocument();
	});

	test('should call onSave function when click OK', async () => {
		const onCancel = jest.fn();
		const onSave = jest.fn();
		const initialValue = {
			name: 'Test Task',
		};

		render(<EditModal visible={true} onCancel={onCancel} onSave={onSave} initialValue={initialValue} />);

		userEvent.type(screen.getByTestId('change-name-input'), 'Updated Task');
		userEvent.click(screen.getByText('OK'));

		waitFor(() => expect(onSave).toHaveBeenCalledWith({ name: 'Updated Task' })).then();
	});

	test('should call onCancel function when click Cancel', () => {
		const onCancel = jest.fn();
		const onSave = jest.fn();
		const initialValue = {
			name: 'Test Task',
		};

		render(<EditModal visible={true} onCancel={onCancel} onSave={onSave} initialValue={initialValue} />);

		userEvent.click(screen.getByText('Cancel'));

		expect(onCancel).toHaveBeenCalled();
	});
});
