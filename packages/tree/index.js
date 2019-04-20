/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import TreeGroup from './tree.jsx';
import './style/index.js';

/* istanbul ignore next */
TreeGroup.install = (Vue) => {
  Vue.component(TreeGroup.name, TreeGroup);
};

export default TreeGroup;
