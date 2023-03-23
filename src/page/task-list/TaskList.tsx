import React from 'react';
import {Segmented} from 'antd';

const TaskList: React.FC = () => {
	return (<div data-testid="task-list-element">
		<div>
			<Segmented options={['TO-DO', 'Completed']} size='large' block={true}/>
		</div>
		<table className='task-list'>
			<thead>
				<tr>
					<th></th>
					<th>Task Name</th>
					<th>Task Tags</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>
	</div>);
};

export default TaskList;
