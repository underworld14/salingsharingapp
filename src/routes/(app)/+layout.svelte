<script lang="ts">
	import { Home, Bell, CircleUserRound, Plus } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
</script>

<div class="relative min-h-screen w-screen bg-[#dee0e1]">
	<div class="relative mx-auto h-full min-h-screen w-full max-w-screen-sm bg-white pb-16">
		<slot />

		<!-- floating button -->
		<a
			href="/sharings"
			class={cn(
				buttonVariants({
					size: 'icon'
				}),
				'fixed bottom-16 right-4 md:right-16',
				$page.url.pathname !== '/' && 'hidden'
			)}
		>
			<Plus size={24} />
		</a>
	</div>

	<div class="fixed bottom-0 left-0 w-screen bg-slate-100 shadow-lg">
		<div class="mx-auto flex w-full max-w-screen-sm">
			<a
				href="/"
				class="flex basis-1/3 items-center justify-center border-l border-r border-slate-300 py-3 hover:bg-primary hover:text-white"
			>
				<Home size={24} />
			</a>

			<a
				href="/notifications"
				class="flex basis-1/3 items-center justify-center border-r border-slate-300 py-3 hover:bg-primary hover:text-white"
			>
				<Bell size={24} />
			</a>

			<a
				href="/profile"
				class="flex basis-1/3 items-center justify-center border-r border-slate-300 py-3 hover:bg-primary hover:text-white"
			>
				<CircleUserRound size={24} />
			</a>
		</div>
	</div>
</div>
