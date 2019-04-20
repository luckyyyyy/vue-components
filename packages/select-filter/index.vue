<template>
  <div class="x-select-filter">
    <template v-if="options.length">
      <el-select @change="onSelectChange" v-model="select" placeholder="请选择">
        <el-option
          v-for="item in selects"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="label">
        <span
          @click="onSelect(label.key)"
          class="label-item"
          :class="{ active: label.key === value }"
          v-for="label of labels"
          :key="label.key"
        >
          {{ label.name }} <i class="label-item-num" v-if="label.num !== undefined">{{ label.num }}</i>
        </span>
        <span
          @click="onSelect(label.key)"
          class="label-item"
          :class="{ active: label.key === value }"
          v-for="label of appendLabels"
          :key="label.key"
        >
          {{ label.name }} <i class="label-item-num" v-if="label.num !== undefined">{{ label.num }}</i>
        </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'x-select-filter',
  props: {
    appendLabels: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    encodeKey: { // 包装key
      type: Function,
      default: undefined,
    },
    decodeKey: { // 暂时别用
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      select: '',
    };
  },
  created() {
    this.select = this.getCurrentSelect(); // calc default
  },
  watch: {
    options() {
      this.select = this.getCurrentSelect();
    },
  //   value() {
  //     const select = this._options.find((item) => {
  //       return item.labels.some(label => label.key === this.value);
  //     });
  //     if (select) {
  //       this.select = select.key || select.option;
  //     }
  //   },
  },
  computed: {
    selects() {
      return this._options.map(item => ({ value: item.key || item.option, label: item.option }));
    },
    labels() {
      const index = this._options.findIndex(item => item.key === this.select || item.option === this.select);
      if (this._options[index] && this._options[index].labels) {
        return this._options[index].labels;
      } else {
        return [];
      }
    },
    _options() {
      if (this.encodeKey) {
        const options = this.options.map((items) => {
          const labels = items.labels.map((label) => {
            return { ...label, key: this.encodeKey(items.key, label.key) };
          });
          return { ...items, labels };
        })
        return options;
      } else {
        return this.options;
      }
    },
  },
  methods: {
    onSelect(key) {
      this.$emit('input', key);
      this.$emit('label-change', key);
    },
    onSelectChange() {
      this.$emit('select-change', this.select);
    },
    getCurrentSelect() {
      if (this.decodeKey) {
        const decode = this.decodeKey(this.value);
        if (decode && decode[0]) {
          return decode[0];
        }
      }
      const select = this._options.find(items => items.labels.find(label => label.key === this.value));
      if (select) {
        return select.key || select.option;
      }
      if (this._options[0]) {
        return this._options[0].key || this._options[0].option;
      }
    },
  },
};
</script>
