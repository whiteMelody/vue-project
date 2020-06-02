<template>
  <div class="Index">
    <p class="h40px lh40px bd-gray bd-b1">
        任务列表
    </p>

    <div class="clear4"></div>

    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">


      <el-form-item>
        <el-select v-model="condition.usersId" :clearable="true" placeholder="请选择发布人" class="mal10">
          <el-option :label="$store.getters.currentUser.username" :value="$store.getters.currentUser.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="condition.status" :clearable="true" placeholder="请选择状态" class="mal10">
          <el-option label="全部状态" :value="-1"></el-option>
          <el-option label="已完成" :value="1"></el-option>
          <el-option label="未完成" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker v-model="condition.beginDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker>
        至
        <el-date-picker v-model="condition.endDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择结束日期"></el-date-picker>
      </el-form-item>


      <el-button type="primary" icon="el-icon-search" class="h32px bg-blue2" @click="loadData"></el-button>
    </el-form>

    <template>

      <el-table :data="tableList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="100px">

          <template slot-scope="scope">
            <template v-if="scope.row.status.value == 0">
              <p class="w80px h23px lh23px fc-white text-center bg-orange">
                {{scope.row.status.label}}
              </p>
            </template>
            <template v-else-if="scope.row.status.value == 1">
              <p class="w80px h23px lh23px fc-white text-center bg-green">
                {{scope.row.status.label}}
              </p>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">{{ formatDate(scope.row.created_at) }}</template>
        </el-table-column>
        <el-table-column align="center" label="员工">
          <template slot-scope="scope">{{$store.getters.currentUser.username}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <span class="fc-gray2" v-if="scope.row.status.value == 1">已完成</span>
            <span class="fc-blue pointer" v-else @click="finishTask(scope.row)">确认</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
                @size-change="upPage"
                @current-change="nextPage"
                :current-page="1"
                :page-sizes="[5, 10, 15, 20, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :hide-on-single-page="true"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
    import { getList, confirm } from "@/assets/api/task/task";
    export default {
        name: "TaskList",
        data() {
            return {
                condition: {
                    start: 1,
                    perpage: 15,
                    fashion: 1,
                },
                total: 0,
                tableList: [],
                loading: false,
            };
        },
        watch: {},
        components: {},
        methods: {
            loadData() {
                this.loading = true;
                getList(this.condition)
                    .then(res => {
                        if (res.status == 0) {
                            this.tableList = res.data.list;
                            this.total = res.data.total;
                            this.loading = false;
                        }
                    })
                    .catch(error => {
                        console.log("taskList    no");
                    });
            },
            indexMethod(index) {
                return index + 1 * 1;
            },
            upPage(val) {
                this.condition.perpage = val;
                this.loadData();
            },
            nextPage(val) {
                this.condition.start = val;
                this.loadData();
            },

            finishTask(row){
                confirm({
                    taskId: row.id
                }).then(res=>{
                    if (res.status == 0) {
                        this.$message({
                            message: "任务完成",
                            type: "success",
                        });
                        this.loadData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error",
                        });
                        this.loadData()
                    }
                })
            },

            formatDate(time){
                if(this.$base.isNull(time))
                    return ''
                return time.substring(0, time.length-3)
            }

        },

        // 创建前状态
        beforeCreate() {},

        // 创建完毕状态
        created() {
            this.loadData();
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
  .Index {
    background-color: #ffffff;
    padding: 0 0.2rem;
    padding-bottom: 0.2rem;
    margin: 0.2rem;
    header {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e5e5e5;
    }
    .page {
      text-align: right;
      margin-top: 20px;
    }
  }
</style>

<style>
  /* .display .el-popper a {
      color: #666666;
    } */
</style>