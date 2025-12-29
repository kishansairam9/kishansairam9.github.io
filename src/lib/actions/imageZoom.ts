import mediumZoom from 'medium-zoom';
import type { Action } from 'svelte/action';

export const imageZoom: Action<HTMLElement> = (node) => {
	const images = node.querySelectorAll('img');
	const zoom = mediumZoom(images, {
		margin: 24,
		background: 'var(--color-bg)'
	});

	return {
		destroy() {
			zoom.detach();
		}
	};
};
