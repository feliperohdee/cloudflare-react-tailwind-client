import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		email: text('email').notNull().unique(),
		id: text('id').primaryKey(),
		namespace: text('namespace').notNull(),
		passwordHash: text('password_hash').notNull()
	},
	table => [
		index('users_namespace_email_idx').on(table.namespace, table.email)
	]
);
