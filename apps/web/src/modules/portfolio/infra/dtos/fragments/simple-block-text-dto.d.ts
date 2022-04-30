// REF: https://github.com/portabletext/types/blob/main/src/portableText.ts

import type { LinkDTO } from './link-dto';

type Mark = 'strong' | 'em' | 'strike-through';

type BlockStyle = 'normal' | string;

type ListItemType = 'bullet' | 'number';

type PortableTextSpan = {
	_key: string;
	_type: 'span';
	marks?: Mark[];
	text: string;
};

export type SimplePortableTextBlockDTO = {
	_key: string;
	_type: 'block';
	children: Array<PortableTextSpan>;
	level?: number;
	listItem?: ListItemType;
	markDefs?: LinkDTO[];
	style: Styles;
};

export type SimpleBlockTextDTO = SimplePortableTextBlockDTO[];
