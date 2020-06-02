<template>
  <div class="ToCollectMoneyDetailList" :style="'min-height: '+boxMaxHeight+'px;'">

      <div class="clear3"></div>

      <p class="lh20px h20px">
          <span class="fl f16px fc-gray4">收银明细</span>
      </p>

    <div class="box">
      
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
                <el-form-item class="w240px">
                  <el-date-picker
                    class="wb100"
                    v-model="daterangeTimer"
                    :clearable="false"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.adviserId" :placeholder="'选择'+$store.getters.roleName.adviser" readonly="" clearable>
                    <el-option :key="''" :value="''" :label="'全部'+$store.getters.roleName.adviser"></el-option>
                    <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.channelPid" placeholder="选择渠道" readonly clearable>
                        <el-option :key="''" label="全部渠道" :value="''"></el-option>
                        <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                    <el-select v-model="condition.channelId" placeholder="选择下级项目类别" readonly clearable v-if="condition.channelPid" class="mal10">
                        <el-option v-for="item in $store.getters.channelList2Map(condition.channelPid)" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                </el-form-item>
                 <el-form-item>
                  <el-button type="danger" class="h32px" @click="dialogConfirm = true">导出Excel</el-button>
                 </el-form-item>
  
          </el-form>

          <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

            <div class="wb11 fl h40px lh40px bd-gray bd-r1 mat15 f16px">
              收银数据合计
            </div>

            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">应收金额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.payment | _filterNumFormat}}</p>
            </div>
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">余额支付（元）</p>
              <div class="clear2"></div>
              <p class="fc-red f20px h40px lh40px">{{userData.rechargeDebit | _filterNumFormat}}</p>
            </div>
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">券额支付（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.giveDebit | _filterNumFormat}}</p>
            </div>
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">欠款（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.arrearsPrice | _filterNumFormat}}</p>
            </div>
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">还款总额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.huankuan_price | _filterNumFormat}}</p>
            </div>
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">退款总额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.refund_price | _filterNumFormat}}</p>
            </div> 
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">充值总额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.prepaid_price | _filterNumFormat}}</p>
            </div> 
            <div class="wb11 fl">
              <p class="fc-gray3 h20px lh20px">实收金额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.ActualPrice | _filterNumFormat}}</p>
            </div> 

            <div class="clear0"></div>

          </div>
        <div class="clear2"></div>

        <div class="pal20 lh38px h40px pointer">
            <template v-if="showType == 0">
                <span class="fl fc-blue6 f16px bd-blue6 bd-b2">收银明细</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">不计入业绩明细</span>
            </template>
            <template v-else>
                <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">收银明细</span>
                <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                <span class="fl fc-blue6 f16px bd-blue6 bd-b2">不计入业绩明细</span>
            </template>
        </div>


        <div class="clear4"></div>

        <base-list ref="demoTable" :condition="condition"
                  :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border
                  row-key="id"
                  ref="myTable"
                  @row-click="switchExpansion"
                :tree-props="{children: 'rows', hasChildren: 'hasChildren'}"
           >

            <el-table-column prop="type" align="center" label="类型" width="120px">
              <template slot-scope="scope">
<!--                <p v-if="scope.row.rows">-->
<!--                    {{scope.row.type}}-->
<!--                </p>-->
<!--                <p v-else>-->
<!--                    {{scope.row.items_name}}-->
<!--                </p>-->
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

            <el-table-column align="center" label="应收金额">
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

<!--            <el-table-column prop="across_store" align="center" label="消费门店">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store == '' || scope.row.across_store == 0 ?'本店' : scope.row.across_store}}-->
<!--              </template>-->
<!--            </el-table-column>-->


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
import { getReceiptDetailed } from "@/shop/assets/api/informatization/toCollectMoney"
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
        start: "",
        perpage: ''
      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: getReceiptDetailed,       // 分页查询api接口
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
        showType: 0,        // 0 收银明细 | 1 不计入收银明细
        dialogConfirm: false,

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

      switchExpansion(row) {
          if(row.rows){
              if(row.rows.length)
                  this.$refs.myTable.toggleRowExpansion(row)
          }
      },

    //导出Excel
    deriveExcel(exportType) {
      let params = this.$base.copySearchConditions(this.condition);

      let url = ''

      if(window.location.hostname == this.$base.getStoreHost()){
          url = `https://${location.hostname}/post/export/ReceiptDetailedExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }else{
          url = `http://${location.hostname}:${location.port}/post/export/ReceiptDetailedExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
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
      // this.userData = data.totalData;
      this.userData = data.storeCollection;

      this.demoList = data.list;
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

    this.boxMaxHeight = window.innerHeight - 100;
      this.loadData()

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
    margin-top: 20px;
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
.ToCollectMoneyDetailList .el-table tr{
  cursor: pointer;
}
</style>

    
