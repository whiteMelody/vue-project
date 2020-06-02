<template>
  <div class="Activity f14px pa24">

    <div class="bg-white pal15 par15">

    </div>

  </div>
</template>
<script>

    import {getInfo} from  "@/shop/assets/api/activity/activity"

export default {
  name: "Preview",
  data() {
    return {
        item: {},
        id: '',
        info: {},
        scrollIndex: 0,
    };
  },
  components: {},
  methods: {
      saveMsg(i){
          if(i == 1){
              this.$message({
                  message: '活动发布成功',
                  type: 'success'
              })
          }else if(i == 2){
              this.$message({
                  message: '活动保存成功',
                  type: 'success'
              })
          }else if(i == 3){
              this.$router.go(-1)
          }
      },
      to(type){
          if(type == 'old'){
              $(window).scrollTop(0)
          }else{
              $(window).scrollTop(1000)
          }
      },
  },

  // 挂载结束状态
  mounted() {

      this.id = this.$route.query.id

      getInfo({
          flexibleId: this.id
      }).then(res=>{
          if(res.status == 0){
              this.info = res.data
          }
      })



  },

};
</script>

<style>

</style>


    
