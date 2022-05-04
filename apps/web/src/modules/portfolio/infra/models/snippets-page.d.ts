import type { ImageAsset } from './image-asset';
import type { VideoAsset } from './video-asset';

export type Snippet = ImageAsset | VideoAsset;

export type SnippetsPage = {
	_type: 'snippets_page';
	id: string;
	path: string;
	snippets: Snippet[];
};
