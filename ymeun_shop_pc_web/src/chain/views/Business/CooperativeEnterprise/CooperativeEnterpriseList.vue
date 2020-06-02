<template>
  <div class="CooperativeEnterpriseList" :style="'min-height: '+boxMaxHeight+'px;'">
    <!-- 当前页面说明 -->
    <div class="rankingTitle">
      <span class="rankingTabs">合作企业列表</span>
      <!-- <a @click="dialogConfirmFn('add')">新增合作企业</a> -->
      <el-button type="primary" @click="dialogConfirmFn('add')" size="mini">新增合作企业</el-button>
    </div>
    <div class="clear-f2"></div>
    <div class="clear3"></div>
    <base-list ref="demoTable" :condition="condition"
              :datas.sync="demoList" :pageSearch="pageSearch"  :isPaging="true" :isAutoLoad="true">

      <el-table slot="list" :data="demoList" border>

          <el-table-column prop="index" align="left" label="序号" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" align="left" label="合作企业名称">
              <template slot-scope="scope">{{ scope.row.name}}</template>
          </el-table-column>
          <el-table-column prop="time" align="left" label="创建时间">
              <template slot-scope="scope">{{ scope.row.time}}</template>
          </el-table-column>
          <el-table-column prop="ratio" align="left" label="合作企业分成比例">
              <template slot-scope="scope">{{ scope.row.ratio}}%</template>
          </el-table-column>
          <el-table-column prop="ratio" align="left" label="本企业分成比例">
              <template slot-scope="scope">{{ scope.row.enterprise_ratio}}%</template>
          </el-table-column>
          <el-table-column align="left" label="操作" width="50px">
            <template slot-scope="scope">
              <p class="affirm" @click="dialogConfirmFn('edit',scope.row)">修改</p>
            </template>
          </el-table-column>

      </el-table>
    </base-list>

    <el-dialog :title="isDialog?'新增合作企业信息' : '修改合作企业信息'" :close-on-click-modal="false" :show-close="true" :visible.sync="dialogConfirm" width="460px">

    <div class="dialog_xian"></div>
      <div class="content">
        <el-form :inline="true" ref="form" :model="form" :rules="rules" class="add-form" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="合作企业名称" prop="name">
                <el-input type="text" v-model.trim="form.name" placeholder="请输入企业名称" clearable class="wb100">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="本企业提成比例为" prop="enterprise_ratio">
                <el-input type="number" v-model.trim="form.enterprise_ratio" placeholder="请输入比例" clearable>
                   <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="合作企业提成比例为" prop="ratio">
                <el-input type="text" :disabled="true" v-model.trim="form.ratio" clearable>
                   <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div class="hint" v-if="dialogHint">提成比例需大于0，小于100</div>
      <div slot="footer" class="dialog-footer">
          <template v-if="disabled">
              <el-button disabled>取 消</el-button>
              <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
              <el-button @click="dialogConfirm = false">取 消</el-button>
              <el-button type="primary" :disabled="dialogHint" @click="handleSubmit">确 定</el-button>
          </template>
      </div>
  </el-dialog>

  </div>
</template>
<script>
import { businessList , businessAdd , businessEdit } from "@/chain/assets/api/cooperativeEnterprise/cooperativeEnterprise";

export default {
  name: "CooperativeEnterpriseList",
  data() {
    return {
      boxMaxHeight:"",
      daterangeTimer: [],
      // 查询条件
      counselor: {
        counselor: ""
      },
      condition: {}, // 查询条件
      demoList: [], // table数组
      pageSearch: businessList, // 分页查询api接口,
      dialogConfirm:false,
      isDialog:true,
      disabled:false,
      dialogHint:false,
      form:this.clearForm(),
      rules: {
        name: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        enterprise_ratio: [{required: true, message: '请输入比例', trigger: 'blur'}],
      },
    };
  },
  components: {
  },
  methods: {
  
    loadData() {
      this.$refs.demoTable.loadData();
    },
  
    //新增、修改弹窗
    dialogConfirmFn(str,item){
      this.dialogConfirm = true
      if(str == 'add'){
        this.isDialog = true
        this.form = {
          name : '',
          enterprise_ratio : '',
          ratio : '0.00',
        }

      }else{
        this.isDialog = false
        this.form = JSON.parse(JSON.stringify(item))
      }
    },

  

    // 提交表单
    handleSubmit() {

      // 避免重复提交时 提示报错
      var y = this.form.enterprise_ratio.toString().indexOf(".") + 1;//获取小数点的位置
      var count = this.form.enterprise_ratio.toString().length - y;//获取小数点后的个数
      if(y > 0 && count > 2) {
        this.$message({
          message: "请输入正确的提成比例（正整数或两位小数）",
          type: 'error',
        });
        return;
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disabled = true;
          this.isDialog ? this.handleToAdd() : this.handleToEdit()
        } 
      })

    },

    // 新增
    handleToAdd() {
      let postData = this.form;
      businessAdd(postData).then(res => {
        if (res.status == 0) {
          this.$message({
            message: '新增完成',
            type: 'success',
            onClose:()=>{
              this.dialogConfirm = false;
              this.disabled = false
              this.loadData()
            }
          });
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error',
            onClose:()=>{
              this.disabled = false
            }
          });
        }
      
      }).catch(error=>{
        console.log("businessAdd no");
      })
    },
    // 修改
    handleToEdit() {
      let postData = this.form;
      businessEdit(postData).then(res => {
        if (res.status == 0) {
          this.$message({
            message: '修改完成',
            type: 'success',
            onClose:()=>{
              this.dialogConfirm = false;
              this.disabled = false
              this.loadData()
            }
          });
        }
        else{
          this.$message({
            message: res.msg,
            type: 'error',
            onClose:()=>{
              this.disabled = false
            }
          });
        }
      
      }).catch(error=>{
        console.log("businessEdit no");
      })

    },


    // 清除表单数据
    clearForm() {
      return {
        ratio:'0.00',
        name : '',
        enterprise_ratio : ''
      }
    },
    
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },
  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {
 
    form: {
      deep: true,
      handler: function (curVal, oldVal) {
        var y = curVal.enterprise_ratio.toString().indexOf(".") + 1;//获取小数点的位置
        var count = curVal.enterprise_ratio.toString().length - y;//获取小数点后的个数
        if(y > 0 && count > 2) {
          this.$message({
            message: "请输入正确的提成比例（正整数或两位小数）",
            type: 'error',
          });
        }
        if(curVal.enterprise_ratio <= 100 && curVal.enterprise_ratio >= 0){
          
          curVal.ratio = (parseInt((100 - curVal.enterprise_ratio) * 100)) /100;
          this.dialogHint = false;

        }
        else{
          this.dialogHint = true;
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.CooperativeEnterpriseList {
  margin: 20px;
  padding: 0 20px;
  background-color: #fff;
  .rankingTitle {
    height: 40px;
    width: 100%;
    line-height:40px;
    font-size: 14px;
    color: #666666;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    display: flex;
    align-items: center;
    .rankingTabs {
      height: 100%;
      color: #333;
      flex: 1;
    }
    a{
      height: 32px;
      background: #FF5722;
      color: #fff;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      padding:0 10px;
      border-radius:5px;
    }
  }
  .el-table{
    .affirm{
      cursor: pointer;
      color: #009688;
    }
  }
  .hint{
    font-size: 12px;
    color:red;
    padding-left: 140px;
  }

}
</style>
<style>
.CooperativeEnterpriseList table{
  margin: 0;
  font-size: 14px;
}
.CooperativeEnterpriseList .el-table--border tr th{
  padding: 8px 0;
}
.CooperativeEnterpriseList .el-table__body-wrapper{
  margin-top:0;
}
.CooperativeEnterpriseList .el-table__body-wrapper .el-table__empty-block{
  min-height: 40px
}
.CooperativeEnterpriseList .el-dialog .el-dialog__header{
  padding: 10px 20px;
}
.CooperativeEnterpriseList .el-dialog__header .el-dialog__title{
  font-size: 16px;
}
.CooperativeEnterpriseList .el-dialog__body{
  padding: 0 20px;
}
.CooperativeEnterpriseList .el-dialog__body .content{
}
.CooperativeEnterpriseList .dialog_box{
  display: flex;
  flex-wrap: wrap;
  padding-top: 
}
.CooperativeEnterpriseList .dialog_xian {
  height: 1px;
  background: #E5E5E5;
  margin-bottom: 14px;
}
</style>



    
