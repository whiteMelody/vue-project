<template>
  <div class="wb100">
      <div class="clear4"></div>
      <div class="wb100">
          <el-form :inline="true" :model="condition" class="search-form" slot="search">
              <el-button type="primary" @click="showDialog" class="fl">添加大类</el-button>
              <!-- <a href="file/ProjectManagement.xlsx" download="" class="mal10 mar10 fl">
                  <el-button type="primary" >下载模板</el-button>
              </a>
              <div class="fl mar10">
                  <attachments :eid="id" :sid="sid"></attachments>
              </div> -->
          </el-form>

          <div class="clear3"></div>

          <!--    列表内容    -->
          <table class="wb100 myTable">
              <thead class="bg-white2">
              <tr>
                  <td>大类名称</td>
                  <td>二级项目名称</td>
                  <td>品项类别</td>
                  <td>品项属性</td>
                  <td>价格（元）</td>
                  <td>疗程次数（次）</td>
                  <td class="w300px h44px over-hidden">备注</td>
                  <td>操作</td>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in tableData">
                  <tr>
                      <td @click="showRow(item, index)">
                          <template v-if="item.showSolt">
                              {{item.name}}
                              <i class="iconfont iconshangla-copy"></i>
                          </template>
                          <template v-else>
                              {{item.name}}
                              <i class="iconfont iconxiala"></i>
                          </template>
                      </td>
                      <td></td>
                      <td v-if="item.classify">{{item.classify.title}}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="fc-blue" @click="showEdit(item)">添加下级</td>
                  </tr>
                  <template v-for="(item2,index2) in item.list" v-if="item.showSolt">
                      <tr class="bg-white1">
                          <td>{{item2.ip1}}</td>
                          <td>{{item2.name}}</td>
                          <td></td>
                          <td>{{item2.fashion.label}}</td>
                          <td>{{item2.price}}</td>
                          <td>{{item2.treatment_num}}</td>
                          <td>{{item2.description}}</td>
                          <td></td>
                      </tr>
                  </template>

              </template>
              </tbody>
          </table>

          <div class="clear4"></div>

      </div>

      <div class="clear0"></div>

      <!--   添加&修改大类弹窗   -->
      <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="400px">
          <el-form :model="dialogEditCategoriesParam">
              <el-form-item label>
                  <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
              </el-form-item>

              <div class="project_type">
                  <p class="fz14px pat10 bd-t1 bd-gray">请选择品项所属类别</p>
                  <el-form-item label v-if="projectLabel.length > 0">
                      <el-radio-group v-model="dialogEditCategoriesParam.classify_id">
                          <el-radio v-for="(item , index) in projectLabel" :key="index" :label="item.id">{{item.title}}</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label>
                      <el-input v-model="dialogEditCategoriesParam.classify_name" placeholder="请输入新增类别"></el-input>
                  </el-form-item>
                  <span class="fc-pink3 fz14px">注：如果已有类别不满足业务需求，可以在输入框自行输入点击 确定并新增。</span>
              </div>
              <div class="clear0"></div>

          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="hideDialog">取 消</el-button>

              <template v-if="disabled">
                  <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                  <el-button type="primary" @click="addProject">确 定</el-button>
              </template>

          </div>
      </el-dialog>

      <el-dialog title="添加下级类目" :visible.sync="dialogForm" width="50%">
          <div class="pal20 par20">
              <el-form ref="myForm" :model="form" :rules="rules" label-width="100px">

                  <template>
                      <div class="w80px h40px lh40px text-center f16px fl  pointer" @click="form.style = 0" :class="form.style == 0 ? 'bg-blue fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                          普通类
                      </div>
                      <div class="w80px h40px lh40px text-center f16px fl  pointer" @click="form.style = 1" :class="form.style == 1 ? 'bg-blue fc-white pa1' : 'fc-gray3 bd-gray bd-a1'">
                          套餐类
                      </div>
                  </template>

                  <div class="clear2"></div>

                  <el-form-item label="大类名称" prop="itemParentId">
                      <el-select v-model="form.itemParentId" placeholder="大类名称" clearable>
                          <el-option v-for="item in list" :key="item.key" :label="item.name"
                                     :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="品项" prop="fashion">
                      <el-radio v-model.trim="form.fashion" :label="1" :disabled="isEdit">项目</el-radio>
                      <el-radio v-model.trim="form.fashion" :label="2" :disabled="isEdit" @change="radioChange">产品</el-radio>
                  </el-form-item>

                  <el-form-item label="二级名称" prop="name">
                      <el-input type="text" v-model="form.name" placeholder="请输入二级名称" clearable></el-input>
                  </el-form-item>

                  <el-form-item label="价格" prop="price">
                      <el-input-number v-model="form.price" :precision="2" :controls="false" :min="0" :max="999999" :disabled="form.style == 1"></el-input-number>
                  </el-form-item>

                  <el-form-item label="疗程次数" prop="treatment_num">
                      <el-input-number v-model="form.treatment_num" :precision="0" :controls="false" :min="0" :max="999999" :disabled="form.style == 1"></el-input-number>
                  </el-form-item>

                  <template v-if="form.style == 1">

                      <template v-for="(item, index) in comboList">

                          <div class="pat10 bg-white1">
                              <p class="mal50">套餐{{index + 1}}信息</p>
                              <div class="fl">
                                  <el-form-item label="名称" prop="name">
                                      <el-input v-model="item.name"></el-input>
                                  </el-form-item>
                              </div>
                              <div class="fl">
                                  <el-form-item label="价格" prop="price">
                                      <el-input type="text" v-model="item.price" placeholder="请输入价格" clearable></el-input>
                                      <!--                                <el-input-number v-model="item.price" :min="0" :controls="false" :precision="2"></el-input-number>-->
                                  </el-form-item>
                              </div>
                              <div class="fl">
                                  <el-form-item label="疗程次数" prop="treatment_num">

                                      <el-input type="text" v-model="item.treatment_num" placeholder="请输入疗程次数" clearable></el-input>
                                      <!--                                <el-input-number v-model="item.treatment_num" :min="1" :controls="false" :precision="0"></el-input-number>-->
                                  </el-form-item>
                              </div>

                              <i class="iconfont iconjinzhi fc-red fr mat5" @click="delCombo(index)"></i>

                              <div class="clear0"></div>

                          </div>

                      </template>

                      <div class="clear2"></div>

                      <el-button type="primary" class="mal50" @click="addCombo">新增套餐信息</el-button>

                      <div class="clear4"></div>

                  </template>

                  <div class="clear0"></div>

                  <el-form-item label="描述" prop="description">
                      <el-input type="textarea" v-model="form.description" placeholder="请输入描述" class="wb100"></el-input>
                  </el-form-item>

                  <div class="clear0 bd-gray bd-b1"></div>
                  <div class="wb100 h50px lh50px">
                      请选择需要添加的门店
                  </div>

                  <div class="wb100">
                      全选 <el-checkbox v-model="selectAll" @change="selectAllStore"></el-checkbox>
                  </div>

                  <template v-for="(item, index) in storeList">
                      <div class="wb50 fl">
                          <p class="ma10 pal5 par5 h40px lh40px bd-a1 radius1 text-center text-over-hidden1" :class="item.isSelected ? 'bd-green2 ' : 'bd-gray'" @click="changeSelected(item, index)">
                              {{item.name}}
                          </p>
                      </div>
                  </template>


              </el-form>

              <div class="clear4"></div>

              <div slot="footer" class="dialog-footer fr">
                  <el-button @click="dialogForm = false">取 消</el-button>
                  <template v-if="disabled">
                      <el-button type="primary" disabled>提交中...</el-button>
                  </template>
                  <template v-else>
                      <el-button type="primary" @click="handleSubmit">保 存</el-button>
                  </template>
              </div>

              <div class="clear0"></div>
          </div>
      </el-dialog>

  </div>
</template>

<script>
    import attachments from '@/components/file-upload'

    import { itemList, itemAdd, storeList, getList } from  "@/assets/api/home/home"

    export default {
        name: "ProjectManagement",
        props: ['id', ],
        components: {
             attachments
        },
        data() {
            return {
                form: {
                    fashion: 1,
                    style: 0,
                    name : '',
                    price : 0,
                    treatment_num: 0,
                    description : '',
                },
                dialogEditCategories: false,
                dialogEditCategoriesParam: {},
                condition: {
                    p1: '',
                },
                list: [],
                list2: [],
                tableData: [],
                dialogForm: false,                //弹窗控制器
                rules: {
                    itemParentId: [{required: true, message: '请选择一级类目', trigger: 'change'}],
                    name: [{required: true, message: '请输入项目名称', trigger: 'change'}],
                    price: [{required: true, message: '请输入价格', trigger: 'change'}],
                    treatment_num: [{required: true, message: '请输入疗程次数', trigger: 'change'}],
                    description: [{required: true, message: '请输入项目描述', trigger: 'change'}],
                },
                isEdit: false,                  // 是否编辑表单
                disabled: false,
                sid: 0,

                projectLabel:[],

                selectAll: false,

                projectList: [],

                storeList: [],

                comboList:[],
            };
        },
        mounted() {
            this.loadData()
            getList({e_id: this.id,}).then(res=>{
                if(res.status == 0){
                    this.projectLabel = res.data.list
                }
            })

        },
        methods: {

            showEdit(item){
                this.dialogForm = true;
                this.form.itemParentId = item.id
                this.form.name = ''
                this.form.fashion = 1
                this.form.price = 0
                this.form.treatment_num = 0
                this.form.description = ''
                this.form.comboList = []
                for(let i=0; i<this.storeList.length; i++){
                    this.storeList[i].isSelected = false
                }
                getList({e_id: this.id,}).then(res=>{
                    if(res.status == 0){
                        this.projectLabel = res.data.list
                    }
                })
            },

            radioChange(){

                if(this.form.style == 0){
                    this.form.treatment_num = 0
                }else{
                    for(let i=0; i< this.comboList.length; i++){
                        this.comboList[i].treatment_num = 0
                    }
                    this.form.treatment_num = 0
                }
            },

            addCombo(){

                this.comboList.push({
                    id: 0,
                    name: '',
                    price: '',
                    treatment_num: '',
                })

            },

            delCombo(index){
                this.comboList.splice(index, 1)
            },

            selectAllStore(){

                for(let i=0; i<this.storeList.length; i++){
                    this.storeList[i].isSelected = this.selectAll
                }

            },

            changeSelected(item, index){

                let storeList = this.storeList
                item.isSelected = !item.isSelected
                this.$set(storeList,index,item)
            },

            // 提交表单
            handleSubmit() {

                // 避免重复提交时 提示报错
                if (!this.dialogForm) {
                    return
                }

                this.$refs.myForm.validate((valid) => {
                    if (valid) {
                        this.isEdit ? this.handleToEdit() : this.handleToAdd()
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error'
                        })
                    }
                })

            },

            // 新增
            handleToAdd() {

                let _arr = []

                for(let i=0; i<this.storeList.length; i++){
                    if(this.storeList[i].isSelected){
                        _arr.push({
                            id: this.storeList[i].id
                        })
                    }
                }

                if(_arr.length == 0){
                    this.$message({
                        message: '请选择门店',
                        type: 'error'
                    });
                    this.disabled = false
                    return
                }


                let param = {}

                param = {
                    itemParentId: this.form.itemParentId,
                    name: this.form.name,
                    description: this.form.description,
                    price: this.form.price,
                    treatmentNum: this.form.treatment_num,
                    discount: this.form.discount,
                    // s_id: this.sid,
                    e_id: this.id,
                    fashion: this.form.fashion,
                    item: JSON.stringify(this.comboList),
                    storeId: JSON.stringify(_arr),
                }

                this.disabled = true

                itemAdd(param).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '添加项目成功',
                            type: 'success',
                            onClose:()=>{
                                this.disabled = false
                            }
                        });
                        this.dialogForm = false
                        this.loadData()
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                            onClose:()=>{
                                this.disabled = false
                            }
                        });
                    }
                }).catch(error=>{
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                        onClose:()=>{
                            this.disabled = false
                        }
                    });
                })
            },
            // 编辑
            showRow(item, index){

                //s_id: this.sid,
                itemList({itemsParmentId: item.id, e_id: this.id,}).then(res=>{
                    if(res.status == 0){
                        item.list = res.data.list
                        //set
                        this.$set(this.tableData,index,item)
                        this.curIndex = 0
                    }
                })
                item.showSolt = !item.showSolt
            },

            loadData() {

                //获取门店列表
                storeList({
                    e_id: this.id
                }).then(res=>{
                    if(res.status == 0){
                        let _tmp = res.data

                        for(let i=0; i<_tmp.length; i++){
                            _tmp[i].isSelected = false
                        }
                        this.storeList = _tmp

                        if( res.data.length > 0){
                            this.sid = res.data[0].id
                            itemList({ itemsParmentId: 0, e_id: this.id,}).then(res=>{
                                if(res.status == 0){
                                    let _tmp = res.data.list
                                    this.list = JSON.parse(JSON.stringify(res.data.list))
                                    _tmp.forEach((item) => {
                                        item.showSolt = false
                                    })
                                    this.tableData = _tmp
                                }
                            })
                        }
                    }
                })

            },

            // 打开开户form表单,如果是编辑,则给form赋值
            handleDialogFormOpen(isEdit, item) {
                if (isEdit) {
                    let _tmp = item
                    _tmp.radio = '0'
                    this.$refs.projectForm.form = JSON.parse(JSON.stringify(_tmp));
                    this.$refs.projectForm.isEdit = true;
                }else{
                    this.$refs.projectForm.form = JSON.parse(JSON.stringify({
                        p_id: item.id,
                        radio: '0',
                    }));
                    this.$refs.projectForm.isEdit = false;
                }
                this.$refs.projectForm.dialogForm = true;
            },

            addProject(){

                if(!this.dialogEditCategoriesParam.name){
                    this.$message({
                        message: '请输入大类名称',
                        type: 'error'
                    });
                    return
                }
                let classify_id = this.dialogEditCategoriesParam.classify_name ? this.dialogEditCategoriesParam.classify_name : this.dialogEditCategoriesParam.classify_id

                if(classify_id == undefined){
                    this.$message({
                        message: '请选择品项所属类别',
                        type: 'error'
                    });
                    return;
                }

                if(!this.dialogEditCategoriesParam.name){
                    return
                }

                this.disabled = true

                if(this.isEdit){
                    itemAdd({name: this.dialogEditCategoriesParam.name, itemParentId: 0, itemsId: this.dialogEditCategoriesParam.id, storeId: this.sid, e_id: this.id, classify_id: classify_id, }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '项目修改成功',
                                type: 'success'
                            });
                            this.loadData()
                            this.disabled = false
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false
                        }
                    }).catch(error=>{
                        console.log("addItems no");
                        this.disabled = false
                    })
                }else{
                    let sid = this.dialogEditCategoriesParam.sid | this.sid
                    itemAdd({name: this.dialogEditCategoriesParam.name, itemParentId: 0, storeId: 0, e_id: this.id, classify_id: classify_id, }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '项目新增成功',
                                type: 'success'
                            });
                            this.loadData()
                            this.disabled = false
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error',
                            });
                            this.disabled = false
                        }
                    }).catch(error=>{
                        console.log("addItems2 no");
                        this.disabled = false
                    })
                }
                this.isEdit = false
                this.dialogEditCategories = false

            },

            showDialog(edit, row){
                this.dialogEditCategories = true

                if(row){
                    this.isEdit = true
                    this.dialogEditCategoriesParam = JSON.parse(JSON.stringify(row))
                }else{
                    this.isEdit = false
                    this.dialogEditCategoriesParam = {}
                }

            },

            hideDialog(){
                this.dialogEditCategories = false
            },

        },
        watch: {
            id(){
                this.loadData()
            },
            comboList: {
                deep: true,
                handler: function() {
                    const REG_NUMBER = /^[0-9]*[1-9][0-9]*$/
                    if(this.comboList.length > 0){
                        let _sumPrice = 0
                        let _sumNum = 0
                        for(let i=0; i<this.comboList.length; i++){
                            if(!isNaN(this.comboList[i].price)){
                                _sumPrice+= Number.parseFloat(this.comboList[i].price)
                            }else{
                                _sumPrice+= 0
                            }
                            if(!isNaN(this.comboList[i].treatment_num)){
                                _sumNum+= Number.parseFloat(this.comboList[i].treatment_num)
                            }else{
                                _sumNum+= 0
                            }
                        }
                        this.form.price = _sumPrice
                        this.form.treatment_num = _sumNum
                    }

                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .myTable, .myTable2{border-collapse:collapse; text-align: center; cursor: pointer;}
    .myTable td{ height: 44px; line-height: 44px; border: 1px solid #e1e1e1; padding: 0 5px;}
    .myTable2 td{ height: 44px; line-height: 44px; border-bottom: 1px solid #e1e1e1; border-left:0; border-right:0; border-top: 0; padding: 0 5px;}
</style>
