import vueplugin from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
//import url from 'rollup-plugin-asset-url';
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import filesize from "rollup-plugin-filesize";
import json from "rollup-plugin-json";
//import requireContext from 'rollup-plugin-require-context'
import babel from "rollup-plugin-babel";
//import alias from 'rollup-plugin-alias';
//import esbuild from 'rollup-plugin-esbuild'

const isProduction = !process.env.ROLLUP_WATCH;

const port = 3000;

export default {
  input: "src/main.js",
  output: {
    file: "public/assets/app.js",
    format: "iife",
    name: "app",
    globals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      "element-ui": "Element",
      vuex: "Vuex",
    },
  },
  plugins: [
    vueplugin({
      template: { transformAssetUrls: true },
      css: true,
    }),
    json(),
    postcss(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      runtimeHelpers: true,
      exclude: ["node_modules/**", "node_modules/core-js/**"],
      presets: [
        "vue",
        [
          "@babel/preset-env",
          {
            modules: "auto",
            useBuiltIns: "usage",
            corejs: 2,
          },
        ],
      ],
      plugins: [
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],

      compact: true,
    }),
    nodeResolve(),
    commonjs(),
    !isProduction &&
      serve({
        contentBase: "public",
        historyApiFallback: true,
        port: port,
      }),
    !isProduction && livereload({ watch: "public" }),
    isProduction && filesize(),
  ],
  external: ["vue", "vue-router", "axios", "element-ui", "vuex"],
  watch: {},
};
