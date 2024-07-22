import PocketBase from 'pocketbase';
import { PUBLIC_POCKET_URL } from '$env/static/public';

export const load = async ({ data }) => {
	const pb = new PocketBase(PUBLIC_POCKET_URL, data.authStore);

	return {
		pb
	};
};
