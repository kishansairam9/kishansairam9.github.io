<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		repo: string;
		repoId: string;
		category: string;
		categoryId: string;
	}

	interface IDiscussionData {
		id: string;
		url: string;
		locked: boolean;
		repository: {
			nameWithOwner: string;
		};
		reactionCount: number;
		totalCommentCount: number;
		totalReplyCount: number;
	}

	interface IUser {
		avatarUrl: string;
		login: string;
		url: string;
	}

	interface IMetadataMessage {
		discussion: IDiscussionData;
		viewer: IUser;
	}

	let { repo, repoId, category, categoryId }: Props = $props();

	let theme = $state('light');
	let container: HTMLElement;
	let metadata = $state<IMetadataMessage | null>(null);

	// Expose comment count for potential future use
	let commentCount = $derived(
		metadata ? metadata.discussion.totalCommentCount + metadata.discussion.totalReplyCount : 0
	);

	onMount(() => {
		// Sync with site theme
		const updateTheme = () => {
			const newTheme =
				document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

			if (theme !== newTheme) {
				theme = newTheme;
				// Update existing giscus iframe
				const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
				iframe?.contentWindow?.postMessage(
					{ giscus: { setConfig: { theme: newTheme } } },
					'https://giscus.app'
				);
			}
		};
		updateTheme();

		// Watch for theme changes
		const themeObserver = new MutationObserver(updateTheme);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		// Listen for giscus metadata messages
		const handleMessage = (event: MessageEvent) => {
			if (event.origin !== 'https://giscus.app') return;
			if (!(typeof event.data === 'object' && event.data.giscus)) return;

			const giscusData = event.data.giscus;
			if ('discussion' in giscusData) {
				metadata = giscusData as IMetadataMessage;
			}
		};
		window.addEventListener('message', handleMessage);

		// Load giscus script
		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.setAttribute('data-repo', repo);
		script.setAttribute('data-repo-id', repoId);
		script.setAttribute('data-category', category);
		script.setAttribute('data-category-id', categoryId);
		script.setAttribute('data-mapping', 'pathname');
		script.setAttribute('data-strict', '1');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '1');
		script.setAttribute('data-input-position', 'top');
		script.setAttribute('data-theme', theme);
		script.setAttribute('data-lang', 'en');
		script.setAttribute('data-loading', 'lazy');
		script.crossOrigin = 'anonymous';
		script.async = true;
		container.appendChild(script);

		return () => {
			themeObserver.disconnect();
			window.removeEventListener('message', handleMessage);
		};
	});
</script>

<section class="giscus-container" bind:this={container}>
	<!-- Giscus will inject iframe here -->
</section>

<style>
	.giscus-container {
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-border, #e5e7eb);
	}
</style>
