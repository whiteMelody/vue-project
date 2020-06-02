<template>
  <div class="wb100 bg-white1" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'咨询'" :back="true"></Header>

    <div class="wb100">
      <div class="pa20">
        <div class="wb100 fl h60rem radius6 bg-gray">
          <i class="iconsousuo iconfont f30rem fc-gray4 fl mal20 mat15"></i>
          <input type="text" class="bg-none bd-none h30rem lh30rem mat13 fl mal10 w400rem f26rem fc-gray3" v-model="keyword" placeholder="请输入顾客姓名或电话..."></input>
        </div>
        <div class="clear0"></div>
      </div>
    </div>

    <div class="clear0"></div>

    <div class="wb100 f28rem"
         v-infinite-scroll="load"
         infinite-scroll-disabled="disabled"
         infinite-scroll-distance="20">
      <template v-for="item in list">
        <div class="pa20 relative bg-white">
          <div class="wb100 lh50rem fc-gray3">
            <p class="fc-gray4">
              <span class="fl">{{ item.appointment_time }}</span>
              <span class="fr" :class="item.status == 1 ? 'fc-green' : 'fc-red' " >{{ item.status == 1 ? '到店' : '未到店' }}</span>
            </p>
            <div class="clear0"></div>
            <p>客户：{{item.customer_name}}</p>
            <p>电话：{{item.customer_mobile}}</p>
            <p>项目：{{item.items_name}}</p>
            <div class="clear0"></div>
          </div>

          <template v-if="item.status == 1">
            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <template v-if="item.adviserConfirm == 2 && showBtn">
              <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="done(item.id)">
                确认接诊
              </div>
            </template>

            <template v-if="item.adviserConfirm == 1">
              <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100 mal30" @click="$router.push({name: 'Order', query: { title: '开单', appointment_id: item.id, technician_id: item.technician_id, adviser_id: item.adviser_id, customer_id: item.customer_id} })">
                开单
              </div>
              <div v-if="item.consultation_status == 0" class="fr pat10 pab10 pal20 par20 bd-orange bd-a1 radius6 fc-orange f26rem lh30rem text-center minW100" @click="$router.push({name: 'ConsultationDetails',query: {id: item.id,  adviser_id: item.adviser_id, customer_id: item.customer_id}})">
                咨询详情
              </div>
            </template>

          </template>

          <div class="clear0"></div>
        </div>
        <div class="clear4 bg-white1"></div>
      </template>

      <div class="clear4"></div>
    </div>

    <div class="clear0"></div>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>

  </div>
</template>
<script>

  import Header from '../../../../components/Header'

  import { getTodayConsultationList, getTimeline } from "@/assets/api/Consultation/Consultation";
  import { getUserInfo } from "@/assets/api/Data/Login";

  import { Toast } from 'vant';

  export default {
    data() {
      return {
        minHeight: 0,
        list: [],
        loading: false,
        disabled: false,
        noMore: false,
        isSearch: false,
        keyword: '',
        timeout: 0,
        params: {
          keyword : '',
          start: 0,       // 页码
          perpage: 10,     // 数量
        },
        showBtn: false,

      }
    },
    components: {
      Header
    },
    methods: {
      load() {

        if (this.disabled || this.loading) return

        this.disabled = true
        this.loading = true
        this.params.start++

        getTodayConsultationList(this.params).then((res) => {

          if (res.status == 0) {
            let list = res.data.list

            if (list.length < this.params.perpage) {
              console.log('已经到底了')
              //已经到底了
              this.list = this.list.concat(list)
              this.disabled = true
              this.noMore = true
              this.loading = false
            }else{
              console.log('加载数据')
              this.list = this.list.concat(list)
              this.disabled = false
              this.loading = false
            }
          } else {
            //没有数据
            this.disabled = true
            this.noMore = true
            this.loading = false
          }
        }).catch((e)=>{
          console.log(e)
        })
      },

      clear(){
        this.params.start = 0
        this.list = []
        this.disabled = false
        this.noMore = false
        this.loading = false
      },
      openSearch(){
        this.clear()
        this.load()
        this.isSearch = true
      },
      closeSearch(){
        this.params.keyword = ''
        this.clear()
        this.load()
        this.isSearch = false
      },

      done(appointment_id){
        getTimeline({appointment_id}).then((res)=>{
          setTimeout(() => {
            if( res.status == 0 ){
              Toast({
                message: '确认接诊成功',
                type: 'success',
                duration:500,
                onClose:()=>{
                  this.clear()
                  this.load()
                }
              });
            }else Toast(res.msg);
          },1000)
        }).catch((e)=>{
          console.log(e)
        })
      },

    },
    mounted() {
      this.minHeight = window.innerHeight
      this.load()

      //查询权限
      getUserInfo().then((res)=>{
        if(res.status == 0){
          if(res.data.role_id == 2 || res.data.role_id== 3){
            this.showBtn = true
          }
        }
      }).catch((e)=>{
        console.log(e)
      })

    },

    watch: {
      keyword(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.clear()
          this.params.keyword = curVal
          this.load()
        }, 500);
      }
    }

  };
</script>
<style scoped>
</style>




