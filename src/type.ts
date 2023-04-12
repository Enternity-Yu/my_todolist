export type TaskItemObj = {
	id: number;
	name: string;
	tags: any;
	isFinished: boolean;
};

export type NewTaskObj = {
	name: string;
	tags: string[];
};

export type TagItemObj = {
	[key: string]: boolean;
};

export type ActionType = {
	type: string;
	task: any;
	id: number;
	name: string;
	isFinished: boolean;
};

export type EditFormValues = {
	name: string;
};

export type requestDataType = {
	name: string;
	tags: string[];
	isFinished?: boolean;
};
