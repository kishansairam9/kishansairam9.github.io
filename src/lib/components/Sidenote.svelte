<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { sidenotes } from '$lib/stores/sidenotes';

	let { id, children }: { id: number | string; children: Snippet } = $props();
	let contentEl: HTMLSpanElement;

	onMount(() => {
		// Extract only the content text (not the number)
		if (contentEl) {
			sidenotes.add({ id, content: contentEl.textContent || '' });
		}
	});
</script>

<span class="sidenote-wrapper">
	<a href="#footnote-{id}" class="sidenote-ref"><sup>{id}</sup></a>
	<span class="sidenote" role="note">
		<sup class="sidenote-number">{id}</sup>
		<span class="sidenote-content" bind:this={contentEl}>{@render children()}</span>
	</span>
</span>

<style>
	.sidenote-wrapper {
		/* wrapper stays inline */
	}

	.sidenote-ref {
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.sidenote-ref:hover {
		opacity: 1;
	}

	.sidenote {
		float: right;
		clear: right;
		margin-right: -240px;
		width: 200px;
		margin-top: 0.25em;
		margin-bottom: 0.5em;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--color-text-secondary);
		vertical-align: baseline;
	}

	.sidenote-number {
		color: var(--color-text-secondary);
		margin-right: 0.25em;
		font-size: 0.85em;
	}

	/* Mobile: hide inline sidenotes (shown as footnotes at end) */
	@media (max-width: 1100px) {
		.sidenote {
			display: none;
		}
	}
</style>
