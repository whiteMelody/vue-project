<template>
    <div class="ShopData wb100" v-loading="loading">
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">门店数据</span>
            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
        </p>


        <div class="clear0"></div>

          <el-form :inline="true" class="search-form" slot="search" label-width="80px">
            <el-form-item class="w210px">
              <el-select v-model="optionsValue">
                <el-option
                  class="wb100"
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
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

            <el-table-column prop="customer_name" align="center" label="月份">
              <template slot-scope="scope">
                {{ scope.row.month }}
              </template>
            </el-table-column>

            <el-table-column prop="type" align="center" label="建面（m²）">
              <template slot-scope="scope">
                {{ scope.row.measure }}
              </template>
            </el-table-column>
            
            <el-table-column prop="orders_code" align="center" label="团队人数（人）">
              <template slot-scope="scope">
                {{ scope.row.team_num }}
              </template>
            </el-table-column>

            <el-table-column prop="customer_mobile" align="center" label="销售人头（人）">
              <template slot-scope="scope">
                {{ scope.row.sale_num }}
              </template>
            </el-table-column>
            
            <el-table-column prop="repay_price" align="center" label="人效（元）">
              <template slot-scope="scope">
                {{ scope.row.human_effect | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <el-table-column prop="created_at" align="center" label="客效（元）">
              <template slot-scope="scope">
                {{ scope.row.guest_effect | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <el-table-column prop="created_at" align="center" label="坪效（元）">
              <template slot-scope="scope">
                {{ scope.row.square_effect | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <el-table-column prop="price" align="center" label="销售业绩（元）">
              <template slot-scope="scope">
                {{ scope.row.sales_performance | _filterNumFormat }}
              </template>
            </el-table-column>
            
            <!-- <el-table-column prop="price" align="center" label="额外收入（元）">
              <template slot-scope="scope">
                {{ scope.row.additional_income | _filterNumFormat }}
              </template>
            </el-table-column> -->
            
            <!-- <el-table-column prop="describe" align="center" label="合计（元）">
              <template slot-scope="scope">
                {{ scope.row.total | _filterNumFormat }}
              </template>
            </el-table-column> -->

            <!-- <el-table-column prop="describe" align="center" label="操作额外收入">
              <template slot-scope="scope">
                <span  class="buttonStyle_class" @click="incomeClick('one',scope.row.month,scope.row.id)">增加</span>
                <i class="iStyle"></i>
                <span class="buttonStyle_class" @click="incomeClick('two',scope.row.month,scope.row.id)">减少</span>
              </template>
            </el-table-column> -->

          </el-table>

        <el-dialog :visible.sync="centerDialogVisible" width="20%" :show-close="false">
          <div class="tijiaoBox">
            <div class="MagessBox">
              <div class="title">
                <span>{{inputTextData}}额外收入</span>
                <i class="iconfont iconguanbi1" @click="CancelClick"></i>
              </div>
              <div class="infoBox">
                <div class="input">
                  <input type="text" οnblur="value=value.replace(/[^\d]/g,'')" οnkeyup="value=value.replace(/[^\d]/g,'')"  v-model="textData">
                  <i>元</i>
                </div>
                <div class="buttom">
                  <el-button @click="CancelClick">取消</el-button>
                  <el-button type="primary" @click="SubmitClick" v-if="submitShow">确定</el-button>
                  <el-button type="primary" disabled v-else>提交中...</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
    </div>
</template>

<script>

import { getShopData,getAdditionalIncome } from "@/shop/assets/api/manage/statistics";
export default {
    name: "ShopData",
    components: {
    },
    data() {
        return {      
            year:'',                    
            centerDialogVisible:false,
            inputTextData:'',
            textData:'',
            optionsValue:'',
            options:[],
            demoList:[],
            loading:false,
            mark:'',
            month:'',
            moneyId:'',
            submitShow:true,
        }
    },
    watch: {
        optionsValue(c, o){
          this.year = c;
        },
    },
    // 挂载结束状态
    mounted() {
      let date = new Date();
      this.year = date.getFullYear();
      this.optionsValue = date.getFullYear();
      this.getShopData()
    },
    methods: {

      //导出Excel
      deriveExcel() {

        let url = ''
        if(window.location.hostname == this.$base.getStoreHost()){
          url = `https://${location.hostname}/post/export/AchievementRateExcel?downloadUserId=${this.$store.getters.currentUser.users_id}&year=${this.year}`;
        }else{
          url = `http://${location.hostname}:${location.port}/post/export/AchievementRateExcel?downloadUserId=${this.$store.getters.currentUser.users_id}&year=${this.year}`;
        }

        window.location.href = url
      },

      // 门店数据
      getShopData() {
        this.loading = true;
        getShopData({year:this.year}).then(res => {
          if (res.status == 0) {
            this.demoList = res.data.list;
            this.options = res.data.years;
            this.loading = false;
          }
        });
      },

      // 打开弹窗
      incomeClick(type,month,moneyId) {
        this.textData = '';
        this.submitShow = true;
        if (type == 'one') {
          this.inputTextData = '增加';
          this.mark = 1;
        }else {
          this.inputTextData = '减少';
          this.mark = 2;
        }
        this.moneyId = moneyId;
        this.month = month;
        this.centerDialogVisible = true;
      },

      // 搜索
      loadData() {
        this.getShopData();
      },

      // 提交额外收入
      SubmitClick() {
        var reg = new RegExp(/^[1-9]\d*\,\d*|[1-9]\d*$/);
        if (!reg.test(this.textData)) {
          this.$message({
            showClose: true,
            message: '请输入数字',
            duration:'1500',
            type: 'error'
          });
          return false;
        }
        this.submitShow = false;
        let data = {
          year: this.year,
          month:this.month,
          additionalPrice:this.textData,
          id:this.moneyId,
          mark:this.mark,
        }
        getAdditionalIncome(data).then(res => {
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              duration:'1500',
              type: 'success',
              onClose:() => {
                this.centerDialogVisible = false;
                this.getShopData();
              }
            });
          }else {
            this.$message({
              showClose: true,
              message: res.msg,
              duration:'1500',
              type: 'error',
              onClose:() => {
                this.centerDialogVisible = false;
                this.getShopData();
              }
            });
          }
        });
      },

      
      // 取消
      CancelClick() {
        this.centerDialogVisible = false;
      },

        
    },
}

</script>

<style scoped lang="scss">
.iStyle {
  margin: 0 .1rem;
  display: inline-block;
  width: 1px;
  background-color: #e5e5e5;
  height: .12rem;
}
.tijiaoBox {
  border-radius: .1rem;
    .MagessBox {
      .title {
        padding: 0 0.2rem;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 0.16rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }

      .infoBox {
        padding: 0 0.2rem;
        margin-top: .15rem;

        .input {
          height: 35px;
          border: 1px solid #E5E5E5;
          padding: 0 0.14rem;
          overflow: hidden;
          font-size: 0.14rem;
          display: flex;
          align-items: center;

          input {
            width: 100%;
            height: 100%;
            border: none;
            font-family: MicrosoftYaHei;
            font-weight: 400;
          }
          i {
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            font-style: normal;
          }
        }

        .buttom {
          padding: 0.2rem 0;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
