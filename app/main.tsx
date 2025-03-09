import './index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toastr } from 'use-toastr';

import App from '@/app';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<Toastr
			expand
			richColors
			theme='dark'
		/>
	</StrictMode>
);
