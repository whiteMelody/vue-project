<template>
  <div class="AddClient" :style="'min-height: '+minHeight+'px;'">

        <h3>新增客户</h3>

      <div class="wb70 center">
          <div class="user_img">
              <div class="imgages el-cursor">
                <div class="filediv el-cursor" ref="fileData" :style="'background: url(' + (form.sexRadio == 1 ? imgUrl.imgBoy : imgUrl.imgGirl) + ') no-repeat center/100%'">
                    <input class="el-cursor" type="file" @change="ChoiceImg" :accept="action" value="file1">
                    <div class="text">{{ImgText}}</div>
                </div>
              </div>
            <p class="user_text">客户照片</p>
            <div class="user_text2">
                <span>尺寸：140*140像素</span>
                <span>照片大小不能超过1M</span>
            </div>
          </div>
        <el-form ref="form" :model="form" :rules="rules" class="add-form" label-width="120px">

            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input type="text" v-model.trim="form.name" placeholder="请输入客户姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="客户性别" prop="sexRadio">
                        <template v-for="[key, val] in _dictGender">
                            <el-radio v-model="form.sexRadio" :label="key">{{val}}</el-radio>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item label="客户电话" prop="tel">
                        <el-input type="text" v-model.trim="form.tel" placeholder="请输入客户电话号码" clearable maxlength="11"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="意向项目"  class="wb60 fl">
                        <el-select v-model="form.projectOne" placeholder="请选择项目" readonly="" clearable @change="form.projectTow = ''">
                            <!-- <el-option key label="全部项目" value></el-option> -->
                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="projectTow" v-if="form.projectOne" label-width="0" class="wb38 fr">
                        <el-select v-model="form.projectTow" placeholder="请选择下级项目" readonly="" clearable>
                            <el-option v-for="item in $store.getters.projectList2Map(form.projectOne)" :key="item.key" :label="item.value"
                    :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            
            <el-row :gutter="140" class="row_box">
                <el-col :span="12">
                    <el-form-item :label="$store.getters.roleName.adviser" prop="counselor">
                        <el-select v-model="form.counselor" :placeholder="'请选择'+$store.getters.roleName.adviser" readonly="" clearable class="wb100" :disabled="roleChoosable">
                            <el-option v-for="item in $store.getters.counselorMap" :key="item.key" :label="item.value"
                                 :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">若不选择系统会自动轮排给下一个{{$store.getters.roleName.adviser}}</em>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开发人员" prop="developer">
                        <el-select v-model="form.developer" placeholder="请选择开发人员" readonly="" clearable class="wb100">
                            <el-option v-for="item in $store.getters.roleListMap" :key="item.key" :label="item.value"
                                    :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext">开发人员选择后不可再次修改</em>
                </el-col>
            </el-row>

            
            <el-row :gutter="140">
                <el-col :span="12">
                    <el-form-item  prop="channelOne" label="来源渠道"  class="wb60 fl">
                        <el-select v-model="form.channelOne" placeholder="请选择渠道" readonly clearable @change="form.channelTow = ''">
                            <el-option v-for="item in $store.getters.channelList11Map(true)" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="channelTow" v-if="form.channelOne" label-width="0" class="wb38 fr">
                        <el-select v-model="form.channelTow" placeholder="选择下级项目类别" readonly clearable>
                            <el-option v-for="item in $store.getters.channelList2Map(form.channelOne)" :key="item.key" :label="item.value"
                                        :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <em class="stext wb100 mat5 fl">客户来源渠道一经选择,不可再次修改,请确认该客户的渠道选择正确</em>
                </el-col>
                
                <el-col :span="12">
                    <!-- <el-form-item label="客户照片" prop="developer">
                        <div class="filediv" ref="file1" :style="'background: url(' + (form.sexRadio == 1 ? imgUrl.imgBoy : imgUrl.imgGirl) + ') no-repeat center/100%'">
                            <input type="file" @change="ChoiceImg" :accept="action" value="file1">
                            <div class="text">{{ImgText ? '点击上传' : '重新上传'}}</div>
                        </div>



                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="filediv"
                            :style="'background: url(' + (form.sexRadio == 1 ? imgUrl.imgBoy : imgUrl.imgGirl) + ') no-repeat center/100%'">
                            <i v-else class=" text el-icon-plus avatar-uploader-icon">{{ImgText ? '点击上传' : '重新上传'}}</i>
                        </el-upload> 


                    </el-form-item>-->
                </el-col>
            </el-row>

            <el-row v-if="IntroducerListAllowed">
                <el-col :span="12">
                    <el-form-item label="介绍人" prop="introducerId">
                        <auto-search-client @selectdFn="mySelectd" @changed="myChanged" :placeholderText="'请输入介绍人'"></auto-search-client>
                        <!-- <el-input v-model.trim="form.introducerId" placeholder="请输入介绍人" clearable></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="介绍人电话" prop="introducerMobile">
                        <el-input type="text" v-model.trim="form.introducerMobile" placeholder="请输入介绍人电话" clearable maxlength="11" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="客户备注" prop="remark">
                        <el-input type="textarea" v-model.trim="form.remark" placeholder="请输入客户备注" clearable rows="8" class="lh40px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="clear4"></div>

        
            <div class="btn">
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="handleSubmit">确定新增</el-button>
                </template>
            </div>
        </el-form>
      </div>
  </div>
</template>
<script>

import { PUBLIC_PHONE } from "@/shop/utils/Reg";
import { addUser } from "@/shop/assets/api/client/client";
import { getProject , getProgramList } from "@/shop/assets/api/common/common"
import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
export default {
  name: "AddClient",
  data() {
    return {
        action: window.location.protocol == 'http:' ? 'http://120.76.244.240:1001/post/attachment/document/upload' : 'https://' + window.location.hostname + '/post/attachment/document/upload',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('webToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        roleChoosable:false,
        disabled:false,
        ImgText:'点击上传',
        imgUrl:{
            imgBoy:require('@/shop/assets/img/boy.png'),
            imgGirl:require('@/shop/assets/img/girl.png')
        },
        form:{
            name:'',
            sexRadio:'0',
            tel:'',
            projectOne: '',
            projectTow: '',
            counselor:'',
            developer:"",
            channelOne:"",
            channelTow:"",
            headimg:'',
            remark:"",
            introducerId:'',
            introducerMobile:'',
            introducerText:''
        },
        channel: {
          one: '',
          tow: '',
        },
        rules:{
            tel: [{ required: true, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            // introducerMobile: [{ required: false, validator: PUBLIC_PHONE,  message: '请输入正确的电话号码', trigger: 'blur' },],
            name: [{ required: true, message: '请输入客户姓名', trigger: 'change' }],
            sexRadio: [{ required: true, message: '请选择性别', trigger: 'change' }],
            channelOne: [{ required: true, message: '请选择渠道', trigger: 'change' }],
            channelTow: [{ required: true, message: ' ', trigger: 'change' }],
            projectTow: [{ required: true, message: '请选择完整项目', trigger: 'change' }],
            counselor: [{ required: false, message: `请选择${this.$store.getters.roleName.adviser}`, trigger: 'change' }],
            remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
        },
        minHeight:0,
        introducerValue:"",
        IntroducerListAllowed:false,
    };
  },
  components: {autoSearchClient},
  methods: {
    //切换介绍人
    myChanged(data){
      this.introducerValue = data.kw
    },

    //选择介绍人
    mySelectd(data){
      this.form.introducerMobile = data.list.mobile;
      this.form.introducerId = data.list.id;
      this.form.introducerText = data.list.name;
      this.introducerValue = data.kw
    },

    // 选择照片
    ChoiceImg(i){
        var tht=this;
        var oFReader = new FileReader();
        var file = i.path[0].files[0];
        oFReader.readAsDataURL(file);
        oFReader.onloadend = (oFRevent) => {
            var src = oFRevent.target.result;
            this.$refs.fileData.style.background='url('+src+') no-repeat center center'
            this.$refs.fileData.style.backgroundSize='100%'
        }

        tht.ImgText = '重新上传';

        let fileObj = file;
        // 接收上传文件的后台地址
        let FileController = tht.action;
        // FormData 对象
        let form = new FormData();
        // 文件对象
        form.append("attach", fileObj);
        form.append("width", 140);
        form.append("height", 140);
        let xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('webToken'))
        // xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
        xhr.onload = () => {
            let res = JSON.parse(xhr.response)
            console.log(res)
            tht.form.headimg = res.data.attach;
        };
        xhr.send(form);
    },

    // 提交表单
    handleSubmit() {
        this.$refs.form.validate((valid) => {
            if (valid) {
                this.addUserFn()
            } 
        })
    },

    //新增提交
    addUserFn(){

        if(this.form.introducerText != this.introducerValue){
            this.$message({
                showClose: true,
                message: "请选择正确介绍人",
                type: 'error',
            });
            return;
        }
      

        let postData = {
            sex :  this.form.sexRadio,
            name :  this.form.name,
            mobile :  this.form.tel,
            consultationId :  this.form.counselor,
            channelPid :  this.form.channelOne,
            channelId :  this.form.channelTow,
            itemPid :  this.form.projectOne,
            itemId :  this.form.projectTow,
            complaint :  this.form.remark,
            headimg :  this.form.headimg,
            development :  this.form.developer,
            introducerId : this.form.introducerId,
            introducerMobile:this.form.introducerMobile,
            width:140,
            height:140
        }

        this.disabled = true

        addUser(postData).then(res => {
            if(res.status == 0){
                this.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success',
                    onClose:()=>{
                        this.$router.push({  
                            path: 'ClientList',   
                        })
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
        }).catch(error=> {
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
            this.disabled = false
        })

    }

  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.minHeight = window.innerHeight - 144;
    let usersId = JSON.parse(localStorage.getItem('CURRENT_USER'))
    if(usersId.role_id == 3){
      this.roleChoosable = true;
      // this.form = {
      //   counselor:usersId.users_id
      // };

        this.form.counselor = usersId.users_id
    }else{
      this.roleChoosable = false;
    }

    getProgramList().then(res => {
        if (res.status == 0) {
            if (res.data.list.zhuanjieshao.allowed == 1) this.IntroducerListAllowed = true;
        }
    }).catch(error=>{
        console.log("getProgramList no");
    })


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

        getProject({ start: 1, perpage: 9999,status:-1}).then(res2 => {
            if(res2.status == 0){
            let __tmp = res2.data.list
            for(let i=0; i<__tmp.length; i++){
                for(let j=0; j<_tmp.length; j++){
                if(__tmp[i].p_id == _tmp[j].id){
                    _tmp[j].children.push(__tmp[i])
                    if(__tmp[i].status.value == 1){
                    _tmp2[j].children.push(__tmp[i])
                    }
                }
                }
            }
            // 2019-11-15 15点15分 陈军修改
            this.$store.commit('SET_PROJECTALLLIST', _tmp)
            this.$store.commit('SET_PROJECTLIST', _tmp2)
            }
        })

        }else{
        this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
        }
    }).catch(error=>{
        this.$message({
        showClose: true,
        message: error,
        type: 'error',
        });
        this.$store.commit('SET_PROJECTLIST', [])
        this.$store.commit('SET_PROJECTLIST1', [])
    })


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
<style>
    .filediv{
        width: 140px;
        height: 140px;
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
        position: relative;
    }
    .filediv input{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        cursor: pointer;
        z-index: 999;
    }
    .filediv .text {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 140px;
        background:rgba(0,0,0,0.4);
        color: #FFFFFF;
        font-size:14px;
    }
</style>
<style lang="scss" scoped>
.AddClient{
    margin: 20px;
    padding: 0 20px 20px;
    background: #fff;
    h3{
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid #E5E5E5;
        line-height: 50px;
    }
    .center{
        margin: .7rem auto 0;
        width: 80%;
        position: relative;
        .user_img{
            position: absolute;
            left: -16%;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 140px;
            .user_text{
                padding: 14px 0 10px;
                color: #333;
                font-size: 14px;
                color: #333;
            }
            .user_text2{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 14px;
                color: #666;
            }   
        }
        .el-row{
            margin-bottom: .1rem;
            .stext{
                padding-left: 120px;
                font-style: normal;
                font-size: 12px;
                color: #FD8137;
                position: relative;
                top:-20px;
            }
        }
        .row_box{
            margin-bottom: .1rem;
        }
    }
    .btn{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
<style>
.AddClient textarea{
    resize: none !important;
}
</style>



    
