import type { SimpleBlockText } from './fragments/simple-block-text';

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

export type CreateThumbnail = (width: number) => string;

export type MakeCreateThumbnail = (
	playbackId: string
) => (options: MakeThumbnailOptions) => CreateThumbnail;

export type VideoAsset = {
	// NOTE: _type is only needed for portable text deserialization
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
	thumbnailFactory: CreateThumbnail;
	thumbnailUrl: string;
	title: string;
};
