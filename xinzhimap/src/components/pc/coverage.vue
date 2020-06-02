<template>
  <!--  图层  -->
  <div>
    <div class="absolute bg-white" style="bottom: 5px; left: 15px; z-index: 99;">
      <template v-for="item in defaultList">
        <div class="w80px h60px bd-a2 relative fl bg-white ma1 img-area myMapType pointer"  :class="curType.code == item.code ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="setMapType(item, 'defaluet')">
          <img :src="item.img">
          <div class="h20px lh20px absolute text-right" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 5px;">
            {{item.name}}
          </div>
        </div>
      </template>
      <template v-if="left == -400">
        <div class="w20px h60px bd-gray bd-a1 bg-white lh30px text-center my-hover fl mat1" @click="showMoreClick">
          <i class="iconfont f20px fl mat20 el-icon-arrow-right fc-blue"></i>
        </div>
      </template>
      <template v-else>
        <div class="w20px h60px bd-gray bd-a1 bg-white lh30px text-center my-hover fl mat1" @click="hideMoreClick">
          <i class="iconfont f20px fl mat20 el-icon-arrow-left fc-blue"></i>
        </div>
      </template>
    </div>
    <div class="w-auto bg-white absolute bd-gray bd-a1" style="bottom:0; left:15px; transition: all .1s; z-index: 9999;" :style="'left:'+left+'px; bottom:'+bottom+'px;' " :class="isShow3D ? 'h400px' : 'h485px' ">
      <el-scrollbar style="height:100%">
        <div  :class="isShow3D ? 'h545px' : 'h740px' ">
          <div class="wb100 h20px lh20px absolute bd-gray bg-white text-center my-hover bd-gray bd-a1" style="z-index: 999; left: -1px;" @click="hideMoreClick">
            <i class="iconfont f20px center el-icon-arrow-down fc-blue"></i>
          </div>
          <div class="wb100 " style="padding-top:21px ">
            <div class="pa5">
              <template v-if="isShow3D">
                <template v-for="types in typeList3D">
                  <p class="h20px lh20px mat5">{{types.name}}</p>
                  <template v-for="item in types.list">
                    <div class="w72px h54px bd-a1 relative bd-a2 fl bg-white ma4 img-area myMapType pointer" :class="curType.code == item.code ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="setMapType(item)">
                      <img :src="item.img">
                      <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                      <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                        {{item.name}}
                      </div>
                    </div>
                  </template>
                  <div class="clear0"></div>
                </template>
              </template>
              <template v-else>
                <template v-for="types in typeList">
                  <p class="h20px lh20px mat5">{{types.name}}</p>
                  <template v-for="item in types.list">
                    <div class="w72px h54px bd-a1 relative bd-a2 fl bg-white ma4 img-area myMapType pointer" :class="curType.code == item.code ? 'bd-blue fc-white' : 'bd-gray fc-black' " @click="setMapType(item)">
                      <img :src="item.img">
                      <i class="iconfont iconD absolute fc-white f12px" v-if="item.code =='earth'" style="top:5px; left:5px;"></i>
                      <div class="h15px lh15px f12px absolute text-right pal5 par5" :class="curType.code == item.code ? 'myMapTypeTextActive' : 'myMapTypeText' " style="bottom: 0; right: 0;">
                        {{item.name}}
                      </div>
                    </div>
                  </template>
                  <div class="clear0"></div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    
  </div>
</template>

<script>

  import { mapTypeList, mapTypeList3D, defaultList, googleSvBaseLayer, baiduSvBaseLayer } from '@/assets/map/layers.js'

  import { out_of_china, bd09togcj02, gcj02tobd09 } from '@/utils/format'

  import { attribution, imperial } from '@/assets/map/controls.js'

  export default {
    name: 'coverage',
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
      tencent_sv: {
        type: Object,
        require: false,
        default: () => null,
      },
      tencent_pano: {
        type: Object,
        require: false,
        default: () => null,
      },
      tencent_pano_service: {
        type: Object,
        require: false,
        default: () => null,
      },
      mapLocal:{
        type: Object,
        require: true,
      },
    },
    computed: {

    },
    components: {},
    data() {
      return {
        left: -400,
        bottom: 0,
        boxMaxHeight: 0,
        layers: [],
        typeList: [],
        typeList3D: [],
        curType: {},
        defaultList: [],
        attribution: null,
        googleStreeviewOnce: true,
        bdStreeviewOnce: true,

        //resize
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
        panorama: null,
        bd_sv: null,
        bd_pano: null,
        bd_pano_service: null,
        google_sv: null,

        once: true,
        type: null,
        marker: null,

      }
    },
    watch: {
      mapLocal(mewValue, oldValue){
        this.local = mewValue
      }

    },
    mounted() {
      this.boxMaxHeight = window.innerHeight

      this.typeList = mapTypeList
      this.typeList3D = mapTypeList3D

      this.defaultList = defaultList

      this.curType = this.typeList[0].list[1]

      this.$emit("mapTypeChange",this.curType)

      this.local = this.$parent.mapLocal

    },
    methods: {

      moveHandler(e) {
        if (!e) e = window.event;
        var startX =parseInt(e.clientX);
        var startY =parseInt(e.clientY);
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
          document.removeEventListener("mousemove", this.moveHandler, true);
          document.removeEventListener("mouseup", this.upHandler, true);
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
        var startX =parseInt(e.clientX);
        var startY =parseInt(e.clientY);
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
          document.removeEventListener("mousemove", this.moveHandler2, true);
          document.removeEventListener("mouseup", this.upHandler2, true);
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

      showMoreClick(){
        this.left = 15
      },

      hideMoreClick(){
        this.left = -400
      },

      setMapType(type, isDefault){
        this.type = JSON.parse(JSON.stringify(type));
        if(type.lng != undefined){
          this.local.pt.lat = type.lat
          this.local.pt.lng = type.lng
        }
        //从默认的图层加载
        if(this.type.code == 'google_streeview'){
          if(out_of_china(this.local.pt.lng, this.local.pt.lat)){
            //加载谷歌
          }else{
            //加载百度
            this.type.code = 'bmap_streeview'
          }
        }

        // console.log(type, isDefault, out_of_china(this.local.pt.lng, this.local.pt.lat))
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

          return
        }
        if(this.type.code == 'google_streeview'){
          this.curType = this.type
          this.$emit("mapTypeChange",this.type)
          if(!this.$base.isNull(this.panorama) && !this.$base.isNull(this.google_sv)){
            let pos = new google.maps.LatLng(this.local.pt.lat, this.local.pt.lng)
            this.google_sv.panTo([pos.lng(), pos.lat()]) // 平移坐标轴
            this.googleMarker.setCoordinates([pos.lng(), pos.lat()]) // 设置Marker中心点
            return
          }
          //谷歌街景
          let pos = new google.maps.LatLng(this.local.pt.lat, this.local.pt.lng)
          this.panorama = new google.maps.StreetViewPanorama(document.getElementById("panomap"), {
            addressControl: false,
            imageDateControl: true,
            position: pos,
            pov: {
              heading: 309.5767524434684,
              pitch: -3.7381792742622935
            },
            scaleControl: false

          })
          this.panoservice = new google.maps.StreetViewService
          this.google_sv = new maptalks.Map('google_sv', {
            center: [pos.lng(), pos.lat()],
            zoom: 14,
            zoomControl: {
              'position': {
                top:64,
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
          this.googleMarker = new maptalks.Marker([pos.lng(), pos.lat()], {
            symbol: {
              'markerFile': 'http://xinzhi.space/static/marker.png',
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
                this.$nextTick(()=>{
                  this.setMapType({
                    code: 'bmap_streeview',
                    name: '街景',
                    layers: [''],
                  })
                })
              }else{
                this.$message({
                  message: '当前区域没有全景图，请点击地图上蓝色的区域',
                  type: 'info'
                })
              }
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
          this.google.googleResizeObj.addEventListener('mousedown', (event)=> {
            var scroll = this.getScrollOffsets()
            var startX = event.clientX + scroll.x;
            var startY = event.clientY + scroll.y;
            this.google._startX = parseInt(startX);
            this.google._startY = parseInt(startY);
            if (document.addEventListener) {
              document.addEventListener("mousemove", this.moveHandler2, true);
              document.addEventListener("mouseup", this.upHandler2, true);
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

        }else if(this.type.code == 'bmap_streeview'){

          this.curType = this.type
          
          this.$emit("mapTypeChange",this.type)

           if(!this.$base.isNull(this.bd_pano) && !this.$base.isNull(this.bd_sv)){
            let pos = {
              lng: this.local.pt.lng,
              lat: this.local.pt.lat,
            }
            this.bd_sv.panTo([pos.lng, pos.lat])
            this.googleMarker.setCoordinates([pos.lng, pos.lat])
            return
          }

          let pos = {
            lng: this.local.pt.lng,
            lat: this.local.pt.lat,
          }
          // 百度街景中的地图
          this.bd_sv = new maptalks.Map('bd_sv', {
            center: [pos.lng, pos.lat],
            zoom: 15,
            zoomControl: {
              'position': {
                top:64,
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
          this.bd_pano.setPosition(new BMap.Point(pos.lng, pos.lat));
          this.bd_pano.setPov({heading: -40, pitch: 6});

          this.bd_pano_service = new BMap.PanoramaService();

          this.maplayer = new maptalks.VectorLayer('vector').addTo(this.bd_sv)
          this.marker = new maptalks.Marker([pos.lng, pos.lat], {
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
                this.$nextTick(()=>{
                  this.setMapType({
                    code: 'google_streeview',
                    name: '街景',
                    layers: [''],
                    lng: e.coordinate.x,
                    lat: e.coordinate.y,
                  })
                })
                
              }else{
                if(data == null){
                  this.$message({
                    message: '未找到该区域的街景图，请在地图上蓝色区域点击',
                    type: 'info'
                  })
                }else{
                  this.bd_pano.setPosition(new BMap.Point(e.coordinate.x, e.coordinate.y));
                }
              }
            });
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
          this.bd.bdResizeObj.addEventListener('mousedown', (event)=> {
            var scroll = this.getScrollOffsets()
            var startX = event.clientX + scroll.x;
            var startY = event.clientY + scroll.y;
            this.bd._startX = parseInt(startX);
            this.bd._startY = parseInt(startY);
            if (document.addEventListener) {
              document.addEventListener("mousemove", this.moveHandler, true);
              document.addEventListener("mouseup", this.upHandler, true);
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

        }else if(this.type.code == 'tmap_streeview'){

        }else{

          let pos = {
            lng: this.local.pt.lng,
            lat: this.local.pt.lat,
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

          this.attribution = attribution
          this.attribution.options.content = this.type.options.attribution

          //改变标尺的位置

          this.map.addControl(this.attribution);

          // if(this.imperial)
          //   this.map.removeControl(this.imperial)

          // this.imperial = imperial

          // if(this.type.options.attribution =='©Google Maps'){
          //   imperial.options.position.left = 117
          // }
          // if(this.type.options.attribution =='©天地图'){
          //   imperial.options.position.left = 76
          // }
          // if(this.type.options.attribution =='©百度地图' || this.type.options.attribution =='©高德地图' || this.type.options.attribution =='©腾讯地图'){
          //   imperial.options.position.left = 90
          // }
          // if(this.type.options.attribution =='©ArcGIS'){
          //   imperial.options.position.left = 79
          // }
          // if(this.type.options.attribution =='©OpenStreetMap'){
          //   imperial.options.position.left = 132
          // }
          // if(this.type.options.attribution =='©MapBox'){
          //   imperial.options.position.left = 85
          // }

          // this.map.addControl(this.imperial);


          const base = this.map.getBaseLayer(),
                  layers = this.map.getLayers()

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

        this.curType = this.type

        this.$emit("mapTypeChange",this.type)

      },

    },

  }
</script>

