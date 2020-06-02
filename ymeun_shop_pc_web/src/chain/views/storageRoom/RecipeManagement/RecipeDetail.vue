<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">新增配方</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">


                <div class="wb100 f14px">
                    <p class="h30px lh30px fc-gray3">
                        <span class="fl">大类项目名称：</span>
                        <span class="fl bd-gray bd-b1">{{form.itemName}} </span>
                        <span class="fl mal50">二类项目名称：</span>
                        <span class="fl bd-gray bd-b1">{{form.itemsParentName}}</span>
                    </p>
                </div>

                <!--<el-form :inline="true" :rules="rules" :model="form">-->
                    <!--<el-form-item label="大类项目名称" prop="itemName">-->
                        <!--<el-select v-model="form.itemName" placeholder="请选择项目" readonly disabled>-->
                            <!--<el-option label key value></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="二类项目名称" prop="itemsParentName">-->
                        <!--<el-select v-model="form.itemsParentName" placeholder="二类项目名称" readonly disabled>-->
                            <!--<el-option label key value></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->

                <div class="clear3"></div>

                <template v-for="(item, index) in data.meal">

                    <p class="h40px lh40px" v-if="item.items">套餐名称：{{item.items.name}}</p>

                    <el-table slot="list" :data="item.list" border class="myTable">

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
                                        @select="(item)=> handleSelect(item, scope.$index, 'code', index)"
                                        @keyup.native="handleKeyUp('code', scope.$index, index)">
                                </el-autocomplete>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="商品名称">
                            <template slot-scope="scope">
                                <!-- 商品名称 -->
                                <div class="wb100">
                                    <el-input @keyup.native="handleKeyUp('fullname', scope.$index, index)"
                                              class="wb100"
                                              @blur="fullname.visible = false"
                                              v-model="scope.row.fullname"
                                              placeholder="请输入商品名称"></el-input>
                                    <el-popover v-if="fullname.activeIndex == scope.$index + '' + index"
                                                placement="bottom"
                                                width="600"
                                                trigger="manual"
                                                v-model="fullname.visible">
                                        <el-table :data="fullname.list" v-loading="fullname.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'fullname', index)">
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
                                    <el-input @keyup.native="handleKeyUp('title', scope.$index, index)"
                                              class="wb100"
                                              @blur="title.visible = false"
                                              v-model="scope.row.title"
                                              placeholder="请输入商品简称"></el-input>
                                    <el-popover v-if="title.activeIndex == scope.$index + '' + index"
                                                placement="bottom"
                                                width="600"
                                                trigger="manual"
                                                v-model="title.visible">
                                        <el-table :data="title.list" v-loading="title.loadList" @row-click="(item)=> handleSelect(item, scope.$index, 'title', index)">
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

                        <el-table-column align="left" label="所需数量">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.quantity" class="wb100" placeholder="请输入所需数量"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="备注">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.remarks" class="wb100" placeholder="请输入备注"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column align="left">
                            <template slot="header" slot-scope="scope">
                                <el-button icon="el-icon-plus" size="mini" @click="addCommodity(index)"></el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button icon="el-icon-minus" size="mini" @click="removeCommodity(scope.$index, index)"></el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                    <!--      合计      -->
                    <div class="pal20 par20 h34px lh34px bd-gray bd-b1 bd-l1 bd-r1 f14px">
                        <span class="fl">合计</span>
                        <span class="fr fc-gray3">商品数量：{{item.sumQuantity}}</span>
                    </div>

                    <div class="clear h70px"></div>

                </template>

                <div class="clear0"></div>

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
    </div>

</template>


<script>

    import { getList, formulaAdd, getFormulaEdit, formulaEdit, } from '@/chain/assets/api/recipe/recipe'

    import { getListBySearch } from  "@/chain/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/chain/utils/format"

    export default {
        name: 'RecipeDetail',
        components: {  },
        data() {
            return {
                form: {
                    itemsParentId: '',
                    itemsId: '',
                    itemName: '',
                    itemsParentName: '',
                },
                rules:{
                    itemsParentId: [{ required: true, message: '请选择项目大类', trigger: 'blur' }],
                    itemsId: [{ required: true, message: '请选择项目二类', trigger: 'blur' }],
                },
                sumQuantity: 0,
                formulaId: '',
                data: {},
                disabled: false,
                isEdit: false,

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
            //判断是否是编辑

            let row = this.$route.query.row
            this.form.itemName = this.$route.query.pname

            if(!this.$base.isNull(row)){
                row = JSON.parse(row)
                this.formulaId = row.id
                this.form.itemsParentId = row.items_parent_id
                this.form.itemsId = row.items_id

                this.form.itemsParentName = row.items.name

                if(row.goodCount>0){

                    this.isEdit = true

                    //修改
                    if(row.meal.length){
                        //套餐
                        for(let i=0; i<row.meal.length; i++){

                            let _list = []

                            for(let j=0; j<row.meal[i].good.length; j++ ){
                                _list.push({
                                    stocks_num: row.meal[i].good[j].good.stocks_num,
                                    unit: row.meal[i].good[j].good.unit,
                                    specifications: row.meal[i].good[j].good.specifications,
                                    quantity: row.good.find(item => item.good_id == row.meal[i].good[j].good.id).quantity,
                                    price: row.meal[i].good[j].good.price,
                                    id: row.meal[i].good[j].good.id,
                                    title: row.meal[i].good[j].good.title,
                                    fullname: row.meal[i].good[j].good.fullname,
                                    code: row.meal[i].good[j].good.code,
                                    remarks: row.good.find(item => item.good_id == row.meal[i].good[j].good.id).remark,
                                })
                            }
                            row.meal[i].list = _list
                            row.meal[i].sumQuantity = 0
                            row.meal[i].itemsId = row.meal[i].items_id
                            row.meal[i].itemsParentId = row.meal[i].items_parent_id
                        }

                    }else{
                        //普通项目

                        let _list = []

                        for(let j=0; j<row.good.length; j++ ){
                            _list.push({
                                stocks_num: row.good[j].good.stocks_num,
                                unit: row.good[j].good.unit,
                                specifications: row.good[j].good.specifications,
                                quantity: row.good[j].quantity,
                                price: row.good[j].good.price,
                                id: row.good[j].good.id,
                                title: row.good[j].good.title,
                                fullname: row.good[j].good.fullname,
                                code: row.good[j].good.code,
                                remarks: row.good[j].remark,
                            })
                        }
                        row.meal[0] = {
                            list: _list,
                            sumQuantity: row.goodCount,
                            itemsId: row.items_id,
                            itemsParentId:  row.items_parent_id,
                        }

                    }

                    this.data = row

                }else{

                    console.log(row)

                    //新增
                    if(row.meal.length){
                        //套餐

                        for(let i=0; i<row.meal.length; i++){
                            row.meal[i].list = [{
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
                            }]
                            row.meal[i].sumQuantity = 0
                            row.meal[i].itemsId = row.meal[i].items_id
                            row.meal[i].itemsParentId = row.meal[i].items_parent_id
                        }

                    }else{
                        //普通项目
                        row.meal[0] = {
                            list: [{
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
                            }],
                            sumQuantity: 0,
                            itemsId: row.items_id,
                            itemsParentId:  row.items_parent_id,
                        }
                    }

                    this.data = row

                }

            }else{

                this.$message({
                    message: '系统错误',
                    type: 'error',
                })

            }

        },
        methods: {

            back(){
                this.$router.go(-1)
            },

            submit(){

                let params = []

                let _arr = []

                //验证非空
                for(let i=0; i<this.data.meal.length; i++){

                    _arr = []

                    for(let j=0; j<this.data.meal[i].list.length; j++){
                        if(this.$base.isNull(this.data.meal[i].list[j].id)){
                            this.$message({
                                showClose: true,
                                message: '第'+(i+1)+'个表格，第'+(j+1)+'条，需要重新选择商品',
                                type: "error"
                            });
                            return
                        }
                        if(this.$base.isNull(this.data.meal[i].list[j].quantity)){
                            this.$message({
                                showClose: true,
                                message: '第'+(i+1)+'个表格，第'+(j+1)+'条，所需数量必填',
                                type: "error"
                            });
                            return
                        }
                        _arr.push({
                            id: this.data.meal[i].list[j].id,
                            good_id: this.data.meal[i].list[j].id,
                            quantity: this.data.meal[i].list[j].quantity,
                            remarks: this.data.meal[i].list[j].remarks,
                        })
                    }
                    params.push({
                        list: _arr,
                        quantity: this.data.meal[i].sumQuantity,
                        itemsId: this.data.meal[i].itemsId,
                        itemsParentId: this.data.meal[i].itemsParentId,
                    })
                }

                this.disabled = true

                if(!this.isEdit){
                    //新增
                    formulaAdd({
                        itemsId: this.form.itemsId,
                        itemsParentId: this.form.itemsParentId,
                        data: JSON.stringify(params),
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '新增配方成功',
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
                }else{
                    //修改
                    formulaEdit({
                        itemsId: this.form.itemsId,
                        itemsParentId: this.form.itemsParentId,
                        formulaId: this.formulaId,
                        e_id: this.$store.getters.currentUser.e_id,
                        data: JSON.stringify(params),
                    }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                showClose: true,
                                message: '修改配方成功',
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
                }

            },

            handleKeyUp(type, index, index2) {
                //code编码 | fullname名称 | title简称
                if(type == 'code'){
                    clearTimeout(this.code.timeout)
                    this.code.timeout = setTimeout(() => {
                        this.loadData('code', index, index2)
                    }, 500)
                }else if(type == 'fullname'){
                    clearTimeout(this.fullname.timeout)
                    this.fullname.activeIndex = index + '' + index2
                    this.fullname.visible = true
                    this.fullname.loadList = true
                    this.fullname.timeout = setTimeout(() => {
                        this.loadData('fullname', index, index2)
                    }, 500)
                }else if(type == 'title'){
                    clearTimeout(this.title.timeout)
                    this.title.activeIndex = index + '' + index2
                    this.title.visible = true
                    this.title.loadList = true
                    this.title.timeout = setTimeout(() => {
                        this.loadData('title', index, index2)
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

            loadData(type, index, index2){

                let _params = {}

                let item = this.data.meal[index2].list[index]

                if(type == 'title'){
                    this.title.loadList = true
                    _params = { title: item.title}
                }
                else if(type == 'fullname'){
                    this.fullname.loadList = true
                    _params = { fullname: item.fullname}
                }
                else if(type == 'code')
                    _params = { code: item.code}

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
                                this.codeQuerySearchAsync(item.title, this.code.cb)
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

            handleSelect(item, index, type, index2){
                let res = {}

                let data = JSON.parse(JSON.stringify(this.data))

                if(type == 'code'){
                    res = this.code.list.find(t => t.id == item.key)
                    data.meal[index2].list[index] = res
                }else if(type == 'fullname'){
                    res = item
                    data.meal[index2].list[index] = res
                }else if(type == 'title'){
                    res = item
                    data.meal[index2].list[index] = res
                }

                this.data = JSON.parse(JSON.stringify(data))

            },

            addCommodity(index){
                this.data.meal[index].list.push({
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
            removeCommodity(index, index2){
                this.data.meal[index2].list.splice(index,1)
                // this.updateTable()
            },

            calculateTotal(){
                //计算总价

                for(let i=0; i<this.data.meal.length; i++){

                    let _sumQuantity = 0

                    for(let j=0; j<this.data.meal[i].list.length; j++){
                        _sumQuantity += this.data.meal[i].list[j].quantity ? Number.parseFloat(this.data.meal[i].list[j].quantity) : 0
                    }
                    this.data.meal[i].sumQuantity = isNaN(_sumQuantity) ? 0 : this.$base.twoDecimal(_sumQuantity)

                }

            },

        },

        watch: {
            data:{
                handler(newValue, oldValue){
                    this.calculateTotal()
                },
                deep:true
            }
        }

    }
</script>

