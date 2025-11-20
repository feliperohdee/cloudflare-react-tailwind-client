import enUS from '@/i18n/en-us.json';
import esES from '@/i18n/es-es.json';
import ptBR from '@/i18n/pt-br.json';

const i18n = {
	'en-us': enUS,
	'es-es': esES,
	'pt-br': ptBR
};

const store: {
	cache: Record<string, string>;
	lang: SupportedLang;
	translations: Record<string, string>;
} = {
	cache: {},
	lang: 'en-us',
	translations: {}
};

const load = (lang: SupportedLang) => {
	store.cache = {};
	store.lang = lang;
	store.translations = i18n[lang] ?? enUS;
};

const supports = (lang: string): lang is SupportedLang => {
	return lang in i18n;
};

export type SupportedLang = keyof typeof i18n;
export default { load, store, supports };
