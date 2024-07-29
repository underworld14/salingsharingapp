import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(env.PRIVATE_POCKET_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = structuredClone(event.locals.pb.authStore.model);
			event.locals.authStore = structuredClone(event.locals.pb.authStore);
		}
	} catch {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const isLoggedIn = event.locals.pb.authStore.isValid;

	/**
	 * all pages routes are protected except that startsWith /auth, /api,
	 * unauthenticated users will redirect to /auth
	 */
	if (
		!isLoggedIn &&
		!event.url.pathname.startsWith('/auth') &&
		!event.url.pathname.startsWith('/api')
	) {
		redirect(302, '/auth/login');
	}

	const response = await resolve(event);
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: dev ? false : true })
	);
	return response;
};
