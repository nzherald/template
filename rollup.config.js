import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';
import css from 'rollup-plugin-css-chunks';
import sveltePreprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH;

export default {
  input: ["src/*.svelte"],
  output: {
    dir: "server",
		format: "cjs",
		exports: "named"
  },
  plugins: [
    del({ targets: "server/*" }),
    multiInput(),
    resolve(),
    svelte({
			// enable run-time checks when not in production
			preprocess: sveltePreprocess({}),
      dev: !production,
      immutable: true,
      hydratable: true,
      generate: "ssr",
      // we'll extract any component CSS out into
      // a separate file - better for performance
      // css: css => {
      // 	css.write('public/build/bundle.css');
      // }
    }),
    css({
      ignore: true,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs

    // In dev mode, call `npm run start` once
    // the bundle has been generated

    // Watch the `public` directory and refresh the
    // browser on changes when not in production

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
};
