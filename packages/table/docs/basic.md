<cn>
#### 表格
基础的 `Table` 组件使用方式
</cn>


```html
<template>
  <div>
    <x-table :row-class="getClass" @click="onClick" :columns="columns" :source="source">
      <!-- <template v-slot:expandedRowRender>
        <div style="background: #232a42; overflow: auto;display:flex;">
          <Test :a="log()" />
        </div>
      </template> -->

      <template v-slot:beforeRowRender>
        <div class="x-table-row">
          <div class="x-table-row-item">beforeRowRender</div>
        </div>
      </template>

      <template v-slot:afterRowRender>
        <div class="x-table-row">
          <div class="x-table-row-item">afterRowRender</div>
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
        { key: 'name', name: '名字' },
        { key: 'age', name: '年龄', width: 200 },
        { key: 'desc', name: '描述', width: 100 },
      ],
      source: [
        { name: '张三', age: 13, desc: '这个人很坏', },
        { name: `SRPING_CONTROLLER | com.ganpengyu.trace.order.OrderController.placeOrder(java.lang.Long uid, javaSRPING_CONTROLLER | com.ganpengyu.trace.order.OrderController.placeOrder(java.lang.Long uid, java.lang.Long gid)
.lang.Long gid)
`, age: 33, desc: '哈哈哈', },
        { name: '王五超长测试测试测试测试', age: 23, desc: '213123133', },
      ],
    };
  },
  methods: {
    getClass(row) {
      if (row.name === '张三') {
        return 'red';
      }
    },
    onClick() {
      console.log('点击事件')
    },
    log() {
      console.log(1)
    }
  }
}
</script>

<style>
.red {
  background: aquamarine;
}
.red:hover {
  background: yellowgreen;
}
.red .x-table-row-item {
  color: black;
}
</style>


```

