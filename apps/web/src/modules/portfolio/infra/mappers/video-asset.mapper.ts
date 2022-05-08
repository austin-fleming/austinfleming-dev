import type { VideoTrack, Track, PlaybackId } from '../dtos/fragments/mux-asset.dto';
import type { VideoAssetDTO } from '../dtos/video-asset.dto';
import type { SeoVideo } from '../models/fragments/seo-video';
import type { MakeCreateThumbnail, VideoAsset } from '../models/video-asset';
import { imageService } from '../services/image.service';
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

const makeCreateThumbnail: MakeCreateThumbnail = (playbackId) => (options) => (width: number) => {
	const computedWidth = Math.floor(width);
	const computedHeight = Math.floor(width / (options.width / options.height));

	return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=${computedWidth}&height=${computedHeight}&fit_mode=${options.objectFit}&time=${options.time}`;
};

const dtoToModel = (dto: VideoAssetDTO): VideoAsset => {
	const { attribution, caption, title, videoTitle, asset_data, _id, _type } = dto;

	const { tracks, playback_ids, aspect_ratio, static_renditions } = asset_data.asset.data;

	const playbackId = findPlaybackId(playback_ids);

	const { duration, max_frame_rate, max_height, max_width } = findVideoTrack(tracks);

	if (!static_renditions?.files)
		throw new Error(`Could not find MP4 version of video with id of "${_id}"`);

	const mp4High = static_renditions.files.find((rendition) => rendition.name === 'high.mp4');
	if (!mp4High) throw new Error(`Could not find high quality MP4 for video with id of "${_id}"`);

	const mp4Medium = static_renditions.files.find((rendition) => rendition.name === 'medium.mp4');
	if (!mp4Medium)
		throw new Error(`Could not find medium quality MP4 for video with id of "${_id}"`);

	const mp4Low = static_renditions.files.find((rendition) => rendition.name === 'low.mp4');
	if (!mp4Low) throw new Error(`Could not find low quality MP4 for video with id of "${_id}"`);

	const thumbnailFactory = makeCreateThumbnail(playbackId)({
		height: max_height,
		objectFit: 'cover',
		time: 0,
		width: max_width
	});

	return {
		_type,
		aspectRatio: {
			delimited: aspect_ratio,
			ratio: max_width / max_height
		},
		attribution,
		...(caption ? { caption: simpleBlockTextMapper.dtoToModel(caption) } : {}),
		durationInSeconds: duration,
		formats: {
			hls: {
				fileType: 'hls',
				maxFrameRate: max_frame_rate,
				maxHeight: max_height,
				maxWidth: max_width,
				source: makeMuxHlsUrl(playbackId)
			},
			mp4: {
				high: {
					bitrate: mp4High.bitrate,
					fileType: 'mp4',
					height: mp4High.height,
					source: `https://stream.mux.com/${playbackId}/high.mp4`,
					width: mp4High.width
				},
				low: {
					bitrate: mp4Low.bitrate,
					fileType: 'mp4',
					height: mp4Low.height,
					source: `https://stream.mux.com/${playbackId}/low.mp4`,
					width: mp4Low.width
				},
				medium: {
					bitrate: mp4Medium.bitrate,
					fileType: 'mp4',
					height: mp4Medium.height,
					source: `https://stream.mux.com/${playbackId}/medium.mp4`,
					width: mp4Medium.width
				}
			}
		},
		id: _id,
		playbackId,
		provider: 'MUX',
		thumbnailFactory,
		thumbnailUrl: `https://image.mux.com/${playbackId}/thumbnail.jpg`,
		title: videoTitle
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
