<template>
  <section
    :id="id"
    :class="['code-box', codeExpand ? 'expand': '']"
  >
    <section class="code-box-demo">
      <template v-if="iframeDemo[iframeDemoKey]">
        <div class="browser-mockup with-url">
          <iframe
            :src="iframeDemo[iframeDemoKey]"
            height="360"
          />
        </div>
      </template>
      <template v-else>
        <slot name="component" />
      </template>
    </section>
    <section class="code-box-meta markdown">
      <slot name="description" />
      <!-- <a-tooltip :title="codeExpand ? 'Hide Code' : 'Show Code'">
        <span class="code-expand-icon">
          <img
            width="16"
            alt="expand code"
            src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
            :class="codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'"
            @click="handleCodeExpand"
          >
          <img
            width="16"
            alt="expand code"
            src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
            :class="codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'"
            @click="handleCodeExpand"
          >
        </span>
      </a-tooltip> -->
    </section>
    <transition
      appear
      :css="false"
    >
      <section
        class="highlight-wrapper"
        style="position: relative;"
      >
        <!-- <a-tooltip
          :title="copied ? '复制成功' : '复制代码'"
          :visible="copyTooltipVisible"
          @visibleChange="onCopyTooltipVisibleChange"
        >
          <a-icon
            v-clipboard:copy="sourceCode"
            v-clipboard:success="handleCodeCopied"
            :type="copied && copyTooltipVisible ? 'check' : 'copy'"
            class="code-box-code-copy"
          />
        </a-tooltip> -->
        <slot name="code" />
      </section>
    </transition>
  </section>
</template>
<script>
// import animate from 'antd/_util/openAnimation';
// import BaseMixin from 'antd/_util/BaseMixin';
// import { isZhCN } from '../util';
export default {
  name: 'DemoBox',
  // mixins: [BaseMixin],
  props: {
    jsfiddle: Object,
    isIframe: Boolean,
  },
  inject: {
    iframeDemo: { default: {}},
    demoContext: { default: {}},
  },
  data () {
    const { name = '' } = this.demoContext;
    const { us, cn, sourceCode } = this.jsfiddle;
    // let sourceCode = `<template>${html}</template>\n`
    // sourceCode = script ? sourceCode + '\<script>' + script + '<\/script>' : sourceCode
    // sourceCode = style ? sourceCode + '\<style>' + style + '<\/style>' : sourceCode
    const usTitle = (us.split('#### ')[1] || '').split('\n')[0] || '';
    const cnTitle = (cn.split('#### ')[1] || '').split('\n')[0] || '';
    if (process.env.NODE_ENV !== 'production' && usTitle === '') {
      // throw new Error(
      //   `not have usTitle`,
      // );
    }
    const iframeDemoKey = usTitle.split(' ').join('-').toLowerCase();
    const id = ['components', name.replace(/-cn\/?$/, ''), 'demo', ...usTitle.split(' ')].join('-').toLowerCase();

    if (this.demoContext.store) {
      const { currentSubMenu } = this.demoContext.store.getState();
      // id = `${id}-${currentSubMenu.length + 1}`
      this.demoContext.store.setState({ currentSubMenu: [...currentSubMenu, { cnTitle, usTitle, id }] });
    }
    return {
      codeExpand: false,
      copied: false,
      copyTooltipVisible: false,
      sourceCode,
      id,
      iframeDemoKey,
    };
  },
  methods: {
    handleCodeExpand  ()  {
      this.codeExpand = !this.codeExpand;
    },
    handleCodeCopied () {
      this.setState({ copied: true });
    },

    onCopyTooltipVisibleChange (visible) {
      if (visible) {
        this.setState({
          copyTooltipVisible: visible,
          copied: false,
        });
        return;
      }
      this.setState({
        copyTooltipVisible: visible,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.code-box {
  border: 1px solid #ebedf0;
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0 0 16px;
  transition: all .2s;
  background: #121933;
}

.code-box-demo {
  border-bottom: 1px solid #ebedf0;
  padding: 42px 24px 50px;
}

.markdown {
  color: #dddddd;
  font-size: 14px;
  line-height: 2;
}

.code-box-meta.markdown {
  position: relative;
  padding: 18px 32px;
  border-radius: 0 0 2px 2px;
  transition: background-color .4s;
  width: 100%;
  font-size: 14px;
}

.code-box-meta > h4 {
  position: absolute;
  top: -14px;
  padding: 1px 8px;
  margin-left: -8px;
  color: #ffffff;
  border-radius: 2px 2px 0 0;
  background: #121933;
  font-size: 14px;
  width: auto;
  margin: 0;

  a {
    color: #2fa3ff;
  }
}

.code-box .code-box-meta {
  border-radius: 0;
  border-bottom: 1px dashed #ebedf0;
}

.highlight-wrapper {
  background: #23241f;
  padding: 20px;
}
</style>
