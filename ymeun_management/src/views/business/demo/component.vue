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
              <el-form-item label="选择顾问">
                  <el-select v-model="form.counselor1" placeholder="选择顾问" readonly="" clearable>
                      <el-option :key="''" :value="''" label="全部顾问"></el-option>
                      <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
              </el-form-item>
              <!--  选择美容师 -->
              <el-form-item label="选择美容师">
                  <el-select v-model="form.cosmetologist" placeholder="选择美容师" readonly="" clearable>
                      <el-option :key="''" :value="''" label="全部美容师"></el-option>
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
                          align="right"
                          type="date"
                          placeholder="请选择年月日"
                          @change="birthdayChange"
                  ></el-date-picker>
              </el-form-item>

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">自动搜索框 auto-search</p>

              <div class="clear4"></div>

              <!--  顾客姓名自动搜索框 -->
              <el-form-item label="顾客姓名自动搜索框">
                  <auto-search-client @changed="myChanged" :initValue="'张'"></auto-search-client>
              </el-form-item>

              <!--  预约/分诊顾客自动搜索框 -->
              <el-form-item label="预约/分诊顾客自动搜索框">
                  <auto-search-client-list @changed="myChanged" :initValue="''"></auto-search-client-list>
              </el-form-item>

              <!--  顾客电话自动搜索框 -->
              <el-form-item label="顾客电话自动搜索框">
                  <auto-search-client-list-tel @changed="myChanged" :initValue="''"></auto-search-client-list-tel>
              </el-form-item>

              <!--  跨店顾客自动搜索框 -->
              <el-form-item label="跨店顾客自动搜索框">
                  <auto-search-client-stride @changed="myChanged" :initValue="''"></auto-search-client-stride>
              </el-form-item>

              <p class="fc-blue h50px lh50px bd-b1 bd-gray">级联select</p>

              <div class="clear4"></div>

              <el-form-item  label="项目">
                  <el-select v-model="form.p1" placeholder="选择项目类别" readonly clearable>
                      <el-option :key="''" label="全部项目" :value="''"></el-option>
                      <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                  </el-select>
                  <el-select v-model="form.p2" placeholder="选择下级项目类别" readonly clearable v-if="form.p1">
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
                  <el-select v-model="form.c2" placeholder="选择下级项目类别" readonly clearable v-if="form.c1">
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

    </div>

  </div>
</template>


<script>
  //日期范围组件
  import dateSlot from '@/components/date/dateSlot'
  //自动查询组件
  import autoSearchClient from '@/components/autocomplete/autoSearchClient'
  import autoSearchClientList from '@/components/autocomplete/autoSearchClientList'
  import autoSearchClientListTel from '@/components/autocomplete/autoSearchClientListTel'
  import autoSearchClientStride from '@/components/autocomplete/autoSearchClientStride'
  //地区级联
  import {getRegionsList} from  "@/assets/api/common/common"

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
            console.log(data)
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

