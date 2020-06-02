<template>
  <div class="EssentialInformation">
    <div class="basic_top">
      <div class="basic">
        <b></b>
        <div>
          <h3>基本信息 </h3>
          <p>
            <span>{{basicData.storeName}}</span>
            <span>{{basicData.name}}</span>
            <span v-if="basicData.sex == 0">女</span>
            <span v-else-if="basicData.sex == 1">男</span>
            <span>{{basicData.mobile}}</span>
          </p>
          <ul>
            <li>微信：{{basicData.weixin}}</li>
            <li>证件号码：{{basicData.idcard}}</li>
            <li>顾客主诉：{{basicData.complaint}}</li>
          </ul>
        </div>
      </div>
      <div class="top_up">
        <b></b>
        <div>
          <h3>充值情况 </h3>
          <p>
            <span>用户编号：{{topUpData.customerNumber}}</span>
          </p>
          <ul>
            <li>充值金额（元）：{{topUpData.actualPrice|NumFormat}}</li>
            <li> 卷额（元）：{{topUpData.givePrice|NumFormat}}</li>
            <li>欠款（元）：{{topUpData.arrears_price|NumFormat}} </li>
          </ul>
        </div>
      </div>
      <div class="hospital_guide">
        <b></b>
        <div>
          <h3>到诊情况</h3>
          <p>
            <span>登记时间：{{hospitalGuideData.registerTime}}</span>
          </p>
          <ul>
            <li>第一次到诊时间：{{hospitalGuideData.firstTime}}</li>
            <li>最近到诊时间：{{hospitalGuideData.lastTime}}</li>
            <li>到诊渠道：{{hospitalGuideData.channel}} </li>
          </ul>
        </div></div>
    </div>
    <div class="consumption">
      <div class="consumption_c">
        <b></b>
        <h3>消费情况</h3>
        <em></em>
        <ul>
          <li>
            <span>消费总金额（元）</span>
            <p>{{consumptionData.payment|NumFormat}}</p>
          </li>
          <li>
            <span>退单总金额（元）</span>
            <p>{{consumptionData.refund|NumFormat}}</p>
          </li>
          <li>
            <span>消费次数（次）</span>
            <p>{{consumptionData.orderCount}}</p>
          </li>
          <li>
            <span>上门次数（次）</span>
            <p>{{consumptionData.appointmentCount}}</p>
          </li>
          <li>
            <span>所属{{$store.getters.roleName.adviser}}</span>
            <p>{{consumptionData.adviser_name}}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "EssentialInformation",
  data() {
    return {
      userId:"",
      basicData:"",
      topUpData:'',
      hospitalGuideData:"",
      consumptionData:""
    };
  },
  components: {},
  methods: {
    //顾客基本信息
    informationFn(){
      const that = this;
      that.$postRequest("/post/api/customers/information",{
        id:that.userId,
      }).then(res => {
        that.basicData = res.data
      })
    },

    //顾客充值信息
    informationPrepaidFn(){
      const that = this;
      that.$postRequest("/post/api/customers/informationPrepaid",{
        id:that.userId,
      }).then(res => {
        that.topUpData = res.data
      })
    },

    //顾客到诊信息
    informationAppointmentFn(){
      const that = this;
      that.$postRequest("/post/api/customers/informationAppointment",{
        id:that.userId,
      }).then(res => {
        that.hospitalGuideData = res.data
      })
    },

    //顾客消费信息
    informationOrderFn(){
      const that = this;
      that.$postRequest("/post/api/customers/informationOrder",{
        id:that.userId,
      }).then(res => {
        that.consumptionData = res.data
      })
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.userId = this.$route.query.id;
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.informationFn()
    this.informationPrepaidFn()
    this.informationAppointmentFn()
    this.informationOrderFn()
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
.EssentialInformation {
  padding-bottom: .2rem;
  .basic_top{
    display: flex;
    justify-content: space-between;
    >div{
      width: 5.65rem;
      height: 2.56rem;
      box-shadow: 0 0 .08rem rgba(75, 75, 75, .4);
      border-radius:2px;
      position: relative;
      b{
        position: absolute;
        top: .3rem;
        width: .06rem;
        height: .76rem;
        background: #FF5722;
      }
      div{
        padding: .26rem 0 0 .5rem;
        h3{
          font-size: .3rem;
          font-weight: normal;
        }
        p{
          font-size: .2rem;
          color: #333333;
          padding-top: .1rem; 
          span{
            padding-right: .2rem;
          }
        }
        ul{
          font-size: .16rem;
          padding-top: .26rem;
          li{
            padding-bottom: .08rem;
          }
        }
      }
    }
    .basic{
      b{
        background: #FF5722;
      }
      div{
        h3{
          color: #FF5722;
        }
      }
    }
    .top_up{
      b{
        background: #009688;
      }
      div{
        h3{
          color: #009688;
        }
      }
    }
    .hospital_guide{
      b{
        background: #1E9FFF;
      }
      div{
        h3{
          color: #1E9FFF;
        }
      }
    }
  }
  .consumption{
    margin-top: .32rem;
    height: 2.56rem;
    box-shadow: 0 0 .08rem rgba(75, 75, 75, .4);
    border-radius:2px;
    display: flex;
    align-items: center;
    .consumption_c{
      display: flex;
      align-items: center;
      b{
        width: .06rem;
        height: .76rem;
        background: #EC414D;
      }
      h3{
        font-size: .3rem;
        color: #EC414D;
        font-weight: normal;
        width: 3rem;
        text-align: center;
      }
      em{
        width: 1px;
        height: .76rem;
        background: rgba(236,65,77,0.2);
      }
      ul{
        display: flex;
        padding-left: 1rem;
        li{
          width: 2.6rem;
          height: .76rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: .1rem;
          
          span{
            color: #666666;
            font-size: .16rem;
          }
          p{
            color: #333333;
            font-size: .26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>



    
