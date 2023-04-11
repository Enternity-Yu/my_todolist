import React, { useState } from 'react';
import { Segmented } from 'antd';
import { TaskItemObj } from '../../type';
import TaskItem from '../task-item/TaskItem';
import EmptyImg from '../../assets/empty-img.png';
import './TaskList.scss';

type middleProps = {
	taskList: TaskItemObj[];
	updateTask: (id: number, data: any) => void;
	deleteTask: (id: number) => void;
};

const TaskList: React.FC<middleProps> = (props) => {
	const { taskList, updateTask, deleteTask } = props;
	const [showValue, setShowValue] = useState<string | number>('TO-DO');

	const taskListContent = taskList
		.filter((taskItem: TaskItemObj) => {
			return showValue === 'TO-DO' ? !taskItem?.isFinished : taskItem?.isFinished;
		})
		.reverse()
		.map((taskItem: TaskItemObj, index: number) => (
			<TaskItem
				key={index}
				taskItem={taskItem}
				showValue={showValue}
				updateTask={updateTask}
				deleteTask={deleteTask}
			/>
		));

	const showEmpty = (
		<div className="tasks-empty">
			<img className="empty-img" src={EmptyImg} alt={'empty'} />
			<div>
				<i className="empty-text"> Go ahead and add a new task to your Todo-List! </i>
			</div>
		</div>
	);

	return (
		<div data-testid="task-list-element">
			<div className="task-segmented">
				<Segmented
					className="task-segmented-content"
					options={['TO-DO', 'Completed']}
					size="large"
					block={true}
					value={showValue}
					onChange={setShowValue}
				/>
			</div>
			<table className="task-list">
				<thead>
					<tr>
						<th className="task-check-head"></th>
						<th className="task-name-head">Task Name</th>
						<th className="task-tags-head">Task Tags</th>
						{showValue === 'TO-DO' && <th className="task-actions-head">Actions</th>}
					</tr>
				</thead>
				<tbody>{!taskList.length || taskListContent}</tbody>
			</table>
			{!taskList.length && showEmpty}
		</div>
	);
};

export default TaskList;
