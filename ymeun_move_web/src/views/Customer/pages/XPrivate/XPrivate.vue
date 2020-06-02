<template>
  <div class="XPrivate bg-white" :style="'minHeight:' + minHeight + 'px' ">
    <!--   header   -->
    <Header :title="'私密档案'" :back="true"></Header>

    <div class="mian">
      <ul>
        <li v-for="(item, index) in dataList" :key="index"  v-if="item.type == 4 || item.type == 5">
          <div class="problem">
            Q
            <span>{{item.problem}}</span>
          </div>
          <div class="answer">
            <div class="answerTitle">A</div>
            <div class="answerList">
              <div class="li" v-for="(i, index) in item.items" :key="index">{{i.title}}：{{i.answers}}</div>
            </div>
          </div>
        </li>

        <li v-else>
          <div class="problem">
            Q
            <span>{{item.problem}}</span>
          </div>
          <div class="answer">
            <div class="answerTitle">A</div>
            <div class="answerList">
              <div class="li">{{item.answers}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="no_data" v-if="noData">
      <span><img src="@/assets/img/list_bg.png" alt=""></span>
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { Toast } from "vant";
import { postXPrivate } from "@/assets/api/XPrivate/XPrivate";

export default {
  name: "XPrivate",
  data() {
    return {
      innerHeight: 0,
      customerId: 10,
      // 数据
      dataList: [],
      noData:false
    };
  },
  components: {
    Footer,
    Header,
    Toast
  },
  methods: {
    list() {
      const that = this;
      let dataContetn = {
        customer_id: that.customerId,
      };
      postXPrivate(dataContetn).then(res => {
        if (res.status == 0) {
          console.log(res);
          
          that.dataList = res.data;
          if(res.data.length == 0)that.noData = true;
        } else {
          Toast("获取用户数据错误!");
        }
      }).catch((e)=>{
        console.log(e)
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.customerId = this.$route.query.id;
    this.list();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
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
@import "./XPrivate.scss";
</style>