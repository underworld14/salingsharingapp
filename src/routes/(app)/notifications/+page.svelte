<script lang="ts">
	import { Info } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import dayjs from 'dayjs';

	export let data;
</script>

<div class="min-h-screen bg-[#dee0e1]">
	<div class="flex items-center justify-between bg-white px-2.5 py-4">
		<h1 class="text-lg font-semibold">Daftar Pemberitahuan ({data.notifications?.length || 0})</h1>

		<div class="flex items-center justify-end gap-2">
			<Button size="sm" class="text-xs" variant="outline">Baca Semua Notifikasi</Button>
			<Button size="sm" class="text-xs" variant="destructive">Bersihkan</Button>
		</div>
	</div>

	<div class="mt-2 space-y-2 pb-2">
		{#each data.notifications as notification, i}
			<div class="flex items-center bg-white p-2.5">
				<Info class="mr-2 text-primary" size={28} />

				<div class="flex flex-col">
					<p class="text-sm text-gray-500">
						{notification.content}
					</p>

					<p class="mt-1 text-right text-xs text-gray-400">
						{dayjs(notification.created).format('DD MMMM YYYY HH:mm')}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
