<script>
import Basic from './basic.md';

const markdown = `# Table 表格
  用于绘制业务表格，使用 \`div\` 制作而非 \`table\`。
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
