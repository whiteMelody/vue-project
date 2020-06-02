<template>

  <div id="invite_page" style="background: #ff8336">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100" v-show="showPopup == true">
      <div class="dialogBg" style="z-index: 999999"></div>
      <div class="wb100 fixed" style="bottom:30%;z-index: 9999999">
        <div class=" warpper-white radius5 wb80 center">
          <div class="wb100 h350px" style="overflow-y: auto;">
            <div class="wb100 pab15">

              <p class="F19 text-center pat15" style="color: #232323">奖励规则</p>

              <div style="height: 12px; width:12px; float: right; margin-right: 15px; margin-top: -18px;" @click="close"
                   class="img-area">
                <img src="~@/assets/images/close.png">
              </div>

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
                有任何关于本活动的问题和帮助，请联系客服13272721166
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wb100">
      <div class="clear h50px"></div>
      <div class="wb90 center img-area">
        <img src="~@/assets/images/bg-invite.png">
      </div>

      <div class="wb80 center relative" style="margin-top: -25px; z-index: 999;">
        <div class="w230px text-center Fwhite F18 center h50px lh50px"
             :style="'background: url('+ bg +'); background-size: 100% 100%; width: 230px;'">
          我的奖励
        </div>
      </div>

      <div class="pal15 par15" style="margin-top: -25px;">
        <div class="pa15 warpper-white radius5 text-center">
          <div class="clear h25px"></div>
          <p class="Forange-5">累计获得（元）</p>
          <p class="Forange-5" style="font-size: 50px;">{{money}}</p>
          <p class="Fgray-2 F14">奖励金额将实时转入余额</p>
        </div>
      </div>

      <div class="wb100 relative" style="margin-top: -25px; z-index: 999;">
        <div class="wb90 center img-area">
          <img src="~@/assets/images/bg-gold2.png">
        </div>
      </div>

      <div class="clear h50px"></div>

      <div class="wb100">
        <div class="wb80 center relative" style="margin-top: -25px; z-index: 999;">
          <div class="w230px text-center Fwhite F18 center h50px lh50px" :style="'background: url('+ bg +'); background-size: 100% 100%; width: 230px;'" >
            奖励规则
          </div>
        </div>

        <div class="pal15 par15" style="margin-top: -25px;">
          <div class="pa15 warpper-white radius5 text-center lh25px">
            <div class="clear h25px"></div>
            <p>邀请时将送给朋友价值<span class="Forange-5 F20 Fnum">39</span>元的红包</p>
            <p>当朋友投注时</p>

            <div class="clear1"></div>

            <p style="background: #ffe7df; border: 1px solid #ee7f32;" class="radius5 pa15">
              您将获得TA投注总额的 <span class="Forange-5 F24 Fnum">4%</span>
            </p>

            <p class="Forange-5 lh50px" style="font-size: 40px;">+</p>

            <p style="background: #ffe7df; border: 1px solid #ee7f32;" class="radius5 pa15">
              TA邀请的人投注总额的 <span class="Forange-5 F24 Fnum">1%</span>
            </p>

            <div class="clear1"></div>

            <p class="Forange-5" @click="open">查看详情 ></p>

          </div>
        </div>
      </div>

      <div class="clear h50px"></div>

      <div class="wb100">
        <div class="wb80 center relative" style="margin-top: -25px; z-index: 999;">
          <div class="w230px text-center Fwhite F18 center h50px lh50px"
               :style="'background: url('+ bg +'); background-size: 100% 100%; width: 230px;'">
            奖励金排行榜
          </div>
        </div>

        <div class="pal15 par15" style="margin-top: -25px;">
          <div class="pa15 warpper-white radius5 text-center lh25px">
            <div class="clear h25px"></div>
            <p>每天0点更新</p>

          </div>
        </div>
      </div>

      <div class="clear h50px"></div>

    </div>

    <div class="clear h50px"></div>

    <div class="wb100 fixed" @click="share" style="bottom: 0; z-index: 99999;">
      <div class="pa15">
        <div class="wb100 warpper-orange-7 Fwhite h45px lh45px text-center radius5 F16">
          邀请有奖
        </div>
      </div>
    </div>

  </div>

</template>

<style>
  .Forange-5 {
    color: #ee5b2c;
  }
</style>

<!--<script src="../assets/js/hostSdk.js"></script>-->

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import HostSdk from '../../assets/js/hostSdk.js'
  import Bg from '../../assets/images/btn-invite.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        bg: Bg,
        showPopup: false,
        money:'0'
      }
    },

    methods: {

      open(){

        var _this = this;

        _this.showPopup = true;

        $(document).on("touchmove", function (e) {
          if (e.target.className.indexOf("dialogBg") >= 0) {
            e.preventDefault();
          }
        })

      },

      close(){

        var _this = this;

        _this.showPopup = false

      },


      getData(){


      },

      share(){

        var _this = this;

        if (Base.versions.isAndroidApp || Base.versions.isIosApp) {

          if (this.login == true) {

            hostsdk.getUser({

              successCallback: function (res) {

                res = JSON.parse(res);

                alert(JSON.stringify(res));

                _this.uuid = res.uuid;

                alert(_this.uuid);

                hostsdk.share({
                  title: "邀请有奖",
                  desc: "稳赢体育",
//                  url: "http://h5.pwabc.cn/beta/#/InviteGet/"+_this.uuid,
                  url: "http://192.168.9.109:8080/#/InviteGet/"+_this.uuid,
                  icon: "https://mp.bombsport.com/source/arrow-left.png",
                  platforms: "app",
                  successCallback: function (res) {

                    alert("1111")

                  },
                  errorCallback: function (res) {

                    alert("2222")

                  }

                })

              },
              errorCallback: function (res) {
                hostsdk.login({
                  successCallback: function (res) {

                  },
                  errorCallback: function (res) {

                  }
                })
              }
            })
          } else {
            hostsdk.login({
              successCallback: function (res) {

              },
              errorCallback: function (res) {

              }
            })
          }
        } else {
          if (this.login == true) {


          } else {

            this.$router.push({name: 'Login', params: {call: true}});

            return false;

          }
        }
      }
    },

    mounted(){

      var _this = this;

      _this.fullscreenLoading = false;

      if (Base.versions.isAndroidApp || Base.versions.isIosApp) {

        HostSdk.inited(function (res, errorMsg) {

          hostsdk.setLeftIcon({
            params:"back",
            successCallback:function (res) {

              hostsdk.setRightIcon({
//            params: "refresh",
                params:"custom",
                icon: "",
                text: "邀请记录",
                successCallback: function (res) {

                  hostsdk.setViewTitle({
                    title: "邀请有奖",
                    successCallback: function (res) {

                    },
                    errorCallback: function (res) {

                    },
                  });
                },
                errorCallback: function (res) {

                },
                rightClicked: function (res) {
//              alert('邀请记录')
                  _this.$router.push({ name: 'InviteRecord'});
                }
              });

            },
            errorCallback:function (res) {

            },
            leftClicked:function (res) {

            }
          });



          if (res.uuid) {
            _this.login = true;
          } else {
            _this.login = false;

            hostsdk.login({
              successCallback: function (res) {

              },
              errorCallback: function (res) {

              }
            })

          }
        });
      } else {
        Interface.userInfo(function (data) {

          if (data) {
            if (Base.isNull(data.returnJSON)) {
              _this.login = false;
            } else {
              _this.login = true;
              _this.user = data.returnJSON;
            }
          } else {
            _this.login = false;
          }
        });
      }

    }

  }

</script>
