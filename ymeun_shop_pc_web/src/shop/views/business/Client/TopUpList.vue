<template>
  <div class="TopUpList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>客户充值</header>
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
              :clearable="false"
              v-model="daterangeTimer"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="condition.entryType" placeholder="选择类型" readonly clearable>
              <el-option v-for="[key, val] in _dictTopUpType" :key="key" :label="val" :value="key"></el-option>
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
          <el-table-column prop="name" align="center" label="姓名">
            <template slot-scope="scope">
              <el-link 
                  :underline="false" 
                  @click="$router.push({
                    name: 'ClientDel',
                    query:{ 
                      id: scope.row.customer_id, 
                      } 
                    })"
                  >{{ scope.row.name }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column prop="mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>

          <el-table-column prop="price" align="center" label="实际金额">
            <template slot-scope="scope">{{ scope.row.price | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="getPrice" align="center" label="券额">
            <template slot-scope="scope">{{ scope.row.getPrice | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="entry_type" align="center" label="使用类型">
            <template slot-scope="scope">{{scope.row.entry_type }}</template>
          </el-table-column>

          <el-table-column prop="time" align="center" label="时间">
            <template slot-scope="scope">{{ scope.row.time }}</template>
          </el-table-column>

          <el-table-column prop="remark" align="center" label="备注">
            <template slot-scope="scope">{{ scope.row.remark }}</template>
          </el-table-column>

          <el-table-column prop="username" align="center" label="操作人">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>

<!--          <el-table-column prop="across_store" align="center" label="跨店客户">-->
<!--            <template slot-scope="scope">{{ scope.row.across_store }}</template>-->
<!--          </el-table-column>-->

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <p class="gaipai">
                <span class="buttonStyle_class" @click="PrintingClick(scope.row.command)">打印</span>
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
import { prepaidList } from "@/shop/assets/api/informatization/client";
export default {
  name: "TopUpList",
  data() {
    return {
      boxMaxHeight:"",
      counselor: {
        counselor: ""
      },
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: prepaidList, // 分页查询api接口
      daterangeTimer: []
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
        url = `https://${location.hostname}/post/export/prepaid/getPrintInfo?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }else{
        url = `http://${location.hostname}:${location.port}/post/export/prepaid/getPrintInfo?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      }
      // let url = `http://${location.hostname}/post/export/prepaid/getPrintInfo?start=0&perpage=999&downloadUserId=${this.$store.getters.currentUser.users_id}`;
      if (params.entryType) {
        url += `&entryType=${params.entryType}`
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

    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 5 }
      });
    },
    myChanged(data) {
      this.condition.getData = data.kw;
    }
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
.TopUpList {
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
.TopUpList .gaipai {
  display: flex;
  align-items: center;
  justify-content: center;
}
.TopUpList .gaipai span {
  cursor: pointer;
}
.TopUpList .list_status span {
  display: block;
  width: 0.8rem;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  color: #fff;
  border-radius: 2px;
}
.TopUpList .list_status .zhifu {
  background: #9fdb9d;
}
.TopUpList .list_status .weizhifu {
  background: #feb78c;
}
.TopUpList .list_status .quxiao {
  background: #d2d2d2;
}
</style>


    
