<template>
  <div class="Marketing" :style="'min-height: '+boxMaxHeight+'px;'">

      <div class="clear3"></div>

      <p class="lh20px h20px">
          <span class="fl f16px fc-gray4">营销中心报表</span>
      </p>

    <div class="box">

           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                   <date-slot :dateTime.sync="dateTime"></date-slot>
                </el-form-item>

                 <!--  选择员工 -->
                <el-form-item label="">
                    <el-select v-model="condition.usersId" placeholder="选择员工" readonly="" clearable>
                        <el-option :key="''" :value="''" label="全部员工"></el-option>
                        <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                  :value="item.users_id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label>
                    <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable>
                        <el-option :key="''" label="全部门店" :value="''"></el-option>
                        <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
       
                <el-form-item label>
                    <el-input placeholder="请输入客户姓名或电话" v-model="condition.keyword" clearable></el-input>
                </el-form-item>
              

                <el-form-item>
                  <el-button type="primary" class="h32px" @click="loadData">搜索</el-button>
                </el-form-item>
                 <el-form-item>
                  <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
                 </el-form-item> 
          </el-form>

          <div class="pa20 bg-pink2 text-center f16px">

            <div class="wb20 fl h40px lh40px bd-red3 bd-r1 mat15 f16px">
              营销中心合计
            </div>

            <div class="wb18 fl">
              <p class="fc-gray2 h20px lh20px">客户总人数(人)</p>
              <div class="clear2"></div>
              <p class="fc-gray3 f20px h40px lh40px">{{info.quantity}}</p>
            </div>
            <div class="wb18 fl">
              <p class="fc-gray2 h20px lh20px">消费总金额(元)</p>
              <div class="clear2"></div>
              <p class="fc-gray3 f20px h40px lh40px">{{info.amount | _filterNumFormat}}</p>
            </div>

            <div class="clear0"></div>

          </div>
        <div class="clear2"></div>

        <div class="pal20 lh38px h40px pointer">
            <template v-if="showType == 0">
                <span class="fl fc-green2 f16px bd-green2 bd-b2">员工报表</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">客户报表</span>
            </template>
            <template v-else>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">员工报表</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-green2 f16px bd-green2 bd-b2">客户报表</span>
            </template>
        </div>


        <div class="clear4"></div>


        <div v-show="showType == 0">
          <base-list ref="staffTable" :condition="condition"
                    :datas.sync="staffTableList" :pageSearch="staffPageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

            <el-table slot="list" :data="staffTableList" stripe border
              row-key="sn"
              :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
              ref="myTable"
              @row-click="switchExpansion"
            >
              <el-table-column prop="type" align="center" label="员工姓名">
                <template slot-scope="scope">
                    <template v-if="scope.row.list">
                      {{scope.row.member.name}}
                    </template>
                </template>
              </el-table-column>

              <el-table-column prop="type" align="center" label="门店名称">
                <template slot-scope="scope">
                    <template v-if="!scope.row.list">
                      {{scope.row.store.name}}
                    </template>
                </template>
              </el-table-column>

              <el-table-column prop="type" align="center" label="开发客户人数(人)">
                <template slot-scope="scope">
                    {{scope.row.quantity}}
                </template>
              </el-table-column>

              <el-table-column prop="type" align="center" label="客户消费总金额(元)">
                <template slot-scope="scope">
                    {{scope.row.amount | _filterNumFormat}}
                </template>
              </el-table-column>

    
       

            </el-table>

          </base-list>
        </div>

        <div v-show="showType == 1">
          <base-list ref="clientTable" :condition="condition"
                    :datas.sync="clientList" :pageSearch="clientPageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

            <el-table slot="list" :data="clientList" stripe border>

              <el-table-column prop="customer" align="center" label="客户姓名">
                <template slot-scope="scope">
                    {{scope.row.customer.name}}
                </template>
              </el-table-column>

              <el-table-column prop="store" align="center" label="所属门店" >
                <template slot-scope="scope">
                    {{scope.row.store.name}}
                </template>
              </el-table-column>

              <el-table-column prop="member" align="center" label="开发人员" >
                <template slot-scope="scope">
                    {{scope.row.member.name}}
                </template>
              </el-table-column>

              <el-table-column prop="store_date" align="center" label="最近上门时间" >
                <template slot-scope="scope">
                    {{scope.row.store_date}}
                </template>
              </el-table-column>

              <el-table-column prop="first_amount" align="center" label="首次消费金额(元)" >
                <template slot-scope="scope">
                    {{scope.row.first_amount | _filterNumFormat}}
                </template>
              </el-table-column>

              <el-table-column prop="amount" align="center" label="客户消费总金额(元)" >
                <template slot-scope="scope">
                    {{scope.row.amount | _filterNumFormat}}
                </template>
              </el-table-column>

              

            </el-table>

          </base-list>
        </div>

       

    </div>
  </div>
</template>
<script>
import { getMember , getCustomer } from "@/assets/api/operationStatement/operationStatement"

import dateSlot from '@/components/date/dateSlot'

export default {
  name: "Marketing",
  data() {
    return {
      boxMaxHeight:"",
      info:"",
      condition: {
        startTime: this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
        usersId:'',
        storeId:'',
        keyword:''
      }, // 查询条件
      staffTableList: [],                      // table数组
      staffPageSearch: getMember,       // 分页查询api接口
      dateTime:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
      clientList: [],                      // table数组
      clientPageSearch: getCustomer,       // 分页查询api接口
      showType: 0,        // 0 员工报表 | 1 客户报表
      staffList: [],
      storeList:[],
    };
  },
  watch: {
    dateTime(c, o){
      this.condition.startTime = c[0]
      this.condition.endTime = c[1]
    },
  },
  components: { dateSlot },
  methods: {

    //导出Excel
    deriveExcel() {
        this.$postRequest("/post/api/getUserInfo").then(res => {
            let params = this.$base.copySearchConditions(this.condition);
            let url = ''
            if(this.showType == 0){

              if(window.location.hostname == this.$base.getChainHost()){
                  url = `https://${location.hostname}/post/export/market/getMemberExport`;
              }else{
                  url = `http://${location.hostname}:${location.port}/post/export/market/getMemberExport`;
              }
            }
            else{
              if(window.location.hostname == this.$base.getChainHost()){
                  url = `https://${location.hostname}/post/export/market/getCustomerExport`;
              }else{
                  url = `http://${location.hostname}:${location.port}/post/export/market/getCustomerExport`;
              }
            }
            url += `?downloadUserId=${res.data.users_id}`;
            if (params.storeId) {
              url += `&storeId=${params.storeId}`
            }
            if (params.usersId) {
              url += `&usersId=${params.usersId}`
            }
            if (params.keyword) {
              url += `&keyword=${params.keyword}`
            }
            
            url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
            window.location.href = url;
        });
    },

  
    switchExpansion(row) {
      if(row.list){
          if(row.list.length)
              this.$refs.myTable.toggleRowExpansion(row)
      }
    },

    
    //重新加载
    loadData() {
      if(this.showType == 0){
        this.$refs.staffTable.loadData()
      }
      else{
        this.$refs.clientTable.loadData()
      }

    },
    //列表外赋值
    getLoaded(data){
      this.info = data.analysis
    },

    changeShowType(type){
      this.showType = type
      this.loadData()
    },

  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    //获取门店列表
    this.$postRequest("/post/api/store/getStore").then(res => {
        if(res.status == 0){
        let _tmp = res.data
        for(let i=0; i<_tmp.length; i++){
            _tmp[i].isSelected = false
        }
        this.storeList = _tmp
        }
    })

    //获取员工列表
    this.$postRequest("/post/api/members/membersListByChain").then(res => {
        if(res.status == 0){
          this.staffList = res.data
        }
    })

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
.Marketing {
  // margin: 24px 20px;
  background-color: #ffffff;
  // padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    a{
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
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
.Marketing table{
  margin: 0;
  font-size: 16px;
}
.Marketing .el-table--border tr th{
  padding: 8px 0;
}
.Marketing .el-table__body-wrapper{
  margin-top:0;
}
.Marketing .gaipai span{
  cursor: pointer;
}
.Marketing .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.Marketing .list_status .zhifu{
    background: #9FDB9D;
}
.Marketing .list_status .weizhifu{
    background: #FEB78C;
}
.Marketing .list_status .quxiao{
    background: #D2D2D2;
}
</style>

    
