<template>
  <div class="wb100 bg-white1" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'划扣'" :back="true"></Header>

    <div class="wb100">
      <div class="pa20">
        <div class="wb100 fl h60rem radius6 bg-gray">
          <i class="iconsousuo iconfont f30rem fc-gray4 fl mal20 mat15"></i>
          <input type="text" class="bg-none bd-none h30rem lh30rem mat13 fl mal10 w400rem f26rem fc-gray3" v-model="kw" placeholder="请输入顾客姓名或电话..." />
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
        <div class="pa20 relative bg-white lh50rem fc-gray3">
          <div class="wb100">
            <p class="fc-gray4">
              <span class="fl w150rem">{{item.customer.name}}</span>
              <!-- <span class="fl">渠道：{{item.customer.mobile}}</span> -->
              <span class="fr">未划扣: <span :class=" item.sum > 0 ? 'fc-red' : '' ">{{item.sum}}</span> / {{item.orders_sum}} </span>
            </p>
            <div class="clear0"></div>
            <p>电话:{{item.customer.mobile}}</p>
            <p>顾问:{{item.members.name}}</p>
          </div>
          <div class="clear4 bd-gray bd-b1"></div>
          <div class="clear4"></div>

          <template v-if="item.sum > 0">
            <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'DeductionDetails',query:{customer_id:item.customer.id}})">
              划扣
            </div>
          </template>

          <template v-else>
            <div class="fr pat10 pab10 pal20 par20 bd-gray bd-a1 radius6 fc-gray3 f26rem lh30rem text-center minW100" @click="$router.push({name: 'DeductionDetails',query:{customer_id:item.customer.id}})">
              查看详情
            </div>
          </template>

         
          <div class="clear0"></div>
        </div>
        <div class="clear4 bg-white1"></div>
      </template>
    </div>

    <div class="clear0"></div>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading" v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>

    <!--   footer   -->
  </div>
</template>
<script>

  import Header from '../../../../components/Header'

  import { getConsumeList } from "@/assets/api/Deduction/Deduction";

  export default {
    data() {
      return {
        minHeight: 0,
        list: [],
        loading: false,
        disabled: false,
        noMore: false,
        isSearch: false,
        kw: '',
        timeout: 0,
        params: {
          kw: '',
          start: 0,       // 页码
          perpage: 10,     // 数量
        },
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

        getConsumeList(this.params).then((res) => {
          if (res.status == 0) {
            let list = res.data.list

            if (list.length < this.params.perpage) {
              //已经到底了
              this.list = this.list.concat(list)
              this.disabled = true
              this.noMore = true
              this.loading = false
            }else{
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
        this.params.kw = ''
        this.clear()
        this.load()
        this.isSearch = false
      },

    },
    mounted() {
      this.minHeight = window.innerHeight
      this.load()
    },

    watch: {
      kw(curVal, oldVal) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.clear()
          this.params.kw = curVal
          this.load()
        }, 500);
      }
    }

  };
</script>
<style scoped>
</style>




