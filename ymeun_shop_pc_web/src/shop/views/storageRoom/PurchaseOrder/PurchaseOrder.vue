<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">采购制单</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100 f16px">
                <p class="h30px lh30px fc-gray2">制单基本信息</p>
                <p class="h30px lh30px fc-gray3">
                    <span class="fl">单据日期：{{happen_date}} </span>
                    <span class="fl mal50">制单人：{{userName}} </span>
                </p>
            </div>

            <div class="clear4"></div>

        </div>

        <div class="clear4"></div>

        <div class="bg-white pal20 par20">

            <div class="clear4"></div>

            <div class="wb100">

                <el-form ref="form" :inline="true" :rules="rules" :model="form">
                    <el-form-item label="供应商" prop="business_id">
                        <el-select placeholder="全部供应商" v-model="form.business_id">
                            <el-option v-for="item in $store.getters.businessList" :key="item.id" :label="item.fullname"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </div>

            <div class="clear0"></div>

            <el-table slot="list" :data="demoList" border class="myTable">

                <el-table-column align="center" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index+ 1}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品编码">
                    <template slot-scope="scope">
                        <!-- 商品编码 -->
                        <el-autocomplete
                                class="wb100"
                                :disabled="isEdit"
                                v-model="scope.row.code"
                                :fetch-suggestions="codeQuerySearchAsync"
                                placeholder="请输入商品编码"
                                :trigger-on-focus="true"
                                @select="(item)=> handleSelect(item, scope.$index, 'code')"
                                @keyup.native="handleKeyUp('code', scope.$index)">
                        </el-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品名称">
                    <template slot-scope="scope">
                        <!-- 商品名称 -->
                        <div class="wb100">
                            <el-input @keyup.native="handleKeyUp('fullname', scope.$index)"
                                      class="wb100"
                                      :disabled="isEdit"
                                      @blur="fullname.visible = false"
                                      v-model="scope.row.fullname"
                                      placeholder="请输入商品名称"></el-input>
                            <el-popover v-if="fullname.activeIndex == scope.$index"
                                        placement="bottom"
                                        width="600"
                                        trigger="manual"
                                        v-model="fullname.visible">
                                <el-table :data="fullname.list" v-loading="fullname.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'fullname')">
                                    <el-table-column align="center" label="商品编码">
                                        <template slot-scope="scope">
                                            {{scope.row.code}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品名称">
                                        <template slot-scope="scope">
                                            {{scope.row.fullname}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品简称">
                                        <template slot-scope="scope">
                                            {{scope.row.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品规格">
                                        <template slot-scope="scope">
                                            {{scope.row.specifications.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品单位">
                                        <template slot-scope="scope">
                                            {{scope.row.unit.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="供应商">
                                        <template slot-scope="scope">
                                            {{scope.row.business.title}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品简称">
                    <template slot-scope="scope">
                        <!-- 商品简称 -->
                        <div class="wb100">
                            <el-input @keyup.native="handleKeyUp('title', scope.$index)"
                                      class="wb100"
                                      :disabled="isEdit"
                                      @blur="title.visible = false"
                                      v-model="scope.row.title"
                                      placeholder="请输入商品简称"></el-input>
                            <el-popover v-if="title.activeIndex == scope.$index"
                                        placement="bottom"
                                        width="600"
                                        trigger="manual"
                                        v-model="title.visible">
                                <el-table :data="title.list" v-loading="title.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'title')">
                                    <el-table-column align="center" label="商品编码">
                                        <template slot-scope="scope">
                                            {{scope.row.code}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品名称">
                                        <template slot-scope="scope">
                                            {{scope.row.fullname}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品简称">
                                        <template slot-scope="scope">
                                            {{scope.row.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品规格">
                                        <template slot-scope="scope">
                                            {{scope.row.specifications.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="商品单位">
                                        <template slot-scope="scope">
                                            {{scope.row.unit.title}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="供应商">
                                        <template slot-scope="scope">
                                            {{scope.row.business.title}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品单位">
                    <template slot-scope="scope">
                        {{scope.row.unit.title}}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="采购数量">
                    <template slot-scope="scope">
                        <el-input-number :disabled="isEdit" v-model="scope.row.quantity" class="wb100" :min="0"  :controls="false" :precision="2" placeholder="请输入采购数量"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                        <el-input :disabled="isEdit" v-model="scope.row.remarks" placeholder="请输入采购备注"></el-input>
                    </template>
                </el-table-column>

                <el-table-column align="center" v-if="!isEdit">
                    <template slot="header" slot-scope="scope">
                        <el-button icon="el-icon-plus" @click="addCommodity"></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button icon="el-icon-minus" @click="removeCommodity(scope.$index)"></el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--      合计      -->
            <div class="pal20 par20 h60px lh60px bd-gray bd-b1 bd-l1 bd-r1 f16px">
                <span class="fl f18px">合计</span>
                <span class="fr fc-gray3">
                    采购总数量：{{sumQuantity}}
                </span>
            </div>

            <div class="clear h70px"></div>

            <div class="wb100" v-if="examineList.length > 0">
                <p class="fc-gray4 f16px h40px lh40px">审核记录</p>
                <div class="clear0 bd-b1 bd-gray"></div>
                <div class="clear4"></div>

                <el-table slot="list" :data="examineList">
                    <el-table-column align="center" label="订单状态" width="100px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.status.value == 3">
                                <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 0">
                                <p class="w80px h23px lh23px fc-white text-center bg-gray5">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 1">
                                <p class="w80px h23px lh23px fc-white text-center bg-blue12">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                            <template v-else-if="scope.row.status.value == 2">
                                <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核时间">
                        <template slot-scope="scope">
                            {{scope.row.time}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="审核人">
                        <template slot-scope="scope">
                            {{scope.row.members.name}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="失败原因">
                        <template slot-scope="scope">
                            {{scope.row.content}}
                        </template>
                    </el-table-column>
                </el-table>

            </div>

            <div class="clear h70px"></div>

            <template v-if="status === 0 || status === 1">
                <el-button type="primary" class="fr w100px" @click="deriveExcel">导出Excel</el-button>
            </template>

            <template v-else-if="status === 2">
                <el-button type="primary" class="fr w100px" @click="$router.push({ path: 'InStorageOrderList',  query:{ orderId: orderId } })">订单入库</el-button>
                <el-button class="fr mal50 mar50 w100px" @click="deriveExcel">导出Excel</el-button>
            </template>

            <template v-else-if="status === 3">
                <template v-if="disabled">
                    <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr w100px" @click="submit">再次申请</el-button>
                </template>
                <el-button class="fr mal50 mar50 w100px" @click="back">取消</el-button>
            </template>

            <template v-else>
                <template v-if="disabled">
                    <el-button type="primary" class="fr w100px" disabled>提交中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" class="fr w100px" @click="submit">提交审核</el-button>
                </template>
                <el-button class="fr mal50 mar50 w100px" @click="back">取消</el-button>
            </template>

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import { getInfo, save, saveByPurchaseId, examine } from '@/shop/assets/api/purchase/purchase'

    import { getListBySearch } from  "@/shop/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/shop/utils/format"

    export default {
        name: 'PurchaseOrder',
        components: { },
        data() {
            return {
                form: {
                    business_id: '',
                },
                rules:{
                    business_id: [{ required: true, message: '请选择供应商', trigger: 'blur' }],
                },
                demoList: [],
                happen_date: '',
                sumQuantity: 0,
                disabled: false,

                code:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    list: [],
                },
                title:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    visible: false,
                    activeIndex: 0,
                    list: [],
                },
                fullname:{
                    cb: {},
                    restaurants: [],
                    timeout: 0,
                    visible: false,
                    activeIndex: 0,
                    list: [],
                },
                orderId: '',
                userName: '',
                userId: '',

                status: '',

                isEdit: false,
                pageTitle: '',

                examineList: [],

            }
        },
        mounted() {
            this.demoList = []
            this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

            let orderId = this.$route.query.orderId

            this.orderId = orderId

            this.userId = this.$store.getters.currentUser.users_id

            if(this.$base.isNull(orderId)){
                //新增
                this.addCommodity()

                this.userName = this.$store.getters.currentUser.name

                this.pageTitle = '采购制单'

            }else{
                //编辑
                getInfo({
                    orderId: orderId
                }).then(res=>{
                    if(res.status == 0){

                        this.isEdit = true

                        this.pageTitle = '采购制单详情'

                        let _tmp = res.data.good

                        this.status = res.data.order.status

                        this.form.business_id = res.data.order.business_id
                        this.happen_date = res.data.order.happen_date

                        this.userName = res.data.order.member.name

                        let _arr = []

                        for(let i=0; i< _tmp.length; i++){
                            let _g =_tmp[i].good
                            _g.quantity = _tmp[i].quantity
                            _g.remarks = _tmp[i].remarks
                            _arr.push(_g)
                        }

                        this.demoList = _arr

                        this.examineList = res.data.examine
                    }
                })
            }

        },
        methods: {
            //导出Excel
            deriveExcel() {
                let url = ''
                if(window.location.hostname == this.$base.getStoreHost()){
                    url = `https://${location.hostname}/post/export/supply/order/getInfo`;
                }else{
                    url = `http://${location.hostname}:${location.port}/post/export/supply/order/getInfo`;
                }
                url += `?downloadUserId=${this.$store.getters.currentUser.users_id}&orderId=${this.orderId}`;
                window.location.href = url;
            },

            myChanged(data){
                if(data.list[0]){
                    this.form.customer_id = data.list[0].id
                }
            },
            back(){
                this.$router.go(-1)
            },
            submit(){

                let _arr = []

                for(let i=0; i<this.demoList.length; i++){

                    if(this.$base.isNull(this.demoList[i].id)){
                        this.$message({
                            showClose: true,
                            message: '第'+(i+1)+'条数据，需要重新选择商品',
                            type: "error"
                        });
                        return
                    }
                    if(this.$base.isNull(this.demoList[i].quantity)){
                        this.$message({
                            showClose: true,
                            message: '第'+(i+1)+'条数据，采购数量必填',
                            type: "error"
                        });
                        return
                    }

                    if(this.status == 3){
                        _arr.push({
                            id: this.orderId,
                            // id: this.demoList[i].id,
                            good_id: this.demoList[i].id,
                            quantity: this.demoList[i].quantity,
                            remarks: this.demoList[i].remarks
                        })
                    }else{
                        _arr.push({
                            id: 0,
                            // id: this.demoList[i].id,
                            good_id: this.demoList[i].id,
                            quantity: this.demoList[i].quantity,
                            remarks: this.demoList[i].remarks
                        })
                    }


                    //验证商品重复
                    let _t = this.demoList.filter(item => item.id == this.demoList[i].id)

                    if(_t.length >1){
                        this.$message({
                            showClose: true,
                            message: '第'+(i+1)+'条数据，'+_t[0].code+'，商品重复，请重新选择',
                            type: "error"
                        });
                        return
                    }

                }

                this.disabled = true

                save({
                    orderId: this.$base.isNull(this.orderId) ? 0 : this.orderId,
                    happen_date: this.happen_date,
                    users_id: this.userId,
                    status: 1,
                    business_id: this.form.business_id,
                    good: JSON.stringify(_arr),
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '采购制单成功',
                            type: "success",
                            duration: "1000",
                            onClose: () => {
                                this.$router.go(-1);
                            }
                        });
                    }else{
                        this.disabled = false
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: "error"
                        });
                    }
                })
            },

            handleKeyUp(type, index) {
                //code编码 | fullname名称 | title简称
                if(type == 'code'){
                    clearTimeout(this.code.timeout)
                    this.code.timeout = setTimeout(() => {
                        this.loadData('code', index)
                    }, 500)
                }else if(type == 'fullname'){
                    clearTimeout(this.fullname.timeout)
                    this.fullname.activeIndex = index
                    this.fullname.visible = true
                    this.fullname.loadList = true
                    this.fullname.timeout = setTimeout(() => {
                        this.loadData('fullname', index)
                    }, 500)
                }else if(type == 'title'){
                    clearTimeout(this.title.timeout)
                    this.title.activeIndex = index
                    this.title.visible = true
                    this.title.loadList = true
                    this.title.timeout = setTimeout(() => {
                        this.loadData('title', index)
                    }, 500)
                }
            },

            codeQuerySearchAsync(queryString, cb) {
                let restaurants = this.code.restaurants;
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                cb(results);
                this.code.cb = cb
            },

            titleQuerySearchAsync(queryString, cb) {
                let restaurants = this.title.restaurants;
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                cb(results);
                this.title.cb = cb
            },

            fullnameQuerySearchAsync(queryString, cb) {
                let restaurants = this.fullname.restaurants;
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
                cb(results);
                this.fullname.cb = cb
            },

            createStateFilter(queryString) {
                return (state) => {
                    if(typeof(state.value) === 'String' || typeof(state.value) === 'string'){
                        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
                    }
                };
            },

            loadData(type, index){

                let _params = {}
                if(type == 'title'){
                    this.title.loadList = true
                    _params = { title: this.demoList[index].title}
                }
                else if(type == 'fullname'){
                    this.fullname.loadList = true
                    _params = { fullname: this.demoList[index].fullname}
                }
                else if(type == 'code')
                    _params = { code: this.demoList[index].code}

                getListBySearch(_params).then((res)=>{

                    if(type != 'code'){
                        this.fullname.loadList = false
                        this.title.loadList = false
                    }

                    if(res.status == 0){
                        let _list = res.data.list
                        if(type == 'title'){
                            this.title.list = _list
                        }else if(type == 'fullname'){
                            this.fullname.list = _list
                        }else if(type == 'code'){
                            this.code.restaurants = formatArrayToMap(_list, 'id', 'code')
                            if(this.code.cb){
                                this.codeQuerySearchAsync(this.demoList[index].title, this.code.cb)
                            }
                            this.code.list = _list
                        }

                    }else{
                        console.log(res.msg)
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },

            handleSelect(item, index, type){
                let res = {}

                let demoList = JSON.parse(JSON.stringify(this.demoList))

                if(type == 'code'){
                    res = this.code.list.find(t => t.id == item.key)
                    demoList[index] = res
                    // this.$set(this.demoList,item,index)
                }else if(type == 'fullname'){
                    demoList[index] = item
                    // this.$forceUpdate()
                    // this.$set(this.demoList,item,index)
                }else if(type == 'title'){
                    demoList[index] = item
                    // this.$set(this.demoList,item,index)
                }

                this.demoList = JSON.parse(JSON.stringify(demoList))

            },

            addCommodity(){
                this.demoList.push({
                    stocks_num: 0,
                    unit: {
                        title: ''
                    },
                    specifications: {
                        title: ''
                    },
                    quantity: '',
                    price: '',
                    id: '',
                    title: '',
                    fullname: '',
                    code: '',
                })
            },
            removeCommodity(index){
                this.demoList.splice(index,1)
                // this.updateTable()
            },

            calculateTotal(){
                //计算总价
                let _sumQuantity = 0
                for(let i=0; i<this.demoList.length; i++){
                    _sumQuantity += this.demoList[i].quantity ? Number.parseFloat(this.demoList[i].quantity) : 0
                }
                this.sumQuantity = isNaN(_sumQuantity) ? 0 : this.$base.twoDecimal(_sumQuantity)
            },

        },

        watch:{
            demoList:{
                handler(newValue, oldValue){
                    this.calculateTotal()
                },
                deep:true
            }
        }

    }
</script>

