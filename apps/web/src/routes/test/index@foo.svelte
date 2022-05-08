<script lang="ts">
	const sampleProjects = [
		{
			title: 'SmartHER News',
			body: 'hello',
			summary: 'This is a brief project summary',
			imageSource:
				'https://images.unsplash.com/photo-1651840198758-af6168d79111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
		},
		{
			title: 'Majlis for Future Generations',
			body: 'hello',
			summary: 'This is a brief project summary',
			imageSource:
				'https://images.unsplash.com/photo-1651840198758-af6168d79111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
		},
		{
			title: 'YBY',
			body: 'hello',
			summary: 'This is a brief project summary',
			imageSource:
				'https://images.unsplash.com/photo-1651840198758-af6168d79111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
		},
		{
			title: 'Fridays Films',
			body: 'hello',
			summary: 'This is a brief project summary',
			imageSource:
				'https://images.unsplash.com/photo-1651840198758-af6168d79111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
		},
		{
			title: 'Gifting Platform',
			body: 'hello',
			summary: 'This is a brief project summary',
			imageSource:
				'https://images.unsplash.com/photo-1651840198758-af6168d79111?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
		}
	];
</script>

<section class="sticky top-0 w-full h-screen bg-gray-400  p-8">
	<h1 class="block text-[min(18vw,30vh)] leading-none font-bold self-start justify-self-start">
		Austin<br />Fleming
	</h1>

	<p class="text-sm font-bold self-end justify-self-end max-w-[20ch] w-auto">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat.
	</p>
</section>

<section
	class="sticky top-0 w-full h-screen overflow-y-scroll bg-background snap-y snap-mandatory scroll-smooth"
>
	<div class="sticky top-0 w-full bg-[#ECBD9B] snap-start">
		<div class="px-8 font-bold h-8">
			<h1>Recent Work</h1>
		</div>

		<div class="w-full p-8 h-[calc(100vh_-_2rem)]">
			<p class="text-6xl font-bold">See what I've been working on recently.</p>
		</div>
	</div>

	{#each sampleProjects as sample, index (sample.title)}
		<article
			title="project"
			class="sticky w-full h-full snap-start top-8 flex flex-col items-start gap-8 bg-background border-t-2 border-solid border-primary p-8"
		>
			<!-- COUNTER -->
			<span class="text-lg p-[0.5em] bg-primary text-background rounded-md italic"
				>{index + 1}/{sampleProjects.length}</span
			>

			<!-- HEADER -->
			<header title="project header" class="w-full font-bold flex flex-col">
				<h1 class="w-full text-2xl font-bold">{sample.title}</h1>
				<p class="w-full text-2xl font-light">{sample.summary}</p>
			</header>

			<!-- BODY -->
			<div class="w-full h-full flex flex-col">
				<div title="project body" class="w-full flex flex-col">
					<p>{sample.body}</p>

					<a href="#">View Project</a>
				</div>

				<figure class="w-full h-full rounded-xl overflow-hidden">
					<img
						class="w-full h-full object-cover object-center"
						src={sample.imageSource}
						alt="placeholder"
					/>
				</figure>
			</div>
		</article>
	{/each}

	<section
		class="relative w-full h-screen bg-background border-t-2 border-solid border-primary snap-start"
	>
		<h1>Hi</h1>
	</section>
</section>
