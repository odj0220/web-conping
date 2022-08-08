import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { youtubeSubscribeServer } from './src/server/youtube.js';

const youtubeServer = {
  name: 'youtubeServer',
  configureServer(server) {
    youtubeSubscribeServer(server);
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      out: 'build',
    }),
    vite: {
      plugins: [youtubeServer],
    },
    alias: {
      $container: 'src/container',
      $component: 'src/components',
      $styles: 'src/styles',
    },
  },

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      prependData: `
        @import './src/styles/variables.scss';
        @import 'src/styles/modules.scss';
      `,
    },
  }),
};

export default config;
