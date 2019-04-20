/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin'); // 连这种东西都需要一个插件 SX
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require('./utils');
const loader = require('./utils/loader');
const config = require('./config');
const ts = require('typescript');

console.log('TypeScript Version: ' + ts.version );

const webpackConfig = {
  mode: 'production',
  entry: {
    app: './packages/index.js',
  },
  stats: {
    // https://webpack.js.org/configuration/stats/
    entrypoints: false,
    children: false,
  },
  output: {
    path: utils.fullPath('lib'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    filename: 'index.js',
  },
  optimization: {
    minimizer: {}
  },
  externals: [
    nodeExternals(),
    {
      vue: 'vue',
    }
  ],
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': utils.fullPath('src'),
      ':': utils.fullPath('static'),
    },
    modules: [
      utils.fullPath('src'),
      utils.fullPath('packages'),
      utils.fullPath('node_modules'),
    ],
  },
  module: {
    rules: [
      ...loader.styleLoaders(!utils.isDevelop),
      ...loader.vueLoaders(),
      ...loader.scriptLoaders(),
      ...loader.docLoaders(),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000,
              name: utils.assetsPath('img/[hash:32].[ext]'),
            },
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     disable: utils.isDevelop,
          //   },
          // },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: utils.assetsPath('media/[hash:32].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: utils.assetsPath('fonts/[hash:32].[ext]'),
        },
      },
    ],
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new VueLoaderPlugin(),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: 'styles/index.css',
    }),
    new WebpackBar(),
    new webpack.ContextReplacementPlugin(
      /moment[\\/]locale$/,
      /^\.\/(zh-cn)$/,
    ),
    new webpack.DefinePlugin({
      'process.env': (() => {
        const env = {};
        Object.keys(config.env).forEach((k) => {
          env[k] = JSON.stringify(config.env[k]);
        });
        return env;
      })(),
    }),
    // keep module.id stable when vendor modules does not change
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // Silence mini-css-extract-plugin generating lots of warnings for CSS ordering.
    // We use CSS modules that should not care for the order of CSS imports, so we
    // should be safe to ignore these.
    //
    // See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
    new webpack.BannerPlugin(`This file is part of the PerfMa.
@link     : http://perfma.com
@author   : William Chan (wei.chen@perfma.com)
@copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.`),
  ],
};

if (config.useEslint) {
  webpackConfig.module.rules.push(
    ...loader.eslintLoaders({
      cache: true,
      emitWarning: true,
      failOnError: false,
    }),
  )
}

if (config.useStyleLint) {
    // new StylelintBarePlugin({
    //   configFile: '.stylelintrc.js',
    //   files: [
    //     'src/**/*.vue',
    //     'src/**/*.css',
    //     'src/**/*.less',
    //     'src/**/*.sass',
    //     'src/**/*.scss',
    //     '!**/iconfont.css',
    //   ],
    //   // fix: true,
    //   cache: true,
    //   cacheLocation: './node_modules/.cache/.stylelintcache',
    //   emitErrors: true,
    //   failOnError: true,
    // }),
}

webpackConfig.optimization.minimizer = [
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css(\?.*)?$/,
    cssProcessorOptions: {
      safe: true,
    },
  }),
  new TerserPlugin({
    cache: true,
    parallel: true,
  }),
];

module.exports = webpackConfig;
