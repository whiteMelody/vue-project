<template>
  <div class="NewNavItemBox">
    <div class="NewNavItem" ref="NewNavItem">
      <div class="logoImg">
        <img src="@/shop/assets/img/newNavItem/logoOne.png">
      </div>
      <ul @mouseleave="ulTableave()">
        <li v-for="(item, index) in navDataList" :key="index"
            @mouseenter="navTabenter(index)"
            @mouseleave="navTableave(index)"
            @click="navTabClick(index)"
            :class="{active: navItemIndex == index}">
          <img :src="item.img" alt>
          <span>{{item.name}}</span>
        </li>
      </ul>

      <div class="NewNavItem_text">
        <p>微信扫码手机版</p>
        <div class="clear1"></div>
        <p>{{$store.getters.currentUser.store.name}}</p>
      </div>

      <div class="clear4"></div>

      <div class="wb100 text-center">
        <img src="@/shop/assets/img/newNavItem/weChat_code.png">
      </div>
    </div>
    <div v-show="secondLevelIsShow" class="secondLevel" :style="'top:'+ topNum + 'rem;'" @mouseleave="activeLeave()">
      <div v-for="(item, index) in secondLevelList"
        :key="index"
        @mouseenter="secondLevelenter(index)"
        @mouseleave="secondLevelleave()"
        @click="secondLevelClick(item)"
        :class="{active: secondLevelIndex == index}">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  import { menus } from "@/shop/assets/api/manage/jurisdiction";
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
        menus().then(res => {
          let _tmp = res.data;

          for (let i = 0; i < _tmp.length; i++) {
            if (_tmp[i].secondLevel) {
              if (_tmp[i].name == "流程管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/Technological.png");
              } else if (_tmp[i].name == "任务管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/task.png");
              } else if (_tmp[i].name == "信息化管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/information.png");
              } else if (_tmp[i].name == "客户管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/customer.png");
              } else if (_tmp[i].name == "经营管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/Management.png");
              } else if (_tmp[i].name == "日志管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/log.png");
              } else if (_tmp[i].name == "库房管理") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/storageRoom.png");
              } else if (_tmp[i].name == "人事数据") {
                _tmp[i].img = require("@/shop/assets/img/newNavItem/ThePersonnelData.png");
              }
            }else {
              _tmp[i].img = require("@/shop/assets/img/newNavItem/index.png");
            }
          }

          // console.log(_tmp)

          this.navDataList = _tmp;
        });
      },

      // 一级移入移出
      navTabenter(index) {
        // this.navItemIndex = index;
        // this.activeIndex = index;
        // let num = 0.6;
        // let topNumOne = 2.3;
        // if (index == 0) {
        //   this.secondLevelIsShow = false;
        // } else {
        //   this.topNum = topNumOne + num * (index - 1);
        //   this.secondLevelList = this.navDataList[index].secondLevel;
        //   this.secondLevelIsShow = true;
        // }
        this.navItemIndex = index;
        this.activeIndex = index;
        let num = 0.6;
        let topNumOne = 2.3;
        let ThisScrollTop = this.$refs.NewNavItem.scrollTop / 100;
        let child = this.navDataList[index].secondLevel;
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

      // 一级点击事件
      navTabClick(index) {
        if (index == 0) {
          this.$router.push(`/Home`);
        }
      },

      // 二级点击
      secondLevelClick(item) {
        if (item.name == '治疗间设置') {
          this.$router.push({
            name:item.url,
            query:{isSwitch:true}
          })
        }else {
          this.$router.push(item.url);
        }

      }
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
          &.active {
            background-color: #43454e;
          }
          img {
            height: .15rem;
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
        &.active {
          background-color: #20222a;
        }
      }
    }
    .NewNavItem::-webkit-scrollbar {
      display: none;
    }
  }
</style>
