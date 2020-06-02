<template>
  <div class="MakeAnAppointmentCancel" :style="'min-height:'+ minHeight +'px' ">
    <Header :title="'取消预约'" :back="true" :fixed="true"></Header>
    <div class="remark bg-white">
        <textarea class="wb100 f28rem" placeholder="请输入顾客取消预约的原因..." v-model="remark"></textarea>
    </div>
    <div class="pal50 par50 btns">
        <div 
          class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8"
          v-loading.fullscreen.lock="subLoding"
          element-loading-text="提交中..."
          element-loading-background="rgba(0, 0, 0, 0.5)"
          @click="postSub"
        >确 定</div>
    </div>

  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast } from 'vant';
import { setCancelAppointment } from '@/assets/api/Flow/MakeAnAppointmentCancel';
export default {
  name: "MakeAnAppointmentCancel",
  data() {
    return {
      id:'',
      minHeight: 0,
      remark:'',
      subLoding:false
    };
  },
  components: {
    Header,
    Toast,
  },
  methods: {
    postSub(){
      let postData = {
        appointment_id:this.id,
        cause:this.remark
      }
      this.subLoding = true
      setCancelAppointment(postData).then(res => {
        setTimeout(() => {
          this.subLoding = false;
          if( res.status == 0 )
          {
              Toast({
                  message: '取消成功',
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
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.id = this.$route.query.id
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
@import "./MakeAnAppointmentCancel.scss";
</style>



    
