<template>
  <div>
    <x-table :columns="columns" :source="value">
      <!-- <template v-slot:expandedRowRender>
        <test :children="children" is="test"></test>
      </template> -->
    </x-table>
    <el-button @click="onAdd">add item</el-button>
  </div>
</template>

<script>

export default {
  name: 'test',
  props: {
    name: {
      type: String,
      default: '',
    },
    children: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        { key: 'name', name: '名字' },
        { key: 'age', name: '年龄', width: 300 },
        { key: 'desc', name: '描述', width: 500 },
      ],
    };
  },
  methods: {
    onAdd() {
      this.value.push({ name: 'xx123' });
    },
  },
};
</script>
