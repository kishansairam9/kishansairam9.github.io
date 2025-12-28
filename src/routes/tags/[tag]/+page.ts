import { error } from '@sveltejs/kit';
import { getAllPosts, getAllTags, getPostsByTag } from '$lib/utils/posts';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
	const posts = await getAllPosts();
	const tags = getAllTags(posts);
	return tags.map((tag) => ({ tag: tag.toLowerCase() }));
};

export const load: PageLoad = async ({ params }) => {
	const allPosts = await getAllPosts();
	const posts = getPostsByTag(allPosts, params.tag);
	const tags = getAllTags(allPosts);

	if (posts.length === 0) {
		throw error(404, 'No posts found for this tag');
	}

	return { posts, tags, activeTag: params.tag };
};
