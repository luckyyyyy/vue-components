/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import Affix from './affix.jsx';
import './style/index.js';

/* istanbul ignore next */
Affix.install = (Vue) => {
  Vue.component(Affix.name, Affix);
};

export default Affix;
