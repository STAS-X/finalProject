
export function createStore(reducer, initialState) {
	let state = initialState;
	let listenrs = [];

	function getState() {
		return state;
	}

	function dispatch(action) {
		state = [...reducer(state, action)];
		for (let i = 0; i < listenrs.length; i++) {
			const listener = listenrs[i];
			listener();
		}
	}

	function subscribe(listener) {
		listenrs.push(listener);
	}

	return { getState, dispatch, subscribe };
}