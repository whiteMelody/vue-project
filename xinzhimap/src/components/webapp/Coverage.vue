<template>
  <!--  图层  -->
  <div>

    <!--    在这里加载街景图    -->
    <div class="w40px h40px absolute text-center" v-show="isShowStreeCovered && !isShow3D" style=" top:0; right: 0; left: 0; bottom: 0; z-index: 99; margin: auto; ">
      <div class="w80px h80px bg-black fl" style="margin-top: -105px; margin-left: -22px; padding: 2px 2px 6px 2px">
        <template v-if="hasStreetView">
          <img class="w80px h60px" src="@/assets/img/maptype3.jpg" @click="openStreetView">
          <p class="h20px lh20px text-center fc-white f12px" @click="openStreetView">
            街景全景 >
          </p>
        </template>
        <template v-else>
          <img class="w80px h60px" src="@/assets/img/noStreetView.jpg">
          <p class="h20px lh20px text-center fc-white f12px" >
            此区域无街景
          </p>
        </template>

        <img src="@/assets/img/6_1.png">
      </div>
      <i class="iconfont iconjiejing1 f30px fc-blue fl" style="margin-top: -8px; margin-left: 5px;"></i>
    </div>

    <div class="absolute" style="top: 150px; right: 5px; z-index: 99;">
      <div class="w40px bg-white fc-gray3 my-radius2" @click="right = 0">
        <div class="w40px pat5 pab5 h40px lh20px-bottom text-center">
          <i class="iconfont icontucengcopy f18px"></i>
          <div class="clear0"></div>
          <span class="f12px">图层</span>
        </div>
      </div>
    </div>

    <div class="dialog-black" v-show="right == 0" @click="right = -1000"></div>

    <div class="bg-white absolute my-box-shadow" :style="'right:'+right+'px'" style="bottom:0; transition: all .1s; z-index: 99999; width: 198px; height: 100%; overflow-y: scroll;">
      <div class="wb100">
        <div class="clear8"></div>
        <template v-if="isShow3D">
          <template v-for="types in typeList3D">
            <p class="h30px lh30px bg-gray fc-gray3 pal10">{{types.name}}</p>
            <div class="pa5">
              <template v-for="item in types.list">

                <template v-if="item.code == 'streeview'">
                  <div class="w80px h60px relative bd-a2 fl bg-white ma5 img-area myMapType pointer " :class="isShowStreeCovered ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="swicthShowStreet(item)">
                    <img :src="item.img">
                    <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                    <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                      {{item.name}} - {{isShowStreeCovered}}
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="w80px h60px relative bd-a2 fl bg-white ma5 img-area myMapType pointer " :class="curType.code == item.code ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="setMapType(item)">
                    <img :src="item.img">
                    <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                    <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                      {{item.name}}
                    </div>
                  </div>
                </template>

              </template>
            </div>
            <div class="clear2"></div>
          </template>
        </template>
        <template v-else>
          <template v-for="types in typeList">
            <p class="h30px lh30px bg-gray fc-gray3 pal10">{{types.name}}</p>
            <div class="pa5">
              <template v-for="item in types.list">
                <template v-if="item.code == 'streeview'">
                  <div class="w80px h60px bd-a1 relative bd-a2 fl bg-white ma5 img-area myMapType pointer " :class="isShowStreeCovered ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="swicthShowStreet(item)">
                    <img :src="item.img">
                    <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                    <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                      {{item.name}}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="w80px h60px bd-a1 relative bd-a2 fl bg-white ma5 img-area myMapType pointer " :class="curType.code == item.code ? 'bd-blue fc-white bd-blue' : 'bd-gray fc-black bd-gray' " @click="setMapType(item)">
                    <img :src="item.img">
                    <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                    <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                      {{item.name}}
                    </div>
                  </div>
                </template>
              </template>
            </div>
            <div class="clear2"></div>
          </template>
        </template>
      </div>
    </div>

    <template v-if="isShow3D">
      <!--  3D的比例尺和版权信息  -->
      <div class="maptalks-attribution" style="position: absolute; overflow: visible; bottom: 5px; left: 5px; z-index: 99;">
        <span style="padding:0 4px">{{copyright}}</span>
      </div>
      <div class="cesium-my-scale" style="position: absolute; overflow: visible; bottom: 5px; z-index: 99;" :style="'left:'+left+'px'">
        <div :style="'width: '+barWidth+'px; left: '+(5 + (125 - barWidth) / 2)+'px'">{{distanceLabel}}</div>
      </div>
    </template>

  </div>
</template>

<script>

  import { mapTypeList, mapTypeList3D, defaultList, googleSvBaseLayer, baiduSvBaseLayer } from '@/assets/map/layers.js'

  import { out_of_china, bd09togcj02, gcj02tobd09 } from '@/utils/format'

  import { attributionWebapp, imperialWebapp } from '@/assets/map/controls.js'

  export default {
    name: 'Coverage',
    props: {
      map:{
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
      mapLocal:{
        type: Object,
        require: true,
      },

    },
    computed: {

    },
    components: {

    },
    data() {
      return {
        right: -1000,
        boxMaxHeight: 0,
        layers: [],
        typeList: [],
        typeList3D: [],
        curType: {},
        curIndex : 1,
        defaultList: [],
        attribution: null,

        isShowStreeCovered: false,
        hasStreetView: false,
        isGoogleStreetView: true,
        streetViewData: {
          lat: 0,
          lng: 0,
          pano: null,
        },
        once: true,

        google_sv: null,
        panorama: null,
        googleStreeviewOnce: true,

        bd_sv: null,
        panoservice: null,
        bd_pano: null,
        bd_pano_service: null,
        bdStreeviewOnce: true,

        tencent_sv: null,
        tencent_pano: null,
        tencent_pano_service: null,
        tencentStreeviewOnce: true,

        bd: {
          bdResizeObj: null,
          bdBoxObj: null,
          deltaX: null,
          deltaY: null,
          _startX: null,
          _startY: null,
        },

        //resize
        google: {
          googleResizeObj: null,
          googleBoxObj: null,
          deltaX: null,
          deltaY: null,
          _startX: null,
          _startY: null,
        },
        local: {},

        coverage_scale: 1,
        coverage_left: 0,
        coverage_bottom: 0,

        distanceLabel: '',
        barWidth: 0,
        left: 117,
        copyright: '©Google Maps',

        Cesium: require('cesium/Cesium'),
        widgets: require('cesium/Widgets/widgets.css'),

        streetTimer: 0,

        lastPosition: {
          x: 0,
          y: 0,
        }

      }
    },
    watch: {
      mapLocal(mewValue, oldValue){
        this.local = mewValue
      },

      map(c, o) {
        if(this.once){
          //2020年5月25日11:18:26
          //- 先把事件放在这里，以后统一优化

          //- 2020年6月1日11:15:18
          //- 这个监听器会把页面卡死
          // this.map.on('moveend moving', this.mapUpdate)

          //- 测试监听指南针
          //- 2020年5月26日09:25:16
          //-
          if(this.viewer.scene) {
            this.viewer.scene.postRender.addEventListener(() => {
              this.updateDistanceLegendCesium(this.viewer, this.viewer.scene)
            })
          }

          this.once = false
        }
      },

      // viewer(c, o){
      //   if(this.once){
      //     this.isShow3D = this.$parent.show3D
      //   }
      //   this.once = false
      // },

    },
    mounted() {
      this.boxMaxHeight = window.innerHeight

      this.typeList = mapTypeList
      this.typeList3D = mapTypeList3D

      this.defaultList = defaultList

      this.curType = this.typeList[0].list[0]

      this.$emit("mapTypeChange",this.curType)

      this.local = this.$parent.mapLocal

    },
    methods: {


      mapUpdate(){

        let projection = this.map.getProjection()
        let center = this.map.getCenter()
        let currentX = Number.parseFloat(center.x)
        let currentY = Number.parseFloat(center.y)

        if(currentX == this.lastPosition.x && currentY == this.lastPosition.y)
          return

        this.lastPosition.x = currentX
        this.lastPosition.y = currentY

        //判断当前是否处于街景状态

        let isFullScreen = this.$parent.isFullScreen

        if(this.isShowStreeCovered && !isFullScreen){

          //查询当前区域的街景

          if(out_of_china(currentX, currentY)){
            //国外
            this.panoservice.getPanorama({location: {lat: currentY, lng: currentX}, radius: 500}, (data, status)=>{
              if(status === 'OK'){

                this.hasStreetView = true

                this.isGoogleStreetView = true
                this.streetViewData.lat = currentY
                this.streetViewData.lng = currentX
                this.streetViewData.pano = data.location.pano

              }else{

                this.hasStreetView = false
              }
            });

          }else{
            //国内

            this.bd_pano_service.getPanoramaByLocation(new BMap.Point(currentX, currentY), (data)=>{
              if(data == null){

                this.hasStreetView = false
              }else{

                this.hasStreetView = true

                this.streetViewData.lat = currentY
                this.streetViewData.lng = currentX
                this.streetViewData.pano = null

                this.isGoogleStreetView = false

              }
            });

          }

        }

      },

      swicthShowStreet(item){
        if(this.isShowStreeCovered){
          //关闭街景显示
          this.setMapType(item)
          this.isShowStreeCovered = false
        }else{
          //开启街景显示
          this.setMapType(item)
          // this.isShowStreeCovered = true
        }
      },

      openStreetView(){
        this.$emit('streetViewChange', {
          showStreetView: true,
          showGoogleStreetView: this.isGoogleStreetView,
          data: this.streetViewData
        })
      },

      updateDistanceLegendCesium(viewModel, scene) {

        var geodesic = new this.Cesium.EllipsoidGeodesic()

        var distances = [
          1, 2, 3, 5,
          10, 20, 30, 50,
          100, 200, 300, 500,
          1000, 2000, 3000, 5000,
          10000, 20000, 30000, 50000,
          100000, 200000, 300000, 500000,
          1000000, 2000000, 3000000, 5000000,
          10000000, 20000000, 30000000, 50000000]

        var width = scene.canvas.clientWidth
        var height = scene.canvas.clientHeight

        var left = scene.camera.getPickRay(new this.Cesium.Cartesian2((width / 2) | 0, height - 1))
        var right = scene.camera.getPickRay(new this.Cesium.Cartesian2(1 + (width / 2) | 0, height - 1))

        var globe = scene.globe
        var leftPosition = globe.pick(left, scene)
        var rightPosition = globe.pick(right, scene)

        if (this.$base.isNull(leftPosition) || this.$base.isNull(rightPosition)) {
          viewModel.barWidth = undefined
          viewModel.distanceLabel = undefined
          return
        }

        var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition)
        var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition)

        geodesic.setEndPoints(leftCartographic, rightCartographic)
        var pixelDistance = geodesic.surfaceDistance

        // Find the first distance that makes the scale bar less than 100 pixels.
        var maxBarWidth = 100
        var distance
        for (var i = distances.length - 1; this.$base.isNull(distance) && i >= 0; --i) {
          if (distances[i] / pixelDistance < maxBarWidth) {
            distance = distances[i]
          }
        }

        if (!this.$base.isNull(distance)) {
          var label
          if (distance >= 1000) {
            label = (distance / 1000).toString() + ' km'
          } else {
            label = distance.toString() + ' m'
          }

          viewModel.barWidth = (distance / pixelDistance) | 0
          viewModel.distanceLabel = label
        } else {
          viewModel.barWidth = undefined
          viewModel.distanceLabel = undefined
        }


        this.barWidth = viewModel.barWidth
        this.distanceLabel = viewModel.distanceLabel

      },

      setStreeview(bdPos, googlePos){

        //如果初始化，则直接跳转
        if(!this.$base.isNull(this.panorama) && !this.$base.isNull(this.google_sv)){
          this.google_sv.panTo([googlePos.lng(), googlePos.lat()]) // 平移坐标轴
          this.googleMarker.setCoordinates([googlePos.lng(), googlePos.lat()]) // 设置Marker中心点
        }else{
          //初始化谷歌街景
          //谷歌街景
          this.panorama = new google.maps.StreetViewPanorama(document.getElementById("panomap"), {
            addressControl: false,
            imageDateControl: true,
            position: googlePos,
            pov: {
              heading: 309.5767524434684,
              pitch: -3.7381792742622935
            },
            scaleControl: false,
            fullscreenControl: false,
            panControl: false,
            zoomControl: false,
            motionTrackingControl: false,
            // linksControl: false,
          })
          this.panoservice = new google.maps.StreetViewService
          this.google_sv = new maptalks.Map('google_sv', {
            center: [googlePos.lng(), googlePos.lat()],
            zoom: 14,
            zoomControl: {
              'position': {
                top:44,
                left:10,
              },
              'slider': false,
              'zoomLevel': false
            },
            attribution: false,
            // add zoom control
            scaleControl: false,
            // add scale control
            overviewControl: false,
            spatialReference:{
              projection: 'EPSG:3857'
            },
            baseLayer: googleSvBaseLayer
          })
          this.maplayer = new maptalks.VectorLayer('vector').addTo(this.google_sv)
          this.googleMarker = new maptalks.Marker([googlePos.lng(), googlePos.lat()], {
            symbol: {
              'markerFile': 'http://xinzhi.space/static/marker.png',
              // 'markerFile': require('@/assets/img/marker.png'),
              'markerRotation': 0,
              'markerDy': 40
            }
          }).addTo(this.maplayer)
          this.google_sv.on('click',(e)=> {
            this.panorama.setPosition(new google.maps.LatLng(e.coordinate.y, e.coordinate.x))
            this.googleMarker.setCoordinates(e.coordinate)
          })
          google.maps.event.addListener(this.panorama, "position_changed",(e)=> {
            let p = this.panorama.getPosition()
            if(this.google_sv) {
              this.googleMarker.setCoordinates([p.lng(), p.lat()])
            }
            this.$emit("localChange",{
              lng: p.lng(),
              lat: p.lat(),
            })
          })

          google.maps.event.addListener(this.panorama, "status_changed",(e)=> {

            if(this.panorama.getStatus() != "OK") {
              // debugger
              //判断是否在国内
              if(!out_of_china(this.local.pt.lng, this.local.pt.lat)){
                //切换至百度地图
                // this.$nextTick(()=>{
                //   this.setMapType({
                //     code: 'bmap_streeview',
                //     name: '街景',
                //     layers: [''],
                //   })
                // })
              }else{
                this.$emit('streeviewNoImgEvent', true)
              }
            }else{
              this.$emit('streeviewNoImgEvent', false)
            }
          })

          google.maps.event.addListener(this.panorama, "pov_changed",()=> {
            let p = this.panorama.getPosition()
            let p2 = this.panorama.getPov()
            if(this.google_sv) {
              this.googleMarker.updateSymbol({
                markerRotation: p2.heading * (-1) + 180
              })
              this.google_sv.panTo([p.lng(), p.lat()])
            }
          })
          //bind resize
          this.google.googleResizeObj = document.getElementById("google_resize");
          this.google.googleBoxObj = document.getElementById("google_box");
          this.google.googleResizeObj.addEventListener('touchstart', (event)=> {
            let element = event.targetTouches[0]
            var scroll = this.getScrollOffsets()
            var startX = element.clientX + scroll.x;
            var startY = element.clientY + scroll.y;
            this.google._startX = parseInt(startX);
            this.google._startY = parseInt(startY);
            if (document.addEventListener) {
              document.addEventListener("touchmove", this.moveHandler2, true);
              document.addEventListener("touchend", this.upHandler2, true);

            } else if (document.attachEvent) {
              this.google.googleResizeObj.setCapture();
              this.google.googleResizeObj.attachEvent("onlosecapeture", this.upHandler2);
              this.google.googleResizeObj.attachEvent("onmouseup", this.upHandler2);
              this.google.googleResizeObj.attachEvent("onmousemove", this.moveHandler2);
            }
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
          });

        }

        //如果初始化，则直接跳转
        if(!this.$base.isNull(this.bd_pano) && !this.$base.isNull(this.bd_sv)){
          this.bd_sv.panTo([bdPos.lng, bdPos.lat])
          this.marker.setCoordinates([bdPos.lng, bdPos.lat])
        }else{
          //加载百度街景

          // 百度街景中的地图
          this.bd_sv = new maptalks.Map('bd_sv', {
            center: [bdPos.lng, bdPos.lat],
            zoom: 15,
            zoomControl: {
              'position': {
                top:44,
                left:10,
              },

              'slider': false,
              'zoomLevel': false
            },
            attribution: false,
            scaleControl: false,
            overviewControl: false,
            spatialReference:{
              projection : 'baidu'
            },
            baseLayer: baiduSvBaseLayer
          })
          // 百度街景中的街景
          this.bd_pano = new BMap.Panorama('bd_pano');
          this.bd_pano.setPosition(new BMap.Point(bdPos.lng, bdPos.lat));
          this.bd_pano.setPov({heading: -40, pitch: 6});

          this.bd_pano_service = new BMap.PanoramaService();

          this.maplayer = new maptalks.VectorLayer('vector').addTo(this.bd_sv)
          this.marker = new maptalks.Marker([bdPos.lng, bdPos.lat], {
            symbol: {
              'markerFile': 'http://xinzhi.space/static/marker.png',
              'markerRotation': 0,
              'markerDy': 40
            }
          }).addTo(this.maplayer)

          this.bd_sv.on('click',(e)=> {

            // console.log(e.coordinate.x, e.coordinate.y)

            //查询周围10公里的全景图，返回最近的一个
            //- 2020年4月29日15:54:41
            //- 有bug 暂时搁置
            // this.bd_pano_service.getPanoramaByLocation(new BMap.Point(e.coordinate.x, e.coordinate.y)[10], (data)=>{
            this.bd_pano_service.getPanoramaByLocation(new BMap.Point(e.coordinate.x, e.coordinate.y), (data)=>{

              if(out_of_china(e.coordinate.x, e.coordinate.y)){
                //切换至谷歌街景
                this.$emit("localChange",{
                  lng: e.coordinate.x,
                  lat: e.coordinate.y,
                })
                // this.$nextTick(()=>{
                //   this.setMapType({
                //     code: 'google_streeview',
                //     name: '街景',
                //     layers: [''],
                //     lng: e.coordinate.x,
                //     lat: e.coordinate.y,
                //   })
                // })

              }else{
                if(data == null){
                  // this.$message({
                  //   message: '未找到该区域的街景图，请在地图上蓝色区域点击',
                  //   type: 'info'
                  // })
                  this.$emit('streeviewNoImgEvent', true)
                }else{
                  this.bd_pano.setPosition(new BMap.Point(e.coordinate.x, e.coordinate.y));
                  this.$emit('streeviewNoImgEvent', false)
                }
              }
            });
            if(this.marker)
              this.marker.setCoordinates(e.coordinate)
          })

          this.bd_pano.addEventListener('position_changed', (e)=>{
            let p = this.bd_pano.getPosition()
            if(this.bd_sv) {
              this.marker.setCoordinates([p.lng, p.lat])
            }
            this.$emit("localChange",{
              lng: p.lng,
              lat: p.lat,
            })
          })
          this.bd_pano.addEventListener('pov_changed', (e)=>{ //全景视角改变事件
            let p = this.bd_pano.getPosition()
            let p2 = this.bd_pano.getPov()
            if(this.bd_sv) {
              this.marker.updateSymbol({
                markerRotation: p2.heading * (-1) + 180
              })
              this.bd_sv.panTo([p.lng, p.lat])
            }
          })

          //bind resize
          this.bd.bdResizeObj = document.getElementById("bd_resize");
          this.bd.bdBoxObj = document.getElementById("bd_box");
          this.bd.bdResizeObj.addEventListener('touchstart', (event)=> {
            let element = event.targetTouches[0]
            var scroll = this.getScrollOffsets()
            var startX = element.clientX + scroll.x;
            var startY = element.clientY + scroll.y;
            this.bd._startX = parseInt(startX);
            this.bd._startY = parseInt(startY);
            if (document.addEventListener) {
              document.addEventListener("touchmove", this.moveHandler, true);
              document.addEventListener("touchend", this.upHandler, true);
            } else if (document.attachEvent) {
              this.bd.bdResizeObj.setCapture();
              this.bd.bdResizeObj.attachEvent("onlosecapeture", this.upHandler);
              this.bd.bdResizeObj.attachEvent("onmouseup", this.upHandler);
              this.bd.bdResizeObj.attachEvent("onmousemove", this.moveHandler);
            }
            if (event.stopPropagation) event.stopPropagation();
            else event.cancelBubble = true;
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
          });

        }

      },

      setMapType(type){
        this.type = JSON.parse(JSON.stringify(type));

        if(type.lng != undefined){
          this.local.pt.lat = type.lat
          this.local.pt.lng = type.lng
        }

        if(this.isShow3D){
          //3D模式
          //判断是否是街景模式
          if(type.code.includes('streeview')){
            this.$message({
              message: '街景地图不支持3D',
              type: 'info'
            })
            return
          }

          this.curType = this.type

          this.$emit("mapTypeChange",this.type)

          let viewerLayers = this.viewer.imageryLayers

          //加载3D图层
          viewerLayers._layers.forEach(t=>{
            t.show = false
          })

          for(let i=0; i< this.type.layers.length; i++){
            let _r = viewerLayers._layers.find(t=> t._imageryProvider.id == this.type.layers[i])
            if(_r)
              _r.show = true
          }

          if(this.type.options.attribution =='©Google Maps'){
            this.left = 117
          }
          if(this.type.options.attribution =='©天地图'){
            this.left = 76
          }
          if(this.type.options.attribution =='©百度地图' || this.type.options.attribution =='©高德地图' ||this.type.options.attribution =='©腾讯地图'){
            this.left = 90
          }
          if(this.type.options.attribution =='©ArcGIS'){
            this.left = 79
          }
          if(this.type.options.attribution =='©OpenStreetMap'){
            this.left = 132
          }
          if(this.type.options.attribution =='©MapBox'){
            this.left = 85
          }

          //cesium的标尺和版权信息
          this.copyright = this.type.options.attribution

          return
        }

        if(type.code.includes('streeview')){

          const layers = this.map.getLayers()

          if(this.isShowStreeCovered){
            //关闭街景覆盖
            let _r = layers.find(t=> t._id == 'bmap_streetview_covered')
            if(_r){
              _r.hide()
            }
            let _r2 = layers.find(t=> t._id == 'google_streetview_covered')
            if(_r2){
                _r2.hide()
            }

            //关闭监听器
            window.clearInterval(this.streetTimer)

          }else{
            //显示街景覆盖
            let _r = layers.find(t=> t._id == 'bmap_streetview_covered')
            if(_r){
              if(!_r.options.visible){
                _r.show()
              }
            }
            let _r2 = layers.find(t=> t._id == 'google_streetview_covered')
            if(_r2){
              if(!_r2.options.visible){
                _r2.show()
              }
            }

            this.streetTimer = window.setInterval(this.mapUpdate, 500)

          }

          this.isShowStreeCovered = !this.isShowStreeCovered

          let bdPos = {
            lng: this.local.pt.lng,
            lat: this.local.pt.lat,
          }

          let googlePos = new google.maps.LatLng(this.local.pt.lat, this.local.pt.lng)

          this.setStreeview(bdPos, googlePos)

        }else{
          //加载底图

          //隐藏街景
          this.$emit('streetViewChange', {
            showStreetView: false,
            showGoogleStreetView: false,
          })

          let pos = {
            lng: this.local.pt.lng,
            lat: this.local.pt.lat,
          }
          if(this.type.code == 'bmap_map' || this.type.code == 'bmap_satellite' || this.type.code == 'bmap_streeview'){
            let pt = gcj02tobd09(pos.lng,pos.lat)
            pos.lng = pt[0]
            pos.lat = pt[1]
          }else{
            // let pt = bd09togcj02(itemData.location.lng,itemData.location.lat)
            let pt = bd09togcj02(pos.lng,pos.lat)
            pos.lng = pt[0]
            pos.lat = pt[1]
          }

          this.map.panTo([pos.lng, pos.lat])

          let zoom = this.map.getZoom()

          if(zoom < this.type.options.minZoom){
            this.map.setZoom(this.type.options.minZoom)
          }

          if(zoom > this.type.options.maxZoom){
            this.map.setZoom(this.type.options.maxZoom)
          }

          this.map.setMinZoom(this.type.options.minZoom).setMaxZoom(this.type.options.maxZoom)

          if(this.attribution)
            this.map.removeControl(this.attribution)

          this.attribution = attributionWebapp
          this.attribution.options.content = type.options.attribution

          //改变标尺的位置

          this.map.addControl(this.attribution);

          if(this.imperial)
            this.map.removeControl(this.imperial)

          this.imperial = imperialWebapp

          if(this.type.options.attribution =='©Google Maps'){
            imperialWebapp.options.position.left = 117
          }
          if(this.type.options.attribution =='©天地图'){
            imperialWebapp.options.position.left = 76
          }
          if(this.type.options.attribution =='©百度地图' || this.type.options.attribution =='©高德地图' ||this.type.options.attribution =='©腾讯地图'){
            imperialWebapp.options.position.left = 90
          }
          if(this.type.options.attribution =='©ArcGIS'){
            imperialWebapp.options.position.left = 79
          }
          if(this.type.options.attribution =='©OpenStreetMap'){
            imperialWebapp.options.position.left = 132
          }
          if(this.type.options.attribution =='©MapBox'){
            imperialWebapp.options.position.left = 85
          }

          this.map.addControl(this.imperial);

          const base = this.map.getBaseLayer()

          if (base) {
            const baseLayers = base.layers || [base]
            baseLayers.forEach(t=>{
              t.hide()
            })
            for(let i=0; i< this.type.layers.length; i++){
              let _r = baseLayers.find(t=> t._id == this.type.layers[i])
              if(_r)
                _r.show()
            }

          }else{
            console.error('baseLayers is undefined')
          }

        }

        if(!type.code.includes('streeview')){
          this.curType = this.type
          this.$emit("mapTypeChange",this.type)
        }else{
          this.isShowStreeCovered = true
        }

      },
      moveHandler(e) {
        if (!e) e = window.event;
        let element = e.targetTouches[0]
        var startX =parseInt(element.clientX);
        var startY =parseInt(element.clientY);
        this.bd.deltaX = startX - this.bd._startX;
        this.bd.deltaY = startY - this.bd._startY;
        if (this.bd._startX > startX)
          this.bd.bdBoxObj.style.width = (this.bd.bdBoxObj.offsetWidth - this.bd.deltaX) + "px"
        else
          this.bd.bdBoxObj.style.width = (this.bd.bdBoxObj.offsetWidth - this.bd.deltaX) + "px"
        if (this.bd._startY > startY)
          this.bd.bdBoxObj.style.height = (this.bd.bdBoxObj.offsetHeight - this.bd.deltaY) + "px";
        else
          this.bd.bdBoxObj.style.height = (this.bd.bdBoxObj.offsetHeight - this.bd.deltaY) + "px";
        this.bd._startX = startX;
        this.bd._startY = startY;
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      },

      upHandler(e) {
        if (!e) e = window.event;
        if (document.removeEventListener) {
          document.removeEventListener("touchmove", this.moveHandler, true);
          document.removeEventListener("touchend", this.upHandler, true);
        } else if (document.detachEvent) {
          this.bd.bdResizeObj.detachEvent("onlosecapeture", this.upHandler);
          this.bd.bdResizeObj.detachEvent("onmouseup", this.upHandler);
          this.bd.bdResizeObj.detachEvent("onmousemove", this.moveHandler);
          this.bd.bdResizeObj.releaseCapture();
        }
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      },

      moveHandler2(e) {
        if (!e) e = window.event;
        let element = e.targetTouches[0]
        var startX =parseInt(element.clientX);
        var startY =parseInt(element.clientY);
        this.google.deltaX = startX - this.google._startX;
        this.google.deltaY = startY - this.google._startY;
        if (this.google._startX > startX)
          this.google.googleBoxObj.style.width = (this.google.googleBoxObj.offsetWidth - this.google.deltaX) + "px"
        else
          this.google.googleBoxObj.style.width = (this.google.googleBoxObj.offsetWidth - this.google.deltaX) + "px"
        if (this.google._startY > startY)
          this.google.googleBoxObj.style.height = (this.google.googleBoxObj.offsetHeight - this.google.deltaY) + "px";
        else
          this.google.googleBoxObj.style.height = (this.google.googleBoxObj.offsetHeight - this.google.deltaY) + "px";
        this.google._startX = startX;
        this.google._startY = startY;
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      },

      upHandler2(e) {
        if (!e) e = window.event;
        if (document.removeEventListener) {
          document.removeEventListener("touchmove", this.moveHandler2, true);
          document.removeEventListener("touchend", this.upHandler2, true);
        } else if (document.detachEvent) {
          this.google.googleResizeObj.detachEvent("onlosecapeture", this.upHandler2);
          this.google.googleResizeObj.detachEvent("onmouseup", this.upHandler2);
          this.google.googleResizeObj.detachEvent("onmousemove", this.moveHandler2);
          this.google.googleResizeObj.releaseCapture();
        }
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      },
      getScrollOffsets(w) {
        w = w || window;
        if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };
        var d = w.document;
        if (document.compatMode == "CSS1Compat")
          return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
        return { x: d.body.scrollLeft, y: d.body.scrollTop };
      },

    },

  }
</script>

