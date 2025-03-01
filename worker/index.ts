/* eslint-disable @typescript-eslint/no-unused-vars */
const handler = {
	async fetch(
		req: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { pathname } = new URL(req.url);

		if (pathname.startsWith('/api')) {
			return Response.json({
				message: 'Hello World!'
			});
		}

		return new Response('Not Found', {
			status: 404
		});
	}
};

export default handler;
