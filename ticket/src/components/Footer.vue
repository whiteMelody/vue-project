<template>

  <div class="wb100">
    <div class="clear h70px"></div>
    <div class="wb100 fixed pat5 pab5 warpper-black-5 bor-black2 bor-solid-1t" style="bottom: 0;">

      <router-link :to="{ name: 'Index' }">
        <div class="wb33333 fl text-center">
          <img src="~@/assets/images/icon-main1.png" v-if="active != 1" class="h25px">
          <img src="~@/assets/images/icon-main1-active.png" v-if="active == 1" class="h25px">
          <p class="F12 lh15px" :class="active == 1 ? 'Forange-2 ' : 'Fblack-1'">购彩大厅</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'SoccerList' }">
        <div class="wb33333 fl text-center">
          <img src="~@/assets/images/icon-main2.png" v-if="active != 2" class="h25px">
          <img src="~@/assets/images/icon-main2-active.png" v-if="active == 2" class="h25px">
          <p class="F12 lh15px" :class="active == 2 ? 'Forange-2 ' : 'Fblack-1'">开奖公告</p>
        </div>
      </router-link>
      <router-link :to="{ name: 'User' }">
        <div class="wb33333 fl text-center">
          <img src="~@/assets/images/icon-main3.png" v-if="active != 3" class="h25px">
          <img src="~@/assets/images/icon-main3-active.png" v-if="active == 3" class="h25px">
          <p class="F12 lh15px" :class="active == 3 ? 'Forange-2 ' : 'Fblack-1'">个人中心</p>
        </div>
      </router-link>
      <div class="clear"></div>
    </div>
  </div>

</template>

<style>
</style>

<script>
    export default{
        props: ['active'],
        data (){
            return {}
        },
        methods: {
        },
        mounted(){
        }
    }
</script>
