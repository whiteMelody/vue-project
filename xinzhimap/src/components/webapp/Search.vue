<template>
  <!--  搜索组件  -->
  <div>
    <div class="dialog-black" v-show="isShowService"></div>
    <div class="wb80 radius1 my-box-shadow center absolute fc-black lh20px" style="height: 400px; z-index: 99999; top:0; left: 0; right: 0; bottom: 0; margin: auto;" v-show="isShowService">
      <div class="bg-white pa20 radius1 my-box-shadow">
        <p class="text-center f18px Fb">服务协议和隐私政策</p>
        <div class="clear4"></div>
        <p>请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供地图查询、查看等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“个人中心”中查看、变更、删除个人信息并管理你的授权。</p>
        <p>你可以阅读<span class="fc-blue" @click="showServiceAgreement = true">《服务协议》</span>和<span class="fc-blue" @click="showPrivacyPolicy = true">《隐私政策》</span>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。</p>
        <div class="clear4"></div>
        <p class="wb50 text-center fl f16px" @click="confirmService(false)">
            暂不使用
        </p>
        <p class="wb50 fr text-center fc-blue f16px" @click="confirmService(true)">
            同意
        </p>
        <div class="clear0"></div>
      </div>
    </div>
    <!-- 搜索功能 -->
    <div class="dialog-transparency" v-show="isShowSearchResult" @click="isShowSearchResult = false"></div>
    <div class="absolute my-search" style="top: 40px; left: 5px; z-index: 99; width: calc(100% - 10px);">
      <div class="wb100 radius1 h42px over-hidden my-box-shadow" v-show="!showSearchType">
        <div class="fl bd-gray bd-l1 bd-t1 bd-b1 bg-white pat5 pab5" style="width: calc(100% - 47px);">
        <login></login>
        <!--使用input重写--> 
        <el-input
          class="f16px"
          style="width: calc(100% - 44px)"
          v-model="searchKw"
          @focus="focusSearch('search')"
          placeholder="地名、河流、道路">
        </el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="fl h42px" @click="searchByKw"></el-button>
      </div>
    </div>
    <!-- 搜索功能 -->
    <!-- 搜索功能弹窗 -->
    <div class="fixed" :style="{top: isSearch +'px'}" style="top: 82px; left: 0; z-index: 99999; height: 420px; width: 100%;" v-show="isShowSearchResult">
      <div class="pa5">
        <div class="clear1 bg-white" style="border-radius: 5px 5px 0 0"></div>
        <div class="bg-white pal10 par10 over-auto" style="height: 400px">
          <!--历史记录 热门城市 搜索结果集合-->
          <div class="wb100" :style="'height:'+ restaurants.length*36 +'px'">
            <template v-for="item in restaurants">
              <p class="h36px lh36px" @click="handleSelect(item)">
                <i class="iconfont iconpersonLocation"></i>
                {{item.name}}
                <!--详细地址-->
                <span class="fc-gray1 f12px">{{$base.isNull(item.city) ? '' : item.city}}</span>
                <span class="fc-gray1 f12px">{{$base.isNull(item.area) ? '' : ' - '+item.area}}</span>
                <!--数量-->
                <span class="fc-gray1 f12px">{{$base.isNull(item.num) ? '' : item.num + '条'}}</span>
              </p>
              <div class="clear0 bd-gray bd-b1"></div>
            </template>
            <template v-if="restaurants.length ==0">
              <p class="text-center fc-gray2 f14px h40px lh40px">没有找到结果</p>
            </template>
          </div>
        </div>
        <div class="clear1 bg-white" style="border-radius: 0 0 5px 5px"></div>
      </div>
    </div>
    <div class="absolute my-search" style="top: 20px; left: 5px; z-index: 99; width: calc(100% - 10px);" v-show="showSearchType">
        <div class="routePlan radius1 my-box-shadow">
            <div class="wb100 h42px over-hidden menu" style="border-bottom: 1px solid #789;">
                <span @click="signOutPlan()">退出</span>
                <div class="menu_icon">
                    <div :class="[item.type ? 'search_icon_set':'','search_icon']" v-for="(item,index) in meun" :key="index" @click="selectMeun(item.name)">
                        <img :src="item.type? item.url1: item.url2" alt="">
                    </div>    
                </div>
                <span @click="mrunSearch">搜索</span>
            </div>
            <div class="wb100 h42px over-hidden" style="background:#B0C4DE">
                <div class="over-hidden menu" style="background:#B0C4DE;height:100%;justify-content: left;">
                    <div class="menu_rotate" @click="setRotate">
                        <div class="menu_rotate_icon">
                           <i class="iconfont iconxuanzhuan f20px" style="color: #1296db;"></i> 
                        </div>
                    </div>
                <!--使用input重写--> 
                    <el-input
                        class="f16px "
                        style="width: calc(100% - 44px)"
                        v-model="startValue"
                        @focus="focusSearch('start')"
                        placeholder="请输入开始地址">
                    </el-input>
                </div>
        
            </div>
            <div class="wb100 h42px over-hidden" style="background:#B0C4DE">
                <div class="over-hidden menu" style="background:#B0C4DE;height:100%;justify-content: left;">
                    <div class="menu_rotate"></div>
                <!--使用input重写--> 
                    <el-input
                        class="f16px "
                        style="width: calc(100% - 44px)"
                        v-model="endValue"
                        @focus="focusSearch('end')"
                        placeholder="请输入终点地址">
                    </el-input>
                </div>
               
            </div>
        </div>
    </div>
    <!-- 公交线路 -->
    <div class="fixed" style="bottom: 0px; left: 0; z-index: 9999; width: 100%;" v-show="isTransit">
        <div class="pa5">
            <div class="clear1 bg-white" style="border-radius: 5px 5px 0 0"></div>
            <div class="bg-white pal10 par10 over-auto" style="height: 400px">
                <div class="wb100" :style="'height:'+ transitList.length*36 +'px'">
                    <div v-for="(item, index) in transitList" :key="index" class="transit" @click="clickTransit(item.steps)">
                        <div style="display: flex">
                            <div style="margin-right: 6px;">
                                线路{{index + 1}}: 
                            </div>
                            <div v-for="(el, il ) in item.steps" :key="il" class="transit_navigation">
                                <P v-if="el[0].vehicle_info.type == 3" class="transit_mian_p">{{el[0].vehicle_info.detail.name}}</P>
                                <i v-if="el[0].vehicle_info.type == 5 && il < item.steps.length - 1 && il > 0" class="el-icon-caret-right"></i>
                            </div>
                        </div>
                        <div>
                            <div v-for="(el, il ) in item.steps" :key="il">
                                <P v-if="el[0].vehicle_info.type == 5 && il < item.steps.length - 1 && el[0].instructions !='同站换乘'">{{el[0].instructions}}到</P>
                                <P v-else-if="el[0].vehicle_info.type == 5 && il < item.steps.length - 1 && el[0].instructions =='同站换乘'">{{el[0].instructions}}</P>
                                <P v-else-if="el[0].vehicle_info.type == 3">{{el[0].instructions}}</P>
                                <P v-else >{{el[0].instructions}} 到达终点</P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
  </div>
</template>

<script>

  import { search_abroad, transit_direction, riding_direction, driving_direction, walking_direction} from '@/assets/api/search/search'
  import { multiLineString, lineLayer, splanStart, splanEnd} from '@/assets/map/tools.js'
  import { out_of_china, bd09togcj02, gcj02tobd09 } from '@/utils/format'
  import { deepCopy } from '@/utils/deepCopy'
  import login from '@/components/webapp/login/index.vue'
  import cityPt from '@/utils/cityPt'
  import {text} from  '@/components/webapp/text'

  export default {
    name: 'Search',
    props: {
      map: {
        type: Object,
        require: true,
      },
      curTypeCode:{
          type: String,
          require: '',
      }
    },
    computed: {

    },
    components: {
      login,
    },
    data() {
      return {
        isShowService: false,
        searchType: '1',
        searchKw: '',
        cityPt: cityPt,
        restaurants: [],
        searchData: [],
        list: [],
        timeout: 0,
        autoSearch:true,
        cb: null,
        isShowSearchView: false,
        isShowSearchResult: false,
        local: {},
        
        handleSelectValue:{}, // 查询结果点击时或者路线规划需要的值
        showSearchType: false, // 路线规划功能
        meun:[{ // 出行方式切换
            url1: require("@/assets/img/automobile.png"),
            url2: require("@/assets/img/automobile1.png"),
            type:true,
            name: 'driving',
        },{
            url1: require("@/assets/img/bus.png"),
            url2: require("@/assets/img/bus1.png"),
            type:false,
            name: 'transit',
        },{
            url1: require("@/assets/img/bicycle.png"),
            url2: require("@/assets/img/bicycle1.png"),
            type:false,
            name: 'riding'
        },{
            url1: require("@/assets/img/people.png"),
            url2: require("@/assets/img/people1.png"),
            type:false,
            name: 'walking'
        }],
        meunName: 'driving', // 默认驾车
        startValue:'',// 起点
        endValue:'',//终点
        startValueLocal:{}, // 起点坐标
        endValueLocal:{}, // 终点坐标
        search: '', // 判断是什么类型的搜索
        isSearch:80, //默认是搜索功能
        query:{
            origin:'40.01116,116.339303', // 起点经纬度
            destination: '39.936404,116.452562', // 终点经纬度
        },
        startUpMeun: false, // 控制搜索后是否可以点击图标进行搜索
        lines:[], // 转换的坐标
        multiLineString:null, // 
        lineLayer: null,
        once: true,
        isTransit: false, // 判断多条公交
        transitList:[], // 公交线路
        isbdtogc:false, //判断坐标是否要转换
        color: '#00FF00', // 规划线路颜色
        splanStart: null, 
        splanEnd: null,
        sopan: {}, //  规划返回的坐标
        layerAndSearch:false, // 是否是搜索还是点击图层
      }
    },
    mounted() {
      this.$uvue.$off('setShowSearchType')
      this.$uvue.$on('setShowSearchType',(value)=>{
          this.signOutPlan()
      })
      let user = this.$store.getters.currentUser
      if(!this.$base.isNull(user)){
        if(user.nickname){
          this.user = user
        }
      }
      this.local = this.$parent.mapLocal
      let isShowDialog = localStorage.getItem('showDialog')
      if(this.$base.isNull(isShowDialog)){
        this.isShowService = true
      }
    },
    methods: {
      confirmService(val){
        this.isShowService = false
        localStorage.setItem('showDialog', val)
      },
        // 搜索按钮
      searchByKw(){
        if(this.searchType == 1 || this.searchType == '1'){
        //国内搜索
        let city = this.searchKw
        let _cityPt
        let ptList = this.cityPt
        for(let i=0; i<ptList.municipalities.length; i++){
            if(city == ptList.municipalities[i].n){
            _cityPt = ptList.municipalities[i].g
            break
            }
        }
        for(let i=0; i<ptList.other.length; i++){
            if(city == ptList.other[i].n){
            _cityPt = ptList.other[i].g
            break
            }
        }
        for(let i=0; i<ptList.provinces.length; i++){
            if(city == ptList.provinces[i].n){
            _cityPt = ptList.provinces[i].g
            break
            }
            if(ptList.provinces[i].cities){
            for(let j=0; j<ptList.provinces[i].cities.length; j++){
                if(city == ptList.provinces[i].cities[j].n){
                _cityPt = ptList.provinces[i].cities[j].g
                break
                }
            }
            }
        }

        if(!this.$base.isNull(_cityPt)){
            //查询的是城市
            let lng = _cityPt.split('|')[0].split(',')[0]
            let lat = _cityPt.split('|')[0].split(',')[1]
            if(this.curTypeCode == 'bmap_map' || this.curTypeCode == 'bmap_satellite' || this.curTypeCode == 'bmap_streeview'){
            }else{
                let pt = bd09togcj02(lng,lat)
                lng = pt[0]
                lat = pt[1]
            }
            let local = {
            city,
                pt: {
                    lat,
                    lng,
                }
            }
            this.local = local
            this.$store.commit('SET_MAP_LOCAL', local)

            this.$emit("toPt", {
                name: city,
                location: {
                    lng: lng,
                    lat: lat,
                }
            })

            this.showSearchType = false

            this.isShowSearchResult = false

        }else{
            //地区搜索
            let url = `http://api.map.baidu.com/place/v2/search?query=${this.searchKw}&region=${this.local.city || '全国'}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`
            this.$jsonp(url, {
            }).then(res => {
            if(res.status == 0){
                let _res = res.results
                if(_res.length >0){
                    if(_res[0].num){
                        //向下查询
                        let url = `http://api.map.baidu.com/place/v2/search?query=${this.searchKw}&region=${_res[0].name}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`
                        this.$jsonp(url, {
                        }).then(res => {
                        if(res.status == 0){
                            let __res = res.results
                            if(__res.length >0){
                                let local =  __res[0]
                                if(this.curTypeCode == 'bmap_map' || this.curTypeCode == 'bmap_satellite' || this.curTypeCode == 'bmap_streeview'){
                                }else{
                                    let pt = bd09togcj02(local.location.lng,local.location.lat)
                                    local.location.lng = pt[0]
                                    local.location.lat = pt[1]
                                }
                                this.$emit("toPt", local)
                                this.searchKw = !this.$base.isNull(_res[0].name) ? _res[0].name : _res[0].city
                            }else{
                                if(window.plus){
                                    plus.nativeUI.toast("没有找到结果",{duration:"long"});
                                }else{
                                    this.$message({
                                        message: '没有找到结果',
                                        type: 'info'
                                    })
                                }
                            }
                        }
                        }).catch(error => {
                            if(window.plus){
                                plus.nativeUI.toast(error,{duration:"long"});
                            }else{
                                this.$message({
                                    message: error,
                                    type: 'error'
                                })
                            }
                        })
                    }else{
                        //返回当前值
                        let local =  _res[0]
                        if(this.curTypeCode == 'bmap_map' || this.curTypeCode == 'bmap_satellite' || this.curTypeCode == 'bmap_streeview'){
                        }else{
                            let pt = bd09togcj02(local.location.lng,local.location.lat)
                            local.location.lng = pt[0]
                            local.location.lat = pt[1]
                        }
                        this.$emit("toPt", local)
                        
                        this.searchKw = !this.$base.isNull(_res[0].name) ? _res[0].name : _res[0].city
                    }
                }

            }
            }).catch(error => {
                if(window.plus){
                    plus.nativeUI.toast(error,{duration:"long"});
                }else{
                    this.$message({
                        message: error,
                        type: 'error'
                    })
                }
            })
        }
        }else{
        //国外搜索
            if(this.$base.isNull(this.user) || this.$base.isNull(this.user.token)){

                if(window.plus){
                    plus.nativeUI.toast('境外搜索需要登录',{duration:"long"});
                }else{
                    this.$message({
                        message: '境外搜索需要登录',
                        type: 'info'
                    })
                }

                this.showLoginDialog = true

                return
            }
            search_abroad({
                query: this.searchKw,
                region: '全球',
                token: this.user.token
            }).then(res=>{
                let __res = res.results
                if(__res.length >0){
                    this.$emit("toPt", __res[0])
                    this.searchKw = !this.$base.isNull(__res[0].name) ? __res[0].name : __res[0].city
                }else{
                    if(window.plus){
                        plus.nativeUI.toast("没有找到结果",{duration:"long"});
                    }else{
                        this.$message({
                            message: '没有找到结果',
                            type: 'info'
                        })
                    }
                }
            }).catch(error => {

                if(window.plus){
                    plus.nativeUI.toast(error,{duration:"long"});
                }else{
                    this.$message({
                        message: error,
                        type: 'error'
                    })
                }
                this.restaurants = []
                this.searchData = []
            })
        }
      },
      // 加载数据 搜索
      loadData(condition){
        let value
        switch (this.search) {
            case 'search':
                value = this.searchKw
                this.isSearch = 80
                break;
            case 'start':
                value = this.startValue
                this.isSearch = 150
                break;
            case 'end':
                value = this.endValue
                this.isSearch = 150
                break;
        
            default:
                break;
        }
          //判断是国内还是国外
        let url
        switch (condition) {
        case 'region':
            url = `http://api.map.baidu.com/place/v2/search?query=${value}&region=${this.local.city || '全国'}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI` 
            break;
        case 'location':
            url = `http://api.map.baidu.com/place/v2/search?city_limit=true&query=${value}&location=${this.local.pt.lat},${this.local.pt.lng}&radius=200000&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`
            break;
            default:
                break;
        }
        //国内
        this.$jsonp(url, {
        }).then(res => {
            if(res.status == 0){
                let _res = res.results
                if(condition == 'region'){
                    _res.forEach((item, index)=>{
                        if(index < 3){
                            item.value=item.name,
                            this.searchData.push(item)
                        }
                    })
                    this.loadData('location')
                }else if(condition == 'location'){
                    _res.forEach((item, index)=>{
                        if(this.searchData.length < 20){
                            this.searchData.push(item)
                        }
                    })
                    this.globalSearch(value)
                }
            }else{
                this.restaurants = []
                this.searchData = []
            }
        }).catch(error => {
            if(window.plus){
                plus.nativeUI.toast(error,{duration:"long"});
            }else{
                this.$message({
                    message: error,
                    type: 'error'
                })
            }
            this.restaurants = []
            this.searchData = []
        })
      },
      // 国外查询
      globalSearch(value){
        let arrData = JSON.parse(JSON.stringify(this.searchData));
        let obj = {}
        //检测token
        if(this.$base.isNull(this.user) || this.$base.isNull(this.user.token)){
            this.restaurants = arrData.reduce((prev, curr)=>{
                obj[curr.name] ? true : obj[curr.name] = true && prev.push(curr);
                return prev
            }, [])
            this.isShowSearchResult = true
            return
        }
        search_abroad({
            query: value,
            region:  '全球',
            token: this.user.token
        }).then(res=>{
            if(res.status == 0){
                let _res = res.results
                _res.forEach(t =>{
                    t.value = t.name
                })
                _res.forEach((item, index)=>{
                    if(this.searchData.length < 20){
                        item.value=item.name,
                        this.searchData.push(item)
                    }
                })
            }
            this.restaurants = arrData.reduce((prev, curr)=>{
                obj[curr.name] ? true : obj[curr.name] = true && prev.push(curr);
                return prev
            }, [])
            this.isShowSearchResult = true
        }).catch(error => {
            this.restaurants = arrData.reduce((prev, curr)=>{
                obj[curr.name] ? true : obj[curr.name] = true && prev.push(curr);
                return prev
            }, [])
            this.isShowSearchResult = true
        })

      },
      // 查询结果点击
      handleSelect(item){
        this.handleSelectValue = item
        let value
        switch (this.search) {
            case 'search':
                value = this.searchKw
                this.isSearch = 80
                break;
            case 'start':
                value = this.startValue
                this.isSearch = 150
                break;
            case 'end':
                value = this.endValue
                this.isSearch = 150
                break;
        
            default:
                break;
        }
        //判断是否有num
        if(item.num != null){
            if(this.search =='search'){
                this.searchKw = `${item.name} ${this.searchKw}` 
            }else if(this.search =='start'){
                this.startValue = `${item.name} ${this.startValue}` 
            }else if(this.search =='end'){
                this.endValue = `${item.name} ${this.endValue}` 
            }
            let local = {
                city: this.$base.isNull(item.city) ? item.name : item.city,
                pt: {
                    lat: item.location ? item.location.lat: '',
                    lng: item.location ? item.location.lng: '',
                }
            }
        }else{
            //选中当前区域
            if(item.location){
                
                //定位到当前区域
                let itemData = JSON.parse(JSON.stringify(item));
                if(this.curTypeCode == 'bmap_map' || this.curTypeCode == 'bmap_satellite' || this.curTypeCode == 'bmap_streeview'){
                }else{
                    let pt = bd09togcj02(itemData.location.lng,itemData.location.lat)
                    item.location.lng = pt[0]
                    item.location.lat = pt[1]
                }
                this.$emit("toPt", item)
                let local = {
                    city: this.$base.isNull(item.city) ? item.name : item.city,
                    pt: {
                        lat: itemData.location.lat,
                        lng: itemData.location.lng,
                    }
                }
                if(this.search =='search'){
                    this.searchKw = !this.$base.isNull(item.name) ? item.name : item.city
                }else if(this.search =='start'){
                    this.startValueLocal= local
                    this.query.origin = `${local.pt.lat},${local.pt.lng}`
                    this.startValue = !this.$base.isNull(item.name) ? item.name : item.city
                }else if(this.search =='end'){
                    this.endValueLocal = local
                    this.query.destination = `${local.pt.lat},${local.pt.lng}`
                    this.endValue = !this.$base.isNull(item.name) ? item.name : item.city
                }
                this.isShowSearchResult = false
                this.local = local
                this.$store.commit('SET_MAP_LOCAL', local)
                this.autoSearch = false
                setTimeout(()=>{
                    this.autoSearch = true
                }, 1000)
            }
        }
      },
      // 获取焦点
      focusSearch(value){
          this.search = value
          this.restaurants = []
          this.searchData = []
          if(this.searchKw.trim() != '' || this.startValue.trim() != '' || this.endValue.trim() != ''){
            this.loadData('region')
          }
      },
      blurSearch(){
        this.restaurants = []
        this.searchData = []
        this.isShowSearchResult = false
      },
      // 判断搜索的是不是城市
      judgeCity(){
          let city = this.searchKw
            let _cityPt
            let ptList = this.cityPt
            for(let i=0; i<ptList.municipalities.length; i++){
                if(city == ptList.municipalities[i].n){
                _cityPt = ptList.municipalities[i].g
                break
                }
            }
            for(let i=0; i<ptList.other.length; i++){
                if(city == ptList.other[i].n){
                _cityPt = ptList.other[i].g
                break
                }
            }
            for(let i=0; i<ptList.provinces.length; i++){
                if(city == ptList.provinces[i].n){
                _cityPt = ptList.provinces[i].g
                break
                }
                if(ptList.provinces[i].cities){
                    for(let j=0; j<ptList.provinces[i].cities.length; j++){
                        if(city == ptList.provinces[i].cities[j].n){
                        _cityPt = ptList.provinces[i].cities[j].g
                        break
                        }
                    }
                }
            }

            if(!this.$base.isNull(_cityPt)){
                //查询的是城市
                let local = {
                    city,
                    pt: {
                        lat:_cityPt.split('|')[0].split(',')[1],
                        lng:_cityPt.split('|')[0].split(',')[0],
                    }
                }
                this.local = local
                this.$store.commit('SET_MAP_LOCAL', local)
                this.loadData('region')
            }else{
                
                this.loadData('location')
            }

      },
      // 路线规划工具切换
      selectMeun(name){       
        this.meun.forEach((item,index) =>{
            item.type = false
            if(name == item.name){
                item.type = true
                this.meunName = name

            }
        })
        this.isTransit = false
        if(this.startUpMeun) this.mrunSearch()
      },
      // 路线规划搜索
      mrunSearch(){
        if(this.startValue.trim() == ''){
            this.query.origin = ''
        }
        if(this.endValue.trim() == ''){
            this.query.destination = ''
        }
        if(this.query.origin !='' && this.query.destination != ''){
            switch (this.meunName) {
                case 'driving':// 驾车
                    this.driving()
                    break;
                case 'transit':// 公交
                    this.transit()
                    break;
                case 'riding':// 骑行
                    this.riding()
                    break;
                case 'walking':// 驾车
                    this.walking()
                    break;
            
                default:
                    break;
            }
            // this.layerAndSearch = true
            this.startUpMeun = true
        }
      },
      // 起始与结束切换
      setRotate(){
          let str = this.startValue
          let temporaryLocal = JSON.parse(JSON.stringify(this.startValueLocal));
          let origin = this.query.origin
          this.startValue = this.endValue
          this.endValue = str
          this.startValueLocal= this.endValueLocal
          this.endValueLocal = temporaryLocal
          this.query.origin = this.query.destination
          this.query.destination = origin
          this.autoSearch = false
          setTimeout(()=>{
            this.autoSearch = true
          }, 1000)
      },
    //   空间坐标的转换和路线规划
      bdtogc(){
        let linesData = deepCopy(this.lines)
        // let start = [this.sopan.start.lng,this.sopan.start.lat], end =[this.sopan.end.lng,this.sopan.end.lat];
        let start = [linesData[0][0][0],linesData[0][0][1]]
        let end = [linesData[linesData.length - 1 ][1][0],linesData[linesData.length - 1][1][1]]
        if(this.isbdtogc){ //是百度地图
            // if(!this.layerAndSearch){ //是否是搜索的
            //   linesData.forEach((item,index) =>{
            //         item.forEach((em, i) =>{
            //             this.lines[index][i] = gcj02tobd09(em[0],em[1])
            //         })
            //     }) 
            //     start = gcj02tobd09(start[0],start[1])
            //     end = gcj02tobd09(end[0],end[1])
            // }      
        }else{
            this.lines.forEach((item,index) =>{
                item.forEach((em, i) =>{
                    linesData[index][i] = bd09togcj02(em[0],em[1])
                })
            })
            start = bd09togcj02(start[0],start[1])
            end = bd09togcj02(end[0],end[1])            
        } 
        if(this.multiLineString != null) this.multiLineString.remove() 
        this.multiLineString = multiLineString(linesData)
        if(this.splanStart != null) this.splanStart.remove() 
        this.splanStart = splanStart(start)
        if(this.splanEnd != null) this.splanEnd.remove() 
        this.splanEnd = splanEnd(end)
        // 更新
        this.multiLineString.updateSymbol({
            lineColor : this.color
        });
        this.multiLineString.addTo(this.lineLayer)
        this.splanStart.addTo(this.lineLayer)
        this.splanEnd.addTo(this.lineLayer)
        this.lineLayer.show()
        this.isTransit = false
       
      },
      // 公交
      transit(){
        transit_direction( this.query).then(res=>{
            if(res.status == 0  && res.result.routes.length > 0){
                this.isTransit = true
                this.transitList = res.result.routes
                this.sopan.start = res.result.origin.location
                this.sopan.end = res.result.destination.location
            }
        }).catch(error => {
            
        })
      },
      // 公交路线点击
      clickTransit(arr){
        this.lines = []
        arr.forEach((item,index)=>{
            this.drivingLine(item[0].path)   
        })
        this.color = '#4169E1'
        this.bdtogc()
      },
      // 骑行
      riding(){ 
        riding_direction( this.query).then(res=>{
            if(res.status == 0){
                this.lines = []
                res.result.routes[0].steps.forEach((item,index)=>{
                    this.drivingLine(item.path)   
                })
                this.color = '#00FF00'
                this.sopan.start = res.result.origin.originPt
                this.sopan.end = res.result.destination.destinationPt
                this.bdtogc()
            }    
        }).catch(error => {
            
        })
      },
      // 驾车
      driving(){
        driving_direction( this.query).then(res=>{
            if(res.status == 0){
                this.lines = []
                res.result.routes[0].steps.forEach((item,index)=>{
                    this.drivingLine(item.path)   
                })
                this.color = '#00FF00'
                this.sopan.start = res.result.routes[0].origin
                this.sopan.end = res.result.routes[0].destination
                this.bdtogc()
            }  
        }).catch(error => {
            
        })

      },
      // 步行
      walking(){
        walking_direction( this.query).then(res=>{
            if(res.status == 0){
                this.lines = []
                res.result.routes[0].steps.forEach((item,index)=>{
                    this.drivingLine(item.path)   
                })
                this.color = '#4169E1'
                this.sopan.start = res.result.origin
                this.sopan.end = res.result.destination
                this.bdtogc()
            }  
        }).catch(error => {
            
        })
      },
      // 返回结果数据转换
      drivingLine(str){
          let arr = str.split(';')
          let lineAll =[]
          arr.forEach((item,index)=>{
              let ltemArr = item.split(',')
              ltemArr[0] = Number(ltemArr[0])
              ltemArr[1] = Number(ltemArr[1])
              lineAll.push(ltemArr)
          })

          lineAll.forEach((item,index) =>{
              if(index < lineAll.length - 1 ){
                  this.lines.push(
                      new Array(item,lineAll[index +1])
                  )
              }
              
          })
          
      },
      // 退出规划
      signOutPlan(){
        this.showSearchType = !this.showSearchType
        // if(this.showSearchType){  
            if(this.curTypeCode == 'bmap_map' || this.curTypeCode == 'bmap_satellite' || this.curTypeCode == 'bmap_streeview')this.isbdtogc = true
            else this.isbdtogc = false
        // }
        this.startUpMeun = false; 
        this.isTransit = false
        if(this.multiLineString != null) this.multiLineString.remove()
        if(this.splanStart != null) this.splanStart.remove() 
        if(this.splanEnd != null) this.splanEnd.remove() 
      },
    },
    watch: {
      searchKw(c, o) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.restaurants = []
          this.searchData = []
          if(c.trim() != '' && this.autoSearch){
            this.loadData('region')
          }
        }, 200)
      },
      // 起点
      startValue(c, o){
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.restaurants = []
          this.searchData = []
          if(c.trim() != '' && this.autoSearch){
            this.search = 'start'
            this.loadData('region')
          }
        }, 200)
      },
      //终点
      endValue(c, o){
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.restaurants = []
          this.searchData = []
          if(c.trim() != '' && this.autoSearch){
            this.search = 'end'
            this.loadData('region')
          }
        }, 200)
      },
      map(c, o) {   
        if(this.once){
          this.lineLayer = lineLayer.addTo(this.map).hide();
        //   console.log(this.lineLayer);
          
          this.once = false
        }
      },
      curTypeCode(c,o){
          if(this.showSearchType){  
              if(c == 'bmap_map' || c == 'bmap_satellite' || c == 'bmap_streeview')this.isbdtogc = true
              else this.isbdtogc = false
            //   this.layerAndSearch = false
              this.bdtogc()
          }
          
      },
    },

  }
</script>

