<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">配方管理</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">

                <el-form :inline="true" :model="condition">

                    <el-form-item>
                        <el-select v-model="condition.itemsParentId" placeholder="请选择项目" readonly="" clearable @change="condition.itemsId = ''">
                            <el-option v-for="item in $store.getters.projectList1Map" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="condition.itemsParentId">
                        <el-select v-model="condition.itemsId " placeholder="请选择下级项目" readonly="" clearable>
                            <el-option v-for="item in $store.getters.projectList2Map(condition.itemsParentId)" :key="item.key" :label="item.value"
                                       :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <auto-search-commodity type="fullname" @changed="myChanged"></auto-search-commodity>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                    </el-form-item>

                </el-form>

                <div class="clear0"></div>

                <!--    列表内容    -->
                <table class="wb100 myTable">
                    <thead class="bg-white2">
                    <tr>
                        <td>大类项目名称</td>
                        <td>二级项目名称</td>
                        <td>所需商品</td>
                        <td>所需数量</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in tableData">
                            <tr>
                                <td @click="showRow(item, index)" class="text-left pal18">
                                    <template v-if="item.showSolt">
                                        {{item.items.name}}
                                        <i class="iconfont iconshangla-copy"></i>
                                    </template>
                                    <template v-else>
                                        {{item.items.name}}
                                        <i class="iconfont iconxiala"></i>
                                    </template>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <template v-for="(item2,index2) in item.child" v-if="item.showSolt">
                                <tr class="bg-white1">
                                    <td></td>
                                    <td @click="showRow(item2, index2)">
                                        <template v-if="item2.showSolt">
                                            {{item2.items.name}}
                                            <i class="iconfont iconshangla-copy"></i>
                                        </template>
                                        <template v-else>
                                            {{item2.items.name}}
                                            <i class="iconfont iconxiala"></i>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item3 in item2.good">
                                            <p>{{item3.good.fullname}}</p>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="item3 in item2.good">
                                            <p>{{item3.quantity | _filterNumFormat }}</p>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-if="item2.goodCount>0">
                                            <span class="fc-green2 pointer" @click="$router.push({ path: 'RecipeDetail', query:{ row: JSON.stringify(item2), pname: item.items.name } })">修改</span>
                                        </template>
                                        <template v-else>
                                            <span class="fc-green2 pointer" @click="$router.push({ path: 'RecipeDetail', query:{ row: JSON.stringify(item2), pname: item.items.name } })">新增</span>
                                        </template>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>

                <div class="clear2"></div>

            </div>

        </div>
    </div>

</template>


<script>

    import autoSearchCommodity from '@/chain/components/autocomplete/autoSearchCommodity'

    import { getList, getFormulaAdd } from '@/chain/assets/api/recipe/recipe'

  export default {
      name: 'RecipeManagement',
      components: { autoSearchCommodity },
    data() {
      return {
          condition: {
              itemsParentId: '',
              itemsId: '',
              goodKw: '',
          },
          tableData: [],
          list: [],
      }
    },
    mounted() {
        this.loadData()

    },
    methods: {

        myChanged(data){
            this.condition.goodKw = data.kw
        },

        showRow(item, index){
            item.showSolt = !item.showSolt
        },

          loadData(){

              getList({
                  start: 1,
                  perpage: 9999,
                  itemsParentId: this.condition.itemsParentId,
                  itemsId: this.condition.itemsId,
                  goodKw: this.condition.goodKw,
              }).then(res=>{
                  if(res.status == 0){
                      let _tmp = res.data.list

                      for(let i=0; i<_tmp.length; i++){
                          _tmp[i].showSolt = false
                          if(_tmp[i].child){
                              for(let j=0; j<_tmp[i].child.length; j++){
                                  _tmp[i].child[j].showSolt = false
                              }
                          }
                      }
                      this.tableData = _tmp
                  }
              })

          }
    },

    watch: {

    }

  }
</script>

<style scoped lang="scss">
    .myTable, .myTable2{border-collapse:collapse; text-align: center; cursor: pointer;}
    .myTable td{ height: 32px; line-height: 32px; border: 1px solid #e1e1e1; padding: 0 5px;}
    .myTable2 td{ height: 32px; line-height: 32px; border-bottom: 1px solid #e1e1e1; border-left:0; border-right:0; border-top: 0; padding: 0 5px;}
</style>