import cookies from 'use-request-utils/cookies';
import HttpError from 'use-http-error';
import i18n from '@/i18n';
import isPlainObject from 'lodash/isPlainObject';
import Rpc from 'use-request-utils/rpc';
import util from 'use-request-utils/util';

import context from '@/worker/context';
import DurableObject from '@/worker/durable-object';
import RootRpc from '@/worker/rpc';

const fetchRpc = async (rpc: Rpc, req: Request): Promise<Response> => {
	try {
		if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
			throw new HttpError(
				400,
				'Invalid content type, must be multipart/form-data'
			);
		}

		const form = await req.formData();
		const formBody = form.get('body');
		const formRpc = form.get('rpc') as string;
		const rpcRequest: Rpc.Request = util.safeParse(formRpc);

		if (!isPlainObject(rpcRequest)) {
			throw new HttpError(400);
		}

		return await rpc!.fetch(
			rpcRequest,
			new Request(req.url, {
				body: formBody || null,
				cf: req.cf,
				headers: req.headers,
				method: req.method
			})
		);
	} catch (err) {
		return HttpError.response(err as Error | HttpError);
	}
};

const handler = {
	async fetch(
		request: Request,
		env: Env,
		executionContext: ExecutionContext
	): Promise<Response> {
		HttpError.setIncludeStack(env.PRODUCTION === 'false');

		const url = new URL(request.url);
		const lang = (() => {
			const lang =
				url.searchParams.get('lang') ||
				cookies.get(request.headers, 'lang') ||
				request.headers.get('accept-language') ||
				'';

			return i18n.supports(lang) ? lang : 'en-us';
		})();

		const res = await context.run(
			{
				env,
				executionContext,
				lang
			},
			() => {
				try {
					i18n.load(lang);

					if (
						request.method === 'POST' &&
						url.pathname === '/api/rpc'
					) {
						const rpc = new RootRpc();

						return fetchRpc(rpc, request);
					}

					return env.ASSETS.fetch(request);
				} catch (err) {
					const httpError = HttpError.wrap(err as Error);

					return httpError.toResponse();
				}
			}
		);

		// if the lang is set in the url, set it in the cookie to persist user language choice
		if (url.searchParams.has('lang')) {
			return new Response(res.body, {
				headers: cookies.set(res.headers, 'lang', lang),
				status: res.status
			});
		}

		return res;
	}
};

export { DurableObject };
export default handler;
