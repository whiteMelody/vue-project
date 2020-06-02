<template>
  <div class="MakeAnAppointmentCancelEdit" :style="'min-height:'+ minHeight +'px' ">
    <Header :title="'预约详情'" :back="true" :fixed="true"></Header>
    <div class="box">
        <ul class="bg-white">
            <li>
                <label>
                    <b></b>
                    <span>项目</span>
                </label>
                <p>
                    <a>{{projectActive}}</a>
                </p>
            </li>
            <li>
                <label>
                    <b>*</b>
                    <span>顾问</span>
                </label>
                <p>
                    <a>{{counselorActive}}</a>
                </p>
            </li>
            <li class="border0">
                <label>
                    <b>*</b>
                    <span>美容师</span>
                </label>
                <p>
                    <a>{{cosmetologistActive}}</a>
                </p>
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
        <ul class="bg-white">
            <li class="remark">
                <label>
                    <b></b>
                    <span>取消原因</span>
                </label>
                <p><span>{{cause}}</span></p>
            </li>
        </ul>
    </div>
    
  </div>
</template>
<script>
import Header from '../../../../components/Header';
import { Toast,Dialog } from 'vant';
import { getAppointment } from '@/assets/api/Data/MakeAnAppointmentEdit';
export default {
  name: "MakeAnAppointmentCancelEdit",
  data() {
    return {
        id:'',
        minHeight: 0,
        projectActive:"123",
        counselorActive:"1456",
        cosmetologistActive:"789",
        remark:'456456234684512564212356',
        visitsDate:'2019-6-12 14:40',
        cause:"卡斯解放拉萨的JFK拉萨酱豆腐看来加撒的风景"
    };
  },
  components: {
    Header,
    Toast,
  },
  methods: {
    
  
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    
   

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
@import "./MakeAnAppointmentCancelEdit.scss";
</style>



    
