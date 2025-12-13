import Rpc from 'use-request-utils/rpc';

import session from '@/worker/session';
import type { Session } from '@/worker/session';

class AdminRpc extends Rpc {
	private session: Session = null!;

	async getSession() {
		return this.session;
	}

	async $onBeforeRequest(rpc: Rpc.Request) {
		const { headers } = this.context;

		// Enforces authentication at the root of the request tree, ensuring all child resources
		// inherit this protection without needing explicit authentication checks at each level
		this.session = await session.authenticate(headers);

		return rpc;
	}
}

export default AdminRpc;
