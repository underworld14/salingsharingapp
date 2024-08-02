import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ locals }) => {
		locals.pb.authStore.clear();

		return redirect(302, '/auth/login');
	}
};
