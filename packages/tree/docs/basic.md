<cn>
#### 基础使用方法
不展开不渲染 性能很好
</cn>


```html
<template>
  <div class="tree">
    <x-tree-group :tree="tree"></x-tree-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tree: [
        // 默认展开第一个
        { name: '默认展开的', expand: true, children: [
          { name: 'hehe', children: [
            { name: 'hehe' },
            { name: 'haha' },
            { name: '123456' },
          ] },
          { name: 'haha', children: [
            { name: 'hehe' },
            { name: 'haha' },
            { name: '123456' },
          ] },
          { name: '123456', children: [
            { name: 'hehe' },
            { name: 'haha' },
            { name: '123456' },
          ] },
        ] },
        { name: '自定义css', style: { background: 'red', color: 'yellow' } },
        { name: '不能展开的' }
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

