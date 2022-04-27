export type ImageAsset = {
	// HACK: need this to hook into for serialization
	_type: 'image_asset';
	alt: string;
	aspectRatio: number;
	attribution?: string;
	base64Lqip: string;
	caption?: string;
	height: number;
	id: string;
	provider: 'SANITY';
	url: string;
	width: number;
};
