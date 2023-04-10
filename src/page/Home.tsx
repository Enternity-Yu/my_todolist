import React from 'react';
import AddTodo from './add/AddTodo';
import TaskList from './task-list/TaskList';
import { TasksProvider } from '../context/TasksContext';
import './Home.scss';

const Home = () => {
	return (
		<TasksProvider>
			<div className="home" data-testid="home-element">
				<div className="title">
					<h1>Welcome To The Todo-List</h1>
					<h3>Use this to manage your work and life, easily!</h3>
				</div>
				<AddTodo /> <TaskList />
			</div>{' '}
		</TasksProvider>
	);
};

export default Home;
