import React, { ChangeEvent, useState } from 'react';
import { Button, Space, Tag, Tooltip } from 'antd';
import { EditFormValues, TaskItemObj } from '../../type';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import './TaskItem.scss';

type middleProps = {
	taskItem: TaskItemObj;
	showValue: string | number;
	updateTask: (id: number, data: any) => void;
	deleteTask: (id: number) => void;
};

const TaskItem: React.FC<middleProps> = (props) => {
	const { taskItem, showValue, updateTask, deleteTask } = props;

	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

	const tagsArr = taskItem.tags.split(',');

	const handleChangeTaskStatus = async (taskItemId: number, event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		await updateTask(taskItemId, { name: taskItem.name, tags: taskItem.tags, isFinished: event.target.checked });
	};

	const handleEditModal = (isShow: boolean) => {
		setIsShowEditModal(isShow);
	};

	const handleEditSave = async (values: EditFormValues): Promise<void> => {
		await updateTask(taskItem.id, {
			name: values.name,
			tags: taskItem.tags,
			isFinished: taskItem.isFinished,
		});
	};

	const handleDeleteModal = (isShow: boolean) => {
		setIsShowDeleteModal(isShow);
	};

	const handleDeleteOk = async () => {
		await deleteTask(taskItem.id);
		handleDeleteModal(false);
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
						<Button onClick={() => handleEditModal(true)} size="small" data-testid="edit-button-element">
							Edit
						</Button>
						<Button onClick={() => handleDeleteModal(true)} size="small">
							Delete
						</Button>
					</Space>
				</td>
			)}
			{isShowEditModal && (
				<EditModal
					visible={isShowEditModal}
					onCancel={() => handleEditModal(false)}
					onSave={handleEditSave}
					initialValue={taskItem}
				/>
			)}
			{isShowDeleteModal && (
				<DeleteModal
					visible={isShowDeleteModal}
					onCancel={() => handleDeleteModal(false)}
					onOk={handleDeleteOk}
				/>
			)}
		</tr>
	);
};

export default TaskItem;
