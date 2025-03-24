const Hero = () => {
	return (
		<div className='h-screen overflow-hidden bg-gray-900'>
			<header className='absolute inset-x-0 top-0 z-50'>
				<nav
					aria-label='Global'
					className='flex items-center justify-between p-6 lg:px-8'
				>
					<div className='flex lg:flex-1'>
						<a
							href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
							className='-m-1.5 p-1.5'
						>
							<span className='sr-only'>
								Cloudflare Workers + React + Tailwind
							</span>
						</a>
					</div>
					<div className='flex flex-1 justify-end'>
						<a
							href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
							className='text-sm/6 font-semibold text-gray-300 hover:text-white'
						>
							Get Started <span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</nav>
			</header>

			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
						}}
						className='relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#4f46e5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
					/>
				</div>
				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
						<div className='relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-gray-600 hover:ring-gray-300'>
							Modern edge computing with React and Tailwind.{' '}
							<a
								href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
								className='font-semibold text-indigo-400'
							>
								<span
									aria-hidden='true'
									className='absolute inset-0'
								/>
								Learn more{' '}
								<span aria-hidden='true'>&rarr;</span>
							</a>
						</div>
					</div>

					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl'>
							<span className='mb-2 block'>
								React at the Edge
							</span>
							<span className='inline-block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
								Built for Performance
							</span>
						</h1>
						<p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-pretty text-gray-300'>
							Jumpstart your next project with this powerful tech
							stack combining Cloudflare's edge computing, React's
							UI capabilities, and Tailwind's utility-first
							CSS—all powered by Vite and type-safe RPC.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<a
								href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
								className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Get started
							</a>
							<a
								href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
								className='text-sm/6 font-semibold text-gray-300 hover:text-white'
							>
								View on GitHub <span aria-hidden='true'>→</span>
							</a>
						</div>
					</div>
				</div>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
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
		</div>
	);
};

export default Hero;
