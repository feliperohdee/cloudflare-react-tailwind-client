import '@/app/index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toastr } from 'use-toastr';

import { browserI18nLoader, supportsI18nLang } from '@/i18n';
import cookies from '@/app/libs/cookies';
import Router from '@/app/router';

(() => {
	const lang = (() => {
		const lang = cookies.get('lang');

		return supportsI18nLang(lang) ? lang : 'en-us';
	})();

	browserI18nLoader.load(lang);
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
