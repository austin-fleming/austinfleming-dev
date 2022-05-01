<script lang="ts">
</script>

<figure>
	<div class="rounded-2xl overflow-hidden">
		<slot />
	</div>

	{#if $$slots.figcaption}
		<figcaption>
			<slot name="figcaption" />
		</figcaption>
	{/if}
</figure>
