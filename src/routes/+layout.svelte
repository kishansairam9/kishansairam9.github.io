<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/global.css';

	let { children } = $props();

	// Check if we're on a blog post page (needs full-width for 3-column layout)
	let isBlogPost = $derived($page.url.pathname.startsWith('/blog/') && $page.url.pathname !== '/blog/');
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="app">
	<Header />
	<main class:blog-post={isBlogPost}>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
		padding: var(--space-5) var(--space-4);
	}

	main.blog-post {
		max-width: none;
		padding: var(--space-5) 0;
	}
</style>
