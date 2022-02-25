import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import {
	completeTask,
	deleteTask,
	changeTask,
	loadTasks,
	getTasks,
	addTask,
	getTasksLoading,
} from './store/task';

import { createStore } from './store/store';
import { getError } from './store/errors';

const store = createStore();

const App = () => {
	const state = useSelector(getTasks());
	const isLoading = useSelector(getTasksLoading());
	const error = useSelector(getError());
	const dispatch = useDispatch();
	// const completeTask = ({ taskId }) => {
	// 	store.dispatch((dispatch, getState) => {
	// 		console.log(dispatch, getState);
	// 		store.dispatch(taskCompleted(taskId));
	// 	});
	// };

	// const changeTitle = ({ taskId, title }) => {
	// 	store.dispatch(titleChanged(taskId, title));
	// };

	// const deleteTask = ({ taskId }) => {
	// 	store.dispatch(taskDelete(taskId));
	// };

	useEffect(() => {
		dispatch(loadTasks());
		// subscribe(() => setState(store.getState()));
	}, []);

	if (isLoading) return <h1>App is loading...</h1>;
	if (error) return <p>{`App loaded with error [${error}]`}</p>;

	return (
		<React.Fragment>
			<h1>React REDUX application starting</h1>
			<button style={{ marginLeft: '4px' }} onClick={() => dispatch(addTask())}>
				Add New Task
			</button>
			<ul>
				{state.map((item) => (
					<li key={item.id}>
						<h3>{item.title}</h3>
						<h4>Completed: {item.completed.toString()}</h4>
						<button
							style={{ marginRight: '4px' }}
							onClick={() => dispatch(completeTask(item.id))}
						>
							{' '}
							Complete{' '}
						</button>
						<button
							style={{ marginLeft: '4px' }}
							onClick={() =>
								dispatch(changeTask(item.id, `Title for id[${item.id}]`))
							}
						>
							Change Title
						</button>
						<button
							style={{ marginLeft: '4px' }}
							onClick={() => dispatch(deleteTask(item.id))}
						>
							Delete Task
						</button>
						<hr></hr>
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<App />
		</Provider>
	</React.Fragment>,
	document.getElementById('root')
);
