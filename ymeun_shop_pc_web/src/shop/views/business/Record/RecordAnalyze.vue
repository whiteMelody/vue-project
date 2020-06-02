<template>
  <div class="RecordAnalyze" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="header_bg">
        <header>私密档案分析列表</header>
        <div class="condition">
          <h3>筛选条件：</h3>
          <ul>
            <li 
              v-for="(item , index) in conditionList" 
              :key="index" 
              :class="{'active' : conditionIndex == index}" 
              @click="conditionListFn(index,item.name)"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="content" v-show="contentListShow">
          <h3>筛选内容：</h3>
          <ul>
            <li v-for="(item , index) in contentList" :key="index">
              <h4><i class="iconfont icondian"></i><span>{{item.label}}</span></h4>
              <div class="tag_list">
                 <span
                  v-for="(itemName , indexName) in item.title"
                  :key="indexName">
                  <b v-if="itemName.title != undefined">{{itemName.title}}</b>
                  <em>{{itemName.content }}</em>
                  <i class="el-icon-error" @click="contentListFn(index,indexName)"></i>
                </span>
              </div>
            </li>
          </ul>
          <div class="btn"><el-button type="primary" @click="loadData">搜索</el-button></div>
        </div>
    </div>
    <div class="list_box">
      <header>
        <p>顾客列表</p>
        <span>共计 <i>{{listTotal}}</i> 条</span>
      </header>
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true"  v-on:listLoaded="getLoaded">
          <el-table slot="list" :data="demoList" stripe border>
              <el-table-column prop="index" align="center" label="序号" width="50px">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="创建时间">
                  <template slot-scope="scope">
                      {{ scope.row.time | _endTimeFormat}}
                  </template>
              </el-table-column>
            <el-table-column prop="channelName" align="center" label="渠道">
              <template slot-scope="scope">
                {{ scope.row.channelName }}
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="顾客姓名">
              <template slot-scope="scope">
                  <el-link :underline="false" @click="$router.push({name:'ClientDel',query:{id:scope.row.id,types:7}})">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="sex.label" align="center" label="性别">
              <template slot-scope="scope">
                {{ scope.row.sex.label }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <a class="el-cursor" @click="$router.push({name: 'RecordAnalyzeDel', query:{customerId: scope.row.id  } })">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
        </base-list>
    </div>


    <el-dialog title="请选择筛选内容" :visible.sync="conditionListPopShow" v-loading="conditionListPopLading">
      <header>
        <span></span>
        <p>{{conditionText}}</p>
      </header>
      <ul>
          <li v-for="(item , index) in  conditionListPopList" :key="index">
            <h4><i class="iconfont icondian"></i><span>{{item.label}}</span></h4>
            <div class="select_list">
              <div class="select_list_box_max" v-if="item.title.length == 1">
                <div class="select_list_box" v-for="(itemOne , indexOne) in  item.title" :key="indexOne">
                  <b v-if="itemOne.title != undefined">{{itemOne.title}}</b>
                  <el-select v-model="itemOne.on" multiple collapse-tags placeholder="请选择" clearable popper-class="select_pop_box">
                    <el-option v-for="(itemTow , indexTow) in itemOne.content"
                      :key="indexTow"
                      :value="itemTow.value"
                      :label="itemTow.content">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div class="select_list_box_tow" v-else-if="item.title.length == 2">
                <div class="select_list_box" v-for="(itemOne , indexOne) in  item.title" :key="indexOne">
                  <b v-if="itemOne.title != undefined">{{itemOne.title}}</b>
             
                  <el-select v-model="itemOne.on"  multiple collapse-tags placeholder="请选择" clearable popper-class="select_pop_box">
                    <el-option v-for="(itemTow , indexTow) in itemOne.content"
                      :key="indexTow"
                      :value="itemTow.value"
                      :label="itemTow.content">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div class="select_list_box_min" v-else>
                <div class="select_list_box" v-for="(itemOne , indexOne) in  item.title" :key="indexOne">
                  <b v-if="itemOne.title != undefined">{{itemOne.title}}</b>
                  <el-select multiple v-model="itemOne.on" collapse-tags placeholder="请选择" clearable popper-class="select_pop_box">
                    <el-option v-for="(itemTow , indexTow) in itemOne.content"
                      :key="indexTow"
                      :value="itemTow.value"
                      :label="itemTow.content">
                    </el-option>
                  </el-select>
                </div>
              </div>


            </div>
          </li>
      </ul>
      <div slot="footer" class="dialog-footer">
          <el-button @click="conditionListPopShow = false">取 消</el-button>
          <template v-if="disabled">
              <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
              <el-button type="primary" @click="addRoom">确 定</el-button>
          </template>
      </div>
    </el-dialog>


    <!-- <div class="pop_loading" v-loading="conditionListPopLading"></div> -->

  </div>
</template>
<script>
import { getCustomerLabelType , getCustomerLabelByType , getLabelCustomerByLabelAnswer , getXFilesList , getCustomerGetCompletedLabelList } from "@/shop/assets/api/client/privateArchives"

export default {
  name: "RecordAnalyze",
  data() {
    return {
      boxMaxHeight:"",
      conditionText:"",
      conditionIndex:null,
      conditionList:[],
      contentListShow:false,
      contentList:[],

      counselor:{
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      listTotal:0,
      pageSearch: getCustomerGetCompletedLabelList,       // 分页查询api接口

      conditionListPopShow:false,
      conditionListPopLading:false,
      conditionListPopList:[],
      disabled: false,
      
    };
  },
  components: {},
  methods: {
    // 筛选条件类型选择
    conditionListFn(index,text){
      this.conditionIndex = index;
      this.conditionText = text;
      this.conditionListPopList = []
      this.conditionListPopLading = true,
      this.conditionListPopShow = true;
      this.getCustomerLabelByTypeFn()
    },

    // 私密档案问题类型列表
    getCustomerLabelTypeFn(){
      getCustomerLabelType({}).then(res => {
          this.conditionList = res.data
      }).catch(error=>{
        console.log("getCustomerLabelType no");
      })
    },

    // 私密档案问题弹窗列表
    getCustomerLabelByTypeFn(){
      let  post = {
        typeId : this.conditionList[this.conditionIndex].id,
        start :1,
        perpage :99999
      }
      getCustomerLabelByType(post).then(res => {
        this.conditionListPopList = res.data
        this.conditionListPopLading = false;
      }).catch(error=>{
        console.log("getCustomerLabelByType no");
      })
    },

    // 筛选内容删除类型选择
    contentListFn(indexOne , indexTow){
      var towList = this.contentList[indexOne].title;
      towList.splice(indexTow,1)
      if(towList.length <= 0){ this.contentList.splice(indexOne,1)}
      if(this.contentList.length <= 0){ this.contentListShow = false}
    },

    //列表数据
    loadData(){
      this.condition.problem = JSON.stringify(this.contentList);
      this.$refs.demoTable.loadData()
    },
    getLoaded(data){
      this.listTotal = data.total
    },

    //筛选条件确认
    addRoom(){
      let postProblem = [];
      this.conditionListPopList.map((item ,index) => {
        let problem = {
          id : item.id,
          label : item.label,
          type : item.type,
          title : []
        }
        item.title.map((itemTitle , indexTitle) => {
          if(itemTitle.on != 0){
            
            let answer = {
              id : itemTitle.id,
              title : itemTitle.title,
              answerId : itemTitle.on
            }
            

            problem.title.push(answer)
            postProblem.push(problem)
           
          }
        })
      })
      let post = {
        problem : JSON.stringify(this.unique1(postProblem))
      }
      getLabelCustomerByLabelAnswer(post).then(res => {
        this.contentList = res.data        
        this.contentListShow = true;
        this.conditionListPopShow = false
        this.loadData()
      }).catch(error=>{
        console.log("getLabelCustomerByLabelAnswer no");
      })
  

    },
    unique1(arr){
      var hash=[];
      for (var i = 0; i < arr.length; i++) {
        if(hash.indexOf(arr[i])==-1){
          hash.push(arr[i]);
        }
      }
      return hash;
    }
     
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
    // 私密档案问题类型列表
    this.getCustomerLabelTypeFn()

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
.RecordAnalyze {
  margin: 24px 20px;
  .header_bg{
    background-color: #ffffff;
    padding: 0 20px;
    header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e5e5e5;
    }
    .condition{
      h3{
        font-size: 14px;
        color: #999;
        font-weight: normal;
        height: 50px;
        line-height: 50px;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          border: 1px solid #e5e5e5;
          border-radius: 5px;
          line-height: 34px;
          padding: 0 .1rem;
          margin: 0 .2rem .2rem 0;
          cursor: pointer;
          color: #666666;
          font-size: .14px;
          &.active{
            border: 1px solid #78DAE9;
            color: #0DC9E4;
            background: #EBFCFF;
          }
        }
      }
    }
    .content{
      border-top: 1px solid #e5e5e5;
      h3{
        font-size: 14px;
        color: #999;
        font-weight: normal;
        height: 50px;
        line-height: 50px;
      }
      ul{
        border-bottom: 1px solid #e5e5e5;
        li{
          h4{
            font-size: 14px;
            color: #333333;
            font-weight: normal;
            padding-bottom: .24rem;
            display: flex;
            align-items: center;
            i{
              font-size: 12px;
              transform: scale(0.7);
              font-style: normal;
              color: #666;
              padding-right: 6px;
            }
          }
          .tag_list{
            display: flex;
            flex-wrap: wrap;
            span{
              margin: 0 .2rem .2rem 0;
              border:1px solid #E5E5E5;
              border-radius:5px;
              padding: .1rem;
              display: flex;
              align-items: center;
              b{
                font-weight: normal;
                border-right: 1px solid #E5E5E5;
                line-height: 20px;
                padding-right: .14rem;
                margin-right: .14rem;
                color: #333333;
                font-size: 14px;
              }
              em{
                font-style:normal;
                color: #666666;
                font-size: 14px;
                line-height: 24px;
              }
              i{
                cursor: pointer;
                padding-left: 8px;
                color: #333333;
              }
            }
          }

        }
      }
      .btn{
        display: flex;
        justify-content: center;
        padding: .24rem 0;
      }
    }
  }
  .list_box{
    margin-top: 20px;
    background: #fff;
    padding: 0 20px 20px;
    header {
      width: 100%;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      height: 50px;
      p{
        font-size: 16px;
        color: #333333;
      }
      span{
        padding-left: .2rem;
        color: #333333;
        i{
          font-style: normal;
          color: #FF5722;
        }
      }
    }
  }

  .pop_loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

}
</style>


<style>
.RecordAnalyze .el-dialog__wrapper .el-dialog{
    width: 12rem;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body{
    padding: 0 20px;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body header{
  display: flex;
  align-items: center;
  background: #F8F8F8;
  height: 50px;
  font-weight: normal;
  border-top: 1px solid #E5E5E5;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body header span{
  width: 2px;
  height: 14px;
  background: #0DC9E5;
  margin: 0 .1rem;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body header p{
  color: #333;
  font-size: 14px;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul{
    /* max-height: 328px; */
    height: 328px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #fff;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li{
  width: 100%;
  
  border-bottom: 1px solid #E5E5E5;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li h4{
  font-weight: normal;
  padding: .2rem 0;
  font-size: 14px;
  color: #333333;
  font-weight: normal;
  padding-bottom: .24rem;
  display: flex;
  align-items: center;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li h4 i{
  font-size: 12px;
  transform: scale(0.7);
  font-style: normal;
  color: #666;
  padding-right: 6px;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li div.select_list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list .select_list_box{
  margin: 0 .2rem .2rem 0;
  border-radius: 5px;
  border: 1px solid #E5E5E5;
  display: flex;
  height: 40px;
  align-items: center;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_min{
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_min .select_list_box{
  width: 31%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_tow{
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_tow .select_list_box{
  width: 48%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_max{
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box_max .select_list_box{
  width: 100%;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box b{
  font-style: normal;
  padding: 0 .1rem;
  border-right:1px solid #E5E5E5;
  font-weight: normal;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select{
  flex: 1;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select .el-input .el-input__inner{
  border: 0;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select__tags > span{
  display: flex;
  align-items: center;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select__tags .el-tag{
  display: flex;
  align-items: center;  
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select__tags .el-tag span{
  width: 1rem;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
  text-align: center;
}
.RecordAnalyze .el-dialog__wrapper .el-dialog .el-dialog__body ul li .select_list div.select_list_box .el-select__tags .el-tag:nth-of-type(2) span{
  width: auto;
}
.select_pop_box{
  min-width: auto !important;
  width: 4rem !important;
}
</style>

    
