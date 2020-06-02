<template>
  <div class="MakeAnAppointmentEid" :style="'min-height: '+minHeight+'px;'">
        <div class="titles">
            <span>{{pagesTitle}}</span>
        </div>
        <div class="box" :style="'min-height: '+boxMaxHeight+'px;'">
            <div class="box_titles">
                <div>
                    <p>{{userData.name}}</p>
                    <span>{{userData.mobile}}</span>
                </div>
            </div>
            <div class="box_right">
                
                <div class="message_box">
                    <div class="message">
                        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="项目"  class="wb60 fl">
                                        <el-select v-model="form.projectOne" placeholder="请选择项目" readonly="" clearable @change="form.projectTow = ''">
                                            <!-- <el-option key label="全部项目" value></el-option> -->
                                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                                        :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  prop="projectTow" v-if="form.projectOne" label-width="0" class="wb38 fr">
                                        <el-select v-model="form.projectTow" placeholder="请选择下级项目" readonly="" clearable>
                                            <el-option v-for="item in $store.getters.projectList2Map(form.projectOne)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140">
                                <el-col :span="24">
                                    <el-form-item label="到店时间" prop="datetime">
                                        <el-date-picker
                                            v-model="form.datetime"
                                            :clearable="false"
                                            type="datetime"
                                            class="wb100"
                                            format="yyyy-MM-dd HH:mm"
                                            placeholder="选择日期时间"
                                            @change='datetimeChange'>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" class="row_box">
                                <el-col :span="24">
                                    <el-form-item :label="$store.getters.roleName.adviser" prop="counselor">
                                        <el-select v-model="form.counselor" :placeholder="'请选择'+$store.getters.roleName.adviser" readonly="" clearable class="wb100" :disabled="roleChoosable">
                                            <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                                    :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" class="row_box">
                                <el-col :span="24">
                                    <el-form-item :label="$store.getters.roleName.technician" prop="technician">
                                        <el-select v-model="form.technician" :placeholder="`请选择${$store.getters.roleName.technician}`" readonly="" clearable class="wb100" @change='technicianChange'>
                                            <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                                    :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="140" v-if="form.technician">
                                <el-col :span="24">
                                    <el-form-item label="治疗时长" prop="duration">
                                        <el-input type='number' min='1' v-model.trim="form.duration" placeholder="请输入治疗时长">
                                            <template slot="append">分钟</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">
                                        <el-input type="textarea" v-model.trim="form.remark" placeholder="请输入备注" clearable rows="8" class="lh40px"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="clear4"></div>
                            <div class="btn fr"><el-button type="primary" @click="handleSubmit">提交预约</el-button></div>
                        </el-form>
                    </div>
                    
                    <div class="timer">
                        <Schedule :scheduleData='scheduleData' v-show="form.technician && form.datetime"></Schedule>
                    </div>

                </div>
            </div>
        </div>


  </div>
</template>
<script>

import { getInfo , appointmentOccupy , appointmentPostAdd } from "@/shop/assets/api/flow/makeAnAppointmentList"
import Schedule from '@/shop/components/home/Schedule'
export default {
  name: "MakeAnAppointmentEid",
  data() {
    return {
        roleChoosable:false,
        pagesTitle:'跨店预约',
        minHeight:0,
        boxMaxHeight:0,
        customerId:'',
        userData:'',
        form:{
            projectOne:'',
            projectTow:'',
            datetime:'',
            counselor:'',
            technician:'',
            duration:'',
            remark:'',
            continue:""
        },
        rules:{
            datetime: [{ required: true, message: '请选择到店时间', trigger: 'change' }],
            projectTow: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            counselor: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            duration: [{ required: true, message: '请输入治疗时长', trigger: 'blur' }],
            remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        scheduleData:[],

    };
  },
  components: {Schedule},
  methods: {
  
    
    //美容师占用时间条
    articleTime(){
        let postData = {}
        if(this.form.datetime.indexOf(' ') == -1){
            postData = {
                technicianId : this.form.technician,
                appointmentTime : this.form.datetime,
            }
        }
        else{
            postData = {
                technicianId : this.form.technician,
                appointmentTime : this.form.datetime.split(' ')[0],
            }
        }

        appointmentOccupy(postData).then(res => {
            if(res.status == 0){
                this.scheduleData = res.data;
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
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
    },

    //美容师切换
    technicianChange(value){
        this.form.technician = value;
        if(this.form.technician != undefined && this.form.datetime != null)
        {
            if(this.form.technician != '')this.articleTime()
        }
    },

    //到店时间
    datetimeChange(value){
        if(value != null)
        {
            let tmp = this.$base.dateTimeToDate(value,'date');
            this.form.datetime = tmp;
            if(this.form.technician != undefined)
            {
                if(this.form.technician != '')this.articleTime()
                
            }
        }
    },

    //新增提交
    handleSubmit() {
        if( this.form.duration != '' && this.form.duration <= 0){
            this.$message({
                showClose: true,
                message: '治疗时间不能小于1',
                type: 'warning',
            });
            return;
        }
        if(this.customerDataActive == ''){
            this.$message({
                showClose: true,
                message: "请选择客户",
                type: 'error',
            });
        }
        else{
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.form.technician == '')this.form.duration = '';
                    let postData = {
                        customerId : this.customerId,
                        itemPid : this.form.projectOne,
                        itemId : this.form.projectTow,
                        appointmentTime : this.form.datetime,
                        content : this.form.remark,
                        adviserId : this.form.counselor,
                        technicianId : this.form.technician,
                        yuyueOrderTime : this.form.duration,
                        continue: this.form.continue
                    }
                    appointmentPostAdd(postData).then(res => {
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '新增成功',
                                type: 'success',
                                onClose:()=>{
                                    this.$router.push({  
                                        path: 'MakeAnAppointmentList',   
                                    })
                                }
                            });
                        }
                        else if(res.status == 40091){
                            this.$confirm("该客户今天已经预约，确认需要再次预约？", '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.form.continue = 1
                                this.handleSubmit()
                                this.disabled = false
                            }).catch(() => {
                                this.disabled = false
                            });
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: res.msg,
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
            })
        }
    },
    getCustomers(){
        let postData = {
            customerId : this.customerId,
            crossStore:1
        }
        getInfo(postData).then(res => {
            if(res.status == 0) {
                this.userData = res.data
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
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
    this.minHeight = window.innerHeight - 124;
    this.boxMaxHeight = window.innerHeight - 280;
    this.customerId = this.$route.query.customerId;
    this.getCustomers()
    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
        this.form.counselor = usersId.users_id
    }else{
      this.roleChoosable = false;
    }
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
.MakeAnAppointmentEid{
    margin: 20px;
    padding: 0 20px;
    background: #fff;
    .titles{
        border-bottom: 1px solid #E5E5E5;
        height: 50px;
        display: flex;
        align-items: center;
        span{
            flex: 1;
            font-size: 16px;
            color: #333;
        }
    }
    .box{
        .box_titles{
            background: #F0FDFF;
            div{
                width: 60%;
                margin: 0 auto;
                display: flex;
                height: 70px;
                align-items: center;
                p{
                    padding-left: .4rem;
                }
                p,span{
                    font-size: 22px;
                    color: #0DC9E5;
                }
                span{
                    padding-left: .4rem;
                }
            }
        }
        .box_right{
            width: 60%;
            margin: 0 auto;
            .message_box{
                margin: .4rem auto 0;
                display: flex;
                .message{
                    width: 4.5rem;
                    .el-row{
                        margin-bottom: .1rem;
                    }
                }
                .timer{
                    flex: 1;
                    margin-left: 1rem;
                    display: flex;
                    height: 460px;
                }
            }
        }
    }
   
}
</style>
    

<style>
.MakeAnAppointmentEid input[type='number']{
    padding-right: 0 !important;
}
</style>