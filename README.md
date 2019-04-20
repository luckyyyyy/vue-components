# 制作自己的 Vue 组件库

此项目从创建之初到投入使用不到两周时间，开源出来是为了记录第一份代码的演变过程，仅提供学习使用。
记录自己熟悉前端全生态的一个例子，从搭建 npm 私服开始，脚手架代码几乎都是自己实现，除了文档部分暂时使用了vue-antd-md-loader。

前端东西的确太多了，不太适合新手入门，需要简化。

警告：不要用于生产环境，我们只在内部使用，遇到BUG概不负责！

## 主要使用到的库和工具如下：

 * babel
 * webpack
 * rollup
 * postcss
 * vue-antd-md-loader (文档)


## TODO

 * [ ] 单组件加载支持 配合 babel-plugin-import
 * [ ] 解决 rollup 打包 vue 文件 生成 vue-runtime-helpers/dist/normalize-component.js 的问题

## 使用

由于没时间，命令比较粗略，只满足了最基本的使用需求。

yarn dev 打开文档+组件开发调试
yarn build 文档生产
yarn lint （ESLINT 暂时没时间检查）
yarn lint:style （STYLELINT 暂时没时间检查）
yarn rollup 创建lib目录 单组件
yarn lib 创建所有组件的js包
yarn compile 命令合集
yarn pub 内网发布
