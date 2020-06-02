<!--form-->
<template>

    <div class="wb100">

        <template v-if="isEdit">

            <div class="pal24 par24 pat20 pab20">

                <div class="bg-white pal20 par20">
                    <p class="fc-gray4 f14px h40px lh40px">请货订单详情</p>

                    <div class="clear-f2"></div>

                    <div class="clear2"></div>

                    <div class="wb100 f14px">
                        <span class="fl">单据日期：</span>
                        <span class="fl bd-gray bd-b1">{{dataInfo.shortage.happen_date}} </span>
                        <span class="fl mal20">制单人：</span>
                        <span class="fl bd-gray bd-b1 mar10">{{dataInfo.shortage.users.name}}</span>
                    </div>

                    <div class="clear2"></div>

                    <div class="pa20 bg-white4">
                        <div class="w150px fl h40px lh40px text-center bd-gray bd-r1 fc-gray4 mar50">
                            请货合计
                        </div>
                        <div class="w150px fl h40px lh15px mar50">
                            <p class="fc-gray2">请货总数量</p>
                            <p class="Fb fc-gray4 f20px mat10">{{dataInfo.shortage.quantity | _filterNumFormat }}</p>
                        </div>

                        <div class="clear0"></div>
                    </div>

                </div>

                <div class="clear3"></div>

                <div class="pal20 par20 bg-white">

                    <el-table slot="list" :data="dataInfo.list" border>

                        <el-table-column align="left" label="序号" width="50px">
                            <template slot-scope="scope">
                                {{scope.$index+ 1}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品编码">
                            <template slot-scope="scope">
                                {{scope.row.good.code}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品名称">
                            <template slot-scope="scope">
                                {{scope.row.good.fullname}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品简称">
                            <template slot-scope="scope">
                                {{scope.row.good.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品规格">
                            <template slot-scope="scope">
                                {{scope.row.good.specifications.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品单位">
                            <template slot-scope="scope">
                                {{scope.row.good.unit.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="请货数量">
                            <template slot-scope="scope">
                                {{scope.row.quantity | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="供应商">
                            <template slot-scope="scope">
                                {{scope.row.good.business.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="备注">
                            <template slot-scope="scope">
                                {{scope.row.remarks}}
                            </template>
                        </el-table-column>

                    </el-table>

                    <div class="clear h70px"></div>

<!--                    <el-button class="fr mal50 mar50 w100px" @click="back">返回</el-button>-->

                    <div class="clear2"></div>

                </div>
            </div>

        </template>

        <template v-else>
            <div class="pal24 par24 pat20 pab20">
                <div class="bg-white pal20 par20">
                    <p class="fc-gray4 f14px h40px lh40px">请货制单</p>

                    <div class="clear-f2"></div>

                    <div class="clear2"></div>

                    <div class="wb100 f14px">
                        <div class="wb100 f14px">
                            <span class="fl">单据日期：</span>
                            <span class="fl bd-gray bd-b1">{{dataInfo.shortage.happen_date}} </span>
                            <span class="fl mal20">制单人：</span>
                            <span class="fl bd-gray bd-b1 mar10">{{dataInfo.shortage.users.name}}</span>
                        </div>
                        <div class="w200px fl text-center h70px bd-gray bd-l1 lh30px">
                            <p class="fc-gray3">出库总数量</p>
                            <div class="clear2"></div>
                            <p class="f28px fc-gray4">{{dataInfo.shortage.quantity | _filterNumFormat }}</p>
                        </div>
                    </div>

                </div>

                <div class="clear2"></div>

                <div class="bg-white pal20 par20">

                    <el-table slot="list" :data="demoList" border class="myTable">

                        <el-table-column align="left" label="序号" width="50px">
                            <template slot-scope="scope">
                                {{scope.$index+ 1}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品编码">
                            <template slot-scope="scope">
                                <!-- 商品编码 -->
                                <el-autocomplete
                                        class="wb100"
                                        v-model="scope.row.code"
                                        :fetch-suggestions="codeQuerySearchAsync"
                                        placeholder="请输入商品编码"
                                        :trigger-on-focus="true"
                                        @select="(item)=> handleSelect(item, scope.$index, 'code')"
                                        @keyup.native="handleKeyUp('code', scope.$index)">
                                </el-autocomplete>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品名称">
                            <template slot-scope="scope">
                                <!-- 商品名称 -->
                                <div class="wb100">
                                    <el-input @keyup.native="handleKeyUp('fullname', scope.$index)"
                                              class="wb100"
                                              @blur="fullname.visible = false"
                                              v-model="scope.row.fullname"
                                              placeholder="请输入商品名称"></el-input>
                                    <el-popover v-if="fullname.activeIndex == scope.$index"
                                                placement="bottom"
                                                width="600"
                                                trigger="manual"
                                                v-model="fullname.visible">
                                        <el-table :data="fullname.list" v-loading="fullname.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'fullname')">
                                            <el-table-column align="left" label="商品编码">
                                                <template slot-scope="scope">
                                                    {{scope.row.code}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品名称">
                                                <template slot-scope="scope">
                                                    {{scope.row.fullname}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品简称">
                                                <template slot-scope="scope">
                                                    {{scope.row.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品规格">
                                                <template slot-scope="scope">
                                                    {{scope.row.specifications.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品单位">
                                                <template slot-scope="scope">
                                                    {{scope.row.unit.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="供应商">
                                                <template slot-scope="scope">
                                                    {{scope.row.business.title}}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品简称">
                            <template slot-scope="scope">
                                <!-- 商品简称 -->
                                <div class="wb100">
                                    <el-input @keyup.native="handleKeyUp('title', scope.$index)"
                                              class="wb100"
                                              @blur="title.visible = false"
                                              v-model="scope.row.title"
                                              placeholder="请输入商品简称"></el-input>
                                    <el-popover v-if="title.activeIndex == scope.$index"
                                                placement="bottom"
                                                width="600"
                                                trigger="manual"
                                                v-model="title.visible">
                                        <el-table :data="title.list" v-loading="title.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'title')">
                                            <el-table-column align="left" label="商品编码">
                                                <template slot-scope="scope">
                                                    {{scope.row.code}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品名称">
                                                <template slot-scope="scope">
                                                    {{scope.row.fullname}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品简称">
                                                <template slot-scope="scope">
                                                    {{scope.row.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品规格">
                                                <template slot-scope="scope">
                                                    {{scope.row.specifications.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="商品单位">
                                                <template slot-scope="scope">
                                                    {{scope.row.unit.title}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="left" label="供应商">
                                                <template slot-scope="scope">
                                                    {{scope.row.business.title}}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品规格">
                            <template slot-scope="scope">
                                {{scope.row.specifications.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品单位">
                            <template slot-scope="scope">
                                {{scope.row.unit.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="供应商" >
                            <template slot-scope="scope">
                                <!-- 供应商 -->
                                <el-select placeholder="全部供应商" v-model="scope.row.business_id" class="wb100">
                                    <el-option v-for="item in $store.getters.businessList" :key="item.id" :label="item.fullname"
                                               :value="item.id"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="请货数量">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.quantity" class="wb100" :min="0"  :controls="false" :precision="2" placeholder="请输入请货数量"></el-input-number>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="备注">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remarks" class="wb100" placeholder="请输入请货备注"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column align="left">
                            <template slot="header" slot-scope="scope">
                                <el-button icon="el-icon-plus" size="mini" @click="addCommodity"></el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button icon="el-icon-minus" size="mini" @click="removeCommodity(scope.$index)"></el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                    <!--      合计      -->
                    <div class="pal20 par20 h34px lh34px bd-gray bd-b1 bd-l1 bd-r1 f14px">
                        <span class="fl">合计</span>
                        <span class="fr fc-gray3">
                        请货总数量：{{sumQuantity}}
                        </span>
                    </div>

                    <div class="clear h70px"></div>

                    <template v-if="disabled">
                        <el-button type="primary" class="fr minW100" disabled>提交中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" class="fr minW100" @click="submit">确认</el-button>
                    </template>

                    <el-button class="fr mal20 mar20 minW100" @click="back">取消</el-button>

                    <div class="clear2"></div>

                </div>
            </div>
        </template>

    </div>


</template>


<script>

    import { shortageAdd, getShortageDetails } from '@/chain/assets/api/pleaseGoods/pleaseGoods'

    import { getListBySearch } from  "@/chain/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/chain/utils/format"

    export default {
        name: 'PleaseGoodsDetail',
        components: {  },
        data() {
            return {
                demoList: [],
                happen_date: '',
                sumQuantity: 0,
                shortage_id: '',
                isEdit: false,
                type: 1,
                disabled: false,

                dataInfo: {
                    shortage: {
                        users: {},
                    },
                    list: []
                },

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
            }
        },
        mounted() {
            this.demoList = []
            this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')

            this.shortage_id = this.$route.query.shortage_id

            if(this.$base.isNull(this.shortage_id)){
                //新增
                this.addCommodity()
            }else{
                //编辑
                this.isEdit = true

                getShortageDetails({
                    shortage_id: this.shortage_id,
                }).then(res=>{
                    if(res.status == 0){
                        this.dataInfo = res.data
                        console.log(res)
                    }
                })
            }

        },
        methods: {
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
                        // this.$message({
                        //     showClose: true,
                        //     message: '第'+(i+1)+'条数据，出库数量必填',
                        //     type: "error"
                        // });
                        this.$message({
                            showClose: true,
                            message: '请货数量必填',
                            type: "error"
                        });
                        return
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

                    _arr.push({
                        id: this.demoList[i].id,
                        good_id: this.demoList[i].id,
                        quantity: this.demoList[i].quantity,
                        remarks: this.demoList[i].remarks
                    })
                }

                this.disabled = true

                shortageAdd({
                    happenDate: this.happen_date,
                    shortageGoods: JSON.stringify(_arr),
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '请货成功',
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

