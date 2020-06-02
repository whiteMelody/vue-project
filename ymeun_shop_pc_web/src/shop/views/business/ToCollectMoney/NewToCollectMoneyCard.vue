<template>
  <div class="NewToCollectMoneyCard">
    <div class="header">
      <div class="left">收银列表&nbsp;&nbsp;{{dateText}}</div>
      <em></em>
      <div class="center">
        <i class="iconfont iconsousuo"></i>
        <auto-search-client-stride @changed="myChanged" :initValue="''" class="wb100"></auto-search-client-stride>
      </div>
    </div>


    <ul v-if="noData">
      <li v-for="(item, index) in listData" :key="index">
        <div class="payment">
          <div class="icon iconOne" :class="item.status == 0 ? 'iconOne' : 'iconTwo'"><i class="iconfont iconqian"></i></div>
          <div class="text" :class="item.status == 0 ? 'textOne' : 'textTwo'">{{item.status == 0 ? '未支付' : '已支付'}}</div>
        </div>
        <div class="money">
          <div class="money_text">应收金额</div>
          <div class="money_num">￥<a>{{item.payment | _filterNumFormat}}</a></div>
        </div>
        <div class="listBox">
          <div class="list">单号：{{item.code}}</div>
          <div class="list">订单时间：{{item.time}}</div>
          <div class="list">姓名：<span class="pointer" @click="$router.push({name:'ClientDel',query:{id:item.customer_id,types:3}})">{{item.customer_name}}</span></div>
          <div class="list">电话：{{item.customer_mobile}}</div>
          <div class="list">{{$store.getters.roleName.adviser}}：{{item.adviser_name}}</div>
        </div>
        <div class="buttomBox">
          <div class="bottomOne" v-if="item.status == 0">
            <div class="left clcorTwo">
              <div class="left_left" @click="PrintingClick(item.id)"><i class="iconfont icondayin"></i>&nbsp;打印</div>
              <em></em>
              <div class="left_left" @click="$router.push({name:'Billing', query:{ id: item.id, orders_id: item.orders_id, appointmentId: item.appointment_id, adviserId: item.adviser_id, customerId: item.customer_id, technicianId: item.technician_id, isEdit: true } })"><i class="iconfont iconxiugaiziliao"></i>&nbsp;修改</div>
            </div>
            <div class="left clcorOne" @click="$router.push({name:'CollectMoney', query:{ id: item.id, orders_id: item.orders_id, appointment_id: item.appointment_id, adviser_id: item.adviser_id, customer_id: item.customer_id  } })">收银</div>
          </div>
          <div class="bottomOne" v-else>
            <div class="right clcorTwo" @click="PrintingClick(item.id)"><i class="iconfont icondayin"></i>&nbsp;打印</div>
            <div class="left clcorOne" @click="$router.push({name:'CollectMoney', query:{ id: item.id, orders_id: item.orders_id, isShowPay: true } })">查看详情</div>
          </div>
        </div>
      </li>
      <li style="height:0;visibility: hidden"></li>
      <li style="height:0;visibility: hidden"></li>
      <li style="height:0;visibility: hidden"></li>
    </ul>

    <div class="no_data" v-else>
      <div>
        <span><img src="@/shop/assets/img/nodata.png" alt=""></span>
        <b>暂无数据</b>
      </div>
    </div>

  </div>
</template>
<script>
import getPage from "@/shop/assets/css/headerClass.scss";
import autoSearchClientStride from "@/shop/components/autocomplete/autoSearchClientStride";
import { receiptTodayList } from "@/shop/assets/api/flow/collectMoney";
export default {
  name: "NewToCollectMoneyCard",
  data() {
    return {
      dateText: "",
      dataObj:{
        keyword:'',
        perpage:9999,
      },
      listData:[],
      loading:false,
      noData:true

    };
  },
  components: { autoSearchClientStride },
  watch: {},
  methods: {
    myChanged(data) {
      this.dataObj.keyword = data.kw;
      window.onkeydown = e => {
        var currKey = 0,
          e = e || event;
        currKey = e.keyCode || e.which || e.charCode;
        if (currKey == 13) {
          this.dataObj.keyword = data.kw;
          this.initData();
        }
      };
    },

    initData() {
      const that = this;
      that.loading = true;
      receiptTodayList(that.dataObj).then(res => {
        if (res.status == 0) {
          that.listData = res.data.list;
          that.loading = false;
          if(res.data.list.length > 0){
            this.noData = true
          }
          else{
            this.noData = false
          }
        }else {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
          that.loading = false;
        }
      }).catch(error => {
        console.log("receiptTodayList no");
        that.loading = false;
      });
    },
    
    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 1 }
      });
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.dateText = this.$base.getDateScope(1).startTime.split(" ")[0];
    this.initData();
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
@import "./NewToCollectMoneyCard.scss";
</style>
