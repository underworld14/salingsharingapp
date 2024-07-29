<script lang="ts">
	import { Editor } from '@tadashi/svelte-editor-quill';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import ImageInput from '$lib/components/molecules/image-input.svelte';
	import { enhance } from '$app/forms';

	export let form;

	const options = {
		theme: 'snow',
		placeholder: 'Tuliskan cerita, pengalaman atau artikel kamu disini...',
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ align: [] }],
				// ['link', 'image'],
				['link'],
				['clean']
			]
		}
	};

	let data = '';
	let html = '';
	let title = '';
	let images: string[] = [];
	let loading = false;

	const onTextChange = (event: any) => {
		({ html } = event?.detail ?? {});
		data = html;
	};

	$: if (form?.error) {
		alert(form.message);
		title = form?.fields?.title?.toString() || title;
		data = form?.fields?.content?.toString() || data;
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/quill@2.0.2/dist/quill.snow.css"
		crossorigin="anonymous"
	/>
</svelte:head>

<form
	method="POST"
	class="px-6 pt-4"
	enctype="multipart/form-data"
	use:enhance={({ formData }) => {
		loading = true;
		formData.append('content', data);
		images.forEach((image) => {
			formData.append('images', image);
		});

		return async ({ result, update }) => {
			await update();
			loading = false;
		};
	}}
>
	<h1 class="font-semibold">Tulis dan Sharing pengalaman serta ilmumu</h1>
	<p class="mt-1 text-sm text-gray-500">
		Bagikan cerita, pengalaman, dan ilmu yang kamu miliki kepada orang lain.
	</p>

	<div class="mt-4 flex flex-col gap-2">
		<Label for="title">Judul</Label>
		<Input bind:value={title} name="title" placeholder="Tuliskan judul cerita/artikelmu" />
	</div>

	<div class="mt-4" id="editor-container">
		<Editor {options} {data} on:text-change={onTextChange} />
	</div>

	<div class="mt-4 flex">
		<ImageInput bind:values={images} />
	</div>

	<div class="mt-4 flex justify-end">
		<Button {loading} disabled={!data || !title} type="submit">Bagikan</Button>
	</div>
</form>
