/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import Table from './table.jsx';
import Popper from './popper.tsx';
import './style/index.js';

if (document) {
  const $tablePopper = document.getElementById('#table-popper');
  if (!$tablePopper) {
    const popper = Popper.$mount();
    document.body.appendChild(popper.$el);
    Vue.prototype.$tablePopper = popper;
  }
}

/* istanbul ignore next */
Table.install = (Vue) => {
  Vue.component(Table.name, Table);
};

export default Table;
