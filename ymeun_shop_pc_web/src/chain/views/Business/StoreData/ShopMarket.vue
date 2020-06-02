<template>
  <div class="ShopMarket">
      <div class="ShopMarket_box">
        <div class="wb100 h40px bor-gray bor-solid-1b">
            <div class="wb30 h40px fl">
                <span class="fc-green f14px bor-solid-1b bor-green h40px lh40px fl">{{arrs[ arrs.length - 5 + curIndex ]}}实时数据</span>
            </div>
            <div class="wb70 fr text-center F16rem mat10 relative">
                <div class=" relative fr">
                    <template v-for="(item,index) in arrs">
                        <template v-if="index == curIndex">
                            <div class="w60rem fr warpper-green Fwhite h32rem lh32rem mar10 mal10 pointer" @click="changeIndex(index)">{{item}}</div>
                        </template>
                        <template v-else>
                            <div class="w60rem fr Fgray-3 h32rem lh32rem mar10 mal10 pointer" @click="changeIndex(index)">{{item}}</div>
                        </template>
                        <div class="w20rem fr h32rem text-center Fgray-1" v-if="index != 4">|</div>
                    </template>
                </div>
            </div>
        </div>
        <div class="clear0"></div>

        <base-list
            ref="demoTable"
            :condition="condition"
            :datas.sync="demoList"
            :pageSearch="pageSearch"
            :isPaging="true"
        >
            <el-table slot="list" :data="demoList"  border>
         
                <el-table-column prop="position" align="center" label="排名" width="100">
                    <template slot-scope="scope">{{ scope.row.position}}</template>
                </el-table-column>

                <el-table-column prop="name" align="center" label="门店名称">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column prop="amount" align="center" label="销售业绩">
                    <template slot-scope="scope">{{ scope.row.order | _filterNumFormat}}</template>
                </el-table-column>

                <el-table-column align="left" label="操作" width="240">
                    <template slot-scope="scope">
                    <p class="affirm">
                        <a class="buttonStyle_class" @click="$router.push({ path: '/PerformanceShopDel',query: { id: scope.row.id }});">查看资料</a>
                        <em></em>
                        <span v-if="scope.row.status == 0" @click="storeOpenOrCloseFn(2,scope.row.id)">启用</span>
                        <span class="stop" v-else @click="storeOpenOrCloseFn(1,scope.row.id)">停用</span>
                    </p>
                    </template>
                </el-table-column>
                
            </el-table>
        </base-list>
      </div>
  </div>
</template>
<script>
import { getConsumeData , storeOpenOrClose } from "@/chain/assets/api/StoreData/StoreData";
export default {
  name: "ShopMarket",
  data() {
    return {
        arrs: ['本年', '上周', '昨日', '今日', '本月'],
        curIndex: 4,
        counselor: {},
        form: {},
        condition: {
            startTime: this.$base.getDateScope(0).startTime,
            endTime: this.$base.getDateScope(0).endTime,
            sort: 1,
            status:-1
        }, // 查询条件
        demoList: [], // table数组
        pageSearch: getConsumeData, // 分页查询api接口
         
        startTime:'',
        endTime:''

    };
  },
  components: {},
  methods: {
    storeOpenOrCloseFn(type,id) {
        let typeText = ''
        if(type == 1){
            typeText = '是否停用该门店？'
        }
        else{
            typeText = '是否起用该门店？'
        }
        this.$confirm(typeText, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            storeOpenOrClose({s_id:id}).then(res=>{
                if(res.status == 0){
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        onClose:()=>{
                            this.$refs.demoTable.loadData();
                        }
                    });
                }
            }).catch(error=>{
                console.log("storeOpenOrClose no");
            })
        })
    },

    changeIndex(index){
        this.curIndex = index
        let date = new Date();
        if(index == 4){
            //本月
            this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-1 00:00:00`
            this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 3){
            //今日
            this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
            this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 2){
            //昨日
            let count = -1
            date = new Date(date.getTime() + (86400 * 1000) * count);
            this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
            this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }else if(index == 1){
            //上周
            let week = date.getDay()
            let count = 0

            if(week == 0){
            count = -5
            }else{
            count = week * -1 + 1
            }
            date = new Date(date.getTime() + (86400 * 1000) * (count - 7));
            let date2 = new Date(date.getTime() + (86400 * 1000) * 6);
            this.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
            this.endTime = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()} 23:59:59`
        }else if(index == 0){
            //本年
            this.startTime = `${date.getFullYear()}-1-1 0:0:0`
            this.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`
        }

        this.condition.startTime = this.startTime
        this.condition.endTime = this.endTime

        this.$refs.demoTable.loadData();

    },

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    //   this.$refs.demoTable.loadData();
  },

  // 更新前状态
  beforeUpdate() {
  },

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.ShopMarket {
    padding: 20px;
    .ShopMarket_box{
        background: #fff;
        padding: 0 20px 20px;
        table{
            margin-top: 0;
            .affirm{
                display: flex;
                justify-content: center;
                align-items: center;
                em{
                    width: 1px;
                    height: 10px;
                    background: #e5e5e5;
                    margin: 0 .1rem;
                }
                span{
                    color: #0dc9e5;
                    cursor: pointer;
                }
                .stop{
                    color: #ec414d;
                }
            }
        }
    }
}
</style>
<style>
.ShopMarket_box table{
    margin: 0;
}
.ShopMarket_box .el-table--border tr th{
    padding: 0;
}
.ShopMarket_box .el-table__body-wrapper{
    margin-top:0;
}
.ShopMarket_box .el-table__body-wrapper .el-table__empty-block{
    min-height: 40px
}
</style>



    
