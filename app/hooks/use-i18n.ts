import { useCallback } from 'react';

import { browserI18nLoader, I18n } from '@/i18n';

const useLang = () => {
	const { lang } = browserI18nLoader.store;

	const setLang = useCallback((lang: I18n.SupportedLang) => {
		const url = new URL(window.location.href);
		url.searchParams.set('lang', lang);

		window.location.href = url.toString();
	}, []);

	return { lang, setLang };
};

export default useLang;
