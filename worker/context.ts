import { AsyncLocalStorage } from 'async_hooks';

type ContextStore = {
	lang: string;
};

class Context {
	private storage = new AsyncLocalStorage<ContextStore>();

	get store() {
		const store = this.storage.getStore();

		if (!store) {
			throw new Error('No store found');
		}

		return store;
	}

	run<R>(args: ContextStore, fn: () => R): R;
	run<R>(args: ContextStore, fn: () => Promise<R>): Promise<R> {
		return this.storage.run(args, fn);
	}
}

export default new Context();
