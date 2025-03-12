import HttpError from 'use-http-error';

import context from '@/worker/context';
import DurableObject from '@/worker/durable-object';
import rpcHandler from '@/worker/rpc';

const handler = {
	async fetch(
		request: Request,
		env: Env,
		executionContext: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

		HttpError.setIncludeStack(env.PRODUCTION === 'false');

		return context.run(
			{
				env,
				executionContext,
				request,
				url
			},
			() => {
				try {
					if (
						request.method === 'POST' &&
						url.pathname === '/api/rpc'
					) {
						return rpcHandler(request);
					}

					return env.ASSETS.fetch(request);
				} catch (err) {
					const httpError = HttpError.wrap(err as Error);

					return httpError.toResponse();
				}
			}
		);
	}
};

export { DurableObject };
export default handler;
