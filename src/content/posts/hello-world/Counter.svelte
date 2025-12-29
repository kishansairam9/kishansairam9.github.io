<script lang="ts">
	let count = $state(0);

	function increment() {
		count++;
	}

	function decrement() {
		count--;
	}
</script>

<div class="counter">
	<button onclick={decrement} aria-label="Decrement">−</button>
	<span class="count">{count}</span>
	<button onclick={increment} aria-label="Increment">+</button>
</div>

<style>
	.counter {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		margin: 1rem 0;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		font-size: 1.25rem;
		font-weight: 600;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		color: var(--color-text);
		cursor: pointer;
		transition: all 150ms ease;
	}

	button:hover {
		background: var(--color-border);
	}

	button:active {
		transform: scale(0.95);
	}

	.count {
		min-width: 3rem;
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
</style>
