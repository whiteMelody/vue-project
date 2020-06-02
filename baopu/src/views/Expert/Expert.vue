<template>

  <div id="expert_page" class="warpper-black-4">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'达人推荐'" :back="true" :fixed="showTitle"></navTitle>

    <!--<div style="position: fixed; height: 100%; width: 100%; overflow: auto; -webkit-overflow-scrolling: touch; z-index: 9;">-->

    <div class="wb100">

      <template v-if="showTitle == true">
        <div class="clear h50px"></div>
      </template>
      <template v-else>
        <div class="clear"></div>
      </template>

    <!--
      data          列表数据
      pagelist      是否启用分页样式
      loading       显示分页加载动画
      last          最后一页
      loadtext      加载文字
    -->

      <div v-infinite-scroll="getData" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
        <expertList :list="matchList" :pagelist="true" :loading="loading" :last="last" :empty="empty"></expertList>
      </div>

    </div>

  </div>

</template>

<style>

</style>

<script>

    import Base from '../../assets/js/base.js'
    import Interface from '../../assets/js/interface.js'
    import userDefault from '../../assets/images/head-img1.png'

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
              userHead: userDefault,
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

            Interface.newsList(_this.page, _this.pageSize, function (data) {

              if (data) {

                _this.totleCount = data.returnJSON.totalResult;

                _this.matchList = _this.matchList.concat(data.returnJSON.indexData);

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
