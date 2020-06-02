<template>
  <div class="wb100">
    <div class="pa20">

      <div class="wb30 lh40px fc-gray3 fl">

        <div class="pa20 bg-white">
          <p class="f24px fc-gray4" @click="$router.push({ name:'ClientDel', query: { id: userData.id, types: 4}})">
            {{userData.name}}
            <span v-if="userData.sex.value == 0" class="iconfont iconnv fc-red"></span>
            <span v-else class="iconfont iconnan fc-blue"></span>
          </p>

          <div class="clear2"></div>

          <p class="f16px">电话：{{userData.mobile}}</p>

          <p class="f16px">门店：{{userData.store.name}}</p>

          <div class="clear0"></div>
        </div>

        <div class="clear4"></div>

        <div class="pal20 par20 bg-white">
          <p class="fc-gray4 f16px h40px lh40px">开单信息</p>
          <div class="clear0 bd-b1 bd-gray"></div>

          <div class="clear4"></div>

          <div class="wb100">

            <el-form :inline="false" ref="form2" :model="form2" :rules="rules2" label-width="110px">

              <el-form-item prop="technician" label="美容师">
                <el-select :disabled="cosmetologistDataShow" v-model="form2.technician" placeholder="请选择美容师" readonly="" clearable class="wb100">
                  <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                             :value="item.key"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="therapy" label="治疗间">
                <el-select v-model="form2.therapy" placeholder="请选择治疗间" readonly="" clearable class="wb100" popper-class="room_list">
                  <el-option v-for="(item,index) in therapyList" :key="index" :label="item.name"
                             :value="item.id"  v-show="item.status != 2 && item.open != 2">
                    <div :class="{'room_list_type':true,'active': item.status == 2}">
                      <a>{{item.name}}</a>
                      <p>
                        <span v-if="item.status == 2 && item.open == 1 ">使用中 <i v-if="item.dis != ''">（剩余{{item.dis}}分钟）</i></span>
                        <b v-else>空闲</b>
                      </p>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="dateTimer" label="预计治疗时长">
                <el-input type='number' min='1' v-model="form2.dateTimer" placeholder="预计治疗时长" class="therapy_date wb100">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>

            </el-form>

            <div class="clear2 bd-b1 bd-gray"></div>

            <div class="clear2"></div>

            <p class="f16px fc-gray2">项目名称</p>

            <template v-for="item in projectList">
              <p class="lh30px fc-gray3">
                <span class="fl">{{item.items_name}}</span>
                <span class="fl mal20 fc-gray2 f12px">剩余：{{item.shengyu}}</span>
                <el-input-number class="fr" v-model="item.operationNum" :step="1" :max="item.shengyu" :min="0" @change="numberChange(item)"></el-input-number>
              </p>
              <div class="clear4"></div>

            </template>

          </div>

        </div>

      </div>

      <div class="wb70 fr">

        <div class="pal20">

          <div class="wb100">
            <div class="bg-white pal20 par20">
              <p class="fc-gray4 f16px h40px lh40px">划扣出库制单</p>

              <div class="clear0 bd-b1 bd-gray"></div>

              <div class="clear4"></div>

              <div class="wb100 f16px">
                <p class="h30px lh30px fc-gray2">制单基本信息</p>
                <p class="h30px lh30px fc-gray3">
                  <span class="fl">单据日期：{{happen_date}} </span>
                  <span class="fl mal50">制单人：{{$store.getters.currentUser.name}}</span>
                </p>
              </div>

              <div class="clear2 bd-b1 bd-gray"></div>

              <div class="clear4"></div>

<!--              <div class="wb100">-->

<!--                <el-form ref="form" :inline="true" :rules="rules" :model="form">-->

<!--                  <el-form-item label="领用人" prop="receive_users_id">-->
<!--                    <el-select placeholder="请选择" v-model="form.receive_users_id">-->
<!--                      <el-option v-for="item in $store.getters.staffList2" :key="item.users_id" :label="item.name"-->
<!--                                 :value="item.users_id"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->

<!--                </el-form>-->

<!--              </div>-->

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

                <el-table-column align="center" label="库存数量">
                  <template slot-scope="scope">
                    {{scope.row.stocks_num}}
                  </template>
                </el-table-column>

                <el-table-column align="center" label="出库数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.formulaGoodQuantity" class="wb100" placeholder="请输入出库数量"></el-input>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="备注">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remarks" class="wb100" placeholder="请输入出库备注"></el-input>
                  </template>
                </el-table-column>

                <el-table-column align="center">
                  <template slot-scope="scope">
                    <el-button icon="el-icon-minus" @click="removeCommodity(scope.$index)"></el-button>
                  </template>
                </el-table-column>

              </el-table>

              <!--      合计      -->
              <div class="pal20 par20 h60px lh60px bd-gray bd-b1 bd-l1 bd-r1 f16px">
                <span class="fl f18px">合计</span>
                <span class="fr fc-gray3">
                    出库数量：{{sumQuantity}}
                </span>
              </div>

              <div class="clear h70px"></div>

              <template v-if="disabled">
                <el-button type="primary" class="fr w100px" disabled>确认</el-button>
              </template>
              <template v-else>
                <el-button type="primary" class="fr w100px" @click="submit">确认</el-button>
              </template>
              <el-button class="fr mal50 mar50 w100px" @click="back">取消</el-button>

              <div class="clear4"></div>

            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>

  import {outboundAdd} from '@/shop/assets/api/outStorage/outStorage'

  import { getListBySearch } from  "@/shop/assets/api/store/store"

  import { getFormulaGetByItemsId } from  "@/shop/assets/api/recipe/recipe"

  import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient"

  import { formatArrayToMap, formatArrayToStringMap } from "@/shop/utils/format"

  import { getAvailableItemList , getTherapeuticRoomAllList , postSave } from "@/shop/assets/api/deduction/deduction"

  export default {
    name: 'ScratchOperationStore',
    components: { autoSearchClient },
    data() {
      return {

        userData:{
          sex:{},
          store:{}
        },
        customer_id: '',
        form: {
          receive_users_id: '',
        },
        rules:{
          receive_users_id: [{ required: true, message: '请选择领用人', trigger: 'blur' }],
        },
        form2:{
          technician: "",
          room: "",
          dateTimer: ''
        },
        rules2: {
          dateTimer: [{ required: false, message: '请输入治疗时长', trigger: 'blur'}],
          technician: [{ required: true, message: '请选择美容师', trigger: 'change'}],
          therapy: [{ required: false, message: '请选择治疗间', trigger: 'change'}],
        },
        demoList: [],
        happen_date: '',
        sumQuantity: 0,
        therapyList: [],
        cosmetologistDataShow: false,
        projectList: [],

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

        disabled: false,

      }
    },
    mounted() {

      if(this.$store.getters.currentUser.role_id == 4){
        this.cosmetologistDataShow = true
        this.form2.technician = this.$store.getters.currentUser.users_id
      }

      this.customer_id = this.$route.query.id

      getAvailableItemList({
        customer_id: this.customer_id,
        status:0,
      }).then(res=>{
        if(res.status == 0){
          this.userData = res.data.customer;
          //后台说这里不用接口
          this.demoList = []
          this.happen_date = this.$base.timestampToDateString(new Date().getTime() / 1000, 'date2')
          // this.addCommodity()
          let _arr = res.data.list.filter(item => item.shengyu > 0)
          _arr.map((item , index) => {
            item.operationNum = 0;
          })
          this.projectList = _arr
        }
      })

      getTherapeuticRoomAllList({}).then(res => {
        if(res.status == 0) {
          this.therapyList = res.data
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

      numberChange(item){

        let _tmp = this.projectList

        let _arr = []

        for(let i=0; i< _tmp.length; i++){
          _arr.push({
            itemId: _tmp[i].items_id,
            number: _tmp[i].operationNum
          })
        }

        getFormulaGetByItemsId({
          itemsId: JSON.stringify(_arr)
        }).then(res=>{
          if(res.status == 0){
            this.demoList = res.data.list
            // this.calculateTotal()
          }
        })

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
          if(this.$base.isNull(this.demoList[i].formulaGoodQuantity)){
            this.$message({
              showClose: true,
              message: '第'+(i+1)+'条数据，出库数量必填',
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
            quantity: this.demoList[i].formulaGoodQuantity,
            remarks: this.demoList[i].remarks
          })
        }

        let _arr2 = []
        this.projectList.map((item , index) => {
          if(item.operationNum > 0){
            _arr2.push({
              num:item.operationNum,
              receipt_id:item.id
            })
          }
        })

        this.disabled = true

          if(_arr.length == 0){
              //直接出库
              postSave({
                  customerId: this.customer_id,
                  status: 1,
                  technicianId: this.form2.technician,
                  // technicianId: this.form.receive_users_id,
                  roomId: this.form2.therapy,
                  roomUseTime: this.form2.dateTimer,
                  data: JSON.stringify(_arr2),
                  // good_data: JSON.stringify(_arr),
                  receive_users_id: this.form2.technician,
                  // outbound_id: res.data.id,
                  // receive_users_id: this.form.receive_users_id,
                  type: this.form.type,
              }).then(res => {
                  if(res.status == 0){
                      this.$message({
                          showClose: true,
                          message: '划扣成功',
                          type: 'success',
                          onClose:()=>{
                              this.$router.go(-1);
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
                  this.$message({
                      showClose: true,
                      message: error,
                      type: 'error',
                  });
                  this.disabled = false
              })
          }else{
              //划扣出库
              outboundAdd({
                  type: 5,
                  receive_users_id: this.form2.technician,
                  customer_id: this.customer_id,
                  good_data: JSON.stringify(_arr),
              }).then(res=>{
                  this.disabled = false
                  if(res.status == 0){
                      this.$message({
                          showClose: true,
                          message: '出库成功',
                          type: "success",
                          duration: "1000",
                          onClose: () => {
                              postSave({
                                  customerId: this.customer_id,
                                  status: 1,
                                  technicianId: this.form2.technician,
                                  // technicianId: this.form.receive_users_id,
                                  roomId: this.form2.therapy,
                                  roomUseTime: this.form2.dateTimer,
                                  data: JSON.stringify(_arr2),
                                  good_data: JSON.stringify(_arr),
                                  receive_users_id: this.form2.technician,
                                  outbound_id: res.data.id,
                                  // receive_users_id: this.form.receive_users_id,
                                  type: this.form.type,
                              }).then(res => {
                                  if(res.status == 0){
                                      this.$message({
                                          showClose: true,
                                          message: '划扣成功',
                                          type: 'success',
                                          onClose:()=>{
                                              this.$router.go(-1);
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
                                  this.$message({
                                      showClose: true,
                                      message: error,
                                      type: 'error',
                                  });
                                  this.disabled = false
                              })

                          }
                      });
                  }else{
                      this.$message({
                          showClose: true,
                          message: res.msg,
                          type: "error"
                      });
                  }
              })
          }



        // outboundAdd({
        //   type: this.form.type,
        //   receive_users_id: this.form.receive_users_id,
        //   customer_id: this.form.customer_id,
        //   good_data: JSON.stringify(_arr),
        // }).then(res=>{
        //   if(res.status == 0){
        //     this.$message({
        //       showClose: true,
        //       message: '出库成功',
        //       type: "success",
        //       duration: "1000",
        //       onClose: () => {
        //         this.$router.go(-1);
        //       }
        //     });
        //   }else{
        //     this.$message({
        //       showClose: true,
        //       message: res.msg,
        //       type: "error"
        //     });
        //   }
        // })

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
          _sumQuantity += this.demoList[i].formulaGoodQuantity ? Number.parseFloat(this.demoList[i].formulaGoodQuantity) : 0
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
      },
    }

  }
</script>

<style>
  .room_list .room_list_type{
    display: flex;
  }
  .room_list .selected .room_list_type{
    font-weight: normal;
  }
  .room_list .selected .room_list_type a{
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
    width: 1.2rem;
    padding-right: .1rem;
    color: #333;
  }
  .room_list .room_list_type p b{
    color: #0DC9E5;
    font-weight: normal;
  }
  .room_list .room_list_type p span{
    color: #FF5722;
  }
  .room_list .room_list_type p span i{
    color: #666;
    font-style: normal;
  }
</style>
