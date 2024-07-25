import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { registerSchema } from '$lib/schemes/auth.scheme.js';

export const load = async () => {
	const form = await superValidate(zod(registerSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		function buildUsername(fullname: string) {
			return fullname.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);
		}

		const payload = {
			username: buildUsername(form.data.name),
			email: form.data.email,
			name: form.data.name,
			password: form.data.password,
			passwordConfirm: form.data.password_confirmation,
			emailVisibility: true
		};

		try {
			await locals.pb.collection('users').create(payload);
		} catch (error: any) {
			return message(
				form,
				{ success: false, message: error?.response?.message },
				{
					status: 400
				}
			);
		}

		return message(form, {
			success: true,
			message: 'Registrasi berhasil, silahkan login ke halaman login!'
		});
	}
};
