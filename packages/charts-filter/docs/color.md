<cn>
#### 表格
自定义颜色
</cn>


```html
<template>
  <div>
    <x-charts-filter v-model="active" :charts="charts"></x-charts-filter>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: '',
      charts: [
        { name: '运行中', key: 'run', num: 10, col: 'green' },
        { name: '已失败', key: 'fail', num: 20, col: 'red' },
        { name: '等待中', key: 'wait', num: 30, col: 'orange'},
        { name: '已成功', key: 'success', num: 37, col :'blue' },
      ]
    };
  },
}
</script>
```

