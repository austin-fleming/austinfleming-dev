import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'$config': path.resolve('./src/config'),
					'$modules': path.resolve('./src/modules'),
					'$styles': path.resolve('./src/styles')
				}
			}
		}
	}
};

export default config;
