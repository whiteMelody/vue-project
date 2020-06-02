<template>
  <!--    工具箱    -->
  <div class="wb100">

    <!--  防止图片加载失败  -->
    <img src="http://xinzhi.space/static/compass.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/crossline.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/direction.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/mark_point.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/marker.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/end.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">
    <img src="http://xinzhi.space/static/start.png" class="absolute" style="z-index: -1; width: 1px; height: 1px;">

    <div class="absolute w40px fc-gray3 my-box-shadow my-radius2" v-show="!fullscreen" style="top: 210px; right: 5px; z-index: 99999;">
      <div class="wb100" v-show="!isShow3D">
        <div class="w40px bg-white pat5 pab5 h40px lh20px text-center" :class="isShowTools ? 'fc-blue my-radius-up' : 'my-radius2'" @click="openTools">
          <i class="iconfont icongongju f20px"></i>
          <div class="clear0"></div>
          <span class=" f12px">工具</span>
        </div>
      </div>
      <div class="wb100" v-show="isShow3D">
        <div class="w40px bg-white pat5 pab5 h40px lh20px text-center" :class="isShowHelp ? 'fc-blue my-radius-up' : 'my-radius2'" @click="openHelp">
          <i class="iconfont iconbangzhu f20px"></i>
          <div class="clear0"></div>
          <span class=" f12px">帮助</span>
        </div>
      </div>
    </div>

    <div class="dialog-transparency" v-show="isShowTools && !fullscreen" @touchstart="closeTools"></div>
    <div class="absolute bg-white bg-white radius1 my-box-shadow fc-gray3" style="right: 60px; top: 210px; width: 110px; height: 130px; padding: 5px; z-index: 99999;" v-show="isShowTools && !fullscreen">
      <div class="w40px pat5 pab5 h40px lh20px text-center fl ma5" @click="openMarkControl">
        <i class="iconfont iconpersonLocation"></i>
        <div class="clear0"></div>
        <span class="f12px">标注</span>
      </div>

      <div class="w40px pat5 pab5 h40px lh20px text-center fl ma5" @click="openMeasureControl">
        <i class="iconfont iconceliang"></i>
        <div class="clear0"></div>
        <span class=" f12px">测量</span>
      </div>

      <div class="w40px pat5 pab5 h40px lh20px text-center fl ma5" :class="isShowOrientation ? 'fc-blue' : ''" @click="openOrientation">
        <i class="iconfont iconfangweijiao"></i>
        <div class="clear0"></div>
        <span class=" f12px">方位</span>
      </div>

      <div class="w40px pat5 pab5 h40px lh20px text-center fl ma5" :class="isShowCompass ? 'fc-blue' : ''" @click="openCompass">
        <i class="iconfont iconluopan"></i>
        <div class="clear0"></div>
        <span class=" f12px">罗盘</span>
      </div>

      <img src="@/assets/img/5_3.png" class="absolute" style="right: -10px; top:18px;">

    </div>

    <!--  工具栏  -->
    <div class="absolute w40px fc-gray3 my-box-shadow my-radius2" style="top: 210px; right: 5px; height: 152px; z-index: 99;" v-show="showArea1">
      <div class="w40px bg-white absolute my-radius2 fc-gray3 my-box-shadow">
        <div class="w40px pat5 pab5 h40px lh20px text-center" @click="markPoint" :class="activeTool2 == 'markPoint' ? 'fc-blue' : ''">
          <i class="iconfont iconbiaodian"></i>
          <div class="clear0"></div>
          <span class="f12px">标点</span>
        </div>
        <div class="border-bottom"></div>
        <div class="w40px pat5 pab5 h40px lh20px text-center" @click="markLine" :class="activeTool2 == 'markLine' ? 'fc-blue' : ''">
          <i class="iconfont icongonglubiaoxiandian"></i>
          <div class="clear0"></div>
          <span class=" f12px">标线</span>
        </div>
        <div class="border-bottom"></div>
        <div class="w40px pat5 pab5 h40px lh20px text-center" @click="markPolygon" :class="activeTool2 == 'markPolygon' ? 'fc-blue' : ''">
          <i class="iconfont iconbiaomian"></i>
          <div class="clear0"></div>
          <span class=" f12px">标面</span>
        </div>
        <div class="clear0"></div>
      </div>
      <div class="clear0"></div>

    </div>
    <div class="absolute w40px fc-gray3 my-box-shadow my-radius2" style="top: 210px; right: 5px; height: 101px; z-index: 99;" v-show="showArea2">
      <div class="w40px bg-white absolute my-radius2 fc-gray3 my-box-shadow">
        <div class="w40px pat5 pab5 h40px lh20px-bottom text-center" @click="measureDistance" :class="activeTool2 == 'measureDistance' ? 'fc-blue' : ''">
          <i class="iconfont iconceju"></i>
          <div class="clear0"></div>
          <span class="f12px">测距</span>
        </div>
        <div class="border-bottom"></div>
        <div class="w40px pat5 pab5 h40px lh20px text-center" @click="measureArea" :class="activeTool2 == 'measureArea' ? 'fc-blue' : ''">
          <i class="iconfont icongongjuxiang-kongjianjuli "></i>
          <div class="clear0"></div>
          <span class=" f12px">测面</span>
        </div>
        <div class="clear0"></div>
      </div>
    </div>

    <!--  底部工具栏  -->
    <div class="absolute fc-gray3 my-box-shadow my-radius2" style="bottom: 40px; right: 0; left: 0; margin: 0 auto; width: 165px; height: 50px; z-index: 99;" v-show="fullscreen">
      <div class="bg-white absolute my-radius2 fc-gray3 my-box-shadow w165px pat5 pab5 ">
        <div class="w40px h40px lh20px text-center fl bd-gray bd-r1" @click="repeal">
          <i class="iconfont iconchexiao f14px"></i>
          <div class="clear0"></div>
          <span class="f12px">撤销</span>
        </div>
        <div class="w40px h40px lh20px text-center fl bd-gray bd-r1" @click="markClear">
          <i class="iconfont iconqingchu"></i>
          <div class="clear0"></div>
          <span class=" f12px">清除</span>
        </div>
        <div class="w40px h40px lh20px text-center fl bd-gray bd-r1" @click="done(true)">
          <i class="iconfont iconwancheng"></i>
          <div class="clear0"></div>
          <span class=" f12px">保存</span>
        </div>
        <div class="w40px h40px lh20px text-center fl" @click="done(false)">
          <i class="iconfont iconguanbi f14px"></i>
          <div class="clear0"></div>
          <span class=" f12px">关闭</span>
        </div>
        <div class="clear0"></div>
      </div>
      <div class="clear0"></div>

    </div>

    <!--  左侧快捷操作栏  -->


    <!--右下角操作栏-->
    <div class="absolute pointer fc-gray3" v-show="!fullscreen" style="right: 10px; bottom: 40px; width: 40px;">

      <template v-if="isShow3D">
        <!--3D-->
        <div class="w40px bg-white mal5 my-radius3 my-box-shadow">
          <!--      罗盘      -->
          <div class="text-center bg-white radius10" style="top:-25px; left: 25px; position: absolute; margin: -20px; width: 40px; height: 40px; z-index: 0;">
            <div @click="resetCompass">
              <img src="@/assets/img/img-compass.png" class="w30px h30px fl" style="margin: 5px;" :style="'transform: rotate(-' + heading + 'rad) ; -webkit-transform: rotate(-' + heading + 'rad)'">
            </div>
          </div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" :class="activeTool == 'local' ? 'fc-blue' : ''" @click="openLocal">
            <i class="iconfont icondingwei f20px"></i>
          </div>
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px  text-center" @click="swicth3D">
            <span class="f14px Fb">2D</span>
          </div>
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" @click="_zoomIn">
            <i class="el-icon-plus fc-gray3 f20px fl mal10 mat5 Fb"></i>
          </div>
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" @click="_zoomOut">
            <i class="el-icon-minus fc-gray3 f20px fl mal10 mat5 Fb"></i>
          </div>
          <div class="clear0"></div>
        </div>

      </template>
      <template v-else>
        <!--2D-->
        <div class="w40px bg-white mal5 my-radius3 my-box-shadow">
          <!--      罗盘      -->
          <div class="text-center bg-white radius10" style="top:-25px; left: 25px; position: absolute; margin: -20px; width: 40px; height: 40px; z-index: 0;">
            <div @click="resetCompass">
              <img src="@/assets/img/img-compass.png" class="w30px h30px fl" style="margin: 5px;" :style="'transform: rotateX('+ rotateX +'deg) rotateZ('+ rotateZ +'deg);'">
            </div>
          </div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" :class="activeTool == 'local' ? 'fc-blue' : ''" @click="openLocal">
            <i class="iconfont icondingwei f20px"></i>
          </div>
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px  text-center" @click="swicth3D">
            <span class="f14px Fb">3D</span>
          </div>
<!--          <div class="border-bottom"></div>-->
<!--          <div class="w40px pat5 pab5 h30px lh30px  text-center">-->
<!--            <span class="f14px">{{_mapZoom()}}</span>-->
<!--          </div>-->
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" @click="_zoomIn">
            <i class="el-icon-plus fc-gray3 f20px fl mal10 mat5 Fb"></i>
          </div>
          <div class="border-bottom"></div>
          <div class="w40px pat5 pab5 h30px lh30px text-center" @click="_zoomOut">
            <i class="el-icon-minus fc-gray3 f20px fl mal10 mat5 Fb"></i>
          </div>
          <div class="clear0"></div>
        </div>

      </template>

      <p class="absolute" style="bottom: -35px; right: -5px;">
        <a target="_blank" @click="joinQQ" ><img border="0" src="https://pub.idqqimg.com/wpa/images/group.png" class="fl mat4" alt="新知地图" title="新知地图"></a>
      </p>

    </div>

    <!--  帮助  -->
    <div class="absolute bg-white-shadow text-center radius1 my-box-shadow fc-white lh30px" style="right: 60px; top: 210px; width: 120px; height: 130px; padding: 5px; z-index: 999;" v-show="isShowHelp && isShow3D">
      <img src="http://cesium.marsgis.cn/lib/cesiumjs/Cesium/Widgets/Images/NavigationHelp/TouchTilt.svg" width="70" height="48">
      <p class="fc-yellow f16px">倾斜角度:</p>
      <p class="f12px">双指按住屏幕拖拽</p>
      <img src="@/assets/img/5_3.png" class="absolute" style="right: -10px; top:18px;">
    </div>

    <!--  保存测绘数据的弹窗页面  -->
    <!--  2020年6月1日09:25:42  -->
    <!--  暂时放这里，以后统一优化  -->
    <div class="fixed container bg-white" style="z-index: 99999; top:0; left: 0;" v-show="showSavePage">
      <div class="clear4"></div>
      <div class="h40px lh40px text-center bd-gray fc-gray3 Fb F16px bd-b1 relative" @click="showSavePage = false">
        <div class="w40px h40px absolute" style="top:0; left: 0;">
          <i class="el-icon-arrow-left f24px fl ma8"></i>
        </div>
        保存测绘
      </div>

      <div class="clear0"></div>

      <div class="pa20">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <div class="clear4"></div>
          <el-button type="primary" @click="submit(true)" class="wb100">保存</el-button>
          <div class="clear4"></div>
          <el-button @click="submit(false)" class="wb100">取消</el-button>
          <div class="clear4"></div>

        </el-form>
      </div>

    </div>

    <!-- 登录窗口 -->
    <!--  2020年6月1日14:11:43  -->
    <!--  暂时放在这里,以后统一优化  -->
    <div class="dialog-black" v-show="showLoginDialog" @click="showLoginDialog = false"></div>
    <div
            class="wb80 center fixed bg-white radius1"
            style="height: 370px; top:0; left: 0; right: 0; bottom: 0; margin: auto; z-index: 999999;"
            v-show="showLoginDialog"
    >
      <template v-if="!showQRCode">
        <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
          <span class="fl f16px fc-blue">用户登录/注册</span>
          <i class="el-icon-close fr fc-gray3 f20px mat15" @click="showLoginDialog = false"></i>
        </p>
        <div class="clear2"></div>
        <div class="pa15">
          <div class="wb100 h45px bd-gray1 bd-a1 radius1">
            <div class="fl mar10 w50px text-center h25px lh25px mat10 bd-gray1 bd-r1 fc-gray3">+86</div>
            <div class="fl my-search" style="width: calc(100% - 70px);">
              <el-input
                      v-model="loginForm.mobile"
                      placeholder="请输入手机号"
                      class="h45px lh45px fc-gray3"
              ></el-input>
            </div>
          </div>
          <div class="clear4"></div>
          <div class="wb100 h45px bd-gray1 bd-a1 radius1">
            <div class="fl mal8 my-search bd-gray1 bd-r1" style="width: calc(100% - 130px);">
              <el-input
                      v-model="loginForm.code"
                      placeholder="请输入短信验证码"
                      class="h45px lh45px fc-gray3"
              ></el-input>
            </div>
            <div
                    class="fl w120px text-center h45px lh45px fc-gray3 bg-white1"
                    @click="sendCode"
            >{{timer == 0 ? '发送验证码' : timer + '秒重新发送' }}</div>
          </div>
          <div class="clear4"></div>
          <div
                  class="wb100 h40px lh40px text-center fc-white center bg-blue radius1"
                  @click="loginByMobile"
          >立即登录</div>
        </div>
        <div class="clear2"></div>
        <div
                class="w100px h30px lh30px center bg-white relative text-center fc-gray2 f12px"
                style="z-index: 9;"
        >第三方登录</div>
        <div class="clear2 bd-gray bd-b1" style="margin-top: -25px;"></div>
        <div class="clear4"></div>
        <div
                class="w100px h40px lh40px text-center fc-gray3 center bg-white radius1"
                @click="wxLogin"
        >
          <i class="iconfont iconweixin fc-green7 f30px fl"></i>
          <span class="fr">微信登录</span>
        </div>
      </template>
      <template v-else>
        <p class="h50px lh50px pal20 par20 bd-gray bd-b1">
          <span class="fl f16px fc-green">微信扫码登录</span>
          <i
                  class="el-icon-close fr fc-gray3 f20px mat15"
                  @click="loginCancel(); showLoginDialog = false;"
          ></i>
        </p>
        <div class="clear4"></div>
        <div class="text-center">
          <img :src="'http://'+qrcodeUrl" class="w120px h120px" />
        </div>
        <p class="h50px lh50px text-center">扫描二维码并关注公众号，即可开启扫码登录功能</p>
        <div class="clear2"></div>
        <div
                class="wb80 h40px lh40px text-center fc-white center bg-blue radius1"
                @click="loginCancel"
        >使用手机号登录</div>
      </template>
    </div>


  </div>

</template>

<script>

  import login from '@/components/webapp/login/index.vue'

  import { attributionWebapp, imperialWebapp } from '@/assets/map/controls.js'

  import { mapTool, distanceTool, areaTool, pointTool, posLayer, posMarkerWebApp, luopanLayer, luopanMarkerWebApp, luopanCrossMarkerWebApp } from '@/assets/map/tools.js'

  import { saveTag } from "@/assets/api/tag/tag";

  export default {
    name: 'Tools',
    props: {
      map: {
        type: Object,
        require: true,
      },

      viewer: {
        type: Object,
        require: true,
      },
      isShow3D: {
        type: Boolean,
        require: false,
        default: () => false,
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
    components: {
      login
    },
    data() {
      return {
        activeTool: '',
        activeTool2: '',
        showArea1: false,
        showArea2: false,
        once: true,
        fullscreen: false,
        isShowHelp: false,
        isShowOrientation: false,
        isShowCompass: false,

        rotateX: 0,
        rotateZ: 0,

        rotate3DX: 0,
        rotate3DZ: 0,

        Cesium: require('cesium/Cesium'),
        widgets: require('cesium/Widgets/widgets.css'),

        local: {},

        heading: 0,
        pitch: -45,
        roll: 0,

        toolbar_scale: 1,
        toolbar_left: 0,
        toolbar_top: 0,

        actionbar_scale: 1,
        actionbar_right: 0,
        actionbar_bottom: 0,

        isShowTools: false,

        geolocation: null,

        pointToolDatas: [],
        areaToolDatas: [],
        distanceToolDatas: [],

        pointGeometry: [],
        areaGeometry: [],
        distanceGeometry: [],

        isSave: false,

        form: {
          name: '',
          desc: '',
        },

        showSavePage: false,

        showCopyRight: false, // 版权声明
        showPrivacyPolicy: false, // 隐私政策
        showServiceAgreement: false, // 服务协议
        user: {}, // 用户相关信息
        showLoginDialog: false, // 登录弹窗
        lstoken: "",
        qrcodeUrl: "",
        loginTimer: 0,
        timer: 0,
        codeTimer: 0,
        defavatar: require("@/assets/img/defavatar.png"),// 手机登录显示的头像
        defavatar2: require("@/assets/img/logo.png"), // 未登录显示的头像
        isShowUserInfo: false, // 显示用户信息
        isSend: false,
        isWatchIng: false,
        loginForm: {
          // 手机登录相关参数
          mobile: "",
          code: ""
        },
        showQRCode: false, // 微信和手机登录方式的切换
        showSaveListPage: false,
        saveList: [],

      }
    },
    mounted() {

      let user = this.$store.getters.currentUser

      if(!this.$base.isNull(user)){
        if(user.nickname){
          this.user = user
        }
      }

      this.local = this.$parent.mapLocal
      // 暴露方法控制罗盘，和方位的显示
      this.$uvue.$off('setMapTools')
      this.$uvue.$on('setMapTools',(value)=>{
        this.mapTools.luopanMarker.remove();
        this.mapTools.posMarker.remove()
      })
    },
    methods: {

      currentDec(currentX, currentY) {
        // let cof = syncXHR('http://xinzhi.space/static/WMM.COF');
        // let newGeomag = new Geomag(cof);
        // let geoMag = newGeomag.mag;
        // let myGeoMag = geoMag(currentY, currentX, 0);
        // return myGeoMag.dec.toFixed(5);
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

          // console.log(height)
          // console.log(this.viewer.camera.pitch, 'pitch')

          if(height>2000){
            this.viewer.camera.flyTo({
              destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.8),
              orientation : {
                heading : this.viewer.camera.heading,
                pitch : this.viewer.camera.pitch,
                roll : this.viewer.camera.roll
              },
              duration: 0
            });
          }else{
            if(height>200) {
              this.viewer.camera.flyTo({
                destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height - 100),
                orientation: {
                  heading: this.viewer.camera.heading,
                  pitch: this.viewer.camera.pitch,
                  roll: this.viewer.camera.roll
                },
                duration: 0
              });
            }
          }

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
            destination: this.Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height * 1.8),
            // duration: 1.0
            orientation : {
              heading : this.viewer.camera.heading,
              pitch : this.viewer.camera.pitch,
              roll : this.viewer.camera.roll
            },
            duration: 0,
          });
        }else{
          this.map.zoomOut()
        }
      },
      // 指南针
      resetCompass(){
        if(this.isShow3D){
          this.viewer.camera.setView({
            orientation: {
              heading: this.Cesium.Math.toRadians(0),// 倾斜角度
              pitch: this.Cesium.Math.toRadians(-90),// 倾斜角度
              roll: this.Cesium.Math.toRadians(0),// 倾斜角度
            }
          });
          this.rotate3DX = 0
          this.rotate3DZ = 0
        }else{
          this.map.setPitch(0);
          this.map.setBearing(0);
          this.mapTools.posMarker.updateSymbol({
            'markerRotation': 0
          });
          this.mapTools.luopanMarker.updateSymbol({
            'markerRotation': 0
          });
        }

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

        // console.log(new Date().getTime())

        if(this.isShow3D){
          //加载maptalks

          if(this.viewer.camera){
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
          }

          //加载图层

          const base = this.map.getBaseLayer(),
                  layers = this.map.getLayers();

          if (base) {
            const baseLayers = base.layers || [base]
            baseLayers.forEach(t=>{
              t.hide()
            })
            for(let i=0; i< this.$parent.curType.layers.length; i++){
              let _r = baseLayers.find(t=> t._id == this.$parent.curType.layers[i])
              if(_r)
                _r.show()
            }
          }else{
            console.error('baseLayers is undefined')
          }
          this.$emit("swicth3DEvent", false)

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

          this.map.zoomOut()

          let extent = this.map.getExtent()

          let rectangle = new this.Cesium.Rectangle(extent.xmin, extent.ymin, extent.xmax, extent.ymax)

          if(this.viewer.camera){
            this.viewer.camera.flyTo({
              destination : this.Cesium.Rectangle.fromDegrees(rectangle.west, rectangle.south, rectangle.east, rectangle.north),
              orientation : {
                pitch : this.Cesium.Math.toRadians(-45.0),
              },
              duration: 0
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
          this.$emit("swicth3DEvent", true)
        }
        
        // this.$emit('swicth3DEvent', !this.isShow3D)

      },

      measureDistance(){

        this.myEndDraw(()=>{
          if(this.activeTool2 == 'measureDistance'){
            //关闭标注模式
            this.activeTool2 = ''

          }else{
            //开启标注模式
            this.activeTool2 = 'measureDistance'

            this.mapTools.distanceTool.enable()

            if(window.plus){
              plus.nativeUI.toast("单击地图开始",{duration:"long"});
            }else{
              this.$message({
                message: '单击地图开始',
                type: 'info',
              })
            }

          }
        })

      },

      measureArea(){

        this.myEndDraw(()=>{
          if(this.activeTool2 == 'measureArea'){
            //关闭标注模式
            this.activeTool2 = ''
          }else{
            //开启标注模式
            this.activeTool2 = 'measureArea'
            this.mapTools.areaTool.enable()
            if(window.plus){
              plus.nativeUI.toast("单击地图开始",{duration:"long"});
            }else{
              this.$message({
                message: '单击地图开始',
                type: 'info',
              })
            }
          }
        })

      },

      markPoint(){

        this.myEndDraw(()=>{
          if(this.activeTool2 == 'markPoint'){
            //关闭标注模式
            this.activeTool2 = ''
            this.mapTools.pointTool.setMode('Point').disable()
          }else{
            //开启标注模式
            this.activeTool2 = 'markPoint'
            this.mapTools.pointTool.setMode('Point').enable()
            this.mapTools.pointTool.setSymbol({
              'markerFile': 'http://xinzhi.space/static/mark_point.png',
              'markerWidth': 32,
            });

            if(window.plus){
              plus.nativeUI.toast("单击即可标点",{duration:"long"});
            }else{
              this.$message({
                message: '单击即可标点',
                type: 'info',
              })
            }
          }
        })

      },

      markLine(){

        this.myEndDraw(()=>{
          if(this.activeTool2 == 'markLine'){
            //关闭标线模式
            this.activeTool2 = ''
            this.mapTools.pointTool.disable();
          }else{
            //开启标线模式
            this.activeTool2 = 'markLine'
            this.mapTools.pointTool.setMode('LineString').enable();
            this.mapTools.pointTool.setSymbol({
              'lineColor': '#ff5366',
              'lineWidth': '4'
            });

            if(window.plus){
              plus.nativeUI.toast("单击地图开始",{duration:"long"});
            }else{
              this.$message({
                message: '单击地图开始',
                type: 'info',
              })
            }
          }
        })

      },

      markPolygon(){

        this.myEndDraw(()=>{
          if(this.activeTool2 == 'markPolygon'){
            //关闭标线模式
            this.activeTool2 = ''
            this.mapTools.pointTool.disable();
          }else{
            //开启标线模式
            this.activeTool2 = 'markPolygon'
            this.mapTools.pointTool.setMode('Polygon').enable();
            this.mapTools.pointTool.setSymbol({
              'lineColor': '#ff5366',
              'polygonFill': '#ffffff',
              "polygonOpacity": "0.4",
              'lineWidth': '4'
            });

            if(window.plus){
              plus.nativeUI.toast("单击地图开始",{duration:"long"});
            }else{
              this.$message({
                message: '单击地图开始',
                type: 'info',
              })
            }
          }
        })

      },

      markClear(){

        if(this.mapTools.distanceTool) {
          this.mapTools.distanceTool.endDraw()
          this.mapTools.distanceTool.clear()
        }

        if(this.mapTools.areaTool) {
          this.mapTools.areaTool.endDraw()
          this.mapTools.areaTool.clear()
        }

        if(this.mapTools.pointTool) {
          this.mapTools.pointTool.endDraw()
        }

        this.mapTools.mapTool.clear()

        // this.showArea1 = false
        // this.showArea2 = false
        // this.isShowTools = false

      },

      myEndDraw(callback){
        //获取所有图形的点集合

          if(this.areaToolDatas.length > 1)
            this.mapTools.areaTool._doubleClickHandler(this.areaToolDatas[this.areaToolDatas.length-1])

          if(this.distanceToolDatas.length > 1)
            this.mapTools.distanceTool._doubleClickHandler(this.distanceToolDatas[this.distanceToolDatas.length-1])

          if(this.pointToolDatas.length > 1){
            // this.mapTools.pointTool.endDraw()
            // if(this.mapTools.pointTool.getMode() != 'point')
              this.mapTools.pointTool._doubleClickHandler(this.pointToolDatas[this.pointToolDatas.length-1])
          }

          callback()

      },

      openMarkControl(){
        if(this.activeTool == 'markControl'){
          this.activeTool = ''
          this.fullscreen = false
        }else{
          this.activeTool = 'markControl'
          this.fullscreen = true
        }
        this.$emit("fullScreenEvent", this.fullscreen)

        this.showArea1 =! this.showArea1
        this.showArea2 = false

      },

      openMeasureControl(){
        if(this.activeTool == 'measureControl')
          this.activeTool = ''
        else{
          this.activeTool = 'measureControl'
          this.fullscreen = true
          this.$emit("fullScreenEvent", this.fullscreen)
        }

        this.showArea2 =! this.showArea2
        this.showArea1 = false

      },

      openOrientation(){

        this.$uvue.$emit('setShowSearchType')

        this.showArea1 = false
        this.showArea2 = false
        this.isShowCompass = false
        if(this.isShowOrientation){
          this.isShowOrientation = false
          this.mapTools.posMarker.hide()
          this.$emit('showPointEvent', false)
        }else{
          this.isShowOrientation = true
          this.mapTools.posMarker.addTo(this.mapTools.luopanLayer);
          this.mapTools.posMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanMarker.remove();
          this.mapTools.luopanCrossMarker.remove();
          this.$emit('showPointEvent', true)
        }

      },

      openCompass(){
        this.$uvue.$emit('setShowSearchType')
        this.showArea1 = false
        this.showArea2 = false
        this.isShowOrientation = false
        if(this.isShowCompass){
          this.isShowCompass = false
          this.mapTools.luopanMarker.remove();
          this.mapTools.luopanCrossMarker.remove();
          this.$emit('showPointEvent', false)
        }else{
          this.isShowCompass = true

          this.mapTools.luopanMarker.addTo(this.mapTools.luopanLayer);
          this.mapTools.luopanCrossMarker.addTo(this.mapTools.luopanLayer);
          this.mapTools.luopanMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanCrossMarker.setCoordinates(this.map.getCenter());

          this.mapTools.posMarker.remove()

          this.$emit('showPointEvent', true)
        }

      },

      openHelp(){
        if(this.activeTool == 'help'){
          this.activeTool = ''
          this.isShowHelp = false
        }else{
          this.isShowHelp = true
          this.activeTool = 'help'
        }
      },

      openTools(){
        this.isShowTools = !this.isShowTools
      },

      closeTools(){
          this.isShowTools = false
      },

      done(isDone){

        //判断是否有需要保存的数据

        if(isDone){

          this.myEndDraw(()=> {

            if(this.pointGeometry.length == 0 && this.distanceGeometry.length == 0 && this.areaGeometry.length == 0)
              return

            if(this.$base.isNull(this.$store.getters.currentUser)){
              //保存功能需要登录
              if(window.plus){
                plus.nativeUI.toast('请先登录',{duration:"long"});
              }else{
                this.$message({
                  message: '请先登录',
                  type: 'info'
                })
              }
              this.showLoginDialog = true
              return
            }

            if (window.plus) {
              plus.nativeUI.confirm("保存绘制和测量数据吗?", (e) => {
                var i = e.index;
                if (i == 0) {
                  //保存

                  this.showSavePage = true

                } else {

                }
              }, "提示", ["确定", "取消"]);
            } else {
              //提示是否保存
              this.$confirm('保存绘制和测量数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                //保存

                this.showSavePage = true

              }).catch(() => {

              });
            }
          })
        }else{

          //判断是否有图形
          if(!this.isSave){
            if(window.plus){
              plus.nativeUI.confirm("关闭将清除所有未保存的数据, 确认继续吗?",(e)=>{
                var i=e.index;
                if(i == 0){
                  this.markClear()
                  this.fullscreen = false
                  this.$emit("fullScreenEvent", this.fullscreen)
                  this.activeTool = ''
                  this.activeTool2 = ''

                  this.mapTools.distanceTool.endDraw()
                  this.mapTools.areaTool.endDraw()
                  this.mapTools.pointTool.endDraw()

                  this.showArea1 = false
                  this.showArea2 = false
                  this.isShowTools = false

                  //关闭控件
                  this.mapTools.pointTool.disable()
                  this.mapTools.areaTool.disable()
                  this.mapTools.distanceTool.disable()

                }else{

                }
              },"提示",["确定","取消"]);
            }else{
              //提示是否保存
              this.$confirm('关闭将清除所有未保存的数据, 确认继续吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.markClear()

                this.fullscreen = false
                this.$emit("fullScreenEvent", this.fullscreen)
                this.activeTool = ''
                this.activeTool2 = ''

                this.mapTools.distanceTool.endDraw()
                this.mapTools.areaTool.endDraw()
                this.mapTools.pointTool.endDraw()

                this.showArea1 = false
                this.showArea2 = false
                this.isShowTools = false


                //关闭控件
                this.mapTools.pointTool.disable()
                this.mapTools.areaTool.disable()
                this.mapTools.distanceTool.disable()

              }).catch(() => {

              });
            }
          }else{
            this.fullscreen = false
            this.$emit("fullScreenEvent", this.fullscreen)
            this.activeTool = ''
            this.activeTool2 = ''

            this.mapTools.distanceTool.endDraw()
            this.mapTools.areaTool.endDraw()
            this.mapTools.pointTool.endDraw()

            this.showArea1 = false
            this.showArea2 = false
            this.isShowTools = false

            //关闭控件
            this.mapTools.pointTool.disable()
            this.mapTools.areaTool.disable()
            this.mapTools.distanceTool.disable()
          }

        }

      },

      repeal(){

        //撤销

        if(this.mapTools.pointTool._clickCoords){
          if(this.mapTools.pointTool._clickCoords.length > 0){
            this.mapTools.pointTool.undo()
          }
        }

        //- 2020年5月27日10:33:05
        //- maptalks自带bug
        if(this.mapTools.distanceTool._clickCoords){
          if(this.mapTools.distanceTool._clickCoords.length > 0){
            this.mapTools.distanceTool.undo()
            this.mapTools.distanceTool._measureMarkerLayer.removeGeometry(this.mapTools.distanceTool._vertexLabels[this.mapTools.distanceTool._vertexLabels.length-1])
            this.mapTools.distanceTool._measureMarkerLayer.removeGeometry(this.mapTools.distanceTool._vertexMarkers[this.mapTools.distanceTool._vertexMarkers.length-1])
            this.mapTools.distanceTool._vertexLabels.pop()
            this.mapTools.distanceTool._vertexMarkers.pop()
          }
        }

        if(this.mapTools.areaTool._clickCoords){
          if(this.mapTools.areaTool._clickCoords.length > 0){
            this.mapTools.areaTool.undo()
            this.mapTools.areaTool._measureMarkerLayer.removeGeometry(this.mapTools.areaTool._vertexMarkers[this.mapTools.areaTool._vertexMarkers.length-1])
            this.mapTools.areaTool._vertexMarkers.pop()
          }
        }

        // console.log(this.mapTools.distanceTool._vertexLabels)
        // console.log(this.mapTools.distanceTool._vertexMarkers)

      },

      // 定位
      openLocal(){

        if(this.activeTool == 'local'){
          this.activeTool = ''
          return
        }
        this.activeTool = 'local'

        if(window.plus){
          window.getGeolocation((data)=>{
            if(data.code == 1){
              let local = {
                city: data.address.city,
                pt: {
                  lat: Number.parseFloat(data.coords.latitude),
                  lng: Number.parseFloat(data.coords.longitude),
                }
              }

              this.local = local
              this.$store.commit('SET_MAP_LOCAL', local)

              this.$emit("toPt", {
                name: data.addresses,
                location: {
                  lng: Number.parseFloat(data.coords.longitude),
                  lat: Number.parseFloat(data.coords.latitude),
                }
              })

              this.activeTool = ''

            }else{
              plus.nativeUI.toast("定位失败",{duration:"long"});
            }

          })
        }else{
          //使用浏览器定位
          if(this.$base.isNull(this.geolocation))
            this.geolocation = new BMap.Geolocation()
          this.geolocation.getCurrentPosition((r)=>{
            if(this.geolocation.getStatus() == BMAP_STATUS_SUCCESS){
              let local = {
                city: r.address.city,
                pt: {
                  lat: Number.parseFloat(r.latitude),
                  lng: Number.parseFloat(r.longitude),
                }
              }
              this.local = local
              this.$store.commit('SET_MAP_LOCAL', local)

              this.$emit("toPt", {
                name: r.address.city,
                location: {
                  lng: Number.parseFloat(r.longitude),
                  lat: Number.parseFloat(r.latitude),
                }
              })

              this.activeTool = ''
            }else {
              this.$message({
                message: '定位失败',
                type: 'error',
              })
            }
          })

        }

      },

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

        if(this.mapTools.posMarker) {
          this.mapTools.posMarker.setCoordinates(this.map.getCenter());
          this.mapTools.posMarker.updateSymbol({
            'markerRotation': this.map.getBearing()
          });
        }
        if(this.mapTools.luopanMarker) {
          var currentDecValue = this.currentDec(currentX, currentY);
          this.mapTools.luopanMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanCrossMarker.setCoordinates(this.map.getCenter());
          this.mapTools.luopanMarker.updateSymbol({
            'markerRotation': this.map.getBearing()
          });
        }

        this.$emit("localChange",{
          lng: currentX,
          lat: currentY,
        })

      },


      joinQQ() {
        if(window.plus){
          let key = "YMf8le6Nhw-TWroy2nZO5tnuHYt__hQr"
          if(this.$base.versions.isAndroid){
            plus.runtime.openURL('mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D' + key)
          }else{
            plus.runtime.launchApplication({
              action: 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D' + key
            })
          }
        }else{
          window.open("https://shang.qq.com/wpa/qunwpa?idkey=d3a9c5bde03ca22bc1f72af7af37eba484987b65c296f6ec8b0993fb19a9ee30",'_blank');
        }

      },

      submit(flag){
        //保存标注&测绘

        //判断登录

        if(flag){
          //保存
          this.pointGeometry._coordinates

          let datas = []

          for(let i=0; i<this.pointGeometry.length; i++){
            // if(this.pointGeometry[i].type == 'Point'){
              datas.push({
                type: 'Draw',
                data: {
                  type: this.pointGeometry[i].type,
                  coordinates: this.pointGeometry[i]._coordinates
                }
              })
          }
         for(let i=0; i<this.areaGeometry.length; i++){
              datas.push({
                type: 'Area',
                data: {
                  type: this.areaGeometry[i].type,
                  coordinates: this.areaGeometry[i]._coordinates
                }
              })
          }
         for(let i=0; i<this.distanceGeometry.length; i++){
              datas.push({
                type: 'Distance',
                data: {
                  type: this.distanceGeometry[i].type,
                  coordinates: this.distanceGeometry[i]._coordinates
                }
              })
          }

          if(this.$base.isNull(this.form.name)){
            //名称不能为空
            if(window.plus){
              plus.nativeUI.toast("名称不能为空",{duration:"long"});
            }else{
              this.$message({
                message: '名称不能为空',
                type: 'info',
              })
            }
            return
          }
          if(this.$base.isNull(this.form.desc)){
            //描述不能为空
            if(window.plus){
              plus.nativeUI.toast("描述不能为空",{duration:"long"});
            }else{
              this.$message({
                message: '描述不能为空',
                type: 'info',
              })
            }
            return
          }

          saveTag({
            name: this.form.name,
            token: this.$store.getters.currentUser.token,
            type: 'type',
            desc: this.form.desc,
            content: JSON.stringify(datas)
          }).then(res=>{
            if(res.status == 'ok'){
              this.showSavePage = false

              this.pointGeometry = []
              this.distanceGeometry = []
              this.areaGeometry = []

              //保存成功
              if(window.plus){
                plus.nativeUI.toast("保存成功",{duration:"long"});
              }else{
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
              }

            }else{
              //保存成功
              if(window.plus){
                plus.nativeUI.toast("保存失败",{duration:"long"});
              }else{
                this.$message({
                  message: '保存失败',
                  type: 'error',
                })
              }
            }
          })

        }else{
          //取消保存
          this.showSavePage = false
        }

      },

      // 发送验证码
      sendCode() {
        if (this.$base.isNull(this.loginForm.mobile)) {
          if (window.plus) {
            plus.nativeUI.toast("请输入手机号", { duration: "long" });
          } else {
            this.$message({
              message: "请输入手机号",
              type: "success"
            });
          }
          return;
        }
        if (this.loginForm.mobile.length != 11) {
          if (window.plus) {
            plus.nativeUI.toast("请输入11位手机号", { duration: "long" });
          } else {
            this.$message({
              message: "请输入11位手机号",
              type: "success"
            });
          }
          return;
        }
        if (this.isSend) return;
        this.isSend = true;
        getValidCode({
          phone: this.loginForm.mobile
        }).then(res => {
          if (res.status == "ok") {
            if (window.plus) {
              plus.nativeUI.toast("发送成功", { duration: "long" });
            } else {
              this.$message({
                message: "发送成功",
                type: "success"
              });
            }
            this.openTimer();
          } else {
            if (window.plus) {
              plus.nativeUI.toast("发送失败，请稍后重试", { duration: "long" });
            } else {
              this.$message({
                message: "发送失败，请稍后重试",
                type: "error"
              });
            }
            this.isSend = false;
          }
        });
      },
      // 验证码定时器
      openTimer() {
        this.timer = 120;
        this.codeTimer = window.setInterval(() => {
          this.timer--;
          if (this.timer <= 0) {
            this.timer = 0;
            this.isSend = false;
            window.clearInterval(this.codeTimer);
          }
        }, 1000);
      },
      // 手机登录
      loginByMobile() {
        if (this.$base.isNull(this.loginForm.code)) {
          if (window.plus) {
            plus.nativeUI.toast("请输入验证码", { duration: "long" });
          } else {
            this.$message({
              message: "请输入验证码",
              type: "error"
            });
          }
          return;
        }
        if (this.loginForm.code.length != 4) {
          if (window.plus) {
            plus.nativeUI.toast("请输入4位验证码", { duration: "long" });
          } else {
            this.$message({
              message: "请输入4位验证码",
              type: "error"
            });
          }
          return;
        }
        regOrLoginByPhone({
          phone: this.loginForm.mobile,
          code: this.loginForm.code
        }).then(res => {
          if (!this.$base.isNull(res.user)) {
            this.showLoginDialog = false;
            this.$store.commit("SET_CURRENT_USER", res.user);
            this.user = res.user;
            if (window.plus) {
              plus.nativeUI.toast("登录成功", { duration: "long" });
            } else {
              this.$message({
                message: "登录成功",
                type: "success"
              });
            }
          } else {
            if (window.plus) {
              plus.nativeUI.toast("登录失败，请检查验证码", { duration: "long" });
            } else {
              this.$message({
                message: "登录失败，请检查验证码",
                type: "success"
              });
            }
          }
        });
      },
      // 微信登录第1步
      wxLogin() {
        if (window.plus) {
          window.login(user => {
            oweixin({
              openid: user.openid,
              nickname: user.nickname,
              sex: user.sex,
              avatar: user.headimgurl,
              unionid: user.unionid
            }).then(res => {
              if (res.status == "ok") {
                this.showQRCode = false;
                this.showLoginDialog = false;
                this.$store.commit("SET_CURRENT_USER", res.user);
                this.user = res.user;
                if (window.plus) {
                  plus.nativeUI.toast("登录成功", { duration: "long" });
                } else {
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                }
              } else {
                //登录失败
                if (window.plus) {
                  plus.nativeUI.toast("登录失败", { duration: "long" });
                } else {
                  this.$message({
                    message: "登录失败",
                    type: "error"
                  });
                }
              }
            });
          });
        } else {
          //弹出微信二维码
          getwxloginqr({}).then(res => {
            if (res.lstoken) {
              this.lstoken = res.lstoken;
              this.qrcodeUrl = res.qrcode;
              this.showQRCode = true;
              this.watchLogin();
              this.isLoginIng = true;
            }
          });
        }
      },
      // 显示登录窗口
      showLogin() {
        this.isShowUserInfo = false;
        this.showLoginDialog = true;
        this.loginForm.mobile = "";
        this.loginForm.code = "";
        this.timer = 0;
        this.isSend = false;
        window.clearInterval(this.codeTimer);
      },
      // 退出登录
      logout() {
        //- 2020年5月14日16:03:46
        //确认框
        if (window.plus) {
          plus.nativeUI.confirm(
                  "确定退出登录吗?",
                  e => {
                    var i = e.index;
                    if (i == 0) {
                      this.user = {};
                      this.$store.commit("SET_CURRENT_USER", {});
                      this.isShowUserInfo = false;
                      window.logout(() => {});
                    } else {
                    }
                  },
                  "提示",
                  ["确定", "取消"]
          );
        } else {
          //提示是否保存
          this.$confirm("关闭将清除所有测量数据, 确认继续吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
                  .then(() => {
                    this.user = {};
                    this.$store.commit("SET_CURRENT_USER", {});
                    this.isShowUserInfo = false;
                  })
                  .catch(() => {});
        }
      },
      // 微信扫码登录第4步
      loginCancel() {
        this.showQRCode = false;
        window.clearInterval(this.loginTimer);
        this.isWatchIng = false;
        this.isLoginIng = false;
      },
      // 微信登录第3步
      loginSuccess(user) {
        this.showQRCode = false;
        this.showLoginDialog = false;
        window.clearInterval(this.loginTimer);
        this.$store.commit("SET_CURRENT_USER", user);
        this.user = user;

        if (window.plus) {
          plus.nativeUI.toast("登录成功", { duration: "long" });
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });
        }
        this.isWatchIng = false;
        this.isLoginIng = false;
      },
      // 微信登录第2步
      watchLogin() {
        if (this.isWatchIng) return;
        this.loginTimer = window.setInterval(() => {
          getuserbylstoken({
            lstoken: this.lstoken
          }).then(res => {
            if (!this.$base.isNull(res.user)) {
              this.loginSuccess(res.user);
            }
          });
          this.isWatchIng = true;
        }, 1000);
      },

    },
    watch: {
      map(c, o) {
        if(this.once){

          //- 罗盘和方位图
          //- 2020年4月29日14:55:53
          //- 总觉得这样很耗性能，找时间优化
          //moveend 移动 zoomend 缩放 moving 移动 dragrotating 旋转'
          this.map.on('moveend zooming moving dragrotating', this.mapUpdate)

          //罗盘
          this.map.on('pitch rotate', ()=>{
            let bearing = parseInt(this.map.getBearing(), 0);
            if (bearing <= 180) bearing *= -1;
            if (bearing !== parseInt(this.rotateZ, 0)) {
              this.rotateZ = bearing;
            }
            this.rotateX = this.map.getPitch() / 2 * -1
          });

          this.attribution = attributionWebapp

          this.map.addControl(this.attribution);

          this.imperial = imperialWebapp

          imperialWebapp.options.position = {
            'bottom': '5',
            'left': '117'
          }

          this.map.addControl(this.imperial);

          this.mapTools.mapTool = mapTool.addTo(this.map);

          this.mapTools.distanceTool = distanceTool.addTo(this.map).disable();

          this.mapTools.areaTool = areaTool.addTo(this.map).disable();

          this.mapTools.pointTool = pointTool.addTo(this.map).disable();

          this.mapTools.pointTool.on('drawend',(param)=> {
            this.mapTools.mapTool.addGeometry(param.geometry);
            //收集闭合图形
            this.pointGeometry.push({
              data: param.geometry,
              type: this.mapTools.pointTool.getMode()
            })
          });

          this.mapTools.areaTool.on('drawend',(param)=> {
            this.mapTools.mapTool.addGeometry(param.geometry);
            //收集闭合图形
            this.areaGeometry.push({
              data: param.geometry,
              type: 'area',
            })
          });

          this.mapTools.distanceTool.on('drawend',(param)=> {
            this.mapTools.mapTool.addGeometry(param.geometry);
            //收集闭合图形
            this.distanceGeometry.push({
              data: param.geometry,
              type: 'distance',
            })
          });

          this.mapTools.distanceTool.on('drawvertex', (data)=>{
            //收集闭合点
            this.distanceToolDatas.push(data)
          })

          this.mapTools.areaTool.on('drawvertex', (data)=>{
            //收集闭合点
            this.areaToolDatas.push(data)
          })

          this.mapTools.pointTool.on('drawvertex', (data)=>{
            //收集闭合点
            this.pointToolDatas.push(data)
          })

          this.mapTools.posLayer = posLayer.addTo(this.map);
          this.mapTools.posMarker = posMarkerWebApp(this.map.getCenter())
          this.mapTools.luopanLayer = luopanLayer.addTo(this.map);
          this.mapTools.luopanMarker = luopanMarkerWebApp(this.map.getCenter())
          this.mapTools.luopanCrossMarker = luopanCrossMarkerWebApp(this.map.getCenter())

          //- 2020年5月26日11:08:21
          //- 先把cesium的事件监听放这里
          //- 找时间统一优化

          if(this.viewer.scene){
            this.viewer.scene.postRender.addEventListener( ()=> {
              this.heading = this.viewer.scene.camera.heading
            })
          }

          this.once = false

        }
      },

      // viewer(c, o){
      //
      //   if(this.once){
      //     this.isShow3D = this.$parent.show3D
      //   }
      //   this.once = false
      // },

    },

  }
</script>

