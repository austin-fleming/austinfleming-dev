import type { Expand } from '$utils/expand';
import type { SimpleBlockText } from './fragments/simple-block-text';

export type ImageAsset = {
	// HACK: need this to hook into for serialization
	_type: 'image_asset';
	alt: string;
	aspectRatio: number;
	attribution?: string;
	base64Lqip: string;
	caption?: SimpleBlockText;
	height: number;
	id: string;
	provider: 'SANITY';
	url: string;
	width: number;
};

type AspectRatio = {
	// ex. 16:9
	delimited: string;
	// 125
	heightPercentage: number;
	// ex. 0.59
	ratio: number;
};

type MediaBase = {
	_type: string;
	alt: string;
	attribution?: string;
	caption?: SimpleBlockText;
	id: string;
	provider: string;
};

type Rendition = {
	height: number;
	width: number;
};

type Renditions = {
	'1:1': Rendition;
	'4:5': Rendition;
	intrinsic: Rendition;
};

type Palette = {
	// palette.dominant.background
	background: string;
	// palette.dominant.foreground
	foreground: string;
	// palette.dominant.foreground === '#fff'
	useWhiteOverlayText: boolean;
};

type UpdatedImageAsset = Expand<
	MediaBase & {
		_type: 'image_asset';
		aspectRatio: AspectRatio;
		base64Lqip: string;
	}
>;

/* 
{
	...baseProps,
	renditions: {
		intrinsic: {
			aspectRatio: AspectRatio;
			default: {},
			'256': {},
			'384': {
				sourceJpeg: string;
				sourceWebP: string;
				width: number;
				height: number;
			},
			'500': {},
			'800': {},
			'1200': {},
			'1920': {}, 
			'3840': {}
		},
		'1:1': {},
		'4:5': {}
	}
}

*/
