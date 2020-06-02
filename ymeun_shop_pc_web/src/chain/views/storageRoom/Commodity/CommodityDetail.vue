<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">{{isEdit ? '商品详情' : '新增商品'}}</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100" v-if="isEdit">
                <div class="pal18 par18 pat8 pab8 lh30px fc-gray3 text-center" :class="form.status == 1 ? 'bg-green5' : 'bg-gray' ">
                    <span class="fl">
                        商品状态：
                    </span>
                    <template v-if="form.status == 1">
                        <span class="fl fc-green">正常</span>
                        <span class="fr bg-green w50px fc-white pointer" @click="form.status = 0">下架</span>
                    </template>
                    <template v-else>
                        <span class="fl">下架</span>
                        <span class="fr bg-green w50px fc-white pointer" @click="form.status = 1">上架</span>
                    </template>
                    <div class="clear0"></div>
                </div>
            </div>

            <div class="clear2"></div>

            <div class="w800px center">

                <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="120px">

                    <div class="wb50 fl">
                        <el-form-item label="商品名称" prop="fullname">
                            <el-input v-model="form.fullname" class="w200px" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="商品简称" prop="title">
                            <el-input v-model="form.title" class="w200px" placeholder="请输入商品简称"></el-input>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="商品类别" prop="catalogue_id">
                            <el-select placeholder="请选择商品类别" v-model="form.catalogue_id" class="w200px">
                                <el-option v-for="item in catalogueList" :key="item.title" :label="item.title"
                                           :value="item.title"></el-option>
                            </el-select>
<!--                            <auto-search-catalogue @changed="catalogueChanged" class="w188px" v-if="loaded" :initValue="form.catalogue.title"></auto-search-catalogue>-->
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="供应商" prop="business_id">
                            <el-select placeholder="请选择供应商" v-model="form.business_id" class="w200px">
                                <el-option v-for="item in $store.getters.businessList" :key="item.id" :label="item.fullname"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="商品单位" prop="unit_id">
                            <auto-search-unit @changed="unitChanged" class="w200px" v-if="loaded" :initValue="form.unit.title"></auto-search-unit>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="商品规格" prop="specifications_id">
                            <auto-search-specification @changed="specificationChanged" class="w200px" v-if="loaded" :initValue="form.specifications.title"></auto-search-specification>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="税率" prop="tax">
                            <el-input-number class="w200px fl mar10" v-model="form.tax" :min="0" :controls="false" :precision="2" placeholder="请输入税率"></el-input-number>
                            <span class="fl">%</span>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl relative">
                        <el-form-item label="库存预警" prop="stocks_warning">
                            <el-input v-model="form.stocks_warning" class="w200px" placeholder="请输入库存预警数量"></el-input>
                            <p class="fc-gray2 absolute w300px" style="bottom: -30px;">库存剩余最低多少的时候发出预警通知</p>
                        </el-form-item>
                    </div>

                    <div class="clear2"></div>

                    <div class="wb50 fl">
                        <el-form-item label="到期预警" prop="expire_warning">
                            <el-input v-model="form.expire_warning" placeholder="请输入到期预警天数" class="w200px fl mar10"></el-input> <span class="fl">天</span>
                            <div class="clear0"></div>
                            <p class="fc-gray2">保质期到期前提前多久发出预警通知</p>
                        </el-form-item>
                    </div>

                    <div class="wb50 fl">
                        <el-form-item label="商品图片" prop="cover">
                            <el-upload
                                    class="h105px wb100"
                                    :show-file-list="false"
                                    ref="upL" :http-request="uploadSectionFile" :action="action">
                                <template v-if="form.cover">
                                    <div class="wb100 h105px relative">
                                        <div class="w140px h105px img-area fl">
                                            <img :src="form.cover">
                                        </div>
                                        <div class="avatar-uploader-icon fl w80px h32px lh32px text-center bd-gray bd-a1 mal14" style="margin-top: 73px;">重新上传</div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="w140px h105px lh105px relative bd-gray bd-a1 fl"></div>
                                    <div class="avatar-uploader-icon fl w80px h32px lh32px text-center bd-gray bd-a1 mal14" style="margin-top: 73px;">点击上传</div>
                                </template>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <div class="clear4"></div>

                    <div class="wb100">
                        <el-form-item label="备注" class="wb100">
                            <el-input type="textarea" v-model="form.remarks" style="width: 600px"></el-input>
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

    import { save, getSpecifications, getUnit, getCatalogue, getInfo } from '@/chain/assets/api/store/store'

    import autoSearchSpecification from '@/chain/components/autocomplete/autoSearchSpecification'
    import autoSearchCatalogue from '@/chain/components/autocomplete/autoSearchCatalogue'
    import autoSearchUnit from '@/chain/components/autocomplete/autoSearchUnit'

  export default {
      name: 'CommodityDetail',
      components: { autoSearchSpecification, autoSearchCatalogue, autoSearchUnit },
    data() {
      return {
          form: {
              status: 1,
              fullname: '',
              title: '',
              catalogue_id: '',
              business_id: '',
              unit_id: '',
              specifications_id: '',
              tax: '',
              stocks_warning: '',
              expire_warning: '',
              cover: '',
              unit: {},
              specifications: {},
              catalogue: {},
          },
          rules:{
              fullname: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
              title: [{ required: true, message: '请输入商品简称', trigger: 'blur' }],
              catalogue_id: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
              business_id: [{ required: true, message: '请选择供应商', trigger: 'blur' }],
              unit_id: [{ required: true, message: '请输入商品单位', trigger: 'blur' }],
              specifications_id: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
              tax: [{ required: true, message: '请输入商品税率', trigger: 'blur' }],
              stocks_warning: [{ required: true, message: '请输入商品库存预警', trigger: 'blur' }],
              expire_warning: [{ required: true, message: '请输入商品到期预警', trigger: 'blur' }],
              // cover: [{ required: true, message: '请输入商品图片', trigger: 'blur' }],
          },
          disabled: false,
          action: this.$base.getChainHost('store') + '/post/attachment/document/upload',
          good_id: '',
          loaded: false,
          isEdit: false,
          catalogueList: [],
      }
    },
    mounted() {
        let good_id = this.$route.query.good_id

        this.good_id = good_id

        if(!this.$base.isNull(good_id)){
            this.isEdit = true
            getInfo({
                goodId: good_id
            }).then(res=>{
                if(res.status == 0){
                    this.loaded = true
                    this.form = JSON.parse(JSON.stringify(res.data))
                    this.form.status = this.form.status.value
                    this.form.catalogue_id = this.form.catalogue.title
                }
            })
        }else{
            this.loaded = true
        }

        getCatalogue({ keyword: '' }).then((res)=>{
            if(res.status == 0){
                this.catalogueList = res.data.list
            }
        })

    },
    methods: {

        back(){
            this.$router.go(-1)
        },

        uploadSectionFile(param) {
            let fileObj = param.file;
            // 接收上传文件的后台地址
            let FileController = this.action;
            // FormData 对象
            let form = new FormData();
            // 文件对象
            form.append("attach", fileObj);
            let xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('webToken'))
            xhr.setRequestHeader('Accept', 'application/json')
            // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
            xhr.onload = () => {
                let res = JSON.parse(xhr.response)
                this.form.cover = res.data.attach
            };
            xhr.send(form);
        },

        specificationChanged(data){
            this.form.specifications_id = data.kw
        },

        unitChanged(data){
            this.form.unit_id = data.kw
        },

        catalogueChanged(data){
            this.form.catalogue_id = data.kw
        },

          submit(){
              this.$refs.form.validate((valid) => {
                  if (valid) {
                      this.disabled = true

                      this.form.goodId = this.good_id

                      save(this.form).then(res=>{

                          if(res.status == 0){
                              if(this.$base.isNull(this.good_id)){
                                  this.$message({
                                      message: "商品新增成功",
                                      type: "success",
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              }else{

                                  this.$message({
                                      message: "商品编辑成功",
                                      type: "success",
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              }
                          }else{
                              this.disabled = false
                              this.$message({
                                  message: res.msg,
                                  type: "error",
                              });
                          }
                      })
                  }
              })
          }
    },

    watch: {

    }

  }
</script>

