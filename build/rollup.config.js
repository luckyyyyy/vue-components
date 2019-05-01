/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const localResolve = require('rollup-plugin-local-resolve');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');
const utils = require('./utils');
const Components = require('../components.json');
const postcss = require('rollup-plugin-postcss');

// module.exports = config;

module.exports = Object.keys(Components).map((component) => {
  const config = {
    input: Components[component].input,
    output: {
      format: 'es',
      file: 'lib/' + component + '/index.js',
    },
    plugins: [
      alias({
        '@': utils.fullPath('src'),
        ':': utils.fullPath('static'),
        resolve: ['.js', 'jsx', '.ts', '.tsx', '.vue', '.json']
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      vue({
        css: false,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        runtimeHelpers: true
      }),
      commonjs(),
      postcss({
        extract: 'lib/' + component + '/style/index.css',
      }),
    ],
    external: (id) => {
      // console.log(id)
      return ['vue', 'popper.js', 'better-scroll'].includes(id) ||
        /^@babel/.test(id) ||
        /^lodash/.test(id) ||
        /^@vue/.test(id) ||
        /^vue-runtime-helpers/.test(id)
    },
  }
  return config;
});


