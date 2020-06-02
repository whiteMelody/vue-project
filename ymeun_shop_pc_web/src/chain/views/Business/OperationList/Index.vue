<template>
  <div class="OperationList">
    <header>日志列表</header>
    <div class="clear-f2"></div>
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
                <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                <div class="hs_timer">
                    <div class="text">日志生成时间</div>
                    <em></em>
                    <div class="input">
                    <el-date-picker
                        class="w340px"
                        v-model="dateTime"
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
                <el-select v-model="condition.users_id" placeholder="选择员工" readonly clearable>
                    <el-option :key="''" label="全部员工" :value="''"></el-option>
                    <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                              :value="item.users_id"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label>
                <el-select v-model="condition.modular" placeholder="选择模块" readonly clearable>
                    <el-option :key="''" label="全部模块" :value="''"></el-option>
                    <el-option v-for="item in selectList" :key="item.id" :label="item.name"
                              :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" border>
          <el-table-column prop="mobile" align="left" label="编号" width="50px">
            <!-- <template slot-scope="scope">{{ scope.$index + 1 }}</template> -->
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="操作时间" width="150px">
            <template slot-scope="scope">{{ scope.row.time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column  prop="content"  align="left" label="操作内容" :show-overflow-tooltip="true" width="700">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          
          <el-table-column prop="sex" align="left" label="操作账号">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>

          <el-table-column prop="consultation_id" align="left" label="员工姓名">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
//日期范围组件
import dateSlot from '@/chain/components/date/dateSlot'
import { logList } from "@/chain/assets/api/operationLog/log";
import {  getStoreMembers  } from "@/chain/assets/api/common/common"
export default {
  name: "OperationList",
  data() {
    return {
      dateTime: [ '', ''],
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: logList, // 分页查询api接口
      staffList:[],
      selectList:[]
    };
  },
  components: { dateSlot },
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 列表外赋值
    getLoaded(data){
      this.selectList = data.modular;
    },
  },

  watch: {
    dateTime(c,o){
      this.condition.startTime = c[0]
      this.condition.endTime = c[1]
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    //获取员工列表
    this.$postRequest("/post/api/members/membersListByChain").then(res => {
        if(res.status == 0){
          this.staffList = res.data
        }
    })
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
.OperationList {
  margin: 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .box {
    width: 100%;
    margin-top: 14px;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }
}
</style>