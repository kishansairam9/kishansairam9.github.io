<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import Footnotes from '$lib/components/Footnotes.svelte';
	import Giscus from '$lib/components/Giscus.svelte';
	import { giscusConfig } from '$lib/config/giscus';
	import { imageZoom } from '$lib/actions/imageZoom';
	import { formatDate } from '$lib/utils/formatDate';
	import { sidenotes } from '$lib/stores/sidenotes';
	import type { PageData } from './$types';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let { data }: { data: PageData } = $props();
	let headings = $state<Heading[]>([]);
	let contentElement: HTMLElement;

	// Reset sidenotes immediately (before child components mount)
	sidenotes.reset();

	onMount(() => {
		const headingElements = contentElement.querySelectorAll('h2, h3');
		headings = Array.from(headingElements).map((el) => ({
			id: el.id,
			text: el.textContent || '',
			level: parseInt(el.tagName[1])
		}));
	});
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

	<!-- Mobile TOC (shown at top on small screens) -->
	<nav class="mobile-toc">
		<details>
			<summary>Table of Contents</summary>
			<TableOfContents {headings} />
		</details>
	</nav>

	<div class="article-layout">
		<aside class="toc-sidebar">
			<TableOfContents {headings} />
		</aside>

		<div class="content" bind:this={contentElement} use:imageZoom>
			<data.content />
		</div>

		<aside class="sidenotes-column"></aside>
	</div>

	<!-- Mobile footnotes (shown at end on small screens) -->
	<Footnotes />

	<!-- Comments -->
	<Giscus
		repo={giscusConfig.repo}
		repoId={giscusConfig.repoId}
		category={giscusConfig.category}
		categoryId={giscusConfig.categoryId}
	/>
</article>

<style>
	.post {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.post header {
		text-align: center;
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-5);
	}

	.post h1 {
		margin: 0 0 var(--space-3);
		font-size: 2.5rem;
		line-height: 1.2;
		font-weight: 700;
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
		justify-content: center;
	}

	/* Mobile TOC - collapsible at top */
	.mobile-toc {
		display: none;
		margin-bottom: var(--space-5);
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-secondary);
		border-radius: 8px;
	}

	.mobile-toc summary {
		cursor: pointer;
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.mobile-toc details[open] summary {
		margin-bottom: var(--space-3);
	}

	.article-layout {
		max-width: none;
		margin: 0 calc(-1 * (50vw - 360px));
		padding: 0;
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

	.content :global(h2 a),
	.content :global(h3 a) {
		text-decoration: none;
	}

	.content :global(img) {
		border-radius: 8px;
		margin: var(--space-4) 0;
		cursor: zoom-in;
	}

	@media (max-width: 1100px) {
		.mobile-toc {
			display: block;
		}

		.article-layout {
			margin: 0;
		}

		.content {
			padding: 0;
		}
	}

	@media (max-width: 480px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>
