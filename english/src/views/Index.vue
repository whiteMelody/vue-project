<template>
    <div class="wb100">
        <div class="wb100">
          <div class="wb33333 fl text-center h40px lh40px Fgray-3 warpper-gray-3" v-for="item in ['标题','内容','类型']">
            {{item}}
          </div>
        </div>
        <div class="clear"></div>
        <template v-for="item in siteList">
          <div class="wb100 h40px lh40px text-center">
            <div class="wb33333 fl">
              {{item.name}}
            </div>
            <div class="wb33333 fl">
              {{item.url}}
            </div>
            <div class="wb33333 fl">
              {{item.type}}
            </div>
          </div>
          <div class="clear"></div>
        </template>

      <div class="clear1"></div>

      <!--操作按钮-->

      <div class="pa15">
        <div class="w80px h40px lh40px warpper-blue text-center Fwhite fl" @click="add">
          + add
        </div>

        <div class="w80px h40px lh40px warpper-green text-center Fwhite fl mal15" @click="del">
          - del
        </div>

      </div>

    </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  export default{

    props: {},

    data (){
      return {
          siteList: []
      }
    },

    methods: {

      add(){
        Interface.addSite( (data) => {
          console.log(data.msg)
        })
      },

      del(){
        Interface.delSite( (data) => {
          console.log(data.msg)
        })
      },

      load(){
        Interface.getSite( (data) => {
          if(data.code == 200){
            this.siteList = data.data
          }
        })
      }

    },

    created(){
      this.load()
    }

  }


</script>

