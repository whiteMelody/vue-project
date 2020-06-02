<template>
  <div class="ImprovingData" :style="'min-height: '+minHeight+'px;'" v-loading="loading">
    <header>
      <span>{{form.name}}</span>
      <i>个人资料</i>
    </header>
    <div class="wb70 center">
      <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">
        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="name">
              <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户性别" prop="sexRadio">
              <template v-for="[key, val] in _dictGender">
                <el-radio v-model.trim="form.sexRadio" :label="key">{{val}}</el-radio>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="客户电话" prop="Mobile">
              <el-input
                type="text"
                v-model.trim="form.Mobile"
                placeholder="请输入客户电话号码"
                clearable
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="意向项目">
              <el-select
                v-model="form.projectOne"
                placeholder="请选择意向项目"
                class="wb48 fl"
                readonly
                clearable
              >
                <el-option :key="''" label="全部项目" :value="''"></el-option>
                <el-option
                  v-for="item in $store.getters.projectList1Map"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.projectTow"
                placeholder="选择下级意向项目"
                class="wb48 fr"
                readonly
                clearable
                v-if="form.projectOne"
              >
                <el-option
                  v-for="item in $store.getters.projectList2Map(form.projectOne)"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140" class="row_box">
          <el-col :span="12">
            <el-form-item :label="'所属'+$store.getters.roleName.adviser" prop="counselor">
              <el-select
                v-model="form.counselor"
                :placeholder="'请选择所属'+$store.getters.roleName.adviser"
                readonly
                clearable
                class="wb100"
              >
                <el-option
                  v-for="item in $store.getters.counselorMap"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <em class="stext">{{form.sounselor == '' ? `若不选择系统会自动轮排给下一个${$store.getters.roleName.adviser}` : ''}}</em>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="开发人员" prop="exploit">
              <el-select
                v-model="form.exploit"
                placeholder="请选择开发人员"
                readonly
                clearable
                class="wb100"
                disabled
              >
                <el-option
                  v-for="item in members"
                  :key="item.users_id"
                  :label="item.name"
                  :value="item.users_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <em class="stext">{{form.exploit == '' ? '若不选择该客户将没有开发人员' : ''}}</em> 
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="开发人员">
              <el-input type="text" v-model.trim="form.exploitName" disabled clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="选择渠道">
              <div class="wb49 fl">
                <p class="bd-a1 bd-gray radius1 bg-gray fc-gray2 text-over-hidden1 pal15 par5 h32px">{{form.channelOneText}}</p>
                <!-- <el-select
                  v-model="form.channelOne"
                  placeholder="选择渠道"
                  readonly
                  clearable
                  @change="form.channelTow = ''"
                >
                  <el-option key label="全部渠道" value></el-option>
                  <el-option
                    v-for="item in $store.getters.channelList1Map"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select> -->
              </div>
              <div class="wb49 fr">
                <p class="bd-a1 bd-gray radius1 bg-gray fc-gray2 text-over-hidden1 pal15 par5 h32px">{{form.channelTowText}}</p>
                <!-- <el-select
                  v-model="form.channelTow"
                  placeholder="选择下级项目类别"
                  readonly
                  clearable
                  v-if="form.channelOne"
                >
                  <el-option
                    v-for="item in $store.getters.channelList2Map(form.channelOne)"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select> -->
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户编号">
              <p>{{form.CustomerNumber}}</p>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="备用电话">
              <el-input
                type="text"
                v-model.trim="form.SpareMobile"
                placeholder="请输入备用电话"
                clearable
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职业">
              <el-input type="text" placeholder="请输入职业" v-model.trim="form.Occupation" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="身份证">
              <el-input type="text" placeholder="请输入身份证" v-model.trim="form.ID" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QQ">
              <el-input type="text" placeholder="请输入QQ" v-model.trim="form.QQ" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="微信">
              <el-input type="text" placeholder="请输入微信" v-model.trim="form.WeChat" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日">
              <el-select
                v-model="form.BirthdayOne"
                placeholder="请选择新历/旧历"
                readonly
                clearable
                class="wb48 fl"
              >
                <el-option v-for="[key, val] in _dictStyle" :key="key" :label="val" :value="key"></el-option>
              </el-select>
              <el-date-picker
                class="wb48 fr"
                v-model="form.BirthdayTwo"
                :clearable="false"
                align="right"
                type="date"
                placeholder="请选择年月日"
                :value-format="'yyyy-MM-dd'"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input type="text" placeholder="请输入邮箱" v-model.trim="form.MailBox" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地区">
              <el-select
                v-model="form.province_id"
                placeholder="请选择地区"
                readonly
                clearable
                class="wb33 fl"
                @change="regionsChange('province', form.province_id)"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.city_id"
                placeholder="请选择地区"
                readonly
                clearable
                class="wb33 fl mal1"
                v-if="form.province_id"
                @change="regionsChange('city', form.city_id)"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.region_id"
                placeholder="请选择地区"
                readonly
                clearable
                class="wb33 fr"
                v-if="form.city_id"
              >
                <el-option
                  v-for="item in regionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="140" v-if="IntroducerListAllowed">
            <el-col :span="12">
                <el-form-item label="介绍人" prop="introducerId">
                    <!-- <auto-search-client ref="autoSearch" @selectdFn="mySelectd" @changed="myChanged" :placeholderText="'请输入介绍人'"></auto-search-client> -->
                    <el-input v-model.trim="form.introducerValue" placeholder="请输入介绍人" clearable disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="介绍人电话" prop="introducerMobile">
                    <el-input type="text" v-model.trim="form.introducerMobile" placeholder="请输入介绍人电话" clearable maxlength="11" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="140">
          <el-col :span="12">
            <el-form-item label="详细地址">
              <el-input type="text" placeholder="请输入详细地址" v-model.trim="form.address" clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="客户照片">
              <div v-if="form.headimg" class="filediv  el-cursor" ref="fileData" :style="'background: url(' +  form.headimg  + ') no-repeat center/100%'"   @mouseenter="isText = !isText" @mouseleave="isText = !isText">
                  <input class="el-cursor" type="file" @change="ChoiceImg" :accept="action" value="file1">
                  <div class="text" v-show="isText">点击上传</div>
              </div>
              <div v-else class="filediv el-cursor" ref="file1" :style="'background: url(' + ( form.sexRadio == 1 ? imgUrl.imgBoy : imgUrl.imgGirl) + ') no-repeat center/100%'"   @mouseenter="isText = !isText" @mouseleave="isText = !isText">
                  <input class="el-cursor" type="file" @change="ChoiceImg" :accept="action" value="file1">
                  <div class="text" v-show="isText">点击上传</div>
              </div>
            </el-form-item>
            <div style="display: flex; margin-top:-15px">
              <div style="width:120px;height:1px"></div>
              <div class="f12px lh20px fc-gray3 wb50">
                <p>尺寸：140*140像素</p>
                <p>照片大小不能超过1M</p>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="客户备注">
              <el-input
                type="textarea"
                v-model.trim="form.remark"
                placeholder="请输入客户备注"
                clearable
                rows="8"
                class="lh40px"
                maxlength="3000"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="clear4"></div>

        <div class="btn">
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="handleSubmit">保存修改</el-button>
          </template>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { PUBLIC_PHONE } from "@/shop/utils/Reg";
//地区级联
import { getRegionsList , getProgramList } from "@/shop/assets/api/common/common";
import { getCustomerInfo, gePerfectInfo } from "@/shop/assets/api/task/taskList";

import { getProject, getStoreChannel, membersListByChain } from "@/shop/assets/api/common/common"
import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
  
export default {
  name: "ImprovingData",
  data() {
    return {
      action: window.location.protocol == 'http:' ? 'http://120.76.244.240:1001/post/attachment/document/upload' : 'https://' + window.location.hostname + '/post/attachment/document/upload',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('webToken'),
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      form: {
        // 姓名
        name: "",
        // 性别
        sexRadio: "",
        // 客户电话
        Mobile: "",
        // 意向项目
        projectOne: "",
        projectTow: "",
        // 所属顾问
        counselor: "",
        // 开发人员
        exploit: "",
        exploitName:"",
        // 渠道选择
        channelOne: "",
        channelTow: "",
        channelOneText: "",
        channelTowText: "",
        // 客户编号
        CustomerNumber: "",
        // 备用电话
        SpareMobile: "",
        // 职业
        Occupation: "",
        // 身份证
        ID: "",
        // QQ
        QQ: "",
        // 微信
        WeChat: "",
        // 生日
        BirthdayOne: "0",
        BirthdayTwo: "",
        // 邮箱
        MailBox: "",
        //省 市 区
        province_id: "",
        city_id: "",
        region_id: "",
        // 地址
        address: "",
        // 头像
        headimg:'',
        // 客户备注
        remark: "",
        // 介绍人电话
        introducerMobile:'',
        introducerText:'',
        introducerValue:''
      },
      introducerValue:"",
      imgUrl:{
          imgBoy:require('@/shop/assets/img/boy.png'),
          imgGirl:require('@/shop/assets/img/girl.png')
      },
      isText:false,
      rules: {
        // introducerMobile: [{ required: false, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        sexRadio: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        Mobile: [
          {
            required: true,
            validator: PUBLIC_PHONE,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        channelOne: [
          { required: true, message: "请选择渠道", trigger: "change" }
        ]
      },
      //地区级联
      provinceList: [],
      cityList: [],
      regionList: [],
      minHeight: 0,
      // 客户ID
      customerID: "",
      // 任务ID
      taskID: "",
      loading: true,
      disabled: false,
      members: [],
      IntroducerListAllowed:false,
    };
  },
  components: {autoSearchClient},
  methods: {
    //切换介绍人
    myChanged(data){
      this.introducerValue = data.kw
    },

    //选择介绍人
    mySelectd(data){
      this.form.introducerMobile = data.list.mobile;
      this.form.introducerId = data.list.id;
      this.form.introducerText = data.list.name;
      this.introducerValue = data.kw
    },
    // 选择照片
    ChoiceImg(i){
        var tht=this
        var oFReader = new FileReader();
        var file = i.path[0].files[0];
        oFReader.readAsDataURL(file);
        oFReader.onloadend = (oFRevent) => {
            var src = oFRevent.target.result;
            this.$refs.fileData.style.background='url('+src+') no-repeat center center'
            this.$refs.fileData.style.backgroundSize='100%'
            // this.$refs.fileData.nextSibling.className='filediv'
        }

        tht.ImgText = false;

        let fileObj = file;
        // 接收上传文件的后台地址
        let FileController = tht.action;
        // FormData 对象
        let form = new FormData();
        // 文件对象
        form.append("attach", fileObj);
        let xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('webToken'))
        // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
        xhr.onload = () => {
            let res = JSON.parse(xhr.response)
            console.log(res)
            tht.form.headimg = res.data.attach;
        };
        xhr.send(form);
    },
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.form.introducerText != this.introducerValue){
            this.$message({
              showClose: true,
                message: "请选择正确介绍人",
                type: 'error',
            });
            return;
          }
          this.disabled = true
          let formData = {
            // 姓名
            name: this.form.name,
            // 性别
            sex: this.form.sexRadio,
            // 客户电话
            mobile: this.form.Mobile,
            // 所属顾问
            consultation_id: this.form.counselor,
            // 开发人员
            development: this.form.exploit,
            // 渠道选择
            channel_pid: this.form.channelOne,
            channel_id: this.form.channelTow,
            // 客户编号
            code: this.form.CustomerNumber,
            // 备用电话
            standby_telephone: this.form.SpareMobile,
            // 职业
            occupation: this.form.Occupation,
            // 身份证
            idcard: this.form.ID,
            // QQ
            qq: this.form.QQ,
            // 微信
            weixin: this.form.WeChat,
            // 生日
            calendar: this.form.BirthdayOne,
            birthday: this.form.BirthdayTwo,
            // 邮箱
            email: this.form.MailBox,
            //省 市 区
            province_id: this.form.province_id,
            city_id: this.form.city_id,
            region_id: this.form.region_id,
            // 地址
            address: this.form.address,
            // 客户备注
            complaint: this.form.remark,
            // 任务ID
            task_id: this.taskID,
            // 头像
            headimg:this.form.headimg,
            // 介绍人
            introducerId:this.form.introducerId,
            // 介绍人电话
            introducerMobile:this.form.introducerMobile,
            // 客户ID
            customerId: this.customerID,
          };

          // 已停用
          if(!this.$base.isNull(this.form.projectOne)){
            if(isNaN(this.form.projectOne)){
                //  this.$message({
                //   showClose: true,
                //   message: '该项目已停用,请重新选择',
                //   type: "error"
                // });
            }else{
              formData.item_pid = this.form.projectOne
            }
          }

          if(!this.$base.isNull(this.form.projectTow)){
            if(isNaN(this.form.projectTow)){
                //  this.$message({
                //   showClose: true,
                //   message: '该项目已停用,请重新选择',
                //   type: "error"
                // });
            }else{
              formData.item_id = this.form.projectTow
            }
          }

          // if(!this.$base.isNull(this.form.channelOne)){
          //   if(isNaN(this.form.channelOne)){
          //        this.$message({
          //         showClose: true,
          //         message: '该渠道已停用,请重新选择',
          //         type: "error"
          //       });
          //     this.disabled = false
          //     return;
          //   }
          // }
          //
          // if(!this.$base.isNull(this.form.channelTow)){
          //   if(isNaN(this.form.channelTow)){
          //        this.$message({
          //         showClose: true,
          //         message: '该渠道已停用,请重新选择',
          //         type: "error"
          //       });
          //     this.disabled = false
          //     return;
          //   }
          // }

          gePerfectInfo(formData).then(res => {
            if (res.status == 0) {
              this.$message({
                message: "填写成功!",
                type: "success",
                onClose: () => {
                  this.$router.go(-1);
                  this.disabled = false
                }
              });
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
              this.disabled = false
            }
          }).catch(error=>{
            this.$message({
              showClose: true,
              message: error,
              type: 'error',
            });
            this.disabled = false
          })
        }
      });
    },

    // 省市区
    regionsChange(type, regionsId) {
      getRegionsList({
        regionsId
      }).then(res => {
        if (res.status == 0) {
          if (type == "China") {
            this.provinceList = res.data.list;
          }
          if (type == "province") {
            this.cityList = res.data.list;
          }
          if (type == "city") {
            this.regionList = res.data.list;
          }
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    },

    setCustomer(res){
      // 姓名
      this.form.name = res.data.name;
      // 性别
      this.form.sexRadio = res.data.sex.value + "";
      // 客户电话
      this.form.Mobile = res.data.mobile;
      // 意向项目 (未)
      this.form.projectOne = res.data.item[0].id ? res.data.item[0].id : '';
      this.form.projectTow = res.data.item[1].id ? res.data.item[1].id : '';

      if(res.data.item[0].status == 0){
        this.form.projectOneDisabled = true
        this.form.projectOne = res.data.item[0].name
      }

      if(res.data.item[1].status == 0){
        this.form.projectTwoDisabled = true
        this.form.projectTow = res.data.item[1].name
      }

      // 所属顾问
      this.form.counselor = res.data.adviser.users_id;
      // 备用电话
      this.form.SpareMobile = res.data.standby_telephone;
      // 客户编号
      this.form.CustomerNumber = res.data.code;

      // 开发人员
      this.form.exploit = res.data.development.users_id
              ? res.data.development.users_id
              : "";
      this.form.exploitName = res.data.development.name

      // 渠道选择
      if (res.data.channel) {
        this.form.channelOne = res.data.channel[0].id;
        this.form.channelTow = res.data.channel[1].id;
        this.form.channelOneText = res.data.channel[0].name;
        this.form.channelTowText = res.data.channel[1].name;

        //2019年10月23日15:16:41 陈军

        if(res.data.channel[0].status == 0){
          this.form.channelOneDisabled = true
          this.form.channelOne = res.data.channel[0].name
        }

        if(res.data.channel[1].status == 0){
          this.form.channelTowDisabled = true
          this.form.channelTow = res.data.channel[1].name
        }

      }
      // 职业
      this.form.Occupation = res.data.occupation;
      // 身份证
      this.form.ID = res.data.idcard;
      // QQ
      this.form.QQ = res.data.qq;
      // 微信
      this.form.WeChat = res.data.weixin;
      // 生日
      this.form.BirthdayOne = res.data.calendar + "";
      this.form.BirthdayTwo = res.data.birthday;
      // 邮箱
      this.form.MailBox = res.data.email;

      //省 市 区
      if (res.data.district.length) {
        this.form.province_id = res.data.district[0].id;

        this.regionsChange('province',  res.data.district[0].id)
        this.form.city_id = res.data.district[1].id;
        this.regionsChange('city',  res.data.district[1].id)
        this.form.region_id = res.data.district[2].id;
      }
      // 地址
      this.form.address = res.data.address;
      this.form.headimg = res.data.headimg;
      // 客户备注
      this.form.remark = res.data.complaint;
      if (res.data.introducer) {
        this.form.introducerMobile = res.data.introducer.mobile
        this.form.introducerId = res.data.introducer_id
        this.introducerValue = res.data.introducer.name
        this.form.introducerValue = res.data.introducer.name
        // this.$refs.autoSearch.setInitValue(res.data.introducer.name)
      }

      this.loading = false;
    },

    // 客户资料信息
    customerDataInfo() {
      getCustomerInfo({ customerId: this.customerID }).then(res => {
        if (res.status == 0) {
          this.setCustomer(res)
        }else{
          getCustomerInfo({ customerId: this.customerID, crossStore: 1 }).then(res => {
            if(res.status == 0){
              this.setCustomer(res)
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
            }
          }).catch(error=>{
            this.$message({
              showClose: true,
              message: error,
              type: 'error',
            });
          })
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.customerID = this.$route.query.customerId;
    this.taskID = this.$route.query.taskId;
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {


    membersListByChain().then(res=>{
      this.members = res.data
    })

    this.minHeight = window.innerHeight - 144;

    getProgramList().then(res => {
        if (res.status == 0) {
            if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
        }
    }).catch(error=>{
        console.log("getProgramList no");
    })

    //获取地区
    this.regionsChange("China", 1);
    this.customerDataInfo();

       // 项目
    getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
        if(res.status == 0){
        let _tmp = res.data.list
        let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
        this.$store.commit('SET_PROJECTLIST1', res.data.list)

        for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
            _tmp2[i].children = []
        }

        getProject({ start: 1, perpage: 9999,status:-1}).then(res2 => {
            if(res2.status == 0){
            let __tmp = res2.data.list
            for(let i=0; i<__tmp.length; i++){
                for(let j=0; j<_tmp.length; j++){
                if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                    if(__tmp[i].status.value == 1){
                    _tmp2[j].children.push(__tmp[i])
                    }
                }
                }
            }
            // 2019-11-15 15点15分 陈军修改
            this.$store.commit('SET_PROJECTALLLIST', _tmp)
            this.$store.commit('SET_PROJECTLIST', _tmp2)
            }
        })

        }else{
        this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
        }
    }).catch(error=>{
        this.$message({
        showClose: true,
        message: error,
        type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
    })

    //渠道
    getStoreChannel({channelParentId: 0}).then(res => {
      if(res.status == 0){
        let _tmp = res.data.list
        this.$store.commit('SET_CHANNELLIST1', res.data.list)
        for(let i=0; i<_tmp.length; i++){
          _tmp[i].children = []
        }
        getStoreChannel({channelParentId: -1}).then(res2 => {
          if(res2.status == 0){
            let __tmp = res2.data.list
            for(let i=0; i<__tmp.length; i++){
              for(let j=0; j<_tmp.length; j++){
                if(__tmp[i].p_id == _tmp[j].id){
                  _tmp[j].children.push(__tmp[i])
                }
              }
            }
            this.$store.commit('SET_CHANNELLIST', _tmp)
          }
        })
      }else{
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error',
        });
        this.$store.commit('SET_CHANNELLIST', [])
        this.$store.commit('SET_CHANNELLIST1', [])
      }
    }).catch(error=>{
      this.$message({
        showClose: true,
        message: error,
        type: 'error',
      });
      this.$store.commit('SET_CHANNELLIST', [])
      this.$store.commit('SET_CHANNELLIST1', [])
    })

  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {
    form: {
      deep: true,
      handler: function() {
        // this.condition.channelId = this.form.channelTow || this.form.channelOne;
      }
    }
  }
};
</script>
<style>
    .filediv{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
        position: relative;
    }
    .filediv input{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        z-index: 999;
    }
    .filediv .text {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100px;
        background:rgba(0,0,0,0.4);
        color: #FFFFFF;
        font-size:14px;
    }
</style>
<style lang="scss" scoped>
.ImprovingData {
  margin: 20px;
  padding: 0 20px;
  background: #fff;
  header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 0.16rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 87, 34, 1);
    i {
      font-style: normal;
      color: #666666;
      margin-left: 0.05rem;
    }
  }
  .center {
    margin: 0.4rem auto 0;
    width: 80%;
    .el-row {
      margin-bottom: 0.3rem;
      .stext {
        padding-left: 120px;
        font-style: normal;
        font-size: 12px;
        color: #fd8137;
        position: relative;
        top: -20px;
      }
    }
    .row_box {
      margin-bottom: 0.1rem;
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style>
.AddClient textarea {
  resize: none !important;
}
</style>



    
