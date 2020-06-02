<template>
  <div class="CustomerData">
    <!-- 当前页面说明 -->
    <div class="rankingTitle">
      <span class="rankingTabs">客户列表</span>
      <a>总客户数:<b>{{info.total}}</b>人</a>
    </div>
    <div class="clear-f2"></div>
    <div class="box">
      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          
            <el-form-item label>
              <el-input v-model="condition.data" placeholder="请输入客户姓名或电话"></el-input>
            </el-form-item>

            <el-form-item label>
                <el-select v-model="condition.s_id" placeholder="选择门店" readonly clearabl>
                    <el-option :key="''" label="全部门店" :value="''"></el-option>
                    <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label>
                <el-select v-model="condition.is_enterprise" placeholder="请选择渠道" readonly clearabl>
                    <el-option :key="'2'" label="门店" :value="'2'"></el-option>
                    <el-option :key="'1'" label="连锁" :value="'1'"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item>
              <el-button class="h32px" @click="form = {};condition={};dateTime=[]">重置</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            </el-form-item>
       
        </el-form>

        <el-table slot="list" :data="demoList" border>
          <el-table-column prop="mobile" align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="门店">
            <template slot-scope="scope">{{ scope.row.storeName}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="姓名">
            <template slot-scope="scope">
              <span @click="NameClick(scope.row.id)" class="name_click">{{ scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="客户类别">
            <template slot-scope="scope">{{ scope.row.style.label}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="渠道大类">
            <template slot-scope="scope">{{ scope.row.channelPName}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="渠道小类">
            <template slot-scope="scope">{{ scope.row.channelName}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="录入来源">
            <template slot-scope="scope">{{ scope.row.is_enterprise}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="最近上门" width="150px">
            <template slot-scope="scope">{{ scope.row.store_date}}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="left" label="操作" width="170px">
            <template slot-scope="scope">
              <div class="operation">
                <p class="data" @click="modificationAddCustomer(scope.row.id,scope.row.is_marketingCenter)">
                  <!-- <i class="iconfont iconxiugai"></i> -->
                  <a>修改资料</a>
                </p>
                <em></em>
                <p class="make_an_appointment">
                  <!-- <i class="iconfont iconyuyue"></i> -->
                  <span v-if="scope.row.is_appointment == 1">已预约</span>
                  <a v-else @click="makeAnAppointmentFn(scope.row.id,scope.row.s_id)">预约</a>
                </p>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </base-list>
    </div>

   
    <MessagePop ref="message" :popData="popData"></MessagePop>
  </div>
</template>
<script>
import { getList ,  getStore} from "@/chain/assets/api/customerData/customerData";
export default {
  name: "CustomerData",
  data() {
    return {
      condition: {
        data: '',
        s_id: '',
        is_enterprise:''
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: getList, // 分页查询api接口
      info:{},
      storeList:[],
      popData: "",
    };
  },
  components: {},
  methods: {
    getLoaded(data){
      console.log(data)
      this.info = data.count
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    myChanged(data){
        this.condition.data = data.kw
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

    // 跳转客户详情
    NameClick(id) {
      this.$router.push({
        path: "/CustomerCenter",
        query: { id: id }
      });
    },

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    //门店列表
    getStore().then(res => {
      let _tmp = res.data
      for(let i=0; i<_tmp.length; i++){
          _tmp[i].isSelected = false
      }
      this.storeList = _tmp
    }).catch(error=>{
      console.log("getStore no");
    })
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
  background-color: #ffffff;
  padding: 0 18px 20px;
  margin: 20px;
  .rankingTitle {
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    color: #666666;
    font-family: MicrosoftYaHei;
    font-weight: 400;
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
  .box{
    margin-top: 14px;
    .name_click{
      cursor: pointer;
    }
    .name_click:hover{
      color: #009688;
    }
    .operation {
      display: flex;
      margin: 0 auto;
      color: #666666;
      justify-content: center;
      align-items: center;
      p {
        display: flex;
        i {
          font-size: 16px;
        }
      }
      .data {
        i {
          color: #009688;
        }
        a {
          color: #009688;
          cursor: pointer;
        }
      
      }
      em{
        width: 1px;
        height: 10px;
        background: #e5e5e5;
        margin: 0 5px;
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
        span{
          color: #c0c0c0;
        }
      }
    }
  }
}
</style>



    
