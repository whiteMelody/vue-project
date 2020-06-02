<template>
  <div class="wb100 Home">

    <div class="pal24 par24 pat20 pab20 scorll-page">
      <div class="bg-white pa20">

        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item>
            <el-input v-model.trim="condition.name" placeholder="请输入企业名称" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model.trim="condition.phone" placeholder="请输入联系电话" clearable></el-input>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" class="h32px bg-blue2" @click="loadData"></el-button>

          <el-button type="primary" @click="openAddEnterprise">新增企业</el-button>

        </el-form>

        <!--    选项卡内容    -->
        <div class="wb100" v-if="showType == 0">

          <div class="wb100 bg-white1">
            <template v-for="(item, index) in arrs">
              <div class="w110px h50px lh50px fl text-center pointer" :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-white1' : 'fc-gray3'" @click="tabIndex = index">
                {{item}}
              </div>
            </template>
            <div class="clear0"></div>
          </div>

          <template v-if="curIndex != -1">
            <template v-if="tabIndex == 0">
              <edit-enterprise :form="curData"></edit-enterprise>
            </template>
            <template v-if="tabIndex == 1">
              <add-store :id="curData.id"></add-store>
            </template>
            <template v-if="tabIndex == 2">
              <project-management :id="curData.id" :sid="curData2.id"></project-management>
            </template>
            <template v-if="tabIndex == 3">
              <channel-management :id="curData.id" :sid="curData2.id"></channel-management>
            </template>
          </template>

          <div class="clear4"></div>

        </div>

<!--    新增企业    -->
        <div class="wb100" v-if="showType == 1">
          <add-enterprise :id="curData.id"></add-enterprise>
        </div>

<!--    新增账号    -->
        <div class="wb100" v-if="showType == 2">
          <add-account ref="account"></add-account>
        </div>

<!--    版块    -->
        <div class="wb100" v-if="showType == 3">
          <opening-section :id="curData.id"></opening-section>
        </div>

        <div class="clear0 bd-gray bd-b1"></div>

        <div class="clear4"></div>

<!--    列表内容    -->
        <table class="wb100 myTable">
          <thead class="bg-white2">
            <tr>
              <td class="w30px">序号</td>
              <td>企业名称</td>
              <td class="w100px">企业简称</td>
              <td class="w100px">联系电话</td>
              <td class="w300px h44px over-hidden">简介</td>
              <td class="w50px">类别</td>
              <td class="w60px">连锁账号</td>
              <td class="w50px">门店数</td>
              <td class="w60px">查看门店</td>
              <td class="w60px">开通版块</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in tableData">
              <tr @click="selectRow(item, index)" :class=" curIndex == index ? 'fc-blue' : '' ">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.abbreviation}}</td>
                <td>{{item.phone}}</td>
                <td class="w300px h44px text-over-hidden1">{{item.description}}</td>
                <td>{{item.edition == 1 ? '连锁版' : '单店版'}}</td>
                <td>{{item.edition == 1 ? item.username : '--'}}</td>
                <td>{{item.storeCount}}</td>
                <td @click="showRow(item, index)">
                  {{ item.showSolt ? '收起' : '展开' }}
                </td>
                <td @click="openSection">查看</td>
              </tr>
              <tr v-if="item.showSolt">
                <td colspan="11">
                  <table class="wb100 myTable2">
                    <thead class="bg-blue fc-white">
                      <tr>
                        <td>序号</td>
                        <td>门店名称</td>
                        <td>联系电话</td>
                        <td>门店地址</td>
                        <td>门店面积</td>
                        <td class="w300px h44px over-hidden">简介</td>
                        <td>账号数量</td>
                        <td>店长账号</td>
                        <td>新增账号</td>
                      </tr>
                    </thead>
                    <tbody class="bg-blue1 fc-blue">
                      <template v-for="(item2,index2) in item.list">
                        <tr :class="item2.status == '启用' || item2.status == '门店已启用' ? '' : 'bg-gray1' ">
                          <td>{{index2 + 1}}</td>
                          <td>{{item2.name}}</td>
                          <td>{{item2.phone}}</td>
                          <td>{{item2.address}}</td>
                          <td>{{item2.measure +'/m²'}}</td>
                          <td class="w300px h44px text-over-hidden1">{{item2.description}}</td>
                          <!-- 账号数量 -->
                          <td>{{item2.users_scale}}</td>
                          <td>{{item2.Shopowner}}</td>
                          <td @click="openAddAccount(item2, item)">
                            <template v-if="item2.status == '启用' || item2.status == '门店已启用'">新增</template>
                            <template v-else>{{item2.status}}</template>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>

                </td>
              </tr>

            </template>
          </tbody>
        </table>

        <div class="clear0"></div>

        <div class="fixed" style="bottom: 5px; right: 5px;">
          <el-button icon="el-icon-caret-top"  type="primary" @click="backTop" circle></el-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

  import { enterpriseList, storeList, enterpriseSearch, getUserName } from "@/assets/api/home/home"

  import AddAccount from './AddAccount'
  import AddEnterprise from './AddEnterprise'
  import OpeningSection from './OpeningSection'
  import EditEnterprise from './EditEnterprise'
  import AddStore from './AddStore'
  import ProjectManagement from './ProjectManagement'
  import ChannelManagement from './ChannelManagement'

export default {
  name: "index",
  components: {
    AddAccount,
    AddEnterprise,
    OpeningSection,
    EditEnterprise,
    AddStore,
    ProjectManagement,
    ChannelManagement,
  },
  data() {
    return {

      showType: 0,  // 0 选项卡内容  1 新增企业  2 新增账号  3 版块

      curIndex: 0,
      curData: {},
      curData2: {},

      arrs: ['修改资料', '添加门店', '项目管理', '渠道管理'],
      tabIndex: 0,

      showIndex: 0,

      condition: {
        start: 1,
        perpage: 999,
      },

      tableData: [],
      accountData: {},
    }
  },
  created() {},
  methods: {

    openSection(){
      this.showType = 3
    },

    openAddAccount(s,e){

      this.showType = 2

      getUserName({
        s_id:s.id,
        e_id:s.e_id
      }).then(res=>{
        if(res.status == 0){

          this.accountData.sid = s.id
          this.accountData.eid = s.e_id

          this.accountData.sname = s.name
          this.accountData.ename = e.name
          this.accountData.username = res.data

          this.$refs.account.getForm(this.accountData)

        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      })

    },

    openAddEnterprise(){
      this.showType = 1
    },

    openTabControl(){
      this.showType = 0
    },

    showRow(item, index){

      console.log(item)

      storeList({e_id: item.id}).then(res=>{
        if(res.status == 0){
          item.list = res.data
          //set
          this.$set(this.tableData,index,item)

          if(item.showSolt == true){
            item.showSolt = false
            this.showIndex = -1
          }else{
            for(let i=0; i<this.tableData.length; i++){
              this.tableData[i].showSolt = false
            }
            item.showSolt = true
            this.showIndex = index
          }

          if(item.list.length > 0){
            this.curData2 = item.list[0]
          }else{
            this.curData2 = {

            }
          }

        }
      })


    },

    selectRow(item, i){
      this.curIndex = i
      this.curData = JSON.parse(JSON.stringify(this.tableData[i]))
      for(let i=0; i<this.tableData.length; i++){
        this.tableData[i].showSolt = false
      }
      item.showSolt = false
      this.showIndex = -1

    },

    loadData(){
      enterpriseList(this.condition).then(res=>{
        if(res.status == 0){
          let _tmp = res.data
          _tmp.forEach((item) => {
            item.showSolt = false
          })
          this.tableData = _tmp

          // console.log(_tmp[this.showIndex], '_tmp[this.showIndex]')

          if(this.showIndex == -1){
            this.selectRow({}, 0)
          }else{
            this.curIndex = this.showIndex
            this.curData = JSON.parse(JSON.stringify(this.tableData[this.showIndex]))
            // this.selectRow(_tmp[this.showIndex], this.showIndex)
            this.showRow(_tmp[this.showIndex], this.showIndex)
          }

        }
      })
    },

    backTop(){
      window.scrollTo(0,0)
    }

  },
  mounted() {
    this.loadData()
  },
};
</script>

<style scoped lang="scss">
  .myTable, .myTable2{border-collapse:collapse; text-align: center; cursor: pointer;}
  .myTable td{ height: 44px; line-height: 44px; border: 1px solid #e1e1e1; padding: 0 5px;}
  .myTable2 td{ height: 44px; line-height: 44px; border-bottom: 1px solid #e1e1e1; border-left:0; border-right:0; border-top: 0; padding: 0 5px;}
</style>
