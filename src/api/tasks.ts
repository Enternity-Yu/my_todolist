import axios from 'axios';
import { requestDataType } from '../type';

const URL = 'http://localhost:8080/tasks';

export const getTasks = () => {
    return axios.get(URL).then((resp) => {
        return resp.data;
    });
};

export const createTask = (requestBody: requestDataType) => {
    return axios
        .post(URL, requestBody)
        .then((resp) => {
            if (resp.status === 200) {
                return {
                    isCreated: true,
                    data: resp.data,
                };
            }
            return { isCreated: false };
        })
        .catch((error) => {
            if (error.response.data.statusCode === 400) return error.response.data;
            return Promise.reject(error);
        });
};

export const updateTask = (taskId: number, requestBody: requestDataType) => {
    return axios
        .put(`${URL}/${taskId}`, requestBody)
        .then((resp) => {
            if (resp.status === 200) {
                return {
                    isUpdated: true,
                    data: resp.data,
                };
            }
            return { isUpdated: false };
        })
        .catch((error) => {
            if (error.response.data.statusCode === 404) return error.response.data;
            return Promise.reject(error);
        });
};

export const deleteTask = (taskId: number) => {
    return axios
        .delete(`${URL}/${taskId}`)
        .then((resp) => {
            if (resp.status === 200) {
                return {
                    isDeleted: true,
                    data: resp.data,
                };
            }
            return { isDeleted: false };
        })
        .catch((error) => {
            if (error.response.data.statusCode === 404) return error.response.data;
            return Promise.reject(error);
        });
};
