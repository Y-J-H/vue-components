基本用法

适用点:
- 当我们需要根据后端返回上数据，来展示不同的操作的时候
- 在html中需要写多个if...else 进行逻判断或者循环的时候
- 在模版渲染中，我们可能会多次取同一个对象上的某个属性，然后在进行处理，最后去展示页面，这样在template中的代码个人感觉会非常显的冗余, 而且不利于后期更改

```vue
<template>
  <ms-jsx :params="paramsData" :render="renderFun"></ms-jsx>
</template>

<script>
/* 更改不同的status,和process 页面上的处理有不一样的展示 */
  export default {
    data() {
      return {
        paramsData: {
          id: 1,
          status: 'SUCCESS', // SUCCESS | DETECTING
          process: 'CONFIRMED'  // 'NEW'| 'CONFIRMED' | 'IGNORED'
        }
      }
    },
    methods: {
      renderFun(h, row) {
        const { id, status, process } = row
        return status === 'DETECTING' ? (
          <span class="el-dropdown-link grey">
            处理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        ) : (
          <el-dropdown
          trigger="click"
          onCommand={command => this.handleCommand(command, id)}>
            <span class="el-dropdown-link blue">
              处理<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {process === "IGNORED" ? (
                <el-dropdown-item command="CANCEL_IGNORE">取消忽略</el-dropdown-item>
              ) : (
                <div>
                  <el-dropdown-item command={
                      process === "CONFIRMED" ? "CANCEL_CONFIRM" : "CONFIRM"
                    }>{
                      process === "CONFIRMED" ? "取消确认" : "确认"
                    }
                  </el-dropdown-item>
                  <el-dropdown-item command="IGNORE">忽略</el-dropdown-item>
                </div>
              )}
            </el-dropdown-menu>
          </el-dropdown>
        )
      },
      handleCommand(command, id) {
        console.log(command, id)
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