# Perfma 前段公共组件库

暂时使用 git submodule 管理

## 使用方法

到项目的根目录，使用命令`git submodule add git@gitlab.perfma-inc.net:perfma-fe/packages.git src/packages`

这样你的目录 src 目录中就会有一个 packages 的 git 仓库了，代码中可以使用下面的方式使用组件。
请注意一定要使用组件的 name 字段来命名，方便统计和扩展。

```javascript
import Nav from '@/packages/lazyload/nav';

export default {
  components: {
    [Nav.name]: Nav,
  },
}
```

## 更新方法

git submodule 不会自动更新，它以你当前提交的`主仓库`中的`src/packages commit id` 为准。
例如项目中的 src/packages 仓库当前的 commit id 为 `cb2ac7d` 那么就以此为基准，你不进行手动更新则不会自动更新，相当于锁定版本。

如果需要更新 packages 可以进入到目录中手动同步上游，或者使用脚本执行`git submodule foreach git pull origin develop`，这个和自己进去`pull`没有区别，当然注意进入后是具体的`commit`分支，你不能直接pull来同步，你需要切换到主分支后再执行`git pull`。

同步后的你主仓库会有新的 status 刷新，虽然子模块已更新，但是依赖版本还没有更新，可以完成你所有的工作后，在主仓库 commit、push 即可完成对子模块的依赖版本更新。
其他人就可以使用 `git pull && git submodule update` 同步最新的子模块。

## 贡献packages

进入目录后注意你当前的分支，建议切换到最新的`develop`分支，如果不在最新的情况下提交会生成一个本地的新 commit，你需要从`packages`的`develop`分支合并你刚才的commit。
其他步骤和维护一个`git`仓库没有任何区别。
