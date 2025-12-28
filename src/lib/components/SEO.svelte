<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		article?: boolean;
		publishedTime?: string;
		modifiedTime?: string;
	}

	let {
		title = siteConfig.title,
		description = siteConfig.description,
		image = siteConfig.defaultImage,
		article = false,
		publishedTime,
		modifiedTime
	}: Props = $props();

	const canonicalUrl = $derived(`${siteConfig.url}${$page.url.pathname}`);
	const fullTitle = $derived(title === siteConfig.title ? title : `${title} | ${siteConfig.title}`);
	const imageUrl = $derived(image.startsWith('http') ? image : `${siteConfig.url}${image}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={siteConfig.title} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if article && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	{#if article && modifiedTime}
		<meta property="article:modified_time" content={modifiedTime} />
	{/if}
</svelte:head>
