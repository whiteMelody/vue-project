<template>
    <div class="wb100 ChannelStatistics">

        <p class="lh40px h40px">
            <span class="fl f14px fc-gray4">渠道统计情况表</span>
            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
        </p>

        <div class="clear-f2"></div>
        <div class="clear3"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                    <el-form-item label="">
                        <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                        <div class="hs_timer">
                            <div class="text">客户生成时间</div>
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
                        <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                   <el-form-item  label="">
                       <el-select v-model="condition.channelPid" placeholder="选择渠道" readonly clearable @change="changeChannel" :disabled="!condition.storeId">
                           <el-option :key="''" label="全部渠道" :value="''"></el-option>
                           <el-option v-for="item in channelList" :key="item.id" :label="item.name"
                                      :value="item.id"></el-option>
                       </el-select>
                       <el-select v-model="condition.channelId" placeholder="选择下级渠道类别" readonly clearable v-if="condition.channelPid" :disabled="!condition.storeId">
                           <el-option v-for="item in channelList2" :key="item.id" :label="item.name"
                                      :value="item.id"></el-option>
                       </el-select>
                   </el-form-item>

                    <!--  选择员工 -->
                   <el-form-item label="">
                       <el-select v-model="condition.usersId" placeholder="选择员工" readonly="" clearable :disabled="!condition.storeId">
                           <el-option :key="''" :value="''" label="全部员工"></el-option>
                           <el-option v-for="item in staffList" :key="item.users_id" :label="item.name"
                                      :value="item.users_id"></el-option>
                       </el-select>
                   </el-form-item>

                    <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(0)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(1)">隐藏空数据</el-button>
                    </template>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>

                    <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>

                </el-form>

                <div class="clear0"></div>

                <div class="pal20 par20 pat20 bg-white4">
                    <div class="w150px fl text-center bd-gray bd-r1 fc-gray4 mar50" :class="isTwoRows ? 'h100px lh100px' : 'h40px lh40px'">
                        渠道类别合计
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">新增人头（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.quantity}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">留电</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.phone}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">留电率</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.rate}}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">预约人头（人）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.appointment }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">销售金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.order | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">退款金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="w150px fl h40px lh15px mar20 mab20">
                        <p class="fc-gray2">实际金额（元）</p>
                        <p class="Fb fc-gray4 f20px mat10">{{info.actual | _filterNumFormat }}</p>
                    </div>
                    <div class="clear0"></div>
                </div>

                <div class="lh38px h40px pointer">
                    <template v-if="showType == 0">
                        <span class="fl fc-green2 f14px">渠道统计情况表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(1)">大类可视化图表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(2)">二类可视化图表</span>
                    </template>
                    <template v-else-if="showType == 1">
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(0)">渠道统计情况表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-green2 f14px">大类可视化图表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(2)">二类可视化图表</span>
                    </template>
                    <template v-else>
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(0)">渠道统计情况表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f14px pab2" @click="changeShowType(1)">大类可视化图表</span>
                        <span class="fl f14px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-green2 f14px">二类可视化图表</span>
                    </template>
                </div>


                <template v-if="showType == 0">

                    <base-list ref="demoTable" :condition="condition"
                               :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="false" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                        <el-table slot="list" :data="demoList" border
                                row-key="id"
                                :row-class-name="tableRowClassName"
                                :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
                                :span-method="arraySpanMethod"
                                  ref="myTable"
                                  @row-click="switchExpansion"
                        >

                            <el-table-column prop="name" align="left" label="渠道名称" width="200px">
                                <template slot-scope="scope">
                                    {{scope.row.name}}
                                </template>
                            </el-table-column>

                            <el-table-column prop="quantity" align="center" label="新增人头（人）">
                                <template slot-scope="scope">
                                    {{ scope.row.quantity }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="phone" align="center" label="留电">
                                <template slot-scope="scope">
                                    {{ scope.row.phone }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="rate" align="center" label="留电率">
                                <template slot-scope="scope">
                                    {{ scope.row.rate }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="appointment" align="center" label="预约人头（人）">
                                <template slot-scope="scope">
                                    {{ scope.row.appointment }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="order" align="center" label="销售金额（元）">
                                <template slot-scope="scope">
                                    {{ scope.row.order | _filterNumFormat }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="refund" align="center" label="退款金额（元）">
                                <template slot-scope="scope">
                                    {{ scope.row.refund | _filterNumFormat }}
                                </template>
                            </el-table-column>

                            <el-table-column prop="actual" align="center" label="实际金额（元）">
                                <template slot-scope="scope">
                                    {{ scope.row.actual | _filterNumFormat }}
                                </template>
                            </el-table-column>

                            <el-table-column align="left" label="百分比">
                                <template slot-scope="scope">
                                    {{ scope.row.actual_rate }}
                                </template>
                            </el-table-column>

                        </el-table>
                    </base-list>
                </template>
                <template v-else>
                    <div class="myChart" ref="myChart" v-loading="loading"></div>
                </template>

            </div>

            <div class="clear0"></div>

        </div>

    </div>
</template>

<script>

    import {  getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"
    import {  getStoreMembers  } from "@/chain/assets/api/common/common"

    import { getStatistics } from "@/chain/assets/api/manage/statistics"
    import dateSlot from '@/chain/components/date/dateSlot'
    const echarts = require('echarts');

    export default {
        name: "ChannelStatistics",
        components: {
            dateSlot
        },
        data() {
            return {
                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    stopTime: this.$base.getDateScope(0).endTime,
                    hiddenEmpty:1,
                    channelPid: '',
                    channelId: '',
                    usersId: '',
                    start:1,
                    perpage:99999
                },
                demoList: [],                      // table数组
                pageSearch: getStatistics,       // 分页查询api接口
                info: {},
                isHideEmpty: true,
                showType: 0,      // 0 表格 | 1 图表
                channelList: [],
                channelList2: [],
                staffList: [],
                storeList:[],
                loading: true,
                isTwoRows: false,
            }
        },
        mounted() {
            this.loadData()

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

            if((window.innerWidth - 286 - 170 * 8)< 0){
                this.isTwoRows = true
            }

        },
        methods: {

            //导出Excel
            deriveExcel() {
                this.$postRequest("/post/api/getUserInfo").then(res => {
                    let params = this.$base.copySearchConditions(this.condition);
                    let url = ''
                    if(window.location.hostname == this.$base.getChainHost()){
                        url = `https://${location.hostname}/post/export/channel/getStatistics`;
                    }else{
                        url = `http://${location.hostname}:${location.port}/post/export/channel/getStatistics`;
                    }
                    url += `?downloadUserId=${res.data.users_id}`;
                    if (params.storeId) {
                        url += `&storeId=${params.storeId}`
                    }
                    url += `&startTime=${params.startTime}&stopTime=${params.stopTime}`;
                    window.location.href = url;
                });
            },

            switchExpansion(row) {
                if(row.child){
                    if(row.child.length)
                        this.$refs.myTable.toggleRowExpansion(row)
                }
            },

            /**
             * 切换门店
             */
            changeStore(){
                this.condition.channelPid = ''
                this.condition.channelId = ''
                this.condition.usersId = ''
                if(!this.condition.storeId){
                    return
                }

                getListChannel({ channelParentId: 0, storeId: this.condition.storeId }).then(res => {
                    if(res.status == 0){
                        let _tmp = res.data.list
                        this.channelList = _tmp
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

                getStoreMembers({ storeId: this.condition.storeId, s_id: this.condition.storeId }).then(res =>{
                    if(res.status == 0){
                        let _tmp = res.data
                        this.staffList = _tmp.filter(item => item.role_id === 3 || item.role_id === 4 )
                    }
                })
            },

            changeChannel(){
                getListChannel({ channelParentId: this.condition.channelPid, storeId: this.condition.storeId, }).then(res => {
                    if(res.status == 0){

                        let _tmp = res.data.list

                        this.channelList2 = _tmp

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

            getLoaded(data){
                this.info = data.analysis
            },
            changeShowType(type){
                this.showType = type
                if(type == 1){
                    this.condition.hiddenPartent = 0;
                    // this.condition.hiddenEmpty = 1;
                    // this.isHideEmpty = true
                    this.getStatisticsFn()
                }else if(type == 2){
                    this.condition.hiddenPartent = 1;
                    // this.condition.hiddenEmpty = 1;
                    // this.isHideEmpty = true
                    this.getStatisticsFn()
                }else{
                    // this.condition.hiddenPartent = 0
                    // this.condition.hiddenEmpty = 0
                    // this.isHideEmpty = false
                }
            },

            hideEmpty(num){
                if(num == 0)
                {
                    this.isHideEmpty = false
                }
                else
                {
                    this.isHideEmpty = true
                }
                this.condition.hiddenEmpty = num
                this.loadData()
            },

            getSummaries() {

            },

            arraySpanMethod({ row, column, rowIndex, columnIndex }) {

            },

            tableRowClassName({row, rowIndex}) {
                if(row.child){
                    return 'bg-white';
                }else{
                    if(row.name == '小计'){
                        return 'bg-blue6';
                    }else{
                        return 'bg-white2';
                    }
                }

            },

            loadData() {

                if(this.showType == 0){
                    this.$refs.demoTable.loadData()
                }else{
                    this.getStatisticsFn()
                }

            },
            
            getStatisticsFn(){

                this.loading = true

                getStatistics(this.condition).then(res=>{
                    if(res.status == 0){
                        let myChart = echarts.init(this.$refs.myChart);
                        var DataTooltip = new Array();
                        var Data = new Array();

                        this.info = res.data.analysis

                        res.data.list.map((item , index) => {
                            var tDataTooltip = item.name + "  " + item.actual + "  " + item.actual_rate
                            DataTooltip.push(tDataTooltip);
                            var tData = {value:0,name:""};
                            tData.value = item.actual;
                            tData.name = item.name + "  " + item.actual + "  " + item.actual_rate;
                            Data.push(tData);
                        })
                
                        var option = {
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}"
                            },
                            legend: {
                                x : 'center',
                                y : 'bottom',
                                type: 'scroll',
                                data:DataTooltip
                            },
                            // toolbox: {
                            //     show : true,
                            //     feature : {
                            //         mark : {show: true},
                            //         dataView : {show: true, readOnly: false},
                            //         magicType : {
                            //             show: true,
                            //             type: ['pie', 'funnel']
                            //         },
                            //         restore : {show: true},
                            //         saveAsImage : {show: true}
                            //     }
                            // },
                            calculable : true,
                            series : [
                                {
                                    name:"渠道统计情况表",
                                    type:'pie',
                                    radius : "55%",
                                    center : ['50%', '50%'],
                                    data:Data
                                }
                            ]
                            };
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                        this.loading = false

                    }
                }).catch(error=>{
                    console.log("getStatistics no");
                    this.loading = false
                })
            }

        },
        watch: {
            dateTime(c, o){
                this.condition.startTime = c[0]
                this.condition.stopTime = c[1]
            },

        }


    }

</script>


<style scoped lang="scss">
.myChart{
  height: 600px;
}
</style>