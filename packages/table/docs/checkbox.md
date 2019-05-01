<cn>
#### 表格
带 Checkbox 的 `Table` 受控需要传递 selectedRowKeys，非受控可不传，组件内部会维护。
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
    <br>
    <br>
    <el-button @click="selectedRowKeys = ['2']">直接受控</el-button>
    <el-button @click="source.push({ name: '张三', age: 13, desc: '这个人很坏', })">添加一行</el-button>
    <el-button :loading="loading" @click="onCancel">外部控制全部不选</el-button>
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
      loading: false,
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
      this.source.reverse();
      // 排序代码 如果是本地排序就不需要做任何事了
      // 但是本地排序还没写 sorter 除了布尔 应该还可以给一个本地排序的函数
      // 使用一个函数(参考 Array.sort 的 compareFunction)
    },
    onCancel() {
      this.loading = true;
      setTimeout(() => {
        this.selectedRowKeys = [];
        this.loading = false;
      }, 2000);
    }
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
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: row => ({
          props: {
            disabled: row.name === '王五4', // Column configuration not to be checked
            name: row.name,
          }
        }),
      }
    },
  },
}
</script>
```

