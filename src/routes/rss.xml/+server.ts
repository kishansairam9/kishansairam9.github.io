import { siteConfig } from '$lib/config/site';
import { getAllPosts } from '$lib/utils/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts
	.map(
		(post) => `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <description>${escapeXml(post.metadata.description)}</description>
      <link>${siteConfig.url}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
