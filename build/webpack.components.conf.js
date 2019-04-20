/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
// 没用上
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const Components = require('../components.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin'); // 连这种东西都需要一个插件 SX
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const utils = require('./utils');
const loader = require('./utils/loader');
const config = require('./config');

const webpackConfig = {
  mode: 'production',
  entry: Components,
  stats: {
    // https://webpack.js.org/configuration/stats/
    entrypoints: false,
    children: false,
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': utils.fullPath('src'),
      ':': utils.fullPath('static'),
    },
    modules: [
      utils.fullPath('src'),
      utils.fullPath('node_modules'),
    ],
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime', // webpack runtime
    // },
    minimize: false
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      ...loader.styleLoaders(!utils.isDevelop),
      ...loader.vueLoaders(),
      ...loader.scriptLoaders(),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: utils.assetsPath('img/[hash:32].[ext]'),
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: utils.isDevelop,
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[hash:32].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('fonts/[hash:32].[ext]'),
        },
      },
    ],
  },
  // https://webpack.js.org/configuration/dev-server/
  // cheap-module-eval-source-map is faster for localhost dev
  // devtool: '#source-map',
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar(),
    new webpack.DefinePlugin({
      'process.env': (() => {
        const env = {};
        Object.keys(config.env).forEach((k) => {
          env[k] = JSON.stringify(config.env[k]);
        });
        return env;
      })(),
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
    }),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
  ],
}

if (config.useEslint) {
  webpackConfig.module.rules.push(
    ...loader.eslintLoaders({
      cache: true,
      emitWarning: true,
      failOnError: false,
    }),
  )
}

module.exports = webpackConfig;
