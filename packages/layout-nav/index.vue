<template>
  <nav class="x-layout-nav" ref="$nav">
    <router-link ref="$link" tag="menu" :to="item.route" v-for="item of nav" :key="item.name" class="x-layout-nav-menu">
      <i class="x-layout-nav-menu-icon" :class="[item.icon, prefix]"></i>
      {{ item.name }}
    </router-link>
    <div :style="{ top }" ref="$background" class="x-layout-nav-background"></div>
  </nav>
</template>

<script>

export default {
  name: 'x-layout-nav',
  props: {
    prefix: {
      type: String,
      default: 'iconfont',
    },
    nav: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      top: undefined,
    };
  },
  watch: {
    $route() {
      this.setAnimation();
      setTimeout(() => {
        if (this.$refs.$background.className.indexOf('animation') === -1) {
          this.$refs.$background.className = `${this.$refs.$background.className} animation`;
        }
      }, 500);
    },
  },
  methods: {
    setAnimation() {
      // vue-router src
      this.$nextTick(() => {
        const router = this.$router;
        const globalActiveClass = router.options.linkActiveClass;
        const activeClassFallback = globalActiveClass || 'router-link-active';
        this.$refs.$link.forEach((vm, index) => {
          if (vm.$el.className.indexOf(activeClassFallback) !== -1) {
            this.top = `${vm.$el.offsetHeight * index}px`;
          }
        });
      });
    },
  },
};
</script>
