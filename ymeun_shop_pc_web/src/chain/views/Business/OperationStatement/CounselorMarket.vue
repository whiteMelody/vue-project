<template>
    <div class="wb100">

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                        <div class="hs_timer">
                            <div class="text">收银时间</div>
                            <em></em>
                            <div class="input">
                            <el-date-picker
                                class="w340px"
                                v-model="dateTime"
                                :clearable="false"
                                type="daterange"
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label>
                        <el-select v-model="condition.s_id" placeholder="选择门店" readonly clearable>
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(false)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                    </template>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>

                    <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
             
                </el-form>

                <div class="clear0"></div>

                <div class="pal20 par20 pat20 bg-white4">
                    <div class="w150px fl text-center bd-gray bd-r1 fc-gray4 mar50" :class="isTwoRows ? 'h100px lh100px' : 'h40px lh40px'">
                        销售业绩合计
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">销售总额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.order | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">成交人头（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.head}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">成交人次（次）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.weight}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">划扣人头（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.consumeHead}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">划扣人次（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.consumeNumber}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">退单金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">欠款金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.arrears_price | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">充值金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{(info.prepaid - info.prepaid_refund) | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">实际业绩（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.performance | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>
                </div>

                <!--<div class="market_total">-->
                    <!--<div>-->
                        <!--顾问销售业绩合计-->
                    <!--</div>-->
                    <!--<em></em>-->
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<p>销售业绩(元)</p>-->
                            <!--<span>{{info.order | _filterNumFormat }}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>成交人头(人)</p>-->
                            <!--<span>{{info.head}}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>成交人次(次)</p>-->
                            <!--<span>{{info.weight}}</span>-->
                        <!--</li>-->
                        <!--&lt;!&ndash; <li>-->
                            <!--<p>划扣业绩(元)</p>-->
                            <!--<span>{{info.consumePrice | _filterNumFormat }}</span>-->
                        <!--</li> &ndash;&gt;-->
                        <!--<li>-->
                            <!--<p>划扣人头(人)</p>-->
                            <!--<span>{{info.consumeHead}}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>划扣人次(人)</p>-->
                            <!--<span>{{info.consumeNumber}}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>退单金额(元)</p>-->
                            <!--<span>{{info.refund | _filterNumFormat }}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>欠款金额(元)</p>-->
                            <!--<span>{{info.arrears_price | _filterNumFormat }}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>充值金额(元)</p>-->
                            <!--<span>{{(info.prepaid - info.prepaid_refund) | _filterNumFormat }}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>实际业绩(元)</p>-->
                            <!--<span>{{info.performance | _filterNumFormat }}</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<div class="clear4"></div>-->

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" border>

                        <el-table-column prop="usersName" align="center" :label="$store.getters.roleName.adviser">
                            <template slot-scope="scope">
                                {{scope.row.usersName}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="order" align="center" label="销售金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.order | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="head" align="center" label="成交人头(人)">
                            <template slot-scope="scope">
                                {{ scope.row.head }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="weight" align="center" label="成交人次(次)">
                            <template slot-scope="scope">
                                {{ scope.row.weight }}
                            </template>
                        </el-table-column>

                        <!-- <el-table-column prop="consumePrice" align="center" label="划扣业绩(元)">
                            <template slot-scope="scope">
                                {{ scope.row.consumePrice | _filterNumFormat }}
                            </template>
                        </el-table-column> -->

                        <el-table-column prop="consumeHead" align="center" label="划扣人头(人)">
                            <template slot-scope="scope">
                                {{ scope.row.consumeHead }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="consumeNumber" align="center" label="划扣人次(人)">
                            <template slot-scope="scope">
                                {{ scope.row.consumeNumber }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="refund" align="center" label="退单金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.refund | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="arrears_price" align="center" label="欠款金额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.arrears_price | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="充值金额（元）">
                            <template slot-scope="scope">
                                {{( scope.row.prepaid - scope.row.prepaid_refund) | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="performance" align="center" label="实际业绩（元）">
                            <template slot-scope="scope">
                                {{ scope.row.performance | _filterNumFormat }}
                            </template>
                        </el-table-column>

                    </el-table>
                </base-list>
            </div>

            <div class="clear0"></div>

        </div>

    </div>
</template>

<script>

    // 顾问
    // import { adviserPerformance } from "@/chain/assets/api/manage/statistics"
    import { adviserPerformance } from "@/chain/assets/api/manage/statistics"
    import dateSlot from '@/chain/components/date/dateSlot'

    export default {
        name: "SalesPerformance",
        components: {
            dateSlot
        },
        data() {
            return {
                storeList:[],
                form: {},
                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    endTime: this.$base.getDateScope(0).endTime,
                },      
                // dateTime: [],
                // condition: {},                              // 查询条件
                demoList: [],                      // table数组
                pageSearch: adviserPerformance,       // 分页查询api接口
                info: {},
                isHideEmpty: false,
                isTwoRows: false,
            }
        },
        mounted() {
            //获取门店列表
            this.$postRequest("/post/api/store/getStore").then(res => {
                if(res.status == 0){
                let _tmp = res.data
                for(let i=0; i<_tmp.length; i++){
                    _tmp[i].isSelected = false
                }
                this.storeList = _tmp
                }
            })

            if((window.innerWidth - 286 - 170 * 10)< 0){
                this.isTwoRows = true
            }

        },
        methods: {
            //导出Excel
            deriveExcel() {
                this.$postRequest("/post/api/getUserInfo").then(res => {
                    let params = this.$base.copySearchConditions(this.condition);
                    let url = ''
                    if(window.location.hostname == this.$base.getStoreHost()){
                        url = `https://${location.hostname}/post/export/member/adviserGetPrintInfo`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/member/adviserGetPrintInfo`;
                    }
                    url += `?downloadUserId=${res.data.users_id}`;
                    url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                    if (params.s_id) {
                        url += `&s_id=${params.s_id}`;
                    }
                    window.location.href = url;
                });
            },

            hideEmpty(flag){
                this.isHideEmpty = flag
                if(this.isHideEmpty){
                    this.condition.hidden = 1
                }else{
                    this.condition.hidden = 0
                }
                this.loadData()
            },

            loadData() {
                if(this.$base.isNull(this.form.c1))
                    this.condition.channelId = ''
                this.$refs.demoTable.loadData()
            },

            getLoaded(data){
                this.info = data.count;
                this.demoList = data.data;
            },

        },
        watch: {
            dateTime(c, o){
                this.condition.startTime = c[0]
                this.condition.endTime = c[1]
            },
            form: {
                deep: true,
                handler: function() {
                    this.condition.channelId = this.form.c2 || this.form.c1;
                }
            },
            demoTable(c, o){
                console.log(c)
            },

        }

    }

</script>

<style scoped lang="scss">
.market_total{
    display: flex;
    align-items: center;
    background: #F2F2F2;
    div{
        width: 200px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    em{
        width: 1px;
        height: 120px;
        background: #E5E5E5;
        margin: .3rem 0;
    }
    ul{
        display: flex;
        padding-left: .5rem;
        flex: 1;
        flex-wrap: wrap;
        li{
            width:  20%;
            margin-bottom: .2rem;
            
            p{
                font-size: 14px;
                color: #666;
                padding-bottom: .1rem;
            }
            span{
                font-size: 20px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
        }
    }
}
</style>
