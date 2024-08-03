<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemes/auth.scheme.js';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<!-- <form method="POST" use:enhance> -->
<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Saling Sharing</Card.Title>
		<Card.Description>Masuk ke akunmu untuk melanjutkan ke Aplikasi</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-3">
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
							<div class="flex items-center">
								<Form.Label>Password</Form.Label>
								<a href="##" class="ml-auto inline-block text-sm underline"> Lupa password? </a>
							</div>
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

				<Form.Button loading={$submitting} class="w-full">Login</Form.Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Belum punya akun?
				<a href="/auth/register" class="underline">Daftar Sekarang</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
