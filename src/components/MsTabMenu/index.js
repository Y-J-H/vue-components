let currentTab = null

export default {
  name: 'MsTabMenu',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator: val => ['top', 'right', 'bottom', 'left'].includes(val)
    },
    value: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  render(h) {
    return (
      <div>
        <el-tabs
          tab-position={this.position}
          value={this.value}
          onTab-click={this.handleClick}
        >
          {this.$slots.default.map(tab => {
            const {
              data: {
                key,
                attrs: { label, name, icon = '' }
              }
            } = tab
            return (
              <el-tab-pane key={key} label={label} name={name}>
                {<template slot='label'>
                  {icon && (
                    <i class={`${icon}`} />
                  )}
                  {label}
                </template>}
                {!this.path && tab}
              </el-tab-pane>
            )
          })}
        </el-tabs>
        {this.path && <router-view key={this.path} />}
      </div>
    )
  },
  methods: {
    handleClick(tab) {
      const { name = '' } = tab
      if (name !== currentTab) {
        currentTab = name
        if (this.path) {
          this.$router.push(name)
        }
        this.$emit('change', name)
      }
    }
  }
}
