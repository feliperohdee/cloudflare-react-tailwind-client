import '@/app/index.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Toastr } from 'use-toastr';

import cookies from '@/app/libs/cookies';
import resolveLang from '@/app/libs/resolve-lang';
import Router from '@/app/router';

(() => {
	const urlLang =
		new URLSearchParams(window.location.search).get('lang') || '';
	const cookieLang = cookies.get('lang');

	resolveLang(urlLang || cookieLang);
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
