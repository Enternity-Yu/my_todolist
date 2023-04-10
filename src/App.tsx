import React from 'react';
import Home from './page/Home';
import './App.scss';
import { createTask, getTasks } from './api/tasks';
import { log } from 'util';

const App: React.FC = () => {
	getTasks().then((r) => console.log('get', r));
	createTask({ name: 'test1', tags: ['test1', 'test2'] }).then((r) => console.log('create', r));
	return (
		<div className="App">
			<Home />
		</div>
	);
};

export default App;
