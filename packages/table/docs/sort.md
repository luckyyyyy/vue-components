<cn>
#### 表格
排序 `Table` 只支持服务器排序 本地排序没空写
</cn>


```html
<template>
  <div>
    <x-table @sort="onSort" :columns="columns" :source="source">
      <template v-slot:@Name>
        <div>总共 20 人</div>
      </template>
      <template v-slot:@Age>
        <div>总共 100 岁</div>
      </template>
    </x-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      source: [
        { name: '张三', age: 13, desc: '这个人很坏', },
        { name: '李四', age: 33, desc: '哈哈哈', },
        { name: '王五', age: 23, desc: '测试', },
      ],
      sortedInfo: {
        columnKey: 'name',
        order: 'desc',
      },
    };
  },
  methods: {
    onSort(sortedInfo) {
      this.sortedInfo = sortedInfo;
      // 排序代码 如果是本地排序就不需要做任何事了
      // 但是本地排序还没写 sorter 除了布尔 应该还可以给一个本地排序的函数
      // 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)
    },
  },
  computed: {
    sort() {
      if (this.sortedInfo && this.sortedInfo.columnKey && this.sortedInfo.order) {
        return {
          sortName: this.sortedInfo.columnKey,
          sortType: this.sortedInfo.order === 'desc' ? 1 : 0,
        };
      }
    },
    columns() {
      const columns = [
        { key: 'name', name: '名字', width: 200 },
        { key: 'age', name: '年龄', width: 200 },
        { key: 'desc', name: '描述' },
      ];
      return columns.map((item) => {
        const sort = {};
        sort.sorter = true;
        sort.sortOrder = this.sortedInfo && this.sortedInfo.columnKey === item.key && this.sortedInfo.order;
        return {
          ...item,
          ...sort,
        };
      });
    },
  },
}
</script>
```

