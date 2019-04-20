
/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import LayoutTab from './tab.vue';
import LayoutTabGroup from './group.vue';
import './style/index.js';

/* istanbul ignore next */
LayoutTabGroup.install = (Vue) => {
  Vue.component(LayoutTabGroup.name, LayoutTabGroup);
};

export {
  LayoutTab,
  LayoutTabGroup
};
