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
      type: [String, Function],
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
    },
    rowSelection: {
      type: Object,
      default:  () => {},
    },
    // rowExpand: { // 考虑使用
    //   type: Object,
    //   default:  () => {},
    // },
  },
  data() {
    return {
      rawChecked: {},
      rawExpand: {},
    };
  },
  computed: {
    expand() {
      const expand = {};
      this.source.map((row, i) => {
        const key = this.getRowKey(row, i);
        expand[key] = this.rawExpand[key] || undefined;
      });
      return expand;
    },
    checked() {
      if (this.rowSelection.selectedRowKeys) {
        const checked = {};
        this.source.map((row, i) => {
          const key = this.getRowKey(row, i);
          checked[key] = this.rowSelection.selectedRowKeys.includes(key);
        })
        return checked;
      }
      return this.rawChecked;
    },
    checkedAll: {
      get() {
        const { keys } = this.getSelectedCheckbox();
        if (keys.length === 0) {
          return false;
        }
        return !this.source.some((row, i) => {
          const key = this.getRowKey(row, i);
          // 无视禁用
          if (this.checkBoxIsDisabled(row)) {
            return false;
          }
          return this.checked[key] !== true;
        });
      },
      set() {
        // 是否全选
        const isCheckAll = this.checkedAll;
        this.source.forEach((row, i) => {
          const key = this.getRowKey(row, i);
          // 无视禁用
          if (this.checkBoxIsDisabled(row)) {
            return;
          }
          this.checked[key] = !isCheckAll;
        });
        const { keys, rows } = this.getSelectedCheckbox();
        if (!this.rowSelection.selectedRowKeys) {
          const checked = {};
          keys.forEach((key) => checked[key] = true);
          this.rawChecked = checked;
        }
        this.rowSelection.onChange(keys, rows);
      },
    },
    canExpand() {
      return this.$scopedSlots.expandedRowRender !== undefined;
    },
    canUsePointer() {
      return this.$listeners.click || this.canExpand;
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
        columns.unshift({ width: 25, key: '$expandedRowRender', class: ['expand-column'] });
      }
      if (this.rowSelection) {
        columns.unshift({
          width: this.rowSelection.columnWidth || 35,
          key: `$checkboxRowRender-${this.rowSelection.type || 'checkbox'}`,
          class: ['checkbox-column']
        });
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
      if (source.length === 0) {
        this.rawExpand = {};
        this.rawChecked = {};
      } else {
        const expand = {};
        const checked = {};
        source.forEach((row, i) => {
          const key = this.getRowKey(row, i);
          if (this.expand[key]) {
            expand[key] = this.rawExpand[key];
          }
          if (this.rawChecked[key]) {
            checked[key] = this.rawChecked[key];
          }
        });
        this.rawExpand = expand;
        this.rawChecked = checked;
      }
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
    getRowKey(row, index) {
      if (this.rowKey) {
        if (typeof this.rowKey === 'string') {
          return row[this.rowKey]
        }
        if (typeof this.rowKey === 'function') {
          return this.rowKey(row, index);
        }
      }
      return index.toString();
    },
    checkBoxIsDisabled(row) {
      if (this.rowSelection.getCheckboxProps) {
        if ((this.rowSelection.getCheckboxProps(row).props.disabled)) {
          return true;
        }
      }
      return false;
    },
    getSelectedCheckbox() { // 获取全部选中的 keys 和 rows
      const keys = [];
      const rows = [];
      this.source.forEach((row, i) => {
        const key = this.getRowKey(row, i);
        if (this.checked[key] === true) {
          keys.push(key);
          rows.push(row);
        }
      });
      return { keys, rows };
    },
    renderHeader() {
      if (this.head) {
        const styles = typeof this.head === 'number' && { height: `${this.head}px` };
        return (
          <div class="x-table-head" style={styles}>
            { this.tableColumns.map((column, index) => {
              const align = this.getAlignClass(column.align);
              let render;
              switch (column.key) {
                case '$checkboxRowRender-checkbox':
                  if (!this.rowSelection.hideDefaultSelections) {
                    const { keys } = this.getSelectedCheckbox();
                    render = <el-checkbox
                      v-model={this.checkedAll}
                      nativeOnClick={(e) => e.stopPropagation()}
                      indeterminate={!this.checkedAll && keys.length > 0}
                    />
                  }
                  break;
                default:
                  render = [column.name, column.sorter &&
                    <span class="x-table-head-item-sort">
                      <i onClick={e => this.onSort(e, column, SORT_ASC)} class={['x-table-head-item-sort-asc', { active: column.sortOrder === SORT_ASC }]}></i>
                      <i onClick={e => this.onSort(e, column, SORT_DESC)} class={['x-table-head-item-sort-desc', { active: column.sortOrder === SORT_DESC }]}></i>
                    </span>
                  ]
              }
              return (
                <div
                  onClick={e => column.sorter && this.onSort(e, column)}
                  class={['x-table-head-item', { ['x-table-pointer']: column.sorter }, align, column.class]}
                  key={index}
                  style={{ minWidth: `${column.minWidth}px`, width: `${column.width}px`, flex: column.flex }}
                >
                { render }
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
      const key = this.getRowKey(row, i);
      result[0] = (
        <div
          onClick={(e) => this.onClick(row, key, i, e)}
          key={key}
          class={['x-table-row', { ['x-table-pointer']: this.canUsePointer }, typeof this.rowClass === 'string' ? this.rowClass : this.rowClass(row, key, i)]}
        >
          { this.tableColumns.map((column, j) => {
            const align = this.getAlignClass(column.align);
            let render;
            let props = {};
            switch (column.key) {
              case '$expandedRowRender': // 展开层
                render = this.checkCanExpand(row) && <i class={['perfma-icon', 'perfma-arrow-right', { 'icon-expand': this.expand[key] }]}></i>
                break;
              case '$checkboxRowRender-checkbox': // 复选
                if (this.rowSelection.getCheckboxProps) {
                  props = this.rowSelection.getCheckboxProps(row);
                }
                render = <el-checkbox
                  {...props}
                  v-model={this.checked[key]}
                  nativeOnClick={(e) => e.stopPropagation()}
                  onChange={(checked, e) => this.onCheckBoxChange(row, checked, i, e) }
                />
                break;
              case '$checkboxRowRender-radio': // 单选
                if (this.rowSelection.getCheckboxProps) {
                  props = this.rowSelection.getCheckboxProps(row);
                }
                render = <el-radio
                  {...props}
                  v-model={this.checked[key]}
                  nativeOnClick={(e) => e.stopPropagation()}
                  onChange={(checked, e) => this.onCheckBoxChange(row, checked, i, e) }
                />
              break;
              default:
                render = (
                  <div class="x-table-row-item-content">
                    { (this.$scopedSlots[column.key] && this.$scopedSlots[column.key]({ $index: i, row,})) || row[column.key] }
                  </div>
                )
            }
            return (
              <div
                onClick={(e) => column.key.indexOf('$checkboxRowRender') !== -1 && e.stopPropagation()} // 阻止点其他地方展开
                class={['x-table-row-item', align, column.class]}
                onMouseenter={e => this.onMouseenter(e, row, i, column)}
                onMouseleave={e => this.onMouseleave(e, row, i, column)}
                key={j}
                style={{ width: `${column.width}px`, flex: column.flex, minWidth: `${column.minWidth}px` }}
              >
              { render }
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
    onClick(row, key, i, e) {
      this.onExpand(row, key, i, e);
      this.$emit('click', row, key, i, e);
    },
    onExpand(row, key, i, e) {
      if (this.canExpand && this.checkCanExpand(row)) {
        const expand = !this.expand[key];
        // console.log(this.expand)
        this.$set(this.rawExpand, key, expand);
        // this.rawExpand[key] = expand;
        // this.$forceUpdate();
        this.$emit('expand', row, expand, this.expand);
      }
    },
    onCheckBoxChange(row, checked, index, e) {
      const { keys, rows } = this.getSelectedCheckbox();
      if (this.rowSelection.onChange) {
        this.rowSelection.onChange(keys, rows);
      }
      if (this.rowSelection.onSelect && row) {
        this.rowSelection.onSelect(row, checked, index, keys, rows, e);
      }
    },
    onMouseenter(e, row, index, column) {
      // console.log(e.target.children[0].scrollWidth, e.target.children[0].offsetWidth)
      // console.dir(e.target.children[0])
      const el = e.target.children[0];
      // console.log(el.scrollWidth, el.offsetWidth)
      if (el && column.autoToolTip !== false && el.scrollWidth > el.offsetWidth) {
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
        // magic code  清空一次先
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
