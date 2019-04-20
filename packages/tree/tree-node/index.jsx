/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';

export default {
  name: 'x-tree-node',
  props: {
    node: {
      type: Object,
      default: () => {},
    },
  },
  inject: ['load'],
  render() {
    const renderExpand = this.renderExpand(h);
    const renderNodeName = this.renderNodeName(h);
    return (
      <li class="x-tree-node">
        { renderNodeName }
        { renderExpand }
      </li>
    );
  },
  data() {
    return {
      loading: false,
      expand: this.node.expand || undefined, // default
    };
  },
  created() {
    if (this.expand) {
      this.switchExpand(true);
    }
  },
  computed: {
    // 是否可以展开的逻辑
    canExpand() {
      if (this.node.isLeaf) { // 设置为 isLeaf 一定不允许展开
        return false;
      }
      if (this.load) { // 有了 异步加载 就可以展开
        return true;
      }
      if (this.$scopedSlots.children) { // 有了子 slot 就可以展开
        return true;
      }
      // 其余时候根据是否有 children
      return this.node.children && this.node.children.length > 0;
    },
    icon() {
      if (this.loading) {
        return 'perfma-xiaoloading rotate'
      }
      if (!this.canExpand) {
        return '';
      }
      if (this.expand) {
        return 'perfma-arrow-right down';
      }
      return 'perfma-arrow-right';
    },
  },
  methods: {
    // 渲染 node name
    renderNodeName(h) {
      const icon = this.canExpand && (
        <span class="x-tree-item-btn">
          <i class={['perfma-icon', this.icon]}></i>
        </span>
      );
      const name = this.$scopedSlots.node ? this.$scopedSlots.node(this.node) : this.node.name;
      return (
        <div class="x-tree-item" onClick={this.onClickNodeName}>
          <span class="x-tree-item-icon">
            { icon }
          </span>
          <span class="x-tree-item-name" style={this.node.style}>
            { name }
          </span>
          { this.$scopedSlots.after && this.$scopedSlots.after(this.node) }
        </div>
      );
    },
    // 渲染 node
    renderNode(h, node, index) {
      const on = {
        expand: this.onExpand || this.$listeners.expand,
        click: this.onClick || this.$listeners.click,
      }
      const scopedSlots = {};
      if (node.scopedSlots && Object.keys(node.scopedSlots).length > 0) {
        Object.keys(node.scopedSlots).forEach((slot) => {
          /** @todo 这里可能会有性能问题 */
          scopedSlots[slot] = props => h(node.scopedSlots[slot], {
            props: { ...props, value: Vue.observable(props.children) },
            on,
          });
        });
      }
      // 自动设置 key 0-0-0-0 形式
      let key;
      if (node.key) {
        key = node.key;
      } else if (this.$vnode.key !== undefined) {
        key = `${this.$vnode.key}-${index}`;
      } else {
        key = index;
      }
      return h('x-tree-node', { props: { node }, on, scopedSlots, key });
    },
    // 渲染展开页
    renderExpand(h) {
      if (this.canExpand && this.expand !== undefined) {
        return (
          <div v-show={this.expand} class="x-tree-child">
            { this.$scopedSlots.children ?
              this.$scopedSlots.children(this.node) :
              this.node.children.map((node, index) => {
                return this.renderNode(h, node, index);
              })
            }
          </div>
        );
      }
    },
    onClickNodeName(e) {
      e.stopPropagation();
      this.$emit('click', this.node);
      if (this.canExpand) {
        this.switchExpand(!this.expand);
      }
    },
    async switchExpand(expand) {
      try {
        if (expand && this.load && !this.loading) {
          this.loading = true;
          try {
            const children = await this.load(this.node);
            if (children) {
              if (children instanceof Array) {
                if (this.node.children) {
                  this.node.children.push(...children);
                } else {
                  this.node.children = children;
                }
              } else {
                console.error('[Tree] return structure is incorrect。')
              }
            }
          } catch (e) {
            this.loading = false;
            throw e;
          }
          this.loading = false;
        }
        this.expand = expand !== undefined ? expand : !this.expand;
        this.$emit('expand', this.expand, this.node);
      } catch (e) {
        console.error(e.message)
      }
    },
  },
};
