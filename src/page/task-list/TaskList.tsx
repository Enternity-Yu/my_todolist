import React, { useState } from 'react';
import { Segmented } from 'antd';
import EmptyImg from '../../assets/empty-img.png';
import './TaskList.scss';

const TaskList: React.FC = () => {
	const [showValue, setShowValue] = useState<string | number>('TO-DO');

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
			</table>
			{showEmpty}
		</div>
	);
};

export default TaskList;
