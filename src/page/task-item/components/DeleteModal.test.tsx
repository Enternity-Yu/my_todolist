import React from 'react';
import '@testing-library/jest-dom/';
import { render, screen, waitFor } from '@testing-library/react';
import DeleteModal from './DeleteModal';
import userEvent from '@testing-library/user-event';
import { log } from 'util';

const onCancel = jest.fn();
const onOk = jest.fn();

describe('DeleteModal', () => {
	beforeEach(() => render(<DeleteModal visible={true} onCancel={onCancel} onOk={onOk} />));

	it('should display correct text when opened', () => {
		expect(screen.queryByText('Confirm Delete')).toBeInTheDocument();
		expect(screen.queryByText('Are you sure delete this task?')).toBeInTheDocument();
		expect(screen.queryByText('Yes')).toBeInTheDocument();
		expect(screen.queryByText('No')).toBeInTheDocument();
	});

	it('should call onOk function when click Yes', async () => {
		userEvent.click(screen.getByText('Yes'));

		waitFor(() => expect(onOk).toHaveBeenCalled()).then();
	});

	it('should call onCancel function when click Cancel', () => {
		userEvent.click(screen.getByText('No'));

		expect(onCancel).toHaveBeenCalled();
	});
});
