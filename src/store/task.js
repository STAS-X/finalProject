import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		recived(state, action) {
			state.entities = action.payload;
			state.isLoading = false;
		},
		complete(state, action) {
			return {
				...state,
				entities: state.entities.map((item) => {
					if (item.id === action.payload.id) {
						return { ...item, completed: true };
					} else return item;
				}),
			};
		},
		remove(state, action) {
			return {
				...state,
				entities: state.entities.filter(
					(item) => item.id !== action.payload.id
				),
			};
		},
		append(state, action) {
			//state.isLoading = false;
			//state.entities.push(action.payload);
			return {
				...state,
				isLoading: false,
				entities: [...state.entities, action.payload],
			};
		},
		change(state, action) {
			return {
				...state,
				entities: state.entities.map((item) => {
					if (item.id === action.payload.id) {
						return { ...item, title: action.payload.title };
					} else return item;
				}),
			};
		},
		taskRequested(state) {
			state.isLoading = true;
			//state.error = null;
		},
		taskRequestedFailed(state, action) {
			state.isLoading = false;
			//state.error = action.payload;
		},
	},
});

const { actions, reducer: taskReducer } = taskSlice;
const {
	complete,
	change,
	remove,
	append,
	recived,
	taskRequested,
	taskRequestedFailed,
} = actions;

export const loadTasks = () => async (dispatch) => {
	dispatch(taskRequested());
	try {
		const data = await todosService.fetch();
		dispatch(recived(data));
	} catch (error) {
		dispatch(taskRequestedFailed());
		dispatch(setError(error.message));
	}
};

export const addTask = () => async (dispatch, getState) => {
	dispatch(taskRequested());
	try {
		const data = await todosService.post({
			title: `Test Task for append todos [${
				getState().tasks.entities.length + 1
			}]`,
			completed: false,
		});
		dispatch(append({ ...data, id: getState().tasks.entities.length + 1 }));
	} catch (error) {
		dispatch(taskRequestedFailed());
		dispatch(setError(error.message));
	}
};

export default taskReducer;

export const completeTask = (id) => (dispatch, getState) => {
	dispatch(complete({ id }));
};

export const changeTask = (id, title) => (dispatch, getState) => {
	dispatch(change({ id, title }));
};

export const deleteTask = (id) => (dispatch, getState) => {
	dispatch(remove({ id }));
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoading = () => (state) => state.tasks.isLoading;

// function taskCompleted(id) {
// 	return complete({ id });
// }

// function taskDelete(id) {
// 	return remove({ id });
// }

// function titleChanged(id, title) {
// 	return change({ id, title });
// }

// export function taskReducer1(state = [], action) {
// 	switch (action.type) {
// 		case complete.type: {
// 			return [
// 				...state.map((item) => {
// 					if (item.id === action.payload.id) {
// 						return { ...item, completed: true };
// 					} else return item;
// 				}),
// 			];
// 		}
// 		case remove.type: {
// 			return [...state.filter((item) => item.id !== action.payload.id)];
// 		}
// 		case change.type: {
// 			return [
// 				...state.map((item) => {
// 					if (item.id === action.payload.id) {
// 						return { ...item, title: action.payload.title };
// 					} else return item;
// 				}),
// 			];
// 		}
// 		default:
// 			return state;
// 	}
// }
