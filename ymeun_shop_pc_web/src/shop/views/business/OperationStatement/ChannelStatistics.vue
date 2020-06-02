<template>
    <div class="wb100 ChannelStatistics">
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">渠道统计情况表</span>
            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">

                    <el-form-item label="">
                        <date-slot :dateTime.sync="dateTime"></date-slot>
                    </el-form-item>

                    <el-form-item  label="">
                        <el-select v-model="form.c1" placeholder="选择渠道" readonly clearable>
                            <el-option :key="''" label="全部渠道" :value="''"></el-option>
                            <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                        <el-select v-model="form.c2" placeholder="选择下级项目类别" readonly clearable v-if="form.c1">
                            <el-option v-for="item in $store.getters.channelList2Map(form.c1)" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--  选择员工 -->
                    <el-form-item label="">
                        <el-select v-model="condition.usersId" placeholder="选择员工" readonly="" clearable>
                            <el-option :key="''" :value="''" label="全部员工"></el-option>
                            <el-option v-for="item in $store.getters.staffListMap" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-if="isHideEmpty">
                        <el-button @click="hideEmpty(0)">显示空数据</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="hideEmpty(1)">隐藏空数据</el-button>
                    </template>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
                    
                </el-form>

                <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

                    <div class="wb16 mar3per fl h40px lh40px bd-gray bd-r1 mat15">
                        渠道分类项目类别合计
                    </div>

                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">新增人头（人）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px">{{info.quantity}}</p>
                    </div>
                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">留电</p>
                        <div class="clear2"></div>
                        <p class="fc-red f20px h40px lh40px">{{info.phone}}</p>
                    </div>
                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">留电率</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px">{{info.rate}}</p>
                    </div>
                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">预约人头（人）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.appointment }}</p>
                    </div>
                    <div class="wb13 fl">
                        <p class="fc-gray3 h20px lh20px">销售金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.order | _filterNumFormat }}</p>
                    </div>
                    <div class="wb13 fl">
                        <p class="fc-gray3 h20px lh20px">退款金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb13 fl">
                        <p class="fc-gray3 h20px lh20px">实际金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.actual | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>

                </div>

                <div class="pal20 lh38px h40px pointer">
                    <template v-if="showType == 0">
                        <span class="fl fc-green2 f16px bd-green2 bd-b2">渠道统计情况表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">大类可视化图表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(2)">二类可视化图表</span>
                    </template>
                    <template v-else-if="showType == 1">
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">渠道统计情况表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-green2 f16px bd-green2 bd-b2">大类可视化图表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(2)">二类可视化图表</span>
                    </template>
                    <template v-else>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(0)">渠道统计情况表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-gray2 f16px pab2" @click="changeShowType(1)">大类可视化图表</span>
                        <span class="fl f16px mal20 mar20 fc-gray1"> | </span>
                        <span class="fl fc-green2 f16px bd-green2 bd-b2">二类可视化图表</span>
                    </template>
                </div>

                <div class="clear4"></div>

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

                            <el-table-column prop="name" align="center" label="渠道名称" width="200px">
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

                            <el-table-column align="center" label="百分比">
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

    import { getStatistics } from "@/shop/assets/api/manage/statistics"
    import dateSlot from '@/shop/components/date/dateSlot'
    const echarts = require('echarts');

    export default {
        name: "ChannelStatistics",
        components: {
            dateSlot
        },
        data() {
            return {
                form: {},
                dateTime: [ this.$base.getDateScope(0).startTime,  this.$base.getDateScope(0).endTime],
                condition: {
                    startTime: this.$base.getDateScope(0).startTime,
                    stopTime: this.$base.getDateScope(0).endTime,
                    hiddenEmpty:1,
                    start: 1,
                    perpage: 99999999
                },      
                // dateTime: [],
                // condition: {},                           // 查询条件
                demoList: [],                      // table数组
                pageSearch: getStatistics,       // 分页查询api接口
                info: {},
                isHideEmpty: true,
                showType: 0,      // 0 表格 | 1 图表
                loading: true,

            }
        },
        mounted() {
            this.loadData()
        },
        methods: {

            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let url = ''
                if(window.location.hostname == this.$base.getChainHost()){
                    url = `https://${location.hostname}/post/export/channel/getStatistics`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/channel/getStatistics`;
                }
                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}&hiddenEmpty=${params.hiddenEmpty}`;
                if (params.usersId) {
                    url += `&usersId=${params.usersId}`
                }
                if (params.channelId) {
                    url += `&channelId=${params.channelId}`
                }
                url += `&startTime=${params.startTime}&stopTime=${params.stopTime}`;
                window.location.href = url;
            },

            switchExpansion(row) {
                if(row.child){
                    if(row.child.length)
                        this.$refs.myTable.toggleRowExpansion(row)
                }
            },

            // changeShowType(type){
            //     this.showType = type
            //     if(type == 1 || type == 2){
            //         // this.condition.hiddenPartent = 1;
            //         // this.condition.hiddenEmpty = 1;
            //         // this.isHideEmpty = true
            //         this.getStatisticsFn()
            //     }else{
            //         // this.condition.hiddenPartent = 0
            //         // this.condition.hiddenEmpty = 0
            //         // this.isHideEmpty = false
            //     }
            // },

            changeShowType(type){
                this.showType = type
                if(type == 1){
                    this.condition.hiddenPartent = 0;
                    this.condition.hiddenEmpty = 1;
                    this.isHideEmpty = true
                    this.getStatisticsFn()
                }else if(type == 2){
                    this.condition.hiddenPartent = 1;
                    this.condition.hiddenEmpty = 1;
                    this.isHideEmpty = true
                    this.getStatisticsFn()
                }else{
                    this.condition.hiddenPartent = 0
                    this.condition.hiddenEmpty = 0
                    this.isHideEmpty = false
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

            getLoaded(data){
                this.demoList = data.list
            },

            getSummaries() {
                // let _tmp = this.demoList
                //
                // let _sumQuantity = 0
                // let _sumPhone = 0
                // let _sumRate = 0
                // let _sumAppointment = 0
                // let _sumOrder = 0
                // let _sumRefund = 0
                // let _sumActual = 0
                //
                // for(let i=0; i<_tmp.length; i++){
                //    //取最后一个
                //     if(_tmp[i].child.length){
                //         let _t =  _tmp[i].child[_tmp[i].child.length-1]
                //         _sumQuantity += _t.quantity
                //         _sumPhone += _t.phone
                //         _sumAppointment += _t.appointment
                //         _sumOrder += _t.order
                //         _sumRefund += _t.refund
                //         _sumActual += _t.actual
                //         // let _rate = _tmp[i].child[j].rate
                //         // _rate = _rate.substring(0, _rate.length - 1)
                //         // _sumRate += parseFloat(_t.rate)
                //     }
                //
                // }
                //
                // _sumRate = Number.parseFloat(this.$base.twoDecimal2(_sumPhone /_sumQuantity)) * 100  + '%'
                //
                // return ['合计', _sumQuantity, _sumPhone, _sumRate, _sumAppointment, _sumOrder, _sumRefund, _sumActual ];
            },

            arraySpanMethod({ row, column, rowIndex, columnIndex }) {

                // if(row.name == '小计'){
                //     if (columnIndex === 0) {
                //         return [1, 2];
                //     }else if (columnIndex === 1) {
                //         return [0, 0];
                //     }else{
                //         return [1, 1];
                //     }
                // }else{
                //     //父级
                //     if(row.childLength){
                //         if (columnIndex === 0) {
                //             return [row.childLength, 1];
                //         }else{
                //             return [0, 0];
                //         }
                //     }else{
                //
                //         if(columnIndex === 1){
                //             return [0, 1];
                //         }else{
                //             return [1, 1];
                //         }
                //     }
                // }

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
                        getStatistics(this.condition).then(res=>{
                            if(res.status == 0){
                                let _tmp = res.data.list
                                // let _tmps = []
                                // //创造合计行
                                // for(let i=0; i<_tmp.length; i++){
                                //     let _sumQuantity = 0
                                //     let _sumPhone = 0
                                //     let _sumRate = 0
                                //     let _sumAppointment = 0
                                //     let _sumOrder = 0
                                //     let _sumRefund = 0
                                //     let _sumActual = 0
                                //     for(let j=0; j<_tmp[i].child.length; j++){
                                //         _sumQuantity += _tmp[i].child[j].quantity
                                //         _sumPhone += _tmp[i].child[j].phone
                                //         _sumAppointment += _tmp[i].child[j].appointment
                                //         _sumOrder += _tmp[i].child[j].order
                                //         _sumRefund += _tmp[i].child[j].refund
                                //         _sumActual += _tmp[i].child[j].actual
                                //         // let _rate = _tmp[i].child[j].rate
                                //         // _rate = _rate.substring(0, _rate.length - 1)
                                //         _sumRate += _tmp[i].child[j].rate
                                //     }
                                //
                                //     if(_tmp[i].child.length){
                                //         // _tmp.splice(i, 0, {})
                                //         _tmp[i].child.push({
                                //             id: this.$base.getUuid(),
                                //             name: '小计',
                                //             quantity: _sumQuantity,
                                //             phone: _sumPhone,
                                //             appointment: _sumAppointment,
                                //             order: _sumOrder,
                                //             refund: _sumRefund,
                                //             actual: _sumActual,
                                //             rate: _sumQuantity == 0 ? '0%' : Number.parseFloat(this.$base.twoDecimal(_sumPhone /_sumQuantity)) * 100  + '%',
                                //         })
                                //     }
                                //
                                //     if(_tmp[i].child.length){
                                //         let ___tmp = JSON.parse(JSON.stringify(_tmp[i]))
                                //         let __t = [___tmp]
                                //         // _tmps = _tmps.concat(__t.concat(___tmp.child))
                                //         _tmps = _tmps.concat(__t.concat(___tmp.child))
                                //         ___tmp.childLength = ___tmp.child.length
                                //         ___tmp.child = null
                                //     }
                                //
                                // }
                                //
                                // console.log(_tmp)
                                // console.log(_tmps)

                                // this.demoList = _tmps
                                this.demoList = _tmp

                                this.info = res.data.analysis
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: res.msg,
                                    type: 'error',
                                });
                            }
                        }).catch(error=>{
                            console.log("getStatistics no");
                        })

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
                })
            }

        },
        watch: {
            dateTime(c, o){
                this.condition.startTime = c[0]
                this.condition.stopTime = c[1]
            },
            form: {
                deep: true,
                handler: function() {
                    this.condition.channelId = this.form.c2 || this.form.c1;
                }
            }
        }


    }

</script>


<style scoped lang="scss">
.myChart{
  height: 600px;
}
</style>