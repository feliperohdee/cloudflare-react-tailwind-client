const NotFoundPage = () => {
	return (
		<div className='relative flex h-screen items-center justify-center overflow-hidden bg-gray-900 p-4'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-x-0 top-0 transform-gpu overflow-hidden blur-3xl sm:-top-80'
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
					className='relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#4f46e5] to-[#9089fc] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
				/>
			</div>

			<div className='relative w-full max-w-md text-center'>
				<div className='mb-8'>
					<h1 className='text-9xl font-bold tracking-tighter text-gray-100'>
						404
					</h1>
					<div className='mx-auto my-6 h-1 w-16 bg-indigo-500'></div>
					<h2 className='text-xl font-light text-gray-300'>
						Page not found
					</h2>
				</div>

				<p className='mb-8 text-gray-400'>
					The page you are looking for doesn't exist or has been
					moved.
				</p>

				<div className='flex flex-col space-y-4'>
					<a
						href='/'
						className='text-indigo-400 transition-colors duration-200 hover:text-indigo-300'
					>
						Return to Homepage
					</a>
				</div>
			</div>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
					className='relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#4f46e5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
				/>
			</div>
		</div>
	);
};

export default NotFoundPage;
