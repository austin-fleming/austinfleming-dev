<script lang="ts">
	import { breakpointsConfig } from '$config/breakpoints.config';
	import { imageSizesConfig } from '$config/image-sizes.config';
	import { imageService } from '$modules/portfolio/infra/services/image.service';

	/* 
	NOTE: this is currently configured to only handle assets coming out of sanity. "provider" in model will need to be expanded to handle others.
	*/
	// https://medium.com/front-end-weekly/html-picture-tag-in-practice-png-and-webp-formats-5a3fc51b5998
	// https://www.smashingmagazine.com/2021/04/humble-img-element-core-web-vitals/

	let _class = '';
	export { _class as class };

	export let preload = false;
	export let lqip: string;
	export let alt: string;
	export let source: string;

	export let width: number;
	export let height: number;

	type Breakpoints = keyof typeof breakpointsConfig;
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

	const sourceBuilder = (format: 'jpg' | 'webp') => (targetWidth: number) => {
		const computedHeight = Math.floor(targetWidth / (width / height));

		const url = imageService.constructImage(source, {
			width: targetWidth,
			height: computedHeight,
			format
		});

		return `${url} ${targetWidth}w`;
	};

	const webpBuilder = sourceBuilder('webp');
	const webpSource = imageSizesConfig.map(webpBuilder).join(', ');

	const jpgBuilder = sourceBuilder('jpg');
	const jpgSource = imageSizesConfig.map(jpgBuilder).join(', ');
</script>

<picture>
	<source type="image/webp" sizes={sizeList} srcset={webpSource} />
	<img
		srcset={jpgSource}
		sizes={sizeList}
		src="siteimages/image-full.jpg"
		{alt}
		class={`bg-cover bg-center ${_class}`}
		style={`background-image: url(${lqip}); aspect-ratio: ${width} / ${height}`}
		loading={preload ? 'eager' : 'lazy'}
		decoding={preload ? 'auto' : 'async'}
	/>
</picture>
