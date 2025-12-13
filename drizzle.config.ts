import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dbCredentials: {
		accountId: process.env.ACCOUNT_ID!,
		databaseId: 'f5a94e93-c3c3-4c11-9b47-9f987d21e9cc',
		token: process.env.API_TOKEN!
	},
	dialect: 'sqlite',
	driver: 'd1-http',
	out: './db/migrations',
	schema: './db/schema.ts'
});
