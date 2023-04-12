import React, { useEffect, useState } from 'react';
import AddTodo from './add/AddTodo';
import TaskList from './task-list/TaskList';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks';
import './Home.scss';

const Home: React.FC = () => {
	const [taskList, setTaskList] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllTasks = async (): Promise<void> => {
		const res = await getTasks();
		setTaskList(res);
	};

	const createNewTask = async (data: any): Promise<void> => {
		setLoading(true);
		await createTask(data);
		setLoading(false);
	};

	const update = async (id: number, data: any): Promise<void> => {
		setLoading(true);
		await updateTask(id, data);
		setLoading(false);
	};

	const remove = async (id: number): Promise<void> => {
		setLoading(true);
		await deleteTask(id);
		setLoading(false);
	};

	useEffect(() => {
		if (!loading) getAllTasks().then();
	}, [loading]);

	return (
		<div className="home" data-testid="home-element">
			<div className="title">
				<h1>Welcome To The Todo-List</h1>
				<h3>Use this to manage your work and life, easily!</h3>
			</div>
			<AddTodo />
			<TaskList taskList={taskList} updateTask={update} deleteTask={remove} />
		</div>
	);
};

export default Home;
