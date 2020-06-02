<template>
  <!--  搜索组件  -->
  <div class="absolute my-search" style="top: 15px; left: 15px; width: 400px; z-index: 99;">
      <el-radio-group v-model="showSearchType">
        <el-radio-button :label="false">关键字</el-radio-button>
        <el-radio-button :label="true">当前城市: {{local.city || '未定位'}} <i class="el-icon-caret-bottom"></i></el-radio-button>
      </el-radio-group>
      <div class="wb100" v-show="showSearchType == false">
        <div class="w350px fl bd-gray bd-l1 bd-t1 bd-b1 bg-white" style="margin-left: -1px;">
          <el-select v-model="searchType" placeholder="请选择" style="width: 60px; padding-left: 10px;" @change="searchSelect">
            <el-option label="国内" value="1"></el-option>
            <el-option label="国外" value="2"></el-option>
          </el-select>
          <el-autocomplete
                  style="width: 280px;"
                  ref="autocomplete"
                  v-model="searchKw"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="地名、河流、道路"
                  :trigger-on-focus="true"
                  :disabled="searchKwValue"
                  @select="handleSelect">
            <template slot-scope="{ item }">
              <div class="wb100">
                <p class="fc-gray3 f14px">
                  {{item.name}}
                  <!--详细地址-->
                  <span class="fc-gray1 f12px">{{$base.isNull(item.city) ? '' : item.city}}</span>
                  <span class="fc-gray1 f12px">{{$base.isNull(item.area) ? '' : ' - '+item.area}}</span>
                  <!--数量-->
                  <span class="fc-gray1 f12px">{{$base.isNull(item.num) ? '' : item.num + '条'}}</span>
                </p>
              </div>
            </template>
          </el-autocomplete>
        </div>
        <el-button type="primary" icon="el-icon-search" class="fl h34px" @click="searchByKw"></el-button>
      </div>

      <div class="wb100 h284px bg-white bd-gray bd-a1" v-show="showSearchType == true">
        <div class="pa10">
          <div class="clear0"></div>
          <div class="w100" style="display: flex;">
            <span class="fl fc-gray3" style="width: 60px;">热门：</span>
            <div>
              <template v-for="item in hotCity">
                <span class="fl fc-blue mal7 pointer" @click="searchByCity(item)">{{item}}</span>
              </template>
            </div>
            
          </div>
          <div class="clear1"></div>
          <div class="wb100">
            <div class="clear2 bd-gray bd-b1"></div>
            <div class="clear2"></div>
            <div class="wb100 h200px over-auto">
              <template v-for="item in cityList">
                <div class="wb100">
                  <div class="w50px fl lh30px Fnum fc-gray2 f32px">
                    {{item.code}}
                  </div>
                  <div class="w300px fl fc-blue">
                    <template v-for="item2 in item.data">
                      <div class="w50px fl fb pointer" @click="searchByCity(item2.name)">
                        {{item2.name}}:
                      </div>
                      <div class="w240px fr">
                        <template v-for="item3 in item2.list">
                          <span class="fl fc-blue mar7 pointer" @click="searchByCity(item3)">{{item3}}</span>
                        </template>
                      </div>
                      <!-- <div class="clear2"></div> -->
                    </template>
                  </div>
                  <div class="clear2"></div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>

  import { search_abroad } from '@/assets/api/search/search'

  import city from '@/utils/city'
  import cityPt from '@/utils/cityPt'

  export default {
    name: 'search',
    props: {
      map:{
        type: Object,
        require: true,
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

        showSearchType: false, // 控制关键词搜索
        searchType: '1',
        searchKw: '',
        cityList: city,
        cityPt: cityPt,
        cityCodeList: ['A', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z' ],
        hotCity: ['全国', '北京', '上海', '重庆', '天津','广州', '深圳', '成都', '天津', '南京', '杭州', '武汉', '香港', '澳门', '合肥'],
        restaurants: [],
        searchData: [],
        list: [],
        timeout: 0,
        cb: null,
        autoSearch: true,

        local: {},
        searchKwValue:false, // 控制搜索框是否能搜索
        user:{},
      }
    },
    mounted() {
      this.$uvue.$on('setSearchKwValue',(value)=>{
        this.searchKwValue = value
      })
      this.$uvue.$on('synthesize',()=>{
        if(this.searchType != 1){
          this.searchKwValue = true
        }
      })
    },
    methods: {

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
                          this.$emit("toPt", __res[0])
                        }else{
                          this.$message({
                            message: '没有找到结果',
                            type: 'info'
                          })
                        }
                      }
                    }).catch(error => {
                      this.$message({
                        message: error,
                        type: 'error'
                      })
                    })
                  }else{
                    //返回当前值
                    this.$emit("toPt", _res[0])
                  }
                }

              }
            }).catch(error => {
              this.$message({
                message: error,
                type: 'error'
              })
            })
          }
        }else{
          //国外
          //检测token
          search_abroad({
            query: this.searchKw,
            region: '全球',
            token: this.user.token
          }).then(res=>{
            if(res.status == 0){
              let _res = res.results
              _res.forEach(t =>{
                t.value = t.name
              })
              //返回搜索结果
              this.restaurants = _res
              this.searchData = _res
              if(this.cb && this.autoSearch){
                this.querySearchAsync(this.searchKw, this.cb)
              }
            }else{
              this.restaurants = []
              this.searchData = []
            }
          }).catch(error => {
            this.$message({
              message: error,
              type: 'error'
            })
            this.restaurants = []
            this.searchData = []
          })
        }

      },
      // 热门城市选择
      searchByCity(city){
        this.searchKw = ''
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
        }else if(city == '全国'){
          let local ={
            city:"临夏回族自治州",
            pt:{
              lng:103.449867,
              lat:35.847969,
            } 
          }
          this.local = local
          this.$store.commit('SET_MAP_LOCAL', local)
          this.$emit('showZoom',{
            zoom: 5,
            lng:103.449867,
            lat:35.847969,
          })
          this.showSearchType = false

        }else {
          this.$message({
            message: '没有找到结果',
            type: 'info',
          })
        }
      },
      // 国内国外搜索判断
      searchSelect(value){
        this.searchKw = ''
        this.user = this.$store.getters.currentUser
        if(value == 2){
          if(this.$base.isNull(this.user) || this.$base.isNull(this.user.token)){
             this.$uvue.$emit('setShowLoginDialog',true)
             this.searchKwValue = true
          }
        }else{
          this.$uvue.$emit('setShowLoginDialog',false)
          this.searchKwValue = false
        }
        
      },
      //自定义查询
      querySearchAsync(queryString, cb) {
        this.$nextTick(()=>{
          let restaurants = this.restaurants
          let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
          //判断返回值
          if(results.length ==0 && this.searchData.length != 0){
            //1级检索的值=searchKw
            this.searchData.forEach(t =>{
              t.value = this.searchKw
            })
            results = this.searchData
          }
          cb(results)
          this.cb = cb
        })
      },

      createStateFilter(queryString) {
        return (state) => {
          state.name = state.name + ''
          state.address = state.address + ''
          state.province = state.province + ''
          state.city = state.city + ''
          state.area = state.area + ''
          queryString = queryString + ''
          return state.name.toLowerCase().includes(queryString.toLowerCase()) ||
                  state.address.toLowerCase().includes(queryString.toLowerCase()) ||
                  state.province.toLowerCase().includes(queryString.toLowerCase()) ||
                  state.city.toLowerCase().includes(queryString.toLowerCase()) ||
                  state.area.toLowerCase().includes(queryString.toLowerCase())
        }
      },

      //加载数据
      loadData(){

        //判断是国内还是国外

        if(this.searchType == 1 || this.searchType == '1'){
          let url = `http://api.map.baidu.com/place/v2/search?query=${this.searchKw}&region=${this.local.city || '全国'}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`
          //国内
          this.$jsonp(url, {
          }).then(res => {
            if(res.status == 0){
              let _res = res.results
              _res.forEach(t =>{
                t.value = t.name
              })
              //返回搜索结果
              this.restaurants = _res
              this.searchData = _res
              if(this.cb && this.autoSearch){
                this.querySearchAsync(this.searchKw, this.cb)
              }
            }else{
              this.restaurants = []
              this.searchData = []
            }
          }).catch(error => {
            this.$message({
              message: error,
              type: 'error'
            })
            this.restaurants = []
            this.searchData = []
          })
        }else{
          //国外
          //检测token
          search_abroad({
            query: this.searchKw,
            region: '全球',
            token: this.user.token
          }).then(res=>{
            if(res.status == 0){
              let _res = res.results
              _res.forEach(t =>{
                t.value = t.name
              })
              //返回搜索结果
              this.restaurants = _res
              this.searchData = _res
              if(this.cb && this.autoSearch){
                this.querySearchAsync(this.searchKw, this.cb)
              }
            }else{
              this.restaurants = []
              this.searchData = []
            }
          }).catch(error => {
            this.$message({
              message: error,
              type: 'error'
            })
            this.restaurants = []
            this.searchData = []
          })

        }

      },

      handleSelect(item){

        //判断是否有num
        if(!this.$base.isNull(item.num)){

          if(this.searchType == 1 || this.searchType == '1'){
            //向下检索
            // let url = `http://api.map.baidu.com/place/v2/search?query=${this.searchKw}&region=${this.local.city || '全国'}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`
            let url = `http://api.map.baidu.com/place/v2/search?query=${this.searchKw}&region=${item.name}&output=json&page_size=20&ak=C56Qdc560TQKtQaavS0NTPUYupsZHspI`

            this.$jsonp(url, {
            }).then(res => {
              let _res = res.results
              _res.forEach(t =>{
                t.value = t.name
              })
              this.restaurants = _res
              if(res.status == 0){
                this.searchData = _res
                if(this.cb && this.autoSearch){
                  this.querySearchAsync(this.searchKw, this.cb)
                }
              }else{
                this.searchData = []
              }

            }).catch(error => {
              this.$message({
                message: error,
                type: 'error'
              })
              this.searchData = []
            })
          }else{
            //国外

            if(this.$base.isNull(this.user) || this.$base.isNull(this.user.token)){

              this.$message({
                message: '境外搜索需要登录',
                type: 'info'
              })

              this.toUserCenter()

              return
            }

            search_abroad({
              query: this.searchKw,
              region: item.name,
              token: this.user.token
            }).then(res=>{
              let _res = res.results
              _res.forEach(t =>{
                t.value = t.name
              })
              this.restaurants = _res
              if(res.status == 0){
                this.searchData = _res
                if(this.cb && this.autoSearch){
                  this.querySearchAsync(this.searchKw, this.cb)
                }
              }else{
                this.searchData = []
              }
            }).catch(error => {
              this.$message({
                message: error,
                type: 'error'
              })
              this.searchData = []
            })

          }

        }else{
          //选中当前区域
          if(item.location){
            //定位到当前区域
            let local = {
              city: this.$base.isNull(item.city) ? item.name : item.city,
              pt: {
                lat: item.location.lat,
                lng: item.location.lng,
              }
            }
            this.$emit("toPt", item)
            this.local = local
            this.$store.commit('SET_MAP_LOCAL', local)
            this.autoSearch = false
            setTimeout(()=>{
              this.autoSearch = true
            }, 1000)
          }
        }
      },
      //暴露方法
      setSearchType(value){
        this.showSearchType = value
      }

    },
    watch: {
      searchKw(c, o) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.loadData()
        }, 50)
      },
      mapLocal(mewValue, oldValue){
       this.local = mewValue
      }

    },

  }
</script>

