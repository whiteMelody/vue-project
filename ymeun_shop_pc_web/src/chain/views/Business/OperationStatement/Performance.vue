<template>
    <div class="wb100">
      
        <!-- <p class="lh50px h50px bd-gray6 bd-b1 mab20">
            <span class="fl f16px fc-gray4">不计入业绩转化表</span>
        </p>

        <div class="clear0"></div> -->

        <p class="lh40px h40px">
            <span class="fl f14px fc-gray4">不计入业绩转化表</span>
        </p>

        <div class="clear-f2"></div>
        <div class="clear3"></div>


        <div class="wb100">

            <div class="wb100">
                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                        <div class="hs_timer">
                            <div class="text">目标时间</div>
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

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
                </el-form>

                <div class="clear0"></div>

                <div class="pal20 par20 pat20 bg-white4">
                    <div class="w150px fl text-center bd-gray bd-r1 fc-gray4 mar50" :class="isTwoRows ? 'h100px lh100px' : 'h40px lh40px'">
                        不计入业绩合计
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">购买人数（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.buy}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">复购人数（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.repeat}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">复购率（%）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.repeatProportion | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">复购金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.repeatPrice | _filterNumFormat }}</p>
                    </div>
                    <div class="clear0"></div>
                </div>

                <!--<div class="market_total">-->
                    <!--<div>-->
                        <!--合计-->
                    <!--</div>-->
                    <!--<em></em>-->
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<p>购买人数(人)</p>-->
                            <!--<span>{{info.buy}}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>复购人数(人)</p>-->
                            <!--<span>{{info.repeat}}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>复购率(%)</p>-->
                            <!--<span>{{info.repeatProportion | _filterNumFormat }}</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<p>复购金额(元)</p>-->
                            <!--<span>{{info.repeatPrice | _filterNumFormat }}</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<div class="clear4"></div>-->

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList"  border>

                        <el-table-column prop="storeName" align="center" label="门店名称">
                            <template slot-scope="scope">
                                {{scope.row.storeName}}
                            </template>
                        </el-table-column>
                 
                        <el-table-column prop="buy" align="center" label="购买人数">
                            <template slot-scope="scope">
                                {{ scope.row.buy }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="repeat" align="center" label="复购人数">
                            <template slot-scope="scope">
                                {{ scope.row.repeat }}
                            </template>
                        </el-table-column>


                        <el-table-column prop="repeatProportion" align="center" label="复购率">
                            <template slot-scope="scope">
                                {{ scope.row.repeatProportion | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="repeatPrice" align="center" label="复购金额">
                            <template slot-scope="scope">
                                {{ scope.row.repeatPrice | _filterNumFormat }}
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

    import { achievementConversion } from "@/chain/assets/api/operationStatement/operationStatement"
    // import { technicianPerformance } from "@/chain/assets/api/manage/statistics"
    import dateSlot from '@/chain/components/date/dateSlot'

    export default {
        name: "Performance",
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
                    s_id:''
                },      
                // dateTime: [],
                // condition: {},                              // 查询条件
                demoList: [],                      // table数组
                pageSearch: achievementConversion,       // 分页查询api接口
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

            if((window.innerWidth - 286 - 170 * 5)< 0){
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
                        url = `https://${location.hostname}/post/export/customer/getAchievementConversionExport`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/customer/getAchievementConversionExport`;
                    }
                    url += `?downloadUserId=${res.data.users_id}`;
                    url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                    if (params.s_id) {
                        url += `&s_id=${params.s_id}`;
                    }
                    // console.log(url);
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
        height: 40px;
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
