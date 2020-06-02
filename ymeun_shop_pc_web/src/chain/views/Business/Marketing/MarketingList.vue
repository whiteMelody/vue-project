<template>
    <div class="MarketingList">
        <header>营销中心</header>
        <div class="clear-f2 mab14"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label>
                        <el-input v-model="condition.data" placeholder="请输入顾客姓名"></el-input>
<!--                        <auto-search-client @changed="myChanged" ref='autoSearch'></auto-search-client>-->
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.appointment_status" placeholder="选择状态" readonly clearable>
                            <el-option v-for="[key, val] in _dictMarketingType" :key="key" :label="val" :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.s_id" placeholder="选择门店" readonly clearable>
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label>
                        <el-select v-model="condition.development" placeholder="选择开发人员" readonly clearable :disabled="developmentDisabled">
                            <el-option :key="''" label="全部开发人员" :value="''"></el-option>
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                       :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button class="h32px" @click="resetFn">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="primary" class="h32px" @click="$router.push({name:'AddMarketing'})">新增营销客户</el-button>

                </el-form>


                <base-list ref="demoTable" :condition="condition"
                                          :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                <el-table slot="list" :data="demoList" border>

                    <el-table-column prop="index" align="left" label="序号" width="50">
                        <template slot-scope="scope">{{scope.$index+1}}</template>
                    </el-table-column>

                    <el-table-column align="left" label="客户姓名">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="电话">
                        <template slot-scope="scope">
                            {{scope.row.mobile}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="渠道大类">
                        <template slot-scope="scope">
                            {{ scope.row.channelPName }}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="渠道小类">
                        <template slot-scope="scope">
                            {{scope.row.channelName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="开发人员">
                        <template slot-scope="scope">
                            {{scope.row.developmentName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="所属门店">
                        <template slot-scope="scope">
                            <!-- <span v-if="scope.row.is_appointment == 2">{{scope.row.storeName}}</span> -->
                            {{scope.row.storeName}}
                        </template>
                    </el-table-column>

                    <el-table-column align="left" label="操作" width="150px">
                        <template slot-scope="scope">
                            <p class="operation">
                                <a @click="$router.push({name:'MarketingEdit', query:{id: scope.row.id }})">修改资料</a>
                                <em></em>
                                <a v-if="scope.row.is_appointment == 2" @click="reservationFn(scope.row)">预约</a>
                                <a v-else-if="scope.row.is_appointment == 3" @click="cancelTheReservationFn(scope.row.id)" style="color: #EC414D;">取消预约</a>
                                <span v-else>已预约</span>
                            </p>
                        </template>
                    </el-table-column>


                </el-table>
            </base-list>
            </div>

            <div class="clear0"></div>

        </div>

        <el-dialog title="预约项目" :visible.sync="reservationShow" @closed="closelPop" width="420px">
            <div class="content">
                <div class="user">
                    <h3>
                        <b>{{userData.name}}</b>
                        <span>{{userData.mobile}}</span>
                    </h3>
                    <p>渠道：{{userData.channelPName + '-' + userData.channelName}}</p>
                </div>
                <el-form ref="form" :model="reservationform" :rules="rules" class="add-form" label-width="80px">
                    <div class="row_box">
                        <el-form-item prop="s_id" label="所属门店">
                            <el-select v-model="reservationform.s_id" placeholder="选择门店" readonly clearable @change="shopChangeFn" class="wb100">
                                <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                        :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_box el-overflow" v-if="reservationform.s_id != ''">
                        <el-form-item label="项目"  class="wb60 fl">
                            <el-select v-model="reservationform.item_pid" placeholder="请选择项目" readonly="" clearable @change="bigProjectChange" class="wb100">
                                <el-option v-for="(item , index) in bigProjectList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="item_id" v-if="reservationform.item_pid != ''" label-width="0" class="wb37 fl mal10">
                            <el-select v-model="reservationform.item_id" placeholder="选择下级项目类别" readonly clearable class="wb100">
                                <el-option v-for="(item , index) in smallProjectList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_box" v-if="reservationform.s_id != ''">
                        <el-form-item prop="adviserId" :label="$store.getters.roleName.adviser">
                            <el-select v-model="reservationform.adviserId" :placeholder="`选择${$store.getters.roleName.adviser}`" readonly clearable class="wb100">
                                <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name"
                                        :value="item.users_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_box">
                        <el-form-item prop="appointmentTime" label="到店时间">
                            <el-date-picker
                                v-model="reservationform.appointmentTime"
                                :clearable="false"
                                type="datetime"
                                class="wb100"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="请选择到店时间"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="row_box">
                        <el-form-item prop="content" label="备注">
                            <el-input placeholder="请输入备注" v-model="reservationform.content" clearable></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closelPop">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="addReservationFn">确 定</el-button>
                </template>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import { getList , appointmentCancel , appointmentPostAdd } from "@/chain/assets/api/marketing/marketing"

    import autoSearchClient from '@/chain/components/autocomplete/autoSearchClient'

    export default {
        name: "MarketingList",
        components: {
            autoSearchClient
        },
        data() {
            return {
                form: {},
                dateTime: [],
                condition: {
                    s_id:'',
                    development:'',
                    is_enterprise:'',
                    appointment_status:'0',
                    marketingCenter:1
                },// 查询条件
                developmentDisabled:false,
                demoList: [],                      // table数组
                pageSearch: getList,       // 分页查询api接口
                storeList:[],
                staffList:[],
                doctorList:[],
                bigProjectList:[],
                smallProjectList:[],
                reservationShow:false,
                userData:{},
                reservationform:{
                    s_id:'',
                    adviserId:'',
                    item_pid:'',
                    item_id:'',
                    content:'',
                    appointmentTime:'',
                    continue:0
                },
                 rules:{
                    s_id: [{ required: true, message: '请选择所属门店', trigger: 'change' }],
                    adviserId: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
                    appointmentTime: [{ required: true, message: '请选择到店时间', trigger: 'change' }],
                    item_id: [{ required: true, message: '请选择小类项目', trigger: 'change' }],
                },
                disabled:false,
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

            //选择门店之后
            shopChangeFn(){
                if(this.reservationform.s_id != ''){
                    this.doctorFn()
                    this.bigProjectFn()
                }
            },

            //医生助理列表
            doctorFn(){
                const that = this;
                that.$postRequest("/post/api/store/getStoreMembers",{
                    s_id:this.reservationform.s_id,
                    role_id:3,
                }).then(res => {
                    that.doctorList =res.data
                })
            },

            //意向项目-大类
            bigProjectFn(){
                const that = this;
                that.$postRequest("/post/api/store/getStoreItem",{
                    s_id:this.reservationform.s_id,
                    getItem:1,
                }).then(res => {
                    that.bigProjectList = res.data
                })
            },

            //项目小类切换
            bigProjectChange(){
                const that = this;
                that.reservationform.item_id = ''
                that.$postRequest("/post/api/store/getStoreItem",{
                    s_id:this.reservationform.s_id,
                    getItem:1,
                    p_id:that.reservationform.item_pid
                }).then(res => {
                    that.smallProjectList = res.data
                })
            },

            //预约
            addReservationFn(){
                this.$refs.form.validate((valid) => {
                if (valid) {
                    this.disabled = true;
                    let postData = this.reservationform
                    postData.customerId = this.userData.id
                    postData.marketingCenter = 1
                    appointmentPostAdd(postData).then(res => {
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '预约成功',
                                type: 'success',
                                onClose:()=>{
                                    this.reservationShow = false
                                    this.loadData()
                                    this.disabled = false;
                                }
                            });
                        }
                        else if(res.status == 40091){
                            this.$confirm("该客户今天已经预约，确认需要再次预约？", '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.reservationform.continue = 1
                                this.addReservationFn()
                                this.disabled = false
                            }).catch(() => {
                                this.disabled = false
                            });
                        }
                        else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false;
                        }
                    }).catch(error=>{
                        console.log("appointmentPostAdd no");
                        this.disabled = false;
                    })
                } 
                })
            },

            //关闭弹窗
            closelPop(){
                this.reservationform = {
                    s_id:'',
                    adviserId:'',
                    item_pid:'',
                    item_id:'',
                    content:'',
                    appointmentTime:''
                }
                this.reservationShow = false;
            },
            // 重置
            resetFn(){
               this.condition = {}
            },
          
            //搜索
            myChanged(data){
                this.condition.is_enterprise = data.kw
            },
            loadData() {
                this.$refs.demoTable.loadData()
            },


            //预约弹窗
            reservationFn(item){
                this.reservationShow = true;
                this.userData = item
            },
            //取消预约
            cancelTheReservationFn(id){
                this.$confirm('是否确认取消预约？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    appointmentCancel({
                        customer_id : id
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '已取消',
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
                    }).catch(res=>{
                        console.log("appointmentCancel no");
                    })
                });
            }
           

        },
        watch: {
         

        }

    }

</script>
<style lang="scss" scoped>
.MarketingList {
  margin: 20px;
  padding: 0 20px 20px 20px;
  background-color: #ffffff;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .operation {
    display: flex;
    align-items: center;
    em {
			width: 1px;
			height: 10px;
			background: #e5e5e5;
			margin: 0 .1rem;
    }
    a{
			cursor: pointer;
			color: #009688;
			font-size: 14px;
			&:last-child {
				
			}
			&:hover	{
				opacity: 0.7;
				text-decoration: underline;
			}
    }
    span{
			color: #C0C0C0;
			font-size: 14px;
    }
  }
}
</style>
<style>
.MarketingList .el-dialog .el-dialog__body{
    padding: 0 20px;
}
.MarketingList .el-dialog .el-dialog__header{
    padding-bottom: 10px;
}
.MarketingList .el-dialog .el-dialog__body .content .user{
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    padding:10px 0;
    margin-bottom: 10px;
}
.MarketingList .el-dialog .el-dialog__body .content .user h3{
    font-weight: normal;
    display: flex;
    align-items: flex-end;
}
.MarketingList .el-dialog .el-dialog__body .content .user h3 b{
    font-weight: normal;
    color: #333333;
    font-size: 18px;
}
.MarketingList .el-dialog .el-dialog__body .content .user h3 span{
    font-weight: normal;
    color: #999999;
    font-size: 14px;
    padding-left: 15px;
}
.MarketingList .el-dialog .el-dialog__body .content .user p{
    color: #666666;
    font-size: 14px;
    padding-top: 5px;
}
</style>
