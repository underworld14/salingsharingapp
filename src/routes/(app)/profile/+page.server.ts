import { fail, redirect, error } from '@sveltejs/kit';
import { profileSchema } from '$lib/schemes/profile.schema.js';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const profile = await locals.pb.collection('users').getOne(locals.user.id);

	if (!profile) {
		return error(404, 'Profile not found');
	}

	const form = await superValidate(
		{
			name: profile?.name || '',
			bio: profile?.bio || '',
			avatar: profile.avatar
		},
		zod(profileSchema)
	);

	const profileData: Record<string, any> = {
		...profile,
		avatarUrl: locals.pb.getFileUrl(profile, profile.avatar, { thumb: '112x112' })
	};

	return {
		form,
		profile: profileData
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return error(401, 'Unauthorized');
		}

		const form = await superValidate(request, zod(profileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const payload = form.data;

		try {
			await locals.pb.collection('users').update(locals.user.id, {
				name: payload.name,
				bio: payload.bio,
				avatar: payload.avatar
			});
		} catch (error: any) {
			return message(form, {
				success: false,
				message: error?.response?.message || error?.message || 'An error occurred'
			});
		}

		return redirect(302, '/profile');
	}
};
