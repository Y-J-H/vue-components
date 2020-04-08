export default {
  name: 'MsJsx',
  props: {
    /**
     * 渲染时需要的参数
     */
    params: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 渲染方法, 类型为 Function
     */
    render: {
      required: true,
      type: Function
    }
  },
  render(h) {
    return this.render(h, this.params)
  }
}
