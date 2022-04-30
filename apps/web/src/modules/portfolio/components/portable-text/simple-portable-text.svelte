<script lang="ts">
	import type { SimpleBlockText } from '$modules/portfolio/infra/models/fragments/simple-block-text';
	import PortableText from '@portabletext/svelte';
	import Link from './components/link.svelte';

	export let blocks: SimpleBlockText;
</script>

<PortableText
	{blocks}
	serializers={{
		marks: {
			link: Link
		}
	}}
/>
