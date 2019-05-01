<script>
import Basic from './basic.md';
import Components from './components.md';

const markdown = `# tree 强壮的树
  介绍
  ## 代码演示`;

export default {
  render() {
    return (
      <div>
        <md md={markdown} />
        <Basic />
        <Components />
      </div>
    );
  },
};
</script>
