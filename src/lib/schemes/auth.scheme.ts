import { z } from 'zod';

export const registerSchema = z
	.object({
		name: z.string().min(1, 'Nama wajib diisi').max(255),
		email: z.string().email('Format email tidak valid'),
		password: z
			.string()
			.min(1, 'Password waajib diisi')
			.min(6, 'Password minimal 6 karakter')
			.max(100),
		password_confirmation: z
			.string()
			.min(1, 'Konfirmasi password wajib diisi')
			.min(6, 'Konfirmasi password minimal 6 karakter')
			.max(100)
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Konfirmasi password tidak sama'
	});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string().email('Format email tidak valid'),
	password: z.string().min(6, 'Password minimal 6 karakter'),
	remember_me: z.boolean().optional()
});

export type LoginSchema = z.infer<typeof loginSchema>;
