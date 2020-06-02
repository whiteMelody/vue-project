<template>
  <div class="ActivityList f14px pa14">

    <div class="pa7">
      <div class="bg-white pal15 par15 pat5 pab5">

        <div class="wb100">

          <p class="h40px lh40px bd-b1 bd-gray fc-gray4">活动列表</p>

          <div class="clear4"></div>

          <el-form :inline="true" :model="condition" class="search-form" slot="search">

            <el-form-item label="">
              <el-input v-model="condition.kw" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker
                      v-model="condition.createTime"
                      :clearable="false"
                      type="datetime"
                      placeholder="选择创建时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="condition.status" placeholder="选择状态" readonly="" clearable>
                <el-option key="-1" label="全部状态" value="-1"></el-option>
                <el-option key="1" label="开启中" value="1"></el-option>
                <el-option key="2" label="已结束" value="2"></el-option>
                <el-option key="3" label="待开启" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
            <el-button type="danger" class="h32px fr" @click="$router.push('Activity')">新建活动</el-button>

          </el-form>
        </div>

      </div>
    </div>

    <div class="clear4"></div>

    <div class="wb100">
      <div class="wb33 fl" v-for="(item, index) in list">
        <div class="pal10 par10 mab20">
          <div class="wb100 bg-white radius2">

            <div class="wb100">
              <template v-if="item.status.value == 1">
                <div class="wb100 h50px bg-blue6">
                  <div class="pal20 par20">
                    <span class="fl lh50px fc-white">状态：开启中</span>
                    <template v-if="disabled">
                      <p class="w80px h34px bg-white radius1 lh34px mat8 fr fc-blue6 text-center pointer">结束中...</p>
                    </template>
                    <template v-else>
                      <p class="w80px h34px bg-white radius1 lh34px mat8 fr fc-blue6 text-center pointer" @click="changeType(item.id, 1)">结束活动</p>
                    </template>
                  </div>
                </div>
              </template>
              <template v-else-if="item.status.value == 3">
                <div class="wb100 h50px bg-blue11">
                  <div class="pal20 par20 h50px bd-blue6 bd-l2">
                    <span class="fl lh50px fc-blue6"><span class="fc-gray2">状态：</span>未开启</span>
                    <template v-if="disabled">
                      <p class="w80px h32px bg-white radius1 lh32px bd-blue6 bd-a1 mat8 fr fc-blue6 text-center pointer">开启中...</p>
                    </template>
                    <template v-else>
                      <p class="w80px h32px bg-white radius1 lh32px bd-blue6 bd-a1 mat8 fr fc-blue6 text-center pointer" @click="changeType(item.id, 0)">开启活动</p>
                    </template>
                  </div>
                </div>
              </template>
              <template v-else-if="item.status.value == 2">
                <div class="wb100 h50px">
                  <div class="pal20 par20">
                    <p class="h49px fc-gray3 lh49px bd-gray bd-b1">状态：已结束</p>
                  </div>
                </div>
              </template>

              <template v-else-if="item.status.value == 4">
                <div class="wb100 h50px">
                  <div class="pal20 par20">
                    <p class="h49px fc-gray3 lh49px bd-gray bd-b1">状态：未发布</p>
                  </div>
                </div>
              </template>

              <div class="clear4"></div>

              <div class="pal20 par20">

                <div class="relative" style="padding-left: 125px">
                  <img :src="item.cover" class="h86px absolute" style="top:0; left: 0; width: 114px; height: 86px;">
                  <div class="wb100">
                    <p class="f18px fc-gray4 h36px lh18px text-over-hidden2">{{item.share_title}}</p>
                    <div class="clear1"></div>
                    <p class="f14px text-over-hidden3 fc-gray2 lh16px h48px">{{item.share_text}}</p>
                  </div>
                </div>

                <div class="clear3 bd-gray bd-b1"></div>

                <div class="clear1"></div>

                <div class="wb100 lh30px fc-gray2">
                  <p>开始时间：{{item.start_time}} </p>
                  <p>结束时间：{{item.stop_time}} </p>
                  <p>创建时间：{{item.created_at}} </p>
                </div>

                <div class="clear1 bd-gray bd-b1"></div>

                <div class="clear2"></div>

                <template v-if="item.status.value == 1">
                  <div class="wb100">
                    <div class="relative" style="padding-right: 90px;">
                      <p class="h30px lh30px fc-gray3">活动URL：</p>
                      <div class="clear0"></div>
                      <p class=" pal10 par10 bg-white1 h34px lh34px radius1">
                        {{item.url}}
                      </p>
                      <p class="w80px h32px fc-white radius1 lh32px bd-blue6 bd-a1 fr bg-blue6 text-center absolute pointer cobyOrderSn"  data-clipboard-action="copy" :data-clipboard-text="item.url"  @click="copyLink" style="top:30px; right: 0;">复制链接</p>
                    </div>

                    <div class="wb100">
                      <div class="clear3"></div>
                      <div class="wb100">
                        <p class="h30px lh30px fc-gray3 fl">活动二维码：</p>
                        <img :src="item.qr_code" class="w100px h100px fl mal10 mar10">
                        <a :href="item.qr_code" download="">
                          <p class="w80px h32px fc-white radius1 lh32px bd-blue6 bd-a1 fl bg-blue6 text-center pointer" style="margin-top: 66px;">下载二维码</p>
                        </a>
                      </div>
                    </div>
                    <div class="clear0"></div>
                  </div>
                </template>

                <template v-else-if="item.status.value == 3 || item.status.value == 4">
                  <div class="wb100 fc-gray2 text-center" style="height: 179px; line-height: 179px;">
                    活动开启后生成活动链接和二维码
                  </div>
                </template>

                <template v-if="item.status.value == 2">
                  <div class="wb100">
                    <div class="relative">
                      <p class="h30px lh30px fc-gray3">活动URL：</p>
                      <div class="clear0"></div>
                      <p class=" pal10 par10 bg-white1 h34px lh34px radius1">
                        {{item.url}}
                      </p>
                    </div>

                    <div class="wb100">
                      <div class="clear3"></div>
                      <div class="wb100">
                        <p class="h30px lh30px fc-gray3 fl">活动二维码：</p>
                        <img :src="item.qr_code" class="w100px h100px fl mal10 mar10">
                      </div>
                    </div>
                    <div class="clear0"></div>
                  </div>

                </template>

                <div class="clear4 bd-gray bd-b1"></div>

                <div class="wb100 h50px lh50px f16px text-center pointer" v-if="item.status.value == 2" @click="$router.push({name: 'ActivityData', query:{ id: item.id} })">
                    查看数据
                </div>

                <div class="wb100 h50px f16px" v-else>
                  <div class="wb495 fl text-center h20px lh20px mat15 pointer" @click="$router.push({name: 'Activity', query:{ id: item.id, isEdit: true} })">
                    编辑活动
                  </div>
                  <div class="wb495 fr text-center h20px lh20px mat15 bd-gray bd-l1 pointer" @click="$router.push({name: 'ActivityData', query:{ id: item.id} })">
                    查看数据
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

  import dateSlot from '@/shop/components/date/dateSlot'

  import {getList, changeStatus} from  "@/shop/assets/api/activity/activity"

export default {
  name: "ActivityList",
  data() {
    return {
      dateTime: [ '', ''],
      condition: {
        start: 1,
        perpage: 9999,
        kw: '',
        startTime: '',
        endTime: '',
      },
      list: [],
      disabled: false,
    };
  },
  components: {
    dateSlot
  },
  methods: {
    loadData(){
      getList(this.condition).then(res=>{
        if(res.status == 0){
          this.list = res.data.list
        }
      })
    },

    changeType(flexibleId, status){

      this.disabled = true

      changeStatus({flexibleId, status }).then(res=>{
        if(res.status == 0){
          if(status == 0){
            this.$message({
              showClose: true,
              message:'活动开启成功',
              type: 'success',
              onClose:()=>{
                window.location.reload()
                this.disabled = false
              }
            });
          }else{
            this.$message({
              showClose: true,
              message:'活动关闭成功',
              type: 'success',
              onClose:()=>{
                window.location.reload()
                this.disabled = false
              }
            });
          }
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
          this.disabled = false
        }
      })

    },

    copyLink() {

    },

  },

  // 挂载结束状态
  mounted() {
    this.loadData()

  },

  watch: {
    dateTime(c,o){
      this.condition.startTime = c[0]
      this.condition.endTime = c[1]
    }
  }

};
</script>

<style>

</style>


    
