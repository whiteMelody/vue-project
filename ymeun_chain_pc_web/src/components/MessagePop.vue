<template>
  <div class="MessagePop">
    <!-- 只有确认按钮的弹窗 -->

    <div
      class="pop_bg"
      v-if="popBgState == true && popData.popBgText == 'bandConfirm'"
      @click="popBgStateHideFn"
    >
      <div class="band_confirm">
        <header>
          <span>提示</span>
          <i class="iconfont iconguanbi1"></i>
        </header>
        <div class="success" v-if="popData.popTowText == 'success'">
          <i class="iconfont iconchenggong"></i>
          <p>{{popData.popText}}</p>
        </div>
        <div class="error" v-else-if="popData.popTowText == 'error'">
          <i class="iconfont iconshibai1"></i>
          <p>{{popData.popText}}</p>
        </div>
        <div class="warning" v-else-if="popData.popTowText == 'warning'">
          <i class="iconfont iconjinggao1"></i>
          <p>{{popData.popText}}</p>
        </div>
        <a class="btns">
          <span>确定</span>
        </a>
      </div>
    </div>

    <!-- 人员调动弹窗 -->
    <div class="pop_bg" v-if="popBgState == true && popData.popBgText == 'personnel'">
      <div class="personnel">
        <header>
          <span>提示</span>
          <i class="iconfont iconguanbi1" @click="popBgStateHideFn"></i>
        </header>
        <ul class="personnel_ul">
          <li class="personnel_li">
            <span>门店</span>
            <p>
              <Select v-model="personnel.shopListId" @on-change="shopListFn">
                <Option
                  v-for="(item,index) in personnel.shopList"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</Option>
              </Select>
            </p>
          </li>
          <li class="personnel_li" v-if="personnel.shopListId != ''">
            <span>岗位</span>
            <p>
              <Select v-model="personnel.operatingPostListId">
                <Option
                  v-for="(item,index) in personnel.operatingPostList"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</Option>
              </Select>
            </p>
          </li>
          <li class="personnel_li" v-if="personnel.shopListId != ''">
            <span>交接员工</span>
            <p>
              <Select v-model="personnel.staffListId">
                <Option
                  v-for="(item,index) in personnel.staffList"
                  :key="index"
                  :value="item.users_id"
                >{{item.name}}</Option>
              </Select>
            </p>
          </li>
        </ul>
        <div class="err">
          <span></span>
          <p>{{personnel.err}}</p>
        </div>
        <div class="btns">
          <span v-if="btnsOn" @click="personnelPostFn">提交</span>
          <span v-else>正在提交请稍后</span>
          <a @click="popBgStateHideFn">取消</a>
        </div>
      </div>
    </div>

    <!-- 修改资料 -->
    <div class="pop_bg" v-if="popBgState == true && popData.popBgText == 'modifiedData'">
      <div class="personnel">
        <header>
          <span>修改资料</span>
          <i class="iconfont iconguanbi1" @click="popBgStateHideFn"></i>
        </header>
        <ul class="personnel_ul">
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>姓名</a>
            </span>
            <p>
              <Input v-model="modifiedData.name" placeholder="请输入姓名"/>
            </p>
          </li>
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>电话</a>
            </span>
            <p>
              <Input v-model="modifiedData.mobile" placeholder="请输入正确的电话号码" :maxlength="telNumber"/>
            </p>
          </li>
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>岗位</a>
            </span>
            <p>
              <Input v-model="modifiedData.post" placeholder="请输入工作岗位"/>
            </p>
          </li>
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>账号</a>
            </span>
            <p>
              <Input v-model="modifiedData.username" placeholder="请输入账号"/>
            </p>
          </li>
        </ul>
        <div class="btns">
          <span v-if="btnsOn" @click="editDataUrlfn">提交查询内容</span>
          <span v-else>正在提交请稍后</span>
          <a @click="popBgStateHideFn">取消</a>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <div class="pop_bg" v-if="popBgState == true && popData.popBgText == 'changePassword'">
      <div class="personnel">
        <header>
          <span>修改密码</span>
          <i class="iconfont iconguanbi1" @click="popBgStateHideFn"></i>
        </header>
        <ul class="personnel_ul">
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>新密码</a>
            </span>
            <p>
              <Input
                type="password"
                v-model="changePassword.password"
                autocomplete="new-password"
                placeholder="请输入新密码"
                clearable
              />
            </p>
          </li>
          <li class="personnel_li">
            <span>
              <b>*</b>
              <a>确认密码</a>
            </span>
            <p>
              <Input
                type="password"
                v-model="changePassword.password_confirmation"
                autocomplete="new-password"
                placeholder="请确认新密码"
                clearable
              />
            </p>
          </li>
        </ul>
        <div class="btns">
          <span v-if="btnsOn" @click="editPasswordFn">提交查询内容</span>
          <span v-else>正在提交请稍后</span>
          <a @click="popBgStateHideFn">取消</a>
        </div>
      </div>
    </div>

    <!-- 权限设置 -->
    <div class="pop_bg" v-if="popBgState == true && popData.popBgText == 'permissionSetting'">
      <div class="permission_set">
        <header>
          <span>修改密码</span>
          <i class="iconfont iconguanbi1" @click="popBgStateHideFn"></i>
        </header>
        <ul>
          <li v-for="(item,index) in  permissionSetting.data" :key="index">
            <a>{{item.name}}</a>
            <p>
              <span
                v-for="(itemName,itemIndex) in item.rows"
                :key="itemIndex"
                @click="chageJurisdiction(index,itemIndex)"
              >
                <i v-if="itemName.check == 2" class="iconfont iconweixuanzhong"></i>
                <i v-else-if="itemName.check == 1" class="iconfont iconxuanzhong"></i>
                <b>{{itemName.name}}</b>
              </span>
            </p>
          </li>
        </ul>
        <div class="check_all">
          <p>
            <a></a>
            <span @click="checkAllFn">
              <i v-if="permissionSetting.checkAll == 2" class="iconfont iconweixuanzhong"></i>
              <i v-else-if="permissionSetting.checkAll == 1" class="iconfont iconxuanzhong"></i>
              <b>权限全选</b>
            </span>
          </p>
        </div>
        <div class="btns">
          <span v-if="btnsOn" @click="editJurisdictionFn">确认修改</span>
          <span v-else>正在提交请稍后</span>
          <a @click="popBgStateHideFn">取消</a>
        </div>
      </div>
    </div>

    <!-- 预约项目 -->
    <div class="pop_bg" v-if="popBgState == true && popData.popBgText == 'makeAnAppointment'">
      <div class="personnel">
        <header>
          <span>预约项目</span>
          <i class="iconfont iconguanbi1" @click="popBgStateHideFn"></i>
        </header>
        <div class="user">
          <h3>
            <a>{{makeAnAppointment.userData.name}}</a>
            <span>{{makeAnAppointment.userData.mobile}}</span>
          </h3>
          <p>
            <span>所属店铺：{{makeAnAppointment.userData.storeName}}</span>
            <span>渠道：{{makeAnAppointment.userData.channelName}}</span>
          </p>
        </div>
        <div class="user_option">
          <ul class="user_option_ul">
            <li class="user_option_li">
              <p>
                <span>
                  <i>*</i>意向项目
                </span>
                <Select
                  placeholder="请选择意向项目"
                  v-model="makeAnAppointment.bigProjectId"
                  @on-change="bigProjectChageFn"
                >
                  <Option
                    v-for="(item , index) in  makeAnAppointment.bigProjectList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
                </Select>
                <Select
                  placeholder="请选择意向项目"
                  v-model="makeAnAppointment.smallProjectId"
                  v-if="makeAnAppointment.smallProjectShow"
                >
                  <Option
                    v-for="(item , index) in  makeAnAppointment.smallProjectList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</Option>
                </Select>
              </p>
            </li>
            <li class="user_option_li">
              <p>
                <span>
                  <i>*</i>顾问
                </span>
                <Select placeholder="请选择顾问" v-model="makeAnAppointment.counselorId">
                  <Option
                    v-for="(item , index) in makeAnAppointment.counselorList"
                    :key="index"
                    :value="item.users_id"
                  >{{item.name}}</Option>
                </Select>
              </p>
              <div class="user_option_div">
                <span>
                  <i>*</i>到店时间
                </span>
                <DatePicker
                  type="date"
                  @on-change="handleChange"
                  show-week-numbers
                  placeholder="请选择到店时间"
                ></DatePicker>
              </div>
            </li>
            <li class="user_option_li">
              <p class="p_textarea">
                <span>备注</span>
                <textarea placeholder="请输入备注..." v-model="makeAnAppointment.content"></textarea>
              </p>
            </li>
          </ul>
        </div>
        <div class="btns">
          <span v-if="btnsOn" @click="postAddAppointmentFn">提交预约</span>
          <span v-else>正在提交请稍后</span>
          <a @click="popBgStateHideFn">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "MessagePop",
  data() {
    return {
      telNumber: 11,
      popBgState: true,
      cityListText: "",
      btnsOn: true,
      shopId: "",
      personnel: {
        shopList: "",
        shopListId: "",
        operatingPostList: "",
        operatingPostListId: "",
        staffList: "",
        staffListId: "",
        userId: "",
        err: ""
      },
      modifiedData: {
        name: "",
        mobile: "",
        post: "",
        username: "",
        id: ""
      },
      changePassword: {
        password: "",
        password_confirmation: ""
      },
      permissionSetting: {
        data: "",
        checkAll: 2
      },
      makeAnAppointment: {
        userData: "",
        userId: "",
        bigProjectList: "",
        bigProjectId: -1,
        smallProjectList: "",
        smallProjectId: "",
        smallProjectShow: false,
        counselorList: "",
        counselorId: 0,
        timer: "",
        content: ""
      }
    };
  },
  components: {},

  props: ["popData"],
  methods: {
    popBgStateHideFn() {
      this.popBgState = false;
      if (
        this.popData.popBgText == "bandConfirm" &&
        this.popData.popTowText == "success"
      ) {
        this.$emit("MessagePop");
      }
      (this.personnel = {
        shopList: "",
        shopListId: "",
        operatingPostList: "",
        operatingPostListId: "",
        staffList: "",
        staffListId: "",
        userId: "",
        err: ""
      }),
        (this.modifiedData = {
          name: "",
          mobile: "",
          post: "",
          username: "",
          id: ""
        }),
        (this.changePassword = {
          password: "",
          password_confirmation: ""
        }),
        (this.permissionSetting = {
          data: "",
          checkAll: 2
        }),
        (this.makeAnAppointment = {
          userData: "",
          bigProjectList: "",
          bigProjectId: -1,
          smallProjectList: "",
          smallProjectId: "",
          smallProjectShow: false,
          counselorList: "",
          counselorId: 0,
          content: "",
          timer: ""
        });
    },

    // 弹窗类型
    popBgStateShowFn(data) {
      const that = this;
      that.popBgState = true;
      switch (data.popBgText) {
        case "personnel":
          that.personnel.userId = data.id;
          that
            .$postRequest(data.personnelgetDataUrl, {
              e_id: data.e_id
            })
            .then(res => {
              that.personnel.shopList = res.data;
            });
          break;
        case "modifiedData":
          that
            .$postRequest(data.getEditDataUrl, {
              id: data.id
            })
            .then(res => {
              that.modifiedData = res.data;
            });
          break;

        case "permissionSetting":
          that
            .$postRequest(data.getEditJurisdictionUrl, {
              id: data.id
            })
            .then(res => {
              that.permissionSetting.data = res.data.rows;
              that.permissionSetting.checkAll = res.data.check;
            });
          break;

        case "makeAnAppointment":
          //客户信息
          that
            .$postRequest("/post/api/customers/information", {
              id: data.id
            })
            .then(res => {
              that.makeAnAppointment.userData = res.data;
            });

          //顾问
          that
            .$postRequest("/post/api/store/getStoreMembers", {
              s_id: data.s_id,
              role_id: 3
            })
            .then(res => {
              that.makeAnAppointment.counselorList = res.data;
            });

          //意向项目
          that.projectFn(data.s_id, 1);
          that.shopId = data.s_id;
          that.makeAnAppointment.userId = data.id;
          break;

        default:
          break;
      }
    },

    //人事调动岗位交接员工获取
    shopListFn() {
      const that = this;
      that
        .$postRequest("/post/api/members/transferInterface", {
          s_id: that.personnel.shopListId,
          id: that.personnel.userId
        })
        .then(res => {
          that.personnel.operatingPostListId = "";
          that.personnel.staffListId = "";
          that.personnel.operatingPostList = res.data.roleName;
          if (res.data.membersData[0] == "此岗位没有员工可以交接") {
            that.personnel.err = "*" + res.data.membersData[0];
          } else {
            that.personnel.staffList = res.data.membersData;
            that.personnel.err = "";
          }
        });
    },

    // 修改资料提交
    editDataUrlfn() {
      const that = this;
      that.btnsOn = false;
      let api = that.popData.editDataUrl;
      that
        .$postRequest(api, that.modifiedData)
        .then(res => {
          if (res.status == 0) {
            that.$Message.success({
              content: res.msg,
              onClose: function() {
                that.$emit("message");
                that.popBgStateHideFn();
                that.btnsOn = true;
              }
            });
          } else {
            that.btnsOn = true;
            that.$Message.error(res.msg);
          }
        })
        .catch(err => {
          setTimeout(function() {
            that.btnsOn = true;
          }, 500);
        });
    },

    // 修改密码提交
    editPasswordFn() {
      const that = this;
      that.btnsOn = false;
      let api = that.popData.editPasswordUrl;
      let passWord = {
        password: that.changePassword.password,
        password_confirmation: that.changePassword.password_confirmation,
        id: that.popData.id
      };
      that
        .$postRequest(api, passWord)
        .then(res => {
          if (res.status == 0) {
            if (that.popData.types == "index") {
              that.$emit("message");
            } else {
              that.$Message.success({
                content: res.msg,
                onClose: function() {
                  that.popBgStateHideFn();
                  that.btnsOn = true;
                }
              });
            }
          } else {
            that.btnsOn = true;
            that.$Message.error(res.msg);
          }
        })
        .catch(err => {
          setTimeout(function() {
            that.btnsOn = true;
          }, 500);
        });
    },

    //全选
    checkAllFn() {
      const that = this;
      if (that.permissionSetting.checkAll == 2) {
        that.permissionSetting.checkAll = 1;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          for (let index = 0; index < element.rows.length; index++) {
            const childElement = element.rows[index];
            childElement.check = 1;
          }
        }
      } else {
        that.permissionSetting.checkAll = 2;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          for (let index = 0; index < element.rows.length; index++) {
            const childElement = element.rows[index];
            childElement.check = 2;
          }
        }
      }
    },

    //切换权限
    chageJurisdiction(parentIndex, childIndex) {
      const that = this;
      let thisDataCheck =
        that.permissionSetting.data[parentIndex].rows[childIndex].check;
      if (thisDataCheck == 1) {
        that.permissionSetting.checkAll = 2;
        that.permissionSetting.data[parentIndex].rows[childIndex].check = 2;
      } else if (thisDataCheck == 2) {
        that.permissionSetting.data[parentIndex].rows[childIndex].check = 1;
        let childNum = 0,
          childCheck = 0;
        for (let i = 0; i < that.permissionSetting.data.length; i++) {
          const element = that.permissionSetting.data[i];
          childNum += element.rows.length;
          for (let index = 0; index < element.rows.length; index++) {
            const childElement = element.rows[index];
            if (childElement.check == 1) {
              childCheck++;
            }
          }
        }
        if (childCheck >= childNum) {
          that.permissionSetting.checkAll = 1;
        }
      }
    },

    //权限修改
    editJurisdictionFn() {
      const that = this;
      that.btnsOn = false;
      let api = that.popData.editJurisdictionUrl;
      let postData = that.permissionSetting.data,
        postDataStr = {};
      for (let i = 0; i < that.permissionSetting.data.length; i++) {
        let element = that.permissionSetting.data[i];
        postDataStr[element.key] = {};
      }

      for (let i = 0; i < postData.length; i++) {
        let element = postData[i];
        for (let index = 0; index < element.rows.length; index++) {
          const childElement = element.rows[index];
          if (childElement.check == 1) {
            postDataStr[element.key][childElement.id] = childElement.id;
          }
        }
      }

      let passWord = {
        data: postDataStr,
        id: that.popData.id
      };
      that
        .$postRequest(api, passWord)
        .then(res => {
          if (res.status == 0) {
            that.$Message.success({
              content: res.msg,
              onClose: function() {
                that.popBgStateHideFn();
                that.btnsOn = true;
              }
            });
          } else {
            that.btnsOn = true;
            that.$Message.error(res.msg);
          }
        })
        .catch(err => {
          setTimeout(function() {
            that.btnsOn = true;
          }, 500);
        });
    },

    //人事调动提交
    personnelPostFn() {
      const that = this;
      that.btnsOn = false;
      that
        .$postRequest("/post/api/members/transfer", {
          old_id: that.personnel.userId,
          new_id: that.personnel.staffListId,
          role_id: that.personnel.operatingPostListId,
          s_id: that.personnel.shopListId
        })
        .then(res => {
          if (res.status == 0) {
            that.$Message.success({
              content: res.msg,
              onClose: function() {
                that.popBgStateHideFn();
                that.btnsOn = true;
              }
            });
          } else {
            that.btnsOn = true;
            that.$Message.error(res.msg);
          }
        });
    },

    //意向项目
    projectFn(sId, types, pId) {
      const that = this;
      that
        .$postRequest("/post/api/store/getStoreItem", {
          s_id: sId,
          getItem: types,
          p_id: pId
        })
        .then(res => {
          if (types == 2) {
            that.makeAnAppointment.smallProjectList = res.data;
          } else {
            that.makeAnAppointment.bigProjectList = res.data;
          }
        });
    },

    //大类项目选择
    bigProjectChageFn() {
      const that = this;
      if (that.makeAnAppointment.bigProjectId == -1) {
        that.makeAnAppointment.smallProjectShow = false;
      } else {
        that.makeAnAppointment.smallProjectShow = true;
        that.projectFn(that.shopId, 2, that.makeAnAppointment.bigProjectId);
      }
    },

    //预约时间选择
    handleChange(date) {
      this.makeAnAppointment.timer = date;
    },
    //顾客预约提交
    postAddAppointmentFn() {
      const that = this;
      that.btnsOn = false;
      that
        .$postRequest("/post/api/appointment/postAddAppointment", {
          s_id: that.shopId,
          adviser_id: that.makeAnAppointment.counselorId,
          item_id: that.makeAnAppointment.smallProjectId,
          item_pid: that.makeAnAppointment.bigProjectId,
          appointment_time: that.makeAnAppointment.timer,
          customer_id: that.makeAnAppointment.userId,
          content: that.makeAnAppointment.content
        })
        .then(res => {
          if (res.status == 0) {
            that.$Message.success({
              content: "预约成功",
              onClose: function() {
                that.$emit("MessagePop");
                that.popBgStateHideFn();
                that.btnsOn = true;
              }
            });
          } else {
            that.btnsOn = true;
            that.$Message.error(res.msg);
          }
        });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

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
.MessagePop {
  .pop_bg {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    header {
      display: flex;
      background: #f2f2f2;
      align-items: center;
      padding: 0 0.2rem;
      height: 0.42rem;
      span {
        flex: 1;
        font-size: 0.16rem;
      }
      i {
        font-size: 0.12rem;
        font-weight: bold;
        color: #000;
        cursor: pointer;
      }
    }
    .band_confirm {
      background: #fff;
      min-width: 2.6rem;
      border-radius: 2px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.24rem 0.2rem 0;
        i {
          font-size: 0.22rem;
          font-weight: bold;
        }
        p {
          padding-left: 0.1rem;
          font-size: 0.16rem;
          color: #333333;
        }
        &.success {
          i {
            color: #009688;
          }
        }
        &.error {
          i {
            color: #ec414d;
            font-weight: normal;
          }
        }
        &.warning {
          i {
            color: #0368cd;
          }
        }
      }
      .btns {
        padding: 0.3rem 0.3rem 0.14rem;
        display: flex;
        justify-content: flex-end;
        color: #fff;
        span {
          width: 0.6rem;
          height: 0.3rem;
          line-height: 0.3rem;
          text-align: center;
          background: #009688;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
    .personnel {
      background: #fff;
      width: 8.3rem;
      border-radius: 2px;
      .personnel_ul {
        padding: 0.1rem 0.9rem 0 0.5rem;
        .personnel_li {
          display: flex;
          align-items: center;
          margin-top: 0.4rem;
          span {
            width: 0.8rem;
            text-align: right;
            margin-right: 0.5rem;
            font-size: 0.18rem;
            color: #666666;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            b {
              font-weight: normal;
              color: #ec414d;
              font-size: 0.18rem;
            }
            a {
              color: #666666;
              font-size: 0.16rem;
            }
          }
          p {
            flex: 1;
          }
        }
      }
      .user {
        margin: 0 0.4rem;
        padding: 0.2rem 0;
        border-bottom: 1px solid #e5e5e5;
        h3 {
          font-weight: normal;
          display: flex;
          align-items: flex-end;
          a {
            color: #009688;
            font-size: 0.2rem;
          }
          span {
            color: #333333;
            font-size: 0.16rem;
            padding-left: 0.2rem;
          }
        }
        p {
          padding-top: 0.1rem;
          span {
            color: #666666;
            font-size: 0.16rem;
            padding-right: 0.4rem;
          }
        }
      }
      .user_option {
        padding: 0 0.4rem;
        .user_option_ul {
          .user_option_li {
            display: flex;
            align-items: center;
            padding-top: 0.4rem;
            p {
              display: flex;
              align-items: center;
              flex: 1;
              span {
                color: #666666;
                font-size: 0.18rem;
                width: 1.1rem;
                padding-right: 0.2rem;
                text-align: right;
                i {
                  color: #ec414d;
                }
              }
              .ivu-select {
                width: 2.5rem;
                margin-right: 0.2rem;
              }
              textarea {
                flex: 1;
                resize: none;
                border: 1px solid #dcdee2;
                border-radius: 4px;
                padding: 0.1rem;
                height: 1rem;
              }

              &.p_textarea {
                align-items: flex-start;
                span {
                  position: relative;
                  top: 0.05rem;
                }
              }
            }
            .user_option_div {
              display: flex;
              align-items: center;
              span {
                color: #666666;
                font-size: 0.18rem;
                width: 1.1rem;
                padding-right: 0.2rem;
                text-align: right;
                i {
                  color: #ec414d;
                }
              }
              .ivu-date-picker {
                width: 2.5rem;
              }
            }
          }
        }
      }
      .err {
        padding: 0.1rem 0.9rem 0 0.5rem;
        display: flex;
        span {
          width: 0.8rem;
          margin-right: 0.5rem;
        }
        p {
          font-size: 0.16rem;
          color: #ec414d;
        }
      }
      .btns {
        padding: 0.35rem 0.9rem 0.5rem;
        display: flex;
        justify-content: flex-end;
        color: #fff;
        span {
          width: 1.36rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #009688;
          border-radius: 2px;
          cursor: pointer;
        }
        a {
          width: 1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #c0c0c0;
          border-radius: 2px;
          cursor: pointer;
          color: #fff;
          margin-left: 0.2rem;
        }
      }
    }

    .permission_set {
      background: #fff;
      width: 8.3rem;
      border-radius: 2px;
      ul {
        padding: 0.1rem 1.05rem 0;
        li {
          display: flex;
          align-items: flex-start;
          padding-top: 0.3rem;
          a {
            color: #333333;
            font-size: 0.18rem;
            width: 1.2rem;
          }
          p {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex: 1;
            span {
              display: flex;
              width: 1.2rem;
              cursor: pointer;
              i {
                font-size: 0.16rem;
                &.iconweixuanzhong {
                  color: #999999;
                }
                &.iconxuanzhong {
                  color: #009688;
                }
              }
              b {
                padding-left: 0.15rem;
                font-size: 0.16rem;
                color: #666666;
              }
            }
          }
        }
      }
      .check_all {
        padding: 0.3rem 1.05rem 0;
        p {
          border-top: 1px solid #e5e5e5;
          padding-top: 0.3rem;
          display: flex;
          align-items: center;
          a {
            width: 1.2rem;
          }
          span {
            display: flex;
            align-items: center;
            cursor: pointer;
            i {
              font-size: 0.16rem;
              &.iconweixuanzhong {
                color: #999999;
              }
              &.iconxuanzhong {
                color: #009688;
              }
            }
            b {
              padding-left: 0.15rem;
              font-size: 0.16rem;
              color: #666666;
            }
          }
        }
      }
      .btns {
        padding: 0.9rem 0 0.4rem;
        display: flex;
        justify-content: center;
        color: #fff;
        span {
          width: 1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #009688;
          border-radius: 2px;
          cursor: pointer;
        }
        a {
          width: 1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          background: #c0c0c0;
          border-radius: 2px;
          cursor: pointer;
          color: #fff;
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>



    
<style>
</style>
