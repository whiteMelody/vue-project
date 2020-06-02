<template>
  <div class="EmployeeData">
    <header>员工数据</header>
    <div class="clear-f2"></div>
    <div class="clear3"></div>
    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
      <el-form-item label>
        <el-select v-model="condition.StoreName" placeholder="请选择门店" readonly clearable>
          <el-option :key="''" label="全部门店" :value="''"></el-option>
          <el-option
            v-for="(item, index) in storeDataList"
            :key="index"
            :label="item.store.name"
            :value="item.store.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
      </el-form-item>
    </el-form>

    <div class="pa20 bg-white4">
      <div class="wb13 fl h40px lh40px text-center bd-gray bd-r1 fc-gray4 mar5per">员工合计</div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">合计（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.total | _NumFormat }}</p>
      </div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">{{$store.getters.roleName.shopKeeper}}（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.dianzhang | _NumFormat }}</p>
      </div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">{{$store.getters.roleName.adviser}}（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.adviser | _NumFormat }}</p>
      </div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">{{$store.getters.roleName.technician}}（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.jishi | _NumFormat }}</p>
      </div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">{{$store.getters.roleName.reception}}（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.qiantai | _NumFormat }}</p>
      </div>
      <div class="wb13 fl h40px lh15px">
        <p class="fc-gray2">其他（人）</p>
        <p class="Fb fc-gray4 f20px mat10">{{membersNumberData.qita | _NumFormat }}</p>
      </div>
      <div class="clear0"></div>
    </div>

    <div class="clear4"></div>

    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
      v-on:listLoaded="getLoaded"
    >
      <el-table slot="list" :data="demoList" border>
        <el-table-column prop="store" align="left" label="门店">
          <template slot-scope="scope">{{ scope.row.store.name }}</template>
        </el-table-column>

        <el-table-column prop="total" align="left" label="员工数（人）">
          <template slot-scope="scope">{{ scope.row.total}}</template>
        </el-table-column>

        <el-table-column prop="adviser" align="left" :label="`${$store.getters.roleName.adviser}（人）`">
          <template slot-scope="scope">{{ scope.row.adviser }}</template>
        </el-table-column>

        <el-table-column prop="jishi" align="left" :label="`${$store.getters.roleName.technician}（人）`">
          <template slot-scope="scope">{{ scope.row.jishi }}</template>
        </el-table-column>

        <el-table-column prop="qiantai" align="left" :label="`${$store.getters.roleName.reception}（人）`">
          <template slot-scope="scope">{{ scope.row.qiantai }}</template>
        </el-table-column>

        <el-table-column prop="qita" align="left" label="其他（人）">
          <template slot-scope="scope">{{ scope.row.qita }}</template>
        </el-table-column>
      </el-table>
    </base-list>
  </div>
</template>
<script>
import {
  getAnalysis,
  getMembersNumber
} from "@/chain/assets/api/TeamManagement/index";
export default {
  name: "EmployeeData",
  data() {
    return {
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: getAnalysis, // 分页查询api接口
      membersNumberData: {},
      storeDataList: []
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data) {
      this.storeDataList = data.list;
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
    getMembersNumber({ s_id: this.$route.query.id }).then(res => {
      if (res.status == 0) {
        this.membersNumberData = res.data;
      }
    });
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
.EmployeeData {
  background-color: #ffffff;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    span {
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.29rem;
      i {
        font-style: normal;
        color: #ff5722;
      }
    }
  }
}
</style>