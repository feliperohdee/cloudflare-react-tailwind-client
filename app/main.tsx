import './index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from '@/app';
import { Toaster } from '@/app/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster />
		<App />
	</StrictMode>
);
