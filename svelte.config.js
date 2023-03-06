// import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter: adapterStatic({
		// 	pages: 'build',
		// 	assets: 'build'
		// }),
		adapter: adapterVercel({
			isr: {
				expiration: false // cache forever
			}
		}),
		alias: {
			routes: 'src/routes/*',
			styles: 'src/styles/*'
		}
	}
};

export default config;
