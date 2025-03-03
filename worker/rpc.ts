import AuthJwt from 'use-request-utils/auth-jwt';

import context from '@/worker/context';

class Rpc {
	private auth: AuthJwt;

	constructor() {
		this.auth = new AuthJwt({
			cookie: 'auth_token',
			expires: { days: 7 },
			notBefore: { minutes: 0 },
			secret: 'your-secret-key'
		});
	}

	async hello({ message }: { message: string }) {
		const { req } = context.get();

		await new Promise(resolve => setTimeout(resolve, 1000));

		try {
			const session = await this.auth.authenticate(req.headers);

			return {
				message: `Hello, ${message} (${session.payload.email})!`,
				url: req.url
			};
		} catch {
			return {
				message: `Hello, ${message}!`,
				url: req.url
			};
		}
	}

	async signin({ email, password }: { email: string; password: string }) {
		const res = await this.auth.sign({ email, password });

		context.mergeResponseHeaders(res.headers);

		return {
			email,
			token: res.token
		};
	}

	async signout() {
		const res = await this.auth.destroy();

		context.mergeResponseHeaders(res.headers);

		return { success: true };
	}
}

export default Rpc;
