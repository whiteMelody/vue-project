<template>
  <div class="DeductionDelList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>详细列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="index" align="center" label="序号">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="huakou_time" align="center" label="治疗时间">
              <template slot-scope="scope">
                {{ scope.row.huakou_time | _endTimeFormat}}
              </template>
            </el-table-column>

            <el-table-column prop="customer.name" align="center" label="姓名">
              <template slot-scope="scope">
                {{ scope.row.customer.name }}
              </template>
            </el-table-column>
            <el-table-column prop="customer.mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="technician.name" align="center" :label="$store.getters.roleName.technician">
              <template slot-scope="scope">
                {{ scope.row.technician.name }}
              </template>
            </el-table-column>
            <el-table-column prop="item.name" align="center" label="划扣项目">
              <template slot-scope="scope">
                {{ scope.row.item.name }}
              </template>
            </el-table-column>
            <el-table-column prop="status.label" align="center" label="状态">
              <template slot-scope="scope">
                {{ scope.row.status.label }}
              </template>
            </el-table-column>
            <el-table-column prop="back.label" align="center" label="是否退单">
              <template slot-scope="scope">
                {{ scope.row.back.label }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="buttonStyle" v-if="scope.row.back.value == 1">已退回</p>
                <p class="operation" v-else>
                  <a class="buttonStyle_class" @click="PrintingClick(scope.row.customer_id, scope.row.command)">打印</a>
                  <em></em>
                  <a class="buttonStyle_class" @click="DeductionOut(scope.row.command)">退回</a>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import { getDetailed , giveBack } from "@/shop/assets/api/informatization/deduction"
export default {
  name: "DeductionDelList",
  data() {
    return {
      boxMaxHeight:"",
      counselor:{
          counselor:"",
      },
      condition: {
        customerId:this.$route.query.id,
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getDetailed,       // 分页查询api接口
    };
  },
  components: {},
  methods: {
    DeductionOut(id) {
      this.$confirm('此操作将退回次划扣，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
        let postData = {
            consumeCommand : id,
        };
        giveBack(postData).then(res => {
          if(res.status == 0){
            this.$message({
                showClose: true,
                message: "退回成功",
                type: 'success',
                onClose:()=>{
                  this.loadData()
                }
            });
          }else{
            this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
            });
          }
        }).catch((e)=>{
            console.log('giveBack no');
        })


    
      })
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    

    PrintingClick(id, command) {
        this.$router.push({
            name:'Printing',
            query:{id,type:3, command}
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
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.DeductionDelList {
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
    padding-bottom:20px; 
  }
}
</style>
<style>
.DeductionDelList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.DeductionDelList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.DeductionDelList .operation a{
  cursor: pointer;
}
.DeductionDelList .out{
  color: #999999;
}
</style>

    
