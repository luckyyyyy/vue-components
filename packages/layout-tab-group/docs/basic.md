<cn>
#### 表格
横版
</cn>


```html
<template>
  <div>
    <x-layout-tab-group :tabs.sync="tabs" v-model="active"></x-layout-tab-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabs: [
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
        { name: '堆外内存默认页', route: { fullPath: '/thread' } },
      ],
    };
  },
};
</script>
