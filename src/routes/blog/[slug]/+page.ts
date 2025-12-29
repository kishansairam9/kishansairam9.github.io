import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { PostMetadata } from '$lib/types/post';
import type { Component } from 'svelte';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/posts/${params.slug}/index.md`);
		return {
			content: post.default as Component,
			metadata: post.metadata as PostMetadata,
			slug: params.slug
		};
	} catch {
		throw error(404, 'Post not found');
	}
};
