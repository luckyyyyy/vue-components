/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export default {
  props: {
    async: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      structure: [],
      status: 'wait',
      loading: false,
    };
  },
  methods: {
    async getStructure() {
      if (this.status === 'wait') {
        try {
          if (this.async && this.async.func) {
            this.loading = true;
            this.status = '载入中';
            this.structure = await this.async.func(...this.async.params);
          } else {
            this.structure = this.tree;
          }
          this.status = 'ok';
        } catch (e) {
          this.status = e.message;
        }
        this.loading = false;
      }
    }
  },
};
