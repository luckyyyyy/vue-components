<cn>
#### 表格
横版
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
        { name: '运行中', key: 'run', num: 10, },
        { name: '已失败', key: 'fail', num: 20, },
        { name: '等待中', key: 'wait', num: 30, },
        { name: '已成功', key: 'success', num: 37, },
         { name: '0的应该自动屏蔽', key: 'success', num: 0, },
      ]
    };
  },
}
</script>
```

