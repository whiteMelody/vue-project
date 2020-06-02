<template>
  <div class="ClientArchives" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>
      <div class="user">
        <div class="user_name">
          <p>
            <span>
              {{userData.name}}
              <i class="iconfont iconnv" v-if="userData.sexValue == 0"></i>
              <i class="iconfont iconnan" v-else></i>
            </span>
            <a>{{userData.mobile}}</a>
          </p>
          <div class="imgBox" :style="'background: url(' +  userData.headimg  + ') no-repeat center/100%'" v-if="userData.headimg"></div>
        </div>
        <ul>
          <li>
            <span>当前客户等级：</span>
            <a>{{userData.levelName}}</a>
          </li>
          <li>
            <span>当前客户属于：</span>
            <a>{{userData.attribute}}</a>
          </li>
          <li>
            <span>客户发掘潜力：</span>
            <a>{{userData.potentialValue}}</a>
          </li>
          <li>
            <span>客户活跃度：</span>
            <a>{{userData.activity}}</a>
          </li>
        </ul>
      </div>  
      <div class="data">
        <div class="data_consumption">
          <h4>消费数据统计</h4>
          <ul>
            <li>
              <p class="fc-blue6">{{userData.appNum}}</p>
              <span>共计到店（次）</span>
            </li>
            <li>
              <p class="fc-blue6">{{userData.payment | _filterNumFormat}}</p>
              <span>消费总金额（元）</span>
            </li>
            <li>
              <p class="fc-blue6">{{userData.refundPrice | _filterNumFormat}}</p>
              <span>退单金额（元）</span>
            </li>
            <li>
              <p class="fc-blue6">{{userData.refundGivePrice | _filterNumFormat}}</p>
              <span>退单券额（元）</span>
            </li>
            <li>
              <p class="fc-red">{{userData.arrearsPrice | _filterNumFormat}}</p>
              <span>欠款金额（元）</span>
            </li>
          </ul>
        </div>
        <div class="data_consume">
          <h4>划扣数据统计 </h4>
          <ul>
            <li>
              <p class="fc-blue6">{{userData.totalConsumeNum}}</p>
              <span>共计可划扣（次）</span>
            </li>
            <li>
              <p class="fc-blue6">{{userData.alreadyConsumeNum}}</p>
              <span>已划扣次数（次）</span>
            </li>
            <li>
              <p class="fc-blue6">{{userData.surplusConsumeNum}}</p>
              <span>剩余扣次数（次）</span>
            </li>
          </ul>
        </div>
      </div>  
    </header> 

    <div class="question_list">
      <div class="question_list_header">
        <p>已回答的问题</p>
        <span v-if="listLading">共计 <i>{{listTotal}}</i> 条</span>
      </div>
      <!-- <ul>
        <li v-for="(item , index) in userList" :key="index">
          <h4><i class="iconfont icondian"></i><span>{{item.problem}}</span></h4>
          <p>
            <a>{{item.content}}</a>
          </p>
        </li>
      </ul> -->
      <ul>
        <li v-for="(item , index) in userList" :key="index">
          <h4>{{item.problem}}</h4>
          <div class="text">
            <el-tooltip :content="item.content" placement="bottom-start" effect="light"> 
              <p>{{item.content}}</p>
            </el-tooltip>  
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import { seeLabelCustomerInfoByCustomerId } from "@/shop/assets/api/client/privateArchives";

export default {
  name: "ClientArchives",
  data() {
    return {
      boxMaxHeight:"",
      userData:{},
      userList:{},
      listLading:false
    };
  },
  components: {},
  methods: {

    //获取初始数据
    seeLabelCustomerInfoByCustomerIdFn(){
    
      let post = {
        customerId :this.$route.query.id,
        start:1,
        perpage:999999
      }
      seeLabelCustomerInfoByCustomerId(post).then(res => {
        this.userData = res.data.customer;
        this.userData.sexValue = res.data.customer.sex.value;
        this.userList = res.data.list;
        // this.userList = this.userList.
        this.listTotal = res.data.total;
        this.listLading = true
      }).catch(error=>{
        console.log("getCustomerLabelType no");
      })
    },
     
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    this.seeLabelCustomerInfoByCustomerIdFn()
  },

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
.ClientArchives {
  margin: 24px 20px;
  header{
    display: flex;
    justify-content: space-between;
    .user{
      background: #fff;
      height: 312px;
      width: 3.04rem;
      padding: 0 .25rem;
      .user_name{
        padding: 24px 0;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        justify-content: space-between;
        p{
          display: flex;
          flex-direction: column;
          flex: 1;
          span{
            color: #333333;
            font-size: 18px;
            i{
              font-size: 16px;
              padding-left: 5px;
              &.iconnv{
                color: #EC414D;
              }
              &.iconnan{
                color: #2878ff;
              }
            }
          }
          a{
            font-size: 14px;
            color: #666666;
            display: block;
            padding-top: 14px;
          }
        }
        .imgBox {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            float: left;

          }
        }
      }
      ul{
        padding-top: .24rem;
        li{
          display: flex;
          padding-bottom: .12rem;
          span{
            color: #999;
            font-size: 16px;
            text-align: right;
            width: 1.2rem;
          }
          a{
            font-size: 16px;
            color: #FF5722;
          }
        }
      }
    }
    .data{
      flex: 1;
      padding-left: .2rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      div{
        height: 100px;
        background: #fff;
        padding: .24rem .25rem;
        h4{
          font-size: 16px;
          color: #333333;
          font-weight: normal;
        }
        ul{
          display: flex;
          justify-content: flex-start;
          padding-top: .22rem;
          li{
            width: 2.44rem;
            p{
              font-size: 20px;
              overflow: hidden; /*自动隐藏文字*/
              text-overflow: ellipsis;/*文字隐藏后添加省略号*/
              white-space: nowrap;/*强制不换行*/
            }
            span{
              font-size: 14px;
              color: #666;
              padding-top: .14rem;
              display: block;
            }
          }
        }
      }
    }
  }
  .question_list{
    margin-top: 20px;
    background: #fff;
    padding: 0 20px 20px;
    min-height: 4rem;
    .question_list_header {
      width: 100%;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      height: 50px;
      p{
        font-size: 16px;
        color: #333333;
      }
      span{
        padding-left: .2rem;
        color: #333333;
        i{
          font-style: normal;
          color: #FF5722;
        }
      }
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li{
        width: 32.5%;
        border: 1px solid #E5E5E5;
        margin-right: .15rem;
        margin-bottom: 10px;
        padding-bottom: .1rem;
        h4{
          background: #F2F2F2;
          color: #333333;
          font-size: 16px;
          padding-left: .2rem;
          font-weight: normal;
          line-height: 44px;
        }
        .text{
          font-size: 14px;
          color: #666;
          padding:.2rem; 
          height: 60px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display:-webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp:3; //显示的行
          p{
            cursor: pointer;
          }
        }
      }
      li:nth-of-type(3n){
        margin-right: 0;
      }
    }
    // ul{
    //   li{
    //     padding-bottom: .22rem;
    //     h4{
    //       font-size: 16px;
    //       color: #333333;
    //       font-weight: normal;
    //       padding-bottom: .12rem;
    //       display: flex;
    //       align-items: center;
    //       i{
    //         font-size: 12px;
    //         transform: scale(0.6);
    //         font-style: normal;
    //         color: #666;
    //         width: .2rem;
    //       }
    //     }
    //     p{
    //       padding-left: .2rem;
    //       font-size: 16px;
    //       color: #666;
    //     }
    //   }
    // }
  }

}
</style>