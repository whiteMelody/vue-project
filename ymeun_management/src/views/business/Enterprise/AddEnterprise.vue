<template>
  <div class="AddEnterprise">
    <header>{{isAdd ? '新增企业' : '修改企业'}}</header>
    <div class="wb70 center main">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name">
              <el-input type="text" v-model.trim="form.name" placeholder="请输入企业名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业简称" prop="abbreviation">
              <el-input type="text" v-model.trim="form.abbreviation" placeholder="请输入企业简称" clearable :disabled="!isAdd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clear1"></div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业邮箱" prop="email">
              <el-input type="text" v-model.trim="form.email" placeholder="请输入企业邮箱" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业电话" prop="phone">
              <el-input type="text" v-model.trim="form.phone" placeholder="请输入企业电话" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="clear1"></div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择类别" prop="edition">
              <template v-if="isedition == 1">
                  <el-radio v-model="form.edition" :label="1">连锁版</el-radio>
                  <el-radio v-model="form.edition" disabled :label="2">单店版</el-radio>
              </template>
              <template v-else>
                  <el-radio v-model="form.edition" :label="1">连锁版</el-radio>
                  <el-radio v-model="form.edition" :label="2">单店版</el-radio>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择类型" prop="fashion">
              <el-radio v-model="form.fashion" :label="1" :disabled="!isAdd">测试</el-radio>
              <el-radio v-model="form.fashion" :label="2" :disabled="!isAdd">正式</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="clear1"></div>

        <el-row class="relative">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="begin_date">
              <el-date-picker
                      v-model="form.begin_date"
                      :disabled="!isAdd"
                      :clearable="false"
                      type="datetime"
                      class="wb100"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择开始日期">
              </el-date-picker>
              <p class="f12px fc-red">开始合作时间一经填写，不可修改</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期时间" prop="end_date">

              <template v-if="isAdd">
                <!--新增-->
                <el-date-picker
                        v-model="form.end_date"
                        :clearable="false"
                        type="datetime"
                        class="wb100"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="选择到期日期">
                </el-date-picker>
              </template>

              <template v-else>
                <!--修改-->
                <el-date-picker
                        v-model="form.end_date"
                        :disabled="editEnd"
                        :clearable="false"
                        type="datetime"
                        class="wb100"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择到期日期">
                </el-date-picker>

                <!--判断续签-->
                <template v-if="status == 1">
                  <!--合作中-->
                  <el-button type="primary" @click="editEnd = false" :disabled="isTimeOut" class="absolute" style="right: -80px;">续签</el-button>
                </template>

                <template v-else>
                  <el-button type="primary" disabled class="absolute" style="right: -80px;">续签</el-button>
                </template>

              </template>

            </el-form-item>
          </el-col>

        </el-row>
        <div class="clear1"></div>
        <el-row>
          <el-col :span="24" style="width:100%">
            <el-form-item label="企业简介" prop="description">
              <el-input type="textarea" v-model="form.description" placeholder="请输入企业简介"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="clear1"></div>
        <el-row>
          <el-col :span="24" style="width:100%">
            <el-form-item label="合作信息" prop="description">
              <el-button type="primary" icon="el-icon-picture" @click="dialogForm = true">上传照片</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="clear1"></div>
        <div class="btn">
          <el-button @click="cal">取消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="submit">{{isAdd ? '确定新增' : '确定修改'}}</el-button>
          </template>
        </div>
      </el-form>
    </div>

    <el-dialog title="上传照片" :visible.sync="dialogForm" width="500px">

      <div class="clear bd-gray bd-b1"></div>

      <div class="wb100">

        <div class="wb100">

          <template v-for="(item, index) in packgeList">

            <template v-if="item.status == 1">
              <div class="w75px fl text-center mar30" @click="openPackge(item, index)">
                <img src="@/assets/img/packge.png">
                <p class="lh20px">{{item.name}}</p>
              </div>
            </template>

            <template v-else>
              <div class="w75px fl text-center mar30">
                <img src="@/assets/img/packge.png">
                <el-input v-model="item.name" @blur="affirmPackge(item)"></el-input>
              </div>
            </template>

          </template>

          <el-button type="primary" icon="el-icon-plus" @click="addPackge" class="fl mat25">新增文件夹</el-button>

          <div class="clear4"></div>

        </div>

      </div>

    </el-dialog>

    <!--测试上传图片-->


    <el-dialog title="上传照片" :visible.sync="dialogForm2" width="1100px">

      <div class="wb100">

        <el-upload
                :headers="headers"
                :http-request="uploadSectionFile"
                :action="action"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :file-list=" noPackge ? [] : packgeList[openPackgeIndex].fileList"
                :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <!--<div class="clear4"></div>-->

        <!--<div slot="footer" class="dialog-footer fr">-->
          <!--<el-button @click="dialogForm = false">取 消</el-button>-->
          <!--<template v-if="disabled">-->
            <!--<el-button type="primary" disabled>提交中...</el-button>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<el-button type="primary" @click="handleSubmit">保 存</el-button>-->
          <!--</template>-->
        <!--</div>-->

        <div class="clear4"></div>

      </div>

    </el-dialog>

  </div>
</template>

<script>
import { enterpriseAdd , enterpriseEdit} from "@/assets/api/home/home";

export default {
  name: "AddEnterprise",
  components: {},
  data() {
    return {
      disabled: false,
      isAdd: this.$route.query.isAdd,
      form: {
        name:'',
        abbreviation:'',
        email:'',
        phone:'',
        edition:'',
        description:'',
        fashion: '',
        begin_date: '',
        end_date: '',
      },
      isedition:2,
      status: 0,
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "change" }],
        abbreviation: [{ required: true, message: "请输入企业简称", trigger: "change" }],
        phone: [{ required: true, message: "请输入企业电话", trigger: "change" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
        edition: [{ required: true, message: "请选择企业类别", trigger: "change" }],
        fashion: [{ required: true, message: "请选择企业类型", trigger: "change" }],
        begin_date: [{ required: true, message: "请选择开始日期", trigger: "change" }],
        // end_date: [{ required: true, message: "请选择到期日期", trigger: "change" }],
        // description: [{required: true, message: '请输入企业简介', trigger: 'change'}],
      },
      dialogForm: false,
      dialogForm2: false,
      packgeList: [],
      noPackge: true,
      openPackgeIndex: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      editEnd: true,

      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      action:  this.$base.getManageHost() + '/post/attachment/document/upload',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('webToken'),
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },

      isTimeOut: true,

    };
  },
  created() {},
  methods: {
    submitUpload() {
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },

    uploadSectionFile(param) {
        let fileObj = param.file;
        // 接收上传文件的后台地址
        let FileController = this.action;
        // FormData 对象
        let form = new FormData();
        // 文件对象
        form.append("attach", fileObj);
        let xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('webToken'))
        // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
        xhr.onload = () => {
            let res = JSON.parse(xhr.response)
            if(res.status == 0){
                //添加至当前文件夹内
                this.packgeList[ this.openPackgeIndex].fileList.push({
                    url: res.data.attach
                })
            }else{
                this.$message({
                    message: res.msg,
                    type: "error",
                    onClose: () => {
                        this.disabled = false;
                    }
                });
            }

        };
        xhr.send(form);
    },

    affirmPackge(item){
        this.$confirm('确定添加'+item.name+'文件夹?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          item.status = 1
        }).catch(()=>{
            item.name = ''
            item.status = 0
        })
    },

    openPackge(item, index){
        this.dialogForm = false
        this.dialogForm2 = true
        this.openPackgeIndex = index
        this.fileList = item.fileList
    },

    addPackge(){
        this.packgeList.push({
            name: '',
            status: 0,
            fileList: [],
        })
    },

    handleSubmit(){

    },

    submit() {
      this.disabled = true;
      this.$refs.form.validate(valid => {
        if (valid) {

          this.form.contract = JSON.stringify(this.packgeList)

            // contract: [{"name":"new","status":1,"fileList":[{"url":"http://120.76.244.240:1006/upload/promotion/202001/13/ed09b601890e1af8f9365443eb35428c.png"}]}]

          if (this.isAdd) {
            enterpriseAdd(this.form).then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  onClose: () => {
                    this.disabled = false;
                  }
                });
              }
            });
          }else {
            enterpriseEdit(this.form).then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  onClose: () => {
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  onClose: () => {
                    this.disabled = false;
                  }
                });
              }
            });
          }
        } else {
          this.$message({
            message: "请检查表单",
            type: "error",
            onClose: () => {
              this.disabled = false;
            }
          });
        }
      });
    },
    cal() {
      this.$router.go(-1);
    }
  },
  mounted() {
    if (!this.isAdd) {
      let formData = JSON.parse(localStorage.getItem('FORM'));

      this.isedition = formData.edition;
      this.form.id = formData.id;
      this.form.name = formData.name;
      this.form.abbreviation = formData.abbreviation;
      this.form.email = formData.email;
      this.form.phone = formData.phone;
      this.form.edition = formData.edition;
      this.form.description = formData.description;
      this.form.fashion = formData.fashion;
      this.form.begin_date = formData.begin_date;
      this.form.end_date = formData.end_date;
      this.status = formData.status;

      // if( new Date().getTime() >= this.$base.dateTimeToDate(formData.end_date, 'time'))
      //   this.isTimeOut = false

        if(!this.$base.isNull(formData.end_date)){
            this.isTimeOut = false
        }

      //查询上传的文件夹信息
        if(!this.$base.isNull(formData.contract)){
            if(!this.$base.isNull(JSON.parse(formData.contract))){
                this.packgeList = JSON.parse(formData.contract)
                this.noPackge = false
            }
        }
    }

    this.form.fashion = this.$route.query.fashion

  }
};
</script>

<style scoped lang="scss">
.AddEnterprise {
  background-color: #ffffff;
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  margin: 0.2rem;
  header {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
  }
  .main {
    padding-top: 50px;
    .btn {
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;
    }
  }
}


</style>
<style>
.el-textarea__inner {
  height: 110px;
}
</style>