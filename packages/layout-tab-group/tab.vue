<template>
  <span :title="name" @click="onClick" class="x-layout-tab" :class="{ active }">
    <span class="x-layout-tab-name">{{ name }}</span>
    <span v-if="val !== 0" @click.stop="onClose" class="x-layout-tab-close">x</span>
  </span>
</template>

<script>
export default {
  name: 'x-layout-tab',
  props: {
    name: {
      type: String,
      default: '',
    },
    val: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('select', this.val);
    },
    onClose() {
      this.$emit('close', this.val);
    },
  },
};
</script>
