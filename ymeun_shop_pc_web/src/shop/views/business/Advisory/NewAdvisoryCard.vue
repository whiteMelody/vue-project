<template>
  <div class="NewAdvisoryCard">
    <div class="header">
      <div class="left">咨询列表&nbsp;&nbsp;{{dateText}}</div>
      <em></em>
      <div class="center">
        <i class="iconfont iconsousuo"></i>
        <auto-search-client-stride @changed="myChanged" :initValue="''" class="wb100"></auto-search-client-stride>
      </div>
    </div>

    <table cellspacing="0" bgcolor="#FFFFFF" v-loading="loading" v-if="noData">
      <thead>
        <tr>
          <th>客户信息</th>
          <th>到店时间 / 品项</th>
          <th>{{$store.getters.roleName.adviser}}</th>
          <th>跨店咨询</th>
          <th>备注</th>
          <th>到店情况</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listData" :key="index">
          <td>
            <div class="felx">
              <div class="img">
                <!-- <div class="text" :class="item.old_customer == 1 ? 'newText' : 'oldText'">{{item.old_customer == 1 ? '新' : '老'}}</div> 
                <div class="text newText" v-if="item.isOld == '新客'">新</div>
                <div class="text oldText" v-else-if="item.isOld == '老客'">老</div>-->
                <div class="text newText" v-if="item.customer_style.label == '新客'">新</div>
                <div class="text oldText" v-else-if="item.customer_style.label == '老客'">老</div>
                <div class="text prepareText" v-else>备</div>
                <img :src="item.customer.headimg" v-if="item.customer.headimg">
                <img :src="item.customer_sex.label == '女' ? imgUrl.imgGirl : imgUrl.imgBoy" alt="" v-else>
              </div>
              <div class="nameAndMoble">
                <div class="name">
                  <div class="pointer" @click="$router.push({name:'ClientDel',query:{id:item.customer_id,types:1}})">{{item.customer_name}}</div>
                  <i  class="iconfont" :class="item.customer_sex.value == 0 ? 'iconnv' : 'iconnan'"></i>
                </div>
                <div class="moble">{{item.mobile}}</div>
              </div>
            </div>
          </td>
          <td>
            <div style="font-soze:.14rem;">{{item.appointment_time}}</div>
            <div style="font-soze:.14rem; margin-top: .1rem;">{{item.items_name}}</div>
          </td>
          <td>{{item.adviser_name}}</td>
          <td>{{item.across_store}}</td>
          <td>
            <div class="content">
              <el-tooltip v-if="item.content != ''" class="item" effect="light" :content="item.content" placement="top-start">
                <span>{{item.content}}</span>
              </el-tooltip>
            </div>
          </td>
          <td>
            <div class="label" :class="item.className">
              <span v-if="item.status == 0">未到店</span>
              <span v-else-if="item.status == 1">已到店</span>
              <span v-else>已取消</span>
              <em></em>
              <i class="iconfont" :class="item.status == 2 ? 'iconshanchuguanbicha2' : 'icondianpu'"></i>
            </div>
          </td>
          <td>
            <div class="bottomOne" v-if="item.status == 0">

            </div>
            <div class="bottomOne" v-else-if="item.status == 1">
              <div class="left" v-if="item.adviserConfirm == 2" @click="clinicalReception(item.id)">确认接诊</div>
              <div v-else-if="item.adviserConfirm == 1">

                <div v-if="$store.getters.currentUser.role_id!=4">
                  <div class="left" style="opacity:0.5" v-if="item.consultation_status == 1">已填写</div>
                  <div class="left" v-else @click="$router.push({name: 'FillInAdvisory',query:{ customerId: item.customer_id, adviserId: item.adviser_id, appointmentId: item.id, } })">填写咨询</div>
                </div>

                <div class="right" @click="open(item)"><i class="iconfont icondanju-tianchong"></i> 开单</div>

                <div class="right" v-if="item.orders_id" @click="PrintingClick(item.orders_id)"><i class="iconfont icondayin"></i> 打印</div>
              </div>
            </div>
            <div class="bottomOne" v-else>
              <div class="left"  @click="dialogVisibleClick(item.cause)">查看原因</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="no_data" v-else>
      <div>
        <span><img src="@/shop/assets/img/nodata.png" alt=""></span>
        <b>暂无数据</b>
      </div>
    </div>

    <el-dialog
      title="原因"
      :visible.sync="dialogVisible"
      width="20%">
      <span>{{causeText}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
            title="请选择开单类型"
            :visible.sync="dialogSelect"
            width="300px">

      <div class="pal50 par50 h44px lh44px text-center bg-white1" @click="open2(0)">
        <i class="iconfont iconjiruyeji- f26px fl"></i>
        计入业绩品项
      </div>

      <div class="clear4"></div>

      <div class="pal50 par50 h44px lh44px text-center bg-white1" @click="open2(1)">
        <i class="iconfont iconbujiruyeji- f26px fl"></i>
        不计入业绩品项
      </div>

    </el-dialog>

  </div>
</template>
<script>
import getPage from "@/shop/assets/css/headerClass.scss";
import autoSearchClientStride from "@/shop/components/autocomplete/autoSearchClientStride";
import {getConsultationTodayList, timeLine} from  "@/shop/assets/api/flow/advisory"
import { getProject } from "@/shop/assets/api/common/common"
export default {
  name: "NewAdvisoryCard",
  data() {
    return {
      dateText: "",
      imgUrl: {
        imgBoy: require("@/shop/assets/img/boy.png"),
        imgGirl: require("@/shop/assets/img/girl.png")
      },
      dataObj:{
        keyword:'',
        perpage:9999,
      },
      listData:[],
      loading:false,
      dialogVisible:false,
      causeText:'',
      noData:true,
      dialogSelect: false,
      dialogItem: {},

    };
  },
  components: { autoSearchClientStride },
  watch: {},
  methods: {

    open(item) {

      getProject({ start: 1, perpage: 9999, status:-1}).then(res => {

        if(res.status == 0){
          let _tmp = res.data.list
          //验证是否有不计入业绩
          let _r1 = _tmp.filter(item => item.disabled_volume == 1 && item.status.value == 1 && item.p_id!=0)

          if(_r1.length == 0){
            //无不计入业绩
              this.$router.push({name: 'Billing',query:{ type: 0, customerId: item.customer_id, adviserId: item.adviser_id, appointmentId: item.id, technicianId: item.technician_id } })
          }else{
            //显示弹窗
            this.dialogSelect = true
            this.dialogItem = item
          }

        }

      })

    },

    open2(type){
      let item = this.dialogItem
      this.$router.push({name: 'Billing',query:{ type: type, customerId: item.customer_id, adviserId: item.adviser_id, appointmentId: item.id, technicianId: item.technician_id } })
      this.dialogSelect = false
    },

    dialogVisibleClick(cause) {
      this.dialogVisible = true;
      this.causeText = cause
    },
    myChanged(data) {
      this.dataObj.keyword = data.kw;
      window.onkeydown = e => {
        var currKey = 0,
          e = e || event;
        currKey = e.keyCode || e.which || e.charCode;
        if (currKey == 13) {
          this.initData();
        }
      };
    },

    initData() {
      const that = this;
      that.loading = true;
      getConsultationTodayList(that.dataObj).then(res => {
        if (res.status == 0) {
          if (res.data.list.length) {
            res.data.list.map((item,index) => {
              if (item.status == 0) 
                item.className = 'labelClassOne';
              else if (item.status == 1) 
                item.className = 'labelClasstTwo';
              else
                item.className = 'labelClassThree';
            });
          }
          that.listData = res.data.list;
          that.loading = false;
          if(res.data.list.length > 0){
            this.noData = true
          }
          else{
            this.noData = false
          }
        }else {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
          that.loading = false;
        }
      }).catch(error => {
        console.log("getConsultationTodayList no");
        that.loading = false;
      });
    },

    
    clinicalReception(id){
        timeLine({
            appointmentId: id
        }).then(res=>{
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '接诊成功',
                    type: 'success',
                });
                this.initData()
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
            }
        }).catch(error=>{
            console.log("timeLine no");
        })
    },
    
    PrintingClick(id) {
      this.$router.push({
        name: "Printing",
        query: { id: id, type: 1 }
      });
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
    this.dateText = this.$base.getDateScope(1).startTime.split(" ")[0];
    this.initData();
  },

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
@import "./NewAdvisoryCard.scss";
</style>
