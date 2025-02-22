const handler = {
	async fetch(
		req: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return new Response('Hello World!');
	}
};

export default handler;
