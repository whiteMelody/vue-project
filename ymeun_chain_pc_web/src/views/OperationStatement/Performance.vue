<template>
    <div class="wb100">
      
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">不计入业绩转化表</span>
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">
                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label="">
                        <date-slot :dateTime.sync="dateTime"></date-slot>
                    </el-form-item>
                    <el-form-item label>
                        <el-select v-model="condition.s_id" placeholder="选择门店" readonly clearable @change="changeStore">
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
             


                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <!-- <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button> -->
                </el-form>

                <div class="market_total">
                    <div>
                        合计
                    </div>
                    <em></em>
                    <ul>
                        <li>
                            <p>购买人数(人)</p>
                            <span>{{info.buy}}</span>
                        </li>
                        <li>
                            <p>复购人数(人)</p>
                            <span>{{info.repeat}}</span>
                        </li>
                        <li>
                            <p>复购率(%)</p>
                            <span>{{info.repeatProportion | _filterNumFormat }}</span>
                        </li>
                        <li>
                            <p>复购金额(元)</p>
                            <span>{{info.repeatPrice | _filterNumFormat }}</span>
                        </li>
                    </ul>
                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>

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

    import { achievementConversion } from "@/assets/api/operationStatement/operationStatement"
    // import { technicianPerformance } from "@/assets/api/manage/statistics"
    import dateSlot from '@/components/date/dateSlot'

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
        },
        methods: {
            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let formData = this.$base.copySearchConditions(this.form);
                let url = ''
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/analysis/technicianGetPrintInfo`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/analysis/technicianGetPrintInfo`;
                }

                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
                url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
                if (formData.c1) {
                    url += `&channelPid=${formData.c1}`;
                }
                if (formData.c2) {
                    url += `&channelId=${formData.c2}`;
                }
                // console.log(url);
                window.location.href = url;
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
    background: #FFEAEB;
    div{
        width: 200px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    em{
        width: 1px;
        height: 40px;
        background: #EC414D;
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
