<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'x-iconfont',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>
