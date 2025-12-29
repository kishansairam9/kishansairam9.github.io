import { writable } from 'svelte/store';

export interface SidenoteData {
	id: number | string;
	content: string;
}

function createSidenotesStore() {
	const { subscribe, set, update } = writable<SidenoteData[]>([]);

	return {
		subscribe,
		add: (sidenote: SidenoteData) => {
			update((notes) => {
				// Avoid duplicates
				if (notes.some((n) => n.id === sidenote.id)) return notes;
				return [...notes, sidenote].sort((a, b) => Number(a.id) - Number(b.id));
			});
		},
		reset: () => set([])
	};
}

export const sidenotes = createSidenotesStore();
