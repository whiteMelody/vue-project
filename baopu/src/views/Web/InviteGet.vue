<template>

  <div id="invite_get_page" style="background: #D53738; position: fixed; width: 100%; height: 100%;">

    <div class="wb100" v-if="showGet == false">
      <div class="wb100 img-area relative">
        <img src="~@/assets/images/bg-get.png">
        <div class="absolute wb100 text-center" style="color: #D53738; bottom: 18%;">
          <span class="Fnum" style="font-size: 60px;">39</span>
          <span style="font-size: 30px;">元</span>
        </div>
      </div>

      <div class="clear1"></div>

      <div class="wb100 text-center">
        <p style="color: #FEEE4E;" class="F24">朋友送你39元红包</p>
        <div class="clear1"></div>
        <p class="Fwhite">邀你来稳赢体育一起玩</p>
        <div class="clear1"></div>

        <div class="wb100"></div>

      </div>


      <div class="clear1"></div>

      <div class="wb100">
        <div class="Fgray-3 pa15">

          <div class="pal15 par15 pat5 pab5 relative F14">
              <input type="tel" class="bor-none wb95 pal5per h45px lh45px F16 warpper-white radius5 Fgray" v-model="mobile" placeholder="请输入手机号">
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>

          <div class="pal15 par15 pat5 pab5 relative F14">
            <div style=" padding-right: 90px;">
              <input type="tel" class="bor-none wb95 pal5per h45px lh45px fl F16 warpper-white radius5 Fgray" v-model="code" placeholder="请输入验证码">
              <input type="button" data-role="none" class="bor-none h45px lh45px w80px radius5 bor-none" style="position: absolute; top: 5px; right: 10px;" :class="mobile.length!=11 || lock ? 'bor-gray2 bor-solid-1a Fgray-2 warpper-white' : 'warpper-yellow-7 Forange-5 pa1'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">

            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="pa15">
            <div class="wb100 h50px lh50px Fwhite F16 text-center radius5" :class="mobile.length>0 && code.length>0 ? 'warpper-yellow-7 Forange-5 pa1' : 'bor-gray2 bor-solid-1a Fgray-2 warpper-white'" @click="getRedBag">立即领取</div>
          </div>

          <div class="clear1"></div>

        </div>
      </div>

    </div>

    <div class="wb100" v-else>
      <div class="pa15 Fgray-3">

        <p style="color: #feee4e;" class="text-center F20">红包已入账，请君享用</p>

        <template v-for="(item,key) in redBagList">

          <div class="clear1"></div>

          <div class="pa15 relative warpper-white">

            <div class="w80px h50px lh50px fl text-center Forange-6 Fwhite pat10 pab10 F14 radius5  bor-dashed-1r bor-gray">

              <span class="Fnum" style=" font-size: 40px">{{item.faceValue}}</span>
              <span class="F20">元</span>
            </div>

            <div class="w250px fl lh30px pat10 pal10">
              <p class="F18">满<span class="Fnum">{{item.limit}}</span>可用</p>
              <p class="F14 Fgray-2">有效期至<span class="Fnum">{{item.endTime}}</span></p>
            </div>

            <div class="clear"></div>

          </div>

          <div class="clear"></div>

        </template>

        <div class="clear1"></div>

        <div class="pa15">
          <div class="wb100 h50px lh50px Fwhite F16 text-center radius5 warpper-yellow-7 Forange-5 pa1" @click="download">下载APP立即使用</div>
        </div>

      </div>
    </div>

  </div>

</template>

<style>
  .Forange-5{ color: #D53738;}
  .Forange-6{ color: #f84629;}

  .warpper-yellow-7{ background:#FEEE4E }
</style>

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
              showGet: false,
              parentUUID: '',
              redBagList: [
//                {
//                  faceValue: 1,
//                  limit:200,
//                  endTime: '2017年10月14日14:46:09',
//                },{
//                  faceValue: 1,
//                  limit:200,
//                  endTime: '2017年10月14日14:46:09',
//                },{
//                  faceValue: 1,
//                  limit:200,
//                  endTime: '2017年10月14日14:46:09',
//                }
              ],
              mobile: "",
              code: "",
              call: "",
              codeText: "获取验证码",
              isWeiXin: true,
              timeID: 0,
              timer: 60,
              lock: false,
              favDisabled: false,
            }
        },

        methods: {

          sendCode() {

            var _this = this;

            if (this.lock) {
              return false;
            } else {
              this.lock = true;
              Interface.loginCode(_this.mobile, function (data) {
                if (data) {
                  //                            _this.resultCode = data.returnJSON;
                  //                            _this.code = data.returnJSON;
                  _this.timeID = setInterval(_this.clock, 1000);
                }
              });
            }
          },
          clock() {
            this.timer--;
            this.codeText = this.timer + "秒后重发";

            if (this.timer <= 0) {
              clearInterval(this.timeID);
              this.lock = false;
              this.timer = 60;
              this.codeText = "重发验证码";
            }
          },
          getRedBag() {

            var _this = this;

            if(_this.favDisabled)
              return;

            if (Base.isNull(_this.mobile)) {
              _this.$message({
                type: 'error',
                message: '手机号不能为空',
                duration: 1500
              });
              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }
            if (Base.isNull(_this.code)) {
              _this.$message({
                type: 'error',
                message: '验证码不能为空',
                duration: 1500
              });

              _this.favDisabled = true;

              setTimeout(function(){
                _this.favDisabled = false;
              },1500);

              return false;
            }

            // 2017101103 邀请组合红包
            var redBagNo = '2017101103';

            Interface.registerByInvitationUser(_this.mobile, _this.code, _this.parentUUID, redBagNo, function (data, errorMsg) {

              if (data) {
                //领取成功

                //显示领取成功的页面

                _this.showGet = true;

                _this.redBagList = data.returnJSON;


              } else {
                //领取失败

                _this.$message({
                  type: 'error',
                  message: errorMsg,
                  duration: 1500
                });

                _this.favDisabled = true;

                setTimeout(function () {
                  _this.favDisabled = false;
                }, 1500);
              }

            })

          }
        },

        mounted(){
          var _this = this;

          //获取邀请人ID
          _this.parentUUID = this.$route.params.uuid;

          alert(_this.parentUUID);

          console.log(_this.parentUUID);

        }

    }

</script>
