<template>
  <div class="Target">
    <!-- <div class="shop_target">
      <h3>门店目标</h3>
      <div class="box" v-if="!loading">
        <Card type="0" height="150" :data="SaleList"></Card>
        <Card type="0" height="150" :data="DeductionList"></Card>
        <Card type="0" height="150" :data="MakeABargainOne"></Card>
        <Card type="0" height="150" :data="consumeHeadList"></Card>
        <Card type="0" height="150" :data="MakeABargainTow"></Card>
        <Card type="0" height="150" :data="ConsumptionList"></Card>
      </div>

      <div class="data_screening">
        <div class="dataLi">
          <div class="num">{{totalData.surplusPrice | _filterNumFormat}}</div>
          <div class="text">
            总销耗业绩（元）
            <el-tooltip content="总销耗业绩统计的是门店所有剩余划扣总金额，不随查询条件变化而变化；" placement="bottom-start" effect="light"> 
              <i class="iconfont iconiconfontwenhao1 f14px pointer" style="color:#EC414D;"></i> 
            </el-tooltip>
          </div>
        </div>
        <em></em>
        <div class="dataLi">
          <div class="num">{{totalData.appointmentStoreNumber}}</div>
          <div class="text">到店人次（次）</div>
        </div>
        <em></em>
        <div class="dataLi">
          <div class="num">{{totalData.appointmentNumber}}</div>
          <div class="text">预约人次（次）</div>
        </div>
        <em></em>
        <div class="dataLi">
          <div class="num">{{totalData.rate | _RateFormat}}</div>
          <div class="text">
            成交率
            <el-tooltip content="成交率=成交人次/到店人次；" placement="bottom-start" effect="light"> 
              <i class="iconfont iconiconfontwenhao1 f14px pointer mal10" style="color:#EC414D;"></i> 
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>-->

    <div class="shop_data" v-loading="loading" style="margin: 20px 20px 0;">
      <div class="shop_data_left">
        <header>
          <div class="text">门店数据</div>
          <div class="titles_date">
            <a @click="ThisMonthClick" v-show="ThisMonthIsShow">回到本月</a>
            <div>
              <span>
                {{timeActiveIsShow ? timeActive : timeActive1}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <ul>
                <li
                  v-for="(item, index) in timeDataList"
                  :key="index"
                  @click="timeClick(item)"
                >{{item.time}}</li>
              </ul>
            </div>
            <em></em>
            <p class="fc-gray3" @click="$router.push({name:'MonthlyDataDetails'})">月度数据明细</p>
            <em></em>
            <p @click="todayClick" :class="toDayIsShow ?'fc-gray2' : 'fc-gray4'">今日实时数据</p>
          </div>
        </header>

        <div class="shop_data_box">
          <div class="market box1">
            <div class="text1">销售业绩（元）</div>
            <div class="number">{{SaleList.Total | _filterNumFormat}}</div>
            <ul>
              <li>
                <span>成交人头（人）</span>
                <p>{{MakeABargainOne.Total}}</p>
              </li>
              <li>
                <span>成交人次（次）</span>
                <p>{{MakeABargainTow.Total}}</p>
              </li>
            </ul>
            <div class="icon">
              <img src="@/shop/assets/img/icon_a6.png" alt>
            </div>
          </div>
          <div class="deduct box1">
            <div class="text1">划扣业绩（元）</div>
            <div class="number">{{DeductionList.Total | _filterNumFormat}}</div>
            <ul>
              <li>
                <span>划扣人头（人）</span>
                <p>{{consumeHeadList.Total}}</p>
              </li>
              <li>
                <span>划扣人次（次）</span>
                <p>{{ConsumptionList.Total}}</p>
              </li>
            </ul>
            <div class="icon">
              <img src="@/shop/assets/img/icon_a5.png" alt>
            </div>
          </div>
          <div class="reach_the_store">
            <ul>
              <li>
                <span>到店人次（次）</span>
                <p>{{totalData.appointmentStoreNumber}}</p>
              </li>
              <li>
                <span>预约人次（次）</span>
                <p>{{totalData.appointmentNumber}}</p>
              </li>
            </ul>
            <div class="reach_the_store_box">
              <div>
                <el-progress
                  type="circle"
                  :percentage="totalData.rateTow"
                  :width="120"
                  :stroke-width="10"
                  color="#009688"
                ></el-progress>
              </div>
              <div class="text">
                成交率
                <el-tooltip content="成交率=成交人次/到店人次；" placement="bottom-start" effect="light">
                  <i
                    class="iconfont iconiconfontwenhao1 f14px pointer mal10"
                    style="color:#EC414D;"
                  ></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shop_data_right">
        <div class="shop_data_right_box">
          <div class="text">
            总未划扣金额（元）
            <el-tooltip
              content="总未划扣金额统计的是门店所有剩余划扣总金额，不随查询条件变化而变化；"
              placement="bottom-start"
              effect="light"
            >
              <i class="iconfont iconiconfontwenhao1 f14px pointer" style="color:#EC414D;"></i>
            </el-tooltip>
          </div>
          <div class="number">{{totlePrice | _filterNumFormat}}</div>
          <div class="check_the_details" @click="$router.push({name:'ConsumeDetails'})">查看明细>></div>
          <div class="icon">
            <img src="@/shop/assets/img/icon_a4.png" alt>
          </div>
        </div>
      </div>
    </div>

    <div class="clear4"></div>

    <div class="pal24 par24" v-loading="listloading">
      <div class="pal20 par20 pab20 bg-white">
        <!-- <span class="fc-gray4 f16px h20px lh20px">员工目标 <span class="f16px mal20" style="color:#EC414D;">点击可查看相应数据排名情况</span></p> -->
        <div class="list_title">
          <div class="list_title_left">
            <p
              :class="listTitleIndex == 0 ? 'active' :''"
              @click="listTitleIndex = 0; tabIndex = 0;listData()"
            >
              <b>{{$store.getters.roleName.adviser}}目标排名</b>
              <i></i>
            </p>
            <em></em>
            <p
              :class="listTitleIndex == 1 ? 'active' :''"
              @click="listTitleIndex = 1; tabIndex = 0;listData()"
            >
              <b>{{$store.getters.roleName.technician}}目标排名</b>
              <i></i>
            </p>
            <em></em>
            <p
              :class="listTitleIndex == 2 ? 'active' :''"
              @click="listTitleIndex = 2; tabIndex = 0;listData()"
            >
              <b>门店目标</b>
              <i></i>
            </p>
            <!-- <span class="f16px mal20" style="color:#EC414D;">点击可查看相应数据排名情况</span> -->
          </div>
          <div class="list_title_right">
            <el-dropdown
              trigger="click"
              @command="handleCommand"
              @visible-change="userMessageShowFn"
            >
              <span class="el-dropdown-link el-cursor">
                {{timeListActive.startTime + '至' + timeListActive.endTime}}
                <i
                  class="iconfont iconshangla-copy f20px"
                  v-if="userMessageShow"
                ></i>
                <i class="iconfont iconxiala f20px" v-else></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item , index) in time_list"
                  :key="index"
                  :command="item"
                >{{item.start_time + '至'+ item.stop_time }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="list_remark" v-if="listTitleIndex == 0 || listTitleIndex == 1">
          <p>点击下方箭头</p>
          <i class="iconfont iconpaixu-copy"></i>
          <p>可查看相应数据排名情况</p>
        </div>

        <!--<div class="clear4"></div>

         <div class="wb100 bg-white1">
          <template v-for="(item, index) in arrs">
            <div
              class="w110px h50px lh50px fl text-center pointer"
              :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-gray' : 'fc-gray3'"
              @click="tabIndex = index"
            >{{item}}</div>
          </template>
          <div class="clear0"></div>
        </div>-->

        <div class="clear4"></div>

        <!--    style="transform: scale(1.1);"-->
        <template v-if="listTitleIndex == 0">
          <div class="wb100 text-center fc-gray4 bd-gray bd-a1 relative">
            <div class="wb100 h44px lh44px bg-white1">
              <div class="wb4 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">排名</div>
              </div>
              <div class="wb13 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">员工</div>
              </div>
              <div class="wb13 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">岗位</div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 0">
                    销售业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">销售业绩</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                        @click="tabIndex = 0"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 1">
                    成交人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人头</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
              <div class="wb14 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 2">
                    成交人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人次</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 3">
                    划扣人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人头</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
              <div class="wb14 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 4">
                    划扣人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人次</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
            </div>

            <div class="clear0"></div>

            <template v-for="(item, index) in list">
              <div class="wb4 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{index + 1}}</div>
              </div>
              <div class="wb13 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{item.name}}</div>
              </div>
              <div class="wb13 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{item.role_id == 3 ? $store.getters.roleName.adviser : $store.getters.roleName.technician}}</div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标业绩：
                      <span class="fc-blue7" v-if="item.target.payment ===''">--</span>
                      <span v-else>{{item.target.payment}}</span>

                      <!-- <span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                         <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.payment | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span :class="item.className3">{{item.proportion.payment | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人头
                      <span class="fc-blue7" v-if="item.target.orderCustomer ===''">--</span>
                      <span v-else>{{item.target.orderCustomer}}</span>

                      <!--<span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                       <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.orderCustomer | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className1"
                      >{{item.proportion.orderCustomer | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb14 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人次：
                      <span class="fc-blue7" v-if="item.target.orderCustomerQuantity ===''">--</span>
                      <span v-else>{{item.target.orderCustomerQuantity}}</span>
                      <!--
                      <span v-if="item.target.consumeNumber != 0">{{item.target.consumeNumber}}</span>
                       <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className2"
                      >{{item.proportion.orderCustomerQuantity | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="wb14 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人头：
                      <span class="fc-blue7" v-if="item.target.consumeHead ===''">--</span>
                      <span v-else>{{item.target.consumeHead}}</span>
                      <!--
                      <span v-if="item.target.orderCustomer != 0">{{item.target.orderCustomer}}</span>
                       <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.consumeHead | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className5"
                      >{{item.proportion.consumeHead | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb14 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人次：
                      <span class="fc-blue7" v-if="item.target.consumeNumber ===''">--</span>
                      <span v-else>{{item.target.consumeNumber}}</span>

                      <!-- <span
                        v-if="item.target.orderCustomerQuantity != 0"
                      >{{item.target.orderCustomerQuantity}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.consumeNumber | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className6"
                      >{{item.proportion.consumeNumber | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="clear0"></div>
            </template>

            <div class="clear0"></div>

            <div
              class="wb16 absolute bg-white radius2 over-hidden"
              :style="'top: -10px; left: '+ (28 + tabIndex * 14) +'%; z-index: 9; box-shadow: 0 0 10px #e5e5e5;'"
            >
              <div class="wb100 h50px lh50px text-left bg-orange fc-white">
                <template v-if="tabIndex == 0">
                  <p class="pal20">
                    销售业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">销售业绩</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>

                <template v-if="tabIndex == 1">
                  <p class="pal20">
                    成交人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人头</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 2">
                  <p class="pal20">
                    成交人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人次</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>

                <template v-if="tabIndex == 3">
                  <p class="pal20">
                    划扣人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人头</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 4">
                  <p class="pal20">
                    划扣人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人次</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
              </div>
              <div class="wb100">
                <template v-for="item  in list ">
                  <div class="wb100 h120px">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <template v-if="tabIndex == 0">
                        <p>
                          目标业绩：
                          <span class="fc-blue7" v-if="item.target.payment ===''">--</span>
                          <span v-else>{{item.target.payment}}</span>
                          <!--
                          <span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                          <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.payment | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className3"
                          >{{item.proportion.payment | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 1">
                        <p>
                          目标人头：
                          <span class="fc-blue7" v-if="item.target.orderCustomer ===''">--</span>
                          <span v-else>{{item.target.orderCustomer}}</span>
                          <!--
                          <span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.orderCustomer | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className1"
                          >{{item.proportion.orderCustomer | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 2">
                        <p>
                          目标人次：
                          <span class="fc-blue7" v-if="item.target.orderCustomerQuantity ===''">--</span>
                          <span v-else>{{item.target.orderCustomerQuantity}}</span>
                          <!-- 
                          <span
                            v-if="item.target.consumeNumber != 0"
                          >{{item.target.consumeNumber}}</span>
                         <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className2"
                          >{{item.proportion.orderCustomerQuantity | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 3">
                        <p>
                          目标人头：
                          <span class="fc-blue7" v-if="item.target.consumeHead ===''">--</span>
                          <span v-else>{{item.target.consumeHead}}</span>

                          <!--<span
                            v-if="item.target.orderCustomer != 0"
                          >{{item.target.orderCustomer}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.consumeHead | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className5"
                          >{{item.proportion.consumeHead | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 4">
                        <p>
                          目标人次：
                          <span
                            class="fc-blue7"
                            v-if="item.target.consumeNumber ===''"
                          >--</span>
                          <span v-else>{{item.target.consumeNumber}}</span>

                          <!--<span
                            v-if="item.target.orderCustomerQuantity != 0"
                          >{{item.target.orderCustomerQuantity}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.consumeNumber | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className6"
                          >{{item.proportion.consumeNumber | _FloatFormat}}%</span>
                        </p>
                      </template>
                    </div>
                  </div>
                </template>
              </div>

              <div class="clear4"></div>
            </div>
          </div>
        </template>

        <template v-else-if="listTitleIndex == 1">
          <div class="wb100 text-center fc-gray4 bd-gray bd-a1 relative">
            <div class="wb100 h44px lh44px bg-white1">
              <div class="wb4 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">排名</div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">员工</div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">岗位</div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 0">
                    销售业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">销售业绩</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
              
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 1">
                    成交人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人头</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 2">
                    成交人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人次</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>

              

              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 3">
                    划扣业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣业绩</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>

              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 4">
                    划扣人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人头</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                  <p class="pal20 text-left el-cursor" @click="tabIndex = 5">
                    划扣人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人次</font> 排名
                        </span>
                      </template>
                      <i
                        class="icon iconfont iconpaixu-copy fr par10 f20px lh38px fc-gray2 el-cursor"
                      ></i>
                    </el-tooltip>
                  </p>
                </div>
              </div>
            </div>

            <div class="clear0"></div>

            <template v-for="(item, index) in list">
              <div class="wb4 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{index + 1}}</div>
              </div>
              <div class="wb12 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{item.name}}</div>
              </div>
              <div class="wb12 fl h120px lh120px">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">{{item.role_id == 3 ? $store.getters.roleName.adviser : $store.getters.roleName.technician}}</div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标业绩：
                      <span class="fc-blue7" v-if="item.target.payment ===''">--</span>
                      <span v-else>{{item.target.payment}}</span>

                      <!--<span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                         <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.payment | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span :class="item.className3">{{item.proportion.payment | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人头：
                      <span class="fc-blue7" v-if="item.target.orderCustomer ===''">--</span>
                      <span v-else>{{item.target.orderCustomer}}</span>

                      <!--<span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                       <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.orderCustomer | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className1"
                      >{{item.proportion.orderCustomer | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人次：
                      <span class="fc-blue7" v-if="item.target.orderCustomerQuantity ===''">--</span>
                      <span v-else>{{item.target.orderCustomerQuantity}}</span>

                      <!-- <span v-if="item.target.consumeNumber != 0">{{item.target.consumeNumber}}</span>
                      <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className2"
                      >{{item.proportion.orderCustomerQuantity | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <template v-if="item.role_id == 3">
                    <p class="fc-gray3 h120px lh120px text-left pal20">岗位无划扣业绩</p>
                  </template>
                  <template v-else>
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <p>
                        目标业绩：
                        <span class="fc-blue7" v-if="item.target.consumePrice ===''">--</span>
                        <span v-else>{{item.target.consumePrice}}</span>

                        <!--<span v-if="item.target.consumePrice != 0">{{item.target.consumePrice}}</span>
                         <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                        <span class="fc-blue7" v-else>--</span>-->
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.consumePrice | _FloatFormat}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span
                          :class="item.className4"
                        >{{item.proportion.consumePrice | _FloatFormat}}%</span>
                      </p>
                    </div>
                  </template>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人头：
                      <span class="fc-blue7" v-if="item.target.consumeHead ===''">--</span>
                      <span v-else>{{item.target.consumeHead}}</span>

                      <!--<span v-if="item.target.orderCustomer != 0">{{item.target.orderCustomer}}</span>
                       <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.consumeHead | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className5"
                      >{{item.proportion.consumeHead | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="wb12 fl">
                <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                  <div class="pal20 lh30px pat15 pab15 text-left">
                    <p>
                      目标人次：
                      <span class="fc-blue7" v-if="item.target.consumeNumber ===''">--</span>
                      <span v-else>{{item.target.consumeNumber}}</span>

                      <!-- <span
                        v-if="item.target.orderCustomerQuantity != 0"
                      >{{item.target.orderCustomerQuantity}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                      <span class="fc-blue7" v-else>--</span>-->
                    </p>
                    <p class="fc-gray3">已完成：{{item.actual.consumeNumber | _FloatFormat}}</p>
                    <p class="fc-gray3">
                      完成率：
                      <span
                        :class="item.className6"
                      >{{item.proportion.consumeNumber | _FloatFormat}}%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="clear0"></div>
            </template>

            <div class="clear0"></div>

            <div
              class="wb14 absolute bg-white radius2 over-hidden"
              :style="'top: -10px; left: '+ (27 + tabIndex * 12) +'%; z-index: 9; box-shadow: 0 0 10px #e5e5e5;'"
            >
              <div class="wb100 h50px lh50px text-left bg-orange fc-white">
                <template v-if="tabIndex == 0">
                  <p class="pal20">
                    销售业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">销售业绩</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                
                <template v-if="tabIndex == 1">
                  <p class="pal20">
                    成交人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人头</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 2">
                  <p class="pal20">
                    成交人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">成交人次</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 3">
                  <p class="pal20">
                    划扣业绩(元)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣业绩</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 4">
                  <p class="pal20">
                    划扣人头(人)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人头</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
                <template v-if="tabIndex == 5">
                  <p class="pal20">
                    划扣人次(次)
                    <el-tooltip placement="bottom-start" effect="light">
                      <template slot="content">
                        <span>
                          点击查看
                          <font color="#FF5722">划扣人次</font> 排名
                        </span>
                      </template>
                      <i class="icon iconfont iconpaixu-copy fr par10 f20px lh44px"></i>
                    </el-tooltip>
                  </p>
                </template>
              </div>
              <div class="wb100">
                <template v-for="item  in list ">
                  <div class="wb100 h120px">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <template v-if="tabIndex == 0">
                        <p>
                          目标业绩：
                          <span class="fc-blue7" v-if="item.target.payment ===''">--</span>
                          <span v-else>{{item.target.payment}}</span>

                          <!-- <span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                          <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.payment | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className3"
                          >{{item.proportion.payment | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 1">
                        <p>
                          目标人头：
                          <span class="fc-blue7" v-if="item.target.orderCustomer ===''">--</span>
                          <span v-else>{{item.target.orderCustomer}}</span>

                          <!--<span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.orderCustomer | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className1"
                          >{{item.proportion.orderCustomer | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 2">
                        <p>
                          目标人次：
                          <span class="fc-blue7" v-if="item.target.orderCustomerQuantity ===''">--</span>
                          <span v-else>{{item.target.orderCustomerQuantity}}</span>

                          <!--<span
                            v-if="item.target.consumeNumber != 0"
                          >{{item.target.consumeNumber}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className2"
                          >{{item.proportion.orderCustomerQuantity | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 3">
                        <template v-if="item.role_id == 3">
                          <p class="fc-gray3 h120px lh120px text-left pal20">岗位无划扣业绩</p>
                        </template>
                        <template v-else>
                          <p>
                            目标业绩：
                            <span class="fc-blue7" v-if="item.target.consumePrice ===''">--</span>
                            <span v-else>{{item.target.consumePrice}}</span>

                            <!-- <span
                              v-if="item.target.consumePrice != 0"
                            >{{item.target.consumePrice}}</span>
                            <span
                              class="fc-blue7"
                              @click="$router.push({name:'SetTarget'})"
                              v-else
                            >未设置</span>-->
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.consumePrice | _FloatFormat}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span
                              :class="item.className4"
                            >{{item.proportion.consumePrice | _FloatFormat}}%</span>
                          </p>
                        </template>
                      </template>
                      <template v-if="tabIndex == 4">
                        <p>
                          目标人头：
                          <span class="fc-blue7" v-if="item.target.consumeHead ===''">--</span>
                          <span v-else>{{item.target.consumeHead}}</span>

                          <!--<span
                            v-if="item.target.orderCustomer != 0"
                          >{{item.target.orderCustomer}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.consumeHead | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className5"
                          >{{item.proportion.consumeHead | _FloatFormat}}%</span>
                        </p>
                      </template>
                      <template v-if="tabIndex == 5">
                        <p>
                          目标人次：
                          <span
                            class="fc-blue7"
                            v-if="item.target.consumeNumber ===''"
                          >--</span>
                          <span v-else>{{item.target.consumeNumber}}</span>
                          <!--<span
                            v-if="item.target.orderCustomerQuantity != 0"
                          >{{item.target.orderCustomerQuantity}}</span>
                           <span class="fc-blue7 el-cursor" @click="$router.push({name:'SetTarget'})" v-else>未设置</span> 
                          <span class="fc-blue7" v-else>--</span>-->
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.consumeNumber | _FloatFormat}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span
                            :class="item.className6"
                          >{{item.proportion.consumeNumber | _FloatFormat}}%</span>
                        </p>
                      </template>
                    </div>
                  </div>
                </template>
              </div>

              <div class="clear4"></div>
            </div>
          </div>
        </template>

        <template v-if="listTitleIndex == 2">
          <div class="shop_target_div" v-if="listDataShopTargetLading">
            <div class="shop_target_box">
              <h4>销售业绩（元）</h4>
              <ul>
                <li>
                  <span>目标业绩</span>
                  <p v-if="listDataShopTarget.target.payment === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.payment}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.payment}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.paymentTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>

            <div class="shop_target_box">
              <h4>成交人头（人）</h4>
              <ul>
                <li>
                  <span>目标人头</span>
                  <p v-if="listDataShopTarget.target.orderCustomer === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.orderCustomer}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.orderCustomer}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.orderCustomerTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>

            <div class="shop_target_box">
              <h4>成交人次（次）</h4>
              <ul>
                <li>
                  <span>目标人次</span>
                  <p v-if="listDataShopTarget.target.orderCustomerQuantity === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.orderCustomerQuantity}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.orderCustomerQuantity}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.orderCustomerQuantityTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>

            <div class="shop_target_box">
              <h4>划扣业绩（元）</h4>
              <ul>
                <li>
                  <span>目标业绩</span>
                  <p v-if="listDataShopTarget.target.consumePrice === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.consumePrice}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.consumePrice}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.consumePriceTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>

            <div class="shop_target_box">
              <h4>划扣人头（人）</h4>
              <ul>
                <li>
                  <span>目标人头</span>
                  <p v-if="listDataShopTarget.target.consumeHead === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.consumeHead}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.consumeHead}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.consumeHeadTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>

            <div class="shop_target_box">
              <h4>划扣人次（次）</h4>
              <ul>
                <li>
                  <span>目标人次</span>
                  <p v-if="listDataShopTarget.target.consumeNumber === ''">--</p>
                  <p v-else>{{listDataShopTarget.target.consumeNumber}}</p>
                </li>
                <li>
                  <span>已完成</span>
                  <p>{{listDataShopTarget.actual.consumeNumber}}</p>
                </li>
              </ul>
              <div class="reach_the_store_box">
                <div class="progressbar">
                  <el-progress
                    type="circle"
                    :percentage="listDataShopTarget.proportion.consumeNumberTow"
                    :width="120"
                    :stroke-width="10"
                    color="#009688"
                  ></el-progress>
                </div>
                <div class="text">完成率</div>
              </div>
            </div>
          </div>
        </template>

        <div class="clear4"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "../../../../components/home/Card";
import { getTargetList, getTime, consumeSurplus } from "@/shop/assets/api/home/home";
export default {
  name: "Target",
  data() {
    return {
      arrs: [
        "划扣人头",
        "划扣人次",
        "销售业绩",
        "划扣业绩",
        "成交人头",
        "成交人次"
      ],
      tabIndex: 0,

      // 人头
      consumeHeadList: [],
      // 人次
      ConsumptionList: [],
      // 划扣
      DeductionList: [],
      // 销售
      SaleList: [],
      //成交人头
      MakeABargainOne: [],
      //成交人次
      MakeABargainTow: [],
      loading: false,
      listloading: false,

      // 顾问列表
      adviserList: [],
      // 美容师列表
      BeauticianList: [],
      list: [],
      totalData: {},
      listDataShopTarget: {},
      listDataShopTargetLading: false,

      listTitleIndex: 0,
      userMessageShow: false,
      timeListActive: {
        startTime: "",
        endTime: ""
      },
      time_list: [],

      timeActiveIsShow: true,
      ThisMonthIsShow: false,
      timeDataList: [],
      timeActive: "",
      timeActive1: "",
      toDayIsShow: true,
      // timeActiveIsShow: true,

      totlePrice: 0
    };
  },
  props: {
    // time
    time: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Card
  },
  methods: {
    getTimeFn() {
      getTime({})
        .then(res => {
          this.time_list = res.data.list;
          let _flag = false;
          let timeData = "";
          let d = new Date();
          for (let i = 0; i < this.time_list.length; i++) {
            const element = this.time_list[i];
            let startTime = this.$base.dateTimeToDate(
              element.start_time,
              "time"
            );
            let endTime = this.$base.dateTimeToDate(element.stop_time, "time");
            let timestamp = d.getTime();
            if (timestamp >= startTime && timestamp <= endTime) {
              _flag = true;
              timeData = {
                startTime: element.start_time,
                endTime: element.stop_time
              };
              break;
            }
          }

          if (_flag) {
            this.timeListActive = timeData;
          } else {
            this.timeListActive = {
              startTime: this.$base.getCurrentMonthFirst(),
              endTime: this.$base.getCurrentMonthLast()
            };
          }

          this.listData();
        })
        .catch(error => {
          console.log("getTime no");
        });
    },

    handleCommand(item) {
      this.timeListActive = {
        startTime: item.start_time,
        endTime: item.stop_time
      };
      this.listData();
    },
    userMessageShowFn(v) {
      this.userMessageShow = v;
    },

    ThisMonthClick() {
      this.time.startTime = this.$base.getDateScope(0).startTime;
      this.time.endTime = this.$base.getDateScope(0).endTime;
      this.timeActiveIsShow = true;
      this.toDayIsShow = true;
      this.ThisMonthIsShow = false;
    },
    todayClick() {
      this.time.startTime = this.$base.getDateScope(1).startTime;
      this.time.endTime = this.$base.getDateScope(1).endTime;
      this.timeActiveIsShow = true;
      this.ThisMonthIsShow = true;
      this.toDayIsShow = false;
    },
    timeClick(item) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.timeActive1 = item.time;
      if (item.time == mydate) {
        this.ThisMonthIsShow = false;
      } else {
        this.ThisMonthIsShow = true;
      }
      this.timeActiveIsShow = false;
      this.toDayIsShow = true;
      this.time.startTime = item.startTime;
      this.time.endTime = item.endTime;
    },
    dataList() {
      this.loading = true;
      let timeData = {
        startTime: this.time.startTime,
        endTime: this.time.endTime,
        order: this.tabIndex + 1
      };
      getTargetList(timeData)
        .then(res => {
          this.timeDataList = res.data.total.date;
          this.timeActive = res.data.total.date[0].time;
          if (res.status == 0) {
            let consumeHeadList = {};
            let ConsumptionList = {};
            let DeductionList = {};
            let SaleList = {};
            let MakeABargainOne = {};
            let MakeABargainTow = {};

            consumeHeadList.title = "划扣人头（人）";
            consumeHeadList.target = "目标人头";
            consumeHeadList.text = "人";
            consumeHeadList.grayIsShow = true;
            consumeHeadList.Completed = res.data.total.target.consumeHead;
            consumeHeadList.Percentage =
              res.data.total.proportion.consumeHead + "%";
            consumeHeadList.Total = res.data.total.actual.consumeHead;

            ConsumptionList.title = "划扣人次（次）";
            ConsumptionList.target = "目标人次";
            ConsumptionList.text = "次";
            ConsumptionList.grayIsShow = true;
            ConsumptionList.Completed = res.data.total.target.consumeNumber;
            ConsumptionList.Percentage =
              res.data.total.proportion.consumeNumber + "%";
            ConsumptionList.Total = res.data.total.actual.consumeNumber;

            DeductionList.title = "划扣业绩（元）";
            DeductionList.target = "目标业绩";
            DeductionList.text = "元";
            DeductionList.grayIsShow = true;
            DeductionList.Completed = res.data.total.target.consumePrice;
            DeductionList.Percentage =
              res.data.total.proportion.consumePrice + "%";
            DeductionList.Total = res.data.total.actual.consumePrice;

            SaleList.title = "销售业绩（元）";
            SaleList.target = "目标业绩";
            SaleList.text = "元";
            SaleList.grayIsShow = true;
            SaleList.Completed = res.data.total.target.payment;
            SaleList.Percentage = res.data.total.proportion.payment + "%";
            SaleList.Total = res.data.total.actual.payment;

            MakeABargainOne.title = "成交人头（人）";
            MakeABargainOne.target = "目标人头";
            MakeABargainOne.text = "人";
            MakeABargainOne.grayIsShow = true;
            MakeABargainOne.Completed = res.data.total.target.orderCustomer;
            MakeABargainOne.Percentage =
              res.data.total.proportion.orderCustomer + "%";
            MakeABargainOne.Total = res.data.total.actual.orderCustomer;

            MakeABargainTow.title = "成交人次（次）";
            MakeABargainTow.target = "目标业绩";
            MakeABargainTow.text = "次";
            MakeABargainTow.grayIsShow = true;
            MakeABargainTow.Completed =
              res.data.total.target.orderCustomerQuantity;
            MakeABargainTow.Percentage =
              res.data.total.proportion.orderCustomerQuantity + "%";
            MakeABargainTow.Total = res.data.total.actual.orderCustomerQuantity;

            this.consumeHeadList = consumeHeadList;
            this.ConsumptionList = ConsumptionList;
            this.DeductionList = DeductionList;
            this.SaleList = SaleList;
            this.MakeABargainOne = MakeABargainOne;
            this.MakeABargainTow = MakeABargainTow;
            this.totalData = res.data.total.data;
            this.totalData.rateTow = parseFloat(res.data.total.data.rate);

            this.adviserList = [];
            this.BeauticianList = [];
            // if (res.data.memberData.length) {
            //   this.list = [];
            //   res.data.memberData.map((item, index) => {

            //     item.className1 = this.numData(item.proportion.consumeHead);
            //     item.className2 = this.numData(item.proportion.consumeNumber);
            //     item.className3 = this.numData(item.proportion.payment);
            //     item.className4 = this.numData(item.proportion.consumePrice);
            //     item.className5 = this.numData(item.proportion.orderCustomer);
            //     item.className6 = this.numData(item.proportion.orderCustomerQuantity);

            //     if (item.role_id == 3) {
            //       // 顾问列表
            //       this.adviserList.push(item);
            //     } else if (item.role_id == 4) {
            //       // 美容师列表
            //       this.BeauticianList.push(item);
            //     }
            //     this.list.push(item);
            //   });
            // }
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
          console.log("getTargetList no");
        });

      consumeSurplus().then(res => {
        if (res.status == 0) {
          this.totlePrice = res.data.count.price;
        }
      });
    },
    listData() {
      this.listloading = true;
      // let timeData = {
      //   startTime: this.timeListActive.startTime,
      //   endTime: this.timeListActive.endTime,
      //   order: this.tabIndex + 1
      // };
      let timeData = {};
      if (this.listTitleIndex == 0) {
        switch (this.tabIndex) {
          case 0:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 3
            };
            break;
          case 1:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 1
            };
            break;
          case 2:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 2
            };
            break;
          case 3:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 5
            };
            break;
          case 4:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 6
            };
            break;
        }
      } else if (this.listTitleIndex == 1) {
        switch (this.tabIndex) {
          case 0:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 3
            };
            break;
          case 1:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 1
            };
            break;
          case 2:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 2
            };
            break;
          case 3:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 4
            };
            break;
          case 4:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 5
            };
            break;
          case 5:
            timeData = {
              startTime: this.timeListActive.startTime,
              endTime: this.timeListActive.endTime,
              order: 6
            };
            break;
        }
      } else if (this.listTitleIndex == 2) {
        timeData = {
          startTime: this.timeListActive.startTime,
          endTime: this.timeListActive.endTime
        };
      }
      getTargetList(timeData)
        .then(res => {
          if (res.status == 0) {
            this.listDataShopTarget = res.data.total;
            // console.log(this.listDataShopTarget);
            this.listDataShopTarget.proportion.paymentTow = parseFloat(
              res.data.total.proportion.payment
            );
            this.listDataShopTarget.proportion.orderCustomerTow = parseFloat(
              res.data.total.proportion.orderCustomer
            );
            this.listDataShopTarget.proportion.orderCustomerQuantityTow = parseFloat(
              res.data.total.proportion.orderCustomerQuantity
            );
            this.listDataShopTarget.proportion.consumePriceTow = parseFloat(
              res.data.total.proportion.consumePrice
            );
            this.listDataShopTarget.proportion.consumeHeadTow = parseFloat(
              res.data.total.proportion.consumeHead
            );
            this.listDataShopTarget.proportion.consumeNumberTow = parseFloat(
              res.data.total.proportion.consumeNumber
            );
            if (res.data.memberData.length) {
              this.list = [];
              res.data.memberData.map((item, index) => {
                item.className1 = this.numData(item.proportion.consumeHead);
                item.className2 = this.numData(item.proportion.consumeNumber);
                item.className3 = this.numData(item.proportion.payment);
                item.className4 = this.numData(item.proportion.consumePrice);
                item.className5 = this.numData(item.proportion.orderCustomer);
                item.className6 = this.numData(
                  item.proportion.orderCustomerQuantity
                );
                if (this.listTitleIndex == 0 && item.role_id == 3) {
                  this.list.push(item);
                } else if (this.listTitleIndex == 1 && item.role_id == 4) {
                  this.list.push(item);
                }
                // if (item.role_id == 3) {
                //   // 顾问列表
                //   this.adviserList.push(item);
                // } else if (item.role_id == 4) {
                //   // 美容师列表
                //   this.BeauticianList.push(item);
                // }
                // this.list.push(item);
              });
            }
            this.listDataShopTargetLading = true;
            this.listloading = false;
          }
        })
        .catch(error => {
          console.log(error);
          console.log("getTargetList no");
        });
    },

    // 计算比较
    numData(str) {
      let num = Number.parseFloat(str);
      if (num < 60) {
        return "fc-red";
      } else if (num >= 60 && num < 90) {
        return "fc-orange";
      } else if (num >= 90 && num <= 100) {
        return "fc-green";
      } else if (num > 100) {
        return "full";
      }
    }
  },

  // 侦听器
  watch: {
    time: {
      deep: true,
      handler: function() {
        this.dataList();
      }
    },
    tabIndex(c, o) {
      this.listData();
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.dataList();
    this.getTimeFn();
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
@import "../index.scss";

.list_title {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  .list_title_left {
    display: flex;
    align-items: center;
    height: 50px;
    flex: 1;
    p {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      color: #999999;
      cursor: pointer;
      b {
        font-size: 16px;
        font-weight: normal;
      }
      i {
        width: 100%;
        height: 1px;
        background: #333;
        bottom: 0;
        left: 0;
        position: absolute;
        display: none;
      }
      &.active {
        color: #333;
        i {
          display: block;
        }
      }
    }
    em {
      width: 1px;
      height: 14px;
      background: #e5e5e5;
      margin: 0 0.1rem;
    }
  }
}
.list_remark {
  display: flex;
  height: 34px;
  align-items: center;
  border-left: 2px solid #fd8137;
  background: #fdf6ec;
  padding-left: 0.14rem;
  p {
    color: #fd8137;
    font-size: 14px;
  }
  i {
    color: #999;
    font-size: 18px;
    position: relative;
    top: -2px;
    padding: 0 0.06rem;
  }
}
.shop_target_div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .shop_target_box {
    overflow: hidden;
    width: 32.5%;
    border: 1px solid #e5e5e5;
    margin-bottom: 0.2rem;
    padding-bottom: 0.1rem;
    h4 {
      line-height: 44px;
      padding-left: 0.2rem;
      background: #f8f8f8;
      font-size: 14px;
      color: #333;
      font-weight: normal;
    }
    ul {
      // flex: 1;
      padding: 0.2rem 0.3rem;
      padding-right: 0;
      display: flex;
      float: left;
      width: 1.8rem;
      height: 1.5rem;
      flex-direction: column;
      justify-content: space-between;
      li {
        span {
          color: #666666;
          font-size: 14px;
        }
        p {
          font-size: 20px;
          color: #666666;
          font-weight: bold;
          padding-top: 0.1rem;
          overflow: hidden; /*自动隐藏文字*/
          text-overflow: ellipsis; /*文字隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
      }
    }
    .reach_the_store_box {
      width: 1.5rem;
      padding-top: 0.2rem;
      padding-right: 0.2rem;
      float: right;
      .progressbar {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text {
        text-align: center;
        padding-top: 0.1rem;
        color: #666666;
        font-size: 14px;
      }
    }
  }
}
</style>



    
