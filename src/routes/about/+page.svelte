<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<SEO title="About" description="Learn more about {siteConfig.author.name}" />

<article class="about">
	<header class="about-header">
		<img src="/images/avatar.jpg" alt={siteConfig.author.name} class="avatar" />
		<h1>About Me</h1>
	</header>

	<section class="bio">
		<p>
			Hello! I'm Kishan, a software developer based out of Hyderabad, India. I graduated from IIIT Hyderabad in 2022 with B.Tech with Honours in Computer Science and Engineering.
		</p>

		<p>
			I have worked on backend roles at Glean and Traceable (Harness). At Glean, I worked on building
			Slack Bot to enable enterprise search capabilities in workplace communication. At Traceable, I 
			worked across various verticals - security product, agent, and platform. I contracted briefly for
			a YC backed startup improving their data pipelines and query layer.
		</p>

		<p>
			My areas of expertise include building scalable backend systems on cloud plaforms using microservices architecture. Experienced in working with Kubernetes, Kafka, Java and Golang. Exploring emerging field of
			AI Agents, LLMs, Diffusion models.
		</p>
	</section>

	<section class="links">
		<a
			href="https://drive.google.com/file/d/1n0w8-0OMd2szJ-ALrd1DQBG4mzER8phl/view?usp=sharing"
			target="_blank"
			rel="noopener noreferrer"
			class="resume-link"
		>
			View Resume
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="external-icon"
			>
				<path d="M7 17L17 7" />
				<path d="M7 7h10v10" />
			</svg>
		</a>
	</section>
</article>

<style>
	.about-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.avatar {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: var(--space-4);
	}

	.about h1 {
		margin-bottom: 0;
	}

	.bio p {
		font-size: 1.125rem;
		line-height: 1.8;
	}

	.links {
		margin-top: var(--space-6);
		text-align: center;
	}

	.resume-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		font-size: 1rem;
		color: var(--color-bg);
		background-color: var(--color-text);
		text-decoration: none;
		border-radius: 6px;
		transition: opacity var(--transition-fast);
	}

	.resume-link:hover {
		opacity: 0.85;
	}

	.external-icon {
		flex-shrink: 0;
	}
</style>
