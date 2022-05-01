import { cmsClient } from '../cms-client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource, ImageFormat } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { pipe } from '$utils/pipe';

// asset.url + params
// https://cdn.sanity.io/images/esukg2dt/production/9e7737cca17df4ea3877497e94a9d1f55b541b90-2517x4116.jpg?rect=0,800,2517,2517&w=300&h=300&fm=webp&q=100
// https://cdn.sanity.io/images/esukg2dt/production/fb49eabdd77867e5fc9a130e64184fd73227cd91-4500x4500.jpg?w=300&h=300&fm=webp&q=100

const builder = imageUrlBuilder(cmsClient);

type UseTransformation<T> = (value: T) => (builder: ImageUrlBuilder) => ImageUrlBuilder;

const useWidth: UseTransformation<number> = (value) => (builder) => builder.width(value);
const useHeight: UseTransformation<number> = (height) => (builder) => builder.height(height);
const useFormat: UseTransformation<ImageFormat> = (format) => (builder) => builder.format(format);
const useQuality: UseTransformation<number> = (quality) => (builder) => builder.quality(quality);

const useIf =
	<T>(value: T | undefined, fn: UseTransformation<T>) =>
	(builder: ImageUrlBuilder): ImageUrlBuilder =>
		value ? fn(value)(builder) : builder;

type ImageOptions = {
	format: 'jpg' | 'webp';
	height?: number;
	quality?: number;
	width?: number;
};

const constructImage = (source: SanityImageSource, options: ImageOptions) => {
	const urlBuilder = builder.image(source);

	const transformations = pipe(
		useIf(options.width, useWidth),
		useIf(options.height, useHeight),
		useIf(options.quality, useQuality),
		useIf(options.format, useFormat)
	);

	return transformations(urlBuilder).url();
};

export const imageService = {
	constructImage
};
