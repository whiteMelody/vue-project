<template>
  <div id="id_card_bind_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'绑定身份证'" :back="true"></navTitle>

    <div class="wb100">

      <div class="clear1"></div>

      <template v-if="identityCard == ''">

        <p class="pal15 Fwhite-1 lh30px F14">请验证您的手机号确认是本人操作</p>

        <div class="clear1"></div>

        <div class="Fgray-3 wb100" v-show="step1 == true">

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 60px;">
              <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                手机号
              </div>
              <input type="tel" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="mobile" placeholder="请输入手机号">
            </div>
            <div class="clear"></div>
          </div>

          <div class="pal15">
            <div class="clear bor-black2 bor-solid-1b"></div>
          </div>

          <div class="pal15 par15 relative F14 warpper-black-3">
            <div style="padding-left: 60px;">
              <div class="w50px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                验证码
              </div>
              <input type="tel" class="bor-none wb50 h45px lh45px fl Fnum warpper-none Fwhite-1" v-model="code" placeholder="请输入验证码">
              <input type="button" data-role="none" class="warpper-gray bor-none h45px lh45px wb45 fr code-btn" :class="mobile.length!=11 || lock ? 'Fgray-2' : 'Fblue'" :disabled="mobile.length!=11 || lock" @click="sendCode" :value="codeText">
            </div>
            <div class="clear"></div>
          </div>

          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <div class="pa15">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="mobile.length>0 && code.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="next">下一步</div>
          </div>

          <div class="clear1"></div>

        </div>

        <div class="wb100" v-show="step1 == false">
          <div class="wb100">

            <div class="pal15 par15 relative F14 warpper-black-3">
              <div style="padding-left: 80px;">
                <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                  真实姓名
                </div>
                <input type="text" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="name" placeholder="请输入真实姓名">
              </div>
              <div class="clear"></div>
            </div>

            <div class="pal15 par15 relative F14 warpper-white">
              <div style="padding-left: 80px;">
                <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                  身份证号
                </div>
                <input type="text" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="cardNum" placeholder="请输入身份证号">
              </div>
              <div class="clear"></div>
            </div>

            <div class="clear1"></div>
            <div class="clear1"></div>
            <div class="pa15">
              <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="name.length>0 && cardNum.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="dialogBindId = true">确定</div>
            </div>

            <div class="clear1"></div>

            <div class="pal15 par15 F12 lh20px Fblack-2">
              <p class="Fred lh30px F14">温馨提示：</p>
              <p>*真实姓名和身份是作为大奖领取信息的唯一凭证，提交之后不可更改，请谨慎操作！</p>
            </div>
          </div>
        </div>

        <el-dialog
          :visible.sync="dialogBindId"
          size="large"
          :show-close="false">

          <p class="text-center F18" style="margin-top: -30px;">身份核对</p>

          <div class="clear1"></div>

          <p class="text-center F14 Fred">实名认证后身份信息将不可更改，请仔细核对！</p>

          <div class="clear1"></div>

          <p class="lh30px Fgray-3 F14">真实姓名 {{name}}</p>
          <div class="clear"></div>
          <p class="lh30px Fgray-3 F14">身份证号 {{cardNum}}</p>

          <div class="clear1"></div>

          <div class="wb100">
            <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="dialogBindId = false">
              修改
            </div>

            <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="submit">
              确定
            </div>
          </div>

          <div class="clear"></div>

        </el-dialog>

      </template>

      <template v-else>

        <div class="clear1"></div>

        <div class="pal15 par15 warpper-black-3 lh50px F14 Fwhite-1">
          <p>
            <span class="w70px fl">真实姓名</span>
            <span class="fl">{{realName}}</span>
          </p>
          <div class="clear bor-gray bor-solid-1b"></div>

          <p>
            <span class="w70px fl">身份证号</span>
            <span class="fl Fnum">{{identityCard}}</span>
          </p>
          <div class="clear"></div>
        </div>

      </template>

    </div>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        dialogBindId: false,
        step1: true,
        myHeight: 0,
        infoMsg: '',
        name: '',
        realName: '',
        cardNum: '',
        identityCard: '',
        code: '',
        mobile: "",
        call: "",
        codeText: "获取验证码",
        timeID: 0,
        timer: 60,
        lock: false
      }
    },

    methods: {
      sendCode() {

        if (this.lock) {
          return false;
        } else {
          this.lock = true;
          Interface.realNameAuthCode(this.mobile, (data) => {
            if (data) {
//              this.resultCode = data.returnJSON;
//              this.code = data.returnJSON;
              this.timeID = setInterval(this.clock, 1000);
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
      myBack() {
          this.$router.go(-1);
      },
      next() {

        if (Base.isNull(this.mobile)) {
          this.$message({
            type: 'error',
            message: '手机号不能为空'
          });
          return false;
        }
        if (Base.isNull(this.code)) {
          this.$message({
            type: 'error',
            message: '验证码不能为空'
          });
          return false;
        }

        this.step1 = false;
      },
      submit() {

        //验证
        if (!Base.isChinese(this.name)) {
          this.$message({
            type: 'error',
            message: '姓名只能为中文'
          });
          return false;
        }

        if (this.cardNum.length != 15 && this.cardNum.length != 18) {
          this.$message({
            type: 'error',
            message: '身份证号不合法'
          });
          return false;
        }

        Interface.realNameAuth(this.code, this.mobile, this.name, this.cardNum, (data, errorMsg) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '身份证绑定成功'
            });

            this.identityCard = this.cardNum;
            this.realName = this.name;
          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
          this.dialogBindId = false;
        });

      }
    },

    mounted(){

      this.myHeight = $(window).height();

      Interface.securityInfo((data) => {
        if (data) {
          var _tmp = data.returnJSON;

          if(Base.isNull(_tmp)){
            this.$router.replace({ name: 'Login'});
            return false;
          }

          if (Base.isNull(_tmp.identityCard))
              this.identityCard = '';
          else
              this.identityCard = _tmp.identityCard;
        }
        this.fullscreenLoading = false;
        console.log(data);
      });

      Interface.userInfo((data) => {
        if (data) {
          if (!Base.isNull(data.returnJSON)) {
            this.realName = data.returnJSON.realName;
          }
          this.login = true;
        } else {
          this.login = false;
        }
        this.fullscreenLoading = false;
      });



    }

  }


</script>

