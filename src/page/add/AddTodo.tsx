import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ulid } from 'ulid';
import { TasksContext } from '../../context/TasksContext';
import { TagItemObj, TaskItemObj } from '../../type';
import './AddTodo.scss';

const AddTodo: React.FC = () => {
	const { dispatch } = useContext(TasksContext);
	const initTaskTags: TagItemObj = {
		study: false,
		work: false,
		life: false,
	};

	const [inputVal, setInputVal] = useState<string>('');
	const [taskName, setTaskName] = useState<string>('');
	const [taskTags, setTaskTags] = useState<TagItemObj>({ ...initTaskTags });
	const [selectedTags, setSelectedTags] = useState<string[]>(['']);
	const [newTask, setNewTask] = useState<TaskItemObj>();
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const createFirstUpload = useRef(true);
	const addFirstUpload = useRef(true);

	useEffect(() => {
		if (createFirstUpload.current) {
			createFirstUpload.current = false;
			return;
		}
		setNewTaskItemAndResetValue();
	}, [taskName, selectedTags]);

	useEffect(() => {
		if (addFirstUpload.current) {
			addFirstUpload.current = false;
			return;
		}
		createNewTaskToList();
	}, [newTask]);

	const createNewTaskToList = (): void => {
		if (!newTask?.name) {
			setIsShowError(true);
			setErrorMessage('Please enter the correct task content.');
			return;
		}
		if (!newTask?.tags.length) {
			setIsShowError(true);
			setErrorMessage('Please select the task-tag.');
			return;
		}
		dispatch({ type: 'add', task: newTask });
	};

	const setNewTaskItemAndResetValue = (): void => {
		setNewTask({
			id: '1',
			name: taskName,
			tags: selectedTags,
			isFinished: false,
		});
		setInputVal('');
		setTaskTags(initTaskTags);
	};

	const handleCreateTask = (): void => {
		setTaskName(inputVal.trim());
		setSelectedTags(Object.keys(taskTags).filter((key) => taskTags[key]));
	};

	const handleClickTaskTag = (tagKey: string, isSelected: boolean): void => {
		setTaskTags((pre: TagItemObj) => ({ ...pre, [tagKey]: !isSelected }));
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setInputVal(event.target.value);
		setIsShowError(false);
	};

	return (
		<div data-testid="add-todo-element">
			<div className="add">
				<input
					data-testid="add-input-element"
					className="add-input"
					value={inputVal}
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
