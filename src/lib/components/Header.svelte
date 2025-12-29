<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';
	import ThemeToggle from './ThemeToggle.svelte';

	const navLinks = [
		{ href: '/', label: 'Blog' },
		{ href: '/about/', label: 'About' }
	];

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') {
			return pathname === '/' || pathname.startsWith('/blog') || pathname.startsWith('/tags');
		}
		return pathname.startsWith(href);
	}
</script>

<header class="header">
	<div class="header-inner">
		<a href="/" class="logo">{siteConfig.title}</a>
		<nav class="nav">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" class:active={isActive(link.href, $page.url.pathname)}>
					{link.label}
				</a>
			{/each}
			<ThemeToggle />
		</nav>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
		transition: background-color var(--transition-normal);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 720px;
		margin: 0 auto;
		padding: var(--space-4) var(--space-4);
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
	}

	.logo:hover {
		opacity: 1;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.nav-link {
		font-size: 0.9375rem;
		text-decoration: none;
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-text);
		opacity: 1;
	}

	.nav-link.active {
		color: var(--color-text);
		font-weight: 500;
	}

	@media (max-width: 480px) {
		.nav {
			gap: var(--space-3);
		}

		.nav-link {
			font-size: 0.875rem;
		}
	}
</style>
