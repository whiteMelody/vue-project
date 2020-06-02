<template>
  <div class="DeductionDel">
    <div class="header">
      <div class="name">
        {{userData.name}}
        <span v-if="userData.sex.value == 0" class="iconfont iconnv"></span>
        <span v-else class="iconfont iconnan"></span>
      </div>
      <div class="mobile">
        电话：{{userData.mobile}}
        <span>门店： {{userData.store.name}}</span>
      </div> 
    </div>

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="false" v-on:listLoaded="getLoaded">
      <el-table slot="list" :data="demoList" border stripe>

        <el-table-column prop="time" align="center" label="开单日期">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        
        <el-table-column prop="store.name" align="center" label="项目所属">
          <template slot-scope="scope">
            {{ scope.row.store.name }}
          </template>
        </el-table-column>
        <el-table-column prop="items_name" align="center" label="项目名称">
          <template slot-scope="scope">
            {{ scope.row.items_name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" align="center" label="消费单号">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column prop="number" align="center" label="总数量">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column prop="yijing" align="center" label="已划扣数量">
          <template slot-scope="scope">
            {{ scope.row.yijing }}
          </template>
        </el-table-column>
        <el-table-column prop="shengyu" align="center" label="剩余数量">
          <template slot-scope="scope">
            {{ scope.row.shengyu }}
          </template>
        </el-table-column>

      </el-table>
    </base-list>
    
    </div>

    
  </div>
</template>
<script>
import { getAvailableItemList } from "@/shop/assets/api/informatization/deduction"
export default {
  name: "DeductionDel",
  data() {
    return {
      userData:{
        sex:{},
        store:{}
      },
      counselor:{
        counselor:"",
      },
      condition: {
        customer_id:this.$route.query.id,
        status:0,
        split:1
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getAvailableItemList,       // 分页查询api接口
    
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    getLoaded(data){
      this.userData = data.customer
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

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
.DeductionDel {
  margin: 24px 20px;
  .header {
    height: 80px;
    background-color: #ffffff;
    padding: 25px;
    .name {
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      span {
        position: absolute;
        top: 15%;
      }
      .iconnan {
        color: #2878ff;
      }
      .iconnv {
        color: #ec414d;
      }
    }
    .mobile {
      margin-top: 24px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      span {
        margin-left: 71px;
      }
    }
  }
  .box {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
 
  }
}
</style>
