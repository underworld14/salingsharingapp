<script lang="ts">
	import { Heart, MessageCircle } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<div class="bg-white p-2.5">
	<div class="flex items-center">
		<Avatar.Root class="mr-2 size-8">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>

		<div class="flex flex-col">
			<div class="text-sm font-semibold">Indraa S</div>
			<div class="text-xs text-gray-500">Tahu Bahasa Inggris</div>
		</div>
	</div>

	<div class="mt-4 flex flex-col">
		<a class="font-semibold hover:underline" href="/article/:id">
			Di mana saya bisa cari beasiswa S1 luar negeri untuk kampus se tenor Harvard?
		</a>
		<p class="mt-1 text-sm text-gray-500">
			Saya ingin mencari beasiswa S1 luar negeri untuk kampus sekelas Harvard. Di mana saya bisa
			cari informasi tentang beasiswa tersebut?
		</p>
	</div>

	<div class="mt-4 flex items-center">
		<button class="flex items-center">
			<Heart size={16} />
			<span class="ml-1 text-xs text-gray-500">10</span>
		</button>

		<button class="ml-4 flex items-center">
			<MessageCircle size={16} />
			<span class="ml-1 text-xs text-gray-500">10</span>
		</button>
	</div>
</div>
