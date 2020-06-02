<template>
  <div id="user_bank_card_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'我的银行卡'" :back="true"></navTitle>

    <div class="wb100">
      <div class="pa15">
        <template v-for="(item,key) in bankCardList">
          <div class="pa15 bor-gray bor-solid-1a relative warpper-white F14" :class="currentCard == key ? 'warpper-pink' : 'warpper-white'" @click="currentCard = key">
            <img :src="item.icon" class="w50px h50px fl">
            <div class="w100px fl lh25px mal15">
              <p>{{item.bankName}}</p>
              <p class="F14 Fgray-3">{{item.cardTypeDesc}}</p>
            </div>
            <div class="w80px fr h50px lh50px">
              尾号<span class=" Fnum">{{ item.bankCard}}</span>
            </div>
            <img src="~@/assets/images/icon-selected.png" class="absolute h25px" style="top: 0; right: 0;" v-if="item.defaultCard == 1">
            <div class="clear"></div>
          </div>
          <div class="clear1"></div>
        </template>
      </div>

      <router-link :to="{ name: 'AddBankCard', params:{ call: true } }">
        <p class="pal15 par15 h35px lh35px Fwhite-1 warpper-black-3 pat5 pab5">
          <img src="~@/assets/images/icon-add.png" class="h15px fl mat10">
          <span class="fl mal15">添加银行卡</span>
        </p>
      </router-link>

    </div>

    <div class="clear h80px"></div>

    <div class="wb100 fixed warpper-white" style="bottom: 0;" v-if="currentCard!=-1">
      <div class="pa15">
        <div class="wb45 fl warpper-blue Fwhite h45px lh45px text-center radius5 F16" @click="setDefault">
          设为默认
        </div>
        <div class="wb45 fr warpper-red Fwhite h45px lh45px text-center radius5 F16" @click="removeCard">
          解除绑定
        </div>
        <div class="clear"></div>
      </div>
    </div>


  </div>
</template>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'

  import zgyh from '../../assets/images/bank-zgyh.png'
  import jsyh from '../../assets/images/bank-jsyh.png'
  import nyyh from '../../assets/images/bank-nyyh.png'
  import gsyh from '../../assets/images/bank-gsyh.png'
  import msyh from '../../assets/images/bank-msyh.png'
  import zsyh from '../../assets/images/bank-zsyh.png'

  export default{

    data (){
      return {
        login: false,
        fullscreenLoading: true,
        bankCardList: [],
        currentCard: -1,
        addCard: false,
        showResult: false,
        identityCard: '',
        myHeight: 0,
        state: '',
        name: '',
        num1: '',
        num2: '',
        user: {}
      }
    },

    methods: {
      myBack: function myBack() {
          this.$router.go(-1);
      },
      setDefault() {

        Interface.defaultBankCard(this.bankCardList[this.currentCard].cardID, (data, errorMsg) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '设置默认银行卡成功'
            });
            this.currentCard = -1;
            this.getCard();
          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      },
      removeCard() {

        Interface.removeBankCard(this.bankCardList[this.currentCard].cardID, (data, errorMsg) => {
          if (data) {
            this.$message({
              type: 'success',
              message: '解绑银行卡成功'
            });
            this.currentCard = -1;
            this.getCard();
          } else {
            this.$message({
              type: 'error',
              message: errorMsg
            });
          }
        });
      },
      getCard() {
        //获取已有的银行卡
        Interface.bankCardList( (data) => {
          if (data) {

            var _item = data.returnJSON;

            for (var i = 0; i < _item.length; i++) {

              if (_item[i].abbreviation == 'BOC') {
                _item[i].icon = zgyh;
              }if (_item[i].abbreviation == 'CCB') {
                _item[i].icon = jsyh;
              }if (_item[i].abbreviation == 'ABC') {
                _item[i].icon = nyyh;
              }if (_item[i].abbreviation == 'ICBC') {
                _item[i].icon = gsyh;
              }if (_item[i].abbreviation == 'CMSB') {
                _item[i].icon = msyh;
              }if (_item[i].abbreviation == 'CMB') {
                _item[i].icon = zsyh;
              }

              _item[i].bankCard = _item[i].bankCard.substring(_item[i].bankCard.length - 4);
            }

            this.bankCardList = _item;

            console.log(data);
          }
          this.fullscreenLoading = false;

        });
      }
    },

    mounted(){

      this.myHeight = $(window).height();

      this.getCard();

    }

  }


</script>

