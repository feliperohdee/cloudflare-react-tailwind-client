import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

import enUS from '@/i18n/en-us.json';
import esES from '@/i18n/es-es.json';
import ptBR from '@/i18n/pt-br.json';

namespace I18n {
	export type Fn = (
		key: string,
		args?: Record<string, string | number>
	) => string;

	export type Loader = {
		load: (lang: SupportedLang) => void;
		store: Store;
	};

	export type Store = {
		cache: Record<string, string>;
		dict: Record<string, string>;
		lang: SupportedLang;
	};

	export type SupportedLang = keyof typeof dicts;
}

const dicts = {
	'en-us': enUS,
	'es-es': esES,
	'pt-br': ptBR
};

const createI18nLoader = (lang?: I18n.SupportedLang): I18n.Loader => {
	const store: I18n.Store = {
		cache: {},
		dict: lang ? dicts[lang] : {},
		lang: lang ?? 'en-us'
	};

	const load = (lang: I18n.SupportedLang) => {
		store.cache = {};
		store.dict = dicts[lang] ?? enUS;
		store.lang = lang;
	};

	const loader: I18n.Loader = { load, store };
	return loader;
};

const createI18nFn = (loader: I18n.Loader): I18n.Fn => {
	return (key, args) => {
		const cacheKey = args ? `${key}:${JSON.stringify(args)}` : key;

		if (loader.store.cache[cacheKey]) {
			return loader.store.cache[cacheKey];
		}

		let value = loader.store.dict[key] || key;

		if (args && isString(value)) {
			value = value.replace(/\{\{\s?(\w+)\s?\}\}/g, (sub, param) => {
				return `${!isNil(args[param]) ? args[param] : ''}`;
			});

			value = value.replace(/\{\s?(\w+)\s?\}/g, (sub, param) => {
				return `${!isNil(args[param]) ? args[param] : ''}`;
			});
		}

		loader.store.cache[cacheKey] = value;

		return value;
	};
};

const supportsI18nLang = (lang: string): lang is I18n.SupportedLang => {
	return lang in dicts;
};

let browserI18nLoader: I18n.Loader = null!;
let browserFn: I18n.Fn = () => {
	return '';
};

// when browser use global loader
if (typeof window !== 'undefined') {
	browserI18nLoader = createI18nLoader();
	browserFn = createI18nFn(browserI18nLoader);
}

export type { I18n };
export { browserI18nLoader, createI18nFn, createI18nLoader, supportsI18nLang };
export default browserFn;
