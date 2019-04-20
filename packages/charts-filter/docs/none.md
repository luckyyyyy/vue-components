<cn>
#### 表格
隐藏文字
</cn>


```html
<template>
  <div>
    <x-charts-filter hide-items multiple :width="400" column v-model="active" :charts="charts"></x-charts-filter>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: ['run'],
      charts: [
        { name: '运行中', key: 'run', num: 10, },
        { name: '已失败', key: 'fail', num: 20, },
        { name: '等待中', key: 'wait', num: 30, },
      ]
    };
  },
}
</script>
```

