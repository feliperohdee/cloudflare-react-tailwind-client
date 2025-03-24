import cookies from '@/app/libs/cookies';
import i18n from '@/i18n';
import { createGlobalState, useGlobalState } from '@/app/libs/global-state';

const lang = (() => {
	const lang = cookies.get('lang');
	return i18n.supports(lang) ? lang : 'en-us';
})();

i18n.load(lang);

const globalState = createGlobalState({
	count: 0,
	lang,
	user: {
		name: '',
		isLoggedIn: false
	}
});

export default () => {
	const [state, setState] = useGlobalState(globalState);

	return [state, setState] as const;
};
