import React, { useEffect, useState } from 'react';
import AddTodo from './add/AddTodo';
import TaskList from './task-list/TaskList';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks';
import './Home.scss';

const Home = () => {
	const [taskList, setTaskList] = useState([]);
	useEffect(() => {
		getAllTasks();
	}, []);

	const getAllTasks = () => {
		getTasks().then((resp) => {
			setTaskList(resp);
		});
	};
	const createNewTask = async (data: any) => {
		await createTask(data);
		await getAllTasks();
	};

	const update = async (id: number, data: any) => {
		await updateTask(id, data);
		await getAllTasks();
	};

	const remove = async (id: number) => {
		await deleteTask(id);
		await getAllTasks();
	};

	return (
		<div className="home" data-testid="home-element">
			<div className="title">
				<h1>Welcome To The Todo-List</h1>
				<h3>Use this to manage your work and life, easily!</h3>
			</div>
			<AddTodo createTask={createNewTask} />
			<TaskList taskList={taskList} updateTask={update} deleteTask={remove} />
		</div>
	);
};

export default Home;
