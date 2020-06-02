<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">回访列表</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">
                    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                        <el-input v-model="condition.keyword" placeholder="请输入顾客姓名" class="fl mar10 w184px"></el-input>
                        <div class="bd-gray bd-a1 myDatePicker w460px fl mar10">
                            <span class="pal10 mar10"> 回访生成时间 </span>
                            |
                            <el-date-picker
                                    v-model="dateTime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>

                            <div class="clear0"></div>

                        </div>

                        <el-select class="fl mar10 w184px" v-model="condition.status" placeholder="选择状态" readonly clearable>
                            <el-option label="全部状态" value></el-option>
                            <el-option label="未完成" value="0"></el-option>
                            <el-option label="已完成" value="1"></el-option>
                        </el-select>

                        <el-button type="primary" @click="loadData" class="h32px fl mar10">搜索</el-button>

                    </el-form>

                    <div class="clear3"></div>

                    <base-list ref="demoTable" :condition="condition"
                                              :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                    <el-table slot="list" :data="demoList" border>

                        <el-table-column align="left" label="状态">
                            <template slot-scope="scope">
                                <template v-if="scope.row.status == 0">
                                    <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                        未完成
                                    </p>
                                </template>
                                <template v-else-if="scope.row.status == 1">
                                    <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                        已完成
                                    </p>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="回访生成时间">
                            <template slot-scope="scope">
                                {{ $base.dateTimeToDate(scope.row.created_at, 'date')}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="姓名">
                            <template slot-scope="scope">
                                {{scope.row.customer.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="电话">
                            <template slot-scope="scope">
                                {{scope.row.customer.mobile}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" :label="$store.getters.roleName.adviser">
                            <template slot-scope="scope">
                                {{scope.row.customer.adviser.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="到诊渠道">
                            <template slot-scope="scope">
                                {{scope.row.customer.channel.name}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="回访完成时间">
                            <template slot-scope="scope">
                                {{ $base.dateTimeToDate(scope.row.review_time, 'date')}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="回访结果">
                            <template slot-scope="scope">
                                <template v-if="scope.row.status == 0">
                                    <p class="fc-green2 pointer" @click="openRevisit(scope.row, false)">填写回访</p>
                                </template>
                                <template v-else>
                                    <p class="fc-green2 pointer" @click="openRevisit(scope.row, true)">查看回访</p>
                                </template>
                            </template>
                        </el-table-column>
                    </el-table>
                </base-list>

                <div class="clear0"></div>

            </div>
        </div>

        <!--      填写回访内容      -->
        <el-dialog :title="isShow ? '查看回访内容' : '填写回访内容'" :visible.sync="dialogRevisit" width="660px" class="myDialog">

            <div class="clear0 bd-gray bd-b1"></div>

            <template v-if="!isShow">
                <el-form :model="form" :rules="rules" label-width="120px" ref="myForm">

                    <!--<div class="clear2 bd-gray bd-t1"></div>-->

                    <p>
                        {{customer.name}}
                        <i v-if="customer.sex.value == 0" class="iconfont iconnv fc-red"></i>
                        <i v-else class="iconfont iconnan fc-blue13"></i>
                    </p>

                    <div class="clear2"></div>

                    <p>
                        <span class="fl">电话：{{customer.mobile}}</span>
                        <span class="fl mal20">年龄：{{customer.age}}</span>
                    </p>

                    <div class="clear2 bd-gray bd-b1"></div>

                    <div class="clear2"></div>

                    访问结果

                    <div class="clear2"></div>

                    <div class="w150px h30px lh30px text-center fl mar20 pointer" :class="form.isDoor == 1 ? 'bd-green2 bd-a1 fc-green2' : 'bd-gray bd-a1 fc-gray3'" @click="form.isDoor = 1">
                        愿意上门
                    </div>
                    <div class="w150px h30px lh30px text-center fl mar20 pointer" :class="form.isDoor == 2 ? 'bd-green2 bd-a1 fc-green2' : 'bd-gray bd-a1 fc-gray3'" @click="form.isDoor = 2">
                        不愿意上门
                    </div>

                    <div class="clear2 bd-gray bd-b1"></div>

                    <div class="clear2"></div>

                    <template v-if="form.isDoor == 1">
                        <div class="wb50 fl">
                            <el-form-item label="所属门店" label-width="69px">
                                <el-input v-model="customer.store.name" disabled class="w184px fr"></el-input>
                            </el-form-item>
                        </div>

                        <div class="wb50 fl">
                            <el-form-item :label="$store.getters.roleName.adviser" prop="adviserId">
                                <el-select v-model="form.adviserId" :placeholder="`请选择${$store.getters.roleName.adviser}`" clearable class="w184px fr">
                                    <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="wb50 fl">
                            <el-form-item label="项目" label-width="41px">
                                <el-select v-model="form.itemsPId" placeholder="选择项目" readonly clearable @change="changeProject" class="w184px fr">
                                    <el-option v-for="item in projectList" :key="item.id" :label="item.name"
                                               :value="item.id"></el-option>
                                </el-select>
    <!--                            <el-cascader v-model="form.value" :options="$store.getters.projectCascaderData" class="wb100" @change="changed"></el-cascader>-->
                                <!--                        <el-cascader v-model="form.value" :options="$store.getters.channelCascaderData"></el-cascader>-->
                            </el-form-item>
                        </div>
                        <div class="wb50 fl">
                            <el-form-item label="二级项目">
                                <el-select v-model="form.itemsId" placeholder="选择二级项目" readonly clearable class="w184px fl">
                                    <el-option v-for="item in projectList2" :key="item.id" :label="item.name"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="clear0"></div>

                        <div class="wb50 fl">
                            <el-form-item label="到店时间" prop="appointmentTime" label-width="79px">
                                <el-date-picker
                                        class="w184px fr"
                                        v-model="form.appointmentTime"
                                        :clearable="false"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        value-format="yyyy-MM-dd HH:mm"
                                        placeholder="请选择到店时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>

                        <div class="wb50 fl">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.remarks" class="wb100" placeholder="请输入备注"></el-input>
                            </el-form-item>
                        </div>
                    </template>

                    <template v-else>
                        <div class="wb100 fl">
                            <el-form-item label="原因" prop="remarks" label-width="50px">
                                <el-input type="textarea" v-model="form.remarks" class="wb100" placeholder="请输入原因"></el-input>
                            </el-form-item>
                        </div>
                    </template>

                    <div class="clear2"></div>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogRevisit = false">取 消</el-button>
                    <template v-if="disabled">
                        <el-button type="primary" disabled>提交中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="submit">提交回访</el-button>
                    </template>
                </div>
            </template>

            <template v-else>

                <el-form :model="form" :rules="rules" label-width="100px" ref="myForm">

                    <div class="wb100 relative">

                        <p>
                            {{customer.customer.name}}
                            <i v-if="customer.customer.sex.value == 0" class="iconfont iconnv fc-red"></i>
                            <i v-else class="iconfont iconnan fc-blue13"></i>
                        </p>

                        <div class="clear2"></div>

                        <p>
                            <span class="fl">电话：{{customer.customer.mobile}}</span>
                            <span class="fl mal20">年龄：{{customer.customer.age}}</span>
                        </p>

                        <div class="w150px h30px lh30px text-center mar20 bd-green2 bd-a1 fc-green2 absolute bg-green7" style="right: 15px; top:10px;" v-if="customer.review.is_door == 1">
                            愿意上门
                        </div>
                        <div class="w150px h30px lh30px text-center mar20 bd-gray bd-a1 fc-gray3 absolute bg-white1" style="right: 15px; top:10px;" v-else>
                            不愿意上门
                        </div>

                        <div class="clear2 bd-gray bd-b1"></div>

                        <div class="clear2"></div>

                        <template v-if="customer.review.is_door == 1">
                            <div class="wb50 fl">
                                <el-form-item label="所属门店">
                                    <el-input :value="customer.appointment.store" disabled class="wb100"></el-input>
                                </el-form-item>
                            </div>

                            <div class="wb50 fl">
                                <el-form-item :label="$store.getters.roleName.adviser">
                                    <el-input :value="customer.appointment.adviser" :readonly="true" class="wb100"></el-input>
                                </el-form-item>
                            </div>

                            <div class="wb50 fl">
                                <el-form-item label="项目">
                                    <el-input :value="customer.appointment.items" :readonly="true" class="wb100"></el-input>
                                </el-form-item>
                            </div>

                            <div class="wb50 fl">
                                <el-form-item label="到店时间">
                                    <el-input :value="customer.appointment.storeTime" :readonly="true" class="wb100"></el-input>
                                </el-form-item>
                            </div>

                            <div class="wb100 fl" v-if="customer.appointment.content">
                                <el-form-item label="备注">
                                    <el-input type="textarea" :value="customer.appointment.content" class="wb100" :readonly="true" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </div>
                        </template>

                        <template v-else>
                            <div class="wb100 fl" v-if="customer.review.remarks">
                                <el-form-item label="原因">
                                    <el-input type="textarea" :value="customer.review.remarks" class="wb100" :readonly="true" placeholder="请输入原因"></el-input>
                                </el-form-item>
                            </div>
                        </template>

                        <div class="clear2"></div>

                    </div>
                </el-form>

            </template>

        </el-dialog>

    </div>
</template>

<script>

    import { reviewList, reviewComplete, reviewCompleteExhibition, reviewSee, getStoreItem } from "@/chain/assets/api/task/revisitList"

    import autoSearchClient from "@/chain/components/autocomplete/autoSearchClient"

    import dateSlot from '@/chain/components/date/dateSlot'

    export default {
        name: "RevisitList",
        components: {
            autoSearchClient, dateSlot
        },
        data() {
            return {
                form: {
                    isDoor: 1,
                    itemsPId: '',
                    itemsId: '',
                    continue:0
                },
                dialogRevisit: false,
                dateTime: [],
                condition: {
                    development:'',
                },// 查询条件
                demoList: [],                      // table数组
                pageSearch: reviewList,       // 分页查询api接口
                options: [],
                disabled: false,
                doctorList:[],
                customer: {
                    sex: {},
                    store: {},
                    adviser: {},
                    appointment: {},
                },
                rules:{
                    adviserId: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
                    appointmentTime: [{ required: true, message: '请选择到店时间', trigger: 'change' }],
                    remarks: [{ required: true, message: '原因必填', trigger: 'change' }],
                },
                projectList: [],
                projectList2: [],
                isShow: false,
                value1: '',
            }
        },
        mounted() {

        },
        methods: {

            changeProject(){
                this.form.itemsId = ''
                getStoreItem({ s_id: this.form.storeId, p_id: this.form.itemsPId }).then(res=>{
                    if(res.status == 0){
                        this.projectList2 = res.data
                    }
                })
            },

            openRevisit(row, flag){
                this.dialogRevisit = true

                this.form = {
                    isDoor: 1,
                    itemsPId: '',
                    itemsId: '',
                }

                this.isShow = flag

                if(flag){
                    reviewSee({
                        reviewId: row.id
                    }).then(res=>{
                        if(res.status == 0){
                            this.customer = res.data
                        }
                    })
                }else{
                    reviewCompleteExhibition({
                        customerId: row.customer_id
                    }).then(res=>{
                        if(res.status == 0){
                            this.customer = res.data
                            this.form.storeId = res.data.store.id
                            this.form.customer_id = row.customer_id
                            this.form.reviewId = row.id
                            this.$postRequest("/post/api/store/getStoreMembers",{
                                role_id: 3,
                                s_id: res.data.store.id
                            }).then(res => {
                                this.doctorList = res.data
                            })

                            getStoreItem({ s_id: res.data.store.id, getItem: 1, }).then(res=>{
                                if(res.status == 0){
                                    this.projectList = res.data
                                }
                            })
                        }
                    })
                }

                // this.row = row
            },

            myChanged(data){
                this.condition.keyword = data.kw
            },

            changed(){
                if(this.form.value[0])
                    this.form.itemsPId = this.form.value[0]
                if(this.form.value[1])
                    this.form.itemsId = this.form.value[1]
            },

            loadData(){
                this.$refs.demoTable.loadData()
            },

            submit(){
                this.$refs.myForm.validate((valid) => {
                    if (valid) {
                        this.disabled = true;
                        reviewComplete(this.form).then(res=>{
                            if(res.status == 0){
                                this.$message({
                                    message: "填写回访成功!",
                                    type: "success",
                                    onClose: () => {
                                        this.dialogRevisit = false
                                        this.disabled = false;
                                        this.loadData();
                                    }
                                });
                            }
                            else if(res.status == 40091){
                                this.$confirm("该客户今天已经预约，确认需要再次预约?", '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.form.continue = 1
                                    this.submit()
                                    this.disabled = false
                                }).catch(() => {
                                    this.disabled = false
                                });
                            }
                            else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })
                                this.disabled = false;
                            }
                        })
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                        this.disabled = false;
                    }
                })

            },

        },
        watch: {
            dateTime(newData,oldData){
                this.condition.startTime = this.$base.dateTimeToDate(newData[0],"startTime")
                this.condition.endTime = this.$base.dateTimeToDate(newData[1],"endTime")
            },

        }

    }
</script>
<style lang="scss" scoped>
</style>
