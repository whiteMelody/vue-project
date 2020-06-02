<template>
  <div class="Advisory">

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
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
                  <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                 </el-form-item>
             
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="id" align="center" label="序号" width="60">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="created_at" align="center" label="咨询时间">
              <template slot-scope="scope">
                {{ scope.row.created_at | _endTimeFormat}}
              </template>
            </el-table-column>
            <!--  :show-overflow-tooltip="true" -->
            <el-table-column prop="describe" align="center" label="内容">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="light" :content="scope.row.describe" placement="top">
                  <span class="spanIsShow">&nbsp;&nbsp;&nbsp;{{ scope.row.describe }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="adviser" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser.name }}
              </template>
            </el-table-column>
            <el-table-column prop="store" align="center" label="咨询门店">
              <template slot-scope="scope">
                {{ scope.row.store.name }}
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import { getConsultationList } from "@/shop/assets/api/client/client"
export default {
  name: "Advisory",
  data() {
    return {
      counselor:{
          counselor:"",
      },
      condition: {
        customerId:this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getConsultationList,       // 分页查询api接口
      daterangeTimer:[]
    };
  },
  watch: {
    daterangeTimer(c, o) {
      this.condition.startTime = this.$base.dateTimeToDate(c[0],'date2');
      this.condition.endTime = this.$base.dateTimeToDate(c[1],'date2');
    }
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
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
.Advisory {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;

  .box {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 

    .spanIsShow {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>

    
