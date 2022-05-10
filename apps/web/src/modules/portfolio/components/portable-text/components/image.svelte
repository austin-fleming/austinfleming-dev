<script lang="ts">
	import type { ImageAsset } from '$modules/portfolio/infra/models/image-asset';
	import ImageAttribution from '../../image/image-attribution.svelte';
	import ImageCaption from '../../image/image-caption.svelte';
	import Image from '../../image/image.svelte';
	import SimplePortableText from '../simple-portable-text.svelte';

	const { alt, attribution, caption, url }: ImageAsset = $$props.portableText.block;
</script>

<Image {alt} imageSource={url} class="not-prose w-full max-w-container">
	{#if attribution}
		<ImageAttribution>
			{attribution}
		</ImageAttribution>
	{/if}
	{#if caption}
		<ImageCaption><SimplePortableText blocks={caption} /></ImageCaption>
	{/if}
</Image>
