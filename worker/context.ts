import { AsyncLocalStorage } from 'async_hooks';

import ContextStorage from '@/worker/context-storage';

class Context {
	public storage = new AsyncLocalStorage<ContextStorage>();

	get store() {
		const store = this.storage.getStore();

		if (!store) {
			throw new Error('No store found');
		}

		return store;
	}

	run<R>(store: ContextStorage, fn: () => R): R;
	run<R>(store: ContextStorage, fn: () => Promise<R>): Promise<R> {
		return this.storage.run(store, fn);
	}
}

export default new Context();
