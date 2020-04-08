基本用法

适用点:
- 当我们需要根据后端返回上数据，来展示不同的操作的时候
- 在html中需要写多个if...else 进行逻判断或者循环的时候
- 在模版渲染中，我们可能会多次取同一个对象上的某个属性，然后在进行处理，最后去展示页面，这样在template中的代码个人感觉会非常显的冗余, 而且不利于后期更改

```vue
<template>
  <ms-jsx :params="riskData" :render="renderRiskOpt"></ms-jsx>
</template>

<script>
/* 更改不同的detect_status,和risk_process 页面上的风险处理有不一样的展示 */
  export default {
    data() {
      return {
        riskData: {
          risk_id: 1,
          detect_status: 'SUCCESS', // SUCCESS | DETECTING
          risk_process: 'CONFIRMED'  // 'NEW'| 'CONFIRMED' | 'IGNORED'
        }
      }
    },
    methods: {
      renderRiskOpt(h, row) {
        const { risk_id, detect_status, risk_process } = row
        return detect_status === 'DETECTING' ? (
          <span class="el-dropdown-link grey">
            风险处理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        ) : (
          <el-dropdown
          trigger="click"
          onCommand={command => this.handleCommand(command, risk_id)}>
            <span class="el-dropdown-link blue">
              风险处理<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {risk_process === "IGNORED" ? (
                <el-dropdown-item command="CANCEL_IGNORE">取消忽略</el-dropdown-item>
              ) : (
                <div>
                  <el-dropdown-item command={
                      risk_process === "CONFIRMED" ? "CANCEL_CONFIRM" : "CONFIRM"
                    }>{
                      risk_process === "CONFIRMED" ? "取消确认" : "确认风险"
                    }
                  </el-dropdown-item>
                  <el-dropdown-item command="IGNORE">忽略风险</el-dropdown-item>
                </div>
              )}
            </el-dropdown-menu>
          </el-dropdown>
        )
      },
      handleCommand(command, risk_id) {
        console.log(command, risk_id)
      }
    }
  }
</script>

<style>
.grey {
  color: #bfcbda;
}
.el-dropdown {
  color: #33a2ef !important;
}
</style>
```