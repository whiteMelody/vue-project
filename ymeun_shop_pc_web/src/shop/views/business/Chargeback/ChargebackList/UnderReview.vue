<template>
  <div class="UnderReview">

    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                      <el-input v-model.trim="condition['keyword']" placeholder="请输入客户姓名/电话/单号" clearable></el-input>
                </el-form-item>
                 <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                 </el-form-item>
             
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column prop="index" align="center" label="序号" width="60">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            
            <el-table-column prop="status" align="center" label="审核状态">
              <template slot-scope="scope">
                <div class="list_status">
                    <span class="zhifu" v-if="scope.row.status == 1">已审核</span>
                    <span class="weizhifu" v-else-if="scope.row.status == 0">待审核</span>
                    <span class="quxiao" v-else>未通过</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="code" align="center" label="单号">
              <template slot-scope="scope">
                {{ scope.row.code }}
              </template>
            </el-table-column>
            <el-table-column prop="customer.name" align="center" label="姓名">
              <template slot-scope="scope">
                <el-link 
                    :underline="false" 
                    @click="$router.push({
                      name: 'ClientDel',
                      query:{ 
                        id: scope.row.customer_id, 
                        types:'3'
                        } 
                      })"
                    >{{ scope.row.customer.name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="customer.mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.customer.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="number" align="center" label="退单数量">
              <template slot-scope="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="退单金额">
              <template slot-scope="scope">
                {{ scope.row.price | _filterNumFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="content.describe" align="center" label="退款描述">
              <template slot-scope="scope">
                {{ scope.row.content.describe }}
              </template>
            </el-table-column>
            <el-table-column prop="member_name" align="center" label="退单申请人">
              <template slot-scope="scope">
                {{ scope.row.member_name }}
              </template>
            </el-table-column>
<!--            <el-table-column prop="across_store" align="center" label="消费门店">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.across_store }}-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="affirm" v-if="scope.row.status == 0">
                  <a class="buttonStyle_class" @click="passFn(scope.row.mark)">通过</a>
                  <em></em>
                  <a class="buttonStyle_class" @click="refuseFn(scope.row.mark)">拒绝</a>
                </p>
                <p class="quxiao" v-else>
                  <a class="buttonStyle">已审核</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>

    <el-dialog title="通过审核" :visible.sync="cancelPop" @closed="closelPop">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="cancelText">
                <el-input type="textarea" placeholder="请输入通过原因..." v-model="form.cancelText" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelPop = false;form.cancelText = ''">取 消</el-button>
            <template v-if="disabled">
                <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" @click="cancelConfirmBtnFn">确 定</el-button>
            </template>
        </div>
    </el-dialog>

    <el-dialog title="拒绝通过" :visible.sync="confirmPop" @closed="confirmPop">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="confirmText">
                <el-input type="textarea" placeholder="请输入拒绝原因..." v-model="form.confirmText" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="confirmPop = false;form.confirmText = ''">取 消</el-button>

            <template v-if="disabled">
                <el-button type="primary" disabled>提交中...</el-button>
            </template>
            <template v-else>
                <el-button type="primary" @click="confirmBtnFn">确 定</el-button>
            </template>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRefundAuditList , RefundToExamineAdopt , RefundToExamineNotAdopt } from "@/shop/assets/api/informatization/chargeback"
export default {
  name: "UnderReview",
  data() {
    return {
      counselor:{
          counselor:"",
      },
      condition: {
      },                                // 查询条件
      demoList: [],                      // table数组
      pageSearch: getRefundAuditList,       // 分页查询api接口
      daterangeTimer:[],
      cancelPop:false,
      confirmPop:false,
        disabled:false,
      form:{
          cancelText:'',
          confirmText:'',
      },
      rules:{
          cancelText: [{ required: true, message: '请填写原因', trigger: 'blur' }],
          confirmText: [{ required: true, message: '请填写原因', trigger: 'blur' }],
      },
      markCode:'',
    };
  },
  components: {},
  methods: {
    //关闭弹窗
    closelPop(){
       this.form.cancelText = '';
       this.form.confirmText = '';
    },
    //通过
    passFn(mark){
      this.cancelPop = true;
      this.markCode = mark;
    },
    cancelConfirmBtnFn(){
        this.$refs.form.validate((valid) => {
          if (valid) {
              this.disabled = true
            let postData = {
                mark : this.markCode,
                describe:this.form.cancelText
            }
            RefundToExamineAdopt(postData).then(res => {
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '通过审核',
                        type: 'success',
                        onClose:()=>{
                          window.history.go(0)
                            this.disabled = false
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                    this.disabled = false
                }
            }).cache(error=>{
                this.$message({
                    showClose: true,
                    message: error,
                    type: 'error',
                });
                this.disabled = false
            })
          } 
        })
    },
    //拒绝
    refuseFn(mark){
      this.confirmPop = true;
      this.markCode = mark;
    },
    confirmBtnFn(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let postData = {
                mark : this.markCode,
                describe:this.form.confirmText
            }
            RefundToExamineNotAdopt(postData).then(res => {
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '拒绝通过',
                        type: 'success',
                        onClose:()=>{
                          window.history.go(0)
                        }
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
            }).cache(error=>{
                this.$message({
                    showClose: true,
                    message: error,
                    type: 'error',
                });
            })
          } 
        })
    },
    
    //重新加载
    loadData() {
      this.$refs.demoTable.loadData();
    },
    //跳转页面
    pagesToUrl(str,id){
      switch (str) {
        case 'AffirmChargeback':
          this.$router.push({  
            path: 'AffirmChargeback',   
          })
          break;
        default:
          break;
      }
    },
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

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
.UnderReview {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;

  .box {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

<style>
.UnderReview .affirm,.UnderReview .quxiao{
  display: flex;
  align-items: center;
  justify-content: center;
}
.UnderReview .quxiao span{
  color: #999999;
}
.UnderReview .quxiao span{
  cursor: pointer;
}
.UnderReview .affirm em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.UnderReview .affirm a{
  cursor: pointer;
}
.UnderReview .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.UnderReview .list_status .zhifu{
    background: #9FDB9D;
}
.UnderReview .list_status .weizhifu{
    background: #FEB78C;
}
.UnderReview .list_status .quxiao{
    background: #D2D2D2;
}
.UnderReview .el-dialog,.MakeAnAppointmentDel .confirm_box .el-dialog{
    width: 4.2rem;
}
.UnderReview .el-dialog .el-dialog__body,.MakeAnAppointmentDel .confirm_box .el-dialog .el-dialog__body{
    padding: 10px 20px 0;
}
.UnderReview .el-dialog .el-dialog__body textarea{
    height: 90px;
}
</style>



    
