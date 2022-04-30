import type { SimpleBlockText } from './fragments/simple-block-text';

export type VideoAsset = {
	// HACK: this is only needed for portable text deserialization
	_type: 'video_asset';
	aspectRatio: number;
	attribution?: string;
	caption?: SimpleBlockText;
	duration: number;
	frameRate: number;
	gifUrl?: string;
	height: number;
	hlsPlaybackUrl: string;
	id: string;
	playbackId: string;
	provider: 'MUX';
	thumbnailUrl: string;
	title: string;
	width: number;
};

type Mp4Track = {
	bitrate: number;
	fileType: 'mp4';
	height: number;
	source: string;
	width: number;
};

type Mp4Tracks = {
	high: Mp4Video;
	low: Mp4Video;
	medium: Mp4Video;
};

type HlsTrack = {
	fileType: 'hls';
	maxFrameRate: number;
	maxHeight: number;
	maxWidth: number;
	source: string;
};

type Thumbnail = {
	height: number;
	source: string;
	width: number;
};

type MakeThumbnailOptions = {
	height: number;
	objectFit: 'fit' | 'cover';
	time: number;
	width: number;
};

type MakeCreateThumbnail = (playbackId: string) => (options: MakeThumbnailOptions) => string;

type UpdatedVideo = {
	// NOTE: this is only needed for portable text deserialization
	_type: 'video_asset';
	aspectRatio: {
		// ex. 16:9
		delimited: string;
		// ex. 0.59
		ratio: number;
	};
	attribution?: string;
	caption?: SimpleBlockText;
	durationInSeconds: number;
	formats: {
		hls: HlsTrack;
		mp4: Mp4Tracks;
	};
	id: string;
	playbackId: string;
	provider: 'MUX';
};
