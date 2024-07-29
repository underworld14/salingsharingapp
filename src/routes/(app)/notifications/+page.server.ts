export const load = async ({ locals }) => {
	const notifications = await locals.pb.collection('notifications').getFullList({
		sort: '-created'
	});

	return {
		notifications
	};
};
