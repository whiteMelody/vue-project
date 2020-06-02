<template>

  <div id="user_red_bag_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'付费推荐'" :back="true" :fixed="showTitle"></navTitle>

    <template v-if="showTitle == true">
      <div class="clear h50px"></div>
    </template>
    <template v-else>
      <div class="clear"></div>
    </template>

    <div class="wb100 Fgray-3">
      <div v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5" v-if="empty == false">
        <expertList :list="matchList" :pagelist="true" :loading="loading" :last="last" :bought="true"></expertList>
      </div>
    </div>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'

    export default{

        data (){
            return {
              fullscreenLoading: true,
              page: 0,
              pageSize: 20,
              totleCount: 0,
              loading: true,
              showTitle: true,
              empty: false,
              last: false,
              expertList: [],
              matchList: []
            }
        },

        methods: {
          getData() {

            var _this = this;

            _this.loading = true;

            if(_this.last || _this.empty){
              _this.loading = false;
              if(_this.page == 0){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,1);
                },100);
              }
              return ;
            }

            _this.page ++;

            Interface.newsListByUserOrder(_this.page, _this.pageSize, function (data) {

              if (data) {

                var _tmp = data.returnJSON.indexData;

                _this.totleCount = data.returnJSON.totalResult;

                _this.matchList = _this.matchList.concat(_tmp);

                if (data.returnJSON.indexData.length == 0) {
                  if(_this.page == 1){
                    _this.empty = true;
                  }else{
                    _this.empty = false;
                    _this.last = true;
                  }
                } else {
                  if(data.returnJSON.indexData.length < _this.pageSize){
                    _this.empty = false;
                    _this.last = true;
                  }
                }

                _this.loading = false;

              }

              if(_this.page == 1){
                setTimeout( ()=> {
                  _this.fullscreenLoading = false;
                  window.scrollTo(0,1);
                },100);
              }

            });
          }
        },

        mounted(){
          var _this = this;

          if(Base.versions.isAndroidApp || Base.versions.isIosApp || Base.versions.isWeiXin){
            this.showTitle = false;
          }

          _this.getData();

        }

    }

</script>
