<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO />

<section class="hero">
	<h1>Blog</h1>
	<p>Thoughts on software development, technology, and more.</p>
</section>

{#if data.tags.length > 0}
	<TagFilter tags={data.tags} />
{/if}

<section class="posts">
	{#if data.posts.length > 0}
		{#each data.posts as post (post.slug)}
			<PostCard {post} />
		{/each}
	{:else}
		<p class="no-posts">No posts yet. Check back soon!</p>
	{/if}
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
		font-size: 1.125rem;
	}

	.no-posts {
		color: var(--color-text-secondary);
		text-align: center;
		padding: var(--space-6) 0;
	}
</style>
