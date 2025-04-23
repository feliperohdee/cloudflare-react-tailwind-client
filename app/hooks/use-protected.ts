import { toast } from 'use-toastr';
import { useEffect, useRef } from 'react';
import { useRouter } from 'use-lite-react-router';
import useFetchRpc from 'use-request-utils/use-fetch-rpc';

import type RootRpc from '@/worker/rpc';

const useProtected = ({
	redirectTo = '/',
	message = 'You need to be authenticated to access this page'
}: {
	redirectTo?: string;
	message?: string;
} = {}) => {
	const handled = useRef(false);
	const { fetchRpc } = useFetchRpc<RootRpc>();
	const { navigate } = useRouter();
	const session = fetchRpc(rpc => {
		return rpc.isAuthenticated();
	});

	useEffect(() => {
		if (!session.data || handled.current) {
			return;
		}

		handled.current = true;

		if (!session.data.authenticated) {
			toast.error(message);
			navigate(redirectTo);
		}
	}, [message, navigate, redirectTo, session.data]);

	return (
		session.data || {
			authenticated: false,
			user: null
		}
	);
};

export default useProtected;
