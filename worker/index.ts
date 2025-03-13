import cookies from 'use-request-utils/cookies';
import HttpError from 'use-http-error';
import i18n from '@/i18n';

import context from '@/worker/context';
import DurableObject from '@/worker/durable-object';
import rpcHandler from '@/worker/rpc';

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
				lang,
				request,
				url
			},
			() => {
				try {
					i18n.load(lang);

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
