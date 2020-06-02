<template>
  <div class="wb100 f14px">

    <div class="pa18 f14px">
      <div class="wb100 bg-white">
        <template v-if="tabIndex == 0">
          <channel-management></channel-management>
        </template>
        <template v-if="tabIndex == 1">
          <store-channel-management></store-channel-management>
        </template>
      </div>

      <div class="clear4"></div>
    </div>

    <div class="clear0"></div>

  </div>
</template>

<script>

  import ChannelManagement from './ChannelManagement'
  import StoreChannelManagement from './StoreChannelManagement'

  export default {
    name: "OperationStatement",
    components: {
      ChannelManagement,
      StoreChannelManagement,
    },
    data() {
      return {
        allowed:1,
      boxMaxHeight:"",
        // arrs: ['连锁设置', '门店设置'],
        arrs: ['渠道设置'],
        tabIndex: 0,
      }
    },
    
    // 挂载结束状态
    mounted() {
      this.boxMaxHeight = window.innerHeight - 100;

    },
    methods: {

    },
    watch: {

    }

  }

</script>

<style scoped lang="scss">
  .tabIndex {
    padding: 0 .22rem;
  }
  .is-selected {
    color: #1989FA;
  }
</style>
