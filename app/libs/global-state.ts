import { useState, useEffect } from 'react';

const createGlobalState = <T>(initialState: T) => {
	type Subscriber = (state: T) => void;

	let state = initialState;
	let subscribers = new Set<Subscriber>();

	const notifySubscribers = () => {
		subscribers.forEach(callback => {
			callback(state);
		});
	};

	const setState = (newState: T | ((prevState: T) => T)) => {
		const nextState =
			typeof newState === 'function'
				? (newState as (prevState: T) => T)(state)
				: newState;

		if (JSON.stringify(state) !== JSON.stringify(nextState)) {
			state = nextState;
			notifySubscribers();
		}
	};

	const resetState = () => {
		state = initialState;
		notifySubscribers();
	};

	const subscribe = (callback: Subscriber) => {
		subscribers.add(callback);

		return () => {
			subscribers.delete(callback);
		};
	};

	const store = {
		getState: () => state,
		subscribe,
		resetState
	};

	// Return tuple similar to useState: [state, setState]
	return [state, setState, store] as const;
};

const useGlobalState = <T>(
	globalState: ReturnType<typeof createGlobalState<T>>
): [T, ReturnType<typeof createGlobalState<T>>[1]] => {
	const [globalValue, setGlobalValue, store] = globalState;
	const [state, setState] = useState<T>(globalValue);

	useEffect(() => {
		const unsubscribe = store.subscribe(newState => {
			setState(newState);
		});

		return unsubscribe;
	}, [store]);

	return [state, setGlobalValue];
};

export { createGlobalState, useGlobalState };
