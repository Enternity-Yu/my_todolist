import React from 'react';
import Home from './page/Home';
import './App.css';

const App: React.FC = () => {
	return (
		<div className="App" data-testid="app-div-element">
			<Home />
		</div>
	);
};

export default App;
