<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<SEO title="About" description="Learn more about {siteConfig.author.name}" />

<article class="about">
	<h1>About Me</h1>

	<section class="bio">
		<p>
			Hello! I'm {siteConfig.author.name}, a software developer passionate about building great
			products and sharing knowledge.
		</p>

		<p>
			This is my personal blog where I write about software development, technology, and things I
			find interesting.
		</p>
	</section>

	<section class="connect">
		<h2>Connect</h2>
		<ul>
			<li>
				<a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">GitHub</a>
			</li>
			<li>
				<a href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
			</li>
			<li>
				<a href={siteConfig.author.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
			</li>
		</ul>
	</section>
</article>

<style>
	.about h1 {
		margin-bottom: var(--space-5);
	}

	.about h2 {
		margin-top: var(--space-6);
		margin-bottom: var(--space-3);
	}

	.bio p {
		font-size: 1.125rem;
		line-height: 1.8;
	}

	.connect ul {
		list-style: none;
		padding: 0;
	}

	.connect li {
		margin-bottom: var(--space-2);
	}

	.connect a {
		font-size: 1.0625rem;
	}
</style>
