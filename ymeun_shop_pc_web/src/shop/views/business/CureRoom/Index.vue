<template>

    <div class="wb100 f14px bg-white1">
        <div class="pal24 par24 pat20 pab20">
            <div class="wb100 bg-white" :style="'min-height: '+boxMaxHeight+'px;'">
                <div class="wb100">
                    <p class="lh50px h50px pal19 par19">
                        <span class="fl f16px fc-gray4">治疗间列表</span>
                    </p>

                    <div class="pal9 par9">

                        <div class="pal10 par10">
                            <div class="clear0 bd-gray bd-b1"></div>
                            <div class="clear2"></div>
                            <el-button type="primary" @click="openDialog(false)">添加治疗间</el-button>
                            <div class="clear2"></div>
                        </div>


                        <!--   列表   -->
                        <div class="wb100">
                            <template v-for="(item,index) in list">
                                <div class="wb20 fl" v-if="item.open == 1">
                                    <div class="pa10">
                                        <div class="pa20 fc-gray3  bg-white1">
                                            <p class=" h30px lh30px">
                                                <el-tooltip v-if="item.describe != ''" class="item" effect="dark" :content="item.describe" placement="top">
                                                    <span class="fl f18px h36px text-over-hidden1 wb80">{{item.name}}({{item.describe}})</span>
                                                </el-tooltip>
                                                <span v-else class="fl f18px h36px text-over-hidden1 wb80">{{item.name}}({{item.describe}})</span>
                                                <i class="iconfont iconguanbi1 fr mal20 f14px pointer" v-if="item.open == 1" @click="blockUp(item)"></i>
                                                <i class="iconfont icongouxuan fr mal20 f14px pointer" v-else @click="blockDown(item)"></i>
                                                <i class="iconfont iconico_compile fr pointer" @click="openDialog(true,item)"></i>
                                            </p>
                                            <el-switch @change="switchChange(index)" :value="item.switchValue" active-color="#13ce66"></el-switch>
                                            <div class="clear2"></div>

                                            <template v-if="item.status == 1">
                                                <div class="h100px lh100px wb100 f24px fc-gray2 text-center">未使用</div>
                                            </template>
                                            <template v-else>
                                                <div class="h100px">
                                                    <div class="clear2"></div>
                                                    <div class="wb100 lh30px">
                                                        <p>客户：{{item.customer_name}}</p>
                                                        <p>
                                                            {{$store.getters.roleName.technician}}：{{item.technician_name}}
                                                            <span class="fl bd-t1 bd-gray wb100">剩余时间：<span class="fc-orange">{{item.dis}}</span></span>
                                                        </p>
                                                    </div>
                                                    <div class="clear2"></div>
                                                </div>
                                            </template>

                                            <div class="clear0"></div>

                                        </div>
                                    </div>
                                </div>

                            </template>
                        </div>

                        <div class="clear0"></div>

                        <!--   添加&修改治疗间弹窗   -->
                        <el-dialog :title=" isEdit ? '修改治疗间' : '添加治疗间' " :visible.sync="dialogEditCureRoom" width="400px">
                            <el-form :model="dialogEditCureRoomParam">
                                <el-form-item label="">
                                    <el-input v-model="dialogEditCureRoomParam.name" placeholder="请输入房间名"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-input v-model="dialogEditCureRoomParam.describe" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogEditCureRoom = false">取 消</el-button>
                                <template v-if="disabled">
                                    <el-button type="primary" disabled>提交中...</el-button>
                                </template>
                                <template v-else>
                                    <el-button type="primary" @click="addRoom">确 定</el-button>
                                </template>
                            </div>
                        </el-dialog>


                        <!-- 开始使用治疗间 -->
                        <el-dialog title="开启治疗间" :visible.sync="openSwitchAlert" width="30%">
                            <!-- <span>开启</span> -->
                            <el-form :model="openDataObj" :label-position="labelPosition" :rules="rules" label-width="120px">
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

                        <!-- 停止使用治疗间 -->
                        <div class="alertBox">
                            <el-dialog  title="提示" :visible.sync="closeSwitchAlert" width="23%">
                                <!-- <span>关闭</span> -->
                                <div class="alert">
                                    <el-alert
                                        title="此治疗间治疗时间未结束，确定关闭此治疗间？"
                                        type="warning"
                                        :closable="false"
                                        show-icon>
                                    </el-alert>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="closeSwitchAlert = false">取 消</el-button>
                                    <el-button type="primary" @click="CloseTreatment" v-if="Determine">确 定</el-button>
                                    <el-button type="primary" disabled v-else>提交中...</el-button>
                                </span>
                            </el-dialog>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { therapeuticRoomDel, therapeuticRoomEnable, therapeuticRoomAdd, therapeuticRoomEdit, getTreatmentRoomList ,OpenCloseTreatment } from "@/shop/assets/api/common/common";

    import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride'
    export default {
        name: "CureRoom",
        components: {autoSearchClientStride},
        data() {
            return {
                labelPosition: 'right',
                boxMaxHeight:"",
                dialogEditCureRoom: false,
                disabled: false,
                isEdit: false,
                Determine: true,
                dialogEditCureRoomParam: {},
                list: [],
                switchValueIndex:0,
                openSwitchAlert:false,
                closeSwitchAlert:false,
                rules:{
                    technicianId: [{required: true, message: `${this.$store.getters.roleName.technician}必选`, trigger: 'change'}],
                    roomUseTime: [{required: true, message: '治疗时长必填', trigger: 'blur'}],
                },
                openDataObj:{
                    customerId:'',
                    technicianId:'',
                    roomUseTime:'',
                    status:'',
                    roomId:''
                },
            }
        },
        methods: {
            myChanged(data){
                data.kw = '';
                data.list.forEach(v => {
                    this.openDataObj.customerId = v.id;
                });
            },
            OpenTreatment() {
                let DataObj = this.openDataObj;
                this.Determine = false;
                if (DataObj.customerId != '' && DataObj.technicianId != '' && DataObj.roomUseTime != '') {
                    OpenCloseTreatment(DataObj).then (res => {
                        if (res.status == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success',
                                duration:'1300',
                                onClose:() => {
                                    this.switchOpenAndClose();
                                }
                            });
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'error',
                                duration:'1300',
                                onClose:() => {
                                    this.openSwitchAlert = false;
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
            CloseTreatment() {
                let objData = {
                    status : this.openDataObj.status,
                    roomId : this.openDataObj.roomId
                }
                this.Determine = false;
                OpenCloseTreatment(objData).then (res => {
                    if (res.status == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration:'1300',
                            onClose:() => {
                                this.switchOpenAndClose();
                            }
                        });
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration:'1300',
                            onClose:() => {
                                this.closeSwitchAlert = false;
                                this.Determine = true;
                            }
                        });
                    }
                });
            },
            switchChange(index){
                this.switchValueIndex = index;
                let item = this.list[index].switchValue;
                this.openDataObj.status = this.list[index].status;
                this.openDataObj.roomId = this.list[index].id;
                this.openDataObj.technicianId = '';
                this.openDataObj.roomUseTime = '';
                if (item) {
                    this.closeSwitchAlert = true;
                }else {
                    this.openSwitchAlert = true;
                }
            },

            switchOpenAndClose() {
                this.list[this.switchValueIndex].switchValue = !this.list[this.switchValueIndex].switchValue;
                this.openSwitchAlert = false;
                this.closeSwitchAlert = false;
                this.Determine = true;
                this.loadData();
                this.$forceUpdate();
            },
            loadData(){
                //治疗间
                getTreatmentRoomList().then(res => {
                    if(res.status == 0){
                        this.$store.commit('SET_TREATMENTROOMLIST', res.data);
                        res.data.forEach(v => {
                            if (v.status == 1) 
                                v.switchValue = false;
                            else if (v.status == 2)
                                v.switchValue = true;
                        })
                        this.list = res.data
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

            openDialog(isEdit, item){
                if(isEdit){
                    this.dialogEditCureRoomParam = item
                }else{
                    this.dialogEditCureRoomParam = {}
                }
                this.isEdit = isEdit
                this.dialogEditCureRoom = true
            },

            blockUp(item){
                therapeuticRoomDel({id:item.id}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '停用治疗间成功',
                            type: 'success'
                        });
                        // item.open = 0
                        this.loadData()
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
            blockDown(item){
                therapeuticRoomEnable({id: item.id}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '启用治疗间成功',
                            type: 'success'
                        });
                        // item.open = 1
                        this.loadData()
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
            addRoom(){
                this.disabled = true
                if(this.isEdit){
                    therapeuticRoomEdit({name: this.dialogEditCureRoomParam.name, describe: this.dialogEditCureRoomParam.describe, id: this.dialogEditCureRoomParam.id}).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '修改治疗间成功',
                                type: 'success'
                            });
                            this.dialogEditCureRoom = false
                            this.loadData()
                            this.disabled = false
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.disabled = false
                    })

                }else{
                    therapeuticRoomAdd({name: this.dialogEditCureRoomParam.name, describe: this.dialogEditCureRoomParam.describe}).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '新增治疗间成功',
                                type: 'success'
                            });
                            this.dialogEditCureRoom = false
                            this.loadData()
                            this.disabled = false
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.disabled = false
                    })
                }
            },

        },
        watch: {

        },
        // 挂载结束状态
        mounted() {
            this.boxMaxHeight = window.innerHeight - 100;
            this.loadData()

        },

    }

</script>

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
<style scoped lang="scss">
</style>

