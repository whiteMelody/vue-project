<template>
  <div class="CounselingMessage">
    <div class="search">
      <DatePicker @on-change="tabTowDateValFn" :value="tabTowDateVal" type="daterange" transfer split-panels placeholder="开始时间 — 结束时间"></DatePicker>
      <div class="btn" @click="searchFn('employeeData')">搜索</div>
    </div>
    <div class="list">
      <table class="table_list" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>咨询时间</th>
            <th>内容</th>
            <th>顾问</th>
            <th>规划项目</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listData.length == 0">
            <td colspan="11">暂无数据</td>
          </tr>
          <tr v-for="(item, index) in listData" :key="index" v-else>
            <td v-if="index < 9">0{{index+1}}</td>
            <td v-else>{{index+1}}</td>
            <td>{{item.time}}</td>
            <td>{{item.content}}</td>
            <td>{{item.adviser_name}}</td>
            <td>{{item.items_planning}}</td>
            <td>{{item.customers_status}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagesBox" v-if="amount > 12">
           <Page
            :total="amount"
            @on-change="pageEvent"
            :page-size="pagesize"
            :current="pages"
            v-show="amount > pagesize"
          />
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CounselingMessage",
  data() {
    return {
      userId:'',
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
      that.informationConsultationListFn()
    },
    //员工数据 数据时间选择
    tabTowDateValFn(date){
      const that = this;
      that.tabTowDateVal = [...date]
    },
    informationConsultationListFn(){
      const that = this;
      const postData = {
        id:that.userId,
        startTime:that.tabTowDateVal[0],
        endTime:that.tabTowDateVal[1],
        perpage:that.pagesize,
        start:that.pages
      }
      that.$postRequest("/post/api/customers/informationConsultationList",postData).then(res => {
        that.listData = res.data.data
        that.amount = res.data.total
      })
    },
    //分页器
    pageEvent(pages){
      const that = this;
      that.pages = pages;
      that.informationConsultationListFn()
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.userId = this.$route.query.id;
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.tabTowDateVal = this.$common.getBeginningOfMonth();
    this.informationConsultationListFn()
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
.CounselingMessage {
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
  .list{
    margin-top: .26rem;
    min-height: 6rem;
  }
}
</style>



    
