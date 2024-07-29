export const load = async ({ locals }) => {
	const sharings = await locals.pb.collection('sharings').getFullList({
		sort: '-created',
		expand: 'user',
		filter: 'is_approved=true'
	});

	return {
		sharings
	};
};
