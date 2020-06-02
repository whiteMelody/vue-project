<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  },
  components:{
  },

  mounted() {
  },

}
</script>

<style lang="scss">
// 数据列表样式
/*.tankingTime {*/
/*  margin-top: 0.19rem;*/
/*  position: relative;*/
/*  font-size: 14px;*/
/*  font-family: MicrosoftYaHei;*/
/*  font-weight: 400;*/
/*  height: 36px;*/
/*  button {*/
/*    position: absolute;*/
/*    top: 0;*/
/*    left: 2.2rem;*/
/*    width: .8rem;*/
/*    height: 32px;*/
/*    background-color: #009688;*/
/*    border-radius: 2px;*/
/*    text-align: center;*/
/*    line-height: 32px;*/
/*    font-size: 0.16rem;*/
/*    color: #ffffff;*/
/*    border: none;*/
/*    cursor: pointer;*/
/*  }*/
/*}*/
/*.table_list {*/
/*  width: 100%;*/
/*  text-align: center;*/
/*  font-size: 0.16rem;*/
/*  margin-top: 0.19rem;*/
/*  border-collapse:collapse;*/
/*  thead {*/
/*    tr {*/
/*      height: 0.4rem;*/
/*      font-size:.16rem;*/
/*      cursor: pointer;*/
/*      background-color: #f8f8f8;*/
/*      .colorText {*/
/*        color: #009688;*/
/*      }*/
/*      th {*/
/*      border:1px solid #f2f2f2;*/
/*        border-collapse: collapse;*/
/*      }*/
/*    }*/
/*  }*/
/*  tbody {*/
/*    tr {*/
/*      height: 0.4rem;*/
/*      font-size:.16rem;*/
/*      cursor: pointer;*/
/*      .colorText {*/
/*        color: #009688;*/
/*      }*/
/*      td {*/
/*      border:1px solid #f1f1f1;*/
/*        border-collapse: collapse;*/
/*      }*/
/*    }*/
/*    tr:nth-of-type(even) {*/
/*      background-color: #f8f8f8;*/
/*    }*/
/*    tr:hover {*/
/*      background-color: #eefffd;*/
/*    }*/
/*  }*/
/*}*/
</style>

<style lang="scss">
// 数据总汇样式

/*.aggregatePerformance {*/
/*  width: 100%;*/
/*  height: 1.13rem;*/
/*  background-color: #ffeaeb;*/
/*  margin-top: 0.2rem;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  font-family: MicrosoftYaHei;*/
/*  font-weight: 400;*/
/*  .Total {*/
/*    width: 3.36rem;*/
/*    margin-left: 0.29rem;*/
/*    span {*/
/*      font-size: 16px;*/
/*      color: #666666;*/
/*    }*/
/*    p {*/
/*      margin-top: 0.2rem;*/
/*      font-size: 0.3rem;*/
/*      color: #ec414d;*/
/*      font-weight: bold;*/
/*    }*/
/*  }*/
/*  .henxian {*/
/*    width: 0.01rem;*/
/*    height: 0.4rem;*/
/*    background-color: #ec414d;*/
/*  }*/
/*  ul {*/
/*    flex: 1;*/
/*    display: flex;*/
/*    li {*/
/*      // width: 20%;*/
/*      // float: left;*/
/*      flex: 1;*/
/*      padding-left: 0.82rem;*/
/*      span {*/
/*        font-size: 16px;*/
/*        color: #666666;*/
/*      }*/
/*      p {*/
/*        margin-top: 0.2rem;*/
/*        font-size: 0.26rem;*/
/*        color: #333333;*/
/*      }*/
/*    }*/
/*  }*/
/*}*/
</style>
<style>
/*.pagesBox {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  margin-top: 0.4rem;*/
/*}*/
/*.pagesBox .ivu-page-item-active {*/
/*  border-color: #009688;*/
/*}*/
/*.pagesBox .ivu-page-item:hover {*/
/*  border-color: #009688;*/
/*}*/
/*.ivu-select,*/
/*.ivu-date-picker,*/
/*.ivu-input-wrapper {*/
/*  height: 0.3rem !important;*/
/*}*/
</style>

<style lang="scss">
/*.Index .ivu-select-single .ivu-select-selection .ivu-select-selected-value {*/
/*  font-size:.16rem;*/
/*}*/
/*.Index .ivu-select-single .ivu-select-selection .ivu-select-placeholder {*/
/*  font-size:.16rem;*/
/*}*/
/*.Index .ivu-select-item {*/
/*  font-size:.16rem;*/
/*}*/

/*.Index .tankingTime button:hover {*/
/*  background-color:#04776c;*/
/*}*/
</style>