<!--form-->
<template>
  <div class="pal24 par24 pat20 pab20">

    <div class="pa20 bg-white">

      <div class="wb100">

          <el-form :inline="true" :model="form" class="search-form" slot="search" label-width="120px">

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">时间范围 date-slot</p>

              <div class="clear4"></div>

              <!--  时间范围 -->
              <el-form-item label="时间范围">
                  <date-slot :dateTime.sync="dateTime"></date-slot>
              </el-form-item>

              <div class="clear4"></div>

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">下拉选择框 select</p>

              <div class="clear4"></div>


<!--              {{$store.getters}}-->
<!--              {{$store.getters.roleListMap}}-->

              <!--  选择顾问 -->
              <el-form-item :label="'选择'+$store.getters.roleName.adviser">
                  <el-select v-model="form.counselor1" :placeholder="'选择'+$store.getters.roleName.adviser" readonly="" clearable>
                      <el-option :key="''" :value="''" :label="'全部'+$store.getters.roleName.adviser"></el-option>
                      <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>
              <!--  选择美容师 -->
              <el-form-item :label="`选择${$store.getters.roleName.technician}`">
                  <el-select v-model="form.cosmetologist" :placeholder="`选择${$store.getters.roleName.technician}`" readonly="" clearable>
                      <el-option :key="''" :value="''" :label="`全部${$store.getters.roleName.technician}`"></el-option>
                      <el-option v-for="item in $store.getters.cosmetologistMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>
              <!--  选择员工 -->
              <el-form-item label="选择员工">
                  <el-select v-model="form.roleId" placeholder="选择员工" readonly="" clearable>
                      <el-option :key="''" :value="''" label="全部员工"></el-option>
                      <el-option v-for="item in $store.getters.staffListMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>

              <div class="clear4"></div>

              <el-form-item label="生日">
                  <el-select
                          v-model="form.calendar"
                          placeholder="请选择新历/旧历"
                          readonly
                          clearable
                          class="wb48 fl"
                  >
                      <el-option v-for="[key, val] in _dictStyle" :key="key" :label="val" :value="key"></el-option>
                  </el-select>
                  <el-date-picker
                          class="wb48 fr"
                          v-model="birthday"
                          :clearable="false"
                          align="right"
                          type="date"
                          placeholder="请选择年月日"
                          @change="birthdayChange"
                  ></el-date-picker>
              </el-form-item>

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">自动搜索框 auto-search</p>

              <div class="clear4"></div>

              <!--  客户姓名自动搜索框 -->
              <el-form-item label="客户姓名自动搜索框">
                  <auto-search-client @changed="myChanged" :initValue="'张'"></auto-search-client>
              </el-form-item>

              <!--  预约/分诊客户自动搜索框 -->
              <el-form-item label="预约/分诊客户自动搜索框">
                  <auto-search-client-list @changed="myChanged" :initValue="''"></auto-search-client-list>
              </el-form-item>

              <!--  客户电话自动搜索框 -->
              <el-form-item label="客户电话自动搜索框">
                  <auto-search-client-list-tel @changed="myChanged" :initValue="''"></auto-search-client-list-tel>
              </el-form-item>

              <!--  跨店客户自动搜索框 -->
              <el-form-item label="跨店客户自动搜索框">
                  <div class="wb100">
                     <auto-search-client-stride @changed="myChanged" :initValue="''"></auto-search-client-stride>

                  </div>
              </el-form-item>

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">级联select</p>

              <div class="clear4"></div>

              <el-form-item  label="项目">
                  <el-select v-model="form.p1" placeholder="选择项目类别" readonly clearable>
                      <el-option :key="''" label="全部项目" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                  <el-select v-model="form.p2" placeholder="选择下级项目" readonly clearable v-if="form.p1">
                      <el-option v-for="item in $store.getters.projectList2Map(form.p1)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>

              <div class="clear4"></div>

              <el-form-item  label="渠道">
                  <el-select v-model="form.c1" placeholder="选择渠道" readonly clearable>
                      <el-option :key="''" label="全部渠道" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                  <el-select v-model="form.c2" placeholder="选择下级渠道" readonly clearable v-if="form.c1">
                      <el-option v-for="item in $store.getters.channelList2Map(form.c1)" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>

              <div class="clear4"></div>

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

          </el-form>

      </div>

      <div class="clear0"></div>

      <div class="wb100">
                     <auto-search-client-stride @changed="myChanged" :initValue="''"></auto-search-client-stride>

                  </div>

    </div>

  </div>
</template>


<script>
  //日期范围组件
  import dateSlot from '@/shop/components/date/dateSlot'
  //自动查询组件
  import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
  import autoSearchClientList from '@/shop/components/autocomplete/autoSearchClientList'
  import autoSearchClientListTel from '@/shop/components/autocomplete/autoSearchClientListTel'
  import autoSearchClientStride from '@/shop/components/autocomplete/autoSearchClientStride'
  //地区级联
  import {getRegionsList} from  "@/shop/assets/api/common/common"

  export default {
      name: 'demo-form',
      components: { dateSlot, autoSearchClient, autoSearchClientList, autoSearchClientListTel, autoSearchClientStride },
    data() {
      return {
        dateTime: [ this.$base.dateTimeToDate(new Date(), 'startTime'), this.$base.dateTimeToDate(new Date(), 'endTime')],
        form: {
            counselor1: '',
            c1: '',
            c2: '',
            startTime: this.$base.dateTimeToDate(new Date(), 'startTime'),
            endTime: this.$base.dateTimeToDate(new Date(), 'endTime'),

            //省 市 区
            province_id: '',
            city_id: '',
            region_id: '',

            //生日
            calendar: '0',
            year: '',
            month: '',
            day: '',
        },

        //地区级联
        provinceList: [],
        cityList: [],
        regionList: [],

        //生日
        birthday: '',
        
      }
    },
    mounted() {
        //获取地区
        this.regionsChange('China', 1)

        let _tmp = [{"id":9628,"name":"套餐类","description":"","price":0,"treatment_num":0,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 17:39:41","updated_at":"2019-10-30 15:28:39","p_id":0,"users_id":178,"belong_id":9622,"allowed":1,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[],"children":[{"id":9792,"name":"脱毛","description":"分部位脱毛","price":2980,"treatment_num":10,"discount":0,"position":0,"type":0,"style":0,"sales_volume":2,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-15 16:52:29","updated_at":"2019-10-31 15:07:41","p_id":9628,"users_id":178,"belong_id":9787,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9704,"name":"蜜爱秒杀卡","description":"蜜爱秒杀卡","price":980,"treatment_num":4,"discount":0,"position":0,"type":0,"style":1,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 17:53:23","updated_at":"2019-10-14 17:53:23","p_id":9628,"users_id":178,"belong_id":9689,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[{"id":9705,"p_id":9704,"price":160,"name":"紧握弹张力检测","treatment_num":1},{"id":9706,"p_id":9704,"price":160,"name":"魅力风情手法激活","treatment_num":1},{"id":9707,"p_id":9704,"price":160,"name":"私密净化SPA","treatment_num":1},{"id":9708,"p_id":9704,"price":500,"name":"蜜暖养护","treatment_num":1}]},{"id":9680,"name":"尊享卡（980）","description":"尊享卡（980）","price":980,"treatment_num":2,"discount":0,"position":0,"type":0,"style":1,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 17:50:27","updated_at":"2019-10-14 17:50:27","p_id":9628,"users_id":178,"belong_id":9671,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[{"id":9681,"p_id":9680,"price":500,"name":"FDSC除皱-鱼尾纹","treatment_num":1},{"id":9682,"p_id":9680,"price":480,"name":"3D驻颜紧肤","treatment_num":1}]},{"id":9662,"name":"形象设计套餐","description":"形象设计套餐","price":199,"treatment_num":2,"discount":0,"position":0,"type":0,"style":1,"sales_volume":4,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 17:47:56","updated_at":"2019-10-29 11:41:14","p_id":9628,"users_id":178,"belong_id":9653,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[{"id":9663,"p_id":9662,"price":100,"name":"V8黄金体雕","treatment_num":1},{"id":9664,"p_id":9662,"price":99,"name":"巨邦体验","treatment_num":1}]},{"id":9637,"name":"新客专享体验卡","description":"单次体验卡，仅限非会员使用","price":"9.90","treatment_num":2,"discount":0,"position":0,"type":0,"style":1,"sales_volume":1,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 17:39:41","updated_at":"2019-11-05 10:21:41","p_id":9628,"users_id":178,"belong_id":9623,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[{"id":9638,"p_id":9637,"price":"4.95","name":"V脸塑","treatment_num":1},{"id":9639,"p_id":9637,"price":"4.95","name":"O2水氧净肤","treatment_num":1}]}]},{"id":9321,"name":"提升类","description":"","price":0,"treatment_num":0,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:42:35","updated_at":"2019-10-14 16:56:40","p_id":0,"users_id":178,"belong_id":9313,"allowed":1,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[],"children":[{"id":9387,"name":"3D驻颜紧肤-颈部","description":"深沉提升","price":9800,"treatment_num":10,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:56:40","updated_at":"2019-10-14 16:56:40","p_id":9321,"users_id":178,"belong_id":9384,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9381,"name":"3D驻颜紧肤-眼部","description":"深层提升","price":6800,"treatment_num":10,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:56:18","updated_at":"2019-10-14 16:56:18","p_id":9321,"users_id":178,"belong_id":9378,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9375,"name":"3D驻颜紧肤-面部","description":"深层提升","price":9800,"treatment_num":10,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:55:47","updated_at":"2019-10-14 16:55:47","p_id":9321,"users_id":178,"belong_id":9372,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9369,"name":"V脸塑单次","description":"提拉紧致","price":760,"treatment_num":1,"discount":0,"position":0,"type":0,"style":0,"sales_volume":13,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:51:24","updated_at":"2019-11-03 15:28:17","p_id":9321,"users_id":178,"belong_id":9365,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9362,"name":"V脸塑年卡-颈部","description":"提拉紧致","price":9800,"treatment_num":48,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:49:59","updated_at":"2019-10-14 16:49:59","p_id":9321,"users_id":178,"belong_id":9358,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9355,"name":"V脸塑年卡-眼部","description":"提拉紧致","price":6800,"treatment_num":48,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:48:57","updated_at":"2019-10-14 16:48:57","p_id":9321,"users_id":178,"belong_id":9351,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9348,"name":"V脸塑年卡-面部","description":"提拉紧致","price":9800,"treatment_num":48,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:47:49","updated_at":"2019-10-14 16:47:49","p_id":9321,"users_id":178,"belong_id":9344,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9341,"name":"V脸塑疗程-颈部","description":"提拉紧致","price":3800,"treatment_num":5,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:47:23","updated_at":"2019-10-14 16:47:23","p_id":9321,"users_id":178,"belong_id":9337,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9334,"name":"V脸塑疗程-眼部","description":"提拉紧致","price":2800,"treatment_num":5,"discount":0,"position":0,"type":0,"style":0,"sales_volume":0,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:46:43","updated_at":"2019-10-14 16:46:43","p_id":9321,"users_id":178,"belong_id":9330,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]},{"id":9327,"name":"V脸塑疗程-面部","description":"提拉紧致","price":3800,"treatment_num":5,"discount":0,"position":0,"type":0,"style":0,"sales_volume":7,"disabled_volume":0,"status":{"value":1,"label":"启用"},"e_id":1,"s_id":24,"classify_id":0,"created_at":"2019-10-14 16:42:35","updated_at":"2019-10-30 16:46:36","p_id":9321,"users_id":178,"belong_id":9317,"allowed":2,"allowed_store_ids":"0","items":[],"member":{"users_id":178,"name":"管理员","s_id":0,"role_id":1},"classify":{"id":0,"title":""},"activity":{"activity_price":0,"start_time":0,"end_time":0},"meal":[]}]}]

        let items_volume = 68

        //筛选
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children){
                let _t = _tmp[i].children.filter(item => item.disabled_volume == 1 || items_volume >= item.price)
                console.log(_t.length, 'length')
                if(_t.length == 0){
                    _tmp.splice(i, 1)
                }
            }
        }
        for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].children) {
                if (_tmp[i].children.length == 0) {
                    _tmp.splice(i, 1)
                }
            }
        }

        console.log(_tmp)


    },
    methods: {
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

        birthdayChange(){
            let date = this.$base.dateTimeToDate(this.birthday, 'date2').split('-')
            this.form.year = date[0]
            this.form.month = date[1]
            this.form.day = date[2]
        },

        myChanged(data){
            // console.log(data)
        }
    },

    watch: {
      dateTime(c,o){
        this.condition.startTime = c[0]
        this.condition.endTime = c[1]
      }
    }

  }
</script>

