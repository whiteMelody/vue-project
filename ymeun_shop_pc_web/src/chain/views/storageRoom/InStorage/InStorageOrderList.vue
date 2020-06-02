<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">入库制单</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100 f14px">
                <p class="h30px lh30px fc-gray3">
                    <span class="fl">单据日期：</span>
                    <span class="fl bd-gray bd-b1">{{happen_date}} </span>
                    <span class="fl mal50">制单人：</span>
                    <span class="fl bd-gray bd-b1">{{$store.getters.currentUser.name}}</span>
                </p>
            </div>

            <div class="clear2"></div>

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

                <el-table-column align="left" label="入库数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.quantity" class="wb100" :min="0" :controls="false" :precision="2" placeholder="请输入入库数量"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="入库单价">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.price" class="wb100" :min="0" :controls="false" :precision="2" placeholder="请输入入库单价"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="供应商" >
                    <template slot-scope="scope">
                        <!-- 供应商 -->
                        <el-select placeholder="全部供应商"
                                   v-model="scope.row.business_id"
                                   class="wb100">
                            <el-option v-for="item in $store.getters.businessList" :key="item.id" :label="item.fullname"
                                       :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="生产日期">
                    <template slot-scope="scope">
                        <el-date-picker
                                class="wb100"
                                v-model="scope.row.produce_date"
                                :clearable="false"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择生产日期">
                        </el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="到期日期">
                    <template slot-scope="scope">
                        <el-date-picker
                                class="wb100"
                                v-model="scope.row.expire_date"
                                :clearable="false"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择到期日期">
                        </el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column align="left" label="税率（%）">
                    <template slot-scope="scope">
                        {{scope.row.tax}}%
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
                    入库单价（元）：{{sumPrice}}
                </span>
                <span class="fr fc-gray3 mal30 mar30">
                    入库数量：{{sumQuantity}}
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

            <div class="clear4"></div>

        </div>
    </div>

</template>


<script>

    import {save} from '@/chain/assets/api/inStorage/inStorage'

    import { getInfo } from '@/chain/assets/api/purchase/purchase'

    import { getListBySearch } from  "@/chain/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/chain/utils/format"

  export default {
      name: 'InStorageOrderList',
      components: {  },
    data() {
      return {
          demoList: [],
          form: {},
          happen_date: '',
          sumQuantity: 0,
          sumPrice: 0,
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
      }
    },
    mounted() {

        let orderId = this.$route.query.orderId

        this.orderId = orderId

        if(this.$base.isNull(orderId)){
            //新增
            this.demoList = []
            this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')
            this.addCommodity()
        }else{
            //订单入库
            getInfo({
                orderId: orderId
            }).then(res=>{
                if(res.status == 0){
                    let _tmp = res.data.good
                    this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')
                    let _arr = []
                    for(let i=0; i< _tmp.length; i++){
                        let _g =_tmp[i].good
                        _g.quantity = _tmp[i].quantity
                        _g.remarks = _tmp[i].remarks
                        _arr.push(_g)
                    }
                    this.demoList = _arr
                }
            })
        }

    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        submit(){

            let _arr = []

            //验证非空

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
                        message: '第'+(i+1)+'条数据，入库数量必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].price)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，入库单价必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].business_id)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，供应商必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].produce_date)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，生产日期必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.isNull(this.demoList[i].expire_date)){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，过期日期必填',
                        type: "error"
                    });
                    return
                }
                if(this.$base.dateTimeToDate(this.demoList[i].produce_date,'time')>= this.$base.dateTimeToDate(this.demoList[i].expire_date, 'time')){
                    this.$message({
                        showClose: true,
                        message: '第'+(i+1)+'条数据，过期日期时间需大于生产日期',
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
                    id: 0,
                    good_id: this.demoList[i].id,
                    quantity: this.demoList[i].quantity,
                    price: this.demoList[i].price,
                    business_id: this.demoList[i].business_id,
                    produce_date: this.demoList[i].produce_date,
                    expire_date: this.demoList[i].expire_date,
                })

            }

            this.disabled = true

            save({
                warehouseId: 0,
                happen_date: this.happen_date,
                users_id: this.$store.getters.currentUser.users_id,
                good: JSON.stringify(_arr),
                status: '1',
                style: 1,
                order_id: this.orderId || 0,
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '入库成功',
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
            let _sumPrice = 0
            for(let i=0; i<this.demoList.length; i++){
                _sumQuantity += this.demoList[i].quantity ? Number.parseFloat(this.demoList[i].quantity) : 0
                _sumPrice += this.demoList[i].price ? Number.parseFloat(this.demoList[i].price) : 0
            }
            this.sumQuantity = isNaN(_sumQuantity) ? 0 : this.$base.twoDecimal(_sumQuantity)
            this.sumPrice = isNaN(_sumPrice) ? 0 : this.$base.twoDecimal(_sumPrice)
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

