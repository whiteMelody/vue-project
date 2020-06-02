<template>
  <div class="bg-white wb100 f14px">
      <div class="wb100">
        <p class="lh50px h50px">
          <span class="fl f16px fc-gray4">连锁项目列表</span>
        </p>

        <div class="clear0"></div>

        <div class="wb100">
          <!--   列表   -->
          <div class="wb100">
            <el-form :inline="true" :model="condition" class="search-form" slot="search">
              <el-form-item label>
                <el-select v-model="condition.itemsParentId" placeholder="选择项目类别" readonly clearable>
                  <el-option key label="全部项目" value></el-option>
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
                        :span-method="arraySpanMethod"
                        :expand-row-keys="keys"
              >
                <el-table-column prop="name" align="left" label="名称" width="200px">

                  <template slot-scope="scope">
                    <template v-if="scope.row.items">
                              {{scope.row.name}}
                    </template>
                    <template v-else>
                        <el-checkbox v-model="scope.row.isSelected" class="fl" @change="checkboxChange(scope.row, 0)" :disabled="scope.row.price <= items_volume"></el-checkbox>
                        <span >
                          {{scope.row.name}}
                        </span>
                    </template>
                  </template>

                </el-table-column>
                <el-table-column prop="price" align="center" label="价格（元）">
                  <template slot-scope="scope" v-if="scope.row.price">{{scope.row.price | _filterNumFormat}}</template>
                </el-table-column>
                <el-table-column prop="treatment_num" align="center" label="疗程次数（次）">
                  <template slot-scope="scope">{{scope.row.treatment_num ? scope.row.treatment_num : ''}}</template>
                </el-table-column>
                <el-table-column prop="description" align="center" label="备注" width="150px">
                  <template slot-scope="scope">{{ scope.row.description ? scope.row.description : '' }}</template>
                </el-table-column>
                <el-table-column prop="member" align="center" label="操作人">
                  <template slot-scope="scope">
                    <p v-if="scope.row.items">
                      {{ scope.row.member.name ? scope.row.member.name : '' }}
                    </p>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300px">
                  <template slot-scope="scope">
                    <p v-if="scope.row.items">
                      <span class="pointer buttonStyle_class"  @click="handleDialogFormOpen(false, scope.row)">
                        <i class="iconfont icontianjia fc-green2"></i>添加下级类目
                      </span>
                      <span class="mal10 mar10" style="color: #e5e5e5;">|</span>
                      <span class="pointer buttonStyle_class"  @click="showDialog(true, scope.row)">
                        <i class="iconfont iconxiugai fc-orange"></i>修改
                      </span>
                      <span class="mal10 mar10" style="color: #e5e5e5;">|</span>

                       <template v-if="scope.row.status.value == 1">
                        <span class="pointer fc-pink3" @click="open(scope.row,1)">
                          <i class="iconfont iconjinzhi fc-pink3"></i>
                          停用
                        </span>
                      </template>
                      <template v-else>
                        <span class="fc-gray3">
                          <i class="iconfont iconjinzhi fc-gray3"></i>
                          已停用
                        </span>
                      </template>
                      
                    </p>
                    <p v-else>
                      <span class="pointer"  @click="handleDialogFormOpen(true, scope.row)"><i class="iconfont iconxiugai fc-orange"></i>修改</span>
                      <span class="mal10 mar10" style="color: #e5e5e5;">|</span>

                      <template v-if="scope.row.status == 1">
                        <span class="pointer fc-pink3" @click="open(scope.row,1)">
                          <i class="iconfont iconjinzhi fc-pink3"></i>
                          停用
                        </span>
                      </template>

                      <template v-else>
                        <span class="fc-gray3">
                          <i class="iconfont iconjinzhi fc-gray3"></i>
                          已停用
                        </span>
                      </template>

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
          <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="400px">
            <el-form :model="dialogEditCategoriesParam">
              <el-form-item label>
                <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
              </el-form-item>
<!--              <el-form-item label>-->
<!--                <el-select class="wb100" v-model="dialogEditCategoriesParam.is_store" placeholder="请选择种类" clearable disabled>-->
<!--                  <el-option :key="1" label="企业" :value="1"></el-option>-->
<!--                  <el-option :key="2" label="门店" :value="2"></el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->

<!--              <div v-show="dialogEditCategoriesParam.is_store == 2" class="wb100">-->
<!--                <div class="clear0 bd-gray bd-b1"></div>-->
<!--                <div class="wb100 h50px lh50px">-->
<!--                  请选择需要添加的门店-->
<!--                </div>-->
<!--                <template v-for="(item, index) in storeList">-->
<!--                  <div class="wb50 fl">-->
<!--                    <p class="ma10 pal5 par5 h40px lh40px bd-a1 radius1 text-center text-over-hidden1" :class="item.isSelected ? 'bd-green2' : 'bd-gray'" @click="changeSelected(item, index)">-->
<!--                      {{item.name}}-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </template>-->
<!--              </div>-->

              <div class="project_type">
                <p class="fz14px pat10 bd-t1 bd-gray">请选择项目所属类别</p>
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

          <!--      设置不计业绩金额      -->
          <el-dialog title="设置不计业绩金额" :visible.sync="dialogSetMoney" width="300px">
            <el-form :model="dialogSetMoneyParam">
              <el-form-item label>
                <el-input-number v-model="items_volume" :min="0" :precision="2" :controls="false" class="wb100" placeholder="请设置不计业绩金额"></el-input-number>
              </el-form-item>
            </el-form>
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

          <!--      设置不计入业绩金额（询问框）        -->
          <el-dialog title="系统提示" :close-on-click-modal="false" :show-close="false" :visible.sync="dialogConfirm" width="300px">

            <div class="wb100">
              {{ dialogConfirmChange ? '确定将"'+ currentChange.item.name +'"设置为计入业绩？' : '确定将"'+ currentChange.item.name +'"设置为不计入业绩？'}}
            </div>

            <div slot="footer" class="dialog-footer">
              <template v-if="disabled">
                <el-button disabled>取 消</el-button>
                <el-button type="primary" disabled>提交中...</el-button>
              </template>
              <template v-else>
                <el-button @click="setItems(false)">取 消</el-button>
                <el-button type="primary" @click="setItems(true)">确 定</el-button>
              </template>
            </div>
          </el-dialog>

        </div>
      </div>
    </div>
</template>

<script>

import { itemsList , itemsAdd , itemsChangeStatus, getListItems, saveValume, changeItemsValume , getList } from "../../assets/api/projectManagement/projectManagement"

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
          is_store: 1,
        },
        dialogSetMoney: false,
        dialogSetMoneyParam: {},
        dialogConfirm: false,
        dialogConfirmChange: true,

        condition: {
          itemsParentId: '',
          status: -1
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
      //项目标签
      getListFn(){
        getList({}).then(res=>{
          if(res.status == 0){
            this.projectLabel = res.data.list
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

        this.currentChange = {
          item,
          index,
        }

        this.dialogConfirm = true

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
                message: this.dialogConfirmChange ?  '"'+ this.currentChange.item.name +'"设置为不计入成功' : '"'+ this.currentChange.item.name +'"设置为计入业绩成功',
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
          volume: this.items_volume,
          itemsIds: _tmp.join(',')
        }).then(res=>{
          if(res.status == 0){
            this.$message({
              showClose: true,
              message: '设置不计入金额业绩成功',
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
        let _tmp = data.list
        for(let i=0; i<_tmp.length; i++){
          if(_tmp[i].items){
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

        // 项目
        getListItems({ itemsParentId: 0, status: -1,}).then(res => {
          if(res.status == 0){

            let _tmp = res.data.list

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
            style: 0,
            price: '',
            treatment_num: '',
          }));

          this.$refs.editProject.isEdit = false;

          this.$refs.editProject.comboList = []
        }
        this.$refs.editProject.dialogForm = true;
      },

      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if(row.items){
          if (columnIndex === 0) {
            return [1, 5];
          } else if(columnIndex === 5){
            return [1, 1];
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
        let classify_id = this.dialogEditCategoriesParam.classify_name ? this.dialogEditCategoriesParam.classify_name : this.dialogEditCategoriesParam.classify_id

        if(classify_id == undefined){
          this.$message({
            message: '请选择项目所属类别',
            type: 'error'
          });
          return;
        }

        this.disabled = true

        if(this.isEdit){
          itemsAdd({
            name: this.dialogEditCategoriesParam.name, 
            itemsParentId: 0, 
            itemsId: this.dialogEditCategoriesParam.id, 
            command: this.dialogEditCategoriesParam.command, 
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            classify_id:classify_id
          }).then(res=>{
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
            console.log("itemsAdd no");
            this.disabled = false
          })
        }else{

          itemsAdd({
            name: this.dialogEditCategoriesParam.name, 
            itemsParentId: 0, 
            is_store: this.dialogEditCategoriesParam.is_store, 
            storeId: JSON.stringify(_arr),
            classify_id:classify_id
          }).then(res=>{
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
          this.$confirm('是否启用该项目?', '提示', {
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
                  message: '项目启用成功',
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
          this.$confirm('是否禁用该项目?', '提示', {
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
                  message: '项目禁用成功',
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
