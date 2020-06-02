<template>
  <div class="wb100 bg-white" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="title" :title-left="true"></Header>

    <div class="clear0"></div>

    <div class="wb100 h80rem fixed bg-white bd-b1 bd-gray" style="left: 0; z-index: 9999;" :style=" isWeixin ? 'top:0' : 'top:.8rem;' ">
      <div class="wb80 fl f28rem text-center">
        <template v-for="(item,index) in arrs">
          <template v-if="index == curIndex">
            <div class="wb20 fl h80rem lh80rem pointer" @click="changeIndex(index)">
              <span class="bd-green bd-b2 fc-green lh80rem display-inline">{{item}}</span>
            </div>
          </template>
          <template v-else>
            <div
              class="wb20 fl fc-gray3 h80rem lh80rem pointer"
              @click="changeIndex(index)"
            >{{item}}</div>
          </template>
        </template>
      </div>
      <div class="wb20 fr" @click="logoutMy">
        <div class="wb100 bd-gray bd-l1 f30rem h50rem lh50rem Fgray-3 mat15 text-center">
          <i class="icontuichu iconfont fc-green"></i>
          退出
        </div>
      </div>
    </div>

    <div class="clear0" style="height:.8rem"></div>

    <div class="clear4 bg-white1"></div>


    <div class="wb100" v-loading="loading">

     <div class="wb100">

      <template v-if="role_id == 2 || role_id == 3 ||  role_id == 4 ||  role_id == 5">

        <!--    顾问首页    -->
        <template v-if="role_id == 3">
          <div class="pa24">

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">销售业绩（元）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.payment}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fr">
              <div class="pal26">
                <p class="f26rem lh60rem fc-gray3">划扣人头（人）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.consumeHead}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">成交人头（人）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.orderCustomer}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fr">
              <div class="pal26">
                <p class="f26rem lh60rem fc-gray3">划扣人次（次）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.consumeNumber}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">成交人次（次）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.orderCustomerQuantity}}</p>
                <div class="clear2"></div>
              </div>
            </div>


          </div>
        </template>

        <!--   店长 美容师 前台 首页   -->

        <template v-else>
          <div class="pa24">

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">销售业绩（元）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.payment}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fr">
              <div class="pal26">
                <p class="f26rem lh60rem fc-gray3">划扣业绩（元）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.consumePrice}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">成交人头（人）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.orderCustomer}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fr">
              <div class="pal26">
                <p class="f26rem lh60rem fc-gray3">划扣人头（人）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.consumeHead}}</p>
                <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
              </div>
            </div>

            <div class="wb50 fl">
              <div class="par26">
                <p class="f26rem lh60rem fc-gray3">成交人次（次）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.orderCustomerQuantity}}</p>
                <div class="clear2"></div>
              </div>
            </div>

            <div class="wb50 fr">
              <div class="pal26">
                <p class="f26rem lh60rem fc-gray3">划扣人次（次）</p>
                <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.consumeNumber}}</p>
                <div class="clear2"></div>
              </div>
            </div>

          </div>
        </template>


        <div class="clear4 bg-white1"></div>

        <div class="pa24">

          <div class="wb50 fl over-hidden">
            <i class="iconfont icondaodianrenci-1 fc-green f60rem fl mar20 mat10"></i>
            <div class="fl lh50rem">
              <p class="f26rem fc-gray2">到店人次（次）</p>
              <p class="f40rem">{{dataInfo.total.data.appointmentStoreNumber}}</p>
            </div>

              <div class="clear3" style="border-bottom: 0.01rem dashed #C0C0C0; margin-left: .8rem"></div>

              <i class="iconfont iconyuyuerenci- fc-green f60rem fl mar20 mat10"></i>
              <div class="fl lh50rem">
                <p class="f26rem fc-gray2">预约人次（次）</p>
                <p class="f40rem">{{dataInfo.total.data.appointmentNumber}}</p>
              </div>

          </div>

          <div class="fr">

            <div class="w120px h120px relative">
              <div class="absolute w80px h80px lh40rem radius50 text-center f26rem bg-white" style="bottom:0; left: 0; right: 0; top: 0; margin: auto; z-index:9">
                <p class="fc-orange f30rem mat10">{{dataInfo.total.data.rate}}%</p>
                <p class="fc-gray2">完成率</p>
              </div>
              <el-progress type="circle" :percentage="dataInfo.total.data.rate" :width="120" color="#FF5722"></el-progress>
            </div>

          </div>

          <div class="clear4 bd-t1 bd-gray"></div>

          <p class="f24rem h30rem lh30rem fc-gray2">成交率=成交人次/到店人次</p>

        </div>

        <div class="clear4 bg-white1"></div>

        <div class="pa24">
          <p class="f26rem h40rem">
            <span class="fl fc-gray3">总销耗业绩</span>
            <span class="fr f28rem fc-green">{{dataInfo.total.data.surplusPrice}} 元</span>
          </p>

          <div class="clear4 bd-b1 bd-gray"></div>

          <p class="f20rem h30rem lh60rem fc-gray2">统计的是门店所有剩余划扣总金额，不随查询条件变化而变化</p>

          <div class="clear2"></div>

        </div>

      </template>

    </div>

    <div class="clear4 bg-white1"></div>

      <div class="clear0"></div>

      <div class="wb100">
        <div class="pa20 lh60rem">
          <div class="wb50 fl fc-gray3">
            <p class="f26rem pal20">任务总数（条）</p>
            <p class="f40rem fc-green pal20">{{taskInfo.taskCount}}</p>

            <div class="clear4"></div>
            <div class="pal20 lh40rem">
              <div class="wb50 fl">
                <p class="f24rem fc-gray3">已完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.taskFinishCount}}</p>
              </div>
              <div class="wb50 fr">
                <p class="f24rem fc-gray3">未完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.taskNotFinishCount}}</p>
              </div>
            </div>
          </div>
          <div class="wb50 fl">
            <p class="f26rem pal20">回访总数（条）</p>
            <p class="f40rem fc-green pal20">{{taskInfo.reviewCount}}</p>

            <div class="clear4"></div>
            <div class="pal20 lh40rem">
              <div class="wb50 fl">
                <p class="f24rem fc-gray3">已完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.reviewFinishCount}}</p>
              </div>
              <div class="wb50 fr">
                <p class="f24rem fc-gray3">未完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.reviewNotFinishCount}}</p>
              </div>
            </div>
          </div>

          <div class="clear2"></div>
        </div>
      </div>

      <div class="clear0"></div>
    </div>

    <div class="clear4 bg-white1"></div>

    <div class="wb100">
      <div class="pa20">
        <p class="lh50rem f30rem fc-gray4">生日提醒</p>
        <div class="clear2 bor-solid-1b bd-gray"></div>
        <div class="clear2"></div>

        <div class="wb100 f28rem fc-gray3">
          <template v-for="item in birthdayList">
            <a :href="'customer.html#/CustomerDetails?id=' + item.id">
              <div class="wb100 relative lh50rem h50rem fc-gray3">
                <span class="fl">{{item.name}} {{ item.sex.value == 0 ? '（女士）' : '（先生）' }}</span>
                <span class="fr fc-gray4">{{item.birthtoday}}</span>
                <span class="fr mar50">{{item.mobile}}</span>
              </div>
            </a>
          </template>
        </div>
      </div>
    </div>

    <div class="clear0"></div>

    <div class="clear8 bg-white1"></div>

    <!--   footer   -->
    <Footer :active="0" v-show="!loading"></Footer>

  </div>
</template>
<script>
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {
  getManagement,
  taskStatistics,
  getBirthdayReminders,
  logout
} from "@/assets/api/Data/Data";

import { getUserInfo } from "@/assets/api/Data/Login";

export default {
  data() {
    return {
      minHeight: 0,
      arrs: ["本月", "今日", "昨日", "上周", "本年"],
      curIndex: 0,
      title: '',
      role_id: -1,
      loading: true,
      currentRate: 0,
      startTime: "",
      endTime: "",
      isWeixin: false,
      dataInfo: {
        totle: {
          actual: {},
          data: {}
        },
        actual:{}
      },
      taskInfo: {},
      birthdayList: []
    };
  },
  components: {
    Footer,
    Header
  },
  methods: {

    changeIndex(index) {

      this.curIndex = index;
      let date = new Date();
      if (index == 0) {
        //本月
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-1 00:00:00`;

        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));

      } else if (index == 1) {
        //今日
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 2) {
        //昨日
        let count = -1;
        date = new Date(date.getTime() + 86400 * 1000 * count);
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 3) {
        //上周
        let week = date.getDay();
        let count = 0;

        if (week == 0) {
          count = -5;
        } else {
          count = week * -1 + 1;
        }
        date = new Date(date.getTime() + 86400 * 1000 * (count - 7));
        let date2 = new Date(date.getTime() + 86400 * 1000 * 6);
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));
        let endTime = `${date2.getFullYear()}-${date2.getMonth() +1}-${date2.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 4) {
        //本年
        let startTime = `${date.getFullYear()}-1-1 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      }

        this.loading = true;

        getManagement({startTime: this.startTime, endTime: this.endTime}).then((res)=>{
            let _tmp = res.data;

          _tmp.total.data.rate = Number.parseFloat(_tmp.total.data.rate.substring(0, _tmp.total.data.rate.length-1))

            this.dataInfo = _tmp;
            this.loading = false
        }).catch((e)=>{
            console.log(e)
        });

        taskStatistics({startTime: this.startTime, endTime: this.endTime}).then((res)=>{
            this.taskInfo = res.data;
            this.loading = false
        }).catch((e)=>{
            console.log(e)
        })

    },

    logoutMy(){
        logout({}).then((res)=>{
            if(res.status == 0){
                localStorage.removeItem("webToken");
                window.location.href = 'login.html?isBack=true'
            }
        }).catch((e)=>{
            console.log(e)
        })
    },

  },
  mounted() {

      let _date = this.$route.query.date

      this.minHeight = window.innerHeight;

      if(_date){
        this.changeIndex(Number.parseInt(_date));
      }else{
        this.changeIndex(0);
      }

      getBirthdayReminders().then((res)=>{
          this.birthdayList = res.data.list
      }).catch((e)=>{
          console.log(e)
      });

      //查询权限
      getUserInfo().then((res)=>{
        if(res.status == 0){
          this.role_id = res.data.role_id;

          if( res.data.role_id == 2)  this.title = '店长首页';
          if( res.data.role_id == 3)  this.title = '顾问首页';
          if( res.data.role_id == 4)  this.title = '美容师首页';
          if( res.data.role_id == 5)  this.title = '前台首页';

          let ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger"){
            window.document.title = this.title
          }
        }
      }).catch((e)=>{
        console.log(e)
      });

      //判断是否微信内核
      let ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger"){
        this.isWeixin = true
      }else{
        this.isWeixin = false
      }

  }
};
</script>
<style scoped>
.el-p-circle {
  width: 126px;
  height: 56px;
  padding: 35px 0;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 9;
  text-align: center;
  line-height: 28px;
}
</style>



    
