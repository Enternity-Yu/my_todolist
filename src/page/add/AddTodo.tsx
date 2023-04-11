import React, { ChangeEvent, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TagItemObj } from '../../type';
import './AddTodo.scss';

const AddTodo: React.FC<any> = ({ createTask }) => {
	const initTaskTags: TagItemObj = {
		study: false,
		work: false,
		life: false,
	};
	const [taskName, setTaskName] = useState<string>('');
	const [taskTags, setTaskTags] = useState<TagItemObj>({ ...initTaskTags });
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const createNewTaskToList = async (): Promise<void> => {
		if (!taskName) {
			setIsShowError(true);
			setErrorMessage('Please enter the correct task content.');
			return;
		}
		if (!Object.keys(taskTags).filter((key) => taskTags[key]).length) {
			setIsShowError(true);
			setErrorMessage('Please select the task-tag.');
			return;
		}
		await createTask({
			name: taskName.trim(),
			tags: Object.keys(taskTags).filter((key) => taskTags[key]),
		});
	};

	const handleCreateTask = async (): Promise<void> => {
		await createNewTaskToList();
		setTaskName('');
		setTaskTags({ ...initTaskTags });
	};

	const handleClickTaskTag = (tagKey: string, isSelected: boolean): void => {
		setTaskTags((pre: TagItemObj) => ({ ...pre, [tagKey]: !isSelected }));
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setTaskName(event.target.value);
		setIsShowError(false);
	};

	return (
		<div data-testid="add-todo-element">
			<div className="add">
				<input
					data-testid="add-input-element"
					className="add-input"
					value={taskName}
					type="text"
					placeholder="Enter your todo item."
					onChange={handleChangeInput}
				/>
				<button className="add-btn" onClick={handleCreateTask} data-testid="add-button-element">
					<PlusOutlined />
				</button>
				{isShowError && <span className="error-hint">{errorMessage}</span>}
			</div>
			<div className="select-task-tags">
				{Object.keys(taskTags).map((tagItem) => (
					<span
						key={tagItem}
						className={`task-tag-item ${taskTags[tagItem] ? 'task-tag-item-active' : null}`}
						onClick={() => handleClickTaskTag(tagItem, taskTags[tagItem])}>
						{tagItem}
					</span>
				))}
			</div>
		</div>
	);
};

export default AddTodo;
