<template>
    <div class="wb100">
        <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">治疗间报表</span>
<!--            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>-->
        </p>

        <div class="clear0"></div>

        <div class="wb100">

            <div class="wb100">

                <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                    <el-form-item label>
                        <el-select v-model="condition.roomId" placeholder="选择房间" readonly="" clearable>
                            <el-option :key="''" :value="''" label="全部房间"></el-option>
                            <el-option v-for="item in $store.getters.treatmentRoomListMap" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label>
                        <el-select v-model="condition.technicianId" :placeholder="`选择${$store.getters.roleName.technician}`" readonly="" clearable>
                            <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.technician}`"></el-option>
                            <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                    <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>

                </el-form>

                <div class="clear1"></div>

                <base-list ref="demoTable" :condition="condition"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

                    <el-table slot="list" :data="demoList" stripe border>

                        <el-table-column label="操作时间" align="center">
                            <template slot-scope="scope">
                                <template>{{scope.row.start_time}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="使用时长(分)" align="center">
                            <template slot-scope="scope">
                                <template>  {{scope.row.details_num}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="房间名称" align="center">
                            <template slot-scope="scope">
                                <template>  {{scope.row.room.name}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="服务客户" align="center">
                            <template slot-scope="scope">
                                <template>  {{scope.row.customer.name}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column :label="$store.getters.roleName.technician" align="center">
                            <template slot-scope="scope">
                                <template>  {{scope.row.technician.name}} </template>
                            </template>
                        </el-table-column>

                        <el-table-column label="划扣金额(元)" align="center">
                            <template slot-scope="scope">
                                <template>  {{scope.row.consume_price | _filterNumFormat}} </template>
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

    import { therapeuticRoomDetailsAnalysis } from "@/shop/assets/api/manage/statistics"

    import dateSlot from '@/shop/components/date/dateSlot'

    export default {
        name: "ReportFormCureRoom",
        components: {
            dateSlot
        },
        data() {
            return {
                form:{},
                condition: {
                    roomId: '',
                    technicianId:"",
                },
                demoList: [],                      // table数组
                pageSearch: therapeuticRoomDetailsAnalysis,       // 分页查询api接口
                info: {},
             
            }
        },
        mounted() {


        },
        methods: {

            loadData() {
                this.$refs.demoTable.loadData()
            },

            getLoaded(data){
                this.info = data.count
            },

            //导出Excel
            deriveExcel() {
                let params = this.$base.copySearchConditions(this.condition);
                let url = ``;
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/roomAnalysis/therapeuticRoomDetailsAnalysisExcel`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/roomAnalysis/therapeuticRoomDetailsAnalysisExcel`;
                }
                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
                if (params.roomId) {
                    url += `&roomId=${params.roomId}`;
                }
                if (params.technicianId) {
                    url += `&technicianId=${params.technicianId}`;
                }
                window.location.href = url;
            },

        },

    }

</script>

<style scoped lang="scss">

</style>
