<template>
  <div class="RecordList" :style="'min-height: '+boxMaxHeight+'px;'">
    <header>私密档案列表</header>
    <div class="box">
      <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
           <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                    <auto-search-client @changed="myChanged"></auto-search-client>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.sex" readonly="" clearable value='123'>
                        <el-option label="全部" :value="'0'"></el-option>
                        <el-option label="女" :value="'2'"></el-option>
                        <el-option label="男" :value="'1'"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" class="h32px" @click="loadData"></el-button>
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>
              <el-table-column prop="name" align="center" label="姓名">
                  <template slot-scope="scope">
                      <el-link :underline="false" @click="$router.push({name:'ClientDel',query:{id:scope.row.id,types:0}})">{{ scope.row.name }}</el-link>
                  </template>
              </el-table-column>
            <el-table-column prop="mobile" align="center" label="联系方式">
              <template slot-scope="scope">
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="sex" align="center" label="性别">
              <template slot-scope="scope">
                {{ scope.row.sex }}
              </template>
            </el-table-column>
            <el-table-column prop="fill_in_percentage" align="center" label="档案完成度">
              <template slot-scope="scope">
                {{ scope.row.fill_in_percentage | _RateFormat}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="operation">
                <a class="buttonStyle_class" @click="$router.push({name: 'PrivateArchives', query:{customerId: scope.row.id  } })">填写档案</a>
                  <em></em>
                  <a class="buttonStyle_class" @click="$router.push({name: 'RecordListDel', query:{customerId: scope.row.id  } })">查看档案</a>
                </p>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
    </div>
  </div>
</template>
<script>
  import { getXFilesList } from "@/shop/assets/api/client/privateArchives"
  //自动查询客户组件
  import autoSearchClient from '@/shop/components/autocomplete/autoSearchClient'
export default {
  name: "RecordList",
  data() {
    return {
      boxMaxHeight:"",
        counselor:{
            sex: '',
            counselor:"",
        },
        condition: {

        },                                // 查询条件
        demoList: [],                      // table数组
        pageSearch: getXFilesList,       // 分页查询api接口
    };
  },
  components: { autoSearchClient },
  methods: {
      loadData(){
          this.$refs.demoTable.loadData()
      },
      myChanged(data){
          this.condition.keyword = data.kw
      }
  },

  // 创建前状态
  beforeCreate() {
    
  },

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.RecordList {
  margin: 24px 20px;
  background-color: #ffffff;
  padding: 0 20px;
  header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #e5e5e5;
  }
  .box {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-bottom:20px; 
  }
}
</style>

<style>
.RecordList .operation{
  display: flex;
  align-items: center;
  justify-content: center;
}
.RecordList .operation em{
  width: 1px;
  height: 10px;
  background: #e5e5e5;
  margin: 0 .1rem;
}
.RecordList .operation a{
  cursor: pointer;
}
.RecordList .list_status span{
    display: block;
    width: .8rem;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    color: #fff;
    border-radius:2px;
}
.RecordList .list_status .zhifu{
    background: #9FDB9D;
}
.RecordList .list_status .weizhifu{
    background: #FEB78C;
}
.RecordList .list_status .quxiao{
    background: #D2D2D2;
}
</style>


    
