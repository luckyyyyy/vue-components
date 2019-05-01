<template>
  <div style="margin-left:30px;display:flex;">
    <x-table style="flex:1" auto-fill :columns="columns" :source="source">
      <template v-slot:expandedRowRender>
        <component is="test"></component>
      </template>
    </x-table>
  </div>
</template>

<script>

export default {
  name: 'test',
  data() {
    return {
      columns: [
        { key: 'name', name: '名字', minWidth: 800 },
        { key: 'age', name: '年龄', width: 300 },
        { key: 'desc', name: '描述', width: 500 },
      ],
      source: [
        { name: '张三', age: 13, desc: '这个人很坏' },
        { name: '李四', age: 33, desc: '哈哈哈' },
        { name: '王五', age: 23, desc: '测试' },
      ],
    };
  },
  created() {
    console.log('created');
  },
};
</script>
