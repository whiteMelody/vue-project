<template>
  <div class="bg-white wb100 f14px ProjectManagement">
      <div class="wb100">
        <!-- <p class="lh50px h50px">
          <span class="fl f16px fc-gray4">连锁品项列表</span>
        </p>

        <div class="clear0"></div> -->
        <p class="lh40px h40px">
          <span class="fl f14px fc-gray4">连锁品项列表</span>
        </p>

        <div class="clear-f2"></div>
        <div class="clear3"></div>

        <div class="wb100">
          <!--   列表   -->
          <div class="wb100">
            <el-form :inline="true" :model="condition" class="search-form" slot="search">
              <el-form-item label>
                <el-select v-model="condition.itemsParentId" placeholder="选择品项类别" readonly clearable>
                  <el-option key label="全部品项" value></el-option>
                  <el-option v-for="item in projectList" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <!-- <template v-if="isHideEmpty">
                <el-button @click="hideEmpty(false)">显示空数据</el-button>
              </template>
              <template v-else>
                <el-button @click="hideEmpty(true)">隐藏空数据</el-button>
              </template>` -->
              <el-button type="primary" icon="el-icon-search" @click="searchData" class="h32px"></el-button>
              <el-button type="primary" @click="showDialog">添加大类</el-button>
              <el-button type="primary" @click="dialogSetMoney = true">设置不计业绩</el-button>
            </el-form>

            <div class="clear0"></div>

            <base-list ref="demoTable" :condition="condition"
                       :datas.sync="list" :pageSearch="pageSearch" :isPaging="false"  v-on:listLoaded="getLoaded">

              <el-table slot="list" :data="list" border ref="myTable"
                        row-key="id"
                        :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
                        :row-class-name="tableRowClassName"
                        :expand-row-keys="keys"
                        @row-click="switchExpansion"
              >
                <el-table-column prop="name" align="left" label="名称" width="200px">

                  <template slot-scope="scope">
                    <template v-if="scope.row.items">
                              {{scope.row.name}}
                    </template>
                    <template v-else>
                      <span class="fl">{{scope.row.name}}</span>
                      <div v-if="scope.row.disabled_volume == 1" class="bg-red fc-white h20px lh20px text-center radius5 pal5 par5 fl mal10 mat1 f12px">不计入业绩</div>
                      <template v-if="scope.row.style == 0"><div class="bg-green fc-white h20px lh20px text-center radius5 pal5 par5 fl mal10 mat1 f12px">普通类</div></template>
                      <template v-else><div class="bg-orange fc-white h20px lh20px text-center radius5 pal5 par5 fl mal10 mat1 f12px">套餐类</div></template>
                    </template>

                  </template>

                </el-table-column>

                <el-table-column prop="alias_name" align="center" label="简称">
                  <template slot-scope="scope">{{ scope.row.alias_name }}</template>
                </el-table-column>

                <el-table-column prop="classify" align="center" label="品项类别">
                  <template slot-scope="scope" v-if="scope.row.items">{{scope.row.classify.title}}</template>
                </el-table-column>
                <el-table-column prop="fashion" align="center" label="品项属性">
                  <template slot-scope="scope" v-if="!scope.row.items">{{scope.row.fashion.label}}</template>
                </el-table-column>
                <el-table-column prop="price" align="center" label="价格（元）" width="100px">
                  <template slot-scope="scope" v-if="!scope.row.items">{{scope.row.price | _filterNumFormat}}</template>
                </el-table-column>
                <el-table-column prop="treatment_num" align="center" label="疗程次数（次）" width="150px">
                  <template slot-scope="scope" v-if="!scope.row.items">{{scope.row.treatment_num}}</template>
                </el-table-column>
                <el-table-column prop="description" align="center" label="备注" width="150px">
                  <template slot-scope="scope">{{ scope.row.description ? scope.row.description : '' }}</template>
                </el-table-column>
                <el-table-column prop="member" align="center" label="操作人" width="100px">
                  <template slot-scope="scope">
                    <p v-if="scope.row.items">
                      {{ scope.row.member.name ? scope.row.member.name : '' }}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column align="left" label="操作" width="360px">
                  <template slot-scope="scope">
                    <p v-if="scope.row.items" class="pointer">
                      <span class="fc-green2 fl" @click="handleDialogFormOpen(false, scope.row)">添加下级类目</span>
                      <span class="mal10 mar10 fc-gray fl">|</span>
                      <span class="fc-green2 fl" @click="showDialog(true, scope.row)">修改</span>
                      <span class="mal10 mar10 fc-gray fl">|</span>
                      <span v-if="scope.row.status.value == 1" class="fc-red5 fl" @click="open(scope.row,1)">停用</span>
                      <span class="fc-white3 fl" v-else>已停用</span>
                    </p>
                    <p v-else>
                      <span class="fc-green2 fl" @click="handleDialogFormOpen(true, scope.row)">修改</span>
                      <span class="mal10 mar10 fc-gray fl">|</span>
                      <span v-if="scope.row.status == 1" class="fc-red5 fl" @click="open(scope.row,1)">停用</span>
                      <span class="fc-white3 fl" v-else>已停用</span>
                    </p>
                  </template>
                </el-table-column>
              </el-table>

            </base-list>

            <div class="clear4"></div>

          </div>

          <div class="clear0"></div>

          <!--   添加&修改下级类目   -->
          <edit-project ref="editProject"></edit-project>

          <!--   添加&修改大类弹窗   -->
          <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="380px">
            <div class="dialog_xian"></div>
            <el-form :model="dialogEditCategoriesParam" :rules="rules" ref="form" label-width="80px">
              <el-form-item label="大类名称" prop="name">
                <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
              </el-form-item>
              <el-form-item label="大类简称" prop="alias_name">
                <el-input v-model="dialogEditCategoriesParam.alias_name" placeholder="请输入大类简称"></el-input>
              </el-form-item>

              <div class="project_type">
                <p class="fz14px pat10 bd-t1 bd-gray">请选择品项所属类别</p>
                <el-form-item label v-if="projectLabel.length > 0" label-width="0">
                  <el-radio-group v-model="dialogEditCategoriesParam.classify_id">
                    <el-radio v-for="(item , index) in projectLabel" :key="index" :label="item.id" class="mat10" style="min-width: 75px;">{{item.title}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label label-width="0">
                  <el-input v-model="dialogEditCategoriesParam.classify_name" placeholder="请输入新增类别"></el-input>
                </el-form-item>
                <span class="fc-red5 f14px">注：如果已有类别不满足业务需求，可以在输入框自行输入点击 确定并新增。</span>
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

          <!--      设置不计业绩金额      -->
          <el-dialog title="设置不计业绩金额" :visible.sync="dialogSetMoney" width="60%">
            <div class="dialog_xian"></div>
            <el-table :data="list" border ref="myTable"
                      row-key="id"
                      :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
                      :row-class-name="tableRowClassName"
                      :expand-row-keys="keys"
                      height="500px"
            >
              <el-table-column prop="name" align="left" label="名称" width="200px">

                <template slot-scope="scope">
                  <template v-if="scope.row.items">
                    {{scope.row.name}}
                  </template>
                  <template v-else>
                    <el-checkbox v-model="scope.row.isSelected" class="fl" @change="checkboxChange(scope.row, 0)"></el-checkbox>
                    <span >
                          {{scope.row.name}}
                        </span>
                  </template>
                </template>

              </el-table-column>
              <el-table-column prop="classify" align="center" label="品项类别">
                <template slot-scope="scope" v-if="scope.row.items">{{scope.row.classify.title}}</template>
              </el-table-column>
              <el-table-column prop="fashion" align="center" label="品项属性">
                <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.fashion.label}}</template>
              </el-table-column>
              <el-table-column prop="price" align="center" label="价格（元）">
                <template slot-scope="scope" v-if="scope.row.price">{{scope.row.price | _filterNumFormat}}</template>
              </el-table-column>
              <el-table-column prop="treatment_num" align="center" label="疗程次数（次）" width="150px">
                <template slot-scope="scope">{{scope.row.treatment_num ? scope.row.treatment_num : ''}}</template>
              </el-table-column>
              <el-table-column prop="description" align="center" label="备注" width="150px">
                <template slot-scope="scope">{{ scope.row.description ? scope.row.description : '' }}</template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogSetMoney = false">取 消</el-button>
              <template v-if="disabled">
                <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                <el-button type="primary" @click="setPerformance">确 定</el-button>
              </template>
            </div>
          </el-dialog>

        </div>
      </div>
    </div>
</template>

<script>

import { itemsList , itemsAdd , itemsChangeStatus, getListItems, saveValume, changeItemsValume , getList } from "@/chain/assets/api/projectManagement/projectManagement"

import EditProject from "./EditProject"

  export default {
    name: "ProjectManagement",
    components: {
      EditProject
    },
    data() {
      return {
        dialogEditCategories: false,
        dialogEditCategoriesParam: {
          name: '',
          alias_name: '',
          is_store: 1,
          classify_id: 1,
        },
        dialogSetMoney: false,
        dialogSetMoneyParam: {},
        dialogConfirm: false,
        dialogConfirmChange: true,

        condition: {
          itemsParentId: '',
          status: -1
        },

        rules:{
          name: [{ required: true, message: '请输入大类名称', trigger: 'change' }],
          alias_name: [{ required: true, message: '请输入大类简称', trigger: 'change' }],
        },

        pageSearch: itemsList,

        isEdit: false,
        isHideEmpty: false,
        disabled: false,
        list: [],
        list2: [],
        items_volume: '',
        currentChange: {
          item: {},
          index:0,
        },
        keys: [],

        projectList: [],

        storeList: [],

        projectLabel:[],
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

      //品项标签
      getListFn(){
        getList({}).then(res=>{
          if(res.status == 0){
            this.projectLabel = res.data.list
            // if(res.data.list.length > 0)
            //   this.dialogEditCategoriesParam.classify_id = res.data.list[0].id
          }
        })
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
        let list2 = this.list2.filter(item => item.id == this.condition.itemsParentId)
        this.list = list2
        if(this.list.length == 0 ){
          this.loadData()
        }else{
          this.list = JSON.parse(JSON.stringify(list2))
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
      },

      setItems(flag){

        this.dialogConfirmChange = this.currentChange.item.isSelected

        if(flag){
          //确定

          this.disabled = true

          changeItemsValume({
            itemsId: this.currentChange.item.id
          }).then(res=>{
            if(res.status == 0){
              this.$message({
                showClose: true,
                message: this.dialogConfirmChange ?  '"'+ this.currentChange.item.name +'"设置为计入成功' : '"'+ this.currentChange.item.name +'"设置为不计入业绩成功',
                type: 'success',
              });
              this.disabled = false
              this.dialogConfirm = false
            }
          })

        }else{
          //取消
          let list = this.list

          for(let i=0; i<this.list.length; i++){
            if(this.list[i].items){
              for(let j=0; j<this.list[i].items.length; j++){
                if(this.list[i].items[j].id == this.currentChange.item.id){
                  this.list[i].items[j].isSelected = !this.list[i].items[j].isSelected
                }
              }
            }
          }

          this.$set(list,this.currentChange.index,list[this.currentChange.index])

          this.dialogConfirm = false

        }
      },

      setPerformance(){

        //获取所有选中的id
        let _tmp = []

        for(let i=0; i<this.list.length; i++){
          if(this.list[i].items){
            for(let j=0; j<this.list[i].items.length; j++){
              if(this.list[i].items[j].isSelected){
                _tmp.push(this.list[i].items[j].id)
              }
            }
          }
        }

        this.disabled = true

        saveValume({
          volume: 0,
          itemsIds: _tmp.join(',')
        }).then(res=>{
          if(res.status == 0){
            this.$message({
              showClose: true,
              message: '设置成功',
              type: 'success',
              onClose:()=>{
                this.disabled = false
                this.dialogSetMoney = false
                this.loadData()
              }
            });
          }
        })

      },

      //列表外赋值
      getLoaded(data){
        let _tmp = data.list.filter(item => item.status.value != 0)

        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].items){
            _tmp[i].items = _tmp[i].items.filter(item => item.status != 0)
            for(let j=0; j<_tmp[i].items.length; j++){
              _tmp[i].items[j].isSelected = _tmp[i].items[j].disabled_volume  == 0 ? false : true
            }
          }
        }
        this.items_volume = data.items_volume
        // let _arr = _tmp.filter(item => item.status.value == 1)
        this.list = _tmp
        this.list2 = JSON.parse( JSON.stringify(_tmp) )
      },

      loadData() {
        
        this.$refs.demoTable.loadData()

        // 品项
        getListItems({ itemsParentId: 0, status: -1,}).then(res => {
          if(res.status == 0){

            let _tmp = res.data.list.filter(item => item.status.value != 0)

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
                }
              }
            }
          }

          if(row.style){
            row.style = 1
          }else{
            row.style = 0
          }

          row.p_name = this.list.find(item => item.id == row.p_id).name

          this.$refs.editProject.form = JSON.parse(JSON.stringify(row));

          if(row.meal){
            this.$refs.editProject.comboList = JSON.parse(JSON.stringify(row.meal));
          }else{
            this.$refs.editProject.comboList = []
          }

          this.$refs.editProject.isEdit = true;
        }else{
          this.$refs.editProject.form = JSON.parse(JSON.stringify({
            p_id: item.id,
            p_name: item.name,
            style: 0,
            price: '',
            treatment_num: '',
            fashion: {value: 1},
          }));

          this.$refs.editProject.isEdit = false;

          this.$refs.editProject.selectAll = false;
          this.$refs.editProject.comboList = []
        }
        this.$refs.editProject.dialogForm = true;
      },

      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if(row.items){
          if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6 || columnIndex === 5 ) {
            return [1, 1];
          } else if(columnIndex === 2){
            return [1, 3];
          } else{
            return [0, 0];
          }
        }else{
          return [1, 1];
        }
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
          this.$message({
            message: '请输入大类名称',
            type: 'error'
          });
          return
        }

        if(!this.dialogEditCategoriesParam.alias_name){
          this.$message({
            message: '请输入大类简称',
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

        this.disabled = true

        if(this.isEdit){
          itemsAdd({
            name: this.dialogEditCategoriesParam.name,
            alias_name: this.dialogEditCategoriesParam.alias_name,
            itemsParentId: 0,
            itemsId: this.dialogEditCategoriesParam.id, 
            command: this.dialogEditCategoriesParam.command, 
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            classify_id:classify_id
          }).then(res=>{
            if(res.status == 0){
              this.$message({
                message: '品项修改成功',
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

          itemsAdd({
            name: this.dialogEditCategoriesParam.name,
            alias_name: this.dialogEditCategoriesParam.alias_name,
            itemsParentId: 0,
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            classify_id:classify_id
          }).then(res=>{
            if(res.status == 0){
              this.$message({
                message: '品项新增成功',
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
        this.getListFn()
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
          this.$confirm('是否启用该品项?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            itemsChangeStatus({
              itemsId: item.id,
              status: 1,
              command: item.command,
            }).then(res=>{
              if(res.status == 0){
                this.$message({
                  message: '品项启用成功',
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
          this.$confirm('是否禁用该品项?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            itemsChangeStatus({
              itemsId: item.id,
              status: 0,
              command: item.command,
            }).then(res=>{
              if(res.status == 0){
                this.$message({
                  message: '品项禁用成功',
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

<style scoped lang="scss">
  .is-selected {
    color: #1989fa;
  }
</style>

<style>
.ProjectManagement .el-dialog .el-dialog__header{
  padding: 10px 20px;
}

.ProjectManagement .el-dialog .el-dialog__header .el-dialog__title{
  font-size: 16px;
}
.ProjectManagement .el-dialog .el-dialog__body{
  padding: 0 20px;
}
.ProjectManagement .el-dialog .el-dialog__body .dialog_xian{
  padding-top: 14px;
  border-top: 1px solid #e5e5e5;
}
.ProjectManagement .timer_border .el-date-editor input{
  border: 0 !important;
  background: none !important;
  text-align: left;
}
.ProjectManagement .el-form .el-input--small .el-input__inner{
  padding-right: 0 !important;
}

</style>

