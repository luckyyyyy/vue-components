/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Popper from 'popper.js';
import Vue, { VNode } from 'vue';
import debounce from 'lodash/debounce';

let popperInstance: Popper
let fn: Function;

export default Vue.extend({
  data() {
    return {
      popperContent: '',
      enter: false,
    };
  },
  render(): VNode {
    return (
      <div v-show={this.enter && this.popperContent} class="table-popper" ref="$popper">
        <div class="table-popper-content" domPropsInnerHTML={this.popperContent}></div>
      </div>
    );
  },
  created() {
    fn = debounce((el: HTMLElement, content?: string) => {
      if (this.$refs.$popper instanceof HTMLElement) {
        if (this.enter) {
          this.popperContent = content || el.innerText;
          popperInstance = new Popper(el, this.$refs.$popper, {
            placement: 'top',
          });
          const checkConnected = () => {
            if (this.enter && el.isConnected === true) {
              setTimeout(() => {
                checkConnected();
              }, 0);
            } else if (el.isConnected === false) {
              this.hide();
            }
          }
          checkConnected();
        }
      }
    }, 500);
  },
  methods: {
    show(el: Element, content?: string) {
      this.enter = true;
      el.addEventListener('mouseleave', this.hide, false);
      fn(el, content);
    },
    hide(e?: Event) {
      this.popperContent = '';
      if (popperInstance) {
        popperInstance.destroy();
      }
      this.enter = false;
      if (e && e.target instanceof Element) {
        e.target.removeEventListener('mouseleave', this.hide, false);
      }
    },
  },
});
