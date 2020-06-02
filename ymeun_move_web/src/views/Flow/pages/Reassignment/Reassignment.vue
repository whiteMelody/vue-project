<template>
  <div class="Reassignment" :style="'min-height:'+ minHeight +'px' " v-loading="loading && id != ''">
    <Header :title="'改排'" :back="true" :fixed="true"></Header>
    <div class="box">
        <ul class="bg-white">
            <li>
                <label>
                    <b>*</b>
                    <span>顾客姓名</span>
                </label>
                <p>
                    <a>{{customerActiveText}}</a>
                </p>
            </li>
            <li>
                <label>
                    <b></b>
                    <span>项目</span>
                </label>
                <p>
                    <strong v-if="projectActiveText == ''">未选择</strong>
                    <a v-else>{{projectActiveText}}</a>
                </p>
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
                <i v-else class="iconfont iconshanchuguanbicha2"></i>
            </li>
            <li v-if="cosmetologistActive != null">
                <label>
                    <b>*</b>
                    <span>美容师</span>
                </label>
                <p @click="popShow('cosmetologist')">
                    <strong v-if="cosmetologistActive == null">请选择</strong>
                    <a v-else>{{cosmetologistActive.text}}</a>
                </p>
                <i v-if="cosmetologistActive == null" class="iconfont iconxiangyou"></i>
                <i v-else class="iconfont iconshanchuguanbicha2"></i>
            </li>
            <li v-if="cosmetologistActive != null">
                <label>
                    <b>*</b>
                    <span>预计治疗时间</span>
                </label>
                <p>
                    {{treatmentTime}}
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
                <p><span>{{remark}}</span></p>
            </li>
        </ul>
        <ul class="bg-white">
            <li class="border0">
                <label>
                    <b>*</b>
                    <span>到店时间</span>
                </label>
                <p>
                    <a>{{visitsDate}}</a>
                </p>
               
            </li>
        </ul>
    </div>
    <div class="pal50 par50 btns">
        <div 
            class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8" 
            @click="subPost"
            v-loading.fullscreen.lock="subLoding"
            element-loading-text="提交中..."
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >确认改排</div>
    </div>

    <van-popup v-model="counselorShow" position="bottom">
        <van-picker show-toolbar :columns="counselorColumns" @confirm="counselorConfirm" @cancel="popHide('counselor')" />
    </van-popup>
    
    <van-popup v-model="cosmetologistShow" position="bottom">
        <van-picker show-toolbar :columns="cosmetologistColumns" @confirm="cosmetologistConfirm" @cancel="popHide('cosmetologist')" />
    </van-popup>

  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast,Dialog } from 'vant';
import { getAppointment , getStoreMembers , postRearrangement } from '@/assets/api/Flow/Reassignment';
export default {
  name: "Reassignment",
  data() {
    return {
        id:'',
        minHeight: 0,
        customerActive:null,
        customerActiveText:'',
        projectActive:null,
        projectActiveText:'',

        counselorShow:false,
        counselorActive:null,
        counselorColumns: [],

        cosmetologistShow:false,
        cosmetologistColumns:[],
        cosmetologistActive:null,
        cosmetologistPost:false,

        treatmentTime:'',

        remark:'',
        visitsDate:'',
        subLoding:false,
        loading : false
    };
  },
  components: {
    Header,
    Toast,
  },
  methods: {
    //提交
    subPost(){
        //顾问
        let consultationid = this.counselorActive;
        if(this.counselorActive != null )consultationid = this.counselorActive.key;

        //美容师
        let cosmetologistid = this.cosmetologistActive;
        if(this.cosmetologistActive != null )cosmetologistid = this.cosmetologistActive.key;

        let postData = {
            appointment_id:this.id,
            adviser_id:consultationid,
            technician_id:cosmetologistid,
        }

        console.log(postData);
        // return;
        this.subLoding = true
        postRearrangement(postData).then(res => {
            setTimeout(() => {
                this.subLoding = false;
                if( res.status == 0 )
                {
                    Toast({
                        message: '改排成功',
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
    },
    //获取数据
    getData(){
        let postData = {
            appointment_id:this.id,
        }
        getAppointment(postData).then(res => {
            setTimeout(() => {
                this.loading = false;
            },200)
            this.customerActive = {
                id : res.data.customer_id,
                name : res.data.customer_name
            }
            this.customerActiveText = res.data.customer_name
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
                this.cosmetologistPost = true;
            }
            else
            {
                this.cosmetologistPost = false;
            }
            this.remark = res.data.content;
            this.visitsDate = res.data.appointment_time;
        }).catch((e)=>{
            console.log(e)
        })
    },
    
    //清除选项
    eliminateData(str){
        switch (str) {
            case "counselor":
                this.counselorActive = null;
                break;
            case "cosmetologist":
                this.cosmetologistActive = null;
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
            case "cosmetologist":
                this.cosmetologistShow = true;
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
            case "cosmetologist":
                this.cosmetologistShow = false;
                break;
            default:
                break;
        }
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
        this.counselorActiveText = item.name;
    },

    //美容师
    counselorCancel(){
        this.cosmetologistShow = false;
    },
    cosmetologistConfirm(item){
        this.cosmetologistActive = item;
        this.cosmetologistShow = false;
        this.cosmetologistActiveText = item.name;
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.id = this.$route.query.id
    //获取预约信息
    this.getData()
    //获取顾问
    this.getUserFn(3)
    //获取美容师
    this.getUserFn(4)
    this.loading = true;

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
@import "./Reassignment.scss";
</style>



    
