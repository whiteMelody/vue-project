<template><div class="AdvisoryCard" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>咨询列表 {{today}}</header>
    <div class="box">
        <el-form :inline="true" slot="search" label-width="80px">
            <el-form-item>
                <auto-search-client @changed="myChanged"></auto-search-client>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
        </el-form>
        <ul>
            <!-- liActive_wei liActive_yi liActive_qu -->
            <li v-for="(item, index) in dataList" :key="index" :class="items[item.status].name">
                <div class="name">
                    <div class="text">
                        <div class="time">{{item.appointment_time}}</div>
                        <div class="text_name">{{item.customer_name}} 
 							<span v-if="item.customer_sex.value == 0" class="iconfont iconnv"></span>
							<span v-else class="iconfont iconnan"></span>
                        </div>
                    </div>
                    <div class="customer">
                        <div class="left_xin" v-if="item.old_customer == 1">新客</div>
                        <div class="left_lao" v-else>老客</div>
                        <div class="right_wei" v-if="item.status == 0">未到店</div>
                        <div class="right_yi" v-else-if="item.status == 1">已到店</div>
                        <div class="right_qu" v-else>已取消</div>
                    </div>
                </div>
                <!-- listBox_wei listBox_yi listBox_qu -->
                <div class="listBox" :class="items[item.status].list">
                    <div class="list"> 
						<i>项目：</i>
 						<span>{{item.items_name}}</span>
                    </div>
                    <div class="list"> 
						<i>电话：</i>
 						<span>{{item.mobile}}</span>
                    </div>
                    <div class="list"> 
						<i>{{$store.getters.roleName.adviser}}：</i>
 						<span>{{item.adviser_name}}</span>
                    </div>
                    <div class="advisory"> 
						<i>跨店咨询：</i>
 						<span>{{item.across_store}}</span>
                    </div>
                    <div class="list h34px"> 
						<i>备注：</i>
 						<span>{{item.content}}</span>
                    </div>
                </div>
                <div class="buttomBox">
                    <div class="buttom1" v-if="item.status == 0">
                        
                    </div>
                    <div class="buttom2" v-else-if="item.status == 1">
                        <p v-if="item.adviserConfirm == 2" @click="clinicalReception(item.id)"><span>确认接诊</span></p>
						<p v-else-if="item.adviserConfirm == 1">
							<a 
                                @click="$router.push({name: 'Billing',query:{ customerId: item.customer_id, adviserId: item.adviser_id, appointmentId: item.id, technicianId: item.technician_id } })"
                            >开单</a>
                            <template v-if="$store.getters.currentUser.role_id!=4">
                                <a class="fc-gray3" v-if="item.consultation_status == 1">已填写</a>
                                <a
                                        v-else
                                        @click="$router.push({name: 'FillInAdvisory',query:{ customerId: item.customer_id, adviserId: item.adviser_id, appointmentId: item.id, } })"
                                >填写咨询</a>
                            </template>

                            <b v-if="item.orders_id" @click="PrintingClick(item.orders_id)">打印</b>
						</p>
						<!-- <p v-else>
                            <a @click="$router.push({name: 'Billing' })">开单</a>
							<b v-if="item.orders_id != ''" >打印</b>
						</p> -->
					</div>
                    <div class="buttom3" v-else>
                        <div class="list"> 
							<i>原因：</i>
							<span>时间来不及，不能到店时间来不及，</span>
                        </div>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</div>
</template>
<script>

import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'

import {getConsultationTodayList, timeLine} from  "@/shop/assets/api/flow/advisory"

export default {
  name: "AdvisoryCard",
  data() {
    return {
		magessBoxIsShow: true,
		boxMaxHeight:0,
        condition:{},
        dataList: [],
        kw: '',
        items: [
            { name: "liActive_wei", list: "listBox_wei", type:0 },
            { name: "liActive_yi", list: "listBox_yi", type:1 },
            { name: "liActive_qu", list: "listBox_qu", type:2 }
        ],
        today: '',
    };
  },
  components: { autoSearchClient },
  methods: {
    myChanged(data){
      this.kw = data.kw
    },
    magessBox() {
      this.magessBoxIsShow = false;
    },
    loadData(){
        getConsultationTodayList({keyword : this.kw, perpage:9999}).then((res)=>{
            if(res.status == 0){
                this.dataList = res.data.list
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
        })

    },
    clinicalReception(id){
        timeLine({
            appointmentId: id
        }).then(res=>{
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '接诊成功',
                    type: 'success',
                });
                this.loadData()
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
        })
    },
    
    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 1 }
      });
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
    this.boxMaxHeight = window.innerHeight - 100;

      this.loadData()
      this.today = this.$base.dateTimeToDate(new Date()).split(" ")[0]

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
.AdvisoryCard {
    margin: 24px 20px;
    background-color: #ffffff;
    padding: 0 20px;
    overflow: hidden;
    header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: .16rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #e5e5e5;
    }
    .magessBox {
        height: 35px;
        display: flex;
        .shuxian {
            display: inline-block;
            width: 0.02rem;
            height: 35px;
            background: rgba(153, 153, 153, 1);
        }
    }
    .box {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        ul {
            width: 100%;
            background-color: #ffffff;
            li {
                width: 20%;
                border-radius: 20px;
                padding: .2rem .2rem 0;
                margin-bottom: .4rem;
                float: left;
                margin-right: .4rem;
                .name {
                    display: flex;
                    justify-content: space-between;
                    .text {
                        .time {
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                        }
                        .text_name {
                            font-size: .2rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                            .iconnan {
                                color: #2878ff;
                            }
                            .iconnv {
                                color: #ec414d;
                            }
                        }
                    }
                    .customer {
                        display: flex;
                        height: 40px;
                        width: 1.2rem;
                        border-radius: 40px;
                        overflow: hidden;
                        div {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            width: 50%;
                        }
                        .left_xin {
                            background-color: #FFFFFF;
                            color: #FF5722;
                        }
                        .left_lao {
                            background-color: #FFFFFF;
                            color: #666666;
                        }
                        .right_wei {
                            background-color: #B89FF4;
                            color: rgba(255, 255, 255, 1);
                        }
                        .right_yi {
                            background-color: #7FD4E2;
                            color: rgba(255, 255, 255, 1);
                        }
                        .right_qu {
                            background-color: #999A9F;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
				}
				.listBox_wei{
					.advisory{
						border-top: 1px solid rgba(184,159,244,0.2);
						border-bottom: 1px solid rgba(184,159,244,0.2);
					}
				}
				.listBox_yi{
					.advisory{
						border-top: 1px solid rgba(127,212,226,0.2);
						border-bottom: 1px solid rgba(127,212,226,0.2);
					}
				}
				.listBox_qu{
					.advisory{
						border-top: 1px solid rgba(153,154,159,0.2);
						border-bottom: 1px solid rgba(153,154,159,0.2);
					}
				}
                .listBox {
                    margin-top: .2rem;
                    .advisory {
						height: 40px;
                        display: flex;
						align-items: center;
                        margin-bottom: .15rem;
						i {
                            font-style: normal;
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
						}
						span {
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                    }
                    .list {
                        margin-bottom: .15rem;
                        display: flex;
                        i {
                            font-style: normal;
                            width: .6rem;
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                        }
                        span {
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            font-size: .14rem;
                            font-family: MicrosoftYaHei;
                            font-weight: 400;
                            color: rgba(51, 51, 51, 1);
                        }
                    }
				}
				.listBox_wei {
					border-bottom: 1px solid rgba(255, 87, 34, 0);
				}
                .listBox_yi {
                    border-bottom: 1px solid rgba(127,212,226,0.2);
                }
                .listBox_qu {
                    border-bottom: 1px solid rgba(153, 154, 159, 0.2);
                }
                .buttomBox {
                    margin: .1rem 0;
                    .buttom1 {
						height: 30px;
                    }
                    .buttom2 {
						height: 30px;
						display: flex;
						align-items: center;
						p{
							display: flex;
							justify-content: space-between;
							flex: 1;
							span{
								font-size: 16px;
								flex: 1;
								text-align: center;
								color: #30A1B3;
								cursor: pointer;
							}
							a{
								flex: 1;
								text-align: center;
								font-size: 16px;
								border-right: 1px solid rgba(127,212,226,0.2);
								cursor: pointer;
								color: #333;
							}
							b{
								font-weight: normal;
								flex: 1;
								text-align: center;
								font-size: 16px;
								cursor: pointer;
								color: #30A1B3;
							}

						}
                    }
                    .buttom3 {
						height: 30px;
                        .list {
                            display: flex;
                            i {
                                font-style: normal;
                                width: .6rem;
                                font-size: .14rem;
                                font-family: MicrosoftYaHei;
                                font-weight: 400;
                                color: rgba(102, 102, 102, 1);
                            }
                            span {
                                flex: 1;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                font-size: .14rem;
                                font-family: MicrosoftYaHei;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                            }
                        }
                    }
                }
            }
            li:nth-child(4n) {
                margin-right: 0;
            }
            .liActive_wei {
                background-color: #F1EEF8;
            }
            .liActive_yi {
                background-color: #D3F4F9;
            }
            .liActive_qu {
                background-color: #F2F3F7;
            }
        }
    }
}
</style>



    
