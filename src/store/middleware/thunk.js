export function thunk({ getState, dispatch }) {
	return function wrapDispatch(next) {
		return function handleAction(action) {
			// Do anything here: pass the action onwards with next(action),
			// or restart the pipeline with storeAPI.dispatch(action)
			// Can also use storeAPI.getState() here
			// if (action.type === "task/complete")  {
			//     return dispatch({type: 'task/remove', payload:{...action.payload} });
			// }
			if (typeof action === 'function') {
				action(dispatch, getState);
			} else {
				return next(action);
			}
		};
	};
}
