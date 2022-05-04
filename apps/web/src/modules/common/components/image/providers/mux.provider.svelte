<script lang="ts">
	import { breakpointsConfig } from '$config/breakpoints.config';
	import { imageSizesConfig } from '$config/image-sizes.config';

	// `https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&width=${width}&height=${height}&time=${time}`

	type Breakpoints = keyof typeof breakpointsConfig;
	type CreateImageOptions = {
		height: number;
		time: number;
		width: number;
	};

	let _class = '';
	export { _class as class };

	export let preload = false;
	export let alt: string;
	export let thumbnailUrl: string;
	export let width: number;
	export let height: number;
	export let time = 0;
	export let sizes: Partial<Record<Breakpoints, string>> = {};

	const buildSize = (breakpoint: Breakpoints, value: string) =>
		`(min-width: ${breakpointsConfig[breakpoint]}px) ${value}`;

	const sizeList = [
		sizes['2xl'] && buildSize('2xl', sizes['2xl']),
		sizes['xl'] && buildSize('xl', sizes['xl']),
		sizes['lg'] && buildSize('lg', sizes['lg']),
		sizes['md'] && buildSize('md', sizes['md']),
		sizes['sm'] && buildSize('sm', sizes['sm']),
		'100vw'
	]
		.filter((size): size is string => !!size)
		.join(', ');

	const createImage =
		(thumbnailUrl: string) =>
		({ height, width, time }: CreateImageOptions) =>
			`${thumbnailUrl}?fit_mode=crop&width=${width}&height=${height}&time=${time}`;

	const sourceBuilder =
		(thumbnailUrl: string) => (options: CreateImageOptions) => (targetWidth: number) => {
			const computedHeight = Math.floor(targetWidth / (width / height));
			const builtUrl = createImage(thumbnailUrl)({
				height: computedHeight,
				width: targetWidth,
				time
			});
			return `${builtUrl} ${targetWidth}w`;
		};
	const defaultBuilder =
		(thumbnailUrl: string) => (options: CreateImageOptions) => (targetWidth: number) => {
			const computedHeight = Math.floor(targetWidth / (width / height));
			return createImage(thumbnailUrl)({ height: computedHeight, width: targetWidth, time });
		};

	const sources = imageSizesConfig
		.map(sourceBuilder(thumbnailUrl)({ time, width, height }))
		.join(', ');
	const defaultImage = defaultBuilder(thumbnailUrl)({ time, width, height })(
		imageSizesConfig[imageSizesConfig.length - 1]
	);
</script>

<img
	class={_class}
	sizes={sizeList}
	srcset={sources}
	src={defaultImage}
	{width}
	{height}
	{alt}
	loading={preload ? 'eager' : 'lazy'}
	decoding={preload ? 'auto' : 'async'}
/>
