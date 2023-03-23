import React, { useState } from 'react';
import { TagItemObj } from '../../type';
import './AddTodo.scss';

const AddTodo: React.FC = () => {
	const initTaskTags: TagItemObj = {
		study: false,
		work: false,
		life: false,
	};

	const [inputVal, setInputVal] = useState<string>('');
	const [taskTags, setTaskTags] = useState<TagItemObj>({ ...initTaskTags });

	return (
		<>
			<div className="add" data-testid="add-todo-element">
				<input
					className="add-input"
					value={inputVal}
					type="text"
					placeholder="Enter your todo item."
				/>
				<button className="add-btn">
					<i className="bi-plus-lg"></i>
				</button>
			</div>
			<div className="select-task-tags">
				{Object.keys(taskTags).map((tagItem) => (
					<span
						key={tagItem}
						className={`task-tag-item ${
							taskTags[tagItem] ? 'task-tag-item-active' : null
						}`}
					>
						{tagItem}
					</span>
				))}
			</div>
		</>
	);
};

export default AddTodo;
