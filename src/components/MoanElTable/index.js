export default {
  name: 'MoanElTable',
  props: {
    /**
     *  表格列的配置描述, 列的格式为{ name: '列名称', attrs: '属性' } 其中attrs中包含Table-column中所有的属性
     */
    columns: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    /**
     * 表格分页配置, 包含el-pagination中所有属性, 事件, 用法: { attrs: '属性', on: '事件' }
     */
    tablePagination: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 表格数据
     */
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    /**
     *  分页属性, { currentPage: '当前页', pageSize: '每页条数', total: '总条数' }, 这三个值会覆盖tablePagination中的值
     */
    pagination: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  render() {
    const renderTableColumns = column => {
      const render = column.scopedSlots
      if (render) {
        return (
          <el-table-column
            {...{
              attrs: {
                ...column.attrs
              },
              scopedSlots: {
                default: render.default
              }
            }}
          />
        )
      }
      return (
        <el-table-column
          {...{
            attrs: {
              ...column.attrs
            }
          }}
        />
      )
    }
    // 添加分页的默认项数据
    const defaultPaginationOption = {
      pageSizes: [10, 20, 50, 200],
      layout: 'total, sizes, prev, pager, next, jumper'
    }
    let paginationAttr = this.tablePagination.attrs
    const { currentPage, pageSize, total } = this.pagination
    const isShowPagination = this.tableData.length > 0
    paginationAttr = Object.assign(defaultPaginationOption, paginationAttr, {
      currentPage,
      pageSize,
      total
    })
    return (
      <div class="table_wrap">
        <el-table
          {...{
            attrs: {
              ...this.$attrs,
              data: this.tableData
            },
            on: this.$listeners
          }}
        >
          {this.columns.map(column => renderTableColumns(column))}(
          {/* @slot 暂无数据展示 */}
          <slot name="noData"></slot>)
        </el-table>
        {isShowPagination && (
          <el-pagination
            {...{
              attrs: paginationAttr,
              on: this.tablePagination.on
            }}
          />
        )}
      </div>
    )
  }
}
