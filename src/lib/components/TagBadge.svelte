<script lang="ts">
	interface Props {
		tag: string;
		clickable?: boolean;
	}

	let { tag, clickable = true }: Props = $props();
</script>

{#if clickable}
	<a href="/tags/{tag.toLowerCase()}/" class="tag-badge">{tag}</a>
{:else}
	<span class="tag-badge">{tag}</span>
{/if}

<style>
	.tag-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-2);
		font-size: 0.75rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	a.tag-badge:hover {
		background: var(--color-border);
		color: var(--color-text);
		opacity: 1;
	}
</style>
