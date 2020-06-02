<template>
  <div class="wb100 f14px bg-white1">
    <div class="pal24 par24 pat20 pab20">
      <div class="pal19 par19 bg-white">
        <div class="wb100">
          <p class="lh50px h50px">
            <span class="fl f16px fc-gray4">品项列表</span>
          </p>

          <div class="clear4"></div>

          <div class="wb100">
            <!--   列表   -->
            <div class="wb100">
              <el-form :inline="true" :model="condition" class="search-form" slot="search">
                <el-form-item label>
                  <el-select v-model="condition.p1" placeholder="选择品项类别" readonly clearable>
                    <el-option key label="全部品项" value></el-option>
                    <el-option v-for="item in $store.getters.projectListMap" :key="item.key" :label="item.value"
                               :value="item.key"></el-option>
                  </el-select>
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
                  <el-button type="primary" @click="dialogSetMoney = true">设置不计业绩</el-button>
                </template>

              </el-form>

              <div class="clear3"></div>

                <el-table :data="list" border ref="myTable"
                      row-key="id"
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                      :row-class-name="tableRowClassName"
                      @row-click="switchExpansion">
                <el-table-column prop="name" align="left" label="名称" width="200px">
                  <template slot-scope="scope">
                    <template v-if="scope.row.children">
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
                  <template slot-scope="scope" v-if="scope.row.children">{{scope.row.classify.title}}</template>
                </el-table-column>
                <el-table-column prop="fashion" align="center" label="品项属性">
                  <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.fashion.label}}</template>
                </el-table-column>
                  <el-table-column prop="price" align="center" label="价格（元）">
                    <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.price | _filterNumFormat}}</template>
                    <!-- <template slot-scope="scope">{{scope.row.price | _filterNumFormat}}</template> -->
                  </el-table-column>
<!--                  <el-table-column prop="activity" align="center" label="活动价（元）">-->
<!--                    <template slot-scope="scope" v-if="scope.row.activity">{{scope.row.activity.activity_price | _filterNumFormat}}</template>-->
<!--                  </el-table-column>-->
                  <el-table-column prop="treatment_num" align="center" label="疗程次数（次）" width="150px">
                    <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.treatment_num}}</template>
                  </el-table-column>
<!--                  <el-table-column prop="sales_volume" align="center" label="销量">-->
<!--                    <template slot-scope="scope">{{ scope.row.sales_volume ? scope.row.sales_volume : '' }}</template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="activity" align="center" label="有效期">-->
<!--                      <template slot-scope="scope" v-if="scope.row.activity">{{scope.row.activity.start_time + '-' + scope.row.activity.end_time}}</template>-->
<!--                  </el-table-column>-->
                  <el-table-column prop="description" align="center" label="备注" width="150px">
                    <template slot-scope="scope">{{ scope.row.description ? scope.row.description : '' }}</template>
                  </el-table-column>
                  <el-table-column prop="member" align="center" label="操作人">
                    <template slot-scope="scope">{{ scope.row.member.name ? scope.row.member.name : '' }}</template>
                  </el-table-column>
                  <template v-if="isSingle">
                      <el-table-column align="center" label="操作" width="180px">
                        <template slot-scope="scope">
                          <p v-if="scope.row.children">
                            <span class="pointer buttonStyle_class"  @click="handleDialogFormOpen(false, scope.row)">添加二级品项</span>
                            <span class="mal10 mar10" style="color: #e5e5e5;">|</span>
                            <span class="pointer buttonStyle_class"  @click="showDialog(true, scope.row)">修改</span>
                          </p>
                          <p v-else>
                            <span class="pointer buttonStyle_class"  @click="handleDialogFormOpen(true, scope.row)">修改</span>
                            <span class="mal10 mar10" style="color: #e5e5e5;">|</span>
                            <span class="pointer buttonStyle_class"  @click="open(scope.row)">{{scope.row.status.value == 1 ? '停用' : '启用'}}</span>
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
            <el-dialog :title="isEdit ? '修改大类' : '添加大类'" :visible.sync="dialogEditCategories" width="300px">
              <el-form :model="dialogEditCategoriesParam" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="大类名称" prop="name">
                  <el-input v-model="dialogEditCategoriesParam.name" placeholder="请输入大类名称"></el-input>
                </el-form-item>
                <el-form-item label="大类简称" prop="alias_name">
                  <el-input v-model="dialogEditCategoriesParam.alias_name" placeholder="请输入大类简称"></el-input>
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

            <!--      设置不计业绩金额      -->
            <el-dialog title="设置不计业绩金额" :visible.sync="dialogSetMoney" width="60%">

              <el-table :data="list" border ref="myTable"
                          row-key="id"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                          height="600px"
                          >
                  <el-table-column prop="name" align="center" label="名称" width="200px">
                    <template slot-scope="scope">
                      <template v-if="scope.row.children">
                              {{scope.row.name}}
                      </template>
                      <template v-else>
                        {{scope.row.name}}
                        <el-checkbox v-model="scope.row.isSelected" class="fl" @change="checkboxChange(scope.row, 0)"></el-checkbox>
                      </template>
                    </template>
                  </el-table-column>

                <el-table-column prop="classify" align="center" label="品项类别">
                  <template slot-scope="scope" v-if="scope.row.children">{{scope.row.classify.title}}</template>
                </el-table-column>
                <el-table-column prop="fashion" align="center" label="品项属性">
                  <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.fashion.label}}</template>
                </el-table-column>
                  <el-table-column prop="price" align="center" label="价格（元）">
                    <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.price | _filterNumFormat}}</template>
                  </el-table-column>
                  <el-table-column prop="treatment_num" align="center" label="疗程次数（次）" width="150px">
                    <template slot-scope="scope" v-if="!scope.row.children">{{scope.row.treatment_num}}</template>
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
    </div>
  </div>
</template>

<script>
import EditCategories from "./EditCategories";

import { addItems, changeStatus, saveValume, changeItemsValume } from  "@/shop/assets/api/manage/manage"

import { getProject, getProgramList } from "@/shop/assets/api/common/common"

export default {
  name: "ProjectManagement",
  components: {
    EditCategories
  },
  data() {
    return {
      dialogEditCategories: false,
      dialogEditCategoriesParam: {},
      dialogSetMoney: false,
      dialogSetMoneyParam: {},
      condition: {
          p1: '',
      },
      isEdit: false,
      isHideEmpty: false,
      disabled: false,
      list: [],

      items_volume: '',
      currentChange: {
        item: {},
          index:0,
      },
      rules:{
        name: [{ required: true, message: '请输入大类名称', trigger: 'change' }],
        alias_name: [{ required: true, message: '请输入大类简称', trigger: 'change' }],
      },
      isSingle: false,
        once: true,

    };
  },
  mounted() {

      getProgramList().then(res=>{
          if(res.status == 0){
              // if(res.data.list.item_change.allowed == 1){
              //     单门店版
              //     this.isSingle = true
              // }else{
              //     门店版
              //     this.isSingle = false
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
              //     this.isSingle = false

              // console.log(this.isSingle)
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
        
 // 项目
      getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
        if(res.status == 0){
          let _tmp = res.data.list
            let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
          this.$store.commit('SET_PROJECTLIST1', res.data.list)
          for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
            _tmp2[i].children = []
          }
          getProject({ start: 1, perpage: 9999,}).then(res2 => {
            if(res2.status == 0){
              let __tmp = res2.data.list
              for(let i=0; i<__tmp.length; i++){
                  __tmp[i].isSelected = __tmp[i].disabled_volume == 0 ? false : true
                for(let j=0; j<_tmp.length; j++){
                  if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                      if(__tmp[i].status.value == 1){
                          _tmp2[j].children.push(__tmp[i])
                      }
                  }
                }
              }

              this.$store.commit('SET_PROJECTLIST', _tmp2)

              this.items_volume = res2.data.items_volume

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

    checkboxChange(item, index){
        let list = this.list
        this.$set(list,index,list[index])



    },

      setItems(flag){

          if(flag){
              //确定

              this.disabled = true

              changeItemsValume({
                  itemsId: this.currentChange.item.id
              }).then(res=>{
                  if(res.status == 0){
                      this.$message({
                          showClose: true,
                          message: "设置不计入业绩成功",
                          type: 'success',
                      });
                      this.disabled = false
                  }
              })

          }else{
              //取消
              let list = this.list

              for(let i=0; i<this.list.length; i++){
                  if(this.list[i].children){
                      for(let j=0; j<this.list[i].children.length; j++){
                          if(this.list[i].children[j].id == this.currentChange.item.id){
                              this.list[i].children[j].isSelected = !this.list[i].children[j].isSelected
                          }
                      }
                  }
              }

              this.$set(list,this.currentChange.index,list[this.currentChange.index])

          }
      },

    setPerformance(){

          //获取所有选中的id
        let _tmp = []

        for(let i=0; i<this.list.length; i++){
            if(this.list[i].children){
                for(let j=0; j<this.list[i].children.length; j++){
                    if(this.list[i].children[j].isSelected){
                        _tmp.push(this.list[i].children[j].id)
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
                    message: '设置不计入业绩成功',
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

    loadData() {

      // 项目
      getProject({ start: 1, perpage: 999, itemsParmentId: 0 }).then(res => {
        if(res.status == 0){
          let _tmp = res.data.list
            let _tmp2 = JSON.parse(JSON.stringify(res.data.list))
          this.$store.commit('SET_PROJECTLIST1', res.data.list)
          for(let i=0; i<_tmp.length; i++){
            _tmp[i].children = []
            _tmp2[i].children = []
          }
          getProject({ start: 1, perpage: 9999,}).then(res2 => {
            if(res2.status == 0){
              let __tmp = res2.data.list
              for(let i=0; i<__tmp.length; i++){
                  __tmp[i].isSelected = __tmp[i].disabled_volume == 0 ? false : true
                for(let j=0; j<_tmp.length; j++){
                  if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                      if(__tmp[i].status.value == 1){
                          _tmp2[j].children.push(__tmp[i])
                      }
                  }
                }
              }

              this.$store.commit('SET_PROJECTLIST', _tmp2)

              this.items_volume = res2.data.items_volume

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

      // this.isSingle = false

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

          this.$refs.categoriesForm.form = JSON.parse(JSON.stringify(row));

          if(row.meal){
            this.$refs.categoriesForm.comboList = JSON.parse(JSON.stringify(row.meal));
          }else{
            this.$refs.categoriesForm.comboList = []
          }

          this.$refs.categoriesForm.isEdit = true;

        }else{
          this.$refs.categoriesForm.form = JSON.parse(JSON.stringify({
            p_id: item.id,
            p_name: item.name,
            style: 0,
            price: '',
            treatment_num: '',
            fashion: {value: 1},
          }));

          this.$refs.categoriesForm.isEdit = false;

          this.$refs.categoriesForm.selectAll = false;
          this.$refs.categoriesForm.comboList = []

        }
        this.$refs.categoriesForm.dialogForm = true;

    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(row.children){
         if (columnIndex === 0 || columnIndex === 1 || columnIndex == 2 ||  columnIndex === 6 || columnIndex === 5 ) {
            return [1, 1];
          } else if(columnIndex === 3){
            return [1, 2];
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

    addProject(){

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disabled = true

          if(this.isEdit){
            addItems({name: this.dialogEditCategoriesParam.name, alias_name: this.dialogEditCategoriesParam.alias_name, itemParentId: 0, itemsId: this.dialogEditCategoriesParam.id }).then(res=>{
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
              console.log("addItems no");
              this.disabled = false
            })
          }else{
            addItems({name: this.dialogEditCategoriesParam.name, alias_name: this.dialogEditCategoriesParam.alias_name,  itemParentId: 0}).then(res=>{
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
              console.log("addItems2 no");
              this.disabled = false
            })
          }
          this.isEdit = false
          this.dialogEditCategories = false

        }
      })

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

        if(item.status.value == 0){
            //启用
            this.$confirm('是否启用该品项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                changeStatus({
                    itemsId: item.id,
                    status: 1,
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
                changeStatus({
                    itemsId: item.id,
                    status: 0,
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
  watch: {
    dateTime(c, o) {
      this.condition.startTime = c[0];
      this.condition.endTime = c[1];
    },

  }
};
</script>

<style scoped lang="scss">
.is-selected {
  color: #1989fa;
}
</style>
