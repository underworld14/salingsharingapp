<script lang="ts">
	import { LoaderCircle, MessageCircle } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { RecordModel } from 'pocketbase';
	import { truncate } from 'lodash-es';

	import { cn, getInitials } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { buttonVariants } from '../ui/button';

	type $$Props = {
		initialFetchComments?: boolean;
		trimContent?: boolean;
		sharing: RecordModel;
		expandComments?: boolean;
		currentUser: RecordModel;
	};

	export let trimContent: $$Props['trimContent'] = false;
	export let initialFetchComments: $$Props['initialFetchComments'] = false;
	export let sharing: $$Props['sharing'];
	export let expandComments: $$Props['expandComments'] = false;
	export let currentUser: $$Props['currentUser'];

	let comments: RecordModel[] = [];
	let commentsFetching = false;
	let commentInput: HTMLInputElement;

	function handleExpandComments() {
		if (!expandComments) {
			expandComments = true;
			handleFetchComments();
		} else {
			commentInput.focus();
		}
	}

	async function handleFetchComments() {
		commentsFetching = true;
		fetch(`/comments?sharingId=${sharing?.id}`)
			.then((res) => res.json())
			.then((data) => {
				comments = data?.comments || [];
			})
			.finally(() => {
				commentsFetching = false;
			});
	}

	onMount(() => {
		if (initialFetchComments) {
			handleFetchComments();
		}
	});
</script>

<div class="bg-white p-2.5">
	<div class="flex items-center">
		<Avatar.Root class="mr-2 size-8">
			<Avatar.Image src={sharing?.expand?.user?.avatar} alt={sharing?.expand?.user?.name} />
			<Avatar.Fallback>
				{getInitials(sharing?.expand?.user?.name)}
			</Avatar.Fallback>
		</Avatar.Root>

		<div class="flex flex-col">
			<div class="text-sm font-semibold">{sharing?.expand?.user?.name}</div>
			<div class="text-xs text-gray-500">
				{sharing?.expand?.user?.bio || 'Belum ada bio'}
			</div>
		</div>
	</div>

	<div class="mt-4 flex flex-col">
		<a class="font-semibold hover:underline" href="/sharings/{sharing?.id}">
			{sharing?.title}
		</a>

		{#if sharing?.images[0]}
			<img
				class="mt-2 rounded-lg object-cover"
				src={sharing?.images[0]}
				alt={sharing?.title}
				loading="lazy"
				width="100%"
				height="200"
			/>
		{/if}

		<div class={cn('mt-2 text-sm', trimContent && 'max-h-[250px] truncate')}>
			{@html sharing?.content}
		</div>

		{#if trimContent}
			<a
				href="/sharings/{sharing?.id}"
				class={cn(
					buttonVariants({
						size: 'sm'
					}),
					'mt-2 rounded-full'
				)}
			>
				Lihat selengkapnya
			</a>
		{/if}
	</div>

	<div class="mt-4 flex items-center">
		<button class="flex items-center" on:click={handleExpandComments}>
			<MessageCircle size={20} class="text-primary" />
			<span class="ml-1 text-sm text-gray-500">Tulis Komentar</span>
		</button>
	</div>
</div>

{#if expandComments}
	<form
		method="POST"
		action="/comments"
		use:enhance={({ formData }) => {
			formData.append('sharingId', sharing?.id);
			return async ({ update }) => {
				await update();
				handleFetchComments();
			};
		}}
		class="flex items-center gap-3 bg-[#f1f1f1] p-2.5"
	>
		<Avatar.Root class="size-8">
			<Avatar.Image src={currentUser?.avatar} alt={currentUser?.name} />
			<Avatar.Fallback class="bg-primary">
				{getInitials(currentUser?.name)}
			</Avatar.Fallback>
		</Avatar.Root>

		<Input
			bind:ref={commentInput}
			required
			name="content"
			class="flex-1"
			placeholder="Tulis komentar dan tekan enter untuk kirim"
		/>
	</form>

	<div class="space-y-4 bg-white p-2.5">
		{#each comments || [] as comment}
			<div class="flex gap-2.5">
				<Avatar.Root>
					<Avatar.Image src={comment?.expand?.user?.avatar} alt={comment?.expand?.user?.name} />
					<Avatar.Fallback>
						{getInitials(comment?.expand?.user?.name)}
					</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-col">
					<div class="text-[13px] font-semibold">
						{comment?.expand?.user?.name}
					</div>
					<p class="mt-1 text-sm text-gray-500">
						{comment?.content}
					</p>
				</div>
			</div>
		{/each}

		{#if commentsFetching}
			<div class="flex items-center justify-center">
				<LoaderCircle class="animate-spin text-primary" />
			</div>
		{/if}
	</div>
{/if}
