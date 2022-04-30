<script lang="ts">
	import type { Link as LinkModel } from '$modules/portfolio/infra/models/fragments/link';
	import Link from '../../../../common/components/link.svelte';

	const properties: LinkModel = $$props.portableText.mark;
</script>

<Link to={properties.to} isExternal={properties.isExternal}><slot /></Link>
