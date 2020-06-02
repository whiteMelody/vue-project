<template>
  <div class="DeductionList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>划扣列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                  <auto-search-client @changed="myChanged"></auto-search-client>
                </el-form-item>

             <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="id" align="center" label="序号">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="across_store.name" align="center" label="跨店划扣">
              <template slot-scope="scope">
                {{ scope.row.across_store.name }}
              </template>
            </el-table-column>
            <el-table-column prop="customer.name" align="center" label="客户姓名">
              <template slot-scope="scope">
                <el-link 
                    :underline="false" 
                    @click="$router.push({
                      name: 'ClientDel',
                      query:{ 
                        id: scope.row.customer_id, 
                        types:'4'
                        } 
                      })"
                    >{{ scope.row.customer.name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="customer.mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="orders_sum" align="center" label="总数（次）">
              <template slot-scope="scope">
                {{ scope.row.orders_sum }}
              </template>
            </el-table-column>
            <el-table-column prop="sum" align="center" label="未划扣次数（次）">
              <template slot-scope="scope">
                {{ scope.row.sum }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="operation">
                  <a class="buttonStyle_class" @click="pagesToUrl('DeductionDel',scope.row.customer_id)">查看</a>
                  <em></em>
                  <a class="buttonStyle_class" @click="pagesToUrl('DeductionDelList',scope.row.customer_id)">更多操作</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
//自动查询客户组件
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
import autoSearchClientStride from "@/shop/components/autocomplete/autoSearchClientStride";
import { getList } from "@/shop/assets/api/informatization/deduction"
export default {
  name: "DeductionList",
  data() {
    return {
      boxMaxHeight:"",
      counselor:{
      },
      condition: {
        kw: '',
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getList,       // 分页查询api接口
    };
  },
  components: {autoSearchClient, autoSearchClientStride},
  methods: {
    myChanged(data){
      this.condition.kw = data.kw
    },

    loadData() {
      this.$refs.demoTable.loadData();
    },
    pagesToUrl(str,id){
      switch (str) {
        case 'DeductionDel':
          this.$router.push({  
            path: 'DeductionDel',   
            query: { 
              id : id
            }
          })
          break;
        case 'DeductionDelList':
          this.$router.push({  
            path: 'DeductionDelList',   
            query: { 
              id : id
            }
          })
          break;
        default:
          break;
      }
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.DeductionList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>
<style>
.DeductionList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.DeductionList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.DeductionList .operation a{
  cursor: pointer;
}
</style>

    
