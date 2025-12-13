import HttpError from 'use-http-error';
import Rpc from 'use-request-utils/rpc';
import session from '@/worker/session';

import AdminRpc from '@/worker/rpc/auth-rpc';

class RootRpc extends Rpc {
	public admin: AdminRpc;

	constructor() {
		super();

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
		if (password !== '[YOU_PASSWORD_CHECK_RULE]') {
			throw new HttpError(401, 'Invalid password');
		}

		const res = await session.sign({ email, namespace: 'admin' });

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
