import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

const getLocalD1DB = () => {
	const basePath = path.resolve('.wrangler');
	const dbFile = fs
		.readdirSync(basePath, { encoding: 'utf-8', recursive: true })
		.find(f => {
			return f.endsWith('.sqlite');
		});

	if (!dbFile) {
		throw new Error('No local DB file found');
	}

	return path.join(basePath, dbFile);
};

export default defineConfig({
	dbCredentials: {
		url: getLocalD1DB()
	},
	dialect: 'sqlite',
	out: './db/migrations',
	schema: './db/schema.ts'
});
