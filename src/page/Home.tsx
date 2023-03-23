import React from 'react';
import AddTodo from './add/AddTodo';
import './Home.scss';
import TaskList from './task-list/TaskList';

const Home = () => {
	return (
		<div className="home" data-testid="home-element">
			<div className="title">
				<h1>Welcome To The Todo-List</h1>
				<h3>Use this to manage your work and life, easily!</h3>
			</div>
			<AddTodo />
			<TaskList />
		</div>
	);
};

export default Home;
