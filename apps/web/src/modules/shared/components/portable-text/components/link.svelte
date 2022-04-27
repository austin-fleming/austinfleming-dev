<script lang="ts">
	import type { Link as LinkModel } from '$modules/shared/infra/models/fragments/link';
	import Link from '../../link.svelte';

	const properties: LinkModel = $$props.portableText.mark;
</script>

<Link to={properties.to} isExternal={properties.isExternal}><slot /></Link>
