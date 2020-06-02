<template>
  <div class="Card" :style="'height:' + height + 'px;'">
    <h4>{{data.title}}</h4>
    <div class="num">
      <span :class="className">{{data.Total}}</span>
      <a v-if="type == 1">已完成：{{data.Completed1}} | 未完成：{{data.not}}</a>
      <a v-else>（{{data.target}}：
        <i v-show="data.Completed != 0">{{data.Completed}}{{data.text}}</i>
        <i v-show="data.Completed == 0 && data.grayIsShow == true" class="fc-blue7" @click="$router.push({name:'SetTarget'})" >未设置</i> 
        <i v-show="data.Completed == 0 && data.grayIsShow == false" class="fc-gray3">未设置</i>）
      </a>
    </div>
    <div class="progress">
      <p class="progress_box">
        <span :class="className" :style="'width:' + data.Percentage"></span>
      </p>
      <p class="progress_text">
        <i>完成率：</i>
        <span :class="className" v-show="data.Completed != 0">{{data.Percentage}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  data() {
    return {
      className: "",
    };
  },
  props: ["data", "height", "type", ],
  components: {},
  methods: {},

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    let num = this.data.Percentage;

    num = Number.parseFloat(num.substring(0, num.length - 1));
    if (num < 60) {
      this.className = "red";
    } else if (num >= 60 && num < 90) {
      this.className = "orange";
    } else if (num >= 90 && num <= 100) {
      this.className = "green";
    } else if (num > 100) {
      this.className = "full";
    }
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.Card {
  // height:136px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  padding: 0.2rem 0.3rem;
  h4 {
    font-size: 16px;
    color: #333;
  }
  .num {
    display: flex;
    align-items: flex-end;
    padding: 20px 0;
    span {
      font-size: 30px;
      font-weight: bold;
      &.red {
        color: #f10215;
      }
      &.green {
        color: #009688;
      }
      &.orange {
        color: #ff5722;
      }
      &.full {
        color: #c09346;
      }
    }
    a {
      font-size: 14px;
      color: #666;
      position: relative;
      bottom: 5px;
      padding-left: 0.28rem;
      i {
        font-style: normal;
      }
      .fc-blue7 {
        cursor:pointer;
      }
    }
  }
  .progress {
    display: flex;
    align-items: center;
    .progress_box {
      width: 80%;
      height: 8px;
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
      display: flex;
      span {
        height: 8px;
        border-radius: 4px;
        width: 50%;
        // background: #F10215;
        &.red {
          background: #f10215;
        }
        &.green {
          background: #009688;
        }
        &.orange {
          background: #ff5722;
        }
        &.full {
          background: #c09346;
        }
      }
    }
    .progress_text {
      display: flex;
      padding-left: 0.3rem;
      font-size: 16px;
      color: #666;
      i {
        font-style: normal;
        white-space: nowrap;
        font-size: 16px;
      }
      span {
        font-size: 16px;
        flex: 1;
        &.red {
          color: #f10215;
        }
        &.green {
          color: #009688;
        }
        &.orange {
          color: #ff5722;
        }
        &.full {
          color: #c09346;
        }
      }
    }
  }
}
</style>



    
