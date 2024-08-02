import { error } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const sharing = await locals.pb.collection('sharings').getOne(params.sharingId, {
		expand: 'user'
	});

	const finalSharing: RecordModel = {
		...sharing,
		expand: {
			...sharing.expand,
			user: {
				...sharing?.expand?.user,
				avatar: locals.pb.getFileUrl(sharing?.expand?.user, sharing?.expand?.user?.avatar, {
					thumb: '50x50'
				})
			}
		},
		images: sharing.images.map((image: string) =>
			locals.pb.getFileUrl(sharing, image, { thumb: '300x200' })
		)
	};

	const currentUser = {
		...locals.user,
		avatar: locals.pb.getFileUrl(locals.user, locals.user.avatar, {
			thumb: '50x50'
		})
	};

	return {
		user: currentUser,
		sharing: finalSharing
	};
};
