<template>
  <div class="x-layout-tab-group" ref="$wrapper">
    <div class="x-layout-tab-group-scroll" ref="$group">
      <x-layout-tab
        :val="k"
        :name="item.name"
        @select="onSelectTab"
        @close="onClose"
        v-for="(item, k) of group" :key="k"
        :active="value === k"
      >
      </x-layout-tab>
    </div>
    <el-dropdown trigger="click" v-if="more" class="x-layout-tab-group-more" size="medium">
      <i class="el-icon-caret-bottom"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="item.index === value"
          :class="{ 'x-layout-tab-group-more-current': item.index === value }"
          @click.native="onSelect(item.index)" v-for="(item, k) of sortGroup"
          :key="k"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Tab from './tab.vue';

export default {
  name: 'x-layout-tab-group',
  components: {
    [Tab.name]: Tab,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    route: {
      type: String,
      default: '',
    },
    tabName: {
      type: Function,
      default: route => route.name,
    },
  },
  data() {
    return {
      group: [],
      more: false,
    };
  },
  computed: {
    sortGroup() {
      const group = this.group.map((item, index) => ({ index, ...item }));
      return group.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
    currentTab() {
      return this.group[this.value];
    },
  },
  watch: {
    group() {
      this.initScroll();
    },
    $route(current, old) {
      if (this.route) {
        // 没有外部忽略 也没有内部忽略监听
        if (!this.$route.query.$ignorewatch && !this.ignorewatch) {
          this.checkRoute();
        }
        // if (old.matched.some(route => route.name === this.route)) {
        //   this.currentTab.route.fullPath = old.fullPath;
        //   this.$emit('update:tabs', this.group);
        // }
        this.group.forEach((item, index) => {
          if (item.route.fullPath === this.$route.fullPath) {
            this.onSelect(index);
          }
        });
      }
    },
  },
  created() {
    this.group = this.tabs.map((tab) => {
      if (typeof tab === 'string') {
        return { name: tab, route: this.$route };
      }
      if (Array.isArray(tab)) {
        return { name: tab[0], route: { fullPath: tab[1] } };
      }
      return tab;
    });
    if (this.route) {
      this.checkRoute();
    }
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    checkRoute() {
      if (this.$route.matched.some(route => route.name === this.route && this.$route.fullPath !== this.currentTab.route.fullPath)) {
        // 自动新添加
        if (this.$route.query.$newtab === '1') {
          this.addTabs();
        }
      }
    },
    initScroll() {
      this.$nextTick(() => {
        this.$refs.$group.style.width = '';
        this.more = this.$refs.$wrapper.clientWidth < this.$refs.$wrapper.scrollWidth;
        this.$refs.$group.style.width = `${this.$refs.$group.scrollWidth + ((this.more && 30) || 0)}px`;
        if (!this.bsInstance) {
          this.bsInstance = new BScroll(this.$refs.$wrapper, {
            scrollX: true,
            // observeDOM: false,
            bounce: false,
            // scrollbar: true,
            mouseWheel: true,
          });
        } else {
          this.bsInstance.refresh();
        }
      });
    },
    scrollToElement() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.bsInstance.scrollToElement(this.$refs.$group.childNodes[this.value], 1000, true, true);
        }, 0);
      });
    },
    onSelectTab(val) {
      this.ignorewatch = true;
      this.onSelect(val);
      this.$nextTick(() => {
        this.ignorewatch = false;
      })
    },
    onSelect(val) {
      if (this.value === val) {
        return;
      }
      if (this.route) {
        if (this.group[val].route.fullPath !== this.$route.fullPath && this.currentTab) {
          this.currentTab.route.fullPath = this.$route.fullPath;
          this.$emit('update:tabs', this.group);
        }
        this.$router.push(this.group[val].route.fullPath);
      }
      this.$emit('input', val);
      this.$emit('select', val);
      if (this.ignorewatch !== true) {
        this.scrollToElement();
      }
    },
    onClose(val) {
      // 当前选项卡大于要关闭的
      this.group.splice(val, 1);
      if (this.value >= val) {
        // 可能会有点问题 还不确定
        this.onSelectTab(this.value - 1);
      }
      this.$emit('close', val);
      this.$emit('update:tabs', this.group);
      this.initScroll();
    },
    addTabs(name, route = this.$route, autoSelect = true) {
      if (this.route) {
        const index = this.group.findIndex(item => item.route.fullPath === route.fullPath);
        if (index !== -1) {
          this.onSelect(index);
          return;
        }
      }
      const fullPath = route.fullPath.toString();
      this.group.push({ name: this.tabName(route), route: { fullPath } });
      this.$emit('update:tabs', this.group);
      if (autoSelect) {
        this.onSelect(this.group.length - 1);
      }
    },
  },
};
</script>
