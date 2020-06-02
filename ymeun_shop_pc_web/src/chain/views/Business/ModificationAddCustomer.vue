<template>
  <div class="ModificationAddCustomer" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="titles">修改顾客</div>
    <div class="clear-f2"></div>
    <ul class="content" v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
        <div class="row">
          <div class="col">
              <el-form-item label="客户类型" prop="customer_type">
                <el-radio v-model="form.customer_type" label="1">正式客户</el-radio>
                <el-radio v-model="form.customer_type" label="0">备用客户</el-radio>
              </el-form-item>
          </div>
          <div class="col">
              <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入姓名" clearable/>
              </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="form.sex" label="0">女</el-radio>
                <el-radio v-model="form.sex" label="1">男</el-radio>
              </el-form-item>
          </div>
          <div class="col">
              <el-form-item label="电话" prop="mobile">
                <el-input type="text" v-model="form.mobile" placeholder="请输入电话" clearable/>
              </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <el-form-item label="门店" prop="storeName">
                <el-input type="text" v-model="form.storeName" placeholder="请输入门店" clearable disabled />
              </el-form-item>
          </div>
          <div class="col">
              <el-form-item label="所属医生助理" prop="adviser_id">
                <el-select v-model="form.adviser_id" placeholder="请选择医生助理" readonly clearable class="wb100">
                  <el-option
                    v-for="item in doctorList"
                    :key="item.users_id"
                    :label="item.name"
                    :value="item.users_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <em class="stext">不选择系统会自动轮排给下一个医生助理</em>
          </div>
        </div>
        <div class="row">
          <div class="col">
              <div class="select_box">
                  <el-form-item label="项目"  class="wb68 fl">
                      <el-select v-model="form.item_pid" placeholder="请选择项目" readonly="" clearable @change="bigProjectChange">
                        <el-option v-for="item in bigProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item  prop="item_id" v-if="form.item_pid" label-width="0" class="wb30 fr">
                      <el-select v-model="form.item_id" placeholder="选择下级项目类别" readonly clearable>
                        <el-option v-for="item in smallProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
              </div>
          </div>
          <div class="col">
            <div class="select_box">
                <el-form-item prop="channelPName" label="渠道"  class="wb68 fl">
                    <el-input type="text" v-model="form.channelPName" clearable disabled />
                </el-form-item>
                <el-form-item prop="channel_id" label-width="0" class="wb30 fr">
                    <el-input type="text" v-model="form.channelName" clearable disabled />
                </el-form-item>
            </div>
            <!-- <em class="annotation">注：客户来源渠道一经选择，不可再次修改，请确认该客户的渠道选择正确</em> -->
          </div>
        </div>
        <div class="row" v-if="IntroducerListAllowed">
          <div class="col">
              <el-form-item label="介绍人" prop="introducerName">
                <el-input type="text" v-model="form.introducerName" clearable disabled />
              </el-form-item>
          </div>
          <div class="col" v-if="form.s_id != ''">
              <el-form-item label="介绍人电话" prop="introducerMobile">
                <el-input type="text" v-model="form.introducerMobile" clearable disabled />
              </el-form-item>
          </div>
        </div>
        <div class="row">
          <el-form-item label="客户备注" prop="complaint" class="wb100">
            <el-input type="textarea" v-model.trim="form.complaint" placeholder="请输入客户备注" clearable rows="6" class="lh40px wb100"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </ul>
    <div class="btns">
      <el-button @click="Backoff">取消</el-button>
      <el-button v-if="btnsOn" type="primary" @click="postAddCustomerFn">确定修改</el-button>
      <el-button v-else type="primary" disabled>正在提交请稍后</el-button>
    </div>
  </div>
</template>
<script>
import { getProgramList } from "@/chain/assets/api/common/common";
import { PUBLIC_PHONE } from "@/chain/utils/Reg";
export default {
  name:'ModificationAddCustomer',
  data(){
    return{
      boxMaxHeight:0,
      userId:"",
      form:{
        customer_type:"",
        name:"",
        sex:"",
        mobile:"",
        storeName:"",
        s_id:"",
        adviser_id:"",
        item_pid:"",
        item_id:"",
        channelPName:"",
        channelName:"",
        introducerName:"",
        introducerMobile:"",
        complaint:"",
      },
      rules:{
        mobile: [{ required: true, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
        name: [{ required: true, message: '请输入客户姓名', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        customer_type: [{ required: true, message: '请选择客户类型', trigger: 'change' }],
        item_id: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
        storeName: [{ required: true, message: '请输入门店', trigger: 'blur' }],
        channelPName: [{ required: true, message: '请输入渠道', trigger: 'blur' }],
        complaint: [{ required: true, message: '请输入客户备注', trigger: 'blur' }],
      },
      doctorList:[],
      bigProjectList:[],
      smallProjectList:[],
      bigChannelList:[],
      smallChannelList:[],
      IntroducerListAllowed:false,
      btnsOn:true,
      loading:false
    }
  },
  components:{
  },
  methods:{
    // 后退
    Backoff() {
      window.history.back();
    },
    //医生助理列表
    doctorFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreMembers",{
        role_id:3,
        s_id:that.form.s_id,
      }).then(res => {
        that.doctorList =res.data 
      })
    },

    //意向项目-大类
    bigProjectFn(){
      const that = this;
      that.$postRequest("/post/api/items/getListItems",{
        itemsParentId: 0,
        storeId:that.form.s_id,
      }).then(res => {
        that.bigProjectList = res.data.list
      })
    },

    //项目小类切换
    bigProjectChange(){
      const that = this;
      that.$postRequest("/post/api/items/getListItems",{
        itemsParentId: that.form.item_pid,
        storeId:that.form.s_id,
      }).then(res => {
        that.smallProjectList = res.data.list
      })
    },

    //渠道-大类
    bigChannelFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreChannel",{
        s_id:that.form.s_id,
        getChannel:1,
      }).then(res => {
        that.bigChannelList = res.data
      })
    },
    //渠道小类切换
    bigChannelChange(){
      const that = this;
      that.form.channel_id = ''
      that.$postRequest("/post/api/store/getStoreChannel",{
        s_id:that.form.s_id,
        getChannel:2,
        p_id:that.form.channel_pid
      }).then(res => {
        that.smallChannelList = res.data
      })
    },

    //初始化顾客信息
    getEditCustomerFn(){
      const that = this;
      this.loading = true;
      that.$postRequest("/post/api/customers/getEditCustomer",{
        id:that.userId
      }).then(res => {
        that.form.s_id = res.data.data.s_id;
        that.doctorFn()
        that.bigProjectFn()
        that.form.customer_type = res.data.data.customer_type.toString();
        that.form.name = res.data.data.name;
        that.form.sex = res.data.data.sex_id.toString();
        that.form.mobile = res.data.data.mobile;
        that.form.storeName = res.data.data.storeName;
        that.form.adviser_id = res.data.data.adviser_id;
        if(res.data.data.item_pid == 0)
        {
          that.form.item_pid = "";
          that.form.item_id = "";
        }
        else
        {
          that.form.item_pid = res.data.data.item_pid;
          that.form.item_id = res.data.data.item_id;
          that.bigProjectChange()
        }
        that.form.channelPName = res.data.data.channelPName;
        that.form.channelName = res.data.data.channelName;
        if (res.data.introducer) {
          that.form.introducerMobile = res.data.introducer.mobile
          that.form.introducerValue = res.data.introducer.name
        }
        that.form.complaint = res.data.data.complaint;

        that.loading = false

      })
    },
    postAddCustomerFn(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnsOn = false;
          let postData = {
            s_id:this.form.s_id,
            customer_type:this.form.customer_type,
            mobile:this.form.mobile,
            name:this.form.name,
            sex:this.form.sex,
            complaint:this.form.complaint,
            adviser_id:this.form.adviser_id,
            item_pid:this.form.item_pid,
            item_id:this.form.item_id,
            id:this.userId
          }
          this.$postRequest("/post/api/customers/postEditCustomer",postData).then(res => {
            if(res.status == 0){
              this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success',
                  onClose:()=>{
                    this.getEditCustomerFn()
                    this.btnsOn = true;
                  }
              });
            }
            else
            {
              this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error',
              });
              this.btnsOn = true;
            }
          })
        }
      })
    }

  },

  // 创建前状态
  beforeCreate(){
  },

  // 创建完毕状态 
  created(){
  },

  // 挂载前状态
  beforeMount(){
  },

  // 挂载结束状态
  mounted(){
    this.userId = this.$route.query.id;
    this.boxMaxHeight = window.innerHeight - 100;
    
    this.getEditCustomerFn();
    //权限
    getProgramList().then(res => {
      if (res.status == 0) {
        if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
      }
    }).catch(error=>{
        console.log("getProgramList no");
    })
    
  },
  
  // 更新前状态
  beforeUpdate(){
  },

  // 更新完成状态
  updated(){
  },

  // 销毁前状态
  beforeDestroy(){
  },

  // 销毁完成状态
  destroyed(){
  } 
  
}
</script>
<style lang="scss" scoped>
.ModificationAddCustomer{
  background: #fff;
  padding: 0 26px;
  margin: 20px;
  .titles{
    color: #333;
    font-size: 14px;
    padding: 10px 0;
  }
  .content{
    width: 700px;
    margin: 50px auto 0;
    .row{
      display: flex;
      margin-bottom: 6px;
      justify-content: space-between;
      .col{
        width: 48%;
        position: relative;
        .stext{
          padding-left: 120px;
          font-style: normal;
          font-size:12px;
          font-weight:500;
          color: #999;
          position: absolute;
          bottom: -6px;
        }
        .select_box{
          width: 100%;
          overflow: hidden;
        }
        .annotation{
            display: block;
            position: relative;
            top:0px;
            left: 120px;
            font-size:12px;
            font-weight:500;
            color: #999;
            margin-bottom: 20px;
            font-style: normal;
        }
        
      }
    }
  }
  .btns{
    padding: .6rem 0 .4rem;
    width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    color: #fff;
    span{
      width: 1rem;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      background: #009688;
      border-radius:2px;
      cursor: pointer;
      margin-left: .2rem;
    }
    a{
      width: 1rem;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      background: #C0C0C0;
      border-radius:2px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>

<style>
.ModificationAddCustomer .el-textarea__inner{
  resize: none;
}
</style>


    
