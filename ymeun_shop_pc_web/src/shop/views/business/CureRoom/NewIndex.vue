<template>
    <div class="CureRoom">
      <div class="top">
          <h5>{{switchButton ? '治疗间列表页' : '治疗间管理页面'}}</h5>
          <div class="form">
              <div class="select">
                  <el-select v-model="form.roomId" placeholder="全部房间" clearable>
                    <el-option
                        v-for="item in betweenTheTreatmentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-show="item.open != 2">
                    </el-option>
                </el-select>
              </div>
              
              <div class="select">
                  <el-select v-model="form.status" placeholder="全部状态" clearable>
                    <el-option label="开启" value="2"></el-option>
                    <el-option label="空闲" value="1"></el-option>
                </el-select>
              </div>

              <div class="select">
                  <el-select v-model="form.technicianId" :placeholder="`选择${$store.getters.roleName.technician}`" readonly="" clearable>
                      <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value" :value="item.key"></el-option>
                  </el-select>
              </div>
              
            <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
            <el-button type="primary" class="h32px" @click="$router.push({name : 'CureRoomReservationInformation'})" v-show="switchButton">预约信息</el-button>
            <el-button type="danger" class="botton h32px" @click="RoomManageMent" v-if="switchButton">治疗间管理</el-button>
            <el-button type="danger" class="botton h32px" @click="openDialog(false)" v-else>新增治疗间</el-button>

          </div>
      </div>
      <div class="list" v-loading="loading">

          <div class="li" v-for="(item, index) in domeList" :key="index" v-show="item.open == 1">
              <div class="upper">
                  <div class="room">
                      <i  class="iconfont iconfangjian" :class="{colorGreen : item.status == 2}"></i>
                  </div>
                  <div class="roomName">
                      <div class="nameAndStatus">
                          <div class="name">{{item.name}}</div>
                          <div class="status" :class="{ colorGreen : item.status == 2}">{{item.status == 1 ? '空闲中' : '开启中'}}</div>
                      </div>
                      <div class="remarks">
                        <el-tooltip class="item" effect="light" :content="item.describe" placement="top">
                            <span>{{item.describe}}</span>
                        </el-tooltip>
                      </div>
                  </div>
              </div>

              <div class="li_in">

                  <div class="open" v-if=" item.status == 2">
                    <div class="box">
                        <div class="img" :style="'background: url(' + item.customer.headimg + ') no-repeat center/100%'" v-if="item.customer.headimg"></div>
                        <div class="img" :style="'background: url(' + (item.customer.sex == 0 ? imgUrl.imgGirl : imgUrl.imgBoy) + ') no-repeat center/100%'" v-else></div>
                        <div class="info">
                            <div class="customerName">{{item.customer.name}}</div>
                            <div class="time">
                                <div class="left">{{$store.getters.roleName.technician}}：{{item.technician_name}}</div>
                                <div class="left">剩余时间：<span>{{item.dis}}</span></div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="colse" v-else>房间未开启</div>
                <div class="ButtonGroup" v-if="switchButton">
                    <div class="buttonOpen" v-if="item.status == 2">
                        <div class="gray" @click="openPopup('End',item)"><i class="iconfont iconjieshu"></i>结束使用</div>
                        <em></em>
                        <div class="gray" @click="openPopup('details',item)"><i class="iconfont iconhtmal5icon28"></i>进入详情</div>
                        <div class="blue"  @click="openPopup('increase',item)">增加时间</div>
                    </div>
                    <div class="buttonOpen" v-else>
                        <div class="gray" @click="openPopup('open',item)"><i class="iconfont iconkaiqi"></i>开启房间</div>
                        <div class="blue" @click="openPopup('isApp',item)">预约房间</div>
                    </div>
                </div>

                <div class="ButtonGroup" v-else>
                    <div class="buttonOpen">
                        <div class="gray" @click="openDialog(true,item)"><i class="iconfont iconxiugaiziliao"></i>修改信息</div>
                        <div class="blue" @click="openPopup('increase',item)" v-if="item.status == 2">增加时间</div>
                        <div class="blue" @click="openPopup('delete',item)" v-else >删除房间</div>
                    </div>
                </div>
              </div>
          </div>
          <div class="li" style="visibility: hidden"></div>
          <div class="li" style="visibility: hidden"></div>
          <div class="li" style="visibility: hidden"></div>
      </div>


      <div class="closeBox">
        <!-- 结束使用 -->
        <el-dialog
        title="提示"
        :visible.sync="endUse"
        width="20%">
            <el-alert :title="isDelete ? '此治疗间治疗时间未结束，确定结束使用？' : '确定删除房间吗?'" type="warning" show-icon :closable="false"> </el-alert>
            <span slot="footer" class="dialog-footer">
                <el-button @click="endUse = false">取 消</el-button>
                <template v-if="Determine">
                    <el-button type="primary" @click="endDetermine" v-if="isDelete">确 定</el-button>
                    <el-button type="primary" @click="blockUp" v-else>确 定</el-button>
                </template>
                <el-button type="primary" disabled v-else>提交中...</el-button>
            </span>
        </el-dialog>

        <!-- 增加时间 -->
        <el-dialog
            title="增加使用时间"
            :visible.sync="IncreaseTime"
            width="25%"
            v-if="customerData" >
            <div class="timeData">
                <div class="box">
                    <div class="img" :style="'background: url(' + customerData.headimg + ') no-repeat center/100%'" v-if="customerData.headimg"></div>
                    <div class="img" :style="'background: url(' + (customerData.sex == 0 ? imgUrl.imgGirl : imgUrl.imgBoy) + ') no-repeat center/100%'" v-else></div>
                    <div class="info">
                        <div class="customerName">{{customerData.name}}</div>
                        <div class="time">
                            <div class="left">{{$store.getters.roleName.technician}}：{{roomData.technician_name}}</div>
                        </div>
                    </div>
                </div>
                <el-input type="number" placeholder="输入治疗时长" v-model="roomTimeData.useTime">
                    <template slot="append">分钟</template>
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="IncreaseTime = false">取 消</el-button>
                <el-button type="primary" @click="TimeDetermine" v-if="Determine">确 定</el-button>
                <el-button type="primary" disabled v-else>提交中...</el-button>
            </span>
        </el-dialog>
      </div>




        <!-- 开启治疗间 -->
        <el-dialog title="开启治疗间" :visible.sync="openSwitchAlert" width="30%">
            <el-form :model="openDataObj" :rules="rules" label-width="120px">
                <em class="em">*</em>
                <el-form-item label="客户姓名">
                    <div class="kaiqiBox">
                        <auto-search-client-stride @changed="myChanged" class="wb100" :initValue="''"></auto-search-client-stride>
                    </div>
                </el-form-item>
                <el-form-item :label="$store.getters.roleName.technician" prop="technicianId" >
                    <el-select v-model="openDataObj.technicianId" :placeholder="`选择${$store.getters.roleName.technician}`" class="wb100" readonly=""  clearable>
                        <el-option key label="请选择" value></el-option>
                        <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预计治疗时长" prop="roomUseTime">
                    <el-input placeholder="输入治疗时长" v-model="openDataObj.roomUseTime">
                        <template slot="append">分钟</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openSwitchAlert = false">取 消</el-button>
                <el-button type="primary" @click="OpenTreatment" v-if="Determine">确 定</el-button>
                <el-button type="primary" disabled v-else>提交中...</el-button>
            </span>
        </el-dialog>





        <!--   添加&修改治疗间弹窗   -->
        <el-dialog :title=" isEdit ? '修改治疗间' : '添加治疗间' " :visible.sync="dialogEditCureRoom" width="400px">
            <el-form :model="dialogEditCureRoomParam" inline="true">
                <b class="fc-red lh38px">*</b>
                <el-form-item label="房间名称">
                    <el-input v-model="dialogEditCureRoomParam.name" placeholder="请输入房间名" class="w240px"></el-input>
                </el-form-item>
                <el-form-item label="房间备注">
                    <el-input type="textarea" v-model="dialogEditCureRoomParam.describe" placeholder="请输入备注" class="w240px mal5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditCureRoom = false">取 消</el-button>
                <el-button type="primary" @click="addRoom"  v-if="Determine">确 定</el-button>
                <el-button type="primary" disabled v-else>提交中...</el-button>
            </div>
        </el-dialog>



        <!-- 预约房间 -->
        <el-dialog title="预约房间" :visible.sync="isShowAppointment" width="35%">
            <div class="appDataBox">
                <div class="app_box">
                    <div class="appBox_div" >
                        <el-form :model="AppOpenData" :rules="rules" >
                            <el-form-item label="客户姓名" >
                                <auto-search-client-stride @changed="myChanged" class="wb100" :initValue="''"></auto-search-client-stride>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="appBox_div">
                        <el-form :model="AppOpenData"  :rules="rules">
                            <!-- <el-form-item label="联系电话" prop="reserveTime"> -->
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
                        <el-form :model="AppOpenData"  :rules="rules">
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
                <el-button type="primary" @click="AddCureRoom" v-if="Determine">确认预约</el-button>
                <el-button type="primary" disabled v-else>提交中...</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {CureRoomeList , CureRoomeTime ,CureRoomeAddReserve,CureRoomRecord,DeductionLIst} from '@/shop/assets/api/cureRoom/cureRoom';
    import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride';
    import { therapeuticRoomDel, therapeuticRoomEnable, therapeuticRoomAdd, therapeuticRoomEdit, getTreatmentRoomList ,OpenCloseTreatment } from "@/shop/assets/api/common/common";
    export default {
        name: "CureRoom",
        components: {autoSearchClientStride},
        data() {
            return {
                imgUrl:{
                    imgBoy:require('@/shop/assets/img/boy.png'),
                    imgGirl:require('@/shop/assets/img/girl.png')
                },
                value:'',
                form:{},
                roomData:{},
                customerData:{},
                roomTimeData:{
                    id:'',
                    useTime:'',
                },
                openDataObj:{},
                AppOpenData:{},
                continue:"",
                customerMobile:'',
                RecordList:[],
                DeduList:[],
                dialogEditCureRoomParam: {},
                rules:{
                    adviserId: [{required: true, message: `${this.$store.getters.roleName.adviser}必选`, trigger: 'change'}],
                    technicianId: [{required: true, message: `${this.$store.getters.roleName.technician}必选`, trigger: 'change'}],
                    reserveTime: [{required: true, message: '时间必选', trigger: 'change'}],
                    reserveNum: [{required: true, message: '使用时长必填', trigger: 'change'}],
                    roomUseTime: [{required: true, message: '治疗时长必填', trigger: 'blur'}],
                    reserveTime: [{required: true, message: '电话必填', trigger: 'change'}],
                },
                domeList:[],
                betweenTheTreatmentList:[],
                Determine: true,
                loading:false,
                endUse:false,
                IncreaseTime:false,
                openSwitchAlert:false,
                switchButton:true,
                dialogEditCureRoom: false,
                isShowAppointment: false,
                isEdit: false,
                isDelete: false,
            }
        },
        methods: {

            // 开始使用治疗间获取顾客ID
            myChanged(data){
                data.kw = '';
                console.log(data);
                data.list.forEach(v => {
                    this.openDataObj.customerId = v.id;
                    this.AppOpenData.customerId = v.id;
                    this.customerMobile = v.mobile;
                    this.$forceUpdate();
                    v = '';
                });
                if (this.AppOpenData.customerId) {
                    console.log(123123);
                    this.DeductionLIstData();
                }
            },

            // 治疗间管理
            RoomManageMent() {
                this.switchButton = false;
                this.loadData();
            },

            

            // 治疗间列表
            CureRoomeList() {
                this.loading= true;
                CureRoomeList(this.form).then(res => {
                    // console.log(res);
                    if (res.status == 0) {
                        this.domeList = res.data;
                        this.loading= false;
                    }
                });
                CureRoomeList().then(res => {
                    // console.log(res);
                    if (res.status == 0) {
                        this.betweenTheTreatmentList = res.data;
                    }
                });
            },

            // 筛选
            loadData() {
                this.IncreaseTime = false;
                this.endUse = false;
                this.openSwitchAlert = false;
                this.dialogEditCureRoom = false;
                this.isShowAppointment = false;
                this.openDataObj = {};
                this.CureRoomeList();
            },

            // 打开弹窗
            openPopup(type,item) {
                this.customerMobile = '';
                this.Determine = true;
                this.roomData = item;
                this.roomTimeData.id = item.id;
                this.customerData = item.customer;
                if (type == 'open') {
                    this.openSwitchAlert = true;
                }else if (type == 'increase') {
                    this.IncreaseTime = true;
                }else if (type == 'End') {
                    this.endUse = true;
                    this.isDelete = true;
                }else if (type == 'delete') {
                    this.endUse = true;
                    this.isDelete = false;
                }else if (type == 'isApp') {
                    this.isShowAppointment = true;
                    this.CureRoomRecordData();
                }else if (type == 'details') {
                    this.$router.push({
                        name:'CureRoomDetails',
                        query:{
                            customerId : item.customer.id,
                            roomId:item.id,
                        }
                    })
                }
            },

            // 修改&新增治疗间弹窗
            openDialog(isEdit, item){
                this.Determine = true;
                if(isEdit){
                    this.dialogEditCureRoomParam = JSON.parse(JSON.stringify(item));
                }else{
                    this.dialogEditCureRoomParam = {}
                }
                this.isEdit = isEdit
                this.dialogEditCureRoom = true
            },

            // 预约时间
            datetimeChange(value){
                if(value != null)
                {
                    let tmp = this.$base.dateTimeToDate(value,'date');
                    this.AppOpenData.reserveTime = tmp;
                }
            },

            // 结束使用治疗间
            endDetermine() {
                let objData = {
                    status : this.roomData.status,
                    roomId : this.roomData.id
                }
                this.Determine = false;
                OpenCloseTreatment(objData).then (res => {
                    if (res.status == 0) {
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
                });
            },

            // 增加使用治疗间时间
            TimeDetermine() {
                this.Determine = false;
                CureRoomeTime(this.roomTimeData).then(res => {
                    console.log(res);
                    if (res.status == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration:'1500',
                            onClose:() => {
                                this.roomTimeData.useTime = '';
                                this.loadData();
                            }
                        });
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration:'1500',
                            onClose:() => {
                                this.loadData();
                            }
                        });
                    }
                });
            },

            
            // 开启使用治疗间
            OpenTreatment() {
                this.openDataObj.roomId = this.roomData.id;
                this.openDataObj.status = this.roomData.status;
                let DataObj = this.openDataObj;
                this.Determine = false;
                if (DataObj.customerId != '' && DataObj.technicianId != '' && DataObj.roomUseTime != '') {
                    OpenCloseTreatment(DataObj).then (res => {
                        if (res.status == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success',
                                duration:'1500',
                                onClose:() => {
                                    this.loadData();
                                }
                            });
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'error',
                                duration:'1500',
                                onClose:() => {
                                    this.Determine = true;
                                }
                            });
                        }
                    });
                }else {
                    this.$message({
                        message: '请检查表单',
                        type: 'error',
                        duration:'1300',
                        onClose:() => {
                            this.Determine = true;
                        }
                    });
                }
            },


            // 新增&修改治疗间
            addRoom(){
                this.Determine = false;
                if(this.isEdit){
                    therapeuticRoomEdit({name: this.dialogEditCureRoomParam.name, describe: this.dialogEditCureRoomParam.describe, id: this.dialogEditCureRoomParam.id}).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '修改治疗间成功',
                                type: 'success',
                                duration:'1500',
                                onClose:() => {
                                    this.loadData();
                                }
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error',
                                duration:'1500',
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
                            duration:'1500',
                            onClose:() => {
                                this.Determine = true;
                            }
                        });
                    })

                }else{
                    therapeuticRoomAdd({name: this.dialogEditCureRoomParam.name, describe: this.dialogEditCureRoomParam.describe}).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '新增治疗间成功',
                                type: 'success',
                                duration:'1500',
                                onClose:() => {
                                    this.loadData();
                                }
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                                duration:'1500',
                                onClose:() => {
                                    this.Determine = true
                                }
                            });
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                            duration:'1500',
                            onClose:() => {
                                this.Determine = true
                            }
                        });
                    })
                }
            },


            // 删除(停用)治疗间
            blockUp(){
                let item = this.roomData;
                therapeuticRoomDel({id:item.id}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '删除治疗间成功',
                            type: 'success',
                            duration:'1500',
                            onClose:() => {
                                this.loadData()
                            }
                    });
                    }else{
                        this.$message({
                            showClose: true,
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


            // 治疗间预约历史记录
            CureRoomRecordData() {
                CureRoomRecord({roomId:this.roomData.id}).then(res => {
                    if (res.status == 0) {
                        
                        this.RecordList = res.data;
                    }
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })
            },

            // 治疗间预约划扣项目
            DeductionLIstData() {
                DeductionLIst({customer_id:this.openDataObj.customerId}).then(res => {
                    if (res.status == 0) {
                        res.data.list.forEach(v => {
                            v.inputNumBer = 0;
                        });
                        this.DeduList = res.data.list;
                    }
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })
            },


            // 预约治疗间
            AddCureRoom() {
                let consumeItems = [];
                if (this.DeduList.length) {
                    this.DeduList.forEach(v => {
                        if (v.inputNumBer > 0) {
                            consumeItems.push({
                                num:v.inputNumBer,
                                receipt_id:v.id
                            })
                        }
                    });
                }
                this.AppOpenData.roomId = this.roomData.id;
                if (consumeItems.length) {
                    this.AppOpenData.consumeItems = JSON.stringify(consumeItems);
                }
                if (!this.AppOpenData.customerId) {
                    this.$message({
                        message: '输入客户姓名',
                        type: 'error',
                        duration:'1500',
                    });
                    return;
                }
                if (!this.AppOpenData.reserveTime) {
                    this.$message({
                        message: '请选择预约时间',
                        type: 'error',
                        duration:'1500',
                    });
                    return;
                }
                if (!this.AppOpenData.adviserId) {
                    this.$message({
                        message: `请选择${this.$store.getters.roleName.adviser}`,
                        type: 'error',
                        duration:'1500',
                    });
                    return;
                }
                if (!this.AppOpenData.reserveNum) {
                    this.$message({
                        message: '请输入治疗时长',
                        type: 'error',
                        duration:'1500',
                    });
                    return;
                }

                this.Determine = false;
                this.AppOpenData.continue = this.continue
                CureRoomeAddReserve(this.AppOpenData).then(res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration:'1500',
                            onClose:() => {
                                this.loadData()
                            }
                        });
                    }
                    else if(res.status == 40091){
                        this.$confirm("该客户今天已经预约，确认需要再次预约？", '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.continue = 1
                            this.AddCureRoom()
                            this.disabled = false
                        }).catch(() => {
                            this.disabled = false
                        });
                    }
                    else {
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
            }




        },
        watch: {},
        // 挂载结束状态
        mounted() {
            this.switchButton = this.$route.query.isSwitch;
            this.CureRoomeList();
        },

    }

</script>
<style scoped lang="scss">
@import './NewIndex.scss';
</style>
<style>
    .el-button--danger {
        background-color: #FF5722;
        border-color: #FF5722;
    }
    .el-input-group--append .el-input__inner {
        padding-right: 0;
    }
    .el-alert--warning.is-light {
        background-color: #fff;
    }
    .timeData .box {
        display: flex;
        align-items: center;
        margin-bottom: .2rem;
    }
    .timeData .box .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .timeData .box .info {
        margin-left: .16rem;
        font-family: PingFang SC;
        font-weight: 500;

    }
    .timeData .box .info  .customerName {
        font-size: .16rem;
        color: #333;
        margin-bottom: .1rem;
        text-align: left;
    }
    .timeData .box .info  .time {
        width: 100%;
        text-align: left;
    }
    .timeData .box .info  .time .left {
        font-size: .14rem;
        color: #999;
    }
    .timeData .box .info  .time .left span {
        color: #FF5722;
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
<style>
.alertBox .el-dialog__body { padding: 10px 10px!important;}
.kaiqiBox .el-autocomplete {display: block;}

.em {
    color: #f56c84;
    position: absolute;
    left: 11%;
    top: 28%;
    font-style: normal;
}
</style>