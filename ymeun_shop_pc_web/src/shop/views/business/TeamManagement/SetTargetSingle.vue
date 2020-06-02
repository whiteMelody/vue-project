<template>

    <div class="wb100 f14px bg-white1 SetTarget">
        <div class="pal24 par24 pat20 pab20">
            <div class="pal19 par19 bg-white">
                <p class="lh50px h50px bd-b1 bd-gray">
                    <!-- <span class="fl f16px fc-gray4">员工月度目标设定（{{year}}-{{month}}）</span> -->
                    <span class="fl f16px fc-gray4" v-if="detailsIndex">设置员工目标</span>
                    <span class="fl f16px fc-gray4" v-else>员工目标设定表（ {{condition.startTime}}-{{condition.endTime}} ）</span>
                </p>

                <!-- <div class="wb100">
                    <div class="fr">
                        <el-button round class="mar20" @click="loadCur">回到本月</el-button>
                        <i class="el-icon-caret-left el-cursor" v-if="prevBtnShow" @click="changeMonth('prev')"></i>
                        <i class="el-icon-caret-left el-cursor fc-gray" v-else></i>
                        {{year}}年{{month}}员工月度目标设定
                        <i class="el-icon-caret-right el-cursor" v-if="nextBtnShow" @click="changeMonth('next')"></i>
                        <i class="el-icon-caret-right el-cursor fc-gray" v-else></i>
                    </div>
                </div> -->
                <div class="clear4"></div>
                <div class=""></div>
                <div class="timer" v-if="detailsIndex">
                    <div class="timer_border">
                        <div class="xing">*</div>
                        <div class="text">目标时间段</div>
                        <div class="xian"></div>
                        <el-date-picker
                            class="wb70"
                            :clearable="false"
                            v-model="daterangeTimer.startTime"
                            type="date"
                            placeholder="开始日期"
                            :picker-options="startOptions"
                        ></el-date-picker>
                        <div class="xian"></div>
                        <el-date-picker
                            class="wb70"
                            :clearable="false"
                            v-model="daterangeTimer.endTime"
                            type="date"
                            placeholder="结束日期"
                            :picker-options="endOptions"
                        ></el-date-picker>
                    </div>
                    <div class="clear4"></div>
                </div>

                <!-- <div class="condition" v-else>
                    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                         选择员工
                        <el-form-item label="">
                            <el-select v-model="condition.userId" placeholder="选择员工" readonly="" clearable>
                                <el-option :key="''" :value="''" label="全部员工"></el-option>
                                <el-option v-for="item in $store.getters.staffListMap" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
                        
                        <el-button type="danger" class="h32px" @click="$router.push({name: 'SetTarget' })">设置员工目标</el-button>
                        
                    </el-form>
                <div class="clear4"></div>
                </div> -->


                <!-- <div class="clear4"></div>
                <el-alert
                        title="目标在每个月的最后三天可以设置，设置完成后，截止本月最后一天的23:59前均可修改，如当月未设置下月目标，则在下月最后前三天内均可再设置一次，这次设置则只能在24小时内修改。"
                        type="info">
                </el-alert>  -->


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

                        <el-table-column prop="quantity" align="center" label="划扣人头（人）">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.quantity" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置划扣人头"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column prop="customer" align="center" label="划扣人次（次）">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.customer" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置划扣人次"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column prop="amount" align="center" label="销售业绩（元）">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.amount" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置销售业绩"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="划扣业绩（元）">
                            <template slot-scope="scope">
                                <template v-if="scope.row.role.id == 3">
                                    <el-input type="number" :controls="false" placeholder="该岗位无划扣业绩设置" disabled></el-input>
                                </template>
                                <template v-else>
                                    <el-input type="number" v-model="scope.row.valume" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置划扣业绩"></el-input>
                                </template>
                            </template>
                        </el-table-column>

                        <el-table-column prop="valume" align="center" label="成交人头（人）">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.order_customer" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置成交人头"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column prop="valume" align="center" label="成交人次（次）">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.order_customer_quantity" @change="saveSetBtn = false" :min="0" :controls="false" placeholder="请设置成交人次"></el-input>
                            </template>
                        </el-table-column>

                    </el-table>

                    <div class="wb100 bd-b1 bd-l1 bd-r1 bd-gray h40px lh40px text-center">
                        <div style="padding-left: 320px;" class="relative">
                            <div class="w80px absolute" style="left: 240px; top: 0;">合计</div>
                            <div class="wb16666 fl fc-orange">{{sumQuantity}}</div>
                            <div class="wb16666 fl fc-orange">{{sumCustomer}}</div>
                            <div class="wb16666 fl fc-orange">{{sumAmount}}</div>
                            <div class="wb16666 fl fc-orange">{{sumValume}}</div>
                            <div class="wb16666 fl fc-orange">{{sumOrderCustomer}}</div>
                            <div class="wb16666 fl fc-orange">{{sumOrderCutomerQuantity}}</div>
                        </div>
                    </div>

                    <div class="clear4 bd-b1 bd-gray"></div>
                    <div class="clear4"></div>

                    <div class="text-center">
                        <!-- <template v-if="disabled">
                            <el-button type="primary" disabled>提交中...</el-button>
                        </template>
                        <template v-else>
                            <el-button type="primary" @click="save">保存设置</el-button>
                        </template> -->
                        <el-button type="primary" :disabled="saveSetBtn" v-if="detailsIndex" @click="saveSetFn">保存设置</el-button>
                        <el-button type="primary" :disabled="saveSetBtn"  v-else @click="save">保存设置</el-button>
                    </div>

                    <div class="clear4"></div>

                </div>

            </div>
        </div>

        <!-- 保存 -->
        <div class="save_box">
            <el-dialog title="请确定设置" width="24%" :visible.sync="confirmPop">
                <div class="dialog-content">
                    <div class="text">目标设定提交后，设定的目标时间不可修改 请确认当前目标设定时间段 </div>
                    <div class="timer_box">
                        <el-date-picker
                            class="wb70 mar5"
                            :clearable="false"
                            v-model="daterangeTimer.startTime"
                            type="date"
                            placeholder="开始日期"
                            :picker-options="startOptions"
                        ></el-date-picker>
                        <el-date-picker
                            class="wb70 mal5"
                            :clearable="false"
                            v-model="daterangeTimer.endTime"
                            type="date"
                            placeholder="结束日期"
                            :picker-options="endOptions"
                        ></el-date-picker>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="confirmPop = false">取 消</el-button>
                    <template v-if="disabled">
                        <el-button type="primary" disabled>保存中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="save">确 定</el-button>
                    </template>
                </div>
            </el-dialog>
        </div>

    </div>

</template>

<script>


    import { hasTarget , targetSave } from "@/shop/assets/api/manage/target"

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
                disabled: false,

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
                loading:true

            }
        },
        mounted() {

            this.taskId = this.$route.query.taskId
            if(this.$route.query.startTime != undefined){
                this.condition.startTime = this.$base.timerTransition(this.$route.query.startTime)
                this.condition.endTime = this.$base.timerTransition(this.$route.query.endTime);
                this.detailsIndex = false
            }
            // let _d = this.$base.dateTimeToDate(new Date(), 'cycle')
            // this.year = Number.parseFloat(_d.split('-')[0])
            // this.month = Number.parseFloat(_d.split('-')[1])
            // this.cycle = this.year + '' + this.$base.addZero(this.month)
            this.loadData()
            this.getTimeFn()
        },
        methods: {

          
            isDisabled(time, type){


                const that = this
                
                let _flag = false;
                let startData = "";
                let endData = "";
                if(that.$base.isNull(this.daterangeTimer.startTime)){
                    this.daterangeTimer.startTime = ''
                }
                if(that.$base.isNull(this.daterangeTimer.endTime)){
                    this.daterangeTimer.endTime = ''
                }
                if(this.daterangeTimer.startTime != ''){
                    startData = that.$base.dateTimeToDate(this.daterangeTimer.startTime,'time')
                }
                if(this.daterangeTimer.endTime != ''){
                    endData = that.$base.dateTimeToDate(this.daterangeTimer.endTime,'time')
                }
                
                for(let i=0; i<this.getTimeData.length; i++){
                    let item = this.getTimeData[i]
                    let itemStartTime = that.$base.dateTimeToDate(item.start_time,'time'),
                        itemEndTime = that.$base.dateTimeToDate(item.stop_time,'time');
                    if(time >= itemStartTime && time <= itemEndTime){
                        _flag = true
                        break
                    }
                    if(type == 'end' && startData != '' && startData > time){
                        _flag = true
                        break
                    }
                    if(type == 'start' && endData != '' && endData < time){
                        _flag = true
                        break
                    }
                }

                return _flag

                
            },

            getTimeFn(){
                getTime({}).then(res=>{
                    if(res.status == 0){
                        this.getTimeData = res.data.list;
                        this.getTimeData.map((item , index) => {
                            let itemStartTime = this.$base.dateTimeToDate(item.start_time,'time'),
                                itemEndTime = this.$base.dateTimeToDate(item.stop_time,'time');
                        })

                        const that = this;
                        this.startOptions = {
                            disabledDate(time) {

                                return that.isDisabled(time,"start")
                              
                            },
                        }

                        this.endOptions = {
                            disabledDate(time) {
                                return that.isDisabled(time,'end')
                            },
                        }


                    }
                }).catch(error=>{
                    console.log("getTime no");
                })
            },
       
       

            // loadCur(){
            //     let _d = this.$base.dateTimeToDate(new Date(), 'cycle')
            //     this.year = Number.parseFloat(_d.split('-')[0])
            //     this.month = Number.parseFloat(_d.split('-')[1])
            //     this.cycle = this.year + '' + this.$base.addZero(this.month)
            //     this.loadData()
            // },

            // changeMonth(type){
                
            //     this.dateComparisonFn()
            //     if(type == 'prev'){
            //         this.month --
            //         if(this.month<=0){
            //             this.month = 12
            //             this.year --
            //         }
            //     }else{
            //         this.month ++
            //         if(this.month>=13){
            //             this.month = 1
            //             this.year ++
            //         }
            //     }
            //     this.cycle = this.year + '' + this.$base.addZero(this.month)
            //     this.loadData()
            // },

            loadData(){
                let postData = {}
                if(this.condition.startTime == ''){
                    postData = {}
                }else{
                    postData = {
                        start_time : this.condition.startTime,
                        stop_time : this.condition.endTime,
                        users_id:this.condition.userId
                    }
                }
                
                getUserList(postData).then(res=>{
                    if(res.status == 0){
                        // this.list = res.data.list.adviser.list.concat(res.data.list.technician.list)
                        // this.adviser = res.data.list.adviser
                        // this.technician = res.data.list.technician
                        // this.dateComparison = res.data.cycle
                        this.list = res.data.list;
                        this.loading = false
                        // this.dateComparisonFn()
                    }
                }).catch(error=>{
                    console.log("getUserList no");
                })

                

            },
            
            saveSetFn(){
                let _flag = this.isNumber();
                if(_flag)
                {
                    if(this.daterangeTimer.startTime != '' && this.daterangeTimer.endTime != ''){
                        this.confirmPop = true;
                    }else{
                        this.$message({
                            message: '请选择时间',
                            type: 'error',
                        });
                    }
                }
                else
                {
                    this.$message({
                        message: '请输入整数',
                        type: 'error',
                    });
                }
            },


            timerSave(){
                const that = this;
                let _flag = false;
                let startTime = this.$base.dateTimeToDate(this.daterangeTimer.startTime, "time");
                let endTime = this.$base.dateTimeToDate(this.daterangeTimer.endTime, "time");
                for(let i=0; i<this.getTimeData.length; i++){
                    let item = this.getTimeData[i]
                    let itemStartTime = that.$base.dateTimeToDate(item.start_time,'time'),
                        itemEndTime = that.$base.dateTimeToDate(item.stop_time,'time');
        
                    if(startTime <= itemStartTime && endTime >= itemEndTime){
                        _flag = true
                        break;
                    }
                  
                }
                if(_flag){
                    this.$message({
                        message: '选中时间段不能包含已选中时间段',
                        type: 'error',
                        onClose:()=>{
                            this.disabled = false
                        }
                    });
                }
                else{
                    this.save()
                }
            },

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

                // let params = {
                //     rules: JSON.stringify(_tmp),
                //     start_time: this.$base.dateTimeToDate(this.daterangeTimer.startTime, "date2"),
                //     stop_time: this.$base.dateTimeToDate(this.daterangeTimer.endTime, "date2"),
                // }
                let params = {}
                if(this.daterangeTimer.startTime == ''){
                    params = {
                        rules: JSON.stringify(_tmp),
                        start_time: this.condition.startTime,
                        stop_time: this.condition.endTime,
                    }
                }
                else{
                    
                    params = {
                        rules: JSON.stringify(_tmp),
                        start_time: this.$base.dateTimeToDate(this.daterangeTimer.startTime, "date2"),
                        stop_time: this.$base.dateTimeToDate(this.daterangeTimer.endTime, "date2"),
                    }
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
               

            }

            // dateComparisonFn(){
            //     let aMaxNum = this.$base.dateTimeToDate(this.dateComparison.max+"-01",'time')
            //     let aMinNum = this.$base.dateTimeToDate(this.dateComparison.min+'-01','time')
            //     let userTime = this.$base.dateTimeToDate(this.year+'-'+this.month+'-01','time')
            //     if(userTime >=  aMaxNum){
            //         this.nextBtnShow = false;
            //     }
            //     else{
            //         this.nextBtnShow = true;
            //     }
            //     if(userTime <=  aMinNum){
            //         this.prevBtnShow = false;
            //     }
            //     else{
            //         this.prevBtnShow = true;
            //     }

            // }
        },
        watch: {
            $route(to,from){
                window.history.go(0)
            },
      
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
                }
            },

            // adviser: {
            //     deep: true,
            //     handler: function () {
            //         let _sumQuantity = 0
            //         let _sumCustomer = 0
            //         let _sumAmount = 0
            //         for(let i=0; i<this.adviser.list.length; i++){
            //             _sumQuantity += this.adviser.list[i].quantity
            //             _sumCustomer += this.adviser.list[i].customer
            //             _sumAmount += this.adviser.list[i].amount
            //         }
            //         this.sumQuantity = _sumQuantity
            //         this.sumCustomer = _sumCustomer
            //         this.sumAmount = _sumAmount
            //     }
            // },
            // technician: {
            //     deep: true,
            //     handler: function () {
            //
            //         let _sumQuantity = 0
            //         let _sumCustomer = 0
            //         let _sumAmount = 0
            //         let _sumValume = 0
            //         for(let i=0; i<this.technician.list.length; i++){
            //             _sumQuantity += this.technician.list[i].quantity
            //             _sumCustomer += this.technician.list[i].customer
            //             _sumAmount += this.technician.list[i].amount
            //             _sumValume += this.technician.list[i].valume
            //         }
            //         this.sumQuantity2 = _sumQuantity
            //         this.sumCustomer2 = _sumCustomer
            //         this.sumAmount2 = _sumAmount
            //         this.sumValume2 = _sumValume
            //     }
            // },
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