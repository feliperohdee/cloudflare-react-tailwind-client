import { useEffect, useState } from 'react';

import i18n, { SupportedLang } from '@/i18n';

const useI18n = (initialLang?: SupportedLang) => {
	const [lang, setLang] = useState<SupportedLang>(initialLang || 'en-us');
	const [langLoaded, setLangLoaded] = useState(false);

	useEffect(() => {
		if (i18n.supports(lang)) {
			i18n.load(lang);
		} else {
			setLang('en-us');
		}
		
		setLangLoaded(true);
	}, [lang]);

	return { lang, setLang, langLoaded };
};

export default useI18n;
