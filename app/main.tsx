import './index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toastr } from 'use-toastr';

import App from '@/app';
import cookies from '@/app/libs/cookies';
import i18n from '@/i18n';

(() => {
	const lang = (() => {
		const lang = cookies.get('lang');

		return i18n.supports(lang) ? lang : 'en-us';
	})();

	i18n.load(lang);
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
})();
