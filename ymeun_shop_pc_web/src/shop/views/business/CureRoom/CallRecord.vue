<template>
  <div class="ReturnVisitList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>呼叫记录</header>

    <div class="listBox">
      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch">

        <el-table slot="list" :data="demoList"  stripe border>

          <el-table-column prop="review_time" type="index" :index="indexMethod" align="center" label="序号" width="100px"></el-table-column>
          
          <el-table-column prop="type" align="center" label="呼叫时间">
            <template slot-scope="scope">{{ $base.dateTimeToDate(scope.row.launch_time, 'date')  }}</template>
          </el-table-column>
          <el-table-column prop="channel" align="center" label="服务客户">
            <template slot-scope="scope">{{ scope.row.customer.name }}</template>
          </el-table-column>
          <el-table-column prop="across" align="center" label="呼叫信息">
            <template slot-scope="scope">{{ scope.row.service.content }}</template>
          </el-table-column>
          <el-table-column prop="customer_mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.customer.mobile }}</template>
          </el-table-column>
          <el-table-column prop="member" align="center" label="发起人">
            <template slot-scope="scope">{{ scope.row.users.name }}</template>
          </el-table-column>

          <el-table-column prop="status" align="center" label="处理结果">
            <template slot-scope="scope">
              <div class="list_status">
                <span :class="scope.row.status == 0 ? 'colorCheng ' : 'colorGrreng'">
                  {{scope.row.status == 0 ? '未处理' : '已处理'}}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <p class="buttonStyle_class" v-if="scope.row.status == 0" @click="CureRoomCallAgain(scope.row.id)">呼叫</p>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import { CureRoomCallList,CureRoomCallAgain } from '@/shop/assets/api/cureRoom/cureRoom';
export default {
  name: "CallRecord",
  data() {
    return {
      boxMaxHeight:"",
      // 查询条件
      condition: {
        status:1
      },
      demoList: [],
      pageSearch: CureRoomCallList, // 分页查询api接口
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    indexMethod(index) {
      return index + 1;
    },

    // 再次呼叫
    CureRoomCallAgain(id) {
      CureRoomCallAgain({id:id}).then(res => {
        if (res.status== 0) {
          this.$message({
              message: '呼叫成功',
              type: 'success',
              duration:'1500',
              onClose:() => {
                  this.loadData();
              }
          });
        }else {
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
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
  destroyed() {},

  // 侦听器
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "../MissionCenter/ReturnVisitList.scss";
</style>