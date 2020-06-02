<!--门诊排名-->
<template>
  <div>

    <el-row>
      <el-col :span="24">
        <base-list ref="outpatientServiceRank" :condition="condition"
                   :datas.sync="outpatientServiceRankList" :pageSearch="pageSearch" :isPaging="false">
          <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="">
                  <date-slot :startDate.sync="condition['startTime']"
                             :endDate.sync="condition['endTime']" :dateType="'yyyy-MM-dd'"></date-slot>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px">查 询</el-button>
                <!--<el-button type="primary" icon="el-icon-refresh" @click="loadData" class="h32px">刷 新</el-button>-->
              </el-col>

            </el-row>

          </el-form>
          <el-table slot="list" :data="outpatientServiceRankList" height="408" style="margin-top: -15px;">
            <el-table-column align="left" label="排名" width="100" type="index" :index="indexMethod">

            </el-table-column>
            <el-table-column prop="accruedValue" align="center" label="门店">
              <template slot-scope="scope">
                <p class="Fgreen" @click="storeHerf(scope.row.id)">{{scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="accruedValue" align="center" label="门诊数">
              <template slot-scope="scope">
                {{ scope.row.appointmentCustomer }}
              </template>
            </el-table-column>
            <el-table-column prop="accruedValue" align="center" label="操作">
              <template slot-scope="scope">
                <p @click="storeHerf(scope.row.id)">
                  查看详情
                </p>
              </template>
            </el-table-column>
          </el-table>
        </base-list>

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getAppointmentRankingListByStore } from "@/chain/assets/api/StoreData/StoreData";
  import dateSlot from '@/chain/components/date/dateSlot'

  export default {
    components: { dateSlot },
    data() {
      return {
        condition: {
          number: 10
        },                                                  // 查询条件
        outpatientServiceRankList: [],                      // table数组
        pageSearch: getAppointmentRankingListByStore,       // 分页查询api接口
      }
    },
    mounted() {

    },
    methods: {

      // 跳转门店详情
      storeHerf(id) {
        this.$router.push({
          path: "/PerformanceShopDel",
          query: { id: id }
        });
      },

      indexMethod(index){
        return index + 1
      },

      loadData() {
        this.$refs.outpatientServiceRank.loadData()
      },

      //清空
      clearSelectOption() {
        this.condition = {}
      },

    },

  }
</script>

