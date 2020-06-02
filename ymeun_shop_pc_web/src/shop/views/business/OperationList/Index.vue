<template>
  <div class="OperationList">
    <header>
      日志列表
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
                <date-slot :dateTime.sync="dateTime"></date-slot>
            </el-form-item>
            <el-form-item label>
                <el-select v-model="condition.users_id" placeholder="选择员工" readonly clearable>
                    <el-option :key="''" label="全部员工" :value="''"></el-option>
                    <el-option
                      v-for="item in $store.getters.roleListMap"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label>
                <el-select v-model="condition.modular" placeholder="选择模块" readonly clearable>
                    <el-option :key="''" label="全部模块" :value="''"></el-option>
                    <el-option
                      v-for="item in selectList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border >
          <el-table-column prop="mobile" align="center" label="编号">
            <!-- <template slot-scope="scope">{{ scope.$index + 1 }}</template> -->
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="center" label="操作时间">
            <template slot-scope="scope">{{ scope.row.time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column  prop="content"  align="center" label="操作内容" :show-overflow-tooltip="true" width="700">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          
          <el-table-column prop="sex" align="center" label="操作账号">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>

          <el-table-column prop="consultation_id" align="center" label="员工姓名">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
//日期范围组件
import dateSlot from '@/shop/components/date/dateSlot'
import { logList } from "@/shop/assets/api/operationLog/log";
export default {
  name: "OperationList",
  data() {
    return {
      dateTime: [ '', ''],
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: logList, // 分页查询api接口
      selectList:[]
    };
  },
  components: { dateSlot },
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.selectList = data.modular;
    },
  },

  watch: {
    dateTime(c,o){
      this.condition.startTime = c[0]
      this.condition.endTime = c[1]
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
.OperationList {
  margin: 20px;
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
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }
}
</style>