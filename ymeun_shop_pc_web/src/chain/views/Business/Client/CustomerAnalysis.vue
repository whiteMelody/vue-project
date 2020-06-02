<template>
  <div class="CustomerAnalysis">
    <header>
      客户分析
      <span>
        总客户数：
        <i>{{total}}</i>人
      </span>
    </header>
    <div class="clear-f2"></div>
    <div class="box">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
        v-on:listLoaded="getLoaded"
      >
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          

          <el-form-item>
            <el-select v-model="condition.consumptionOrder" placeholder="请选择实际消费金额排序" readonly="" clearable :disabled="isShowConsumption" @change="consumptionOrderChange">
              <el-option v-for="[key, val] in _dictMoneySortTypeTow" :key="key" :label="val"
                         :value="key"></el-option>
            </el-select>
          </el-form-item>



          <!-- 消费区间 -->
          <el-form-item>
              <div class="xiao_fei">
                <div class="text">消费区间</div>
                <em></em>
                <div class="xiao_fei_box">
                  <p>
                    <i class="iconfont iconmoney fc-gray2"></i>
                    <el-input type="number" v-model="condition.consumptionLow" placeholder="输入金额" class="w120px"></el-input>
                  </p>
                  <b>至</b>
                  <p>
                    <i class="iconfont iconmoney fc-gray2"></i>
                    <el-input type="number" v-model="condition.consumptionHigh" placeholder="输入金额" class="w120px"></el-input>
                  </p>
                </div>
              </div>
          </el-form-item>
          <!-- <div class="xiaofeiBox">
            <div class="text">消费区间</div>
            <div class="input">
              <i class="iconfont iconmoney fc-gray2"></i>
              <input type="text" style="background:none" v-model="condition.consumptionLow">
            </div>
            <div class="text">至</div>
            <div class="input">
              <i class="iconfont iconmoney fc-gray2"></i>
              <input type="text" style="background:none" v-model="condition.consumptionHigh">
            </div>
          </div> -->

          <el-form-item>
            <el-select v-model="condition.customer_style" placeholder="选择客户类别" readonly clearable>
              <el-option v-for="[key,val] in _dictSpareCustomer" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-select v-model="condition.reachId" placeholder="选择到诊状态" readonly clearable>
                <el-option label="全部到诊状态" value="0"></el-option>
                <el-option label="到店" value="1"></el-option>
                <el-option label="未到店" value="2"></el-option>
              </el-select>
            </el-form-item>

<!--          <el-form-item>-->
<!--            <el-select v-model="condition.overdueId" placeholder="选择成交状态" readonly clearable>-->
<!--              <el-option label="全部成交状态" value="0"></el-option>-->
<!--              <el-option label="成交" value="1"></el-option>-->
<!--              <el-option label="未成交" value="2"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->

          <!-- <el-form-item v-show="FormBoxIsShow == false">
            <el-button class="h32px" @click="MoreClick">
              更多选项
              <i class="iconfont iconxiala"></i>
              <i class="el-icon-caret-bottom"></i>
            </el-button>
          </el-form-item> -->

          

          <!-- <div class="FormBox" v-show="FormBoxIsShow"> -->
          <!-- <div class="FormBox"> -->
            

            <el-form-item>
              <!-- <el-select v-model="condition.advId" placeholder="选择顾问" readonly clearable>
                <el-option :key="''" :value="''" label="全部顾问"></el-option>
                <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                           :value="item.key"></el-option>
                 <el-option v-for="[key, val] in doctorList" :key="key" :label="val" :value="key"></el-option>  
              </el-select> -->

              <el-select v-model="condition.advId" :placeholder="`请选择${$store.getters.roleName.adviser}`" readonly="" clearable class="wb100">
                <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.adviser}`"></el-option>
                  <el-option v-for="item in doctorList" :key="item.users_id" :label="item.name" :value="item.users_id"></el-option>
              </el-select>
    
            </el-form-item>

            <el-form-item>
              <el-select v-model="condition.consume" placeholder="划扣数量" readonly clearable :disabled="isShowDeduct" @change="consumeChange">
                <el-option v-for="[key, val] in _dictMoneySortType" :key="key" :label="val"
                         :value="key"></el-option>
              </el-select>
            </el-form-item>
<!-- 
            <el-form-item>
              <el-select v-model="condition.itemId" placeholder="选择项目类别" readonly clearable>
                <el-option :key="''" label="全部项目" :value="''"></el-option>
                <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                           :value="item.key"></el-option>
              </el-select>
              <el-select v-model="form.itemPid" placeholder="选择下级项目类别" readonly clearable v-if="condition.itemId">
                <el-option v-for="item in $store.getters.projectList2Map(condition.itemId)" :key="item.key" :label="item.value"
                           :value="item.key"></el-option>
              </el-select>
            </el-form-item> -->
            
            <el-form-item>
              <!-- <el-tooltip class="item" effect="light" content="选择时间段内生成创建的客户" placement="top"> -->
                <!-- <date-slot :dateTime.sync="dateTime"></date-slot> -->
                <div class="hs_timer">
                    <div class="text">客户创建时间</div>
                    <em></em>
                    <div class="input">
                    <el-date-picker
                        class="w340px"
                        v-model="dateTime"
                        type="daterange"
                        :clearable="false"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    </div>
                </div>
              <!-- </el-tooltip> -->
            </el-form-item>
            <el-form-item label>
                <el-select v-model="condition.storeId" placeholder="选择门店" readonly clearable @change="changeStore">
                    <el-option :key="''" label="全部门店" :value="''"></el-option>
                    <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                </el-select>
            </el-form-item>

          <el-form-item>
            <el-select v-model="condition.overdueId" placeholder="请选择活跃度" readonly="" clearable :disabled="!condition.storeId">
              <!-- 10.18--杨涛修改 -->
              <el-option v-for="(key, index) in customerActive" :key="index" :label="key.name" :value="key.val"></el-option>
            </el-select>
          </el-form-item>

            <el-form-item>
            <el-select v-model="condition.levelId" placeholder="选择客户等级" readonly clearable :disabled="!condition.storeId">
              <el-option label="全部客户等级" value="0"></el-option>
              <!-- <el-option v-for="(item, index) in customerLevel" :key="index"  :label="`${item.name}(≥${item.max})`" value="1" v-show="index == 0"></el-option>
              <el-option v-for="(item, index) in customerLevel" :key="index"  :label="`${item.name}(≥${item.max}—＜${item.min})`" value="1" v-show="index != 0"></el-option> -->
              <el-option v-for="(item, index) in customerLevel" :key="index" :label="item.name" :value="index+1">
                <span v-if="index == 0">{{item.name}}(≥{{item.min}})</span>
                <span v-else>{{item.name}}<span v-if="item.max && item.min">(≥{{item.min}}—＜{{item.max}})</span></span>
              </el-option>
              <!-- <el-option label="A(≥8—20W)" value="3"></el-option>
              <el-option label="B(≥3—8W)" value="4"></el-option>
              <el-option label="C(≥1—3W)" value="5"></el-option>
              <el-option label="D(<1W)" value="6"></el-option>
              <el-option label="E(未消费)" value="7"></el-option> -->
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

            <!-- 年龄段 -->
            <el-form-item>
              <div class="xiao_fei">
                <div class="text">年龄段</div>
                <em></em>
                <div class="xiao_fei_box">
                  <p>
                    <el-input type="number" v-model="condition.ageLow" placeholder="开始" class="w120px"></el-input>
                  </p>
                  <b>至</b>
                  <p>
                    <el-input type="number" v-model="condition.ageHigh" placeholder="结束" class="w120px"></el-input>
                  </p>
                </div>
              </div>
          </el-form-item>
            <!-- <div class="xiaofeiBox">
              <div class="text">年龄段</div>
              <div class="input">
                <input type="text" v-model="condition.ageLow" placeholder="开始">
              </div>
              <div class="text">至</div>
              <div class="input">
                <input type="text" v-model="condition.ageHigh" placeholder="结束">
              </div>
            </div> -->

            <el-form-item>
              <el-select v-model="condition.provinceId" placeholder="请选择地区" readonly="" clearable class="w130px fl" @change="regionsChange('province', condition.provinceId)">
                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="condition.cityId" placeholder="请选择地区" readonly="" clearable class="w130px fl" v-if="form.provinceId" @change="regionsChange('city', condition.cityId)">
                <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="condition.regionId" placeholder="请选择地区" readonly="" clearable class="w130px fl" v-if="condition.cityId">
                <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class="h32px" @click="form = {};condition={};dateTime=[]">重置</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="h32px" @click="deriveExcel">导出Excel</el-button>
            </el-form-item>

            <!-- <el-form-item>
              <el-button class="h32px" @click="MoreClick">
                收起选项
                <i class="el-icon-caret-top"></i>
              </el-button>
            </el-form-item> -->
          <!-- </div>  -->
        </el-form>

        <el-table slot="list" :data="demoList" border>
          <el-table-column prop="mobile" align="center" label="序号">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="created_time" align="center" label="创建日期">
            <template slot-scope="scope">{{ scope.row.created_time | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="name" align="center" label="姓名">
            <template slot-scope="scope">
              <!-- <el-link  :underline="false"  @click="$router.push({name: 'EssentialInformation',query:{ id: scope.row.id, } })">{{ scope.row.name }} </el-link> -->
              <p>{{ scope.row.name }} </p>
            </template>p
          </el-table-column>

          <el-table-column prop="mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>
          
          <!-- 类别 -->
          <el-table-column prop="sex" align="center" label="类别">
            <template slot-scope="scope">{{ scope.row.style.label }}</template>
          </el-table-column>

          <el-table-column prop="consultation_id" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.advName }}</template>
          </el-table-column>

          <el-table-column prop="levelName" align="center" label="客户等级">
            <template slot-scope="scope">{{ scope.row.levelName }}</template>
          </el-table-column>

          <el-table-column prop="payment" align="center" label="消费">
            <template slot-scope="scope">{{ scope.row.payment | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="refund" align="center" label="退单">
            <template slot-scope="scope">{{ scope.row.refund | _filterNumFormat }}</template>
          </el-table-column>

          <el-table-column prop="consumption" align="center" label="实际消费">
            <template slot-scope="scope">{{ scope.row.consumption | _filterNumFormat }}</template>
          </el-table-column>

<!--          <el-table-column prop="mobile" align="center" label="是否死卡">-->
<!--            <template slot-scope="scope"></template>-->
<!--          </el-table-column>-->
          <!-- <el-table-column prop="mobile" align="center" label="是否死卡">
            <template slot-scope="scope"></template>
          </el-table-column> -->


          <el-table-column prop="mobile" align="center" label="是否到诊">
            <template slot-scope="scope">{{scope.row.reach ? '是' : '否'}}</template>
          </el-table-column>

          <el-table-column prop="regionName" align="center" label="地区">
            <template slot-scope="scope">{{ scope.row.regionName }}</template>
          </el-table-column>

          <el-table-column prop="age" align="center" label="年龄">
            <template slot-scope="scope" v-if="scope.row.age">{{ scope.row.age }}</template>
          </el-table-column>

         <el-table-column prop="consume" align="center" label="剩余划扣数量">
           <template slot-scope="scope">{{ scope.row.consume }}</template>
         </el-table-column>
<!-- 
          <el-table-column prop="itemName" align="center" label="项目">
            <template slot-scope="scope">{{ scope.row.itemName }}</template>
          </el-table-column> -->

          <el-table-column prop="channelName" align="center" label="渠道">
            <template slot-scope="scope">{{ scope.row.channelName }}</template>
          </el-table-column>
          <el-table-column prop="store" align="center" label="所属门店">
            <template slot-scope="scope">{{ scope.row.store.name }}</template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>
  </div>
</template>
<script>
import { getConsumptionList,settingList } from "@/chain/assets/api/client/client";
import {  getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"
//地区级联
import {getRegionsList} from  "@/chain/assets/api/common/common"
//日期范围组件
import dateSlot from '@/chain/components/date/dateSlot'

export default {
  name: "CustomerAnalysis",
  data() {
    return {
      dateTime: [ '', ''],
      form:{},
      condition: {
        channelPid: '',
        channelId: '',
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: getConsumptionList, // 分页查询api接口
      daterangeTimer: [],
      FormBoxIsShow: true,

      //地区级联
      provinceList: [],
      cityList: [],
      regionList: [],
      total: 0,
      customerLevel:[],
      customerActive:[],
      storeList:"",
      channelList: [],
      channelList2: [],
      doctorList:[],

      isShowDeduct:null,
      isShowConsumption:null,
    };
  },
  components: { dateSlot },
  methods: {
    consumptionOrderChange(value) {
      this.isShowDeduct = false;
      if (value) {
        this.isShowDeduct = true;
      }
    },
    consumeChange(value) {
      this.isShowConsumption = false;
      if (value) {
        this.isShowConsumption = true;
      }
    },
    getLoaded(data){
      console.log(data)
      this.total = data.total
    },
    //导出Excel
    deriveExcel() {
      this.$postRequest("/post/api/getUserInfo").then(res => {
        let params = this.$base.copySearchConditions(this.condition);
        let url = ''
        if(window.location.hostname == this.$base.getChainHost()){
            url = `https://${location.hostname}/post/export/customer/getConsumption?downloadUserId=${res.data.users_id}`;
        }else{
            url = `http://${location.hostname}:${location.port}/post/export/customer/getConsumption?downloadUserId=${res.data.users_id}`;
        }
        // let url = `http://${location.hostname}/post/export/customerAnalysis/getPrintInfo?start=0&perpage=999&downloadUserId=${this.$store.getters.currentUser.users_id}`;
        // console.log(params);
        // return;      
        if (params.levelId) {
          url += `&levelId=${params.levelId}`
        }
        if (params.consumptionOrder) {
          url += `&consumptionOrder=${params.consumptionOrder}`
        }
        if (params.overdueId) {
          url += `&overdueId=${params.overdueId}`
        }
        if (params.customer_style) {
          url += `&customer_style=${params.customer_style}`
        }
        if (params.consumptionLow) {
          url += `&consumptionLow=${params.consumptionLow}`
        }
        if (params.consumptionHigh) {
          url += `&consumptionHigh=${params.consumptionHigh}`
        }
        if (params.overdueId) {
          url += `&overdueId=${params.overdueId}`
        }
        if (params.reachId) {
          url += `&reachId=${params.reachId}`
        }
        if (params.advId) {
          url += `&advId=${params.advId}`
        }
        if (params.itemId) {
          url += `&itemId=${params.itemId}`
        }
        if (params.itemPid) {
          url += `&itemPid=${params.itemPid}`
        }
        if (params.storeId) {
          url += `&storeId=${params.storeId}`
        }
        if (params.channelId) {
          url += `&channelId=${params.channelId}`
        }
        if (params.channelPid) {
          url += `&channelPid=${params.channelPid}`
        }
        if (params.ageLow) {
          url += `&ageLow=${params.ageLow}`
        }
        if (params.ageHigh) {
          url += `&ageHigh=${params.ageHigh}`
        }
        if (params.provinceId) {
          url += `&provinceId=${params.provinceId}`
        }
        if (params.cityId) {
          url += `&cityId=${params.cityId}`
        }
        if (params.regionId) {
          url += `&regionId=${params.regionId}`
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }

        let startTime = year + "-" + month + "-01 00:00:00";
        let endTime = year + "-" + month + "-" + strDate + '23:59:59';
        if (params.consumptionStart) {
          url += `&startTime=${params.consumptionStart}`;
        } else {
          url += `&startTime=${startTime}`;
        }

        if (params.consumptionEnd) {
          url += `&endTime=${params.consumptionEnd}`;
        } else {
          url += `&endTime=${endTime}`;
        }
        window.location.href = url;
      });

    },

    // 客户等级
    settingList() {
      settingList({storeId: this.condition.storeId}).then(res => {
        if (res.status == 0) {
          this.customerLevel = JSON.parse(res.data.list.rank);
          let array = JSON.parse(res.data.list.active);
          let list = [
            {name:'全部类型',val:0},
            {name:`流失客户(${array.loss}天未到店)`,val:1},
            {name:`预流失客户(${array.wastage}天未到店)`,val:2},
            {name:`活跃客户(${array.brisk}天到过店)`,val:3},
          ]
          this.customerActive = list;
        }
      })
      .catch(error => {
        console.log("settingList no");
      });
    },
    // 取消
    CancelClick() {
      this.centerDialogVisible = false;
      this.ReturnLIstIsShow = false;
    },
    // 提交
    SubmitClick() {
      console.log(this.textData);
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 展开
    MoreClick() {
      this.FormBoxIsShow = !this.FormBoxIsShow;
    },
    regionsChange(type, regionsId){
      getRegionsList({
        regionsId,
      }).then(res=>{
        if(res.status == 0){
          if(type == 'China'){
            this.provinceList = res.data.list
          }
          if(type == 'province'){
            this.cityList = res.data.list
          }
          if(type == 'city'){
            this.regionList = res.data.list
          }
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

        // getStoreMembers({ storeId: this.condition.storeId, s_id: this.condition.storeId }).then(res =>{
        //     if(res.status == 0){
        //         let _tmp = res.data
        //         this.staffList = _tmp.filter(item => item.role_id === 3 || item.role_id === 4 )
        //     }
        // })


        this.settingList();
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
  },

  watch: {
    dateTime(c,o){
      this.condition.consumptionStart = c[0]
      this.condition.consumptionEnd = c[1]
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    //获取地区
    this.regionsChange('China', 1)
    // this.settingList();
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

    //顾问
    this.$postRequest("/post/api/store/getStoreMembers",{
      role_id:3,
    }).then(res => {
      this.doctorList =res.data
    })
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.CustomerAnalysis {
  margin: 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    span {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #999999;
      margin-left: 16px;
      i {
        font-style: normal;
        color: #333;
      }
    }
  }
  .box {
    width: 100%;
    margin-top: 14px;
    margin-bottom: 40px;
    padding-bottom: 20px;
    .xiao_fei{
      border: 1px solid #e5e5e5;
      display: flex;
      border-radius: 5px;
      padding-left:10px;
      align-items: center;
      .text{
        color: #999;
      }
      em{
        width: 1px;
        height: 10px;
        background: #E5E5E5;
        margin:0 10px;
      }
      .xiao_fei_box{
        display: flex;
        align-items: center;
        p{
          display: flex;
          align-items: center;
          i{
            font-size: 12px;
          }
        }
        b{
          font-weight: normal;
          margin: 0 10px;
        }
      }
    }
    .xiaofeiBox {
      display: inline-block;
      border-radius: 5px;
      margin-right: .1rem;
      height: 32px;
      line-height: 32px;
      width: 260px;
      border: 1px solid #e5e5e5;
      padding-left: .1rem;
      .text {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .input {
        width: 30%;
        float: left;
        margin-left: 0.1rem;
        i {
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
        }
        input {
          width: 70%;
          height: 100%;
          border: none;
        }
      }
    }
  }

  .MagessBox {
    padding: 0 0.2rem;
    .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

      span {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .infoBox {
      padding-left: 0.33rem;
      padding-top: 0.2rem;
      span {
        .iconStyle {
          font-style: normal;
          color: #ec414d;
          margin-right: 0.05rem;
        }
      }
      .texta {
        display: flex;
        .input {
          height: 80px;
          width: 74%;
          border: 1px solid #e5e5e5;
          padding: 0.14rem;
          overflow: hidden;
          border-radius: 5px;

          textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 0.14rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .buttom {
      padding: 0.2rem 0;
      display: flex;
      justify-content: flex-end;

      div {
        cursor: pointer;
        width: 0.56rem;
        height: 32px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .cancel {
        border: 1px solid rgba(192, 192, 192, 1);
        margin-right: 0.2rem;
      }

      .submit {
        background: rgba(13, 201, 229, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
<style>
.ClientList .affirm {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ClientList .affirm em {
  width: 1px;
  height: 10px;
  background: #333;
  margin: 0 0.1rem;
}
.ClientList .affirm a {
  cursor: pointer;
}
.CustomerAnalysis .xiao_fei .el-input__inner{
  border: 0;
  padding: 0;
}
</style>