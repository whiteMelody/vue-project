<template>
  <div class="wb100 f14px bg-white1">
    <div class="pal24 par24 pat20 pab20">
      <div class="pal19 par19 bg-white">
        <div class="wb100">
          <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">渠道列表</span>
          </p>

          <div class="clear0"></div>

          <div class="wb100">
            <!--   列表   -->
            <div class="wb100">
              <el-form :inline="true" :model="condition" class="search-form" slot="search">
                <el-form-item label>
                  <el-select v-model="condition.p1" placeholder="选择渠道类别" readonly clearable>
                    <el-option key label="全部渠道" value></el-option>
                    <el-option v-for="item in $store.getters.channelListMap" :key="item.key" :label="item.value"
                               :value="item.key"></el-option>
                  </el-select>
<!--                  <el-select v-model="condition.p2" placeholder="选择下级项目类别" readonly clearable v-if="condition.p1">-->
<!--                    <el-option v-for="item in $store.getters.projectList2Map(condition.p1)" :key="item.key" :label="item.value"-->
<!--                               :value="item.key"></el-option>-->
<!--                  </el-select>-->

                </el-form-item>

                <template v-if="isHideEmpty">
                  <el-button @click="hideEmpty(false)">显示空数据</el-button>
                </template>
                <template v-else>
                  <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
                </template>

                <el-button type="primary" icon="el-icon-search" @click="searchData" class="h32px"></el-button>

                <template v-if="isSingle">
                  <el-button type="primary" @click="showDialog">添加大类</el-button>
                </template>

              </el-form>

              <div class="clear3"></div>

                <el-table slot="list" :data="list" border ref="myTable"
                          row-key="id"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                          :row-class-name="tableRowClassName"
                          :span-method="arraySpanMethod"
                          @row-click="switchExpansion">
                  <el-table-column prop="name" align="left" label="名称">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>

                  <template v-if="isSingle">
                    <el-table-column align="center" label="操作" >
                      <template slot-scope="scope">
                        <p v-if="scope.row.children">
                          <span class="pointer buttonStyle_class" @click="handleDialogFormOpen(false, scope.row)">添加下级渠道</span>
                          <span class="mal10 mar10" style="color: #e5e5e5;">|</span>
                          <span class="pointer buttonStyle_class" @click="showDialog(true, scope.row)">修改</span>
                        </p>
                        <p v-else>
                          <span class="pointer buttonStyle_class" @click="handleDialogFormOpen(true, scope.row)">修改</span>
                          <span class="mal10 mar10" style="color: #e5e5e5;">|</span>
                          <span class="pointer buttonStyle_class" @click="open(scope.row)">{{scope.row.status.value == 1 ? '停用' : '启用'}}</span>
                        </p>
                      </template>

                    </el-table-column>
                  </template>

                </el-table>

                <div class="clear4"></div>

            </div>

            <div class="clear0"></div>

            <!--   添加&修改下级类目   -->
            <edit-categories ref="categoriesForm"></edit-categories>

            <!--   添加&修改大类弹窗   -->
            <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="400px">
              <el-form :model="dialogEditCategoriesParam">
                <el-form-item label>
                  <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
                </el-form-item>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditCategories from "./EditCategories";

import { addChannel, changeStatus, changeChannelStatus } from  "@/shop/assets/api/manage/manage"

import { getStoreChannel, getProgramList } from "@/shop/assets/api/common/common"

export default {
  name: "ChannelManagement",
  components: {
    EditCategories
  },
  data() {
    return {
      dialogEditCategories: false,
        disabled: false,
      dialogEditCategoriesParam: {},
      condition: {
          p1: '',
      },
      isEdit: false,
      isHideEmpty: false,
      list: [],

      isSingle: false,
      once: true,
    };
  },
  mounted() {

    getProgramList().then(res=>{
      if(res.status == 0){
        // if(res.data.list.channel_change.allowed == 1){
        //   单门店版
        //   this.isSingle = true
        // }else{
        //   门店版
        //   this.isSingle = false
        // }
        if(res.data.compose.id == 2){
            //单门店版
            this.isSingle = true
        }else{
            //门店版
          this.isHideEmpty = true
            this.isSingle = false
        }
        this.loadData()
      }
      else{
        this.loadData()
      }
      
    })

  },
  methods: {

    switchExpansion(row) {
      if(row.children){
        if(row.children.length)
          this.$refs.myTable.toggleRowExpansion(row)
      }
    },

    searchData(){

      getStoreChannel({channelParentId: 0, }).then(res => {
        if(res.status == 0){
          let _tmp = res.data.list
          this.$store.commit('SET_CHANNELLIST1', res.data.list)
          for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
          }
          getStoreChannel({channelParentId: -1, }).then(res2 => {
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
                this.list = _tmp

                  let list = this.list.filter(item => item.id == this.condition.p1)
                  this.list = list

            }
          })
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

      tableRowClassName({row, rowIndex}) {
          if(row.children){
              return 'bg-white';
          }else{
              return 'bg-white2';
          }
      },

    hideEmpty(flag){

      this.isHideEmpty = flag
      if(this.isHideEmpty){
        let _tmp = this.list
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].children.length == 0){
            _tmp.splice(i, 1)
          }
        }
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].children.length == 0){
            _tmp.splice(i, 1)
          }
        }
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].children.length == 0){
            _tmp.splice(i, 1)
          }
        }
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].children.length == 0){
            _tmp.splice(i, 1)
          }
        }
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].children.length == 0){
            _tmp.splice(i, 1)
          }
        }
        this.list = _tmp
      }else{
        this.loadData()
      }

    },

    loadData() {
      getStoreChannel({channelParentId: 0,}).then(res => {
        if(res.status == 0){
          let _tmp = res.data.list
          this.$store.commit('SET_CHANNELLIST1', res.data.list)
          for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
          }

          getStoreChannel({channelParentId: -1, }).then(res2 => {
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
                this.list = _tmp

              if(this.once){
                this.once = false
                this.hideEmpty(this.isHideEmpty)
              }

            }
          })

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

    // 打开开户form表单,如果是编辑,则给form赋值
    handleDialogFormOpen(isEdit, item) {
      if (isEdit) {
          let _tmp = item
        this.$refs.categoriesForm.form = JSON.parse(JSON.stringify(_tmp));
        this.$refs.categoriesForm.isEdit = true;
      }else{
        this.$refs.categoriesForm.form = JSON.parse(JSON.stringify({
          p_id: item.id,
        }));
        this.$refs.categoriesForm.isEdit = false;
      }
      this.$refs.categoriesForm.dialogForm = true;
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {

    },

    // hideEmpty(){
    //   let _tmp = this.list
    //   for(let i=0; i<_tmp.length; i++){
    //     if(_tmp[i].children.length == 0){
    //       _tmp.splice(i, 1)
    //     }
    //   }
    //   this.list = _tmp
    // },

    addProject(){

      if(!this.dialogEditCategoriesParam.name){
        return
      }

      this.disabled = true

      if(this.isEdit){
        addChannel({name: this.dialogEditCategoriesParam.name, channelParentId: 0, channelId: this.dialogEditCategoriesParam.id }).then(res=>{
          if(res.status == 0){
            this.$message({
              message: '渠道修改成功',
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
      }else{
        addChannel({name: this.dialogEditCategoriesParam.name, channelParentId: 0}).then(res=>{
          if(res.status == 0){
            this.$message({
              message: '渠道新增成功',
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

  open(item) {

        console.log(item)

        if(item.status.value == 0){
            //启用
            this.$confirm('是否启用该渠道?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              changeChannelStatus({
                    channelId: item.id,
                    status: 1,
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '渠道启用成功',
                            type: 'success'
                        });
                        this.loadData()
                        // item.status.value = 1
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
            })
        }else{
            //禁用
            this.$confirm('是否禁用该渠道?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              changeChannelStatus({
                    channelId: item.id,
                    status: 0,
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            message: '渠道禁用成功',
                            type: 'success'
                        });
                        this.loadData()
                        // item.status.value = 0
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
            })
        }

  }

  },
};
</script>

<style scoped lang="scss">
.is-selected {
  color: #1989fa;
}
</style>
