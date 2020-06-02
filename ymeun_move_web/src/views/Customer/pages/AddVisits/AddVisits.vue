<template>
  <div class="wb100 bg-white1" :style="'minHeight:' + minHeight + 'px' ">

      <!--   header   -->
      <Header :title="'添加主动回访'" :back="true"></Header>

      <div class="wb100">

          <div class="pa20 f28rem fc-gray3 bg-white lh50rem">
              <div class="fl">
                <b class="fl fc-red">*</b><span class="fl mal10">回访时间</span>
              </div>
              <div class="fr h50rem text-right" @click="openPicker">
                  {{visitsDate ? visitsDate : '请选择'}}
                  <i class="iconfont iconxiangyou f22rem fc-gray3"></i>
              </div>
              <div class="clear0"></div>
          </div>

          <div class="clear4"></div>

          <div class="pa20 f28rem fc-gray3 bg-white lh50rem">
              <div class="fl">
                  <span class="fl mal20">回访内容</span>
              </div>
              <div class="clear0"></div>

              <div class="pal20 par20 pat10 fc-gray2 lh50rem">
                  <textarea class="wb100 bd-none bg-none" v-model="content" placeholder="请输入" rows="4"></textarea>
              </div>

              <p class="f24rem fc-gray3 h60rem lh60rem bd-gray bd-t1">填写此内容，此主动回访将立即完成，回访日期为当天..</p>

          </div>

          <div class="clear4"></div>

          <div class="pa20 f28rem fc-gray3 bg-white lh50rem">
              <div class="fl">
                  <span class="fl mal20">回访备注</span>
              </div>
              <div class="clear0"></div>

              <div class="pal20 par20 pat10 fc-gray2 lh50rem">
                  <textarea class="wb100 bd-none bg-none" placeholder="请输入" rows="4"></textarea>
              </div>

              <div class="clear0"></div>
          </div>

          <div class="clear9"></div>

          <div class="pal50 par50"
               @click="submit"
               v-loading.fullscreen.lock="subLoding"
               element-loading-text="提交中...">
              <div class="wb100 fc-white bg-green h80rem lh80rem text-center f28rem radius8">
                  提交
              </div>
          </div>

          <div class="clear4"></div>

      </div>

      <div class="bg-dialog" v-show="showDatePicker">
          <div class="bg-date-dialog">
              <div class="pal20 par20 pat10 pab10 f26rem bg-white1 fc-gray3 h50rem lh50rem">
                  <template v-if="dateSelectd == 0">
                      <span class="fl bd-gray1 bd-b2">{{dateFormat(value)}}</span>
                      <span class="fl mal50" @click="changeDateSelect(1)">{{currentDate}}</span>
                  </template>
                  <template v-else>
                      <span class="fl" @click="changeDateSelect(0)">{{dateFormat(value)}}</span>
                      <span class="fl bd-gray1 bd-b2 mal50">{{currentDate}}</span>
                  </template>
                  <span class="fr fc-green f26rem" @click="changePicker">确定</span>
              </div>
              <div class="clear0"></div>
              <div class="wb100 f22rem" v-show="dateSelectd == 0">
                  <el-calendar v-model="value">
                  </el-calendar>
              </div>
              <div class="wb100" v-show="dateSelectd == 1">
                  <van-datetime-picker
                          type="time"
                          v-model="currentDate"
                          :min-hour="minHour"
                          :max-hour="maxHour"
                          :show-toolbar="false"
                  />
              </div>
          </div>
      </div>

  </div>
</template>
<script>

    import Header from '../../../../components/Header'

    import { dailyReview } from "@/assets/api/Customer/Customer"

    import { Toast } from 'vant'

    export default {
      data(){
        return {
            value: new Date().getTime(),
            minHeight: 0,
            subLoding: false,
            showDatePicker: false,
            dateSelectd: 0,
            currentDate: '12:00',
            minHour: 0,
            maxHour: 23,
            visitsDate: '',
            customer_id: '',
            content: '',
        }
      },
      components:{
          Header
      },
      methods:{
          changeDateSelect(i){
              this.dateSelectd = i
          },
          openPicker(){
            this.showDatePicker = true
          },
          closePicker(){
            this.showDatePicker = false
          },
          changePicker(){
            this.visitsDate = this.dateFormat(this.value) +  this.currentDate
              this.closePicker()
          },
          dateFormat(key){
              if(key == "" || key == null){
                  return
              }
              let date = new Date(key);
              let y = date.getFullYear();
              let MM = date.getMonth() + 1;
              MM = MM < 10 ? ('0' + MM) : MM;
              let d = date.getDate();
              d = d < 10 ? ('0' + d) : d;
              let h = date.getHours();
              h = h < 10 ? ('0' + h) : h;
              let m = date.getMinutes();
              m = m < 10 ? ('0' + m) : m;
              let s = date.getSeconds();
              s = s < 10 ? ('0' + s) : s;
              return y + '-' + MM + '-' + d + ' ' ;
          },
          submit(){
              if(this.visitsDate != '')
              {
                this.subLoding = true
                dailyReview({customer_id: this.customer_id, content: this.content, reviewTime: this.visitsDate, }).then((res)=>{
                    setTimeout(() => {
                        this.subLoding = false
                        if( res.status == 0 ){
                            Toast({
                                message: '填写回访成功',
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
              else
              {
                  Toast('请填写时间')
              }

          },
      },
      mounted(){
        this.minHeight = window.innerHeight
        this.customer_id = this.$route.query.id;
        let hours = new Date().getHours();
        if(hours < 10) hours = "0"+hours
        this.currentDate =   hours+':59';
      },
    }
</script>
<style scoped>

</style>



    
