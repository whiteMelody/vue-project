<template>
  <div id="user_bank_card_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'添加银行卡'" :back="true"></navTitle>

    <div class="clear h30px"></div>

    <div class="wb100">

      <div class="pal15 par15 relative F14 warpper-black-3">
        <div style="padding-left: 80px;">
          <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
            开户姓名
          </div>
          <input type="text" class="bor-none wb100 h45px lh45px warpper-none Fwhite-1" v-model="name" placeholder="请输入真实姓名">
        </div>
        <div class="clear"></div>
      </div>

      <div class="clear bor-black2 bor-solid-1b"></div>

      <div class="pal15 par15 relative F14 warpper-black-3">
        <div style="padding-left: 80px;">
          <div class="w70px absolute Fblack-2" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
            银行卡号
          </div>
          <input type="tel" class="bor-none wb100 h45px lh45px Fnum warpper-none Fwhite-1" v-model="num1" placeholder="请输入银行卡号">
        </div>
        <div class="clear"></div>
      </div>


      <div class="clear1"></div>
      <div class="clear1"></div>
      <div class="pa15">
        <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5" :class="name.length>0 && num1.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">确定</div>
      </div>

      <div class="clear"></div>

      <div class="pa15 F12 lh20px Fblack-2">
        <p class="Fred lh30px F14">温馨提示：</p>
        <p>*请尽量填写您长期使用的银行卡</p>
        <p>*银行卡开户姓名必须与您实名认证的姓名一致，否知提现申请将被退回</p>
        <p>*目前暂不支持信用卡和存折账号提现，绑定时请使用银行借记卡（储蓄卡）</p>
      </div>
    </div>

  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  export default{

    data (){
      return {
        login: false,
        fullscreenLoading: true,
        bankCardList: [],
        currentCard: -1,
        addCard: true,
        showResult: false,
        identityCard: '',
        myHeight: 0,
        state: '',
        call: '',
        name: '',
        num1: '',
        num2: '',
        user: {}
      }
    },

    methods: {
      myBack() {
          this.$router.go(-1);
      },
      submit() {
        Interface.bankCard(this.name, this.num1, (data, errorMsg) => {

          if (data) {
            this.$message({
              type: 'success',
              message: '绑定成功'
            });

            if (Base.isNull(this.call)) {
                this.$router.replace({ name: 'SafeCenter'});
            } else {
                this.$router.go(-1);
            }

          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      this.call = this.$route.params.call;

      this.fullscreenLoading = false;

    }

  }


</script>

