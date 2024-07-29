<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { buttonVariants } from '$lib/components/ui/button';
	import ArticleCard from '$lib/components/molecules/article-card.svelte';
</script>

<div class="space-y-2 bg-[#dee0e1] pb-2">
	<div class="bg-white p-2.5">
		<div class="flex items-center">
			<Avatar.Root class="mr-2">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>

			<div class="flex flex-col">
				<div class="font-semibold">Yusril Izza Aulia</div>
				<div class="text-sm text-gray-500">Seorang Programmer</div>
			</div>
		</div>

		<div class="mt-2 flex justify-end gap-2">
			<a href="/sharings/create" class={buttonVariants({ size: 'sm' })}>
				Bagikan cerita kamu sekarang
			</a>
		</div>
	</div>

	{#each Array.from({ length: 10 }) as _, i}
		<ArticleCard />
	{/each}
</div>
