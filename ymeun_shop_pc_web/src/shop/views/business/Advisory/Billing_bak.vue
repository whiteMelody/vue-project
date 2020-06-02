<template>
    <div class="Billing" :style="'min-height: '+boxMaxHeight+'px;'">

        <div class="pa20">
            <p class="f24px fc-gray4 pointer" @click="$router.push({name:'ClientDel',query:{id:$route.query.customerId,types:3}})">{{info.customer.name}}</p>
            <div class="clear4"></div>
            <p class="fc-gray3">
                <span>
                    电话：{{info.customer.mobile}}
                </span>
                <span class="mal50">
                    客户编号：{{info.customer.code}}
                </span>
            </p>
        </div>

        <div class="clear4 bg-white1"></div>

        <div class="clear4"></div>

        <div class="billing_List">

            <el-table :data="demoList" stripe border v-if="demoList.length">
                <el-table-column align="center" prop="item_pid" label="品项类别">
                    <template slot-scope="scope">
                        <el-select
                                v-model="scope.row.item_pid"
                                placeholder="请选择品项类别"
                                @change="myItemsChange(scope.row, scope.$index)"
                                clearable
                                filterable
                                remote
                                reserve-keyword
                                @clear="remoteMethod('')"
                                :remote-method="remoteMethod"
                        >
                            <el-option v-for="item in projectList" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="item_id" label="品项名称" width="300px">
                    <template slot-scope="scope" >
                        <el-select
                                filterable
                                clearable
                                remote
                                reserve-keyword
                                :remote-method="(query)=>{ handleRemote(query, scope.row, scope.$index ) }"
                                v-model="scope.row.item_id"
                                placeholder="请选择品项名称"
                                @clear="handleRemote('', scope.row, scope.$index)"
                                v-if="scope.row.item_pid"
                                @change="myChange(scope.row, scope.$index)">
                            <el-option
                                    v-for="item in scope.row.projectList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                <span style="float: left; ">{{item.name}}</span>
                                <template v-if="!scope.row.item_id_disabled">
                                    <span style="float: right; color: #FF5722; font-size: 12px; margin-left:20px;" v-if="item.style == 1">套餐项目</span>
                                    <span style="float: left; color: #8492a6; font-size: 12px; margin-left:20px;" v-if="item.disabled_volume == 1">（不计入业绩）</span>
                                </template>
                            </el-option>
                        </el-select>

                        <template v-if="scope.row.item_id">
                            <template v-if="!scope.row.item_id_disabled">
                                <el-tooltip placement="top" effect="light" v-if="$store.getters.getProject(scope.row.item_pid, scope.row.item_id).style == 1">
                                    <div slot="content">
                                        <template v-for="item in $store.getters.getProject(scope.row.item_pid, scope.row.item_id).meal">
                                            {{item.name}}
                                            <br/>
                                        </template>
                                    </div>
                                    <span class="fc-blue mal20">查看套餐</span>
                                </el-tooltip>
                            </template>
                        </template>

                    </template>
                </el-table-column>

                <el-table-column align="center" prop="price" label="品项单价（元）">
                    <template slot-scope="scope">
                        {{ scope.row.price | _filterNumFormat }}
                    </template>
                </el-table-column>
                <!--                <el-table-column align="center" prop="activity_price" label="活动价格（元）">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        {{ scope.row.activity_price | _filterNumFormat }}-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column  align="center" prop="treatment_num" label="疗程" width="50">
                    <template slot-scope="scope">
                        {{ scope.row.treatment_num }}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="items_num" label="数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.items_num" style="width:100px;" :step="1" :max="99999" :min="0" @change="numChange(scope.row, scope.$index)"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="treatment_num" label="疗程总数" width="50">
                    <template slot-scope="scope">
                        <!-- {{ scope.row.treatment_num }} -->
                        <p v-if="scope.row.items_num">{{ scope.row.items_num * scope.row.treatment_num}}</p>
                    </template>
                </el-table-column>
                <el-table-column  align="center" prop="money" label="金额（元）">
                    <template slot-scope="scope">
                        <!-- {{ scope.row.money | _filterNumFormat }} -->
                        <p v-if="scope.row.items_num">{{ (scope.row.items_num * scope.row.price) | _filterNumFormat}}</p>
                    </template>
                </el-table-column>
                <el-table-column  align="center" prop="discount" label="折扣">
                    <template slot-scope="scope">
                        <!--                         :min="minDiscount" :max="10" -->
                        <el-input-number style="width:120px;" @change="discountChange(scope.row, scope.$index)" v-model="scope.row.discount" :precision="1" :step="0.1" :min="0" :max="10">
                        </el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="money2" label="实付金额（元）">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.money2" :precision="2" @change="moneyChange(scope.row, scope.$index)" :min="0" :controls="false"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column  align="center" width="60px" >
                    <template slot="header" slot-scope="scope">
                        <el-button icon="el-icon-plus" size="mini" class="pa5" @click='addData'></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button icon="el-icon-minus" size="mini" class="pa5" @click="removeData(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="total_num">
                <h4>合计</h4>
                <div>
                    <ul>
                        <li>数量：<span>{{sum.count}}</span></li>
                        <li>疗程总数：<span>{{sum.treatment_num}}</span></li>
                        <li>金额（元）：<span>{{sum.price}}</span></li>
                    </ul>
                    <p>实付金额（元）：<i>{{sum.money}}</i></p>
                </div>
            </div>

            <div class="btns">
                <el-button type="primary" @click="submitOrder" :disabled="disabled">确认</el-button>
            </div>

        </div>

        <!--    请选择开单员工    -->
        <el-dialog title="请选择开单员工" class="BillingDialog" :visible.sync="dialogOpenOrder">
            <div class="fc-gray4">
                <el-form>

                    <div class="pat10 pab10 par10 bg-white1 over-auto">
                        <div class="wb32 fl">
                            <div class="pal10 par10">
                                <div class="wb100 bg-white1 h40px lh40px text-center bd-a1 bd-gray radius1">
                                    <div class="wb40 fl">
                                        开单员工
                                    </div>
                                    <div class="wb5 fl fc-gray1">
                                        |
                                    </div>
                                    <div class="wb55 fr text-over-hidden1">
                                        {{users.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w10px fl h1px bg-white3 mat20"></div>
                        <div class="wb32 fl">
                            <div class="pal10 par10">
                                <div class="wb100 bg-white1 h40px lh40px text-center bd-a1 bd-gray radius1">
                                    <div class="wb40 fl">
                                        开单百分比
                                    </div>
                                    <div class="wb5 fl fc-gray1">
                                        |
                                    </div>
                                    <div class="wb55 fr">
                                        <el-input-number class="wb80 fl" v-model="users.rate" :precision="0" placeholder="请输入开单百分比" :controls="false" @change="usersRateChange" :min="0" :max="100"></el-input-number>
                                        <span class="fr wb20">
                                                %
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w10px fl h1px bg-white3 mat20"></div>
                        <div class="wb32 fl">
                            <div class="pal10 par10">
                                <div class="wb100 bg-white1 h40px lh40px text-center bd-a1 bd-gray radius1">
                                    <div class="wb40 fl">
                                        金额占比
                                    </div>
                                    <div class="wb5 fl fc-gray1">
                                        |
                                    </div>
                                    <div class="wb55 fr">
                                        {{users.price}}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <template v-for="(item,index) in userList">

                        <div class="clear4"></div>

                        <div class="pat10 pab10 par10  over-auto relative" :class=" popIndex == index ? 'bg-green3 fc-blue6' :'bg-white1  fc-gray1'">
                            <div class="wb32 fl">
                                <div class="pal10 par10">
                                    <div class="wb100 h40px lh40px text-center bd-a1 radius1" :class=" popIndex == index ? 'bd-green4' : 'bd-gray'" >
                                        <div class="wb40 fl">
                                            开单员工
                                        </div>
                                        <div class="wb5 fl">
                                            |
                                        </div>
                                        <div class="wb55 fr">
                                            <el-select v-model="item.users_id" placeholder="选择开单员工" readonly="" popper-class="room_list" clearable class="bg-none" @focus="popActive(index)">
                                                <el-option :key="''" :value="''" label="全部员工"></el-option>
                                                <el-option v-for="item in getRoleList(item)" :key="item.users_id" :label="item.name +  formateRole(item.role_id)"
                                                           :value="item.users_id">
                                                    <div :class="{'room_list_type':true}">
                                                        <a>{{item.name}}</a>
                                                        <p>{{item.role_id == 3 ? $store.getters.roleName.adviser : $store.getters.roleName.technician}}</p>
                                                    </div>
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w10px fl h1px mat20" :class=" popIndex == index ? 'bg-green4' : 'bg-white3'"></div>
                            <div class="wb32 fl">
                                <div class="pal10 par10">
                                    <div class="wb100 h40px lh40px bd-a1 text-center radius1" :class=" popIndex == index ? 'bd-green4' : 'bd-gray'">
                                        <div class="wb40 fl">
                                            开单百分比
                                        </div>
                                        <div class="wb5 fl">
                                            |
                                        </div>
                                        <div class="wb55 fr">
                                            <el-input-number class="wb80 fl bg-none" v-model="item.rate" @focus="popActive(index)" :precision="0" placeholder="请输入开单百分比" :controls="false" @change="rateChange(item , index)" :min="0" :max="100"></el-input-number>
                                            <span class="fr wb20">
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w10px fl h1px mat20" :class=" popIndex == index ? 'bg-green4' : 'bg-white3'"></div>
                            <div class="wb32 fl">
                                <div class="pal10 par10">
                                    <div class="wb100 h40px lh40px bd-a1 text-center radius1" :class=" popIndex == index ? 'bd-green4' : 'bd-gray'">
                                        <div class="wb40 fl">
                                            金额占比
                                        </div>
                                        <div class="wb5 fl">
                                            |
                                        </div>
                                        <div class="wb55 fr">
                                            <el-input class="bg-none" v-model="item.price" readonly @focus="popActive(index)" placeholder="金额占比"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div :class=" popIndex == index ? 'bg-blue6' : 'bg-gray4'" class="absolute w20px h20px lh20px text-center fc-white radius5 f12px pointer" style="top:20px; right: 8px;" @click="delUsers(index)">
                                X
                            </div>
                        </div>

                    </template>

                    <div class="clear4"></div>

                    <el-button type="primary" classsubmit="mal10" plain @click="addUsers" :disabled="userList.length>=4">新增开单员工</el-button>

                </el-form>
                <div class="clear4"></div>
                <div slot="footer" class="fr mar10">
                    <el-button @click="dialogOpenOrder = false">取 消</el-button>
                    <template v-if="disabled2">
                        <el-button type="primary" disabled>保存中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </template>
                </div>

                <div class="clear0"></div>
            </div>
        </el-dialog>

    </div>
</template>
<script>

    import {getAddOrders, getOrdersEdit, PostAddOrders, postOrdersEdit} from  "@/shop/assets/api/flow/order"

    import { getProject } from "@/shop/assets/api/common/common"

    import { formatArrayToMap } from "@/shop/utils/format"

    export default {
        name: "Billing",
        data() {
            return {
                boxMaxHeight:'',
                counselor:{
                    counselor:"",
                },
                dialogOpenOrder: false,
                isEdit: false,
                disabled: false,
                disabled2: false,
                demoList: [],                      // table数组
                form:{
                    projectType:"",
                    projectName:"",
                },
                rules: {
                    //   select: [{required: true, message: '请选择select', trigger: 'change'}],
                },

                minDiscount: this.$store.getters.currentUser.discount,

                id: '',
                customerId: '',
                adviserId: '',
                appointmentId: '',
                technicianId: '',
                type: 0,   //开单类型  1 不计入业绩 | 0 计入业绩

                info: {
                    adviser: {},
                    customer: {}
                },

                sum: {
                    count: 0,
                    treatment_num: 0,
                    price: 0,
                    money: 0,
                },

                userList: [],

                users: {
                    name: '',
                    users_id: '',
                    rate: 100,
                    price: 0,
                },

                roleList: [],

                popIndex:0,

                items_volume: 0,

                dialogEditCategories: true,
                dialogEditCategoriesParam: {},

                projectList: [],
                project2List: [],

            };
        },
        watch: {

        },
        components: {},
        methods: {

            remoteMethod(query){

                let _list = this.$store.getters.projectList11(this.type, this.items_volume)

                //筛选名称和简称包含的项

                let res = _list.filter((item)=>{
                    if(item.name){
                        if(item.name.includes(query)){
                            return item
                        }
                    }
                    if(item.alias_name){
                        if(item.alias_name.includes(query)){
                            return item
                        }
                    }
                })

                this.projectList = formatArrayToMap(res, 'id', 'name')

            },


            handleRemote(query, item, index){
                let _list = this.$store.getters.projectList22(item.item_pid, this.type, this.items_volume)
                //筛选名称和简称包含的项
                let res = _list.filter((item)=>{
                    if(item.name){
                        if(item.name.includes(query)){
                            return item
                        }
                    }
                    if(item.alias_name){
                        if(item.alias_name.includes(query)){
                            return item
                        }
                    }
                })
                item.projectList = res
                this.$set(this.demoList,index,item)
                this.$forceUpdate()
            },

            myItemsChange(item, index){
                // console.log(item)
                item.item_id = ''
                //获取下级项目
                item.projectList = this.$store.getters.projectList22(item.item_pid, this.type, this.items_volume)
                this.$set(this.demoList,index,item)
                this.$forceUpdate()
            },


            //开单选中
            popActive(index){
                this.popIndex = index;
            },
            //添加选项
            addData(){
                this.demoList.push({})
            },
            //删除选项
            removeData(index){
                this.demoList.splice(index, 1)

                this.getSumPrice()
            },

            formateRole(roleId){
                return roleId == 3? '（' + this.$store.getters.roleName.adviser + '）' : '('+ this.$store.getters.roleName.technician +')'
            },

            addUsers(){
                // if(this.userList.length == 0){
                //     this.userList.push({
                //         id: this.$base.getUuid(),
                //         users_id: '',
                //         rate: 50,
                //         price: this.sum.money / 2,
                //     })
                //     this.users.rate = 50
                //     this.users.price = this.sum.money / 2
                // }else{
                this.userList.push({
                    id: this.$base.getUuid(),
                    users_id: '',
                    rate:0,
                    price:0,
                })
                this.calculateRate()
                // }
            },

            delUsers(i){
                this.userList.splice(i,1)
                //   if(this.userList.length == 1){
                //       this.userList[0].rate = 50
                //       this.userList[0].price = this.sum.money / 2
                //       this.users.rate = 50
                //       this.users.price = this.sum.money / 2
                //   }else if(this.userList.length == 0){
                //       this.users.rate = 100
                //       this.users.price = this.sum.money
                //   }else{
                this.calculateRate()
                // }
            },

            usersRateChange(){
                this.calculateRate()
            },

            rateChange(item,index){
                if(this.$base.isNull(item.rate)){
                    item.rate = 0
                }

                // let index = 0
                //   let index2 = 0
                //   let sum = 0
                //   let sum2 = 0
                //   let sum3 = 0
                //
                // for(let i=0; i<this.userList.length; i++){
                //     if(i>0 && this.userList[i].rate > this.userList[i-1].rate){
                //         index = i
                //     }
                //     sum += this.userList[i].rate
                //     sum2 += this.userList[i].rate
                //     if(this.userList[i].id != item.id){
                //         sum3 += this.userList[i].rate
                //     }
                // }
                //
                // for(let i=0; i<this.userList.length; i++){
                //     if(i>0 && this.userList[i].rate > this.userList[i-1].rate){
                //         if(index != i)
                //             index2 = i
                //     }
                // }
                //
                // sum+= this.users.rate
                //
                //   console.log('sum:'+sum)
                //   console.log('sum2:'+sum2)
                //   console.log('sum3:'+sum3)
                //
                //   //大于除自己以外的总和
                // if(item.rate > sum3){
                //         for (let i = 0; i < this.userList.length; i++) {
                //             if (this.userList[i].id != item.id) {
                //                 this.userList[i].rate = 0
                //             }
                //         }
                //         this.users.rate = 100 - item.rate
                //         console.log('item.rate >= sum3')
                // }else{
                //     //小于默认值
                //
                //     //总和大于100
                //     if(sum > 100){
                //         this.users.rate -= item.rate
                //         if(this.users.rate <= 0){
                //             //
                //             console.log('this.users.rate <= 0')
                //
                //             if(this.userList[index].rate - item.rate>=0 && this.userList[index].id != item.id){
                //                 //从最大的rate减
                //                 this.users.rate += item.rate
                //                 this.userList[index].rate -= item.rate
                //
                //                 console.log('this.userList[index].rate - item.rate>=0')
                //             }else{
                //
                //                 if(this.userList[index].rate + this.userList[index2].rate - item.rate>=0  && this.userList[index].id != item.id){
                //
                //                     let _t = this.userList[index].rate + this.userList[index2].rate - item.rate
                //
                //                     this.userList[index].rate = 0
                //                     this.userList[index2].rate = _t
                //
                //                     console.log('this.userList[index].rate + this.userList[index2].rate - item.rate>=0')
                //
                //                 }else{
                //                     //将其他的rate设为0
                //                     for(let i=0; i<this.userList.length; i++){
                //                         if(this.userList[i].id != item.id){
                //                             this.userList[i].rate = 0
                //                         }
                //                     }
                //                     this.users.rate = 100 - item.rate
                //                     console.log('this.userList[index].rate + this.userList[index2].rate - item.rate<0')
                //                 }
                //             }
                //         }else{
                //             //
                //             console.log('this.users.rate > 0')
                //         }
                //     }else{
                //         //小于总和
                //         this.users.rate = 100 - sum2
                //         console.log('sum < 100')
                //     }
                //
                // }

                this.calculateRate()

            },

            calculateRate(){

                for(let i=0; i<this.userList.length; i++){
                    this.userList[i].price = this.userList[i].rate * this.sum.money / 100
                }

                this.users.price = this.users.rate * this.sum.money / 100

            },

            myChange(item, index){
                let _t = this.$store.getters.projectList2(item.item_pid, item.item_id)

                if(_t){

                    //查询项目详情
                    item.price = _t.price
                    item.money = _t.price
                    // item.activity_price = _t.activity.activity_price
                    item.treatment_num = _t.treatment_num
                    item.items_num = 1
                    item.discount = 10

                    // console.log(_t)

                    // if(this.$base.twoDecimal(_t.activity.activity_price) > 0){
                    //     item.unitPrice = Number.parseFloat(this.$base.twoDecimal(_t.activity.activity_price))
                    // }else{
                    item.unitPrice = Number.parseFloat(this.$base.twoDecimal(_t.price))
                    // }

                    // console.log(item.unitPrice)

                    //实付金额
                    item.money2 = item.unitPrice

                    this.getSumPrice()
                }


                this.$set(this.demoList,index,item)
                this.$forceUpdate()

            },

            numChange(item, index){

                if(this.$base.isNull(item.items_num)){
                    item.items_num = 0
                }

                let demoList = this.demoList

                item.money2 = item.unitPrice * (item.discount * 0.1) * item.items_num

                this.$set(demoList,index,item)

                this.getSumPrice()
            },

            discountChange(item, index){

                if(this.$base.isNull(item.discount)){
                    item.discount = 0
                }

                item.money2 = item.unitPrice * (item.discount * 0.1) * item.items_num

                let demoList = this.demoList

                this.$set(demoList,index,item)

                this.getSumPrice()

                if(item.discount < Number.parseFloat(this.$store.getters.currentUser.discount)){
                    if(item.discount == 0){
                        this.disabled = false
                    }else{

                        //提示
                        this.$message({
                            showClose: true,
                            message: '此折扣已超出你的折扣限度，请重新输入！',
                            type: 'error',
                        });

                        this.disabled = true
                    }
                }else{
                    this.disabled = false
                }
            },

            moneyChange(item, index){

                if(this.$base.isNull(item.money2)){
                    item.money2 = 0
                }

                // if(item.activity_price > 0){
                //     if(item.money2 > item.activity_price){
                //         item.unitPrice = item.price
                //     }else{
                //         item.unitPrice = item.activity_price
                //     }
                // }else{
                item.unitPrice = item.price
                // }

                item.discount = item.money2 / item.items_num / item.unitPrice * 10

                let demoList = this.demoList

                this.$set(demoList,index,item)

                this.getSumPrice()
            },

            getSumPrice(){
                let _tmp = this.demoList

                let _sumCount = 0
                let _sumTreatment_num = 0
                let _sumPrice = 0
                let _sumMoney = 0
                let __tmp = []

                for(let i=0; i<_tmp.length; i++){
                    if(_tmp[i].unitPrice){
                        _sumCount += _tmp[i].items_num
                        _sumTreatment_num += _tmp[i].treatment_num * _tmp[i].items_num
                        _sumPrice += _tmp[i].unitPrice * _tmp[i].items_num
                        _sumMoney += _tmp[i].money2
                    }
                }

                this.sum = {
                    count: _sumCount,
                    treatment_num: _sumTreatment_num,
                    price: this.$base.twoDecimal(_sumPrice),
                    money: this.$base.twoDecimal(_sumMoney),
                }

            },

            getRoleList(item){

                let _tmp = []
                let _flag

                for(let i=0; i<this.roleList.length; i++){
                    _flag = true
                    for(let j=0; j<this.userList.length; j++){
                        if(this.roleList[i].users_id == this.userList[j].users_id && item.users_id != this.roleList[i].users_id){
                            _flag = false
                        }
                    }
                    if(_flag){
                        _tmp.push(this.roleList[i])
                    }
                }

                return _tmp
            },

            submit(){

                // if(this.sum.count <=0){
                //     this.$message({
                //         showClose: true,
                //         message: '请选择开单的项目',
                //         type: 'error',
                //     });
                //     return
                // }
                if(this.demoList.length <=0){
                    this.$message({
                        showClose: true,
                        message: '请选择开单的项目',
                        type: 'error',
                    });
                    return
                }

                let _flag = false
                let sum = 0

                for(let i=0; i<this.userList.length; i++){
                    sum += this.userList[i].rate
                    if(this.$base.isNull(this.userList[i].users_id)){
                        _flag = true
                    }
                }


                sum+= this.users.rate

                //提示开单占比
                if(sum !=100){
                    this.$message({
                        showClose: true,
                        message: '开单占比总和应为100%',
                        type: 'error',
                    });
                    return
                }

                //开单人员必选
                if(_flag){
                    this.$message({
                        showClose: true,
                        message: '开单人员必选',
                        type: 'error',
                    });
                    return
                }

                let _tmpArr = [this.users]

                for(let i=0; i<this.userList.length; i++){
                    if( !this.$base.isNull(this.userList[i].users_id) &&  !this.$base.isNull(this.userList[i].rate) ){
                        _tmpArr.push(this.userList[i])
                    }
                }

                let items_num = []
                let item_pid = []
                let payable = []
                let item_id = []
                for(let i=0; i<this.demoList.length; i++){
                    let _item = this.demoList[i]
                    items_num.push(_item.items_num)
                    item_pid.push(_item.item_pid)
                    payable.push( this.$base.twoDecimal(Number.parseFloat(_item.money2)))
                    item_id.push(_item.item_id)
                }

                this.disabled2 = true

                if(this.isEdit){
                    //修改订单

                    postOrdersEdit({
                        customer_id: this.customerId,
                        adviser_id: this.adviserId,
                        appointment_id: this.appointmentId,
                        orders_id: this.id,
                        items_num,
                        item_pid,
                        payable,
                        item_id,
                        proportion: JSON.stringify(_tmpArr),
                    }).then(res=>{

                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '修改订单成功',
                                type: 'success',
                                onClose:()=>{
                                    this.$router.go(-1)
                                    this.disabled2 = false
                                }
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled2 = false
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.disabled2 = false
                    })

                }else{
                    //开单

                    PostAddOrders({
                        customer_id: this.customerId,
                        adviser_id: this.adviserId,
                        appointment_id: this.appointmentId,
                        technician_id: this.technicianId,
                        items_num,
                        item_pid,
                        payable,
                        item_id,
                        proportion: JSON.stringify(_tmpArr),
                        is_meter: this.type,
                    }).then(res=>{

                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '开单成功',
                                type: 'success',
                                onClose:()=>{
                                    this.$router.go(-1)
                                    this.disabled2 = false
                                }
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled2 = false
                        }
                    }).catch(error=>{
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error',
                        });
                        this.disabled2 = false
                    })
                }

            },

            submitOrder(){

                // if(this.sum.count <=0){
                //     this.$message({
                //         showClose: true,
                //         message: '请选择开单的项目',
                //         type: 'error',
                //     });
                //     return
                // }
                if(this.demoList.length <=0){
                    this.$message({
                        showClose: true,
                        message: '请选择开单的项目',
                        type: 'error',
                    });
                    return
                }

                //判断项目是否启用
                for(let i=0; i<this.demoList.length; i++){
                    if(!this.$base.isNull(this.demoList[i].item_pid)){
                        if(isNaN(this.demoList[i].item_pid)){
                            this.$message({
                                showClose: true,
                                message: '第'+ (i+1) +'条项目大类已停用,请重新选择',
                                type: "error"
                            });
                            return;
                        }
                    }
                    if(!this.$base.isNull(this.demoList[i].item_id)){
                        if(isNaN(this.demoList[i].item_id)){
                            this.$message({
                                showClose: true,
                                message: '第'+ (i+1) +'条项目二类已停用,请重新选择',
                                type: "error"
                            });
                            return;
                        }
                    }

                }

                this.dialogOpenOrder = true

                this.calculateRate()

                let _tmp = JSON.parse(JSON.stringify(this.$store.getters.counselorCosmetologistList))

                //判断当前登录权限
                if(this.$store.getters.currentUser.role_id == 2 || this.$store.getters.currentUser.role_id == 5){
                    this.roleList = _tmp.filter(item=>{
                        return item.users_id != this.info.adviser.users_id
                    })
                    this.users.users_id = this.info.adviser.users_id
                    this.users.name = this.info.adviser.name + '（'+ this.$store.getters.roleName.adviser +'）'
                }else if(this.$store.getters.currentUser.role_id == 3 || this.$store.getters.currentUser.role_id == 4){
                    this.roleList = _tmp.filter(item=>{
                        return item.users_id != this.$store.getters.currentUser.users_id
                    })
                    this.users.users_id = this.$store.getters.currentUser.users_id
                    this.users.name = this.$store.getters.currentUser.role_id == 3 ? this.$store.getters.currentUser.name +  '（'+ this.$store.getters.roleName.adviser +'）' : this.$store.getters.currentUser.name +  '（'+ this.$store.getters.roleName.technician +'）'
                }else{

                }

            },
        },

        // 创建前状态
        beforeCreate() {},

        // 创建完毕状态
        created() {},

        // 挂载前状态
        beforeMount() {},

        // 挂载结束状态
        mounted() {
            this.boxMaxHeight = window.innerHeight - 100;

            this.customerId = this.$route.query.customerId
            this.adviserId = this.$route.query.adviserId
            this.appointmentId = this.$route.query.appointmentId
            this.technicianId = this.$route.query.technicianId ? this.$route.query.technicianId : ''
            this.id = this.$route.query.id || this.$route.query.orders_id
            this.type = this.$route.query.type

            this.isEdit = this.$route.query.isEdit ? true : false

            if(this.isEdit){

                getOrdersEdit({
                    customerId: this.customerId,
                    adviserId: this.adviserId,
                    appointmentId: this.appointmentId,
                    id: this.id
                }).then(res=>{
                    if (res.status == 0) {
                        this.info = res.data
                        if(this.info.adviser){

                        }else{
                            this.info.adviser = {}
                        }

                        let _tmp = this.info.receipts

                        for(let i=0; i<_tmp.length; i++){
                            _tmp[i].item_pid = _tmp[i].items_p_id
                            _tmp[i].item_id = _tmp[i].items_id
                            _tmp[i].item_name = _tmp[i].items_name
                            _tmp[i].item_pname = _tmp[i].items_p_name

                            if(_tmp[i].items_p_status == 0){
                                _tmp[i].item_pid_disabled = true
                                _tmp[i].item_pid = _tmp[i].item_pname
                            }else{
                                //获取下级项目
                                this.myItemsChange(_tmp[i], i)
                                _tmp[i].item_id = _tmp[i].items_id
                            }

                            if(_tmp[i].items_status == 0){
                                _tmp[i].item_id_disabled = true
                                _tmp[i].item_id = _tmp[i].item_name
                            }

                            let _list1 = this.$store.getters.projectList

                            let _t1 = _list1.find(t=> t.id == _tmp[i].items_p_id)

                            if(_t1){
                                _tmp[i].isPorject1 = true
                                //查询二级项目

                                if(_t1.children){

                                    let _t2 = _t1.children.find(t=> t.id ==  _tmp[i].items_id)

                                    if(_t2){
                                        _tmp[i].isPorject2 = true
                                    }else{
                                        _tmp[i].isPorject2 = false
                                    }

                                }else{
                                    _tmp[i].isPorject2 = false
                                }

                            }else{
                                _tmp[i].isPorject1 = false
                            }


                            _tmp[i].items_num = _tmp[i].number_one
                            // _tmp[i].activity_price = _tmp[i].activity_price
                            _tmp[i].money = _tmp[i].payment
                            _tmp[i].money2 = _tmp[i].payment
                            // if(_tmp[i].activity_price > 0){
                            //     _tmp[i].unitPrice = Number.parseFloat(this.$base.twoDecimal(_tmp[i].activity_price))
                            // }else{
                            _tmp[i].unitPrice = Number.parseFloat(this.$base.twoDecimal(_tmp[i].items_price))
                            // }
                        }

                        this.demoList = JSON.parse(JSON.stringify(this.info.receipts))

                        // console.log(this.demoList)

                        let proportion = res.data.proportion

                        let __tmp = []

                        for(let i=0; i<proportion.length; i++){
                            proportion[i].id = this.$base.getUuid()
                            if(proportion[i].users_id!=  res.data.adviser.users_id){
                                __tmp.push(proportion[i])
                            }else{
                                this.users.rate = proportion[i].rate
                            }
                        }

                        this.userList = __tmp

                        this.getSumPrice()

                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })

            }else {
                this.addData();

                getAddOrders({
                    customerId: this.customerId,
                    adviserId: this.adviserId,
                    appointmentId: this.appointmentId,
                }).then(res => {
                    if (res.status == 0) {
                        this.info = res.data
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                })
            }

            //获取项目
            getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
                if(res.status == 0){
                    this.items_volume = Number.parseFloat(res.data.items_volume)

                    //- 初始化项目
                    // 2020年1月2日14:02:27
                    this.projectList = this.$store.getters.projectList11Map(this.type, this.items_volume)

                    let _tmp = res.data.list
                    let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
                    this.$store.commit('SET_PROJECTLIST1', res.data.list)

                    for(let i=0; i<_tmp.length; i++){
                        _tmp[i].children = []
                        _tmp2[i].children = []
                    }

                    getProject({ start: 1, perpage: 9999, status:-1}).then(res2 => {
                        if(res2.status == 0){
                            let __tmp = res2.data.list
                            for(let i=0; i<__tmp.length; i++){
                                for(let j=0; j<_tmp.length; j++){
                                    if(__tmp[i].p_id == _tmp[j].id){
                                        _tmp[j].children.push(__tmp[i])
                                        if(__tmp[i].status.value == 1){
                                            _tmp2[j].children.push(__tmp[i])
                                        }
                                    }
                                }
                            }
                            // 2019-11-15 15点15分 陈军修改
                            this.$store.commit('SET_PROJECTALLLIST', _tmp)
                            this.$store.commit('SET_PROJECTLIST', _tmp2)
                        }
                    })

                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                    this.$store.commit('SET_PROJECTLIST', [])
                    this.$store.commit('SET_PROJECTLIST1', [])
                }
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    message: error,
                    type: 'error',
                });
                this.$store.commit('SET_PROJECTLIST', [])
                this.$store.commit('SET_PROJECTLIST1', [])
            })


        },

        // 更新前状态
        beforeUpdate() {},

        // 更新完成状态
        updated() {},

        // 销毁前状态
        beforeDestroy() {},

        // 销毁完成状态
        destroyed() {},

    };
</script>
<style lang="scss" scoped>
    .Billing {
        margin: 20px;
        background: #fff;
        .billing_box{
            display: flex;
            padding: 20px;
            justify-content: space-between;
            .user_message{
                width: 50%;
                background: #FFEFF0;
                border:1px solid #EC414D;
                height: 130px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .titles{
                    padding-left:.3rem;
                    display: flex;
                    p{
                        font-size: 16px;
                        color: #EC414D;
                        border-bottom: 1px solid #FFACB1;
                        padding-bottom: .1rem;
                    }
                }
                .text{
                    display: flex;
                    justify-content: space-between;
                    padding: .2rem .3rem 0;
                    p{
                        color: #333;
                    }
                }
            }
            .serve{
                width: 49%;
                background: #FFEEDA;
                border:1px solid #EC414D;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .titles{
                    padding-left:.3rem;
                    display: flex;
                    p{
                        font-size: 16px;
                        color: #FF5722;
                        border-bottom: 1px solid #FFBFA2;
                        padding-bottom: .1rem;
                    }
                }
                .text{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: .2rem .3rem 0;
                    p{
                        color: #333;
                        display: flex;
                        align-items: center;
                        div{
                            margin-bottom:0 !important;
                        }
                    }
                }
            }
        }
        .billing_List{
            padding: 0 20px;

            .total_num{
                border-bottom: 1px solid #EBEEF5;
                border-left: 1px solid #EBEEF5;
                border-right: 1px solid #EBEEF5;
                display: flex;
                align-items: center;
                height: 50px;
                h4{
                    padding-left: 24px;
                    flex: 1;
                    color: #333333;
                    font-size: 18px;
                    font-weight: normal;
                }
                div{
                    display: flex;
                    align-items: center;
                    padding-right: .24rem;
                    ul{
                        display: flex;
                        align-items: center;
                        padding-right: .7rem;
                        li{
                            font-size: 16px;
                            color: #666;
                            padding-right: .24rem;
                            span{
                                color: #333;
                            }
                        }
                    }
                    p{
                        font-size: 16px;
                        color: #333;
                        display: flex;
                        align-items: center;
                        i{
                            font-style: normal;
                            font-size: 24px;
                            color: #EC414D;
                        }
                    }
                }
            }
            .btns{
                display: flex;
                justify-content: flex-end;
                padding-top: .7rem;
                padding-bottom: .2rem;
            }
        }
    }
</style>


<style>
    /*.Billing .billing_box .serve .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{*/
    /*margin: 0;*/
    /*}*/
    .Billing .BillingDialog .el-input-number{
        height: 100%;
    }
    .Billing .BillingDialog .el-input-number .el-input input , .Billing .BillingDialog .el-input__inner{
        background: none;
        height: 40px;
    }

    .room_list .room_list_type{
        display: flex;
    }
    .room_list .selected .room_list_type{
        font-weight: normal;
    }
    .room_list .selected .room_list_type a{
        color: #0DC9E5;
    }
    .room_list .selected .room_list_type p{
        color: #0DC9E5;
    }
    .room_list .room_list_type a{
        width: 1.2rem;
        padding-right: .1rem;
        color: #333;
        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
        overflow: hidden;
    }
    .room_list .room_list_type p{
        width: .6rem;
        padding-right: .1rem;
        color: #333;
    }
    .Billing .BillingDialog .el-input__inner {
        text-align: center;
    }
</style>
