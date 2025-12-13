import { describe, it, expect } from 'vitest';
import { env, runInDurableObject } from 'cloudflare:test';

describe('@/worker/do', () => {
	it('should get users', async () => {
		const stub = env.DO.getByName('test');

		await runInDurableObject(stub, async instance => {
			const users = await instance.getUsers();
			expect(users).toEqual([]);
		});
	});
});
