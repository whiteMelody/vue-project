<template>
    <div class="FillInAdvisory" :style="'min-height: '+boxMaxHeight+'px;'">
        <div class="box_message">
            <div class="message">
                <div class="message_box">
                    <div class="user_message">
                        <div class="titles">
                            <p>基本信息</p>
                        </div>
                        <div class="text">
                            <p class="pointer" @click="$router.push({name:'ClientDel',query:{id:userInfo.id,types:1}})">姓名：{{userInfo.name}}</p>
                            <p>电话：{{userInfo.mobile}}</p>
                            <p>性别：{{userInfo.sexValue + '' | _filterGender }}</p>
                            <p>年龄：{{ userInfo.birthday ? this.$base.jsGetAge(userInfo.birthday) : '' }}</p>
                        </div>
                    </div>
                    <div class="add_message_box">
                        <el-form  ref="form" :model="form" :rules="rules" class="add-form" label-width="80px">
                            <div class="advisory_del">
                                <h3><i>*</i>咨询详情</h3>
                                <el-form-item label="" prop="describe" label-width="0">
                                    <el-input type="textarea" placeholder="请填写客户的咨询详情..." v-model="form.describe"  clearable rows="8" class="advisory_del_textarea"></el-input>
                                </el-form-item>
                            </div>
                            <!-- <el-form-item label="" prop="describe" label-width="20px">
                                <el-input type="textarea" placeholder="请填写客户的咨询详情..." v-model="form.describe"  clearable rows="8" class="lh40px"></el-input>
                            </el-form-item> -->

                            <div class="add_message">
                                <h3>补充客户详情</h3>
                                <div class="add_message_input">
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="12">
                                            <el-form-item label="备用电话" prop="standby_telephone">
                                                <el-input type="text" v-model.trim="form.standby_telephone" placeholder="请输入备用电话" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item :label="'所属'+$store.getters.roleName.adviser" prop="adviser">

                                                <el-input type="text" v-model.trim="adviser" disabled clearable></el-input>
    <!--                                            <el-select v-model="form.adviser_id" :placeholder="'请选择'+$store.getters.roleName.adviser" readonly="" clearable class="wb100">-->
    <!--                                                <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"-->
    <!--                                                           :value="item.key"></el-option>-->
    <!--                                            </el-select>-->
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="12">
                                            <el-form-item label="身份证" prop="idcard">
                                                <el-input type="text" v-model.trim="form.idcard" placeholder="请输入身份证" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="职业" prop="occupation">
                                                <el-input type="text" v-model.trim="form.occupation" placeholder="请输入职业" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="12">
                                            <el-form-item label="微信" prop="weixin">
                                                <el-input type="text" v-model.trim="form.weixin" placeholder="请输入微信" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="QQ" prop="qq">
                                                <el-input type="text" v-model.trim="form.qq" placeholder="请输入QQ" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="12">
                                            <el-form-item label="邮箱" prop="email">
                                                <el-input type="text" v-model.trim="form.email" placeholder="请输入邮箱" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="生日">
                                                <el-select
                                                        v-model="form.calendar"
                                                        placeholder="请选择新历/旧历"
                                                        readonly
                                                        clearable
                                                        class="wb33 fl"
                                                >
                                                    <el-option v-for="[key, val] in _dictStyle" :key="key" :label="val" :value="key"></el-option>
                                                </el-select>
                                                <el-date-picker
                                                        class="wb65 fr"
                                                        v-model="birthday"
                                                        :clearable="false"
                                                        align="right"
                                                        type="date"
                                                        placeholder="请选择年月日"
                                                        @change="birthdayChange"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="12">
                                            <el-form-item label="地区">
                                                <el-select v-model="form.province_id" placeholder="请选择地区" readonly="" clearable class="wb33 fl" @change="regionsChange('province', form.province_id)">
                                                    <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                                <el-select v-model="form.city_id" placeholder="请选择地区" readonly="" clearable class="wb33 fl" v-if="form.province_id" @change="regionsChange('city', form.city_id)">
                                                    <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                                <el-select v-model="form.region_id" placeholder="请选择地区" readonly="" clearable class="wb33 fl" v-if="form.city_id">
                                                    <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="详细地址" prop="address">
                                                <el-input type="text" v-model.trim="form.address" placeholder="请输入详细地址" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <div class="clear4"></div>
                                    <el-row :gutter="40" class="row_box">
                                        <el-col :span="24">
                                            <template v-if="disabled">
                                                <el-button type="primary" class="fr" disabled>提交中...</el-button>
                                            </template>
                                            <template v-else>
                                                <el-button type="primary" class="fr w100px" @click="submit">确定</el-button>
                                            </template>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list_box">
                    <h3>历史咨询</h3>
                    <base-list ref="demoTable" :condition="condition"
                                :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
                        <el-table slot="list" :data="demoList" border stripe>
                            <el-table-column prop="created_at" align="center" label="时间">
                            <template slot-scope="scope">
                                {{scope.row.created_at | _endTimeFormat}}
                            </template>
                            </el-table-column>

                            <el-table-column prop="describe_one" align="center" label="详情">
                            <template slot-scope="scope">
                                {{ scope.row.describe_one }}
                            </template>
                            </el-table-column>

                        </el-table>
                    </base-list>
                </div>
            </div>
        </div>
        <div class="question_list" v-if="listTotal > 0" v-loading="listLading">
            <div class="question_list_header">
                <p>已回答的问题</p>
                <span>共计 <i>{{listTotal}}</i> 条</span>
            </div>
            <ul>
                <li v-for="(item , index) in userList" :key="index">
                <h4>{{item.problem}}</h4>
                <div class="text">
                    <el-tooltip :content="item.content" placement="bottom-start" effect="light"> 
                    <p>{{item.content}}</p>
                    </el-tooltip>  
                </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import {getConsultationExhibitionAdd, getConsultationExhibitionEdit, getHistoryZixunByCustomerId, postConsultationAdd, postConsultationEdit} from  "@/shop/assets/api/flow/advisory"
import {getRegionsList} from  "@/shop/assets/api/common/common"
import { seeLabelCustomerInfoByCustomerId } from "@/shop/assets/api/client/privateArchives";

  import {
      PUBLIC_LIMIT,
      PUBLIC_NOT_CHINESE,
      PUBLIC_TEL,
      REG_ALL_NUMBER,
      REG_CHINESE,
      REG_LIMIT,
      REG_NUMBER,
      REG_TEXT
  } from "@/shop/utils/Reg";
  import {
      creditCodeLength,
      creditCodeMinLength,
      maxLength,
      normalLength,
      sortLength,
      telLength
  } from "@/shop/utils/rules";

export default {
  name: "FillInAdvisory",
  data() {
    return {
        boxMaxHeight:0,
        condition: {
            customerId: this.$route.query.customerId
        },  
        demoList: [],                      // table数组
        pageSearch: getHistoryZixunByCustomerId,       // 分页查询api接口
        form:{
            describe: '',   //必填

            standby_telephone: '',
            // adviser_id: '',
            idcard: '',
            occupation: '',
            address: '',
            weixin: '',
            qq: '',
            email: '',

            //生日
            calendar: '0',
            year: '',
            month: '',
            day: '',

            province_id: '',
            city_id: '',
            region_id: '',
        },

        adviser: '',

        //生日
        birthday: '',


        provinceList: [],
        cityList: [],
        regionList: [],

        rules:{
            describe: [{required: true, message: '请输入咨询详情', trigger: 'change'}],
        },

        customerId: '',
        adviserId: '',
        appointmentId: '',
        consultationId: '',

        userInfo: {

        },

        disabled: false,
        listLading:true,
        userList:[],
        listTotal:0,
        listLading:false

    };
  },
  components: {},
  methods: {
    seeLabelCustomerInfoByCustomerIdFn(){
    
        this.listLading = true
        let post = {
            customerId :this.$route.query.customerId,
            start:1,
            perpage:999999
        }
        seeLabelCustomerInfoByCustomerId(post).then(res => {
            this.userList = res.data.list;
            this.listTotal = res.data.total;
            this.listLading = false
        }).catch(error=>{
            console.log("seeLabelCustomerInfoByCustomerId no");
        })
    },
      regionsChange(type, regionsId){
          getRegionsList({
              regionsId,
          }).then(res=>{
              if(res.status == 0){
                  if(type == 'China'){
                      this.provinceList = res.data.list
                  }
                  if(type == 'province'){
                      this.cityList = res.data.list
                  }
                  if(type == 'city'){
                      this.regionList = res.data.list
                  }
              }
          })
      },

      birthdayChange(){
          let date = this.$base.dateTimeToDate(this.birthday, 'date2').split('-')
          this.form.year = date[0]
          this.form.month = date[1]
          this.form.day = date[2]
      },

      submit(){

            //备注必填
          if (this.$base.isNull(this.form.describe)) {
              this.$message({
                  message: '咨询详情必填',
                  type: 'error'
              })
              return
          }

          //判断电话
          if(!this.$base.isNull(this.form.standby_telephone)){
              const REG_PHONE = /^1[0-9]{10}$/
              if(!REG_PHONE.test(this.form.standby_telephone)){
                  this.$message({
                      message: '手机号格式不正确',
                      type: 'error'
                  })
                  return
              }
          }

          //判断身份证
        //   if(!this.$base.isNull(this.form.idcard)){
        //       const REG_ID_NUMBER = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        //       if(!REG_ID_NUMBER.test(this.form.idcard)){
        //           this.$message({
        //               message: '身份证格式不正确',
        //               type: 'error'
        //           })
        //           return
        //       }
        //   }

          //判断邮箱
          if(!this.$base.isNull(this.form.email)){
              const REG_EMAIL = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
              if(!REG_EMAIL.test(this.form.email)){
                  this.$message({
                      message: '邮箱格式不正确',
                      type: 'error'
                  })
                  return
              }
          }


          this.disabled = true

          let _tmp = this.form

          _tmp.customerId = this.customerId
          _tmp.appointmentId = this.appointmentId
          _tmp.adviserId = this.adviserId
          _tmp.mark = this.$route.query.mark

          if(this.$base.isNull(this.consultationId)){
              //新增咨询
              postConsultationAdd(_tmp).then(res=>{
                  if(res.status == 0){
                      this.$message({
                          message: "填写咨询成功",
                          type: "success",
                          onClose: () => {
                              this.$router.go(-1)
                              this.disabled = false
                          }
                      });
                  }else{
                      this.$message({
                          message: res.msg,
                          type: "error",
                      });
                      this.disabled = false
                  }
              })
          }else{
              _tmp.consultationId = this.consultationId

              //修改咨询
              postConsultationEdit(_tmp).then(res=>{
                  if(res.status == 0){
                      this.$message({
                          message: "修改咨询成功",
                          type: "success",
                          onClose: () => {
                              this.$router.go(-1)
                              this.disabled = false
                          }
                      });
                  }else{
                      this.$message({
                          message: res.msg,
                          type: "error",
                      });
                      this.disabled = false
                  }
              })

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
    this.boxMaxHeight = window.innerHeight - 100;
    this.seeLabelCustomerInfoByCustomerIdFn()

      this.customerId = this.$route.query.customerId
      this.adviserId = this.$route.query.adviserId
      this.appointmentId = this.$route.query.appointmentId
      this.consultationId = this.$route.query.consultationId

      this.regionsChange('China', 1)

      if(this.$base.isNull(this.consultationId)){
          //新增咨询
          getConsultationExhibitionAdd({
              customerId: this.customerId,
              adviserId: this.adviserId,
              appointment_id: this.appointmentId,
          }).then(res=>{
              if(res.status == 0){
                  // this.info = res.data.customerData
                  this.userInfo = res.data.customerData
                  this.userInfo.sexValue = res.data.customerData.sex.value
                  this.adviser = res.data.adviser[0].name
                  this.form.weixin = res.data.customerData.weixin
                  this.form.qq = res.data.customerData.qq
                  this.form.email = res.data.customerData.email
                  this.form.address = res.data.customerData.address
                  this.form.idcard = res.data.customerData.idcard
                  this.form.standby_telephone = res.data.customerData.standby_telephone
                  this.form.adviser_id = res.data.customerData.adviser_id
                  this.form.occupation = res.data.customerData.occupation

                  if( res.data.customerData.province_id != 0){
                      this.regionsChange('province', res.data.customerData.province_id)
                      this.form.province_id = res.data.customerData.province_id
                  }
                  if( res.data.customerData.city_id != 0){
                      this.regionsChange('city', res.data.customerData.city_id)
                      this.form.city_id = res.data.customerData.city_id
                  }

                  this.form.region_id = res.data.customerData.region_id

                  if(res.data.birthday[0]){
                      this.birthday = res.data.birthday[0] + '-' + res.data.birthday[1] + '-' +res.data.birthday[2]
                  }

                //   this.form.describe = res.data.consultation.describe
              }
          })

      }else{
          //修改咨询
          getConsultationExhibitionEdit({
              customerId: this.customerId,
              consultationId: this.consultationId,
              appointment_id: this.appointmentId,
          }).then(res=>{
              if(res.status == 0){

                  this.info = res.data

                  this.userInfo = res.data.consultationData.customerData
                  this.userInfo.sexValue = res.data.customerData.sex.value

                  this.form.weixin = res.data.consultationData.customerData.weixin
                  this.form.qq = res.data.consultationData.customerData.qq
                  this.form.email = res.data.consultationData.customerData.email
                  this.form.address = res.data.consultationData.customerData.address
                  this.form.idcard = res.data.consultationData.customerData.idcard
                  this.form.standby_telephone = res.data.consultationData.customerData.standby_telephone
                  this.form.adviser_id = res.data.consultationData.customerData.adviser_id
                  this.form.occupation = res.data.consultationData.customerData.occupation

                  if( res.data.consultationData.customerData.province_id != 0){
                      this.regionsChange('province', res.data.consultationData.customerData.province_id)
                      this.form.province_id = res.data.consultationData.customerData.province_id
                  }
                  if( res.data.consultationData.customerData.city_id != 0){
                      this.regionsChange('city', res.data.consultationData.customerData.city_id)
                      this.form.city_id = res.data.consultationData.customerData.city_id
                  }

                  this.form.region_id = res.data.consultationData.customerData.region_id

                  if(res.data.consultationData.birthday[0]){
                      this.birthday = res.data.consultationData.birthday[0] + '-' + res.data.consultationData.birthday[1] + '-' +res.data.consultationData.birthday[2]
                  }

                  this.form.describe = res.data.consultation.describe

                  this.adviser = res.data.consultationData.adviser[0].name

              }
          })

      }


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
.FillInAdvisory {
    margin: 20px;
    .box_message{
        display: flex;
        justify-content: space-between;
        .message{
            width: 55%;
            background: #fff;
            .message_box{
                padding: .2rem;
                .user_message{
                    height: 130px;
                    background: #EBFCFF;
                    border:1px solid #78DAE9;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .titles{
                        padding-left:.3rem; 
                        display: flex;
                        p{
                            font-size: 16px;
                            color: #0DC9E5;
                            border-bottom: 1px solid #0DC9E5;
                            padding-bottom: .1rem;
                        }
                    }
                    .text{
                        display: flex;
                        justify-content: space-between;
                        padding: .2rem .3rem 0;
                        p{
                            color: #333;
                        }
                    }
                }
                .add_message_box{
                    padding-top: .2rem;
                    .advisory_del{
                        border-top: 1px solid #E5E5E5;
                        h3{
                            line-height: 50px;
                            font-size: 16px;
                            color: #333;
                            font-weight: normal;
                            i{
                                font-size: 16px;
                                color: #EC414D;
                                padding-right: 4px;
                                font-style: normal;
                            }
                        }
                        .advisory_del_textarea{
                            width: 100%;
                            padding-bottom: .2rem;
                        }
                    }  
                    .add_message{
                        border-top: 1px solid #E5E5E5;
                        h3{
                            line-height: 50px;
                            font-size: 16px;
                            color: #333;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
        .list{
            width: 44%;
            background: #fff;
            .list_box{
                padding: .2rem;
                h3{
                    font-weight: normal;
                    border-bottom: 1px solid #E5E5E5;
                    padding-bottom: .14rem;
                    margin-bottom: .14rem;
                }
            }
        }
    }
    .question_list{
    margin-top: 20px;
    background: #fff;
    padding: 0 20px 20px;
    min-height: 4rem;
    .question_list_header {
      width: 100%;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      height: 50px;
      p{
        font-size: 16px;
        color: #333333;
      }
      span{
        padding-left: .2rem;
        color: #333333;
        i{
          font-style: normal;
          color: #FF5722;
        }
      }
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li{
        width: 32.5%;
        border: 1px solid #E5E5E5;
        margin-right: .15rem;
        margin-bottom: 10px;
        padding-bottom: .1rem;
        h4{
          background: #F2F2F2;
          color: #333333;
          font-size: 16px;
          padding-left: .2rem;
          font-weight: normal;
          line-height: 44px;
        }
        .text{
          font-size: 14px;
          color: #666;
          padding:.2rem; 
          height: 60px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display:-webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp:3; //显示的行
          p{
            cursor: pointer;
          }
        }
      }
      li:nth-of-type(3n){
        margin-right: 0;
      }
    }
  }
}
</style>

<style>

.advisory_del_textarea textarea{
    background: #F8F8F8;
    border:1px solid #F2F2F2;
}
</style>


    
