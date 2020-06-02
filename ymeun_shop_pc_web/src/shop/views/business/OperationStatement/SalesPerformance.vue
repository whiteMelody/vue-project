<template>
  <div class="wb100">
    <!-- <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">顾问销售业绩</span>
            <span class="fl mal20 f14px fc-gray3">数据每十分钟更新一次</span>
    </p>-->

    <div class="clear0"></div>

    <div class="wb100">
      <div class="wb100">
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          <el-form-item label>
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <el-form-item label>
            <el-select v-model="form.c1" placeholder="选择渠道" readonly clearable>
              <el-option :key="''" label="全部渠道" :value="''"></el-option>
              <el-option
                v-for="item in $store.getters.channelList1Map"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
            <el-select v-model="form.c2" placeholder="选择下级渠道类别" readonly clearable v-if="form.c1">
              <el-option
                v-for="item in $store.getters.channelList2Map(form.c1)"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <template v-if="isHideEmpty">
            <el-button @click="hideEmpty(false)">显示空数据</el-button>
          </template>
          <template v-else>
            <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
          </template>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          <el-button type="danger" class="h32px" @click="deriveExcel">导出Excel</el-button>
        </el-form>
        <!--
                <div class="pa20 bg-blue5 text-center bd-blue4 bd-a1 f16px">

                    <div class="wb16 mar3per fl h40px lh40px bd-gray bd-r1 mat15">
                        顾问销售业绩合计
                    </div>

                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">新增人头（人）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f12px h40px lh40px">{{info.addCustomer}}</p>
                    </div>
                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">到诊人头（人）</p>
                        <div class="clear2"></div>
                        <p class="fc-red f12px h40px lh40px">{{info.examineCustomer}}</p>
                    </div>
                    <div class="wb10 fl">
                        <p class="fc-gray3 h20px lh20px">成交人头（人）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f12px h40px lh40px">{{info.dealCustomer}}</p>
                    </div> 
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">销售业绩(元)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.order | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">成交人头(人)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">成交人次(次)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">划扣业绩(元)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">划扣人头(人)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">划扣人次(人)</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">退单金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.refund | _filterNumFormat }}</p>
                    </div>
                    <div class="wb12 fl">
                        <p class="fc-gray3 h20px lh20px">券额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f12px h40px lh40px text-over-hidden1">{{info.givePrice | _filterNumFormat }}</p>
                    </div> 
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">欠款金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.arrears_price | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">充值金额（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{(info.prepaid - info.prepaid_refund) | _filterNumFormat }}</p>
                    </div>
                    <div class="wb15 fl">
                        <p class="fc-gray3 h20px lh20px">实际业绩（元）</p>
                        <div class="clear2"></div>
                        <p class="fc-blue6 f20px h40px lh40px text-over-hidden1">{{info.performance | _filterNumFormat }}</p>
                    </div>

                    <div class="clear0"></div>

                </div>
        -->
        <div class="market_total">
          <div>{{$store.getters.roleName.adviser}}销售业绩合计</div>
          <em></em>
          <ul>
            <li>
              <p>销售业绩(元)</p>
              <span>{{info.order | _filterNumFormat }}</span>
            </li>
            <li>
              <p>成交人头(人)</p>
              <span>{{info.head}}</span>
            </li>
            <li>
              <p>成交人次(次)</p>
              <span>{{info.weight}}</span>
            </li>
            <!-- <li>
              <p>划扣业绩(元)</p>
              <span>{{info.consumePrice | _filterNumFormat }}</span>
            </li> -->
            <li>
              <p>划扣人头(人)</p>
              <span>{{info.consumeHead}}</span>
            </li>
            <li>
              <p>划扣人次(人)</p>
              <span>{{info.consumeNumber}}</span>
            </li>
            <li>
              <p>退单金额(元)</p>
              <span>{{info.refund | _filterNumFormat }}</span>
            </li>
            <li>
              <p>欠款金额(元)</p>
              <span>{{info.arrears_price | _filterNumFormat }}</span>
            </li>
            <li>
              <p>充值金额(元)</p>
              <span>{{(info.prepaid - info.prepaid_refund) | _filterNumFormat }}</span>
            </li>
            <li>
              <p>实际业绩(元)</p>
              <span>{{info.performance | _filterNumFormat }}</span>
            </li>
          </ul>
        </div>

        <div class="clear4"></div>

        <base-list
          ref="demoTable"
          :condition="condition"
          :datas.sync="demoList"
          :pageSearch="pageSearch"
          :isPaging="true"
          :isAutoLoad="true"
          v-on:listLoaded="getLoaded"
        >
          <el-table slot="list" :data="demoList" stripe border>
            <el-table-column prop="usersName" align="center" :label="$store.getters.roleName.adviser">
              <template slot-scope="scope">{{scope.row.usersName}}</template>
            </el-table-column>

            <!-- <el-table-column prop="addCustomer" align="center" label="新增人头（人）">
                            <template slot-scope="scope">
                                {{ scope.row.addCustomer }}
                            </template>
                        </el-table-column>

                        <el-table-column prop="examineCustomer" align="center" label="到诊人头（人）">
                            <template slot-scope="scope">
                                {{ scope.row.examineCustomer }}
                            </template>
            </el-table-column>-->

            <el-table-column prop="allMoney" align="center" label="销售金额（元）">
              <template slot-scope="scope">{{ scope.row.order | _filterNumFormat }}</template>
            </el-table-column>

            <el-table-column prop="head" align="center" label="成交人头(人)">
              <template slot-scope="scope">{{ scope.row.head }}</template>
            </el-table-column>

            <el-table-column prop="weight" align="center" label="成交人次(次)">
              <template slot-scope="scope">{{ scope.row.weight }}</template>
            </el-table-column>

            <!-- <el-table-column prop="consumePrice" align="center" label="划扣业绩(元)">
              <template slot-scope="scope">{{ scope.row.consumePrice | _filterNumFormat }}</template>
            </el-table-column> -->

            <el-table-column prop="consumeHead" align="center" label="划扣人头(人)">
              <template slot-scope="scope">{{ scope.row.consumeHead }}</template>
            </el-table-column>

            <el-table-column prop="consumeNumber" align="center" label="划扣人次(人)">
              <template slot-scope="scope">{{ scope.row.consumeNumber }}</template>
            </el-table-column>

            <el-table-column prop="refund" align="center" label="退单金额（元）">
              <template slot-scope="scope">{{ scope.row.refund | _filterNumFormat }}</template>
            </el-table-column>

            <!-- <el-table-column prop="givePrice" align="center" label="券额（元）">
                            <template slot-scope="scope">
                                {{ scope.row.givePrice | _filterNumFormat }}
                            </template>
            </el-table-column>-->

            <el-table-column prop="arrears" align="center" label="欠款金额（元）">
              <template slot-scope="scope">{{ scope.row.arrears_price | _filterNumFormat }}</template>
            </el-table-column>

            <el-table-column prop="arrears" align="center" label="充值金额（元）">
              <template
                slot-scope="scope"
              >{{( scope.row.prepaid - scope.row.prepaid_refund) | _filterNumFormat }}</template>
            </el-table-column>

            <el-table-column prop="givePrice" align="center" label="实际业绩（元）">
              <template slot-scope="scope">{{ scope.row.performance | _filterNumFormat }}</template>
            </el-table-column>
          </el-table>
        </base-list>
      </div>

      <div class="clear0"></div>
    </div>
  </div>
</template>

<script>
import { adviserPerformance } from "@/shop/assets/api/manage/statistics";
import dateSlot from "@/shop/components/date/dateSlot";

export default {
  name: "SalesPerformance",
  components: {
    dateSlot
  },
  data() {
    return {
      form: {},
      dateTime: [
        this.$base.getDateScope(0).startTime,
        this.$base.getDateScope(0).endTime
      ],
      condition: {
        startTime: this.$base.getDateScope(0).startTime,
        endTime: this.$base.getDateScope(0).endTime
      },
      // dateTime: [],
      // condition: {},                              // 查询条件
      demoList: [], // table数组
      pageSearch: adviserPerformance, // 分页查询api接口
      info: {},
      isHideEmpty: false
    };
  },
  mounted() {},
  methods: {
    //导出Excel
    deriveExcel() {
      let params = this.$base.copySearchConditions(this.condition);
      let formData = this.$base.copySearchConditions(this.form);

      let url = "";
      if (window.location.hostname == this.$base.getStoreHost()) {
        url = `https://${
          location.hostname
        }/post/export/analysis/adviserGetPrintInfo`;
      } else {
        url = `http://${location.hostname}:${
          location.port
        }/post/export/analysis/adviserGetPrintInfo`;
      }

      url += `?downloadUserId=${this.$store.getters.currentUser.users_id}`;
      url += `&startTime=${params.startTime}&endTime=${params.endTime}`;
      console.log(params);
      if (formData.c1) {
        url += `&channelPid=${formData.c1}`;
      }
      if (formData.c2) {
        url += `&channelId=${formData.c2}`;
      }
      // console.log(url);
      window.location.href = url;
    },

    hideEmpty(flag) {
      this.isHideEmpty = flag;
      if (this.isHideEmpty) {
        this.condition.hidden = 1;
      } else {
        this.condition.hidden = 0;
      }
      this.loadData();
    },

    loadData() {
      if (this.$base.isNull(this.form.c1)) this.condition.channelId = "";
      this.$refs.demoTable.loadData();
    },

    getLoaded(data) {
      this.info = data.count;
      this.demoList = data.data;
    }
  },
  watch: {
    dateTime(c, o) {
      this.condition.startTime = c[0];
      this.condition.endTime = c[1];
    },
    form: {
      deep: true,
      handler: function() {
        this.condition.channelId = this.form.c2 || this.form.c1;
      }
    },
    demoTable(c, o) {
      console.log(c);
    }
  }
};
</script>

<style scoped lang="scss">
.market_total {
  display: flex;
  align-items: center;
  background: #ebfcff;
  border: 1px solid #78dae9;
  div {
    width: 200px;
    text-align: center;
    color: #333333;
    font-size: 16px;
  }
  em {
    width: 1px;
    height: 120px;
    background: #e5e5e5;
    margin: 0.3rem 0;
  }
  ul {
    display: flex;
    padding-left: 0.5rem;
    flex: 1;
    flex-wrap: wrap;
    li {
      width: 20%;
      margin-bottom: 0.2rem;

      p {
        font-size: 14px;
        color: #666;
        padding-bottom: 0.1rem;
      }
      span {
        font-size: 20px;
        color: #0dc9e5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
    }
  }
}
</style>
