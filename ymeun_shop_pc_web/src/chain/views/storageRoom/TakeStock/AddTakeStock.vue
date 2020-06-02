
<template>
  <div class="AddTakeStock">
    <header>
      <span>盘点人：{{$store.getters.currentUser.name}}</span>
      <div>
        <el-button type="primary" class="h28px" size="mini" @click="clonePageFn"
                   v-loading.fullscreen.lock="fullscreenLoading"
                   element-loading-text="关闭盘点中..."
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)">关闭盘点</el-button>
        <el-button type="primary" class="h28px" size="mini" @click="deriveExcel">导出Excel</el-button>
      </div>
    </header>
    <div class="clear-f2"></div>
    <div class="box">
      
      <base-list-hs ref="demoTable" :condition="condition"  v-on:listLoaded="getLoaded"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" 
                   @pageChange="myPageChange" :isPageSize="false" :isPageDisabled="pageDisabledStr"
                   :isPageStr="pageStr">
        <el-table slot="list" :data="demoList"  border>
          <el-table-column align="left" label="商品编码">
            <template slot-scope="scope">
              {{ scope.row.good.code }}
            </template>
          </el-table-column>

          <el-table-column align="left" label="商品名称">
            <template slot-scope="scope">
              {{ scope.row.good.fullname}}
            </template>
          </el-table-column>
      
          <el-table-column align="left" label="商品简称">
            <template slot-scope="scope">
              {{ scope.row.good.title }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="剩余数量">
            <template slot-scope="scope">
              {{ scope.row.good.stocks_num  | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" align="center" label="盘点数量">
            <template slot-scope="scope">
              <el-input :class="{warning:scope.row.warning}" type="number" v-model="scope.row.quantity" placeholder="请输入" @change="totalNumberFn(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="left" label="损溢数量">
            <template slot-scope="scope">
              {{ scope.row.runout | _filterNumFormat }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="商品单位">
            <template slot-scope="scope">
              {{ scope.row.good.unit.title }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="供应商">
            <template slot-scope="scope">
              {{ scope.row.good.business.title }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="预警状态">
            <template slot-scope="scope">
              <p class="operation" v-if="scope.row.good.warning">
                <a v-if="scope.row.good.warning.value == 0">{{scope.row.good.warning.label}}</a>
                <span v-else-if="scope.row.good.warning.value == 1">{{scope.row.good.warning.label}}</span>
                <b v-else-if="scope.row.good.warning.value == 2">{{scope.row.good.warning.label}}</b>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </base-list-hs>  
      
    </div>
  </div>
</template>
<script>
import { inventoryAdd , getInventoryDetails , checkIsCompleteInventory , inventoryClose , inventoryOpen } from "@/chain/assets/api/takeStock/takeStock"
export default {
  name: "AddTakeStock",
  data() {
    return {
      counselor:{},
      condition: {
        // happen_date:this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2'),
        inventory_id:this.$route.query.id,
        inventoryId:this.$route.query.id
        // happen_date:"2019-10-29"
      },                                // 查询条件
      demoList: [],                      // table数组
      demoListTotal:0,
      addedDemoListTotal:0,
      pageSearch: getInventoryDetails,       // 分页查询api接口
      moerBtn:true,
      myPageChangeStr:false,
      pageDisabledStr:true,
      pageStr:false,
      isTakeStockAccomplish:false,
      start:0,
      fullscreenLoading: false,
    };
  },
  components: {},
  methods: {

    //导出Excel
    deriveExcel() {
      this.$postRequest("/post/api/getUserInfo").then(res => {
        let url = ''
        if(window.location.hostname == this.$base.getChainHost()){
          url = `https://${location.hostname}/post/export/inventory/inventoryDetailsExcel`;
        }else{
          url = `http://${location.hostname}:${location.port}/post/export/inventory/inventoryDetailsExcel`;
        }
        url += `?downloadUserId=${res.data.users_id}&inventory_id=${this.condition.inventory_id}`;
        window.location.href = url;
      });
    },

    //检测当前页是否已盘点
    isTakeStockFn(){
      let _flag = false
      this.demoList.map((item , index) => {
        if(item.quantity == undefined || item.quantity == '' || item.quantity < 0){
          _flag = true
        }
      })
      if(_flag){
        this.pageDisabledStr = true
      }
      else{
        this.pageDisabledStr = false
      }
    },

    //检测盘点是否完成
    isAccomplishFn(fn){
      checkIsCompleteInventory({
        inventoryId:this.demoList[0].inventory_id,
        inventory_id:this.demoList[0].inventory_id,
      }).then(res=>{
        if(res.status == 0){
          this.isTakeStockAccomplish = true
        }
        else{
          this.isTakeStockAccomplish = false
        }
        fn()
        console.log("object---",this.isTakeStockAccomplish);
      })
      // .catch(error => {
      //   console.log("checkIsCompleteInventory no");
      // })
    },
    
    //损益数量计算
    totalNumberFn(item){
      let num = 0;
      if(item.quantity >= 0){
        num = item.quantity - item.good.stocks_num
      }else{
        item.quantity = 0
        num = item.quantity - item.good.stocks_num
        this.$message({
          showClose: true,
          message: '盘点数量不能小于0',
          type: "error"
        });
      }
      if(num > 0){
        item.runout = "+" + this.$base.twoDecimal(num)
      }
      else{
        item.runout = this.$base.twoDecimal(num)
      }


      // this.isTakeStockFn()
      // return
      let _flag = false
      let addedDemoListTotal = 0;
      this.demoList.map((item , index) => {
        if(item.quantity == undefined || item.quantity == '' || item.quantity < 0){
          _flag = true
        }
        else{
          item.warning = false;
        }
      })
      if(_flag){
        this.pageDisabledStr = true
      }
      else{
        this.pageDisabledStr = false
      }
    },

    //分页切换
    myPageChange(data){
      this.start = data;
      this.inventoryAddFn()
    },
    
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //列表外赋值
    getLoaded(data){
      this.demoList.map((item , index) => {
        if(item.quantity == -1){
          item.quantity = ''
        }
      })
      this.demoListTotal = data.total
      this.addedDemoListTotal = data.completeCount
      this.isTakeStockFn()
      // this.isAccomplishFn()
    },

    //关闭盘点
    clonePageFn(){
      // let _flag = false

      // if(this.demoListTotal > this.addedDemoListTotal){
      //   _flag = true;
      // }
      // else{
        // this.demoList.map((item , index) => {
        //   if(item.quantity == undefined || item.quantity == ''){
        //     _flag = true
        //   }
        // })
      // }

      
      // if(_flag){
      //   this.$alert('请将所有商品盘点数量填写完成后再关闭盘点！', '提示', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.demoList.map((item , index) => {
      //         if(item.quantity == undefined || item.quantity == '' || item.quantity < 0){
      //           this.$set(item,'warning',true)
      //         }
      //         else{
      //           this.$set(item,'warning',false)
      //         }
      //       })

      //     }
      //   });
      // } 
      // else{
      //   this.inventoryAddFn()
      // }


      let _flag = false

      this.demoList.map((item , index) => {
        if(item.quantity == undefined || item.quantity === '' || item.quantity < 0){
          this.$set(item,'warning',true)
          _flag = false
        }
        else{
          this.$set(item,'warning',false)
          _flag = true
        }
      })
      if(_flag){

        this.fullscreenLoading = true

        // this.$notify({
        //   title: '关闭盘点',
        //   message: '正在保存数据，请稍后',
        //   duration: 2000
        // });
        let postData = {
          happenDate : this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2'),
          inventory : [],
          inventoryId : this.condition.inventory_id,
          inventory_id : this.condition.inventory_id,
        };
        let arr = [];
        this.demoList.map((item , index) => {
          arr.push({
            id:item.id,
            good_id:item.good_id,
            quantity:item.quantity,
            number:item.runout
          })
        })
        postData.inventory = JSON.stringify(arr);
        inventoryAdd(postData).then(res=>{
          if(res.status == 0){
            this.pageStr = true
          }
          else{
            this.pageStr = false
          }
          this.isAccomplishFn(()=>{
            if(!this.isTakeStockAccomplish){
              this.$alert('请将所有商品盘点数量填写完成后再关闭盘点！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$refs.demoTable.startLoadData(this.pageStr,this.start);
                  this.fullscreenLoading = false
                }
              });
            }
            else{
              inventoryClose({
                inventoryId:this.demoList[0].inventory_id
              }).then(res=>{
                if(res.status == 0){
                  this.fullscreenLoading = false
                  this.$router.go(-1)
                }
              })
            }
          })
        })

      }

    },

    //提交盘点
    inventoryAddFn(){
      let postData = {
        happenDate : this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2'),
        // happenDate : "2019-10-29",
        inventory : [],
        inventoryId : this.condition.inventory_id,
        inventory_id: this.condition.inventory_id,
      };
      let arr = [];
      this.demoList.map((item , index) => {
        arr.push({
          id:item.id,
          good_id:item.good_id,
          quantity:item.quantity,
          number:item.runout
        })
      })
      postData.inventory = JSON.stringify(arr);
      inventoryAdd(postData).then(res=>{
        if(res.status == 0){
          this.pageStr = true
        }
        else{
          this.pageStr = false
          // this.$message({
          //   showClose: true,
          //   message: res.msg,
          //   type: 'error',
          // });
        }
        this.$refs.demoTable.startLoadData(this.pageStr,this.start);
      })
      .catch(error => {
        console.log("inventoryAdd no");
        this.pageStr = false
      })
    }

  },

  // 挂载结束状态
  mounted() {

  },

  beforeRouteLeave(to,from,next){
    //判断是否盘点完成
    this.isAccomplishFn(()=>{
      if(!this.isTakeStockAccomplish){
        this.$confirm('请将所有商品数量填写完成后再关闭盘点', '提示', {
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // next()
        }).catch(() => {

        });
      }
      else{
        next()
      }
    })
  },

};
</script>
<style lang="scss" scoped>
.AddTakeStock {
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
    display: flex;
    span{
      flex: 1;
    }
  }
  .box {
    width: 100%;
    margin-top: 14px;
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
.AddTakeStock .el-input__inner[type=number]{
  padding-right: 0;
}
.AddTakeStock .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.AddTakeStock .operation a{
  color: #fff;
  font-size: 14px;
  background: #9FDB9D;
  padding: 2px 10px;
  border-radius:2px;
}
.AddTakeStock .operation span{
  color: #fff;
  font-size: 14px;
  background: #FEB78C;
  padding: 2px 10px;
  border-radius:2px;
}
.AddTakeStock .operation b{
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  background: #ED969C;
  padding: 2px 10px;
  border-radius:2px;
}
.AddTakeStock .warning .el-input__inner[type=number]{
  border: 1px solid #EC414D
}
.AddTakeStock .warning .el-input__inner[type=number]::-webkit-input-placeholder{
  color: #EC414D;
}
.AddTakeStock .warning .el-input__inner[type=number]::-moz-placeholder{
  color: #EC414D;
}
.AddTakeStock .warning .el-input__inner[type=number]::-ms-input-placeholder{
  color: #EC414D;
}
.AddTakeStock .warning .el-input__inner[type=number]::-moz-placeholder{
  color: #EC414D;
}
</style>

