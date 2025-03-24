import { Routes, Route } from 'use-lite-react-router';

import HomePage from '@/app/pages/home';
import RpcPage from '@/app/pages/rpc';
import NotFoundPage from '@/app/pages/not-found';

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
					path='*'
					component={NotFoundPage}
				/>
			</Routes>
		</>
	);
};

export default App;
