import type { ImageAssetDTO } from '../image-asset.dto';
import type { VideoAssetDTO } from '../video-asset.dto';
import type { ArticleTextSectionDTO } from './article-text-section.dto';

export type ArticleBodyDTO = Array<
	{ _key: string } & (ArticleTextSectionDTO | VideoAssetDTO | ImageAssetDTO)
>;
