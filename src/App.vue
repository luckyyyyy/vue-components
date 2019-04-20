<template>
  <div class="app">
    <view-header></view-header>
    <div class="main">
      <view-sidebar class="sidebar"></view-sidebar>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default {
  components: {
    'view-header': Header,
    'view-sidebar': Sidebar,
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/app.scss';
</style>
