import { ActionType, TaskItemObj } from '../type';
import _ from 'lodash';
import { deleteTask, getTasks } from '../api/tasks';

export const tasksReducer = (tasks: TaskItemObj[], action: ActionType) => {
	const taskItemId = _.findIndex(tasks, ['id', action.id]);
	const newTasks = [...tasks];
	switch (action.type) {
		// case 'add':
		// return [action.task, ...tasks];
		case 'check': {
			newTasks[taskItemId] = {
				...newTasks[taskItemId],
				isFinished: action.isFinished,
			};
			return newTasks;
		}
		case 'update': {
			newTasks[taskItemId] = { ...newTasks[taskItemId], name: action.name };
			return newTasks;
		}
		case 'delete':
			return tasks.filter((taskItem: TaskItemObj) => taskItem.id !== action.id);
		default:
			return tasks;
	}
};
