import { useRouter } from 'use-lite-react-router';

import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/libs/utils';

const Nav = () => {
	const { rawPath } = useRouter();

	return (
		<nav className='mx-auto mb-6 flex max-w-3xl'>
			<Button
				asChild
				className={cn(
					'rounded-l-md rounded-r-none border-r border-blue-800 bg-blue-600 px-6 hover:bg-blue-700',
					rawPath === '/' && 'bg-blue-700'
				)}
			>
				<a href='/'>Home</a>
			</Button>

			<Button
				asChild
				className={cn(
					'rounded-l-none rounded-r-md bg-blue-600 px-6 hover:bg-blue-700',
					rawPath === '/rpc' && 'bg-blue-700'
				)}
			>
				<a href='/rpc'>RPC</a>
			</Button>
		</nav>
	);
};

export default Nav;
