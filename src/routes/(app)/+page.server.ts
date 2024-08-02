import { error } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const sharings = await locals.pb.collection('sharings').getFullList({
		sort: '-created',
		expand: 'user',
		filter: 'is_approved=true'
	});

	const finalSharings: RecordModel[] = sharings.map((sharing) => {
		return {
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
	});

	const currentUser: RecordModel = {
		...locals.user,
		avatar: locals.pb.getFileUrl(locals.user, locals.user.avatar, {
			thumb: '50x50'
		})
	};

	return {
		user: currentUser,
		sharings: finalSharings
	};
};
