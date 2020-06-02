<template>
<!--  即将弃用，请使用 OperationStatement/CashierDetails.vue  -->
<!--  即将弃用，请使用 OperationStatement/CashierDetails.vue  -->
<!--  即将弃用，请使用 OperationStatement/CashierDetails.vue  -->
  <div class="ToCollectMoneyDetailList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
      <a>收银明细</a>
    </header>
    <div class="box">
      
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
    
                <el-form-item class="w240px">
                  <el-date-picker
                    class="wb100"
                    :clearable="false"
                    v-model="daterangeTimer"
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
                  <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
                 </el-form-item>
  
          </el-form>

          <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

            <div class="wb15 fl h40px lh40px bd-gray bd-r1 mat15 f24px">
              收银数据合计
            </div>

            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">应收金额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.receivable_prices | _filterNumFormat}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">存款支付（元）</p>
              <div class="clear2"></div>
              <p class="fc-red f20px h40px lh40px">{{userData.recharge_debit | _filterNumFormat}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">券额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.give_debit | _filterNumFormat}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">欠款（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.arrears_price | _filterNumFormat}}</p>
            </div>
            <div class="wb16 fl">
              <p class="fc-gray3 h20px lh20px">实收金额（元）</p>
              <div class="clear2"></div>
              <p class="fc-blue6 f20px h40px lh40px">{{userData.actual_price | _filterNumFormat}}</p>
            </div>

            <div class="clear0"></div>

          </div>
            <div class="clear4"></div>

          <el-table slot="list" :data="demoList" stripe border
                row-key="id"
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

              <el-table-column prop="code" align="center" label="项目名称">
                  <template slot-scope="scope">
                      <p v-if="!scope.row.rows">
                          {{scope.row.items_name}}
                      </p>
                  </template>
              </el-table-column>

            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                  <p v-if="scope.row.rows">
                      {{scope.row.code}}
                  </p>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" align="center" label="生成时间">
              <template slot-scope="scope">
                {{ scope.row.created_at }}
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

            <el-table-column prop="adviser_name" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser_name }}
              </template>
            </el-table-column>

            <el-table-column prop="ratio" align="center" label="应收金额">

                <template slot-scope="scope">
                    <p v-if="scope.row.rows">
                        {{_filterNumFormat(scope.row.payment)}}
                    </p>
                </template>

            </el-table-column>

              <el-table-column prop="code" align="center" label="项目金额">
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

            <el-table-column prop="recharge_debit" align="center" label="存款支付">
              <template slot-scope="scope">
                {{ scope.row.recharge_debit ? _filterNumFormat(scope.row.recharge_debit) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="give_debit" align="center" label="券额">
              <template slot-scope="scope">
                {{ scope.row.give_debit ? _filterNumFormat(scope.row.give_debit) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="arrears_price" align="center" label="欠款">
              <template slot-scope="scope">
                {{ scope.row.arrears_price ? _filterNumFormat(scope.row.arrears_price) : '' }}
              </template>
            </el-table-column>

            <el-table-column prop="actual_price" align="center" label="实收金额">
              <template slot-scope="scope">
                {{ scope.row.actual_price ? _filterNumFormat(scope.row.actual_price) : '' }}
              </template>
            </el-table-column>

<!--            <el-table-column prop="across_store" align="center" label="消费门店">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store == '' || scope.row.across_store == 0 ?'本店' : scope.row.across_store}}-->
<!--              </template>-->
<!--            </el-table-column>-->


          </el-table>
    </div>
  </div>
</template>
<script>
    /**
     * 即将弃用，请使用 OperationStatement/CashierDetails.vue
     * 即将弃用，请使用 OperationStatement/CashierDetails.vue
     * 即将弃用，请使用 OperationStatement/CashierDetails.vue
     */
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
      }, // 查询条件
      demoList: [],                      // table数组
      pageSearch: getReceiptDetailed,       // 分页查询api接口
      daterangeTimer:[ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime]
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
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let url = `http://${location.hostname}/post/export/ReceiptDetailedExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      if (params.adviserId) {
        url += `&adviserId=${params.adviserId}`
      }
      if (params.channelPid) {
        url += `&channelPid=${params.channelPid}`
      }
      if (params.channelId) {
        url += `&channelId=${params.channelId}`
      }
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
      getReceiptDetailed(this.condition).then(res=>{
          if(res.status == 0){
              this.userData = res.data.totalData

              let _tmp = res.data.list


              this.demoList = _tmp

          }
      }).catch(error=>{
        console.log("getReceiptDetailed no");
      })
    },
    //列表外赋值
    getLoaded(data){
      this.userData = data.totalData
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
    // 即将弃用，请使用 OperationStatement/CashierDetails.vue
    // 即将弃用，请使用 OperationStatement/CashierDetails.vue
    // 即将弃用，请使用 OperationStatement/CashierDetails.vue

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
</style>

    
