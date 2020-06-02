<template>
  <div class="ConsumeDetails" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>总未划扣金额明细</header>
    <!-- <el-alert
      :title="'筛选条件中，筛选时间是筛选的该用户收银时的时间'"
      type="info"
      style="border-left: 2px solid #999999; border-radius: 0;"
    ></el-alert> -->
    <div class="clear-f2"></div>
    <div class="clear3"></div>

     <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                    <el-form-item>
                        <el-input v-model="condition.keyword" placeholder="请输入顾客姓名"></el-input>
<!--                        <auto-search-client @changed="myChanged" ref='autoSearch'></auto-search-client>-->
                    </el-form-item>
                    <el-form-item class="w350px">
                        <el-date-picker
                        class="wb100"
                        v-model="daterangeTimer"
                        :clearable="false"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-form-item>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
             
                </el-form>

                <div class="pa10 bg-gray6 text-center f14px">

                    <div class="wb16 mar3per fl h40px lh40px bd-gray bd-r1 mat15">
                        总未划扣金额统计
                    </div>

                    <div class="wb20 fl">
                        <p class="fc-gray2 h20px lh20px">未划扣总次数（次）</p>
                        <div class="clear1"></div>
                        <p class="fc-gray4 f20px h40px lh40px text-over-hidden1">{{info.number }}</p>
                    </div>
                    <div class="wb20 fl">
                        <p class="fc-gray2 h20px lh20px">总未划扣金额（元）</p>
                        <div class="clear1"></div>
                        <p class="fc-gray4 f20px h40px lh40px text-over-hidden1">{{info.price | _filterNumFormat }}</p>
                    </div>
                
                    <div class="clear0"></div>

                </div>

                <div class="clear3"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList"  border>

                        <el-table-column prop="index" align="left" label="序号" width="50px">
                            <template slot-scope="scope">{{scope.$index+1}}</template>
                        </el-table-column>
                        <el-table-column align="left" label="客户姓名">
                            <template slot-scope="scope">
                              <el-link  :underline="false"  @click="$router.push({name: 'EssentialInformation',query:{ id: scope.row.id, }  })">{{ scope.row.name }} </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="电话">
                            <template slot-scope="scope">{{ scope.row.mobile}}</template>
                        </el-table-column>
                        <el-table-column align="left" label="项目名称" width="200px">
                            <template slot-scope="scope">
                                <template v-for="(item,index) in scope.row.items">
                                    <p class="h40px lh40px" style="width:220px; margin-left: -10px;" :class="index < scope.row.items.length-1 ? 'bd-gray bd-b1' : '' ">{{item.itemName}}</p>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="left" label="未划扣次数（次）" width="200px">
                            <template slot-scope="scope">
                                <template v-for="(item,index) in scope.row.items">
                                    <p class="h40px lh40px" style="width:220px; margin-left: -10px;" :class="index < scope.row.items.length-1 ? 'bd-gray bd-b1' : '' ">{{item.number}}</p>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="left" label="未划扣金额(元)" width="200px">
                            <template slot-scope="scope">
                                <template v-for="(item,index) in scope.row.items">
                                    <p class="h40px lh40px" style="width:220px; margin-left: -10px;" :class="index < scope.row.items.length-1 ? 'bd-gray bd-b1' : '' ">{{item.price | _filterNumFormat }}</p>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column prop="store_time" align="left" label="未划扣总次数(次)" width="150px">
                            <template slot-scope="scope">{{ scope.row.number}}</template>
                        </el-table-column>
                        <el-table-column prop="store_time" align="left" label="总未划扣金额(元)" width="150px">
                            <template slot-scope="scope">{{ scope.row.price | _filterNumFormat}}</template>
                        </el-table-column>

                    </el-table>
                </base-list>
            </div>

            <div class="clear0"></div>

        </div>

  </div>
</template>
<script>
import { consumeSurplus } from "@/chain/assets/api/shopData/shopData";

//自动查询客户组件
import autoSearchClient from "@/chain/components/autocomplete/autoSearchClient";
export default {
  name: "ConsumeDetails",
  data() {
    return {
      boxMaxHeight:"",
      daterangeTimer: [],
      // 查询条件
      counselor: {
        counselor: ""
      },
      condition: {
          s_id: this.$route.query.shopId
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: consumeSurplus, // 分页查询api接口
      info: {},
    };
  },
  components: {
    autoSearchClient
  },
  methods: {
    myChanged(data){
      this.condition.keyword = data.kw
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data){
        this.info = data.count;
        this.demoList = data.list;
    },
    
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },
  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {
    daterangeTimer(newData, oldData) {
      this.condition.startTime = this.$base.dateTimeToDate(newData[0], "startTime");
      this.condition.endTime = this.$base.dateTimeToDate(newData[1], "endTime");
    }
  },
};
</script>

<style lang="scss" scoped>
.ConsumeDetails {
  margin: 20px;
  padding: 0 0.2rem;
  background-color: #fff;

  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #333;
  }

  .listBox {
    padding: 0.2rem 0;

    .list_status {
      span {
        display: block;
        width: 0.8rem;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        color: #fff;
        border-radius: 2px;
      }

      .colorGrreng {
        background: rgba(159, 219, 157, 1);
        border-radius: 2px;
      }

      .colorCheng {
        background: rgba(254, 183, 140, 1);
        border-radius: 2px;
      }
    }

    .box {
      p {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
      }

      .gray {
        color: #333333;
      }
    }
  }

  .MagessBox {

    .title {
      padding: 0 .2rem;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #F2F2F2;

      span {
        font-size: .18rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .infoBox {
      padding: 0 .2rem;

      .name {
        height: 65px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;

        .fullName {
          font-size: .2rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-right: .4rem;

          .iconnan {
            color: #2878ff;
          }

          .iconnv {
            color: #ec414d;
          }
        }

        .mobile {
          font-size: .14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-right: .4rem;
        }

        .age {
          font-size: .14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }

      .input {
        margin-top: .2rem;
        height: 70px;
        border: 1px solid #e5e5e5;
        background-color: #F8F8F8;
        padding: .15rem;
        overflow: hidden;

        textarea {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #F8F8F8;
          font-size: .14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #333333;
        }

        .huifang {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #F8F8F8;
          font-size: .14rem;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #333333;
        }
      }

      .ReturnLIst {
        .ReturnLIst_title {
          padding-top: .24rem;
          display: flex;
          justify-content: space-between;

          span {
            font-size: .16rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }

          i {
            cursor: pointer;
            height: 8px;
            color: #999999;
          }
        }

        ul {
          li {
            padding: .18rem 0;
            border-bottom: 1px solid #e5e5e5;

            .time {
              font-size: .16rem;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }

            .text {
              margin-top: .07rem;
              font-size: .14rem;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 20px;
            }
          }
        }
      }

      .buttom {
        margin-top: .4rem;
        padding-bottom: .2rem;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>


    
