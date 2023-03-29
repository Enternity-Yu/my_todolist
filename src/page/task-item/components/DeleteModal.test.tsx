import React from 'react';
import '@testing-library/jest-dom/';
import { render, screen, waitFor } from '@testing-library/react';
import DeleteModal from './DeleteModal';
import userEvent from '@testing-library/user-event';

describe('DeleteModal', () => {
	test('should display correct text when opened', () => {
		const onCancel = jest.fn();
		const onOk = jest.fn();

		render(<DeleteModal visible={true} onCancel={onCancel} onOk={onOk} />);

		expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
		expect(screen.getByText('Are you sure delete this task?')).toBeInTheDocument();
		expect(screen.getByText('Yes')).toBeInTheDocument();
		expect(screen.getByText('No')).toBeInTheDocument();
	});

	test('should call onOk function when click Yes', async () => {
		const onCancel = jest.fn();
		const onOk = jest.fn();

		render(<DeleteModal visible={true} onCancel={onCancel} onOk={onOk} />);
		userEvent.click(screen.getByText('Yes'));

		waitFor(() => expect(onOk).toHaveBeenCalled()).then();
	});

	test('should call onCancel function when click Cancel', () => {
		const onCancel = jest.fn();
		const onOk = jest.fn();

		render(<DeleteModal visible={true} onCancel={onCancel} onOk={onOk} />);

		userEvent.click(screen.getByText('No'));

		expect(onCancel).toHaveBeenCalled();
	});
});
