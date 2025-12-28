import type { Component } from 'svelte';

export interface PostMetadata {
	title: string;
	description: string;
	date: string;
	updated?: string;
	tags: string[];
	published: boolean;
	image?: string;
	imageAlt?: string;
}

export interface Post {
	metadata: PostMetadata;
	slug: string;
}

export interface PostWithContent extends Post {
	content: Component;
}
