import { DurableObject } from 'cloudflare:workers';

class Do extends DurableObject<Env> {
	public ctx: DurableObjectState;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);

		this.ctx = ctx;
	}

	async sayHello() {
		return { greeting: 'Hello, World!' };
	}
}

export default Do;
