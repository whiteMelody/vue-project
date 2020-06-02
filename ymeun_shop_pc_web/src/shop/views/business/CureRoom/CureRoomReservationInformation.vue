<template>
  <div class="addListBox" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>治疗间预约页面</header>

    <div class="listBox">
      <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" :isAutoLoad="true">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item>
            <!-- <auto-search-client @changed="myChanged" ref='autoSearch'></auto-search-client> -->
            <auto-search-client-stride @changed="myChanged" class="wb100" :initValue="''"></auto-search-client-stride>
          </el-form-item>

          <el-form-item label>
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item>

          <el-form-item>
            <el-select v-model="condition.technicianId" :placeholder="`选择${$store.getters.roleName.technician}`" readonly clearable>
              <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value" :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="condition.roomId" placeholder="选择房间" readonly clearable>
              <el-option
                  v-for="item in domeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


          <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          <el-button type="primary" class="h32px" @click="$router.push({name:'CureRoom',query:{isSwitch:true}})">治疗间列表</el-button>
          <el-button type="danger" class="botton h32px fr" @click="$router.push({name:'CureRoom',query:{isSwitch:false}})">治疗间管理</el-button>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="review_time" type="index" :index="indexMethod" align="center" label="序号" width="100px"></el-table-column>
          <el-table-column prop="type" align="center" label="预约时间">
            <template slot-scope="scope">{{ scope.row.reserve_time }}</template>
          </el-table-column>
          <el-table-column prop="customer_name" align="center" label="预约客户">
            <template slot-scope="scope">
              <!-- <el-link :underline="false" @click="$router.push({name: 'ClientDel',query:{ id: scope.row.customer_id, types:'5'}})">{{ scope.row.customer.name }}</el-link> -->
              {{ scope.row.customer.name }}
            </template>
          </el-table-column>
          <el-table-column prop="channel" align="center" label="联系电话">
            <template slot-scope="scope">{{ scope.row.customer.mobile }}</template>
          </el-table-column>
          <el-table-column prop="across" align="center" label="预约房间">
            <template slot-scope="scope">{{ scope.row.room.name }}</template>
          </el-table-column>
          <el-table-column prop="customer_mobile" align="center" :label="`预约${$store.getters.roleName.technician}`">
            <template slot-scope="scope">{{ scope.row.technician.name }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <div class="box" style="display:flex; align-items: center; justify-content: center;" v-if="scope.row.status == 0">
                <p class="buttonStyle_class" @click="openPopup('modify',scope.row)">修改预约</p>
                <em style="width:1px; height:10px; margin: 0 10px; background-color:#e5e5e5;"></em>
                <p class="buttonStyle_class" @click="openPopup('close',scope.row)">取消预约</p>
              </div>
              <p class="buttonStyle_class" @click="openPopup('close',scope.row)" v-else-if="scope.row.status == 1">取消预约</p>
              <p class="buttonStyle" v-else>已取消</p>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>



    
    <!-- 修改预约 -->
    <el-dialog title="修改预约" :visible.sync="isShowAppointment" width="35%">
        <div class="appDataBox">
            <div class="app_box">
                <div class="appBox_div">
                    <el-form :model="AppOpenData" :rules="rules">
                        <el-form-item label="客户姓名">
                            <auto-search-client-stride @changed="myChanged" class="wb100" :initValue="''"></auto-search-client-stride>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="appBox_div">
                    <el-form :model="AppOpenData" :rules="rules">
                        <el-form-item label="联系电话">
                            <el-input v-model="customerMobile" placeholder="请输入客户联系电话" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="appBox_div">
                    <el-form :model="AppOpenData" :rules="rules">
                        <el-form-item label="预约时间" prop="reserveTime" >
                            <el-date-picker
                                v-model="AppOpenData.reserveTime"
                                :clearable="false"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"
                                @change='datetimeChange'>
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="appBox_div">
                    <el-form :model="AppOpenData" :rules="rules">
                        <el-form-item :label="$store.getters.roleName.adviser" prop="adviserId" >
                            <el-select v-model="AppOpenData.adviserId" :placeholder="'选择'+$store.getters.roleName.adviser" clearable>
                                <el-option key label="请选择" value></el-option>
                                <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value" :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="appBox_div">
                    <el-form :model="AppOpenData" :rules="rules">
                        <el-form-item label="使用时长" prop="reserveNum" >
                            <el-input placeholder="输入治疗时长(分钟)" v-model="AppOpenData.reserveNum"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="DeductionBox">
                <div class="title">划扣项目</div>
                <template v-if="DeduList.length">
                    <div class="DedList" v-for="(item, index) in DeduList" :key="index">
                        <div class="textNum">{{item.items_name}}   x{{item.shengyu}}</div>
                        <div class="jishuqi">
                            <el-input-number v-model="item.inputNumBer" :min="0" :max="item.shengyu" :step="1"></el-input-number>
                        </div>
                    </div>
                </template>
                <div class="NoTime" v-else>暂无数据</div>
            </div> -->

            <div class="DeductionInFo">
                <div class="title">预约信息</div>
                <template v-if="RecordList.length">
                    <div class="DeaListX" v-for="(item, index) in RecordList" :key="index"> <i class="iconfont iconyuyue"></i> {{item.reserve_time}} —  {{item.reserve_end_time}}</div>
                </template>
                <div class="NoTime" v-else>此治疗间暂无预约信息</div>
            </div>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShowAppointment = false">取 消</el-button>
            <el-button type="primary" @click="AddCureRoom" v-if="Determine">确认修改</el-button>
            <el-button type="primary" disabled v-else>提交中...</el-button>
        </span>
    </el-dialog>


    <!--   取消预约   -->
    <el-dialog title="取消原因" :visible.sync="dialogEditCureRoom" width="400px">
        <el-form :model="closeObj">
            <el-form-item label="">
                <el-input type="textarea" v-model="closeObj.describe" placeholder="请输入取消原因..."></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditCureRoom = false">取 消</el-button>
            <el-button type="primary" @click="addRoom"  v-if="Determine">确 定</el-button>
            <el-button type="primary" disabled v-else>提交中...</el-button>
        </div>
    </el-dialog>


  </div>
</template>
<script>
//日期范围组件
import dateSlot from "@/shop/components/date/dateSlot";
import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride';
import {appointmentList,CureRoomeList,closeApp,CureRoomModify,DeductionLIst,CureRoomModifyData} from '@/shop/assets/api/cureRoom/cureRoom';
export default {
  name: "CureRoomReservationInformation",
  data() {
    return {
      boxMaxHeight:"",
      dateTime:[],
      condition:{},
      // 查询条件
      demoList: [],
      pageSearch: appointmentList, // 分页查询api接口
      domeList:[],
      customerMobile:'',
      isShowAppointment:false,
      dialogEditCureRoom:false,
      AppOpenData:{
        customerId:'',
        reserveTime:'',
        adviserId:'',
        reserveNum:''
      },
      AddData:'',
      closeObj:{
        describe:''
      },
      // CustomerItems:[],
      // DeduList:[],
      RecordList:[],
      rules:{
          adviserId: [{required: true, message: `${this.$store.getters.roleName.adviser}必选`, trigger: 'change'}],
          reserveTime: [{required: true, message: '时间必选', trigger: 'change'}],
          reserveNum: [{required: true, message: '使用时长必填', trigger: 'change'}],
          roomUseTime: [{required: true, message: '治疗时长必填', trigger: 'blur'}],
          // reserveTime: [{required: true, message: '电话必填', trigger: 'change'}],
      },
      Determine:true,
    };
  },
  components: {
    dateSlot,
    autoSearchClientStride
  },
  methods: {
    // 预约时间
    datetimeChange(value){
        if(value != null)
        {
            let tmp = this.$base.dateTimeToDate(value,'date');
            this.AppOpenData.reserveTime = tmp;
        }
    },
    indexMethod(index) {
      return index + 1;
    },
    openPopup(type,item) {
      this.AddData = item;
      if (type == 'close') {
        this.dialogEditCureRoom = true;
        this.closeObj.describe = '';
      }else if (type == 'modify') {
          this.isShowAppointment = true;
          this.CureRoomModifyData();
      }
    },
    // 治疗间列表
    CureRoomeList() {
        this.loading= true;
        CureRoomeList().then(res => {
            // console.log(res);
            if (res.status == 0) {
                this.domeList = res.data;
                this.loading= false;
            }
        });
    },
    myChanged(data){
        data.kw = '';
        data.list.forEach(v => {
          this.condition.customerId = v.id;
          this.customerMobile = v.mobile;
        });
    },
    loadData() {
      this.Determine = true;
      this.isShowAppointment = false;
      this.dialogEditCureRoom = false;
      this.$refs.demoTable.loadData();
    },
    CureRoomModifyData () {
        CureRoomModify({id:this.AddData.id}).then(res => {
            if (res.status == 0) {
                this.customerMobile = res.data.customer.mobile;
                this.AppOpenData.customerId = res.data.customer.id;
                this.AppOpenData.reserveTime = res.data.reserve_time;
                this.AppOpenData.adviserId = res.data.adviser_id;
                this.AppOpenData.reserveNum = res.data.reserve_num;
                // this.CustomerItems = JSON.parse(res.data.consume_items);
                this.RecordList = res.data.reserve_times;
                this.DeductionLIstData(res.data.customer.id);
            }
        });
    },
    // 治疗间预约划扣项目
    // DeductionLIstData(id) {
    //     DeductionLIst({customer_id:id}).then(res => {
    //         if (res.status == 0) {
    //             if (res.data.list.length) {
    //                 res.data.list.map((item,index) => {
    //                     item.inputNumBer = 0;
    //                 });
    //                 // res.data.list.map((item,index) => {
    //                 //     this.CustomerItems.forEach( v => {
    //                 //         if (item.id == v.receipt_id) {
    //                 //             item.inputNumBer = v.num;
    //                 //         }
    //                 //     });
    //                 // });
    //                 this.DeduList = res.data.list;
    //             }else {
    //                 this.DeduList = [];
    //             }
    //         }
    //     }).catch(error=>{
    //         this.$message({
    //             showClose: true,
    //             message: error,
    //             type: 'error',
    //         });
    //     })
    // },
    AddCureRoom() {
        // let consumeItems = [];
        // if (this.DeduList.length) {
        //     this.DeduList.forEach(v => {
        //         if (v.inputNumBer > 0) {
        //             consumeItems.push({
        //                 num:v.inputNumBer,
        //                 receipt_id:v.id
        //             })
        //         }
        //     });
        // }
        this.AppOpenData.roomId = this.AddData.room_id;
        this.AppOpenData.id = this.AddData.id;
        // if (consumeItems.length) {
        //     this.AppOpenData.consumeItems = JSON.stringify(consumeItems);
        // }
        this.Determine = false;
        CureRoomModifyData(this.AppOpenData).then(res => {
            if (res.status == 0) {
                this.$message({
                    message: res.msg,
                    type: 'success',
                    duration:'1500',
                    onClose:() => {
                        this.loadData()
                    }
                });
            }else {
                this.$message({
                    message: res.msg,
                    type: 'error',
                    duration:'1500',
                    onClose:() => {
                        this.loadData()
                    }
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
    addRoom() {
      this.Determine = false;
      console.log(this.AddData);
      this.closeObj.id = this.AddData.id;
      closeApp(this.closeObj).then(res => {
        console.log(res);
        if (res.status == 0 ) {
          this.$message({
              message: res.msg,
              type: 'success',
              duration:'1300',
              onClose:() => {
                  this.loadData();
              }
          });
        }else {
          this.$message({
              message: res.msg,
              type: 'error',
              duration:'1300',
              onClose:() => {
                  this.loadData();
              }
          });
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
      this.CureRoomeList()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },
  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {
    dateTime(c, o) {
      this.condition.startTime = c[0];
      this.condition.endTime = c[1];
    }
  }
};
</script>
<style>
  .addListBox {
    margin: 0.2rem 0.24rem;
    padding: 0 0.2rem;
    background-color: #fff
  }
  header {
      height: 50px;
      line-height: 50px;
      font-size: 0.16rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #333333;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
  }
  .appDataBox {
    height: 100%;
  }
  .appDataBox .app_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .app_box .appBox_div div {
    display: flex;
  }
  .appBox_div .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 185px!important;
  }
  .DeductionBox .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e5e5e5;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1)
  }
  .DeductionBox .DedList {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
  }

  .DeductionBox .DedList .textNum {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
  }

  .DeductionBox .NoTime {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(153,153,153,1);
      height: 100px;
      text-align: center;
      line-height: 100px;
      border-bottom: 1px solid #e5e5e5;
  }

  .DeductionInFo .title{
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      margin-top: 19px;
  }
  .DeductionInFo .DeaListX{
      margin-top: 19px;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
  }
  .DeductionInFo .DeaListX i{
      color: #999999;
      font-size: 16px;
  }

  .DeductionInFo .NoTime {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(153,153,153,1);
      height: 100px;
      text-align: center;
      line-height: 80px;
  }
</style>


    
