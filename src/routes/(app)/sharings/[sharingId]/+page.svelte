<script lang="ts">
	import ArticleCard from '$lib/components/molecules/article-card.svelte';

	export let data;
</script>

<ArticleCard initialFetchComments sharing={data.sharing} currentUser={data.user} expandComments />
