<template>
  <div class="MessageManagement">
    <div class="text_title">
      <span>消息管理</span>
    </div>
    <!-- 搜搜栏 -->
    <div class="search">
      <Row>
        <Col span="12">
          <DatePicker
            @on-change="handleChange"
            type="date"
            placeholder="请选择时间"
            :value="dataValue"
            placement="bottom-start"
            format="yyyy-MM-dd"
          ></DatePicker>
        </Col>
      </Row>
      <Input v-model="keyword" placeholder="请输入发布人"/>
      <Select placeholder="请选择门店" v-model="shopAllId">
        <Option :value="0">全部门店</Option>
        <Option v-for="(item, index) in dataListName" :key="index" :value="item.id">{{item.name}}</Option>
      </Select>
      <div class="ResetButton" @click="resetFn">重置</div>
      <div class="btn" @click="getListFn(1)">搜索</div>
      <span @click="newlyAdded()">
        <i>+</i>
        <a>发布消息</a>
      </span>
    </div>
    <!-- 消息列表 -->
    <div class="list">
      <table class="table_list" cellspacing="0" v-loading="loading">
        <thead>
          <tr>
            <th>序号</th>
            <th>发布时间</th>
            <th>时间标题</th>
            <th>消息内容</th>
            <th>接收门店</th>
            <th>发布人</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listDataList" :key="index" style=" height:1.1rem">
            <td v-if="index < 9">0{{index+1}}</td>
            <td v-else>{{index+1}}</td>
            <td class="tdTime">{{item.created_at | _endTimeFormat}}</td>
            <td>{{item.title}}</td>
            <td class="tdBox">
              <span :class="item.tdViewMore ? 'tdIsShow' : 'tdIsHide'" v-html="item.content"></span>
              <div class="quanbu" @click="tdIsChakan(index)" v-if="item.content.length >= 121">{{item.tdViewMore ? '查看全部' : '收起'}}</div>
            </td>
            <td class="receive">
              <span v-for="(i, index) in item.receive" :key="index">{{i.name}}</span>
              <b v-if="index >= 1 ">,</b>
            </td>
            <td>{{item.user.name}}</td>
            <td class="operation">
              <div @click="modificationFn(item.id)">
                <p class="data">
                  <i style="color:#41b883;" class="iconfont iconshanchu"></i>
                  <span>删除</span>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagesBox">
        <Page
          :total="staffDel"
          :page-size="pagesize"
          show-total
          @on-change="pageEvent"
          show-elevator
          :current ="pages"
          v-show="staffDel > pagesize"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "MessageManagement",
  data() {
    return {
      keyword: "",
      shopAllId: 0,
      dataValue: null,
      dataListName: [],
      pages: 1,
      pagesize: 6,
      staffDel: 0,
      listDataList: [],
      tdIs_showHide: true,
      searchParam: {},
      loading:false
    };
  },
  components: { Dialog },
  methods: {
    resetFn() {
      this.keyword = "";
      this.shopAllId = "";
      this.dataValue = null;
    },

    handleChange(date) {
      this.dataValue = date;
    },

    getListFn(str) {
      this.loading = true;
      this.pages = str;
      this.currentpage = 1;
      this.searchParam.start = str;
      this.searchParam.perpage = this.pagesize;
      this.searchParam.addTime = this.dataValue;
      this.searchParam.storeId = this.shopAllId;
      this.searchParam.fullname = this.keyword;

      this.$postRequest("/post/api/message/inbox", this.searchParam).then(
        res => {
          this.staffDel = res.data.total;
          this.listDataList = res.data.list;
          for (let index = 0; index < res.data.list.length; index++) {
            res.data.list[index].tdViewMore = true;
          }
          this.loading = false;
        }
      );
      
    },

    newlyAdded() {
      this.$router.push({
        path: "/PublishNews"
      });
    },

    modificationFn(id) {
      Dialog.confirm({
        title: "确定删除吗?"
      })
        .then(() => {
          this.$postRequest("/post/api/message/remove", {
            messageId: id
          }).then(res => {
            console.log(res);
            if (res.status == 0) {
              Dialog.alert({
                message: "删除成功"
              }).then(() => {
                this.getListFn(1);
              });
            } else {
              Dialog.alert({
                message: "删除失败"
              }).then(() => {
                // on close
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    tdIsChakan(index) {
      this.listDataList[index].tdViewMore = !this.listDataList[index].tdViewMore;
      this.$forceUpdate();
    },

    pageEvent(pages) {
      // this.pages = pages;
      this.getListFn(pages);
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.$postRequest("/post/api/store/getOrderRankingListByStore").then(
      res => {
        if (res.status == 0) {
          this.dataListName = res.data;
        }
      }
    );

    this.getListFn(1);
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
.MessageManagement {
  background-color: #ffffff;
  padding: 0 0.26rem;
  padding-bottom: 0.2rem;
  margin-top: .2rem;
  .text_title {
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #009688;
    font-size: 0.18rem;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  .ivu-input-wrapper {
      width: 2rem;
      margin-right: 0.14rem;
    }
    .ivu-select {
      width: 2rem;
      margin-right: 0.14rem;
    }
    .ivu-col  {
      width: 2rem;
      margin-right: 0.14rem;
    }
  .search {
    background: #fff;
    display: flex;
    padding-top: 0.2rem;
    position: relative;
    .ResetButton {
      background-color: #ffffff;
      color: #333333;
      width: 0.8rem;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
      font-size: 0.16rem;
      cursor: pointer;
      height: 32px;
      border: 1px solid #999999;
    }
    .btn {
      width: 0.8rem;
      height: 32px;
      line-height: 32px;
      margin-left: 0.2rem;
      text-align: center;
      color: #fff;
      font-size: 0.16rem;
      background: #009688;
      border-radius: 2px;
      cursor: pointer;
    }
    span {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-25%);
      width: 1.3rem;
      height: 32px;
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

  .list {
    thead {
      tr {
        th {
          border-right: 0.01rem solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
        }
        th:first-child {
          border-left: 0.01rem solid #e5e5e5;
        }
      }
    }
    tbody {
      tr {
        td {
          border-right: 0.01rem solid #e5e5e5;
        }
        td:first-child {
          border-left: 0.01rem solid #e5e5e5;
        }
        .receive {
          width: 4rem;
          padding: 0.2rem 0.4rem;
          span {
            margin-right: 0.05rem;
          }
        }
        .operation {
          span {
            &:hover {
              opacity: 0.7;
              color: #009688;
              text-decoration: underline;
            }
          }
        }
        .tdTime {
          width: 2rem;
        }
        .tdBox {
          width: 5rem;
          word-break:break-all;
          .tdIsShow {
            margin: 0.1rem 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .tdIsHide {
            display: block;
            margin: 0.1rem 0.3rem;
          }
          .quanbu {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(236, 65, 77, 1);
            margin: 0.05rem 0;
          }
        }
      }
      tr:last-child {
        td {
          border-bottom: 0.01rem solid #e5e5e5;
        }
      }
    }
  }
}
</style>
<style>
.van-dialog {
  width: 15%;
}
</style>


    
