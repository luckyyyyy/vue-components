<script>
import Basic from './basic.md';

const markdown = `# Tab
  用起来很复杂
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
