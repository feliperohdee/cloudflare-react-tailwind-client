import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

let cache: Record<string, string> = {};
let translations: Record<string, string> = {};

const load = (newTranslations: Record<string, string>) => {
	cache = {};
	translations = newTranslations;

	const __ = (
		key: string,
		args?: Record<string, string | number>
	): string => {
		const cacheKey = args ? `${key}:${JSON.stringify(args)}` : key;

		if (cache[cacheKey]) {
			return cache[cacheKey];
		}

		let value = translations[key] || key;

		if (args && isString(value)) {
			value = value.replace(/\{\{\s?(\w+)\s?\}\}/g, (sub, param) => {
				return `${!isNil(args[param]) ? args[param] : ''}`;
			});

			value = value.replace(/\{\s?(\w+)\s?\}/g, (sub, param) => {
				return `${!isNil(args[param]) ? args[param] : ''}`;
			});
		}

		cache[cacheKey] = value;

		return value;
	};

	// @ts-expect-error
	self.__ = __;
};

export default { load };
