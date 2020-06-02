<template>
  <div class="DebtList">
    <header>客户欠款</header>
    <div class="box">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
      >
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          <el-form-item>
            <auto-search-client @changed="myChanged"></auto-search-client>
          </el-form-item>
          <el-form-item class="w240px">
            <el-date-picker
              class="wb100"
              v-model="daterangeTimer"
              :clearable="false"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="condition.sort" placeholder="选择类型" readonly clearable>
              <el-option
                v-for="[key, val] in _dictMoneySortType"
                :key="key"
                :label="val"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
          </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="customer_name" align="center" label="客户姓名">
            <template slot-scope="scope">
              <el-link 
                  :underline="false" 
                  @click="$router.push({
                    name: 'ClientDel',
                    query:{ 
                      id: scope.row.customer_id, 
                      } 
                    })"
                  >{{ scope.row.customer_name }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column prop="customer_mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.customer_mobile }}</template>
          </el-table-column>

          <el-table-column prop="is_product" align="center" label="欠款类型">
            <template slot-scope="scope">{{ scope.row.is_product }}</template>
          </el-table-column>

          <el-table-column prop="orders_code" align="center" label="订单号">
            <template slot-scope="scope">{{ scope.row.orders_code }}</template>
          </el-table-column>

          <el-table-column prop="price" align="center" label="欠款金额">
            <template slot-scope="scope">{{ scope.row.price | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="repay_price" align="center" label="还款金额">
            <template slot-scope="scope">{{ scope.row.repay_price | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="owe_price" align="center" label="未结清">
            <template slot-scope="scope">
              <div class="list_status">
                <span class="zhifu" v-if="scope.row.owe_price == 0">{{scope.row.owe_price}}</span>
                <span class="weizhifu" v-else>{{scope.row.owe_price | _filterNumFormat}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" align="center" label="欠款时间">
            <template slot-scope="scope">{{ scope.row.created_at | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column
            prop="describe"
            align="center"
            label="欠款说明"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.describe }}</template>
          </el-table-column>

          <el-table-column prop="huankuan_time" align="center" label="还款时间">
            <template slot-scope="scope">{{ scope.row.huankuan_time | _endTimeFormat || ''}}</template>
          </el-table-column>

          <el-table-column prop="adviser_name" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser_name }}</template>
          </el-table-column>

          <el-table-column prop="member_name" align="center" label="操作人">
            <template slot-scope="scope">{{ scope.row.member_name }}</template>
          </el-table-column>

<!--          <el-table-column prop="across_store" align="center" label="跨店客户">-->
<!--            <template slot-scope="scope">{{ scope.row.across_store }}</template>-->
<!--          </el-table-column>-->

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <p class="gaipai">
                <span class="buttonStyle_class" v-if="scope.row.status == 1" @click="PrintingClick(scope.row.orders_id)">打印</span>
                <!-- <span v-else @click="pagesToUrl('CollectMoney',scope.$index)">还款</span> -->
                <span class="buttonStyle_class" v-else @click="dialogRepayment = true;repayPriceTow = repayPrice = scope.row.owe_price;arrearsId = scope.row.id">还款</span>
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
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
import { getArrearsList } from "@/shop/assets/api/informatization/client";
import { postArrearsRepayment } from  "@/shop/assets/api/flow/order"
export default {
  name: "DebtList",
  data() {
    return {
      counselor: {
        counselor: ""
      },
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: getArrearsList, // 分页查询api接口
      daterangeTimer: [],
      dialogRepayment:false,
      repayPrice:'',
      repayPriceTow:'',
      arrearsId:'',
      disabled:false,
    };
  },
  watch: {
    daterangeTimer(newData, oldData) {
      this.condition.startTime = this.$base.dateTimeToDate(newData[0], "startTime");
      this.condition.endTime = this.$base.dateTimeToDate(newData[1], "endTime");
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
  components: { autoSearchClient },
  methods: {
    //导出Excel
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let url = ''
      if(window.location.hostname == this.$base.getStoreHost()){
        url = `https://${location.hostname}/post/export/ArrearsListExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }else{
        url = `http://${location.hostname}:${location.port}/post/export/ArrearsListExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }
      // let url = `http://${location.hostname}/post/export/ArrearsListExcelExport?start=0&perpage=999&downloadUserId=${this.$store.getters.currentUser.users_id}`;
      if (params.sort) {
        url += `&sort=${params.sort}`
      }
      if (params.keyword) {
        url += `&keyword=${params.keyword}`
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
      let endTime = year + "-" + month + "-" + strDate + '23:59:59';
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
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //跳转页面
    pagesToUrl(str, index) {
      switch (str) {
        case "CollectMoney":
          this.$router.push({
            path: "CollectMoney",
            query: {
              appointment_id: "",
              orders_id: this.demoList[index].orders_id,
              adviser_id: this.demoList[index].adviser_id,
              id: this.demoList[index].id
            }
          });
          break;
        default:
          break;
      }
    },

    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 4 }
      });
    },
    myChanged(data) {
      this.condition.keyword = data.kw;
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
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.DebtList {
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
    padding-bottom: 20px;
  }
}
</style>

<style>
.DebtList .gaipai {
  display: flex;
  align-items: center;
  justify-content: center;
}
.DebtList .gaipai span {
  cursor: pointer;
}
.DebtList .list_status span {
  display: block;
  width: 0.8rem;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  color: #fff;
  border-radius: 2px;
}
.DebtList .list_status .zhifu {
  background: #9fdb9d;
}
.DebtList .list_status .weizhifu {
  background: #feb78c;
}
</style>


    
