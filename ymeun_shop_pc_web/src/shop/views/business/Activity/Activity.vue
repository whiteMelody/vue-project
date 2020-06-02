<template>
  <div class="Activity f14px pa24">

    <div class="bg-white pal15 par15 page-component__scroll">

        <template v-if="!showPrev">
            <p class="h40px lh40px bd-b1 bd-gray fc-gray4">新建活动</p>

            <div class="clear0"></div>

            <div style="padding-left: 200px;">

                <div class="fixed w200px text-center fc-gray2 fixed-nav pointer" style="left: 200px; top:150px; ">

                    <div class="clear0"></div>

                    <p class="f16px nav-p fc-blue6 bd-r2 bd-blue6" @click="to('old')">老客页面设置</p>
                    <p class="f16px mat30 mab30 nav-p" @click="to('new')">新客页面设置</p>
                    <p class="f16px nav-p" @click="to('set')">活动页面设置</p>

                    <div class="w120px center bd-b1 bd-gray mat30 mab30"></div>

                    <template v-if="form.status != 0">
                        <template v-if="disabled">
                            <p class="w95px h30px center bg-white radius1 lh30px bd-gray bd-a1 text-center fc-gray4 mab12">保存中...</p>
                        </template>
                        <template v-else>
                            <p class="w95px h30px center bg-white radius1 lh30px bd-gray bd-a1 text-center fc-gray4 mab12" @click="showPrev = true">预览</p>
                        </template>
                        <template v-if="disabled">
                            <p class="w95px h30px center bg-white radius1 lh30px bd-blue6 bd-a1 fc-blue6 text-center mab12">保存中...</p>
                        </template>
                        <template v-else>
                            <p class="w95px h30px center bg-white radius1 lh30px bd-blue6 bd-a1 fc-blue6 text-center mab12" @click="submit(false)">保存</p>
                        </template>
                    </template>

                    <template v-if="disabled2">
                        <p class="w95px h32px center bg-blue6 radius1 lh32px fc-white text-center">发布中...</p>
                    </template>
                    <template v-else>
                        <p class="w95px h32px center bg-blue6 radius1 lh32px fc-white text-center" @click="submit(true)">发布活动</p>
                    </template>

                </div>

                <div class="wb100 bd-gray bd-l1">
                    <el-form ref="form" :model="form" :rules="rules" label-width="250px">

                        <div class="clear8"></div>

                        <div class="w550px bd-a1 bd-gray mal120">

                            <div class="wb100 img-area">
                                <img src="@/shop/assets/img/img-title.png">
                            </div>

                            <div class="wb100">

                                <el-upload
                                        class="h300px wb100 bg-white1"
                                        :show-file-list="false"
                                        ref="upL" :http-request="uploadSectionFile" :action="action">
                                    <template v-if="form.old_cover">
                                        <div class="w550px h300px relative">
                                            <div class="w550px h300px img-area">
                                                <img :src="form.old_cover">
                                            </div>
                                            <div class="w550px h300px absolute" style="background: rgba(0,0,0,.5); top:0; left: 0;">
                                                <div class="text-center wb100 fc-white" style="margin-top: 90px;">
                                                    <img src="@/shop/assets/img/img-upload.png">
                                                    <p class=" mat25 mab15 f16px">点击上传图片</p>
                                                    <p>图片宽度建议：750PX</p>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="w550px h300px avatar-uploader-icon">
                                            <div class="text-center wb100" style="margin-top: 90px;">
                                                <img src="@/shop/assets/img/img-upload.png">
                                                <p class="fc-gray4 mat25 mab15 f16px">点击上传图片</p>
                                                <p class="fc-gray2">图片宽度建议：750PX</p>
                                            </div>
                                        </div>
                                    </template>

                                </el-upload>

                            </div>

                            <div class="clear4"></div>

                            <div class="wb100">
                                <el-form-item label="标题" prop="share_title" label-width="80px">
                                    <el-input type="text" v-model.trim="form.share_title" placeholder="请输入分享标题" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="描述" prop="share_text" label-width="80px">
                                    <el-input type="textarea" v-model="form.share_text" placeholder="请输入分享描述"></el-input>
                                </el-form-item>
                            </div>

                            <div class="clear4"></div>

                            <div class="w400px h50px lh50px text-center bg-blue6 fc-white f16px center radius5">
                                分享到微信好友/朋友圈
                            </div>

                            <div class="clear4 bd-b1 bd-gray"></div>

                            <p class="h50px lh50px text-center fc-gray4">商家联系电话：{{form.telephone}}</p>

                            <div class="clear4 bg-white1"></div>

                            <div class="pal24 par24">

                                <div class="clear4"></div>

                                <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                                    <div class="clear0 bd-gray bd-b1"></div>
                                    <p class="absolute bg-white w100px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">获奖记录</p>
                                </div>

                                <div class="wb100 h150px">

                                </div>

                                <div class="clear4"></div>

                                <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                                    <div class="clear0 bd-gray bd-b1"></div>
                                    <p class="absolute bg-white w100px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">活动细则</p>
                                </div>

                                <div class="wb100">
                                    <el-input rows="5" type="textarea" v-model="form.introduce" placeholder="请输入分享描述"></el-input>
                                </div>

                                <div class="clear4"></div>

                            </div>

                        </div>

                        <div class="clear8 bd-gray bd-b1"></div>

                        <div class="clear8"></div>

                        <div class="w550px bd-a1 bd-gray mal120">

                            <div class="wb100 img-area">
                                <img src="@/shop/assets/img/img-title.png">
                            </div>

                            <div class="wb100">

                                <el-upload
                                        class="h300px wb100 bg-white1"
                                        :show-file-list="false"
                                        ref="upL" :http-request="uploadSectionFile2"
                                        :action="action">
                                    <template v-if="form.new_cover">
                                        <div class="wb100 h300px relative">
                                            <div class="w550px h300px img-area">
                                                <img :src="form.new_cover">
                                            </div>
                                            <div class="w550px h300px absolute" style="background: rgba(0,0,0,.5); top:0; left: 0;">
                                                <div class="text-center wb100 fc-white" style="margin-top: 90px;">
                                                    <img src="@/shop/assets/img/img-upload.png">
                                                    <p class=" mat25 mab15 f16px">点击上传图片</p>
                                                    <p>图片宽度建议：750PX</p>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="w550px h300px avatar-uploader-icon">
                                            <div class="text-center wb100" style="margin-top: 90px;">
                                                <img src="@/shop/assets/img/img-upload.png">
                                                <p class="fc-gray4 mat25 mab15 f16px">点击上传图片</p>
                                                <p class="fc-gray2">图片宽度建议：750PX</p>
                                            </div>
                                        </div>
                                    </template>

                                </el-upload>

                            </div>

                            <div class="clear4"></div>

                            <div class="pal24 par24">

                                <el-form-item label="提示" prop="new_client_tooltip" label-width="60px">
                                    <el-input type="textarea" rows="5" v-model="form.new_client_tooltip" placeholder="请输入活动提示"></el-input>
                                </el-form-item>

                                <div class="wb100">
                                    <div class="pat25 pab25 pal50 par50 bd-a1 bd-gray radius1">
                                        <p class="f18px text-center mab26">输入手机号，领取豪华大奖</p>
                                        <p class="h40px bg-white1 lh40px text-center">请输入手机号</p>
                                    </div>
                                </div>

                                <div class="clear6"></div>

                                <div class="wb100 h50px lh50px text-center bg-blue6 fc-white f16px center radius5">
                                    马上领取
                                </div>

                                <div class="clear4"></div>

                            </div>

                        </div>

                        <div class="clear8 bd-gray bd-b1"></div>

                        <div class="clear8"></div>

                        <div class="wb100">

                            <el-form-item label="渠道" prop="parent_channel_id">
                                <el-select v-model="form.parent_channel_id" placeholder="选择渠道" readonly clearable>
                                    <el-option :key="''" label="全部渠道" :value="''"></el-option>
                                    <el-option v-for="item in $store.getters.channelList1Map" :key="item.key" :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                                <el-select v-model="form.channel_id" placeholder="选择下级渠道" readonly clearable v-if="form.parent_channel_id">
                                    <el-option v-for="item in $store.getters.channelList2Map(form.parent_channel_id)" :key="item.key" :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>

                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="是否生成邀约回访" prop="is_visit_enabled">
                                <el-radio v-model.trim="form.is_visit_enabled" :label="0">否</el-radio>
                                <el-radio v-model.trim="form.is_visit_enabled" :label="1">是</el-radio>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item  label="新客奖品设置" prop="p1">
                                <el-select v-model="form.p1" placeholder="选择项目类别" readonly clearable>
                                    <el-option :key="''" label="全部项目" :value="''"></el-option>
                                    <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                                <el-select v-model="form.p2" placeholder="选择下级项目" readonly clearable v-if="form.p1">
                                    <el-option v-for="item in $store.getters.projectList2Map(form.p1)" :key="item.key" :label="item.value"
                                               :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="新客奖品数量" prop="quantity">
                                <el-input type="number" class="w200px" v-model.trim="form.quantity" placeholder="请输入新客奖品数量" clearable></el-input>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="老客界定" prop="old">
                                <el-radio v-model="form.old" :label="1">留电话</el-radio>
                                <el-radio v-model="form.old" :label="2">分诊过</el-radio>
                                <el-radio v-model="form.old" :label="3">消费过</el-radio>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="老客奖品设置" prop="set">
                                <el-radio v-model.trim="form.set" :label="1">券</el-radio>
                                <el-radio v-model.trim="form.set" :label="2">项目</el-radio>
                            </el-form-item>

                            <div class="clear0"></div>

                            <template v-if="form.set == 1">
                                <el-form-item label="老客券额设置" prop="old_quan">
                                    <el-input type="number" v-model.trim="form.old_quan" class="w200px" placeholder="请输入老客券额" clearable></el-input>
                                </el-form-item>
                            </template>

                            <template v-else-if="form.set == 2">
                                <el-form-item label="老客奖品设置" prop="o1">
                                    <el-select v-model="form.o1" placeholder="选择项目类别" readonly clearable>
                                        <el-option :key="''" label="全部项目" :value="''"></el-option>
                                        <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                                   :value="item.key"></el-option>
                                    </el-select>
                                    <el-select v-model="form.o2" placeholder="选择下级项目" readonly clearable v-if="form.o1">
                                        <el-option v-for="item in $store.getters.projectList2Map(form.o1)" :key="item.key" :label="item.value"
                                                   :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>

                            <div class="clear0"></div>

                            <div style="width: 523px; margin-left: 120px;">
                                <div class="clear4 bd-t1 bd-gray"></div>
                            </div>

                            <el-form-item label="活动开始时间" prop="startTime">
                                <el-date-picker
                                        class="w200px"
                                        v-model="form.startTime"
                                        :clearable="false"
                                        type="datetime"
                                        :disabled="activityState==1 || activityState == 2"
                                        placeholder="选择活动开始时间">
                                </el-date-picker>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="活动结束时间" prop="stopTime">
                                <el-date-picker
                                        class="w200px"
                                        v-model="form.stopTime"
                                        :clearable="false"
                                        type="datetime"
                                        placeholder="选择活动结束时间">
                                </el-date-picker>
                            </el-form-item>

                            <div class="clear0"></div>

                            <el-form-item label="商家联系电话" prop="telephone">
                                <el-input type="text" class="w200px" v-model.trim="form.telephone" placeholder="请输入商家联系电话" clearable></el-input>
                            </el-form-item>

                        </div>

                    </el-form>
                </div>

            </div>

            <div class="clear4"></div>
        </template>

        <template v-else>

            <p class="h40px lh40px bd-b1 bd-gray fc-gray4">预览活动</p>

            <div class="clear0"></div>

            <div style="padding-left: 200px;">

                <div class="fixed w200px text-center fc-gray2 fixed-nav" style="left: 200px; top:150px; ">

                    <div class="clear0"></div>

                    <p class="f16px nav-p fc-blue6 bd-r2 bd-blue6" @click="to('old')">老客活动页面</p>
                    <p class="f16px nav-p mat30 mab30" @click="to('new')">新客活动页面</p>

                    <div class="w120px center bd-b1 bd-gray mat30 mab30"></div>
<!--                                <p class="w95px h32px center bg-blue6 radius1 lh32px fc-white text-center" @click="saveMsg(1)">发布活动</p>-->
                    <!--            <p class="w95px h30px center bg-white radius1 lh30px bd-blue6 bd-a1 fc-blue6 text-center mat12 mab12" @click="saveMsg(2)">保存</p>-->
                    <p class="w95px h30px center bg-white radius1 lh30px bd-gray bd-a1 text-center fc-gray4" @click="showPrev = false">取消</p>

                </div>

                <div class="wb100 bd-gray bd-l1">

                    <div class="clear8"></div>

                    <div class="w550px bd-a1 bd-gray mal120">

                        <div class="wb100 img-area">
                            <img src="@/shop/assets/img/img-title.png">
                        </div>

                        <div class="wb100 h300px img-area">
                            <img :src="form.old_cover">
                        </div>

                        <div class="clear4"></div>

                        <div class="pal24 par24">
                            <p class="f18px fc-gray4 h18px lh18px">{{form.share_title}}</p>
                            <div class="clear4"></div>
                            <p class="f14px text-over-hidden3 fc-gray2 lh16px">{{form.share_text}}</p>
                        </div>

                        <div class="clear8"></div>

                        <div class="w400px h50px lh50px text-center bg-blue6 fc-white f16px center radius5">
                            分享到微信好友/朋友圈
                        </div>

                        <div class="clear4 bd-b1 bd-gray"></div>

                        <p class="h50px lh50px text-center fc-gray4">商家联系电话：{{form.telephone}}</p>

                        <div class="clear4 bg-white1"></div>

                        <div class="pal24 par24">

                            <div class="clear4"></div>

                            <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                                <div class="clear0 bd-gray bd-b1"></div>
                                <p class="absolute bg-white w100px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">获奖记录</p>
                            </div>

                            <div class="wb100">
                                <p class="text-center">已成功分享给 <span class="fc-orange">X</span> 名小伙伴，你共获得 <span class="fc-orange">X</span> 份奖励</p>
                                <div class="clear3"></div>

                                <div class="bg-white1 pa24 bd-gray bd-a1 radius1">
                                    <div class="wb100">

                                        <div class="wb100">
                                            <img src="@/shop/assets/img/icon-logo.png" class="w40px h40px fl mar15">
                                            <div class="fl lh15px">
                                                <p class="fc-gray4 f16px mab10">微信昵称</p>
                                                <p class="fc-gray2">2019-08-14 16:57</p>
                                            </div>
                                            <div class="fr f16px fc-gray4 lh40px">
                                                瘦脸针 1支
                                            </div>
                                        </div>
                                        <div class="clear6"></div>

                                        <div class="wb100">
                                            <img src="@/shop/assets/img/icon-logo.png" class="w40px h40px fl mar15">
                                            <div class="fl lh15px">
                                                <p class="fc-gray4 f16px mab10">微信昵称</p>
                                                <p class="fc-gray2">2019-08-14 16:57</p>
                                            </div>
                                            <div class="fr f16px fc-gray4 lh40px">
                                                瘦脸针 1支
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clear0"></div>
                                </div>

                            </div>

                            <div class="clear4"></div>

                            <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                                <div class="clear0 bd-gray bd-b1"></div>
                                <p class="absolute bg-white w100px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">活动细则</p>
                            </div>

                            <div class="wb100">
                                <div class="pa15 bd-a1 bd-gray radius1 lh18px">
                                    <p> {{form.introduce}}</p>
                                </div>
                            </div>

                            <div class="clear4"></div>

                        </div>

                    </div>

                    <div class="clear8 bd-gray bd-b1"></div>

                    <div class="clear8"></div>

                    <div class="w550px bd-a1 bd-gray mal120">

                        <div class="wb100 img-area">
                            <img src="@/shop/assets/img/img-title.png">
                        </div>

                        <div class="wb100 h300px img-area">
                            <img :src="form.new_cover">
                        </div>

                        <div class="clear4"></div>

                        <div class="pal24 par24">

                            <p class="fc-gray3 lh36px f18px"> {{form.new_client_tooltip}} </p>

                            <div class="clear10"></div>

                            <div class="w400px h50px lh50px text-center f16px center radius5 bd-gray bd-a1">
                                <input type="text" class="h50px lh50px bd-none text-center" placeholder="请输入手机号领礼品">
                            </div>

                            <div class="clear6"></div>

                            <div class="w400px h50px lh50px text-center bg-blue6 fc-white f16px center radius5">
                                点击领取
                            </div>

                            <div class="clear4"></div>

                        </div>

                    </div>

                    <div class="clear8 bd-gray bd-b1"></div>

                </div>

            </div>

            <div class="clear4"></div>


        </template>

    </div>

  </div>
</template>
<script>

    import {getInfo, save} from  "@/shop/assets/api/activity/activity"

export default {
  name: "Activity",
  data() {
    return {
        action:  this.$base.getStoreHost('dev') + '/post/attachment/document/upload',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('webToken'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        activityState: -1,

      form: {
          old_cover: null,
          new_cover: null,
          share_title: null,
          share_text: null,
          introduce: null,
          new_client_tooltip: null,
          parent_channel_id: '',
          channel_id: null,
          is_visit_enabled: 0,
          p1: null,
          p2: null,
          old: 1,
          set: 1,
          old_quan: null,
          o1: null,
          o2: null,
          startTime: null,
          stopTime: null,
          telephone: null,
          quantity: null,
      },

        scrollIndex:0,

        id: '',
        isEdit: false,
        disabled: false,
        disabled2: false,
        showPrev: false,

      rules:{
        share_title: [{required: true, message: '请输入分享标题', trigger: 'change'}],             //分享标题
        share_text: [{required: true, message: '请输入分享描述', trigger: 'change'}],              //分享描述
        // introduce: [{required: true, message: '请输入活动细则', trigger: 'change'}],               //活动细则
        new_client_tooltip: [{required: true, message: '请输入活动提示', trigger: 'change'}],      //活动提示
        parent_channel_id: [{required: true, message: '请选择渠道', trigger: 'change'}],           //渠道
        channel_id: [{required: true, message: '请选择下级渠道', trigger: 'change'}],              //下级渠道
        is_visit_enabled: [{required: true, message: '请选择邀约回访', trigger: 'change'}],        //是否生成邀约回访
        p1: [{required: true, message: '请选择新客奖品', trigger: 'change'}],                      //新客奖品
        p2: [{required: true, message: '请选择奖品下级', trigger: 'change'}],                      //新客奖品下级
        quantity: [{required: true, message: '请输入新客奖品数量', trigger: 'change'}],              //新客奖品数量
        old: [{required: true, message: '请选择老客界定', trigger: 'change'}],                     //老客界定
        set: [{required: true, message: '请选择老客奖品设置', trigger: 'change'}],                 //老客奖品设置
        old_quan: [{required: true, message: '请输入老客券额', trigger: 'change'}],                //老客券额
        o1: [{required: true, message: '请选择老客奖品', trigger: 'change'}],                      //老客奖品
        o2: [{required: true, message: '请选择奖品下级', trigger: 'change'}],                      //老客奖品下级
        startTime: [{required: true, message: '请选择活动开始时间', trigger: 'change'}],           //活动开始时间
        stopTime: [{required: true, message: '请选择活动结束时间', trigger: 'change'}],            //活动结束时间
        telephone: [{required: true, message: '请输入商家联系电话', trigger: 'change'}],           //商家联系电话
      },
    };
  },
  components: {},
  methods: {
      uploadSectionFile(param) {
          console.log(param.file);
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
              console.log(res)
              this.form.old_cover = res.data.attach;
          };
          xhr.send(form);
      },

      uploadSectionFile2(param) {
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
              console.log(res)
              this.form.new_cover = res.data.attach
          };
          xhr.send(form);
      },

      to(type){

          if(this.showPrev){
              if(type == 'old'){
                  $(window).scrollTop(0)
              }else{
                  $(window).scrollTop(1000)
              }
          }else{
              if(type == 'old'){
                  $(window).scrollTop(0)
              }else if(type == 'new'){
                  $(window).scrollTop(1250)
              }else{
                  $(window).scrollTop(1750)
              }
          }

      },

      submit(flag){

          let _form = this.form
          _form.flexibleId = this.id

          let prize = []

          if(_form.set == 2){
              prize.push({
                  devide: _form.old ? _form.old : 1,
                  style:  _form.set ? _form.set : 0,
                  parent_item_id: _form.o1 ? _form.o1 : 0,
                  item_id: _form.o2 ? _form.o2 : 0,
                  amount: 0,
                  cash:0,
                  quantity: _form.quantity ? _form.quantity : 0,
              })
          }else if(_form.set == 1){
              prize.push({
                  devide: _form.old ? _form.old : 1,
                  style:  _form.set ? _form.set : 0,
                  cash: _form.old_quan ? _form.old_quan : 0,
                  parent_item_id: 0,
                  item_id: 0,
                  amount: 0,
                  quantity: _form.quantity ? _form.quantity : 0,
              })
          }

          prize.unshift({
              style: 2,
              parent_item_id: _form.p1 ? _form.p1 : 0,
              item_id: _form.p2 ? _form.p2 : 0,
              amount: 0,
              cash:0,
              quantity: _form.quantity ? _form.quantity : 0,
              devide: 0,
          })

          _form.prize = JSON.stringify(prize)

          //发布，需要验证表单必填
        if(flag){
            this.$refs.form.validate((valid) => {
                if (valid) {

                    //判断图片

                    if(this.$base.isNull(this.form.new_cover)){
                        this.$message({
                            message: '请上传老客封面',
                            type: 'error'
                        })
                        return
                    }
                    if(this.$base.isNull(this.form.old_cover)){
                        this.$message({
                            message: '请上传新客封面',
                            type: 'error'
                        })
                        return
                    }

                    this.disabled2 = true

                    _form.mode = 1

                    save(_form).then(res=>{
                        if(res.status == 0){
                            this.$message({
                                message: '发布活动成功',
                                type: 'success',
                                onClose:()=>{
                                    this.$router.go(-1)
                                    this.id = res.data.flexibleId
                                    this.disabled2 = false
                                }
                            })
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                            this.disabled2 = false
                        }
                    })
                } else {
                    this.$message({
                        message: '请检查表单',
                        type: 'error'
                    })
                }
            })
        }else{
            //保存

            _form.mode = 0

            this.disabled = true
            save(_form).then(res=>{
                if(res.status == 0){
                    this.$message({
                        message: '保存活动成功',
                        type: 'success'
                    })
                    this.id = res.data.flexibleId
                    this.disabled = false
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                    this.disabled = false
                }
            })
        }

      },

  },

  // 挂载结束状态
  mounted() {

      let _this = this

      let isEdit = this.$route.query.isEdit ? true : false

      let id = this.$route.query.id

      if(isEdit){
          getInfo({
              flexibleId: id
          }).then(res=>{
              if(res.status == 0){
                  let _tmp = res.data
                // this.form = res.data

                  this.id = _tmp.id || _tmp.flexibleId

                  if(!this.$base.isNull(_tmp.prize_old)){
                      let prize = _tmp.prize_old
                      if(prize.style == 2){
                          this.form.o1 = prize.parent_item_id
                          this.form.o2 = prize.item_id
                      }else if(prize.style == 1){
                          this.form.old_quan = prize.cash
                      }
                      this.form.old = prize.devide
                      this.form.set = prize.style
                  }

                  if(!this.$base.isNull(_tmp.prize_new)){
                      let prize = _tmp.prize_new
                      this.form.p1 = prize.parent_item_id
                      this.form.p2 = prize.item_id
                      this.form.quantity = prize.quantity
                  }

                  this.form.startTime = this.$base.dateTimeToDate(_tmp.start_time, 'Date')
                  this.form.stopTime = this.$base.dateTimeToDate(_tmp.stop_time, 'Date')
                  this.form.old_cover = res.data.old_cover
                  this.form.new_cover = res.data.new_cover
                  this.form.share_title = res.data.share_title
                  this.form.share_text = res.data.share_text
                  this.form.introduce = res.data.introduce
                  this.form.new_client_tooltip = res.data.new_client_tooltip
                  this.form.parent_channel_id = res.data.parent_channel_id
                  this.form.channel_id = res.data.channel_id
                  this.form.is_visit_enabled = res.data.is_visit_enabled
                  this.form.telephone = res.data.telephone
                  this.form.status = res.data.status

                  //判断活动状态
                  let now = this.$base.dateTimeToDate( new Date(), 'time')
                  let start = this.$base.dateTimeToDate( res.data.start_time, 'time')
                  let end = this.$base.dateTimeToDate( res.data.stop_time, 'time')

                  if(now < start){
                      //未开始
                      this.activityState = 3
                  }else if(now > start && now < end){
                      //开启中
                      this.activityState = 1
                  }else if(now > end){
                      //结束
                      this.activityState = 2
                  }else{
                      this.activityState = -1
                  }

              }
          })
      }

      window.onscroll = function (e) {

          if(_this.showPrev){
              if($(window).scrollTop() <= 1200){
                  this.scrollIndex = 0
              }else if($(window).scrollTop() > 1200 && $(window).scrollTop() < 1750 ){
                  this.scrollIndex = 1
              }else if($(window).scrollTop() >= 1750){
                  this.scrollIndex = 2
              }
              $('.nav-p').removeClass('fc-blue6').removeClass('bd-blue6').removeClass('bd-r2')
              $('.nav-p').eq(this.scrollIndex).addClass('fc-blue6').addClass('bd-blue6').addClass('bd-r2')


              if($(window).scrollTop() <= 10){
                  $('.fixed-nav').css({
                      top: '150px'
                  })
              }else{
                  $('.fixed-nav').css({
                      top: '40px'
                  })
              }
          }else{

              if($(window).scrollTop() < 1000){
                  this.scrollIndex = 0
              }else{
                  this.scrollIndex = 1
              }
              $('.nav-p').removeClass('fc-blue6').removeClass('bd-blue6').removeClass('bd-r2')
              $('.nav-p').eq(this.scrollIndex).addClass('fc-blue6').addClass('bd-blue6').addClass('bd-r2')

              if($(window).scrollTop() <= 10){
                  $('.fixed-nav').css({
                      top: '150px'
                  })
              }else{
                  $('.fixed-nav').css({
                      top: '40px'
                  })
              }
          }
      }


      // id:活动ID
      // enterprise_id:企业ID,
      //     store_id:店铺DI,
      //     title:活动标题,
      //     channel_id:二级渠道,
      //     parent_channel_id:一级取代,
      //     url:活动链接,
      //     cover:活动封面图,
      //     comment:活动备注,
      //     start_time:开始时间,
      //     stop_time:结束时间,
      //     qr_code:活动二维码,
      //     is_visit_enabled:是否生成邀约回访,
      //     adviser_users_id:顾问ID,
      //     sale_users_id:开发人员,
      //     old_cover:老客封面图,
      //     introduce:活动细则,
      //     share_title:分享标题,
      //     share_text:分享介绍,
      //     new_cover:新客封面图,
      //     new_client_tooltip:新客话术,
      //     visitor_num:访问量,
      //     view_num:浏览器,
      //     share_num:分享量,
      //     partake_num:奖品量,
      //     remark:备注,
      //     status:状态,
      //     created_at:创建时间,
      //     updated_at:更新时间,
      //     list[status][label]:活动状态标签
      // list[status][value]:活动状态值


  },

};
</script>

<style>

</style>


    
