/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Nav from './index.vue';
import './style/index.js';

/* istanbul ignore next */
Nav.install = (Vue) => {
  Vue.component(Nav.name, Nav);
};

export default Nav;
