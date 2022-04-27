export type VideoAsset = {
	// HACK: this is only needed for portable text deserialization
	_type: 'video_asset';
	aspectRatio: number;
	attribution?: string;
	caption?: string;
	duration: number;
	frameRate: number;
	height: number;
	hlsPlaybackUrl: string;
	id: string;
	playbackId: string;
	provider: 'MUX';
	thumbnailUrl: string;
	title: string;
	width: number;
};
