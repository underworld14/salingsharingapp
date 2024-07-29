import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const images = formData.getAll('images');

		try {
			const sharing = await locals.pb.collection('sharings').create({
				title,
				content,
				images,
				user: locals.user.id
			});

			await locals.pb.collection('notifications').create({
				user: locals.user.id,
				sharing: sharing.id,
				content: `Kamu berhasil membuat sharing baru dengan judul ${title}. Sharing kamu akan diterbitkan setelah disetujui oleh admin.`
			});
		} catch (error: any) {
			return {
				error: true,
				message: error?.response?.message || error?.message || 'An error occurred',
				fields: {
					title,
					content
				}
			};
		}
		return redirect(302, '/');
	}
};
