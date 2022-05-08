<script lang="ts">
	import Image from '$modules/common/components/image/image.svelte';
	import type { VideoAsset } from '$modules/portfolio/infra/models/video-asset';
	export let videoAsset: VideoAsset;

	const mp4High = videoAsset.formats.mp4.high;
</script>

<Image
	preload
	config={{ provider: 'MUX' }}
	width={mp4High.width}
	height={mp4High.height}
	alt={videoAsset.title}
	source={videoAsset.thumbnailUrl}
/>
