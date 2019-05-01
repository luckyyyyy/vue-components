<template>
  <header>
    <h1>{{ `${name} @ ${version}` }}</h1>
    <h2>$ npm i {{ name }} -S &amp; yarn add {{ name }} -S</h2>
  </header>
</template>

<script>
import { name, version } from '../../package.json';

export default {
  data() {
    return {
      name, version,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  padding-left: 30px;
  height: 80px;
  box-shadow: 0 0 20px #000000;
  z-index: 10;

  h1,
  h2 {
    margin: 0;
  }

  h1 {
    margin: 0;
    line-height: 60px;
    font-size: 24px;
  }

  h2 {
    font-size: 18px;
    line-height: 8px;
    color: #aaaaaa;
  }
}
</style>
