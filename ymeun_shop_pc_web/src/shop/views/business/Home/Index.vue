<template>
  <div class="index" :style="'min-height: '+boxMaxHeight+'px;'">
    <shop-manager-home v-if="this.$store.getters.currentUser.role_id == 2"></shop-manager-home>
    <counselor-home v-else-if="this.$store.getters.currentUser.role_id == 3"></counselor-home>
    <technician-home v-else-if="this.$store.getters.currentUser.role_id == 4"></technician-home>

    <template v-else>

    </template>
  </div>
</template>

<script>
import ShopManagerHome from "./ShopManagerHome/ShopManagerHome";
import CounselorHome from "./CounselorHome";
import TechnicianHome from "./TechnicianHome";
export default {
  name: "index",
  components: {
    ShopManagerHome,
    CounselorHome,
    TechnicianHome
  },
  data() {
    return {
      boxMaxHeight:"",
    }
  },
  created() {},
  methods: {},
  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },

  beforeRouteEnter(to,from,next){
    if(to.name == 'Home'){
      let user = JSON.parse(localStorage.getItem('CURRENT_USER'))
      if(user){
        if(user.role_id == 5 || user.role_id == 6){
          next({
            path:'/BookingSchedule'
          })
        }else{
          next()
        }
      }else{
        next()
      }
    }else{
      next()
    }
  },
};
</script>

<style scoped lang="scss">
</style>
