<template>
  <div class="Dome">
      <div class="aaa" ref="aaa"></div>
  </div>
</template>
<script>
const echarts = require('echarts');

export default {
  name: "Dome",
  data() {
    return {
    };
  },
  components: {},
  methods: {
    
 
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

    let myChart = echarts.init(this.$refs.aaa);
    let option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLine:{
                show:false
            }
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            },
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'bar'
            }
        ]
    };

    myChart.setOption(option);


  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.aaa{
    height: 600px;
    background: #fff;
}
</style>



    
