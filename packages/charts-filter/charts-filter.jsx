/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const colors = [
  '#FF566B',
  '#D0021B',
  '#FFB176',
  '#F57D23',
  '#FFF46E',
  '#F8E71C',
  '#BFFF80',
  '#80DF23',
  '#62FFDE',
  '#11CBA4',
  '#64DFFF',
  '#11A4CB',
  '#6C84FF',
  '#2347FF',
  '#C895FF',
  '#A049FF',
  '#C869BF',
  '#8B1FA2',
  '#FF23EA',
  '#EEB7B1',
];

export default {
  name: 'x-charts-filter',
  props: {
    charts: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 250,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
    hideItems: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, Array, String],
      default: null,
    },
  },
  computed: {
    total() {
      return this.charts.reduce((acc, item) => acc + Number(item.num), 0);
    },
  },
  render() {
    const { column, width, hideItems, total } = this;

    const block = this.charts.map((item, k) => {
      if (item.num > 0) {
        return (
          <el-tooltip key={k} placement="top" content={`${item.name}: ${item.num}`}>
            <i
              onClick={() => this.onSelect(item.key)}
              style={{
                background: item.col || colors[k] || '#fff',
                width: `${item.num / total * 100}%`
              }}
              class={['line-item', { active: this.checkExists(item.key) }]}
            >
            </i>
          </el-tooltip>
        );
      }
    });
    const items = this.charts.map((item, k) => {
      if (item.num > 0) {
        return (
          <div
            class={['item', { active: this.checkExists(item.key) }]}
            onClick={() => this.onSelect(item.key)}
            key={k}
          >
            <i style={{ background: item.col || colors[k] || '#fff' }}></i>
            <span>{ item.name }</span>
          </div>
        );
      }
    });
    return (
      <div class={['x-charts-filter', { column }]}>
        <div class="line" style={{ width: `${width}px` }}>
          { block }
        </div>
        { !hideItems && <div class="items">
            { items }
          </div>
        }
      </div>
    );
  },
  methods: {
    checkExists(key) {
      if (this.multiple) {
        return this.value.includes(key);
      }
      return this.value === key;
    },
    onSelect(key) {
      let value;
      if (this.multiple) {
        value = [].concat(...this.value);
        if (!this.checkExists(key)) {
          value.push(key);
        } else {
          value.splice(value.indexOf(key), 1);
        }
      } else if (!this.checkExists(key)) {
        value = key;
      } else {
        value = null;
      }
      this.$emit('select', value);
      this.$emit('input', value);
    },
  },
};
