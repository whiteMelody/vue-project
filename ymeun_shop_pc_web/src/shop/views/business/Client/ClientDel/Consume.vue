<template>
  <div class="Consume">

    <div class="titles">
      
		<div>划扣数据统计</div>
		<em></em>
		<ul>
			<li>
				<p>共计次数（次）</p>
				<span class="fc-blue6">{{userData.total | _NumFormat}}</span>
			</li>
			<li>
				<p>划扣次数（次）</p>
				<span class="fc-gray2">{{userData.consume_total | _NumFormat}}</span>
			</li>
			<li>
				<p>剩余次数（次）</p>
				<span class="fc-blue6">{{userData.surplus_total | _NumFormat}}</span>
			</li>
		</ul>
        
    </div>


    <div class="box">
        
        <div class="table_box">
            <p :class="{'active':tableBoxIndex == 0}" @click="tableBoxIndex = 0">划扣明细</p>
            <em></em>
            <p :class="{'active':tableBoxIndex == 1}" @click="tableBoxIndex = 1">划扣信息</p>
        </div>

        <div class="detail" v-show="tableBoxIndex == 0">
            <base-list ref="detailTable" :condition="detailCondition"
                    :datas.sync="detailList" :pageSearch="detailPageSearch" :isPaging="true" v-on:listLoaded="getLoaded">
                <el-form :inline="true" :model="detailCondition" class="search-form" slot="search" label-width="80px">
                
                        <el-form-item class="w240px">
                        <el-date-picker
                            class="wb100"
                            :clearable="false"
                            v-model="detailDaterangeTimer"
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
                

                <el-table slot="list" :data="detailList" stripe border>

                    <el-table-column prop="store" align="center" label="划扣门店">
                        <template slot-scope="scope">
                            {{ scope.row.store.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="huakou_time" align="center" label="划扣时间">
                        <template slot-scope="scope">
                            {{ scope.row.huakou_time | _endTimeFormat}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="technician" align="center" :label="$store.getters.roleName.technician">
                        <template slot-scope="scope">
                            {{ scope.row.technician.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="items" align="center" label="项目">
                        <template slot-scope="scope">
                            {{ scope.row.items.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="number" align="center" label="划扣次数">
                        <template slot-scope="scope">
                            {{ scope.row.number }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="price" align="center" label="划扣金额（元）">
                        <template slot-scope="scope">
                            {{ scope.row.price | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="actual_price" align="center" label="实际划扣金额（元）">
                        <template slot-scope="scope">
                            {{ scope.row.actual_price | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="give_price" align="center" label="券额划扣金额（元）">
                        <template slot-scope="scope">
                            {{ scope.row.give_grice | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="status" align="center" label="状态">
                        <template slot-scope="scope">
                            <div class="list_status">
                                <span class="zhifu" v-if="scope.row.status.value == 0">正常</span>
                                <span class="weizhifu" v-else-if="scope.row.status.value == 1">退回</span>
                                <span class="weizhifu" v-else-if="scope.row.status.value == 3">已退回</span>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>
        </div>

        <div class="message" v-show="tableBoxIndex != 0">
            <base-list ref="messageTable" :condition="messageCondition"
                    :datas.sync="messageList" :pageSearch="messagePageSearch" :isPaging="false" v-on:listLoaded="getLoaded">
                <el-form :inline="true" :model="messageCondition" class="search-form" slot="search">
                
                        <el-form-item class="w240px">
                        <el-date-picker
                            class="wb100"
                            v-model="messageDaterangeTimer"
                            :clearable="false"
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
                

                <el-table slot="list" :data="messageList" stripe border>

                    <el-table-column prop="store" align="center" label="所属门店">
                        <template slot-scope="scope">
                            {{ scope.row.store.name }}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column prop="id" align="center" label="到诊状态">
                        <template slot-scope="scope">
                            {{ scope.row.store.name }}
                        </template>
                    </el-table-column> -->

                    <el-table-column prop="code" align="center" label="消费编号">
                        <template slot-scope="scope">
                            {{ scope.row.code }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="trading_time" align="center" label="付款日期">
                        <template slot-scope="scope">
                            {{ scope.row.trading_time }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="items" align="center" label="项目">
                        <template slot-scope="scope">
                            {{ scope.row.items.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="number" align="center" label="次数">
                        <template slot-scope="scope">
                            {{ scope.row.number | _NumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="consume_number" align="center" label="划扣次数">
                        <template slot-scope="scope">
                            {{ scope.row.consume_number | _NumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="surplus_number" align="center" label="剩余次数">
                        <template slot-scope="scope">
                            {{ scope.row.surplus_number | _NumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="technician" align="center" :label="$store.getters.roleName.technician">
                        <template slot-scope="scope">
                            {{ scope.row.technician.name }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="consume_money" align="center" label="划扣金额">
                        <template slot-scope="scope">
                            {{ scope.row.consume_money | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="consume_actual_price" align="center" label="实际划扣金额">
                        <template slot-scope="scope">
                            {{ scope.row.consume_actual_price | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="consume_give_price" align="center" label="券额划扣金额">
                        <template slot-scope="scope">
                            {{ scope.row.consume_give_price | _filterNumFormat }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="status" align="center" label="状态">
                        <template slot-scope="scope">
                            <div class="list_status">
                                <span class="zhifu" v-if="scope.row.status.value == 0">正常</span>
                                <span class="weizhifu" v-else-if="scope.row.status.value == 1">退回</span>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
            </base-list>
        </div>

    </div>
  </div>
</template>
<script>
import { getDepleteDetailed , getDepleteList } from "@/shop/assets/api/client/client"
export default {
  name: "Consume",
  data() {
    return {
        userData:'',
        tableBoxIndex:0,
        detailCounselor:{
            counselor:"",
        },
        detailCondition: {
            customerId:this.$route.query.id
        },                                // 查询条件
        detailList: [],                      // table数组
        detailPageSearch: getDepleteDetailed,       // 分页查询api接口

        detailDaterangeTimer:[],

        messageCounselor:{
            counselor:"",
        },
        messageCondition: {
            customerId:this.$route.query.id
        },                                // 查询条件
        messageList: [],                      // table数组
        messagePageSearch: getDepleteList,       // 分页查询api接口
        messageDaterangeTimer:[],

    };
  },
  components: {},
  methods: {
    loadData() {
        if(this.tableBoxIndex == 0){
            this.$refs.detailTable.loadData()
        }else{
            this.$refs.messageTable.loadData()
        }
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
  destroyed() {},
  watch:{
        tableBoxIndex(c,o){
            if(c == 0){
                this.$refs.detailTable.loadData()
            }else{
                this.$refs.messageTable.loadData()
            }
        },
        messageList(c,o){
            console.log('-------------',c)
        },
        detailDaterangeTimer(c, o) {
            this.detailCondition.startTime = this.$base.dateTimeToDate(c[0],'date2');
            this.detailCondition.stopTime = this.$base.dateTimeToDate(c[1],'date2');
        },
        messageDaterangeTimer(c, o) {
            this.messageCondition.startTime = this.$base.dateTimeToDate(c[0],'date2');
            this.messageCondition.stopTime = this.$base.dateTimeToDate(c[1],'date2');
        }
  },
};
</script>
<style lang="scss" scoped>
.Consume {
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
        .table_box{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 18px;
            margin-bottom: 20px;
            p{
                font-size: 16px;
                color: #999;
                cursor: pointer;
            }
            .active{
                color: #0DC9E5;
            }
            em{
                width: 1px;
                height: 10px;
                background: #E5E5E5;
                margin: 0 20px;
            }
        }
	}
    .weizhifu{
        background: #FEB78C;
    }
}
</style>

<style>

.Consume .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.Consume .list_status .zhifu{
    background: #9FDB9D;
}
.Consume .list_status .quxiao{
    background: #D2D2D2;
}
</style>
 
