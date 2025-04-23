import { Routes, Route } from 'use-lite-react-router';

import HomePage from '@/app/pages/home';
import RpcPage from '@/app/pages/rpc';
import NotFoundPage from '@/app/pages/not-found';
import ProtectedPage from '@/app/pages/protected';

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					component={HomePage}
				/>
				<Route
					path='/rpc'
					component={RpcPage}
				/>
				<Route
					path='/protected'
					component={ProtectedPage}
				/>
				<Route
					path='*'
					component={NotFoundPage}
				/>
			</Routes>
		</>
	);
};

export default App;
