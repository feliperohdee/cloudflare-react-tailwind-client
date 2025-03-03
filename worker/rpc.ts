import localStorage from '@/worker/localStorage';

class Rpc {
	async hello({ message }: { message: string }) {
		const { req } = localStorage.getStore();

		return {
			message: `Hello, ${message}!`,
			url: req.url
		};
	}
}

export default Rpc;
