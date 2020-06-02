<template>
  <!-- 咨询 -->
  <div class="ConsultationDetails bg-white" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="'咨询详情'" :back="true"></Header>
    <div class="main" v-loading="loading">
      <!-- 用户信息 -->
      <div class="main_name">
        <div class="name">
          <div class="user_name">
            <span>{{dataUrlList.name}}</span>
            <i class="iconfont iconnv" v-if="dataUrlList.sex == 0"></i>
            <i class="iconfont iconnan" v-else></i>
          </div>
          <div class="mobile">年龄：{{dataUrlList.birthday}} | 电话：{{dataUrlList.mobile}}</div>
        </div>
        <div class="button" @click="$router.push({name:'HistoricalConsultation',query:{customer_id:dataUrlList.id}})">历史咨询</div>
      </div>

      <!-- 详情填写 -->
      <div class="main_details">
        <div class="title">
          <i>*</i>
          <span>咨询详情</span>
        </div>
        <div class="input">
          <textarea v-model="textareaText" class="textarea" placeholder="请输入"></textarea>
        </div>
      </div>

      <!-- 补充详情 -->
      <div class="main_supplement">
        <div class="title">
          <span>补充详情</span>
        </div>

        <div class="content">
          <ul>
            <li>
              <div class="name">备用电话</div>
              <input type="text" v-model="mobileNumber" placeholder="请输入">
            </li>
            <li @click="popShow('adviser')">
              <div class="name">所属顾问</div>
              <p>
                <strong v-if="counselorActive == ''">请选择</strong>
                <a v-else>{{counselorActive}}</a>
                <i class="iconfont iconxiangyou"></i>
              </p>
            </li>
            <li>
              <div class="name">身份证</div>
              <input type="text" v-model="IDNumber" placeholder="请输入">
            </li>
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
              <input type="text" v-model="Occupation" placeholder="请输入">
            </li>
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
              <input type="text" v-model="address" placeholder="请输入">
            </li>
            <li>
              <div class="name">QQ</div>
              <input type="text" v-model="QqNumber" placeholder="请输入">
            </li>
            <li>
              <div class="name">微信</div>
              <input type="text" v-model="WeChat" placeholder="请输入">
            </li>
            <li>
              <div class="name">邮箱</div>
              <input type="text" v-model="mailbox" placeholder="请输入">
            </li>
          </ul>
        </div>
      </div>

      <!-- 顾问 -->
      <van-popup v-model="adviserShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="counselorColumns"
          @cancel="counselorCancel"
          @confirm="counselorConfirm"
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

      <!-- 保存 -->
      <div
        class="main_buttom"
        @click="submit"
        v-loading.fullscreen.lock="subLoding"
        element-loading-text="提交中..."
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >确认保存</div>
    </div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import Provinces from "../../../../utils/provinces.js";
import {
  getConsultationDetails,
  getRegionData,
  getConsultationData
} from "@/assets/api/ConsultationDetails/ConsultationDetails";
import { Toast } from "vant";
import { setTimeout } from "timers";
export default {
  name: "ConsultationDetails",
  data() {
    return {
      minHeight: 0,
      // 顾问
      adviserShow: false,
      counselorActive: "",
      adviserKeyID: "",
      counselorColumns: [],
      // 生日
      BirthdayShow: false,
      BirthdayActive: "",
      years: "",
      months: "",
      days: "",
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
      // 咨询详情
      textareaText: "",
      // 电话
      mobileNumber: "",
      // 身份证
      IDNumber: "",
      // 职业
      Occupation: "",
      // 地址
      address: "",
      // QQ
      QqNumber: "",
      // 微信
      WeChat: "",
      // 邮箱
      mailbox: "",
      // 顾客ID
      customerID: "",
      // 预约ID
      makeID: "",
      // 顾问ID
      adviserID: "",
      // 展示数据
      dataUrlList: [],
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
        default:
          break;
      }
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

    // 数据
    DataList() {
      this.loading = true;
      let content = {
        customer_id: this.customerID,
        appointment_id: this.makeID,
        adviser_id: this.adviserID
      };
      getConsultationDetails(content).then(res => {
        if (res.status == 0) {
          this.dataUrlList = res.data.customerData;
          res.data.adviser.map((item, index) => {
            (item.text = item.name), (item.key = item.users_id);
            if (item.users_id == res.data.customerData.consultation_id) {
              this.counselorActive = item.name;
              this.adviserKeyID = item.users_id;
            }
          });
          let DataNUmber = res.data.customerData;
          // 顾问数组
          this.counselorColumns = res.data.adviser;

          // 地区
          if (res.data.customerData.region.length) {
            this.regionValueList = DataNUmber.region;
            this.regionActive =
              DataNUmber.region[0].name +
              "-" +
              DataNUmber.region[1].name +
              "-" +
              DataNUmber.region[2].name;
          }

          // 生日
          if (res.data.birthday.length) {
            this.BirthdayActive =
              res.data.birthday[0] +
              "-" +
              res.data.birthday[1] +
              "-" +
              res.data.birthday[2];
            this.years = res.data.birthday[0];
            this.months = res.data.birthday[1];
            this.days = res.data.birthday[2];
          }

          // 电话
          this.mobileNumber = DataNUmber.standby_telephone;
          // 身份证
          this.IDNumber = DataNUmber.idcard;
          // 职业
          this.Occupation = DataNUmber.occupation;
          // 地址
          this.address = DataNUmber.address;
          // qq
          this.QqNumber = DataNUmber.qq;
          // weixin
          this.WeChat = DataNUmber.weixin;
          // 邮箱
          this.mailbox = DataNUmber.email;
          // 加载
          this.loading = false;
        }
      }).catch((e)=>{
        console.log(e)
      })
    },

    // 确定提交
    submit() {
      let dataListObj = {};
      if (this.textareaText == "") {
        Toast("请填写咨询详情");
        return false;
      } else {
        if (this.regionValueList.length) {
          let content = {
            province: this.regionValueList[0].name,
            city: this.regionValueList[1].name,
            county: this.regionValueList[2].name
          };
          getRegionData(content).then(res => {
            if (res.status == 0) {
              // 地区
              dataListObj.province_id = res.data.province_id;
              dataListObj.city_id = res.data.city_id;
              dataListObj.region_id = res.data.county_id;
            }
          }).catch((e)=>{
            console.log(e)
          })
        } else {
          // 地区
          dataListObj.province_id = "";
          dataListObj.city_id = "";
          dataListObj.region_id = "";
        }
        // 预约
        dataListObj.appointment_id = this.makeID;
        // 顾客
        dataListObj.customer_id = this.customerID;
        // 咨询详情
        dataListObj.describe = this.textareaText;
        // 电话
        dataListObj.standby_telephone = this.mobileNumber;
        // 身份证
        dataListObj.idcard = this.IDNumber;
        // 地址
        dataListObj.address = this.address;
        // 微信
        dataListObj.weixin = this.WeChat;
        // QQ
        dataListObj.qq = this.QqNumber;
        // 邮箱
        dataListObj.email = this.mailbox;
        // 职业
        dataListObj.occupation = this.Occupation;
        // 顾问
        dataListObj.consultation_id = this.adviserKeyID;
        // 生日
        dataListObj.year = this.years;
        dataListObj.month = this.months;
        dataListObj.day = this.days;
        console.log(dataListObj);
        this.subLoding = true;
        getConsultationData(dataListObj).then(res => {
          setTimeout(() => {
            this.subLoding = false;
            if (res.status == 0) {
              Toast({
                message: '提交成功',
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
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  },
  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    // 预约ID
    this.makeID = this.$route.query.id;
    // 顾客ID
    this.customerID = this.$route.query.customer_id;
    // 顾问ID
    this.adviserID = this.$route.query.adviser_id;
    // 数据
    this.DataList();
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
@import "./ConsultationDetails.scss";
</style>