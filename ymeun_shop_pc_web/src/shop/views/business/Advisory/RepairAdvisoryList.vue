<template>
  <div class="RepairAdvisoryList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>补录咨询</header>
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

            <el-table-column prop="index" align="center" label="序号" width="50px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="appointment_time" align="center" label="预约日期">
              <template slot-scope="scope">
                {{ scope.row.appointment_time | _endTimeFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="customer.name" align="center" label="客户姓名">
              <template slot-scope="scope">
                {{ scope.row.customer.name }}
              </template>
            </el-table-column>
            <el-table-column prop="customer.mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="customer.sex" align="center" label="性别">
              <template slot-scope="scope">
                {{ scope.row.customer.sex == 0 ? '女' : '男' }}
              </template>
            </el-table-column>
            <el-table-column prop="adviser_name" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser_name }}
              </template>
            </el-table-column>
            <el-table-column prop="items_name" align="center" label="项目">
              <template slot-scope="scope">
                {{ scope.row.items_name }}
              </template>
            </el-table-column>
            <el-table-column prop="across_store" align="center" label="跨店消费">
              <template slot-scope="scope">
                {{ scope.row.across_store }}
              </template>
            </el-table-column>
            <el-table-column prop="content" align="center" label="备注" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                {{ scope.row.content }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p v-if="scope.row" class="operation" @click="pagesToUrl('FillInAdvisory',scope.$index)">填写咨询</p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
import { getZixunSupplementList } from "@/shop/assets/api/informatization/advisory"
export default {
  name: "RepairAdvisoryList",
  data() {
    return {
      boxMaxHeight:"",
      counselor:{
          counselor:"",
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getZixunSupplementList,       // 分页查询api接口
    };
  },
  components: {autoSearchClient},
  methods: {
    myChanged(data){
      this.condition.keyword = data.kw
    },
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.notConsultationCount = data.notConsultationCount;
      this.totalCount = data.totalCount;
    },
    //跳转页面
    pagesToUrl(str,index){
      switch (str) {
        case 'FillInAdvisory':
          this.$router.push({  
            path: 'FillInAdvisory',   
            query: { 
              customerId : this.demoList[index].customer_id,
              adviserId : this.demoList[index].adviser_id,
              appointmentId : this.demoList[index].id,
              mark:1
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
.RepairAdvisoryList {
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
.RepairAdvisoryList .operation{
    cursor: pointer;
}
</style>


    
