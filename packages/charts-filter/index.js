/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import ChartsFilter from './charts-filter.jsx';
import './style/index.js';

/* istanbul ignore next */
ChartsFilter.install = (Vue) => {
  Vue.component(ChartsFilter.name, ChartsFilter);
};

export default ChartsFilter;
