<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Posts tagged '{data.activeTag}'" description="All posts tagged with {data.activeTag}" />

<section class="hero">
	<h1>Posts tagged "{data.activeTag}"</h1>
	<p>{data.posts.length} post{data.posts.length === 1 ? '' : 's'} found</p>
</section>

<TagFilter tags={data.tags} activeTag={data.activeTag} />

<section class="posts">
	{#each data.posts as post (post.slug)}
		<PostCard {post} />
	{/each}
</section>

<style>
	.hero {
		margin-bottom: var(--space-5);
	}

	.hero h1 {
		margin: 0 0 var(--space-2);
	}

	.hero p {
		margin: 0;
		color: var(--color-text-secondary);
	}
</style>
