<template>
  <section class="base-list custom-input">
    <el-row class="search">
      <slot name="search"></slot>
      <div class="border-line"></div>
    </el-row>

    <el-row class="operbar" v-if="isShowOper">
      <slot name="operbar"></slot>
    </el-row>
    <el-row>
      <slot name="status"></slot>
    </el-row>
    <el-row class="content" v-loading="listLoading" :element-loading-text="loadText">
      <slot name="list"></slot>
    </el-row>

    <el-row class="bottom" type="flex" v-show="isPaging && total > pageInfo.size">
      <div class="oper">
        <slot name="oper"></slot>
      </div>
      <el-pagination class="page" @size-change="size=>pageInfo.size=size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :current-page.sync="pageInfo.pageStart" :page-sizes="pageInfo.pageArr"
                     :page-size="pageInfo.size" :total="total">
      </el-pagination>
    </el-row>

    <el-row type="flex" justify="center" v-if="isShowClose">
      <el-button type="primary" @click="handleClose">返 回</el-button>
    </el-row>
  </section>
</template>

<script>

  export default {
    name: 'base-list',
    props: {
      // 分页条件
      condition: {
        type: Object,
        default: () => {
        }
      },
      // 分页方法
      pageSearch: {
        type: Function,
        require: true
      },
      // 列表数据集
      datas: {
        type: Array,
        require: true
      },
      // 列表加载文本
      loadText: {
        type: String,
        default: () => '列表加载中...'
      },
      // 是否分页
      isPaging: {
        type: Boolean,
        default: () => true
      },
      // 分页控制
      configPage: {
        type: Object,
        default: function () {
          return this.$defalutPage()
        }
      },
      isShowClose: {
        type: Boolean,
        default: () => false
      },
      isAutoLoad: {
        type: Boolean,
        default: () => true
      }
    },
    computed: {
      isShowOper: function () {
        return Boolean(this.$slots.operbar)
      }
    },
    components: {},
    data() {
      return {
        listLoading: false, // 列表加载状态
        commonVisible: false,
        total: 0,
        pageInfo: this.configPage
      }
    },
    mounted() {
      window.addEventListener('storage', (val) => {
        let key = val.key
        let msg = JSON.parse(val.newValue)
        if (key === 'message' && msg === 'loadData') {
          this.loadData()
        }
      })
    },
    methods: {
      loadData() {

        // console.log(this.condition)

        return new Promise((resolve, reject) => {

          let params = this.copySearchConditions(this.condition) // 获取搜索条件不为空的拷贝
          /** 拼接分页条件 */
          params.start = this.pageInfo.pageStart >= 1 ? this.pageInfo.pageStart : 1
          params.perpage = this.isPaging ? this.pageInfo.size : 99999999 // 判断是否对列表分页

          if(this.condition.perpage)
            params.perpage = this.condition.perpage

          this.listLoading = true // 设置为加载状态
          this.pageSearch(params).then(reponse => {
            if(reponse.code === 500){
              this.$message({message: reponse.msg, type: 'error'})
            }

            let pageData = reponse.data ? reponse.data : [];


            if(pageData.total)  this.total = pageData.total
            if(pageData.totalCount)  this.total = pageData.totalCount

            if(pageData.list)  pageData = pageData.list
            if(pageData.data)  pageData = pageData.data

            if (!pageData) {
              pageData = []
            }

            this.$emit('update:datas', pageData)

            this.$emit("listLoaded",reponse.data)

            this.listLoading = false // 取消加载状态
            resolve(pageData)
          }).catch(() => {
            this.listLoading = false // 取消加载状态
            reject()
          })
        })
      },
      handleClose() {
        window.close()
      },

      /**
       * 清空空字符条件
       * @param {*} conditions
       */
      copySearchConditions(conditions) {
        let search = Object.assign({}, conditions)
        for (let key in search) {
          if (search[key] === undefined) {
            delete search[key]
          }
          if (String(search[key]).length === 0 || (typeof search[key] === 'number' && search[key] < 0)) {
            delete search[key]
          }
        }
        return search
      }

    },
    watch: {
      pageInfo: {
        deep: true,
        handler: function () {
          if(this.isAutoLoad){
            this.loadData()
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .base-list {
    width: 100%;
    
    .search {
      /*padding-top: 10px;*/
      margin-bottom: 0px;

      .border-line {
        /*margin-top: 20px;*/
        /*border-bottom: 1px dashed #ddd;*/
      }
    }

    .bottom {
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      align-items: center;
    }

    .operbar {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }

    .content {
      padding: 0;
      margin-bottom: 10px;
    }

    &.alone-row {
      .border-line {
        margin-top: 20px;
      }
    }
  }
</style>
<style>
.el-table {
  font-size: 14px !important;
}
</style>