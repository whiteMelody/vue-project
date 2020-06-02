<template>

    <div class="wb100 f14px bg-white1 SetTarget">
        <div class="pal24 par24 pat20 pab20">

            <div class="wb25 fl">
                <div class="pal19 par19 bg-white">
                    <p class="lh50px h50px bd-b1 bd-gray">
                        <span class="fl f16px fc-gray4">员工目标合计</span>
                    </p>
                    <div class="clear4"></div>

                    <div class="wb100">
                        <p class="fc-gray2">目标时间段</p>
                        <div class="clear2"></div>
                        <p>
                            {{this.$base.timestampToDateString(total.start_time, 'date2' )}}
                            至
                           {{this.$base.timestampToDateString(total.stop_time, 'date2')}}
                        </p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">销售业绩(元)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.amount}}</p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">成交人头(人)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.order_customer}}</p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">成交人次(次)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.order_customer_quantity}}</p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">划扣业绩(元)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.valume}}</p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">划扣人头(人)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.quantity}}</p>
                        <div class="clear4 bd-b1 bd-gray"></div>
                        <div class="clear4"></div>

                        <p class="fc-gray2">划扣人次(次)</p>
                        <div class="clear2"></div>
                        <p class="fc-orange F20">{{total.customer}}</p>
                        <div class="clear4"></div>

                    </div>
                </div>
            </div>

            <div class="wb75 fr">
                <div class="pal20">
                    <div class="pal19 par19 bg-white">
                        <p class="lh50px h50px bd-b1 bd-gray">
                            <span class="fl f16px fc-gray4">员工目标设定</span>
                        </p>
                        <div class="clear4"></div>
                        <div class="wb100">

                            <el-table slot="list" :data="list" border v-loading="loading">

                                <el-table-column align="center" label="序号" width="60px">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" label="员工" width="180px">
                                    <template slot-scope="scope">
                                        {{scope.row.name}}
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" label="岗位" width="80px">
                                    <template slot-scope="scope">

                                        {{scope.row.role.id == 3 ? $store.getters.roleName.adviser : $store.getters.roleName.technician }}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="amount" align="center" label="销售业绩（元）">
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.amount" :min="0" :controls="false" placeholder="请设置销售业绩"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="valume" align="center" label="成交人头（人）">
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.order_customer" :min="0" :controls="false" placeholder="请设置成交人头"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="valume" align="center" label="成交人次（次）">
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.order_customer_quantity" :min="0" :controls="false" placeholder="请设置成交人次"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column align="center" label="划扣业绩（元）">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.role.id == 3">
                                            <el-input type="number" :controls="false" placeholder="该岗位无划扣业绩设置" disabled></el-input>
                                        </template>
                                        <template v-else>
                                            <el-input type="number" v-model="scope.row.valume" :min="0" :controls="false" placeholder="请设置划扣业绩"></el-input>
                                        </template>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="quantity" align="center" label="划扣人头（人）">
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.quantity" :min="0" :controls="false" placeholder="请设置划扣人头"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="customer" align="center" label="划扣人次（次）">
                                    <template slot-scope="scope">
                                        <el-input type="number" v-model="scope.row.customer" :min="0" :controls="false" placeholder="请设置划扣人次"></el-input>
                                    </template>
                                </el-table-column>


                            </el-table>

                            <div class="wb100 bd-b1 bd-l1 bd-r1 bd-gray h40px lh40px text-center">
                                <div style="padding-left: 320px;" class="relative">
                                    <div class="w80px absolute" style="left: 240px; top: 0;">合计</div>
                                    <div class="wb16666 fl fc-orange">{{sumAmount}}</div>
                                    <div class="wb16666 fl fc-orange">{{sumOrderCustomer}}</div>
                                    <div class="wb16666 fl fc-orange">{{sumOrderCutomerQuantity}}</div>
                                    <div class="wb16666 fl fc-orange">{{sumValume}}</div>
                                    <div class="wb16666 fl fc-orange">{{sumQuantity}}</div>
                                    <div class="wb16666 fl fc-orange">{{sumCustomer}}</div>
                                </div>
                            </div>

                            <div class="clear4 bd-b1 bd-gray"></div>
                            <div class="clear4"></div>

                            <div class="text-center">
                                <el-button type="primary" :disabled="saveSetBtn" @click="save">保存设置</el-button>
                            </div>

                            <div class="clear4"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>


    import { hasTarget , targetSave, getDetailed } from "@/shop/assets/api/manage/target"

    import { getUserList , getTime } from "@/shop/assets/api/manage/teamManagement"

    export default {
        name: "OperationStatement",
        components: {
        },
        data() {
            return {

                cycle: '',
                cycleDate: '',
                adviser: {},
                sumQuantity: 0,
                sumCustomer: 0,
                sumAmount: 0,
                sumValume: 0,
                sumOrderCustomer: 0,
                sumOrderCutomerQuantity: 0,

                technician: {},

                list: [],

                taskId: '',
                targetId: '',

                year: 0,
                month: 0,
                prevBtnShow:true,
                nextBtnShow:true,

                dateComparison:{},
                getTimeData:[],
                daterangeTimer:{
                    startTime:"",
                    endTime:''
                },
                confirmPop: false,
                disabled:false,
                startOptions: {},
                endOptions:{},
                saveSetBtn:true,
                detailsIndex:true,
                condition:{
                    userId:'',
                    startTime:'',
                    endTime:"",
                },
                loading:true,
                total: {
                    start_time: 0,
                    end_time: 0,
                },

            }
        },
        mounted() {
            this.taskId = this.$route.query.taskId
            this.targetId = this.$route.query.targetId

            this.loadData()

        },
        methods: {

            loadData(){
                //获取合计
                getDetailed({
                    taskId: this.taskId,
                    targetId: this.targetId
                }).then(res=>{

                    this.total = res.data

                    if(res.status == 0){
                        //获取员工设置详情
                        getUserList({
                            start_time: this.$base.timestampToDateString(res.data.start_time, 'date2' ),
                            stop_time: this.$base.timestampToDateString(res.data.stop_time, 'date2'),
                        }).then(res=>{
                            if(res.status == 0){
                                this.list = res.data.list;
                                this.loading = false
                            }
                        }).catch(error=>{
                            console.log("getUserList no");
                        })
                    }
                })

            },
            
            // saveSetFn(){
            //     let _flag = this.isNumber();
            //     if(_flag)
            //     {
            //         if(this.daterangeTimer.startTime != '' && this.daterangeTimer.endTime != ''){
            //             this.confirmPop = true;
            //         }else{
            //             this.$message({
            //                 message: '请选择时间',
            //                 type: 'error',
            //             });
            //         }
            //     }
            //     else
            //     {
            //         this.$message({
            //             message: '请输入整数',
            //             type: 'error',
            //         });
            //     }
            // },

            save(){

                let _flag = this.isNumber();
                if(!_flag)
                {
                    this.$message({
                        message: '请输入整数',
                        type: 'error',
                    });
                    return;
                }
                let _tmp = []
              
                for(let i=0; i<this.list.length; i++){

                    _tmp.push({
                        quantity: this.list[i].quantity ? this.list[i].quantity : -1,
                        amount: this.list[i].amount ? this.list[i].amount : -1,
                        customer: this.list[i].customer ? this.list[i].customer : -1,
                        valume: this.list[i].valume ? this.list[i].valume : -1,
                        order_customer: this.list[i].order_customer ? this.list[i].order_customer : -1,
                        order_customer_quantity: this.list[i].order_customer_quantity ? this.list[i].order_customer_quantity : -1,
                        usersId: this.list[i].usersId ||  this.list[i].users_id,
                        id: this.list[i].id,
                    })
                }

                let params = {}
                    params = {
                        rules: JSON.stringify(_tmp),
                        start_time: this.$base.timestampToDateString(this.total.start_time, 'date2' ),
                        stop_time: this.$base.timestampToDateString(this.total.stop_time, 'date2'),
                    }

                if(!this.$base.isNull(this.taskId))
                    params.taskId = this.taskId

                this.disabled = true
          
                targetSave(params).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '设置月目标成功',
                            type: 'success',
                            onClose:()=>{
                                window.history.back()
                                this.disabled = false
                            }
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                        this.disabled = false
                    }
                }).catch(error=>{
                    console.log("targetSave no");
                    this.disabled = false
                })
            },

            isNumber(){
                let _flag = true;
                let r = /^[0-9]*[1-9][0-9]*$/;
                for (let i = 0; i < this.list.length; i++) {
                    const item = this.list[i];
                    if( (!this.$base.isNull(item.quantity)) && (!r.test(item.quantity)) && (item.quantity != 0)){
                        _flag = false;
                        break;
                    }
                    if( !this.$base.isNull(item.customer) && !r.test(item.customer) && (item.customer != 0)){
                        _flag = false;
                        break;
                    }
                    if( !this.$base.isNull(item.amount) && !r.test(item.amount) && (item.amount != 0)){
                        _flag = false;
                        break;
                    }
                    if( !this.$base.isNull(item.valume) && !r.test(item.valume) && (item.valume != 0)){
                        _flag = false;
                        break;
                    }
                    if( !this.$base.isNull(item.order_customer) && !r.test(item.order_customer) && (item.order_customer != 0)){
                        _flag = false;
                        break;
                    }
                    if( !this.$base.isNull(item.order_customer_quantity) && !r.test(item.order_customer_quantity) && (item.order_customer_quantity != 0)){
                        _flag = false;
                        break;
                    }
                }

                if(_flag){
                    return true
                }else{
                    return false
                }

            },

        },
        watch: {
            // $route(to,from){
            //     window.history.go(0)
            // },
      
            list: {
                deep: true,
                handler: function () {
                    let _sumQuantity = 0
                    let _sumCustomer = 0
                    let _sumAmount = 0
                    let _sumValume = 0
                    let _sumOrderCustomer = 0
                    let _sumOrderCutomerQuantity = 0

                    for(let i=0; i<this.list.length; i++){
                        
                        _sumQuantity += this.list[i].quantity ? parseFloat(this.list[i].quantity) : 0
                        _sumCustomer += this.list[i].customer ? parseFloat(this.list[i].customer) : 0
                        _sumAmount += this.list[i].amount ? parseFloat(this.list[i].amount) : 0
                        if(this.list[i].valume)
                            _sumValume += this.list[i].valume ? parseFloat(this.list[i].valume) : 0
                        if(this.list[i].order_customer)
                            _sumOrderCustomer += this.list[i].order_customer ? parseFloat(this.list[i].order_customer) : 0
                        if(this.list[i].order_customer_quantity)
                            _sumOrderCutomerQuantity += this.list[i].order_customer_quantity ? parseFloat(this.list[i].order_customer_quantity) : 0
                    }
                    this.sumQuantity = _sumQuantity
                    this.sumCustomer = _sumCustomer
                    this.sumAmount = _sumAmount
                    this.sumValume = _sumValume
                    this.sumOrderCustomer = _sumOrderCustomer
                    this.sumOrderCutomerQuantity = _sumOrderCutomerQuantity

                    let _flag = false

                    console.log(_sumQuantity, this.total.quantity, '_sumQuantity')
                    console.log(_sumCustomer, this.total.customer, '_sumCustomer')

                    if(_sumQuantity < Number.parseFloat(this.total.quantity))    _flag = true
                    if(_sumCustomer < Number.parseFloat(this.total.customer))    _flag = true
                    if(_sumAmount < Number.parseFloat(this.total.amount))    _flag = true
                    if(_sumValume < Number.parseFloat(this.total.valume))    _flag = true
                    if(_sumOrderCustomer < Number.parseFloat(this.total.order_customer))    _flag = true
                    if(_sumOrderCutomerQuantity < Number.parseFloat(this.total.order_customer_quantity))    _flag = true

                    this.saveSetBtn = _flag

                }
            },

        },
        
    }

</script>

<style scoped lang="scss">
.timer{
    .timer_border{
        width: 34%;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: .1rem;
        .xing{
            color: #EC414D;
        }
        .text{
            width:.9rem;
            padding-left: 4px;
            font-size: 14px;
        }
        .xian{
            width: 1px;
            height: 20px;
            background: #e5e5e5;
        }
        .el-date-editor{
            border: 0 !important;
            display: flex;
            align-items: center;
            flex: 1;
        }
    }
}
.is-selected {
    color: #1989FA;
}
</style>
<style>
.save_box .el-dialog__wrapper .el-dialog .el-dialog__body{
    padding: 0 20px 30px;
    
}
.save_box .el-dialog__wrapper .el-dialog .el-dialog__body .dialog-content{
    border-top: 1px solid #e5e5e5;
}
.save_box .el-dialog__wrapper .el-dialog .el-dialog__body .dialog-content .text{
    width: 76%;
    padding: .2rem 0;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    color: #0DC9E5;
    line-height: 30px;
}
.save_box .el-dialog__wrapper .el-dialog .el-dialog__body .dialog-content .timer_box{
    display: flex;
}
.timer .timer_border .el-date-editor input{
    border: 0 !important;
}
.condition .el-form .el-form-item{
    margin-bottom: 0 !important;
}
.el-table .el-table__body-wrapper .el-input__inner{
    padding-right: 0;
}
</style>