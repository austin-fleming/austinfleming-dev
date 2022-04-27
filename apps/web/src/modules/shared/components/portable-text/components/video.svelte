<script lang="ts">
	import type { VideoAsset } from '$modules/shared/infra/models/video-asset';
	import VideoPlayer from '../../video-player/video-player.svelte';

	const videoData: VideoAsset = $$props.portableText.block;
</script>

<VideoPlayer
	videoData={{
		title: videoData.title,
		hlsSource: videoData.hlsPlaybackUrl,
		posterUrl: videoData.thumbnailUrl,
		aspectRatio: videoData.aspectRatio,
		attribution: videoData.attribution,
		caption: videoData.caption
	}}
/>
