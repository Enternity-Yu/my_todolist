import React, { createContext, ReactNode, Reducer, useReducer } from 'react';
import { tasksReducer } from '../reducer/TasksReducer';

export const TasksContext = createContext<any>([]);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [tasks, dispatch] = useReducer<Reducer<any, any>>(tasksReducer, []);

	return <TasksContext.Provider value={{ tasks, dispatch }}>{children}</TasksContext.Provider>;
};
