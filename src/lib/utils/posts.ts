import type { Post, PostMetadata } from '$lib/types/post';

export async function getAllPosts(): Promise<Post[]> {
	const postFiles = import.meta.glob<{ metadata: PostMetadata }>(
		'/src/content/posts/*.md',
		{ eager: true }
	);

	const posts: Post[] = Object.entries(postFiles)
		.map(([path, file]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				metadata: file.metadata,
				slug
			};
		})
		.filter((post) => post.metadata?.published)
		.sort((a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
		);

	return posts;
}

export function getAllTags(posts: Post[]): string[] {
	const tagSet = new Set<string>();
	posts.forEach((post) => {
		post.metadata.tags?.forEach((tag) => tagSet.add(tag));
	});
	return Array.from(tagSet).sort();
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
	return posts.filter((post) =>
		post.metadata.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
	);
}
