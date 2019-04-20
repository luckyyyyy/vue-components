/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';

export default {
  name: 'x-table',
  props: {
    checkCanExpand: {
      type: Function,
      default: () => true,
    },
    options: {
      type: Object,
      default: () => {},
    },
    head: {
      type: [Boolean, Number],
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    cancelSort: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: '',
    },
    rowClass: {
      type: [Function, String],
      default: '',
    },
    columns: {
      type: Array,
      default: () => [],
    },
    source: {
      type: Array,
      default: () => [],
    },
    autoFill: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      expand: {},
    };
  },
  computed: {
    canExpand() {
      return this.$scopedSlots.expandedRowRender;
    },
    tableColumns() {
      const columns = this.columns.map((item) => {
        const column = item;
        if (!column.width) {
          column.flex = '1'; // 没有宽度的就自适应了
        }
        return column;
      });
      if (this.canExpand) {
        columns.unshift({ width: 25, key: 'expandedRowRender', class: ['expand-column'] });
      }
      return columns;
    },
    statLine() {
      return Object.keys(this.$slots).some(key => key.match(/^@[A-Z]/) !== null);
    },
    totalColumnWidth() {
      return this.columns.reduce((acc, column) => acc + (column.width || column.minWidth || 0), 0);
    },
  },
  watch: {
    source(source) {
      const expand = {};
      source.forEach((row, i) => {
        const key = this.rowKey ? row[this.rowKey] : i;
        if (this.expand[key]) {
          expand[key] = this.expand[key];
        } else {
          delete expand[key];
        }
      });
      this.expand = expand;
    },
  },
  methods: {
    getAlignClass(align) {
      switch (align) {
        case 'center':
          return 'table-centext-center';
        case 'right':
          return 'table-centext-right';
        default:
          return 'table-centext-left';
      }
    },
    renderHeader() {
      if (this.head) {
        const styles = typeof this.head === 'number' && { height: `${this.head}px` };
        return (
          <div class="x-table-head" style={styles}>
            { this.tableColumns.map((column, index) => {
              const align = this.getAlignClass(column.align);
              return (
                <div
                  onClick={e => column.sorter && this.onSort(e, column)}
                  class={['x-table-head-item', { ['x-table-pointer']: column.sorter }, align, column.class]}
                  key={index}
                  style={{ minWidth: `${column.minWidth}px`, width: `${column.width}px`, flex: column.flex }}
                >
                  { column.name }
                  {
                    column.sorter &&
                    <span class="x-table-head-item-sort">
                      <i onClick={e => this.onSort(e, column, SORT_ASC)} class={['sort-asc', { active: column.sortOrder === SORT_ASC }]}></i>
                      <i onClick={e => this.onSort(e, column, SORT_DESC)} class={['sort-desc', { active: column.sortOrder === SORT_DESC }]}></i>
                    </span>
                  }
                </div>
              );
            })}
          </div>
        );
      }
      return '';
    },
    renderStatLine() {
      if (this.statLine) {
        return (
          <div class="x-table-row x-table-stat-line">
            { this.tableColumns.map((column, k) => {
              const align = this.getAlignClass(column.align);
              return (
                <div
                  key={`@${k}`}
                  class={['x-table-row-item', align, column.class]}
                  style={{ minWidth: `${column.minWidth}px`, width: `${column.width}px`, flex: column.flex }}
                >
                { this.$slots[this.getStatColumn(column.key)] }
                </div>
              )
            })}
          </div>
        );
      }
      return '';
    },
    renderRow(row, i) {
      const result = [];
      const key = this.rowKey ? row[this.rowKey] : i;
      result[0] = (
        <div
          onClick={() => this.onExpand(key, row)}
          key={key}
          class={['x-table-row', { ['x-table-pointer']: this.canExpand }, typeof this.rowClass === 'string' ? this.rowClass : this.rowClass(row)]}
        >
          { this.tableColumns.map((column, j) => {
            const align = this.getAlignClass(column.align);
            return (
              <div
                class={['x-table-row-item', align, column.class]}
                onMouseenter={e => this.onMouseenter(e, row, i, column)}
                onMouseleave={e => this.onMouseleave(e, row, i, column)}
                key={j}
                style={{ width: `${column.width}px`, flex: column.flex, minWidth: `${column.minWidth}px` }}
              >
              {
                column.key === 'expandedRowRender'
                  ? this.checkCanExpand(row) && <i class={['perfma-icon', 'perfma-arrow-right', { 'icon-expand': this.expand[key] }]}></i>
                  : <div class="x-table-row-item-content"> { (this.$scopedSlots[column.key] && this.$scopedSlots[column.key]({ $index: i, row,})) || row[column.key] } </div>
              }
              </div>
            )})
          }
        </div>
      );
      if (this.expand[key] !== undefined) {
        result[1] = (
          <div class="x-table-row-expand" v-show={this.expand[key] === true} key={`${key}-expand`}>
            {
              this.$scopedSlots.expandedRowRender && this.$scopedSlots.expandedRowRender({
                $index: i,
                row,
              })
            }
          </div>
        );
      }
      return result;
    },
    onSort(e, column, sort) {
      e.stopPropagation();
      let result = {};
      if (sort) {
        result = {
          columnKey: column.key,
          order: sort,
        };
      } else if (column.sortOrder) {
        if (column.sortOrder === SORT_ASC) {
          result = {
            columnKey: column.key,
            order: SORT_DESC,
          };
        } else if (this.cancelSort) {
          result = null;
        } else {
          result = {
            columnKey: column.key,
            order: SORT_ASC,
          };
        }
      } else {
        result = {
          columnKey: column.key,
          order: SORT_ASC,
        };
      }
      this.$emit('sort', result);
    },
    onExpand(key, row) {
      if (this.canExpand && this.checkCanExpand(row)) {
        const expand = !this.expand[key];
        this.expand[key] = expand;
        this.$forceUpdate();
        this.$emit('expand', expand, row);
      }
    },
    onMouseenter(e, row, index, column) {
      // console.log(e.target.children[0].scrollWidth, e.target.children[0].offsetWidth)
      // console.dir(e.target.children[0])
      const el = e.target.children[0];
      // console.log(el.scrollWidth, el.offsetWidth)
      if (column.autoToolTip !== false && el.scrollWidth > el.offsetWidth) {
        this.$tablePopper.show(e.target);
      }
      this.$emit('mouseenter', row, index, column);
    },
    onMouseleave(e, row, index, column) {
      this.$emit('mouseleave', row, index, column);
    },
    getStatColumn(column) {
      return `@${column.substring(0, 1).toUpperCase()}${column.substring(1)}`;
    },
    setAutoFillWidth() {
      if (this.autoFill && this.$refs.$table) {
        this.$refs.$table.style.minWidth = '';
        const width = Math.max(this.$refs.$table.offsetWidth, this.totalColumnWidth);
        this.$refs.$table.style.minWidth = `${width}px`;
      }
    }
  },
  render() {
    const header = this.renderHeader();
    const body = this.source.length
      ? <div class="x-table-body">
        { this.$slots.beforeRowRender }
        { this.source.map((row, i) => this.renderRow(row, i)) }
        { this.renderStatLine() }
        { this.$slots.afterRowRender }
      </div>
      : <div class="x-table-empty">
        { this.loading ? '努力载入中' : '暂无数据' }
      </div>;
    return (
      <div ref="$table" class="x-table">
        { header }
        { body }
      </div>
    );
  },
  updated() {
    this.setAutoFillWidth();
  },
  mounted() {
    this.setAutoFillWidth();
  }
};
