基本用法

```vue
<template>
  <moan-el-table
    :table-data="tableData"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    :columns="columns"
    :table-pagination="tablePagination"
    :pagination="pagination">
    <template v-slot:noData>
      <span>暂无数据</span>
    </template>
  </moan-el-table>
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
        risk_id: 1303,
        risk_name: 'Apache Tomcat样例目录session操纵漏洞',
        risk_addr: "http://114.115.184.49:8001/examples/servlets/servlet/SessionExample",
        location: '中国-北京-北京市',
        detect_status: '检测成功',
        insert_tm: '2019-11-15 22:40:14'
      },
      {
        risk_id: 5786,
        risk_name: 'Redis弱口令漏洞',
        risk_addr: "114.115.184.49:3307",
        location: '中国-北京-北京市',
        detect_status: '检测成功',
        insert_tm: '2019-11-08 22:40:00'
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
        name: '风险名称',
        attrs: {
          label: '风险名称',
          showOverflowTooltip: true,
          prop: 'risk_name'
        }
      },
      {
        name: '风险地址',
        attrs: {
          label: '风险地址',
          showOverflowTooltip: true,
          prop: 'risk_addr'
        }
      },
      {
        name: '地理位置',
        attrs: {
          label: '地理位置',
          showOverflowTooltip: true,
          prop: 'location'
        }
      },
      {
        name: '检测状态',
        attrs: {
          label: '检测状态',
          prop: 'detect_status',
          width: '110px',
          showOverflowTooltip: true,
          filterMultiple: false,
          filters: DETECTION_STATUS,
          filterPlacement: 'bottom',
        },
        scopeSlots: {
          default: props => {
            const { detect_status } = props.row
            const currentText = DETECTION_STATUS.find(item => {
              return item.value === detect_status
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
            const { risk_id } = props.row
            /**
             *  在 babel-plugin-transform-vue-jsx 插件低于3.4的版本的时候需要加上下面这句话,不过现在应该使用的是4.0.1
             *  也需要加上,不然在element-ui渲染的时候就会报错,不清楚原因, 在项目中这句话不需要写
             */
            const h = this.$createElement
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => this.showDetail(risk_id)}
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