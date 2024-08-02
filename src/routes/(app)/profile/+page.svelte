<script lang="ts">
	import { ImageUp } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profileSchema } from '$lib/schemes/profile.schema.js';
	import { getInitials, isFile } from '$lib/utils.js';

	export let data;

	let inputAvatar: HTMLInputElement;

	const form = superForm(data.form, {
		validators: zodClient(profileSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<div class="px-6 py-12">
	<form method="POST" use:enhance enctype="multipart/form-data" class="flex flex-col">
		<div class="flex justify-center">
			<div class="relative">
				<input
					bind:this={inputAvatar}
					bind:files={$formData.avatar}
					name="avatar"
					type="file"
					accept="image/*"
					class="hidden"
				/>
				<Avatar.Root class="size-28">
					<Avatar.Image
						src={$formData.avatar?.[0] && isFile($formData.avatar?.[0])
							? URL.createObjectURL($formData?.avatar?.[0])
							: data.profile?.avatarUrl}
						alt={data.profile?.name}
					/>
					<Avatar.Fallback>
						{getInitials(data.form.data.name)}
					</Avatar.Fallback>
				</Avatar.Root>

				<div class="absolute -bottom-2 -right-2">
					<Button
						size="icon"
						variant="outline"
						class="rounded-full"
						on:click={() => inputAvatar?.click()}
					>
						<ImageUp size={22} />
					</Button>
				</div>
			</div>
		</div>

		<div class="mt-6 space-y-3">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Nama</Form.Label>
					<Input {...attrs} bind:value={$formData.name} placeholder="Masukkan nama lengkapmu" />
				</Form.Control>
				<Form.Description>
					Nama lengkapmu akan muncul di profil dan di postingan yang kamu buat.
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="bio">
				<Form.Control let:attrs>
					<Form.Label>Bio</Form.Label>
					<Input {...attrs} bind:value={$formData.bio} placeholder="Masukkan biomu" />
				</Form.Control>
				<Form.Description>
					Bio yang kamu tulis akan muncul di profilmu. Tulis tentang dirimu, minat, dan kegiatan
					yang kamu sukai.
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mt-6">
			<Form.Button loading={$submitting} class="w-full">Simpan</Form.Button>
		</div>
	</form>

	<form class="mt-3" method="POST" action="/auth/logout">
		<Button type="submit" variant="destructive" class="w-full">Keluar Aplikasi</Button>
	</form>
</div>
