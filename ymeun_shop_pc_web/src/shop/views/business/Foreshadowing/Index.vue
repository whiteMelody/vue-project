<template>
  <div class="Foreshadowing">
    <header>铺垫列表</header>
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
             <el-select v-model="condition.technician_id" :placeholder="`选择${$store.getters.roleName.technician}`" readonly="" clearable>
                      <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.technician}`"></el-option>
                      <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
          
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>

          <el-table-column prop="customer_mobile" align="center" label="序号">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>

          <el-table-column prop="time" align="center" label="记录时间">
            <template slot-scope="scope">{{ scope.row.time | _endTimeFormat }}</template>
          </el-table-column>

          <el-table-column prop="customerName" align="center" label="姓名">
            <template slot-scope="scope">
              <el-link :underline="false" @click="$router.push({name:'ClientDel',query:{id:scope.row.customer_id,types:6}})">{{ scope.row.customerName }}</el-link>
            </template>
          </el-table-column>

          <el-table-column prop="mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>

          <el-table-column prop="sex" align="center" label="性别">
            <template slot-scope="scope">{{ scope.row.sex == 0 ? '女' : '男' }}</template>
          </el-table-column>

          <el-table-column prop="userName" align="center" :label="$store.getters.roleName.technician">
            <template slot-scope="scope">{{ scope.row.userName}}</template>
          </el-table-column>

          <el-table-column prop="items.name" align="center" label="划扣项目">
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.items" :key="index">
                <span>{{item}}</span>
                <br>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="content"
            align="center"
            label="记录详情"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.content }}</template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <a class="buttonStyle_class" @click="$router.push({path:'/ForeshadowingFillIn',query:{taskId:scope.row.id,customerId:scope.row.customer_id}})">修改术后铺垫记录</a>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";


import { getList } from "@/shop/assets/api/informatization/Foreshadowing";
export default {
  name: "Foreshadowing",
  data() {
    return {
      counselor: {
        counselor: ""
      },
      condition: {
        startTime : this.$base.getDateScope(0).startTime.split(' ')[0],
        endTime : this.$base.getDateScope(1).endTime.split(' ')[0],
        status:0
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: getList, // 分页查询api接口
      daterangeTimer: [],
      arrearsId:'',
      disabled:false,
    };
  },
  watch: {
    daterangeTimer(newData, oldData) {
      this.condition.startTime = this.$base.dateTimeToDate(newData[0], "startTime");
      this.condition.endTime = this.$base.dateTimeToDate(newData[1], "endTime");
    },
  },
  components: { autoSearchClient },
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    myChanged(data) {
      this.condition.keyword = data.kw;
    },
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
.Foreshadowing {
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
.Foreshadowing .gaipai {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Foreshadowing .gaipai span {
  cursor: pointer;
}
.Foreshadowing .list_status span {
  display: block;
  width: 0.8rem;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  color: #fff;
  border-radius: 2px;
}
.Foreshadowing .list_status .zhifu {
  background: #9fdb9d;
}
.Foreshadowing .list_status .weizhifu {
  background: #feb78c;
}
</style>