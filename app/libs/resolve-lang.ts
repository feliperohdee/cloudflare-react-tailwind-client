import { browserI18nLoader, supportsI18nLang } from '@/i18n';
import cookies from '@/app/libs/cookies';

const resolveLang = (preferred: string) => {
	const lang = preferred && supportsI18nLang(preferred) ? preferred : 'en-us';

	browserI18nLoader.load(lang);
	cookies.set('lang', lang);

	return lang;
};

export default resolveLang;
