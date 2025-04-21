import AuthJwt from 'use-request-utils/auth-jwt';
import context from '@/worker/context';
import Rpc from 'use-request-utils/rpc';

class Root extends Rpc {
	private auth: AuthJwt;

	constructor() {
		super();
		this.auth = new AuthJwt({
			cookie: 'auth_token',
			expires: { days: 7 },
			notBefore: { minutes: 0 },
			secret: 'your-secret-key'
		});
	}

	async hello({ message }: { message: string }) {
		const { request } = context.store;

		try {
			const session = await this.auth.authenticate(request.headers);

			return {
				message: `Hello, ${message} (${session.payload.email})!`,
				url: request.url
			};
		} catch {
			return {
				message: `Hello, ${message}!`,
				url: request.url
			};
		}
	}

	async signin({ email, password }: { email: string; password: string }) {
		const res = await this.auth.sign({ email, password });

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
		const res = await this.auth.destroy();

		return this.createResponse(
			{ success: true },
			{
				headers: res.headers
			}
		);
	}
}

export default Root;
