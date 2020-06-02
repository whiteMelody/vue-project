<template>

  <div id="recharge_page" class="wb100"  :style="'min-height: '+ myHeight +'px; background:#f13738'">

    <loader :show="fullscreenLoading"></loader>

    <template v-if="money == 20">
      <navTitle :title="'充20得98'" :back="true"></navTitle>

      <!--活动规则弹窗-->
      <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showRule == true" @click="showRule = false"></div>
      <div class="wb100 fixed" style="bottom: 0; z-index: 9999;" v-show="showRule == true">
        <div class="pa15 warpper-white h20px lh20px Fgray-3">
          <span class="fl">活动规则</span>
          <span class="fr h20px lh20px" @click="showRule = false">关闭</span>
        </div>
        <div class="wb100" style="background: #FFF5EB">
          <div class="pa15 F14 Fgray-3 lh20px">
            <p>1.该活动仅限于在本页面通过“立即充值”按钮完成充值参与进行，98元红包充值后立即到账，用户可以在个人中心—红包中进行查看</p>
            <div class="clear1"></div>
            <p>2.充值的20元本金立即到账，当日生效的红包可立即使用，红包从领取时生效，到期未使用自动过期</p>
            <div class="clear1"></div>
            <p>3.本活动为“稳赢竞彩”新用户专享，每个用户仅限参与一次，我们将竭力确认保证活动的公平和公正，若有发现任何作弊行为，我们有权不派发或者取消已派发的红包</p>
            <div class="clear1"></div>
            <p>4.稳赢竞彩有权调整活动内容红包生效时间，且不需要对用户或第三方承担任何责任，本活动最终解释权归稳赢竞彩所有</p>
            <div class="clear"></div>
          </div>
        </div>
      </div>

      <div class="wb100 img-area relative" style="z-index: 1">
        <img src="~@/assets/images/recharge-bg2.jpg">
      </div>

      <div class="wb100 relative" style="z-index: 2; margin-top: -40px;">
        <img src="~@/assets/images/recharge-btn.png" class="fr h30px mar15" @click="showRule = true">
      </div>

      <div class="clear1"></div>

      <!--小喇叭-->
      <div class="wb100">
        <div class="pal40 pat5 pab5 par15 h30px lh30px Fwhite relative warpper-orange-2">
          <img src="~@/assets/images/icon-notice.png" class="h16px absolute" style="top: 12px; left: 15px;">
          <div class="wb100 over-hidden h30px lh30px">
            <div :style="'margin-top: '+ marginTop +'px; transition: all .5s;'">
              <template v-for="item in notices">
                <p class="h30px lh30px text-over-hidden1 Fwhite">{{item}}</p>
                <div class="clear"></div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="clear"></div>

      <div class="wb100">

        <div class="pat20 pab20 pal30 par30 text-center">

          <div :style="'width:'+ width +'px; height: '+ (width - 30) +'px; background:#fff6e5; border: 10px solid #f6ba64'" class="radius20 fl pab20">
            <p class="Fred-4">
              <span style="font-size: 40px">20</span>元
            </p>
            <p class="lh25px Fgray-3">充值本金</p>
            <p class="lh25px Fred-4">立即到账</p>
          </div>

          <div :style="'width:'+ width +'px; height: '+ (width - 30) +'px; background:#fff6e5; border: 10px solid #f6ba64'" class="radius20 fr pab20 relative">
            <template v-if="got_20 == true">
              <!--已领取-->
              <div class="absolute radius10" style="width: 100%; height: 100%; background: rgba(255, 255, 255, .3)">
                <img src="~@/assets/images/icon-got.png" class="h80px w80px absolute" style="left: 0; right: 0; bottom: 0; top: 0; margin: auto;">
              </div>
            </template>
            <p class="Fred-4">
              <span style="font-size: 40px">98</span>元
            </p>
            <p class="lh25px Fgray-3">赠送红包</p>
            <p class="lh25px Fred-4">立即到账</p>
          </div>

        </div>

        <div class="clear1"></div>

        <template v-if="got_20 == true">
          <div class="pa30">
            <div class=" Fgray-3 warpper-gray-1 Fb text-center h50px lh50px F18 text-center radius25">
              已领取
            </div>
          </div>
        </template>

        <template v-else>
          <!--<router-link :to="{ name: 'Recharge', query: { first: 20 } }">-->
            <div class="pa30" @click="toRecharge(20)">
              <div class=" Fred Fb text-center h50px lh50px F18 text-center radius25 btn-shadow">
                立即充值抢98元
              </div>
            </div>
          <!--</router-link>-->
        </template>



      </div>
    </template>

    <template v-else>
      <navTitle :title="'充68得168'" :back="true"></navTitle>

      <!--活动规则弹窗-->
      <div class="dialogBg" style="z-index: 9999; background: rgba(0,0,0,.7);" v-show="showRule == true" @click="showRule = false"></div>
      <div class="wb100 fixed" style="bottom: 0; z-index: 9999;" v-show="showRule == true">
        <div class="pa15 warpper-white h20px lh20px Fgray-3">
          <span class="fl">活动规则</span>
          <span class="fr h20px lh20px" @click="showRule = false">关闭</span>
        </div>
        <div class="wb100" style="background: #FFF5EB">
          <div class="pa15 F14 Fgray-3 lh20px">
            <p>1.该活动仅限于在本页面通过“立即充值”按钮完成充值参与进行，168元红包充值后立即到账，用户可以在个人中心—红包中进行查看</p>
            <div class="clear1"></div>
            <p>2.充值的68元本金立即到账，当日生效的红包可立即使用，红包从领取时生效，到期未使用自动过期</p>
            <div class="clear1"></div>
            <p>3.本活动为“稳赢竞彩”新用户专享，每个用户仅限参与一次，我们将竭力确认保证活动的公平和公正，若有发现任何作弊行为，我们有权不派发或者取消已派发的红包</p>
            <div class="clear1"></div>
            <p>4.稳赢竞彩有权调整活动内容红包生效时间，且不需要对用户或第三方承担任何责任，本活动最终解释权归稳赢竞彩所有</p>
            <div class="clear"></div>
          </div>
        </div>
      </div>

      <div class="wb100 img-area relative" style="z-index: 1">
        <img src="~@/assets/images/recharge-bg.jpg">
      </div>

      <div class="wb100 relative" style="z-index: 2; margin-top: -40px;">
        <img src="~@/assets/images/recharge-btn.png" class="fr h30px mar15" @click="showRule = true">
      </div>

      <div class="clear1"></div>

      <!--小喇叭-->
      <div class="wb100">
        <div class="pal40 pat5 pab5 par15 h30px lh30px Fwhite relative warpper-orange-2">
          <img src="~@/assets/images/icon-notice.png" class="h16px absolute" style="top: 12px; left: 15px;">
          <div class="wb100 over-hidden h30px lh30px">
            <div :style="'margin-top: '+ marginTop +'px; transition: all .5s;'">
              <template v-for="item in notices">
                <p class="h30px lh30px text-over-hidden1 Fwhite">{{item}}</p>
                <div class="clear"></div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="clear"></div>

      <div class="wb100">

        <div class="pat20 pab20 pal30 par30 text-center">

          <div :style="'width:'+ width +'px; height: '+ (width - 30) +'px; background:#fff6e5; border: 10px solid #f6ba64'" class="radius20 fl pab20">
            <p class="Fred-4">
              <span style="font-size: 40px">68</span>元
            </p>
            <p class="lh25px Fgray-3">充值本金</p>
            <p class="lh25px Fred-4">立即到账</p>
          </div>

          <div :style="'width:'+ width +'px; height: '+ (width - 30) +'px; background:#fff6e5; border: 10px solid #f6ba64'" class="radius20 fr pab20 relative">
            <template v-if="got_68 == true">
              <!--已领取-->
              <div class="absolute radius10" style="width: 100%; height: 100%; background: rgba(255, 255, 255, .3)">
                <img src="~@/assets/images/icon-got.png" class="h80px w80px absolute" style="left: 0; right: 0; bottom: 0; top: 0; margin: auto;">
              </div>
            </template>
              <p class="Fred-4">
                <span style="font-size: 40px">168</span>元
              </p>
              <p class="lh25px Fgray-3">赠送红包</p>
              <p class="lh25px Fred-4">立即到账</p>
          </div>

        </div>

        <div class="clear1"></div>

        <template v-if="got_68 == true">
          <div class="pa30">
            <div class=" Fgray-3 warpper-gray-1 Fb text-center h50px lh50px F18 text-center radius25">
              已领取
            </div>
          </div>
        </template>

        <template v-else>
          <!--<router-link :to="{ name: 'Recharge', query: { first: 68 } }">-->
          <div class="pa30" @click="toRecharge(68)">
            <div class=" Fred Fb text-center h50px lh50px F18 text-center radius25 btn-shadow">
              立即充值抢168元
            </div>
          </div>
          <!--</router-link>-->
        </template>


      </div>
    </template>


  </div>

</template>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              showResult: false,
              showRule: false,
              login: false,
              isLock: false,
              isWeiXin: false,
              isMobile: false,
              width: 0,
              myHeight: 0,
              paymentNo: '',
              infoMsg: '',
              call: '',
              user: {},
              notices: [],
              marginTime: 0,
              marginTop: 0,
              money: 20,
              got_20: false,
              got_68: false,
            }
        },

        methods: {

          toRecharge(money){
            if(Base.versions.isWeiXin){
                //微信支付
                this.$router.push({ name: 'WxRecharge', query: { first: money } })
            }else {
              this.$router.push({name: 'Recharge', query: {first: money}})
            }
          },

        },

        mounted(){

          this.myHeight = $(window).height();

          this.width = ($(window).width() - 130) / 2;

          this.money = this.$route.params.money;

          //- cnzz自定义统计
          // 测试完后请删除这条注数

          _czc.push(["_setAccount", "1271278320"]);
          _czc.push(['_trackEvent', 'RecchargeFirst_page', 'onInit', '首充活动'+ this.money +'页加载完成','inited','RecchargeFirst_init']);

          Interface.giftCouponRecord( (data) => {
            let _tmp = data.returnJSON;
              for(let j=0; j<_tmp.length; j++){
                  if(_tmp[j].couponNo == 'TR2018032320'){
                    this.got_20 = true;
                  }
                  if(_tmp[j].couponNo == 'TR2018032368'){
                    this.got_68 = true;
                  }

              }
          })


          let phones = [134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 182, 187, 188, 130, 131, 132, 155, 156, 185, 186, 150, 151, 152,153, 155, 156, 157, 158, 159, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 180, 182, 185, 186, 187, 188, 189];

          let text = ['充值20元获得98大礼包', '充值70元获得168大礼包', '充值50元获得98大礼包','充值20元获得98大礼包','充值30元获得98大礼包','充值20元获得98大礼包','充值20元获得98大礼包', '充值68元获得168大礼包']

          for(let i=0; i<100; i++){
            this.notices.push('用户'+ phones[Base.random_num(0,48)] +'****'+ Base.random_num(0,9) +'' + Base.random_num(0,9) + '' + Base.random_num(0,9) + '' + Base.random_num(0,9) + '' + text[Base.random_num(0,7)]);
          }

          setInterval( ()=> {
            this.marginTop -= 30
            if(this.marginTop <= this.notices.length * - 30 ){
              this.marginTop = 0
            }
          },3000);

          this.fullscreenLoading = false;

        }

    }

</script>
