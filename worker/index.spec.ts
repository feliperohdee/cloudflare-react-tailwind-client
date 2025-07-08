import { describe, it, expect } from 'vitest';
import {
	createExecutionContext,
	env,
	SELF,
	waitOnExecutionContext
} from 'cloudflare:test';

import worker from '@/worker';

describe('/worker', () => {
	it('should respond to rpc requests (unit style)', async () => {
		const formData = new FormData();
		formData.append(
			'rpc',
			JSON.stringify({
				args: [{ message: 'Cloudflare' }],
				batch: false,
				resource: 'hello',
				responseType: 'default'
			})
		);

		const request = new Request('https://example.com/api/rpc', {
			body: formData,
			method: 'POST'
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);

		await waitOnExecutionContext(ctx);
		expect(await response.json()).toEqual({
			message: 'Hello, Cloudflare!',
			url: 'https://example.com/api/rpc'
		});
	});

	it('should respond to rpc requests (integration style)', async () => {
		const formData = new FormData();
		formData.append(
			'rpc',
			JSON.stringify({
				args: [{ message: 'Cloudflare' }],
				batch: false,
				resource: 'hello',
				responseType: 'default'
			})
		);

		const response = await SELF.fetch('https://example.com/api/rpc', {
			method: 'POST',
			body: formData
		});

		expect(await response.json()).toEqual({
			message: 'Hello, Cloudflare!',
			url: 'https://example.com/api/rpc'
		});
	});
});
