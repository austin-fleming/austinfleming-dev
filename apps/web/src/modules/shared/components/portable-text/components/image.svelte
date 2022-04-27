<script lang="ts">
	import type { ImageAsset } from '$modules/shared/infra/models/image-asset';
	import Image from '../../image.svelte';

	const { alt, attribution, caption, url }: ImageAsset = $$props.portableText.block;
</script>

<Image {alt} {attribution} {caption} imageSource={url} />
