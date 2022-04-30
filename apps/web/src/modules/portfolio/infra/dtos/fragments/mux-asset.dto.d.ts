// Copied from: https://github.com/muxinc/mux-node-sdk/blob/master/src/video/domain.ts

// Original from mux:
/* interface Asset {
	aspect_ratio?: string;
	created_at: string;
	duration?: number;
	errors?: AssetError;
	id: string;
	is_live?: boolean;
	master?: AssetMaster;
	master_access: AssetMasterAccess;
	max_stored_frame_rate?: number;
	max_stored_resolution?: 'Audio only' | 'SD' | 'HD' | 'FHD' | 'UHD';
	mp4_support: AssetMp4Support;
	passthrough?: string;
	per_title_encode?: boolean;
	playback_ids?: Array<PlaybackId>;
	static_renditions?: StaticRenditions;
	status: 'preparing' | 'ready' | 'errored';
	tracks?: Array<Track>;
} */

// updated to reflect successful upload
interface Asset {
	aspect_ratio: string;
	created_at: string;
	duration: number;
	errors?: AssetError;
	id: string;
	is_live?: boolean;
	master?: AssetMaster;
	master_access: AssetMasterAccess;
	max_stored_frame_rate: number;
	max_stored_resolution: 'Audio only' | 'SD' | 'HD' | 'FHD' | 'UHD';
	mp4_support: AssetMp4Support;
	passthrough: string;
	per_title_encode?: boolean;
	playback_ids: Array<PlaybackId>;
	static_renditions?: StaticRenditions;
	status: 'preparing' | 'ready' | 'errored';
	tracks: Array<Track>;
}

type PlaybackIdPolicy = 'public' | 'signed';
type AssetMp4Support = 'none' | 'standard';
type AssetMasterAccess = 'none' | 'temporary';
type TrackStatus = 'preparing' | 'ready' | 'errored';

interface SigningKey {
	created_at: string;
	id: string;
	private_key?: string;
}

interface Identifier {
	id: string;
	type: 'asset' | 'live_stream';
}

interface PlaybackIdentifier {
	id: string;
	object: Identifier;
	policy: 'public' | 'signed';
}

export interface PlaybackId {
	id: string;
	policy: 'public' | 'signed';
}

interface AudioTrack {
	duration: number;
	id: string;
	max_channel_layout: string;
	max_channels: number;
	passthrough: string;
	status: TrackStatus;
	type: 'audio';
}

interface TextTrack {
	closed_captions: boolean;
	id: string;
	language_code: string;
	name: string;
	passthrough: string;
	status: TrackStatus;
	text_type: 'subtitles';
	type: 'text';
}

export interface VideoTrack {
	duration: number;
	id: string;
	max_frame_rate: number;
	max_height: number;
	max_width: number;
	passthrough: string;
	status: TrackStatus;
	type: 'video';
}

export type Track = VideoTrack | AudioTrack | TextTrack;

interface InputOverlaySettings {
	height?: string;
	horizontal_align?: 'left' | 'center' | 'right';
	horizontal_margin?: string;
	opacity?: string;
	vertical_align?: 'top' | 'middle' | 'bottom';
	vertical_margin?: string;
	width?: string;
}

interface InputSettings {
	closed_captions?: boolean;
	end_time?: number;
	language_code?: string;
	name?: string;
	overlay_settings?: InputOverlaySettings;
	passthrough?: string;
	start_time?: number;
	text_type?: 'subtitles';
	type?: 'video' | 'audio' | 'text';
	url: string;
}

interface CreateAssetParameters {
	input: string | Array<InputSettings>;
	master_access?: AssetMasterAccess;
	mp4_support?: AssetMp4Support;
	normalize_audio?: boolean;
	passthrough?: string;
	per_title_encode?: boolean;
	playback_policy?: PlaybackIdPolicy | Array<PlaybackIdPolicy>;
	test?: boolean;
}

interface StaticRendition {
	bitrate: number;
	ext: 'mp4';
	filesize: number;
	height: number;
	name: 'low.mp4' | 'medium.mp4' | 'high.mp4';
	width: number;
}

interface StaticRenditions {
	files: Array<StaticRendition>;
	status: 'ready' | 'preparing' | 'errored';
}

interface AssetMaster {
	status: 'ready' | 'preparing' | 'errored';
	url: string;
}

interface AssetError {
	messages: Array<string>;
	type: 'invalid_input' | string;
}

interface InputTrack {
	channels?: number;
	duration?: number;
	encoding?: string;
	frame_rate?: number;
	height?: number;
	sample_rate?: number;
	sample_size?: number;
	type?: string;
	width?: number;
}

interface InputFile {
	container_format?: string;
	tracks?: Array<InputTrack>;
}

interface InputInfo {
	file: InputFile;
	settings: InputOverlaySettings;
}

interface ListAssetParameters {
	limit?: number;
	live_stream_id?: string;
	page?: number;
	upload_id?: string;
}

interface CreatePlaybackIdParameters {
	policy: PlaybackIdPolicy;
}

interface CreateTrackParameters {
	closed_captions?: boolean;
	language_code: string;
	name?: string;
	passthrough?: string;
	text_type: 'subtitles';
	type: 'text';
	url: string;
}

interface UpdateMp4SupportParameters {
	mp4_support: AssetMp4Support;
}

interface UpdateMasterAccessParameters {
	master_access: AssetMasterAccess;
}

interface ListDeliveryUsageParameters {
	asset_id?: string;
	limit?: number;
	page?: number;
	timeframe: Array<number>;
}

interface DeliveryReport {
	asset_duration: number;
	asset_id: string;
	asset_state: string;
	created_at: string;
	delivered_seconds: number;
	live_stream_id?: string;
	passthrough?: string;
}

interface SimulcastTargetParameters {
	passthrough?: string;
	stream_key?: string;
	url: string;
}

interface SimulcastTarget {
	id?: string;
	passthrough?: string;
	status: 'idle' | 'starting' | 'broadcasting' | 'errored';
	stream_key?: string;
	url: string;
}

interface LiveStream {
	active_asset_id?: string;
	created_at?: string;
	id?: string;
	latency_mode?: 'low' | 'reduced' | 'standard';
	new_asset_settings?: Asset;
	passthrough?: string;
	playback_ids?: Array<PlaybackId>;
	recent_asset_ids?: Array<string>;
	reconnect_window?: number;
	reduced_latency?: boolean;
	simulcast_targets?: Array<SimulcastTarget>;
	status?: string;
	stream_key?: string;
	test?: boolean;
}

interface CreateLiveStreamParameters {
	latency_mode?: 'low' | 'reduced' | 'standard';
	new_asset_settings?: Partial<CreateAssetParameters>;
	passthrough?: string;
	playback_policy?: PlaybackIdPolicy | Array<PlaybackIdPolicy>;
	reconnect_window?: number;
	reduced_latency?: boolean;
	simulcast_targets?: Array<SimulcastTargetParameters>;
	test?: boolean;
}

interface ListLiveStreamParameters {
	limit?: number;
	live_stream_id?: string;
	page?: number;
	upload_id?: string;
}

interface Upload {
	asset_id?: string;
	cors_origin?: string;
	error?: {
		message?: string;
		type?: string;
	};
	id: string;
	new_asset_settings: CreateAssetParameters;
	status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out';
	test?: boolean;
	timeout: number;
	url: string;
}

interface CreateUploadParameters {
	cors_origin?: string;
	new_asset_settings?: Partial<CreateAssetParameters>;
	test?: boolean;
	timeout?: string;
}

interface ListUploadParameters {
	limit?: number;
	page?: number;
	upload_id?: string;
}

export type MuxAsset = Asset;
