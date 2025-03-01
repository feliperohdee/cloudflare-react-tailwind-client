import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Github, Code2, BookOpen } from 'lucide-react';

const WelcomePage = () => {
	return (
		<div className='min-h-screen bg-black text-gray-200'>
			<div className='container mx-auto px-4 py-16'>
				{/* Simple Hero Section */}
				<div className='mb-12 text-center'>
					<h1 className='mb-4 text-4xl font-bold'>
						React/Tailwind Vite Starter
						<span className='text-blue-500'> Project</span>
					</h1>
					<p className='mb-8 text-gray-400'>
						Build something amazing with React and Tailwind CSS
						using Vite.
					</p>
					<div className='flex justify-center gap-4'>
						<Button
							asChild
							className='bg-blue-600 hover:bg-blue-700'
						>
							<a href='https://github.com/feliperohdee/vite-starter/README.md'>
								<Code2 className='mr-2 h-4 w-4' />
								Get Started
							</a>
						</Button>
						<Button
							asChild
							variant='secondary'
						>
							<a
								href='https://ui.shadcn.com/docs/components'
								target='_blank'
								rel='noopener noreferrer'
							>
								<BookOpen className='mr-2 h-4 w-4' />
								Components Docs
							</a>
						</Button>
					</div>
				</div>

				{/* Installation Card */}
				<Card className='mx-auto max-w-lg border-gray-800 bg-gray-900'>
					<CardContent className='pt-6'>
						<div className='space-y-4'>
							<div>
								<div className='rounded bg-black p-4'>
									<code className='text-sm text-gray-300'>
										git clone
										https://github.com/feliperohdee/vite-starter.git
									</code>
								</div>
								<p className='mt-2 text-sm text-gray-400'>
									Clone the repository to your local machine
									using Git.
								</p>
							</div>

							<div>
								<div className='rounded bg-black p-4'>
									<code className='text-sm text-gray-300'>
										yarn install
									</code>
								</div>
								<p className='mt-2 text-sm text-gray-400'>
									Install all project dependencies, including
									React, Tailwind CSS, and shadcn/ui base
									components.
								</p>
							</div>

							<div>
								<div className='rounded bg-black p-4'>
									<code className='text-sm text-gray-300'>
										yarn dev
									</code>
								</div>
								<p className='mt-2 text-sm text-gray-400'>
									Start the development server at
									http://localhost:3000 with hot module
									replacement.
								</p>
							</div>

							<div>
								<div className='rounded bg-black p-4'>
									<code className='text-sm text-gray-300'>
										yarn lint
									</code>
								</div>
								<p className='mt-2 text-sm text-gray-400'>
									Run ESLint to check code quality and
									maintain consistent style.
								</p>
							</div>

							<div>
								<div className='rounded bg-black p-4'>
									<code className='text-sm text-gray-300'>
										yarn add-component [name]
									</code>
								</div>
								<p className='mt-2 text-sm text-gray-400'>
									Install and configure shadcn/ui components.
									Example:{' '}
									<code className='text-gray-300'>
										yarn add-component button
									</code>
								</p>
								<p className='mt-1 text-sm text-gray-400'>
									Available components: button, card, dialog,
									dropdown-menu, input, label, select, and
									more from shadcn/ui collection.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className='mt-12 text-center'>
					<a
						href='https://github.com/feliperohdee/vite-starter'
						className='inline-flex items-center text-gray-400 hover:text-gray-200'
					>
						<Github className='mr-2 h-4 w-4' />
						View on GitHub
					</a>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
