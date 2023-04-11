import axios from 'axios';
const url = 'http://localhost:8080/tasks';

export const getTasks = () => {
	return axios.get(url).then((resp) => {
		return resp.data;
	});
};

export const createTask = (requestBody: any) => {
	return axios
		.post(url, requestBody)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

export const updateTask = (taskId: number, requestBody: any) => {
	return axios
		.put(`http://localhost:8080/tasks/${taskId}`, requestBody)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

export const deleteTask = (taskId: number) => {
	return axios
		.delete(`http://localhost:8080/tasks/${taskId}`)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
