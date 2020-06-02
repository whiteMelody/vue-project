<template>
  <div class="wb100 bg-white1 MakeAnAppointment" :style="'minHeight:' + minHeight + 'px' ">

      <!--   header   -->
<!--      <Header :title="'添加项目'" :back="true"></Header>-->

      <div class="wb100 bg-white">
        <div class="pa20">

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <b class="fc-red w20rem fl">*</b>
                    <span class="fl">项目</span>
                </div>
                <div class="fr h50rem text-right" @click="popShow('project')">
                    {{projectActive == null ?  '请选择' : projectActive[0].name+'-'+projectActive[1].name}}
                    <i class="iconfont iconxiangyou f22rem fc-gray3"></i>

<!--                    <i v-if="projectActive == null" class="iconfont iconxiangyou"></i>-->
<!--                    <i @click="eliminateData('project')" v-else class="iconfont iconshanchuguanbicha2"></i>-->
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <span class="fl mal20">项目单价</span>
                </div>
                <div class="fr h50rem text-right">
                    {{price}}
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <span class="fl mal20">疗程</span>
                </div>
                <div class="fr h50rem text-right">
                    {{projectActive == null ?  '' : projectActive[1].treatment_num}}
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <span class="fl mal20">数量</span>
                </div>
                <div class="fr h50rem text-right">
                    <el-input-number size="mini" v-model="num"></el-input-number>
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <span class="fl mal20">疗程总数</span>
                </div>
                <div class="fr h50rem text-right">
                    {{projectActive == null ?  '' : projectActive[1].treatment_num * num}}
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <span class="fl mal20">折扣</span>
                </div>
                <div class="fr h50rem text-right">
                    <span class="fr mat15 lh30rem mal10">折</span>
                    <el-input-number v-model="num2" :precision="2" :min="0.01" :max="10" @change="numberChange" placeholder="请输入" :controls="false" style="width: 1.5rem"></el-input-number>
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <b class="fc-red w20rem fl">*</b>
                    <span class="fl">实付金额</span>
                </div>
                <div class="fr h50rem text-right">
                    <template v-if="projectActive">
                        <el-input-number v-model="money" :precision="2" @change="moneyChange" placeholder="请输入" :controls="false" style="width: 2.2rem"></el-input-number>
                    </template>
                </div>
                <div class="clear0"></div>
            </div>

        </div>
      </div>

      <div class="clear" style="height: 1.5rem"></div>

      <div class="pal50 par50 relative">
          <div class="btn-disabled" v-show="!projectActive"></div>
          <div class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8" @click="confirm">
              确定
          </div>
      </div>

      <div class="clear4"></div>
      <div class="clear4"></div>
      <div class="clear4"></div>

      <div class="pal50 par50 relative">
          <div class="wb100 fc-gray4 bg-gray1 h80rem lh80rem text-center f28rem radius8" @click="cancel">
              取消
          </div>
      </div>

      <div class="pop_boxs">
          <van-popup v-model="projectShow" position="bottom">
              <div class="pop_box">
                  <div class="header">
                      <span @click="projectCancel">取消</span>
                      <a v-if="projectActiveText != '请选择'" @click="projectConfirm">确定</a>
                  </div>
                  <div class="text">{{projectActiveText}}</div>
                  <ul v-show="projectActiveText == '请选择'">
                      <li
                              @click="projectListConfirm(index)"
                              v-for="(item , index) in  projectLIst"
                              :key="index"
                      >
                          <span>{{item.name}}</span>
                          <i class="iconfont iconduihao"></i>
                      </li>
                  </ul>
                  <ul class="children" v-show="projectActiveText != '请选择'">
                      <li
                              @click="projectLIstChildrenConfirm(index)"
                              v-for="(item , index) in  projectActiveList"
                              :class="projectLIstChildrenIndex == index ? 'active' :''"
                              :key="index"
                      >
                          <span>{{item.name}}</span>
                          <i class="iconfont iconduihao"></i>
                      </li>
                  </ul>
              </div>
          </van-popup>
      </div>

  </div>
</template>
<script>

    import Header from '../../../../components/Header'
    import { getStoreItem } from "@/assets/api/Flow/MakeAnAppointment";
    import { getUserInfo } from "@/assets/api/Data/Login";

    import { Toast } from 'vant';

    export default {
        props: ['data'],
      data(){
        return {
            minHeight: 0,
            title:'',
            num: 1,
            num2: 10,
            money: '',
            price: '',

            minDiscount: 0,
            projectShow:false,
            projectActive:null,
            projectActiveText:'请选择',
            projectActiveList:[],
            projectLIst:[],
            projectListIndex:null,
            projectLIstChildrenIndex:null,
        }
      },
      components:{
           Header
      },
      methods:{
          cancel(){
            this.$parent.closeProject()
          },

          confirm(){

              if(this.data.data){
                  //修改
                  this.$emit('ListenPush',{
                      data: this.projectActive,
                      discount: this.num2,
                      money: this.money,
                      price: this.price,
                      num: this.num,
                      id: this.data.id
                  })
              }else{
                  //新增
                  this.$emit('ListenPush',{
                      data: this.projectActive,
                      discount: this.num2,
                      money: this.money,
                      price: this.price,
                      num: this.num,
                      id: this.getUuid()
                  })
              }

              this.$parent.closeProject()
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

          //显示选择类容
          popShow(str){
              switch (str) {
                  case "counselor":
                      this.counselorShow = true;
                      break;
                  case "project":
                      this.projectShow = true;
                      break;
                  case "cosmetologist":
                      this.cosmetologistShow = true;
                      break;
                  case "timer":
                      this.showDatePicker = true;
                      break;
                  default:
                      break;
              }
          },
          popHide(str){
              switch (str) {
                  case "counselor":
                      this.counselorShow = false;
                      break;
                  case "project":
                      this.projectShow = false;
                      break;
                  case "cosmetologist":
                      this.cosmetologistShow = false;
                      break;
                  default:
                      break;
              }
          },

          projectCancel(){
              this.projectShow = false;
              this.projectActiveText = '请选择';
              this.projectListIndex = null;
              this.projectLIstChildrenIndex = null;
          },
          projectConfirm() {
              if(this.projectLIstChildrenIndex != null)
              {
                  var arr = [
                      this.projectLIst[this.projectListIndex],
                      this.projectActiveList[this.projectLIstChildrenIndex],
                  ]
                  this.projectActive = arr;
                  this.projectShow = false;
                  this.projectActiveText = '请选择';
                  this.projectListIndex = null;
                  this.projectLIstChildrenIndex = null;
                  this.price = arr[1].price
                  this.money = this.price * (this.num2 * 0.1)
              }
              else
              {
                  Toast('请完善资料');
              }
          },
          projectListConfirm(index){

              this.projectListIndex = index;
              this.getShowProjectFn(2,this.projectLIst[index].id,() =>{
                  this.projectActiveText = this.projectLIst[index].name;
              })

          },
          projectLIstChildrenConfirm(index){
              this.projectLIstChildrenIndex = index;
              // this.$forceUpdate()
          },


          //获取门店-项目
          getShowProjectFn(type,pid,fn){
              let postData = {
                  getItem:type,
                  p_id:pid
              }
              getStoreItem(postData).then(res => {
                  if(pid == undefined)
                  {
                      this.projectLIst = res.data;
                  }
                  else
                  {
                      this.projectActiveList = res.data;
                      fn()

                  }
                  // this.$forceUpdate();
              }).catch((e)=>{
                  console.log(e)
              })
          },

          numberChange(e){
              this.money = this.price * (this.num2 * 0.1) * this.num
          },

          moneyChange(e){
              this.num2 = this.money / this.num / this.price * 10
          },

      },
      mounted(){
          this.minHeight = window.innerHeight
          this.title = this.$route.query.title
          // this.title = this.$route.params.title

          //获取门店-项目
          this.getShowProjectFn(1)

          getUserInfo().then((res)=>{
              if(res.status == 0){
                  if(res.data.role_id == 2 || res.data.role_id == '2'){
                      //管理员权限
                      this.minDiscount = 0
                  }else if(res.data.role_id == 3 || res.data.role_id == '3'){
                      //顾问
                      this.minDiscount = Number.parseFloat(res.data.discount)
                  }
              }
          }).catch((e)=>{
              console.log(e)
          })

          if(this.data.data){
              //修改
              this.projectActive = this.data.data
              this.price = this.data.price
              this.num = this.data.num
              this.num2 = this.data.discount
              this.money = this.data.money
          }

      },

        watch: {
            num(curVal) {
                this.money = this.price * (this.num2 * 0.1) * curVal
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "../MakeAnAppointment/MakeAnAppointment.scss";
</style>



    
