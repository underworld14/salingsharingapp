import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string().min(1, 'Nama wajib diisi').max(255),
	bio: z.string().max(255),
	avatar: z.any().optional()
});

export type ProfileSchema = z.infer<typeof profileSchema>;
