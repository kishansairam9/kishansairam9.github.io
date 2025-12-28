import { getAllPosts, getAllTags } from '$lib/utils/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await getAllPosts();
	const tags = getAllTags(posts);
	return { posts, tags };
};
