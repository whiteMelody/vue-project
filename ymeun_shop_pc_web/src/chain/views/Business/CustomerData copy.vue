<template>
  <div class="CustomerData">
    <!-- 当前页面说明 -->
    <div class="rankingTitle">
      <span class="rankingTabs">客户列表</span>
      <a>总客户数:<b>{{listData.amount}}</b>人</a>
    </div>
    
    <!-- 搜索 -->
    <div class="CustomerData_Select">
      <div class="tankingTime">
        <Input
          placeholder="请输入姓名或电话号码"
          v-model="keyword"
          clearable
        />
        <Select
          placeholder="请选择门店"
          style="margin-left: .14rem;"
          v-model="shopAll.shopAllId"
        >
          <Option :value="0">全部门店</Option>
          <Option
            v-for="(item , index) in  shopAll.list"
            :key="index"
            :value="item.id"
          >{{item.name}}</Option>
        </Select>
        <Select
          placeholder="请选择渠道"
          style="margin-left: .14rem;"
          v-model="entering"
        >
          <Option :value="2">门店</Option>
          <Option :value="1">连锁</Option>
        </Select>
        <button class="ResetButton" @click="ResetButton()">重置</button>
        <button class="searchButton" @click="searchFn">搜索</button>
        <!-- <span @click="addCustomer">
          <i>+</i>
          <a>新增顾客</a>
        </span> -->
      </div>
    </div>
    <!-- 列表页 --> 
    <table class="table_list" cellspacing="0" v-loading="loading">
      <thead>
        <tr>
          <th>序号</th>
          <th>门店</th>
          <th>姓名</th>
          <th>电话</th>
          <th>客户类别</th>
          <th>渠道大类</th>
          <th>渠道小类</th>
          <th>录入来源</th>
          <th>最近上门</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listData.list" :key="index">
          <td v-if="index < 9">0{{index+1}}</td>
          <td v-else>{{index+1}}</td>
          <td>{{item.storeName}}</td>
          <td class="colorText" @click="NameClick(item.id)">{{item.name}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.style.label}}</td>
          <td>{{item.channelPName}}</td>
          <td>{{item.channelName}}</td>
          <td>{{item.is_enterprise}}</td>
          <td>{{item.store_date}}</td>
          <td class="operation">
            <div>
              <p class="data" @click="modificationAddCustomer(item.id,item.is_marketingCenter)">
                <i class="iconfont iconxiugai"></i>
                <a>修改资料</a>
              </p>
              <p class="make_an_appointment">
                <i class="iconfont iconyuyue"></i>
                <span v-if="item.is_appointment == 1">已预约</span>
                <a v-else @click="makeAnAppointmentFn(item.id,item.s_id)">预约</a>
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <div class="pagesBox">
      <Page
        :total="listData.amount"
        :page-size="listData.pagesize"
        show-total
        @on-change="pageEvent"
        show-elevator
        :current="listData.pages"
        v-show="listData.amount > listData.pagesize"
      />
    </div>
    <MessagePop ref="message" :popData="popData"></MessagePop>
  </div>
</template>
<script>
export default {
  name: "CustomerData",
  data() {
    return {
      listData: {
        pages: 1,
        pagesize: 12,
        amount: 0,
        list: ""
      },
      shopAll: {
        list: [],
        shopAllId: 0
      },
      keyword: "",
      entering: "",
      popData: "",
      loading: false
    };
  },
  components: {},
  methods: {
    //搜索
    searchFn(){
      this.listData.pages = 1;
      this.getListFn()
    },
    // 重置
    ResetButton() {
      this.shopAll.shopAllId = "";
      this.keyword = "";
      this.entering = "";
    },

    // 跳转
    NameClick(id) {
      this.$router.push({
        path: "/CustomerCenter",
        query: { id: id }
      });
    },

    // 员工详情
    getListFn() {
      const that = this;
      that.loading = true;
      const postData = {
        s_id: that.shopAll.shopAllId,
        start: that.listData.pages,
        perpage: that.listData.pagesize,
        data: that.keyword,
        is_enterprise: that.entering
      };
      let listReslut = this.$postRequest(
        "/post/api/customers/getList",
        postData
      );
      listReslut.then(res => {
        that.listData.list = res.data.data;
        that.listData.amount = res.data.count.total;
        console.log(that.listData.amount);
        that.loading = false;
      });
    },

    //门店选择
    getStoreFn() {
      const that = this;
      let storeReslut = this.$postRequest("/post/api/store/getStore");
      storeReslut.then(res => {
        that.shopAll.list = res.data;
      });
    },

    //分页器
    pageEvent(pages) {
      const that = this;
      that.listData.pages = pages;
      that.getListFn();
    },

    //预约
    makeAnAppointmentFn(id, sId) {
      this.popData = {
        id: id,
        s_id: sId,
        popBgText: "makeAnAppointment"
      };
      this.$refs.message.popBgStateShowFn(this.popData);
    },

    //新增顾客
    addCustomer() {
      this.$router.push({
        path: "/AddCustomer"
      });
    },

    //修改顾客
    modificationAddCustomer(id,type) {
      if(type == 1){
        this.$router.push({
          path: "/MarketingEdit",
          query: {
            id: id
          }
        });
      }
      else{
        this.$router.push({
          path: "/ModificationAddCustomer",
          query: {
            id: id
          }
        });
      }
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
    this.getStoreFn();
    this.getListFn();
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
.CustomerData {
  width: 100%;
  background-color: #ffffff;
  padding: 0 0.26rem;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
  margin-top: .2rem;
  .ivu-input-wrapper {
    width: 2rem;
  }
  .ivu-select  {
    width: 2rem;
  }
  .rankingTitle {
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 18px;
    color: #666666;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    border-bottom: 0.01rem solid #e5e5e5;
    .rankingTabs {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      margin-right: 20px;
      color: #333;
    }
    a{
      color: #999;
      font-size: 14px;
      b{
        font-weight: normal;
        color: #333;
      }
    }
  }
  .CustomerData_Select {
    width: 100%;
    padding-top: 0.07rem;
    .ResetButton {
      left: 6.74rem;
      background-color: #ffffff;
      color: #333333;
      border: 1px solid rgba(153, 153, 153, 1);
    }
    .searchButton {
      left: 7.74rem;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.3rem;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff5722;
      color: #fff;
      i {
        font-style: normal;
      }
      a {
        color: #fff;
        margin-left: 0.1rem;
      }
    }
  }
  table {
    tr {
      .operation {
        width: 2.4rem;
        div {
          display: flex;
          margin: 0 auto;
          color: #666666;
          p {
            display: flex;
            padding-left: 0.1rem;
            i {
              font-size: 0.16rem;
            }
          }
          .data {
            i {
              color: #009688;
            }
            a {
              color: #666666;
            }
            a:hover {
              text-decoration: underline;
              color: #009688;
            }
          }
          .make_an_appointment {
            i {
              color: #ff5722;
            }
            a {
              color: #666666;
            }
            a:hover {
              text-decoration: underline;
              color: #ff5722;
            }
          }
        }
      }
    }
  }
}
</style>



    
