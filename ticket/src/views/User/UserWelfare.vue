<template>
  <div id="user_ welfare_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'活动中心'" :back="true"></navTitle>

    <div class="clear"></div>

    <div class="pal15 par15">
      <template v-for="(item,key) in welfares">

        <template v-if="key == 0">
          <div class="clear1"></div>
          <div class="wb100 img-area relative radius4 over-hidden">
            <template v-if="item.status == 1">
              <template v-if="login">
                <img src="~@/assets/images/act-img1.png" @click="getAct(0)">
              </template>
              <template v-else>
                <router-link :to="{ name: 'Login', query:{ call: 'UserWelfare' } }">
                  <img src="~@/assets/images/act-img1.png">
                </router-link>
              </template>
            </template>
            <template v-else>
              <div class="absolute wb100" style="height: 100%; background: rgba(255,255,255,.6)"></div>
              <img src="~@/assets/images/act-img1.png">
              <div class="absolute h70px w70px" style=" right: 15px; bottom: 15px">
                <img src="~@/assets/images/icon-got.png">
              </div>
            </template>
          </div>
        </template>

        <template v-if="key == 1">
          <div class="clear1"></div>
          <div class="wb100 img-area relative radius4 over-hidden">

            <template v-if="item.status == 1">
              <!--<template v-if="user.accountBalance > 20">-->
                <!--<img src="~@/assets/images/act-img2.png" @click="getAct(1)">-->
              <!--</template>-->
              <!--<template v-else>-->
                <router-link :to="{ name: 'RechargeFirst', params:{ money: 20 } }">
                  <img src="~@/assets/images/act-img2.png">
                </router-link>
              <!--</template>-->
            </template>
            <template v-else>
              <div class="absolute wb100" style="height: 100%; background: rgba(255,255,255,.5)"></div>
              <img src="~@/assets/images/act-img2.png">
              <div class="absolute h70px w70px" style=" right: 15px; bottom: 15px">
                <img src="~@/assets/images/icon-got.png">
              </div>
            </template>
          </div>
        </template>

        <template v-if="key == 2">
          <div class="clear1"></div>
          <div class="wb100 img-area relative radius4 over-hidden">
            <template v-if="item.status == 1">
              <!--<template v-if="user.accountBalance > 68">-->
                <!--<img src="~@/assets/images/act-img3.png" @click="getAct(2)">>-->
              <!--</template>-->
              <!--<template v-else>-->
                <router-link :to="{ name: 'RechargeFirst', params:{ money: 68 } }">
                  <img src="~@/assets/images/act-img3.png">
                </router-link>
              <!--</template>-->
            </template>
            <template v-else>
              <div class="absolute wb100" style="height: 100%; background: rgba(255,255,255,.5)"></div>
              <img src="~@/assets/images/act-img3.png">
              <div class="absolute h70px w70px" style=" right: 15px; bottom: 15px">
                <img src="~@/assets/images/icon-got.png">
              </div>
            </template>
          </div>
        </template>

        <!--<template v-if="key == 3">-->
        <!--<div class="clear1"></div>-->
          <!--<div class="wb100 img-area relative radius4 over-hidden">-->
            <!--<template v-if="item.status == 1">-->
              <!--&lt;!&ndash;<template v-if="user.accountBalance > 68">&ndash;&gt;-->
              <!--&lt;!&ndash;<img src="~@/assets/images/act-img3.png" @click="getAct(2)">>&ndash;&gt;-->
              <!--&lt;!&ndash;</template>&ndash;&gt;-->
              <!--&lt;!&ndash;<template v-else>&ndash;&gt;-->
              <!--<router-link :to="{ name: 'ActReturn' }">-->
                <!--<img src="~@/assets/images/act-img4.png">-->
              <!--</router-link>-->
              <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--</template>-->
            <!--<template v-else>-->
              <!--<div class="absolute wb100" style="height: 100%; background: rgba(255,255,255,.5)"></div>-->
              <!--<img src="~@/assets/images/act-img4.png">-->
              <!--<div class="absolute h70px w70px" style=" right: 15px; bottom: 15px">-->
                <!--<img src="~@/assets/images/icon-got.png">-->
              <!--</div>-->
            <!--</template>-->
          <!--</div>-->
        <!--</template>-->

        <template v-if="key == 4">
          <div class="clear1"></div>
          <div class="wb100 img-area relative radius4 over-hidden">
            <template v-if="item.status == 1">
              <template v-if="login">
                <img src="~@/assets/images/act-img5.png" @click="getAct(5)">
              </template>
              <template v-else>
                <router-link :to="{ name: 'Login', query:{ call: 'UserWelfare' } }">
                  <img src="~@/assets/images/act-img5.png">
                </router-link>
              </template>
            </template>
            <template v-else>
              <div class="absolute wb100" style="height: 100%; background: rgba(255,255,255,.6)"></div>
              <img src="~@/assets/images/act-img5.png">
              <div class="absolute h70px w70px" style=" right: 15px; bottom: 15px">
                <img src="~@/assets/images/icon-got.png">
              </div>
            </template>
          </div>
        </template>

      </template>
    </div>

    <div class="clear1"></div>

    <!--<template v-for="(item,key) in welfares">-->

      <!--<div class="h70px pal15 par15 warpper-black-3">-->
        <!--&lt;!&ndash;<router-link :to="{ name: 'RechargeFirst' }">&ndash;&gt;-->
          <!--<div class="wb100">-->
            <!--<img src="~@/assets/images/icon-nav3.png" class="fl h40px mat15 mar10">-->
            <!--<div class="wb50 fl lh25px mat10">-->
              <!--<p class="F14 Fwhite-1">{{item.couponName}}</p>-->
              <!--<p class="Fblack-2 F12">{{item.content}}</p>-->
            <!--</div>-->
            <!--<template v-if="item.status == 1">-->
              <!--&lt;!&ndash;可领取&ndash;&gt;-->
              <!--<template v-if="key == 0">-->
                <!--&lt;!&ndash;注册领取&ndash;&gt;-->
                <!--<router-link :to="{ name: 'Login' }">-->
                  <!--<div class="w100px warpper-orange-2 Fwhite F14 radius15 h30px lh30px fr text-center mat20 F14">-->
                    <!--领取-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</template>-->

              <!--<template v-if="key == 1">-->
                <!--&lt;!&ndash;注册领取&ndash;&gt;-->
                <!--<router-link :to="{ name: 'RechargeFirst' }">-->
                  <!--<div class="w100px warpper-orange-2 Fwhite F14 radius15 h30px lh30px fr text-center mat20 F14">-->
                    <!--领取-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</template>-->

              <!--<template v-if="key == 2">-->
                <!--&lt;!&ndash;双倍返还&ndash;&gt;-->
                <!--<router-link :to="{ name: 'ActReturn' }">-->
                  <!--<div class="w100px warpper-orange-2 Fwhite F14 radius15 h30px lh30px fr text-center mat20 F14">-->
                    <!--领取-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</template>-->

            <!--</template>-->
            <!--<template v-else>-->
              <!--<div class="w100px warpper-gray Fblack-2 F14 radius15 h30px lh30px fr text-center mat20 F14">-->
                <!--已领取-->
              <!--</div>-->
            <!--</template>-->

            <!--<div class="clear"></div>-->
          <!--</div>-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--</div>-->

      <!--<div class="clear bor-black2 bor-solid-1b"></div>-->

    <!--</template>-->

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        myHeight: 0,
        user: {},
        login: false,
        welfares: [{
          couponName: '注册大礼包',
          couponNo: 'RC20180322',
          content: '新人注册即送200元大礼包',
          getTime: '',
          status: 1,
        },{
          couponName: '20元充值大礼包',
          couponNo: 'TR2018032320',
          content: '首次充值20得348大礼包',
          getTime: '',
          status: 1,
        },{
          couponName: '68元充值大礼包',
          couponNo: 'TR2018032368',
          content: '首次充值68得348大礼包',
          getTime: '',
          status: 1,
        },{
          couponName: '不中返双',
          couponNo: '不中返双',
          content: '不中返双',
          getTime: '',
          status: 1,
        },{
          couponName: '新人专享298元礼包',
          couponNo: 'RC20180404298',
          content: '新人专享298元礼包',
          getTime: '',
          status: 1,
        },]

      }
    },

    methods: {

        getAct(type){
            if(type == 0){
              //- 领取新人红包
              Interface.registerCoupon('RC20180322', (data) => {
                  if(data){
                    this.$message({
                      type: 'success',
                      message: '领取成功'
                    });
                    this.init();
                  }
              })
            }else if(type == 5){
            //- 领取新人专享298红包
            Interface.newUserCoupon('RC20180404298', (data) => {
              if(data){
                this.$message({
                  type: 'success',
                  message: '领取成功'
                });
                this.init();
              }
            })
          }
        },

        init(){
          Interface.giftCouponRecord( (data) => {
            let _tmp = data.returnJSON;
            for(let i=0; i<this.welfares.length; i++){
              for(let j=0; j<_tmp.length; j++){
                if(this.welfares[i].couponNo == _tmp[j].couponNo){
                  this.welfares[i].status = 0;
                }
              }
            }
          })
        }

    },

    mounted(){
      this.myHeight = $(window).height();

      Interface.userBaseInfo( (data) => {

        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
          } else {
            this.user = data.returnJSON;
            this.login = true;
          }
        } else {
          this.login = false;
        }

        this.fullscreenLoading = false;

      });

      this.init();
    }

  }


</script>

