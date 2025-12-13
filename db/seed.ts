import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { /*reset, */ seed } from 'drizzle-seed';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import {
	BoundD1,
	ProxyD1,
	useLocalD1 as localD1,
	useProxyD1 as proxyD1
} from '@nerdfolio/drizzle-d1-helpers';

import { users } from '@/db/schema';

const args = process.argv.slice(2);
const LOCAL = args.includes('--local');

const run = async (db: ProxyD1 | BoundD1) => {
	const password = await bcrypt.hash('password', 10);
	// await reset(db as unknown as BaseSQLiteDatabase<any, any, any, any>, {
	// 	users
	// });
	await seed(
		db as unknown as BaseSQLiteDatabase<any, any, any, any>,
		{
			users
		},
		{
			count: 1
		}
	).refine(f => {
		return {
			users: {
				columns: {
					namespace: f.default({ defaultValue: 'dev' }),
					email: f.default({ defaultValue: 'test@test.com' }),
					passwordHash: f.default({ defaultValue: password })
				}
			}
		};
	});
};

if (LOCAL) {
	localD1('DB', run);
} else {
	proxyD1(
		{
			accountId: process.env.ACCOUNT_ID!,
			databaseId: 'f5a94e93-c3c3-4c11-9b47-9f987d21e9cc',
			token: process.env.API_TOKEN!
		},
		run
	);
}
