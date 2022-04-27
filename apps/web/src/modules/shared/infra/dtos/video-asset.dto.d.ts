import type { Combine } from 'src/utils/combine';
import type { MuxAsset } from './fragments/mux-asset.dto';
import type { DocumentBase } from './fragments/document-base.dto';

type AssetData = Combine<
	DocumentBase,
	{
		_type: 'mux.videoAsset';
		assetId: string;
		data: MuxAsset;
		playbackId: string;
		status: 'ready';
		uploadId: string;
	}
>;

/* Reflects a published state */
export type VideoAssetDTO = Combine<
	DocumentBase,
	{
		_type: 'video_asset';
		asset_data: {
			asset: AssetData;
		};
		attribution?: string;
		caption?: string;
		title: string;
	}
>;
