<template>
  <div class="EmployeeData">
    <div class="content">
      <div class="tabs_title">
        <div>
          <p class="active">
            <span>员工数据</span>
            <em></em>
          </p>
        </div>
      </div>

      <div class="search">
        <Select placeholder="请选择门店" v-model="StoreName">
          <Option :value="0">全部门店</Option>
          <Option
            v-for="(item, index) in storeDataList"
            :key="index"
            :value="item.store.id"
          >{{item.store.name}}</Option>
        </Select>
        <div class="btn" @click="searchFn()">搜索</div>
      </div>
      <div class="aggregatePerformance" v-loading="loadingOne">
        <div class="Total">
          <span>合计(人)</span>
          <p>{{membersNumberData.total}}</p>
        </div>
        <div class="henxian"></div>
        <ul>
          <li>
            <span>店长 (人)</span>
            <p>{{membersNumberData.dianzhang}}</p>
          </li>
          <li>
            <span>顾问（人）</span>
            <p>{{membersNumberData.adviser}}</p>
          </li>
          <li>
            <span>技师（人）</span>
            <p>{{membersNumberData.jishi}}</p>
          </li>
          <li>
            <span>前台（人）</span>
            <p>{{membersNumberData.qiantai}}</p>
          </li>
          <li>
            <span>其他（人）</span>
            <p>{{membersNumberData.qita}}</p>
          </li>
        </ul>
      </div>

      <div class="list">
        <table class="table_list" cellspacing="0" v-loading="loadingTow">
          <thead>
            <tr>
              <th>门店</th>
              <th>员工数（人）</th>
              <th>顾问（人）</th>
              <th>技师（人）</th>
              <th>前台（人）</th>
              <th>其他（人）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData.list" :key="index">
              <td>{{item.store.name}}</td>
              <td>{{item.total}}</td>
              <td>{{item.adviser}}</td>
              <td>{{item.jishi}}</td>
              <td>{{item.qiantai}}</td>
              <td>{{item.qita}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="pagesBox">
          <Page
            :total="listData.amount"
            @on-change="pageEvent"
            :page-size="listData.pagesize"
          />
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeData",
  data() {
    return {
      shopId: "",
      membersNumberData: "",
      storeDataList:[],
      listData: {
        pages: 1,
        pagesize: 12,
        amount: 0,
        list: ""
      },
      StoreName: "",
      loadingOne: false,
      loadingTow: false
    };
  },

  components: {},
  methods: {
    // 员工数据合计
    getMembersNumberFn() {
      const that = this;
      that.loadingOne =true;
      const postData = {
        s_id: that.shopId
      };
      let MembersNumberReslut = this.$postRequest(
        "/post/api/members/getMembersNumber",
        postData
      );
      MembersNumberReslut.then(res => {
        that.membersNumberData = res.data;
        that.loadingOne =false;
      });
    },

    // 员工数据列表
    getAnalysisFn() {
      const that = this;
      that.loadingTow =true;
      const postData = {
        start: that.listData.pages,
        perpage: that.listData.pagesize
      };
      let listReslut = this.$postRequest(
        "/post/api/store/getAnalysis",
        postData
      );
      listReslut.then(res => {
        that.listData.list = res.data.list;
        that.storeDataList = res.data.list;
        that.loadingTow =false;
      });
    },

    searchFn() {
      this.loadingTow =true;
      this.$postRequest("/post/api/store/getAnalysis", {
        storeId: this.StoreName
      }).then(res => {
        this.listData.list = res.data.list;
        this.loadingTow =false;
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
    const that = this;
    that.shopId = that.$route.query.id;
    that.getMembersNumberFn();
    that.getAnalysisFn();
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
.EmployeeData {
  .content {
    background: #fff;
    padding: 0 0.26rem 0.4rem;
    margin-top: 0.2rem;
    .tabs_title {
      div {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        align-items: center;
        p {
          padding: 0.16rem 0;
          font-size: 0.18rem;
          margin-right: 0.58rem;
          position: relative;
          cursor: pointer;
          em {
            width: 100%;
            height: 2px;
            background: #009688;
            position: absolute;
            bottom: 0;
            left: 0;
            opacity: 0;
          }
        }
        .active {
          color: #009688;
          em {
            opacity: 1;
          }
        }
      }
    }
    .search {
      background: #fff;
      display: flex;
      padding-top: 0.2rem;
      .ivu-select {
        width: 2rem;
      }
      .btn {
        width: 0.8rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        background: #009688;
        margin-left: 0.2rem;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .list {
      background: #fff;

      .aggregatePerformance {
        color: #333333;
        .Total {
          width: 1rem;
        }
      }
    }
  }
}
</style>


<style lang="scss" scoped>
</style>



    
