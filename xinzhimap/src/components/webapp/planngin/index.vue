<template>
  <!--    工具箱    -->
  <div class="wb100">

    <div class="absolute w40px fc-gray3 my-box-shadow my-radius2" style="top: 270px; right: 5px; z-index: 99;">
      <div class="wb100">
        <div class="w40px bg-white pat5 pab5 h40px lh20px text-center" @click="setPlanning">
          <i class="iconfont iconhuozhuduanchaxunxianlu f20px"></i>
          <div class="clear0"></div>
          <span class=" f12px">路线</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'planngin',
    props:{
        
    },
    computed: {
    },
    components: {},
    data() {
      return {
        
      }
    },
    mounted() {
      
      
    },
    methods: {
      setPlanning(){
        this.$uvue.$emit('setShowSearchType')
        this.$uvue.$emit('setMapTools')
      },
    },
    watch: {
     
    },

  }
</script>

