<script lang="ts">
	import type { ArticleBlockText } from '$modules/portfolio/infra/models/fragments/article-block-text';
	import PortableText from '@portabletext/svelte';
	import Link from './components/link.svelte';
	import Image from './components/image.svelte';
	import Video from './components/video.svelte';
	import Heading from './components/heading.svelte';

	export let blocks: ArticleBlockText;
</script>

<PortableText
	{blocks}
	serializers={{
		blockStyles: {
			heading1: Heading,
			heading2: Heading,
			heading3: Heading,
			heading4: Heading
		},
		types: {
			video_asset: Video,
			image_asset: Image
		},
		marks: {
			link: Link
		}
	}}
/>
