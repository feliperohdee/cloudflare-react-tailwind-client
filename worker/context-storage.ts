import { createI18nFn, createI18nLoader, I18n } from '@/i18n';

class ContextStorage {
	private lang: I18n.SupportedLang;

	public __: I18n.Fn;

	constructor(
		options: {
			lang?: I18n.SupportedLang;
		} = {}
	) {
		const lang = options.lang ?? 'en-us';
		const i18nLoader = createI18nLoader(lang);

		this.__ = createI18nFn(i18nLoader);
		this.lang = lang;
	}

	getLang() {
		return this.lang;
	}
}

export default ContextStorage;
