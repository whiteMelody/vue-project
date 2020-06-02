
<template>
  <div class="TakeStockDetail">
    <header>
      <span>盘点人：{{$store.getters.currentUser.name}}</span>
      <div>
        <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
      </div>
    </header>
    <div class="box">
      
      <base-list ref="demoTable" :condition="condition"  v-on:listLoaded="getLoaded"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" 
                  :isPageSize="false"
                   >
        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column align="center" label="商品编码">
            <template slot-scope="scope">
              {{ scope.row.good.code }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="商品名称">
            <template slot-scope="scope">
              {{ scope.row.good.fullname}}
            </template>
          </el-table-column>
      
          <el-table-column align="center" label="商品简称">
            <template slot-scope="scope">
              {{ scope.row.good.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="剩余数量">
            <template slot-scope="scope">
              {{ scope.row.good.stocks_num  | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" align="center" label="盘点数量">
            <template slot-scope="scope">
              {{ scope.row.quantity | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="损溢数量">
            <template slot-scope="scope">
              {{ scope.row.runout | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品单位">
            <template slot-scope="scope">
              {{ scope.row.good.unit.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="供应商">
            <template slot-scope="scope">
              {{ scope.row.good.business.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="预警状态">
            <template slot-scope="scope">
              <p class="operation" v-if="scope.row.good.warning">
                <a v-if="scope.row.good.warning.value == 0">{{scope.row.good.warning.label}}</a>
                <span v-else-if="scope.row.good.warning.value == 1">{{scope.row.good.warning.label}}</span>
                <b v-else-if="scope.row.good.warning.value == 2">{{scope.row.good.warning.label}}</b>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </base-list>  
      
    </div>
  </div>
</template>
<script>
import { getInventoryDetails } from "@/shop/assets/api/takeStock/takeStock"
export default {
  name: "TakeStockDetail",
  data() {
    return {
      counselor:{},
      condition: {
        inventory_id: this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getInventoryDetails,       // 分页查询api接口
      demoListTotal:0,
    };
  },
  components: {},
  methods: {

    //导出Excel
    deriveExcel() {
      let url = ''
      if(window.location.hostname == this.$base.getStoreHost()){
        url = `https://${location.hostname}/post/export/inventory/inventoryDetailsExcel`;
      }else{
        url = `http://${location.hostname}:${location.port}/post/export/inventory/inventoryDetailsExcel`;
      }
      url += `?downloadUserId=${this.$store.getters.currentUser.users_id}&inventory_id=${this.condition.inventory_id}`;
      window.location.href = url;
    },

    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.demoListTotal = data.total
    },

  


   
 
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
.TakeStockDetail {
  margin: 24px 20px;
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
    display: flex;
    span{
      flex: 1;
    }
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
    .moer{
      display: flex;
      justify-content: center;
      height: 40px;
      align-items: center;
      span{
        font-size: 14px;
        color: #666666;
        cursor: pointer;
      }
    }
  }

}
</style>

    
<style>
.TakeStockDetail .el-input__inner[type=number]{
  padding-right: 0;
}
.TakeStockDetail .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.TakeStockDetail .operation a{
  color: #fff;
  font-size: 14px;
  background: #9FDB9D;
  padding: 2px 10px;
  border-radius:2px;
}
.TakeStockDetail .operation span{
  color: #fff;
  font-size: 14px;
  background: #FEB78C;
  padding: 2px 10px;
  border-radius:2px;
}
.TakeStockDetail .operation b{
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  background: #ED969C;
  padding: 2px 10px;
  border-radius:2px;
}
.TakeStockDetail .warning .el-input__inner[type=number]{
  border: 1px solid #EC414D
}
.TakeStockDetail .warning .el-input__inner[type=number]::-webkit-input-placeholder{
  color: #EC414D;
}
.TakeStockDetail .warning .el-input__inner[type=number]::-moz-placeholder{
  color: #EC414D;
}
.TakeStockDetail .warning .el-input__inner[type=number]::-ms-input-placeholder{
  color: #EC414D;
}
.TakeStockDetail .warning .el-input__inner[type=number]::-moz-placeholder{
  color: #EC414D;
}
</style>



200      135