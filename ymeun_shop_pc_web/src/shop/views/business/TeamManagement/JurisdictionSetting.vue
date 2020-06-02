<template>

    <div class="wb100 f14px bg-white1 SetTarget">
        <div class="pal24 par24 pat20 pab20">
            <div class="pal19 par19 bg-white">
                <p class="lh50px h50px">
                    <span class="fl f16px fc-gray4">设置员工 <span class="fc-orange f16px">{{name}}</span> 权限</span>
                </p>

                <div class="clear bd-b1 bd-gray"></div>

                <div class="clear4"></div>

                <div class="wb100">

                    <el-form :inline="true" ref="form" :model="menu" label-width="200px">
                        <template v-if="menu.customerManagement">
                            <div class="wb100">
                                <el-form-item :label="menu.customerManagement.name">
                                    <el-checkbox v-model="menu.customerManagement.newCustomers.check" v-if="menu.customerManagement.newCustomers">{{menu.customerManagement.newCustomers.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.customerManagement.newAppointment.check" v-if="menu.customerManagement.newAppointment">{{menu.customerManagement.newAppointment.name }}</el-checkbox>
                                    <!-- 治疗间设置(10.29:杨涛修改) -->
                                    <el-checkbox v-model="menu.customerManagement.roomSet.check" v-if="menu.customerManagement.roomSet">{{menu.customerManagement.roomSet.name }}</el-checkbox>
                                </el-form-item>
                            </div>
                        </template>
                        <template v-if="menu.reviewTaskCenter">
                            <div class="wb100">
                                <el-form-item :label="menu.reviewTaskCenter.name">
                                    <el-checkbox v-model="menu.reviewTaskCenter.Review.check" v-if="menu.customerManagement.Review">{{menu.reviewTaskCenter.Review.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.reviewTaskCenter.Task.check" v-if="menu.customerManagement.Task">{{menu.reviewTaskCenter.Task.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.reviewTaskCenter.TaskCore.check" v-if="menu.customerManagement.TaskCore">{{menu.reviewTaskCenter.TaskCore.name }}</el-checkbox>
                                </el-form-item>
                            </div>
                        </template>
                        <template v-if="menu.informationManagement">
                            <div class="wb100">
                                <el-form-item :label="menu.informationManagement.name">
                                    <el-checkbox v-model="menu.informationManagement.appointmentList.check" v-if="menu.informationManagement.appointmentList">{{menu.informationManagement.appointmentList.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.arrears.check" v-if="menu.informationManagement.arrears">{{menu.informationManagement.arrears.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.chargeBack.check" v-if="menu.informationManagement.chargeBack">{{menu.informationManagement.chargeBack.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.consultationList.check" v-if="menu.informationManagement.consultationList">{{menu.informationManagement.consultationList.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.historyCashier.check" v-if="menu.informationManagement.historyCashier">{{menu.informationManagement.historyCashier.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.historyConsumption.check" v-if="menu.informationManagement.historyConsumption">{{menu.informationManagement.historyConsumption.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.prepaid.check" v-if="menu.informationManagement.prepaid">{{menu.informationManagement.prepaid.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.informationManagement.receiptItems.check" v-if="menu.informationManagement.receiptItems">{{menu.informationManagement.receiptItems.name }}</el-checkbox>
                                </el-form-item>
                            </div>
                        </template>
                        <template v-if="menu.listManagement">
                            <div class="wb100">
                                <el-form-item :label="menu.listManagement.name">
                                    <el-checkbox v-model="menu.listManagement.customerAnalysis.check" v-if="menu.listManagement.customerAnalysis">{{menu.listManagement.customerAnalysis.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.listManagement.customerLabel.check" v-if="menu.listManagement.customerLabel">{{menu.listManagement.customerLabel.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.listManagement.customerSetting.check" v-if="menu.listManagement.customerSetting">{{menu.listManagement.customerSetting.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.listManagement.customerList.check" v-if="menu.listManagement.customerList">{{menu.listManagement.customerList.name }}</el-checkbox>
                                </el-form-item>
                            </div>
                        </template>
                        <template v-if="menu.systemManagement">
                            <div class="wb100">
                                <el-form-item :label="menu.systemManagement.name">
                                    <el-checkbox v-model="menu.systemManagement.Sale.check" v-if="menu.systemManagement.Sale">{{menu.systemManagement.Sale.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.systemManagement.channelManagement.check" v-if="menu.systemManagement.channelManagement">{{menu.systemManagement.channelManagement.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.systemManagement.itemsManagement.check" v-if="menu.systemManagement.itemsManagement">{{menu.systemManagement.itemsManagement.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.systemManagement.teamManagement.check" v-if="menu.systemManagement.teamManagement">{{menu.systemManagement.teamManagement.name }}</el-checkbox>
                                    <el-checkbox v-model="menu.systemManagement.promotion.check" v-if="menu.systemManagement.promotion">{{menu.systemManagement.promotion.name }}</el-checkbox>
                                </el-form-item>
                            </div>
                        </template>

                        <div class="clear2"></div>

                        <div class="wb100">
                            <el-form-item label="改变角色称谓">
                                <el-input type="text" v-model.trim="menu.otherName" placeholder="请输入新名称" clearable></el-input>
                            </el-form-item>
                        </div>

                        <div class="bd-b1 bd-gray clear"></div>

                        <p class="fc-red h80px lh80px">注：该岗位默认权限不可改变 </p>

                        <div class="clear4"></div>

                        <div class="wb100 text-center">
                            <template v-if="disabled">
                                <el-button type="primary" disabled class="fl">保存中...</el-button>
                            </template>
                            <template v-else>
                                <el-button type="primary" @click="save" class="fl">保存设置</el-button>
                            </template>
                        </div>

                        <div class="clear4"></div>

                    </el-form>


                </div>

            </div>
        </div>
    </div>

</template>

<script>

    import { menus, getJurisdictionSetting, postJurisdictionSetting } from "@/shop/assets/api/manage/jurisdiction"

    import { getStoreMembers} from "@/shop/assets/api/common/common"

    export default {
        name: "OperationStatement",
        components: {
        },
        data() {
            return {
                usersId: '',
                name: '',
                menu: {},
                checkList: ['选中且禁用','复选框 A'],
                disabled:false
            }
        },
        mounted() {

            this.usersId = this.$route.query.usersId
            this.name = this.$route.query.name

            getJurisdictionSetting({usersId: this.usersId}).then(res=>{
                if(res.status == 0){

                    let menu = res.data.menu

                    if(menu.customerManagement.newCustomers)
                        menu.customerManagement.newCustomers.check = menu.customerManagement.newCustomers.check == 1 ? true : false
                    if(menu.customerManagement.newAppointment)
                        menu.customerManagement.newAppointment.check = menu.customerManagement.newAppointment.check == 1 ? true : false
                    // 治疗间设置(10.29:杨涛修改)
                    if(menu.customerManagement.roomSet)
                        menu.customerManagement.roomSet.check = menu.customerManagement.roomSet.check == 1 ? true : false
                    if(menu.reviewTaskCenter.Review)
                        menu.reviewTaskCenter.Review.check = menu.reviewTaskCenter.Review.check == 1 ? true : false
                    if(menu.reviewTaskCenter.Task)
                        menu.reviewTaskCenter.Task.check = menu.reviewTaskCenter.Task.check == 1 ? true : false
                    if(menu.reviewTaskCenter.TaskCore)
                        menu.reviewTaskCenter.TaskCore.check = menu.reviewTaskCenter.TaskCore.check == 1 ? true : false
                    if(menu.informationManagement.appointmentList)
                        menu.informationManagement.appointmentList.check = menu.informationManagement.appointmentList.check == 1 ? true : false
                    if(menu.informationManagement.arrears)
                        menu.informationManagement.arrears.check = menu.informationManagement.arrears.check == 1 ? true : false
                    if(menu.informationManagement.chargeBack)
                        menu.informationManagement.chargeBack.check = menu.informationManagement.chargeBack.check == 1 ? true : false
                    if(menu.informationManagement.consultationList)
                        menu.informationManagement.consultationList.check = menu.informationManagement.consultationList.check == 1 ? true : false
                    if(menu.informationManagement.historyCashier)
                        menu.informationManagement.historyCashier.check = menu.informationManagement.historyCashier.check == 1 ? true : false
                    if(menu.informationManagement.historyConsumption)
                        menu.informationManagement.historyConsumption.check = menu.informationManagement.historyConsumption.check == 1 ? true : false
                    if(menu.informationManagement.prepaid)
                        menu.informationManagement.prepaid.check = menu.informationManagement.prepaid.check == 1 ? true : false
                    if(menu.informationManagement.receiptItems)
                        menu.informationManagement.receiptItems.check = menu.informationManagement.receiptItems.check == 1 ? true : false
                    if(menu.listManagement.customerAnalysis)
                        menu.listManagement.customerAnalysis.check = menu.listManagement.customerAnalysis.check == 1 ? true : false
                    if(menu.listManagement.customerLabel)
                        menu.listManagement.customerLabel.check = menu.listManagement.customerLabel.check == 1 ? true : false
                    if(menu.listManagement.customerList)
                        menu.listManagement.customerList.check = menu.listManagement.customerList.check == 1 ? true : false
                    if(menu.listManagement.customerSetting)
                        menu.listManagement.customerSetting.check = menu.listManagement.customerSetting.check == 1 ? true : false
                    if(menu.systemManagement.Sale)
                        menu.systemManagement.Sale.check = menu.systemManagement.Sale.check == 1 ? true : false
                    if(menu.systemManagement.channelManagement)
                        menu.systemManagement.channelManagement.check = menu.systemManagement.channelManagement.check == 1 ? true : false
                    if(menu.systemManagement.itemsManagement)
                        menu.systemManagement.itemsManagement.check = menu.systemManagement.itemsManagement.check == 1 ? true : false
                    if(menu.systemManagement.teamManagement)
                        menu.systemManagement.teamManagement.check = menu.systemManagement.teamManagement.check == 1 ? true : false
                    if(menu.systemManagement.promotion)
                        menu.systemManagement.promotion.check = menu.systemManagement.promotion.check == 1 ? true : false

                    this.menu = menu

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
        methods: {
            save(){
                this.disabled = true;

                let _tmp = {
                    customerManagement: [],
                    reviewTaskCenter: [],
                    informationManagement: [],
                    listManagement: [],
                    systemManagement: [],
                }

                let menu = this.menu

                if(menu.customerManagement){
                    if(menu.customerManagement.newCustomers) if(menu.customerManagement.newCustomers.check)  _tmp.customerManagement.push({ id: menu.customerManagement.newCustomers.id })
                    if(menu.customerManagement.newAppointment) if(menu.customerManagement.newAppointment.check) _tmp.customerManagement.push({ id: menu.customerManagement.newAppointment.id })
                    // 治疗间设置(10.29:杨涛修改)
                    if(menu.customerManagement.roomSet) if(menu.customerManagement.roomSet.check)  _tmp.customerManagement.push({ id: menu.customerManagement.roomSet.id })
                }

                if(menu.reviewTaskCenter){
                    if(menu.reviewTaskCenter.Review) if(menu.reviewTaskCenter.Review.check)  _tmp.reviewTaskCenter.push({ id: menu.reviewTaskCenter.Review.id })
                    if(menu.reviewTaskCenter.Task) if(menu.reviewTaskCenter.Task.check) _tmp.reviewTaskCenter.push({ id: menu.reviewTaskCenter.Task.id })
                    if(menu.reviewTaskCenter.TaskCore) if(menu.reviewTaskCenter.TaskCore.check)  _tmp.reviewTaskCenter.push({ id: menu.reviewTaskCenter.TaskCore.id })
                }


                if(menu.informationManagement){
                    if(menu.informationManagement.appointmentList) if(menu.informationManagement.appointmentList.check)  _tmp.informationManagement.push({ id: menu.informationManagement.appointmentList.id })
                    if(menu.informationManagement.arrears) if(menu.informationManagement.arrears.check) _tmp.informationManagement.push({ id: menu.informationManagement.arrears.id })
                    if(menu.informationManagement.chargeBack) if(menu.informationManagement.chargeBack.check)  _tmp.informationManagement.push({ id: menu.informationManagement.chargeBack.id })
                    if(menu.informationManagement.consultationList) if(menu.informationManagement.consultationList.check)  _tmp.informationManagement.push({ id: menu.informationManagement.consultationList.id })
                    if(menu.informationManagement.historyCashier) if(menu.informationManagement.historyCashier.check)  _tmp.informationManagement.push({ id: menu.informationManagement.historyCashier.id })
                    if(menu.informationManagement.historyConsumption) if(menu.informationManagement.historyConsumption.check)  _tmp.informationManagement.push({ id: menu.informationManagement.historyConsumption.id })
                    if(menu.informationManagement.prepaid.check) if(menu.informationManagement.prepaid)  _tmp.informationManagement.push({ id: menu.informationManagement.prepaid.id })
                    // if(menu.informationManagement.receiptItems) if(menu.informationManagement.receiptItems.check)  _tmp.informationManagement.push({ id: menu.informationManagement.receiptItems.id })
                }

                if(menu.listManagement){
                    if(menu.listManagement.customerAnalysis) if(menu.listManagement.customerAnalysis.check)  _tmp.listManagement.push({ id: menu.listManagement.customerAnalysis.id })
                    if(menu.listManagement.customerLabel) if(menu.listManagement.customerLabel.check)  _tmp.listManagement.push({ id: menu.listManagement.customerLabel.id })
                    if(menu.listManagement.customerList) if(menu.listManagement.customerList.check)  _tmp.listManagement.push({ id: menu.listManagement.customerList.id })
                    if(menu.listManagement.customerSetting) if(menu.listManagement.customerSetting.check)  _tmp.listManagement.push({ id: menu.listManagement.customerSetting.id })
                }

                if(menu.systemManagement){
                    if(menu.systemManagement.Sale) if(menu.systemManagement.Sale.check)  _tmp.systemManagement.push({ id: menu.systemManagement.Sale.id })
                    if(menu.systemManagement.channelManagement) if(menu.systemManagement.channelManagement.check) _tmp.systemManagement.push({ id: menu.systemManagement.channelManagement.id })
                    if(menu.systemManagement.itemsManagement) if(menu.systemManagement.itemsManagement.check)  _tmp.systemManagement.push({ id: menu.systemManagement.itemsManagement.id })
                    if(menu.systemManagement.teamManagement) if(menu.systemManagement.teamManagement.check)  _tmp.systemManagement.push({ id: menu.systemManagement.teamManagement.id })
                    if(menu.systemManagement.promotion) if(menu.systemManagement.promotion.check)  _tmp.systemManagement.push({ id: menu.systemManagement.promotion.id })
                }


                postJurisdictionSetting({
                    usersId: this.usersId,
                    otherName: menu.otherName,
                    data: JSON.stringify(_tmp)
                }).then(res=>{
                    if(res.status == 0){
                        
                        getStoreMembers({role_id:0}).then(res => {
                            if(res.status == 0){
                                this.$store.commit('SET_ROLELIST', res.data)
                                this.$message({
                                    showClose: true,
                                    message:'设置权限成功',
                                    type: 'success',
                                    onClose:()=>{
                                        this.$router.go(-1)
                                    }
                                });
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
                        });
                        
                        this.disabled = false;

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

        }

    }

</script>

<style scoped lang="scss">

    .is-selected {
        color: #1989FA;
    }
</style>
