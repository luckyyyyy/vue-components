/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

module.exports = {
  presets: [
    require('@babel/preset-env'),
    require('@babel/preset-typescript'),
    require('@vue/babel-preset-jsx'),
  ],
  plugins: [
    require('@babel/plugin-transform-runtime'),
    // require('@babel/plugin-syntax-jsx'),
    require('@babel/plugin-syntax-dynamic-import'),
    [require('babel-plugin-component'), {
      "libraryName": "element-ui",
      // "styleLibraryName": "theme-chalk",
      "style": false
    }]
  ],
};
