<template>
  <div class="EssentialInformation">
    <div class="EssentialInformation_left">
      <h3>基本信息</h3>
      <div class="text1">
        <div class="name">
          <span>{{basicData.name}}</span>
          <i v-if="basicData.sex == 0" class="iconfont iconnv"></i>
          <i v-else class="iconfont iconnan"></i>
        </div>
        <ul>
          <li>
            <span>所属门店</span>
            <p>{{basicData.storeName}}</p>
          </li>
          <li>
            <span>电话号码</span>
            <p>{{basicData.mobile}}</p>
          </li>
          <li>
            <span>微信</span>
            <p>{{basicData.weixin}}</p>
          </li>
          <li>
            <span>证件号码</span>
            <p>{{basicData.idcard}}</p>
          </li>
          <li>
            <span>用户编码</span>
            <p>{{basicData.customerNumber}}</p>
          </li>
          <li>
            <span>所属{{$store.getters.roleName.adviser}}</span>
            <p>{{consumptionData.adviser_name}}</p>
          </li>
        </ul>
      </div>
      <div class="text2">
        <span>客户主诉</span>
        <p>{{basicData.complaint}}</p>
      </div>
    </div>
    <div class="EssentialInformation_rigth">
      <div>
        <h3>到诊情况</h3>
        <ul>
          <li>
            <span>登记时间</span>
            <p>{{hospitalGuideData.registerTime}}</p>
          </li>
          <li>
            <span>第一次到诊时间</span>
            <p>{{hospitalGuideData.firstTime}}</p>
          </li>
          <li>
            <span>最近到诊时间</span>
            <p>{{hospitalGuideData.lastTime}}</p>
          </li>
          <li>
            <span>到诊渠道</span>
            <p>{{hospitalGuideData.channel}}</p>
          </li>
        </ul>
      </div>

      <div>
        <h3>充值情况</h3>
        <ul>
          <li>
            <span>充值金额（元）</span>
            <p>{{topUpData.actualPrice|NumFormat}}</p>
          </li>
          <li>
            <span>券额（元）</span>
            <p>{{topUpData.givePrice|NumFormat}}</p>
          </li>
          <li>
            <span>欠款（元）</span>
            <p>{{topUpData.arrears_price|NumFormat}}</p>
          </li>
        </ul>
      </div>

      <div>
        <h3>消费情况</h3>
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
        </ul>
      </div>


    </div>
  </div>
</template>
<script>
import { information , informationPrepaid , informationAppointment , informationOrder } from "@/chain/assets/api/customerDetails/customerDetails";
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
   
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.userId = this.$route.query.id;

    //顾客基本信息
    information({
      id:this.userId,
    }).then(res => {
      this.basicData = res.data
    }).catch(error=>{
      console.log("information no");
    })
    
    //顾客充值信息
    informationPrepaid({
      id:this.userId,
    }).then(res => {
      this.topUpData = res.data
    }).catch(error=>{
      console.log("informationPrepaid no");
    })
    
    //顾客到诊信息
    informationAppointment({
      id:this.userId,
    }).then(res => {
      this.hospitalGuideData = res.data
    }).catch(error=>{
      console.log("informationAppointment no");
    })
    
    //顾客消费信息
    informationOrder({
      id:this.userId,
    }).then(res => {
      this.consumptionData = res.data
    }).catch(error=>{
      console.log("informationOrder no");
    })
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
 
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
  display: flex;
  .EssentialInformation_left{
    width: 500px;
    background: #fff;
    h3{
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #F2F2F2;
      font-weight: normal;
      line-height: 40px;
      padding-left:16px; 
    }
    .text1{
      margin-top: 10px;
      padding: 0 16px;
      border-bottom: 1px solid #F2F2F2;
      .name{
        display: flex;
        align-items: center;
        span{
          color: #333;
          font-size: 16px;
        }
        i{
          margin-left: 10px;
          font-size: 14px;
          &.iconnv{
            color: #EC414D;
          }
          &.iconnan{
            color: #2878ff;
          }
        }
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 20px;
        li{
          margin-top: 20px;
          width: 49%;
          span{
            color: #999;
            font-size: 14px;
          }
          p{
            color: #333;
            font-size: 14px;
            margin-top: 4px;
          }
        }
      }
    }
    .text2{
      padding: 20px 16px;
      span{
        color: #999;
        font-size: 14px;
      }
      P{
        color: #333;
        margin-top: 4px;
        font-size: 14px;
      }
    }
  }
  .EssentialInformation_rigth{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    div{
      background: #fff;
      width: 100%;
      h3{
        line-height: 40px;
        padding-left: 18px;
        font-weight: normal;
        border-bottom: 1px solid #F2F2F2;
      }
      ul{
        display: flex;
        padding: 20px 0;
        padding-left: 18px;
        li{
          width: 200px;
          span{
            color: #999;
            font-size: 14px;
          }
          P{
            color: #333;
            margin-top: 4px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>



    
