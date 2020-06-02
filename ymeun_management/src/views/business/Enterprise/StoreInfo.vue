<template>
  <div class="StoreInfo">
    <header>
      <span>{{title}}</span>
      <el-button type="primary" @click="addAndStore(true)">添加门店</el-button>
    </header>
    <div class="clear4"></div>
    <el-table :data="tableList" stripe border style="width: 100%" v-loading="loading">
      <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" label="门店名称">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">{{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column align="center" label="门店地址">
        <template slot-scope="scope">{{scope.row.address}}</template>
      </el-table-column>
      <el-table-column align="center" label="门店面积">
        <template slot-scope="scope">{{scope.row.measure +'/m²'}}</template>
      </el-table-column>
      <el-table-column align="center" label="简介" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <el-table-column align="center" label="账号数量">
        <template slot-scope="scope">{{scope.row.users_scale}}</template>
      </el-table-column>
      <el-table-column align="center" label="店长账号">
        <template slot-scope="scope">{{scope.row.Shopowner}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <div class="display">
            <span class="color" @click="addAndStore(false,scope.row)">修改资料</span>
            <em></em>
            <span class="color" @click="addAndAmend(scope.row.id,scope.row.name)">新增账号</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
        @size-change="upPage"
        @current-change="nextPage"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20, 100]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true">
      </el-pagination>
    </div>
    
    <!-- 新增门店 -->
    <div class="dialog_box">
      <el-dialog :title="AddType ? '添加门店' : '修改资料'" :visible.sync="AddStore" width="35%">
      <div class="el_dialog_box">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <el-row>
            <el-col :span="11">
              <el-form-item label="门店名称" prop="name">
                  <el-input type="text" v-model.trim="form.name" placeholder="请输入门店名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><div class="wb100 h1px"></div></el-col>
            <el-col :span="11">
              <el-form-item label="门店电话" prop="phone">
                  <el-input type="text" v-model.trim="form.phone" placeholder="请输入门店电话" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="门店地址" prop="address">
                  <el-input type="text" v-model.trim="form.address" placeholder="请输入门店地址" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="门店面积" prop="measure">
                  <el-input type="text" v-model.trim="form.measure" placeholder="请输入门店面积" clearable>
                    <template slot="append">㎡</template>
                  </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><div class="wb100 h1px"></div></el-col>
            <el-col :span="11">
              <el-form-item label="账号数量" prop="users_scale">
                  <el-input type="text" v-model.trim="form.users_scale" placeholder="请输入账号数量" clearable>
                    <template slot="append">个</template>
                  </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="门店简介" prop="description">
                  <el-input type="textarea" v-model="form.description" placeholder="请输入门店简介"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="clear2"></div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddStore=false">取 消</el-button>
            <el-button v-if="disabled" type="primary" disabled>提交中...</el-button>
            <el-button v-else type="primary" @click="submit(true)">{{AddType ? '确认新增' : '确认修改'}}</el-button>
        </div>
      </div> 
      </el-dialog>
    </div>


    <!-- 新增账号 -->
    <div class="dialog_box">
      <el-dialog title="新增账号" :visible.sync="AddAccountType" width="35%">
      <div class="el_dialog_box">
        <el-form ref="idForm" :model="idForm" :rules="rules" label-width="80px" label-position="left">
          <el-row>
            <el-col :span="11">
              <el-form-item label="门店名称" prop="sname">
                  <el-input type="text" v-model.trim="idForm.sname" placeholder="请输入门店名称" clearable disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><div class="wb100 h1px"></div></el-col>
            <el-col :span="11">
              <el-form-item label="账号" prop="username">
                  <el-input type="text" v-model.trim="idForm.username" placeholder="请输入账号" clearable disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                  <el-input type="text" v-model.trim="idForm.name" placeholder="请输入姓名" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><div class="wb100 h1px"></div></el-col>
            <el-col :span="11">
              <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model.trim="idForm.password" placeholder="请输入密码" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="确认密码" prop="password_confirmation">
                  <el-input type="password" v-model.trim="idForm.password_confirmation" placeholder="请确认密码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"><div class="wb100 h1px"></div></el-col>
            <el-col :span="11">
              <el-form-item label="岗位" prop="roleId">
                  <el-select v-model="idForm.roleId" placeholder="请选择" readonly="" clearable class="wb100">
                    <el-option v-for="[key, val] in _dictRoleTow" :key="key" :label="val" :value="key"></el-option> 
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="账号属性" prop="attribute">
                <el-select v-model="idForm.attribute" placeholder="请选择" readonly="" clearable class="wb100">
                    <el-option label="团队账号" value="1"></el-option>
                    <el-option label="非团队账号" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="clear2"></div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddAccountType = false">取 消</el-button>
            <el-button v-if="disabled" type="primary" disabled>提交中...</el-button>
            <el-button v-else type="primary" @click="AccountType">确认新增</el-button>
        </div>
      </div> 
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { storeAdd, storeList, getUserName, memberAdd, storeEdit} from "@/assets/api/home/home"
export default {
  name: "StoreInfo",
  data() {
    return {
      title:this.$route.query.e_name,
      condition:{
        start: 1,
        perpage: 15,
        // 企业id
        e_id:this.$route.query.e_id,
      },
      tableList:[],
      total:0,
      AddStore: false,
      AddAccountType: false,
      disabled: false,
      loading:false,
      AddType:true,
      form: {
        name:'',
        phone:'',
        address:'',
        measure:'',
        description:'',
        users_scale:10,
      },
      idForm:{},
      rules: {
        name: [{required: true, message: '请输入门店名称', trigger: 'change'}],
        phone: [{required: true, message: '请输入门店电话', trigger: 'change'}],
        address: [{required: true, message: '请输入门店地址', trigger: 'change'}],
        measure: [{required: true, message: '请输入门店面积平方', trigger: 'change'}],
        users_scale: [{required: true, message: '请输入账号数量', trigger: 'change'}],
        password: [{required: true, message: '请输入密码', trigger: 'change'}],
        password_confirmation: [{required: true, message: '请确认密码', trigger: 'change'}],
        roleId: [{required: true, message: '请选择岗位', trigger: 'change'}],
        attribute: [{required: true, message: '请选择账号属性', trigger: 'change'}],
      },
    };
  },
  watch:{},
  components: {},
  methods: {
    loadData() {
      this.loading = true;
      storeList(this.condition).then(res => {
        if (res.status == 0) {
          this.tableList = res.data.list;
          this.total = res.data.total;
          this.loading = false;
        }
      }).catch(error => {
        console.log('storeList     no');
      })
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    routerClick(command) {
      console.log(command);
    },
    upPage(val) {
      this.condition.perpage = val;
      this.loadData();
    },
    nextPage(val) {
      this.condition.start = val;
      this.loadData();
    },

    addAndAmend(s_id,s_name) {
      this.idForm = {};
      this.idForm.sname = s_name;
      this.idForm.s_id = s_id;
      getUserName({e_id:this.condition.e_id,s_id:s_id}).then(res => {
        if (res.status == 0) {
          this.idForm.username = res.data;
          this.AddAccountType = true;
        }
      }).catch(error => {
        console.log('getUserName     no');
      });
    },
    addAndStore(type,item) {
      if (type) {
        this.form.name = '';
        this.form.phone = '';
        this.form.address = '';
        this.form.measure = '';
        this.form.users_scale = 10;
        this.form.description = '';
      }else {
        this.form.id = item.id;
        this.form.name = item.name;
        this.form.phone = item.phone;
        this.form.address = item.address;
        this.form.measure = item.measure;
        this.form.users_scale = item.users_scale;
        this.form.description = item.description;
      }
      this.AddType = type;
      this.AddStore = true;
    },

    Message(message,type) {
      this.$message({
        message: message,
        duration:'1500',
        type: type,
        onClose:()=>{
          if (type == 'success') {
            this.loadData();
            this.AddStore = false;
            this.AddAccountType = false;
          }
          this.disabled = false;
        }
      });
    },
    AccountType() {
      this.disabled = true;
      this.$refs.idForm.validate( valid => {
        if (valid) {
          this.idForm.e_id = this.condition.e_id;
          memberAdd(this.idForm).then(res => {
            if (res.status == 0) {
              this.Message('新增成功','success');
            }else{
              this.Message(res.msg,'error');
            }
          });
        }else {
          this.Message('请检查表单','error');
        }
      });
    },
    submit(type){
      this.disabled = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.e_id = this.condition.e_id
          if (this.AddType) {
            storeAdd(this.form).then(res=>{
              if(res.status == 0){
                this.Message('新增成功','success');
              }else{
                this.Message(res.msg,'error');
              }
            })
          }else {
            storeEdit(this.form).then(res=>{
              if(res.status == 0){
                this.Message('修改成功','success');
              }else{
                this.Message(res.msg,'error');
              }
            })
          }
        } else {
          this.Message('请检查表单','error');
        }
      });
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.loadData();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.StoreInfo {
  background-color: #ffffff;
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  margin: .2rem;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #E5E5E5;
    span {
      font-size:14px;
      font-weight:500;
      color:#333333;
    }
  }
  .page {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
<style>
  .el-textarea__inner {
    height: 100px;
  }
  .el-input-group__append {
    color: #333333
  }
</style>