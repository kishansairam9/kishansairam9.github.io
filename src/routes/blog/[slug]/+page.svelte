<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title={data.metadata.title}
	description={data.metadata.description}
	image={data.metadata.image}
	article={true}
	publishedTime={data.metadata.date}
	modifiedTime={data.metadata.updated}
/>

<article class="post">
	<header>
		<h1>{data.metadata.title}</h1>
		<time datetime={data.metadata.date}>{formatDate(data.metadata.date)}</time>
		{#if data.metadata.tags?.length}
			<div class="tags">
				{#each data.metadata.tags as tag}
					<TagBadge {tag} />
				{/each}
			</div>
		{/if}
	</header>

	<div class="content">
		<data.content />
	</div>
</article>

<style>
	.post header {
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-5);
		border-bottom: 1px solid var(--color-border);
	}

	.post h1 {
		margin: 0 0 var(--space-3);
		font-size: 2.25rem;
		line-height: 1.2;
	}

	.post time {
		display: block;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-3);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.content :global(h2) {
		margin-top: var(--space-6);
		margin-bottom: var(--space-3);
	}

	.content :global(h3) {
		margin-top: var(--space-5);
		margin-bottom: var(--space-2);
	}

	.content :global(a) {
		color: var(--color-text);
	}

	.content :global(img) {
		border-radius: 8px;
		margin: var(--space-4) 0;
	}

	@media (max-width: 480px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>
