<template>
  <div class="MakeAnAppointmentEdit" :style="'min-height:'+ minHeight +'px' " v-loading="loading && id != ''">
    <Header :title="'预约详情'" :back="true" :fixed="true"></Header>
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
                <p>
                    <a>{{counselorActiveText}}</a>
                </p>
            </li>
            <li>
                <label>
                    <b></b>
                    <span>美容师</span>
                </label>
                <p>
                    <strong v-if="cosmetologistActiveText == ''">未选择</strong>
                    <a v-else>{{cosmetologistActiveText}}</a>
                </p>
            </li>
            <li v-if="treatmentTime != ''">
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
        <ul class="bg-white" v-if="detailsStatus == 2">
            <li class="remark">
                <label>
                    <b></b>
                    <span>取消原因</span>
                </label>
                <p><span>{{cause}}</span></p>
            </li>
        </ul>
    </div>
    <div class="pal50 par50 btns" v-if="detailsStatus == 0">
        <div 
            @click="makeAnAppointmentConfirm" 
            class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8"
            v-loading.fullscreen.lock="subLoding"
            element-loading-text="提交中..."
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >确认到店</div>
        <div 
            @click="makeAnAppointmentCancel" 
            class="wb100 fc-black2 h80rem lh80rem text-center f28rem radius8 mat40 bg-gray"
        >取消预约</div>
    </div>
    
  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast,Dialog } from 'vant';
import { getAppointment , getTriage } from '@/assets/api/Data/MakeAnAppointmentEdit';
export default {
  name: "MakeAnAppointmentEdit",
  data() {
    return {
        id:'',
        minHeight: 0,
        customerActive:null,
        customerActiveText:'',
        projectActive:null,
        projectActiveText:'',
        counselorActive:null,
        counselorActiveText:'',
        treatmentTime:"",
        cosmetologistActive:null,
        cosmetologistActiveText:'',
        remark:'',
        visitsDate:'',
        detailsStatus:'',
        cause:'',
        subLoding:false,
        loading : false,
    };
  },
  components: {
    Header,
    Toast,
  },
  methods: {

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
            this.customerActiveText = res.data.customer_name;

            if(res.data.item[0].users_id != 0)
            {
                this.projectActive = res.data.item;
                this.projectActiveText = res.data.item[0].name + "-" + res.data.item[1].name
            }
            
            this.counselorActive = {
                key : res.data.adviser.users_id,
                text : res.data.adviser.name,
            }
            this.counselorActiveText = res.data.adviser.name;

            if(res.data.technician.users_id != 0)
            {
                this.cosmetologistActive = {
                    key : res.data.technician.users_id,
                    text : res.data.technician.name,
                }
                this.cosmetologistActiveText = res.data.technician.name
                this.treatmentTime = res.data.treatment_time;
            }

            this.remark = res.data.content;
            this.visitsDate = res.data.appointment_time;

            this.detailsStatus = res.data.status;
            this.cause = res.data.cause
        }).catch((e)=>{
            console.log(e)
        })
    },

    // 确认到店
    makeAnAppointmentConfirm(){
        let postData = {
            appointment_id:this.id,
            adviser_id:this.counselorActive.key,
            customer_id:this.customerActive.id,
            name:this.customerActive.name,
        }
        this.subLoding = true
        getTriage(postData).then(res => {
            setTimeout(() => {
                this.subLoding = false;
                if( res.status == 0 )
                {
                    Toast({
                        message: '到店成功',
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
    
    //   取消预约
    makeAnAppointmentCancel(){
        Dialog.setDefaultOptions({
            confirmButtonColor:"#04776C",
            cancelButtonColor:'#999999'
        })
        Dialog.confirm({
            title: '取消预约',
            message: '确定取消该客户的预约？'
        }).then(() => {
            this.$router.push({name: 'MakeAnAppointmentCancel',query:{id:this.id}})
        }).catch((e)=>{
            console.log(e)
        })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    
    this.id = this.$route.query.id
    this.loading = true;
    this.getData()
    
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
@import "./MakeAnAppointmentEdit.scss";
</style>



    
