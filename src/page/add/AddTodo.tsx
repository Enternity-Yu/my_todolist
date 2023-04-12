import * as React from 'react';
import { FundProjectionScreenOutlined, PlusOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import { TagItemObj } from '../../type';

const AddTodo = () => {
	const initTaskTags: TagItemObj = {
		study: false,
		work: false,
		life: false,
	};

	const [taskTags, setTaskTags] = useState<TagItemObj>({ ...initTaskTags });
	const [isShowError, setIsShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [taskName, setTaskName] = useState<string>('');

	const handleCreateTask = (): void => {
		if (!taskName) {
			setIsShowError(true);
			setErrorMessage('Please enter the correct task content.');
		}
		if (!Object.keys(taskTags).filter((key) => taskTags[key]).length) {
			setIsShowError(true);
			setErrorMessage('Please select the task-tag.');
		}
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		setTaskName(event.target.value);
	};
	const handleClickTag = (key: string, value: boolean): void => {
		setTaskTags((pre: TagItemObj) => ({ ...pre, [key]: !value }));
	};

	return (
		<div>
			<div>
				<input type="text" value={taskName} placeholder="Enter your todo item." onChange={handleChangeInput} />
				<button onClick={handleCreateTask}>
					<PlusOutlined />
				</button>
				{isShowError && <span>{errorMessage}</span>}
			</div>
			<div>
				{Object.keys(taskTags).map((tag) => (
					<span key={tag} onClick={() => handleClickTag(tag, taskTags[tag])}>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
};

export default AddTodo;
