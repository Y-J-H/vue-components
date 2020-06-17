基本用法

```vue
<template>
  <ms-el-table
    :table-data="tableData"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    :columns="columns"
    :table-pagination="tablePagination"
    :pagination="pagination">
    <template v-slot:empty>
      <span>自定义 暂无数据</span>
    </template>
  </ms-el-table>
</template>

<script>
const DETECTION_STATUS = [
  {
    text: '检测成功',
    value: 'SUCCESS'
  },
  {
    text: '检测失败',
    value: 'FAILED'
  }
]
export default {
  data() {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 2
      }
    }
  },
  created() {
    this.tableData = [
      {
        id: 1,
        name: '名称01',
        addr: "http://1.1.2.3",
        location: '中国-北京-北京市',
        status: '检测成功',
        insert_tm: '2019-09-12 22:20:14'
      },
      {
        id: 2,
        name: '名称02',
        addr: "1.1.1.1",
        location: '中国-浙江省-杭州市',
        status: '检测成功',
        insert_tm: '2019-9-08 2:40:00'
      }
    ]
    this.columns = [
      {
        name: 'select',
        attrs: {
          type: 'selection',
          width: '50px'
        }
      },
      {
        name: '名称',
        attrs: {
          label: '名称',
          showOverflowTooltip: true,
          prop: 'name'
        }
      },
      {
        name: '地址',
        attrs: {
          label: '地址',
          showOverflowTooltip: true,
          prop: 'addr'
        }
      },
      {
        name: '地理位置',
        hidden: true,
        attrs: {
          label: '地理位置',
          showOverflowTooltip: true,
          prop: 'location'
        }
      },
      {
        name: '状态',
        attrs: {
          label: '状态',
          prop: 'status',
          width: '110px',
          showOverflowTooltip: true,
          filterMultiple: false,
          filters: DETECTION_STATUS,
          filterPlacement: 'bottom',
        },
        scopeSlots: {
          default: props => {
            const { status } = props.row
            const currentText = DETECTION_STATUS.find(item => {
              return item.value === status
            })['text']
            return (
              <div>
                <span>{currentText}</span>
              </div>
            )
          }
        }
      },
      {
        name: '发现时间',
        attrs: {
          label: '发现时间',
          prop: 'insert_tm',
          sortable: true,
          showOverflowTooltip: true,
          width: '160px'
        }
      },
      {
        name: '操作',
        attrs: {
          label: '操作',
          width: '190px'
        },
        scopedSlots: {
          default: props => {
            const { id } = props.row
            /**
             *  在 babel-plugin-transform-vue-jsx 插件低于3.4的版本的时候需要加上下面这句话,不过现在应该使用的是4.0.1
             *  也需要加上,不然在element-ui渲染的时候就会报错,不清楚原因, 在项目中这句话不需要写
             */
            const h = this.$createElement
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => this.showDetail(id)}
                >
                  查看详情
                </el-button>
              </div>
            )
          }
        }
      }
    ],
    this.tablePagination = {
      on: {
        'size-change': this.handleSizeChange,
        'current-change': this.handleCurrentPage
      }
    }
  },
  methods: {
    // 查看详情
    showDetail(id) {
      console.log(id)
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleSortChange({column, prop, order}) {
      console.log(column, prop, order)
    },
    handleFilterChange(filters) {
      console.log(filters)
    },
    handleSizeChange(size) {
      console.log(size)
    },
    handleCurrentPage(page) {
      console.log(page)
    }
  }
}
</script>
```
**注意: 暂时没有实现多级表头功能**