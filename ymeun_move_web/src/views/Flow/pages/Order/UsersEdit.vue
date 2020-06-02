<template>
  <div class="wb100 bg-white1 MakeAnAppointment" :style="'minHeight:' + minHeight + 'px' ">

      <!--   header   -->
<!--      <Header :title="'添加项目'" :back="true"></Header>-->

      <div class="wb100 bg-white">
        <div class="pa20">

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <b class="fc-red w20rem fl">*</b>
                    <span class="fl">开单人员</span>
                </div>
                <template v-if="isMy">
                    <div class="fr h50rem text-right">
                        {{cosmetologist}}
                    </div>
                </template>
                <template v-else>
                    <div class="fr h50rem text-right" @click="popShow">
                        {{cosmetologist ? cosmetologist : '请选择'}}
                        <i class="iconfont iconxiangyou f22rem fc-gray3"></i>
                    </div>
                </template>

                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <b class="fc-red w20rem fl">*</b>
                    <span class="fl">开单百分比</span>
                </div>
                <div class="fr h50rem text-right">
                    <span class="fr mat15 lh30rem mal10">%</span>
                    <el-input-number v-model="rate" :precision="0" :min="0" :max="100" @change="numberChange" placeholder="请输入" :controls="false" style="width: 1.5rem"></el-input-number>
                </div>
                <div class="clear0"></div>
            </div>

            <div class="clear4 bd-gray bd-b1"></div>
            <div class="clear4"></div>

            <div class="wb100 f28rem fc-gray3 bg-white lh50rem">
                <div class="fl">
                    <b class="fc-red w20rem fl">*</b>
                    <span class="fl">金额占比</span>
                </div>
                <div class="fr h50rem text-right">
                      {{price}}
                </div>
                <div class="clear0"></div>
            </div>

        </div>
      </div>

      <div class="clear" style="height: 1.5rem"></div>

      <div class="pal50 par50 relative">
          <div class="btn-disabled" v-show="!cosmetologist || rate<=0 "></div>
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

      <van-popup v-model="counselorShow" position="bottom">
          <van-picker
                  show-toolbar
                  :defaultIndex="defaultIndex"
                  :columns="counselorColumns"
                  @cancel="counselorCancel"
                  @confirm="counselorConfirm"
          />
      </van-popup>

  </div>
</template>
<script>

    import Header from '../../../../components/Header'
    import { getUserInfo } from "@/assets/api/Data/Login";
    import { getStoreMembers } from "@/assets/api/Flow/MakeAnAppointment"

    import { Toast } from 'vant';

    export default {
        props: ['data', 'list', 'totle'],
      data(){
        return {
            minHeight: 0,
            title:'',

            rate: 0,
            price: 0,

            isMy: false,

            counselorShow: false,
            defaultIndex: 0,
            counselorColumns: [],
            counselorActive: {},
            cosmetologist: '',

        }
      },
      components:{
           Header
      },
      methods:{
          //顾问
          counselorCancel(){
              this.counselorShow = false
          },
          counselorConfirm(item){
              this.counselorShow = false
              this.counselorActive = item
              this.cosmetologist = item.text
          },

          cancel(){
            this.$parent.closeUsers()
          },

          confirm(){

              if(this.data.id){
                  //修改
                  this.$emit('ListenPush',{
                      name: this.counselorActive.text,
                      users_id: this.counselorActive.key,
                      rate: this.rate,
                      price: this.price,
                      id: this.data.id
                  })
              }else{
                  //新增
                  this.$emit('ListenPush',{
                      name: this.counselorActive.text,
                      users_id: this.counselorActive.key,
                      rate: this.rate,
                      price: this.price,
                      id: this.getUuid()
                  })
              }

              this.$parent.closeUsers()
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

          popShow(){
              this.counselorShow = true
          },

          numberChange(e){
              this.price = this.$base.twoDecimal(this.rate * Number.parseFloat(this.totle / 100))
          },

          getUsers(){

              //获取美容师和顾问
              getStoreMembers().then((res)=>{
                  if(res.status == 0){
                      let _tmp = res.data
                      //赋值给组件
                      for(let i=0; i< _tmp.length; i++){
                          if(_tmp[i].role_id == 3 || _tmp[i].role_id == 4){

                              //查询函数
                              let __tmp = this.list.find(item => item.users_id === _tmp[i].users_id)

                              if(__tmp){

                              }else{
                                  this.counselorColumns.push({
                                      key: _tmp[i].users_id,
                                      text: _tmp[i].name,
                                  })
                              }

                          }
                      }

                  }
              }).catch((e)=>{
                  console.log(e)
              })

          }

      },
      mounted(){
          this.minHeight = window.innerHeight
          this.title = this.$route.query.title

          //获取开单人员
            this.getUsers()

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

          if(this.data.id){
              //修改
              this.price = this.data.price
              this.rate = this.data.rate
              this.counselorActive = {
                  text: this.data.name,
                  key: this.data.users_id,
              }
              this.cosmetologist = this.data.name

              //判断是否是第一个
              if(this.data.id == this.list[0].id){
                  this.isMy = true
              }
          }

      },

    }
</script>
<style lang="scss" scoped>
    @import "../MakeAnAppointment/MakeAnAppointment.scss";
</style>



    
