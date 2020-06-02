<template>
  <!-- 咨询 -->
  <div class="ImprovingData bg-white" :style="'minHeight:' + minHeight + 'px' ">
    <!--   header   -->
    <Header :title="'完善资料'" :back="true"></Header>
    <div class="main">
      <!-- 补充详情 -->
      <div class="main_supplement" v-loading="loading">
        <div class="content">
          <ul>
            <li>
              <div class="name">
                <i>*</i>
                姓名
              </div>
              <input type="text" v-model="inputModelList.customer_name" placeholder="请输入">
            </li>
            <li>
              <div class="name">
                <i>*</i>
                电话
              </div>
              <input type="text" v-model="inputModelList.mobile" placeholder="请输入">
            </li>
            <li>
              <div class="name">备用电话</div>
              <input type="text" v-model="inputModelList.SpareMobile" placeholder="请输入">
            </li>
            <li>
              <div class="name">顾客编号</div>
              <p>
                <a>{{inputModelList.customerNumber}}</a>
                <i class="iconfont iconxiangyou" style="color:#fff;"></i>
              </p>
            </li>

            <!-- 性别 -->
            <li @click="popShow('sex')">
              <div class="name">性别</div>
              <p>
                <strong v-if="sexActiveName == null">请选择</strong>
                <a v-else>{{sexActiveName}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
          </ul>
        </div>

        <div class="content">
          <ul>
            <!-- 顾问 -->
            <li @click="popShow('adviser')">
              <div class="name">顾问</div>
              <p>
                <strong v-if="counselorActive == ''">请选择</strong>
                <a v-else>{{counselorActive}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>

            <!-- 开发人员 -->
            <li @click="popShow('development')">
              <div class="name">开发人员</div>
              <p>
                <strong v-if="developmentActive == ''">请选择</strong>
                <a v-else>{{developmentActive}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
          </ul>
        </div>

        <div class="content">
          <ul>
            <li>
              <div class="name">身份证</div>
              <input type="text" v-model="inputModelList.ID" placeholder="请输入">
            </li>

            <!-- 生日 -->
            <li @click="popShow('Birthday')">
              <div class="name">生日</div>
              <p>
                <strong v-if="BirthdayActive == ''">请选择</strong>
                <a v-else>{{BirthdayActive}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>

            <li>
              <div class="name">职业</div>
              <input type="text" v-model="inputModelList.Occupation" placeholder="请输入">
            </li>

            <!-- 地区 -->
            <li @click="popShow('region')">
              <div class="name">地区</div>
              <p>
                <strong v-if="regionActive == ''">请选择</strong>
                <a v-else>{{regionActive}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
            <li>
              <div class="name">地址</div>
              <input type="text" v-model="inputModelList.address" placeholder="请输入">
            </li>
            <li>
              <div class="name">QQ</div>
              <input type="text" v-model="inputModelList.QQ" placeholder="请输入">
            </li>
            <li>
              <div class="name">微信</div>
              <input type="text" v-model="inputModelList.WeChat" placeholder="请输入">
            </li>
            <li>
              <div class="name">邮箱</div>
              <input type="text" v-model="inputModelList.mailbox" placeholder="请输入">
            </li>
          </ul>
        </div>
      </div>

      <!-- 详情填写 -->
      <div class="main_details">
        <div class="content">
          <ul>
            <li @click="popShow('project')">
              <div class="name">项目</div>
              <p>
                <strong v-if="projectActive == null">请选择</strong>
                <a v-else>{{projectActive[0].name+'-'+projectActive[1].name}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
            <li @click="popShow('channel')">
              <div class="name">
                <i>*</i>
                渠道
              </div>
              <p>
                <strong v-if="channelActive == null">请选择</strong>
                <a v-else>{{channelActive[0].name+'-'+channelActive[1].name}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
          </ul>
        </div>
        <div class="title">
          <i>*</i>
          <span>顾客备注</span>
        </div>
        <div class="input">
          <textarea v-model="inputModelList.customerRemarks" class="textarea" placeholder="请输入"></textarea>
        </div>
      </div>

      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->
      <!-- ------------------------------------------------------------------------------------华丽的分割线------------------------------------------------------------------------------------- -->

      <!-- 性别 -->
      <van-actionsheet
        v-model="sexShow"
        :actions="sexActions"
        @select="sexSelect"
        cancel-text="取消"
      />

      <!-- 顾问 -->
      <van-popup v-model="adviserShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="counselorColumns"
          @cancel="counselorCancel"
          @confirm="counselorConfirm"
        />
      </van-popup>

      <!-- 开发人员 -->
      <van-popup v-model="developmentShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="developmentColumns"
          @cancel="developmentCancel"
          @confirm="developmentConfirm"
        />
      </van-popup>

      <!-- 生日 -->
      <van-popup v-model="BirthdayShow" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :formatter="formatter"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="BirthdayClick"
          @cancel="cancelBirthdayClick"
        />
      </van-popup>

      <!-- 地区 -->
      <van-popup v-model="regionShow" position="bottom">
        <van-area
          :area-list="AreaList"
          @confirm="regionClick"
          @cancel="cancelClick"
          :visible-item-count="7"
        />
      </van-popup>

      <!-- 项目 -->
      <div class="pop_boxs">
        <van-popup v-model="projectShow" position="bottom">
          <div class="pop_box">
            <div class="header">
              <span @click="projectCancel">取消</span>
              <a v-if="projectActiveText != '请选择'" @click="projectConfirm">确定</a>
            </div>
            <div class="text">{{projectActiveText}}</div>
            <ul v-show="projectActiveText == '请选择'">
              <li
                @click="projectListConfirm(index)"
                v-for="(item , index) in  projectLIst"
                :class="projectListIndex == index ? 'active' :''"
                :key="index"
              >
                <span>{{item.name}}</span>
                <i class="iconfont iconduihao"></i>
              </li>
            </ul>
            <ul class="children" v-show="projectActiveText != '请选择'">
              <li
                @click="projectLIstChildrenConfirm(index)"
                v-for="(item , index) in  projectActiveList"
                :class="projectLIstChildrenIndex == index ? 'active' :''"
                :key="index"
              >
                <span>{{item.name}}</span>
                <i class="iconfont iconduihao"></i>
              </li>
            </ul>
          </div>
        </van-popup>
      </div>
      <!-- 渠道 -->
      <div class="pop_boxs">
        <van-popup v-model="channelShow" position="bottom">
          <div class="pop_box">
            <div class="header">
              <span @click="channelCancel">取消</span>
              <a v-if="channelActiveText != '请选择'" @click="channelConfirm">确定</a>
            </div>
            <div class="text">{{channelActiveText}}</div>
            <ul v-show="channelActiveText == '请选择'">
              <li
                @click="channelListConfirm(index)"
                v-for="(item , index) in  channelLIst"
                :class="channelListIndex == index ? 'active' :''"
                :key="index"
              >
                <span>{{item.name}}</span>
                <i class="iconfont iconduihao"></i>
              </li>
            </ul>
            <ul class="children" v-show="channelActiveText != '请选择'">
              <li
                @click="channelLIstChildrenConfirm(index)"
                v-for="(item , index) in  channelActiveList"
                :class="channelLIstChildrenIndex == index ? 'active' :''"
                :key="index"
              >
                <span>{{item.name}}</span>
                <i class="iconfont iconduihao"></i>
              </li>
            </ul>
          </div>
        </van-popup>
      </div>

      <!-- 保存 -->
      <div
        class="main_buttom"
        @click="submit"
        v-loading.fullscreen.lock="subLoding"
        element-loading-text="提交中..."
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >保&nbsp;&nbsp;存</div>
    </div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import Provinces from "../../../../utils/provinces.js";
import {
  getStoreItem,
  getStoreChannel,
  addCustomer
} from "@/assets/api/Data/AddCustomer";
import { postDetails, postAdviser } from "@/assets/api/CustomerDetails/Details";
import {
  getRegionData,
  getPerfect
} from "@/assets/api/ConsultationDetails/ConsultationDetails";
import { Toast } from "vant";
import { setTimeout } from "timers";
export default {
  name: "ImprovingData",
  data() {
    return {
      // 顾客ID
      minHeight: 0,
      customerID: null,
      taskID: null,
      // 性别
      sexShow: false,
      sexActiveName: null,
      sexActiveID: null,
      sexActions: [
        { name: "请选择", disabled: true },
        { name: "男", key: "1" },
        { name: "女", key: "0" }
      ],
      // 顾问
      adviserShow: false,
      counselorActive: "",
      adviserKeyID: "",
      counselorColumns: [],
      // 开发人员
      developmentShow: false,
      developmentActive: "",
      developmentID: "",
      developmentColumns: [],

      // 生日
      BirthdayShow: false,
      BirthdayActive: "",
      maxDate: new Date(),
      minDate: new Date(1919, 0, 1),
      currentDate: new Date(2019, 0, 1),
      // 地区
      regionShow: false,
      regionActive: "",
      AreaList: Provinces,
      regionValueList: [],
      provinces: "",
      citys: "",
      countys: "",
      // 项目
      projectShow: false,
      projectActive: null,
      projectActiveText: "请选择",
      projectActiveList: [],
      projectLIst: [],
      projectListIndex: null,
      projectLIstChildrenIndex: null,
      // 渠道
      channelShow: false,
      channelActive: null,
      channelActiveText: "请选择",
      channelActiveList: [],
      channelLIst: [],
      channelListIndex: null,
      channelLIstChildrenIndex: null,

      // inputModel
      inputModelList: {
        // 姓名
        customer_name: "",
        // 电话
        mobile: "",
        // 备用电话
        SpareMobile: "",
        // 顾客编号
        customerNumber: "请输入",
        // 身份证
        ID: "",
        // 职业
        Occupation: "",
        // 地址
        address: "",
        // QQ
        QQ: "",
        // 微信
        WeChat: "",
        // 邮箱
        mailbox: "",
        // 顾客备注
        customerRemarks: ""
      },

      // 展示数据
      loading: false,
      subLoding: false
    };
  },
  components: {
    Header,
    Toast
  },
  methods: {
    // 选择
    popShow(str) {
      switch (str) {
        case "adviser":
          this.adviserShow = true;
          break;
        case "Birthday":
          this.BirthdayShow = true;
          break;
        case "region":
          this.regionShow = true;
          break;
        case "sex":
          this.sexShow = true;
          break;
        case "project":
          this.projectShow = true;
          break;
        case "channel":
          this.channelShow = true;
          break;
        case "development":
          this.developmentShow = true;
          break;
        default:
          break;
      }
    },

    //性别选择
    sexSelect(item) {
      this.sexShow = false;
      this.sexActiveName = item.name;
      this.sexActiveID = item.key;
    },

    //顾问
    counselorCancel() {
      this.adviserShow = false;
    },
    counselorConfirm(item) {
      // 确定按钮
      this.adviserShow = false;
      this.adviserKeyID = item.key;
      this.counselorActive = item.text;
    },

    //开发人员
    developmentCancel() {
      this.developmentShow = false;
    },
    developmentConfirm(item) {
      // 确定按钮
      this.developmentShow = false;
      this.developmentID = item.key;
      this.developmentActive = item.text;
    },

    // 地区
    regionClick(values) {
      this.regionValueList = values;
      // 确定按钮
      let regionName = "";
      regionName = values[0].name + "-" + values[1].name + "-" + values[2].name;
      this.regionActive = regionName;
      this.regionShow = false;
    },
    cancelClick() {
      this.regionShow = false;
    },

    // 生日
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    pVBClick(s) {
      return s < 10 ? "0" + s : s;
    },
    BirthdayClick() {
      // 确定按钮
      let dateNew = new Date(this.currentDate);
      const resDate =
        dateNew.getFullYear() +
        "-" +
        this.pVBClick(dateNew.getMonth() + 1) +
        "-" +
        this.pVBClick(dateNew.getDate());

      this.BirthdayActive = resDate;
      this.BirthdayShow = false;
    },
    cancelBirthdayClick() {
      this.BirthdayShow = false;
    },

    //获取门店-项目
    getShowProjectFn(type, pid, fn) {
      let postData = {
        getItem: type,
        p_id: pid
      };
      getStoreItem(postData)
        .then(res => {
          if (pid == undefined) {
            this.projectLIst = res.data;
          } else {
            this.projectActiveList = res.data;
            fn();
          }
          // this.$forceUpdate();
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 项目二级的点击事件
    projectListConfirm(index) {
      this.projectListIndex = index;
      this.getShowProjectFn(2, this.projectLIst[index].id, () => {
        this.projectActiveText = this.projectLIst[index].name;
      });
    },

    // 项目取消
    projectCancel() {
      this.projectShow = false;
      this.projectActiveText = "请选择";
      this.projectListIndex = null;
      this.projectLIstChildrenIndex = null;
    },
    projectConfirm() {
      if (this.projectLIstChildrenIndex != null) {
        var arr = [
          this.projectLIst[this.projectListIndex],
          this.projectActiveList[this.projectLIstChildrenIndex]
        ];
        this.projectActive = arr;
        this.projectShow = false;
        this.projectActiveText = "请选择";
        this.projectListIndex = null;
        this.projectLIstChildrenIndex = null;
      } else {
        Toast("请完善资料");
      }
    },
    projectLIstChildrenConfirm(index) {
      this.projectLIstChildrenIndex = index;
      // this.$forceUpdate()
    },

    //获取门店-渠道
    getShowChannelFn(type, pid, fn) {
      let postData = {
        getChannel: type,
        p_id: pid
      };
      getStoreChannel(postData)
        .then(res => {
          if (pid == undefined) {
            this.channelLIst = res.data;
          } else {
            this.channelActiveList = res.data;
            fn();
          }
          this.$forceUpdate();
        })
        .catch(e => {
          console.log(e);
        });
    },
    channelCancel() {
      this.channelShow = false;
      this.channelActiveText = "请选择";
      this.channelListIndex = null;
      this.channelLIstChildrenIndex = null;
    },
    channelConfirm() {
      if (this.channelLIstChildrenIndex != null) {
        var arr = [
          this.channelLIst[this.channelListIndex],
          this.channelActiveList[this.channelLIstChildrenIndex]
        ];
        this.channelActive = arr;
        this.channelShow = false;
        this.channelActiveText = "请选择";
        this.channelListIndex = null;
        this.channelLIstChildrenIndex = null;
      } else {
        Toast("请完善资料");
      }
    },
    channelListConfirm(index) {
      this.channelListIndex = index;
      this.getShowChannelFn(2, this.channelLIst[index].id, () => {
        this.channelActiveText = this.channelLIst[index].name;
      });
    },
    channelLIstChildrenConfirm(index) {
      this.channelLIstChildrenIndex = index;
      // this.$forceUpdate()
    },

    // 数据
    DataList() {
      this.loading = true;
      postDetails({ customer_id: this.customerID })
        .then(res => {
          // console.log(res);
          if (res.status == 0) {
            // 姓名
            this.inputModelList.customer_name = res.data.name;
            // 电话
            this.inputModelList.mobile = res.data.mobile;
            // 备用电话
            this.inputModelList.SpareMobile = res.data.standby_telephone;
            // 顾客编号
            this.inputModelList.customerNumber = res.data.code;
            // 身份证
            this.inputModelList.ID = res.data.idcard;
            // 职业
            this.inputModelList.Occupation = res.data.occupation;
            // 地址
            this.inputModelList.address = res.data.address;
            // QQ
            this.inputModelList.QQ = res.data.qq;
            // 微信
            this.inputModelList.WeChat = res.data.weixin;
            // 邮箱
            this.inputModelList.mailbox = res.data.email;
            // 咨询详情
            this.inputModelList.customerRemarks = res.data.complaint;
            // 性别
            this.sexActiveName = res.data.sex.label;
            this.sexActiveID = res.data.sex.value;
            // 顾问
            this.counselorActive = res.data.adviser.name;
            this.adviserKeyID = res.data.adviser.users_id;
            // 开发人员
            this.developmentActive = res.data.development.name;
            this.developmentID = res.data.development.users_id;
            // 生日
            if (res.data.birthday != null) {
              this.BirthdayActive = res.data.birthday;
            }
            // 地区
            if (res.data.district.length) {
              this.regionClick(res.data.district);
            }
            // 项目
            if (res.data.item.length) {
              res.data.item.map((item, index) => {
                if (item.name != "") {
                  this.projectActive = res.data.item;
                }
              });
            }
            // 渠道
            if (res.data.channel.length) {
              res.data.channel.map((item, index) => {
                if (item.name != "") {
                  this.channelActive = res.data.channel;
                }
              });
            }
            this.loading = false;
          } else {
            Toast("获取用户数据错误!");
            this.loading = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    // 开发人员和顾问
    DevelopmentData(type) {
      postAdviser({ role_id: type }).then(res => {
        if (res.status == 0) {
          if (type == 3) {
            this.counselorColumns = res.data;
            res.data.map((item, index) => {
              (item.text = item.name), (item.key = item.users_id);
            });
          } else {
            this.developmentColumns = res.data;
            res.data.map((item, index) => {
              (item.text = item.name), (item.key = item.users_id);
            });
          }
        }
      }).catch((e)=>{
        console.log(e)
      });
    },

    // 确定提交
    submit() {
      let dataListObj = {};
      if (
        this.inputModelList.customer_name == "" ||
        this.inputModelList.mobile == "" ||
        this.inputModelList.customerRemarks == "" ||
        this.channelActive == null
      ) {
        Toast("请完善资料!");
        return false;
      } else {
        if (this.regionValueList.length) {
          let content = {
            province: this.regionValueList[0].name,
            city: this.regionValueList[1].name,
            county: this.regionValueList[2].name
          };
          getRegionData(content)
            .then(res => {
              if (res.status == 0) {
                // 地区
                dataListObj.province_id = res.data.province_id;
                dataListObj.city_id = res.data.city_id;
                dataListObj.region_id = res.data.county_id;
              }
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          // 地区
          dataListObj.province_id = "";
          dataListObj.city_id = "";
          dataListObj.region_id = "";
        }
        // ID
        dataListObj.customer_id = this.customerID;
        dataListObj.task_id = this.taskID;
        // 姓名
        dataListObj.name = this.inputModelList.customer_name;
        // 电话
        dataListObj.mobile = this.inputModelList.mobile;
        // qq
        dataListObj.qq = this.inputModelList.QQ;
        // 微信
        dataListObj.weixin = this.inputModelList.WeChat;
        // 邮箱
        dataListObj.email = this.inputModelList.mailbox;
        // 备用电话
        dataListObj.standby_telephone = this.inputModelList.SpareMobile;
        // 身份证
        dataListObj.idcard = this.inputModelList.ID;
        // 职业
        dataListObj.occupation = this.inputModelList.Occupation;
        // 地址
        dataListObj.address = this.inputModelList.address;
        // 顾客备注
        dataListObj.complaint = this.inputModelList.customerRemarks;
        // 性别
        dataListObj.sex = this.sexActiveID;
        // 顾问
        dataListObj.consultation_id = this.adviserKeyID;
        // 开发人员
        dataListObj.development = this.developmentID;
        // 生日
        dataListObj.birthday = this.BirthdayActive;
        // 生日类型
        dataListObj.calendar = "0";
        // 项目
        if (this.projectActive != null) {
          dataListObj.item_pid = this.projectActive[0].id;
          dataListObj.item_id = this.projectActive[1].id;
        } else {
          dataListObj.item_pid = 0;
          dataListObj.item_id = 0;
        }
        // 渠道
        if (this.channelActive != null) {
          dataListObj.channel_pid = this.channelActive[0].id;
          dataListObj.channel_id = this.channelActive[1].id;
        } else {
          dataListObj.channel_pid = 0;
          dataListObj.channel_id = 0;
        }
        this.subLoding = true;
        getPerfect(dataListObj)
          .then(res => {
            setTimeout(() => {
              this.subLoding = false;
              if (res.status == 0) {
                Toast({
                  message: "提交成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              } else {
                Toast(res.msg);
              }
            }, 1000);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    // 接收id
    this.customerID = this.$route.query.customer_id;
    this.taskID = this.$route.query.id;
    this.DataList();
    //获取门店-项目
    this.getShowProjectFn(1);
    //获取门店-渠道
    this.getShowChannelFn(1);
    // 顾问
    this.DevelopmentData(3);
    // 开发人员
    this.DevelopmentData();
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
@import "./ImprovingData.scss";
</style>