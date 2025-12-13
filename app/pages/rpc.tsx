import { Code2 } from 'lucide-react';
import { toast } from 'use-toastr';
import { useState } from 'react';
import useFetchRpc from 'use-request-utils/use-fetch-rpc';
import useRpc from 'use-request-utils/use-rpc';

import { Button } from '@/app/components/ui/button';
import Footer from '@/app/components/footer';
import Hero from '@/app/components/hero';
import Nav from '@/app/components/nav';
import type Rpc from '@/worker/rpc';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/app/components/ui/card';

const RpcPage = () => {
	const [message, setMessage] = useState('Cloudflare');
	const rpc = useRpc<Rpc>();
	const { lazyFetchRpc, fetchRpc } = useFetchRpc<Rpc>();
	const { data, fetch, lastFetchDuration, loading, setData } = fetchRpc(
		(rpc, input?: { message: string }) => {
			toast.loading('Connecting to worker...', {
				id: 'loading'
			});

			return rpc.hello(input ?? { message });
		},
		{
			effect: ({ data, error }) => {
				if (data) {
					toast.success(`Received from worker: ${data.message}`, {
						closeButton: true,
						id: 'loading'
					});
				} else if (error) {
					toast.error(`Worker error: ${error.toString()}`, {
						closeButton: true,
						id: 'loading'
					});
				}
			},
			triggerDeps: [message]
		}
	);

	const signin = lazyFetchRpc(
		(rpc, input?: { email: string; password: string }) => {
			toast.loading('Signing in...', {
				id: 'signin'
			});

			return rpc.signin(
				input ?? { email: 'test@test.com', password: 'password' }
			);
		},
		{
			effect: ({ data, error }) => {
				if (data) {
					toast.info(`Signed in: ${data.email}`, {
						closeButton: true,
						id: 'signin'
					});
				} else if (error) {
					toast.error(`Signin error: ${error.toString()}`, {
						closeButton: true,
						id: 'signin'
					});
				}
			}
		}
	);

	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<Hero />

			<div className='container mx-auto px-4 py-8'>
				<Nav />
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
										{lastFetchDuration > 0 && (
											<span className='ml-2 text-xs text-gray-500'>
												{lastFetchDuration.toFixed(2)}ms
											</span>
										)}
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
									disabled={signin.loading}
									onClick={async () => {
										const res = await signin.fetch({
											email: 'test@test.com',
											password: 'password'
										});

										if (res) {
											setTimeout(fetch);
										}
									}}
								>
									Simulate Signin
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={async () => {
										try {
											const res =
												await rpc.admin.getSession();

											toast.info(
												`Session: ${JSON.stringify(res, null, 2)}`,
												{
													closeButton: true,
													id: 'get-session'
												}
											);
										} catch (error) {
											toast.error(
												`Error: ${(error as Error).toString()}`,
												{
													closeButton: true,
													id: 'get-session'
												}
											);
										}
									}}
								>
									Get Session
								</Button>

								<Button
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									onClick={async () => {
										await rpc.signout();

										toast.info('Signed out', {
											closeButton: true,
											id: 'signout'
										});

										setTimeout(fetch);
									}}
								>
									Simulate Signout
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

export default RpcPage;
