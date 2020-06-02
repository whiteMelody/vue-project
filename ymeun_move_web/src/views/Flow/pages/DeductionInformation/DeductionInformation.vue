<template>
  <div class="DeductionInformation wb100 bg-white" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'划扣信息'"></Header>

    <div class="main">
      <div class="mian_name">
        <div class="main_title">项目名称</div>
        <div class="main_content">
          <ul>
            <li v-for="(item, index) in dataList" :key="index">
              {{item.name}}
              <span>x{{item.numBer}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="content">
        <ul>
          <li @click="popShow('Birthday')">
            <div class="name">
              <span>*</span>
              美容师
            </div>
            <p>
              <strong v-if="BirthdayActive == null">请选择</strong>
              <a v-else>{{BirthdayActive.text}}</a>
              <i class="iconfont iconxiangyou"></i>
            </p>
          </li>
          <li @click="popShow('counselor')">
            <div class="name">
              <span>*</span>
              治疗间
            </div>
            <p>
              <strong v-if="counselorActive == null">请选择</strong>
              <a v-else>{{counselorActive.name}}</a>
              <i class="iconfont iconxiangyou"></i>
            </p>
          </li>
          <li>
            <div class="name">
              <span>*</span>
              预计治疗时间
            </div>
            <input type="text" v-model="address" placeholder="请输入" maxlength="4">分钟
          </li>
        </ul>
      </div>

      <div
        class="buttom"
        v-loading.fullscreen.lock="subLoding"
        element-loading-text="提交中..."
        element-loading-background="rgba(0, 0, 0, 0.5)"
        @click="subPost"
      >确 定</div>
    </div>
    <div class="quxiao" @click="closeSearch">取消</div>

    <!-- 美容师 -->
    <van-popup v-model="BirthdayShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="BirthdayColumns"
        @cancel="BirthdayCancel"
        @confirm="BirthdayConfirm"
      />
    </van-popup>

    <div class="pop_boxs">
      <van-popup v-model="counselorShow" position="bottom">
        <div class="pop_box">
          <div class="header">
            <span @click="counselorCancel">取消</span>
            <a @click="counselorConfirm">确定</a>
          </div>
          <ul>
            <li
              v-for="(item , index) in counselorColumns"
              :key="index"
              @click="counselorListConfirm(index)"
              :class="counselorListIndex == index ? 'active' : ''"
            >
              <span>{{item.name}}</span>
              <p>
                <b :class="item.status.value == 2 ? 'employ':''">{{item.status.label}}</b>
                <em v-if="item.time.value > 0">（剩余{{item.time.value}}分钟）</em>
              </p>
              <i class="iconfont iconduihao"></i>
            </li>
          </ul>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import { Toast } from "vant";
import {
  getStoreMembers,
  getOrderAvailableItemList,
  setSave
} from "@/assets/api/Flow/DeductionInformation";
export default {
  name: "DeductionInformation",
  data() {
    return {
      minHeight: 0,
      id: "",
      projectList: [],
      // 美容师
      BirthdayShow: false,
      BirthdayActive: null,
      BirthdayColumns: [],
      // 治疗间
      counselorShow: false,
      counselorActive: null,
      counselorColumns: [],
      counselorListIndex: null,

      address: "",

      subLoding: false
    };
  },
  props: ["dataList", "customer_id"],
  components: {
    Header
  },
  methods: {
    //提交
    subPost() {
      let data = [];
      this.dataList.map((item, index) => {
        let obj = {
          num: item.numBer,
          receipt_id: item.itemID
        };
        data.push(obj);
      });

      //美容师
      let technicianId = this.BirthdayActive;
      if (this.BirthdayActive != null) technicianId = this.BirthdayActive.key;

      //治疗间
      let roomId = this.counselorActive;
      if (this.counselorActive != null) roomId = this.counselorActive.id;

      if (
        this.BirthdayActive != null &&
        this.counselorActive != null &&
        this.address > 0 &&
        this.address <= 1440
      ) {
        let postData = {
          customer_id: this.customer_id,
          status: 1,
          technician_id: technicianId,
          room_id: roomId,
          room_use_time: this.address,
          data: JSON.stringify(data)
        };
        this.subLoding = true;
        setSave(postData).then(res => {
          // console.log(res);
          setTimeout(() => {
              this.subLoding = false;
              if( res.status == 0 )
              {
                  Toast({
                      message: '提交成功',
                      type: 'success',
                      duration:1500,
                      onClose:()=>{
                        window.history.go(-2)
                      }
                  });
              }
              else
              {
                  Toast(res.msg);
              }
          },1000)
        }).catch((e)=>{
          console.log(e)
        })

      }
      else
      {
        Toast("请完善资料");
      }
    },
    // 选择
    popShow(str) {
      switch (str) {
        case "counselor":
          this.counselorShow = true;
          break;
        case "Birthday":
          this.BirthdayShow = true;
          break;
        default:
          break;
      }
    },
    // 获取划扣信息&治疗间
    getOrderAvailableItemListFn() {
      let postData = {
        customer_id: this.customer_id,
        status: 1
      };
      getOrderAvailableItemList(postData).then(res => {
        this.counselorColumns = res.data.room
        this.projectList = res.data.receipt
      }).catch((e)=>{
        console.log(e)
      })
    },
    // 美容师
    getUserFn(){
        let postData = {
          role_id:4
        }
        getStoreMembers(postData).then(res => {
            res.data.map((item , index) => {
                item.text = item.name,
                item.key = item.users_id
            })
            this.BirthdayColumns = res.data
        }).catch((e)=>{
          console.log(e)
        })

    },
    BirthdayCancel() {
      this.BirthdayShow = false;
    },
    BirthdayConfirm(item) {
      this.BirthdayActive = item;
      this.BirthdayShow = false;
    },
    // 治疗间
    counselorCancel() {
      this.counselorShow = false;
    },
    counselorConfirm(item) {
      this.counselorActive = this.counselorColumns[this.counselorListIndex];
      this.counselorShow = false;
    },
    counselorListConfirm(index) {
      this.counselorListIndex = index;

      // if(this.counselorColumns[index].status.value == 1)
      // {
      //   this.counselorListIndex = index
      // }
      // else
      // {
      //   Toast('请选择未使用的治疗间');
      // }
    },
    closeSearch() {
      this.$emit("cloneChild");
      this.$forceUpdate();
    }
  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.getUserFn();
    this.getOrderAvailableItemListFn();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight
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
@import "./DeductionInformation.scss";
</style>



    
