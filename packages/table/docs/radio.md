<cn>
#### 表格
带 radio 的 `Table` 还没做 还没做 还没做 还没做 还没做 还没做 还没做 还没做
</cn>

```html
<template>
  <div>
    <x-table :row-selection="rowSelection" @sort="onSort" :columns="columns" :source="source">
      <template v-slot:expandedRowRender>
        <div style="background: #232a42; overflow: auto;display:flex;">
          <Test />
        </div>
      </template>
    </x-table>
    <button @click="selectedRowKeys = ['2']">控制</button>
    <button @click="source.push({ name: '张三', age: 13, desc: '这个人很坏', })">additem</button>
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
      source: [
        { name: '张三', age: 13, desc: '这个人很坏', },
        { name: '李四', age: 33, desc: '哈哈哈', },
        { name: '王五', age: 23, desc: '测试', },
        { name: '王五2', age: 23, desc: '测试', },
        { name: '王五3', age: 23, desc: '测试', },
        { name: '王五4', age: 23, desc: '测试', },
      ],
      sortedInfo: {
        columnKey: 'name',
        order: 'desc',
      },
      selectedRowKeys: ['0', '1'],
    };
  },
  methods: {
    onSort(sortedInfo) {
      this.sortedInfo = sortedInfo;
      // 排序代码 如果是本地排序就不需要做任何事了
      // 但是本地排序还没写 sorter 除了布尔 应该还可以给一个本地排序的函数
      // 使用一个函数(参考 Array.sort 的 compareFunction)
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
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        type: 'radio',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === '王五4', // Column configuration not to be checked
            name: record.name,
          }
        }),
      }
    },
  },
}
</script>
```

