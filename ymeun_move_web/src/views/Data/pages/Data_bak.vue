<template>
  <div class="wb100 bg-white" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <Header :title="title" :title-left="true"></Header>

    <div class="clear0"></div>

    <div class="wb100 h80rem fixed bg-white bd-b1 bd-gray" style="left: 0; z-index: 9999;" :style=" isWeixin ? 'top:0' : 'top:.8rem;' ">
      <div class="wb80 fl f28rem text-center">
        <template v-for="(item,index) in arrs">
          <template v-if="index == curIndex">
            <div class="wb20 fl h80rem lh80rem pointer" @click="changeIndex(index)">
              <span class="bd-green bd-b2 fc-green lh80rem display-inline">{{item}}</span>
            </div>
          </template>
          <template v-else>
            <div
              class="wb20 fl fc-gray3 h80rem lh80rem pointer"
              @click="changeIndex(index)"
            >{{item}}</div>
          </template>
        </template>
      </div>
      <div class="wb20 fr" @click="logoutMy">
        <div class="wb100 bd-gray bd-l1 f30rem h50rem lh50rem Fgray-3 mat15 text-center">
          <i class="icontuichu iconfont fc-green"></i>
          退出
        </div>
      </div>
    </div>

    <div class="clear0" style="height:.8rem"></div>

    <div class="clear4 bg-white1"></div>


    <div class="wb100" v-loading="loading">

     <div class="wb100">

      <!--   店长首页   -->
      <template v-if="role_id == 2 || role_id == 3 ||  role_id == 4 ||  role_id == 5">
        <div class="pa24">

          <div class="wb50 fl">
            <div class="par26">
              <p class="f26rem lh60rem fc-gray3">销售业绩（元）</p>
              <p class="f40rem lh60rem fc-gray4">{{dataInfo.total.actual.payment}}</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

          <div class="wb50 fr">
            <div class="pal26">
              <p class="f26rem lh60rem fc-gray3">划扣业绩（元）</p>
              <p class="f40rem lh60rem fc-gray4">192,839.00</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

          <div class="wb50 fl">
            <div class="par26">
              <p class="f26rem lh60rem fc-gray3">成交人头（人）</p>
              <p class="f40rem lh60rem fc-gray4">1</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

          <div class="wb50 fr">
            <div class="pal26">
              <p class="f26rem lh60rem fc-gray3">划扣人头（人）</p>
              <p class="f40rem lh60rem fc-gray4">19</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

          <div class="wb50 fl">
            <div class="par26">
              <p class="f26rem lh60rem fc-gray3">成交人次（次）</p>
              <p class="f40rem lh60rem fc-gray4">1</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

          <div class="wb50 fr">
            <div class="pal26">
              <p class="f26rem lh60rem fc-gray3">划扣人次（次）</p>
              <p class="f40rem lh60rem fc-gray4">19</p>
              <div class="clear2" style="border-bottom: 0.01rem dashed #C0C0C0"></div>
            </div>
          </div>

        </div>

        <div class="clear4 bg-white1"></div>

        <div class="pa24">

          <div class="wb50 fl over-hidden">
            <i class="iconfont icontianjia f60rem fl mar20 mat10"></i>
            <div class="fl lh50rem">
              <p class="f26rem fc-gray2">到店人次</p>
              <p class="f40rem">89</p>
            </div>

              <div class="clear3" style="border-bottom: 0.01rem dashed #C0C0C0; margin-left: .8rem"></div>

              <i class="iconfont icontianjia f60rem fl mar20 mat10"></i>
              <div class="fl lh50rem">
                <p class="f26rem fc-gray2">预约人次</p>
                <p class="f40rem">89</p>
              </div>

          </div>

          <div class="fr">

            <div class="w120px h120px relative">
              <div class="absolute w80px h80px lh40rem radius50 text-center f26rem bg-white" style="bottom:0; left: 0; right: 0; top: 0; margin: auto; z-index:999999">
                <p class="fc-orange f30rem mat10">25%</p>
                <p class="fc-gray2">完成率</p>
              </div>
              <el-progress type="circle" :percentage="25" :width="120" color="#FF5722"></el-progress>
            </div>

          </div>

          <div class="clear4 bd-t1 bd-gray"></div>

          <p class="f24rem h30rem lh30rem fc-gray2">成交率=成交人次/到店人次</p>

        </div>

        <div class="clear4 bg-white1"></div>

        <div class="pa24">
          <p class="f26rem h40rem">
            <span class="fl fc-gray3">总消耗业绩</span>
            <span class="fr f28rem fc-green">7,055,961.55 元</span>
          </p>

          <div class="clear4 bd-b1 bd-gray"></div>

          <p class="f20rem h30rem lh60rem fc-gray2">统计的是门店所有剩余划扣总金额，不随查询条件变化而变化</p>

          <div class="clear2"></div>

        </div>

      </template>

    </div>

    <div class="clear4 bg-white1"></div>

<!--      <div class="wb100 fc-gray2">-->
<!--        <template v-if="role_id == 2 || role_id == 3 || role_id == 5">-->
<!--          <div class="pa20">-->
<!--            <div class="wb50 fl lh60rem fc-gray3">-->
<!--              <p class="f26rem">到店人数（人数）</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#C09346"-->
<!--                      v-if="dataInfo.proportion.appointment > 100"-->
<!--              >{{dataInfo.actual.appointment}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#009688"-->
<!--                      v-if="dataInfo.proportion.appointment >= '90' && dataInfo.proportion.appointment <= '100'"-->
<!--              >{{dataInfo.actual.appointment}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#FF5722"-->
<!--                      v-if="dataInfo.proportion.appointment >= '60' && dataInfo.proportion.appointment < '90'"-->
<!--              >{{dataInfo.actual.appointment}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.appointment < '60'"-->
<!--              >{{dataInfo.actual.appointment}}</p>-->
<!--              <p class="f26rem">-->
<!--                目标人数：-->
<!--                <span class="fc-gray4">{{dataInfo.target.appointment}}（人）</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="wb50 fr text-right f20rem relative">-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.appointment"-->
<!--                      color="#C09346"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.appointment > '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.appointment"-->
<!--                      color="#009688"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.appointment >= '90' &&dataInfo.proportion.appointment <= '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.appointment"-->
<!--                      color="#FF5722"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.appointment >= '60' &&dataInfo.proportion.appointment < '90'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.appointment"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.appointment < '60'"-->
<!--              ></el-progress>-->
<!--              <div class="el-p-circle">-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#C09346"-->
<!--                        v-if="dataInfo.proportion.appointment > '100'"-->
<!--                >{{dataInfo.proportion.appointment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#009688"-->
<!--                        v-if="dataInfo.proportion.appointment >= '90' && dataInfo.proportion.appointment <= '100'"-->
<!--                >{{dataInfo.proportion.appointment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#FF5722"-->
<!--                        v-if="dataInfo.proportion.appointment >= '60' && dataInfo.proportion.appointment < '90'"-->
<!--                >{{dataInfo.proportion.appointment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.appointment < '60'"-->
<!--                >{{dataInfo.proportion.appointment}}%</p>-->
<!--                <p class="f20rem">完成率</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="clear0"></div>-->
<!--          </div>-->
<!--          <div class="clear4 bg-white1"></div>-->
<!--        </template>-->
<!--        <template v-if="role_id == 2 || role_id == 3 || role_id == 5">-->
<!--          <div class="pa20">-->
<!--            <div class="wb50 fl lh60rem fc-gray3">-->
<!--              <p class="f26rem">销售业绩（元）</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#C09346"-->
<!--                      v-if="dataInfo.proportion.payment > '100'"-->
<!--              >{{dataInfo.actual.payment | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#009688"-->
<!--                      v-if="dataInfo.proportion.payment >= '90' && dataInfo.proportion.payment <= '100'"-->
<!--              >{{dataInfo.actual.payment | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#FF5722"-->
<!--                      v-if="dataInfo.proportion.payment >= '60' && dataInfo.proportion.payment < '90'"-->
<!--              >{{dataInfo.actual.payment | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.payment < '60'"-->
<!--              >{{dataInfo.actual.payment | _filterNumFormat}}</p>-->
<!--              <p class="f26rem">-->
<!--                目标业绩：-->
<!--                <span class="fc-gray4">{{dataInfo.target.payment | _filterNumFormat}}（元）</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="wb50 fr text-right f20rem relative">-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.payment"-->
<!--                      color="#C09346"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.payment > '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.payment"-->
<!--                      color="#009688"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.payment >= '90' &&dataInfo.proportion.payment <= '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.payment"-->
<!--                      color="#FF5722"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.payment >= '60' &&dataInfo.proportion.payment < '90'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.payment"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.payment < '60'"-->
<!--              ></el-progress>-->
<!--              <div class="el-p-circle">-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#C09346"-->
<!--                        v-if="dataInfo.proportion.payment > '100'"-->
<!--                >{{dataInfo.proportion.payment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#009688"-->
<!--                        v-if="dataInfo.proportion.payment >= '90' && dataInfo.proportion.payment <= '100'"-->
<!--                >{{dataInfo.proportion.payment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#FF5722"-->
<!--                        v-if="dataInfo.proportion.payment >= '60' && dataInfo.proportion.payment < '90'"-->
<!--                >{{dataInfo.proportion.payment}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.payment < '60'"-->
<!--                >{{dataInfo.proportion.payment}}%</p>-->
<!--                <p class="f20rem">完成率</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="clear0"></div>-->
<!--          </div>-->
<!--          <div class="clear4 bg-white1"></div>-->
<!--        </template>-->

<!--        <template v-if="role_id == 2 || role_id == 4 || role_id == 5">-->
<!--          <div class="pa20">-->
<!--            <div class="wb50 fl lh60rem fc-gray3">-->
<!--              <p class="f26rem">划扣业绩（元）</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#C09346"-->
<!--                      v-if="dataInfo.proportion.price > '100'"-->
<!--              >{{dataInfo.actual.price | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#009688"-->
<!--                      v-if="dataInfo.proportion.price >= '90' && dataInfo.proportion.price <= '100'"-->
<!--              >{{dataInfo.actual.price | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#FF5722"-->
<!--                      v-if="dataInfo.proportion.price >= '60' && dataInfo.proportion.price < '90'"-->
<!--              >{{dataInfo.actual.price | _filterNumFormat}}</p>-->
<!--              <p-->
<!--                      class="f40rem mab20"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.price < '60'"-->
<!--              >{{dataInfo.actual.price | _filterNumFormat}}</p>-->
<!--              <p class="f26rem">-->
<!--                目标业绩：-->
<!--                <span class="fc-gray4">{{dataInfo.target.price | _filterNumFormat}}（元）</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="wb50 fr text-right f20rem relative">-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.price"-->
<!--                      color="#C09346"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.price > '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.price"-->
<!--                      color="#009688"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.price >= '90' &&dataInfo.proportion.price <= '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.price"-->
<!--                      color="#FF5722"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.price >= '60' &&dataInfo.proportion.price < '90'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.price"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.price < '60'"-->
<!--              ></el-progress>-->
<!--              <div class="el-p-circle">-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#C09346"-->
<!--                        v-if="dataInfo.proportion.price > '100'"-->
<!--                >{{dataInfo.proportion.price}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#009688"-->
<!--                        v-if="dataInfo.proportion.price >= '90' && dataInfo.proportion.price <= '100'"-->
<!--                >{{dataInfo.proportion.price}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#FF5722"-->
<!--                        v-if="dataInfo.proportion.price >= '60' && dataInfo.proportion.price < '90'"-->
<!--                >{{dataInfo.proportion.price}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.price < '60'"-->
<!--                >{{dataInfo.proportion.price}}%</p>-->
<!--                <p class="f20rem">完成率</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="clear0"></div>-->
<!--          </div>-->
<!--          <div class="clear4 bg-white1"></div>-->
<!--        </template>-->

<!--        <template v-if="role_id == 2 || role_id == 4 || role_id == 5">-->
<!--          <div class="clear4 bg-white1"></div>-->
<!--          <div class="pa20">-->
<!--            <div class="wb50 fl lh60rem fc-gray3">-->
<!--              <p class="f26rem">划扣人次（次）</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#C09346"-->
<!--                      v-if="dataInfo.proportion.consume > '100'"-->
<!--              >{{dataInfo.actual.consume}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#009688"-->
<!--                      v-if="dataInfo.proportion.consume >= '90' && dataInfo.proportion.consume <= '100'"-->
<!--              >{{dataInfo.actual.consume}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#FF5722"-->
<!--                      v-if="dataInfo.proportion.consume >= '60' && dataInfo.proportion.consume < '90'"-->
<!--              >{{dataInfo.actual.consume}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.consume < '60'"-->
<!--              >{{dataInfo.actual.consume}}</p>-->
<!--              <p class="f26rem">-->
<!--                目标人次：-->
<!--                <span class="fc-gray4">{{dataInfo.target.consume}}（次）</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="wb50 fr text-right f20rem relative">-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.consume"-->
<!--                      color="#C09346"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.consume > '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.consume"-->
<!--                      color="#009688"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.consume >= '90' &&dataInfo.proportion.consume <= '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.consume"-->
<!--                      color="#FF5722"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.consume >= '60' &&dataInfo.proportion.consume < '90'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.consume"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.consume < '60'"-->
<!--              ></el-progress>-->
<!--              <div class="el-p-circle">-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#C09346"-->
<!--                        v-if="dataInfo.proportion.consume > '100'"-->
<!--                >{{dataInfo.proportion.consume}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#009688"-->
<!--                        v-if="dataInfo.proportion.consume >= '90' && dataInfo.proportion.consume <= '100'"-->
<!--                >{{dataInfo.proportion.consume}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#FF5722"-->
<!--                        v-if="dataInfo.proportion.consume >= '60' && dataInfo.proportion.consume < '90'"-->
<!--                >{{dataInfo.proportion.consume}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.consume < '60'"-->
<!--                >{{dataInfo.proportion.consume}}%</p>-->
<!--                <p class="f20rem">完成率</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="clear0"></div>-->
<!--          </div>-->
<!--        </template>-->

<!--        <template v-if="role_id == 4">-->
<!--          <div class="clear4 bg-white1"></div>-->
<!--          <div class="pa20">-->
<!--            <div class="wb50 fl lh60rem fc-gray3">-->
<!--              <p class="f26rem">预约取消人（次）</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.cancel > '100'"-->
<!--              >{{dataInfo.actual.appointmentCancel}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#F10215"-->
<!--                      v-if="dataInfo.proportion.cancel >= '90' && dataInfo.proportion.cancel <= '100'"-->
<!--              >{{dataInfo.actual.appointmentCancel}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#FF5722"-->
<!--                      v-if="dataInfo.proportion.cancel >= '60' && dataInfo.proportion.cancel < '90'"-->
<!--              >{{dataInfo.actual.appointmentCancel}}</p>-->
<!--              <p-->
<!--                      class="f40rem"-->
<!--                      style="color:#009688"-->
<!--                      v-if="dataInfo.proportion.cancel < '60'"-->
<!--              >{{dataInfo.actual.appointmentCancel}}</p>-->
<!--              <p class="f26rem">-->
<!--                预约成功：-->
<!--                <span class="fc-gray4">{{dataInfo.actual.appointmentSuccess}}（次）</span>-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="wb50 fr text-right f20rem relative">-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.cancel"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.cancel > '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.cancel"-->
<!--                      color="#F10215"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.cancel >= '90' &&dataInfo.proportion.cancel <= '100'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.cancel"-->
<!--                      color="#FF5722"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.cancel >= '60' &&dataInfo.proportion.cancel < '90'"-->
<!--              ></el-progress>-->
<!--              <el-progress-->
<!--                      type="circle"-->
<!--                      :percentage="dataInfo.proportion.cancel"-->
<!--                      color="#009688"-->
<!--                      :show-text="false"-->
<!--                      v-if="dataInfo.proportion.cancel < '60'"-->
<!--              ></el-progress>-->
<!--              <div class="el-p-circle">-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.cancel > '100'"-->
<!--                >{{dataInfo.proportion.cancel}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#F10215"-->
<!--                        v-if="dataInfo.proportion.cancel >= '90' && dataInfo.proportion.cancel <= '100'"-->
<!--                >{{dataInfo.proportion.cancel}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#FF5722"-->
<!--                        v-if="dataInfo.proportion.cancel >= '60' && dataInfo.proportion.cancel < '90'"-->
<!--                >{{dataInfo.proportion.cancel}}%</p>-->
<!--                <p-->
<!--                        class="f28rem"-->
<!--                        style="color:#009688"-->
<!--                        v-if="dataInfo.proportion.cancel < '60'"-->
<!--                >{{dataInfo.proportion.cancel}}%</p>-->
<!--                <p class="f20rem">取消率</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="clear0"></div>-->
<!--          </div>-->
<!--        </template>-->
<!--        <div class="clear4 bg-white1"></div>-->


<!--      </div>-->

      <div class="clear0"></div>

      <div class="wb100">
        <div class="pa20 lh60rem">
          <div class="wb50 fl fc-gray3">
            <p class="f26rem pal20">任务总数（条）</p>
            <p class="f40rem fc-green pal20">{{taskInfo.taskCount}}</p>

            <div class="clear4"></div>
            <div class="pal20 lh40rem">
              <div class="wb50 fl">
                <p class="f24rem fc-gray3">已完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.taskFinishCount}}</p>
              </div>
              <div class="wb50 fr">
                <p class="f24rem fc-gray3">未完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.taskNotFinishCount}}</p>
              </div>
            </div>
          </div>
          <div class="wb50 fl">
            <p class="f26rem pal20">回访总数（条）</p>
            <p class="f40rem fc-green pal20">{{taskInfo.reviewCount}}</p>

            <div class="clear4"></div>
            <div class="pal20 lh40rem">
              <div class="wb50 fl">
                <p class="f24rem fc-gray3">已完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.reviewFinishCount}}</p>
              </div>
              <div class="wb50 fr">
                <p class="f24rem fc-gray3">未完成</p>
                <p class="f28rem fc-gray4">{{taskInfo.reviewNotFinishCount}}</p>
              </div>
            </div>
          </div>

          <div class="clear2"></div>
        </div>
      </div>

      <div class="clear0"></div>
    </div>

    <div class="clear4 bg-white1"></div>

    <div class="wb100">
      <div class="pa20">
        <p class="lh50rem f30rem fc-gray4">生日提醒</p>
        <div class="clear2 bor-solid-1b bd-gray"></div>
        <div class="clear2"></div>

        <div class="wb100 f28rem fc-gray3">
          <template v-for="item in birthdayList">
            <a :href="'customer.html#/CustomerDetails?id=' + item.id">
              <div class="wb100 relative lh50rem h50rem fc-gray3">
                <span class="fl">{{item.name}} {{ item.sex.value == 0 ? '（女士）' : '（先生）' }}</span>
                <span class="fr fc-gray4">{{item.birthtoday}}</span>
                <span class="fr mar50">{{item.mobile}}</span>
              </div>
            </a>
          </template>
        </div>
      </div>
    </div>

    <div class="clear0"></div>

    <div class="clear8 bg-white1"></div>

    <!--   footer   -->
    <Footer :active="0" v-show="!loading"></Footer>

  </div>
</template>
<script>
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {
  getManagement,
  taskStatistics,
  getBirthdayReminders,
  logout
} from "@/assets/api/Data/Data";

import { getUserInfo } from "@/assets/api/Data/Login";

export default {
  data() {
    return {
      minHeight: 0,
      arrs: ["本月", "今日", "昨日", "上周", "本年"],
      curIndex: 0,
      title: '',
      role_id: -1,
      loading: true,
      currentRate: 0,
      startTime: "",
      endTime: "",
      isWeixin: false,
      dataInfo: {
        actual: {
          appointment: ""
        },
        target: {
          appointment: ""
        },
        proportion: {
          appointment: 0
        }
      },
      taskInfo: {},
      birthdayList: []
    };
  },
  components: {
    Footer,
    Header
  },
  methods: {

    changeIndex(index) {

      this.curIndex = index;
      let date = new Date();
      if (index == 0) {
        //本月
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-1 00:00:00`;

        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));

      } else if (index == 1) {
        //今日
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 2) {
        //昨日
        let count = -1;
        date = new Date(date.getTime() + 86400 * 1000 * count);
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 3) {
        //上周
        let week = date.getDay();
        let count = 0;

        if (week == 0) {
          count = -5;
        } else {
          count = week * -1 + 1;
        }
        date = new Date(date.getTime() + 86400 * 1000 * (count - 7));
        let date2 = new Date(date.getTime() + 86400 * 1000 * 6);
        let startTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));
        let endTime = `${date2.getFullYear()}-${date2.getMonth() +1}-${date2.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      } else if (index == 4) {
        //本年
        let startTime = `${date.getFullYear()}-1-1 00:00:00`;
        this.startTime = this.$base.getDateStr(this.$base.stringToDate(startTime));

        let endTime = `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} 23:59:59`;
        this.endTime = this.$base.getDateStr(this.$base.stringToDate(endTime));
      }

        this.loading = true;

        getManagement({startTime: this.startTime, endTime: this.endTime}).then((res)=>{
            let _tmp = res.data;
            _tmp.proportion.appointment = Number.parseFloat(_tmp.proportion.appointment);
            _tmp.proportion.cancel = Number.parseFloat(_tmp.proportion.cancel);
            _tmp.proportion.consume = Number.parseFloat(_tmp.proportion.consume);
            _tmp.proportion.payment = Number.parseFloat(_tmp.proportion.payment);
            _tmp.proportion.price = Number.parseFloat(_tmp.proportion.price);
            this.dataInfo = _tmp;
            this.loading = false
        }).catch((e)=>{
            console.log(e)
        });

        taskStatistics({startTime: this.startTime, endTime: this.endTime}).then((res)=>{
            this.taskInfo = res.data;
            this.loading = false
        }).catch((e)=>{
            console.log(e)
        })

    },

    logoutMy(){
        logout({}).then((res)=>{
            if(res.status == 0){
                localStorage.removeItem("webToken");
                window.location.href = 'login.html?isBack=true'
            }
        }).catch((e)=>{
            console.log(e)
        })
    },

  },
  mounted() {

      let _date = this.$route.query.date

      this.minHeight = window.innerHeight;

      if(_date){
        this.changeIndex(Number.parseInt(_date));
      }else{
        this.changeIndex(0);
      }

      getBirthdayReminders().then((res)=>{
          this.birthdayList = res.data.list
      }).catch((e)=>{
          console.log(e)
      });

      //查询权限
      getUserInfo().then((res)=>{
        if(res.status == 0){
          this.role_id = res.data.role_id;

          this.role_id = 3;


          if( res.data.role_id == 2)  this.title = '店长首页';
          if( res.data.role_id == 3)  this.title = '顾问首页';
          if( res.data.role_id == 4)  this.title = '美容师首页';
          if( res.data.role_id == 5)  this.title = '前台首页';

          let ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger"){
            window.document.title = this.title
          }
        }
      }).catch((e)=>{
        console.log(e)
      });

      //判断是否微信内核
      let ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger"){
        this.isWeixin = true
      }else{
        this.isWeixin = false
      }

  }
};
</script>
<style scoped>
.el-p-circle {
  width: 126px;
  height: 56px;
  padding: 35px 0;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 9;
  text-align: center;
  line-height: 28px;
}
</style>



    
