<script lang="ts">
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
	import Icon from '$modules/common/components/icons/icon.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import { truncateString } from '$utils/format/truncate-string';
	import Container from '$modules/common/components/container/container.svelte';

	export let casestudy: Casestudy;
	export let orderNumber: number;
	export let id: string;
</script>

<article {id} class={`relative bg-background ${$$props.class}`}>
	<Container
		class="h-full flex flex-col justify-start gap-contentPadding md:grid md:grid-cols-[5fr_7fr]"
	>
		<div
			class="w-full grid grid-cols-[7fr_3fr] gap-6 items-baseline md:flex md:flex-col md:gap-0 md:justify-between"
		>
			<header class="order-1 relative w-full flex flex-row gap-[0.5em] md:order-2">
				<h1 class="block text-4xl lg:text-5xl md:max-w-[10ch]">
					{casestudy.title}
				</h1>
			</header>

			<div class="order-2 text-xs font-bold md:order-1">
				{#each casestudy.tags as { title, id } (id)}
					<p class="leading-tight">{title}</p>
				{/each}
			</div>

			<div class="hidden flex-col items-start order-3 md:flex md:text-sm md:max-w-[40ch]">
				<h2
					class="hidden text-base font-bold col-span-full text-primary md:block md:order-2 pb-[1em]"
				>
					{casestudy.shortSummary}
				</h2>

				<div class="hidden md:block md:order-3 prose prose-sm pb-[2em]">
					{truncateString(casestudy.seo.description, 110)}
				</div>

				<Link
					class="hidden order-3 justify-self-start text-sm whitespace-nowrap flex-row items-center justify-between gap-2 text-primary font-bold bg-background hover:bg-primary hover:text-background transition-colors duration-200 border-2 border-solid border-primary rounded-[0.5em] px-[1.5em] py-[0.3em] md:flex md:order-5"
					to={casestudy.path}
					>View Project <Icon name="caretRight" />
				</Link>
			</div>
		</div>

		<figure class="relative flex-grow w-full overflow-hidden md:flex-grow-0">
			<Image
				class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full"
				source={casestudy.featuredImage.url}
				width={casestudy.featuredImage.width}
				height={casestudy.featuredImage.height}
				alt={casestudy.featuredImage.alt}
				config={{ provider: 'SANITY', lqip: casestudy.featuredImage.base64Lqip }}
			/>
		</figure>
	</Container>

	<Link class="absolute top-0 bottom-0 left-0 right-0" to={casestudy.path}
		><span class="sr-only">read casestudy</span></Link
	>
</article>
