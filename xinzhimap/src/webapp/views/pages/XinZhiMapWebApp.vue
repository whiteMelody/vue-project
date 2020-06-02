<template>
    <div class="container relative">

        <!--    page    -->
        <!--    layer    -->
        <!--    layer    -->
        <!--    control    -->
        <!--    code block    -->
<!--        <div class="wb100"></div>-->

        <!--    底图    -->
        <div class="container" v-show="!isShowStreetView && !show3D">
            <div id="maptalks_map" class="container"></div>
        </div>

        <!--    街景    -->
        <div class="container" v-show="isShowStreetView">

            <!-- 退出按钮 -->
            <div class="w50px h50px lh50px absolute fc-white bg-black-shadow radius5" style="top:20px; left: 20px; z-index: 99;" @click="exitStreetView">
                <i class="iconfont icontuichu f26px fl" style="margin: 0px 10px;"></i>
            </div>

            <!-- 谷歌街景 -->
            <div class="container" v-show="showGoogleStreetView">
                <div id="google_box" style="width: 160px; height: 160px; position: absolute; z-index: 99; bottom: 0; right: 0;">
                    <div id="google_sv" class="container bg-white"></div>
                    <div class="absolute" style="top:10px; left: 10px;">
                        <div class="columnFlex" style="background:#172029">
                            <div id="google_resize" class="w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;">
                                <img :src="require('@/assets/img/zoom.png')" style="height: 14px;width: 14px;" alt="">
                            </div>
                            <!-- <div id="google_rank" class=" w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;" @touchstart="mousedown($event)"  @touchend='mouseup($event)'>
                                <img :src="require('@/assets/img/rank.png')" style="height: 18px;width: 18px;" alt="">
                            </div> -->
                        </div>
                    </div>
                </div>
                <div id="panomap" :style="'width:'+width+'px; height:'+height+'px;'" class="container"></div>
            </div>
            <!--    百度街景    -->
            <div class="container" v-show="!showGoogleStreetView">
                <div id="bd_box" style="width: 160px; height: 160px; position: absolute; z-index: 99; bottom: 0; right: 0;">
                    <div id="bd_sv" class="container bg-white"></div>
                    <div class="absolute" style="top:10px; left: 10px;">
                        <div class="columnFlex" style="background:#172029">
                            <div id="bd_resize" class="w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;">
                                <img :src="require('@/assets/img/zoom.png')" style="height: 14px;width: 14px;" alt="">
                            </div>
                            <!-- <div id="bd_rank" class=" w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;" @touchstart="mousedown($event)"  @touchend='mouseup($event)'>
                                <img :src="require('@/assets/img/rank.png')" style="height: 18px;width: 18px;" alt="">
                            </div> -->
                        </div>
                    </div>
                </div>
                <div id="bd_pano" class="container"></div>
            </div>
        </div>

        <!--    cesium 3D   -->
        <div class="container" v-show="show3D">
            <div id="cesiumContainer" class="container"></div>

            <!-- 3D倾斜/旋转按钮 -->
            <div class="absolute" style="top:0; left: 0; right: 0; bottom: 0; margin: auto; z-index: 9; width: 120px; height: 120px;">
                <div class="w30px h30px lh30px fc-gray bd-gray bd-a1 radius1 absolute bg-black-shadow text-center" style="top:0; left: 45px;" @touchstart="myMousedown('up')" @touchmove="myMousemove" @touchend="myMouseup">
                    <i class="el-icon-arrow-up f22px fl ma4"></i>
                </div>
                <div class="w30px h30px lh30px fc-gray bd-gray bd-a1 radius1 absolute bg-black-shadow text-center" style="left: 0; top: 45px;" @touchstart="myMousedown('left')" @touchmove="myMousemove" @touchend="myMouseup">
                    <i class="el-icon-arrow-left f22px fl ma4"></i>
                </div>
                <div class="w30px h30px lh30px fc-gray bd-gray bd-a1 radius1 absolute bg-black-shadow text-center" style="bottom:0; right: 45px;" @touchstart="myMousedown('down')" @touchmove="myMousemove" @touchend="myMouseup">
                    <i class="el-icon-arrow-down f22px fl ma4"></i>
                </div>
                <div class="w30px h30px lh30px fc-gray bd-gray bd-a1 radius1 absolute bg-black-shadow text-center" style="right: 0; top: 45px;" @touchstart="myMousedown('right')" @touchmove="myMousemove" @touchend="myMouseup">
                    <i class="el-icon-arrow-right f22px fl ma4"></i>
                </div>
            </div>
        </div>

        <!--  显示十字  -->
        <img v-show="!isShowStreetView && !showPoint" src="@/assets/img/cross.png" class="absolute" style=" top:0; right: 0; left: 0; bottom: 0; z-index: 9; margin: auto; pointer-events: none; opacity:0.8; filter:alpha(opacity=80);">


        <!--  搜索组件  -->
        <search
                ref="search"
                :map="map"
                :curTypeCode ="curType.code"
                v-on:toPt="toPoint"
                v-on:localChange="localChanged"
                v-show="!isFullScreen && !isShowStreetView">
        </search>

        <!--    工具箱&个人中心&右下角操作栏    -->
        <tools
                ref="tools"
                :map="map"
                :isShow3D="show3D"
                :viewer="viewer"
                v-on:toPt="toPoint"
                v-on:swicth3DEvent="swicthed"
                v-on:fullScreenEvent="setFullScreen"
                v-on:showPointEvent="setShowPoint"
                v-on:localChange="localChanged"
                v-on:openTool="openTooled"
                v-show="!isShowStreetView">
        </tools>

        <!-- 路线规划 -->
        <planngin v-show="!isFullScreen && !isShowStreetView && !show3D"></planngin>

        <!--    图层    -->
        <coverage
            ref="coverage"
            :map="map"
            :viewer="viewer"
            :isShow3D="show3D"
            v-show="!isFullScreen && !isShowStreetView"
            :mapLocal = "mapLocal"
            v-on:streeviewNoImgEvent="setStreeviewNoImg"
            v-on:streetViewChange="streetViewChanged"
            v-on:mapTypeChange="mapTypeChanged"
            v-on:localChange="localChanged">
        </coverage>

        <!-- 登录页面 -->

        <!-- 个人中心页面 -->



    </div>

</template>

<script>

    import { baseLayer, layers, layerList, getBDImageryProvider, getTencentImageryProvider } from '@/assets/map/layers.js'

    import search from '@/components/webapp/Search.vue'
    import tools from '@/components/webapp/Tools.vue'
    import coverage from '@/components/webapp/Coverage.vue'
    import planngin from '@/components/webapp/planngin/index.vue'

    export default {
        name: 'XinZhiMapWebApp',
        components: {
            search, tools, coverage, planngin
        },
        data() {
            return {
                client:{
                    x:0,
                    y:0
                },
                bd_boxView:{
                    width:160,
                    height:160,
                },
                map: {},
                curType: {},
                mapLocal: {
                    city: '',
                    pt: {
                        lat: 29.85226,
                        lng: 107.08719,
                    }
                },
                show3D: false,
                isShowStreetView: false,
                showGoogleStreetView: false,

                viewer: {},
                boxSize: 300,
                Cesium: require('cesium/Cesium'),
                widgets: require('cesium/Widgets/widgets.css'),

                showPoint: false,
                streeviewNoImg: false,
                isFullScreen: false,

                pitch: -90,
                roll: 0,
                heading: 0,
                angle: 0,
                moveY: 0,

                timeOutEvent: 0,
                oldTransform: null,

                distanceLabel: '',
                barWidth: 0,

                distanceTool: {},

                width: 0,
                height: 0,

            }
        },
        methods: {

            // change2D(){
            //   this.$refs.tools.swicth3D()
            // },

            exitStreetView(){
                this.showGoogleStreetView = false
                this.isShowStreetView = false
            },

            myMousedown(type){
                clearInterval(this.timeOutEvent);//清除定时器
                this.timeOutEvent = 0;
                this.timeOutEvent = setInterval(()=>{
                    //执行长按要执行的内容，
                    if(type == 'up')
                        this.pitchUp()
                    if(type == 'left')
                        this.rotateLeft()
                    if(type == 'right')
                        this.rotateRight()
                    if(type == 'down')
                        this.pitchDown()
                },50);//这里设置定时
            },

            myMousemove(){
                clearInterval(this.timeOutEvent);//清除定时器
                this.viewer.camera.lookAtTransform(this.oldTransform)
            },

            myMouseup(){
                clearInterval(this.timeOutEvent);//清除定时器
                this.viewer.camera.lookAtTransform(this.oldTransform)
            },

            pitchUp(){

                let vector = {
                    x: 0,
                    y: -100
                }

                let _angle = Math.atan2(-vector.y, vector.x)
                let orbitCursorAngle = this.Cesium.Math.zeroToTwoPi(_angle - this.Cesium.Math.PI_OVER_TWO)

                let _distance = this.Cesium.Cartesian2.magnitude(vector)

                let maxDistance = 47.5
                let distanceFraction = Math.min(_distance / maxDistance, 1.0)
                let easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5

                let deltaT = 34
                let rate = (easedOpacity - 0.5) * 2.5 / 1000
                let distance = deltaT * rate

                let angle = orbitCursorAngle + this.Cesium.Math.PI_OVER_TWO

                let x = Math.cos(angle) * distance
                let y = Math.sin(angle) * distance

                let newTransformScratch = new this.Cesium.Matrix4()

                let scene = this.viewer.scene
                let camera = scene.camera

                let result = new this.Cesium.Cartesian3()

                let rayScratch = new this.Cesium.Ray()

                // console.log(camera.positionWC)

                rayScratch.origin = camera.positionWC
                rayScratch.direction = camera.directionWC
                result = scene.globe.pick(rayScratch, scene, result)

                camera.lookAtTransform(this.Cesium.Transforms.eastNorthUpToFixedFrame(result, scene.globe.ellipsoid, newTransformScratch))

                // console.log(result, deltaT, rate, distance, angle, x, y)

                //pitch大于0度，会进入地底
                if(this.viewer.camera.pitch < -0.1)
                    this.viewer.camera.rotateUp(y)

                // this.viewer.camera.rotateLeft(x)


            },

            pitchDown(){

                let vector = {
                    x: 0,
                    y: 100
                }

                let _angle = Math.atan2(-vector.y, vector.x)
                let orbitCursorAngle = this.Cesium.Math.zeroToTwoPi(_angle - this.Cesium.Math.PI_OVER_TWO)

                let _distance = this.Cesium.Cartesian2.magnitude(vector)

                let maxDistance = 47.5
                let distanceFraction = Math.min(_distance / maxDistance, 1.0)
                let easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5

                let deltaT = 34
                let rate = (easedOpacity - 0.5) * 2.5 / 1000
                let distance = deltaT * rate

                let angle = orbitCursorAngle + this.Cesium.Math.PI_OVER_TWO

                let x = Math.cos(angle) * distance
                let y = Math.sin(angle) * distance

                let newTransformScratch = new this.Cesium.Matrix4()

                let scene = this.viewer.scene
                let camera = scene.camera

                let result = new this.Cesium.Cartesian3()

                let rayScratch = new this.Cesium.Ray()

                rayScratch.origin = camera.positionWC
                rayScratch.direction = camera.directionWC
                result = scene.globe.pick(rayScratch, scene, result)

                camera.lookAtTransform(this.Cesium.Transforms.eastNorthUpToFixedFrame(result, scene.globe.ellipsoid, newTransformScratch))

                // this.viewer.camera.rotateLeft(x)

                this.viewer.camera.rotateUp(y)

            },

            rotateLeft(){
                let vector = {
                    x: -100,
                    y: 0
                }

                let _angle = Math.atan2(-vector.y, vector.x)
                let orbitCursorAngle = this.Cesium.Math.zeroToTwoPi(_angle - this.Cesium.Math.PI_OVER_TWO)

                let _distance = this.Cesium.Cartesian2.magnitude(vector)

                let maxDistance = 47.5
                let distanceFraction = Math.min(_distance / maxDistance, 1.0)
                let easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5

                let deltaT = 34
                let rate = (easedOpacity - 0.5) * 2.5 / 1000
                let distance = deltaT * rate

                let angle = orbitCursorAngle + this.Cesium.Math.PI_OVER_TWO

                let x = Math.cos(angle) * distance
                let y = Math.sin(angle) * distance

                let newTransformScratch = new this.Cesium.Matrix4()

                let scene = this.viewer.scene
                let camera = scene.camera

                let result = new this.Cesium.Cartesian3()

                let rayScratch = new this.Cesium.Ray()

                rayScratch.origin = camera.positionWC
                rayScratch.direction = camera.directionWC
                result = scene.globe.pick(rayScratch, scene, result)


                camera.lookAtTransform(this.Cesium.Transforms.eastNorthUpToFixedFrame(result, scene.globe.ellipsoid, newTransformScratch))

                this.viewer.camera.rotateLeft(x)
                // this.viewer.camera.rotateUp(y)
            },

            rotateRight(){
                let vector = {
                    x: 100,
                    y: 0
                }

                let _angle = Math.atan2(-vector.y, vector.x)
                let orbitCursorAngle = this.Cesium.Math.zeroToTwoPi(_angle - this.Cesium.Math.PI_OVER_TWO)

                let _distance = this.Cesium.Cartesian2.magnitude(vector)

                let maxDistance = 47.5
                let distanceFraction = Math.min(_distance / maxDistance, 1.0)
                let easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5

                let deltaT = 34
                let rate = (easedOpacity - 0.5) * 2.5 / 1000
                let distance = deltaT * rate

                let angle = orbitCursorAngle + this.Cesium.Math.PI_OVER_TWO

                let x = Math.cos(angle) * distance
                let y = Math.sin(angle) * distance

                let newTransformScratch = new this.Cesium.Matrix4()

                let scene = this.viewer.scene
                let camera = scene.camera

                let result = new this.Cesium.Cartesian3()

                let rayScratch = new this.Cesium.Ray()

                rayScratch.origin = camera.positionWC
                rayScratch.direction = camera.directionWC
                result = scene.globe.pick(rayScratch, scene, result)

                camera.lookAtTransform(this.Cesium.Transforms.eastNorthUpToFixedFrame(result, scene.globe.ellipsoid, newTransformScratch))

                this.viewer.camera.rotateLeft(x)
                // this.viewer.camera.rotateUp(y)
            },

            swicthed(val){
                // console.log(new Date().getTime())
                this.show3D = val
            },

            setFullScreen(val){
                this.isFullScreen = val
            },

            setShowPoint(val){
                this.showPoint = val
            },

            setStreeviewNoImg(val){
                this.streeviewNoImg = val
            },

            streetViewChanged(data){
                this.isShowStreetView = data.showStreetView
                this.showGoogleStreetView = data.showGoogleStreetView

                if(data.data){
                    if(data.showGoogleStreetView){
                        this.$refs.coverage.panorama.setPano(data.data.pano);
                        this.$refs.coverage.panorama.setPov({
                            heading: 270,
                            pitch: 0
                        });
                        this.$refs.coverage.panorama.setVisible(true);
                    }else{
                        this.$refs.coverage.bd_pano.setPosition(new BMap.Point(data.data.lng, data.data.lat));
                    }
                    if(this.$refs.coverage.marker)
                        this.$refs.coverage.marker.setCoordinates([data.data.lng, data.data.lat])
                }


            },

            openTooled(type){

            },

            mapTypeChanged(curType){
                this.curType = curType
            },
            localChanged(p){
                //根据经纬度查询城市
                let gc = new BMap.Geocoder()
                let pointAdd = new BMap.Point(p.lng, p.lat)
                gc.getLocation(pointAdd, (rs)=>{
                    this.mapLocal = {
                        city: rs.addressComponents.city,
                        pt: {
                            lat: p.lat,
                            lng: p.lng,
                        }
                    }
                    this.$refs.search.local = this.mapLocal
                    this.$refs.tools.local = this.mapLocal
                    this.$refs.coverage.local = this.mapLocal
                })

            },
            toPoint(item){

                this.localChanged(item.location)

                let maxZoom
                if(this.curType.options)
                    maxZoom = this.curType.options.maxZoom

                if(this.show3D){

                    this.viewer.camera.flyTo({
                        destination: this.Cesium.Cartesian3.fromDegrees(item.location.lng, item.location.lat, (maxZoom - 1) * 2000),
                        duration: 0
                        // duration: 1.0
                    });
                    return
                }else if(this.curType.code == 'google_streeview'){
                    //跳转到谷歌地图指定经纬度
                    let p = new google.maps.LatLng(item.location.lat, item.location.lng)

                    this.$refs.coverage.google_sv.panTo([p.lng(), p.lat()])
                    this.$refs.coverage.panorama.setPosition(p)
                    //获取子组件的属性

                }else if(this.curType.code == 'bmap_streeview'){
                    //跳转到百度地图指定经纬度
                    this.$refs.coverage.bd_sv.panTo([item.location.lng, item.location.lat])
                    this.$refs.coverage.bd_pano.setPosition(new BMap.Point(item.location.lng, item.location.lat));
                    this.$refs.coverage.bd_pano.setPov({heading: -40, pitch: 6});
                    
                }else if(this.curType.code == 'tmap_streeview'){
                    //腾讯街景

                }else{
                    let searchResultTip = {
                        'title': item.name,
                        'content': !this.$base.isNull(item.address) ? item.address : '',
                        'autoOpenOn': '',
                        'width': 200
                    }
                    // let searchResultTip = {
                    //     //'autoOpenOn' : 'click',  //set to null if not to open window when clicking on map
                    //     'single' : false,
                    //     'width'  : 200,
                    //     'custom' : true,
                    //     'autoOpenOn': '',
                    //     'dx' : -3,
                    //     'dy' : -12,
                    //     'content'   :`<div class="content">
                    //     <div class="pop_title">${item.name}</div></div>`
                        
                        
                    //     // '<div class="content">' +
                    //     // '<div class="pop_title">'+item.name +'</div>' +
                    //     // // '<div class="pop_time">' + new Date().toLocaleTimeString() + '</div><br>' +
                    //     // '<div class="pop_dept" id = "b">' + item.address  + '</div>' +
                    //     // // '<div class="pop_dept">' + coordinate.y + '</div>' +
                    //     // '<div class="arrow"></div>' +
                    //     // '</div>'
                    // };

                    //查询当前地图的最小倍数

                    this.map.animateTo({
                        center: [item.location.lng, item.location.lat],
                        zoom: maxZoom - 1
                    }, {
                        duration: 1000
                    },(frame)=> {
                        if(frame.state.playState === 'finished') {
                            let infoWindow = new maptalks.ui.InfoWindow(searchResultTip);
                            
                            let coord = new maptalks.Coordinate(item.location.lng, item.location.lat);
                            infoWindow.addTo(this.map).show();
                            // setTimeout(()=>{
                            //     infoWindow.hide()
                            // },3000)
                        }
                    });
                }
            },
            plusReady(){
                // openPrivacy();
                // Android处理返回键
                plus.key.addEventListener('backbutton',function(){
                    ('iOS'==plus.os.name)?plus.nativeUI.confirm('确认退出？', function(e){
                        if(e.index>0){
                            plus.runtime.quit();
                        }
                    }, 'HelloH5', ['取消','确定']):(confirm('确认退出？')&&plus.runtime.quit());
                },false);

                //采用uni-app定位
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
                        this.toPoint({
                            name: data.addresses,
                            location: {
                                lng: Number.parseFloat(data.coords.longitude),
                                lat: Number.parseFloat(data.coords.latitude),
                            }
                        })
                    }else{
                        this.$message({
                            message: '定位失败',
                            type: 'error',
                        })
                    }

                })
            },
            //拖拽
            mousedown(e) {
                let element = e.targetTouches[0]
                let wh = window.innerHeight;
                this.client.x = element.clientX
                this.client.y = element.clientY
                
                let bd_box,target
                if (this.curType.code == 'google_streeview') {
                    bd_box = document.getElementById('google_box') 
                    target = document.getElementById('google_rank');
                } else {
                    bd_box = document.getElementById('bd_box') 
                    target = document.getElementById('bd_rank');
                }
                this.bd_boxView.height = Number(bd_box.style.height.replace('px',''))
                this.bd_boxView.width = Number(bd_box.style.width.replace('px',''))

                if (e.preventDefault) {
                    e.preventDefault();
                } else{
                    e.returnValue=false;
                };
                target.addEventListener('touchmove', (ev)=>{
                    let el = ev.targetTouches[0]
                    let e=ev||window.event;
                    if (e.clientY < 0 || e.clientX < 0 || e.clientY > wh) {
                        return false;
                    };
                    this.$nextTick(()=>{
                        bd_box.style.bottom = (wh - el.clientY - this.bd_boxView.height + 52) + 'px'
                        bd_box.style.right = (window.innerWidth - el.clientX - this.bd_boxView.width + 26)  + 'px' 
                    })
                });
            },

            mouseup: function (event) {
                document.touchmove=null;
            },

        },
        mounted() {

            let mapLocal = this.$store.getters.map

            this.boxSize = window.innerWidth / 2

            if(!this.$base.isNull(mapLocal)){
                this.mapLocal = mapLocal
                if (window.plus) {
                    this.plusReady()
                } else {
                    document.addEventListener('plusready', this.plusReady, false);
                }
            }else{

                if (window.plus) {
                    this.plusReady()
                } else {
                    document.addEventListener('plusready', this.plusReady, false);

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((e)=>{
                            mapLocal = {
                                city: '',
                                pt: {
                                    lat: Number.parseFloat(e.coords.latitude),
                                    lng: Number.parseFloat(e.coords.longitude),
                                }
                            }
                            this.mapLocal = mapLocal
                            this.$store.commit('SET_MAP_LOCAL', mapLocal)
                        }, ()=>{
                            this.$message({
                                message: '定位失败，请手动定位',
                                type: 'info'
                            })
                        });

                    } else {
                        this.$message({
                            message: '定位失败，请手动定位',
                            type: 'info'
                        })
                    }
                }

            }

            this.map = new maptalks.Map('maptalks_map', {
                center: [this.mapLocal.pt.lng, this.mapLocal.pt.lat],
                zoom: 5,
                maxZoom: 19,
                minZoom: 3,
                zoomControl: false,
                // attribution: {
                //     content: `©新知地图 渝ICP备20003923号 <span class="mal10 mar10">|</span> <a href="javascript:void(0)" onclick='toCoypRight()'>版权信息</a> <span class="mal10 mar10">|</span> <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d3a9c5bde03ca22bc1f72af7af37eba484987b65c296f6ec8b0993fb19a9ee30"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" class="fr" alt="新知地图" title="新知地图"></a>`,
                //     position: {
                //         bottom: 5,
                //         right: 60
                //     }
                // },
                attribution: false,
                // add zoom control
                scaleControl: false,
                // add scale control
                overviewControl: false,
                spatialReference:{
                    projection: 'EPSG:3857'
                },
                
                baseLayer: baseLayer,
                layers: layers,
            })

            //初始化3D地图
            this.viewer = new this.Cesium.Viewer('cesiumContainer', {
                geocoder: false, // 地理位置查询定位控件
                homeButton: false, // 默认相机位置控件
                timeline: false, // 时间滚动条控件
                navigationHelpButton: false, // 默认的相机控制提示控件
                fullscreenButton: false, // 全屏控件
                scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
                baseLayerPicker: false, // 底图切换控件
                animation: false, // 控制场景动画的播放速度控件
                terrainProvider : this.Cesium.createWorldTerrain({
                    requestWaterMask : true,
                    requestVertexNormals : true
                }),
                contextOptions: {
                    id: "cesiumCanvas",
                    webgl: {
                        preserveDrawingBuffer: true
                    }
                },
            })
            this.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Y2U5YWU4NS1hNzNkLTQ2MzEtYTM1MC02NWY0MDczZDBkYjAiLCJpZCI6MjYyODIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODc1MjM2NTZ9.UL0UxwvXe2YKsbDmImT9NT0vtkcR4IkIqx3soxKRVYQ'
            this.viewer._cesiumWidget._creditContainer.style.display = "none"// 隐藏版权

            // 防止相机进入地下
            let minPitch = -this.Cesium.Math.PI_OVER_TWO;
            let maxPitch = 0;
            let minHeight = 200;

            this.viewer.camera.changed.addEventListener(
                ()=> {
                    if (this.viewer.camera._suspendTerrainAdjustment && this.viewer.scene.mode === this.Cesium.SceneMode.SCENE3D) {
                        this.viewer.camera._suspendTerrainAdjustment = false;
                        this.viewer.camera._adjustHeightForTerrain();
                    }

                    // Keep camera in a reasonable pitch range
                    let pitch = this.viewer.camera.pitch;

                    if (pitch > maxPitch || pitch < minPitch) {
                        this.viewer.scene.screenSpaceCameraController.enableTilt = false;

                        // clamp the pitch
                        if(pitch > maxPitch ) {
                            pitch = maxPitch;
                        } else if(pitch < minPitch) {
                            pitch = minPitch;
                        }

                        let destination = this.Cesium.Cartesian3.fromRadians(
                            this.viewer.camera.positionCartographic.longitude,
                            this.viewer.camera.positionCartographic.latitude,
                            Math.max(this.viewer.camera.positionCartographic.height, minHeight));

                        this.viewer.camera.setView({
                            destination: destination,
                            orientation: { pitch: pitch }
                        });
                        this.viewer.scene.screenSpaceCameraController.enableTilt = true;
                    }
                }
            );

            this.oldTransform = this.Cesium.Matrix4.clone(this.viewer.camera.transform, new this.Cesium.Matrix4())

            let viewerLayers = this.viewer.imageryLayers

            //动态创建layer

            let _tmpLayer

            // 标准格式

            for(let i=0; i<layerList.length; i++){

                if(layerList[i].code.includes('bmap')){
                    //百度
                    _tmpLayer = new getBDImageryProvider(this.Cesium, layerList[i].options)
                }else if(layerList[i].code.includes('tmap')){
                    //腾讯
                    _tmpLayer = new getTencentImageryProvider(this.Cesium, layerList[i].options)
                }else{
                    //其他
                    _tmpLayer = new this.Cesium.UrlTemplateImageryProvider({
                        url: layerList[i].options.urlTemplate,
                        subdomains: layerList[i].options.subdomains,
                        credit: layerList[i].options.attribution,
                        // maximumLevel: layerList[i].options.maxZoom * 1000,     // 这个是16
                        // minimumLevel: layerList[i].options.minZoom * 1000,     // 这个是4
                    });
                }

                _tmpLayer.id = layerList[i].code

                viewerLayers.addImageryProvider(_tmpLayer)
            }

            //默认隐藏
            for(let i=0; i<viewerLayers._layers.length; i++){
                viewerLayers._layers[i].show = false
            }


            this.width = window.innerWidth
            this.height = window.innerHeight

            // viewerCesiumNavigationMixin(this.viewer)

            //- 测试3D测量工具
            //- 2020年5月25日14:01:24
            //-
            //创建测量工具
            // new MeasureTool({
            //     viewer: this.viewer,
            //     Cesium: this.Cesium,
            //     target: 'measure'
            // })

            window.myRoute = this.$router

            window.saveLocal = ()=>{
                let mapLocal = this.mapLocal
                mapLocal.pt.lng = this.map.getCenter().x
                mapLocal.pt.lat = this.map.getCenter().y
                localStorage.setItem('xzMap', JSON.stringify(mapLocal))
                if(window.plus){
                    plus.storage.setItem('xzMap', JSON.stringify(mapLocal));
                }
            }

        },

    }

    window.toCoypRight = function(){
        window.myRoute.push('cr')
    }

    window.onbeforeunload = function() {
        window.saveLocal()
    }

</script>

<style lang='scss' scoped>

</style>