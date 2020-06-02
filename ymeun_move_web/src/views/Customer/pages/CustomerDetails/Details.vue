<template>
  <!-- 详情 -->
  <div class="Details wb100" v-loading="loading" :style="'min-height:'+ minHeight2 +'px' ">
    <div class="box"></div>
    <div class="Detalis_information" >
      <div class="name">
        <div class="text">
          {{dataList.name}}
          <i class="iconfont iconnv" v-if="sex == 0"></i>
          <i class="iconfont iconnan" v-else></i>
        </div>
        <div class="button" @click="modify(dataList.id)">修改资料</div>
      </div>

      <!-- 顾客id: dataList.id -->
      <div class="guwen">顾问:&nbsp;&nbsp;{{adviserName}}</div>

      <div class="contact">
        <ul>
          <li>
            <div class="text">
              <i class="iconfont icondianhua"></i>
              <span>电话</span>
            </div>
            <div class="number">{{dataList.mobile}}</div>
          </li>
          <li>
            <div class="text">
              <i class="iconfont iconweixin"></i>
              <span>微信</span>
            </div>
            <div class="number">{{dataList.weixin}}</div>
          </li>
          <li>
            <div class="text">
              <i class="iconfont iconqq"></i>
              <span>QQ</span>
            </div>
            <div class="number">{{dataList.qq}}</div>
          </li>
        </ul>
      </div>

      <div class="fenge"></div>

      <div class="private">
        <div class="left">
          私密档案
          <i>（完成度：{{dataList.label_rate}}）</i>
        </div>
        <div class="right" @click="XFiles(dataList.id)">查看</div>
      </div>
    </div>

    <div class="Details_consumption">
      <div class="top">
        <div class="text">消费总额 (元)</div>
        <div class="number">{{dataList.order_amount}}</div>
      </div>

      <div class="fenge"></div>

      <div class="contact">
        <ul>
          <li>
            <div class="number">{{dataList.prepaid_amount}}</div>
            <div class="text">
              <span>充值金额 (元)</span>
            </div>
          </li>
          <li>
            <div class="number">{{dataList.give_amount}}</div>
            <div class="text">
              <span>赠送金额 (元)</span>
            </div>
          </li>
          <li>
            <div class="number">{{dataList.arrears_amount}}</div>
            <div class="text">
              <span>欠款金额 (元)</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="Details_Door">
      <div class="li">
        <div class="lef">上门次数</div>
        <div class="right">{{dataList.store_quantity}} 次</div>
      </div>
      <div class="fenge"></div>
      <div class="li">
        <div class="lef">消费次数</div>
        <div class="right">{{dataList.order_quantity}} 次</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { postDetails } from "@/assets/api/CustomerDetails/Details";

export default {
  name: "Details",
  data() {
    return {
      minHeight: 0,
      customerId: 1,
      dataList: [],
      sex: "",
      adviserName: "",
      loading: false
    };
  },
  components: {
    Toast
  },
  methods: {
    // 获取资料
    detailsPost() {
      this.loading = true;
      postDetails({ customer_id: this.customerId }).then(res => {
        if (res.status == 0) {
          this.dataList = res.data;
          this.sex = res.data.sex.value;
          this.adviserName = res.data.adviser.name;
          this.loading = false;
        } else {
          Toast("获取用户数据错误!");
        }
      }).catch((e)=>{
        console.log(e)
      })
    },

    // 修改资料
    modify(id) {
      this.$router.push({
        path: "/AddCustomer",
        query: { id: id }
      });
    },

    // 私密档案
    XFiles(id) {
      this.$router.push({
        path: "/XPrivate",
        query: { id: id }
      });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.customerId = this.$route.query.id;
    this.detailsPost();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight2 = window.innerHeight -100
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
@import "./Details.scss";
</style>