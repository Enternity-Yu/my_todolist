import React, { ChangeEvent, useState } from 'react';
import './AddTodo.scss';

const AddTodo: React.FC = () => {
	const [inputVal, setInputVal] = useState<string>('');
	const [isShowError, setIsShowError] = React.useState<boolean>(false);

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputVal(event.target.value);
		setIsShowError(false);
	};

	return (
		<>
			<div className="add" data-testid="add-todo-element">
				<input
					className="add-input"
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
