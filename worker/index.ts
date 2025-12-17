import { env } from 'cloudflare:workers';
import cookies from 'use-request-utils/cookies';
import HttpError from 'use-http-error';
import isPlainObject from 'lodash/isPlainObject';
import Rpc from 'use-request-utils/rpc';

import { supportsI18nLang } from '@/i18n';
import context from '@/worker/context';
import ContextStorage from '@/worker/context-storage';
import Do from '@/worker/do';
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
		const rpcRequest = Rpc.parseString(formRpc);

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
	async fetch(request: Request): Promise<Response> {
		HttpError.setIncludeStack(env.PRODUCTION === 'false');

		const url = new URL(request.url);
		const lang = (() => {
			const lang =
				url.searchParams.get('lang') ||
				cookies.get(request.headers, 'lang') ||
				request.headers.get('accept-language') ||
				'';

			return supportsI18nLang(lang) ? lang : 'en-us';
		})();

		const res = await context.run(
			new ContextStorage({ lang }),
			async () => {
				try {
					if (
						request.method === 'POST' &&
						url.pathname === '/api/rpc'
					) {
						const rpc = new RootRpc();

						return await fetchRpc(rpc, request);
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

export { Do };
export default handler;
