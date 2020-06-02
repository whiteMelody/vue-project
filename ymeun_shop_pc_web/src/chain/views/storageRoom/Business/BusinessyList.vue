<!--form-->
<template>

    <div class="pal24 par24 pat20 pab20">
        <div class="bg-white pal20 par20">
            <p class="fc-gray4 f14px h40px lh40px">供应商列表</p>

            <div class="clear-f2"></div>

            <div class="clear2"></div>

            <div class="wb100">

                <el-form :inline="true" :model="condition">

                    <el-form-item>
                       <el-input v-model="condition.fullname" placeholder="请输入供应商名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                       <el-input v-model="condition.title" placeholder="请输入供应商简称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="condition.status" placeholder="全部合作状态">
                            <el-option v-for="[key, val] in _dictStateCooperation" :key="key" :label="val"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="h32px" @click="$router.push({ path: 'BusinessDetail'})">新增供应商</el-button>
                    </el-form-item>

                </el-form>

                <div class="clear0"></div>

                <base-list :condition="condition" ref="myList"
                           :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">

                    <el-table slot="list" :data="demoList" border>

                        <el-table-column align="left" label="序号" width="50px">
                            <template slot-scope="scope">
                                {{scope.$index+ 1}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="供应商">
                            <template slot-scope="scope">
                                <el-link  :underline="false" @click="$router.push({ path: 'BusinessDetail', query:{ id: scope.row.id }})">{{ scope.row.fullname }} </el-link>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="供应商简称">
                            <template slot-scope="scope">
                                {{scope.row.title}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="所属地区">
                            <template slot-scope="scope">
                                {{scope.row.region}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="合作关系" width="100px">
                            <template slot-scope="scope">
                                <p class="w80px h23px lh23px fc-white text-center" :class="scope.row.status.id == 1 ? 'bg-green6' : 'bg-gray5'">
                                    {{scope.row.status.name}}
                                </p>
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.time}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="联系人">
                            <template slot-scope="scope">
                                {{scope.row.link_man}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="联系方式">
                            <template slot-scope="scope">
                                {{scope.row.telephone}}
                            </template>
                        </el-table-column>

                        <el-table-column align="left" label="操作" width="120px">
                            <template slot-scope="scope">
                                <span class="fc-green2 pointer" @click="$router.push({ path: 'BusinessDetail', query:{ id: scope.row.id }})">查看详情</span>
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

    import { businessList } from '@/chain/assets/api/store/store'

  export default {
      name: 'BusinessyList',
      components: {  },
    data() {
      return {
          condition: {},
          demoList: [],
          pageSearch: businessList,
      }
    },
    mounted() {

        //供应商
        businessList({ start: 1, perpage: 999, }).then(res => {
            if(res.status == 0){
                this.$store.commit('SET_BUSINESSLIST', res.data.filter(item => item.status.id == 1))
            }else{
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error',
                });
                this.$store.commit('SET_BUSINESSLIST', [])
            }
        }).catch(error=>{
            this.$message({
                showClose: true,
                message: error,
                type: 'error',
            });
            this.$store.commit('SET_BUSINESSLIST', [])
        })

    },
    methods: {

          loadData(){
              this.$refs.myList.loadData()
          },
    },

    watch: {

    }

  }
</script>

