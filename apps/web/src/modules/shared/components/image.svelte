<script lang="ts">
	export let imageSource: string;
	export let alt: string;
	export let caption: string | undefined = undefined;
	export let attribution: string | undefined = undefined;
</script>

<figure>
	<img src={imageSource} {alt} />

	{#if caption || attribution}
		<figcaption>
			{#if caption}
				<p>{caption}</p>
			{/if}

			{#if attribution}
				<small>{attribution}</small>
			{/if}
		</figcaption>
	{/if}
</figure>
