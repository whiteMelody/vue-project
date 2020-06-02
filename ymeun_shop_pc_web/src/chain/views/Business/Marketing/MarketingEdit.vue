<template>
  <div class="MarketingEdit" :style="'min-height: '+minHeight+'px;'">

        <h3>修改客户资料</h3>
        <div class="clear-f2"></div>

      <div class="wb50 center">
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
 <!-- 
            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户性别" prop="sex">
                        <template v-for="[key, val] in _dictGender">
                            <el-radio v-model="form.sex" :label="key">{{val}}</el-radio>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
          <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="客户电话" prop="mobile">
                        <el-input type="text" v-model.trim="form.mobile" placeholder="请输入客户电话号码" clearable maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发人员" prop="development">
                        <el-select v-model="form.development" placeholder="请选择开发人员" readonly="" clearable class="wb100">
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                       :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择该客户将没有开发人员</em>
                </el-col>
            </el-row>

            <el-row :gutter="140" v-if="sId != 0">
                <el-col :span="12">
                    <el-form-item label="顾问" prop="adviser_id">
                        <el-select v-model="form.adviser_id" placeholder="请选择顾问" readonly="" clearable class="wb100" :disabled="roleChoosable">
                            <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择系统会自动轮排给下一个顾问</em>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目"  class="wb60 fl">
                        <el-select v-model="form.item_pid" placeholder="请选择项目" readonly="" clearable @change="bigProjectChange">
                            <el-option v-for="item in bigProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="item_id" v-if="form.item_pid" label-width="0" class="wb38 fr">
                        <el-select v-model="form.item_id" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="item in smallProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

             <el-row :gutter="140" v-if="sId != 0">
                <el-col :span="12">
                    <el-form-item  prop="channel_pid" label="来源渠道"  class="wb60 fl">
                        <el-select v-model="form.channel_pid" placeholder="请选择渠道" readonly clearable @change="bigChannelChange">
                           <el-option v-for="item in bigChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="channel_id" v-if="form.channel_pid" label-width="0" class="wb38 fr">
                        <el-select v-model="form.channel_id" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="item in smallChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                
            </el-row> -->
            <div class="row">
                <div class="col">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="客户性别" prop="sex">
                        <template v-for="[key, val] in _dictGender">
                            <el-radio v-model="form.sex" :label="key">{{val}}</el-radio>
                        </template>
                    </el-form-item>
                </div>
           
            </div>
            <div class="row">
                <div class="col">
                        <el-form-item label="客户电话" prop="mobile">
                            <el-input type="text" v-model.trim="form.mobile" placeholder="请输入客户电话号码" clearable maxlength="11"></el-input>
                        </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="开发人员" prop="development">
                        <el-select v-model="form.development" placeholder="请选择开发人员" readonly="" clearable class="wb100" :disabled="developmentDisabled" disabled>
                            <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                    :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">开发人员选择后不可再次修改</em>
                </div>
            </div>
            <div class="row" v-if="sId != 0">
                <div class="col">
                    <el-form-item :label="$store.getters.roleName.adviser" prop="adviser_id">
                        <el-select v-model="form.adviser_id" :placeholder="`请选择${$store.getters.roleName.adviser}`" readonly="" clearable class="wb100" :disabled="roleChoosable">
                            <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择系统会自动轮排给下一个{{$store.getters.roleName.adviser}}</em>
                </div>
                <div class="col">
                    <el-form-item label="项目"  class="wb60 fl">
                        <el-select v-model="form.item_pid" placeholder="请选择项目" readonly="" clearable @change="bigProjectChange">
                            <el-option v-for="item in bigProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="item_id" v-if="form.item_pid" label-width="0" class="wb38 fr">
                        <el-select v-model="form.item_id" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="item in smallProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <div class="row">
                <!-- <div class="col" v-if="form.channel_id != 0">
                    <el-form-item  prop="channel_pid" label="来源渠道"  class="wb60 fl">
                        <el-select v-model="form.channel_pid" placeholder="请选择渠道" readonly clearable @change="bigChannelChange" disabled>
                           <el-option v-for="item in bigChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="channel_id" v-if="form.channel_pid" label-width="0" class="wb38 fr">
                        <el-select v-model="form.channel_id" placeholder="选择下级项目类别" readonly clearable disabled>
                            <el-option v-for="item in smallChannelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="col" v-else>
                    <el-form-item label="来源渠道" prop="channelName">
                        <el-input type="text" v-model.trim="form.channelName" placeholder="来源渠道" disabled></el-input>
                    </el-form-item>
                </div> -->
                
                <div class="col" v-if="form.channel_id != 0">
                    <el-form-item  prop="channel_pid" label="来源渠道"  class="wb64 fl">
                        <p class="bd-a1 bd-gray bg-gray fc-gray2 radius1 text-over-hidden1 pal15 par5 h32px">{{form.channelPName}}</p>
                    </el-form-item>
                    <el-form-item prop="channel_id" v-if="form.channel_pid" label-width="0" class="wb35 fr">
                        <p class="bd-a1 bd-gray bg-gray fc-gray2 radius1 text-over-hidden1 pal15 par5 h32px">{{form.channelName}}</p>
                    </el-form-item>
                </div>
                <div class="col" v-else>
                    <el-form-item label="来源渠道" prop="channelName">
                        <el-input type="text" v-model.trim="form.channelName" placeholder="来源渠道" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="col" v-if="sId != 0">
                    <el-form-item label="门店" prop="storeName">
                        <el-input type="text" v-model.trim="form.storeName" placeholder="门店" disabled></el-input>
                    </el-form-item>
                </div>
            </div>
            <!-- <div class="row" v-if="IntroducerListAllowed">
                <div class="col">
                    <el-form-item label="介绍人" prop="introducer_name">
                        <el-input type="text" v-model.trim="form.introducer_name" placeholder="介绍人" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="介绍人电话" prop="introducer_mobile">
                        <el-input type="text" v-model.trim="form.introducer_mobile" placeholder="介绍人电话" disabled></el-input>
                    </el-form-item>
                </div>
            </div> -->

            <el-row>
                <el-col :span="24">
                    <el-form-item label="客户备注" prop="complaint">
                        <el-input type="textarea" v-model.trim="form.complaint" placeholder="请输入客户备注" clearable rows="6" class="lh40px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="clear4"></div>

        
            <div class="btn">
                <el-button @click="$router.go(-1)">取消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确认修改</el-button>
                </template>
            </div>
        </el-form>
      </div>
  </div>
</template>
<script>

import { PUBLIC_PHONE } from "@/chain/utils/Reg";
import { addUser } from '@/chain/assets/api/marketing/marketing'
import { postEditCustomer , getEditCustomer } from '@/chain/assets/api/client/client'
import { getProgramList } from "@/chain/assets/api/common/common";

export default {
  name: "MarketingEdit",
  data() {
    return {
        id:this.$route.query.id,
        sId:0,
        roleChoosable:false,
        disabled:false,
        form:{
            name:'',
            s_id:'',
            sex:'0',
            development:'',
            complaint:"",
            mobile:"",
            adviser_id:'',
            item_pid:'',
            item_id:'',
            channel_pid:'',
            channel_id:'',
            channelName:'',
            storeName:"",
            introducerMobile:'',
            introducerValue:''
        },
        bigProjectList:[],
        smallProjectList:[],
        bigChannelList:[],
        smallChannelList:[],
        doctorList:[],
        staffList:[],
        rules:{
            mobile: [{ required: true, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            name: [{ required: true, message: '请输入客户姓名', trigger: 'change' }],
            sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
            development: [{ required: true, message: '请选择开发人员', trigger: 'change' }],
            channel_pid: [{ required: true, message: '请选择渠道', trigger: 'change' }],
            channel_id: [{ required: true, message: '请选择完整渠道', trigger: 'change' }],
            item_id: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            adviser_id: [{ required: true, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            channelName: [{ required: true, message: '请输入备注', trigger: 'blur' }],
            complaint: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        minHeight:0,
        developmentDisabled:false,
        IntroducerListAllowed:false,
    };
  },
  components: {},
  methods: {

    // 提交表单
    handleSubmit() {

        this.$refs.form.validate((valid) => {
            if (valid) {
                this.editUserFn()
            } 
        })
    },

    editUserFn(){
        let postData = this.form;
        this.disabled = true;
        postEditCustomer(postData).then(res => {
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                    onClose:()=>{
                        this.$router.go(-1)
                    }
                });
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
                this.disabled = false;
            }
        }).catch(error=>{
            console.log("postEditCustomer no");
            this.disabled = false;
        })
    },

    //医生助理列表
    doctorFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreMembers",{
        role_id:3,
        s_id:this.sId
      }).then(res => {
        that.doctorList =res.data 
      })
    },

    //开发人员
    membersListFn(){
      const that = this;
      that.$postRequest("/post/api/members/membersListByChain",{}).then(res => {
        that.staffList =res.data 
      })
    },

    //意向项目-大类
    bigProjectFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreItem",{
        getItem:1,
        s_id:this.sId
      }).then(res => {
        that.bigProjectList = res.data
      })
    },
    //渠道-大类
    // bigChannelFn(){
    //   const that = this;
    //   that.$postRequest("/post/api/store/getStoreChannel",{
    //     getChannel:1,
    //     s_id:this.sId,
    //     chain:1
    //   }).then(res => {
    //     that.bigChannelList = res.data
    //   })
    // },

    //项目小类切换
    bigProjectChange(){
      const that = this;
      that.form.item_id = ''
      that.$postRequest("/post/api/store/getStoreItem",{
        s_id:this.sId,
        getItem:2,
        p_id:that.form.item_pid
      }).then(res => {
        that.smallProjectList = res.data
      })
    },

    // 渠道小类切换
    // bigChannelChange(){
    //   const that = this;
    //   that.form.channel_id = ''
    //   that.$postRequest("/post/api/store/getStoreChannel",{
    //     s_id:this.sId,
    //     getChannel:2,
    //     chain:1,        
    //     p_id:that.form.channel_pid
    //   }).then(res => {
    //     that.smallChannelList = res.data
    //   })
    // },

    getEditCustomerFn(){
        getEditCustomer({id:this.id}).then(res => {
            if(res.status == 0){
                this.sId = res.data.data.s_id;
                this.form.name = res.data.data.name
                this.form.s_id = res.data.data.s_id;
                this.form.sex = res.data.data.sex_id+"";
                this.form.development = res.data.data.development
                this.form.complaint = res.data.data.complaint
                this.form.mobile = res.data.data.mobile
                this.form.id = this.id
                if (res.data.introducer) {
                    this.form.introducerMobile = res.data.introducer.mobile
                    this.form.introducerValue = res.data.introducer.name
                }
                // this.bigChannelFn()
                if(res.data.data.channel_pid != 0){
                    this.form.channel_pid = res.data.data.channel_pid
                    this.form.channelName = res.data.data.channelName
                    this.form.channelPName = res.data.data.channelPName
                    // this.bigChannelChange()
                    this.form.channel_id = res.data.data.channel_id
                }
                else{
                    this.form.channelName = res.data.data.channelName
                }
                if(res.data.data.s_id != 0){
                    this.doctorFn()
                    this.bigProjectFn()
                    this.form.adviser_id = res.data.data.adviser_id
                    this.form.storeName = res.data.data.storeName
                    
                    if(res.data.data.item_pid != 0){
                        this.form.item_pid = res.data.data.item_pid
                        this.bigProjectChange()
                        this.form.item_id = res.data.data.item_id
                    }
                }
                
            }
        }).catch(error=>{
            console.log("getEditCustomer no");
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
    this.minHeight = window.innerHeight - 144;


    this.getEditCustomerFn()
  
    if(this.$store.getters.currentUser.is_admin == 0){
        // this.form.development = this.$store.getters.currentUser.users_id
        this.developmentDisabled = true;
    }
    this.membersListFn()


    getProgramList().then(res => {
        if (res.status == 0) {
            if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
        }
    }).catch(error=>{
        console.log("getProgramList no");
    })

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
.MarketingEdit{
    margin: 20px;
    padding: 0 20px 20px;
    background: #fff;
    h3{
        font-size: 14px;
        color: #333;
        line-height: 40px;
        font-weight: normal;
    }
    .center{
        margin: .7rem auto 0;
        width: 80%;
        .el-row{
            margin-bottom: .1rem;
            .stext{
                padding-left: 120px;
                font-style: normal;
                font-size:12px;
                font-weight:500;
                color: #999;
                position: relative;
                top:0px;
            }
        }
        .row{
            display: flex;
            .col{
                width: 50%;
                .stext{
                    padding-left: 120px;
                    font-style: normal;
                    font-size:12px;
                    font-weight:500;
                    color: #999;
                    position: relative;
                    top:0px;
                }
                
            }
        }
        .row_box{
            margin-bottom: .1rem;
        }
    }
    .btn{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
<style>
.MarketingEdit textarea{
    resize: none !important;
}
.MarketingEdit .el-form-item__content .el-select,.MarketingEdit .el-form-item__content .el-select input{
    width: 100% !important;
}
</style>



