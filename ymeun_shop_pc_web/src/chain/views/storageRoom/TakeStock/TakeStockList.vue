<template>
  <div class="TakeStockList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>盘点</header>
    <div class="clear-f2"></div>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
              <el-form-item>
                <el-date-picker
                  class="wb100"
                  v-model="condition.happenDate"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择盘点日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="condition.usersId" placeholder="选择盘点人" readonly="" clearable>
                  <el-option :key="''" :value="''" label="全部盘点人"></el-option>
                  <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                :value="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
              <el-button type="primary" class="h32px" @click="inventoryOpenFn">开启盘点</el-button>
          </el-form>

          <el-table slot="list" :data="demoList"  border>

            <el-table-column prop="happen_date" align="center" label="盘点日期">
              <template slot-scope="scope">
                {{ scope.row.happen_date }}
              </template>
            </el-table-column>

            <el-table-column prop="users" align="center" label="盘点人">
              <template slot-scope="scope">
                {{ scope.row.users}}
              </template>
            </el-table-column>
       
            <el-table-column prop="" align="center" label="盘点数量">
              <template slot-scope="scope">
                {{ scope.row.quantity | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="loss" align="center" label="损耗数量">
              <template slot-scope="scope">
                {{ scope.row.loss | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="runout" align="center" label="溢出数量">
              <template slot-scope="scope">
                {{ scope.row.runout | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作">
              <template slot-scope="scope">
                <p class="operation">
                  <a class="buttonStyle_class" @click="$router.push({name:'TakeStockDetail',query:{id:scope.row.id}})">查看详情</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import { getInventoryList , inventoryOpen } from "@/chain/assets/api/takeStock/takeStock"
export default {
  name: "TakeStockList",
  data() {
    return {
      boxMaxHeight:"",
      counselor:{
        happenDate:"",
        counselor:"",
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getInventoryList,       // 分页查询api接口
    };
  },
  components: {},
  methods: {
    
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },

    inventoryOpenFn(){
      inventoryOpen({}).then(res=>{
        this.$router.push({
          name:'AddTakeStock',
          query:{
            id:res.data[0]
          }
        })
        // if(res.status == 4001){
        //   this.$router.push({
        //     name:'TakeStockDetail',
        //     query:{
        //       id:res.data[0]
        //     }
        //   })
        // }
        // else if(res.status == 0){
        //   this.$router.push({
        //     name:'AddTakeStock',
        //     query:{
        //       id:res.data[0]
        //     }
        //   })
        // }
      })
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
.TakeStockList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .box {
    width: 100%;
    margin-top: 14px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

<style>
.TakeStockList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.TakeStockList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.TakeStockList .operation a{
  cursor: pointer;
  color: #0DC9E5;
  font-size: 14px;
}

</style>


    
