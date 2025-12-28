<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/config/site';
</script>

<SEO title="Resume" description="Professional experience and skills of {siteConfig.author.name}" />

<article class="resume">
	<header class="resume-header">
		<h1>Resume</h1>
		<a
			href="https://drive.google.com/file/d/1n0w8-0OMd2szJ-ALrd1DQBG4mzER8phl/view?usp=sharing"
			target="_blank"
			rel="noopener noreferrer"
			class="pdf-button"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
				<polyline points="14 2 14 8 20 8"/>
				<line x1="16" y1="13" x2="8" y2="13"/>
				<line x1="16" y1="17" x2="8" y2="17"/>
				<polyline points="10 9 9 9 8 9"/>
			</svg>
			View PDF
		</a>
	</header>

	<section>
		<h2>Experience</h2>
		<div class="entry">
			<div class="entry-header">
				<h3>Software Engineer</h3>
				<span class="date">2023 - Present</span>
			</div>
			<p class="company">Company Name</p>
			<ul>
				<li>Description of your work and achievements</li>
				<li>Another accomplishment or responsibility</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<div class="entry">
			<div class="entry-header">
				<h3>Degree Name</h3>
				<span class="date">2019 - 2023</span>
			</div>
			<p class="company">University Name</p>
		</div>
	</section>

	<section>
		<h2>Skills</h2>
		<div class="skills">
			<span class="skill">JavaScript</span>
			<span class="skill">TypeScript</span>
			<span class="skill">Svelte</span>
			<span class="skill">React</span>
			<span class="skill">Node.js</span>
			<span class="skill">Python</span>
		</div>
	</section>
</article>

<style>
	.resume-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-5);
	}

	.resume h1 {
		margin: 0;
	}

	.pdf-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
		color: var(--color-text);
		transition: all var(--transition-fast);
	}

	.pdf-button:hover {
		background: var(--color-border);
		opacity: 1;
	}

	.resume h2 {
		margin-top: var(--space-6);
		margin-bottom: var(--space-4);
		padding-bottom: var(--space-2);
		border-bottom: 1px solid var(--color-border);
	}

	.entry {
		margin-bottom: var(--space-5);
	}

	.entry-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.entry h3 {
		margin: 0;
	}

	.date {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}

	.company {
		color: var(--color-text-secondary);
		margin: var(--space-1) 0 var(--space-3);
	}

	.entry ul {
		margin: 0;
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.skill {
		padding: var(--space-1) var(--space-3);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-size: 0.875rem;
	}
</style>
