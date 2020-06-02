<template>
  <div class="MakeAnAppointment" :style="'min-height:'+ minHeight +'px' " v-loading="loading && id != ''">

    <SelectClient v-if="isSelectClient == true" @cloneChild="cloneChild"></SelectClient>
    <div class="isSelectClient" v-if="isSelectClient == false">
        <Header :title="titleText" :back="true" :fixed="true"></Header>
        <div class="box"  v-if="isSelectClient == false">
            <ul class="bg-white">
                <li>
                    <label>
                        <b>*</b>
                        <span>顾客姓名</span>
                    </label>
                    <div v-if="id == ''">
                        <p @click="isSelectClientFn">
                            <strong v-if="customerActive == null">请选择</strong>
                            <a v-else>{{customerActive.name}}</a>
                        </p>
                        <i v-if="customerActive == null" class="iconfont iconxiangyou"></i>
                        <i @click="eliminateData('customer')" v-else class="iconfont iconshanchuguanbicha2"></i>
                    </div>
                    <div v-else>
                        <p>
                            <strong v-if="customerActive == null">请选择</strong>
                            <a v-else>{{customerActive.name}}</a>
                        </p>
                    </div>
                </li>
                <li>
                    <label>
                        <b></b>
                        <span>项目</span>
                    </label>
                    <p @click="popShow('project')">
                        <strong v-if="projectActive == null">请选择</strong>
                        <a v-else>{{projectActive[0].name+'-'+projectActive[1].name}}</a>
                    </p>
                    <i v-if="projectActive == null" class="iconfont iconxiangyou"></i>
                    <i @click="eliminateData('project')" v-else class="iconfont iconshanchuguanbicha2"></i>
                </li>
                <li>
                    <label>
                        <b>*</b>
                        <span>顾问</span>
                    </label>
                    <p @click="popShow('counselor')">
                        <strong v-if="counselorActive == null">请选择</strong>
                        <a v-else>{{counselorActive.text}}</a>
                    </p>
                    <i v-if="counselorActive == null" class="iconfont iconxiangyou"></i>
                    <i @click="eliminateData('counselor')" v-else class="iconfont iconshanchuguanbicha2"></i>
                </li>
                <li>
                    <label>
                        <b></b>
                        <span>美容师</span>
                    </label>
                    <p @click="popShow('cosmetologist')">
                        <strong v-if="cosmetologistActive == null">请选择</strong>
                        <a v-else>{{cosmetologistActive.text}}</a>
                    </p>
                    <i v-if="cosmetologistActive == null" class="iconfont iconxiangyou"></i>
                    <i @click="eliminateData('cosmetologist')" v-else class="iconfont iconshanchuguanbicha2"></i>
                </li>
                <li v-if="cosmetologistActive != null">
                    <label>
                        <b>*</b>
                        <span>预计治疗时间</span>
                    </label>
                    <p>
                        <input type="number" pattern="[0-9]*" placeholder="请输入" v-model="treatmentTime">
                    </p>
                    <em>分钟</em>
                </li>
            </ul>
            <ul class="bg-white">
                <li class="remark">
                    <label>
                        <b>*</b>
                        <span>备注</span>
                    </label>
                    <p><textarea placeholder="请输入" v-model="remark"></textarea></p>
                </li>
            </ul>
            <ul class="bg-white">
                <li class="border0">
                    <label>
                        <b>*</b>
                        <span>到店时间</span>
                    </label>
                    <p @click="popShow('timer')">
                        <strong v-if="visitsDate == ''">请选择</strong>
                        <a v-else>{{visitsDate}}</a>
                    </p>
                    <i v-if="visitsDate == ''" class="iconfont iconxiangyou"></i>
                    <i @click="eliminateData('timer')" v-else class="iconfont iconshanchuguanbicha2"></i>
                </li>
            </ul>
        </div>
        <div class="pal50 par50 btns">
            <div 
                class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8" 
                @click="postSub"
                v-loading.fullscreen.lock="subLoding"
                element-loading-text="提交中..."
                element-loading-background="rgba(0, 0, 0, 0.5)"
            >
                {{btnText}}
            </div>
        </div>
    </div>

        <div class="pop_boxs">
            <van-popup v-model="projectShow" position="bottom">
                <div class="pop_box">
                    <div class="header">
                        <span @click="projectCancel">取消</span>
                        <a v-if="projectActiveText != '请选择'" @click="projectConfirm">确定</a>
                    </div>
                    <div class="text">{{projectActiveText}}</div>
                    <ul v-show="projectActiveText == '请选择'">
                        <li 
                            @click="projectListConfirm(index)" 
                            v-for="(item , index) in  projectLIst" 
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                    <ul class="children" v-show="projectActiveText != '请选择'">
                        <li 
                            @click="projectLIstChildrenConfirm(index)"
                            v-for="(item , index) in  projectActiveList" 
                            :class="projectLIstChildrenIndex == index ? 'active' :''"
                            :key="index"
                        >
                            <span>{{item.name}}</span>
                            <i class="iconfont iconduihao"></i>
                        </li>
                    </ul>
                </div>
            </van-popup>
        </div>

        <van-popup v-model="counselorShow" position="bottom">
            <van-picker show-toolbar :columns="counselorColumns" @confirm="counselorConfirm" @cancel="popHide('counselor')" />
        </van-popup>
        
        <van-popup v-model="cosmetologistShow" position="bottom">
            <van-picker show-toolbar :columns="cosmetologistColumns" @confirm="cosmetologistConfirm" @cancel="popHide('cosmetologist')" />
        </van-popup>

        <div class="bg-dialog" v-show="showDatePicker">
          <div class="bg-date-dialog">
              <div class="pal20 par20 pat10 pab10 f26rem bg-white1 fc-gray3 h50rem lh50rem">
                  <template v-if="dateSelectd == 0">
                      <span class="fl bd-gray1 bd-b2">{{dateFormat(value)}}</span>
                      <span class="fl mal50" @click="changeDateSelect(1)">{{currentDate}}</span>
                  </template>
                  <template v-else>
                      <span class="fl" @click="changeDateSelect(0)">{{dateFormat(value)}}</span>
                      <span class="fl bd-gray1 bd-b2 mal50">{{currentDate}}</span>
                  </template>
                  <span class="fr fc-green f26rem" @click="changePicker">确定</span>
              </div>
              <div class="clear0"></div>
              <div class="wb100 f22rem" v-show="dateSelectd == 0">
                  <el-calendar v-model="value">
                  </el-calendar>
              </div>
              <div class="wb100" v-show="dateSelectd == 1">
                  <van-datetime-picker
                        type="time"
                        v-model="currentDate"
                        :min-hour="minHour"
                        :max-hour="maxHour"
                        :show-toolbar="false"
                  />
              </div>
          </div>
      </div>

  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast } from 'vant';
import { getStoreItem , getStoreMembers , getAppointment , addAppointment , editAppointment } from '@/assets/api/Flow/MakeAnAppointment';
import SelectClient from '../SelectClient/SelectClient';
import { setTimeout } from 'timers';
export default {
  name: "MakeAnAppointment",
  data() {
    return {
        id:'',
        titleText:"",
        btnText:"",
        minHeight: 0,

        isSelectClient:false,
        customerActive:null,

        projectShow:false,
        projectActive:null,
        projectActiveText:'请选择',
        projectActiveList:[],
        projectLIst:[],
        projectListIndex:null,
        projectLIstChildrenIndex:null,

        counselorShow:false,
        counselorActive:null,
        counselorColumns: [],

        cosmetologistShow:false,
        cosmetologistColumns:[],
        cosmetologistActive:null,

        remark:'',

        value: new Date().getTime(),
        showDatePicker: false,
        dateSelectd: 0,
        currentDate: '12:00',
        minHour: 0,
        maxHour: 23,
        visitsDate: '',
        treatmentTime:"",

        subLoding:false,
        loading:false

    };
  },
  components: {
    Header,
    Toast,
    SelectClient
  },
  methods: {

    //获取预约信息
    getAppointmentFn(){
        let postData = {
            appointment_id : this.id
        }
        getAppointment(postData).then(res => {

            setTimeout(() => {
                this.loading = false;
            },200)

            this.customerActive = {
                id : res.data.customer_id,
                name : res.data.customer_name
            }
            if(res.data.item[0].users_id != 0)
            {
                this.projectActive = res.data.item;
            }
            
            this.counselorActive = {
                key : res.data.adviser.users_id,
                text : res.data.adviser.name,
            }
            if(res.data.technician.users_id != 0)
            {
                this.cosmetologistActive = {
                    key : res.data.technician.users_id,
                    text : res.data.technician.name,
                }
                this.treatmentTime = res.data.treatment_time;
            }
            this.remark = res.data.content;
            this.visitsDate = res.data.appointment_time;
        }).catch((e)=>{
            console.log(e)
        })
    },

    //关闭选择顾客
    cloneChild(json){
        if(json != undefined)this.customerActive = json;
        this.isSelectClient = false
        this.$forceUpdate();
    },

    //选则顾客
    isSelectClientFn(){
        this.isSelectClient = true;
    },
    //清除选项
    eliminateData(str){
        switch (str) {
            case "counselor":
                this.counselorActive = null;
                break;
            case "project":
                this.projectActive = null;
                break;
            case "cosmetologist":
                this.cosmetologistActive = null;
                break;
            case "timer":
                this.visitsDate = '';
                break;
            case "customer":
                this.customerActive = null;
                break;
            default:
                break;
        }
    },
    //显示选择类容 
    popShow(str){
        switch (str) {
            case "counselor":
                this.counselorShow = true;
                break;
            case "project":
                this.projectShow = true;
                break;
            case "cosmetologist":
                this.cosmetologistShow = true;
                break;
            case "timer":
                this.showDatePicker = true;
                break;
            default:
                break;
        }
    },
    popHide(str){
        switch (str) {
            case "counselor":
                this.counselorShow = false;
                break;
            case "project":
                this.projectShow = false;
                break;
            case "cosmetologist":
                this.cosmetologistShow = false;
                break;
            default:
                break;
        }
    },

    //获取门店-项目
    getShowProjectFn(type,pid,fn){
        let postData = {
            getItem:type,
            p_id:pid
        }
        getStoreItem(postData).then(res => {
            if(pid == undefined)
            {
                this.projectLIst = res.data;
            }
            else
            {
                this.projectActiveList = res.data;
                fn()

            }
            // this.$forceUpdate();
        }).catch((e)=>{
            console.log(e)
        })
    },
    projectCancel(){
        this.projectShow = false;
        this.projectActiveText = '请选择';
        this.projectListIndex = null;
        this.projectLIstChildrenIndex = null;
    },
    projectConfirm() {
        if(this.projectLIstChildrenIndex != null)
        {
            var arr = [
                this.projectLIst[this.projectListIndex],
                this.projectActiveList[this.projectLIstChildrenIndex],
            ]
            this.projectActive = arr;
            this.projectShow = false;
            this.projectActiveText = '请选择';
            this.projectListIndex = null;
            this.projectLIstChildrenIndex = null;
        }
        else
        {
            Toast('请完善资料');
        }
    },
    projectListConfirm(index){
        
        this.projectListIndex = index;
        this.getShowProjectFn(2,this.projectLIst[index].id,() =>{
            this.projectActiveText = this.projectLIst[index].name;
        })

    },
    projectLIstChildrenConfirm(index){
        this.projectLIstChildrenIndex = index;
        // this.$forceUpdate()
    },


    //获取角色
    getUserFn(types){
        let postData = {};
        switch (types) {
            case 3:
                postData = {
                    role_id:3
                }
                break;
            case 4:
                postData = {
                    role_id:4
                }
                break;
            default:
                break;
        }
        getStoreMembers(postData).then(res => {
            
            res.data.map((item , index) => {
                item.text = item.name,
                item.key = item.users_id
            })
            switch (types) {
                case 3:
                    this.counselorColumns = res.data
                    break;
                case 4:
                    this.cosmetologistColumns = res.data
                    break;
                default:
                    break;
            }
        }).catch((e)=>{
            console.log(e)
        })
    },
    counselorCancel(){
        this.counselorShow = false;
    },
    counselorConfirm(item){
        this.counselorShow = false;
        this.counselorActive = item;
    },

    //美容师
    counselorCancel(){
        this.cosmetologistShow = false;
    },
    cosmetologistConfirm(item){
        this.cosmetologistActive = item;
        this.cosmetologistShow = false;
    },

    //提交
    postSub(){

        //顾客
        let customerid = this.customerActive;
        if(this.customerActive != null)customerid = this.customerActive.id;
        
        //项目
        let itemid = this.projectActive , itempid = this.projectActive;
        if(this.projectActive != null)
        {
            itempid = this.projectActive[0].id;
            itemid = this.projectActive[1].id;
        }
        else
        {
            itempid = null;
            itemid = null;
        }
 
        //顾问
        let consultationid = this.counselorActive;
        if(this.counselorActive != null )consultationid = this.counselorActive.key;
      
        //美容师
        let cosmetologistid = this.cosmetologistActive;
        if(this.cosmetologistActive != null )cosmetologistid = this.cosmetologistActive.key;

        let content = this.$base.trimStr(this.remark);
        let timer = this.visitsDate;
        let treatmentTime = this.treatmentTime
        if(customerid != null  && consultationid != null && content != '' && timer != '')
        {
           
            if(cosmetologistid == null)
            {
                if(this.id == '')
                {
                    let postData = {
                        item_pid:itempid,
                        item_id:itemid,
                        appointment_time:timer,
                        customer_id:customerid,
                        content:content,
                        adviser_id:consultationid,
                    }
                    // Toast.success('预约新增成功');
                    this.subLoding = true
                    addAppointment(postData).then(res => {
                     
                        setTimeout(() => {
                            this.subLoding = false;
                            if( res.status == 0 )
                            {
                                Toast({
                                    message: '预约新增成功',
                                    type: 'success',
                                    duration:1500,
                                    onClose:()=>{
                                        window.history.go(-1)
                                    }
                                });
                            }
                            else
                            {
                                Toast(res.msg);
                            }
                        },1000)
                
                    }).catch((e)=>{
                        console.log(e)
                    })
                }
                else
                {
                    let postData = {
                        item_pid:itempid,
                        item_id:itemid,
                        appointment_time:timer,
                        customer_id:customerid,
                        content:content,
                        adviser_id:consultationid,
                        id:this.id
                    }
                    this.subLoding = true
                    editAppointment(postData).then(res => {
                     
                        if( res.status == 0 )
                        {
                            setTimeout(() => {
                                this.subLoding = false;
                                if( res.status == 0 )
                                {
                                    Toast({
                                        message: '预约修改成功',
                                        type: 'success',
                                        duration:1500,
                                        onClose:()=>{
                                            window.history.go(-1)
                                        }
                                    });
                                }
                                else
                                {
                                    Toast(res.msg);
                                }
                            },1000)
                        }
                        else
                        {
                            Toast(res.msg);
                        }
                    }).catch((e)=>{
                        console.log(e)
                    })
                    // Toast.success('预约修改成功');
                }
            }
            else
            {

                if(treatmentTime > 0 && treatmentTime <= 1440)
                {
                    if(this.id == '')
                    {
                        let postData = {
                            item_pid:itempid,
                            item_id:itemid,
                            appointment_time:timer,
                            customer_id:customerid,
                            content:content,
                            adviser_id:consultationid,
                            technician_id:cosmetologistid,
                            yuyue_order_time:treatmentTime
                        }
                        this.subLoding = true
                        addAppointment(postData).then(res => {
                            setTimeout(() => {
                                this.subLoding = false;
                                if( res.status == 0 )
                                {
                                    Toast({
                                        message: '预约新增成功',
                                        type: 'success',
                                        duration:1500,
                                        onClose:()=>{
                                            window.history.go(-1)
                                        }
                                    });
                                }
                                else
                                {
                                    Toast(res.msg);
                                }
                            },1000)
                        }).catch((e)=>{
                            this.subLoding = false;
                            console.log(e)
                        })
                    }
                    else
                    {
                        let postData = {
                            item_pid:itempid,
                            item_id:itemid,
                            appointment_time:timer,
                            customer_id:customerid,
                            content:content,
                            adviser_id:consultationid,
                            technician_id:cosmetologistid,
                            yuyue_order_time:treatmentTime,
                            id:this.id
                        }
                        this.subLoding = true
                        editAppointment(postData).then(res => {
                            setTimeout(() => {
                                this.subLoding = false;
                                if( res.status == 0 )
                                {
                                    Toast({
                                        message: '预约修改成功',
                                        type: 'success',
                                        duration:1500,
                                        onClose:()=>{
                                            window.history.go(-1)
                                        }
                                    });
                                }
                                else
                                {
                                    Toast(res.msg);
                                }
                            },1000)
                        }).catch((e)=>{
                            this.subLoding = false;
                            console.log(e)
                        })
                    }
                }
                else
                {
                    Toast('请填写正确的治疗时间');
                }
            }
            
        }
        else
        {
            Toast('请完善资料');
        }
        
    },

    changeDateSelect(i){
        this.dateSelectd = i
    },
    openPicker(){
    this.showDatePicker = true
    },
    closePicker(){
    this.showDatePicker = false
    },
    changePicker(){
    this.visitsDate = this.dateFormat(this.value) +  this.currentDate
        this.closePicker()
    },
    dateFormat(key){
        if(key == "" || key == null){
            return
        }
        let date = new Date(key);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + " ";
    }

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    
    
    if(this.$route.query.id != undefined)
    {
        this.id = this.$route.query.id
        this.titleText = "修改预约";
        this.btnText = '确认修改'
        this.loading = true;
        this.getAppointmentFn()
    }
    else
    {
        this.titleText = "新增预约";
        this.btnText = '提交'
    }

    //获取顾问
    this.getUserFn(3)
    //获取美容师
    this.getUserFn(4)
    //获取门店-项目
    this.getShowProjectFn(1)

  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "./MakeAnAppointment.scss";
</style>



    
