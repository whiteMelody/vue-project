<template>
    <div class="TaskList">
        <header>任务列表</header>

        <div class="clear-f2"></div>
        <div class="clear3"></div>

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
<!-- 
                    <el-form-item class="w340px">
                        <el-date-picker
                            class="wb100"
                            v-model="daterangeTimer"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->

                    <el-form-item>
                        <div class="hs_timer">
                            <div class="text">任务生成时间</div>
                            <em></em>
                            <div class="input">
                            <el-date-picker
                                class="w340px"
                                v-model="daterangeTimer"
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


                    <el-button type="primary" @click="loadData" class="h32px">搜索</el-button>

                </el-form>


                <base-list ref="demoTable" :condition="condition"
                                          :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                <el-table slot="list" :data="demoList" border>
                  
                    <el-table-column align="left" label="标题">
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="状态">
                        <template slot-scope="scope">
                            {{scope.row.mobile}}
                            <span v-if="scope.row.status == 1" class="w60px bg-green6 h24px lh24px fc-white text-center fl">已完成</span>
                            <span v-else class="w60px bg-orange2 h24px lh24px fc-white text-center fl">未完成</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="时间">
                        <template slot-scope="scope">
                            {{ scope.row.time }}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="开发人员">
                        <template slot-scope="scope">
                            {{scope.row.developmentName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="操作">
                        <template slot-scope="scope">

                            <div class="text-left">
                                <!-- 库房 -->
                                <!-- 21出库审核任务 -->
                                <template v-if="scope.row.type == 21">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="$router.push({ path: 'OutStorageOrderCheck', query:{ id: scope.row.resources_id, taskId: scope.row.id }})">查看任务</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 22调拨入库任务 -->
                                <template v-else-if="scope.row.type == 22">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="$router.push({ path: 'InStorageOrderCheck', query:{ id: scope.row.resources_id, type: 2, taskId: scope.row.id }})">查看任务</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 23调拨退货入库任务 -->
                                <template v-else-if="scope.row.type == 23">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="$router.push({ path: 'InStorageOrderDetail', query:{ id: scope.row.resources_id, type: 3, taskId: scope.row.id }})">查看任务</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 24采购审核任务 -->
                                <template v-else-if="scope.row.type == 24">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="$router.push({ path: 'PurchaseOrderCheck', query:{ orderId: scope.row.resources_id, taskId: scope.row.id }})">查看任务</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 25库存预警 -->
                                <template v-else-if="scope.row.type == 25">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="finishTask2(scope.row.id)">确认</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 26到期预警 -->
                                <template v-else-if="scope.row.type == 26">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="finishTask2(scope.row.id)">确认</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <!-- 27请货入库任务 -->
                                <template v-else-if="scope.row.type == 27">
                                    <p class="fc-green" v-if="scope.row.status == 0 || scope.row.status == 2" @click="$router.push({ path: 'InStorageOrderPleaseGoods', query:{ id: scope.row.resources_id, type: 4, taskId: scope.row.id }})">查看任务</p>
                                    <p class="fc-gray" v-else>已完成</p>
                                </template>

                                <p class="operation" v-else>
                                    <a  v-if="scope.row.status == 0" @click="cancelTheReservationFn(scope.row.id)">确认通知</a>
                                    <span v-else>已确认</span>
                                </p>
                            </div>

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

    import { taskListChain , taskFinishNoDeal, finishTask } from "@/chain/assets/api/task/task"

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
                    adviserId: [{ required: false, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
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

            finishTask2(taskId){
                taskFinishNoDeal({
                    task_id: taskId
                }).then(res=>{
                    if (res.status == 0) {
                        this.$message({
                            message: "确认成功!",
                            type: "success",
                            onClose: () => {
                                this.loadData();
                            }
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                })
            },

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
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #333;
  }

}
</style>
<style>
.TaskList .operation{
  display: flex;
  align-items: center;
}
.TaskList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.TaskList .operation a{
  cursor: pointer;
  color: #009688;
  font-size: 14px;
}
.TaskList .operation a:hover{
    opacity: 0.7;
    text-decoration: underline;
}
.TaskList .operation span{
  color: #C0C0C0;
  font-size: 14px;
}
</style>
