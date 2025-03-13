import enUS from '@/i18n/en-us.json';
import ptBR from '@/i18n/pt-br.json';

import loader from '@/i18n/loader';

const i18n = {
	'en-us': enUS,
	'pt-br': ptBR
};

const load = (lang: SupportedLang) => {
	loader.load(i18n[lang]);
};

const supports = (lang: string): lang is SupportedLang => {
	return lang in i18n;
};

type SupportedLang = keyof typeof i18n;

export type { SupportedLang };
export default { load, supports };
