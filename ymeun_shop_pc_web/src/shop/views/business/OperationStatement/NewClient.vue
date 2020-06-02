<template>
    <div class="wb100 NewClient">
      
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">新客统计表</span>
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">
                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                   
                    <el-form-item label>
                        <el-select v-model="condition.year" placeholder="选择时间" readonly clearable>
                            <el-option v-for="(item,index) in timerList" :key="index" :label="item"
                                       :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                   
                    <!-- <el-form-item label>
                        <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable>
                            <el-option :key="''" label="全部门店" :value="''"></el-option>
                            <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
              -->


                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
                </el-form>

                <div class="market_total">
                    <div>
                        合计
                    </div>
                    <em></em>
                    <ul>
                        <li>
                            <p>新客人数</p>
                            <span>{{info.quantity}}</span>
                        </li>
                        <li>
                            <p>消费金额总计(元)</p>
                            <span>{{info.amount | _filterNumFormat}}</span>
                        </li>
                        <li>
                            <p>划扣金额总计(元)</p>
                            <span>{{info.consume | _filterNumFormat }}</span>
                        </li>
                        <li>
                            <p>退单金额总计(元)</p>
                            <span>{{info.refund | _filterNumFormat }}</span>
                        </li>
                        <li>
                            <p>欠款金额总计(元)</p>
                            <span>{{info.arrears | _filterNumFormat }}</span>
                        </li>
                        <li>
                            <p>充值金额总计(元)</p>
                            <span>{{info.preperid | _filterNumFormat }}</span>
                        </li>
                    </ul>
                </div>

                <div class="clear4"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>

                        <el-table-column prop="cycle" align="center" label="月份">
                            <template slot-scope="scope">
                                {{scope.row.cycle}}
                            </template>
                        </el-table-column>
                 
                        <el-table-column prop="quantity" align="center" label="新客人数">
                            <template slot-scope="scope">
                                {{ scope.row.quantity }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="amount" align="center" label="消费金额">
                            <template slot-scope="scope">
                                {{ scope.row.amount | _filterNumFormat}}
                            </template>
                        </el-table-column>


                        <el-table-column prop="consume" align="center" label="划扣金额">
                            <template slot-scope="scope">
                                {{ scope.row.consume | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="refund" align="center" label="退单金额">
                            <template slot-scope="scope">
                                {{ scope.row.refund | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="arrears" align="center" label="欠款金额">
                            <template slot-scope="scope">
                                {{ scope.row.arrears | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="preperid" align="center" label="充值金额">
                            <template slot-scope="scope">
                                {{ scope.row.preperid | _filterNumFormat }}
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

    import { getConsumption } from "@/shop/assets/api/manage/statistics"

    export default {
        name: "NewClient",
        components: {
        },
        data() {
            return {
                // storeList:[],
                form: {},
                condition: {
                    s_id:''
                },      
                // dateTime: [],
                // condition: {},                              // 查询条件
                demoList: [],                      // table数组
                pageSearch: getConsumption,       // 分页查询api接口
                info: {},
                timerList:[],
                isHideEmpty: false,
            }
        },
        mounted() {
            //获取门店列表
            // this.$postRequest("/post/api/store/getStore").then(res => {
            //     if(res.status == 0){
            //     let _tmp = res.data
            //     for(let i=0; i<_tmp.length; i++){
            //         _tmp[i].isSelected = false
            //     }
            //     this.storeList = _tmp
            //     }
            // })
        },
        methods: {
            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let formData = this.$base.copySearchConditions(this.form);
                let url = '';
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/store/getConsumptionExport`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/store/getConsumptionExport`;
                }

                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
                if (params.year) {
                    url += `&year=${params.year}`;
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
                this.info = data.analysis;
                this.demoList = data.list;
                this.timerList = []
                for (let i = data.filter.min; i <= data.filter.max; i++) {
                    this.timerList.push(i)
                }
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
    background: #EBFCFF;
    border: 1px solid #78DAE9;
    div{
        width: 200px;
        text-align: center;
        color: #333333;
        font-size: 16px;
    }
    em{
        width: 1px;
        height: 40px;
        background: #e5e5e5;
        margin: .3rem 0;
    }
    ul{
        display: flex;
        padding-left: .5rem;
        flex: 1;
        flex-wrap: wrap;
        li{
            width:  16%;
            p{
                font-size: 14px;
                color: #666;
                padding-bottom: .1rem;
            }
            span{
                font-size: 20px;
                color: #0DC9E5;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
        }
    }
}
</style>

<style>
.NewClient table{
  margin: 0;
  font-size: 16px;
}
.NewClient .el-table--border tr th{
  padding: 8px 0;
}
.NewClient .el-table__body-wrapper{
  margin-top:0;
}
</style>
