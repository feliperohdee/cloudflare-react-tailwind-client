import enUS from '@/i18n/en-us.json';
import esES from '@/i18n/es-es.json';
import ptBR from '@/i18n/pt-br.json';

const i18n = {
	'en-us': enUS,
	'es-es': esES,
	'pt-br': ptBR
};

let cache: Record<string, string> = {};
let translations: Record<string, string> = {};

const load = (lang: SupportedLang) => {
	cache = {};
	translations = i18n[lang] ?? enUS;
};

const supports = (lang: string): lang is SupportedLang => {
	return lang in i18n;
};

export type SupportedLang = keyof typeof i18n;
export default { cache, load, supports, translations };
