import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	driver: 'durable-sqlite',
	out: './db/migrations-do',
	schema: './db/schema.ts'
});
