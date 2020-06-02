<template>
  <div class="TargetManagementList">
    <div class="optionTabs">
      <div class="text">门店目标设定</div>
      <div class="shop_list">
          <div>
                <span>
                    {{shopText}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <ul>
                    <li @click="timeClick({name:'全部门店',id:0})">全部门店</li>
                    <li
                      v-for="(item, index) in timeDataList"
                      :key="index"
                      @click="timeClick(item)"
                    >{{item.name}}</li>
                </ul>
            </div>
      </div>
    </div>
    <div class="content" v-loading="loading">

      <ul class="box">
        <li v-for="(item , index) in listData" :key="index">
          <h3>{{item.name}}</h3>
          <div class="text">
            <p>顾问：{{item.adviser_total}}人</p>
            <p>美容师：{{item.technician_total}}人</p>
            <p>门店电话：{{item.phone}}</p>
            <p>门店面积：{{item.measure}}㎡</p>
            <p>门店地址：{{item.address}}</p>
          </div>
          <div class="btn">
            <span @click="dialogShowFn(item)">设定目标</span>
            <em></em>
            <span @click="$router.push({
              name: 'TargetDetails',
              query:{id: item.id,storeName:item.name} 
            })">查看详情</span>
          </div>
        </li>
        <li style="visibility: hidden"></li>
        <li style="visibility: hidden"></li>
        <li style="visibility: hidden"></li>
      </ul>
      
    </div>

    <!--   门店目标设定   -->
    <el-dialog :title="dialogText" :visible.sync="dialogEditPwd" width="55%">
      <div class="dialog-content"  v-loading="disabledLoading">
        <div class="timer_border">
          <div class="xing">*</div>
          <div class="text">目标时间段</div>
          <div class="xian"></div>
          <el-date-picker
              class="wb70"
              v-model="daterangeTimer.startTime"
              type="date"
              placeholder="开始日期"
              :picker-options="startOptions"
          ></el-date-picker>
          <div class="xian"></div>
          <el-date-picker
              class="wb70"
              v-model="daterangeTimer.endTime"
              type="date"
              placeholder="结束日期"
              :picker-options="endOptions"
          ></el-date-picker>
        </div>
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
          <table class="table_list" cellspacing="0">
            <thead>
              <tr>
                <th>销售业绩(元)</th>
                <th>成交人头(人)</th>
                <th>成交人次(次)</th>
                <th>划扣业绩(元)</th>
                <th>划扣人头(人)</th>
                <th>划扣人次(次)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <el-form-item prop="amount">
                    <el-input type="number" v-model.trim="form.amount" placeholder="请设置业绩" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item prop="order_customer">
                    <el-input type="number" v-model.trim="form.order_customer" placeholder="请设置人头" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item prop="order_customer_quantity">
                    <el-input type="number" v-model.trim="form.order_customer_quantity" placeholder="请设置人次" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item prop="valume">
                    <el-input type="number" v-model.trim="form.valume" placeholder="请设置业绩" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item prop="customer">
                    <el-input type="number" v-model.trim="form.customer" placeholder="请设置人头" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item prop="quantity">
                    <el-input type="number" v-model.trim="form.quantity" placeholder="请设置人次" class="wb100">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form>
        <div class="remark">注：目标设定提交后，设定的目标时间不可修改，请确认当前目标设定时间段。</div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditPwd = false">取 消</el-button>
        <template v-if="disabled">
          <el-button type="primary" disabled>保存中...</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="timerSave">保存设置</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreList , getStore , getTime , save } from "@/assets/api/targetManagement/targetManagement";
export default {
  name: "TargetManagementList",
  data() {
    return {
        shopText:"全部门店",
        timeDataList:[],
        storeId:0,
        listData:[],
        loading:true,
        dialogText:'',
        getTimeData:[],
        dialogEditPwd:false,
        disabledLoading:false,
        disabled:false,
        daterangeTimer:{
          startTime:"",
          endTime:''
        },
        startOptions: {},
        endOptions:{},
        form:{},
        rules: {
          name: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        },
    };
  },

  components: {},
  methods: {

    dialogShowFn(item){
      this.dialogText = '门店目标设定-'+item.name
      this.form.storeId = item.id
      this.dialogEditPwd = true;
      this.disabledLoading = true;
      this.getTimeFn()
    },

    getStoreListFn(){
      getStoreList().then(res=>{
        this.timeDataList = res.data.storeDatas
      }).catch(error=>{
        console.log("getStoreList no");
      })
    },

    listDataFn(){
      this.loading = true;
      getStore({storeId:this.storeId}).then(res=>{
        this.listData = res.data
        this.loading = false;
      }).catch(error=>{
        console.log("getStore no");
      })
    },


    timeClick(item){
      this.shopText = item.name
      this.storeId = item.id
      this.listDataFn()
    },

    saveFn(){
      
      let postData = this.form
      postData.start_time = this.$base.dateTimeToDate(this.daterangeTimer.startTime, "date2")
      postData.stop_time = this.$base.dateTimeToDate(this.daterangeTimer.endTime, "date2")
     
      save(postData).then(res=>{
        if(res.status == 0){
          this.$message({
            message: "设置目标成功",
            type: 'success',
            onClose:()=>{
              this.listDataFn()
              this.disabled = false;
              this.dialogEditPwd = false;
              this.form = {}
              this.daterangeTimer = {
                startTime:"",
                endTime:''
              };
            }
          });
        }else{
          this.$message({
            message: res.msg,
            type: 'error',
          });
          this.disabled = false
        }
      }).catch(error=>{
        console.log("save no");
        this.disabled = false
      })
    },


    timerSave(){
      const that = this;
      this.disabled = true
      let _flag = false;
      let startTime = this.$base.dateTimeToDate(this.daterangeTimer.startTime, "time");
      let endTime = this.$base.dateTimeToDate(this.daterangeTimer.endTime, "time");
   
      if(isNaN(startTime) || isNaN(endTime) ){
        this.$message({
          message: '请选择目标时间段',
          type: 'error',
        });
        this.disabled = false
        return;
      }

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
        });
        this.disabled = false
      }
      else{
        if(JSON.stringify(this.form) == '{}'){
          this.$message({
            message: '请填写至少一个目标',
            type: 'error',
          });
          this.disabled = false
          return
        }
        else{
          let flag = this.isNumber();
          if(!flag)
          {
            this.$message({
                message: '请输入整数',
                type: 'error',
            });
            this.disabled = false
            return;
          }
          this.saveFn()
        }
      }
    },

    //目标时间段获取
    getTimeFn(){
      getTime({storeId :this.form.storeId}).then(res=>{

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
          this.disabledLoading = false;

        }
      }).catch(error=>{
        console.log("getTime no");
      })
    },

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

      if(this.getTimeData.length == 0){
        if(type == 'end' && startData != '' && startData > time){
            _flag = true
        }
        if(type == 'start' && endData != '' && endData < time){
            _flag = true
        }
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

    isNumber(){
      let _flag = true;
      let r = /^[0-9]*[1-9][0-9]*$/;
      let item = this.form;
      if( (!this.$base.isNull(item.quantity)) && (!r.test(item.quantity)) && (item.quantity != 0)){
          _flag = false;
      }
      if( !this.$base.isNull(item.customer) && !r.test(item.customer) && (item.customer != 0)){
          _flag = false;
      }
      if( !this.$base.isNull(item.amount) && !r.test(item.amount) && (item.amount != 0)){
          _flag = false;
      }
      if( !this.$base.isNull(item.valume) && !r.test(item.valume) && (item.valume != 0)){
          _flag = false;
      }
      if( !this.$base.isNull(item.order_customer) && !r.test(item.order_customer) && (item.order_customer != 0)){
          _flag = false;
      }
      if( !this.$base.isNull(item.order_customer_quantity) && !r.test(item.order_customer_quantity) && (item.order_customer_quantity != 0)){
          _flag = false;
      }

      if(_flag){
        return true
      }else{
        return false
      }
    },

  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getStoreListFn()
    this.listDataFn()
    // this.getTimeFn()
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.TargetManagementList {
  .optionTabs {
    width: 102.5%;
    height: 50px;
    background-color: #ffffff;
    margin-left: -0.2rem;
    border-top: 0.01rem solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #333333;
      padding-left: 0.2rem;
      flex: 1;
    }
    .shop_list{
        height: 50px;
        margin-right: 20px;
        div {
            position: relative;
            height: 50px;
            display: flex;
            align-items: center;
            cursor: pointer;
            span {
                color: #333;
                font-size: 16px;
        
                i {
                    font-size: 20px;
                    color: #666;
                }
            }
    
            ul {
                position: absolute;
                width: 200px;
                top: 50px;
                right: 0;
                background: #fff;
                overflow-y: scroll;
                z-index: 999;
                line-height: 36px;
                height: 200px;
                text-align: center;
                display: none;
                li {
                    cursor: pointer;
                    font-size: 16px;
                    color: #999;
                }
        
                li:hover {
                    color: #333;
                }
            }
        }
        div:hover {
            ul {
                display: block;
            }
        }
    }
   
  }
  .content {
    padding: 0 0 0.3rem;
    margin-top: 0.2rem;
    min-height: 4rem;
    .box{
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      li{
        width: 24%;
        background-color: #ffffff;
        border-radius:10px;
        overflow: hidden;
        margin-bottom: .2rem;
        h3{
          margin:0 .2rem;
          font-weight: normal;
          line-height: 50px;
          color: #333333;
          font-size: 16px;
          border-bottom: 1px solid #E5E5E5;
        }
        .text{
          padding: .1rem 0.2rem;
          p{
            line-height: 30px;
            font-size: 14px;
            color: #666666;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        
        }
        .btn{
          display: flex;
          align-items: center;
          background: #009688;
          height: 50px;
          span{
            color: #fff;
            font-size: 14px;
            flex: 1;
            text-align: center;
            cursor: pointer;
          }
          em{
            width: 1px;
            height: 20px;
            background:rgba(229,229,229,0.2);
          }
        }
      }
    }
  }
  .el-dialog{
    .dialog-content{
      border-top: 1px solid #e5e5e5;
      padding-top: 14px;
      .timer_border{
        width: 55%;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: .1rem;
        .xing{
          color: #EC414D;
        }
        .text{
          width:1.2rem;
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
      .remark{
        font-size: 14px;
        color: #EC414D;
        padding-top: .2rem;
      }
    }
  }
}
</style>



<style>
.TargetManagementList .el-dialog .el-dialog__body{
  padding: 0 20px
}
.TargetManagementList .timer_border .el-date-editor input{
  border: 0 !important;
  background: none !important;
}
.TargetManagementList .el-form .el-input--small .el-input__inner{
  padding-right: 0 !important;
}
.TargetManagementList .el-dialog__body .el-form-item{
  padding: 0;
  margin: .15rem .1rem;
}
</style>
