import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user,
			authStore: locals.authStore
		};
	}

	return {
		user: null,
		authStore: null
	};
});
