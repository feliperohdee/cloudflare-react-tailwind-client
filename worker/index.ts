import { handleRpc } from 'typed-rpc/server';
import HttpError from 'use-http-error';

import context from '@/worker/context';
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
		req: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return context.run({ ctx, env, req }, async () => {
			try {
				const { pathname } = new URL(req.url);

				if (pathname.startsWith('/rpc')) {
					return rpcHandler(req);
				}

				throw new HttpError(404);
			} catch (err) {
				const httpError = HttpError.wrap(err as Error);

				return httpError.toResponse();
			}
		});
	}
};

export default handler;
