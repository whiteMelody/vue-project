<template>

  <div id="store_order_detail_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'订单详情'" :back="true"></navTitle>

    <div class="wb100">
      <div class="wb100 pat15 pab15 " >

        <div class="w100px center" v-if="data.status == 2">
          <div class="w30px img-area fl  mat15" >
            <img src="~@/assets/images/clz.png">
          </div>
          <span class="fr h60px lh60px Forange-2 F18" >处理中</span>
        </div>

        <div class="w100px center" v-else>
          <div class="w30px img-area fl  mat15" >
            <img src="~@/assets/images/wc.png">
          </div>
          <span class="fr h60px lh60px Fgreen-2 F18" >已完成</span>
        </div>


        <div class="clear"></div>
      </div>

      <div class="pa15 warpper-black-3 pat15 pab15 bor-solid-1b bor-black3" v-if="bigtype == 1">
        <p class="h30px lh30px Fgray-6">卡号 <span class="Fnum Fgray-5 " style="margin-left: 6px">{{data.cardno}}</span></p>
        <p class="h30px lh30px Fgray-6">卡密 <span class="Fnum Fgray-5" style="margin-left: 6px">{{data.cardpassword}}</span></p>
      </div>

      <div class="warpper-black-3 bor-solid-1b bor-black3" v-else>

        <div class="pa15 Fgray-5">
          <p>
            <span class="fl">{{data.username}}</span>
            <span class="fr Fnum">{{data.telephone}}</span>
          </p>
        </div>

        <div class="pa15">
          <p class="F14 Fgray-5">{{data.address}}</p>

        </div>
      </div>

      <div class="clear1"></div>
      <div class="wb100 warpper-black-3 bor-solid-1t bor-black3">
        <div class="pa15 ">
          <p class="Fgray-6">商品名称：<span class="Fgray-7">{{data.name}}</span></p>
        </div>
      </div>
      <div class="wb100" v-if="bigtype != 1">

        <template v-if="data.status == 2">
          <div class="pal15 warpper-black-3">
            <div class="wb100">
              <div class="clear bor-black3 bor-solid-1b"></div>
            </div>
          </div>
          <div class="pa15 warpper-black-3 pat15 pab15">
            <p class="Fgray-6">订单状态：<span class="Fgray-7">等待工作人员派奖</span></p>
          </div>
          <div class="pal15 warpper-black-3">
            <div class="wb100">
              <div class="clear bor-black3 bor-solid-1b"></div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="clear1 bor-solid-1b bor-solid-1t bor-black3"></div>
          <div class="wb100">
            <div class="pa15 warpper-black-3 pat15 pab15">
              <p class="Fgray-6">快递公司：<span class="Fgray-7">{{data.express}}</span></p>
            </div>
            <div class="pal15 warpper-black-3">
              <div class="wb100">
                <div class="clear bor-black3 bor-solid-1b"></div>
              </div>
            </div>
            <div class="pa15 warpper-black-3 pat15 pab15">
              <p class="Fgray-6">运单号&emsp;：<span class="Fnum Fgray-7">{{data.expressno}}</span></p>
            </div>
          </div>
          <div class="clear1 bor-black3 bor-solid-1b bor-solid-1t"></div>
        </template>

      </div>

      <template v-if="bigtype == 1">
        <div class="clear1 bor-black3 bor-solid-1b bor-solid-1t"></div>
      </template>

      <div class="wb100">
        <div class="pa15 warpper-black-3 pat15 pab15">
          <p class="Fgray-6">创建时间：<span class="Fnum Fgray-7">{{data.createtime}}</span></p>
        </div>
        <div class="pal15 warpper-black-3">
          <div class="wb100">
            <div class="clear bor-black3 bor-solid-1b"></div>
          </div>
        </div>
        <div class="pa15 warpper-black-3 pat15 pab15 bor-black3 bor-solid-1b">
          <p class="Fgray-6">订单编号：<span class="Fnum Fgray-7">{{data.ordernum}}</span></p>
        </div>
      </div>
    </div>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import HostSdk from '../../assets/js/hostSdk.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              data: {},
              bigtype: "",
            }
        },

        methods: {
          getData() {
            var _this = this;



            Interface.showOrder(_this.bigtype, _this.ordernum, function (data) {

              if(data){

                console.log(data);
                _this.data = data.data;

              }

              _this.fullscreenLoading = false;

            });
          }
        },

        mounted(){

          var _this = this;

          _this.ordernum = this.$route.params.ordernum;

          _this.bigtype = this.$route.params.bigtype;

          if(Base.versions.isAndroidApp || Base.versions.isIosApp){
            HostSdk.inited(function (res, errorMsg) {

              hostsdk.setLeftIcon({
                params:"custom",
                icon: "https://mp.bombsport.com/source/back.png",
                text: "",
                successCallback:function (res) {

                },
                errorCallback:function (res) {

                },
                leftClicked:function (res) {
                  _this.$router.go(-1);
                }
              });

              _this.getData();
              if(res.uuid) {
                _this.login = true;
              }else {
                _this.login = false;
              }
            });
          }else{
            Interface.userInfo(function (data) {
              _this.getData();
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
