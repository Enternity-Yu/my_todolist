import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Space, Tag, Tooltip } from 'antd';
import { EditFormValues, TaskItemObj } from '../../type';
import { TasksContext } from '../../context/TasksContext';
import EditModal from './components/EditModal';

import './TaskItem.scss';
import DeleteModal from './components/DeleteModal';
import { deleteTask, updateTask } from '../../api/tasks';

type middleProps = {
	taskItem: TaskItemObj;
	showValue: string | number;
};

const TaskItem: React.FC<middleProps> = (props: middleProps) => {
	const { taskItem, showValue } = props;
	const { dispatch } = useContext(TasksContext);
	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

	const tagsArr = taskItem.tags.split(',');

	const handleChangeTaskStatus = async (taskItemId: number, event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		await updateTask(taskItemId, {
			name: taskItem.name,
			tags: taskItem.tags,
			isFinished: event.target.checked,
		});
		// dispatch({
		// 	type: 'check',
		// 	id: taskItemId,
		// 	isFinished: event.target.checked,
		// });
	};

	const handleOpenEditModal = () => {
		setIsShowEditModal(true);
	};

	const handleOffEditModal = () => {
		setIsShowEditModal(false);
	};

	const handleEditSave = async (values: EditFormValues) => {
		await updateTask(taskItem.id, {
			name: values.name,
			tags: taskItem.tags,
			isFinished: taskItem.isFinished,
		});
		// dispatch({ type: 'update', id: taskItem.id, name: values.name });
	};

	const handleOpenDeleteModal = () => {
		setIsShowDeleteModal(true);
	};

	const handleOffDeleteModal = () => {
		setIsShowDeleteModal(false);
	};
	const handleDeleteOk = () => {
		deleteTask(taskItem.id).then(() => {
			handleOffDeleteModal();
		});
		// dispatch({ type: 'delete', id: taskItem.id });
	};

	return (
		<tr key={taskItem?.id}>
			<td>
				<input
					data-testid="task-item-checkbox"
					className="task-checkbox"
					type="checkbox"
					key={taskItem?.id}
					checked={taskItem?.isFinished}
					onChange={(event) => handleChangeTaskStatus(taskItem?.id, event)}
				/>
			</td>
			<td className="task-name-body">
				<Tooltip title={taskItem.name} placement={'topLeft'} overlayStyle={{ maxWidth: 600 }}>
					{' '}
					<span className="task-name-content">{taskItem?.name}</span>{' '}
				</Tooltip>
			</td>
			<td className="task-tags-body">
				{tagsArr?.map((tagItem: string, index: number) => (
					<Tag className="task-tags" color="cyan" key={index}>
						{tagItem}
					</Tag>
				))}
			</td>
			{showValue === 'TO-DO' && (
				<td className="task-actions-body">
					<Space size="small">
						{' '}
						<Button onClick={handleOpenEditModal} size="small" data-testid="edit-button-element">
							{' '}
							Edit{' '}
						</Button>{' '}
						<Button onClick={handleOpenDeleteModal} size="small">
							{' '}
							Delete{' '}
						</Button>{' '}
					</Space>
				</td>
			)}{' '}
			{isShowEditModal && (
				<EditModal
					visible={isShowEditModal}
					onCancel={handleOffEditModal}
					onSave={handleEditSave}
					initialValue={taskItem}
				/>
			)}{' '}
			{isShowDeleteModal && (
				<DeleteModal visible={isShowDeleteModal} onCancel={handleOffDeleteModal} onOk={handleDeleteOk} />
			)}
		</tr>
	);
};

export default TaskItem;
