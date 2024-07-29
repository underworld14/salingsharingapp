<script lang="ts">
	import { ImageUp, CircleX } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	type $$Props = {
		values: (string | File)[];
	};

	export let values: $$Props['values'] = [];

	let imageInput: HTMLInputElement | null = null;

	function handleImageInput() {
		imageInput?.click();
	}

	function handleImageChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			values = [...values, file];
		}
	}
</script>

<div class="flex items-center gap-2.5 py-2">
	<input bind:this={imageInput} on:change={handleImageChange} hidden type="file" accept="image/*" />

	<Button variant="outline" class="mr-4 rounded-full text-sm" on:click={handleImageInput}>
		<ImageUp class="mr-1.5" size={16} />
		Pilih Gambar
	</Button>

	{#each values as value, index}
		<div class="relative">
			<img
				src={typeof value === 'string' ? value : URL.createObjectURL(value)}
				alt="uploaded"
				class="size-14 rounded object-cover"
			/>
			<button
				class="absolute right-1 top-0 z-20 cursor-pointer"
				on:click={() => {
					values = values.filter((_, i) => i !== index);
				}}
			>
				<CircleX size={14} />
			</button>
		</div>
	{/each}
</div>
