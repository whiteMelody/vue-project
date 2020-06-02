<template>
  <div class="Deduction" >
    <div class="header">
      <div class="left">划扣列表&nbsp;&nbsp;{{dateText}}</div>
      <em></em>
      <div class="center">
        <i class="iconfont iconsousuo"></i>
        <auto-search-client-stride @changed="myChanged"  :initValue="''" class="wb100"></auto-search-client-stride>
      </div>
    </div>

    <div class="data_list" v-loading="loading" v-if="noData">
      <div class="box" v-for="(item , index) in listData" :key="index">
        <div class="box_l">
          <p class="name pointer" @click="$router.push({name:'ClientDel',query:{id:item.customer.id,types:4}})">{{item.customer.name}}</p>
          <p class="tel">{{item.customer.mobile}}</p>
          <!-- <p class="number">
            <span>未划扣次数：</span>
            <b>{{item.sum}}</b>
            <span>/{{item.orders_sum}}</span>
          </p> -->
          <div class="number">
            <div class="numberTotal">
              <div class="Total">划扣总次数（次）</div>
              <div class="Num">{{item.orders_sum}}</div>
            </div>
            <div class="numberActive">
              <div class="Active">可划扣次数（次）</div>
              <div class="Num">{{item.sum}}</div>
            </div>
          </div>
        </div>
        <div class="box_r">
          <!-- <span class="btn1" v-if="item.sum > 0" @click="pagesToUrl('ScratchOperation',item.customer_id)">划 扣</span>
          <span class="btn2" @click="PrintingClick(item.customer_id)"><i class="iconfont icondayin"></i> 打 印</span> -->
          <div class="bottomOne" v-if="item.taskStatus == 0">
            <div class="left" @click="PrintingClick(item.customer_id)"><i class="iconfont icondayin"></i> 打印 </div>
            <div class="right" @click="pagesToUrl('ScratchOperation',item.customer_id)" v-if="item.sum > 0">划扣</div>
            <div class="right" style="opacity:0.5" v-else>无划扣次数</div>
          </div>
          <div class="bottomOne" v-else>
            <div class="Foreshadowing">
              <div class="Foreshadowing_left" @click="PrintingClick(item.customer_id)"><i class="iconfont icondayin"></i> 打印 </div>
              <em></em>
              <div class="Foreshadowing_right" @click="$router.push({path:'/ForeshadowingFillIn',query:{customerId:item.customer_id,taskId:item.taskId}})" v-show="item.taskStatus == 2"><i class="iconfont iconxiugaiziliao"></i> 铺垫填写 </div>
              <div class="Foreshadowing_right" style="opacity:0.5" v-show="item.taskStatus == 1"><i class="iconfont iconxiugaiziliao"></i> 已填写 </div>
            </div>
            <div class="right" @click="pagesToUrl('ScratchOperation',item.customer_id)" v-if="item.sum > 0">划扣</div>
            <div class="right" style="opacity:0.5" v-else>无划扣次数</div>
          </div>
        </div>
      </div>
      <div class="box" style="visibility: hidden;"></div>
      <div class="box" style="visibility: hidden;"></div>
      <div class="box" style="visibility: hidden;"></div>
    </div>

    <div class="no_data" v-else>
      <div>
        <span><img src="@/shop/assets/img/nodata.png" alt=""></span>
        <b>暂无数据</b>
      </div>
    </div>

  </div>
</template>
<script>
import getPage from '@/shop/assets/css/headerClass.scss';
//自动查询客户组件
import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride'
import { getList } from "@/shop/assets/api/deduction/deduction"
import { getProgramList } from "@/shop/assets/api/common/common"
export default {
  name: "Deduction",
  data() {
    return {
      dateText: "",
      dataObj:{
        kw:'',
        perpage:9999,
        startTime : this.$base.getDateScope(1).startTime.split(' ')[0],
        stopTime : this.$base.getDateScope(1).endTime.split(' ')[0],
      },
      listData:[],
      loading:false,
      noData:true,
      isAllowed: false,
    };
  },
  components: {
    autoSearchClientStride
  },
  methods: {

    PrintingClick(id) {
        this.$router.push({
          name:'Printing',
          query:{id:id,type:3}
        })
    },

    myChanged(data){
      this.dataObj.kw = data.kw;
      window.onkeydown = (e) => {
        var currKey=0,e=e||event; 
        currKey=e.keyCode||e.which||e.charCode;
        if (currKey == 13){
          this.getInitData();
        }
      }
    },

    getInitData(){
      const that = this;
      that.loading = true;
      getList(that.dataObj).then(res => {
        if (res.status == 0) {
          this.listData = res.data.list;
          that.loading = false;
          if(res.data.list.length > 0){
            this.noData = true
          }
          else{
            this.noData = false
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
          });
          that.loading = false;
        }
      }).catch(error => {
        console.log("getList no");
        that.loading = false;
      });
    },

    pagesToUrl(str,id){

      if(this.isAllowed){
        this.$router.push({
          path: 'ScratchOperationStore',
          query: {
            id : id
          }
        })
        return
      }

      switch (str) {
        case 'ScratchOperation':
          this.$router.push({  
            path: 'ScratchOperation',   
            query: { 
              id : id
            }
          })
          break;
      
        default:
          break;
      }
    },
  
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {

  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.dateText = this.$base.getDateScope(1).startTime.split(" ")[0];
    this.getInitData();

    getProgramList().then(res=>{
      if(res.status == 0){
        if(res.data.list.kufang.allowed == 1){
          this.isAllowed = true
        }
      }
    })

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
.Deduction {
  .data_list{
    padding:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .box{
      // display: flex;
      border-radius:2px;
      background: #fff;
      width: 24%;
      margin-bottom: 20px;
      padding-bottom: 20px;
      // height: 120px;
      .box_l{
        flex: 1;
        padding-left: 20px;
        padding-right: 10px;
        .name{
          padding-top: 15px;
          color: #333333;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; /*3表示只显示3行*/
          -webkit-box-orient: vertical;
        }
        .tel{
          padding-top: 6px;
          color: #666;
          font-size: 14px;
        }
        .number{
          display: flex;
          align-items: flex-end;
          padding-top: 20px;
          .numberTotal {
            color: #999;
          }
          .Num {
            font-size: 20px;
          }
          .numberActive {
            color: #666666;
            margin-left: .8rem;
          }
        }

      }
      .box_r{
        margin: .24rem .2rem 0 .2rem;
        height: 40px;
        cursor: pointer;
        border-radius: 5px;
        overflow: hidden;
        .bottomOne {
          display: flex;
          div {
            text-align: center;
            line-height: 40px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
          }
          .left {
            width: 1.27rem;
            color:#666666;
            background-color: #F2F2F2;
          }
          .Foreshadowing {
            width: 60%;
            display: flex;
            align-items: center;
            background-color: #F2F2F2;
            color: #666666;
            em {
              width:1px;
              height:10px;
              background:rgba(192,192,192,1);
            }
            .Foreshadowing_left {
              width: .7rem;
            }
            .Foreshadowing_right {
              flex: 1;
            }
          }
          .right {
            flex: 1;
            color: #FFFFFF;
            background-color: #0DC9E5;
          }
        }
      }
    }
    .box:nth-of-type(4n){
      margin-right: 0;
    }
  }
  .no_data{
    display: flex;
    justify-content: center;
    div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 4rem;
      b{
        font-weight: normal;
        color: #999;
        font-size: 16px;
        padding-top: 10px;
      }
    }
  }
}
</style>

    
