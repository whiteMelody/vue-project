/**
 * maptalks layers
 * 黑音
 * 2020年4月30日09:47:54
 */

//百度
import typeImg1 from '@/assets/img/maptype1.jpg'
import typeImg2 from '@/assets/img/maptype2.jpg'
import typeImg3 from '@/assets/img/maptype3.jpg'
import typeImg4 from '@/assets/img/maptype4.jpg'

//谷歌
import google_normalImg from '@/assets/img/google-normal.jpg'
import google_satelliteImg from '@/assets/img/google-satellite.jpg'

//高德
import amap_normalImg from '@/assets/img/amap-normal.jpg'
import amap_satelliteImg from '@/assets/img/amap-satellite.jpg'

//arcgis
import arcgis_normalImg from '@/assets/img/geoq-colors.jpg'
import arcgis_garyImg from '@/assets/img/geoq-gray.jpg'
import arcgis_nightBlueImg from '@/assets/img/geoq-nightblue.jpg'
import arcgis_warmImg from '@/assets/img/geoq-warm.jpg'
import arcgis_terrainImg from '@/assets/img/arcgis-terrain.jpg'

//osm
import osm_normalImg from '@/assets/img/osm-normal.jpg'
import osm_terrainImg from '@/assets/img/osm-terrain.jpg'
import osm_greenImg from '@/assets/img/osm-green.jpg'
import osm_transportImg from '@/assets/img/osm-transport.jpg'

//tencent
import tmap_normalImg from '@/assets/img/tencent-normal.jpg'
import tmap_blackImg from '@/assets/img/tencent-black.jpg'
import tmap_satelliteImg from '@/assets/img/tencent-satellite.jpg'
import tmap_terrainImg from '@/assets/img/tencent-terrain.jpg'

//tian
import tian_normalImg from '@/assets/img/tdt-normal.jpg'
import tian_satelliteImg from '@/assets/img/tdt-satellite.jpg'
import tian_terrainImg from '@/assets/img/tdt-terrain.jpg'
import tian_realmImg from '@/assets/img/tdt-realm.jpg'

//mapbox
import mapbox_comicsImg from '@/assets/img/mapbox-comics.jpg'
import mapbox_darkImg from '@/assets/img/mapbox-dark.jpg'
import mapbox_lightImg from '@/assets/img/mapbox-light.jpg'
import mapbox_outdoorsImg from '@/assets/img/mapbox-outdoors.jpg'
import mapbox_redImg from '@/assets/img/mapbox-red.jpg'
import mapbox_satellite2Img from '@/assets/img/mapbox-satellite2.jpg'
import mapbox_terrainImg from '@/assets/img/mapbox-terrain.jpg'
import mapbox_terrain2Img from '@/assets/img/mapbox-terrain2.jpg'
import mapbox_whiteImg from '@/assets/img/mapbox-white.jpg'
import mapbox_satelliteImg from '@/assets/img/mapbox-satellite.jpg'

String.prototype.format = function(t) {
    let e = this
    if(arguments.length > 0)
        if(true) {
            for(let i in t)
                if(void 0 != t[i]) {
                    let a = new RegExp("({" + i + "})", "g")
                    e = e.replace(a, t[i])
                }
        } else
            for(let o = 0; o < arguments.length; o++)
                if(void 0 != arguments[o]) {
                    a = new RegExp("({[" + o + "]})", "g")
                    e = e.replace(a, arguments[o])
                }
    return e
}

export const getUrl = (t)=> {
    let e = t.x,
        i = t.y,
        a = t.z,
        o = t.s,
        n = t.url
    return i = Math.pow(2, a) - 1 - i,
        n.format({
            s: o,
            z: a,
            x: e,
            y: i,
            x16: parseInt(e / 16),
            y16: parseInt(i / 16)
        })
}

export const defaultList = [{
    code: 'bmap_map',
    name: '地图',
    img: typeImg1,
    layers: ['bmap_map'], //bmap_map_traffic
    className: 'iconmap1',
    defaultName: '地图',
    options: {
        'visible' : false,
        'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
        'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
        'maxZoom': 19,
        'minZoom': 4,
        'sort': 9,
        'renderer': 'gl',
        'projection': 'baidu',
        'attribution': '©百度地图',
    },
},{
    code: 'google_satellite',
    name: '卫星',
    img: typeImg2,
    layers: ['google_satellite', 'google_satellite_road'],
    className: 'iconic_satellite_px',
    defaultName: '卫星',
    options: {
        'visible': false,
        'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
        'subdomains': ['0','1','2','3'],
        'maxZoom': 16,
        'minZoom': 3,
        'sort': 100,
        'renderer': 'gl',
        'projection': 'EPSG:3857',
        'attribution': '©Google Maps',
    },
},{
    code: 'tmap_terrain',
    name: '地形',
    img: tmap_terrainImg,
    layers: ['tmap_terrain'],
    options: {
        'visible' : false,
        'urlTemplate': (t, e, i, a)=> {
            return getUrl({
                x: t,
                y: e,
                z: i,
                s: a,
                url: 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
            })
        },
        'subdomains'  : ['1','2','3'],
        'maxZoom': 15,
        'minZoom': 3,
        'sort': 6,
        'renderer': 'gl',
        'projection': 'EPSG:3857',
        'attribution': '©腾讯地图',
    },
},{
    code: 'google_streeview',   //bmap_streeview
    name: '街景',
    img: typeImg3,
    layers: [''],
    className: 'iconjiejing',
    defaultName: '街景',
},]

export const mapTypeList =  [{
    name: '热门',
    list: [{
        code: 'google_satellite',
        name: '谷歌卫星',
        img: google_satelliteImg,
        layers: ['google_satellite', 'google_satellite_road'],
        options: {
            'visible': false,
            'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
            'subdomains': ['0','1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'tmap_terrain',
        name: '腾讯地形',
        img: tmap_terrainImg,
        layers: ['tmap_terrain'],
        options: {
            'visible' : false,
            'urlTemplate': (t, e, i, a)=> {
                return getUrl({
                    x: t,
                    y: e,
                    z: i,
                    s: a,
                    url: 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
                })
            },
            'subdomains'  : ['1','2','3'],
            'maxZoom': 15,
            'minZoom': 3,
            'sort': 6,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'bmap_map',
        name: '百度电子',
        img: typeImg1,
        layers: ['bmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },{
        code: 'streeview',
        name: '街景',
        img: typeImg3,
        layers: [''],
    },]
},{
    name: '谷歌',
    list: [{
        code: 'google_map',
        name: '地图',
        img: google_normalImg,
        layers: ['google_map'],
        options: {
            'visible' : true,
            'urlTemplate': 'https://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile&scale=2',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_satellite',
        name: '卫星',
        img: google_satelliteImg,
        layers: ['google_satellite', 'google_satellite_road'],
        options: {
            'visible': false,
            'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
            'subdomains': ['0','1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['google_terrain',],
        options: {
            'visible' : false,
            'urlTemplate': 'https://mt{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e4!2st!3i132!2m3!1e0!2sr!3i285205865!3m14!2szh-CN!3sCN!5e18!12m1!1e63!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9mZixzLnQ6MXxwLnY6b2ZmLHMudDoyfHAudjpvZmY!4e0',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 50,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },]
},{
    name: '百度',
    list: [{
        code: 'bmap_map',
        name: '地图',
        img: typeImg1,
        layers: ['bmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },{
        code: 'bmap_satellite',
        name: '卫星',
        img: typeImg2,
        layers: ['bmap_satellite', 'bmap_satellite_road'],
        options: {
            'visible' : false,
            // 'urlTemplate': 'https://ss{s}.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/starpic/?qt=satepc&s=1&u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009',
            'urlTemplate': 'http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 12,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },]
},{
    name: '高德',
    list: [{
        code: 'amap_map',
        name: '地图',
        img: amap_normalImg,
        layers: ['amap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },{
        code: 'amap_satellite',
        name: '卫星',
        img: amap_satelliteImg,
        layers: ['amap_satellite', 'amap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },]
},{
    name: '天地图',
    list: [{
        code: 'tian_map',
        name: '地图',
        img: tian_normalImg,
        layers: ['tian_map', 'tian_map_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 96,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_satellite',
        name: '卫星',
        img: tian_satelliteImg,
        layers: ['tian_satellite', 'tian_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['tian_terrain', 'tian_terrain_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 12,
            'minZoom': 3,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },]
},{
    name: '腾讯',
    list: [{
        code: 'tmap_map',
        name: '地图',
        img: tmap_normalImg,
        layers: ['tmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': (t, e, i, a)=> {
                return getUrl({
                    x: t,
                    y: e,
                    z: i,
                    s: a,
                    url: 'https://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0'
                })
            },
            'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 90,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_satellite',
        name: '卫星',
        img: tmap_satelliteImg,
        layers: ['tmap_satellite', 'tmap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': (t, e, i, a)=> {
                return getUrl({
                    x: t,
                    y: e,
                    z: i,
                    s: a,
                    url: 'https://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
                })
            },
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 3,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_terrain',
        name: '地形',
        img: tmap_terrainImg,
        layers: ['tmap_terrain'],
        options: {
            'visible' : false,
            'urlTemplate': (t, e, i, a)=> {
                return getUrl({
                    x: t,
                    y: e,
                    z: i,
                    s: a,
                    url: 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
                })
            },
            'subdomains'  : ['1','2','3'],
            'maxZoom': 15,
            'minZoom': 3,
            'sort': 6,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },]
},{
    name: 'arcgis',
    list: [{
        code: 'arcgis_map',
        name: '地图',
        img: arcgis_normalImg,
        layers: ['arcgis_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },{
        code: 'arcgis_satellite',
        name: '卫星',
        img: arcgis_garyImg,
        layers: ['arcgis_satellite', 'arcgis_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 95,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },]
},{
    name: 'osm',
    list: [{
        code: 'osm_map',
        name: '地图',
        img: osm_normalImg,
        layers: ['osm_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_cycle',
        name: '自行车道',
        img: osm_terrainImg,
        layers: ['osm_cycle'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_transport',
        name: '交通运输',
        img: osm_transportImg,
        layers: ['osm_transport'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_hot',
        name: '热门',
        img: osm_greenImg,
        layers: ['osm_hot'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            // 'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },]
},{
    name: 'mapbox',
    list: [{
        code: 'mapbox_streets',
        name: '地图',
        img: mapbox_terrainImg,
        layers: ['mapbox_streets'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_emerald',
        name: '地形',
        img: mapbox_satelliteImg,
        layers: ['mapbox_emerald'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_outdoors',
        name: '户外',
        img: mapbox_outdoorsImg,
        layers: ['mapbox_outdoors'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },
        {
            code: 'mapbox_comic',
            name: '漫画',
            img: mapbox_comicsImg,
            layers: ['mapbox_comic'],
            options: {
                'visible' : false,
                'urlTemplate': 'http://api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
                // 'subdomains'  : ['0','1','2','3'],
                'maxZoom': 19,
                'minZoom': 3,
                'sort': 80,
                'renderer': 'gl',
                'projection': 'EPSG:3857',
                'attribution': '©MapBox',
            },
        },]
},]

export const mapTypeList3D =  [{
    name: '热门',
    list: [{
        code: 'google_satellite',
        name: '谷歌卫星',
        img: google_satelliteImg,
        layers: ['google_satellite', 'google_satellite_road'],
        options: {
            'visible': false,
            'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
            'subdomains': ['0','1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'tmap_terrain',
        name: '腾讯地形',
        img: tmap_terrainImg,
        layers: ['tmap_terrain'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 15,
            'minZoom': 3,
            'sort': 6,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'bmap_map',
        name: '百度电子',
        img: typeImg1,
        layers: ['bmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },]
},{
    name: '谷歌',
    list: [{
        code: 'google_map',
        name: '地图',
        img: google_normalImg,
        layers: ['google_map'],
        options: {
            'visible' : true,
            'urlTemplate': 'https://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile&scale=2',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_satellite',
        name: '卫星',
        img: google_satelliteImg,
        layers: ['google_satellite', 'google_satellite_road'],
        options: {
            'visible': false,
            'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
            'subdomains': ['0','1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['google_terrain',],
        options: {
            'visible' : false,
            'urlTemplate': 'https://mt{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e4!2st!3i132!2m3!1e0!2sr!3i285205865!3m14!2szh-CN!3sCN!5e18!12m1!1e63!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9mZixzLnQ6MXxwLnY6b2ZmLHMudDoyfHAudjpvZmY!4e0',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 50,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    }]
},{
    name: '百度',
    list: [{
        code: 'bmap_map',
        name: '地图',
        img: typeImg1,
        layers: ['bmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },{
        code: 'bmap_satellite',
        name: '卫星',
        img: typeImg2,
        layers: ['bmap_satellite', 'bmap_satellite_road'],
        options: {
            'visible' : false,
            // 'urlTemplate': 'https://ss{s}.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/starpic/?qt=satepc&s=1&u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009',
            'urlTemplate': 'http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 12,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    }]
},{
    name: '高德',
    list: [{
        code: 'amap_map',
        name: '地图',
        img: amap_normalImg,
        layers: ['amap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },{
        code: 'amap_satellite',
        name: '卫星',
        img: amap_satelliteImg,
        layers: ['amap_satellite', 'amap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },]
},{
    name: '天地图',
    list: [{
        code: 'tian_map',
        name: '地图',
        img: tian_normalImg,
        layers: ['tian_map', 'tian_map_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 96,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_satellite',
        name: '卫星',
        img: tian_satelliteImg,
        layers: ['tian_satellite', 'tian_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['tian_terrain', 'tian_terrain_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 12,
            'minZoom': 3,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },]
},{
    name: '腾讯',
    list: [{
        code: 'tmap_map',
        name: '地图',
        img: tmap_normalImg,
        layers: ['tmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 90,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_satellite',
        name: '卫星',
        img: tmap_satelliteImg,
        layers: ['tmap_satellite', 'tmap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 3,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_terrain',
        name: '地形',
        img: tmap_terrainImg,
        layers: ['tmap_terrain'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 15,
            'minZoom': 3,
            'sort': 6,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    }]
},{
    name: 'arcgis',
    list: [{
        code: 'arcgis_map',
        name: '地图',
        img: arcgis_normalImg,
        layers: ['arcgis_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },{
        code: 'arcgis_satellite',
        name: '卫星',
        img: arcgis_garyImg,
        layers: ['arcgis_satellite', 'arcgis_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 95,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },]
},{
    name: 'osm',
    list: [{
        code: 'osm_map',
        name: '地图',
        img: osm_normalImg,
        layers: ['osm_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_cycle',
        name: '自行车道',
        img: osm_terrainImg,
        layers: ['osm_cycle'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_transport',
        name: '交通运输',
        img: osm_transportImg,
        layers: ['osm_transport'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_hot',
        name: '热门',
        img: osm_greenImg,
        layers: ['osm_hot'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            // 'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },]
},{
    name: 'mapbox',
    list: [{
        code: 'mapbox_streets',
        name: '地图',
        img: mapbox_terrainImg,
        layers: ['mapbox_streets'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_emerald',
        name: '地形',
        img: mapbox_satelliteImg,
        layers: ['mapbox_emerald'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_outdoors',
        name: '户外',
        img: mapbox_outdoorsImg,
        layers: ['mapbox_outdoors'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 3,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },
        {
            code: 'mapbox_comic',
            name: '漫画',
            img: mapbox_comicsImg,
            layers: ['mapbox_comic'],
            options: {
                'visible' : false,
                'urlTemplate': 'http://api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
                // 'subdomains'  : ['0','1','2','3'],
                'maxZoom': 19,
                'minZoom': 3,
                'sort': 80,
                'renderer': 'gl',
                'projection': 'EPSG:3857',
                'attribution': '©MapBox',
            },
        },]
},]

export const baseLayer = new maptalks.GroupTileLayer('Base TileLayer', [
    //谷歌卫星
    new maptalks.TileLayer('google_satellite',{
        'visible': true,
        'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
        'subdomains': ['0','1','2','3'],
        'renderer': 'gl',
    }),
    //谷歌卫星路网
    new maptalks.TileLayer('google_satellite_road',{
        'visible' : true,
        'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=h@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&scale=2',
        'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),
    //谷歌电子地图 默认显示
    new maptalks.TileLayer('google_map',{
        'visible' : false,
        'urlTemplate': 'https://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile&scale=2',
        'subdomains': ['1','2','3'],
        'renderer': 'gl',
    }),

    //谷歌地形
    new maptalks.TileLayer('google_terrain',{
        'visible' : false,
        'urlTemplate': 'https://mt{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e4!2st!3i132!2m3!1e0!2sr!3i285205865!3m14!2szh-CN!3sCN!5e18!12m1!1e63!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9mZixzLnQ6MXxwLnY6b2ZmLHMudDoyfHAudjpvZmY!4e0',
        'subdomains': ['1','2','3'],
        'renderer': 'gl',
    }),

    //百度卫星
    new maptalks.TileLayer('bmap_satellite',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
        // 'urlTemplate': 'https://ss{s}.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/starpic/?qt=satepc&s=1&u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009',
        // 'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //百度卫星路网
    new maptalks.TileLayer('bmap_satellite_road',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=sl&v=020&s=1',
        'subdomains': ['0','1','2','3','4','5','6','7','8','9'],
        'renderer': 'gl',
    }),
    //百度卫星交通
    new maptalks.TileLayer('bmap_satellite_traffic',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&s=1&level={z}&time=1520865612435&label=web2D&v=017',
        // 'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
        'renderer': 'gl',
    }),

    //百度电子地图
    new maptalks.TileLayer('bmap_map',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
        'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
        'renderer': 'gl',
    }),
    //百度电子交通
    new maptalks.TileLayer('bmap_map_traffic',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&s=1&level={z}&time=1520865612435&label=web2D&v=017',
        'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
        'renderer': 'gl',
    }),

    //高德卫星
    new maptalks.TileLayer('amap_satellite',{
        'visible' : false,
        'urlTemplate': 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        'subdomains'  : ['1','2','3','4'],
        'renderer': 'gl',
    }),

    //高德卫星路网
    new maptalks.TileLayer('amap_satellite_road',{
        'visible' : false,
        'urlTemplate': 'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
        'subdomains'  : ['1','2','3','4'],
        'renderer': 'gl',
    }),

    //高德电子地图
    new maptalks.TileLayer('amap_map',{
        'visible' : false,
        'urlTemplate': 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        'subdomains'  : ['1','2','3','4'],
        'renderer': 'gl',
    }),

    //天地图卫星
    new maptalks.TileLayer('tian_satellite',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4'],
        'renderer': 'gl',
    }),

    //天地图卫星路网
    new maptalks.TileLayer('tian_satellite_road',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4'],
        'renderer': 'gl',
    }),

    //天地图
    new maptalks.TileLayer('tian_map',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4','5','6'],
        'renderer': 'gl',
    }),

    //天地图路网
    new maptalks.TileLayer('tian_map_road',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4','5','6'],
        'renderer': 'gl',
    }),

    //天地图地形
    new maptalks.TileLayer('tian_terrain',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4','5','6'],
        'renderer': 'gl',
    }),

    //天地图地形路网
    new maptalks.TileLayer('tian_terrain_road',{
        'visible' : false,
        'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
        'subdomains'  : ['1','2','3','4','5','6'],
        'renderer': 'gl',
    }),

    //腾讯卫星
    new maptalks.TileLayer('tmap_satellite',{
        'visible' : false,
        'urlTemplate': (t, e, i, a)=> {
            return getUrl({
                x: t,
                y: e,
                z: i,
                s: a,
                url: 'https://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
            })
        },
        'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //腾讯卫星路网
    new maptalks.TileLayer('tmap_satellite_road',{
        'visible' : false,
        'urlTemplate': (t, e, i, a)=> {
            return getUrl({
                x: t,
                y: e,
                z: i,
                s: a,
                url: 'https://rt{s}.map.gtimg.com/tile?z={z}&amp;x={x}&amp;y={y}&amp;type=vector&amp;styleid=3&amp;version=110'
            })
        },
        'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //腾讯电子地图
    new maptalks.TileLayer('tmap_map',{
        'visible' : false,
        'urlTemplate': (t, e, i, a)=> {
            return getUrl({
                x: t,
                y: e,
                z: i,
                s: a,
                url: 'https://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0'
            })
        },
        'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //腾讯地形
    new maptalks.TileLayer('tmap_terrain',{
        'visible' : false,
        'urlTemplate': (t, e, i, a)=> {
            return getUrl({
                x: t,
                y: e,
                z: i,
                s: a,
                url: 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg'
            })
        },
        'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //arcgis卫星
    new maptalks.TileLayer('arcgis_satellite',{
        'visible' : false,
        'urlTemplate': 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        // 'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //arcgis卫星路网
    new maptalks.TileLayer('arcgis_satellite_road',{
        'visible' : false,
        'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=h%40781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}',
        'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //arcgis电子地图
    new maptalks.TileLayer('arcgis_map',{
        'visible' : false,
        'urlTemplate': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
        'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),


    //mapbox卫星
    new maptalks.TileLayer('mapbox_satellite',{
        'visible' : false,
        'urlTemplate': 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
        // 'subdomains'  : ['1','2','3'],
        'renderer': 'gl',
    }),

    //mapbox卫星路网
    new maptalks.TileLayer('mapbox_satellite_road',{
        'visible' : false,
        'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=h%40781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}',
        'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //mapbox_streets
    new maptalks.TileLayer('mapbox_streets',{
        'visible' : false,
        'urlTemplate': 'http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
        // 'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //mapbox_emerald
    new maptalks.TileLayer('mapbox_emerald',{
        'visible' : false,
        'urlTemplate': 'http://api.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
        // 'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //mapbox_outdoors
    new maptalks.TileLayer('mapbox_outdoors',{
        'visible' : false,
        'urlTemplate': 'http://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
        // 'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //mapbox_comic
    new maptalks.TileLayer('mapbox_comic',{
        'visible' : false,
        'urlTemplate': 'http://api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
        // 'subdomains'  : ['0','1','2','3'],
        'renderer': 'gl',
    }),

    //osm电子地图
    new maptalks.TileLayer('osm_map',{
        'visible' : false,
        'urlTemplate': "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38",
        // 'urlTemplate': 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
        // 'subdomains'  : ['a','b','c',],
        'renderer': 'gl',
    }),

    //osm_cycle
    new maptalks.TileLayer('osm_cycle',{
        'visible' : false,
        'urlTemplate': 'https://c.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
        // 'subdomains'  : ['a','b','c',],
        'renderer': 'gl',
    }),

    //osm_transport
    new maptalks.TileLayer('osm_transport',{
        'visible' : false,
        'urlTemplate': 'https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
        // 'subdomains'  : ['a','b','c',],
        'renderer': 'gl',
    }),

    //osm_hot
    new maptalks.TileLayer('osm_hot',{
        'visible' : false,
        'urlTemplate': 'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
        // 'subdomains'  : ['a','b','c',],
        'renderer': 'gl',
    }),
])

export const layers = [

    //谷歌街景覆盖
    new maptalks.TileLayer('google_streetview_covered',{
        'visible' : false,
        'urlTemplate': 'https://ditu.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m5!1e2!2ssvv!4m2!1scb_client!2sapiv3!3m3!3sCN!12m1!1e68!4e0!23i1301875&token=59227',
        // 'subdomains': ['1','2','3'],
        'renderer': 'gl',
        'zIndex ': '1',     //层级高于其他底图
    }),

    //百度街景覆盖
    new maptalks.TileLayer('bmap_streetview_covered',{
        spatialReference:{
            projection: 'baidu',
        },
        'visible' : false,
        'urlTemplate': 'https://mapsv0.bdimg.com/tile/?udt=20200520&qt=tile&styles=pl&x={x}&y={y}&z={z}',
        // 'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
        'renderer': 'gl',
        'zIndex ': '1',     //层级高于其他底图
    }),
]

export const googleSvBaseLayer = new maptalks.GroupTileLayer('google_sv', [new maptalks.GroupTileLayer('satelite', [new maptalks.TileLayer('pic', {
    'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s%40781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}',
    'subdomains': ['0', '1', '2', '3'],
    'renderer':'gl'
}), new maptalks.TileLayer('road', {
    'urlTemplate': 'https://ditu.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i413113259!3m12!2szh-CN!3sCN!5e18!12m4!1e68!2m2!1sset!2sRoadmapSatellite!12m3!1e37!2m1!1ssmartmaps!4e0!23i1301875&token=59227',
    'renderer':'gl'
}), new maptalks.TileLayer('street', {
    'urlTemplate': 'https://ditu.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m5!1e2!2ssvv!4m2!1scb_client!2sapiv3!3m3!3sCN!12m1!1e68!4e0!23i1301875&token=59227',
    'renderer':'gl'
})])])

export const baiduSvBaseLayer = new maptalks.GroupTileLayer('bd_sv', [new maptalks.GroupTileLayer('satelite', [new maptalks.TileLayer('pic', {
    'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
    'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
    'renderer': 'gl',
}), new maptalks.TileLayer('road', {
    'urlTemplate': 'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&s=1&level={z}&time=1520865612435&label=web2D&v=017',
    'subdomains'  : ['0','1','2','3','4','5','6','7','8','9'],
    'renderer': 'gl',
}), new maptalks.TileLayer('street', {
    'urlTemplate': 'https://gss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_/tile/?udt=20150114&qt=tile&styles=pl&x={x}&y={y}&z={z}',
    'renderer':'gl'
})])])

export const layerList =  [{
        code: 'google_map',
        name: '地图',
        img: google_normalImg,
        layers: ['google_map'],
        options: {
            'visible' : true,
            'urlTemplate': 'https://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile&scale=2',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_satellite',
        name: '卫星',
        img: google_satelliteImg,
        layers: ['google_satellite', 'google_satellite_road'],
        options: {
            'visible': false,
            'urlTemplate': 'https://mt{s}.google.cn/maps/vt?lyrs=s@781&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&src=app&scale=2',
            'subdomains': ['0','1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 100,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'google_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['google_terrain',],
        options: {
            'visible' : false,
            'urlTemplate': 'https://mt{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e4!2st!3i132!2m3!1e0!2sr!3i285205865!3m14!2szh-CN!3sCN!5e18!12m1!1e63!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9mZixzLnQ6MXxwLnY6b2ZmLHMudDoyfHAudjpvZmY!4e0',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 2,
            'sort': 50,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©Google Maps',
        },
    },{
        code: 'bmap_map',
        name: '地图',
        img: typeImg1,
        layers: ['bmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&s=1&styles=pl&scaler=2&p=1&s=1',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },{
        code: 'bmap_satellite',
        name: '卫星',
        img: typeImg2,
        layers: ['bmap_satellite', 'bmap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
            // 'urlTemplate': 'https://ss{s}.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/starpic/?qt=satepc&s=1&u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 13,
            'minZoom': 4,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'baidu',
            'attribution': '©百度地图',
        },
    },{
        code: 'amap_map',
        name: '地图',
        img: amap_normalImg,
        layers: ['amap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },{
        code: 'amap_satellite',
        name: '卫星',
        img: amap_satelliteImg,
        layers: ['amap_satellite', 'amap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 98,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©高德地图',
        },
    },{
        code: 'tian_map',
        name: '地图',
        img: tian_normalImg,
        layers: ['tian_map', 'tian_map_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 18,
            'minZoom': 2,
            'sort': 96,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_satellite',
        name: '卫星',
        img: tian_satelliteImg,
        layers: ['tian_satellite', 'tian_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4'],
            'maxZoom': 18,
            'minZoom': 2,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tian_terrain',
        name: '地形',
        img: tian_terrainImg,
        layers: ['tian_terrain', 'tian_terrain_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=1f68ae729b8e2b7abf6fe86af1e8bc6a',
            'subdomains'  : ['1','2','3','4','5','6'],
            'maxZoom': 14,
            'minZoom': 2,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©天地图',
        },
    },{
        code: 'tmap_map',
        name: '地图',
        img: tmap_normalImg,
        layers: ['tmap_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 90,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_satellite',
        name: '卫星',
        img: tmap_satelliteImg,
        layers: ['tmap_satellite', 'tmap_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 3,
            'sort': 97,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'tmap_terrain',
        name: '地形',
        img: tmap_terrainImg,
        layers: ['tmap_terrain'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg',
            'subdomains'  : ['1','2','3'],
            'maxZoom': 16,
            'minZoom': 3,
            'sort': 6,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©腾讯地图',
        },
    },{
        code: 'arcgis_map',
        name: '地图',
        img: arcgis_normalImg,
        layers: ['arcgis_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            'subdomains'  : ['0','1','2','3'],
            'maxZoom': 18,
            'minZoom': 2,
            'sort': 5,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },{
        code: 'arcgis_satellite',
        name: '卫星',
        img: arcgis_garyImg,
        layers: ['arcgis_satellite', 'arcgis_satellite_road'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 18,
            'minZoom': 2,
            'sort': 95,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©ArcGIS',
        },
    },{
        code: 'osm_map',
        name: '地图',
        img: osm_normalImg,
        layers: ['osm_map'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_cycle',
        name: '自行车道',
        img: osm_terrainImg,
        layers: ['osm_cycle'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_transport',
        name: '交通运输',
        img: osm_transportImg,
        layers: ['osm_transport'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'osm_hot',
        name: '热门',
        img: osm_greenImg,
        layers: ['osm_hot'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
            // 'subdomains'  : ['a','b','c',],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©OpenStreetMap',
        },
    },{
        code: 'mapbox_streets',
        name: '地图',
        img: mapbox_terrainImg,
        layers: ['mapbox_streets'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_emerald',
        name: '地形',
        img: mapbox_satelliteImg,
        layers: ['mapbox_emerald'],
        options: {
            'visible' : false,
            'urlTemplate': 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['1','2','3'],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },{
        code: 'mapbox_outdoors',
        name: '户外',
        img: mapbox_outdoorsImg,
        layers: ['mapbox_outdoors'],
        options: {
            'visible' : false,
            'urlTemplate': 'http://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
            // 'subdomains'  : ['0','1','2','3'],
            'maxZoom': 19,
            'minZoom': 2,
            'sort': 80,
            'renderer': 'gl',
            'projection': 'EPSG:3857',
            'attribution': '©MapBox',
        },
    },
        {
            code: 'mapbox_comic',
            name: '漫画',
            img: mapbox_comicsImg,
            layers: ['mapbox_comic'],
            options: {
                'visible' : false,
                'urlTemplate': 'http://api.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieGluemhpc3BhY2UiLCJhIjoiY2s4eHY4Z3R2MTQwaDNvb2t4ZWU5bTF6ZCJ9.QDngjV5ICxP1hOlXG6SzqQ',
                // 'subdomains'  : ['0','1','2','3'],
                'maxZoom': 19,
                'minZoom': 2,
                'sort': 80,
                'renderer': 'gl',
                'projection': 'EPSG:3857',
                'attribution': '©MapBox',
            },
        },]

export const getBDImageryProvider = (Cesium, options)=> {

    let BDImageryProvider = function(options) {

        const height = 33746824
        const width = 33554054

        this._url = options.urlTemplate

        this._tileWidth = 256
        this._tileHeight = 256
        this._maximumLevel = options.maxZoom
        this._minimumLevel = options.minZoom
        this._subdomains = options.subdomains

        let rectangleSouthwestInMeters = new Cesium.Cartesian2(-width, -height)
        let rectangleNortheastInMeters = new Cesium.Cartesian2(width, height)
        this._tilingScheme = new Cesium.WebMercatorTilingScheme({
            rectangleSouthwestInMeters: rectangleSouthwestInMeters,
            rectangleNortheastInMeters: rectangleNortheastInMeters
        })

        this._credit = undefined
        this._rectangle = this._tilingScheme.rectangle
        this._ready = true
    }

    let buildImageUrl = function(imageryProvider, x, y, level) {

        let url = imageryProvider._url
        let subdomains = imageryProvider._subdomains
        let tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level)
        let tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level)

        url = url
            .replace('{x}', x - tileW / 2)
            .replace('{y}', tileH / 2 - y - 1)
            .replace('{z}', level)

        if(subdomains){
            url = url.replace('{s}', subdomains[Math.floor(Math.random()*(subdomains.length))])
        }

        return url
    }

    Object.defineProperties(BDImageryProvider.prototype, {
        url: {
            get: function () {
                return this._url
            }
        },

        token: {
            get: function () {
                return this._token
            }
        },

        subdomain: {
            get: function () {
                return this._subdomains
            }
        },

        proxy: {
            get: function () {
                return this._proxy
            }
        },

        tileWidth: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileWidth must not be called before the imagery provider is ready.')
                }
                return this._tileWidth
            }
        },

        tileHeight: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileHeight must not be called before the imagery provider is ready.')
                }
                return this._tileHeight
            }
        },

        maximumLevel: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('maximumLevel must not be called before the imagery provider is ready.')
                }
                return this._maximumLevel
            }
        },

        minimumLevel: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('minimumLevel must not be called before the imagery provider is ready.')
                }
                return 0
            }
        },

        tilingScheme: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tilingScheme must not be called before the imagery provider is ready.')
                }
                return this._tilingScheme
            }
        },

        rectangle: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('rectangle must not be called before the imagery provider is ready.')
                }
                return this._rectangle
            }
        },

        tileDiscardPolicy: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.')
                }
                return this._tileDiscardPolicy
            }
        },

        errorEvent: {
            get: function () {
                return this._errorEvent
            }
        },

        ready: {
            get: function () {
                return this._ready
            }
        },

        readyPromise: {
            get: function () {
                return this._readyPromise.promise
            }
        },

        credit: {
            get: function () {
                return this._credit
            }
        },

        usingPrecachedTiles: {
            get: function () {
                return this._useTiles
            }
        },

        hasAlphaChannel: {
            get: function () {
                return true
            }
        },

        layers: {
            get: function () {
                return this._layers
            }
        }
    })

    BDImageryProvider.prototype.getTileCredits = function (x, y, level) {
        return undefined
    }

    BDImageryProvider.prototype.requestImage = function (x, y, level) {

        if (!this._ready) {
            throw new DeveloperError('requestImage must not be called before the imagery provider is ready.')
        }

        let url = buildImageUrl(this, x, y, level)

        return Cesium.ImageryProvider.loadImage(this, url)
    }

    return new BDImageryProvider(options)

}

export const getTencentImageryProvider = (Cesium, options)=> {

    let TencentImageryProvider = function(options) {

        this._url = options.urlTemplate

        this._tileWidth = 256
        this._tileHeight = 256
        this._maximumLevel = options.maxZoom
        this._minimumLevel = options.minZoom
        this._subdomains = options.subdomains

        this._tilingScheme = new Cesium.WebMercatorTilingScheme()

        this._credit = undefined
        this._rectangle = this._tilingScheme.rectangle
        this._ready = true
    }

    let buildImageUrl = function(imageryProvider, x, y, level) {
        let url = imageryProvider._url
        let subdomains = imageryProvider._subdomains

        let numX = Math.pow(2, level ) - 1 - y
        let y16 = Math.floor(x / 16 )
        let x16 = Math.floor(numX / 16 )

        url = url
            .replace('{s}', subdomains[Math.floor(Math.random()*(subdomains.length))])
            .replace("{z}", level)
            .replace("{x16}", x16)
            .replace("{y16}", y16)
            .replace("{x}", x)
            .replace("{y}", numX)
        return url
    }

    Object.defineProperties(TencentImageryProvider.prototype, {
        url: {
            get: function () {
                return this._url
            }
        },

        token: {
            get: function () {
                return this._token
            }
        },

        subdomain: {
            get: function () {
                return this._subdomains
            }
        },

        proxy: {
            get: function () {
                return this._proxy
            }
        },

        tileWidth: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileWidth must not be called before the imagery provider is ready.')
                }
                return this._tileWidth
            }
        },

        tileHeight: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileHeight must not be called before the imagery provider is ready.')
                }
                return this._tileHeight
            }
        },

        maximumLevel: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('maximumLevel must not be called before the imagery provider is ready.')
                }
                return this._maximumLevel
            }
        },

        minimumLevel: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('minimumLevel must not be called before the imagery provider is ready.')
                }
                return 0
            }
        },

        tilingScheme: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tilingScheme must not be called before the imagery provider is ready.')
                }
                return this._tilingScheme
            }
        },

        rectangle: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('rectangle must not be called before the imagery provider is ready.')
                }
                return this._rectangle
            }
        },

        tileDiscardPolicy: {
            get: function () {
                if (!this._ready) {
                    throw new DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.')
                }
                return this._tileDiscardPolicy
            }
        },

        errorEvent: {
            get: function () {
                return this._errorEvent
            }
        },

        ready: {
            get: function () {
                return this._ready
            }
        },

        readyPromise: {
            get: function () {
                return this._readyPromise.promise
            }
        },

        credit: {
            get: function () {
                return this._credit
            }
        },

        usingPrecachedTiles: {
            get: function () {
                return this._useTiles
            }
        },

        hasAlphaChannel: {
            get: function () {
                return true
            }
        },

        layers: {
            get: function () {
                return this._layers
            }
        }
    })

    TencentImageryProvider.prototype.getTileCredits = function (x, y, level) {
        return undefined
    }

    TencentImageryProvider.prototype.requestImage = function (x, y, level) {

        if (!this._ready) {
            throw new DeveloperError('requestImage must not be called before the imagery provider is ready.')
        }

        let url = buildImageUrl(this, x, y, level)

        return Cesium.ImageryProvider.loadImage(this, url)
    }

    return new TencentImageryProvider(options)

}

