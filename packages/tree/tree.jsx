import TreeNode from './tree-node/index.jsx';
import lazyMixin from './lazy-mixin.js';

export default {
  name: 'x-tree-group',
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
    load: {
      type: Function,
      default: undefined,
    }
  },
  provide() {
    return {
      load: this.load,
    }
  },
  components: {
    [TreeNode.name]: TreeNode,
  },
  mixins: [lazyMixin],
  async created() {
    this.getStructure();
  },
  methods: {
    onExpand(...args) {
      this.$emit('expand', ...args);
    },
    onClick(...args) {
      this.$emit('click', ...args);
    },
  },
  render(h) {
    if (this.status !== 'ok') {
      return <div v-loading={this.loading} class="x-tree-group-status">{ this.status }</div>;
    } else {
      return (
        <ul class="x-tree-group" role="tree">
          {
            this.structure.map((node, index) => {
              return TreeNode.methods.renderNode.call(this, h, node, index);
            })
          }
        </ul>
      );
    }
  },
};
