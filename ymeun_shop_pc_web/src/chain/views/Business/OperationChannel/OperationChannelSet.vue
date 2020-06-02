<template>
  <div class="OperationChannelSet">
      <header>营销中心渠道列表</header>
      <div class="clear-f2 mab14"></div>
      <div class="wb100">
        <!--   列表   -->
        <div class="wb100">
          <el-form :inline="true" :model="condition" class="search-form" slot="search">
            <el-form-item label>
              <el-select v-model="condition.channelParentId" placeholder="选择渠道类别" readonly clearable>
                <el-option key label="全部渠道" value></el-option>
                <el-option v-for="item in projectList" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>

            <el-button type="primary" @click="showDialog">添加大类</el-button>

          </el-form>

          <div class="clear0"></div>

          <base-list ref="demoTable" :condition="condition"
                      :datas.sync="list" :pageSearch="pageSearch" :isPaging="true" >

            <el-table slot="list" :data="list" border ref="myTable"
                      row-key="id"
                      :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
                      :row-class-name="tableRowClassName"
                      :span-method="arraySpanMethod"
                      :expand-row-keys="keys"
                      @row-click="switchExpansion"
            >
              <el-table-column prop="name" align="left" label="名称">

                <template slot-scope="scope">
                  <template v-if="scope.row.items">
                        <span @click="swicthRow(scope.row)">
                            {{scope.row.name}}
                        </span>
                  </template>
                  <template v-else>
                    {{scope.row.name}}
                  </template>
                </template>

              </el-table-column>

              <el-table-column align="left" label="操作">

                <template slot-scope="scope">
                  <p v-if="scope.row.items" class="pointer">
                    <span class="fc-green2 fl" @click="handleDialogFormOpen(false, scope.row)">添加下级类目</span>
                    <span class="mal10 mar10 fc-gray fl">|</span>
                    <span class="fc-green2 fl" @click="showDialog(true, scope.row)">修改</span>
                  </p>
                  <p v-else>
                    <span class="fc-green2 fl" @click="handleDialogFormOpen(true, scope.row)">修改</span>
                  </p>
                </template>

              </el-table-column>
            </el-table>

          </base-list>

          <div class="clear4"></div>

        </div>

        <div class="clear0"></div>

        <!--   添加&修改下级类目   -->
        <edit-channel ref="editChannel"></edit-channel>

        <!--   添加&修改大类弹窗   -->
        <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="335px" class="myDialog">

          <div class="clear4 bd-gray bd-t1"></div>

          <el-form :model="dialogEditCategoriesParam" label-width="80px">
            <el-form-item label="大类名称">
              <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
            </el-form-item>

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

          <div class="clear0"></div>

        </el-dialog>
      </div>
    </div>
</template>

<script>

import { channelList, channelAdd, channelChangeStatus, getListChannel  } from "@/chain/assets/api/channelManagement/channelManagement"

import EditChannel from "./EditChannel"

  export default {
    name: "OperationChannelSet",
    components: {
      EditChannel
    },
    data() {
      return {
        dialogEditCategories: false,
        dialogEditCategoriesParam: {
          name: '',
          is_store: 1,
        },
        dialogSetMoney: false,
        dialogSetMoneyParam: {},
        dialogConfirm: false,
        dialogConfirmChange: true,

        condition: {
          channelParentId: '',
          status: -1,
          chain:1
        },
        pageSearch: channelList,
        isEdit: false,
        isHideEmpty: false,
        disabled: false,
        list: [],
        items_volume: '',
        currentChange: {
          item: {},
          index:0,
        },
        keys: [],

        projectList: [],

        storeList: [],

      };
    },
    mounted() {
      this.loadData()

      //获取门店列表
      this.$postRequest("/post/api/store/getStore").then(res => {
        if(res.status == 0){
          let _tmp = res.data
          for(let i=0; i<_tmp.length; i++){
            _tmp[i].isSelected = false
          }
          this.storeList = _tmp
        }
      })

    },
    methods: {

        switchExpansion(row) {
            if(row.items){
                if(row.items.length)
                    this.$refs.myTable.toggleRowExpansion(row)
            }
        },

      changeSelected(item, index){

        let storeList = this.storeList
        item.isSelected = !item.isSelected
        this.$set(storeList,index,item)
      },

      swicthRow(row){
        this.$refs.myTable.toggleRowExpansion(row)
      },

      searchData(){
        let list = this.list.filter(item => item.id == this.condition.channelParentId)
        this.list = list
        if(list.length == 0 ){
          this.loadData()
        }
      },

      tableRowClassName({row, rowIndex}) {
        if(row.items){
          return 'bg-white';
        }else{
          return 'bg-white2';
        }
      },

      checkboxChange(item, index){
        let list = this.list
        this.$set(list,index,list[index])

        this.currentChange = {
          item,
          index,
        }

        this.dialogConfirm = true

      },

      loadData() {

        this.$refs.demoTable.loadData()

        getListChannel({ channelParentId: 0 , status: -1,chain:1}).then(res => {
          if(res.status == 0){

            let _tmp = res.data.list
            
            // let _arr = _tmp.filter(item => item.status.value == 1)
            // this.list = _arr

            this.projectList = _tmp

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

        // channelList({ start: 1, perpage: 999, channelParentId: this.condition.p1, }).then(res => {
        //   if(res.status == 0){
        //
        //     let _tmp = res.data.list
        //
        //     for(let i=0; i<_tmp.length; i++){
        //       if(_tmp[i].items){
        //         for(let j=0; j<_tmp[i].items.length; j++){
        //           _tmp[i].items[j].isSelected = _tmp[i].items[j].disabled_volume  == 0 ? false : true
        //         }
        //       }
        //     }
        //
        //     this.items_volume = res.data.items_volume
        //
        //     this.list = _tmp
        //
        //   }else{
        //     this.$message({
        //       showClose: true,
        //       message: res.msg,
        //       type: 'error',
        //     });
        //   }
        // }).catch(error=>{
        //   this.$message({
        //     showClose: true,
        //     message: error,
        //     type: 'error',
        //   });
        // })

      },

      // 打开开户form表单,如果是编辑,则给form赋值
      handleDialogFormOpen(isEdit, item) {

        if (isEdit) {
          let row = item

          //查询当前row
          for(let i=0; i<this.list.length; i++){
            if(this.list[i].items){
              for(let j=0; j<this.list[i].items.length; j++){
                if(row.id == this.list[i].items[j].id){
                  row.p_id = this.list[i].id
                  row.p_name = this.list[i].name
                }
              }
            }
          }

          this.$refs.editChannel.form = JSON.parse(JSON.stringify(row));
          this.$refs.editChannel.isEdit = true;
        }else{
          this.$refs.editChannel.form = JSON.parse(JSON.stringify({
            p_id: item.id,
              p_name: item.name,
          }));
          this.$refs.editChannel.isEdit = false;
        }

        this.$refs.editChannel.dialogForm = true;
      },

      arraySpanMethod({ row, column, rowIndex, columnIndex }) {

      },

      hideEmpty(flag){
        this.isHideEmpty = flag
        if(this.isHideEmpty){
          let _tmp = this.list
          for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].items.length == 0){
              _tmp.splice(i, 1)
            }
          }
          for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].items.length == 0){
              _tmp.splice(i, 1)
            }
          }
          for(let i=0; i<_tmp.length; i++){
            if(_tmp[i].items.length == 0){
              _tmp.splice(i, 1)
            }
          }
          this.list = _tmp
        }else{
          this.loadData()
        }
      },

      addProject(){

        let _arr = []

        //新增大类

        if(this.dialogEditCategoriesParam.is_store == 1){
          //企业
        }else{
          //门店
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
            return
          }

        }

        if(!this.dialogEditCategoriesParam.name){
          return
        }

        this.disabled = true

        if(this.isEdit){
          channelAdd({
            name: this.dialogEditCategoriesParam.name, 
            channelParentId: 0, 
            channelId: this.dialogEditCategoriesParam.id, 
            command: this.dialogEditCategoriesParam.command,  
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            chain:1
          }).then(res=>{
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
            console.log("itemsAdd no");
            this.disabled = false
          })
        }else{


          channelAdd({
            name: this.dialogEditCategoriesParam.name, 
            channelParentId: 0, 
            channelId: this.dialogEditCategoriesParam.id,  
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            chain:1
            }).then(res=>{
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
            console.log(error);
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
          this.dialogEditCategoriesParam.is_store = 1
        }else{
          this.isEdit = false
          this.dialogEditCategoriesParam = {
            name: '',
            is_store: 1,
          }
        }

      },

      hideDialog(){
        this.dialogEditCategories = false
      },

      open(item,type) {

        if(type == 0){
          //启用
          this.$confirm('是否启用该渠道?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            channelChangeStatus({
              channelId: item.id,
              status: 1,
              command: item.command,
            }).then(res=>{
              if(res.status == 0){
                this.$message({
                  message: '渠道启用成功',
                  type: 'success',
                });
                // item.status.value = 1
                this.loadData()
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
            channelChangeStatus({
              channelId: item.id,
              status: 0,
              command: item.command,
            }).then(res=>{
              if(res.status == 0){
                this.$message({
                  message: '渠道禁用成功',
                  type: 'success'
                });
                // item.status.value = 0
                this.loadData()
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

      },

    },
  };
</script>

<style lang="scss">
.OperationChannelSet {
  margin: 20px;
  padding: 0 20px 20px;
  background: #fff;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}
</style>

<style scoped lang="scss">
  .is-selected {
    color: #1989fa;
  }
</style>
