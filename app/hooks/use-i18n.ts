import { useCallback } from 'react';

import i18nLoader, { SupportedLang } from '@/i18n/loader';

const useLang = () => {
	const { lang } = i18nLoader.store;

	const setLang = useCallback((lang: SupportedLang) => {
		const url = new URL(window.location.href);
		url.searchParams.set('lang', lang);
		
		window.location.href = url.toString();
	}, []);

	return { lang, setLang };
};	

export default useLang;
