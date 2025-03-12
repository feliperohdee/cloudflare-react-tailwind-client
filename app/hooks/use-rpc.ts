import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import HttpError from 'use-http-error';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import {
	JsonRpcRequest,
	rpcClient,
	RpcTransport,
	RpcTranscoder,
	RpcUuid
} from 'typed-rpc';

import type { Rpc } from '@/worker/rpc';

type FetchOptions = {
	credentials?: RequestCredentials;
	getHeaders?():
		| Record<string, string>
		| Promise<Record<string, string>>
		| undefined;
	url: string;
};

type RpcClientOptions = (FetchOptions | { transport: RpcTransport }) & {
	abortable?: boolean;
	debounceTime?: number;
	transcoder?: RpcTranscoder<any>;
	uuid?: RpcUuid;
};

const transport = (options: FetchOptions): RpcTransport => {
	return async (req: JsonRpcRequest, signal: AbortSignal): Promise<any> => {
		try {
			const headers = options?.getHeaders
				? await options.getHeaders()
				: {};

			const res = await fetch(options.url, {
				body: JSON.stringify(req),
				credentials: options?.credentials,
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					...headers
				},
				method: 'POST',
				signal
			});

			if (!res.ok) {
				throw new HttpError(res.status, res.statusText);
			}

			const data = await res.json();

			if (data && isObject(data) && 'error' in data) {
				throw new HttpError(
					(data.error as { code: number }).code,
					(data.error as { message: string }).message,
					{ context: (data.error as { data: object }).data }
				);
			}

			return data;
		} catch (err) {
			throw HttpError.wrap(err as Error);
		}
	};
};

type RpcFunctions<T extends object> = {
	[K in keyof T]: T[K];
};

const resourceFactory = ({
	abort,
	abortable,
	debounceTime,
	lazy,
	rpc
}: {
	abort: (promise: Promise<any>) => void;
	abortable: boolean;
	debounceTime: number;
	lazy: boolean;
	rpc: RpcFunctions<Rpc>;
}) => {
	return <T extends keyof Rpc>(method: T, ...args: Parameters<Rpc[T]>) => {
		type Args = Parameters<Rpc[T]>;
		type Data = Awaited<ReturnType<Rpc[T]>>;

		const currentPromise = useRef<Promise<any> | null>(null);
		const firstExecute = useRef(false);
		const prev = useRef<{ method: T; args: Args }>({ method, args });

		const [state, setState] = useState<{
			data: Data | null;
			error: HttpError | null;
			index: number;
			loading: boolean;
			loaded: boolean;
		}>({
			data: null,
			error: null,
			index: 0,
			loading: false,
			loaded: false
		});

		const setData = useCallback((update: Data | ((data: Data) => Data)) => {
			setState(state => {
				return {
					...state,
					data: isFunction(update) ? update(state.data!) : update
				};
			});
		}, []);

		const fetch = useCallback(
			async (...overrideArgs: Parameters<Rpc[T]> | []) => {
				try {
					setState(state => {
						return {
							...state,
							error: null,
							index: state.index + 1,
							loading: true,
							loaded: false
						};
					});

					if (!isFunction(rpc[method])) {
						throw new HttpError(404, 'Method not found');
					}

					const promise = (rpc[method] as Awaited<Function>)(
						...(overrideArgs.length ? overrideArgs : args)
					);
					currentPromise.current = promise;

					const data = await promise;

					setState(state => {
						return {
							...state,
							data,
							loading: false,
							loaded: true
						};
					});
				} catch (err) {
					const httpError = HttpError.wrap(err as Error);

					if (httpError.message.includes('aborted')) {
						return;
					}

					setState(state => {
						return {
							...state,
							error: httpError,
							loading: false,
							loaded: false
						};
					});
				}
			},
			[method, args]
		);

		const debouncedCheckAndExecute = useMemo(() => {
			return debounce(() => {
				if (
					method !== prev.current.method ||
					!isEqual(args, prev.current.args)
				) {
					if (abortable) {
						abort(currentPromise.current!);
					}

					prev.current = { method, args };
					fetch();
				}
			}, debounceTime);
		}, [args, fetch, method]);

		useEffect(() => {
			return () => {
				debouncedCheckAndExecute.cancel();
			};
		}, [debouncedCheckAndExecute]);

		useEffect(() => {
			debouncedCheckAndExecute();
		}, [args, debouncedCheckAndExecute]);

		useEffect(() => {
			if (!firstExecute.current && !lazy) {
				firstExecute.current = true;
				fetch();
			}
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

		return {
			...state,
			fetch,
			setData
		};
	};
};

const useRpc = (options?: RpcClientOptions) => {
	const rpc = useMemo(() => {
		if (options && 'transport' in options) {
			return rpcClient<Rpc>(options);
		}

		if (
			options &&
			('credentials' in options ||
				'getHeaders' in options ||
				'url' in options)
		) {
			return rpcClient<Rpc>({
				transcoder: options?.transcoder,
				transport: transport({
					credentials: options.credentials,
					getHeaders: options.getHeaders,
					url: options.url || '/api/rpc'
				}),
				uuid: options?.uuid
			});
		}

		return rpcClient<Rpc>({
			transport: transport({ url: '/api/rpc' })
		});
	}, [options]);

	return {
		lazyResource: resourceFactory({
			abort: rpc.$abort,
			abortable: options?.abortable ?? true,
			debounceTime: options?.debounceTime ?? 300,
			lazy: true,
			rpc
		}),
		resource: resourceFactory({
			abort: rpc.$abort,
			abortable: options?.abortable ?? true,
			debounceTime: options?.debounceTime ?? 300,
			lazy: false,
			rpc
		}),
		rpc
	};
};

export default useRpc;
