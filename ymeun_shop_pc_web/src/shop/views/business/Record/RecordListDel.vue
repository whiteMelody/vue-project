<template>
  <div class="RecordListDel">
    <header>
      <div class="text">
        <span>{{userData.name}}</span>
        <p>
          <b>档案完成度</b>
          <i>{{userData.percentage}}</i>
        </p>
      </div>
      <el-button type="primary" @click="$router.push({name: 'PrivateArchives', query:{customerId: condition.customerId  } })">填写档案</el-button>
    </header>
    <div class="clear2"></div>
    <div class="condition">
        <ul>
            <li 
            v-for="(item , index) in conditionList" 
            :key="index" 
            :class="{'active' : conditionIndex == index}" 
            @click="conditionListFn(index,item.id)"
            >{{item.name}}</li>
        </ul>
    </div>
    <div class="clear0 bd-b1 bd-gray"></div>

    <div class="clear2"></div>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="problem" align="center" label="Q 问题" width="300">
              <template slot-scope="scope">
                {{scope.row.problem}}
              </template>
            </el-table-column>
            <el-table-column prop="content" align="center" label="A 回答">
              <template slot-scope="scope">
                {{ scope.row.content }}
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>

  import { getSeeXFiles , getCustomerLabelType } from "@/shop/assets/api/client/privateArchives"
export default {
  name: "RecordListDel",
  data() {
    return {
        condition: {
          customerId: this.$route.query.customerId,
          labelTypeId: '',
        },                                // 查询条件
        demoList: [],                      // table数组
        pageSearch: getSeeXFiles,       // 分页查询api接口
        userData: {},
        conditionList:[],
        conditionIndex:[],
    };
  },
  components: {},
  methods: {

    loadData(){
      this.$refs.demoTable.loadData()
    },

    getLoaded(data){
      this.userData = data.customer
    },
    // 筛选条件类型选择
    conditionListFn(index,id){
        this.conditionIndex = index;
        this.condition.labelTypeId = id
        this.loadData()
    },
      // 私密档案问题类型列表
    getCustomerLabelTypeFn(){
        getCustomerLabelType({}).then(res => {
            this.conditionList = res.data
            this.condition.labelTypeId = res.data[0].id
            this.loadData()
        }).catch(error=>{
            console.log("getCustomerLabelType no");
        })
    },
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {
    this.getCustomerLabelTypeFn()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
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
.RecordListDel {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    .text{
      flex: 1;
      display: flex;
      align-items: center;
      span{
        font-size: 16px;
        color: #141536;
      }
      p{
        padding-left: .3rem;
        display: flex;
        align-items: flex-end;
        b{
          font-weight: normal;
          color: #666666;
          position: relative;
          top: -2px;
        }
        i{
          font-style: normal;
          font-size: 20px;
          color: #EC414D;
          padding-left: 5px;
        }
      }
    }
  }
  .condition{
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
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

    
