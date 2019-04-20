/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Iconfont from './index.vue';

/* istanbul ignore next */
Iconfont.install = (Vue) => {
  Vue.component(Iconfont.name, Iconfont);
};

export default Iconfont;
