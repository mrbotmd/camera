const vuePlugin = require("rollup-plugin-vue");
const postcss = require("rollup-plugin-postcss");
const replace = require("rollup-plugin-replace");
//import url from 'rollup-plugin-asset-url';
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const json = require("rollup-plugin-json");
//import requireContext from 'rollup-plugin-require-context'
const babel = require("rollup-plugin-babel");
//import alias from 'rollup-plugin-alias';
//import esbuild from 'rollup-plugin-esbuild'
//const dynamicImportVariables = require('rollup-plugin-dynamic-import-variables');
const flow = require("rollup-plugin-flow");

//const ElementUI = require("element-ui");

module.exports = {
  input: "src/documents.js",
  output: "dist/documents.bundle.js",
  namespace: "BX.Mfo",
  plugins: {
    babel: {
      exclude: "node_modules/core-js",
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
    },
    resolve: true,
    custom: [
      vuePlugin({
        template: { transformAssetUrls: true },
        css: true,
      }),
      json(),
      /*flow({all:true}),*/
      postcss(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs({
        include: "node_modules/**",
      }),
    ],
  },
};
