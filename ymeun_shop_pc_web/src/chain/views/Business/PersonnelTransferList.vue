<template>
  <div class="EmployeeData">
    <header>人事调动</header>
    <div class="clear-f2"></div>
    <div class="clear3"></div>
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
    >
      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
        <el-form-item>
          <el-input v-model="condition.keyword" placeholder="请输入姓名/电话号码" />
        </el-form-item>
        <el-form-item label>
          <el-select v-model="condition.s_id" placeholder="请选择门店" readonly clearable>
            <el-option
              v-for="item in storeDataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button class="h32px" @click="resetFn">重置</el-button>
          <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
        </el-form-item>
      </el-form>
      <el-table slot="list" :data="demoList" border>
        <el-table-column prop="store_name" align="left" label="门店">
          <template slot-scope="scope">{{ scope.row.store_name }}</template>
        </el-table-column>

        <el-table-column prop="name" align="left" label="姓名">
          <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>

        <el-table-column prop="mobile" align="left" label="电话">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>

        <el-table-column prop="role_name" align="left" label="岗位">
          <template slot-scope="scope">{{ scope.row.role_name }}</template>
        </el-table-column>

        <el-table-column prop="qiantai" align="left" label="操作" width="50px">
          <template slot-scope="scope">
            <div class="Fgreen" @click="modificationFn(scope.row.e_id,scope.row.users_id,scope.row.s_id)">调动</div>
          </template>
        </el-table-column>
      </el-table>
    </base-list>


    <!-- 人事调动 -->
    <el-dialog
      title="人事调动"
      :visible.sync="dialogVisible"
      width="340px">
      <div class="dialog_xian"></div>
      <div class="wb100 EmployeeDataActive">
        <el-form :inline="true" :model="form" class="search-form wb100" slot="search" label-width="80px">
          <el-form-item label="门店" class="wb100">
            <el-select v-model="form.s_id" placeholder="请选择调去的门店" class="wb100" readonly clearable>
              <el-option
                v-for="item in storeDataList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" class="wb100" v-if="form.s_id">
            <el-select v-model="form.role_id" placeholder="请选择调去的岗位" class="wb100" readonly clearable>
              <el-option
                v-for="item in operatingPostList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交接员工" class="wb100"  v-if="form.s_id">
            <el-select v-model="form.new_id" placeholder="请选择交接的员工" class="wb100" readonly clearable>
              <el-option
                v-for="item in staffList"
                :key="item.users_id"
                :label="item.name"
                :value="item.users_id"
              ></el-option>
            </el-select>
            <p style="font-size: 0.16rem;color: #ec414d;" v-show="err">*此岗位没有员工可以交接</p>
          </el-form-item>
        </el-form>
        <div class="clear1"></div>

        <div slot="footer" class="dialog-footer fr">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-if="disabled" @click="submit">确 定</el-button>
          <el-button type="primary" v-else disabled>提交中...</el-button>
        </div>

        <div class="clear4"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMembersList,
  getStore,
  transferInterface,
  transfer
} from "@/chain/assets/api/TeamManagement/index";
export default {
  name: "EmployeeData",
  data() {
    return {
      condition: {
        keyword:''
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: getMembersList, // 分页查询api接口
      storeDataList: [],
      dialogVisible:false,
      form:{},
      disabled:true,
      err:false,
      operatingPostList:[],
      staffList:[],
      dataForm:{}
    };
  },
  components: {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },
    resetFn() {
      this.condition.keyword = "";
      this.condition.s_id = "";
    },
    modificationFn(eId, users_id,s_id) {
      this.form = {};
      this.dataForm.e_id = eId;
      this.dataForm.users_id = users_id;
      this.dataForm.s_id = s_id;
      // 人事调动岗位交接员工获取
      transferInterface({s_id:s_id,id:users_id}).then(res => {
        if (res.status == 0) {
          this.operatingPostList = res.data.roleName;
          if (res.data.membersData[0] == "此岗位没有员工可以交接") {
            this.err = true;
          }else {
            this.err = false;
            this.staffList = res.data.membersData;
          }
        }
      })
      .catch(err => {
        console.log('transferInterface ----------no');
      });
      this.dialogVisible = true;
    },
    submit() {
      this.disabled = false;
      let data = this.form;
      data.old_id = this.dataForm.users_id;
      transfer(data).then(res => {
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration:'1500',
            onClose:() => {
              this.dialogVisible = false;
              this.disabled = true;
            }
          });
        }else {
          this.$message.error(res.msg);
          this.disabled = true;
        }
      })
      .catch(err => {
        console.log('transfer ----------no');
      });
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    // 门店选择
    getStore().then(res => {
      if (res.status == 0) {
        this.storeDataList = res.data;
      }
    });
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.EmployeeData {
  margin: 20px;
  background-color: #ffffff;
  padding: 0 20px 20px 20px;
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    span {
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-left: 0.29rem;
      i {
        font-style: normal;
        color: #ff5722;
      }
    }
  }
  .Fgreen {
    cursor:pointer;
  }
  .Fgreen:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
}
</style>

<style>

  
.EmployeeData .el-dialog .el-dialog__header{
  padding: 10px 20px;
}
.EmployeeData .el-dialog__header .el-dialog__title{
  font-size: 16px;
}
.EmployeeData .el-dialog__body{
  padding: 0 20px;
}
.EmployeeData .el-dialog__body .content{
}
.EmployeeData .dialog_box{
  display: flex;
  flex-wrap: wrap;
  padding-top: 
}
.EmployeeData .dialog_xian {
  height: 1px;
  background: #E5E5E5;
  margin-bottom: 14px;
}
</style>
