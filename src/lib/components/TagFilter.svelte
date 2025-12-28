<script lang="ts">
	interface Props {
		tags: string[];
		activeTag?: string;
	}

	let { tags, activeTag }: Props = $props();
</script>

<nav class="tag-filter" aria-label="Filter by tag">
	<a href="/" class="tag-button" class:active={!activeTag}>
		All
	</a>
	{#each tags as tag}
		<a
			href="/tags/{tag.toLowerCase()}/"
			class="tag-button"
			class:active={activeTag === tag.toLowerCase()}
		>
			{tag}
		</a>
	{/each}
</nav>

<style>
	.tag-filter {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-5);
	}

	.tag-button {
		padding: var(--space-1) var(--space-3);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		font-size: 0.875rem;
		text-decoration: none;
		color: var(--color-text-secondary);
		transition: all var(--transition-fast);
	}

	.tag-button:hover {
		background: var(--color-border);
		color: var(--color-text);
		opacity: 1;
	}

	.tag-button.active {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}
</style>
