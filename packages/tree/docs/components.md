<cn>
#### 懒加载
网络加载 和 组件接管控制权
</cn>


```html
<template>
  <div class="tree">
    <x-tree-group :tree="tree" :load="load"></x-tree-group>
  </div>
</template>

<script>
import Test from './test.vue';
import Vue from 'vue';

const Component = {
  props: {
    val: String,
  },
  render() {
    return <span style="background: red; padding: 2px 5px; color: yellow"> 性能压力 { this.val }</span>;
  },
};

const Component2 = {
  props: {
    name: String,
  },
  render() {
    return <button style="background: green; padding: 2px 5px; color: yellow"> { this.name }</button>;
  },
};

export default {
  methods: {
    load(node) {
      return new Promise((resolve, reject) => {
        if (node.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          resolve([
            { name: '数据1', val: Math.ceil(Math.random() * 100) + '%', scopedSlots: { after: Component } },
            { name: '数据2', val: Math.ceil(Math.random() * 100) + '%', scopedSlots: { after: Component } },
            { name: '数据3', },
            { name: '无穷展开测试', },
          ]);
        }, 2000);
      });
    }
  },
  data() {
    return {
      tree: [
        { name: '展开是个树（网络加载支持）' },
        // 还可以传个组件给他 props 是当前 node
        { name: '展开是个表格（网络加载支持，组件接管控制权，共享上层数据结构）', scopedSlots: { children: Test } },
        { name: '在名字后追加一个组件 ', val: '100%', scopedSlots: { after: Component } },
        { name: '在网络加载中 不能展开 需要设置 isLeaf', isLeaf: true },
        { name: '整个都被替换成一个新的组件', scopedSlots: { node: Component2 } },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.tree {
  padding: 20px;
  background: #121933;
}
</style>


```

