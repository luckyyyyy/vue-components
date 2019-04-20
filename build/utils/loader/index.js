/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const utils = require('../index.js');
const cheerio = require('cheerio');
const hljs = require('highlight.js');
const Token = require('markdown-it/lib/token');

const cacheLoader = (path) => {
  return {
    loader: 'cache-loader',
    options: { cacheDirectory: utils.fullPath(`./node_modules/.cache/cache-loader/${path}`) },
  };
};

// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = (extract) => {
  const stylusOptions = {
    'resolve url': true,
    import: [utils.fullPath('src/global/cube-theme')],
  };

  const cssModules = {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  }

  const map = {
    scss: 'sass-loader',
    styl: { loader: 'stylus-loader', options: stylusOptions },
    stylus: { loader: 'stylus-loader', options: stylusOptions },
  };

  function setCssLoader(use) {
    const a = use;
    return a[1] = { loader: 'css-loader', options: cssModules };
  }
  const cssModulesRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    const devLoader = extract ? MiniCssExtractPlugin.loader : 'vue-style-loader';
    let rule = {
      test: new RegExp(`\\.module.${extension}$`),
      use: [
        devLoader,
        cacheLoader('css-loader'),
        { loader: 'css-loader', options: cssModules },
        'postcss-loader'
      ],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
  const cssRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    const devLoader = extract ? MiniCssExtractPlugin.loader : 'vue-style-loader';
    let rule = {
      test: new RegExp(`\\.${extension}$`),
      exclude: new RegExp(`\\.module.${extension}$`),
      use: [
        devLoader,
        cacheLoader('css-loader'),
        'css-loader',
        'postcss-loader'
      ],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
  return cssRules.concat(...cssModulesRules)
};

const vueLoaderOptions = { // https://github.com/vuejs/vue-loader/blob/62a9155d00212f17e24c1ae05445c156b31e2fbd/docs/options.md
  compilerOptions: {
    // preserveWhitespace: false, // do not enable, will cause some bug when render list
  },
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
};

const vueLoaders = () => [{
  test: /\.vue$/,
  use: [
    cacheLoader('vue-loader'),
    {
      loader: 'vue-loader',
      options: vueLoaderOptions,
    }
  ]
}];

const fetch = (str, tag, scoped) => {
  const $ = cheerio.load(str, {
    decodeEntities: false,
    xmlMode: true,
  });
  if (!tag) {
    return str;
  }
  if (tag === 'style') {
    return scoped
      ? $(`${tag}[scoped]`).html()
      : $(`${tag}`)
          .not(`${tag}[scoped]`)
          .html();
  }
  return $(tag).html();
};

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
const replaceDelimiters = function(str) {
  return str.replace(/({{|}})/g, '<span>$1</span>');
};

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */

const renderHighlight = function(str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return '';
  }

  try {
    return replaceDelimiters(hljs.highlight(lang, str, true).value);
  } catch (err) {
    console.log(err)
  }
};

const md = require('markdown-it')('default', {
  html: true,
  breaks: true,
  highlight: renderHighlight,
}).use(require('markdown-it-anchor'), {
  level: 2,
  slugify: string =>
    string
      .trim()
      .split(' ')
      .join('-'),
  permalink: true,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: 'anchor',
  permalinkSymbol: '#',
  permalinkBefore: false,
});
// md.renderer.rules.fence = wrap(md.renderer.rules.fence)
const cnReg = new RegExp('<(cn)(?:[^<]|<)+</\\1>', 'g');
const usReg = new RegExp('<(us)(?:[^<]|<)+</\\1>', 'g');
md.core.ruler.push('update_template', function replace({ tokens }) {
  let cn = '';
  let us = '';
  let template = '';
  let script = '';
  let style = '';
  let scopedStyle = '';
  let code = '';
  let sourceCode = '';
  tokens.forEach(token => {
    if (token.type === 'html_block') {
      if (token.content.match(cnReg)) {
        cn = fetch(token.content, 'cn');
        token.content = '';
      }
      if (token.content.match(usReg)) {
        us = fetch(token.content, 'us');
        token.content = '';
      }
    }
    if (token.type === 'fence' && token.info === 'html' && token.markup === '```') {
      sourceCode = token.content;
      code = '````html\n' + token.content + '````';
      template = fetch(token.content, 'template');
      script = fetch(token.content, 'script');
      style = fetch(token.content, 'style');
      scopedStyle = fetch(token.content, 'style', true);
      token.content = '';
      token.type = 'html_block';
    }
  });
  if (template) {
    let jsfiddle = {
      html: template,
      script,
      style,
      us,
      cn,
      sourceCode,
    };
    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));
    const codeHtml = code ? md.render(code) : '';
    const cnHtml = cn ? md.render(cn) : '';
    let newContent = `
      <template>
        <demo-box :jsfiddle="${jsfiddle}">
          <template slot="component">${template}</template>
          <template slot="description">${cnHtml}</template>
          <template slot="us-description">${us ? md.render(us) : ''}</template>
          <template slot="code">${codeHtml}</template>
        </demo-box>
      </template>`;
    newContent += script
      ? `
      <script>
      ${script || ''}
      </script>
      `
      : '';
    newContent += style ? `<style>${style || ''}</style>` : '';
    newContent += scopedStyle ? `<style scoped>${scopedStyle || ''}</style>` : '';
    const t = new Token('html_block', '', 0);
    t.content = newContent;
    tokens.push(t);
  }
});

const docLoaders = () => [{
  test: /\.md$/,
  use: [
    {
      loader: 'vue-loader',
      options: vueLoaderOptions,
    },
    {
      loader: 'vue-antd-md-loader',
      options: Object.assign(md, {
        wrapper: 'div',
        raw: true,
      }),
    },
  ],
}];

const scriptLoaders = () => {
  const includes = [
    utils.fullPath('config'),
    utils.fullPath('src'),
    utils.fullPath('packages'),
    utils.fullPath('test'),
  ];
  return [
    {
      test: /\.m?jsx?$/,
      use: [cacheLoader('babel-loader'), 'babel-loader'],
      include: includes,
    },
    {
      test: /\.ts$/,
      include: includes,
      use: [
        cacheLoader('ts-loader'),
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    {
      test: /\.tsx$/,
      include: includes,
      use: [
        cacheLoader('ts-loader'),
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsxSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    // {
    //   test: /\.(js|tsx?)$/,
    //   loader: 'babel-loader',
    //   include: [
    //     utils.fullPath('config'),
    //     utils.fullPath('src'),
    //     utils.fullPath('test'),
    //     utils.fullPath('node_modules/cube-ui'),
    //   ],
    // },
    // {
    //   test: /\.tsx?$/, // 保障 .vue 文件中 lang=ts
    //   loader: 'ts-loader',
    //   options: {
    //     appendTsSuffixTo: [/\.vue$/],
    //     appendTsxSuffixTo: [/\.vue$/],
    //   },
    // },
  ];
};


const eslintLoaders = options => [{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.fullPath('src'), utils.fullPath('packages'), utils.fullPath('test')],
  options: Object.assign({
    configFile: '.eslintrc.js',
    // fix: true,
    cache: false,
    emitWarning: false,
    failOnError: true,
    formatter: eslintFriendlyFormatter,
  }, options),
}];

exports.styleLoaders = styleLoaders;
exports.vueLoaders = vueLoaders;
exports.eslintLoaders = eslintLoaders;
exports.scriptLoaders = scriptLoaders;
exports.docLoaders = docLoaders;
