<cn>
#### 基础使用
介绍
</cn>


```html
<template>
  <div>
    <x-layout-nav prefix="perfma-icon" :nav="nav"></x-layout-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { icon: 'perfma-arrow-up', name: '智能报表', route: 'overview' },
        { icon: 'perfma-arrow-up', name: '线程', route: 'thread' },
        { icon: 'perfma-arrow-up', name: '线程池', route: 'thread-pool' },
        { icon: 'perfma-arrow-up', name: '线程栈', route: 'thread-stack' },
        { icon: 'perfma-arrow-up', name: '方法', route: 'method' },
        { icon: 'perfma-arrow-up', name: '锁', route: 'lock' },
      ],
    };
  },
};
</script>
