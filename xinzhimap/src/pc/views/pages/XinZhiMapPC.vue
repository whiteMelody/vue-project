<template>
    <div class="container relative" >

        <div class="container" @click="setControlData" v-show="curType.code != 'google_streeview' && curType.code != 'bmap_streeview' && curType.code != 'tmap_streeview' && !show3D">
            <div id="maptalks_map" class="container"></div>
        </div>

        <!-- 谷歌街景 -->
        <div class="container" v-show="curType.code == 'google_streeview'" @click="setControlData">
            <div id="google_box" style="width: 400px; height: 400px; position: absolute; z-index: 99; bottom: 0; right: 0;">
                <div id="google_sv" class="container bg-white"></div>
                <div class="absolute" style="top:10px; left: 10px;">
                    <div class="columnFlex" style="background:#172029">
                        <div id="google_resize" class="w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;">
                            <img :src="require('@/assets/img/zoom.png')" style="height: 14px;width: 14px;}" alt="">
                        </div>
                        <div class=" w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;" @mousedown="mousedown($event)"  @mouseup='mouseup($event)'> 
                            <img :src="require('@/assets/img/rank.png')" style="height: 18px;width: 18px;}" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div id="panomap" class="container"></div>
        </div>

        <!--    百度街景    -->
        <div class="container" v-show="curType.code == 'bmap_streeview'" @click="setControlData">
            <div id="bd_box" style="width: 400px; height: 400px; position: absolute; z-index: 99; bottom: 0; right: 0;">
                <div id="bd_sv" class="container bg-white"></div>
                <div class="absolute" style="top:10px; left: 10px;">
                    <div class="columnFlex" style="background:#172029">
                        <div id="bd_resize" class="w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;">
                            <img :src="require('@/assets/img/zoom.png')" style="height: 14px;width: 14px;}" alt="">
                        </div>
                        <div class=" w28px h28px centerFlex" style=" cursor: pointer;border: 1px solid #363539;" @mousedown="mousedown($event)"  @mouseup='mouseup($event)'> 
                            <img :src="require('@/assets/img/rank.png')" style="height: 18px;width: 18px;}" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div id="bd_pano" class="container"></div>
        </div>

        <!--    腾讯街景    -->
        <div class="container" v-show="curType.code == 'tmap_streeview'">
            <div id="tencent_sv" style="width: 50%; height: 300px; position: absolute; z-index: 99; bottom: 0; right: 0;"></div>
            <div id="tencent_pano" class="container"></div>
        </div>

        <!--    cesium 3D   -->
        <div class="container" v-show="show3D">
            <div id="cesiumContainer" class="container"></div>
        </div>

        <!--  显示十字  -->
        <img v-show="curType.code != 'google_streeview' && curType.code != 'bmap_streeview' && curType.code != 'tmap_streeview'" src="@/assets/img/cross.png" class="absolute" style=" top:0; right: 0; left: 0; bottom: 0; z-index: 9; margin: auto; pointer-events: none; opacity:0.8; filter:alpha(opacity=80);">

        <!--  搜索组件  -->
        <search
            ref="search"
            :map="map"
            :mapLocal = "mapLocal"
            v-on:toPt="toPoint"
            v-on:localChange="localChanged"
            v-on:showZoom='showZoom'>
        </search>

        <!--    工具箱&个人中心&右下角操作栏    -->
        <tools
            ref="tools"
            :map="map"
            :viewer="viewer"
            v-on:toPt="toPoint"
            v-on:swicth3DEvent="swicthed"
            v-on:localChange="localChanged"
            v-show="curType.code != 'google_streeview' && curType.code != 'bmap_streeview' && curType.code != 'tmap_streeview'">
        </tools>

        <!--    图层    -->
        <coverage
            ref="coverage"
            :map="map"
            :viewer="viewer"
            :isShow3D="show3D"
            :mapLocal = "mapLocal"
            v-on:mapTypeChange="mapTypeChanged"
            v-on:localChange="localChanged">
        </coverage>

    </div>

</template>

<script>

    import { baseLayer, layerList } from '@/assets/map/layers.js'
    import VueDraggableResizable from 'vue-draggable-resizable'
    import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
    import search from '@/components/pc/search.vue'
    import tools from '@/components/pc/tools.vue'
    import coverage from '@/components/pc/coverage.vue'

    export default {
        name: 'XinZhiMapPC',
        components: {
            search, tools, coverage, VueDraggableResizable
        },
        data() {
            return {
                boxSize: 300,
                client:{
                    x:0,
                    y:0
                },
                bd_boxView:{
                    width:400,
                    height:400,
                },
                map: {},
                curType: {},

                mapLocal: {
                    city: '',
                    pt: {
                        lat: 0,
                        lng: 0,
                    }
                },

                tencent_sv: null,
                tencent_pano: null,
                tencent_pano_service: null,

                show3D: false,
                viewer: {},
                infoWindow:null,

                Cesium: require('cesium/Cesium'),
                widgets: require('cesium/Widgets/widgets.css'),

            }
        },
        methods: {

            swicthed(val){
                this.show3D = val
            },
            // 街景设置
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
                
                if(this.show3D){
                    this.viewer.camera.flyTo({
                        destination: this.Cesium.Cartesian3.fromDegrees(item.location.lng, item.location.lat, item.zoom ? item.zoom * 100 : 1300),
                        duration: 1.0
                    });
                    return
                }else if(this.curType.code == 'google_streeview'){
                    //跳转到谷歌地图指定经纬度
                    let p = new google.maps.LatLng(item.location.lat, item.location.lng)
                    this.$refs.coverage.google_sv.panTo([p.lng(), p.lat()])
                    this.$refs.coverage.panorama.setPosition(p)
                }else if(this.curType.code == 'bmap_streeview'){
                    //跳转到百度地图指定经纬度
                    this.$refs.coverage.bd_sv.panTo([item.location.lng, item.location.lat])
                    this.$refs.coverage.bd_pano.setPosition(new BMap.Point(item.location.lng, item.location.lat));
                    this.$refs.coverage.bd_pano.setPov({heading: -40, pitch: 6});
                }

                let searchResultTip = {
                    'title': item.name,
                    'content': !this.$base.isNull(item.address) ? item.address : '',
                    'autoOpenOn': '',
                    'width': 200
                }
                // this.map.animateTo({
                //     zoom: 5
                // }, {
                //     duration: 1000
                // },(frame)=> {
                //     if(frame.state.playState === 'finished') {
                //         this.map.animateTo({
                //             center: [item.location.lng, item.location.lat],
                //             zoom: 5
                //         }, {
                //             duration: 1000
                //         },(frame)=> {
                //             if(frame.state.playState === 'finished') {
                //                 this.map.animateTo({
                //                     center: [item.location.lng, item.location.lat],
                //                     zoom: 13
                //                 }, {
                //                     duration: 1000
                //                 },(frame)=> {
                //                     if(frame.state.playState === 'finished') {
                //                         this.infoWindow = new maptalks.ui.InfoWindow(searchResultTip);
                //                         let coord = new maptalks.Coordinate(item.location.lng, item.location.lat);
                //                         this.infoWindow.addTo(this.map).show(coord);
                //                         setTimeout(()=>{
                //                             this.infoWindow.hide()
                //                         },3000)
                //                     }
                //                 });
                //             }
                //         });
                //     }
                // });
                this.map.animateTo({
                    center: [item.location.lng, item.location.lat],
                    zoom: 13
                }, {
                    duration: 500
                },(frame)=> {
                    if(frame.state.playState === 'finished') {
                        this.infoWindow = new maptalks.ui.InfoWindow(searchResultTip);
                        let coord = new maptalks.Coordinate(item.location.lng, item.location.lat);
                        this.infoWindow.addTo(this.map).show(coord);
                        setTimeout(()=>{
                            this.infoWindow.hide()
                        },3000)
                    }
                });
            },
            showZoom(item){
                this.map.setZoom(5)
                this.map.setCenter([item.lng,item.lat])
                if(this.infoWindow) this.infoWindow.remove()
                
            },
            //拖拽
            mousedown(event) {
                let wh = window.innerHeight;
                this.client.x = event.clientX
                this.client.y = event.clienty
                let bd_box
                if (this.curType.code == 'google_streeview') {
                    bd_box = document.getElementById('google_box') 
                } else {
                    bd_box = document.getElementById('bd_box') 
                }
                this.bd_boxView.height = Number(bd_box.style.height.replace('px',''))
                this.bd_boxView.width = Number(bd_box.style.width.replace('px',''))

                if (event.preventDefault) {
                    event.preventDefault();
                } else{
                    event.returnValue=false;
                };

                document.onmousemove= (ev) => {
                    var event=ev||window.event;
                    if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh) {
                        return false;
                    };
                    this.$nextTick(()=>{
                        bd_box.style.bottom = (wh - ev.clientY - this.bd_boxView.height + 52) + 'px'
                        bd_box.style.right = (window.innerWidth - ev.clientX - this.bd_boxView.width + 26)  + 'px' 
                    })
                }
            },

            mouseup: function (event) {
                document.onmousemove=null;
            },
             //百度api 通过ip定位
            LocalCity(result) {
                var cityName = result.name;
                this.mapLocal = {
                    city: cityName,
                    pt: {
                        lat: result.center.lat,
                        lng: result.center.lng,
                    }
                }
                this.$store.commit('SET_MAP_LOCAL', this.mapLocal)
              
            },
            //控制显示问题
            setControlData(){
                if(this.$refs.search.showSearchType){  
                    this.$refs.search.setSearchType(false)
                }
                if(this.$refs.coverage.left > 1){
                    this.$refs.coverage.hideMoreClick()
                }
                
            }
        },
        mounted() {
            let mapLocal = this.$store.getters.map
            if(!this.$base.isNull(mapLocal)){
                this.mapLocal = mapLocal
            }else{
                let myCity = new BMap.LocalCity();
                myCity.get(this.LocalCity); 

                // if (navigator.geolocation) {
                //     navigator.geolocation.getCurrentPosition((e)=>{
                //         mapLocal = {
                //             city: '',
                //             pt: {
                //                 lat: e.coords.latitude,
                //                 lng: e.coords.longitude,
                //             }
                //         }
                //         this.mapLocal = mapLocal
                //         this.$store.commit('SET_MAP_LOCAL', mapLocal)
                //     }, ()=>{
                //         this.$message({
                //             message: '定位失败，请手动定位',
                //             type: 'info'
                //         })
                //     });

                // } else {
                //     this.$message({
                //         message: '定位失败，请手动定位',
                //         type: 'info'
                //     })
                // }
            }
            
            this.map = new maptalks.Map('maptalks_map', {
                center: [this.mapLocal.pt.lng, this.mapLocal.pt.lat],
                zoom: 5,
                zoomControl: false,
                attribution: {
                    content: `©新知地图 渝ICP备20003923号 <span class="mal10 mar10">|</span> <a href="javascript:void(0)" onclick='toCoypRight()'>版权信息</a> <span class="mal10 mar10">|</span> <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d3a9c5bde03ca22bc1f72af7af37eba484987b65c296f6ec8b0993fb19a9ee30"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" class="fr" alt="新知地图" title="新知地图"></a>`,
                    position: {
                        bottom: 5,
                        right: 60
                    }
                    
                },
                maxZoom: 19,
                minZoom: 3,
                // add zoom control
                scaleControl: false,
                // add scale control
                overviewControl: false,
                spatialReference:{
                    projection: 'EPSG:3857'
                },
                baseLayer: baseLayer
            })

            //初始化3D地图
            let viewerOption = {
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
            }

            this.viewer = new this.Cesium.Viewer('cesiumContainer', viewerOption)
            this.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Y2U5YWU4NS1hNzNkLTQ2MzEtYTM1MC02NWY0MDczZDBkYjAiLCJpZCI6MjYyODIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODc1MjM2NTZ9.UL0UxwvXe2YKsbDmImT9NT0vtkcR4IkIqx3soxKRVYQ'
            this.viewer._cesiumWidget._creditContainer.style.display = "none" // 隐藏版权

            let viewerLayers = this.viewer.imageryLayers

            //动态创建layer

            let _tmpLayer

            for(let i=0; i<layerList.length; i++){
                _tmpLayer = new this.Cesium.UrlTemplateImageryProvider({
                    url: layerList[i].options.urlTemplate,
                    subdomains: layerList[i].options.subdomains,
                    credit: layerList[i].options.attribution,
                    maximumLevel: layerList[i].options.maxZoom,
                    minimumLevel: layerList[i].options.minZoom,
                });
                _tmpLayer.id = layerList[i].code
                viewerLayers.addImageryProvider(_tmpLayer)
            }

            //默认隐藏
            for(let i=0; i<viewerLayers._layers.length; i++){
                viewerLayers._layers[i].show = false
            }

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