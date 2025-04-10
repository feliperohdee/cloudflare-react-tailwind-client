import { describe, it, expect } from 'vitest';
import { env, runInDurableObject } from 'cloudflare:test';

import DurableObject from '@/worker/durable-object';

describe('/worker/durable-object', () => {
	it('should say hello', async () => {
		const id = env.DO.newUniqueId();
		const stub = env.DO.get(id);

		await runInDurableObject(stub, async (instance: DurableObject) => {
			const res = await instance.sayHello();

			expect(res).toEqual({ greeting: 'Hello, World!' });
		});
	});
});
