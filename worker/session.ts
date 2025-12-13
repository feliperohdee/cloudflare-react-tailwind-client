import AuthJwt from 'use-request-utils/auth-jwt';

type Session = {
	authenticated: boolean;
	email: string;
	expires: Date;
	namespace: string;
	started: Date;
};

const auth = new AuthJwt({
	cookie: 'auth-token',
	expires: { days: 7 },
	notBefore: { minutes: 0 },
	secret: 'your-secret-key'
});

const authenticate = async (headers: Headers) => {
	const res = await auth.authenticate<{
		email: string;
		namespace: string;
	}>(headers);

	const session: Session = {
		authenticated: true,
		email: res.payload.email,
		expires: new Date((res.payload.exp || 0) * 1000),
		namespace: res.payload.namespace,
		started: new Date((res.payload.iat || 0) * 1000)
	};

	return session;
};

const destroy = async () => {
	const res = await auth.destroy();

	return {
		headers: res.headers
	};
};

const sign = async ({
	email,
	namespace
}: {
	email: string;
	namespace: string;
}) => {
	const res = await auth.sign({ email, namespace });

	return {
		headers: res.headers,
		token: res.token
	};
};

export type { Session };
export default {
	authenticate,
	destroy,
	sign
};
