<script lang="ts">
	import type { Post } from '$lib/types/post';
	import { formatDate } from '$lib/utils/formatDate';
	import TagBadge from './TagBadge.svelte';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

<article class="post-card">
	<a href="/blog/{post.slug}/" class="post-link">
		<h2 class="post-title">{post.metadata.title}</h2>
	</a>
	<time class="post-date" datetime={post.metadata.date}>
		{formatDate(post.metadata.date)}
	</time>
	<p class="post-description">{post.metadata.description}</p>
	{#if post.metadata.tags?.length}
		<div class="post-tags">
			{#each post.metadata.tags as tag}
				<TagBadge {tag} />
			{/each}
		</div>
	{/if}
</article>

<style>
	.post-card {
		position: relative;
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--color-border);
	}

	.post-card:last-child {
		border-bottom: none;
	}

	.post-link {
		text-decoration: none;
	}

	/* Stretch link to cover entire card */
	.post-link::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.post-title {
		margin: 0 0 var(--space-2);
		font-size: 1.5rem;
		font-weight: 600;
		transition: color var(--transition-fast);
	}

	.post-card:hover .post-title {
		color: var(--color-text-secondary);
	}

	.post-date {
		display: block;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.post-description {
		margin: var(--space-3) 0;
		color: var(--color-text-secondary);
	}

	.post-tags {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
</style>
