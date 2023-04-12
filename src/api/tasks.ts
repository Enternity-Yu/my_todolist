import axios from 'axios';
import { requestDataType } from '../type';

const url = 'http://localhost:8080/tasks';

export const getTasks = () => {
	return axios.get(url).then((resp) => {
		return resp.data;
	});
};

export const createTask = (requestBody: requestDataType) => {
	return axios
		.post(url, requestBody)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

export const updateTask = (taskId: number, requestBody: requestDataType) => {
	return axios
		.put(`url/${taskId}`, requestBody)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

export const deleteTask = (taskId: number) => {
	return axios
		.delete(`url/${taskId}`)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
