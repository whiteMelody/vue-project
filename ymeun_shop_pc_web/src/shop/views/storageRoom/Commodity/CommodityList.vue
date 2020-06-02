<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f16px h40px lh40px">商品列表</p>

            <div class="clear0 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

            <div class="wb100">

                <el-form :inline="true" :model="condition">

                    <el-form-item>
                        <auto-search type="fullname" @changed="fullnameChanged"></auto-search>
                    </el-form-item>

                    <el-form-item>
                        <auto-search type="title" @changed="titleChanged"></auto-search>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.status" placeholder="全部商品状态">
                            <el-option v-for="[key, val] in _dictCommodityStatus" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.warning" placeholder="全部预警状态">
                            <el-option v-for="[key, val] in _dictCommodityWarningStatus" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.business_id" placeholder="全部供应商">
                            <el-option key value label="全部供应商"></el-option>
                            <el-option v-for="item in $store.getters.businessList" :key="item.id" :label="item.fullname"
                                       :value="item.fullname"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <auto-search type="code" @changed="codeChanged"></auto-search>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.catalogueId" placeholder="全部商品类别">
                            <el-option key value label="全部类别"></el-option>
                            <el-option v-for="item in catalogueList" :key="item.id" :label="item.title"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                    </el-form-item>

                    <el-form-item v-if="$store.getters.currentUser.compose.id == 2">
                        <el-button type="primary" class="h32px" @click="$router.push({ path: 'CommodityDetail'})">新增商品</el-button>
                    </el-form-item>

                </el-form>

                <base-list :condition="condition" ref="myList"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                    <el-table slot="list" :data="demoList" border>

                        <el-table-column align="center" label="序号" width="50px">
                            <template slot-scope="scope">
                                {{scope.$index+ 1}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品编码" width="100px">
                            <template slot-scope="scope">
                                {{scope.row.code}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品名称">
                            <template slot-scope="scope">
                                <el-link  :underline="false" @click="$router.push({ path: 'CommodityDetail', query:{ good_id: scope.row.id }})">{{ scope.row.fullname }} </el-link>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品简称">
                            <template slot-scope="scope">
                                {{scope.row.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品存量">
                            <template slot-scope="scope">
                                {{scope.row.stocks_num | _filterNumFormat }}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品单位">
                            <template slot-scope="scope">
                                {{scope.row.unit.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="供应商">
                            <template slot-scope="scope">
                                {{scope.row.business.fullname}}
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="商品状态" width="100px">
                            <template slot-scope="scope">
                                <p class="w80px h23px lh23px fc-white text-center" :class="scope.row.status.value == 1 ? 'bg-green6' : 'bg-gray5'">
                                    {{scope.row.status.label}}
                                </p>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="预警状态" width="100px">
                            <template slot-scope="scope">

                                <template v-if="scope.row.warning.value == 0">
                                    <p class="w80px h23px lh23px fc-white text-center bg-green6">
                                        {{scope.row.warning.label}}
                                    </p>
                                </template>
                                <template v-else-if="scope.row.warning.value == 1">
                                    <p class="w80px h23px lh23px fc-white text-center bg-orange2">
                                        {{scope.row.warning.label}}
                                    </p>
                                </template>
                                <template v-else-if="scope.row.warning.value == 2">
                                    <p class="w80px h23px lh23px fc-white text-center bg-red4">
                                        {{scope.row.warning.label}}
                                    </p>
                                </template>

                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="操作" width="120px">
                            <template slot-scope="scope">
                                <span class="fc-blue6 pointer" @click="$router.push({ path: 'InStorageOne', query:{ row: JSON.stringify(scope.row) } })">入库</span>
                                <span class="fc-gray1 mal10 mar10">|</span>
                                <span class="fc-blue6 pointer" @click="$router.push({ path: 'OutStorageOne', query:{ row: JSON.stringify(scope.row) } })">出库</span>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="查看记录" width="160px">
                            <template slot-scope="scope">
                                <span class="fc-blue6 pointer" @click="$router.push({ path: 'InStorageRecordList', query:{ good_id: scope.row.id } })">入库记录</span>
                                <span class="fc-gray1 mal10 mar10">|</span>
                                <span class="fc-blue6 pointer" @click="$router.push({ path: 'OutStorageRecordList', query:{ good_id: scope.row.id } })">出库记录</span>
                            </template>
                        </el-table-column>

                    </el-table>
                </base-list>

                <div class="clear1"></div>

            </div>

        </div>
    </div>

</template>

<script>

    import autoSearch from '@/shop/components/autocomplete/autoSearchCommodity'

    import { businessList, getList, getCatalogue } from '@/shop/assets/api/store/store'
    import { testMenu } from '@/shop/assets/api/common/common'

  export default {
      name: 'CommodityList',
      components: { autoSearch },
    data() {
      return {
          condition: {},
          demoList: [],
          pageSearch: getList,
          catalogueList: [],
      }
    },
    mounted() {
        getCatalogue().then(res=>{
            if(res.status == 0){
                // console.log(res.data.list)
                this.catalogueList = res.data.list
            }
        })

        //获取权限
        // testMenu().then(res=>{
        //     if(res.status == 0){
        //         let _tmp = res.data
        //
        //         //剔除1级和非1级
        //
        //         let _list = _tmp.filter(item => item.p_id == 0 || item.p_id == "0")
        //         let _list2 = _tmp.filter(item => item.p_id != 0 && item.p_id != "0")
        //
        //         //一级
        //         for(let i=0; i<_list.length; i++){
        //             _list[i].children = []
        //         }
        //         //二级
        //         for(let i=0; i<_list2.length; i++){
        //             for(let j=0; j<_list.length; j++){
        //                 if(_list2[i].p_id == _list[j].id){
        //                     _list2[i].children = []
        //                     _list[j].children.push(_list2[i])
        //                 }
        //             }
        //         }
        //
        //         //剔除没有children的项
        //         let _list3 = _list2.filter(item => !item.children)
        //
        //         //三级
        //         for(let i=0; i<_list.length; i++){
        //             for(let j=0; j<_list[i].children.length; j++){
        //                 for(let k=0; k<_list3.length; k++){
        //
        //                     // console.log(_list[i].children[j].id, _list3[k].p_id)
        //
        //                     if(_list[i].children[j].id == _list3[k].p_id){
        //                         _list[i].children[j].children = []
        //                         _list[i].children[j].children.push(_list3[k])
        //                     }
        //                 }
        //             }
        //         }
        //
        //         // console.log(list)
        //
        //         // console.log(_list, _list2, _list3)
        //
        //     }
        // })

    },
    methods: {

        fullnameChanged(data){
            this.condition.fullname = data.kw;
        },

        titleChanged(data){
            this.condition.title = data.kw;
        },

        codeChanged(data){
            this.condition.code = data.kw;
        },

        loadData(){
            this.$refs.myList.loadData()
        }
    },

    watch: {

    }

  }
</script>

