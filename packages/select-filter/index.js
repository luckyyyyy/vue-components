/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import SelectFilter from './index.vue';
import './style/index.js';

/* istanbul ignore next */
SelectFilter.install = (Vue) => {
  Vue.component(SelectFilter.name, SelectFilter);
};

export default SelectFilter;
