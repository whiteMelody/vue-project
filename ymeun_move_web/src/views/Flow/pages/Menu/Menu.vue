<template>

    <div class="wb100 bg-white1 Menu" v-if="role_id == 4" :style=" showSearchTime || showSearchDate ? 'height:'+ minHeight +'px;' : 'min-height:' + minHeight +'px' " :class="showSearchTime || showSearchDate ? 'over-hidden' : 'over-auto'">
        <!--   header   -->
        <Header :title="'预约列表'" :title-left="true"></Header>

        <div class="wb100 relative" style="z-index: 9999">

            <div class="clear0"></div>

            <div class="wb100 f28rem fc-gray4 text-center h80rem lh80rem bg-white relative" style="z-index: 9999">
                <template v-if="showSearchTime">
                    <div class="wb30 fl fc-green text-over-hidden1" @click="showSearchTime = false">
                        {{ arrs[curIndex] }}
                        <i class="iconfont iconxiala w13rem"></i>
                    </div>
                </template>
                <template v-else>
                    <div class="wb30 fl text-over-hidden1" @click="showSearchTime = true; showSearchDate = false">
                        {{ arrs[curIndex] }}
                        <i class="iconfont iconshouqi w13rem"></i>
                    </div>
                </template>
                <div class="wb5 fl fc-gray">|</div>
                <template v-if="showSearchDate">
                    <div class="wb65 fl fc-green" @click="showSearchDate = false">
                        {{dateHorizon ? dateHorizon : '全部时间'}}
                        <i class="iconfont iconxiala w13rem"></i>
                    </div>
                </template>
                <template v-else>
                    <div class="wb65 fl" @click="showSearchDate = true; showSearchTime = false">
                        {{dateHorizon ? dateHorizon : '全部时间'}}
                        <i class="iconfont iconshouqi w13rem"></i>
                    </div>
                </template>
            </div>
        </div>

        <div class="clear4"></div>

        <div class="wb100 f28rem" v-loading="loading">
            <template v-for="(item,index) in list">
                <div class="pa20 relative bg-white fc-gray3 f28rem lh50rem">
                    <p class="fc-gray4">
                        {{item.appointment_time}}
                        <template v-if="item.status == 0">
                            <span class="fr fc-red">未到店</span>
                        </template>
                        <template v-else-if="item.status == 1 && item.adviserConfirm == 2">
                            <span class="fr fc-green">已到店</span>
                        </template>
                        <template v-else-if="item.status == 1 && item.adviserConfirm == 1">
                            <span class="fr fc-green">已到店</span>
                        </template>
                        <template v-else-if="item.status == 2">
                            <span class="fr fc-gray3">已取消</span>
                        </template>
                        <template v-else-if="item.status == 3">
                            <span class="fr fc-red">已过期</span>
                        </template>

                    </p>
                    <p>客户：{{item.customer_name}}</p>
                    <p>顾问：{{item.adviser_name}}</p>
                    <p>美容师：{{item.technician_name ? item.technician_name : '未选择'}}</p>
                    <p>项目：{{ item.item_p && item.item ? item.item_p + ' -  ' + item.item : '未选择' }}</p>

                    <div class="clear0"></div>

                </div>
                <div class="clear4" ></div>
            </template>
            <div class="clear0"></div>

            <template v-if="!list.length">
                <p class="text-center h100rem lh100rem fc-gray4">暂无数据</p>
            </template>
        </div>

        <div class="clear0"></div>

        <!--    选择时间弹窗    -->
        <div class="bg-dialog" v-show="showSearchTime">
            <div class="wb100 fixed bg-white bd-gray bd-t1" style="z-index: 9999;" :style=" isWeixin ? 'top:.8rem' : 'top:1.6rem;' ">
                <div class="pal20 par20">
                    <div class="wb100">
                        <template v-for="(item,index) in arrs">
                            <div class="wb100 h100rem lh100rem f30rem bd-gray bd-b1" @click="changeIndex(index)">
                                <span class="fl">{{item}}</span>
                                <i class="iconfont iconduihao fc-green f28rem fr" v-if="index == curIndex"></i>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!--    选择日期弹窗    -->
        <div class="bg-dialog" v-show="showSearchDate">
            <div class="bg-date-dialog bg-white bd-gray bd-t1" style="z-index: 9999;" :style=" isWeixin ? 'top:.8rem' : 'top:1.6rem;' ">
                <div class="pal20 par20 pat10 pab10 f26rem bg-white1 fc-gray3 h50rem lh50rem">
                    <template v-if="dateSelectd == 0">
                        <span class="fl bd-gray1 bd-b2">{{dateFormat(value)}}</span>
                        <span class="fl mal30 mar30">至</span>
                        <span class="fl" @click="dateSelectd = 1">{{dateFormat(value2)}}</span>
                    </template>
                    <template v-else>
                        <span class="fl" @click="dateSelectd = 0">{{dateFormat(value)}}</span>
                        <span class="fl mal30 mar30">至</span>
                        <span class="fl bd-gray1 bd-b2">{{dateFormat(value2)}}</span>
                    </template>
                    <span class="fr fc-green f26rem" @click="changePicker">确定</span>
                </div>
                <div class="clear0"></div>
                <div class="wb100 f22rem" v-show="dateSelectd == 0">
                    <el-calendar v-model="value">
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <p :class="date.getTime() >= value & date.getTime() <= value2 ? 'fc-blue' : ''">
                                {{ data.day.split('-')[2] }}
                            </p>
                        </template>
                    </el-calendar>
                </div>
                <div class="wb100 f22rem" v-show="dateSelectd == 1">
                    <el-calendar v-model="value2">
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <p :class="date.getTime() >= value & date.getTime() <= value2 ? 'fc-blue' : ''">
                                {{ data.day.split('-')[2] }}
                            </p>
                        </template>
                    </el-calendar>
                </div>
            </div>
        </div>

        <!--   footer   -->
        <Footer :active="2"></Footer>
    </div>

    <div class="Menu" v-else :style="'min-height:'+ minHeight +'px'" v-loading="loading">
      <Header :title="'流程管理'" :title-left="true"></Header>
      <ul v-if="role_id == 2">
          <a href="customer.html#/AddCustomer">
              <li>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconweibiaoti-_huaban"></use>
                  </svg>
                  <p>新增顾客</p>
              </li>
          </a>
          <li @click="$router.push({name: 'MakeAnAppointment'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconyuyue1"></use>
              </svg>
              <p>预约</p>
          </li>
          <li @click="$router.push({name: 'Triage'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben2"></use>
              </svg>
              <p>分诊</p>
          </li>
          <li @click="$router.push({name: 'Consultation'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben1"></use>
              </svg>
              <p>咨询</p>
          </li>
          <li @click="$router.push({name: 'Proceed'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben"></use>
              </svg>
              <p>收银</p>
          </li>
          <li @click="$router.push({name: 'Deduction'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben3"></use>
              </svg>
              <p>划扣</p>
          </li>
      </ul>

      <ul v-if="role_id == 5">
          <a href="customer.html#/AddCustomer">
              <li>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconweibiaoti-_huaban"></use>
                  </svg>
                  <p>新增顾客</p>
              </li>
          </a>
          <li @click="$router.push({name: 'MakeAnAppointment'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconyuyue1"></use>
              </svg>
              <p>预约</p>
          </li>
          <li @click="$router.push({name: 'Triage'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben2"></use>
              </svg>
              <p>分诊</p>
          </li>
          <li @click="$router.push({name: 'Proceed'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben"></use>
              </svg>
              <p>收银</p>
          </li>
          <li @click="$router.push({name: 'Deduction'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben3"></use>
              </svg>
              <p>划扣</p>
          </li>
      </ul>

      <ul v-if="role_id == 3">
          <a href="customer.html#/AddCustomer">
              <li>
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#iconweibiaoti-_huaban"></use>
                  </svg>
                  <p>新增顾客</p>
              </li>
          </a>
          <li @click="$router.push({name: 'MakeAnAppointment'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconyuyue1"></use>
              </svg>
              <p>预约</p>
          </li>
          <li @click="$router.push({name: 'Consultation'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben1"></use>
              </svg>
              <p>咨询</p>
          </li>
          <li @click="$router.push({name: 'Proceed'})">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconweibiaoti-_huabanfuben"></use>
              </svg>
              <p>收银</p>
          </li>
      </ul>

        <Footer :active="2"></Footer>
    </div>

</template>
<script>
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { Toast } from 'vant';

import { getUserInfo } from "@/assets/api/Data/Login";
import { appointmentList } from "@/assets/api/Triage/Triage";

export default {
  name: "Menu",
  data() {
    return {
        loading: true,
        minHeight: 0,
        role_id: -1,

        isWeixin: false,
        arrs: ["本月", "今日", "昨日", "上周", "本年"],
        curIndex: -1,
        startTime: '',
        endTime: '',
        list:[],

        showSearchTime: false,
        showSearchDate: false,
        showSelect: 0,
        userName: '',

        users_id: '',
        now: new Date().getTime(),
        value: new Date().getTime(),
        value2: new Date().getTime(),
        showDatePicker: false,
        dateSelectd: 0,
        dateHorizon: '',
    };
  },
  components: {
    Header,
    Footer,
    Toast
  },
  methods: {
      changeIndex(index) {

          this.showSearchTime = false

          this.curIndex = index;
          let date = new Date();
          if (index == 0) {
              //本月
              let startTime = `${date.getFullYear()}-${date.getMonth() +1}-01 00:00:00`;

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

          //
          this.value = new Date(this.$base.stringToDate(this.startTime))
          this.value2 = new Date(this.$base.stringToDate(this.endTime))
          this.dateHorizon = this.dateFormat(this.value) + ' 至 ' + this.dateFormat(this.value2)

          this.loading = true;

          appointmentList({start_time: this.startTime, end_time: this.endTime}).then((res)=>{
              this.list = res.data.list
              this.loading = false
          }).catch((e)=>{
              console.log(e)
          })

      },

      changePicker(){
          //判断截止时间大于开始时间
          if(this.value > this.value2){
              Toast('截止日期不能大于开始日期');
              return
          }
          this.dateHorizon = this.dateFormat(this.value) + ' 至 ' + this.dateFormat(this.value2)

          //判断是否是今日

          let date = new Date();
          let startDate = new Date(this.value)
          let endDate = new Date(this.value2)
          startDate = this.$base.stringToDate(`${startDate.getFullYear()}-${startDate.getMonth() +1}-${startDate.getDate()} 00:00:00`)
          endDate = this.$base.stringToDate(`${endDate.getFullYear()}-${endDate.getMonth() +1}-${endDate.getDate()} 00:00:00`)

          //今日
          let today = this.$base.stringToDate(`${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`)
          //本月第一天
          let first_day_of_the_month = this.$base.stringToDate(`${date.getFullYear()}-${date.getMonth() +1}-01 00:00:00`)
          //昨日
          let yesterday = today - 86400 * 1000

          //上周
          let week = date.getDay();
          let count = 0;
          if (week == 0) {
              count = -5;
          } else {
              count = week * -1 + 1;
          }
          //上周开始日期
          let _date = date.getTime() + 86400 * 1000 * (count - 7);
          //上周结束日期
          let __date = date.getTime() + 86400 * 1000 * 6;

          //本年第一天
          let first_day_of_the_year = this.$base.stringToDate(`${date.getFullYear()}-1-1 00:00:00`)

          if(startDate == today && endDate == today){
              //今日
              this.curIndex = 1
          }
          if(startDate == yesterday && endDate == yesterday){
              //昨日
              this.curIndex = 2
          }
          if(startDate == first_day_of_the_month && endDate == today){
              //本月
              this.curIndex = 0
          }
          if(startDate == _date && endDate == __date){
              //上周
              this.curIndex = 3
          }
          if(startDate == first_day_of_the_year && endDate == today){
              //本年
              this.curIndex = 4
          }

          startDate = new Date(startDate)
          endDate = new Date(endDate)

          let startTime = `${startDate.getFullYear()}-${startDate.getMonth() +1}-${startDate.getDate()} 00:00:00`;
          this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

          let endTime = `${endDate.getFullYear()}-${endDate.getMonth() +1}-${endDate.getDate()} 23:59:59`;
          this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));

          this.showSearchDate = false

          this.loading = true;

          appointmentList({start_time: this.startTime, end_time: this.endTime}).then((res)=>{
              this.list = res.data.list
              this.loading = false
          }).catch((e)=>{
              console.log(e)
          })
      },
      dateFormat(key){
          if(key == "" || key == null){
              return
          }
          let date = new Date(key);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let m = date.getMinutes();
          m = m < 10 ? ('0' + m) : m;
          let s = date.getSeconds();
          s = s < 10 ? ('0' + s) : s;
          return y + '-' + MM + '-' + d ;
      },

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

      //查询权限
      getUserInfo().then((res)=>{
          if(res.status == 0){
              this.role_id = res.data.role_id
              this.loading = false
          }
      }).catch((e)=>{
          console.log(e)
          this.loading = false
      })

      this.changeIndex(1)

      //判断是否微信内核
      let ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger"){
          this.isWeixin = true
      }else{
          this.isWeixin = false
      }
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
@import "./Menu.scss";
</style>



    
