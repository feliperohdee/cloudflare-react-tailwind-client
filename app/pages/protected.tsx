import useSession from '@/app/hooks/use-session';

import Nav from '@/app/components/nav';
import Footer from '@/app/components/footer';
import Hero from '@/app/components/hero';

const ProtectedPage = () => {
	// This will automatically check if user is authenticated
	// If not, it will redirect to home page with an error message
	const { authenticated, user } = useSession({
		redirectTo: '/',
		message: 'Please sign in to access the protected page'
	});

	// We can access the user information once authenticated
	const userEmail = user?.email || 'User';

	if (!authenticated) {
		return (
			<div className='min-h-screen bg-black text-gray-200'>
				<Hero />
				<div className='container mx-auto px-4 py-8'>
					<Nav />
					<div className='flex min-h-[50vh] items-center justify-center'>
						<p>Loading...</p>
					</div>
					<Footer />
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<Hero />
			<div className='container mx-auto px-4 py-8'>
				<Nav />

				<div className='mx-auto mt-8 max-w-3xl rounded-lg border border-gray-800 bg-gray-900 p-6'>
					<h1 className='mb-6 text-3xl font-bold'>
						Protected Content
					</h1>
					<p className='mb-4'>Welcome, {userEmail}!</p>
					<p className='mb-4'>
						This is a protected page that requires authentication to
						access.
					</p>
					<p className='mb-4'>
						You are currently signed in and can view this content.
					</p>
				</div>

				<Footer />
			</div>
		</div>
	);
};

export default ProtectedPage;
