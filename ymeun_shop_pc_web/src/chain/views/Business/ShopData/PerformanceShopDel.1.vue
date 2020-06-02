<template>
  <div class="PerformanceShopDel">
    <header>
      <div class="text">
        <h3>
          <b>{{shopData.name}}</b>
          <span><i class="iconfont iconpaiming"></i></span>
          <a>01</a>
        </h3>
        <p>
          <span>面积：{{shopData.measure}}m<sup>2</sup> </span>
          <span>电话：{{shopData.phone}} </span>
          <span>地区：{{shopData.address}}</span>
        </p>
      </div>
      <div class="btns">
        <span><i class="iconfont iconmendian"></i></span>
        <p>店铺基本信息</p>
      </div>
    </header>

    <div class="content">
      <div class="tabs_title">
        <div>
          <p :class="tabState == '0' ? 'active' : ''" @click="tabStateFn(0)">
            <span>业绩数据</span>
            <em></em>
          </p>
          <p :class="tabState == '1' ? 'active' : ''" @click="tabStateFn(1)">
            <span>员工数据</span>
            <em></em>
          </p>
          <p :class="tabState == '2' ? 'active' : ''" @click="tabStateFn(2)">
            <span>划扣数据</span>
            <em></em>
          </p>
        </div>
      </div>

      <div class="essentialData" v-if="tabState == 0">
        <div class="cardList">
          <div class="taskBox">
            <div class="reach_the_store taskBox_left">
              <p>到店人数（人）</p>
              <div class="text">
                <!-- green绿  red红 full满 橙色 -->
                <a v-if="storeTotal.appointment_bai < 59" class="red">{{storeTotal.appointment}}</a>
                <a v-else-if="storeTotal.appointment_bai > 59 && storeTotal.appointment_bai <= 90" class="orange">{{storeTotal.appointment}}</a>
                <a v-else-if="storeTotal.appointment_bai > 90 && storeTotal.appointment_bai < 100" class="green">{{storeTotal.appointment}}</a>
                <a v-else-if="storeTotal.appointment_bai >= 100" class="full">{{storeTotal.appointment}}</a>
                <a v-else>{{storeTotal.appointment}}</a>
                <div v-if="storeTotal.appointment_quantity == '未设置'" class="details">（目标人数：{{storeTotal.appointment_quantity}}）</div>
                <div v-else class="details">（目标人数：{{storeTotal.appointment_quantity}}人）</div>
              </div>
              <div class="progress_box">
                <div>
                  <span v-if="storeTotal.appointment_bai < 59" class="red" :style="{width:storeTotal.appointment_proportion}"></span>
                  <span v-else-if="storeTotal.appointment_bai > 59 && storeTotal.appointment_bai <= 90" class="orange" :style="{width:storeTotal.appointment_proportion}"></span>
                  <span v-else-if="storeTotal.appointment_bai > 90 && storeTotal.appointment_bai < 100" class="green" :style="{width:storeTotal.appointment_proportion}"></span>
                  <span v-else-if="storeTotal.appointment_bai >= 100" class="full" :style="{width:storeTotal.appointment_proportion}"></span>
                </div>
                <a>完成率：
                  <span v-if="storeTotal.appointment_bai < 59" class="red">{{storeTotal.appointment_proportion}}</span>
                  <span v-else-if="storeTotal.appointment_bai > 59 && storeTotal.appointment_bai <= 90" class="orange">{{storeTotal.appointment_proportion}}</span>
                  <span v-else-if="storeTotal.appointment_bai > 90 && storeTotal.appointment_bai < 100" class="green">{{storeTotal.appointment_proportion}}</span>
                  <span v-else-if="storeTotal.appointment_bai >= 100" class="full">{{storeTotal.appointment_proportion}}</span>
                </a>
              </div>
            </div>
            <div class="market taskBox_right">
              <p>销售业绩（元）</p>
              <div class="text">
                <a v-if="storeTotal.payment_bai < 59" class="red">{{storeTotal.payment|NumFormat}}</a>
                <a v-else-if="storeTotal.payment_bai > 59 && storeTotal.payment_bai <= 90" class="orange">{{storeTotal.payment|NumFormat}}</a>
                <a v-else-if="storeTotal.payment_bai > 90 && storeTotal.payment_bai < 100" class="green">{{storeTotal.payment|NumFormat}}</a>
                <a v-else-if="storeTotal.payment_bai >= 100" class="full">{{storeTotal.payment|NumFormat}}</a>
                <a v-else>{{storeTotal.payment|NumFormat}}</a>
                <div v-if="storeTotal.payment_quantity == '未设置'" class="details">（目标业绩：{{storeTotal.payment_quantity}}）</div>
                <div v-else class="details">（目标业绩：{{storeTotal.payment_quantity|NumFormat}}元）</div>
              </div>
              <div class="progress_box">
                <div>
                  <span v-if="storeTotal.payment_bai < 59" class="red" :style="{width:storeTotal.payment_proportion}"></span>
                  <span v-else-if="storeTotal.payment_bai > 59 && storeTotal.payment_bai <= 90" class="orange" :style="{width:storeTotal.payment_proportion}"></span>
                  <span v-else-if="storeTotal.payment_bai > 90 && storeTotal.payment_bai < 100" class="green" :style="{width:storeTotal.payment_proportion}"></span>
                  <span v-else-if="storeTotal.payment_bai >= 100" class="full" :style="{width:storeTotal.payment_proportion}"></span>
                </div>
                <a>完成率：
                  <span v-if="storeTotal.payment_bai < 59" class="red">{{storeTotal.payment_proportion}}</span>
                  <span v-else-if="storeTotal.payment_bai > 59 && storeTotal.payment_bai <= 90" class="orange">{{storeTotal.payment_proportion}}</span>
                  <span v-else-if="storeTotal.payment_bai > 90 && storeTotal.payment_bai < 100" class="green">{{storeTotal.payment_proportion}}</span>
                  <span v-else-if="storeTotal.payment_bai >= 100" class="full">{{storeTotal.payment_proportion}}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="taskBox">
            <div class="deduct_money taskBox_left">
              <p>划扣业绩（元）</p>
              <div class="text">
                <a v-if="storeTotal.price_bai < 59" class="red">{{storeTotal.price|NumFormat}}</a>
                <a v-else-if="storeTotal.price_bai > 59 && storeTotal.price_bai <= 90" class="orange">{{storeTotal.price|NumFormat}}</a>
                <a v-else-if="storeTotal.price_bai > 90 && storeTotal.price_bai < 100" class="green">{{storeTotal.price|NumFormat}}</a>
                <a v-else-if="storeTotal.price_bai >= 100" class="full">{{storeTotal.price|NumFormat}}</a>
                <a v-else>{{storeTotal.price|NumFormat}}</a>
                <div v-if="storeTotal.price_quantity == '未设置'" class="details">（目标人次：{{storeTotal.price_quantity}}）</div>
                <div v-else class="details">（目标人次：{{storeTotal.price_quantity|NumFormat}}元）</div>
              </div>
              <div class="progress_box">
                <div>
                  <span v-if="storeTotal.price_bai < 59" class="red" :style="{width:storeTotal.price_proportion}"></span>
                  <span v-else-if="storeTotal.price_bai > 59 && storeTotal.price_bai <= 90" class="orange" :style="{width:storeTotal.price_proportion}"></span>
                  <span v-else-if="storeTotal.price_bai > 90 && storeTotal.price_bai < 100" class="green" :style="{width:storeTotal.price_proportion}"></span>
                  <span v-else-if="storeTotal.price_bai >= 100" class="full" :style="{width:storeTotal.price_proportion}"></span>
                </div>
                <a>完成率：
                  <span v-if="storeTotal.price_bai < 59" class="red">{{storeTotal.price_proportion}}</span>
                  <span v-else-if="storeTotal.price_bai > 59 && storeTotal.price_bai <= 90" class="orange">{{storeTotal.price_proportion}}</span>
                  <span v-else-if="storeTotal.price_bai > 90 && storeTotal.price_bai < 100" class="green">{{storeTotal.price_proportion}}</span>
                  <span v-else-if="storeTotal.price_bai >= 100" class="full">{{storeTotal.price_proportion}}</span>
                </a>
              </div>
            </div>
            <div class="deduct_num taskBox_right">
              <p>划扣人次（次）</p>
              <div class="text">
                <!-- green绿  red红 full满 orange橙色 -->
                <a v-if="storeTotal.consume_bai < 59" class="red">{{storeTotal.consume}}</a>
                <a v-else-if="storeTotal.consume_bai > 59 && storeTotal.consume_bai <= 90" class="orange">{{storeTotal.consume}}</a>
                <a v-else-if="storeTotal.consume_bai > 90 && storeTotal.consume_bai < 100" class="green">{{storeTotal.consume}}</a>
                <a v-else-if="storeTotal.consume_bai >= 100" class="full">{{storeTotal.consume}}</a>
                <a v-else>{{storeTotal.consume}}</a>
                <div v-if="storeTotal.consume_quantity == '未设置'" class="details">（目标业绩：{{storeTotal.consume_quantity}}）</div>
                <div v-else class="details">（目标业绩：{{storeTotal.consume_quantity}}次）</div>
              </div>
              <div class="progress_box">
                <div>
                  <span v-if="storeTotal.consume_bai < 59" class="red" :style="{width:storeTotal.consume_proportion}"></span>
                  <span v-else-if="storeTotal.consume_bai > 59 && storeTotal.consume_bai <= 90" class="orange" :style="{width:storeTotal.consume_proportion}"></span>
                  <span v-else-if="storeTotal.consume_bai > 90 && storeTotal.consume_bai < 100" class="green" :style="{width:storeTotal.consume_proportion}"></span>
                  <span v-else-if="storeTotal.consume_bai >= 100" class="full" :style="{width:storeTotal.consume_proportion}"></span>
                </div>
                <a>完成率：
                  <span v-if="storeTotal.consume_bai < 59" class="red">{{storeTotal.consume_proportion}}</span>
                  <span v-else-if="storeTotal.consume_bai > 59 && storeTotal.consume_bai <= 90" class="orange">{{storeTotal.consume_proportion}}</span>
                  <span v-else-if="storeTotal.consume_bai > 90 && storeTotal.consume_bai < 100" class="green">{{storeTotal.consume_proportion}}</span>
                  <span v-else-if="storeTotal.consume_bai >= 100" class="full">{{storeTotal.consume_proportion}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="staff_list">
          <div class="wb100">

            <div class="clear4"></div>

            <div class="wb100 bg-white1">
              <template v-for="(item, index) in arrs">
                <div class="w110px h50px lh50px fl text-center pointer" :class="tabIndex == index ? 'bd-t2 bd-gray4 fc-gray4 bg-gray' : 'fc-gray3'" @click="tabIndex = index">
                  {{item}}
                </div>
              </template>
              <div class="clear0"></div>
            </div>
            <div class="clear4"></div>

            <div class="wb100 text-center fc-gray4 bd-gray bd-a1 relative">

              <div class="wb100 h44px lh44px bg-white1">
                <div class="wb4 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    排名
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    员工
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    岗位
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">划扣人头（人）</p>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">划扣人次（次）</p>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">销售业绩（元）</p>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">划扣业绩（元）</p>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">成交人头（人）</p>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h43px bd-b1 bd-r1 bd-gray">
                    <p class="pal20 text-left">成交人次（次）</p>
                  </div>
                </div>
              </div>

              <div class="clear0"></div>

              <template v-for="(item, index) in list">
                <div class="wb4 fl h120px lh120px">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    {{index + 1}}
                  </div>
                </div>
                <div class="wb12 fl h120px lh120px">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    {{item.name}}
                  </div>
                </div>
                <div class="wb12 fl h120px lh120px">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    {{item.role_id == 3 ? $store.getters.roleName.adviser : $store.getters.roleName.technician}}
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <p>
                        目标人头：
                        <span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                        <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.consumeHead}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span :class="item.className1" v-show="item.target.consumeHead != 0">{{item.proportion.consumeHead}}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <p>
                        目标人次：
                        <span v-if="item.target.consumeNumber != 0">{{item.target.consumeNumber}}</span>
                        <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.consumeNumber}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span :class="item.className2" v-show="item.target.consumeNumber != 0">{{item.proportion.consumeNumber}}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <p>
                        目标业绩：
                        <span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                        <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.payment}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span :class="item.className3" v-show="item.target.payment != 0">{{item.proportion.payment}}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    <template v-if="item.role_id == 3">
                      <p class=" fc-gray3 h120px lh120px text-left pal20">岗位无划扣业绩</p>
                    </template>
                    <template v-else>
                      <div class="pal20 lh30px pat15 pab15 text-left">
                        <p>
                          目标业绩：
                          <span v-if="item.target.consumePrice != 0">{{item.target.consumePrice}}</span>
                          <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                        </p>
                        <p class="fc-gray3">已完成：{{item.actual.consumePrice}}</p>
                        <p class="fc-gray3">
                          完成率：
                          <span :class="item.className4" v-show="item.target.consumePrice != 0">{{item.proportion.consumePrice}}%</span>
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
                        <span v-if="item.target.orderCustomer != 0">{{item.target.orderCustomer}}</span>
                        <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.orderCustomer}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span :class="item.className5" v-show="item.target.orderCustomer != 0">{{item.proportion.orderCustomer}}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wb12 fl">
                  <div class="wb100 h120px bd-b1 bd-r1 bd-gray">
                    <div class="pal20 lh30px pat15 pab15 text-left">
                      <p>
                        目标人次：
                        <span v-if="item.target.orderCustomerQuantity != 0">{{item.target.orderCustomerQuantity}}</span>
                        <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                      </p>
                      <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity}}</p>
                      <p class="fc-gray3">
                        完成率：
                        <span :class="item.className6" v-show="item.target.orderCustomerQuantity != 0">{{item.proportion.orderCustomerQuantity}}%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="clear0"></div>
              </template>

              <div class="clear0"></div>

              <div class="wb14 absolute bg-white radius2 over-hidden" :style="'top: -10px; left: '+ (27 + tabIndex * 12) +'%; z-index: 9; box-shadow: 0 0 10px #f4f4f4;'">
                <div class="wb100 h50px lh50px text-left bg-orange fc-white">

                  <template v-if="tabIndex == 0">
                    <p class="pal20">划扣人头（人）</p>
                  </template>
                  <template v-if="tabIndex == 1">
                    <p class="pal20">划扣人次（次）</p>
                  </template>
                  <template v-if="tabIndex == 2">
                    <p class="pal20">销售业绩（元）</p>
                  </template>
                  <template v-if="tabIndex == 3">
                    <p class="pal20">划扣业绩（元）</p>
                  </template>
                  <template v-if="tabIndex == 4">
                    <p class="pal20">成交人头（人）</p>
                  </template>
                  <template v-if="tabIndex == 5">
                    <p class="pal20">成交人次（次）</p>
                  </template>

                </div>
                <div class="wb100">
                  <template v-for="(item, index) in list">
                    <div class="wb100 h120px">
                      <div class="pal20 lh30px pat15 pab15 text-left">
                        <template v-if="tabIndex == 0">
                          <p>
                            目标人头：
                            <span v-if="item.target.consumeHead != 0">{{item.target.consumeHead}}</span>
                            <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.consumeHead}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span :class="item.className1" v-show="item.target.consumeHead != 0">{{item.proportion.consumeHead}}%</span>
                          </p>
                        </template>
                        <template v-if="tabIndex == 1">
                          <p>
                            目标人次：
                            <span v-if="item.target.consumeNumber != 0">{{item.target.consumeNumber}}</span>
                            <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.consumeNumber}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span :class="item.className2" v-show="item.target.consumeNumber != 0">{{item.proportion.consumeNumber}}%</span>
                          </p>
                        </template>
                        <template v-if="tabIndex == 2">
                          <p>
                            目标业绩：
                            <span v-if="item.target.payment != 0">{{item.target.payment}}</span>
                            <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.payment}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span :class="item.className3" v-show="item.target.payment != 0">{{item.proportion.payment}}%</span>
                          </p>
                        </template>
                        <template v-if="tabIndex == 3">
                          <template v-if="item.role_id == 3">
                            <p class=" fc-gray3 h120px lh120px text-left pal20">岗位无划扣业绩</p>
                          </template>
                          <template v-else>
                            <p>
                              目标业绩：
                              <span v-if="item.target.consumePrice != 0">{{item.target.consumePrice}}</span>
                              <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                            </p>
                            <p class="fc-gray3">已完成：{{item.actual.consumePrice}}</p>
                            <p class="fc-gray3">
                              完成率：
                              <span :class="item.className4" v-show="item.target.consumePrice != 0">{{item.proportion.consumePrice}}%</span>
                            </p>
                          </template>
                        </template>
                        <template v-if="tabIndex == 4">
                          <p>
                            目标人头：
                            <span v-if="item.target.orderCustomer != 0">{{item.target.orderCustomer}}</span>
                            <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.orderCustomer}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span :class="item.className5" v-show="item.target.orderCustomer != 0">{{item.proportion.orderCustomer}}%</span>
                          </p>
                        </template>
                        <template v-if="tabIndex == 5">
                          <p>
                            目标人次：
                            <span v-if="item.target.orderCustomerQuantity != 0">{{item.target.orderCustomerQuantity}}</span>
                            <span class="fc-blue7" @click="$router.push({name:'SetTarget'})" v-else>未设置</span>
                          </p>
                          <p class="fc-gray3">已完成：{{item.actual.orderCustomerQuantity}}</p>
                          <p class="fc-gray3">
                            完成率：
                            <span :class="item.className6" v-show="item.target.orderCustomerQuantity != 0">{{item.proportion.orderCustomerQuantity}}%</span>
                          </p>
                        </template>

                      </div>
                    </div>
                  </template>
                </div>

                <div class="clear4"></div>

              </div>

            </div>

            <div class="clear4"></div>

          </div>
        </div>

      </div>

      <div class="employeeData" v-else-if="tabState == 1">
        <div class="titles">
          <p :class="tabTowState == '0' ? 'active' : ''" @click="tabTowStateFn(0)">数据</p>
          <p :class="tabTowState == '1' ? 'active' : ''" @click="tabTowStateFn(1)">员工详情</p>
        </div>
        <div class="aggregatePerformance">
          <div class="Total">
            <span>总员工(人)</span>
            <p>{{membersNumberData.total}}</p>
          </div>
          <div class="henxian"></div>
          <ul>
            <li>
              <span>{{$store.getters.roleName.shopKeeper}}（人）</span>
              <p>{{membersNumberData.dianzhang}}</p>
            </li>
            <li>
              <span>{{$store.getters.roleName.adviser}}（人）</span>
              <p>{{membersNumberData.adviser}}</p>
            </li>
            <li>
              <span>技师（人）</span>
              <p>{{membersNumberData.jishi}}</p>
            </li>
            <li>
              <span>{{$store.getters.roleName.reception}}（人）</span>
              <p>{{membersNumberData.qiantai}}</p>
            </li>
            <li>
              <span>其他（人）</span>
              <p>{{membersNumberData.qita}}</p>
            </li>
          </ul>
        </div>

        <div class="tabTow_data" v-if="tabTowState == 0">
          <div class="search">
            <DatePicker @on-change="tabTowDateValFn" :value="tabTowDateVal" type="daterange" transfer split-panels placeholder="开始时间 — 结束时间"></DatePicker>
            <!-- <Select>
              <Option>123</Option>
              <Option>123</Option>
              <Option>123</Option>
              <Option>123</Option>
            </Select> -->
            <div class="btn" @click="searchFn('employeeData')">搜索</div>
          </div>
          <div class="tabTow_data_chart">
            <div class="counselor">
              <h3>
                <p>{{$store.getters.roleName.adviser}}业绩排名</p>
                <!-- <span>（前10名）</span> -->
              </h3>
              <div class="counselor_chart">
                <div id="counselorChart" class="Echart"></div>
              </div>
            </div>
            <div class="technician">
              <h3>
                <p>技师流量排名</p>
                <!-- <span>（前10名）</span> -->
              </h3>
              <div class="technician_chart">
                <div id="technicianChart" class="Echart"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="staff_del" v-if="tabTowState == 1">
          <table class="table_list" cellspacing="0">
            <thead>
            <tr>
              <th>序号</th>
              <th>岗位</th>
              <th>账号</th>
              <th>姓名</th>
              <th>电话</th>
              <th>入职时间</th>
              <th>简介</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in staffDel.staffDelList" :key="index">
              <td v-if="index < 9">0{{index+1}}</td>
              <td v-else>{{index+1}}</td>
              <td>{{item.roleName}}</td>
              <td>{{item.userName}}</td>
              <td>{{item.name}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.entry_time}}</td>
              <td>{{item.description}}</td>
            </tr>
            </tbody>
          </table>
          <div class="pagesBox">
            <Page
                    :total="staffDel.amount"
                    @on-change="pageEvent"
                    :page-size="staffDel.pagesize"
            />
          </div>
        </div>
      </div>


      <div class="consumptionData" v-else-if="tabState == 2">
        <div class="search">
          <DatePicker @on-change="onsumeByStoreDateValFn" :value="onsumeByStoreDateVal" type="daterange" transfer split-panels placeholder="开始时间 — 结束时间"></DatePicker>
          <div class="btn" @click="searchFn('consumptionData')">搜索</div>
        </div>
        <div class="aggregatePerformance">
          <div class="Total">
            <span>扣划明细</span>
          </div>
          <div class="henxian"></div>
          <ul>
            <li>
              <span>总数量（件） </span>
              <p>{{onsumeByStoreData.number}}</p>
            </li>
            <li>
              <span>划扣数量（件）</span>
              <p>{{onsumeByStoreData.consumeNumber}}</p>
            </li>
            <li>
              <span>总金额（元）</span>
              <p>{{onsumeByStoreData.price|NumFormat}}</p>
            </li>
            <li>
              <span>划扣金额（元）</span>
              <p>{{onsumeByStoreData.consumePrice|NumFormat}}</p>
            </li>
            <li>
              <span>剩余金额（元） </span>
              <p>{{onsumeByStoreData.surplusPrice|NumFormat}}</p>
            </li>
          </ul>
        </div>
        <div class="consumptionData_list">
          <table class="table_list" cellspacing="0">
            <thead>
            <tr>
              <th>序号</th>
              <th>项目名称</th>
              <th>总数量（件）</th>
              <th>划扣数量（件）</th>
              <th>剩余数量（件）</th>
              <th>总金额（元）</th>
              <th>划扣金额（元）</th>
              <th>剩余金额（元）</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in consumeByStoreDel.consumeByStoreDelList" :key="index">
              <td v-if="index < 9">0{{index+1}}</td>
              <td v-else>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.number}}</td>
              <td>{{item.consumeNumber}}</td>
              <td>{{item.surplusNumber}}</td>
              <td>{{item.price|NumFormat}}</td>
              <td>{{item.consumePrice|NumFormat}}</td>
              <td>{{item.surplusPrice|NumFormat}}</td>
            </tr>
            </tbody>
          </table>
          <!-- <div class="pagesBox">
            <Page
              :total="consumeByStoreDel.amount"
              @on-change="pageEvent"
              :page-size="consumeByStoreDel.pagesize"
            />
          </div> -->
        </div>

      </div>


    </div>

  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/title')
  import { Dialog } from 'vant';
  import { setTimeout } from 'timers';
  export default {
    name:'PerformanceShopDel',
    data(){
      return{
        tabState:0,
        tabTowState:0,
        shopId:"",
        shopData:"",
        performanceData:"",
        messageTitle:0,
        dateTypes:"day",
        storeTargetByManagerData:{},
        storeTotal:{},
        projectData:{},
        channelData:{},
        dateValue:[],
        membersNumberData:"",
        staffDel:{
          pages:1,
          pagesize:12,
          amount:0,
          staffDelList:'',
        },
        tabTowDateVal:[],
        onsumeByStoreData:"",
        onsumeByStoreDateVal:[],
        consumeByStoreDel:{
          pages:1,
          pagesize:12,
          amount:0,
          consumeByStoreDelList:'',
        },

        arrs: ['划扣人头', '划扣人次', '销售业绩', '划扣业绩', '成交人头', '成交人次'],
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
        MakeABargainOne:[],
        //成交人次
        MakeABargainTow:[],
        loading: false,

        // 顾问列表
        adviserList: [],
        // 美容师列表
        BeauticianList: [],
        list: [],
      }
    },

    components:{
    },
    methods:{
      membersGraphicalFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          startTime:that.tabTowDateVal[0],
          endTime:that.tabTowDateVal[1],
        }

        let membersGraphicalReslut = this.$postRequest("/post/api/members/membersGraphical",postData)
        membersGraphicalReslut.then(res => {
          let counselorChart = echarts.init(document.getElementById('counselorChart'))
          let technicianChart = echarts.init(document.getElementById('technicianChart'))
          let counselorSeriesData = res.data.adviserAchievement.split(',');
          let counselorYAxisData = res.data.adviserDataname.split(',');
          let counselorOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',

              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLabel:{
                color:"#333333"
              },
            },
            yAxis: {
              type: 'category',
              data: counselorYAxisData,
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLabel:{
                color:"#333333"
              }
            },
            series: [
              {
                type: 'bar',
                itemStyle: {
                  color: '#009688',
                  barBorderRadius:6
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right'
                  }
                },
                barWidth:12,
                data: counselorSeriesData
              }
            ]
          };
          counselorChart.setOption(counselorOption);

          let technicianSeriesData = res.data.flowAchievement.split(',');
          let technicianYAxisData = res.data.flowDataName.split(',');
          let technicianOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLabel:{
                color:"#333333"
              }
            },
            yAxis: {
              type: 'category',
              data: technicianYAxisData,
              axisLine:{
                lineStyle:{
                  color:"#C0C0C0"
                }
              },
              axisLabel:{
                color:"#333333"
              }
            },
            series: [
              {
                type: 'bar',
                itemStyle: {
                  color: '#FF5722',
                  barBorderRadius:6
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right'
                  }
                },
                barWidth:12,
                data: technicianSeriesData
              }
            ]
          };
          technicianChart.setOption(technicianOption);

        })
      },

      //划扣数据时间选择
      onsumeByStoreDateValFn(date){
        const that = this;
        that.onsumeByStoreDateVal = [...date]
      },
      //员工数据 数据时间选择
      tabTowDateValFn(date){
        const that = this;
        that.tabTowDateVal = [...date]
      },
      //分页器
      pageEvent(pages){
        const that = this;
        that.staffDel.pages = pages;
        that.getMembersDetailsFn()
      },

      //数据、员工详情切换
      tabTowStateFn(index){
        this.tabTowState = index;
        if(this.tabTowState == 0)
        {
          this.membersGraphicalFn() // 员工图表数据
        }
        else
        {
          this.getMembersDetailsFn() // 员工详情
        }
      },
      //基础、员工、划扣数据切换
      tabStateFn(index){
        const that = this;
        this.tabState = index;
        if( this.tabState == 0)
        {
          // this.getAppointmentRankingByStoreFn() // 门诊说明
          // this.getOrderRankingByStoreFn() // 业绩说明
          this.storeTargetByManagerFn() // 业绩数据
        }
        else if(this.tabState == 1)
        {
          this.getMembersNumberFn() // 门店员工分类统计
          if(this.tabTowState == 0)
          {
            this.membersGraphicalFn() // 员工图表数据
          }
          else
          {
            this.getMembersDetailsFn() // 员工详情
          }
        }
        else if(this.tabState == 2)
        {
          this.getConsumeByStoreFn() //划扣数据合计
          this.getConsumeListByStoreFn() //划扣数据列表
        }
      },

      //门店/业绩说明
      messageTitleFn(num){
        this.messageTitle = num;
      },
      //选择搜索时间单位
      dateSelect(str){
        this.dateTypes = str;
      },
      //选择时间
      handleOk(date){
        const that = this;
        if(date[0] != '')
        {
          let date1= date[0]+' 00:00:00';
          let date2= date[1]+' 00:00:00';
          let date3 = new Date(date2).getTime() - new Date(date1).getTime();   //时间差的毫秒数
          let days=Math.floor(date3/(24*3600*1000)) + 1;
          that.dateValue = [...date]
          if(days > 31)
          {
            Dialog.alert({
              message: '所选时间需小于等于31天，请重新选择'
            }).then(() => {
              that.dateValue = []
            });

          }
        }
      },

      // 业绩数据
      storeTargetByManagerFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          // time:"2019-03"
        }
        let storeTargetByManagerReslut = this.$postRequest("/post/api/store/storeTargetByManager",postData)
        storeTargetByManagerReslut.then(res => {
          that.storeTargetByManagerData = res.data;
          that.storeTotal = res.data.total;
          that.storeTotal.appointment_bai = parseInt(res.data.total.appointment_proportion);
          that.storeTotal.consume_bai = parseInt(res.data.total.consume_proportion);
          that.storeTotal.payment_bai = parseInt(res.data.total.payment_proportion);
          that.storeTotal.price_bai = parseInt(res.data.total.price_proportion);
          console.log(that.storeTargetByManagerData);
        })
      },

      //echart自适应
      echartResize(){
        this.$common.echartResize();
      },

      // 划扣数据列表
      getConsumeListByStoreFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          start:that.staffDel.pages,
          perpage:that.staffDel.pagesize,
        }
        let consumeListByStoreReslut = this.$postRequest("/post/api/store/getConsumeListByStore",postData)
        consumeListByStoreReslut.then(res => {
          that.consumeByStoreDel.consumeByStoreDelList = res.data;
          that.consumeByStoreDel.amount = res.data.total
        })
      },

      // 划扣数据合计
      getConsumeByStoreFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          startTime:that.dateValue[0],
          endTime:that.dateValue[1],
        }
        let onsumeByStoreReslut = this.$postRequest("/post/api/store/getConsumeByStore",postData)
        onsumeByStoreReslut.then(res => {
          that.onsumeByStoreData = res.data;
        })
      },


      // 员工详情
      getMembersDetailsFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          start:that.staffDel.pages,
          perpage:that.staffDel.pagesize,
        }
        let membersDetailsReslut = this.$postRequest("/post/api/members/getMembersDetails",postData)
        membersDetailsReslut.then(res => {
          that.staffDel.staffDelList = res.data.membersData;
          that.staffDel.amount = res.data.total
        })
      },

      // 业绩说明
      getOrderRankingByStoreFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          startTime:that.dateValue[0],
          endTime:that.dateValue[1],
        }
        let OrderRankingByStoreReslut = this.$postRequest("/post/api/store/getOrderRankingByStore",postData)
        OrderRankingByStoreReslut.then(res => {
          that.performanceData = res.data;
        })
      },

      // 门店员工分类统计
      getMembersNumberFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
        }
        let AppointmentRankingByStoreReslut = this.$postRequest("/post/api/members/getMembersNumber",postData)
        AppointmentRankingByStoreReslut.then(res => {
          that.membersNumberData = res.data;
        })
      },

      // 门诊说明
      getAppointmentRankingByStoreFn(){
        const that = this;
        const postData = {
          s_id:that.shopId,
          startTime:that.dateValue[0],
          endTime:that.dateValue[1],
        }
        let AppointmentRankingByStoreReslut = this.$postRequest("/post/api/store/getAppointmentRankingByStore",postData)
        AppointmentRankingByStoreReslut.then(res => {
          that.outpatientServiceData = res.data;
        })
      },



      searchFn(states){
        const that = this;
        if(states == 'essentialData')
        {
          // that.getAppointmentRankingByStoreFn() // 门诊说明
          // that.getOrderRankingByStoreFn() // 门诊说明
          that.storeTargetByManagerFn() // 业绩数据
        }
        else if(states == 'employeeData')
        {
          that.membersGraphicalFn() // 员工图表数据
        }
        else if( states == "consumptionData")
        {
          this.getConsumeByStoreFn() //划扣数据合计
        }
      },



    },

    // 创建前状态
    beforeCreate(){
    },

    // 创建完毕状态
    created(){

    },

    // 挂载前状态
    beforeMount(){
    },

    // 挂载结束状态
    mounted(){
      const that = this;
      that.shopId = that.$route.query.id;

      window.addEventListener('resize', function () {
        that.echartResize()
      })

      that.onsumeByStoreDateVal = that.dateValue = that.tabTowDateVal = that.$common.getBeginningOfMonth();


      //门店信息
      let storeReslut = this.$postRequest("/post/api/store/getStore",{
        s_id:that.shopId
      })
      storeReslut.then(res => {
        that.shopData = res.data[0];
      })


      if( that.tabState == 0)
      {

        // this.getAppointmentRankingByStoreFn() // 门诊说明
        // this.getOrderRankingByStoreFn() // 业绩说明
        this.storeTargetByManagerFn() // 业绩数据

      }
      else if(that.tabState == 1)
      {
        this.getMembersNumberFn() // 门店员工分类统计
        this.getMembersDetailsFn() // 员工详情
        this.membersGraphicalFn() // 员工图表数据
      }
      else if(that.tabState == 2)
      {
        this.getConsumeByStoreFn() //划扣数据合计
        this.getConsumeListByStoreFn() //划扣数据列表
      }



    },

    // 更新前状态
    beforeUpdate(){
    },

    // 更新完成状态
    updated(){
    },

    // 销毁前状态
    beforeDestroy(){
    },

    // 销毁完成状态
    destroyed(){
    }

  }
</script>
<style lang="scss" scoped>
  .PerformanceShopDel{
    margin-top: .2rem;
    header{
      background: #fff;
      display: flex;
      height: 1.1rem;
      .text{
        flex: 1;
        padding-left: .28rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3{
          display: flex;
          align-items: center;
          b{
            font-weight: normal;
            font-size: .26rem;
            color: #333333;
          }
          i{
            font-size: .26rem;
            color: #C09346;
            padding-left: .15rem;
            font-weight: normal;
          }
          a{
            font-size: .26rem;
            color: #666666;
            font-weight: normal;
          }
        }
        p{
          padding-top: .2rem;
          font-size: .16rem;
          color: #333333;
          span{
            padding-right: 1.3rem;
          }
        }
      }
      .btns{
        width: 2rem;
        background: #1A6760;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i{
          font-size: .26rem;
        }
        p{
          font-size: .18rem;
          padding-top: .1rem;
        }
      }
    }
    .content{
      margin-top: .2rem;
      .tabs_title{
        background: #fff;
        padding: 0 .26rem;
        div{
          display: flex;
          border-bottom: 1px solid #e5e5e5;
          align-items: center;
          P{
            padding: .16rem 0;
            font-size: .18rem;
            margin-right: .58rem;
            position: relative;
            cursor: pointer;
            em{
              width: 100%;
              height: 2px;
              background: #009688;
              position: absolute;
              bottom: 0;
              left: 0;
              opacity: 0;
            }
          }
          .active{
            color: #009688;
            em{
              opacity: 1;
            }
          }
        }
      }
      .essentialData{
        position: relative;
        background: #fff;
        .cardList{
          padding: 0 .26rem;
          .taskBox {
            height: 1.8rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: .24rem;
            .taskBox_left,.taskBox_right{
              width: 49.5%;
              border-radius: 5px;
              padding: .3rem;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              background: #fff;
              border:1px solid #E5E5E5;
              p{
                font-size: .16rem;
                color: #333333;
                margin-bottom: .1rem;
              }
              .text{
                display: flex;
                align-items: flex-end;
                a{
                  font-size: .34rem;
                  padding-right: .25rem;
                  color: #666;
                }
                .green{
                  color: #009688;
                }
                .orange{
                  color: #FF5722;
                }
                .full{
                  color: #C09346;
                }
                .red{
                  color: #F10215;
                }
              }
              .details{
                text-align: right;
                font-size: .14rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
                line-height: .24rem;
                position: relative;
                top: -.06rem;
                a{
                  font-size: .14rem;
                  padding: 0;
                }
              }
              .progress_box{
                display: flex;
                align-items: center;
                div{
                  width: 60%;
                  background: #F2F2F2;
                  border-radius:5px;
                  height: .1rem;
                  display: flex;
                  .green{
                    background: #009688;
                  }
                  .orange{
                    background: #FF5722;
                  }
                  .full{
                    background: url("@/chain/assets/shopDetails/progress.png") no-repeat;
                  }
                  .red{
                    background: #F10215;
                  }
                  span{
                    border-radius:5px;
                    height: .1rem;
                    overflow: hidden;
                  }
                }
                a{
                  font-size: .16rem;
                  color: #666;
                  display: flex;
                  align-items: center;
                  padding-left: .3rem;
                  span{
                    font-size: .2rem;
                  }
                  .green{
                    color: #009688;
                  }
                  .orange{
                    color: #FF5722;
                  }
                  .full{
                    color: #C09346;
                  }
                  .red{
                    color: #F10215;
                  }
                }
              }
            }


          }
        }
        .staff_list{
          padding: .24rem .26rem;
          .box{
            display: flex;
            justify-content: space-between;
            .counselor,.cosmetologist{
              width: 49.5%;
              background: #fff;
              table{
                margin: 0;
                tbody{
                  tr{
                    td{
                      vertical-align: unset;
                      padding: .1rem .2rem;
                    }
                  }
                }
                tr{
                  td,th{
                    font-size: .16rem;
                    padding-left: .2rem;
                    text-align:left;
                    p{
                      text-align: left;
                      .green{
                        color: #009688;
                      }
                      .orange{
                        color: #FF5722;
                      }
                      .full{
                        color: #C09346;
                      }
                      .red{
                        color: #F10215;
                      }
                    }
                    p.font1{
                      font-size: .18rem;
                      font-weight: bold;
                    }
                    p:nth-last-child(1){
                      color: #333333;
                    }
                    p:nth-last-child(2){
                      color: #666666;
                    }
                    p:nth-last-child(3){
                      color: #666666;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .employeeData{
        background: #fff;
        padding: 0 .26rem .4rem;
        .titles{
          display: flex;
          font-size: .18rem;
          color: #999999;
          padding-top: .2rem;
          p{
            padding-right: .5rem;
            cursor: pointer;
          }
          .active{
            color: #009688;
          }
        }

        .tabTow_data{
          .search{
            margin-top: .2rem;
            position: initial;
            .ivu-date-picker{
              margin-left: 0;
            }
            .ivu-select{
              width: 2rem;
              margin-left: .14rem;
            }
          }
          .tabTow_data_chart{
            display: flex;
            padding-top: .3rem;
            >div:last-of-type{
              margin-left: .2rem;
            }
            >div{
              flex: 1;
              h3{
                display: flex;
                align-items: center;
                font-size: .18rem;
                color: #333;
                font-weight: normal;
                span{
                  color: #EC414D;
                }
              }
              >div{
                background: #F2F2F2;
                margin-top: .2rem;
                width: 100%;
                height: 4.72rem;
                div{
                  height: 100%;
                }
              }
            }
          }
        }
      }

      .consumptionData{
        background: #fff;
        padding: 0 .26rem .4rem;
        .search{
          position: initial;
          padding-top: .2rem;
          .ivu-date-picker{
            margin-left: 0;
          }
        }
        .aggregatePerformance{
          color: #333333;
          .Total{
            width: 1rem;
          }
        }
      }

    }
  }
</style>


<style lang="scss" scoped>
  .search{
    position: absolute;
    left: .26rem;
    top: .2rem;
    background: #fff;
    display: flex;
    .date{
      width: 2.4rem;
      height: .32rem;
      display: flex;
      border:1px solid #E5E5E5;
      border-radius:4px;
      p{
        flex: 1;
        position: relative;
        line-height: .32rem;
        text-align: center;
        font-size: .14rem;
        color: #666666;
        cursor: pointer;
        em{
          position: absolute;
          width: 1px;
          height: .1rem;
          background: #F2F2F2;
          right: 0;
          top: 50%;
          margin-top: -.05rem;
        }
        a{
          position: absolute;
          width: 1px;
          height: .1rem;
          background: #F2F2F2;
          left: 0;
          top: 50%;
          margin-top: -.05rem;
        }
      }
      .active{
        background: #F2F2F2;
        color: #333333;
      }
    }
    i{
      font-style: normal;
      &.month_picker{
        .ivu-date-picker{
          width: 1.5rem;
        }
      }
      &.year_picker{
        .ivu-date-picker{
          width: 1.5rem;
        }
      }
    }

    .ivu-date-picker{
      // margin-left: .14rem;
      width: 2rem;
      .ivu-select-dropdown{
        top: 0!important;
      }
    }
    .btn{
      width: .8rem;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      font-size: .16rem;
      background: #009688;
      margin-left: .2rem;
      border-radius:2px;
      cursor: pointer;
    }
  }
</style>
<style>


</style>



    
