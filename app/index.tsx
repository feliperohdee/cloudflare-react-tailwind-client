import '@/app/index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toastr } from 'use-toastr';

import cookies from '@/app/libs/cookies';
import i18nLoader from '@/i18n/loader';
import Router from '@/app/router';

(() => {
	const lang = (() => {
		const lang = cookies.get('lang');

		return i18nLoader.supports(lang) ? lang : 'en-us';
	})();

	i18nLoader.load(lang);
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Router />
			<Toastr
				expand
				richColors
				theme='dark'
			/>
		</StrictMode>
	);
})();
