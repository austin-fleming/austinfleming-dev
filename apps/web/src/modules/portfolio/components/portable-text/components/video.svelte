<script lang="ts">
	import Image from '$modules/common/components/image/image.svelte';
	import type { VideoAsset } from '$modules/portfolio/infra/models/video-asset';
	import VideoPlayer from '../../video-player/video-player.svelte';

	const videoData: VideoAsset = $$props.portableText.block;
</script>

<VideoPlayer
	videoData={{
		title: videoData.title,
		mp4Source: videoData.formats.mp4.high.source,
		posterUrl: videoData.thumbnailUrl,
		aspectRatio: videoData.aspectRatio.ratio,
		attribution: videoData.attribution,
		caption: videoData.caption
	}}
/>
