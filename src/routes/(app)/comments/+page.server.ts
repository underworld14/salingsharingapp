export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const content = formData.get('content');
		const sharingId = formData.get('sharingId');
		const userId = locals?.user?.id;

		if (!content || !userId || !sharingId) {
			return;
		}

		await locals.pb.collection('comments').create({
			content,
			sharing: sharingId,
			user: userId
		});

		return true;
	}
};
