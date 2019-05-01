/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

// this file is not used if use https://github.com/ant-design/babel-plugin-import

import { default as Affix } from './affix';
import { default as ChartsFilter } from './charts-filter';
import { default as Table } from './table';
import { default as SelectFilter } from './select-filter';
import { default as LayoutNav } from './layout-nav';
import { default as Iconfont } from './iconfont';
import { default as TreeGroup } from './tree';
import { LayoutTabGroup } from './layout-tab-group';

import { default as version } from './version';
import './styles/perfma-icon/iconfont.css';

const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production'
  && ENV !== 'test'
  && typeof console !== 'undefined'
  && console.log
  && typeof window !== 'undefined'
) {
  console.log(`%c @perfma/components %c v${version} `, 'background:#555;color:#fff', 'background: #41c23e;color:#fff');
  // console.warn(
  //   'You are using a whole package of antd, ' +
  //     'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  // );
}

const components = [
  Affix,
  ChartsFilter,
  Table,
  SelectFilter,
  LayoutNav,
  LayoutTabGroup,
  Iconfont,
  TreeGroup,
];

const install = function (Vue) {
  components.map((component) => {
    Vue.use(component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
// support import { xx } from 'xx';
export {
  Affix,
  ChartsFilter,
  Table,
  SelectFilter,
  LayoutNav,
  LayoutTabGroup,
  Iconfont,
  TreeGroup,
};

export default {
  version,
  install,
};
