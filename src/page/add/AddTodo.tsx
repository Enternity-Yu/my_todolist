import React, { ChangeEvent, useState } from 'react';
import './AddTodo.scss';

const AddTodo: React.FC = () => {
	const [inputVal, setInputVal] = useState<string>('');
	const [isShowError, setIsShowError] = useState<boolean>(false);

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputVal(event.target.value);
	};

	return (
		<>
			<div className="add" data-testid="add-todo-element">
				<input
					className={`add-input ${isShowError ? 'add-input-error' : null}`}
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
