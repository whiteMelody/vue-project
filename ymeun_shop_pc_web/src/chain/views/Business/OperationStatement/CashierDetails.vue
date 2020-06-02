<template>
  <div class="ToCollectMoneyDetailList" :style="'min-height: '+boxMaxHeight+'px;'">

      <!-- <p class="lh50px h50px bd-gray6 bd-b1 mab20">
          <span class="fl f16px fc-gray4">收银明细</span>
      </p> -->
      <p class="lh40px h40px">
        <span class="fl f14px fc-gray4">收银明细</span>
      </p>

      <div class="clear-f2"></div>
      <div class="clear3"></div>

    <div class="box">

           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
                <el-form-item>
                  <!-- <el-date-picker
                    class="wb100"
                    v-model="daterangeTimer"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker> -->
                  <div class="hs_timer">
                    <div class="text">收银时间</div>
                    <em></em>
                    <div class="input">
                      <el-date-picker
                        class="w340px"
                        v-model="daterangeTimer"
                        :clearable="false"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </div>
                </el-form-item>

               <el-form-item label>
                   <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                       <el-option :key="''" label="全部门店" :value="''"></el-option>
                       <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                  :value="item.id"></el-option>
                   </el-select>
               </el-form-item>
              <el-form-item  label="">
                  <el-select v-model="condition.channelPid" placeholder="选择渠道" readonly clearable @change="changeChannel" :disabled="!condition.storeId">
                      <el-option :key="''" label="全部渠道" :value="''"></el-option>
                      <el-option v-for="item in channelList" :key="item.id" :label="item.name"
                                 :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="condition.channelId" placeholder="选择下级渠道类别" readonly clearable v-if="condition.channelPid" :disabled="!condition.storeId">
                      <el-option v-for="item in channelList2" :key="item.id" :label="item.name"
                                 :value="item.id"></el-option>
                  </el-select>
              </el-form-item>

               <!--  选择员工 -->
              <el-form-item label="">
                  <el-select v-model="condition.adviserId" :placeholder="`选择${$store.getters.roleName.adviser}`" readonly="" clearable :disabled="!condition.storeId">
                      <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.adviser}`"></el-option>
                      <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                 :value="item.users_id"></el-option>
                  </el-select>
              </el-form-item>

                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>
                 <el-form-item>
                  <el-button type="primary" class="h32px" @click="dialogConfirm = true">导出Excel</el-button>
                 </el-form-item> 
          </el-form>

        <div class="clear0"></div>

        <div class="pal20 par20 pat20 bg-white4">
            <div class="w150px fl text-center bd-gray bd-r1 fc-gray4 mar50" :class="isTwoRows ? 'h100px lh100px' : 'h40px lh40px'">
                收银数据合计
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">应收金额（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.payment | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">余额支付（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.rechargeDebit | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">券额支付（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.giveDebit | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">欠款（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.arrearsPrice | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">还款总额（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.huankuan_price | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">退款总额（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.refund_price | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">充值总额（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.prepaid_price | _filterNumFormat}}</p>
            </div>
            <div class="w150px fl h40px lh15px mar20 mab20">
                <p class="fc-gray2">实收金额（元）</p>
                <p class="Fb fc-gray4 f20px mat10">{{userData.ActualPrice | _filterNumFormat}}</p>
            </div>
            <div class="clear0"></div>
        </div>

        <div class="pal20 lh38px h40px pointer">
            <template v-if="showType == 0">
                <span class="fl fc-green2 f16px">收银明细</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">不计入业绩明细</span>
            </template>
            <template v-else>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">收银明细</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-green2 f16px">不计入业绩明细</span>
            </template>
        </div>


        <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border
                row-key="id"
                :tree-props="{children: 'rows', hasChildren: 'hasChildren'}"
                    ref="myTable"
                    @row-click="switchExpansion"
           >

            <el-table-column prop="type" align="left" label="类型" width="120px">
              <template slot-scope="scope">
                  {{scope.row.type}}
              </template>
            </el-table-column>

              <el-table-column prop="code" align="center" label="品项名称">
                  <template slot-scope="scope">
                      <p v-if="!scope.row.rows">
                          {{scope.row.items_name}}
                      </p>
                  </template>
              </el-table-column>

            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                  {{scope.row.code}}
              </template>
            </el-table-column>

            <el-table-column prop="created_at" align="center" label="生成时间">
              <template slot-scope="scope">
                {{ scope.row.created_at | _endTimeFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="channel_name" align="center" label="渠道">
              <template slot-scope="scope">
                {{ scope.row.channel_name }}
              </template>
            </el-table-column>

            <el-table-column prop="customer_name" align="center" label="客户姓名">
         
              <template slot-scope="scope">
                <el-link 
                    :underline="false" 
                    @click="$router.push({
                      name: 'ClientDel',
                      query:{ 
                        id: scope.row.customer_id, 
                        types:'3'
                        } 
                      })"
                    >{{ scope.row.customer_name }}
                </el-link>
              </template>
            </el-table-column>

            <el-table-column prop="customer_tel" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer_tel }}
              </template>
            </el-table-column>

            <el-table-column prop="adviser_name" align="center" label="开单人">
              <template slot-scope="scope">
                {{ scope.row.adviser_name }}
              </template>
            </el-table-column>

            <el-table-column align="left" label="应收金额">
                <template slot-scope="scope">
                    <p v-if="scope.row.rows">
                        {{_filterNumFormat(scope.row.payment)}}
                    </p>
                </template>
            </el-table-column>

              <el-table-column prop="code" align="center" label="现金">
                  <template slot-scope="scope">
                      <p v-if="!scope.row.rows">
                          {{_filterNumFormat(scope.row.payment)}}
                      </p>
                  </template>
              </el-table-column>

              <el-table-column prop="code" align="center" label="支付方式">
                  <template slot-scope="scope">
                      <p v-if="scope.row.rows">
                          {{scope.row.pay_method}}
                      </p>
                  </template>
              </el-table-column>

            <el-table-column prop="recharge_debit" align="center" label="订单余额支付">
              <template slot-scope="scope">
                {{ scope.row.recharge_debit ? _filterNumFormat(scope.row.recharge_debit) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="give_debit" align="center" label="订单券额支付">
              <template slot-scope="scope">
                {{ scope.row.give_debit ? _filterNumFormat(scope.row.give_debit) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="items_balance" align="center" label="品项余额支付">
              <template slot-scope="scope">
                {{ scope.row.items_balance ? _filterNumFormat(scope.row.items_balance) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="items_give_balance" align="center" label="品项券额支付">
              <template slot-scope="scope">
                {{ scope.row.items_give_balance ? _filterNumFormat(scope.row.items_give_balance) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="arrears_price" align="center" label="欠款">
              <template slot-scope="scope">
                {{ scope.row.arrears_price ? _filterNumFormat(scope.row.arrears_price) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="actual_price" align="center" label="实收金额">
              <template slot-scope="scope">
                  <p v-if="!scope.row.rows">
                      {{ scope.row.actual_price ? _filterNumFormat(scope.row.actual_price) : '' }}
                  </p>
                  <p v-else>
                      {{ scope.row.actual_price ? _filterNumFormat(scope.row.actual_price) : 0 }}
                  </p>
              </template>
            </el-table-column>

          </el-table>

        </base-list>

        <el-dialog title="选择导出类型" :visible.sync="dialogConfirm" width="300px">
        <el-button @click="deriveExcel(1)">订单明细导出</el-button>
        <el-button type="primary" @click="deriveExcel(2)">品项明细导出</el-button>
    </el-dialog>

    </div>
  </div>
</template>
<script>
import { getCashierDetails } from "@/chain/assets/api/manage/statistics"

import {  getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"
import {  getStoreMembers  } from "@/chain/assets/api/common/common"


export default {
  name: "ToCollectMoneyDetailList",
  data() {
    return {
      boxMaxHeight:"",
      userData:"",
      condition: {
        channelPid: '',
        channelId: '',
        startTime: this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime,
          mark: 0,          // 0 收银明细 | 1 不计入收银明细
          adviserId: '',
      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: getCashierDetails,       // 分页查询api接口
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        showType: 0,        // 0 收银明细 | 1 不计入收银明细
        dialogConfirm: false,
        channelList: [],
        channelList2: [],
        staffList: [],
        storeList:[],
        isTwoRows: false,
    };
  },

  watch: {
    'daterangeTimer'(newData,oldData){
      this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
      this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
    },
  },
  components: {},
  methods: {

    //导出Excel
    deriveExcel(exportType) {
        this.$postRequest("/post/api/getUserInfo").then(res => {
          let params = this.$base.copySearchConditions(this.condition);
          let url = ''
            if(window.location.hostname == this.$base.getChainHost()){
                url = `https://${location.hostname}/post/export/cashier/getCashierDetailsExcel?downloadUserId=${res.data.users_id}`;
            }else{
                url = `http://${location.hostname}:${location.port}/post/export/cashier/getCashierDetailsExcel?downloadUserId=${res.data.users_id}`;
            }
          if (params.adviserId) {
            url += `&adviserId=${params.adviserId}`
          }
          if (params.channelPid) {
            url += `&channelPid=${params.channelPid}`
          }
          if (params.channelId) {
            url += `&channelId=${params.channelId}`
          }
          if (params.storeId) {
            url += `&storeId=${params.storeId}`
          }

            /**
             * 2019年8月27日18:29:45
             * 导出Excel
             * 新增字段excel  1 订单明细导出 | 2 项目明细导出
             */
                url += `&excel=` + exportType

            /**
             * 2019年9月2日16:32:29
             * 导出Excel
             * 新增字段mark  0 导出收银明细 | 1 导出不计入业绩收银明细
             */
            url += `&mark=` + this.condition.mark

          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }

          let startTime = year + "-" + month + "-01 00:00:00";
          let endTime = year + "-" + month + "-" + strDate + ' 23:59:59';
          if (params.startTime) {
            url += `&startTime=${params.startTime}`;
          } else {
            url += `&startTime=${startTime}`;
          }

          if (params.endTime) {
            url += `&endTime=${params.endTime}`;
          } else {
            url += `&endTime=${endTime}`;
          }
          window.location.href = url;
        });
    },

      switchExpansion(row) {
          if(row.child){
              if(row.child.length)
                  this.$refs.myTable.toggleRowExpansion(row)
          }
      },

      /**
       * 切换门店
       */
      changeStore(){
          this.condition.channelPid = ''
          this.condition.channelId = ''
          this.condition.adviserId = ''
          if(!this.condition.storeId){
              return
          }

          getListChannel({ channelParentId: 0, storeId: this.condition.storeId }).then(res => {
              if(res.status == 0){
                  let _tmp = res.data.list
                  this.channelList = _tmp
              }else{
                  this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error',
                  });
              }
          }).catch(error=>{
              this.$message({
                  showClose: true,
                  message: error,
                  type: 'error',
              });
          })

          getStoreMembers({ storeId: this.condition.storeId, s_id: this.condition.storeId }).then(res =>{
              if(res.status == 0){
                  let _tmp = res.data
                  this.staffList = _tmp.filter(item => item.role_id === 3 )
              }
          })
      },


      changeChannel(){
          getListChannel({ channelParentId: this.condition.channelPid, storeId: this.condition.storeId, }).then(res => {
              if(res.status == 0){

                  let _tmp = res.data.list

                  this.channelList2 = _tmp

              }else{
                  this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error',
                  });
              }
          }).catch(error=>{
              this.$message({
                  showClose: true,
                  message: error,
                  type: 'error',
              });
          })
      },

      _filterNumFormat: (number, decimals, dec_point, thousands_sep) =>{
          decimals = 2;
          number = (number + '').replace(/[^0-9+-Ee.]/g, '');
          var n = !isFinite(+number) ? 0 : +number,
              prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
              sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
              dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
              s = '',
              toFixedFix = function(n, prec) {
                  var k = Math.pow(10, prec);
                  return '' + Math.ceil(n * k) / k;
              };

          s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

          var re = /(-?\d+)(\d{3})/;
          while(re.test(s[0])) {
              s[0] = s[0].replace(re, "$1" + sep + "$2");
          }

          if((s[1] || '').length < prec) {
              s[1] = s[1] || '';
              s[1] += new Array(prec - s[1].length + 1).join('0');
          }

          return s.join(dec);
      },
    //重新加载
    loadData() {

        this.$refs.demoTable.loadData()

    },
    //列表外赋值
    getLoaded(data){
      this.userData = data.storeCollection
    },

      changeShowType(type){
        this.showType = type
          this.condition.mark = type
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

    this.boxMaxHeight = window.innerHeight - 100;
      this.loadData()

      if((window.innerWidth - 286 - 170 * 9)< 0){
          this.isTwoRows = true
      }

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
.ToCollectMoneyDetailList {
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
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>


<style>
.ToCollectMoneyDetailList .gaipai span{
  cursor: pointer;
}
.ToCollectMoneyDetailList .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.ToCollectMoneyDetailList .list_status .zhifu{
    background: #9FDB9D;
}
.ToCollectMoneyDetailList .list_status .weizhifu{
    background: #FEB78C;
}
.ToCollectMoneyDetailList .list_status .quxiao{
    background: #D2D2D2;
}
</style>

    
