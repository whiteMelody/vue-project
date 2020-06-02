<template>
  <div class="ToTheDiagnosis">

    <div class="titles">
      
      <div>到诊数据统计</div>
      <em></em>
      <ul>
        <li>
          <p>共到诊（次）</p>
          <span class="fc-blue6">{{userData.store_quantity | _NumFormat}}</span>
        </li>
        <li>
          <p>共计成交（元）</p>
          <span class="fc-blue6">{{userData.orders_amount | _filterNumFormat}}</span>
        </li>
        <li>
          <p>退单金额（元）</p>
          <span class="fc-gray2">{{userData.refund_amount | _filterNumFormat}}</span>
        </li>
      </ul>
        
    </div>

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
           
                <el-form-item class="w240px">
                  <el-date-picker
                    class="wb100"
                    :clearable="false"
                    v-model="daterangeTimer"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                 <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                 </el-form-item>
             
          </el-form>
          

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="id" align="center" label="序号" width="50px">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>

            <el-table-column prop="order" align="center" label="状态">
              <template slot-scope="scope">
                <div class="list_status">
                    <!-- <span class="zhifu" v-if="scope.row.order.total == 2">已到店</span>
                    <span class="weizhifu" v-else>未到店</span> -->
                    <span :class="scope.row.status.value == 1 ?'zhifu' : 'weizhifu'">{{scope.row.status.label}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="到店日期">
              <template slot-scope="scope">
                {{ scope.row.store_time | _endTimeFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="store" align="center" label="到诊店名">
              <template slot-scope="scope">
                {{ scope.row.store.name }}
              </template>
            </el-table-column>
            <el-table-column prop="items" align="center" label="预约项目">
              <template slot-scope="scope">
                {{ scope.row.items.name }}
              </template>
            </el-table-column>
            <el-table-column prop="adviser" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">
                {{ scope.row.adviser.name }}
              </template>
            </el-table-column>
            <el-table-column prop="technician" align="center" :label="$store.getters.roleName.technician">
              <template slot-scope="scope">
                {{ scope.row.technician.name }}
              </template>
            </el-table-column>
            <el-table-column prop="consultation" align="center" label="到诊情况">
              <template slot-scope="scope">
                <!-- <div v-for="(itemName , indexName) in  scope.row.consultation" :key="indexName">
                  {{itemName.describe}}
                </div> -->
                {{scope.row.status.label}}
              </template>
            </el-table-column>
            <el-table-column prop="orders_amount" align="center" label="订单金额（元）">
              <template slot-scope="scope">
                {{ scope.row.orders_amount | _filterNumFormat  }}
              </template>
            </el-table-column>
            <el-table-column prop="refund_amount" align="center" label="退单金额（元）">
              <template slot-scope="scope">
                {{ scope.row.refund_amount | _filterNumFormat }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="consultation" align="center" label="铺垫项目">
              <template slot-scope="scope">
                <div v-for="(itemName , indexName) in  scope.row.consultation" :key="indexName">
                  <p v-for="(itemTow , indexTow) in  itemName.items" :key="indexTow">{{itemTow.name}}</p>
                </div>
              </template>
            </el-table-column> -->

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
import { getArrivalVisit } from "@/shop/assets/api/client/client"
export default {
  name: "ToTheDiagnosis",
  data() {
    return {
      userData:'',
      counselor:{
          counselor:"",
      },
      condition: {
        customerId:this.$route.query.id
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getArrivalVisit,       // 分页查询api接口
      daterangeTimer:[]
    };
  },
  watch: {
    daterangeTimer(c, o) {
      this.condition.startTime = this.$base.dateTimeToDate(c[0],'date2');
      this.condition.stopTime = this.$base.dateTimeToDate(c[1],'date2');
    }
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
  beforeCreate() {
    
  },

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
.ToTheDiagnosis {
  margin: 24px 20px;
  .titles{
		background: #fff;
		margin-bottom: 20px;
		padding: 20px;
		display: flex;
		align-items: center;
		height: 60px;
		div{
			width: 175px;
			text-align: center;
			font-size: 16px;
			color: #333;
		}
		em{
			width: 1px;
			height: 40px;
			background: #E5E5E5;
			margin-right: .6rem;
		}
		ul{
			overflow: hidden;
			flex: 1;
			li{
				width: 2.4rem;
				float: left;
				padding-right: .2rem;
				p{
					color: #666666;
				}
				span{
					font-size: 24px;
					width: 2.4rem;
					display: block;
					padding-top: .16rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
  .box {
    margin-bottom: 40px;
    padding: 20px;
    background-color: #ffffff;
  }
}
</style>

<style>

.ToTheDiagnosis .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.ToTheDiagnosis .list_status .zhifu{
    background: #9FDB9D;
}
.ToTheDiagnosis .list_status .weizhifu{
    background: #FEB78C;
}
.ToTheDiagnosis .list_status .quxiao{
    background: #D2D2D2;
}
</style>
 
