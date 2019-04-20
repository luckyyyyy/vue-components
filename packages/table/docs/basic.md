<cn>
#### 表格
基础的 `Table` 组件使用方式
</cn>


```html
<template>
  <div>
    <x-table :columns="columns" :source="source">
      <template v-slot:expandedRowRender>
        <div style="background: #232a42; overflow: auto;display:flex;">
          <Test />
        </div>
      </template>
    </x-table>
  </div>
</template>

<script>
import Test from './test.vue';

export default {
  components: {
    Test,
  },
  data() {
    return {
      columns: [
        { key: 'name', name: '名字', width: 50 },
        { key: 'age', name: '年龄', width: 50 },
        { key: 'desc', name: '描述' },
      ],
      source: [
        { name: '张三', age: 13, desc: '这个人很坏', },
        { name: '李四', age: 33, desc: '哈哈哈', },
        { name: '王五', age: 23, desc: '测试', },
      ],
    };
  },
}
</script>
```

