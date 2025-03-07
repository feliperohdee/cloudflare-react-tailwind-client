import { handleRpc } from 'typed-rpc/server';
import HttpError from 'use-http-error';

import context from '@/worker/context';
import DurableObject from '@/worker/durable-object';
import Rpc from '@/worker/rpc';

const rpcHandler = async (req: Request) => {
	const rpc = new Rpc();
	const json = await req.json();

	if (json && typeof json === 'object' && 'id' in json) {
		HttpError.setDefaultContext({ id: json.id });
	}

	const res = await handleRpc(json, rpc, {
		getErrorCode: err => {
			if (err instanceof HttpError) {
				return err.status;
			}

			return 500;
		},
		getErrorData: err => {
			if (err instanceof HttpError) {
				return err.context;
			}

			return null;
		}
	});

	return Response.json(res, {
		headers: context.getResponseHeaders()
	});
};

const handler = {
	async fetch(
		request: Request,
		env: Env,
		executionContext: ExecutionContext
	): Promise<Response> {
		return context.run({ env, executionContext, request }, () => {
			try {
				const { pathname } = new URL(request.url);

				if (request.method === 'POST' && pathname === '/api/rpc') {
					return rpcHandler(request);
				}

				return env.ASSETS.fetch(request);
			} catch (err) {
				const httpError = HttpError.wrap(err as Error);

				return httpError.toResponse();
			}
		});
	}
};

export { DurableObject };
export default handler;
