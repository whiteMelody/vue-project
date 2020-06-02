<template>
  <div class="ClientDebtList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header><span>{{userData.name}}</span>欠款列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
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
                  <el-select v-model="condition.sort" placeholder="请选择金额排序" readonly="" clearable>
                    <el-option v-for="[key, val] in _dictMoneySortType" :key="key" :label="val"
                        :value="key"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                 </el-form-item>
                 <!-- <el-form-item>
                  <el-button type="danger" class="h32px">导出Excel</el-button>
                 </el-form-item> -->
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="customer_name" align="center" label="客户姓名">
              <template slot-scope="scope">
                {{ scope.row.customer_name }}
              </template>
            </el-table-column>

            <el-table-column prop="customer_mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer_mobile }}
              </template>
            </el-table-column>

            <el-table-column prop="type" align="center" label="欠款类型">
              <template slot-scope="scope">
                {{ scope.row.type }}
              </template>
            </el-table-column>
            
            <el-table-column prop="orders_code" align="center" label="订单号">
              <template slot-scope="scope">
                {{ scope.row.orders_code }}
              </template>
            </el-table-column>
            
            <el-table-column prop="price" align="center" label="欠款金额（元）">
              <template slot-scope="scope">
                {{ scope.row.price | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <el-table-column prop="repay_price" align="center" label="还款金额（元）">
              <template slot-scope="scope">
                {{ scope.row.repay_price | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <el-table-column prop="owe_price" align="center" label="未结清（元）">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="zhifu" v-if="scope.row.owe_price == 0">{{scope.row.owe_price | _filterNumFormat}}</span>
                    <span class="weizhifu" v-else>{{scope.row.owe_price | _filterNumFormat}}</span>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="created_at" align="center" label="欠款时间">
              <template slot-scope="scope">
                {{ scope.row.created_at }}
              </template>
            </el-table-column>
            
            <el-table-column prop="describe" align="center" label="欠款说明">
              <template slot-scope="scope">
                {{ scope.row.describe }}
              </template>
            </el-table-column>

            <el-table-column prop="huankuan_time" align="center" label="还款时间">
              <template slot-scope="scope">
                {{ scope.row.huankuan_time }}
              </template>
            </el-table-column>
            
            <el-table-column prop="adviser_name" align="center" :label="'所属' + $store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser_name }}
              </template>
            </el-table-column>
            
            <el-table-column prop="member_name" align="center" label="操作人">
              <template slot-scope="scope">
                {{ scope.row.member_name }}
              </template>
            </el-table-column>
            
            <el-table-column prop="across_store" align="center" label="消费门店">
              <template slot-scope="scope">

                <span v-if="scope.row.across_store == ''">本店</span>
                <span>{{ scope.row.across_store }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="gaipai" v-if="scope.row.price == 0">
                  <span>打印</span>
                </p>
                <p class="gaipai" v-else>
                  <span @click="dialogRepayment = true;repayPriceTow = repayPrice = scope.row.owe_price;arrearsId = scope.row.id">还款</span>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>

    <!--    还款    -->
    <el-dialog title="确定还款" :visible.sync="dialogRepayment" width="400px">
        <div class="wb100 f16px lh40px tex-center">
            <p class="fc-gray3 f16px">还款金额</p>
            <p class="fc-gray4 f24px"> 
              <el-input
                placeholder="请输入内容"
                v-model="repayPrice"
                clearable>
              </el-input> 
              <!-- {{Math.abs(repayPrice) | _filterNumFormat}} -->
            </p>
        </div>

        <div class="clear"></div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogRepayment = false">取 消</el-button>
            <template v-if="disabled">
              <el-button type="primary" disabled>保存中...</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="repayment">确 定</el-button>
            </template>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getArrearsList } from "@/shop/assets/api/client/client"
import { postArrearsRepayment } from  "@/shop/assets/api/flow/order"
export default {
  name: "ClientDebtList",
  data() {
    return {
      boxMaxHeight:"",
      userData:"",
      dialogRepayment:false,
      disabled:false,
      repayPrice:'',
      repayPriceTow:'',
      arrearsId:'',
      counselor:{
          counselor:"",
      },
      condition: {
        customerId: this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getArrearsList,       // 分页查询api接口
      daterangeTimer:[]
    };
  },
  watch: {
    daterangeTimer(c, o) {
      this.condition.startTime = this.$base.dateTimeToDate(c[0],'date2');
      this.condition.endTime = this.$base.dateTimeToDate(c[1],'date2');
    },
    repayPrice(newData, oldData) {
      if(newData > this.repayPriceTow){
        this.repayPrice = this.repayPriceTow
        this.$message({
            showClose: true,
            message: '还款金额不能大于欠款金额',
            type: 'warning',
        });
      }
    }
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data){
      this.userData = data.customer
    },
    repayment() {
      this.disabled = true
      postArrearsRepayment({
          price: Math.abs(this.repayPrice),
          arrearsId: this.arrearsId,
      }).then(res=>{
          if(res.status == 0){
              this.$message({
                  showClose: true,
                  message: '还款成功',
                  type: 'success',
                  onClose:()=>{
                    this.loadData()
                    this.disabled = false
                    this.dialogRepayment = false
                  }
              });
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            });
            this.disabled = false
              this.dialogRepayment = false
          }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
        this.disabled = false
          this.dialogRepayment = false
      })
    }
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
.ClientDebtList {
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
    span{
      font-size: 16px;
      color: #FF5722;
      padding-right: .1rem;
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
.ClientDebtList .gaipai{
  display: flex;
  align-items: center;
  justify-content: center;
}
.ClientDebtList .gaipai span{
  cursor: pointer;
}
.ClientDebtList .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.ClientDebtList .list_status .zhifu{
    background: #9FDB9D;
}
.ClientDebtList .list_status .weizhifu{
    background: #FEB78C;
}
</style>


    
