import type { Expand } from '$utils/expand';
import type { ArticlePortableTextBlockDTO } from '../../dtos/fragments/article-block-text-dto';
import type { ImageAsset } from '../image-asset';
import type { VideoAsset } from '../video-asset';
import type { Link } from './link';

type ArticlePortableTextBlock = Expand<
	Omit<ArticlePortableTextBlockDTO, 'markDefs'> & {
		markDefs?: Link[];
	}
>;

export type ArticleBlockText = Array<ArticlePortableTextBlock | VideoAsset | ImageAsset>;
