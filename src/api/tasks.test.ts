import axios from 'axios';
import { createTask, deleteTask, getTasks, updateTask } from './tasks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('#tasks', () => {
	afterEach(() => jest.clearAllMocks());
	describe('#getTasks', () => {
		it('should return tasks when the server response status is 200', async () => {
			mockedAxios.get.mockResolvedValue({
				status: 200,
				data: 'data',
			});

			expect(await getTasks()).toBe('data');
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

			expect(await createTask({ name: 'test', tags: ['test'] })).toEqual({ isCreated: true, data: taskData });
		});

		it('should return new task when the server response status is not 200', async () => {
			mockedAxios.post.mockResolvedValue({
				status: 203,
				data: taskData,
			});

			expect(await createTask({ name: 'test', tags: ['test'] })).toEqual({ isCreated: false });
		});

		it('should return error message when the server response status is 400', async () => {
			mockedAxios.post.mockRejectedValueOnce({
				response: {
					data: {
						statusCode: 400,
						message: 'error',
					},
				},
			});
			await expect(await createTask({ name: '', tags: [] })).toEqual({
				statusCode: 400,
				message: 'error',
			});
		});

		it('should return error when the server response status is not 400', async () => {
			mockedAxios.post.mockRejectedValueOnce({
				response: {
					data: {
						code: 123,
						message: 'error',
					},
				},
			});
			await expect(createTask({ name: '', tags: [] })).rejects.toEqual({
				response: {
					data: {
						code: 123,
						message: 'error',
					},
				},
			});
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
			).toEqual({
				isUpdated: true,
				data: updateData,
			});
		});

		it('should return new task when the server response status is 200', async () => {
			mockedAxios.put.mockResolvedValue({
				status: 203,
				data: updateData,
			});

			expect(
				await updateTask(1, {
					name: 'updateName',
					tags: ['updateTag'],
					isFinished: true,
				})
			).toEqual({
				isUpdated: false,
			});
		});

		it('should return error message when the server response status is 404', async () => {
			mockedAxios.put.mockRejectedValueOnce({
				response: {
					data: {
						statusCode: 404,
						message: 'error',
					},
				},
			});
			await expect(
				await updateTask(1, {
					name: 'updateName',
					tags: ['updateTag'],
					isFinished: true,
				})
			).toEqual({
				statusCode: 404,
				message: 'error',
			});
		});

		it('should return error when the server response status is not 404', async () => {
			mockedAxios.put.mockRejectedValueOnce({
				response: {
					data: {
						code: 123,
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
			).rejects.toEqual({
				response: {
					data: {
						code: 123,
						message: 'error',
					},
				},
			});
		});
	});

	describe('#deleteTask', () => {
		it('should return new task when the server response status is 200', async () => {
			mockedAxios.delete.mockResolvedValue({
				status: 200,
				data: {},
			});

			expect(await deleteTask(1)).toEqual({ isDeleted: true, data: {} });
		});

		it('should return new task when the server response status is 200', async () => {
			mockedAxios.delete.mockResolvedValue({
				status: 203,
				data: {},
			});

			expect(await deleteTask(1)).toEqual({ isDeleted: false });
		});

		it('should return error message when the server response status is 404', async () => {
			mockedAxios.delete.mockRejectedValue({
				response: {
					data: {
						statusCode: 404,
						message: 'error',
					},
				},
			});
			await expect(await deleteTask(1)).toEqual({
				statusCode: 404,
				message: 'error',
			});
		});

		it('should return error when the server response status is not 404', async () => {
			mockedAxios.delete.mockRejectedValueOnce({
				response: {
					data: {
						code: 123,
						message: 'error',
					},
				},
			});
			await expect(deleteTask(1)).rejects.toEqual({
				response: {
					data: {
						code: 123,
						message: 'error',
					},
				},
			});
		});
	});
});
