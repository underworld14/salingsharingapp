import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const sharingId = url.searchParams.get('sharingId');

	if (!sharingId) {
		error(400, 'Sharing ID is required');
	}

	let comments = await locals.pb.collection('comments').getFullList({
		filter: `sharing="${sharingId}"`,
		sort: '-created',
		expand: 'user'
	});

	comments = comments.map((comment) => {
		return {
			...comment,
			expand: {
				...comment?.expand,
				user: {
					...comment?.expand?.user,
					avatar: locals.pb.getFileUrl(comment?.expand?.user, comment?.expand?.user?.avatar, {
						thumb: '50x50'
					})
				}
			}
		};
	});

	return json({
		comments
	});
}
