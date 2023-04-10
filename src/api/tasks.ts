import axios from 'axios';

export const getTasks = () => {
	return axios
		.get('http://localhost:8080/tasks')
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

export const createTask = (requestBody: any) => {
	return axios
		.post('http://localhost:8080/tasks', requestBody)
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
