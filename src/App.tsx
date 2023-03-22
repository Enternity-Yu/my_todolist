import React from 'react';
import './App.css';

type propsType = {
  name: string;
};
const App: React.FC<propsType> = (props) => {
	const { name } = props;
	return (
		<div>
			<h1>Hello {name}</h1>
		</div>
	);
};

export default App;
