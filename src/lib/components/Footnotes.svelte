<script lang="ts">
	import { sidenotes } from '$lib/stores/sidenotes';
</script>

<!-- Always render for anchor targets, hidden on desktop -->
<aside class="footnotes" class:has-notes={$sidenotes.length > 0}>
	{#if $sidenotes.length > 0}
		<h3>Notes</h3>
		<div class="notes-list">
			{#each $sidenotes as note}
				<p class="note" id="footnote-{note.id}">
					<sup>{note.id}</sup> {note.content}
				</p>
			{/each}
		</div>
	{/if}
</aside>

<style>
	.footnotes {
		display: none;
	}

	.footnotes.has-notes {
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-border);
	}

	h3 {
		font-size: 1.25rem;
		margin-bottom: var(--space-4);
	}

	.notes-list {
		margin: 0;
	}

	.note {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0 0 var(--space-3);
		line-height: 1.6;
	}

	.note sup {
		color: var(--color-text-secondary);
		margin-right: 0.25em;
	}

	/* Only show on mobile */
	@media (max-width: 1100px) {
		.footnotes.has-notes {
			display: block;
		}
	}
</style>
