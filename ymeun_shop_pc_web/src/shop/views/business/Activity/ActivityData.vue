<template>
    <div class="ActivityData f14px pa14">

        <div class="pal7 par7">
            <div class="bg-white pal15 par15 pat5 pab5">

                <div class="wb100">

                    <p class="h40px lh40px bd-b1 bd-gray fc-gray4">查看数据</p>

                    <div class="clear4"></div>

                    <el-form :inline="true" :model="condition" class="search-form" slot="search">

                        <el-form-item label="">
                            <el-input v-model="condition.kw" placeholder="请输入活动名称"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker
                                    v-model="condition.createTime"
                                    :clearable="false"
                                    type="datetime"
                                    placeholder="选择创建时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="condition.status" placeholder="选择状态" readonly="" clearable>
                                <el-option key="-1" label="全部状态" value="-1"></el-option>
                                <el-option key="1" label="开启中" value="1"></el-option>
                                <el-option key="2" label="已结束" value="2"></el-option>
                                <el-option key="3" label="待开启" value="3"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                        <el-button type="danger" class="h32px fr" @click="$router.push('Activity')">新建活动</el-button>

                    </el-form>
                </div>

            </div>
        </div>

        <div class="clear4"></div>

        <template v-if="!isEmpty">

            <div class="pal7 par7">
                <div class="pa20 bg-white">
                    <div class="wb70 fl bd-gray bd-r1 relative">
                        <div style="padding-left: 250px; padding-right: 20px; height: 172px;">

                            <img :src="info.cover" style="width: 229px; height: 172px; top:0; left: 0 ;" class="absolute">

                            <div class="wb100">
                                <p class="f16px fc-gray4 mab20">{{info.share_title}}</p>
                                <p class="text-over-hidden3 fc-gray3 lh25px"> {{info.share_text}} </p>
                            </div>
                        </div>
                    </div>

                    <div class="wb29 fr">

                        <div class="pal20">
                            <template v-if="info.activityState == 1 || info.activityState == 2">
                                <div class="relative" style="padding-right: 90px;">
                                    <p class="h30px lh30px fc-gray3">活动URL：</p>
                                    <div class="clear0"></div>
                                    <p class=" pal10 par10 bg-white1 h34px lh34px radius1">
                                        {{info.url}}
                                    </p>

                                    <template v-if="info.activityState == 1">
                                        <p class="w80px h32px fc-white radius1 lh32px bd-blue6 bd-a1 fr bg-blue6 text-center absolute pointer cobyOrderSn" data-clipboard-action="copy" :data-clipboard-text="info.url"  @click="copyLink" style="top:30px; right: 0;">复制链接</p>
                                    </template>

                                </div>

                                <div class="wb100">
                                    <div class="clear3"></div>
                                    <div class="wb100">
                                        <p class="h30px lh30px fc-gray3 fl">活动二维码：</p>
                                        <img :src="info.qr_code" class="w100px h100px fl mal10 mar10">
                                        <a :href="info.qr_code" download="">
                                            <p class="w80px h32px fc-white radius1 lh32px bd-blue6 bd-a1 fl bg-blue6 text-center" style="margin-top: 66px;">下载二维码</p>
                                        </a>
                                    </div>
                                </div>
                            </template>

                            <template v-else>
                                <div class="wb100 fc-gray2 text-center" style="height: 179px; line-height: 179px;">
                                    活动开启后生成活动链接和二维码
                                </div>
                            </template>
                        </div>

                    </div>

                    <div class="clear0"></div>

                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4"></div>

            <div class="pal7 par7">
                <div class="wb100 ">
                    <div class="wb32 fl bg-white">
                        <div class="pal40 pat30 par30 pab25">
                            <div class="wb100">
                                <span class="fl fc-blue6 f30px">{{pv}}</span>
                                <span class="fr fc-gray2" @click="dialogDate1 = true">
                                {{$base.dateTimeToDate(value1[0], 'date2') + ' - ' + $base.dateTimeToDate(value1[1], 'date2')}} <i class="iconfont iconxiala"></i>
                            </span>
                            </div>
                            <div class="clear6"></div>
                            <span class="fc-gray4 f16px">总浏览次数 PV</span>
                            <img src="@/shop/assets/img/icon-a1.png" class="fr w60px h50px">
                            <div class="clear0"></div>
                        </div>
                    </div>
                    <div class="wb32 fl mal2per mar2per bg-white">
                        <div class="pal40 pat30 par30 pab25">
                            <div class="wb100">
                                <span class="fl fc-green2 f30px">{{uv}}</span>
                                <span class="fr fc-gray2" @click="dialogDate2 = true">
                                {{$base.dateTimeToDate(value2[0], 'date2') + ' - ' + $base.dateTimeToDate(value2[1], 'date2')}} <i class="iconfont iconxiala"></i>
                            </span>
                            </div>
                            <div class="clear6"></div>
                            <span class="fc-gray4 f16px">总客数 UV</span>
                            <img src="@/shop/assets/img/icon-a2.png" class="fr w60px h50px">
                            <div class="clear0"></div>
                        </div>
                    </div>
                    <div class="wb32 fl bg-white">
                        <div class="pal40 pat30 par30 pab25">
                            <div class="wb100">
                                <span class="fl fc-orange f30px">{{count}}</span>
                                <span class="fr fc-gray2" @click="dialogDate3 = true">
                                {{$base.dateTimeToDate(value3[0], 'date2') + ' - ' + $base.dateTimeToDate(value3[1], 'date2')}} <i class="iconfont iconxiala"></i>
                            </span>
                            </div>
                            <div class="clear6"></div>
                            <span class="fc-gray4 f16px">总奖品领取数</span>
                            <img src="@/shop/assets/img/icon-a3.png" class="fr w60px h50px">
                            <div class="clear0"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clear4"></div>

            <div class="pal7 par7">
                <div class="bg-white pal15 par15 pat5 pab5">
                    <div class="wb100">
                        <p class="h40px lh40px bd-b1 bd-gray fc-gray4">老客详细数据
                            <el-button type="danger" class="h32px fr" @click="myExport('old')">导出Excel</el-button>
                        </p>

                        <div class="clear4"></div>

                        <div class="wb100">
                            <base-list
                                    ref="table1"
                                    :condition="condition"
                                    :datas.sync="list"
                                    :pageSearch="pageSearch"
                                    :isPaging="true"
                            >

                                <el-table slot="list" :data="list" stripe border>
                                    <el-table-column align="center" label="序号">
                                        <template slot-scope="scope">{{scope.$index+1}}</template>
                                    </el-table-column>

                                    <el-table-column align="center" label="客户姓名">
                                        <template slot-scope="scope">{{ scope.row.customer.name }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="电话">
                                        <template slot-scope="scope">{{ scope.row.customer.mobile }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品名称">
                                        <template slot-scope="scope">{{ scope.row.partake.target.label }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品领取数量">
                                        <template slot-scope="scope">{{ scope.row.partake_num }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="分享数">
                                        <template slot-scope="scope">{{ scope.row.share_num }}</template>
                                    </el-table-column>

                                    
                                </el-table>
                            </base-list>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clear4"></div>

            <div class="pal7 par7">
                <div class="bg-white pal15 par15 pat5 pab5">
                    <div class="wb100">
                        <p class="h40px lh40px bd-b1 bd-gray fc-gray4">
                            新客详细数据
                            <el-button type="danger" class="h32px fr" @click="myExport('new')">导出Excel</el-button>
                        </p>


                        <div class="clear4"></div>

                        <div class="wb100">
                            <base-list
                                    ref="table2"
                                    :condition="condition"
                                    :datas.sync="list2"
                                    :pageSearch="pageSearch2"
                                    :isPaging="true"
                            >

                                <el-table slot="list" :data="list2" stripe border>
                                    <el-table-column align="center" label="序号">
                                        <template slot-scope="scope">{{scope.$index+1}}</template>
                                    </el-table-column>

                                    <el-table-column align="center" label="客户姓名">
                                        <template slot-scope="scope">{{ scope.row.customer.name }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="电话">
                                        <template slot-scope="scope">{{ scope.row.customer.mobile }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品名称">
                                        <template slot-scope="scope">{{ scope.row.partake.target.label }}</template> 
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品领取时间">
                                        <template slot-scope="scope">{{ scope.row.partake.partake_time }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品领取数量">
                                        <template slot-scope="scope">{{ scope.row.partake_num }}</template>
                                    </el-table-column>
                                    <el-table-column align="center" label="奖品状态">
                                        <template slot-scope="scope">{{ scope.row.partake.status.label }}</template>
                                    </el-table-column>

                                </el-table>
                            </base-list>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clear0"></div>

        </template>

        <template v-else>
            <p class="text-center fc-gray2">没有找到该活动</p>
        </template>

        <div class="clear0"></div>

        <el-dialog title="总浏览次数 PV" :visible.sync="dialogDate1" width="440px">
            <div class="wb100">
                <el-date-picker
                        v-model="value1"
                        :clearable="false"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDate1 = false">取 消</el-button>
                <el-button type="primary" @click="searchDate(1)">保 存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="总浏览次数 PV" :visible.sync="dialogDate2" width="440px">
            <div class="wb100">
                <el-date-picker
                        v-model="value2"
                        :clearable="false"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDate2 = false">取 消</el-button>
                <el-button type="primary" @click="searchDate(2)">保 存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="总浏览次数 PV" :visible.sync="dialogDate3" width="440px">
            <div class="wb100">
                <el-date-picker
                        v-model="value3"
                        :clearable="false"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDate3 = false">取 消</el-button>
                <el-button type="primary" @click="searchDate(3)">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>

    import dateSlot from '@/shop/components/date/dateSlot'

    import {getList, getInfo, browsePvAndUv, getOldClientList, getOldExcel, getNewClientList, getNewExcel} from  "@/shop/assets/api/activity/activity"

    export default {
        name: "ActivityData",
        data() {
            return {
                dateTime: [ '', ''],
                condition: {
                    flexibleId: this.$route.query.id,
                },

                info:{},

                list: [],
                pageSearch: getOldClientList,

                list2: [],
                pageSearch2: getNewClientList,

                value1: [new Date(), new Date()],
                dialogDate1: false,

                value2: [new Date(), new Date()],
                dialogDate2: false,

                value3: [new Date(), new Date()],
                dialogDate3: false,

                pv: 0,
                uv: 0,
                count: 0,

                isEmpty: false,

                title: '',

            };
        },
        components: {
            dateSlot
        },
        methods: {
            loadData(){
                getInfo(this.condition).then(res=>{
                    if(res.status == 0){
                        if(this.$base.isNull(res.data)){
                            this.$message({
                                showClose: true,
                                message:'没有找到该活动',
                                type: 'info',
                            });
                            this.isEmpty = true

                        }else{
                            this.isEmpty = false
                            this.info = res.data
                            this.condition.flexibleId = res.data.id
                            this.$refs.table1.loadData()
                            this.$refs.table2.loadData()
                            this.searchDate(1)
                            this.searchDate(2)
                            this.searchDate(3)

                            //判断活动状态
                            let now = this.$base.dateTimeToDate( new Date(), 'time')
                            let start = this.$base.dateTimeToDate( res.data.start_time, 'time')
                            let end = this.$base.dateTimeToDate( res.data.stop_time, 'time')

                            if(now < start){
                                //未开始
                                this.info.activityState = 3
                            }else if(now > start && now < end){
                                //开启中
                                this.info.activityState = 1
                            }else if(now > end){
                                //结束
                                this.info.activityState = 2
                            }else{
                                this.info.activityState = -1
                            }

                            console.log(this.info.activityState)

                        }
                    }
                })

            },

            searchDate(type){

                if(type == 1){
                    browsePvAndUv({relationId: this.condition.flexibleId, type: 1, startTime: this.$base.dateTimeToDate(this.value1[0], 'startTime'), endTime: this.$base.dateTimeToDate(this.value1[1], 'endTime') }).then(res=>{
                        if(res.status == 0){
                            this.pv = res.data.pv
                            this.dialogDate1 = false
                        }
                    })
                }else if(type == 2){
                    browsePvAndUv({relationId: this.condition.flexibleId, type: 1, startTime: this.$base.dateTimeToDate(this.value2[0], 'startTime'), endTime: this.$base.dateTimeToDate(this.value2[1], 'endTime') }).then(res=>{
                        if(res.status == 0){
                            this.uv = res.data.uv
                            this.dialogDate2 = false
                        }
                    })
                }else if(type == 3){
                    browsePvAndUv({relationId: this.condition.flexibleId, type: 1, startTime: this.$base.dateTimeToDate(this.value3[0], 'startTime'), endTime: this.$base.dateTimeToDate(this.value3[1], 'endTime') }).then(res=>{
                        if(res.status == 0){
                            this.count = res.data.receive_num
                            this.dialogDate3 = false
                        }
                    })
                }

            },

            copyLink() {

            },

            myExport(type){
                
                if(type == 'new'){
                    //导出新客
                    let url = `http://${location.hostname}/post/export/promotion/getNewClientList?flexibleId=${this.condition.flexibleId}&downloadUserId=${this.$store.getters.currentUser.users_id}`;
                    window.location.href = url;
                }else{
                    //导出老客
                    let url = `http://${location.hostname}/post/export/promotion/getOldClientList?flexibleId=${this.condition.flexibleId}&downloadUserId=${this.$store.getters.currentUser.users_id}`;
                    window.location.href = url;
                }


            },

        },

        // 挂载结束状态
        mounted() {
            this.loadData()
        },

        watch: {
            dateTime(c,o){
                this.startTime = c[0]
                this.endTime = c[1]
            }
        }

    };
</script>

<style>

</style>


    
