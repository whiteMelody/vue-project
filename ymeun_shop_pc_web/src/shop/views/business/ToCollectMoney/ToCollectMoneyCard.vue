<template>
  <div class="ToCollectMoneyCard" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>收银列表 {{today}}</header>
    <div class="box">
      <el-form :inline="true" slot="search" label-width="80px">
        <el-form-item>
          <auto-search-client @changed="myChanged"></auto-search-client>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
      </el-form>

      <div class="clear0"></div>

      <div class="card_list">
        <div class="card_list_box" v-for="(item,index) in  dataList" :key="index">
          <div class="card_list_box_bg" :class="item.status == 0 ? 'wei' : 'zhifu'">
            <h3>{{item.status == 0 ? '未支付' : '已支付'}}</h3>
            <div class="content">
              <em>应收金额</em>
              <p>
                <span>￥</span>
                <b>{{item.payment | _filterNumFormat}}</b>
              </p>
              <ul>
                <li>单号：{{item.code}}</li>
                <li>订单时间：{{item.time}}</li>
                <li>姓名：{{item.customer_name}}</li>
                <li>电话：{{item.customer_mobile}}</li>
                <li>{{$store.getters.roleName.adviser}}：{{item.adviser_name}}</li>
              </ul>
              <div class="btns" v-if="item.status == 0">
                <a @click="PrintingClick(item.id)">打印</a>
                <a
                  @click="$router.push({name:'Billing', query:{ id: item.id, orders_id: item.orders_id, appointmentId: item.appointment_id, adviserId: item.adviser_id, customerId: item.customer_id, technicianId: item.technician_id, isEdit: true } })"
                >修改</a>
                <a
                  class="red"
                  @click="$router.push({name:'CollectMoney', query:{ id: item.id, orders_id: item.orders_id, appointment_id: item.appointment_id, adviser_id: item.adviser_id, customer_id: item.customer_id  } })"
                >收银</a>
              </div>
              <div class="btns" v-else>
                <a @click="PrintingClick(item.id)">打印</a>
                <a
                  class="green"
                  @click="$router.push({name:'CollectMoney', query:{ id: item.id, orders_id: item.orders_id, isShowPay: true } })"
                >查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";

import { receiptTodayList } from "@/shop/assets/api/flow/collectMoney";

export default {
  name: "ToCollectMoneyCard",
  data() {
    return {
      magessBoxIsShow: true,
      boxMaxHeight: 0,
      kw: "",
      dataList: [],
      today: ""
    };
  },
  components: {
    autoSearchClient
  },
  methods: {
    myChanged(data) {
      this.kw = data.kw;
    },
    magessBox() {
      this.magessBoxIsShow = false;
    },
    loadData() {},
    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 1 }
      });
    },
    loadData() {
      receiptTodayList({ keyword: this.kw, perpage: 9999 })
        .then(res => {
          if (res.status == 0) {
            this.dataList = res.data.list;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;

    this.today = this.$base.dateTimeToDate(new Date()).split(" ")[0];

    this.loadData();
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
.ToCollectMoneyCard {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  overflow: hidden;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 0.16rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  .magessBox {
    height: 35px;
    display: flex;
    .shuxian {
      display: inline-block;
      width: 0.02rem;
      height: 35px;
      background: rgba(153, 153, 153, 1);
    }
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    .card_list {
      display: flex;
      flex-wrap: wrap;
      .card_list_box {
        margin-right: 0.3rem;
        margin-bottom: 0.3rem;
        .card_list_box_bg {
          height: 100%;
          border-radius: 20px 20px 10px 10px;
          padding: 20px;
          width: 300px;
          height: 366px;
          h3 {
            font-weight: normal;
            font-size: 20px;
            padding-bottom: 14px;
          }
          .content {
            background: #fff;
            height: 315px;
            padding: 15px 15px 0;
            border-radius: 5px 5px 0px 0px;
            em {
              color: #999999;
              font-style: normal;
            }
            p {
              display: flex;
              align-items: flex-end;
              padding-top: 10px;
              span {
                font-size: 18px;
                color: #666;
                position: relative;
                top: -4px;
              }
              b {
                font-size: 30px;
                color: #333333;
              }
            }
            ul {
              padding-top: 20px;
              li {
                line-height: 30px;
                color: #666666;
                span {
                  color: #333;
                }
              }
            }
            .btns {
              display: flex;
              height: 50px;
              align-items: center;
              margin-top: 20px;
              border-top: 1px solid #e5e5e5;
              a {
                flex: 1;
                text-align: center;
                border-left: 1px solid #e5e5e5;
                font-size: 16px;
                color: #666;
                cursor: pointer;
                &:first-of-type {
                  border: 0;
                }
                &.red {
                  color: #ff4444;
                }
                &.green {
                  color: #2aa442;
                }
              }
            }
          }
        }
        .wei {
          background: #f9c6c6;
          h3 {
            color: #ff4444;
          }
        }
        .zhifu {
          background: #9ce8b6;
          h3 {
            color: #2aa442;
          }
        }
      }
    }
  }
}
</style>



    
