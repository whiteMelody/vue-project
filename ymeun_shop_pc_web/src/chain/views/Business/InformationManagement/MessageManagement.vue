<template>
  <div class="MessageManagement" :style="'min-height: '+boxMaxHeight+'px;'">
    <!-- 当前页面说明 -->
    <header>消息管理</header>
    <div class="clear-f2 mab14"></div>
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
    >
      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
        <el-form-item>
          <!-- <el-date-picker
            v-model="condition.addTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间">
          </el-date-picker> -->
          <div class="hs_timer">
              <div class="text">消息发送时间</div>
              <em></em>
              <div class="input">
              <el-date-picker
                :clearable="false"
                v-model="condition.addTime"
                type="date"
                range-separator="至"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="请选择时间">
              </el-date-picker>
              </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="condition.fullname" placeholder="请输入发布人" />
        </el-form-item>
        <el-form-item label>
            <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable>
                <el-option :key="''" label="全部门店" :value="''"></el-option>
                <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                          :value="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
          <el-button class="h32px" @click="condition={}">重置</el-button>
          <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          <el-button type="primary"  @click="newlyAdded" class="h32px">发布消息</el-button>
        </el-form-item>
      </el-form>

      <el-table slot="list" :data="demoList" border>

        <el-table-column align="left" label="序号" width="50px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>

        <el-table-column prop="created_at" align="center" label="发布时间">
          <template slot-scope="scope">{{ scope.row.created_at | _endTimeFormat}}</template>
        </el-table-column>

        <el-table-column prop="title" align="center" label="时间标题">
          <template slot-scope="scope">{{ scope.row.title}}</template>
        </el-table-column>

        <!-- :show-overflow-tooltip="true" -->
        <el-table-column prop="content" align="center" label="消息内容" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :popper-class="tootipClass" placement="top" v-if="scope.row.content.length > 60">
              <div slot="content" v-html="scope.row.content"></div>
              <p v-html="scope.row.content" class="display"></p>
            </el-tooltip>
            <p v-html="scope.row.content" v-else></p>
          </template>
        </el-table-column>

        <el-table-column prop="receive" align="center" label="接收门店">
          <template slot-scope="scope">
            <span v-for="(i, index) in scope.row.receive" :key="index">
              {{i.name}}
              <b v-if="index <= scope.row.receive.length-2">,</b>
            </span>
            
          </template>
        </el-table-column>

        <el-table-column prop="user" align="center" label="发布人">
          <template slot-scope="scope">{{ scope.row.user.name}}</template>
        </el-table-column>

        <el-table-column align="left" label="操作" width="70px">
          <template slot-scope="scope">
            <p class="operation">
              <span @click="modificationFn(scope.row.id)">删除</span>
            </p>
          </template>
        </el-table-column>

      </el-table>
    </base-list>


  </div>
</template>
<script>
import { messageInbox , messageRemove , getOrderRankingListByStore} from "@/chain/assets/api/informationManagement/informationManagement";

export default {
  name: "MessageManagement",
  data() {
    return {
      boxMaxHeight:"",
      // 查询条件
      counselor: {
        addTime: "",
        storeId: "",
        fullname: "",
      },
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: messageInbox, // 分页查询api接口,
      storeList:[],
      tootipClass:'wb70'
    };
  },
  components: {
  },
  methods: {
  
    loadData() {
      this.$refs.demoTable.loadData();
    },
  
    modificationFn(id) {
      this.$confirm('确定删除?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        messageRemove({messageId: id}).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            onClose:()=>{
              this.loadData()
            }
          });
        }).catch(() => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });         
        });
      
      }).catch(() => {});
    },

    // 跳转发布消息
    newlyAdded() {
      this.$router.push({
        path: "/PublishNews"
      });
    },

    
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    getOrderRankingListByStore().then(res => {
      if (res.status == 0) {
        this.storeList = res.data;
      }
    });
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

  
};
</script>

<style lang="scss" scoped>
.MessageManagement {
  margin: 20px;
  padding: 0 20px;
  background-color: #fff;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .operation{
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      cursor: pointer;
      color: #009688 ;
      &:hover {
        opacity: 0.7;
        text-decoration: underline;
      }
    }
    em{
      width: 1px;
      height: 10px;
      background: #e5e5e5;
    }
  }
  .display {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>


    
