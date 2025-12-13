import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { env } from 'cloudflare:workers';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import HttpError from 'use-http-error';
import Rpc from 'use-request-utils/rpc';
import session from '@/worker/session';

import AdminRpc from '@/worker/rpc/auth-rpc';
import { users } from '@/db/schema';

class RootRpc extends Rpc {
	private db: DrizzleD1Database<{ users: typeof users }>;
	public admin: AdminRpc;

	constructor() {
		super();
		this.db = drizzle(env.DB, { schema: { users } });

		this.admin = new AdminRpc();
	}

	async hello({ message }: { message: string }) {
		const { headers, url } = this.context;

		try {
			const s = await session.authenticate(headers);

			return {
				message: `Hello, ${message} (${s.email})!`,
				url: url.toString()
			};
		} catch {
			return {
				message: `Hello, ${message}!`,
				url: url.toString()
			};
		}
	}

	async signin({ email, password }: { email: string; password: string }) {
		const user = await this.db.query.users.findFirst({
			where: eq(users.email, email)
		});

		if (!user) {
			throw new HttpError(401, 'Invalid email or password');
		}

		const validPassword = await this.verifyPassword(
			password,
			user.passwordHash
		);

		if (!validPassword) {
			throw new HttpError(401, 'Invalid email or password');
		}

		const res = await session.sign({ email, namespace: user.namespace });

		return this.createResponse(
			{
				email,
				token: res.token
			},
			{
				headers: res.headers
			}
		);
	}

	private async verifyPassword(
		password: string,
		hash: string
	): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}

	async signout() {
		const res = await session.destroy();

		return this.createResponse(
			{ success: true },
			{
				headers: res.headers
			}
		);
	}
}

export default RootRpc;
