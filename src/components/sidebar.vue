<script>
import components from '../../components.json';

export default {
  render() {
    const router = Object.keys(components).map((component) => {
      return (
        <router-link class="sidebar-item" tag="div" to={{ name: `components/${component}` }}>
          { `${component} ${components[component].name}` }
        </router-link>
      );
    });
    return (
      <x-affix>
        <div class="sidebar">
          { router }
        </div>
      </x-affix>
    );
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  background: #002c46;

  &-item {
    height: 40px;
    font-size: 12px;
    padding: 0 20px;
    line-height: 40px;

    &:hover,
    &.router-link-active {
      cursor: pointer;
      background: lighten(#121933, 30%);
      border-right: 4px solid lighten(#121933, 60%);
    }
  }
}
</style>
