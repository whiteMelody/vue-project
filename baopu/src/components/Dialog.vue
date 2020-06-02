<template>

  <!--<div class="wb100">-->
    <!--<div class="wb100 h50px warpper-black-6" v-if="showTitle == true"  :class="fixed ? 'fixed' : 'relative'" style="z-index: 99999;">-->
      <!--<div class="w50px h50px fl" v-if="back" @click="myBack()">-->
        <!--<div style="height: 18px; width:18px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/close.png"></div>-->
      <!--</div>-->
      <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fgray-5" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>-->
    <!--</div>-->
  <!--</div>-->

  <div class="wb100" style="display: none">
    <div class="dialogBg"></div>
    <div class="wb100 fixed" style="bottom:30%;z-index: 9999">
      <div class=" warpper-white radius5 wb80 center">
        <div class="wb100 h350px" style="overflow-y: auto;">
          <div class="wb100 pab15">

            <p class="F19 text-center pat15" style="color: #232323">奖励规则</p>
            <div style="height: 12px; width:12px; float: right; margin-right: 15px; margin-top: -17px;" @click="close" class="img-area"><img src="~@/assets/images/close.png"></div>
            <p class="pal15 par15 pat15 lh30px F15" style="color: #666666">
              呼朋唤友现金奖励，邀请朋友领取豹扑体育“39元竞猜红包”，当TA竞猜比赛时，您将获得TA竞猜总额的4%及TA邀请的人的竞猜总金额的1%作为奖励金额。
            </p>
            <p class="pal15 par15 lh30px F15" style="color: #666666"> 说明
              1.例如：A、B、C三人，A用户通过本活动邀请B用户成功注册，
              B用户也通过本活动邀请C用户成功注册，计算公式如下：
            </p>
            <p class="pal15 par15 lh30px F15" style="color: #666666"> 说明
              A的奖励金额=B竞猜金额*4%+C竞猜金额*1%
            </p>
            <p class="pal15 par15 lh30px F15" style="color: #666666"> 说明
              2.本活动的邀请对象为从未注册豹扑体育的朋友，邀请的朋友在
              分享页面输入手机号，点击领取即可获取红包
            </p>
            <p class="pal15 par15 lh30px F15" style="color: #666666"> 说明
              3.一经发现任何违规套取奖励的行为，将不予奖励，情节严重者将封停
              账号或依法追究发育责任。
            </p>
            <p class="pal15 par15 lh30px F15" style="color: #666666"> 说明
              有任何关于本活动的问题和帮助，请联系客服13310227366
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
</style>

<script>

    import Base from "../assets/js/base.js"

    export default{
        props: ['title', 'back_url', 'back', 'fixed','back_home'],
        data (){
            return {
                showTitle: true,
            }
        },
        methods: {
          close(){

          }
        },
        mounted(){
//          if(Base.versions.isAndroidApp || Base.isIosApp || Base.isWeiXin){
//              this.showTitle = false;
//          }
//          alert(Base.versions.isAndroidApp == true || Base.isIosApp == true || Base.isWeiXin == true);

//          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
//              this.showTitle = false;
//          }
        }
    }
</script>
