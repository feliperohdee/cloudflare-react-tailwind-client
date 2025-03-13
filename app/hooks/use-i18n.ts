import { useCallback, useState } from 'react';

import cookies from '@/app/libs/cookies';
import i18n, { SupportedLang } from '@/i18n';

const useI18n = () => {
	const [lang, setLangState] = useState(() => {
		const lang = cookies.get('lang');

		return i18n.supports(lang) ? lang : 'en-us';
	});

	const setLang = useCallback((lang: SupportedLang) => {
		setLangState(lang);
		cookies.set('lang', lang);
		i18n.load(lang);
	}, []);

	return { lang, setLang };
};

export default useI18n;
