import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapterStatic({
			pages: 'output',
			assets: 'output'
		}),
		alias: {
			routes: 'src/routes/*',
			styles: 'src/styles/*'
		}
	}
};

export default config;
