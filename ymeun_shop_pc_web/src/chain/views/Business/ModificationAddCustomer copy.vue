<template>
  <div class="ModificationAddCustomer">
    <div class="titles">修改顾客</div>
    <div class="clear-f2"></div>
    <ul class="content">
      
      <li class="content_li">
        <div class="content_li_left">
          <span><i>*</i>客户类型</span>
          <RadioGroup v-model="customer.id">
              <Radio label="1">
                <span>正式客户</span>
              </Radio>
              <Radio label="0">
                <span>备用客户</span>
              </Radio>
          </RadioGroup>
          <b v-if="customer.show">*请选择客户类型</b>
        </div>

        <div class="content_li_right">
          <span><i>*</i>姓名</span>
          <Input v-model="username.text" placeholder="请输入客户姓名" />
          <b v-if="username.show">*请填写姓名</b>
        </div>
        
      </li>

      <li class="content_li">
        <div class="content_li_left">
          <span><i>*</i>性别</span>
          <RadioGroup v-model="sex.id" class="content_li_right_radio">
              <Radio label="0">
                <span>女</span>
              </Radio>
              <Radio label="1">
                <span>男</span>
              </Radio>
          </RadioGroup>
          <b v-if="sex.show">*请选择性别</b>
        </div>

        <div class="content_li_right">
          <span><i>*</i>电话</span>
          <Input v-model="phone.text" placeholder="请输入客户电话号码" :maxlength="telNumber" type="text" />
          <b v-if="phone.show">*请输入正确的电话号码</b>
        </div>
        
      </li>

      <li class="content_li">

        <div class="content_li_left">
          <span><i>*</i>门店</span>
          <!-- <Select v-model="shoplist.id" @on-change="shoplistChange" disabled>
              <Option v-for="(item , index) in  shoplist.list" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <b v-if="shoplist.show">*请选择门店</b> -->
          <p class="bd-a1 bd-gray radius1 bg-gray fc-gray2 text-over-hidden1 pal15  h32px lh32px fr" style="width:32.5%;">{{channelData.storeName}}</p>
        </div>

        <div class="content_li_right" v-if="shoplist.id != ''">
          <span>所属医生助理</span>
          <Select v-model="doctorList.id">
              <Option v-for="(item , index) in  doctorList.list" :key="index" :value="item.users_id">{{item.name}}</Option>
          </Select>
          <em>不选择系统会自动轮排给下一个医生助理</em>
        </div>
        
        
      </li>
      <li class="content_li" v-if="shoplist.id != ''">
        <div class="content_li_left">
          <span>意向项目</span>
          <Select v-model="bigProject.id" @on-change="bigProjectChange">
              <Option v-for="(item , index) in  bigProject.list" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Select v-model="smallProject.id" v-if="bigProject.id != undefined">
              <Option v-for="(item , index) in  smallProject.list" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>
      </li>
      <li class="content_li" v-if="shoplist.id != ''">

        <div class="content_li_left">
          <span><i>*</i>渠道</span>
          <p class="bd-a1 bd-gray radius1 bg-gray fc-gray2 text-over-hidden1 pal15  h32px lh32px fl" style="margin-right: .2rem;width:21.5%;">{{channelData.Pname}}</p>
          <p class="bd-a1 bd-gray radius1 bg-gray fc-gray2 text-over-hidden1 pal15  h32px lh32px fr" style="width:21.5%;">{{channelData.name}}</p>
          <!-- <Select v-model="bigChannel.id" @on-change="bigChannelChange" disabled>
              <Option v-for="(item , index) in  bigChannel.list" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Select v-model="smallChannel.id" v-if="bigChannel.id != undefined" disabled>
              <Option v-for="(item , index) in  smallChannel.list" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <b v-if="smallChannel.show">*请填写完资料</b> -->
        </div>
        
      </li>
      <li class="content_li" v-if="IntroducerListAllowed">
        <div class="content_li_left">
          <span>介绍人</span>
          <Input v-model="form.introducerName" disabled />
        </div>

        <div class="content_li_right" v-if="shoplist.id != ''">
          <span>介绍人电话</span>
          <Input v-model="form.introducerMobile" disabled />
        </div>
      </li>
      <li class="content_li li_textarea">
        <div class="content_li_left p_textarea">
          <span><i>*</i>顾客备注</span>
          <textarea v-model="remark.text"></textarea>
          <b v-if="remark.show">*请填写顾客备注</b>
        </div>
      </li>
    </ul>

    <div class="btns">
      <el-button @click="Backoff">取消</el-button>
      <el-button v-if="btnsOn" type="primary" @click="postAddCustomerFn">确定修改</el-button>
      <el-button v-else type="primary" disabled>正在提交请稍后</el-button>
    </div>

    <MessagePop ref="message" :popData="popData" @MessagePop='Backoff'></MessagePop>
  </div>
</template>
<script>
import { getProgramList } from "@/chain/assets/api/common/common";
export default {
  name:'ModificationAddCustomer',
  data(){
    return{
      popData:"",
      userId:"",
      telNumber:11,
      customer:{
        id: '',
        show:false
      },
      sex:{
        id:"",
        show:false
      },
      username:{
        text:"",
        show:false
      },
      phone:{
        text:"",
        show:false
      },
      shoplist:{
        list:"",
        id:'',
        show:false
      },
      doctorList:{
        id:'',
        list:'',
      },
      bigProject:{
        id:'',
        list:'',
      },
      smallProject:{
        id:'',
        list:'',
      },
      bigChannel:{
        id:'',
        list:'',
      },
      channelData:{
        Pname:'',
        name:'',
        storeName:''
      },
      smallChannel:{
        id:'',
        list:'',
        show:false
      },
      form:{
          introducerMobile:'',
          introducerValue:''
      },
      remark:{
        text:'',
        show:false
      },
      btnsOn:true,
      IntroducerListAllowed:false,
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
        s_id:that.shoplist.id,
      }).then(res => {
        that.doctorList.list =res.data 
      })
    },

    //意向项目-大类
    bigProjectFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreItem",{
        s_id:that.shoplist.id,
        getItem:1,
      }).then(res => {
        that.bigProject.list = res.data
      })
    },
    //渠道-大类
    bigChannelFn(){
      const that = this;
      that.$postRequest("/post/api/store/getStoreChannel",{
        s_id:that.shoplist.id,
        getChannel:1,
      }).then(res => {
        that.bigChannel.list = res.data
      })
    },

    //门店切换
    shoplistChange(){
      this.doctorList.id = undefined;
      this.bigProject.id = undefined;
      this.smallProject.id = undefined;
      this.bigChannel.id = undefined;
      this.smallChannel.id = undefined;
   
      this.doctorFn()
      this.bigProjectFn()
      this.bigChannelFn()
    },

    //项目小类切换
    bigProjectChange(){
      const that = this;
      if(that.bigProject.id != undefined)
      {
        that.$postRequest("/post/api/store/getStoreItem",{
          s_id:that.shoplist.id,
          getItem:2,
          p_id:that.bigProject.id
        }).then(res => {
          that.smallProject.id = undefined
          that.smallProject.list = res.data
        })
      }
    },

    //渠道小类切换
    bigChannelChange(){
      const that = this;
      if(that.bigChannel.id != undefined)
      {
        that.$postRequest("/post/api/store/getStoreChannel",{
          s_id:that.shoplist.id,
          getChannel:2,
          p_id:that.bigChannel.id
        }).then(res => {
          that.smallChannel.id = undefined
          that.smallChannel.list = res.data
        })
      }
    },

    postAddCustomerFn(){
      const that = this;
      let customerData = that.customer.id;
      customerData == '' ? that.customer.show = true: that.customer.show = false;
      let usernameData = that.username.text;
      usernameData == "" ? that.username.show = true: that.username.show = false;
      let sexData = that.sex.id;
      sexData == '' ? that.sex.show = true: that.sex.show = false;
      let phoneData = that.phone.text;
      let re = /^1\d{10}$/
      re.test(phoneData) ? that.phone.show = false: that.phone.show = true;
      let shoplistData = that.shoplist.id;
      let bigChannelData = that.bigChannel.id;
      let smallChannelData = that.smallChannel.id;
      if(shoplistData == '')
      {
        that.shoplist.show = true;
      }
      else
      {
        that.shoplist.show = false;
        smallChannelData == undefined ? that.smallChannel.show = true: that.smallChannel.show = false;
      }
      
      let doctorListData = that.doctorList.id;
      let bigProjectData = that.bigProject.id;
      let smallProjectData = that.smallProject.id;
      let remarkData = that.remark.text;
      remarkData == "" ? that.remark.show = true: that.remark.show = false;
     
      if(that.customer.show == false &&  that.username.show == false && that.sex.show == false && that.phone.show == false && that.shoplist.show == false && that.smallChannel.show == false && that.remark.show == false )
      {
        let postData = {
          s_id:shoplistData,
          customer_type:customerData,
          mobile:phoneData,
          channel_pid:bigChannelData,
          channel_id:smallChannelData,
          name:usernameData,
          sex:sexData,
          complaint:remarkData,
          adviser_id:doctorListData,
          item_pid:bigProjectData,
          item_id:smallProjectData,
          id:that.userId
        }
        if(that.btnsOn)
        {
          that.btnsOn = false;
          that.$postRequest("/post/api/customers/postEditCustomer",postData).then(res => {
            if(res.status == 0)
            {
              that.popData = {
                popTowText:"success",
                popText:"修改顾客信息成功",
                popBgText:"bandConfirm"
              }
              // that.$Message.success({
              //   content:"修改顾客信息成功，请等待",
              //   onClose:function(){
              //     that.btnsOn = true;
              //     window.history.back();
              //   }
              // });
            }
            else
            {
              that.btnsOn = true;
              // that.$Message.error(res.msg);
              that.popData = {
                popTowText:"error",
                popText:res.msg,
                popBgText:"bandConfirm"
              }
            }
          })
        }
      }

    },

    //初始化顾客信息
    getEditCustomerFn(){
      const that = this;
      that.$postRequest("/post/api/customers/getEditCustomer",{
        id:that.userId
      }).then(res => {
        that.customer.id = res.data.data.customer_type.toString();
        that.username.text = res.data.data.name;
        that.sex.id = res.data.data.sex_id.toString();
        that.phone.text = res.data.data.mobile;
        that.shoplist.id = res.data.data.s_id;
        that.shoplist.list = res.data.storeData;
        that.bigProjectFn()
        that.doctorList.id = res.data.data.adviser_id;
        that.doctorList.list = res.data.membersData;
        if(res.data.data.item_pid == 0)
        {
          that.bigProject.id = undefined;
          that.smallProject.id = undefined;
        }
        else
        {
          that.bigProject.id = res.data.data.item_pid;
          that.smallProject.id = res.data.data.item_id;
        }
        if (res.data.introducer) {
            this.form.introducerMobile = res.data.introducer.mobile
            this.form.introducerValue = res.data.introducer.name
        }
        that.bigProject.list = res.data.itemPData;
        that.smallProject.list = res.data.itemData;
        
        that.channelData.Pname = res.data.data.channelPName;
        that.channelData.name = res.data.data.channelName
        that.channelData.storeName = res.data.data.storeName
        that.bigChannel.id = res.data.data.channel_pid;
        that.bigChannel.list = res.data.channelPData;
        that.smallChannel.id = res.data.data.channel_id;
        that.smallChannel.list = res.data.channelData;
        that.remark.text = res.data.data.complaint;
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
    this.userId = this.$route.query.id
    this.getEditCustomerFn();
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
    width: 70%;
    margin: 0 auto;
    .content_li{
      display: flex;
      align-items: center;
      height: .8rem;
      .content_li_left{
        flex: 1;
        display: flex;
        align-items: center;
        position: relative;
        span{
          width: 1.5rem;
          text-align: right;
          font-size: 14px;
          margin-right: .48rem;
          i{
            color: #EC414D;
          }
        }
        b{
          display: block;
          font-weight: normal;
          font-size: 14px;
          position: absolute;
          bottom: -.05rem;
          color: #EC414D;
          height: 0;
          left: 2rem;
        }
        .ivu-select{
          margin-right: .2rem;
        }
      }
      .ivu-input-wrapper,.ivu-select{
        width: 2.5rem;
      }
      
      .content_li_right{
        position: relative;
        span{
          width: 1.5rem;
          text-align: right;
          font-size: 14px;
          margin-right: .48rem;
          i{
            color: #EC414D;
          }
        }
        em{
          display: block;
          font-style: normal;
          text-align: right;
          font-size: 14px;
          width: 100%;
          position: absolute;
          bottom: -.05rem;
          color: #999999;
          height: 0;
        }
        b{
          display: block;
          font-weight: normal;
          font-size: 14px;
          position: absolute;
          bottom: -.05rem;
          color: #EC414D;
          left: 1rem;
          height: 0;
        }
        .content_li_right_radio{
          width: 2.5rem;
        }
      }
    }
    .li_textarea{
      height: auto;
      margin-top: .2rem;
      .p_textarea{
        align-items: flex-start;
        span{
          position: relative;
          top: .05rem;
        }
        textarea{
          flex: 1;
          resize: none;
          border: 1px solid #dcdee2;
          border-radius: 4px;
          padding: .1rem;
          height: 1rem;
        }
      }
    }
  }
  .btns{
    padding: .6rem 0 .4rem;
    width: 70%;
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
.ivu-radio-checked .ivu-radio-inner{
  border-color: #009688;
}
.ivu-radio-checked .ivu-radio-inner:after{
  background-color:#009688
}  
</style>




    
