<template>
  <div class="NewNavItemBox">
    <div class="NewNavItem">
      <div class="logoImg">
        <img src="@/assets/sidebar/yiyun_logo2.png" class="wb80" alt>
      </div>
      <ul @mouseleave="ulTableave()">
        <li
          v-for="(item, index) in navDataList" :key="index"
          @mouseenter="navTabenter(index)"
          @mouseleave="navTableave(index)"
          @click="navTabClick(index)"
          :class="{liActive: navItemIndex == index}"
        >
          <img :src="item.imaUrl" alt>
          <span v-if="index == 0" @click="$router.push(item.url)">{{item.name}}</span>
          <span v-else>{{item.name}}</span>
        </li>
      </ul>


     
    </div>
    <div v-show="secondLevelIsShow" class="secondLevel" :style="'top:'+ topNum + 'rem;'" @mouseleave="activeLeave()">
      <div
        v-for="(item, index) in secondLevelList"
        :key="index"
        @mouseenter="secondLevelenter(index)"
        @mouseleave="secondLevelleave()"
        @click="$router.push('/'+item.frontcode)"
        :class="{secondLevelActive: secondLevelIndex == index}"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { getIndexBar } from "@/assets/api/manage/jurisdiction";
export default {
  name: "NewNavItemBox",
  components: {},
  data() {
    return {
      topNum: 0,
      secondLevelList: [],
      navItemIndex: "",
      activeIndex:'',
      secondLevelIndex: "",
      secondLevelIsShow: false,
      navDataList: []
    };
  },
  methods: {
    // 侧边栏信息
    navData() {
      getIndexBar().then(res => {
        let _tmp = res.data;
        // _tmp.unshift({
        //   name:"首页",
        //   url:'/StoreData',
        //   imaUrl:require("@/assets/images/newNavItem/index.png")
        // })
        for (let i = 0; i < _tmp.length; i++) {
          if (_tmp[i].name == "首页") {
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/index.png");
            _tmp[i].url = '/StoreData';
          }
          if (_tmp[i].name == "数据管理") {
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/data.png");
          }
          else if(_tmp[i].name == "门店管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/shopManagement.png");
          }
          else if(_tmp[i].name == "人事管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/personnel.png");
          }
          else if(_tmp[i].name == "任务管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/task.png");
          }
          // else if(_tmp[i].name == "库房管理"){
          //   _tmp[i].imaUrl = require("@/assets/images/newNavItem/warehouse.png");
          // }
          else if(_tmp[i].name == "运营管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/operation.png");
          }
          else if(_tmp[i].name == "消息管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/information.png");
          }
          else if(_tmp[i].name == "系统管理"){
            _tmp[i].imaUrl = require("@/assets/images/newNavItem/system.png");
          }

        }
        // for (let i = 0; i < _tmp.length; i++) {
        //   if (_tmp[i].secondLevel) {
        //     if (_tmp[i].name == "首页") {
        //     } 
        //     else if (_tmp[i].name == "数据管理") {
        //       _tmp[i].img = require("@/assets/images/newNavItem/data.png");
        //       let child = [];
        //       if (_tmp[i].secondLevel.newCustomers) {
        //         _tmp[i].secondLevel.newCustomers.url = 'AddClient';
        //         child.push(_tmp[i].secondLevel.newCustomers)
        //       }
        //       if (_tmp[i].secondLevel.newAppointment) {
        //         _tmp[i].secondLevel.newAppointment.url = 'AddMakeAnAppointment';
        //         child.push(_tmp[i].secondLevel.newAppointment)
        //       }
        //       if (_tmp[i].secondLevel.triageList) {
        //         _tmp[i].secondLevel.triageList.url = 'Triage';
        //         child.push(_tmp[i].secondLevel.triageList)
        //       }
        //       if (_tmp[i].secondLevel.todayAppointment) {
        //         _tmp[i].secondLevel.todayAppointment.url = 'AdvisoryCard';
        //         child.push(_tmp[i].secondLevel.todayAppointment)
        //       }
        //       if (_tmp[i].secondLevel.todayCashier) {
        //         _tmp[i].secondLevel.todayCashier.url = 'ToCollectMoneyCard';
        //         child.push(_tmp[i].secondLevel.todayCashier)
        //       }
        //       if (_tmp[i].secondLevel.todayConsumption) {
        //         _tmp[i].secondLevel.todayConsumption.url = 'Deduction';
        //         child.push(_tmp[i].secondLevel.todayConsumption)
        //       }
        //       _tmp[i].child = child;
        //     } else if (_tmp[i].name == "人事管理") {
        //       _tmp[i].img = require("@/assets/images/newNavItem/personnel.png");
        //       let child = [];
        //       if (_tmp[i].secondLevel.TaskCore) {
        //         _tmp[i].secondLevel.TaskCore.url = 'MissionCenter';
        //         child.push(_tmp[i].secondLevel.TaskCore)
        //       }
        //       if (_tmp[i].secondLevel.Task) {
        //         _tmp[i].secondLevel.Task.url = 'TaskList';
        //         child.push(_tmp[i].secondLevel.Task)
        //       }
        //       if (_tmp[i].secondLevel.Review) {
        //         _tmp[i].secondLevel.Review.url = 'ReturnVisitList';
        //         child.push(_tmp[i].secondLevel.Review)
        //       }
        //       _tmp[i].child = child;
        //     } else if (_tmp[i].name == "消息管理") {
        //       _tmp[i].img = require("@/assets/images/newNavItem/information.png");
        //       let child = [];
        //       if (_tmp[i].secondLevel.appointmentList) {
        //         _tmp[i].secondLevel.appointmentList.url = 'MakeAnAppointmentList';
        //         child.push(_tmp[i].secondLevel.appointmentList)
        //       }
        //       if (_tmp[i].secondLevel.consultationList) {
        //         _tmp[i].secondLevel.consultationList.url = 'AdvisoryList';
        //         child.push(_tmp[i].secondLevel.consultationList)
        //       }
        //       if (_tmp[i].secondLevel.historyConsumption) {
        //         _tmp[i].secondLevel.historyConsumption.url = 'DeductionList';
        //         child.push(_tmp[i].secondLevel.historyConsumption)
        //       }
        //       if (_tmp[i].secondLevel.historyCashier) {
        //         _tmp[i].secondLevel.historyCashier.url = 'ToCollectMoneyList';
        //         child.push(_tmp[i].secondLevel.historyCashier)
        //       }
        //       if (_tmp[i].secondLevel.chargeBack) {
        //         _tmp[i].secondLevel.chargeBack.url = 'ChargebackList';
        //         child.push(_tmp[i].secondLevel.chargeBack)
        //       }
        //       if (_tmp[i].secondLevel.prepaid) {
        //         _tmp[i].secondLevel.prepaid.url = 'TopUpList';
        //         child.push(_tmp[i].secondLevel.prepaid)
        //       }
        //       if (_tmp[i].secondLevel.arrears) {
        //         _tmp[i].secondLevel.arrears.url = 'DebtList';
        //         child.push(_tmp[i].secondLevel.arrears)
        //       }
        //       if (_tmp[i].secondLevel.receiptItems) {
        //         _tmp[i].secondLevel.receiptItems.url = 'ToCollectMoneyDetailList';
        //         child.push(_tmp[i].secondLevel.receiptItems)
        //       }
        //       _tmp[i].child = child;
        //     } else if (_tmp[i].name == "系统管理") {
        //       _tmp[i].img = require("@/assets/images/newNavItem/system.png");
        //       let child = [];
        //       if (_tmp[i].secondLevel.customerList) {
        //         _tmp[i].secondLevel.customerList.url = 'ClientList';
        //         child.push(_tmp[i].secondLevel.customerList)
        //       }
        //       if (_tmp[i].secondLevel.customerAnalysis) {
        //         _tmp[i].secondLevel.customerAnalysis.url = 'CustomerAnalysis';
        //         child.push(_tmp[i].secondLevel.customerAnalysis)
        //       }
        //       if (_tmp[i].secondLevel.customerLabel) {
        //         _tmp[i].secondLevel.customerLabel.url = 'RecordList';
        //         child.push(_tmp[i].secondLevel.customerLabel)
        //       }
        //       if (_tmp[i].secondLevel.customerLabelAnalysis) {
        //         _tmp[i].secondLevel.customerLabelAnalysis.url = 'RecordAnalyze';
        //         child.push(_tmp[i].secondLevel.customerLabelAnalysis)
        //       }
        //       _tmp[i].child = child;
        //     } else if (_tmp[i].name == "库房管理") {
        //       _tmp[i].img = require("@/assets/images/newNavItem/warehouse.png");
        //       let child = [];
        //       if (_tmp[i].secondLevel.Sale) {
        //         _tmp[i].secondLevel.Sale.url = 'OperationStatement';
        //         child.push(_tmp[i].secondLevel.Sale)
        //       }
        //       if (_tmp[i].secondLevel.teamManagement) {
        //         _tmp[i].secondLevel.teamManagement.url = 'TeamManagement';
        //         child.push(_tmp[i].secondLevel.teamManagement)
        //       }
        //       if (_tmp[i].secondLevel.itemsManagement) {
        //         _tmp[i].secondLevel.itemsManagement.url = 'ProjectManagement';
        //         child.push(_tmp[i].secondLevel.itemsManagement)
        //       }
        //       if (_tmp[i].secondLevel.channelManagement) {
        //         _tmp[i].secondLevel.channelManagement.url = 'ChannelManagement';
        //         child.push(_tmp[i].secondLevel.channelManagement)
        //       }
        //       if (_tmp[i].secondLevel.roomSet) {
        //         _tmp[i].secondLevel.roomSet.url = 'CureRoom';
        //         child.push(_tmp[i].secondLevel.roomSet)
        //       }
        //       if (_tmp[i].secondLevel.promotion) {
        //         _tmp[i].secondLevel.promotion.url = 'ActivityList';
        //         child.push(_tmp[i].secondLevel.promotion)
        //       }
        //       _tmp[i].child = child;
        //     }
        //   }else {
        //     _tmp[i].img = require("@/assets/images/newNavItem/index.png");
        //   }
        // }
        this.navDataList = _tmp;
      });
    },

    // 一级移入移出
    navTabenter(index) {
      this.navItemIndex = index;
      this.activeIndex = index;
      let num = 0.6;
      let topNumOne = 2.3;
      if (index == 0) {
        this.secondLevelIsShow = false;
      } else if (index == 1) {
        this.topNum = topNumOne;
        this.secondLevelList = this.navDataList[index].child;
        this.secondLevelIsShow = true;
      } else if (index == 2) {
        this.topNum = topNumOne + num * 1;
        this.secondLevelList = this.navDataList[index].child;
        this.secondLevelIsShow = true;
      } else if (index == 3) {
        this.secondLevelList = this.navDataList[index].child;
        this.topNum = topNumOne + num * 2;
        this.secondLevelIsShow = true;
      } else if (index == 4) {
        this.secondLevelList = this.navDataList[index].child;
        this.topNum = topNumOne + num * 3;
        this.secondLevelIsShow = true;
      } else if (index == 5) {
        this.topNum = topNumOne + num * 4;
        this.secondLevelList = this.navDataList[index].child;
        this.secondLevelIsShow = true;
      }else if (index == 6) {
        this.topNum = topNumOne + num * 5;
        this.secondLevelList = this.navDataList[index].child;
        this.secondLevelIsShow = true;
      }else if (index == 7) {
        this.topNum = topNumOne + num * 6;
        this.secondLevelList = this.navDataList[index].child;
        this.secondLevelIsShow = true;
      }
    },
    navTableave(index) {
      this.navItemIndex = -1;
    },

    // 二级移入移出
    secondLevelenter(index) {
      this.secondLevelIsShow = true;
      this.secondLevelIndex = index;
      this.navItemIndex = this.activeIndex;
    },
    secondLevelleave() {
      this.secondLevelIndex = -1;
    },

    // 二级大盒子移出
    activeLeave() {
      this.secondLevelIsShow = false;
      this.navItemIndex = -1;
    },

    // 一级大盒子移出
    ulTableave() {
      this.secondLevelIsShow = false;
    },

    // 二级点击事件
    navTabClick(index) {
      if (index == 0) {
        this.$router.push(`/StoreData`);
      }
    },
  },
  mounted() {
    this.navData();
  }
};
</script>

<style lang="scss" scoped>
.NewNavItemBox {
  overflow: hidden;
  .NewNavItem {
    width: 136px;
    position: fixed;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #20222a;
    .logoImg {
      margin-top: .59rem;
      margin-bottom: .51rem;
      text-align: center;
    }
    ul {
      li {
        width: 100%;
        height: .6rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          height: 17px;
          margin-left: .21rem;
        }
        span {
          margin-left: .1rem;
          font-size: .14rem;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
        }
      }
      .liActive {
        background-color: #43454e;
      }
    }
    .NewNavItem_text {
      text-align: center;
      margin-top: 1.3rem;
      font-size: .14rem;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: rgba(255, 255, 255, 1);
    }
  }
  .secondLevel {
    position: fixed;
    left: 136px;
    width: 200px;
    z-index: 9999;
    background-color: #43454e;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    // border-radius: 5px;
    div {
      width: 100%;
      height: .5rem;
      display: flex;
      align-items: center;
      padding-left: 0.2rem;
      cursor: pointer;
      font-size: .14rem;
      font-family: PingFang SC;
      font-weight: 500;
      // color: rgba(51, 51, 51, 1);
      color: #ffffff;
    }
    .secondLevelActive {
      background-color: #20222a;
    }
  }
  .NewNavItem::-webkit-scrollbar {
    display: none;
  }
}
</style>
