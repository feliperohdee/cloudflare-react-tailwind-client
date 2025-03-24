import { Github, Globe, Code2, BookOpen } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import Footer from '@/app/components/footer';
import Hero from '@/app/components/hero';
import Nav from '@/app/components/nav';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/app/components/ui/card';

const HomePage = () => {
	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<Hero />

			<div className='container mx-auto px-4 py-8'>
				<Nav />
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

export default HomePage;
