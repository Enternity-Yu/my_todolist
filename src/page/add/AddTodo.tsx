import React, { ChangeEvent, useState } from 'react';

const AddTodo: React.FC = () => {
	const [inputVal, setInputVal] = useState<string>('');
	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputVal(event.target.value);
	};

	return (
		<>
			<div className="add" data-testid="add-todo-element">
				<input
					value={inputVal}
					type="text"
					placeholder="Enter your todo item."
					onChange={handleChangeInput}
				/>
			</div>
		</>
	);
};

export default AddTodo;
