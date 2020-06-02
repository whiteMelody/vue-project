<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">{{isEdit ? '供应商详情' : '新增供应商'}}</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100" v-if="isEdit">

                <div class="pal18 par18 pat8 pab8 lh30px fc-gray3 text-center" :class="form.status == 1 ? 'bg-green5' : 'bg-gray' ">
                    <span class="fl">
                        供应商状态：
                    </span>
                    <template v-if="form.status == 1">
                        <span class="fl fc-green">正常</span>
                        <span class="fr bg-green w100px fc-white pointer" @click="form.status = 2">停止合作</span>
                    </template>
                    <template v-else>
                        <span class="fl">停止合作</span>
                        <span class="fr bg-green w50px fc-white pointer" @click="form.status = 1">正常</span>
                    </template>
                    <div class="clear0"></div>
                </div>

            </div>

            <div class="clear2"></div>

            <div class="w1000px center">

                <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="120px">

                    <div class="wb50 fl">
                        <el-form-item label="供应商" prop="fullname">
                            <el-input v-model="form.fullname" placeholder="请输入供应商名称" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="供应商简称" prop="title">
                            <el-input v-model="form.title" placeholder="请输入供应商简称" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="地区" prop="province_regions_id">
                            <el-select v-model="form.province_regions_id" placeholder="请选择地区" readonly="" clearable class="w100px fl" @change="regionsChange('province', form.province_regions_id)">
                                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <el-select v-model="form.city_regions_id" placeholder="请选择地区" readonly="" clearable class="w100px fl" @change="regionsChange('city', form.city_regions_id)">
                                <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <el-select v-model="form.county_regions_id" placeholder="请选择地区" readonly="" clearable class="w100px fl">
                                <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="form.address" placeholder="请输入详细地址" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="联系人" prop="link_man">
                            <el-input v-model="form.link_man" placeholder="请输入联系人" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="联系方式" prop="telephone">
                            <el-input v-model="form.telephone" placeholder="请输入联系方式" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="邮箱地址" prop="email">
                            <el-input v-model="form.email" class="w200px"></el-input>
                        </el-form-item>
                    </div>

                    <div class="clear4"></div>

                    <div class="wb100 fl">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="form.remarks" style="width:700px"></el-input>
                        </el-form-item>
                    </div>

                </el-form>

                <div class="clear4"></div>

                <div class="wb100 text-right">
                    <el-button class="minW100 mar10" @click="back">取消</el-button>

                    <template v-if="disabled">
                        <el-button type="primary" class="minW100" disabled>提交中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" class="minW100" @click="submit"> {{isEdit ? '保存修改' : '确认新增'}} </el-button>
                    </template>
                </div>

                <div class="clear4"></div>

            </div>

        </div>
    </div>

</template>


<script>

    import { businessAdd, businessGetInfo, businessEdit } from '@/chain/assets/api/business/business'

    //地区级联
    import {getRegionsList} from  "@/chain/assets/api/common/common"

  export default {
      name: 'BusinessDetail',
      components: {  },
    data() {
      return {
          form: {
              fullname: '',
              title: '',
                status: 1,
              //省 市 区
              province_regions_id: '',
              city_regions_id: '',
              county_regions_id: '',
              address: '',
              link_man: '',

          },

          rules:{
              fullname: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
              title: [{ required: true, message: '请输入供应商简称', trigger: 'blur' }],
              province_regions_id: [{ required: true, message: '请选择省', trigger: 'blur' }],
              city_regions_id: [{ required: true, message: '请选择市', trigger: 'blur' }],
              county_regions_id: [{ required: true, message: '请选择区', trigger: 'blur' }],
              address: [{ required: true, message: '请输入详情地址', trigger: 'blur' }],
              link_man: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
              telephone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
          },
          disabled: false,

          //地区级联
          provinceList: [],
          cityList: [],
          regionList: [],
          id: '',
          isEdit: false,

      }
    },
    mounted() {
        let id = this.$route.query.id

        this.id = id

        if(!this.$base.isNull(id)){
            this.isEdit = true
            businessGetInfo({
                id: id
            }).then(res=>{
                if(res.status == 0){
                    this.form = res.data
                    this.regionsChange('China', 1)
                    if(!this.$base.isNull(res.data.province_regions_id)){
                        this.regionsChange('province', res.data.province_regions_id)
                    }
                    if(!this.$base.isNull(res.data.city_regions_id)){
                        this.regionsChange('city', res.data.city_regions_id)
                    }
                }
            })
        }else{
            this.regionsChange('China', 1)
        }
    },
    methods: {

        back(){
            this.$router.go(-1)
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

          submit(){
              this.$refs.form.validate((valid) => {
                  if (valid) {
                      this.disabled = true

                      if(this.$base.isNull(this.id)){
                          businessAdd(this.form).then(res=>{

                              if(res.status == 0){
                                  this.$message({
                                      message: '供应商新增成功',
                                      type: "success",
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              }else{
                                  this.disabled = false
                                  this.$message({
                                      message: res.msg,
                                      type: "error",
                                  });
                              }
                          })
                      }else{
                          businessEdit(this.form).then(res=>{
                              this.disabled = false
                              if(res.status == 0){
                                  this.$message({
                                      message: '供应商编辑成功',
                                      type: "success",
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              }else{
                                  this.$message({
                                      message: res.msg,
                                      type: "error",
                                  });
                              }
                          })

                      }


                  }
              })
          }
    },

    watch: {

    }

  }
</script>

