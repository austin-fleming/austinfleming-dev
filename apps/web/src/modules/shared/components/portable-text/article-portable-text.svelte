<script lang="ts">
	import type { ArticleBlockText } from '$modules/shared/infra/models/fragments/article-block-text';
	import PortableText from '@portabletext/svelte';
	import Link from './components/link.svelte';
	import Image from './components/image.svelte';
	import Video from './components/video.svelte';

	export let blocks: ArticleBlockText;
</script>

<PortableText
	{blocks}
	serializers={{
		types: {
			video_asset: Video,
			image_asset: Image
		},
		marks: {
			link: Link
		}
	}}
/>
