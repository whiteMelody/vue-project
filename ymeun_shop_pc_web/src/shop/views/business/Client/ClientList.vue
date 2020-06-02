<template>
  <div class="ClientList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>客户列表</header>
    <div class="box">
      <base-list
        ref="demoTable"
        :condition="condition"
        :datas.sync="demoList"
        :pageSearch="pageSearch"
        :isPaging="true"
      >
        <el-form
          :inline="true"
          :model="condition"
          class="search-form"
          slot="search"
          label-width="80px"
        >
          <el-form-item>
            <auto-search-client @changed="myChanged"></auto-search-client>
          </el-form-item>

          <el-form-item class="w240px">
            <el-date-picker
              class="wb100"
              v-model="daterangeTimer"
              :clearable="false"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <!-- <el-form-item>
            <date-slot :dateTime.sync="dateTime"></date-slot>
          </el-form-item> -->

          <el-form-item>
            <el-select v-model="condition.adviserId" :placeholder="'选择'+$store.getters.roleName.adviser" readonly clearable :disabled="roleChoosable">
              <el-option
                v-for="item in $store.getters.counselorMap"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="condition.customerType" placeholder="选择状态" readonly clearable>
              <el-option :label="'全部到店状态'" value="-1"></el-option>
              <el-option v-for="[key,val] in _dictDaodianType" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <el-select v-model="condition.style" placeholder="选择客户类别" readonly clearable>
              <el-option v-for="[key,val] in _dictSpareCustomer" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="mar10 fl">
              <el-select
                v-model="form.c1"
                placeholder="选择渠道"
                readonly
                clearable
                @change="form.c2 = ''"
              >
                <el-option key label="全部渠道" value></el-option>
                <el-option
                  v-for="item in $store.getters.channelList1Map"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </div>
            <div class="fl">
              <el-select v-model="form.c2" placeholder="选择下级项目类别" readonly clearable v-if="form.c1">
                <el-option
                  v-for="item in $store.getters.channelList2Map(form.c1)"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
          <el-table-column prop="id" align="center" label="序号" width="70px">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="created_at" align="center" label="创建日期">
            <template slot-scope="scope">{{ scope.row.created_at | _endTimeFormat}}</template>
          </el-table-column>

          <el-table-column prop="channel" align="center" label="渠道">
            <template slot-scope="scope">{{ scope.row.channel.name }}</template>
          </el-table-column>

          <el-table-column prop="channel" align="center" label="意向项目">
            <template slot-scope="scope">{{ scope.row.item.name }}</template>
          </el-table-column>

          <el-table-column prop="name" align="center" label="姓名">
            <template slot-scope="scope">
              <el-link :underline="false" @click="SeeClick(scope.row.id)">{{ scope.row.name }}</el-link>
            </template>
          </el-table-column>

          <el-table-column prop="mobile" align="center" label="电话">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>

          <el-table-column prop="sex" align="center" label="性别">
            <template slot-scope="scope">{{ scope.row.sex.label }}</template>
          </el-table-column>

          <!-- 类别 -->
          <el-table-column prop="sex" align="center" label="类别">
            <template slot-scope="scope">{{ scope.row.style.label }}</template>
          </el-table-column>

          <el-table-column prop="last_store_date" align="center" label="最近上门">
            <template slot-scope="scope" >
              <span v-if="scope.row.last_store_date != 0">{{scope.row.last_store_date | _endTimeFormat}}</span>
              <span v-else>未到店</span>
            </template>
          </el-table-column>

          <el-table-column prop="adviser" align="center" :label="$store.getters.roleName.adviser">
            <template slot-scope="scope">{{ scope.row.adviser.name }}</template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="320">
            <template slot-scope="scope">
              <p class="affirm">
                <a class="buttonStyle_class" v-if="scope.row.last_store_date == 0" @click="DetaleVisClick(scope.row.id)">删除</a>
                <em v-if="scope.row.last_store_date == 0"></em>
                <a class="buttonStyle_class" @click="AddToClick(scope.row.id)">添加主动回访</a>
                <em></em>
                <a class="buttonStyle_class" @click="SeeClick(scope.row.id)">查看资料</a>
                <em></em>
                <a class="buttonStyle_class" @click="showOrder(scope.row)">合作开单</a>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </base-list>
    </div>

    <!-- 填写回访内容 -->
    <el-dialog :visible.sync="centerDialogVisible" width="30%" :show-close="false">
      <div class="MagessBox">
        <div class="title">
          <span>添加主动回访</span>
          <i class="iconfont iconguanbi1" @click="CancelClick"></i>
        </div>
        <div class="infoBox">
          <div class="bolk">
            <span class="mar20">
              <i class="iconStyle">*</i>回访时间
            </span>
            <el-date-picker
              v-model="ContentTime"
              :clearable="false"
              type="date"
              placeholder="请选择回访时间"
              align="center"
              :disabled="ContentData ? true : false"
              class="wb73"
              @change="myChange"
            ></el-date-picker>
              <!-- :disabled="{true:ContentData != ''}" -->

          </div>
          <div class="texta mat20" v-show="isContentShow == true">
            <span class="mar23 mal10" style="white-space: nowrap;">回访内容</span>
            <div class="input">
              <textarea placeholder="请输入回访内容......" v-model="ContentData" @keyup="contentChange"></textarea>
            </div>
          </div>
          
          <div class="texta mat20" v-show="isContentShow == false">
            <span class="mar23 mal10" style="white-space: nowrap;">回访备注</span>
            <div class="input">
              <textarea placeholder="请输入回访备注......" v-model="RemarksData"></textarea>
            </div>
          </div>
        </div>
        <div class="buttom">
          <el-button @click="CancelClick">取消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>保存中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="SubmitClick">确定</el-button>
          </template>
        </div>
      </div>
    </el-dialog>

    <!-- 删除客户 -->
    <el-dialog :visible.sync="DeteledialogVisible" width="15%" :show-close="false">
      <div class="MagessBox" style="padding: 0;">
        <div class="title" style="border:none; background-color: #f8f8f8; padding: 0 0.2rem;">
          <span>提示</span>
          <i class="iconfont iconguanbi1" @click="CancelClick"></i>
        </div>
        <div class="textBox">确定删除该客户</div>
        <div class="buttom" style="padding: 0.2rem 0.2rem;">
          <el-button @click="DeteledialogVisible = false">取 消</el-button>

          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="DeteleClick">确 定</el-button>
          </template>
        </div>
      </div>
    </el-dialog>

    <!--  合作开单  -->
    <el-dialog title="合作企业开单" class="BillingDialog" :visible.sync="dialogOpenOrder">
      <div class="fc-gray4">
        <el-form :model="form" :rules="rules" label-width="120px">

          <el-form-item label="合作企业" prop="name">
            <el-select v-model="form.business_id" placeholder="请选择企业" readonly="" clearable @change="changeEnterprise">
              <el-option key value label="请选择"></el-option>
              <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开单金额" prop="price">
            <el-input-number type="text" class="w200px" v-model.trim="form.price" :controls="false" :min="0" placeholder="请输入价格" :precision="2" clearable></el-input-number>
          </el-form-item>
          
          <el-form-item label="开单类型" prop="checkList">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox v-for="(item, index) in typeList" :key="index" :label="item.name" class="fl"></el-checkbox>
              <!-- <el-checkbox label="私密" class="fl"></el-checkbox>
              <el-checkbox label="医美" class="fl"></el-checkbox>
              <el-checkbox label="容妆" class="fl"></el-checkbox> -->
              <el-checkbox label="其他" class="fl" @change="isNameShow"></el-checkbox>
            </el-checkbox-group>
            <el-input v-model="form.name" placeholder="请输入..." v-show="isFormName" class="fl wb20 mal15"></el-input>
          </el-form-item>

          <div class="pat10 pab10 par10 bg-white1 over-auto">
            <div class="wb49 fl">
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
            <div class="wb49 fl">
              <div class="pal10 par10">
                <div class="wb100 bg-white1 h40px lh40px text-center bd-a1 bd-gray radius1">
                  <div class="wb40 fl">
                    百分比
                  </div>
                  <div class="wb5 fl fc-gray1">
                    |
                  </div>
                  <div class="wb55 fr ">
                    <el-input-number class="wb80 fl mat4" v-model="users.ratio" :precision="0" placeholder="请输入百分比" :controls="false" :min="0" :max="100"></el-input-number>
                    <span class="fr wb20">%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <template v-for="(item,index) in userList">

            <div class="clear4"></div>

            <div class="pat10 pab10 par10  over-auto relative" :class=" popIndex == index ? 'bg-green3 fc-blue6' :'bg-white1  fc-gray1'">
              <div class="wb49 fl">
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
              <div class="wb49 fl">
                <div class="pal10 par10">
                  <div class="wb100 h40px lh40px bd-a1 text-center radius1" :class=" popIndex == index ? 'bd-green4' : 'bd-gray'">
                    <div class="wb40 fl">
                      百分比
                    </div>
                    <div class="wb5 fl">
                      |
                    </div>
                    <div class="wb55 fr">
                      <el-input-number class="wb80 fl bg-none mat4" v-model="item.ratio" @focus="popActive(index)" :precision="0" placeholder="请输入百分比" :controls="false" @change="rateChange(item , index)" :min="0" :max="100"></el-input-number>
                      <span class="fr wb20">%</span>
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
import {
  customerList,
  ReturnVisitData,
  DeteleCustomer
} from "@/shop/assets/api/client/client";
//自动查询客户组件
import autoSearchClient from "@/shop/components/autocomplete/autoSearchClient";


import { businessList, ordersAdd,ordersTypeAdd,ordersTypeList } from "@/shop/assets/api/cooperation/cooperation";

export default {
  name: "ClientList",
  data() {
    return {
      boxMaxHeight:"",
      roleChoosable:false,
      disabled:false,
      counselor: {
        channelId: "",
        counselor: ""
      },
      form: {
        c1: "",
        c2: "",
        checkList: [],
        name:''
      },
      daterangeTimer:[],
      condition: {
        keyword:''
        // endTime: this.$base.getDateScope(0).endTime
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: customerList, // 分页查询api接口

      customerID: "",
      ContentTime: "",
      ContentData: "",
      RemarksData: "",
      centerDialogVisible: false,
      DeteledialogVisible: false,
      isFormName: false,
      isContentShow:null,
      dialogOpenOrder: false,
      thisKeyWord:'',
      userList: [],
      users: {
        name: '',
        users_id: '',
        ratio: 100,
      },
      roleList: [],
      popIndex:0,

      rules: {
        business_id: [{required: true, message: '请选择企业名称', trigger: 'change'}],
        price: [{required: true, message: '请输入价格', trigger: 'change'}],
        checkList: [{required: true, message: '请选择类型', trigger: 'change'}],
      },

      disabled2: false,

      enterpriseList: [],

      typeList: [],

      type_type:[]


    };
  },
  // 侦听器
  watch: {
    'daterangeTimer'(newData,oldData){
      console.log(newData);
      if(newData == null){
        this.condition = {}
      }else{
        this.condition.startTime = this.$base.dateTimeToDate(newData[0],"date2")
        this.condition.endTime = this.$base.dateTimeToDate(newData[1],"date2")
      }
    },
    form: {
      deep: true,
      handler: function() {
        this.condition.channelId = this.form.c2 || this.form.c1;
      }
    }
  },
  components: { autoSearchClient },
  methods: {
    getOrdersTypeList() {
      ordersTypeList().then(res => {
        if (res.status == 0) {
          this.typeList = res.data;
        }
      }).catch(error => {
        console.log('ordersTypeList-------no');
      });
    },

    myChange(value) {
      let time = this.$base.dateTimeToDate(value,'date2')
      console.log(this.$base.isToday(time));
      if (this.$base.isToday(time)) {
        this.isContentShow = true;
      }else {
        this.isContentShow = false;
      }
    },

    isNameShow(v) {
      v ? this.isFormName = true : this.isFormName = false;
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
    },

    formateRole(roleId){
      return roleId == 3? '（'+ this.$store.getters.roleName.adviser +'）' : '('+ this.$store.getters.roleName.technician +')'
    },

    addUsers(){
      this.userList.push({
        id: this.$base.getUuid(),
        users_id: '',
        ratio:0,
      })
    },

    delUsers(i){
      this.userList.splice(i,1)
    },

    rateChange(item,index){
      if(this.$base.isNull(item.ratio)){
        item.ratio = 0
      }
    },

    myChanged(data){
      this.thisKeyWord = data.kw
    },
    contentChange() {
      this.ContentTime = new Date();
    },
    // 时间
    pVBClick(s) {
      return s < 10 ? "0" + s : s;
    },
    // 取消
    CancelClick() {
      this.centerDialogVisible = false;
      this.ReturnLIstIsShow = false;
      this.DeteledialogVisible = false;
    },
    // 提交
    SubmitClick() {
      // console.log(this.ContentData);
      // console.log(this.RemarksData);
      if (this.ContentTime == "" && this.ContentData == "") {
        this.$message({
          message: "回访内容和时间必须填写一个",
          type: "warning"
        });
      } else {
        if (this.ContentTime != "") {
          let time = new Date(this.ContentTime);
          let dateTime =
            time.getFullYear() +
            "-" +
            this.pVBClick(time.getMonth() + 1) +
            "-" +
            this.pVBClick(time.getDate());
          this.ContentTime = dateTime;
        }
        let Data = {
          customerId: this.customerID,
          reviewTime: this.ContentTime,
          content: this.ContentData,
          target: this.RemarksData
        };
        this.disabled = true
        ReturnVisitData(Data).then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$message({
              message: "填写成功",
              type: "success",
              onClose: () => {
                this.centerDialogVisible = false;
                this.ContentTime = '';
                this.ContentData = '';
                this.RemarksData = '';
                this.loadData();
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
    },
    loadData() {
      // console.log(this.condition);
      this.condition.keyword = this.thisKeyWord;
      this.$refs.demoTable.loadData();
    },
    // 添加主动回访
    AddToClick(id) {
      this.centerDialogVisible = true;
      this.customerID = id;
    },
    // 查看资料
    SeeClick(id) {
      this.$router.push({
        name: "ClientDel",
        query: { id: id }
      });
    },
    // 打开删除弹窗
    DetaleVisClick(id) {
      this.DeteledialogVisible = true;
      this.customerID = id;
    },
    // 删除
    DeteleClick() {
      this.disabled = true
      DeteleCustomer({ customerId: this.customerID }).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "删除成功",
            type: "success",
            onClose: () => {
              this.DeteledialogVisible = false;
              this.disabled = false
              this.loadData()
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

      let _flag = false
      let sum = 0;


      //验证合作企业非空
      if(this.$base.isNull(this.form.business_id)){
        this.$message({
          showClose: true,
          message: '请选择合作企业',
          type: 'error',
        });
        return
      }

      //验证价格非空
      if(this.$base.isNull(this.form.price)){
        this.$message({
          showClose: true,
          message: '请输入价格',
          type: 'error',
        });
        return
      }

      //验证类型非空
      if(this.$base.isNull(this.form.checkList)){
        this.$message({
          showClose: true,
          message: '请选择类型',
          type: 'error',
        });
        return
      }

      for(let i=0; i<this.userList.length; i++){
        sum += this.userList[i].ratio
        if(this.$base.isNull(this.userList[i].users_id)){
          _flag = true
        }
      }

      sum+= this.users.ratio

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
        if( !this.$base.isNull(this.userList[i].users_id) &&  !this.$base.isNull(this.userList[i].ratio) ){
          _tmpArr.push(this.userList[i])
        }
      }

      this.disabled2 = true;

      //验证其他是否有值
      if (this.isFormName) {
        if(this.$base.isNull(this.form.name)){
          this.$message({
            showClose: true,
            message: '请输入其他类型',
            type: 'error',
          });
          return
        }else {
          ordersTypeAdd({name:this.form.name}).then(res => {
            if(res.status == 0){
              let checkdList = this.form.checkList;
              checkdList.forEach(v => {
                this.typeList.forEach(item => {
                  if (v == item.name) {
                    this.type_type.push({
                      name: item.name,
                      id: item.id,
                    })
                  }
                });
                if (v == '其他') {
                    this.type_type.push({
                      name: res.data.name,
                      id: res.data.id,
                    })
                  }
              });

              ordersAdd({
                business_id: this.form.business_id,
                price: this.form.price,
                type: JSON.stringify(this.type_type),
                member: JSON.stringify(_tmpArr),
                customer_id:this.form.customer_id,
              }).then(res=>{
                if(res.status == 0){
                  this.disabled2 = false
                  this.$message({
                    showClose: true,
                    message: '开单成功',
                    type: 'success',
                    onClose:() => {
                      this.dialogOpenOrder = false;
                    }
                  });

                }else{
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error',
                  });
                }
              })

              return;
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
              this.disabled2 = false
              return;
            }
          });
        }
      }else {
        let checkdList = this.form.checkList;
        checkdList.forEach(v => {
          this.typeList.forEach(item => {
            if (v == item.name) {
              this.type_type.push({
                name: item.name,
                id: item.id,
              })
            }
          });
        });
        ordersAdd({
          business_id: this.form.business_id,
          price: this.form.price,
          type: JSON.stringify(this.type_type),
          member: JSON.stringify(_tmpArr),
          customer_id:this.form.customer_id,
        }).then(res=>{
          if(res.status == 0){
            this.disabled2 = false
            this.$message({
              showClose: true,
              message: '开单成功',
              type: 'success',
              onClose:() => {
                this.dialogOpenOrder = false;
              }
            });

          }else{
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error',
            });
          }
        })
      }
    },

    /**
    * 选择企业
     */
    changeEnterprise(){

    },

    showOrder(row){

      this.dialogOpenOrder = true

      let _tmp = JSON.parse(JSON.stringify(this.$store.getters.counselorCosmetologistList))

      //判断当前登录权限
      if(this.$store.getters.currentUser.role_id == 2 || this.$store.getters.currentUser.role_id == 5){
        this.roleList = _tmp.filter(item=>{
          return item.users_id != row.adviser.users_id
        })
        this.users.users_id = row.adviser.users_id
        this.users.name = row.adviser.name + '（'+ this.$store.getters.roleName.adviser +'）'
      }else if(this.$store.getters.currentUser.role_id == 3 || this.$store.getters.currentUser.role_id == 4){
        this.roleList = _tmp.filter(item=>{
          return item.users_id != this.$store.getters.currentUser.users_id
        })
        this.users.users_id = this.$store.getters.currentUser.users_id
        this.users.name = this.$store.getters.currentUser.role_id == 3 ? this.$store.getters.currentUser.name +  '（'+ this.$store.getters.roleName.adviser +'）' : this.$store.getters.currentUser.name +  '（'+ this.$store.getters.roleName.technician +'）'
      }else{

      }

      this.form.customer_id = row.id

      this.dialogOpenOrder = true;
      this.getOrdersTypeList();
    },

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
      this.condition = {
        adviserId:usersId.users_id
      };
    }else{
      this.roleChoosable = false;
    }
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {

    businessList({start:1,perpage:9999}).then(res=>{
      if(res.status == 0){
        this.enterpriseList = res.data.list
      }
    })

    this.boxMaxHeight = window.innerHeight - 100;

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
.ClientList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }

  .MagessBox {
    padding: 0 0.2rem;
    .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;

      span {
        font-size: 0.16rem;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .textBox {
      padding: 0.2rem;
      text-align: center;
      font-size: 0.16rem;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .infoBox {
      padding-top: 0.2rem;
      span {
        .iconStyle {
          font-style: normal;
          color: #ec414d;
          margin-right: 0.05rem;
        }
      }
      .texta {
        display: flex;
        .input {
          height: 80px;
          width: 74%;
          border: 1px solid #e5e5e5;
          padding: 0.14rem;
          overflow: hidden;
          border-radius: 5px;

          textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 0.14rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }

    .buttom {
      padding: 0.2rem 0;
      display: flex;
      justify-content: flex-end;

      div {
        cursor: pointer;
        width: 0.56rem;
        height: 32px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .cancel {
        border: 1px solid rgba(192, 192, 192, 1);
        margin-right: 0.2rem;
      }

      .submit {
        background: rgba(13, 201, 229, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
<style>
.ClientList .affirm {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ClientList .affirm em {
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 0.1rem;
}
.ClientList .affirm a {
  cursor: pointer;
}
</style>

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
  .BillingDialog .el-dialog__header, .ClientList .el-dialog__body {
    padding: 20px;
    padding-bottom: 10px;
  }
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
</style>