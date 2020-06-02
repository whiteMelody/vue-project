<template>
  <div class="AdvisoryList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
      <a>咨询列表</a>

      <p>
        <span>共计 {{totalCount}} 条</span>
        <b v-if="notConsultationCount != 0">
          未填写咨询详情
          <i>{{notConsultationCount}}</i> 条
        </b>
      </p>
    </header>
    <div class="box">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
        v-on:listLoaded="getLoaded"
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
            <el-select
              v-model="condition.adviserId"
              :placeholder="'选择'+$store.getters.roleName.adviser"
              readonly
              clearable
              :disabled="roleChoosable"
            >
              <el-option :label="'全部'+$store.getters.roleName.adviser" :value="'0'"></el-option>
              <el-option
                v-for="item in $store.getters.counselorMap"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="condition.status" placeholder="选择状态" readonly clearable>
              <el-option v-for="[key, val] in _dictTaskType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="h32px" @click="pagesToUrl('RepairAdvisoryList')">补录咨询</el-button>
          </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="index" align="center" label="序号" width="50px">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>

          <el-table-column prop="orders_status" align="center" label="成交状态">
            <template slot-scope="scope">
              <div class="list_status">
                <span class="zhifu" v-if="scope.row.orders_status == 1">成交</span>
                <span class="weizhifu" v-else-if="scope.row.orders_status == 0">未成交</span>
                <span class="quxiao" v-else>退单</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="store_time" align="center" label="到店日期">
            <template slot-scope="scope">{{ scope.row.store_time | _endTimeFormat}}</template>
          </el-table-column>
          <el-table-column prop="customer.name" align="center" label="客户姓名">
            <template slot-scope="scope">
              <el-link 
                  :underline="false" 
                  @click="$router.push({
                    name: 'ClientDel',
                    query:{ 
                      id: scope.row.customer_id, 
                      types:'1'
                      } 
                    })"
                  >{{ scope.row.customer.name }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="customer.mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.customer.mobile }}</template>
          </el-table-column>
          <el-table-column prop="customer.sex" align="center" label="性别">
            <template slot-scope="scope">{{ scope.row.customer.sex == 0 ? '女' : '男' }}</template>
          </el-table-column>
          <el-table-column prop="adviser.name" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser.name }}</template>
          </el-table-column>
          <el-table-column prop="channel_name.name" align="center" label="到诊渠道">
            <template slot-scope="scope">{{ scope.row.channel_name.name }}</template>
          </el-table-column>
          <el-table-column prop="appointment_items" align="center" label="咨询项目">
            <template slot-scope="scope">{{ scope.row.appointment_items.name }}</template>
          </el-table-column>
          <!--          <el-table-column prop="across_store" align="center" label="跨店咨询">-->
          <!--            <template slot-scope="scope">{{ scope.row.across_store }}</template>-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="describe"
            align="center"
            label="咨询详情"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.describe }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <p class="gaipai">
                <span class="buttonStyle_class" @click="pagesToUrl('FillInAdvisory',scope.$index)">修改咨询内容</span>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";
import { getHistoryZixunList } from "@/shop/assets/api/informatization/advisory";
export default {
  name: "AdvisoryList",
  data() {
    return {
      boxMaxHeight: "",
      roleChoosable: false,
      counselor: {
        counselor: ""
      },
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: getHistoryZixunList, // 分页查询api接口
      daterangeTimer: [],
      notConsultationCount: "",
      totalCount: ""
    };
  },
  watch: {
    daterangeTimer(newData, oldData) {
      this.condition.startTime = this.$base.dateTimeToDate(newData[0], "startTime");
      this.condition.endTime = this.$base.dateTimeToDate(newData[1], "endTime");
    }
  },
  components: { autoSearchClient },
  methods: {
    //导出Excel
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let url = ''
      if(window.location.hostname == this.$base.getStoreHost()){
        url = `https://${location.hostname}/post/export/HistoryZixunListExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }else{
        url = `http://${location.hostname}:${location.port}/post/export/HistoryZixunListExcelExport?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }
      // let url = `http://${location.hostname}/post/export/HistoryZixunListExcelExport?start=0&perpage=999&downloadUserId=${this.$store.getters.currentUser.users_id}`;
      if (params.status) {
        url += `&status=${params.status}`;
      }
      if (params.keyword) {
        url += `&keyword=${params.keyword}`;
      }
      if (params.adviserId) {
        url += `&adviserId=${params.adviserId}`;
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
      // console.log(url);
      window.location.href = url;
    },
    myChanged(data) {
      this.condition.keyword = data.kw;
    },
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data) {
      this.notConsultationCount = data.notConsultationCount;
      this.totalCount = data.totalCount;
    },
    //跳转页面
    pagesToUrl(str, index) {
      switch (str) {
        case "RepairAdvisoryList":
          this.$router.push({
            path: "RepairAdvisoryList"
          });
          break;
        case "FillInAdvisory":
          this.$router.push({
            path: "FillInAdvisory",
            query: {
              customerId: this.demoList[index].customer_id,
              adviserId: this.demoList[index].adviser.users_id,
              appointmentId: this.demoList[index].appointment_id,
              consultationId:
                this.demoList[index].id || this.demoList[index].consultation_id
            }
          });
          break;
        default:
          break;
      }
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.boxMaxHeight = window.innerHeight - 100;
    let usersId = JSON.parse(localStorage.getItem("CURRENT_USER"));
    if (usersId.role_id == 3) {
      this.roleChoosable = true;
      this.condition = {
        adviserId: usersId.users_id
      };
    } else {
      this.roleChoosable = false;
    }
  },

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
.AdvisoryList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    a {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
    p {
      padding-left: 0.3rem;
      span {
        font-size: 16px;
        color: #333333;
      }
      b {
        font-weight: normal;
        padding-left: 0.1rem;
        font-size: 16px;
        color: #333333;
        i {
          font-style: normal;
          color: #ff5722;
          font-size: 16px;
        }
      }
    }
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
.AdvisoryList .gaipai span {
  cursor: pointer;
}
.AdvisoryList .list_status span {
  display: block;
  width: 0.8rem;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  color: #fff;
  border-radius: 2px;
}
.AdvisoryList .list_status .zhifu {
  background: #9fdb9d;
}
.AdvisoryList .list_status .weizhifu {
  background: #feb78c;
}
.AdvisoryList .list_status .quxiao {
  background: #d2d2d2;
}
</style>


    
