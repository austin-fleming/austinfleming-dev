// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel'
import path from 'path';
import preprocess from 'svelte-preprocess';
// import compress from 'vite-plugin-compress'
import viteCompression from 'vite-plugin-compression';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true
	}),
	kit: {
		adapter: adapter(),
		vite: {
			build: {
				rollupOptions: {
					output: {
						// https://stackoverflow.com/questions/70471512/analyzing-optimizing-and-lazy-loading-vendor-js-when-doing-sveltekit-server-sid/70499134#70499134
						// https://tradingstrategy.ai/blog/optimizing-page-load-speed-on-sveltekit
						manualChunks: undefined
					}
				}
			},
			define: {
				'process.env': process.env,
			},
			plugins: [
				viteCompression()
			],
			resolve: {
				alias: {
					'$config': path.resolve('./src/config'),
					'$modules': path.resolve('./src/modules'),
					'$styles': path.resolve('./src/styles'),
					'$utils': path.resolve('./src/utils'),
				}
			}
		}
	}
};

/* 
TODO:
CSP - https://kit.svelte.dev/docs/configuration#csp
*/

export default config;
