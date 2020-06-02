<template>
  <div class="Index">
    <p class="h40px lh40px bd-gray bd-b1">

      <template v-if="condition.fashion == 1">
        <span class="fl fc-blue bd-blue bd-b2" style="height: 39px;">测试企业</span>
        <span class="fl fc-gray2 mal35" @click="condition.fashion = 2; loadData();">正式企业</span>
      </template>

      <template v-else>
        <span class="fl fc-gray2" style="height: 39px;" @click="condition.fashion = 1; loadData();">测试企业</span>
        <span class="fl fc-blue bd-blue bd-b2 mal35" style="height: 39px;">正式企业</span>
      </template>

    </p>

    <div class="clear4"></div>

    <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
      <el-form-item>
        <el-input v-model.trim="condition.name" placeholder="请输入企业名称" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model.trim="condition.phone" placeholder="请输入联系电话" clearable></el-input>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" class="h32px bg-blue2" @click="loadData"></el-button>
      <el-button type="primary" @click="AddEnter(true,{})">新增企业</el-button>
    </el-form>

    <template>
      <el-table :data="tableList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
        <!-- <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->
        <el-table-column align="center" label="企业名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="企业简称">
          <template slot-scope="scope">{{scope.row.abbreviation}}</template>
        </el-table-column>
        <el-table-column align="center" label="联系电话">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column align="center" label="简介" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column align="center" label="类别">
          <template slot-scope="scope">{{scope.row.edition == 1 ? '连锁版' : '单店版'}}</template>
        </el-table-column>
        <el-table-column align="center" label="连锁账号">
          <template slot-scope="scope">{{scope.row.edition == 1 ? scope.row.username.username : '--'}}</template>
        </el-table-column>
        <el-table-column align="center" label="门店数">
          <template slot-scope="scope">{{scope.row.storeCount}}</template>
        </el-table-column>
        <el-table-column align="center" label="门店信息" width="100">
          <template slot-scope="scope">
            <p class="color" @click="$router.push({name:'StoreInfo',query:{e_name:scope.row.name,e_id:scope.row.id}})">查看</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <div class="display">
              <span class="color" @click="AddEnter(false,scope.row)">修改资料</span>
              <em></em>
              <el-dropdown trigger="click">
                <span class="color">
                  更多操作
                  <i class="iconfont icongengduo"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="$router.push({name:'ProjectList',query:{e_id:scope.row.id,titleText:scope.row.name}})">品项管理</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="$router.push({name:'ChannelList',query:{e_id:scope.row.id,titleText:scope.row.name}})">渠道管理</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span  @click="$router.push({name:'Plate',query:{id:scope.row.id,titleText:scope.row.name}})">板块管理</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span v-if="scope.row.status == 1" @click="changeStatus(scope.row.id, 1)">终止合作</span>
                    <span v-else @click="changeStatus(scope.row.id, 2)">开启合作</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          @size-change="upPage"
          @current-change="nextPage"
          :current-page="condition.start"
          :page-sizes="[5, 10, 15, 20, 100]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="true"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import { enterpriseList, getUserName, changeFashion } from "@/assets/api/home/home";
export default {
  name: "Index",
  data() {
    return {
      condition: {
        start: 1,
        perpage: 15,
        fashion: 1,
      },
      total: 0,
      tableList: [],
      loading: false,
    };
  },
  watch: {},
  components: {},
  methods: {
    changeStatus(enterpriseId, type){

        if(type == 1){
            this.$confirm('确定终止合作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                changeFashion({enterpriseId}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '终止合作成功',
                            type: 'success',
                        });
                        this.loadData()
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                })
            }).catch(()=>{

            })

        }else{
            //是否开启合作
            this.$confirm('确定开启合作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                changeFashion({enterpriseId}).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '开启合作成功',
                            type: 'success',
                        });
                        this.loadData()
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                })
            }).catch(()=>{

            })
        }

    },
    loadData() {
      this.loading = true;
      //判断是否是搜索
        if(!this.$base.isNull(this.condition.name) || !this.$base.isNull(this.condition.phone)  ){
            this.condition.start = 1
        }
      enterpriseList(this.condition)
        .then(res => {
          if (res.status == 0) {
            this.tableList = res.data.list;
            this.total = res.data.total;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log("enterpriseList    no");
        });
    },
    AddEnter(isAdd, form) {
      if (!isAdd) {
        localStorage.setItem('FORM',JSON.stringify(form));
      }
      this.$router.push({
        name: "AddEnterprise",
        query: { isAdd: isAdd, fashion: this.condition.fashion}
      });
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    upPage(val) {
      this.condition.perpage = val;
      this.loadData();
    },
    nextPage(val) {
      this.condition.start = val;
      this.loadData();
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.loadData();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {},

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
.Index {
  background-color: #ffffff;
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  margin: 0.2rem;
  header {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
  }
  .page {
    text-align: right;
    margin-top: 20px;
  }
}
</style>

<style>
/* .display .el-popper a {
    color: #666666;
  } */
</style>