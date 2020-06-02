<template>
  <div class="TeamManagement wb100">
    <p class="lh50px h50px">
      <span class="fl f16px fc-gray4">员工列表</span>
    </p>

    <div class="clear0"></div>


    <div class="wb100">

      <!--   列表   -->
      <div class="wb100">

        <el-form :inline="true" :model="condition" class="search-form" slot="search">
          <el-form-item label="">
            <el-select v-model="condition.roleId" placeholder="选择职位" readonly="" clearable>
              <el-option key="" label="全部职位" value=""></el-option>
              <el-option v-for="[key,val] in _dictRoleTow " :key="key" :label="val"
                         :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
                    :clearable="false"
                    v-model="condition.entryTime"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>

          <el-button class="h34px bg-orange fc-white" @click="handleDialogFormOpen(false)">添加新账号</el-button>

          <el-button type="primary" @click="$router.push({name: 'SetDiscount' })">设置折扣权限</el-button>

<!--          <el-button type="primary" v-if="targetBtn" :disabled="targetBtn">本月目标已设定</el-button>-->
<!--          <el-button type="primary" v-else @click="$router.push({name: 'SetTarget' })">本月目标设定</el-button>-->

          <el-button type="primary" @click="$router.push({name: 'TeamManagementList' })">目标设定</el-button>

          <el-button type="primary" @click="dialogGroup = true" v-if="allowed">组别管理</el-button>

        </el-form>

        <div class="clear0"></div>

        <base-list ref="demoTable" :condition="condition"
                   :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true" v-on:listLoaded="getLoaded">

          <el-table slot="list" :data="demoList" stripe border>

            <el-table-column
                    label="序号"
                    type="index"
                    :index="indexMethod">
            </el-table-column>
            <el-table-column prop="role_name" align="center" label="岗位">
              <template slot-scope="scope">
                {{ scope.row.role_name }}
              </template>
            </el-table-column>
            <el-table-column prop="username" align="center" label="账号">
              <template slot-scope="scope">
                {{ scope.row.username || scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="电话">
              <template slot-scope="scope">
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column prop="entry_time" align="center" label="入职时间">
              <template slot-scope="scope">
                {{ scope.row.entry_time }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="340">
              <template slot-scope="scope">
                <div class="operation">
                  <p @click="handleDialogFormOpen(true,scope.row)"><a class="buttonStyle_class">修改资料</a></p>
                  <p @click="dialogEditPwd = true;memberId = scope.row.users_id">
                    <em></em>
                    <a class="buttonStyle_class">修改密码</a>
                  </p>
                  <p @click="dialogDisableAccounts = true; memberId = scope.row.users_id; roleId = scope.row.role_id;" v-if="scope.row.role_id != 2">
                    <em></em>
                    <a class="buttonStyle_class">停用</a>
                  </p>
                  <p @click="dialogMobilize = true; memberId = scope.row.users_id; roleId = scope.row.role_id; " v-if="scope.row.role_id != 2">
                    <em></em>
                    <a class="buttonStyle_class">调动</a>
                  </p>
                  <p @click="dialogSetDiscount = true; userData = scope.row" v-if="scope.row.role_id == 3 || scope.row.role_id == 4">
                    <em></em>
                    <a class="buttonStyle_class">折扣设置</a>
                  </p>
                  <p @click="$router.push({name: 'JurisdictionSetting', query:{usersId: scope.row.users_id, name: scope.row.name } })" v-if="scope.row.role_id == 6">
                    <em></em>
                    <a class="buttonStyle_class">权限设置</a>
                  </p>
                </div>
              </template>
            </el-table-column>

          </el-table>
        </base-list>
      </div>

      <div class="clear0"></div>

      <!--   新增&编辑员工弹窗   -->
      <edit-staff ref="staffForm"></edit-staff>

      <!--   修改密码弹窗   -->
      <!-- <el-button type="text" @click="dialogEditPwd = true">修改密码</el-button> -->
      <el-dialog title="修改密码" :visible.sync="dialogEditPwd" width="400px">
        <el-form :model="dialogEditPwdParam">
          <el-form-item label="">
            <el-input type="password" show-password v-model="dialogEditPwdParam.pwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input type="password" show-password v-model="dialogEditPwdParam.pwd2" placeholder="请确认新密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditPwd = false;dialogEditPwdParam = {}">取 消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="membersPostEditPassWordFn">确 定</el-button>
          </template>
        </div>
      </el-dialog>

      <!--   停用账号弹窗   -->
      <!-- <el-button type="text" @click="dialogDisableAccounts = true">停用账号</el-button> -->
      <el-dialog title="停用账号" :visible.sync="dialogDisableAccounts" width="400px">
        <el-form :model="dialogDisableAccountsParam" v-if="roleId != 6">
          <el-form-item label="">
            <template v-if="roleId == 3">
              <el-select v-model="dialogDisableAccountsParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.counselorMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
            <template v-else-if="roleId == 4">
              <el-select v-model="dialogDisableAccountsParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.cosmetologistMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
            <template v-else-if="roleId == 5">
              <el-select v-model="dialogDisableAccountsParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.receptionMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDisableAccounts = false;dialogDisableAccountsParam = {}">取 消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="membersDiscontinueOrTransferFn('tingyong')">确 定</el-button>
          </template>
        </div>
      </el-dialog>

      <!--   员工调动弹窗   -->
      <!-- <el-button type="text" @click="dialogMobilize = true">员工调动</el-button> -->
      <el-dialog title="员工调动" :visible.sync="dialogMobilize" width="400px">
        <el-form :model="dialogMobilizeParam">
          <el-form-item label="">
            <template v-if="roleId == 3">
              <el-select v-model="dialogMobilizeParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.counselorMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
            <template v-else-if="roleId == 4">
              <el-select v-model="dialogMobilizeParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.cosmetologistMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
            <template v-else-if="roleId == 5">
              <el-select v-model="dialogMobilizeParam.user" class="wb100" placeholder="选择交接员工" readonly="" clearable>
                <el-option v-for="item in $store.getters.receptionMapNotMe(memberId)" :key="item.key" :label="item.value"
                          :value="item.key"></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="dialogMobilizeParam.role" class="wb100" placeholder="选择职位" readonly="" clearable>
              <el-option v-for="[key,val] in _dictRoleTow" :key="key" :label="val"
                         :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogMobilize = false;dialogMobilizeParam = {}">取 消</el-button>
          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="membersDiscontinueOrTransferFn('diaodong')">确 定</el-button>
          </template>
        </div>
      </el-dialog>

      <!--   折扣设置弹窗   -->
      <!-- <el-button type="text" @click="dialogSetDiscount = true">折扣设置</el-button> -->
      <el-dialog title="折扣设置" :visible.sync="dialogSetDiscount" width="400px">
        <el-form :model="dialogSetDiscountParam">
          <p class="lh50px" style="white-space: nowrap">账号：{{userData.username}}&nbsp;&nbsp;姓名：{{userData.name}}&nbsp;&nbsp;&nbsp;岗位：{{userData.role_name}}</p>

          <el-form-item label="">
            <el-input type="number" placeholder="请输入折扣" v-model="userData.discount" class="input-with-select">
              <span slot="append">折</span>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSetDiscount = false;dialogSetDiscountParam = {}">取 消</el-button>

          <template v-if="disabled">
            <el-button type="primary" disabled>提交中...</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="membersDiscountByOneFn">确 定</el-button>
          </template>
        </div>
      </el-dialog>

      <!--   组别管理 弹窗   -->

      <el-dialog title="组别管理" :visible.sync="dialogGroup" width="800px">

        <div class="wb100">

          <template v-for="(item, index) in groupData.list">

            <div class="wb100">

              <div class="wb10 fl text-right h40px lh40px fc-gray2">
                组别名称:
              </div>

              <div class="wb90 fr">
                <p class="h40px lh40px pointer">
                  <span class="fl fc-gray4 pal20">
                    <template v-if="item.isEdit">
                      <el-input v-model="item.title"></el-input>
                    </template>
                    <template v-else>
                      {{item.title}}
                    </template>
                  </span>
                  <span class="fr">
                    <template v-if="item.isEdit">
                      <span class="fc-blue fl" @click="submitGroup(item)">
                        确定
                      </span>
                    </template>
                    <template v-else>
                      <span class="fc-blue fl" @click="editGroup(item)">
                        修改
                      </span>
                    </template>
                    <span class="fl mal10 mar10 fc-white3">|</span>
                    <span class="fl" @click="deleteThisGroup(item, index)">删除</span>
                  </span>
                </p>
              </div>

              <div class="clear0"></div>

              <div class="wb10 fl text-right h40px lh40px fc-gray2">
                组员:
              </div>

              <div class="wb90 fr">
                <div v-for="(item2, index2) in item.list" class="wb33 fl text-over-hidden1">
                  <p class="pal20 par20 h40px lh40px">
                    <span class="fl">{{item2.name}}</span>
                    <span class="fl mal10 mar10 fc-white3">|</span>
                    <span class="fl" v-if="item2.role">{{item2.role.name}}</span>
                    <i class="iconfont iconfork fr pointer" @click="deleteUser(item2, index, index2)" v-if="item.isEdit"></i>
                  </p>
                </div>

              </div>

            </div>

            <div class="clear4 bd-b1 bd-gray"></div>

            <div class="clear4"></div>

          </template>

          <template v-if="groupData.list.length == 0">
            <p class="h100px lh100px text-center bd-gray bd-b1 bd-t1 F16 fc-gray4">暂无分组</p>

            <div class="clear4"></div>

            <div class="wb100">
              <div class="wb10 fl text-right h40px lh40px fc-gray2">
                剩余员工:
              </div>

              <div class="wb90 fr">
                <div v-for="(item,index) in groupData.other" class="wb33 fl text-over-hidden1">
                  <p class="pal20 par20 h40px lh40px">
                    <span class="fl">{{item.name}}</span>
                    <span class="fl mal10 mar10 fc-white3">|</span>
                    <span class="fl" v-if="item.role">{{item.role.name}}</span>
                  </p>
                </div>
              </div>
            </div>

          </template>

          <div class="clear0"></div>

          <!--     其他员工     -->

          <div class="wb100" v-if="showOther">
            <div class="wb10 fl text-right h40px lh40px fc-gray2">
              剩余员工:
            </div>
            <div class="wb90 fr">
              <div v-for="(item,index) in groupData.other" class="wb33 fl text-over-hidden1">
                <p class="pal20 par20 h40px lh40px">
                  <span class="fl">{{item.name}}</span>
                  <span class="fl mal10 mar10 fc-white3">|</span>
                  <span class="fl" v-if="item.role">{{item.role.name}}</span>
                  <i class="iconfont iconxinzeng fr pointer" @click="addUser(item, index)"></i>
                </p>
              </div>
            </div>
          </div>

          <template v-if="groupData.other.length == 0">
            <p class="h50px lh50px text-center">暂无员工</p>
          </template>

          <div class="clear4"></div>

        </div>

        <div class="clear0"></div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogGroup = false"> 返回 </el-button>
          <el-button type="primary" @click="addGroup">新增组别</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>

  import { membersList } from "@/shop/assets/api/manage/manage"
  import { membersPostEditPassWord, getStoreMembers , getProgramList} from "@/shop/assets/api/common/common"
  import { membersDiscontinueOrTransfer , membersDiscountByOne , getHas } from "@/shop/assets/api/manage/teamManagement"
  import { getList, saveGroup, deleteGroup } from "@/shop/assets/api/group/group"

  import dateSlot from '@/shop/components/date/dateSlot'

  import EditStaff from './EditStaff'

  export default {
    name: "TeamManagement",
    components: {
      dateSlot, EditStaff
    },
    data() {
      return {
        allowed:'',
        targetBtn:false,
        disabled:false,
        dialogEditPwd: false,
        dialogEditPwdParam: {},
        memberId:'',

        dialogDisableAccounts: false,
        dialogDisableAccountsParam: {},
        roleId:'',

        dialogMobilize: false,
        dialogMobilizeParam: {},

        dialogSetDiscount: false,
        dialogSetDiscountParam: {},
        userData:{},

        dialogGroup: false,
        groupData: {
          list: [],
          other: [],
        },
        showOther: false,

        condition: {
          roleId: '',
        },                                // 查询条件
        demoList: [],                      // table数组
        pageSearch: membersList,       // 分页查询api接口
        AddAccount:true
      }
    },
    mounted() {
      this.getTarget()
      this.loadGroupList()
      getProgramList().then(res => {
         if (res.status == 0) {
           if (res.data.list.group.allowed == 1) this.allowed = true;
         }
       }).catch(error=>{
        console.log("getProgramList no");
      })
    },
    methods: {

      // 列表外赋值
      getLoaded(data) {
        if (data.total >= data.store.users_scale) {
          this.AddAccount = false;
        }
      },

      loadGroupList(){

        // let res = {"status":0,"msg":"ok","data":{"list":[{"id":1,"e_id":1,"s_id":24,"title":"名称","users_id":382,"status":{"value":1,"label":"启用"},"created_at":"2019-10-3116:14:25","updated_at":"2019-10-3116:14:25","list":[]}],"total":1,"other":[{"users_id":382,"name":"xym-jinyuan"},{"users_id":412,"name":"熊家淋"},{"users_id":413,"name":"罗敏"},{"users_id":414,"name":"王倩"},{"users_id":415,"name":"廖婷婷"},{"users_id":416,"name":"前台"},{"users_id":427,"name":"李棋棋"},{"users_id":431,"name":"老师"},{"users_id":497,"name":"测试顾问"},{"users_id":498,"name":"新增的顾问"},{"users_id":500,"name":"测试顾问987"},{"users_id":501,"name":"测试顾问654"},{"users_id":503,"name":"测试顾问321_已调动为4"},{"users_id":510,"name":"测试顾问321"},{"users_id":511,"name":"测试顾问777"},{"users_id":521,"name":"guwen测试"},{"users_id":522,"name":"测试顾问123456456"},{"users_id":528,"name":"新顾问001"},{"users_id":538,"name":"前台"},{"users_id":565,"name":"嗯嗯嗯"},{"users_id":608,"name":"顾问啊01"},{"users_id":609,"name":"顾问啊02"},{"users_id":610,"name":"顾问啊03"},{"users_id":611,"name":"顾问啊04"},{"users_id":612,"name":"顾问啊066"}]}}
        //
        // for(let i=0; i<res.data.list.length; i++){
        //   res.data.list[i].isEdit = false
        //   if(res.data.list[i].list){
        //     for(let j=0; j<res.data.list[i].list.length; j++){
        //       res.list[i].list[j].isEdit = false
        //     }
        //   }
        // }
        //
        // this.groupData = res.data
        //
        // console.log(this.groupData)

        getList({
          status: -1,
          start: 1,
          perpage: 9999,
        }).then(res=>{
          if(res.status == 0){
            this.groupData = res.data
          }
        })

      },

      deleteThisGroup(item, index){

        if(item.id == 0){
          this.groupData.list.splice(index, 1)
          return
        }

        this.$confirm('确定删除该组吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteGroup({
            groupId: item.id
          }).then(res=>{
            if(res.status == 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.groupData.list.splice(index, 1)
              this.loadGroupList()
            }else{
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      addGroup(){

        for(let i=0; i<this.groupData.list.length; i++){
          this.groupData.list[i].isEdit = false
        }

        this.groupData.list.push({
          id: 0,
          title: '',
          list: [],
          isEdit: true,
        })

      },

      submitGroup(item){
        saveGroup({
          title: item.title,
          team: JSON.stringify(item.list),
          groupId: item.id,
        }).then(res=>{
          item.isEdit = false
          this.showOther = false
          if(res.status == 0){
            this.$message({
              message: '编辑组成功',
              type: 'success'
            })
            item.groupId = res.data.groupId
            item.id = res.data.groupId
            this.loadGroupList()
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            })
              item.title = ''
              item.list = []
              item.isEdit = true
          }
        })

      },

      editGroup(item){
        for(let i=0; i<this.groupData.list.length; i++){
          this.groupData.list[i].isEdit = false
        }
        item.isEdit = true;
        this.showOther = true
      },

      deleteUser(item, index, index2){
        this.groupData.list[index].list.splice(index2, 1)
        this.groupData.other.push(item)
      },

      addUser(item, index){
        //查询当前编辑组
        for(let i=0; i<this.groupData.list.length; i++){
          if(this.groupData.list[i].isEdit){
            this.groupData.list[i].list.push(item)
            this.groupData.other.splice(index, 1)
          }
        }
      },

      changeMonth(type){
        if(type == 'prev'){
          this.month --
          if(this.month<=0){
            this.month = 12
            this.year --
          }
        }else{
          this.month ++
          if(this.month>=13){
            this.month = 1
            this.year ++
          }
        }

        this.cycle = this.year + '' + this.$base.addZero(this.month)

        this.dayList = this.getDayOfMonth(this.year, this.month)

        this.loadData()
      },

      //顾问折扣设置
      membersDiscountByOneFn(){
        this.dialogSetDiscountParam.discount = this.userData.discount;
        let data = this.dialogSetDiscountParam;
        let discount = !(this.$base.isNull(data.discount))
        let postData = {}
        if(discount && data.discount > 0 && data.discount < 10 ){
          postData = {
            usersId: this.userData.users_id,
            discount: data.discount
          }
        }else{
          this.$message({
            showClose: true,
            message:'请填写正确的折扣',
            type: 'error',
          });
          return
        }
        this.disabled = true
        membersDiscountByOne(postData).then(res => {
          if(res.status == 0){
            this.$message({
                showClose: true,
                message: "折扣设置成功",
                type: 'success',
                onClose:()=>{
                  this.dialogSetDiscount = false
                  this.dialogSetDiscountParam = {}
                  this.loadData()
                  this.disabled = false
                }
            });
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            });
            this.disabled = false
          }
        }).catch(error=>{
          console.log("membersDiscountByOne no");
          this.disabled = false
        })
      },

      //停用、调动
      membersDiscontinueOrTransferFn(str){
        this.disabled = true
        let postData = {};
        let data = {};
        let popText = "";
        switch (str) {
          case 'tingyong':
            data = this.dialogDisableAccountsParam
            let user = !(this.$base.isNull(data.user))
            if(user || this.roleId == 6){
              postData = {
                newId: data.user,
                oldId: this.memberId
              }
              popText = "已停用"
            }else{
              this.$message({
                  showClose: true,
                  message:'请选择交接员工',
                  type: 'error',
                  onClose:()=>{
                    this.loadData()
                    this.disabled = false
                  }
              });
              return;
            }
            break;
          case 'diaodong':
            data = this.dialogMobilizeParam;
            let diaodongUser = !(this.$base.isNull(data.user))
            let diaodongRole = !(this.$base.isNull(data.role))
            
            if((diaodongUser && diaodongRole )|| (this.roleId == 6 && diaodongRole)){
              postData = {
                newId: data.user,
                oldId: this.memberId,
                getRoleId: data.role
              }
              popText = "调动成功"
            }else{
              this.$message({
                  showClose: true,
                  message:'请确认信息',
                  type: 'error',
                  onClose:()=>{
                    this.loadData()
                    this.disabled = false
                  }
              });
              return;
            }
            break;
          default:
            break;
        }

        membersDiscontinueOrTransfer(postData).then(res => {
          if(res.status == 0){
       
            this.$message({
                showClose: true,
                message: popText,
                type: 'success',
                onClose:()=>{
                  this.dialogDisableAccounts = false
                  this.dialogDisableAccountsParam = {}
                  this.dialogMobilize = false
                  this.dialogMobilizeParam = {}
                  this.loadData()
                  this.disabled = false
                }
            });
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            });
            this.disabled = false
          }
        }).catch(error=>{
          this.$message({
            showClose: true,
            message: error,
            type: 'error',
          });
          this.disabled = false
        })
      },

      //修改密码
      membersPostEditPassWordFn(){
        let data = this.dialogEditPwdParam
        let pwdOne = !(this.$base.isNull(data.pwd))
        let pwdTow = !(this.$base.isNull(data.pwd2))
        if(pwdTow && pwdOne && data.pwd == data.pwd2){
          let postData = {
            password: data.pwd,
            memberId: this.memberId
          }
          this.disabled = true
          membersPostEditPassWord(postData).then(res => {
            if(res.status == 0){
              this.$message({
                  showClose: true,
                  message: '修改密码成功',
                  type: 'success',
                  onClose:()=>{
                    this.dialogEditPwd = false
                    this.dialogEditPwdParam = {}
                    this.loadData()
                    this.disabled = false
                  }
              });
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
              this.disabled = false
            }
          }).catch(error=>{
            this.$message({
              showClose: true,
              message: error,
              type: 'error',
            });
            this.disabled = false
          })
        }else{
          this.$message({
            message: '请确认密码是否一致',
            type: 'error'
          });
          this.disabled = false
        }
        
      },

      loadData() {
        if(this.condition.entryTime != undefined)this.condition.entryTime = this.$base.dateTimeToDate(this.condition.entryTime,'date').split(' ')[0];
        this.$refs.demoTable.loadData()

        getStoreMembers({role_id:0}).then(res => {
          if(res.status == 0){
            this.$store.commit('SET_ROLELIST', res.data)
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            });
          }
        }).catch(error=>{
          this.$message({
            showClose: true,
            message: error,
            type: 'error',
          });
        })
      },

      // 打开开户form表单,如果是编辑,则给form赋值
      handleDialogFormOpen(isEdit, item) {
        console.log(this.AddAccount);
        if (this.AddAccount) {
          if (isEdit) {
            this.$refs.staffForm.form = JSON.parse(JSON.stringify({id:item.users_id}))
          } else {
            this.$refs.staffForm.form = {}
            this.$refs.staffForm.getUserNameFn();
          }
          this.$refs.staffForm.isEdit = isEdit
          this.$refs.staffForm.openPop()
        }else {
          this.$confirm('本店账号数量已达上限，如需添加新账号请联系工作人员', '提示', {
            confirmButtonText: '确定',
            showCancelButton:false,
            type: 'warning',
            callback:() => {}
          });
        }
      },

      indexMethod(index) {
        let count = index + 1
        return count < 10 ? '0' + count : count;
      },

      //获取本月目标是否设定
      getTarget(){
        getHas({}).then(res => {
          if(res.status == 0){
            // res.data.cycle == 0 ? this.targetBtn = false : this.targetBtn = true
          }
        }).catch(error=>{
          console.log("getHas no");
        })
      },

    },
    

    watch: {
      dateTime(c, o){
        this.condition.startTime = c[0]
        this.condition.endTime = c[1]
      }
    }

  }

</script>

<style scoped lang="scss">
.TeamManagement {
  .operation{
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      display: flex;
      align-items: center;
      em{
        width: 1px;
        height: 10px;
        background: #e5e5e5;
        margin: 0 5px;
      }
      a{
        font-size: 16px;
      }
    }
  }
}
</style>
<style>
.TeamManagement .input-with-select .el-input__inner{
  padding-right: 0;

}
</style>
