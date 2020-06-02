<template>
  <div class="TaskManagement" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="header">
      <p>{{timeList[timeIndex]}}任务实时数据</p>
      <div class="time">
        <div class="div" v-for="(item, index) in timeList" :key="index">
          <span :class="{spanActive:timeIndex == index}" @click="spanBackClick(index,item)">{{item}}</span>
          <i></i>
        </div>
      </div>
    </div>

    <div class="box">

      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

        <el-form-item label>
            <el-select v-model="condition.s_id" placeholder="选择门店" readonly clearable>
                <el-option :key="''" label="全部门店" :value="''"></el-option>
                <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                          :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
        </el-form-item>
        
      </el-form>

      <div class="total_data">
        <div class="total_data_box">
          <div class="left">
            <ul>
              <li>
                <span>总任务数（条）</span>
                <p>{{info.taskCount}}</p>
              </li>
              <li>
                <span>已完成（条）</span>
                <p>{{info.taskFinishCount}}</p>
              </li>
              <li>
                <i><img src="@/chain/assets/images/taskManagement_img2.png" alt=""></i>
              </li>
              <li>
                <span>未完成（条）</span>
                <p>{{info.taskNoFinishCount}}</p>
              </li>
            </ul>
          </div>
          <div class="right">
              <el-progress type="circle" :percentage="info.taskPercentageTow" :width="100" color='#F10215'></el-progress>
              <span>完成率</span>
          </div>
        </div>
        <div class="total_data_box">
          <div class="left">
            <ul>
              <li>
                <span>总回访数（条）</span>
                <p>{{info.reviewCount}}</p>
              </li>
              <li>
                <span>已完成（条）</span>
                <p>{{info.reviewFinishCount}}</p>
              </li>
              <li>
                <i><img src="@/chain/assets/images/taskManagement_img1.png" alt=""></i>

              </li>
              <li>
                <span>未完成（条）</span>
                <p>{{info.reviewNoFinishCount}}</p>
              </li>
            </ul>
          </div>
          <div class="right">
              <el-progress type="circle" :percentage="info.reviewPercentageTow" :width="100" color='#F10215'></el-progress>
              <span>完成率</span>
          </div>
        </div>
      </div>

      <base-list ref="demoTable" :condition="condition"
                    :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

        <el-table slot="list" :data="demoList"  border>

          <el-table-column prop="type" align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="name" align="center" label="门店名称">
            <template slot-scope="scope">
                {{scope.row.name}}
            </template>
          </el-table-column>

          <el-table-column prop="taskCount" align="center" label="任务数（条）">
            <template slot-scope="scope">
              {{ scope.row.taskCount}}
            </template>
          </el-table-column>

          <el-table-column prop="taskFinishCount" align="center" label="任务完成数（条）">
            <template slot-scope="scope">
              {{ scope.row.taskFinishCount }}
            </template>
          </el-table-column>

          <el-table-column prop="taskPercentage" align="center" label="任务完成率">
            <template slot-scope="scope">
              <p :class="scope.row.taskPercentageColor">{{ scope.row.taskPercentage }}</p>
            </template>
          </el-table-column>

          <el-table-column prop="reviewCount" align="center" label="回访数（条）">
            <template slot-scope="scope">
              {{ scope.row.reviewCount }}
            </template>
          </el-table-column>

          <el-table-column prop="reviewFinishCount" align="center" label="回访完成数（条）">
            <template slot-scope="scope">
              {{ scope.row.reviewFinishCount }}
            </template>
          </el-table-column>

          <el-table-column prop="adviser_name" align="center" label="回访完成率">
            <template slot-scope="scope">
              <p :class="scope.row.reviewPercentageColor">{{ scope.row.reviewPercentage }}</p>
            </template>
          </el-table-column>

        </el-table>

      </base-list>
    </div>
 
  </div>
</template>
<script>
import { getProgramList } from "@/chain/assets/api/common/common"
import { taskMembersList } from "@/chain/assets/api/task/task"
export default {
  name: "TaskManagement",
  data() {
    return {
      boxMaxHeight:"",
      timeList: ["本月", "今日", "昨日", "上周", "本年"],
      timeIndex:0,
      // timeActive:{
      //   startTime:this.$base.getDateScope(0).startTime,
      //   endTime:this.$base.getDateScope(0).endTime
      // },
      storeList:[],
      // condition: this.$base.getDateScope(0), // 查询条件
      condition:{
        startTime:this.$base.getDateScope(0).startTime,
        endTime:this.$base.getDateScope(0).endTime
      },
      demoList: [],                      // table数组
      pageSearch: taskMembersList,       // 分页查询api接口
      info:{},
    };
  },

  components: {},
  methods: {
    // tab时间选项
    spanBackClick(index, item) {
      this.timeIndex = index;
      this.condition.startTime = this.$base.getDateScope(index).startTime;
      this.condition.endTime = this.$base.getDateScope(index).endTime;
   
      this.loadData()
    },
    getLoaded(data){
      this.info = data.collect
      this.info.reviewPercentageTow = Number.parseFloat(this.info.reviewPercentage) 
      this.info.taskPercentageTow = Number.parseFloat(this.info.taskPercentage) 

      this.demoList = data.list
      this.demoList.map((item , index) => {
        let taskPercentage = Number.parseFloat(item.taskPercentage)
        let reviewPercentage = Number.parseFloat(item.reviewPercentage)

        if(taskPercentage <= 60 && taskPercentage >= 0){
          item.taskPercentageColor = "red"
        }
        else if(taskPercentage > 60 && taskPercentage <= 90){
          item.taskPercentageColor = "orange"
        }
        else if(taskPercentage > 90){
          item.taskPercentageColor = "green"
        }

        if(reviewPercentage <= 60 && reviewPercentage >= 0){
          item.reviewPercentageColor = "red"
        }
        else if(reviewPercentage > 60 && reviewPercentage <= 90){
          item.reviewPercentageColor = "orange"
        }
        else if(reviewPercentage > 90){
          item.reviewPercentageColor = "green"
        }

        console.log('taskPercentage :', taskPercentage)
        console.log('reviewPercentage :', reviewPercentage)
      })
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    //获取门店列表
    this.$postRequest("/post/api/store/getStore").then(res => {
        if(res.status == 0){
        let _tmp = res.data
        for(let i=0; i<_tmp.length; i++){
            _tmp[i].isSelected = false
        }
        this.storeList = _tmp
        }
    })

    this.boxMaxHeight = window.innerHeight - 100;


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
.TaskManagement {
  margin: 20px;
  background: #fff;
  .header{
    display: flex;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
    padding: 0 18px;
    margin-bottom: 10px;
    p{
      flex: 1;
      font-size: 14px;
      color: #333;
    }
    .time {
      padding-right: 0.18rem;
      .div {
        float: left;
        span {
          width: 0.6rem;
          height: 28px;
          border-radius: 0.02rem;
          display: inline-block;
          line-height: 28px;
          text-align: center;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          cursor: pointer;
        }
        i {
          display: inline-block;
          margin: 0 0.12rem;
          width: 1px;
          height: 10px;
          background: rgba(229, 229, 229, 1);
        }
        .spanActive {
          background: rgba(0, 150, 136, 1);
          color: #fff;
        }
      }
      .div:last-child {
        i {
          margin: 0;
          width: 0;
          height: 0;
        }
      }
    }
  }
  .box{
    padding: 0 18px;
    .total_data{
      display: flex;
      margin-bottom: 18px;
      justify-content: space-between;
      .total_data_box{
        border: 1px solid #E5E5E5;
        width: 49.5%;
        display: flex;
        align-items: center;
        padding: 20px 0;
        .left{
          flex: 1;
          margin-left: 40px;
          ul{
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            li{
              height: 70px;
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              span{
                color: #666;
                font-size: 14px;
              }
              p{
                font-size: 20px;
                color: #333;
              }
              i{
                width: 46px;
                display: block;
                overflow: hidden;
                img{
                  width: 100%;
                  border: 0;
                  float: left;
                }
              }
            }
          }
        }
        .right{
          width: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 40px;
          span{
            color: #666;
            font-size: 14px;
            padding-top: 10px;
          }
        }
      }
    }
    .el-table{
      .red{
        color: #F10215;
      }
      .orange{
        color: #FF5722;
      }
      .green{
        color: #009688;
      }
    }
  }

}
</style>
<style>
.el-progress__text{
  color: #F10215;
  font-size: 20px !important;
}
</style>


    
