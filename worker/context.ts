import { AsyncLocalStorage } from 'async_hooks';
import headers from 'use-request-utils/headers';

class Context {
	private storage = new AsyncLocalStorage<{
		ctx: ExecutionContext;
		env: Env;
		req: Request;
		responseHeaders: Headers;
	}>();

	get store() {
		const store = this.storage.getStore();

		if (!store) {
			throw new Error('No store found');
		}

		return store;
	}

	get() {
		const store = this.store;

		return {
			ctx: store.ctx,
			env: store.env,
			req: store.req
		};
	}

	getResponseHeaders() {
		return this.store.responseHeaders;
	}

	mergeResponseHeaders(newHeaders: Headers) {
		this.store.responseHeaders = headers.merge(
			this.store.responseHeaders,
			newHeaders
		);
	}

	run<R>(
		args: {
			ctx: ExecutionContext;
			env: Env;
			req: Request;
		},
		fn: () => Promise<R>
	): Promise<R> {
		return this.storage.run(
			{
				ctx: args.ctx,
				env: args.env,
				req: args.req,
				responseHeaders: new Headers()
			},
			fn
		);
	}

	setResponseHeaders(newHeaders: Headers) {
		this.store.responseHeaders = newHeaders;
	}
}

export default new Context();
