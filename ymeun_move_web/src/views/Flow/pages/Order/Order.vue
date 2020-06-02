<template>
  <div class="wb100 bg-white1" :style="'minHeight:' + minHeight + 'px' ">

        <!--   开单   -->
      <template v-if="!isSelectUser">
          <!--   header   -->
          <Header :title="title" :back="true" v-if="!showProject"></Header>

          <template v-if="showProject">
              <project-edit @ListenPush="myPush" :data="editProjectListData"></project-edit>
          </template>
          <template v-else>
              <div class="wb100 bg-white">
                  <div class="pa20">
                      <p class="f38rem fc-gray4 lh60rem">{{customerInfo.name}}</p>
                      <p class="f26rem fc-gray3 lh60rem">顾问：{{customerInfo.adviser.name}}</p>

                      <div class="clear8"></div>

                      <div class="wb50 fl f24rem lh36rem">
                          <p>
                              <span class="w36rem h36rem lh36rem bg-blue1 fc-white text-center radius8 f24rem fl mar10">ID</span>
                              编号
                          </p>
                          <div class="clear2"></div>
                          <p>{{customerInfo.id}}</p>
                      </div>
                      <div class="wb50 fl f24rem lh36rem">
                          <p> <i class="iconfont icondianhua fc-orange1 f36rem mar10 fl"></i> 电话 </p>
                          <div class="clear2"></div>
                          <p>{{customerInfo.mobile}}</p>
                      </div>

                      <div class="clear4"></div>

                  </div>
              </div>

              <div class="clear4"></div>

              <div class="wb100">
                  <div class="pa20 relative">
                      <div class="bd-b1 bd-gray wb100 h1rem absolute"></div>
                      <p class="f28rem fc-gray3 absolute w200rem h30rem text-center bg-white1" style="left: 0; right: 0; bottom: 0; top: 0; margin: auto;">开单信息</p>
                  </div>
              </div>

              <div class="clear4"></div>

              <div class="wb100">
                  <template v-for="(item,index) in projectList">
                      <div class="pa20 relative bg-white fc-gray3 f28rem lh50rem">
                          <p class="fc-gray4">
                              {{item.data[0].name + '-' + item.data[1].name }}
                          </p>
                          <p>
                              折扣：{{item.discount }}（折）
                          </p>
                          <div class="wb100">
                              <p class="fl">实付：<span class="fc-orange">￥{{item.money}}</span></p>
                              <div class="fr">
                                  <el-input-number size="mini" v-model="item.num" @change="numberChange(item, index)"></el-input-number>
                              </div>
                          </div>
                          <div class="clear4 bd-gray bd-b1"></div>
                          <div class="clear4"></div>
                          <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem mal30 text-center minW100" @click="openProject(item)">
                              修改
                          </div>
                          <div class="fr pat10 pab10 pal20 par20 bd-gray bd-a1 radius6 fc-gray3 f26rem lh30rem text-center minW100" @click="delProject(index)">
                              删除
                          </div>
                          <div class="clear0"></div>
                      </div>
                      <div class="clear4" ></div>
                  </template>
              </div>

              <div class="clear4"></div>

              <div class="wb100 h100rem lh100rem bg-white text-center f28rem fc-gray4" @click="openProject">
                  <i class="iconfont icontianjia fc-green f36rem"></i>
                  添加项目
              </div>

              <div class="clear0" style="height: 1.7rem"></div>

              <div class="wb100 fixed bg-white" style="bottom: -.05rem; z-index: 9">

                  <div class="wb100 h70rem bg-green1">
                      <p class="pal20 par20 lh70rem f26rem fc-gray3">
                          <span>数量：{{getSumProCount(projectList)}}</span>
                          <span class="mal20 mar20">疗程总数：{{getSumCount(projectList)}}</span>
                          <span>金额：￥{{getSumPrice(projectList)}}</span>
                      </p>
                  </div>
                  <div class="clear0"></div>
                  <div class="wb100 h90rem lh90rem">
                    <span class="fl mal20 f26rem fc-gray3">
                        实际金额
                        <span class="fc-red f40rem">￥{{getSumPrice(projectList)}}</span>
                    </span>
                      <div class="w240rem fc-white bg-green h90rem lh90rem text-center f28rem fr"
                           v-loading.fullscreen.lock="subLoding"
                           element-loading-text="提交中..."
                           @click="selectUsers">
                          确定
                      </div>

                  </div>

              </div>
          </template>
      </template>

      <!--   选择开单人员   -->
      <template v-else>

          <template v-if="showUsers">
              <users-edit @ListenPush="myPush2" :data="editUsersData" :list="usersList" :totle="getSumPrice(projectList)"></users-edit>
          </template>

          <template v-else>

              <div class="wb100">
                  <div class="wb100 h80rem bg-white bd-gray bd-b1 relative" style="z-index: 99999;">
                      <div class="w50rem fl h80rem lh80rem text-center" @click="isSelectUser = false">
                          <i class="f30rem iconfont fl mal20 iconfanhui"></i>
                      </div>
                      <p class="wb70 text-over-hidden1 absolute text-center h80rem lh80rem f40rem Fb fc-black1" style="top: 0; left: 0; right: 0; margin: 0 auto;">选择开单员工</p>
                  </div>
              </div>

              <div class="clear1"></div>

              <div class="wb100">

                  <template v-for="(item,index) in usersList">

                    <div class="clear4" ></div>

                      <div class="pa20 relative bg-white fc-gray3 f28rem lh50rem">
                          <p class="fc-gray4">
                              {{item.name}}
                          </p>
                          <p>
                              开单百分比：{{item.rate}}%
                          </p>
                          <div class="wb100">
                              金额占比：{{item.price}}元
                          </div>
                          <div class="clear4 bd-gray bd-b1"></div>
                          <div class="clear4"></div>
                          <div class="fr pat10 pab10 pal20 par20 bd-green bd-a1 radius6 fc-green f26rem lh30rem mal30 text-center minW100" @click="openUsers(item)">
                              修改
                          </div>
                          <div class="fr pat10 pab10 pal20 par20 bd-gray bd-a1 radius6 fc-gray3 f26rem lh30rem text-center minW100" @click="delUsers(index)" v-if="index > 0">
                              删除
                          </div>
                          <div class="clear0"></div>
                      </div>
                  </template>

              </div>

              <div class="clear4"></div>

              <div class="wb100 h100rem lh100rem bg-white text-center f28rem fc-gray4" @click="openUsers" v-if="usersList.length <= 5">
                  <i class="iconfont icontianjia fc-green f36rem"></i>
                  新增开单人员
              </div>

              <div class="clear h90rem"></div>

              <div
                      class="wb100 fixed"
                      style="bottom: 0;"
                      @click="submit"
                      v-loading.fullscreen.lock="subLoding"
                      element-loading-text="提交中..."
                      element-loading-background="rgba(0, 0, 0, 0.5)"
              >
                  <div class="wb100 fc-white bg-green h90rem lh90rem text-center f28rem ">
                      提交
                  </div>
              </div>

          </template>

      </template>


  </div>
</template>
<script>

    import Header from '../../../../components/Header'
    import ProjectEdit from './ProjectEdit'
    import UsersEdit from './UsersEdit'

    import { postDetails } from "@/assets/api/CustomerDetails/Details"
    import { addOrders, getModifyOrders, postModifyOrders } from "@/assets/api/Order/Order"

    import { getStoreMembers } from "@/assets/api/Flow/MakeAnAppointment"

    import { getUserInfo } from "@/assets/api/Data/Login";

    import { getStoreItem } from "@/assets/api/Flow/MakeAnAppointment";

    import { Toast } from 'vant';

    export default {
      data(){
        return {
            minHeight: 0,
            subLoding: false,
            allUserList: [],

            appointment_id: '',
            technician_id: '',
            adviser_id: '',
            customer_id: '',
            orders_id: '',

            title:'',
            counselorActive: null,
            showProject: false,

            customerInfo: {
                name: '',
                adviser: {
                    name: ''
                }
            },

            projectList: [],
            editProjectListData: {},

            editUsersData: {},
            showUsers: false,
            isSelectUser: false,
            usersList: [],

        }
      },
      components:{
           Header, ProjectEdit, UsersEdit
      },
      methods:{

          openProject(data){
              if(data.data){
                  //修改
                  this.editProjectListData = data
              }else{
                  //新增
                  this.editProjectListData = {}
              }
            this.showProject = true
          },
          closeProject(){
              this.showProject = false
          },
          delProject(i){
              this.projectList.splice(i,1)
              this.updateUserList()
          },
          myPush(obj){
              //判断id是否存在
              let flag = true
              for(let i=0; i<this.projectList.length; i++){
                  if(this.projectList[i].id == obj.id){
                      this.projectList[i] = obj
                      flag = false
                      break
                  }
              }
              if(flag)
                  this.projectList.push(obj)

              this.updateUserList()
          },

          openUsers(data){
              if(data.id){
                  //修改
                  this.editUsersData = data
              }else{
                  //新增
                  this.editUsersData = {}
              }
            this.showUsers = true
          },
          closeUsers(){
              this.showUsers = false
          },
          delUsers(i){
              this.usersList.splice(i,1);
          },
          myPush2(obj){
              //判断id是否存在
              let flag = true
              for(let i=0; i<this.usersList.length; i++){
                  if(this.usersList[i].id == obj.id){
                      this.usersList[i] = obj
                      flag = false
                      break
                  }
              }
              if(flag)
                  this.usersList.push(obj)
          },

          // 更新开单人员
          updateUserList(){
              for(let i=0; i<this.usersList.length; i++){
                  this.usersList[i].price = this.$base.twoDecimal(this.usersList[i].rate * Number.parseFloat(this.getSumPrice(this.projectList) / 100))
              }
          },

          /**
           * 生成一个UUID
           * @returns {string}
           */
          getUuid() {
              const len = 32; //32长度
              let radix = 16; //16进制
              const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
              const uuid = [];
              let i;
              radix = radix || chars.length;if (len) {
                  for (i = 0; i < len; i++) {
                      uuid[i] = chars[0 | Math.random() * radix];
                  }
              } else {
                  let r;uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';uuid[14] = '4';for (i = 0; i < 36; i++) {
                      if (!uuid[i]) {
                          r = 0 | Math.random() * 16;uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
                      }
                  }
              }
              return uuid.join('');
          },

          getSumPrice(list){
              let sum = 0
              for(let i=0; i<list.length; i++){
                  sum +=  Number.parseFloat(list[i].money)
              }
            return sum
          },

          getSumCount(list){
              let sum = 0
              for(let i=0; i<list.length; i++){
                  sum += list[i].data[1].treatment_num * list[i].num
              }
              return sum
          },

          getSumProCount(list){
              let sum = 0
              for(let i=0; i<list.length; i++){
                  sum += list[i].num
              }
              return sum
          },

          numberChange(item, i){
              item.money =  this.$base.twoDecimal(item.price * (item.discount * 0.1) * item.num)
              this.projectList[i] = item
              this.updateUserList()
          },

          selectUsers(){

              let _this = this

              if(this.projectList.length > 0){
                  this.isSelectUser = true

                  //判断是新增还是修改

                  if(this.usersList.length == 0){
                      getUserInfo().then((res)=>{
                          if(res.status == 0){

                              if(res.data.role_id == 2 || res.data.role_id == 5){
                                  //添加当前订单的顾问
                                  let _tmp = this.allUserList.find(item => item.users_id == _this.adviser_id)

                                  this.usersList.push({
                                      id: this.getUuid(),
                                      name: _tmp.name,
                                      users_id: _tmp.users_id,
                                      rate: 100,
                                      price: this.getSumPrice(this.projectList),
                                  })

                              }else if(res.data.role_id == 3 || res.data.role_id == 4){
                                 //添加自己
                                  let _tmp = this.allUserList.find(item => item.users_id === res.data.users_id)

                                  this.usersList.push({
                                      id: this.getUuid(),
                                      name: _tmp.name,
                                      users_id: _tmp.users_id,
                                      rate: 100,
                                      price: this.getSumPrice(this.projectList),
                                  })
                              }
                          }
                      }).catch((e)=>{
                          console.log(e)
                      })

                  }

              }else{
                  Toast({
                      message: '请选择项目',
                      type: 'error',
                      duration:1500,
                  });
              }

          },

          submit(){

              //判断百分比等于100
              let _sum = 0
              for(let i=0; i<this.usersList.length; i++){
                  _sum += this.usersList[i].rate
              }

              if(_sum!=100){
                  Toast({
                      message: '开单百分比总和必须为100',
                      type: 'error',
                      duration:1500,
                  });
                  return
              }

              //提交订单

              //确认开单
              let items_num = []
              let item_pid = []
              let payable = []
              let item_id = []
              for(let i=0; i<this.projectList.length; i++){
                  let _item = this.projectList[i]
                  items_num.push(_item.num)
                  item_pid.push(_item.data[0].id)
                  payable.push(_item.money)
                  item_id.push(_item.data[1].id)
              }

              if(this.projectList.length > 0){

                this.subLoding = true

                if(this.title == '修改订单'){
                    postModifyOrders({
                            customer_id: this.customer_id, appointment_id: this.appointment_id, orders_id: this.orders_id,
                            adviser_id: this.adviser_id, technician_id: this.technician_id,
                            items_num, item_pid, payable, item_id,
                            proportion: JSON.stringify(this.usersList),
                        }).then((res)=>{
                        setTimeout(() => {
                            this.subLoding = false;
                            if( res.status == 0 ){
                                Toast({
                                    message: '修改订单成功',
                                    type: 'success',
                                    duration:1500,
                                    onClose:()=>{
                                        window.history.go(-1)
                                    }
                                });
                            }else Toast(res.msg);
                        },1000)
                    }).catch((e)=>{
                        console.log(e)
                    })
                }else{
                    addOrders({
                        customer_id: this.customer_id, appointment_id: this.appointment_id, adviser_id: this.adviser_id, technician_id: this.technician_id,
                        items_num, item_pid, payable, item_id,
                        proportion: JSON.stringify(this.usersList),
                    }).then((res)=>{
                        setTimeout(() => {
                            this.subLoding = false;
                            if( res.status == 0 ){
                                Toast({
                                    message: '开单成功',
                                    type: 'success',
                                    duration:1500,
                                    onClose:()=>{
                                        window.history.go(-1)
                                    }
                                });
                            }else Toast(res.msg);
                        },1000)
                    }).catch((e)=>{
                        console.log(e)
                    })
                }

              }
              else{
                  Toast('请完善资料');
              }

          },

      },
      mounted(){
          this.minHeight = window.innerHeight
          this.title = this.$route.query.title

        //   this.id = this.$route.query.id
          this.appointment_id = this.$route.query.appointment_id
          this.technician_id = this.$route.query.technician_id
          this.adviser_id = this.$route.query.adviser_id
          this.customer_id = this.$route.query.customer_id
          this.orders_id = this.$route.query.id

          //判断title

          if(this.title == '修改订单'){
              getStoreItem({getItem: 1}).then(res2 => {
                  getModifyOrders({customer_id: this.customer_id, adviser_id: this.adviser_id, appointment_id: this.appointment_id, orders_id: this.orders_id}).then((res)=>{
                      if(res.status == 0){
                          let items = res2.data
                          let _list = res.data.receipts
                          let _tmp = []
                          for(let i=0; i<_list.length; i++){
                              let data = []
                              //查询父级项目
                              let _p = items.find((element) => (element.id == _list[i].items.p_id));
                              data.push(_p)
                              data.push(_list[i].items)
                              this.projectList.push({
                                  discount: this.$base.twoDecimal(_list[i].payment / _list[i].price * 10  ),
                                  num: _list[i].number_one,
                                  price: Number.parseFloat(_list[i].items_price), //单价
                                  money: Number.parseFloat(_list[i].payment), // 总价
                                  id: this.getUuid(),
                                  data: data,
                              })
                          }

                          //获取美容师和顾问
                          getStoreMembers().then((res3)=>{
                              if(res3.status == 0){
                                  let _tmp = res3.data.filter(item => item.role_id == 3 || item.role_id == 4)

                                  //赋值给组件
                                  for(let i=0; i< res.data.proportion.length; i++){

                                      //查询函数

                                      let __tmp = _tmp.find(item => item.users_id === res.data.proportion[i].users_id)

                                      if(__tmp){
                                          this.usersList.push({
                                              id: this.getUuid(),
                                              name: __tmp.name,
                                              users_id: res.data.proportion[i].users_id,
                                              rate: res.data.proportion[i].rate,
                                              price: res.data.proportion[i].price,
                                          })
                                      }

                                  }

                              }
                          }).catch((e)=>{
                              console.log(e)
                          })

                      }
                  }).catch((e)=>{
                      console.log(e)
                  })
              }).catch((e)=>{
                  console.log(e)
              })

          }

          //获取顾客详情
          postDetails({customer_id: this.customer_id }).then((res)=>{
              if(res.status == 0){
                  this.customerInfo = res.data
              }
          }).catch((e)=>{
              console.log(e)
          })

          //获取所有员工
          getStoreMembers().then((res)=>{
              if(res.status == 0){
                  this.allUserList = res.data
              }
          }).catch((e)=>{
              console.log(e)
          })


          // if(_tmp[i].users_id == this.adviser_id){
          //     this.cosmetologist = _tmp[i].name
          //     this.defaultIndex = i
          //     //获取技师折扣
          //     // console.log(_tmp[i])
          // }

      },
    }
</script>
<style scoped>
</style>



    
