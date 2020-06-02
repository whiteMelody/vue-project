<template>
  <div id="user_info_page" class="warpper-gray-3 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'个人资料'" :back="true"></navTitle>

    <div v-show="userShow">

      <div class="wb100 h50px relative warpper-red" style="z-index: 99999;">
        <router-link :to="{ name: 'User' }">
          <div class="w50px h50px fl">
            <div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>
          </div>
        </router-link>
        <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">个人信息</p>
      </div>

      <div class="wb100 warpper-white Fgray-3">
        <div class="h70px lh70px pal15">
          <div class="wb100 bor-gray bor-solid-1b pat10 pab10">
            头像
            <div class="w20px h50px fr mar15 mat10">
              <img src="~@/assets/images/arrow-right.png" class="fr h15px mat15">
            </div>
            <img src="~@/assets/images/head-default.png" class="w70px h70px radius50per bor-white bor-solid-2a fr">

            <div class="clear"></div>
          </div>
        </div>
        <div class="clear1"></div>
        <div class="h50px lh50px pal15">
          <div class="wb100" @click="editName">
            昵称
            <div class="w50px h50px fr mar15">
              <img src="~@/assets/images/arrow-right.png" class="fr h15px mat15">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="!userShow">

      <div class="wb100 h50px relative warpper-red" style="z-index: 99999;">
        <div class="w50px h50px fl" @click="userShow = true">
          <div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>
        </div>
        <p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">修改昵称</p>
      </div>

      <div class="wb100">
        <div class="pa15">
          <div class="pal15 par15 relative F14 warpper-white">
            <div style="padding-left: 60px;">
              <div class="w50px absolute" style="top: 0; left:15px ; height: 47px; line-height: 47px;">
                昵称
              </div>
              <input type="text" class="bor-none wb100 h45px lh45px phone-num" v-model="nickName" placeholder="请输入昵称" data-role="none">
            </div>
          </div>

          <div class="clear1"></div>

          <div class="pa15">
            <div class="wb100 h45px lh45px warpper-red Fwhite F16 text-center radius5 btn-login" :class="nickName.length>0 ? 'warpper-red Fwhite' : 'warpper-pink Fwhite'" @click="submit">立即修改</div>
          </div>
        </div>
      </div>
    </div>

    <div class="clear1"></div>
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
        userShow: true,
        nickName: '',
        myHeight: 0,
        user: {}
      }
    },

    methods: {
      editName() {
        this.userShow = false;
      },
      submit() {

        Interface.updateUserInfo(this.nickName, (data, errorMsg) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
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

      //判断登录
      Interface.userBaseInfo((data) => {
        console.log(data);
        if (data) {
          if (Base.isNull(data.returnJSON)) {
            this.login = false;
          } else {
            this.login = true;
            this.nickName = data.returnJSON.nickName;
          }
        } else {
          this.login = false;
        }
        this.fullscreenLoading = false;
      });

    }

  }


</script>

