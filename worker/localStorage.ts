import { AsyncLocalStorage } from 'async_hooks';

const storage = new AsyncLocalStorage<{
	ctx: ExecutionContext;
	env: Env;
	req: Request;
}>();

const getStore = () => {
	const store = storage.getStore();

	if (!store) {
		throw new Error('No store found');
	}

	return store;
};

export default {
	getStore,
	storage
};
