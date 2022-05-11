<script lang="ts">
	let _class = '';
	export { _class as class };
</script>

<div class={`root ${_class}`}>
	<div class="noise" />
	<div class="mesh mesh-1" />
	<!-- <div class="mesh mesh-2" /> -->
</div>

<style>
	.root {
		@apply absolute top-0 right-0 bottom-0 left-0 -z-10 overflow-hidden;
	}

	.mesh {
		@apply absolute w-full h-full;
	}

	.mesh-1 {
		background-color: #c999ff;
		background-image: radial-gradient(at 93% 19%, hsla(328, 90%, 79%, 1) 0px, transparent 50%),
			radial-gradient(at 3% 99%, hsla(33, 74%, 75%, 1) 0px, transparent 50%),
			radial-gradient(at 43% 77%, hsla(244, 77%, 77%, 1) 0px, transparent 50%),
			radial-gradient(at 67% 29%, hsla(180, 78%, 64%, 1) 0px, transparent 50%),
			radial-gradient(at 13% 83%, hsla(140, 96%, 68%, 1) 0px, transparent 50%),
			radial-gradient(at 74% 4%, hsla(296, 61%, 62%, 1) 0px, transparent 50%),
			radial-gradient(at 68% 7%, hsla(355, 70%, 70%, 1) 0px, transparent 50%);
		background-size: 400% 400%;

		@apply animate-[shift01_5s_linear_infinite] opacity-40;
	}

	.mesh-2 {
		background-color: #a899ff;
		background-image: radial-gradient(at 56% 77%, hsla(162, 93%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 33% 63%, hsla(328, 95%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 45% 98%, hsla(75, 98%, 75%, 1) 0px, transparent 50%),
			radial-gradient(at 23% 33%, hsla(16, 99%, 79%, 1) 0px, transparent 50%),
			radial-gradient(at 15% 55%, hsla(275, 72%, 75%, 1) 0px, transparent 50%),
			radial-gradient(at 14% 54%, hsla(27, 97%, 74%, 1) 0px, transparent 50%),
			radial-gradient(at 54% 50%, hsla(344, 61%, 68%, 1) 0px, transparent 50%);

		@apply animate-[shift02_3s_linear_infinite] opacity-40;
	}

	.noise {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: transparent url('/images/noise-transparent.png') repeat 0 0;
		background-repeat: repeat;
		animation: bg-animation 0.2s infinite;
		opacity: 0.9;
		visibility: visible;
	}

	@keyframes shift01 {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes shift02 {
		0% {
			background-position: 50% 0%;
		}
		50% {
			background-position: 50% 100%;
		}
		100% {
			background-position: 50% 0%;
		}
	}

	@keyframes bg-animation {
		0% {
			transform: translate(0, 0);
		}
		30% {
			transform: translate(-5%, 15%);
		}
		70% {
			transform: translate(0, 5%);
		}
		100% {
			transform: translate(5%, 0);
		}
	}
</style>
