<script>
import Basic from './basic.md';

const markdown = `# LayoutNav 布局NAV
  点击跳转到对应视图
  ## 代码演示`;

export default {
  render() {
    return (
      <div>
        <md md={markdown} />
        <Basic />
      </div>
    );
  }
}
</script>
