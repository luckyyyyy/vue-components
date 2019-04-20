<script>
import Basic from './basic.md';

const markdown = `# SelectFilter 筛选器
  介绍
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
