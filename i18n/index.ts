import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

import loader, { type SupportedLang } from '@/i18n/loader';

const __ = (key: string, args?: Record<string, string | number>): string => {
	const cacheKey = args ? `${key}:${JSON.stringify(args)}` : key;

	if (loader.cache[cacheKey]) {
		return loader.cache[cacheKey];
	}

	let value = loader.translations[key] || key;

	if (args && isString(value)) {
		value = value.replace(/\{\{\s?(\w+)\s?\}\}/g, (sub, param) => {
			return `${!isNil(args[param]) ? args[param] : ''}`;
		});

		value = value.replace(/\{\s?(\w+)\s?\}/g, (sub, param) => {
			return `${!isNil(args[param]) ? args[param] : ''}`;
		});
	}

	loader.cache[cacheKey] = value;

	return value;
};

export type { SupportedLang };
export default __;
