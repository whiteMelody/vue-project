<template>
  <div class="DeductionDetails wb100 bg-white" :style="'min-height:'+ minHeight +'px' ">
    <DeductionInformation
      v-if="isSelectClient == true"
      @cloneChild="cloneChild"
      :dataList="parameterList"
      :customer_id="customerID"
    ></DeductionInformation>
    <div class="boxNumberBox" v-else>
      <!--   header   -->
      <Header :title="'划扣详情'" :back="true"></Header>
      <div class="mian" v-loading="loading">
        <div class="title">
          <div class="text">
            {{customerlist.name}}
            <i class="iconfont iconnv" v-if="sex == 0"></i>
            <i class="iconfont iconnan" v-else></i>
          </div>
          <div class="information">电话：{{customerlist.mobile}} | 门店：{{customerlist.store.name}}</div>
        </div>

        <!-- 可划扣 -->
        <div class="notBoxData" v-show="waitList.length > 0">
          <div class="notDeduction">可划扣项目列表</div>
          <ul>
            <li v-for="(item, index) in waitList" :key="index">
              <div class="name">{{item.item.name}}</div>
              <div class="customer">开单时间：{{item.created_at}}</div>
              <div class="customer">项目所属：{{item.store.name}}</div>
              <div class="time">
                <!-- not:未到店-->
                <div class="time">
                  未划扣：
                  <span :class="{not:item.surplus_number != 0}">{{item.surplus_number}}</span>
                  /{{item.number}}
                </div>
                <div class="time_l">
                  <div class="jian" @click="numBerJian(index)">-</div>
                  <div class="number">{{item.tense}}</div>
                  <div class="jia" @click="numBerJia(index)">+</div>
                </div>
              </div>
              <!-- <div class="fenge"></div> -->
            </li>
          </ul>
        </div>

        <!-- 已划扣 -->
        <div class="arrBoxData" v-show="finishList.length > 0">
          <div class="notDeduction">已划扣完项目列表</div>
          <ul>
            <li v-for="(item, index) in finishList" :key="index">
              <div class="name">{{item.item.name}}</div>
              <div class="customer">开单时间：{{item.created_at}}</div>
              <div class="customer">项目所属：{{item.store.name}}</div>
              <div class="time">
                <!-- not:未到店-->
                <div class="time">
                  未划扣：
                  <span :class="{not:item.surplus_number != 0}">{{item.surplus_number}}</span>
                  /{{item.number}}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="box"></div>

        <div class="buttom" @click="submitClick">开单</div>
      </div>
    </div>
  </div>
</template>
<script>
import DeductionInformation from "../DeductionInformation/DeductionInformation";
import Header from "../../../../components/Header";
import { consumeInfo } from "@/assets/api/Deduction/Deduction";
import { Toast } from "vant";
export default {
  name: "DeductionDetails",
  data() {
    return {
      minHeight: 0,
      valueNumber: 0,
      sex: "",
      // 顾客id
      customerID: "",
      // 加载
      loading: false,
      // 顾客信息
      customerlist: {
        store: {
          name: ''
        }
      },
      // 已完成划扣
      finishList: [],
      // 可划扣列表
      waitList: [],
      // 带参数组
      parameterList: [],
      isSelectClient: false
    };
  },
  components: {
    Header,
    Toast,
    DeductionInformation
  },
  methods: {
    // 数据
    dataList() {
      this.loading = true;
      let content = {
        customer_id: this.customerID
      };
      consumeInfo(content).then(res => {
        if (res.status == 0) {
          this.sex = res.data.customer.sex.value;
          // 客户信息
          this.customerlist = res.data.customer;
          // 可划扣列表
          this.waitList = res.data.list.wait;
          // 已完成划扣
          this.finishList = res.data.list.finish;
          this.waitList.map((item, index) => {
            item.tense = 0;
          });
          // 关闭加载
          this.loading = false;
        }
        console.log(res);
      }).catch((e)=>{
        console.log(e)
      })

    },

    // 划扣数量加
    numBerJia(numberIndex) {
      const that = this;
      if (
        that.waitList[numberIndex].tense >=
        that.waitList[numberIndex].surplus_number
      ) {
        Toast("当前是最大数值");
      } else {
        that.waitList[numberIndex].tense++;
      }
      that.$forceUpdate();
    },
    // 划扣数量减
    numBerJian(index) {
      if (this.waitList[index].tense <= 0) {
        Toast("当前是最小数值");
      } else {
        this.waitList[index].tense--;
      }
      this.$forceUpdate();
    },

    // 提交
    submitClick() {
      if (this.waitList.length > 0) {
        let content = {};
        this.waitList.map((item, index) => {
          if (item.tense > 0) {
            content = {
              name: item.item.name,
              itemID: item.id,
              numBer: item.tense
            };
            this.parameterList.push(content);
          }
        });
      }

      if (this.parameterList.length > 0) {
        this.isSelectClient = true;
      } else {
        Toast("请最少选择一个项目划扣");
      }
    },

    cloneChild(json) {
      this.isSelectClient = false;
      this.parameterList = [];
      this.$forceUpdate()
    }
  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.customerID = this.$route.query.customer_id;
    this.dataList();

    consumeInfo({customer_id: this.customerID}).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })

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
@import "./DeductionDetails.scss";
</style>



    
