<template>
  <!--    工具箱&个人中心    -->
  <div class="wb100">
    <div class="absolute pointer fc-gray3" style="top: 15px; right: 15px; width: 435px; height: 100px; ">

      <div class="h25px lh25px pat10 pab10 bg-white fl" style="width: 375px" v-show="!isShow3D">
        <div class="w50px pal12 par12 fl border-right" @click="openMarkControl" :class="activeTool == 'markControl' ? 'fc-blue' : '' ">
          <i class="iconfont iconpersonLocation fl"></i>
          <span class="fr">标注</span>
        </div>
        <div class="w50px pal12 par12 fl border-right" @click="openMeasureControl" :class="activeTool == 'measureControl' ? 'fc-blue' : ''">
          <i class="iconfont iconceliang fl"></i>
          <span class="fr">测量</span>
        </div>
        <div class="w50px pal12 par12 fl border-right" :class="activeTool == 'elevation' ? 'fc-blue' : ''" @click="openElevation">
          <i class="iconfont iconhaiba fl"></i>
          <span class="fr">海拔</span>
        </div>
        <div class="w50px pal12 par12 fl border-right" :class="activeTool == 'orientation' ? 'fc-blue' : ''" @click="openOrientation">
          <i class="iconfont iconfangweijiao fl"></i>
          <span class="fr">方位</span>
        </div>
        <div class="w50px pal12 par12 fl" :class="activeTool == 'compass' ? 'fc-blue' : ''" @click="openCompass">
          <i class="iconfont iconluopan fl"></i>
          <span class="fr">罗盘</span>
        </div>
      </div>
      <div class="w50px h50px fr" style="margin-top: -2px;" @click="toUserCenter">
        <template v-if="user.avatar">
          <img :src="user.avatar" class="w50px h50px radius10 bd-gray bd-a">
        </template>
        <template v-else>
          <img :src="defavatar" class="w50px h50px">
        </template>
      </div>

      <div class="clear0"></div>

      <div class="h25px lh25px pat10 pab10 bg-white" v-show="showArea1" style="width: 375px">
        <div class="kailong position" style="top: 44px;left: 28px;"></div>
        <div class="w50px pal21 par21 fl border-right" @click="markPoint" :class="activeTool == 'markPoint' ? 'fc-blue' : '' ">
          <i class="iconfont iconbiaodian fl"></i>
          <span class="fr">标点</span>
        </div>
        <div class="w50px pal21 par21 fl border-right" @click="markLine" :class="activeTool == 'markLine' ? 'fc-blue' : ''">
          <i class="iconfont icongonglubiaoxiandian fl"></i>
          <span class="fr">标线</span>
        </div>
        <div class="w50px pal21 par21 fl border-right" @click="markPolygon" :class="activeTool == 'markPolygon' ? 'fc-blue' : ''">
          <i class="iconfont iconbiaomian fl"></i>
          <span class="fr">标面</span>
        </div>
        <div class="w50px pal21 par21 fl" @click="markClear" :class="activeTool == 'markClear' ? 'fc-blue' : ''">
          <i class="iconfont iconqingchu fl"></i>
          <span class="fr">清除</span>
        </div>
      </div>

      <div class="h25px lh25px pat10 pab10 bg-white" v-show="showArea2" style="width: 375px">
        <div class="kailong position" style="top: 44px;left: 104px;"></div>
        <div class="w50px pal37 par37 fl border-right" @click="measureDistance" :class="activeTool == 'measureDistance' ? 'fc-blue' : '' ">
          <i class="iconfont iconceju fl"></i>
          <span class="fr">测距</span>
        </div>
        <div class="w50px pal37 par37 fl border-right" @click="measureArea" :class="activeTool == 'measureArea' ? 'fc-blue' : ''">
          <i class="iconfont icongongjuxiang-kongjianjuli fl"></i>
          <span class="fr">测面</span>
        </div>
        <div class="w50px pal37 par37 fl" @click="markClear" :class="activeTool == 'markClear' ? 'fc-blue' : ''">
          <i class="iconfont iconqingchu fl"></i>
          <span class="fr">清除</span>
        </div>
      </div>

      <div class="clear0"></div>

      <div class="dialog-transparency" v-show="isShowUserInfo" @click="isShowUserInfo = false"></div>
      <!-- 老版本登录 -->
      <div class="w240px h160px bg-white absolute radius1" style="top:60px; right: 0; z-index: 99999" v-show="isShowUserInfo">
        <div class="pa10">
          <img :src="user.avatar" class="w30px h30px radius10 fl">
          <span class="fl mal10 h30px lh30px">{{user.nickname}}</span>
          <span class="fr h20px lh20px pal5 par5 bg-gray mat5 fc-gray2 text-center f12px">免费版用户</span>
        </div>
        <div class="clear1 bd-gray bd-b1"></div>

        <div class="pa10 lh30px">
          <p>
            <span class="fl w85px">微信公众号：</span>
            <span class="fl">新知地图</span>
          </p>
          <p>
            <span class="fl w85px">官方QQ群：</span>
            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d3a9c5bde03ca22bc1f72af7af37eba484987b65c296f6ec8b0993fb19a9ee30"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" class="fl mat4" alt="新知地图" title="新知地图"></a>
          </p>
        </div>

        <div class="clear1 bd-gray bd-b1"></div>

        <p class="text-center h40px lh40px fc-gray2 pointer" @click="logout">退出登录</p>

      </div>

    </div>
    <!--右下角操作栏-->
    <div class="absolute pointer fc-gray3" style="right: 15px; bottom: 5px;">

      <template v-if="isShow3D">
        <!--3D-->
        <!--      罗盘      -->
<!--        <div class="amap-controlbar" style="right: -15px; bottom: 35px;">-->
<!--          <div class="amap-luopan">-->
<!--            <div class="amap-luopan-bg"></div>-->
<!--            <div class="amap-compass" :style="'transform: rotateX('+ rotate3DX +'deg) rotateZ('+ rotate3DZ +'deg);'">-->
<!--              <div class="amap-pointers" @click="resetCompass"></div>-->
<!--            </div>-->
<!--            <div class="amap-pitchUp" @click="pitchUp"></div>-->
<!--            <div class="amap-pitchDown" @click="pitchDown"></div>-->
<!--            <div class="amap-rotateLeft" @click="rotateLeft"></div>-->
<!--            <div class="amap-rotateRight" @click="rotateRight"></div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="clear0"></div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat4" :class="activeTool == 'local' ? 'fc-blue' : ''" @click="openLocal">
          <i class="iconfont icondingwei"></i>
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat4 f14px fc-blue" @click="swicth3D">
          3D
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f18px" @click="_zoomIn">
          <i class="el-icon-plus fc-gray3 f18px fl ma7"></i>
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f22px" @click="_zoomOut">
          <i class="el-icon-minus fc-gray3 f18px fl ma7"></i>
        </div>
      </template>
      <template v-else>
        <!--2D-->
        <!--      罗盘      -->
        <div class="amap-controlbar" style="right: -15px; bottom: 65px;">
          <div class="amap-luopan">
            <div class="amap-luopan-bg"></div>
            <div class="amap-compass" :style="'transform: rotateX('+ rotateX +'deg) rotateZ('+ rotateZ +'deg);'">
              <div class="amap-pointers" @click="resetCompass"></div>
            </div>
            <div class="amap-pitchUp" @click="pitchUp"></div>
            <div class="amap-pitchDown" @click="pitchDown"></div>
            <div class="amap-rotateLeft" @click="rotateLeft"></div>
            <div class="amap-rotateRight" @click="rotateRight"></div>
          </div>
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5" :class="activeTool == 'local' ? 'fc-blue' : ''" @click="openLocal">
          <i class="iconfont icondingwei"></i>
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f14px fc-blue" @click="swicth3D">
          2D
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f14px">
          {{_mapZoom()}}
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f18px" @click="_zoomIn">
          <i class="el-icon-plus fc-gray3 f18px fl ma7"></i>
        </div>
        <div class="h32px w32px lh32px pointer text-center bg-white pointer mat5 f22px" @click="_zoomOut">
          <i class="el-icon-minus fc-gray3 f18px fl ma7"></i>
        </div>
      </template>

    </div>
     <div class="center fixed bg-white radius1" style="height: 370px; top:0; left: 0; right: 0; bottom: 0; margin: auto; z-index: 999999; width:400px" v-show="showLoginDialog">
        <template v-if="!showQRCode">
            <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
                <span class="fl f16px fc-blue">用户登录/注册</span>
                <i class="el-icon-close fr fc-gray3 f20px mat15" @click="shutLogin" style="cursor: pointer;" ></i>
            </p>
            <div class="clear2"></div>

            <div class="pa15">

                <div class="wb100 h45px bd-gray1 bd-a1 radius1">
                    <div class="fl mar10 w50px text-center h25px lh25px mat10 bd-gray1 bd-r1 fc-gray3">
                        +86
                    </div>
                    <div class="fl my-search" style="width: calc(100% - 70px);">
                        <el-input v-model="loginForm.mobile" placeholder="请输入手机号" class="h45px lh45px fc-gray3"></el-input>
                    </div>
                </div>

                <div class="clear4"></div>

                <div class="wb100 h45px bd-gray1 bd-a1 radius1">

                    <div class="fl mal8 my-search bd-gray1 bd-r1" style="width: calc(100% - 130px);">
                        <el-input v-model="loginForm.code" placeholder="请输入短信验证码" class="h45px lh45px fc-gray3"></el-input>
                    </div>
                    <div class="fl w120px text-center h45px lh45px fc-gray3 bg-white1" @click="sendCode" style="cursor: pointer;" >
                        {{timer == 0 ? '发送验证码' : timer + '秒重新发送' }}
                    </div>
                </div>

                <div class="clear4"></div>
                <div class="wb100 h40px lh40px text-center fc-white center bg-blue radius1" style="cursor: pointer;" @click="loginByMobile">
                    立即登录
                </div>
            </div>
            <div class="clear2"></div>
            <div class="w100px h30px lh30px center bg-white relative text-center fc-gray2 f12px" style="z-index: 9;">
                第三方登录
            </div>
            <div class="clear2 bd-gray bd-b1" style="margin-top: -25px;"></div>
            <div class="clear4"></div>
            <div class="w100px h40px lh40px text-center fc-gray3 center bg-white radius1" @click="wxLogin" style="cursor: pointer;" >
                <i class="iconfont iconweixin fc-green7 f30px fl"></i> <span class="fr">微信登录</span>
            </div>
        </template>

        <template v-else>
            <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
                <span class="fl f16px fc-green">微信扫码登录</span>
                <i class="el-icon-close fr fc-gray3 f20px mat15" @click="loginCancel(); showLoginDialog = false;"></i>
            </p>
            <div class="clear4"></div>
            <div class="text-center">
                <img :src="'http://'+qrcodeUrl" class="w120px h120px">
            </div>
            <p class="h50px lh50px text-center">扫描二维码并关注公众号，即可开启扫码登录功能</p>
            <div class="clear2"></div>
            <div class="wb80 h40px lh40px text-center fc-white center bg-blue radius1" @click="loginCancel" style="cursor: pointer;" >
                使用手机号登录
            </div>
        </template>
    </div>

  </div>

</template>

<script>

  import {getValidCode, getwxloginqr, getuserbylstoken, regOrLoginByPhone } from '@/assets/api/login/login'

  import { attribution, imperial } from '@/assets/map/controls.js'

  import { mapTool, distanceTool, areaTool, pointTool, posLayer, posMarker, luopanLayer, luopanMarker, luopanCrossMarker } from '@/assets/map/tools.js'

  export default {
    name: 'tools',
    props: {
      map: {
        type: Object,
        require: true,
      },

      viewer: {
        type: Object,
        require: true,
      },

      mapTools:{
        type: Object,
        require: false,
        default: ()=> {
          return {
            mapTool: {},
            pointTool: {},
            areaTool: {},
            distanceTool: {},
            attribution: {},
            imperial: {},
            posLayer: {},
            posMarker: {},
            luopanLayer: {},
            luopanMarker: {},
            luopanCrossMarker: {},
          }
        },
      },
    },
    computed: {

    },
    components: {},
    data() {
      return {
        activeTool: '',
        showArea1: false,
        showArea2: false,
        once: true,

        rotateX: 0,
        rotateZ: 0,

        rotate3DX: 0,
        rotate3DZ: 0,

        user: {},
        showQRCode: false,
        lstoken: '',
        qrcodeUrl: '',
        timer: 0,
        loginTimer: 0,
        defavatar: require('@/assets/img/defavatar.png'),
        isShowUserInfo: false,
        isWatchIng: false,

        isShow3D: false,

        Cesium: require('cesium/Cesium'),
        widgets: require('cesium/Widgets/widgets.css'),

        local: {},

        heading: 0,
        pitch: -90,
        roll: 0,
        showLoginDialog:false,
        isSend: false,
        loginForm: {
          mobile: '',
          code: '',
        },
      
      }
    },
    mounted() {
      this.$uvue.$on('setShowLoginDialog',(value)=>{
        this.showLoginDialog = value
      })
      let user = this.$store.getters.currentUser

      if(!this.$base.isNull(user)){
        if(user.nickname){
          this.user = user
        }
      }

      this.local = this.$parent.mapLocal

    },
    methods: {
      // 登录判断
      toUserCenter(){
        if(!this.user.nickname){

          if(this.isLoginIng)
            return

          this.isShowUserInfo = false
          this.showLoginDialog = true
        }else{
          this.isShowUserInfo = true
        }
      },
      // 注册
      sendCode(){

        if(this.$base.isNull(this.loginForm.mobile)){
            //-
            if(window.plus){
                plus.nativeUI.toast("请输入手机号",{duration:"long"});
            }else{
                this.$message({
                    message: '请输入手机号',
                    type: 'success'
                })
            }
            return
        }

        if(this.loginForm.mobile.length != 11){
            //-
            if(window.plus){
                plus.nativeUI.toast("请输入11位手机号",{duration:"long"});
            }else{
                this.$message({
                    message: '请输入11位手机号',
                    type: 'success'
                })
            }
            return
        }

        if(this.isSend)
            return

        this.isSend = true

        if(window.plus){
            //使用uni-app的t
            window.requestGetValidCode({
                phone: this.loginForm.mobile
            },(res=>{
                res = JSON.parse(res)
                if(res.status == 'ok'){
                    this.openTimer()
                    plus.nativeUI.toast("发送成功",{duration:"long"});
                }else{
                    //登录失败
                    plus.nativeUI.toast("发送失败，请稍后重试",{duration:"long"});
                }
            }))
        }else{
            getValidCode({
                phone: this.loginForm.mobile
            }).then(res=>{
                if(res.status == 'ok'){
                    this.$message({
                        message: '发送成功',
                        type: 'success'
                    })
                    this.openTimer()
                }else{
                    this.$message({
                        message: '发送失败，请稍后重试',
                        type: 'error'
                    })
                }
            })
        }

      },
      openTimer(){
        this.timer = 120
        this.codeTimer = window.setInterval(()=>{
          this.timer --
          if(this.timer <=0){
            this.timer = 0
            this.isSend = false
            window.clearInterval(this.codeTimer)
          }
        },1000)
      },
      // 登录
      loginByMobile(){

        if(this.$base.isNull(this.loginForm.code)){
            //-
            if(window.plus){
                plus.nativeUI.toast("请输入验证码",{duration:"long"});
            }else{
                this.$message({
                    message: '请输入验证码',
                    type: 'success'
                })
            }
            return
        }

        if(this.loginForm.code.length != 4){
            //-
            if(window.plus){
                plus.nativeUI.toast("请输入4位验证码",{duration:"long"});
            }else{
                this.$message({
                    message: '请输入4位验证码',
                    type: 'success'
                })
            }
            return
        }

        if(window.plus){
            //使用uni-app的request
            window.requestRegOrLoginByPhone({
                phone: this.loginForm.mobile,
                code: this.loginForm.code,
            },(res=>{
                res = JSON.parse(res)
                if(res.status == 'ok'){
                    this.showLoginDialog = false
                    this.$store.commit('SET_CURRENT_USER', res.user)
                    this.user = res.user
                    plus.nativeUI.toast("登录成功",{duration:"long"});
                }else{
                    //登录失败
                    plus.nativeUI.toast("登录失败，请检查验证码",{duration:"long"});
                }
            }))
        }else{
            regOrLoginByPhone({
                phone: this.loginForm.mobile,
                code: this.loginForm.code,
            }).then(res=>{
              if(!this.$base.isNull(res.user)){                  
                if( res.user.avatar == null ){
                  res.user.avatar = require('@/assets/img/logo.png')
                }
                this.showLoginDialog = false
                // this.timer = 0
                // window.clearInterval(this.codeTimer)
                this.$store.commit('SET_CURRENT_USER', res.user)
                this.user = res.user
                this.loginForm = {
                  mobile: '',
                  code: '',
                }
                this.$uvue.$emit('setSearchKwValue',false)
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: '登录失败，请检查验证码',
                  type: 'error'
                })
              }
            })
        }

      },
      // 退出登录
      logout(){
        if(window.plus)
            window.logout(()=>{})
        this.user = {}
        this.$store.commit('SET_CURRENT_USER', {})
        this.isShowUserInfo = false

        this.$uvue.$emit('synthesize')
        this.$message({
          message: '退出登录',
          type: 'info'
        })

      },
      // 微信登录
      wxLogin(){
        if(window.plus){
          window.login((user)=>{
            //使用uni-app的request
            window.requestOweixin({
              openid: user.openid,
              nickname: user.nickname,
              sex: user.sex,
              avatar: user.headimgurl,
              unionid: user.unionid,
            },(res=>{
              res = JSON.parse(res)
              if(res.status == 'ok'){

                this.showQRCode = false
                this.showLoginDialog = false
                this.$store.commit('SET_CURRENT_USER', res.user)
                this.user = res.user

                plus.nativeUI.toast("登录成功",{duration:"long"});

              }else{
                //登录失败
                plus.nativeUI.toast("登录失败",{duration:"long"});
              }
            }))
          })
        }else{
          //弹出微信二维码
          getwxloginqr({}).then(res=>{
            if(res.lstoken){
              this.lstoken = res.lstoken
              this.qrcodeUrl = res.qrcode
              this.showQRCode = true
              this.watchLogin()
              this.isLoginIng = true
            }
          })
        }
      },
      loginCancel(){
          this.showQRCode = false
          window.clearInterval(this.loginTimer)
          this.isWatchIng = false
          this.isLoginIng = false
      },

      loginSuccess(user){
          this.showQRCode = false
          this.showLoginDialog = false
          window.clearInterval(this.loginTimer)
          this.$store.commit('SET_CURRENT_USER', user)
          this.user = user

          if(window.plus){
              plus.nativeUI.toast("登录成功",{duration:"long"});
          }else{
              this.$message({
                  message: '登录成功',
                  type: 'success'
              })
          }
          this.$uvue.$emit('setSearchKwValue',false)
          this.isWatchIng = false
          this.isLoginIng = false
      },

      watchLogin(){
          if(this.isWatchIng)
              return
          this.loginTimer = window.setInterval(()=>{
              getuserbylstoken({
                  lstoken: this.lstoken
              }).then(res=>{
                  if(!this.$base.isNull(res.user)){
                      this.loginSuccess(res.user)
                  }
              })
              this.isWatchIng = true
          },1000)
      },
      // 关闭窗口
      shutLogin(){
        this.showLoginDialog = false;
        this.loginForm = {
          mobile: '',
          code: '',
        }
      },

      currentDec(currentX, currentY) {
        let cof = syncXHR('http://xinzhi.space/static/WMM.COF');
        let newGeomag = new Geomag(cof);
        let geoMag = newGeomag.mag;
        let myGeoMag = geoMag(currentY, currentX, 0);
        return myGeoMag.dec.toFixed(5);
      },

      _mapZoom(){

        if(this.isShow3D){
          return 0
        }else{
          if(this.map.getZoom)
            return this.map.getZoom().toFixed(0)
          else
            return 0
        }
      },

      _zoomIn(){
        if(this.isShow3D){
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.8),
            // duration: 1.0
            duration: 0
          });
        }else{
          this.map.zoomIn()
        }
      },

      _zoomOut(){
        if(this.isShow3D){
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.8),
            // duration: 1.0
            duration: 0
          });

        }else{
          this.map.zoomOut()
        }
      },

      resetCompass(){
        this.map.setPitch(0);
        this.map.setBearing(0);
        this.rotateX = 0
        this.rotateZ = 0
      },

      pitchUp(){
        if(this.isShow3D){
          // let cameraPos = this.viewer.camera.position;
          // let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          // let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          // cameraPos.y += 10000
          // this.viewer.camera.lookAt(this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat), cameraPos);

          this.pitch += 1
          this.rotate3DX = this.pitch / 2 * -1
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              // heading: this.Cesium.Math.toRadians(20.0), // 方向
              pitch: this.Cesium.Math.toRadians(this.pitch),// 倾斜角度
              // roll: 0
            },
            duration: 0
          });

        }else{
          let pitch = this.map.getPitch()
          pitch += 4
          if(pitch >= 80) pitch = 80
          this.map.setPitch(pitch)
          this.rotateX = pitch / 2 * -1
        }

      },

      pitchDown(){
        if(this.isShow3D){
          this.pitch -= 1
          this.rotate3DX = this.pitch / 2 * -1
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              // heading: this.Cesium.Math.toRadians(20.0), // 方向
              pitch: this.Cesium.Math.toRadians(this.pitch),// 倾斜角度
              // roll: 0
            },
            duration: 0
          });

        }else{
          let pitch = this.map.getPitch()
          pitch -= 4
          if(pitch <= 0) pitch = 0
          this.map.setPitch(pitch)
          this.rotateX = pitch / 2 * -1
        }

      },

      rotateLeft(){
        if(this.isShow3D){
          this.heading += 10
          if (this.heading <= 180)
            this.rotate3DZ = this.heading * -1
          else{
            this.rotate3DZ = this.heading * -1
          }
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              heading: this.Cesium.Math.toRadians(this.heading), // 方向
              // pitch: this.Cesium.Math.toRadians(this.pitch),// 倾斜角度
              // roll: this.roll
            },
            duration: 0
          });

        }else{
          let bearing = parseInt(this.map.getBearing(), 0);
          bearing += 10
          // if(bearing >= 360) bearing = 0
          this.map.setBearing(bearing)
          if (bearing <= 180) bearing *= -1;
          if (bearing !== parseInt(this.rotateZ, 0)) {
            this.rotateZ = bearing;
          }
        }
      },

      rotateRight(){
        if(this.isShow3D){
          this.heading -= 10
          if (this.heading <= 180)
          this.rotate3DZ = this.heading * -1
          else{
            this.rotate3DZ = this.heading * -1
          }
          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
          this.viewer.camera.flyTo({
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height),
            orientation: {
              heading: this.Cesium.Math.toRadians(this.heading), // 方向
              // pitch: this.Cesium.Math.toRadians(this.pitch),// 倾斜角度
              // roll: this.roll
            },
            duration: 0
          });

        }else{
          let bearing = parseInt(this.map.getBearing(), 0);
          bearing -= 10
          // if(bearing == 0) bearing = 360
          this.map.setBearing(bearing)
          if (bearing <= 180) bearing *= -1;
          if (bearing !== parseInt(this.rotateZ, 0)) {
            this.rotateZ = bearing;
          }
        }
      },

      //加载2D和3D
      swicth3D(){

        if(this.isShow3D){
          //加载maptalks

          // 获取当前镜头位置的笛卡尔坐标
          let cameraPos = this.viewer.camera.position;
          // 获取当前坐标系标准
          let ellipsoid = this.viewer.scene.globe.ellipsoid;
          // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
          let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
          // 获取镜头的高度
          let height = cartographic.height;
          // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
          let centerLon = parseFloat(this.Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
          let centerLat = parseFloat(this.Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));

          this.map.setCenter([centerLon, centerLat])
          //
          // this.map.setZoom(this.view_3d.zoom)

          // let Rectangle = this.viewer.camera.computeViewRectangle();
          // let extent = this.map.getExtent()

          // var Rectangle = this.viewer.camera.computeViewRectangle();
          //
          // let extent = this.map.getExtent()
          //
          // extent.xmin = Rectangle.west / Math.PI * 180
          // extent.ymin = Rectangle.south / Math.PI * 180
          // extent.xmax = Rectangle.east / Math.PI * 180
          // extent.ymax = Rectangle.north / Math.PI * 180
          // this.map.setCenterAndZoom(extent.getCenter(), this.map.getFitZoom(extent));

        }else{

          let extent = this.map.getExtent()

          let rectangle = new this.Cesium.Rectangle(extent.xmin, extent.ymin, extent.xmax, extent.ymax)

          this.viewer.camera.flyTo({
            destination : this.Cesium.Rectangle.fromDegrees(rectangle.west, rectangle.south, rectangle.east, rectangle.north)
          });

          let viewerLayers = this.viewer.imageryLayers

          //加载3D图层
          viewerLayers._layers.forEach(t=>{
            t.show = false
          })

          for(let i=0; i< this.$parent.curType.layers.length; i++){
            let _r = viewerLayers._layers.find(t=> t._imageryProvider.id == this.$parent.curType.layers[i])
            if(_r)
              _r.show = true
          }

        }

        this.isShow3D = !this.isShow3D

        this.$emit("swicth3DEvent", this.isShow3D)

      },
      // 测距
      measureDistance(){        
        this.mapTools.distanceTool.addTo(this.map)
        this.$message({
          message: '单击地图开始，双击结束',
          type: 'info',
        })
      },
      // 测面
      measureArea(){
        this.mapTools.areaTool.addTo(this.map)
        this.$message({
          message: '单击地图开始，双击结束',
          type: 'info',
        })
      },
      // 标点
      markPoint(){

        this.mapTools.pointTool.setMode('Point').enable();
        this.mapTools.pointTool.setSymbol({
          'markerFile': 'http://xinzhi.space/static/mark_point.png',
          'markerWidth': 32,
        });
        this.$message({
          message: '单击即可标点',
          type: 'info',
        })
      },
      // 标线
      markLine(){
        this.mapTools.pointTool.setMode('LineString').enable();
        this.mapTools.pointTool.setSymbol({
          'lineColor': '#ff5366',
          'lineWidth': '4'
        });
        this.$message({
          message: '单击地图开始，双击结束',
          type: 'info',
        })
      },
      // 标面
      markPolygon(){
        this.mapTools.pointTool.setMode('Polygon').enable();
        this.mapTools.pointTool.setSymbol({
          'lineColor': '#ff5366',
          'polygonFill': '#ffffff',
          "polygonOpacity": "0.4",
          'lineWidth': '4'
        });
        this.$message({
          message: '单击地图开始，双击结束',
          type: 'info',
        })
      },
      // 清除
      markClear(){
        if (this.showArea1) {
          this.mapTools.mapTool.clear()
        }else if(this.showArea2){
          if(this.mapTools.distanceTool) {
            this.mapTools.distanceTool.endDraw()
            this.mapTools.distanceTool.clear()
          }
          if(this.mapTools.areaTool) {
            this.mapTools.areaTool.endDraw()
            this.mapTools.areaTool.clear()
          }
        }else{

        }
      },
      // 标注
      openMarkControl(){
        if(this.activeTool == 'markControl')
          this.activeTool = ''
        else
          this.activeTool = 'markControl'

        this.showArea1 =! this.showArea1
        this.showArea2 = false
      },
      // 测量控制
      openMeasureControl(){
        if(this.activeTool == 'measureControl')
          this.activeTool = ''
        else
          this.activeTool = 'measureControl'

        this.showArea2 =! this.showArea2
        this.showArea1 = false
      },
      // 方向
      openOrientation(){
        this.showArea1 = false
        this.showArea2 = false
        if(this.activeTool == 'orientation'){
          this.activeTool = ''
          this.mapTools.posMarker.remove();
          return
        }
        this.activeTool = 'orientation'

        this.mapTools.posMarker.addTo(this.mapTools.posLayer);
        this.mapTools.posMarker.setCoordinates(this.map.getCenter());

        this.mapTools.luopanMarker.remove();
        this.mapTools.luopanCrossMarker.remove();

      },
      // 罗盘
      openCompass(){

        this.showArea1 = false
        this.showArea2 = false
        if(this.activeTool == 'compass'){
          this.activeTool = ''
          this.mapTools.luopanMarker.remove();
          this.mapTools.luopanCrossMarker.remove();
          return
        }
        this.activeTool = 'compass'

        this.mapTools.luopanMarker.addTo(this.mapTools.luopanLayer);
        this.mapTools.luopanCrossMarker.addTo(this.mapTools.luopanLayer);
        this.mapTools.luopanMarker.setCoordinates(this.map.getCenter());
        this.mapTools.luopanCrossMarker.setCoordinates(this.map.getCenter());

        this.mapTools.posMarker.remove()


      },

      openLocal(){
        if(this.activeTool == 'local'){
          this.activeTool = ''
          return
        }
        this.activeTool = 'local'
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((r)=>{
          if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
            let local = {
              city: r.address.city,
              pt: {
                lat: r.latitude,
                lng: r.longitude,
              }
            }
            this.local = local
            this.$store.commit('SET_MAP_LOCAL', local)

            this.$emit("toPt", {
              name: r.address.city,
              location: {
                lng: r.longitude,
                lat: r.latitude,
              }
            })

            this.activeTool = ''
          }else {
            this.$message({
              message: 'failed'+geolocation.getStatus(),
              type: 'error',
            })
          }
        })

      },
      // 海拔
      openElevation(){
        this.showArea1 = false
        this.showArea2 = false
        if(this.activeTool == 'elevation'){
          this.activeTool = ''
          return
        }
        this.activeTool = 'elevation'
      },

      mapUpdate(){

        let projection = this.map.getProjection()
        let center = this.map.getCenter(),
                prj = projection.project(center),
                containerPoint = this.map.coordinateToContainerPoint(center).round()
        let currentX = center.x.toFixed(5)
        let currentY = center.y.toFixed(5)
        let currentZ = this.map.getZoom()

        if(this.mapTools.posMarker && this.activeTool == 'orientation') {
          this.mapTools.posMarker.setCoordinates(this.map.getCenter());
          this.mapTools.posMarker.updateSymbol({
            'markerRotation': this.map.getBearing()
          });
        }
        if(this.mapTools.luopanMarker && this.activeTool == 'compass') {
          var currentDecValue = this.currentDec(currentX, currentY);
          this.mapTools.luopanMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanCrossMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanMarker.updateSymbol({
            'markerRotation': -currentDecValue + this.map.getBearing()
          });
        }

         this.$emit("localChange",{
            lng: currentX,
            lat: currentY,
          })

      },

    },
    watch: {
      map(c, o) {
        if(this.once){

          //- 罗盘和方位图
          //- 2020年4月29日14:55:53
          //- 总觉得这样很耗性能，找时间优化
          this.map.on('moveend zoomend moving dragrotating', this.mapUpdate)

          //罗盘
          this.map.on('pitch rotate', ()=>{
            let bearing = parseInt(this.map.getBearing(), 0);
            if (bearing <= 180) bearing *= -1;
            if (bearing !== parseInt(this.rotateZ, 0)) {
              this.rotateZ = bearing;
            }
            this.rotateX = this.map.getPitch() / 2 * -1
          });


          this.attribution = attribution

          this.map.addControl(this.attribution);

          this.imperial = imperial

          this.map.addControl(this.imperial);

          this.mapTools.mapTool = mapTool.addTo(this.map);

          this.mapTools.distanceTool = distanceTool

          this.mapTools.areaTool = areaTool

          this.mapTools.pointTool = pointTool.addTo(this.map).disable();

          this.mapTools.pointTool.on('drawend',(param)=> {
            this.mapTools.mapTool.addGeometry(param.geometry);
          });

          this.mapTools.posLayer = posLayer.addTo(this.map);
          this.mapTools.posMarker = posMarker(this.map.getCenter())

          this.mapTools.luopanLayer = luopanLayer.addTo(this.map);
          this.mapTools.luopanMarker = luopanMarker(this.map.getCenter())
          this.mapTools.luopanCrossMarker = luopanCrossMarker(this.map.getCenter())

          this.once = false

        }
      },

    },

  }
</script>

