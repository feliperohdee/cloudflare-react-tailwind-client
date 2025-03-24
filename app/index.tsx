import { Github, Globe, Code2, BookOpen } from 'lucide-react';
import { Routes, Route, Redirect, useRouter } from 'use-lite-react-router';
import { toast } from 'use-toastr';
import { useEffect, useState } from 'react';

import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/libs/utils';
import useRpc from '@/app/hooks/use-rpc';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/app/components/ui/card';

const Hero = () => {
	const { rawPath } = useRouter();

	return (
		<>
			<div className='mx-auto mb-12 max-w-3xl text-center'>
				<h1 className='mb-4 text-4xl font-bold'>
					Modern Web Development with
					<div className='text-blue-500'>
						{' '}
						Cloudflare Workers + React
					</div>
				</h1>

				<p className='mb-8 text-gray-400'>
					Jumpstart your next project with this powerful tech stack
					combining Cloudflare's edge computing, React's UI
					capabilities, and Tailwind's utility-first CSS—all powered
					by Vite and type-safe RPC.
				</p>
			</div>

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
		</>
	);
};

const Footer = () => {
	return (
		<div className='mt-12 text-center'>
			<a
				href='https://github.com/feliperohdee/cloudflare-react-tailwind-client'
				className='inline-flex items-center text-gray-400 hover:text-gray-200'
			>
				<Github className='mr-2 h-4 w-4' />
				View on GitHub
			</a>
		</div>
	);
};

const Home = () => {
	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<div className='container mx-auto px-4 py-16'>
				<Hero />

				<Card className='mx-auto max-w-3xl border-gray-800 bg-gray-900'>
					<CardHeader>
						<CardTitle className='flex items-center text-xl text-white'>
							<Github className='mr-2 h-5 w-5 text-blue-500' />
							Installation Guide
						</CardTitle>
					</CardHeader>

					<CardContent className='p-6'>
						<div className='space-y-5'>
							{/* Clone Repository */}
							<div className='rounded-lg border border-gray-800 bg-gray-950 p-5'>
								<div className='mb-2 flex items-center justify-between'>
									<h3 className='text-sm font-medium text-gray-300'>
										1. Clone Repository
									</h3>
								</div>
								<div className='rounded border border-gray-700 bg-black p-4'>
									<pre className='overflow-hidden font-mono text-sm text-gray-300'>
										git clone
										https://github.com/feliperohdee/cloudflare-react-tailwind-client.git
									</pre>
								</div>
								<p className='mt-3 text-sm text-gray-400'>
									Clone the repository to your local machine
									using Git to get started with the project.
								</p>
							</div>

							{/* Install Dependencies */}
							<div className='rounded-lg border border-gray-800 bg-gray-950 p-5'>
								<div className='mb-2 flex items-center justify-between'>
									<h3 className='text-sm font-medium text-gray-300'>
										2. Install Dependencies
									</h3>
								</div>
								<div className='rounded border border-gray-700 bg-black p-4'>
									<code className='font-mono text-sm text-gray-300'>
										yarn install
									</code>
								</div>
								<p className='mt-3 text-sm text-gray-400'>
									Install all project dependencies, including
									React, Tailwind CSS, and shadcn/ui base
									components.
								</p>
							</div>

							{/* Development Server */}
							<div className='rounded-lg border border-gray-800 bg-gray-950 p-5'>
								<div className='mb-2 flex items-center justify-between'>
									<h3 className='text-sm font-medium text-gray-300'>
										3. Start Development Server
									</h3>
								</div>
								<div className='rounded border border-gray-700 bg-black p-4'>
									<code className='font-mono text-sm text-gray-300'>
										yarn dev
									</code>
								</div>
								<p className='mt-3 text-sm text-gray-400'>
									Start the development server at
									http://localhost:3000 with hot module
									replacement for real-time updates.
								</p>
							</div>

							{/* Additional Commands */}
							<div className='rounded-lg border border-gray-800 bg-gray-950 p-5'>
								<h3 className='mb-3 text-sm font-medium text-gray-300'>
									Additional Commands
								</h3>

								<div className='space-y-4'>
									{/* Deploy Command */}
									<div>
										<div className='mb-2 flex items-center justify-between'>
											<p className='text-xs font-medium text-gray-400'>
												Deploy to Cloudflare
											</p>
										</div>
										<div className='rounded border border-gray-700 bg-black p-3'>
											<code className='font-mono text-sm text-gray-300'>
												yarn deploy
											</code>
										</div>
										<p className='mt-2 text-xs text-gray-500'>
											Build and deploy your app to
											Cloudflare Workers.
										</p>
									</div>

									{/* Test Command */}
									<div>
										<div className='mb-2 flex items-center justify-between'>
											<p className='text-xs font-medium text-gray-400'>
												Run Tests
											</p>
										</div>
										<div className='rounded border border-gray-700 bg-black p-3'>
											<code className='font-mono text-sm text-gray-300'>
												yarn test
											</code>
										</div>
										<p className='mt-2 text-xs text-gray-500'>
											Run tests using Vitest testing
											framework.
										</p>
									</div>

									{/* CF TypeGen Command */}
									<div>
										<div className='mb-2 flex items-center justify-between'>
											<p className='text-xs font-medium text-gray-400'>
												Generate Worker Types
											</p>
										</div>
										<div className='rounded border border-gray-700 bg-black p-3'>
											<code className='font-mono text-sm text-gray-300'>
												yarn cf-typegen
											</code>
										</div>
										<p className='mt-2 text-xs text-gray-500'>
											Generate TypeScript types for
											Cloudflare Workers.
										</p>
									</div>

									{/* Lint Command */}
									<div>
										<div className='mb-2 flex items-center justify-between'>
											<p className='text-xs font-medium text-gray-400'>
												Lint Code
											</p>
										</div>
										<div className='rounded border border-gray-700 bg-black p-3'>
											<code className='font-mono text-sm text-gray-300'>
												yarn lint
											</code>
										</div>
										<p className='mt-2 text-xs text-gray-500'>
											Run ESLint to check code quality and
											maintain consistent style.
										</p>
									</div>

									{/* Add Component Command */}
									<div>
										<div className='mb-2 flex items-center justify-between'>
											<p className='text-xs font-medium text-gray-400'>
												Add Component
											</p>
										</div>
										<div className='rounded border border-gray-700 bg-black p-3'>
											<code className='font-mono text-sm text-gray-300'>
												yarn add-component [name]
											</code>
										</div>
										<p className='mt-2 text-xs text-gray-500'>
											Install and configure shadcn/ui
											components. Example:{' '}
											<code className='text-xs text-gray-400'>
												yarn add-component button
											</code>
										</p>
										<p className='mt-1 text-xs text-gray-500'>
											Available components: button, card,
											dialog, dropdown-menu, input, label,
											select, and more from shadcn/ui
											collection.
										</p>
									</div>
								</div>
							</div>

							{/* Quick Links */}
							<div className='mt-6 flex flex-wrap gap-3'>
								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									asChild
								>
									<a href='https://github.com/feliperohdee/cloudflare-react-tailwind-client/blob/main/README.md'>
										<BookOpen className='mr-2 h-4 w-4' />
										Documentation
									</a>
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									asChild
								>
									<a href='https://developers.cloudflare.com/workers/'>
										<Globe className='mr-2 h-4 w-4' />
										Cloudflare Docs
									</a>
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									asChild
								>
									<a href='https://ui.shadcn.com/'>
										<Code2 className='mr-2 h-4 w-4' />
										shadcn/ui
									</a>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Footer />
			</div>
		</div>
	);
};

const Rpc = () => {
	const [message, setMessage] = useState('Cloudflare');
	const { resource, rpc } = useRpc();
	const { data, error, fetch, index, loading, setData } = resource('hello', {
		message
	});

	useEffect(() => {
		if (loading) {
			toast.loading('Connecting to worker...', {
				id: `loading-${index}`
			});
		} else if (data) {
			toast.success(`Received from worker: ${data.message}`, {
				id: `loading-${index}`
			});
		} else if (error) {
			toast.error(`Worker error: ${error.toString()}`, {
				id: `loading-${index}`
			});
		}
	}, [loading, data, error, index, rpc]);

	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<div className='container mx-auto px-4 py-16'>
				<Hero />

				<Card className='mx-auto max-w-3xl border-gray-800 bg-gray-900'>
					<CardHeader>
						<CardTitle className='flex items-center text-xl text-white'>
							<Code2 className='mr-2 h-5 w-5 text-blue-500' />
							Type-Safe RPC Communication Demo
						</CardTitle>
					</CardHeader>

					<CardContent className='p-6'>
						<div className='space-y-5'>
							{/* Input Field */}
							<div className='rounded-lg border border-gray-800 bg-gray-950 p-5'>
								<label
									htmlFor='message'
									className='mb-2 block text-sm font-medium text-gray-300'
								>
									Message to Worker
								</label>

								<input
									id='message'
									type='text'
									value={message}
									onChange={e => {
										setMessage(e.target.value);
									}}
									className='w-full rounded border border-gray-700 bg-gray-900 p-2 text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none'
									placeholder='Enter a message to send to the worker'
								/>
							</div>

							{/* Live Response Panel */}
							<div className='rounded-lg border border-gray-800 bg-black p-5'>
								<div className='mb-3 flex items-center'>
									<div
										className={`mr-2 h-2 w-2 rounded-full ${loading ? 'animate-pulse bg-yellow-500' : 'bg-green-500'}`}
									/>

									<p className='text-sm font-medium text-gray-300'>
										Status:{' '}
										{loading
											? 'Connecting to worker...'
											: 'Connected'}
									</p>
								</div>
								<div className='border-t border-gray-800 pt-3'>
									<p className='mb-1 text-sm font-medium text-gray-400'>
										Worker Response:
									</p>
									<p className='font-mono text-lg text-blue-400'>
										{data
											? data.message
											: 'Waiting for response...'}
									</p>
								</div>
							</div>

							{/* Action Buttons */}
							<div className='flex flex-wrap gap-3'>
								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={() => {
										fetch();
									}}
								>
									Refetch
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={() => {
										fetch({ message: 'Custom Message' });
									}}
								>
									Refetch w/ Custom Payload
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={() => {
										setData({
											message: 'Hello, World!',
											url: 'https://example.com'
										});
									}}
								>
									Update Rpc Data
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={() => {
										setMessage(prevMessage =>
											prevMessage === 'Cloudflare'
												? 'Edge Computing'
												: 'Cloudflare'
										);
									}}
								>
									Toggle Message
								</Button>
							</div>

							<div className='flex gap-3'>
								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={async () => {
										const res = await rpc.signin({
											email: 'test@test.com',
											password: 'password'
										});

										toast.info(`Signed in: ${res.email}`, {
											closeButton: true,
											id: `signin-${index}`
										});

										setTimeout(fetch);
									}}
								>
									Simulate Signin
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={async () => {
										await rpc.signout();

										toast.info('Signed out', {
											closeButton: true,
											id: `signout-${index}`
										});

										setTimeout(fetch);
									}}
								>
									Simulate Signout
								</Button>
							</div>

							{/* Code Example */}
							<div className='mt-6'>
								<div className='mb-2 flex items-center justify-between'>
									<h3 className='text-sm font-medium text-gray-300'>
										Implementation Example
									</h3>
								</div>
								<div className='rounded-lg border border-gray-800 bg-gray-950 p-4'>
									<pre className='overflow-auto font-mono text-sm text-gray-300'>
										{`// Frontend Code
const { resource, rpc } = useRpc();
const { data, loading, fetch } = resource('hello', {
  message: '${message}'
});

// Worker RPC Implementation
class Rpc {
  async hello({ message }: { message: string }) {
    return { message: \`Hello, \${message}!\` }
  }
}`}
									</pre>
								</div>
								<p className='mt-3 text-sm text-gray-400'>
									Type-safe RPC calls provide end-to-end type
									safety between your React frontend and
									Cloudflare Worker backend, with automatic
									code generation.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Footer />
			</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path='/'
					component={Home}
				/>
				<Route
					path='/rpc'
					component={Rpc}
				/>
				<Redirect
					path='*'
					to='/'
				/>
			</Routes>
		</>
	);
};

export default App;
