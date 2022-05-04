// REF: https://github.com/portabletext/types/blob/main/src/portableText.ts

import type { ImageAssetDTO } from '../image-asset.dto';
import type { VideoAssetDTO } from '../video-asset.dto';
import type { LinkDTO } from './link-dto';

type Mark = 'strong' | 'em' | 'strike-through';

type BlockStyle =
	| 'normal'
	| 'heading1'
	| 'heading2'
	| 'heading3'
	| 'heading4'
	| 'blockquote'
	| string;

type ListItemType = 'bullet' | 'number';

type PortableTextSpan = {
	_key: string;
	_type: 'span';
	marks?: Mark[];
	text: string;
};

export type ArticlePortableTextBlockDTO = {
	_key: string;
	_type: 'block';
	children: Array<PortableTextSpan>;
	level?: number;
	listItem?: ListItemType;
	markDefs?: LinkDTO[];
	style: Styles;
};

export type ArticleBlockTextDTO = Array<
	ArticlePortableTextBlockDTO | VideoAssetDTO | ImageAssetDTO
>;
