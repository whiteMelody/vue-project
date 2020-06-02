<template>
  <div class="HospitalGuideMessage">
    <div class="search">
      <DatePicker @on-change="tabTowDateValFn" :value="tabTowDateVal" type="daterange" transfer split-panels placeholder="开始时间 — 结束时间"></DatePicker>
      <div class="btn" @click="searchFn">搜索</div>
    </div>
    <div class="titles">
      <h3>{{userName}}</h3>
      <b></b>
      <ul>
        <li>
          <span>共到诊（次） </span>
          <p>{{amount}}</p>
        </li>
        <!-- <li>
          <span>合计消费（元）</span>
          <p>{{123123|NumFormat}}</p>
        </li> -->
      </ul>
    </div>
    <div class="list">
      <table class="table_list" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>到诊状态</th>
            <th>成交状态</th>
            <th>到店日期</th>
            <th>预约项目</th>
            <th>顾问</th>
            <th>技师</th>
            <th>到诊情况</th>
            <th>成交金额（元）</th>
            <th>退单金额（元）</th>
            <th>铺垫项目</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listData.length == 0">
            <td colspan="11">暂无数据</td>
          </tr>
          <tr v-for="(item, index) in listData" :key="index" v-else> 
            <td v-if="index < 9">0{{index+1}}</td>
            <td v-else>{{index+1}}</td>
            <td>{{item.app_status}}</td>
            <td>
              <span class="color" v-if="item.orders_status == '未成交'">{{item.orders_status}}</span>
              <span v-else>{{item.orders_status}}</span>
            </td>
            <td>{{item.storeTime}}</td>
            <td v-html="item.items_name"></td>
            <td>{{item.adviser_name}}</td>
            <td>{{item.technician_name}}</td>
            <td>{{item.content}}</td>
            <td>{{item.orders_price|NumFormat}}</td>
            <td>{{item.refundPrice|NumFormat}}</td>
            <td>{{item.consultation_items}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagesBox" v-if="amount > 12">
          <Page
            :total="amount"
            @on-change="pageEvent"
            :page-size="pagesize"
            :current ="pages"
            v-show="amount > pagesize"
          />
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HospitalGuideMessage",
  data() {
    return {
      userId:'',
      userName:'',
      listData:'',
      pages:1,
      pagesize:12,
      amount:0,
      tabTowDateVal:[],
    };
  },
  components: {},
  methods: {
    //搜索
    searchFn(){
      const that = this;
      that.pages = 1;
      that.informationAppointmentListFn()
    },
    //员工数据 数据时间选择
    tabTowDateValFn(date){
      const that = this;
      that.tabTowDateVal = [...date]
    },
    informationAppointmentListFn(){
      const that = this;
      const postData = {
        customerId:that.userId,
        startTime:that.tabTowDateVal[0],
        endTime:that.tabTowDateVal[1],
        number:that.pagesize,
        start:that.pages
      }
      that.$postRequest("/post/api/customers/informationAppointmentList",postData).then(res => {
        that.listData = res.data.list
        that.amount = res.data.total
      })
    },
    //分页器
    pageEvent(pages){
      const that = this;
      that.pages = pages;
      that.informationAppointmentListFn()
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {

    this.tabTowDateVal = this.$common.getBeginningOfMonth();
    this.userId = this.$route.query.id;
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.informationAppointmentListFn()
    //顾客基本信息
    const that = this;
    that.$postRequest("/post/api/customers/information",{
      id:that.userId,
    }).then(res => {
      that.userName = res.data.name
    })
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
.HospitalGuideMessage {
  .search{
    background: #fff;
    display: flex;
    .ivu-date-picker{
      width: 2rem;
    }
    .btn{
      width: .8rem;
      height: .3rem;
      line-height: .3rem;
      text-align: center;
      color: #fff;
      font-size: .16rem;
      background: #009688;
      margin-left: .2rem;
      border-radius:2px;
      cursor: pointer;
    }
  } 
  .titles{
    background: #FFEAEB;
    height: 1.14rem;
    display: flex;
    align-items: center;
    margin-top: .26rem;
    h3{
      font-size: .22rem;
      color: #333333;
      padding: 0 .3rem;
      font-weight: normal;
    }
    b{
      width: 1px;
      height: .4rem;
      background: #EC414D;
    }
    ul{
      padding-left: .8rem;
      display: flex;
      align-items: center;
      li{
        display: flex;
        height: .8rem;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 1.6rem;
        span{
          color: #666666;
          font-size: .16rem;
        }
        p{
          color: #333333;
          font-size: .26rem;
        }
      }
    }
  }
  .list{
    margin-top: .26rem;
    min-height: 6rem;
    table{
      tbody{
        tr{
          td{
            .color{
              color: #EC414D;
            }
          }
        }
      }
    }
  }
}
</style>



    
