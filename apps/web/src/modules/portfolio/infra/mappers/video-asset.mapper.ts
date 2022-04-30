import { aspectRatio } from '$utils/aspect-ratio';
import type { VideoTrack, Track, PlaybackId } from '../dtos/fragments/mux-asset.dto';
import type { VideoAssetDTO } from '../dtos/video-asset.dto';
import type { SeoVideo } from '../models/fragments/seo-video';
import type { VideoAsset } from '../models/video-asset';
import { simpleBlockTextMapper } from './fragments/simple-block-text.mapper';

const makeMuxHlsUrl = (playbackId: string): string => `https://stream.mux.com/${playbackId}.m3u8`;

const makeMuxThumbnail = (playbackId: string): string =>
	`https://image.mux.com/${playbackId}/thumbnail.jpg`;

const makeMuxGif = (playbackId: string): string =>
	`https://image.mux.com/${playbackId}/animated.gif?start=0&end=3&width=600`;

/**
 * Takes an array of tracks and either returns the first track of type "video" or throws an error
 */
const findVideoTrack = (tracks: Track[]): VideoTrack => {
	const track = tracks.find((track) => track.type === 'video');

	if (!track)
		throw new Error(
			`Could not build video provided by "MUX" because no track with type of "video" could be found.`
		);

	return track as VideoTrack;
};

/**
 * Takes an array of possible playback IDs and either returns the first id or throws an error
 */
const findPlaybackId = (playbackIds: PlaybackId[]): string => {
	const id = playbackIds?.[0]?.id;

	if (!id)
		throw new Error(
			`Could not build video provided by "MUX" because no playback IDs could be found.`
		);

	return id;
};

const dtoToModel = (dto: VideoAssetDTO): VideoAsset => {
	const { attribution, caption, title, asset_data, _id, _type } = dto;

	const { tracks, playback_ids } = asset_data.asset.data;

	const playbackId = findPlaybackId(playback_ids);

	const { duration, max_frame_rate, max_height, max_width } = findVideoTrack(tracks);

	return {
		_type,
		aspectRatio: aspectRatio(max_width, max_height),
		attribution,
		caption: caption ? simpleBlockTextMapper.dtoToModel(caption) : undefined,
		duration,
		frameRate: max_frame_rate,
		gifUrl: makeMuxGif(playbackId),
		height: max_height,
		hlsPlaybackUrl: makeMuxHlsUrl(playbackId),
		id: _id,
		playbackId,
		provider: 'MUX',
		thumbnailUrl: makeMuxThumbnail(playbackId),
		title,
		width: max_width
	};
};

// TODO: need MP4 version for SEO
const dtoToSeoVideo = (dto: VideoAssetDTO): SeoVideo => {
	const { max_height, max_width } = findVideoTrack(dto.asset_data.asset.data.tracks);
	const playbackId = findPlaybackId(dto.asset_data.asset.data.playback_ids);

	return {
		height: max_height,
		title: dto.title,
		url: makeMuxHlsUrl(playbackId),
		width: max_width
	};
};

export const videoAssetMapper = {
	dtoToModel,
	dtoToSeoVideo
};
