import type { Combine } from 'src/utils/combine';
import type { DocumentBase } from './fragments/document-base.dto';

type HexColor = `#${string}`;

type Base64Image = `data:image${string}`;

type SanityImageAsset = Combine<
	DocumentBase,
	{
		_type: 'sanity.imageAsset';
		assetId: string;
		extension: string;
		metadata: {
			_type: 'sanity.imageMetadata';
			blurHash: string;
			dimensions: {
				_type: 'sanity.imageDimensions';
				aspectRatio: number;
				height: number;
				width: number;
			};
			exif: {
				ColorSpace: number;
				PixelXDimension: number;
				PixelYDimension: number;
				_type: 'sanity.imageExifMetadata';
			};
			hasAlpha: boolean;
			isOpaque: boolean;
			lqip: Base64Image;
			palette: {
				_type: 'sanity.imagePalette';
				darkMuted: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				darkVibrant: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				dominant: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				lightMuted: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				lightVibrant: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				muted: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
				vibrant: {
					_type: 'sanity.imagePaletteSwatch';
					background: HexColor;
					foreground: HexColor;
					population: number;
					title: HexColor;
				};
			};
		};
		mimeType: `image${string}`;
		originalFilename: string;
		path: string;
		sha1hash: string;
		size: number;
		uploadId: string;
		url: string;
	}
>;

export type ImageAssetDTO = Combine<
	DocumentBase,
	{
		_type: 'image_asset';
		image: {
			_type: 'image';
			alt: string;
			asset: SanityImageAsset;
			attribution?: string;
			caption?: string;
		};
		title: string;
	}
>;
