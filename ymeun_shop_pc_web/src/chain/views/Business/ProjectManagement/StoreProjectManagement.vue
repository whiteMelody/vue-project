<template>
  <div class="bg-white wb100 f14px">

  </div>
</template>

<script>
import {
  itemsList,
  itemsAdd,
  itemsChangeStatus,
  getListItems,
  saveValume,
  changeItemsValume
} from "@/chain/assets/api/projectManagement/projectManagement";

import EditProject from "./EditProject";

export default {
  name: "ProjectManagement",
  components: {
    EditProject
  },
  data() {
    return {
      dialogEditCategories: false,
      dialogEditCategoriesParam: {
        name: "",
        is_store: 2
      },
      dialogSetMoney: false,
      dialogSetMoneyParam: {},
      dialogConfirm: false,
      dialogConfirmChange: true,
      isAutoLoad: false,

      condition: {
        itemsParentId: "",
        is_store_settings: 1
      },
      pageSearch: itemsList,
      isEdit: false,
      isHideEmpty: false,
      disabled: false,
      list: [],
      items_volume: "",
      currentChange: {
        item: {},
        index: 0
      },
      keys: [],

      projectList: [],

      storeList: []
    };
  },
  // 创建完毕状态
  created() {},

  mounted() {
    //获取门店列表
    this.$postRequest("/post/api/store/getStore").then(res => {
      if (res.status == 0) {
        let _tmp = res.data;
        for (let i = 0; i < _tmp.length; i++) {
          _tmp[i].isSelected = false;
        }
        this.condition.storeId = _tmp[0].id;
        this.storeList = _tmp;
        this.loadData();
      }
    });

    // 品项
    getListItems({
      itemsParentId: 0,
      storeId: this.condition.storeId,
      is_store_settings: 1
    })
    .then(res => {
      if (res.status == 0) {
        let _tmp = res.data.list;

        this.projectList = _tmp;
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: "error"
        });
      }
    })
    .catch(error => {
      this.$message({
        showClose: true,
        message: error,
        type: "error"
      });
    });


  },
  methods: {
    changeStore() {
      this.isAutoLoad = true;

      // this.loadData()

      //获取品项

      // 品项
      getListItems({
        itemsParentId: 0,
        storeId: this.condition.storeId,
        is_store_settings: 1
      })
        .then(res => {
          if (res.status == 0) {
            let _tmp = res.data.list;
            this.projectList = _tmp;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },

    changeSelected(item, index) {
      let storeList = this.storeList;
      item.isSelected = !item.isSelected;
      this.$set(storeList, index, item);
    },

    swicthRow(row) {
      this.$refs.myTable.toggleRowExpansion(row);
    },

    searchData() {
      let list = this.list.filter(
        item => item.id == this.condition.itemsParentId
      );
      this.list = list;
      if (list.length == 0) {
        this.loadData();
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.items) {
        return "bg-white";
      } else {
        return "bg-white2";
      }
    },

    checkboxChange(item, index) {
      let list = this.list;
      this.$set(list, index, list[index]);

      this.currentChange = {
        item,
        index
      };

      this.dialogConfirm = true;
    },

    setItems(flag) {
      this.dialogConfirmChange = this.currentChange.item.isSelected;

      if (flag) {
        //确定

        this.disabled = true;

        changeItemsValume({
          itemsId: this.currentChange.item.id,
          storeId: this.condition.storeId
        }).then(res => {
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: this.dialogConfirmChange
                ? '"' + this.currentChange.item.name + '"设置为计入成功'
                : '"' + this.currentChange.item.name + '"设置为不计入业绩成功',
              type: "success"
            });
            this.disabled = false;
            this.dialogConfirm = false;
          }
        });
      } else {
        //取消
        let list = this.list;

        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].items) {
            for (let j = 0; j < this.list[i].items.length; j++) {
              if (this.list[i].items[j].id == this.currentChange.item.id) {
                this.list[i].items[j].isSelected = !this.list[i].items[j]
                  .isSelected;
              }
            }
          }
        }

        this.$set(
          list,
          this.currentChange.index,
          list[this.currentChange.index]
        );

        this.dialogConfirm = false;
      }
    },

    setPerformance() {
      //获取所有选中的id
      let _tmp = [];

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].items) {
          for (let j = 0; j < this.list[i].items.length; j++) {
            if (this.list[i].items[j].isSelected) {
              _tmp.push(this.list[i].items[j].id);
            }
          }
        }
      }

      this.disabled = true;

      saveValume({
        volume: this.items_volume,
        itemsIds: _tmp.join(","),
        storeId: this.condition.storeId
      }).then(res => {
        if (res.status == 0) {
          this.$message({
            showClose: true,
            message: "设置不计入金额业绩成功",
            type: "success",
            onClose: () => {
              this.disabled = false;
              this.dialogSetMoney = false;
              this.loadData();
            }
          });
        }
      });
    },

    //列表外赋值
    getLoaded(data) {
      let _tmp = data.list;
      for (let i = 0; i < _tmp.length; i++) {
        if (_tmp[i].items) {
          for (let j = 0; j < _tmp[i].items.length; j++) {
            _tmp[i].items[j].isSelected =
              _tmp[i].items[j].disabled_volume == 0 ? false : true;
          }
        }
      }
      this.items_volume = data.items_volume;
      this.list = _tmp;
    },

    loadData() {
      // 品项
      getListItems({
        itemsParentId: 0,
        storeId: this.condition.storeId,
        is_store_settings: 1
      })
        .then(res => {
          if (res.status == 0) {
            let _tmp = res.data.list;
            this.projectList = _tmp;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
        this.$refs.demoTable.loadData();


      // // 品项
      // itemsList({ start: 1, perpage: 999, storeId: this.condition.storeId }).then(res => {
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
        let row = item;

        //查询当前row
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].items) {
            for (let j = 0; j < this.list[i].items.length; j++) {
              if (row.id == this.list[i].items[j].id) {
                row.p_id = this.list[i].id;
              }
            }
          }
        }

        if (row.style) {
        } else {
          row.style = 0;
        }

        this.$refs.editProject.form = JSON.parse(JSON.stringify(row));

        if (row.meal) {
          this.$refs.editProject.comboList = JSON.parse(
            JSON.stringify(row.meal)
          );
        } else {
          this.$refs.editProject.comboList = [];
        }

        this.$refs.editProject.isEdit = true;
      } else {
        this.$refs.editProject.form = JSON.parse(
          JSON.stringify({
            p_id: item.id,
            style: 0,
            price: "",
            treatment_num: "",
            fashion: { value: 1 }
          })
        );

        this.$refs.editProject.isEdit = false;

        this.$refs.editProject.comboList = [];
      }
      this.$refs.editProject.dialogForm = true;
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.items) {
        if (columnIndex === 0) {
          return [1, 5];
        } else if (columnIndex === 5) {
          return [1, 1];
        } else {
          return [0, 0];
        }
      } else {
        return [1, 1];
      }
    },

    hideEmpty(flag) {
      this.isHideEmpty = flag;
      if (this.isHideEmpty) {
        let _tmp = this.list;
        for (let i = 0; i < _tmp.length; i++) {
          if (_tmp[i].items.length == 0) {
            _tmp.splice(i, 1);
          }
        }
        for (let i = 0; i < _tmp.length; i++) {
          if (_tmp[i].items.length == 0) {
            _tmp.splice(i, 1);
          }
        }
        for (let i = 0; i < _tmp.length; i++) {
          if (_tmp[i].items.length == 0) {
            _tmp.splice(i, 1);
          }
        }
        this.list = _tmp;
      } else {
        this.loadData();
      }
    },

    addProject() {
      let _arr = [];

      //新增大类

      if (this.dialogEditCategoriesParam.is_store == 1) {
        //企业
      } else {
        //门店
        for (let i = 0; i < this.storeList.length; i++) {
          if (this.storeList[i].isSelected) {
            _arr.push({
              id: this.storeList[i].id
            });
          }
        }
        if (_arr.length == 0) {
          this.$message({
            message: "请选择门店",
            type: "error"
          });
          return;
        }
      }

      if (!this.dialogEditCategoriesParam.name) {
        return;
      }

      this.disabled = true;

      if (this.isEdit) {
        itemsAdd({
          name: this.dialogEditCategoriesParam.name,
          itemsParentId: 0,
          itemsId: this.dialogEditCategoriesParam.id,
          command: this.dialogEditCategoriesParam.command,
          is_store: this.dialogEditCategoriesParam.is_store,
          storeId: JSON.stringify(_arr)
        })
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "品项修改成功",
                type: "success"
              });
              this.loadData();
              this.disabled = false;
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
              this.disabled = false;
            }
          })
          .catch(error => {
            console.log("itemsAdd no");
            this.disabled = false;
          });
      } else {
        itemsAdd({
          name: this.dialogEditCategoriesParam.name,
          itemsParentId: 0,
          is_store: this.dialogEditCategoriesParam.is_store,
          storeId: JSON.stringify(_arr)
        })
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "品项新增成功",
                type: "success"
              });
              this.loadData();
              this.disabled = false;
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
              this.disabled = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.disabled = false;
          });
      }
      this.isEdit = false;
      this.dialogEditCategories = false;
    },

    showDialog(edit, row) {
      this.dialogEditCategories = true;

      if (row) {
        this.isEdit = true;
        this.dialogEditCategoriesParam = JSON.parse(JSON.stringify(row));
        this.dialogEditCategoriesParam.is_store = 1;
      } else {
        this.isEdit = false;
        this.dialogEditCategoriesParam = {
          name: "",
          is_store: 1
        };
      }
    },

    hideDialog() {
      this.dialogEditCategories = false;
    },

    open(item) {
      if (item.status == 0) {
        //启用
        this.$confirm("是否启用该品项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          itemsChangeStatus({
            itemsId: item.id,
            status: 1,
            command: item.command
          })
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "品项启用成功",
                  type: "success"
                });
                // item.status.value = 1
                this.loadData();
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error"
                });
              }
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: error,
                type: "error"
              });
            });
        });
      } else {
        //禁用
        this.$confirm("是否禁用该品项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          itemsChangeStatus({
            itemsId: item.id,
            status: 0,
            command: item.command
          })
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "品项禁用成功",
                  type: "success"
                });
                // item.status.value = 0
                this.loadData();
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error"
                });
              }
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: error,
                type: "error"
              });
            });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.is-selected {
  color: #1989fa;
}
</style>
