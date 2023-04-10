import axios from 'axios';
import { createTask, deleteTask, getTasks, updateTask } from './tasks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('#tasks', () => {
	describe('#getTasks', () => {
		it('should return tasks when the server response status is 200', async () => {
			mockedAxios.get.mockResolvedValue({
				status: 200,
				data: 'data',
			});

			expect(await getTasks()).toBe('data');
		});

		it('should return error message when the server response status is not 200', async () => {
			const mockError = new Error('error');

			mockedAxios.get.mockRejectedValue(mockError);

			expect(await getTasks()).toBe(mockError);
		});
	});

	describe('#createTask', () => {
		const taskData = {
			id: 1,
			name: 'test',
			tags: ['test'],
			isFinished: false,
		};
		it('should return new task when the server response status is 200', async () => {
			mockedAxios.post.mockResolvedValue({
				status: 200,
				data: taskData,
			});

			expect(await createTask({ name: 'test', tags: ['test'] })).toStrictEqual(expect.objectContaining(taskData));
		});

		it('should return error message when the server response status is not 200', async () => {
			mockedAxios.post.mockRejectedValueOnce({
				response: {
					data: {
						code: 404,
						message: 'error',
					},
				},
			});
			await expect(createTask({ name: '', tags: [] })).rejects.toEqual(
				expect.objectContaining({
					response: {
						data: {
							code: 404,
							message: 'error',
						},
					},
				})
			);
		});
	});

	describe('#updateTask', () => {
		const updateData = {
			id: 1,
			name: 'updateName',
			tags: ['updateTag'],
			isFinished: true,
		};
		it('should return new task when the server response status is 200', async () => {
			mockedAxios.put.mockResolvedValue({
				status: 200,
				data: updateData,
			});

			expect(
				await updateTask(1, {
					name: 'updateName',
					tags: ['updateTag'],
					isFinished: true,
				})
			).toStrictEqual(expect.objectContaining(updateData));
		});

		it('should return error message when the server response status is not 200', async () => {
			mockedAxios.put.mockRejectedValueOnce({
				response: {
					data: {
						code: 404,
						message: 'error',
					},
				},
			});
			await expect(
				updateTask(1, {
					name: 'updateName',
					tags: ['updateTag'],
					isFinished: true,
				})
			).rejects.toEqual(
				expect.objectContaining({
					response: {
						data: {
							code: 404,
							message: 'error',
						},
					},
				})
			);
		});
	});

	describe('#deleteTask', () => {
		it('should return new task when the server response status is 200', async () => {
			mockedAxios.delete.mockResolvedValue({
				status: 200,
				data: {},
			});

			expect(await deleteTask(1)).toStrictEqual(expect.objectContaining({}));
		});

		it('should return error message when the server response status is not 200', async () => {
			mockedAxios.delete.mockRejectedValueOnce({
				response: {
					data: {
						code: 404,
						message: 'error',
					},
				},
			});
			await expect(deleteTask(1)).rejects.toEqual(
				expect.objectContaining({
					response: {
						data: {
							code: 404,
							message: 'error',
						},
					},
				})
			);
		});
	});
});
