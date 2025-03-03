import { handleRpc } from 'typed-rpc/server';
import HttpError from 'use-http-error';

import localStorage from '@/worker/localStorage';
import Rpc from '@/worker/rpc';

const handler = {
	async fetch(
		req: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return localStorage.storage.run({ ctx, env, req }, async () => {
			const { pathname } = new URL(req.url);

			if (pathname.startsWith('/rpc')) {
				const rpc = new Rpc();
				const json = await req.json();

				if (json && typeof json === 'object' && 'id' in json) {
					HttpError.setDefaultContext({ id: json.id });
				}

				return Response.json(
					await handleRpc(json, rpc, {
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
					})
				);
			}

			return new Response('Not Found', {
				status: 404
			});
		});
	}
};

export { localStorage };
export default handler;
