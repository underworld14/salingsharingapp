<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { registerSchema } from '$lib/schemes/auth.scheme.js';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(registerSchema),
		onUpdate: ({ form }) => {
			if (form.message) {
				if (form.message.success) {
					toast.success(form.message.message);
					return goto('/auth/login');
				} else {
					toast.error(form.message.message);
				}
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Daftar di Saling Sharing</Card.Title>
		<Card.Description>Daftar dan sharing pengalaman dan ilmu dengan dunia</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-3">
				<Form.Field {form} name="name">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<Form.Label>Nama Lengkap</Form.Label>
							<Input {...attrs} bind:value={$formData.name} placeholder="Masukkan nama lengkapmu" />
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<Form.Label>Email</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.email}
								placeholder="Masukkan alamat emailmu"
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<Form.Label>Password</Form.Label>
							<Input
								type="password"
								{...attrs}
								bind:value={$formData.password}
								placeholder="Masukkan password"
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password_confirmation">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<Form.Label>Konfirmasi Password</Form.Label>
							<Input
								type="password"
								{...attrs}
								bind:value={$formData.password_confirmation}
								placeholder="Masukkan konfirmasi password"
							/>
						</div>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button loading={$submitting} class="w-full">Daftar</Form.Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Sudah punya akun ?
				<a href="/auth/login" class="underline">Masuk lewat sini</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
