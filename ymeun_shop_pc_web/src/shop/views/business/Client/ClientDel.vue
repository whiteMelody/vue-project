<template>
  <div class="ClientDel">
    <header>
        <a :class="{'active' : tableIndex == 0}" @click="tableIndex = 0">基本信息</a>
        <em></em>
        <a :class="{'active' : tableIndex == 1}" @click="tableIndex = 1">咨询信息</a>
        <em></em>
        <a :class="{'active' : tableIndex == 2}" @click="tableIndex = 2">到诊信息</a>
        <em></em>
        <a :class="{'active' : tableIndex == 3}" @click="tableIndex = 3">消费信息</a>
        <em></em>
        <a :class="{'active' : tableIndex == 4}" @click="tableIndex = 4">划扣明细</a>
        <em></em>
        <a :class="{'active' : tableIndex == 5}" @click="tableIndex = 5">回访</a>
        <em></em>
        <a :class="{'active' : tableIndex == 6}" @click="tableIndex = 6">任务</a>
        <em v-if="allowed"></em>
        <a :class="{'active' : tableIndex == 7}" v-if="allowed" @click="tableIndex = 7">私密档案分析</a>
        <em></em>
        <a :class="{'active' : tableIndex == 8}" @click="tableIndex = 8">铺垫任务</a>
        <em v-if="IntroducerListAllowed"></em>
        <a :class="{'active' : tableIndex == 9}" @click="tableIndex = 9" v-if="IntroducerListAllowed">转介绍</a>
    </header>
    <div class="box">
        <basic v-if="tableIndex == 0" :id='id'></basic>
        <advisory v-else-if="tableIndex == 1"></advisory>
        <to-the-diagnosis v-else-if="tableIndex == 2"></to-the-diagnosis>
        <consumption v-else-if="tableIndex == 3"></consumption>
        <consume v-else-if="tableIndex == 4"></Consume>
        <callback v-else-if="tableIndex == 5"></callback>
        <clientTask v-else-if="tableIndex == 6"></clientTask>
        <ClientArchives v-else-if="tableIndex == 7"></ClientArchives>
        <ForeshaList v-else-if="tableIndex == 8"></ForeshaList>
        <introducer-list v-else-if="tableIndex == 9" :id='id'></introducer-list>
    </div>
  </div>
</template>
<script>
import Basic from './ClientDel/Basic';
import Advisory from './ClientDel/Advisory';
import ToTheDiagnosis from './ClientDel/ToTheDiagnosis';
import Consumption from './ClientDel/Consumption';
import Consume from './ClientDel/Consume';
import Callback from './ClientDel/Callback';
import ClientTask from './ClientDel/ClientTask';
import ClientArchives from './ClientDel/ClientArchives';
import ForeshaList from './ClientDel/ForeshaList';
import IntroducerList from './ClientDel/IntroducerList';

// 是否开启私密档案分析
import { getProgramList } from "@/shop/assets/api/common/common"

export default {
  name: "ClientDel",
  data() {
    return {
      tableIndex:0,
      id:'',
      allowed:'',
      IntroducerListAllowed:false
    };
  },
  components: {
    Basic,  //基本信息
    Advisory, //咨询信息
    ToTheDiagnosis, //到诊信息
    Consumption,  //消费信息
    Consume,  //划扣信息
    Callback, //回访
    ClientTask, //任务
    ClientArchives, //私密档案分析
    ForeshaList, //铺垫列表
    IntroducerList, //转介绍
  },
  methods: {
     getProgram() {
       getProgramList().then(res => {
         if (res.status == 0) {
           if (res.data.list.smdafx.allowed == 1) this.allowed = true;
           if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
         }
       }).catch(error=>{
        console.log("getProgramList no");
      })
     }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.id = this.$route.query.id;
    if( this.$base.isNull(this.$route.query.types)){
      this.tableIndex = 0
    }else{
      this.tableIndex = this.$route.query.types;
    }

    this.getProgram();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.ClientDel {
  header{
    display: flex;
    line-height: 40px;
    background: #fff;
    align-items: center;
    flex-wrap: wrap;
    a{
      width: 108px;
      text-align: center;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
      border-top-width:2px;
      border-top-style: solid;
      border-top-color: #fff; 
      border-bottom: 1px solid #f2f2f2;
    }
    em{
      width: 1px;
      height: 10px;
      background: #E5E5E5;
    }
    .active{
      background: #F8F8F8;
      color: #333;
      border-top-color: #333333;
    }
  }
}
</style>


    
