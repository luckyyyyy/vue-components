<script>
import Basic from './basic.md';
import Column from './column.md';
import None from './none.md';
import Multiple from './multiple.md';
import Color from './color.md';


const markdown = `# ChartsFilter 分布选择器
  介绍
  ## 代码演示`;

export default {
  render() {
    return (
      <div>
        <md md={markdown} />
        <Basic />
        <Column />
        <Multiple />
        <None />
        <Color />
      </div>
    );
  },
};
</script>
