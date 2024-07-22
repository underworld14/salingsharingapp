import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemes/auth.scheme.js';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch {
			return setError(form, 'password', 'Password atau email salah');
		}

		redirect(302, '/');
	}
};
