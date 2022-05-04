import type { Combine } from '$utils/combine';
import type { DocumentBaseDTO } from './fragments/document-base.dto';
import type { ImageAssetDTO } from './image-asset.dto';
import type { VideoAssetDTO } from './video-asset.dto';

export type SnippetDTO = ImageAssetDTO | VideoAssetDTO;

export type SnippetsPageDTO = Combine<
	DocumentBaseDTO,
	{
		_type: 'snippets_page';
		do_not_crawl: boolean;
		snippets: SnippetDTO[];
		title: string;
	}
>;
