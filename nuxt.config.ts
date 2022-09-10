import { defineNuxtConfig } from 'nuxt';
import vuetify from 'vite-plugin-vuetify';
import { fileURLToPath } from 'url';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		'@nuxt/content',
		'@nuxt/image-edge',
		async (options, nuxt) => {
			// @ts-ignore
			// Source: https://www.the-koi.com/projects/how-to-set-up-a-project-with-nuxt3-and-vuetify3-with-a-quick-overview/
			nuxt.hooks.hook('vite:extendConfig', (config) => config.plugins.push(vuetify()));
		},
	],
	content: {
		documentDriven: true,
	},
	css: ['vuetify/styles', 'mdi/css/materialdesignicons.min.css'],
	build: {
		transpile: ['vuetify'],
	},
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
		ssr: {
			noExternal: ['vuetify'], // add the vuetify vite plugin
		},
	},
	/*
	 ** Auto-import components
	 *  Doc: https://github.com/nuxt/components
	 */
	components: {
		loader: true,
		dirs: [
			// Components directory
			{
				path: './components',
				pathPrefix: false,
				extensions: ['vue'],
			},
		],
	},
	// https://v1.image.nuxtjs.org/configuration/
	image: {
		dir: 'assets/img',
	},
	alias: {
		img: fileURLToPath(new URL('./assets/img', import.meta.url)),
	},
});
