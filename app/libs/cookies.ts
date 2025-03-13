const get = (name: string) => {
	const cookie = document.cookie.split('; ').find(row => {
		const [key] = row.split('=');

		return key === name;
	});

	if (!cookie) {
		return '';
	}

	return cookie.split('=')[1];
};

const set = (name: string, value: string) => {
	document.cookie = `${name}=${value}; path=/`;
};

export default { get, set };
