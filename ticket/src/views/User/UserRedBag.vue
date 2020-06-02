<template>
  <div id="user_ redbag_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'我的红包'" :back="true" :fixed="true"></navTitle>

    <template v-if="showTitle">
      <div class="clear h90px"></div>
      <div class="wb100 lh45px text-center warpper-black-3 fixed bor-black2 bor-solid-1b" style="top: 50px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="nav pal10 par10" :class="current == key ? 'nav-active' : ''">{{item}}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="clear h40px"></div>
      <div class="wb100 lh45px text-center warpper-black-3 fixed bor-black2 bor-solid-1b" style="top: 0px; left: 0; z-index: 99;">
        <div class="wb33333 fl" v-for="(item,key) in navList" @click="navChange(key)">
          <span class="nav pal10 par10" :class="current == key ? 'nav-active' : ''">{{item}}</span>
        </div>
      </div>
    </template>

    <div class="clear"></div>

    <div class="pal15 par15 Fgray-5">
      <div v-for="item in redbags" v-if="empty==false">

        <div class="clear1"></div>

        <div class="pa10 relative warpper-black-3">

            <div class="w70px h45px fl text-center Fwhite pat5 pab5 lh20px F14 radius4" :class="current == 0 ? 'warpper-orange-2' : 'warpper-gray'">
              <p class="lh25px"><span class="Fnum F24">{{item.faceValue}}</span>元</p>
              <p class="F12 lh15px">满<span class="Fnum">{{item.limit}}</span>可用</p>
            </div>

            <div class="w180px fl h45px pat5 pal10 pab5">
              <p class="F18 lh25px Fblack-2">红包</p>
              <p class="F12 Fwhite-1 lh20px" v-if="current != 2">有效期至<span class="Fnum">{{dateFormat(item.endTime)}}</span></p>
              <p class="F12 Fwhite-1 lh20px" v-if="current == 2">使用日期<span class="Fnum">{{item.expenseTime ?  dateFormat(item.expenseTime) : '1900-1-1'}}</span></p>
            </div>

            <img src="~@/assets/images/redBag-used.png" v-if="current == 2" class="w50px absolute" style="top: 15px; right: 15px;">
            <img src="~@/assets/images/redBag-past.png" v-if="current == 1" class="w50px absolute" style="top: 15px; right: 15px;">

            <div class="clear"></div>

        </div>

        <div class="clear"></div>
      </div>

      <div class="clear1"></div>

      <div class="wb100 text-center" v-if="empty==true">
        <img src="~@/assets/images/hb_kb.png"  class="wb25 center" style="margin-top: 100px;">
        <div class="clear1"></div>
        <p class="Fwhite-1 F16 lh25px h25px">还没有红包记录哦~</p>
        <div class="clear1"></div>
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
        fullscreenLoading: true,
        myHeight: 0,
        navList: ['可使用', '已过期', '已使用'],
        current: 0,
        redbags: [],
        redBagList: [],
        showTitle: true,
        empty: true,
      }
    },

    methods: {

      dateFormat(date) {
        if(Base.isNull(date))
          return '';
        return date.substring(5, date.length-3);
      },

      init(){
        Interface.userCouponList( (data) => {
          if(data){
            if(data.returnJSON.length > 0 ){
              this.empty = false;
              this.redBagList = data.returnJSON;
              this.navChange(this.current)
            }else{
              this.empty = true;
            }
          }else{
            this.empty = true;
          }
        })

      },

      stringToDate(dateString) {

        if (dateString) {
          var arr1 = dateString.split(" ");
          var sdate = arr1[0].split('-');
          var sdate2 = arr1[1].split(':');
          var date = new Date(sdate[0], sdate[1]-1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
          return date;
        }

      },

      navChange(key) {
        this.current = key;

        //重新筛选数据

        let _tmp = JSON.parse(JSON.stringify(this.redBagList));

        let _tmp2 = []

        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].status == key){
            _tmp2.push(_tmp[i])
          }
        }

        //
        let _tmp4 = [];
        let now = new Date().getTime();

        if(key == 0){
          for(let i=0; i< _tmp2.length; i++){
            if(now < this.stringToDate(_tmp2[i].endTime).getTime()){
              _tmp4.push(_tmp2[i]);
            }
          }
          this.redbags = _tmp4;
        }else{
          this.redbags = _tmp2;
        }

        if(_tmp2.length >0){
            this.empty = false;
        }else{
            this.empty = true;
        }

      }

    },

    mounted(){
      this.myHeight = $(window).height();
      this.fullscreenLoading = false;

      let _source = Interface.getSource();

      if(_source != 'wap'){
        this.showTitle = false;
      }

      //判断微信内核
      if(Base.versions.isWeiXin){
        this.showTitle = false;
      }

      this.init();

    }

  }


</script>

