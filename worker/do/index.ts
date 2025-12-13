import { drizzle, DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite';
import { DurableObject } from 'cloudflare:workers';
import { migrate } from 'drizzle-orm/durable-sqlite/migrator';

import * as schema from '@/db/schema';
import migrations from '@/db/migrations-do/migrations';

class Do extends DurableObject {
	public db: DrizzleSqliteDODatabase<typeof schema>;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		this.db = drizzle(state.storage, {
			logger: false,
			schema
		});

		state.blockConcurrencyWhile(async () => {
			await migrate(this.db, migrations);
		});
	}

	async getUsers() {
		return await this.db.query.users.findMany();
	}
}

export default Do;
