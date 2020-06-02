<template>
  <div class="TargetDetails" :style="'min-height: '+boxMaxHeight+'px;'">

    <header>
      <a>
        门店目标设定表（ {{$route.query.storeName}} ）
      </a>
    </header>

    <div class="box">

          <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

              <el-form-item label>
                  <el-select v-model="time" placeholder="选择时间段" readonly clearable >
                      <el-option :key="''" label="选择时间段" :value="''"></el-option>
                      <el-option v-for="item in storeList" :key="item.id" :label="item.start_time + '-' + item.stop_time" :value="item.start_time + '-' + item.stop_time"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" class="h32px" @click="loadData">搜索</el-button>
              </el-form-item>

              <div class="fr">
                <el-button type="danger" @click="getSetUp">保存设置</el-button>
              </div>
        </el-form>

        <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="false" :isAutoLoad="false" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border
                row-key="id"
                :tree-props="{children: 'rows', hasChildren: 'hasChildren'}"
           >
            <el-table-column type="index" :index="indexMethod" label="序号" width="70px"></el-table-column>
            
            <el-table-column prop="type" align="left" label="目标时间段">
              <template slot-scope="scope">
                  {{$base.timerTransition(scope.row.start_time)}}-{{$base.timerTransition(scope.row.stop_time)}}
              </template>
            </el-table-column>

            <el-table-column prop="type" align="left" label="销售业绩(元)">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.amount" :min="0" :controls="false" placeholder="请设销售业绩"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="type" align="left" label="成交人头(人)">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.order_customer" :min="0" :controls="false" placeholder="请设置成交人头"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="type" align="left" label="成交人次(次)">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.order_customer_quantity" :min="0" :controls="false" placeholder="请设置成交人次"></el-input>
              </template>
            </el-table-column>
            
            <el-table-column prop="type" align="left" label="划扣业绩（元）">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.valume" :min="0" :controls="false" placeholder="请设置划扣业绩"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="type" align="left" label="划扣人头(人)">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.customer" :min="0" :controls="false" placeholder="请设置划扣人头"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="type" align="left" label="划扣人次(次)">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.quantity" :min="0" :controls="false" placeholder="请设置划扣人次"></el-input>
              </template>
            </el-table-column>

          </el-table>

        </base-list>

    </div>
  </div>
</template>
<script>
import { getList,getTime,getSave } from "@/assets/api/targetManagement/targetDetails";

export default {
  name: "TargetDetails",
  data() {
    return {
      boxMaxHeight:"",
      condition: {
        storeId:this.$route.query.id,
        adviserId: '',
        start_time:'',
        stop_time:'',
      },
      time:'',
      demoList: [],                      // table数组
      pageSearch: getList,       // 分页查询api接口
      storeList:[],
        oldList: {},            //原始数组
    };
  },
  watch:{
    'time'(newData,oldData){
      if (newData) {
        this.condition.start_time = newData.substring(newData.length-11,0)
        this.condition.stop_time = newData.substring(newData.length,11)
      } else {
        this.condition.start_time = ''
        this.condition.stop_time = ''
      }
    },
  },
  components: {},
  methods: {
    /** 保存修改 */
    getSetUp() {
      let dataList = [];
      // this.demoList.forEach(v => {
      //   let obj = {
      //     targetId : v.id,
      //     start_time : this.$base.timerTransition(v.start_time),
      //     stop_time : this.$base.timerTransition(v.stop_time),
      //     quantity : v.quantity,
      //     amount : v.amount,
      //     valume : v.valume,
      //     order_customer : v.order_customer,
      //     order_customer_quantity : v.order_customer_quantity,
      //     customer:v.customer
      //   }
      //   dataList.push(obj);
      // });



      for(let i=0; i<this.oldList.length; i++){
          for(let j=0; j<this.demoList.length; j++){

              if(this.oldList[i].id == this.demoList[j].id){
                  if(JSON.stringify(this.oldList[i]) != JSON.stringify(this.demoList[i]) ){
                      let v = this.demoList[j]
                      dataList.push({
                          targetId : v.id,
                          start_time : this.$base.timerTransition(v.start_time),
                          stop_time : this.$base.timerTransition(v.stop_time),
                          quantity : v.quantity,
                          amount : v.amount,
                          valume : v.valume,
                          order_customer : v.order_customer,
                          order_customer_quantity : v.order_customer_quantity,
                          customer:v.customer
                      });
                  }
              }
          }
      }

      if(dataList.length == 0){
          this.$message({
              message: '没有修改项',
              type: 'error',
              duration:'1000',
          });
          return
      }

      console.log(dataList)

      getSave({rules:JSON.stringify(dataList)}).then(res => {
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration:'1000',
          });
        }
      });
    },

    //重新加载
    loadData() {
        this.$refs.demoTable.loadData()
    },

      getLoaded(data){
        this.oldList = JSON.parse(JSON.stringify(data.list))
      },

    // 选择时间段
    getTime() {
      getTime({storeId:this.$route.query.id}).then(res => {
        if (res.status == 0) {
          this.storeList = res.data.list;
        }
      });
    },

    /** 序号 */
    indexMethod(index) {
      return index + 1;
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
      this.loadData();
      this.getTime();
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
.TargetDetails {
  margin: 20px 0 20px 0;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    a{
      font-size: 16px;
      font-weight: 500;
      color: #333333;
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

<style>
.el-table .el-table__body-wrapper .el-input__inner{
    padding-right: 0;
}
</style>

    
