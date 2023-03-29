export type TaskItemObj = {
	id: string;
	name: string;
	tags: string[];
	isFinished: boolean;
};

export type TagItemObj = {
	[key: string]: boolean;
};

export type ActionType = {
	type: string;
	task: TaskItemObj;
	id: string;
	name: string;
	isFinished: boolean;
};

export type EditFormValues = {
	name: string;
};
