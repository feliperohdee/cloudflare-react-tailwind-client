import { Github } from 'lucide-react';

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

export default Footer;
