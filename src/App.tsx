import React from 'react';
import Home from './page/Home';
import './App.scss';
import { createTask, deleteTask, getTasks, updateTask } from './api/tasks';

const App: React.FC = () => {
	getTasks().then((r) => console.log('get', r));
	// createTask({ name: 'test1', tags: ['test1', 'test2'] }).then((r) => console.log('create', r));
	updateTask(10, {
		name: 'updateTest',
		tags: ['updateTest'],
		isFinished: true,
	}).then((r) => console.log('update', r));
	// deleteTask(9).then((r) => console.log('delete', r));
	return (
		<div className="App">
			<Home />
		</div>
	);
};

export default App;
