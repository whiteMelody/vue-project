<template>
  <div class="NewNavItemBox">
    <div class="NewNavItem" ref="NewNavItem">
      <div class="logoImg">
        <img src="@/chain/assets/sidebar/yiyun_logo2.png" class="wb80" alt>
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
        @click="$router.push('/'+item.frontcode)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { getIndexBar } from "@/chain/assets/api/manage/jurisdiction";
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
        //   imaUrl:require("@/chain/assets/images/newNavItem/index.png")
        // })
        for (let i = 0; i < _tmp.length; i++) {
          if (_tmp[i].name == "首页") {
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/index.png");
            _tmp[i].url = '/StoreData';
          }
          if (_tmp[i].name == "数据管理") {
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/data.png");
          }
          else if(_tmp[i].name == "门店管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/shopManagement.png");
          }
          else if(_tmp[i].name == "人事管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/personnel.png");
          }
          else if(_tmp[i].name == "任务管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/task.png");
          }
          else if(_tmp[i].name == "运营管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/operation.png");
          }
          else if(_tmp[i].name == "消息管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/information.png");
          }
          else if(_tmp[i].name == "库房管理"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/storageRoom.png");
          }
          else if(_tmp[i].name == "操作日志"){
            _tmp[i].imaUrl = require("@/chain/assets/images/newNavItem/log.png");
          }

        }
        this.navDataList = _tmp;
      });
    },
    // 一级移入移出
    navTabenter(index) {
      this.navItemIndex = index;
      this.activeIndex = index;
      let num = 0.5;
      let topNumOne = 2.2;
      let ThisScrollTop = this.$refs.NewNavItem.scrollTop / 100;
      let child = this.navDataList[index].child
      if (index == 0) {
        this.secondLevelIsShow = false;
      } else {
        if (child.length >= 8) {
          let reduceHeight = child.length - 7;
          this.topNum = ((topNumOne + num * (index - reduceHeight)) - ThisScrollTop - (ThisScrollTop / 30));
        }else {
          this.topNum = ((topNumOne + num * (index - 1)) - ThisScrollTop - (ThisScrollTop / 30));
        }
        this.secondLevelList = child;
        this.secondLevelIsShow = true;
      }
    },
    navTableave(index) {
      this.navItemIndex = -1;
    },

    // 二级移入移出
    secondLevelenter(index) {
      this.secondLevelIsShow = true;
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
        height: .5rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          height: 14px;
          margin-left: .21rem;
        }
        span {
          margin-left: .1rem;
          font-size: .14rem;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
        }
        &.liActive {
          background-color: #43454e;
        }
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
    &.NewNavItem::-webkit-scrollbar {
      display: none;
    }
  }
  .secondLevel {
    position: fixed;
    left: 136px;
    width: 200px;
    // max-height: 300px;
    z-index: 9999;
    background-color: #43454e;
    overflow: hidden;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
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
      color: #ffffff;
      &:hover {
        background-color: #20222a;
      }
    }
    &.secondLevel::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
