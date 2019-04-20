<cn>
#### 表格
横版
</cn>


```html
<template>
  <div>
    <x-select-filter
      @select-change="onSelectChange"
      @label-change="onLabelChange"
      :encode-key="encodeKey"
      :options="options"
      v-model="filter"
      :append-labels="appendLabels"
    ></x-select-filter>
    <br>
    <!-- <el-button @click="filter = 'test_333'">点击设置 this.filter = test_333 应该会自动选中【按照线程池归属】</el-button> -->
    当前值：{{ filter }}
  </div>
</template>

<script>

export default {
  methods: {
    onSelectChange(select) {
      console.log('onSelectChange', select);
    },
    onLabelChange(select) {
      console.log('onLabelChange', select);
    },
    encodeKey(a, b) {
      return `${a}_${b}`;
    },
  },
  created() {
    setTimeout(() => {
      this.options.push({
        option: '按照线程池归属',
        key: 'test',
        labels: [
          { key: '111', name: '独立线程', num: 5 },
          { key: '333', name: '线程池线程', num: 5 },
        ]
      });
    }, 1000);
  },
  data() {
    return {
      filter: 'test_111',
      appendLabels: [
        { key: '', name: '全部' },
      ],
      options: [
        {
          option: '按照状态',
          key: 'status',
          labels: [
            { key: 'hello1', name: '运行态', num: 5 },
            { key: 'hello2', name: '睡眠态', num: 5 },
            { key: 'hello3', name: 'Park态', num: 5 },
            { key: 'hello4', name: 'Object.wait态', num: 5 },
            { key: 'hello5', name: '同等锁态', num: 5 },
            { key: 'hello21', name: '测试换行文字长', num: 5 },
            { key: 'hello33', name: '测试换行文字长1', num: 5 },
            { key: 'hello41', name: '测试换行文字长2.wait态', num: 5 },
            { key: 'hello52', name: '测试换行文字长3', num: 5 },

          ]
        },
        {
          option: '按照是否守护线程',
          key: 'dd',
          labels: [
            { key: '守护线程', name: '守护线程', num: 5 },
            { key: '非守护线程', name: '非守护线程', num: 5 },
          ]
        },
        {
          option: '按照是否命名',
          key: 'cc',
          labels: [
            { key: '已命名', name: '已命名', num: 5 },
            { key: '匿名', name: '匿名', num: 5 },
          ]
        },
      ],
    };
  },
}
</script>
```

