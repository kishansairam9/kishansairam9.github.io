<script lang="ts">
	import { onMount } from 'svelte';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let { headings = [] }: { headings: Heading[] } = $props();
	let activeId = $state('');

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '-80px 0px -80% 0px' }
		);

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	});
</script>

{#if headings.length > 0}
	<nav class="toc">
		<ul>
			{#each headings as heading}
				<li class:active={activeId === heading.id} class:indent={heading.level === 3}>
					<a href="#{heading.id}">{heading.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		max-height: 80vh;
		overflow-y: auto;
	}

	/* Only sticky on desktop */
	@media (min-width: 1101px) {
		.toc {
			position: sticky;
			top: 50vh;
			transform: translateY(-50%);
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin: 0;
		padding: 0;
	}

	li.indent {
		padding-left: var(--space-4);
	}

	a {
		display: block;
		padding: 0.35rem 0;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color var(--transition-fast);
		line-height: 1.4;
	}

	a:hover {
		color: var(--color-text);
		opacity: 1;
	}

	li.active a {
		color: var(--color-text);
	}
</style>
