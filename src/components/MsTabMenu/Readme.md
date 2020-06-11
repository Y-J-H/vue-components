基本用法

```vue
<template>
  <ms-tab-menu
    :value="this.$route.path"
    :path="this.$route.path"
    @change="handleClick"
  >
    <!-- <slot :label="label" :name="name" /> tab切换的内容，需指定各tab标签页的label，name -->
    <span
      v-for="(item, index) in menulist"
      :key="index"
      :label="item.label"
      :name="item.name"
      icon="el-icon-date"
    />
  </ms-tab-menu>
</template>

<script>
/* 适配elementUI的el-tab组件 */
  export default {
    data() {
      return {
        menuList: [
          {
            path: '/user/info',
            title: '个人信息'
          },
          {
            path: '/user/license',
            title: '授权管理'
          }
        ]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab)
      }
    }
  }
</script>

```