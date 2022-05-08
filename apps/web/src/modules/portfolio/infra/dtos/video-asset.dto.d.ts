import type { Combine } from 'src/utils/combine';
import type { MuxAsset } from './fragments/mux-asset.dto';
import type { DocumentBaseDTO } from './fragments/document-base.dto';
import type { SimpleBlockTextDTO } from './fragments/simple-block-text-dto';

type AssetData = Combine<
	DocumentBaseDTO,
	{
		_type: 'mux.videoAsset';
		assetId: string;
		data: MuxAsset;
		playbackId: string;
		status: 'ready';
		thumbTime?: number;
		uploadId: string;
	}
>;

/* Reflects a published state */
export type VideoAssetDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'video_asset';
		asset_data: {
			asset: AssetData;
		};
		attribution?: string;
		caption?: SimpleBlockTextDTO;
		title: string;
		videoTitle: string;
	}
>;
