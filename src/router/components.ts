/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import components from '../../components.json';

const routes = Object.keys(components).map((component) => {
  return {
    name: `components/${component}`,
    path: `/components/${component}`,
    component: () => import(`../../packages/${component}/docs/index.vue`),
  };
});

export default routes;
