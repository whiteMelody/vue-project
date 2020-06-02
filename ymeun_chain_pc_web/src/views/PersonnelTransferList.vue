<template>
  <div class="PersonnelTransferList">
    <div class="content">
      <div class="tabs_title">
        <div>
          <p class="active">
            <span>人事调动</span>
            <em></em>
          </p>
        </div>
      </div>

      <div class="search">
        <Input v-model="listData.keyword" placeholder="请输入姓名或电话号码"/>
        <Select placeholder="请选择门店" v-model="shopAll.shopAllId">
          <Option :value="0">全部门店</Option>
          <Option
            v-for="(item , index) in  shopAll.list"
            :key="index"
            :value="item.id"
          >{{item.name}}</Option>
        </Select>
        <div class="ResetButton" @click="resetFn">重置</div>
        <div class="btn" @click="searchFn">搜索</div>
      </div>
      <div class="list">
        <table class="table_list" cellspacing="0" v-loading="loading">
          <thead>
            <tr>
              <th>门店</th>
              <th>姓名</th>
              <th>电话</th>
              <th>岗位</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData.list" :key="index">
              <td>{{item.store_name}}</td>
              <td>{{item.name}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.role_name}}</td>
              <td class="operation">
                <div>
                  <p class="data">
                    <i class="iconfont iconrenshitiaodong"></i>
                    <a @click="modificationFn(item.e_id,item.users_id,item.s_id)">调动</a>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      </div>
    </div>
    <MessagePop ref="message" :popData="popData"></MessagePop>
  </div>
</template>
<script>
export default {
  name: "PersonnelTransferList",
  data() {
    return {
      shopId: "",
      shopAll: {
        list: [],
        shopAllId: 0
      },
      listData: {
        pages: 1,
        amount: 0,
        pagesize: 12,
        keyword: ""
      },
      popData: "",
      loading:false
    };
  },

  components: {},
  methods: {
    //搜索
    searchFn(){
      this.listData.pages = 1;
      this.getListFn()
    },
    // //门店选择
    getStoreFn() {
      const that = this;
      let storeReslut = this.$postRequest("/post/api/store/getStore");
      storeReslut.then(res => {
        that.shopAll.list = res.data;
      });
    },

    //重置选择
    resetFn() {
      this.listData.keyword = "";
      this.shopAll.shopAllId = "";
    },

    // 分页
    pageEvent(pages) {
      const that = this;
      that.listData.pages = pages;
      that.getListFn();
    },

    // 人事调动列表
    getListFn() {
      const that = this;
      that.loading = true;
      const postData = {
        s_id: that.shopAll.shopAllId,
        start: that.listData.pages,
        perpage: that.listData.pagesize,
        keyword: that.listData.keyword
      };
      this.$postRequest("/post/api/members/getMembersList", postData).then(
        res => {
          that.listData.list = res.data.data;
          that.listData.amount = res.data.total;
          that.loading = false;
          that.$forceUpdate();
        }
      );
    },

    modificationFn(eId, userId) {
      const that = this;
      // this.popData = {
      //   personnelgetDataUrl: [
      //     {
      //       e_id: eId,
      //       api: "/post/api/store/getStore",
      //       types: "shopList"
      //     },
      //     {
      //       s_id: sId,
      //       id: userId,
      //       api: "/post/api/members/transferInterface",
      //       types: "operatingPostList"
      //     }
      //   ],
      //   personnelsubDataUrl: "",
      //   popBgText: "personnel"
      // };
      this.popData = {
        e_id: eId,
        id:userId,
        personnelgetDataUrl:"/post/api/store/getStore",
        personnelsubDataUrl: "",
        popBgText: "personnel"
      };
      this.$refs.message.popBgStateShowFn(this.popData);
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    const that = this;
    that.shopId = that.$route.query.id;
    that.getListFn();
    this.getStoreFn();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.PersonnelTransferList {
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
      .ivu-input-wrapper {
        width: 2rem;
        margin-right: 0.2rem;
      }
      .ivu-select {
        width: 2rem;
        margin-right: 0.2rem;
      }
      .ResetButton {
        background-color: #ffffff;
        color: #333333;
        width: 0.8rem;
        text-align: center;
        line-height: 0.3rem;
        border-radius: 2px;
        font-size: 0.16rem;
        cursor: pointer;
        height: 0.3rem;
        border: 1px solid #999999;
      }
      .btn {
        width: 0.8rem;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-left: 0.2rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        background: #009688;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .list {
      background: #fff;
      .operation {
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
    }
  }
}
</style>


<style lang="scss" scoped>
</style>



    
