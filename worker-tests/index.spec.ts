import {
	createExecutionContext,
	env,
	SELF,
	waitOnExecutionContext
} from 'cloudflare:test';

import { describe, it, expect } from 'vitest';
import worker from '@/worker';

describe('/worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new Request('http://example.com/rpc', {
			method: 'POST',
			body: JSON.stringify({
				id: 1,
				jsonrpc: '2.0',
				method: 'hello',
				params: [
					{
						message: 'World'
					}
				]
			})
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);

		await waitOnExecutionContext(ctx);
		expect(await response.json()).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: {
				message: 'Hello, World!',
				url: 'http://example.com/rpc'
			}
		});
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com/rpc', {
			method: 'POST',
			body: JSON.stringify({
				id: 1,
				jsonrpc: '2.0',
				method: 'hello',
				params: [
					{
						message: 'World'
					}
				]
			})
		});

		expect(await response.json()).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: {
				message: 'Hello, World!',
				url: 'https://example.com/rpc'
			}
		});
	});
});
