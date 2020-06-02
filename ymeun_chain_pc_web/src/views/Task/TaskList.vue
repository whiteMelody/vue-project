<template>
    <div class="TaskList">
        <header>任务列表</header>

        <div class="clear2"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                   
                    <el-form-item label>
                        <el-select v-model="condition.status" placeholder="选择状态" readonly clearable>
                            <el-option v-for="[key, val] in _dictTaskType" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.development" placeholder="选择开发人员" readonly clearable :disabled="developmentDisabled">
                            <el-option :key="''" label="全部开发人员" :value="''"></el-option>
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                       :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="w340px">
                        <el-date-picker
                            class="wb100"
                            v-model="daterangeTimer"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>


                    <el-button type="primary" @click="loadData" class="h32px">搜索</el-button>

                </el-form>

                <div class="clear2"></div>

                <base-list ref="demoTable" :condition="condition"
                                          :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                <el-table slot="list" :data="demoList" stripe border>
                  
                    <el-table-column align="center" label="标题">
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                            {{scope.row.mobile}}
                            <span v-if="scope.row.status == 1" class="w60px bg-green5 h24px lh24px fc-white text-center mauto">已完成</span>
                            <span v-else class="w60px bg-orange2 h24px lh24px fc-white text-center mauto">未完成</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="时间">
                        <template slot-scope="scope">
                            {{ scope.row.time }}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="开发人员">
                        <template slot-scope="scope">
                            {{scope.row.developmentName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <p class="operation">
                                <a  v-if="scope.row.status == 0" @click="cancelTheReservationFn(scope.row.id)">确认通知</a>
                                <span v-else>已确认</span>
                            </p>
                        </template>
                    </el-table-column>


                </el-table>
            </base-list>
            </div>

            <div class="clear0"></div>

        </div>

       
    </div>
</template>

<script>

    import { taskListChain , finishTask } from "../../assets/api/task/task"


    export default {
        name: "TaskList",
        components: {
        },
        data() {
            return {
                form: {},
                daterangeTimer: [],
                condition: {
                    development:'',
                    status:'0'
                },// 查询条件
                demoList: [],                      // table数组
                pageSearch: taskListChain,       // 分页查询api接口
                storeList:[],
                staffList:[],
                developmentDisabled:false,
                rules:{
                    s_id: [{ required: false, message: '请选择所属门店', trigger: 'change' }],
                    adviserId: [{ required: false, message: '请选择顾问', trigger: 'change' }],
                    appointmentTime: [{ required: false, message: '请选择到店时间', trigger: 'change' }],
                    itemsId: [{ required: false, message: '请选择小类项目', trigger: 'change' }],
                },
            }
        },
        mounted() {
            
        
            //获取门店列表
            this.$postRequest("/post/api/store/getStore").then(res => {
                if(res.status == 0){
                    let _tmp = res.data
                    for(let i=0; i<_tmp.length; i++){
                        _tmp[i].isSelected = false
                    }
                    this.storeList = _tmp
                }
            })

            if(this.$store.getters.currentUser.is_admin == 0){
                this.condition.development = this.$store.getters.currentUser.users_id
                this.developmentDisabled = true;
            }
            //获取开发者列表
            this.$postRequest("/post/api/members/membersListByChain").then(res => {
                if(res.status == 0){
                    this.staffList = res.data
                }
            })

        


        },
        methods: {

            loadData() {
                this.$refs.demoTable.loadData()
            },
         
            //确认通知
            cancelTheReservationFn(id){
                this.$confirm('确认通知？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    finishTask({
                         id : id
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '已通知',
                                type: "success",
                                onClose:()=>{
                                    this.loadData()
                                }
                            });
                        }
                        else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: "error"
                            });
                        }
                    }).case(res=>{
                        console.log("finishTask no");
                    })
                });
            }
           

        },
        watch: {
            'daterangeTimer'(newData,oldData){
                this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
                this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
            },

        }

    }

</script>
<style lang="scss" scoped>
.TaskList {
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
    color: #009688;
    border-bottom: 1px solid #e5e5e5;
  }

}
</style>
<style>
.TaskList table{
  margin: 0;
  font-size: 16px;
}
.TaskList .el-table--border tr th{
  padding: 8px 0;
}
.TaskList .el-table__body-wrapper{
  margin-top:0;
}
.TaskList .el-table__body-wrapper .el-table__empty-block{
  min-height: 40px
}
.TaskList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.TaskList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.TaskList .operation a{
  cursor: pointer;
  color: #333333;
  font-size: 14px;
}
.TaskList .operation span{
  color: #999999;
  font-size: 14px;
}
</style>
