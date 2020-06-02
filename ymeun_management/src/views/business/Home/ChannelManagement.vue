<template>
  <div class="wb100">
      <div class="clear4"></div>
      <div class="wb100">
          <el-form :inline="true" :model="condition" class="search-form" slot="search">
              <el-button type="primary" @click="showDialog" class="fl">添加大类</el-button>
              <!-- <a href="file/ChannelManagement.xlsx" download="" class="mal10 mar10 fl">
                <el-button type="primary">下载模板</el-button>
              </a> -->
              <!-- <div class="fl mar10">
                  <attachments :eid="id" :sid="sid"></attachments>
              </div> -->
<!--              <el-button type="primary" class="fl" @click="dialogEditCategories2 = true">添加二级渠道</el-button>-->
          </el-form>

          <div class="clear3"></div>

          <!--    列表内容    -->
          <table class="wb100 myTable">
              <thead class="bg-white2">
              <tr>
                  <td>大类名称</td>
                  <td>二级渠道名称</td>
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
                      <td class="fc-blue" @click="showEdit(item)">添加下级</td>
                  </tr>
                  <template v-for="(item2,index2) in item.list" v-if="item.showSolt">
                      <tr class="bg-white1">
                          <td></td>
                          <td>{{item2.name}}</td>
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
<!--              <el-form-item>-->
<!--                  <el-select v-model="dialogEditCategoriesParam.sid" placeholder="请选择门店" readonly="" clearable class="wb100">-->
<!--                      <el-option v-for="item in list2" :label="item.name"-->
<!--                                 :key="item.id"-->
<!--                                 :value="item.id"></el-option>-->
<!--                  </el-select>-->
<!--              </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditCategories = false">取 消</el-button>
              <template v-if="disabled">
                  <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                  <el-button type="primary" @click="addProject">确 定</el-button>
              </template>
          </div>
      </el-dialog>

      <!--   添加&修改二级渠道弹窗   -->
      <el-dialog :title="isEdit ? '修改大类' : '添加二级渠道'" :visible.sync="dialogEditCategories2" width="400px">
          <el-form :model="dialogEditCategoriesParam">
              <el-form-item label>
                  <el-select v-model="form.itemParentId" placeholder="请选择一级渠道" clearable class="wb100">
                      <el-option v-for="item in list" :key="item.key" :label="item.name"
                                 :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label>
                  <el-input v-model="form.name" placeholder="请输入二级渠道名称"></el-input>
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
                      <p class="ma10 pal5 par5 h40px lh40px bd-a1 radius1 text-center text-over-hidden1" :class="item.isSelected ? 'bd-green2' : 'bd-gray'" @click="changeSelected(item, index)">
                          {{item.name}}
                      </p>
                  </div>
              </template>

              <div class="clear0"></div>

          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditCategories2 = false">取 消</el-button>
              <template v-if="disabled">
                  <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                  <el-button type="primary" @click="addProject2">确 定</el-button>
              </template>
          </div>
      </el-dialog>

  </div>
</template>

<script>
    import attachments from '@/components/file-upload2'

    import { channelList, channelAdd, storeList } from  "@/assets/api/home/home"

    export default {
        name: "ChannelManagement",
        props: ['id', ],
        components: {
            attachments
        },
        data() {
            return {
                form: {
                    name:''
                },
                dialogEditCategories: false,
                dialogEditCategories2: false,
                disabled: false,
                dialogEditCategoriesParam: {},
                condition: {
                    p1: '',
                },
                isEdit: false,
                isHideEmpty: false,
                list2: [],
                list: [],
                tableData: [],
                sid: 0,
                currentRow: {},

                selectAll: false,

                projectList: [],

                storeList: [],
            };
        },
        mounted() {
            this.loadData()

            channelList({s_id: this.sid, channelParentId: 0, e_id: this.id,}).then(res=>{
                if(res.status == 0){
                    this.list = res.data.list
                }
            })
        },
        methods: {

            showEdit(item){
                this.dialogEditCategories2 = true;
                this.form.itemParentId = item.id
                this.form.name = ''
                for(let i=0; i<this.storeList.length; i++){
                    this.storeList[i].isSelected = false
                }
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

            showRow(item, index){

                // s_id: this.sid,
                channelList({ channelParentId: item.id, e_id: this.id,}).then(res=>{
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
                        }
                        channelList({ channelParentId: 0, e_id: this.id,}).then(res=>{
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
                })

            },

            // 打开开户form表单,如果是编辑,则给form赋值
            handleDialogFormOpen(isEdit, item) {
                if (isEdit) {
                    let _tmp = item
                    this.$refs.channelForm.form = JSON.parse(JSON.stringify(_tmp));
                    this.$refs.channelForm.isEdit = true;
                }else{
                    this.$refs.channelForm.form = JSON.parse(JSON.stringify({
                        p_id: item.id,
                    }));
                    this.$refs.channelForm.isEdit = false;
                }
                this.$refs.channelForm.dialogForm = true;
            },

            addProject(){

                if(!this.dialogEditCategoriesParam.name){
                    return
                }

                this.disabled = true

                if(this.isEdit){
                    channelAdd({name: this.dialogEditCategoriesParam.name, channelParentId: 0, channelId: this.dialogEditCategoriesParam.id, }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '渠道修改成功',
                                type: 'success',
                                onClose:()=>{
                                    this.disabled = false
                                }
                            });
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
                }else{
                    channelAdd({name: this.dialogEditCategoriesParam.name, channelParentId: 0, storeId: 0, e_id: this.id, }).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '渠道新增成功',
                                type: 'success',
                                onClose:()=>{
                                    this.disabled = false
                                }
                            });
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
                }
                this.isEdit = false
                this.dialogEditCategories = false

            },

            addProject2(){

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

                channelAdd({name: this.form.name, channelParentId: this.form.itemParentId, e_id: this.id,  storeId: JSON.stringify(_arr)}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '二级渠道新增成功',
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
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error',
                    });
                    this.disabled = false
                })
                this.dialogEditCategories2 = false
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
            }
        }
    };
</script>

<style scoped lang="scss">
    .myTable, .myTable2{border-collapse:collapse; text-align: center; cursor: pointer;}
    .myTable td{ height: 44px; line-height: 44px; border: 1px solid #e1e1e1; padding: 0 5px;}
    .myTable2 td{ height: 44px; line-height: 44px; border-bottom: 1px solid #e1e1e1; border-left:0; border-right:0; border-top: 0; padding: 0 5px;}
</style>
