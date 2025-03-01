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
		const request = new Request('http://example.com/api');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);

		await waitOnExecutionContext(ctx);
		expect(await response.json()).toEqual({
			message: 'Hello World!'
		});
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com/api');

		expect(await response.json()).toEqual({
			message: 'Hello World!'
		});
	});
});
