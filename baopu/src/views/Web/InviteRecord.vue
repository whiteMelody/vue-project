<template>

  <div id="invite_record_page" style="">

    <div class="wb100">
      <div class="pa15">
        <p class="Fwhite F18">陈军 2017-10-19</p>
        <p class="Fwhite F18">陈军 2017-10-19</p>
        <p class="Fwhite F18">陈军 2017-10-19</p>
        <p class="Fwhite F18">陈军 2017-10-19</p>
        <p class="Fwhite F18">陈军 2017-10-19</p>
        <p class="Fwhite F18">陈军 2017-10-19</p>
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
        money: '0'
      }
    },

    methods: {


      getData(){


      },


    },

    mounted(){

      var _this = this;

      _this.fullscreenLoading = false;

      if (Base.versions.isAndroidApp || Base.versions.isIosApp) {

        HostSdk.inited(function (res, errorMsg) {

          hostsdk.setLeftIcon({
            params: "custom",
            icon: "https://mp.bombsport.com/source/back.png",
            text: "",
            successCallback: function (res) {

              hostsdk.setRightIcon({
                params: "none",
                successCallback: function (res) {

                  hostsdk.setViewTitle({
                    title: "邀请记录",
                    successCallback: function (res) {

                    },
                    errorCallback: function (res) {

                    },
                  });

                },
                errorCallback: function (res) {

                },
                rightClicked: function (res) {

                }
              });


            },
            errorCallback: function (res) {

            },
            leftClicked: function (res) {
              _this.$router.go(-1);
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
