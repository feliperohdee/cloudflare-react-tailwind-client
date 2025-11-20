import { useEffect, useState } from 'react';

import loader, { type SupportedLang } from '@/i18n/loader';

const useI18n = (initialLang?: SupportedLang) => {
	const [lang, setLang] = useState<SupportedLang>(initialLang ?? 'en-us');
	const [langLoaded, setLangLoaded] = useState(false);

	useEffect(() => {
		if (!loader.supports(lang)) {
			return;
		}

		loader.load(lang);
		setLangLoaded(true);
	}, [lang]);

	useEffect(() => {
		if (!loader.supports(lang)) {
			setLang('en-us');
		}
	}, [lang]);

	return { lang, setLang, langLoaded };
};

export default useI18n;
