// REF: https://github.com/portabletext/types/blob/main/src/portableText.ts

type Mark = 'strong' | 'em' | 'strike-through';

type BlockStyle = 'normal' | string;

type ListItemType = 'bullet' | 'number';

type PortableTextSpan = {
	_key: string;
	_type: 'span';
	marks?: Mark[];
	text: string;
};

export type SimpleBlockTextDTO = Array<{
	_key: string;
	_type: 'block';
	children: Array<PortableTextSpan>;
	level?: number;
	listItem?: ListItemType;
	markDefs?: string[];
	style: Styles;
}>;
