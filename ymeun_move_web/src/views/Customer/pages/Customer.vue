<template>
  <div class="wb100 bg-white1" :style="'min-height:'+ minHeight +'px' ">
      <!--   header   -->
      <Header :title="'顾客管理'" :title-left="true"></Header>

      <div class="wb100" v-show="!isSearch">
            <div class="pa20 bg-white1">
              <div class="w400rem fl h60rem  radius6 bg-gray"  @click="openSearch">
                    <i class="iconsousuo iconfont f30rem fc-gray4 fl mal20 mat15"></i>
                  <span class="fl fc-gray2 f26rem lh60rem mal10">请输入顾客姓名或电话...</span>
              </div>
              <div class="w160rem h60rem lh60rem text-center radius6 fr bg-orange fc-white f26rem" @click="$router.push({name: 'AddCustomer'})">
                新增顾客
              </div>
              <div class="clear0"></div>
            </div>
      </div>

      <div class="wb100" v-show="isSearch">
          <div class="pa20">
              <div class="wb85 fl h60rem radius6 bg-gray">
                  <i class="iconsousuo iconfont f30rem fc-gray4 fl mal20 mat15"></i>
                  <input type="text" class="bg-none bd-none h30rem lh30rem mat13 fl mal10 w400rem f26rem fc-gray3" v-model="kw" autofocus="autofocus" placeholder="请输入顾客姓名或电话..."></input>
              </div>
              <div class="fr lh60rem fc-gray4 f28rem" @click="closeSearch">
                  取消
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
                <div class="wb100" @click="$router.push({name: 'CustomerDetails', query: { id: item.id}})">
                    <p class="fc-gray4">
                        <span class="fl maxW300 minW150 text-over-hidden1 mar30">{{item.name}}</span>
                        <span class="fl">{{item.mobile}}</span>
                    </p>
                    <div class="clear4"></div>
                    <p class="f26rem fc-gray3">
                        <span class="maxW300 minW200 fl text-over-hidden1">渠道：{{item.channel.name}}</span>
                        <span class="fl f20rem fc-gray mal20 mar20"> | </span>
                        <span class="fl">顾问：{{item.member.name}}</span>
                    </p>
                    <div class="w50rem h50rem absolute" style="right: .2rem; top: .4rem">
                        <i class="iconfont iconxiangyou f30rem"></i>
                    </div>
                    <div class="clear0"></div>
                </div>
                <div class="clear4 bd-gray bd-b1"></div>
                <div class="clear4"></div>
                <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem text-center minW100" @click="$router.push({name: 'AddVisits', query:{ id: item.id }})">
                    添加主动回访
                </div>
                <div class="clear0"></div>
            </div>
          <div class="clear4 bg-white1"></div>
          </template>
      </div>

    <div class="clear0"></div>

    <div class="h80rem wb100 f28rem bg-white1" v-show="loading"  v-loading="loading"></div>

    <div class="wb100 h60rem f28rem lh80rem fc-gray2 text-center" v-show="noMore">没有更多了</div>

    <!--   footer   -->
    <Footer :active="1"></Footer>
  </div>
</template>
<script>

    import Header from '../../../components/Header'
    import Footer from '../../../components/Footer'

    import { customerList } from "@/assets/api/Customer/Customer";

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
            Footer, Header
        },
        methods: {
            load() {

                if (this.disabled || this.loading) return

                this.disabled = true
                this.loading = true
                this.params.start++

                customerList(this.params).then((res) => {
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
                // this.load()
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

            //        /post/task/dailyReview?customer_id=5&content=范德萨发生的&reviewTime=2019-06-12

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



    
