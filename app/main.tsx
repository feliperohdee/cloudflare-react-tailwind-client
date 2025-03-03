import './index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from '@/app';
import MotionOverride from '@/app/components/motion-override';
import { Toaster } from '@/app/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<MotionOverride />
		<Toaster
			expand
			richColors
		/>
	</StrictMode>
);
