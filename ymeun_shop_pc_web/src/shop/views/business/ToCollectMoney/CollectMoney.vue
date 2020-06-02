<template>

    <div class="wb100 f14px bg-white1">
        <div class="pal24 par24 pat20 pab20">
            <div class="wb57 fl bg-white">
                <div class="pal19 par19">
                    <p class="lh50px h50px">
                        <span class="fl f16px fc-blue6">基本信息</span>
                    </p>

                    <p>
                        <!-- <span class="mar50">单号：{{info.orders.id || info.customer.orders_id}}</span> -->
                        <span class="mar50">姓名：<span class="pointer" @click="$router.push({name:'ClientDel',query:{id:$route.query.customer_id,types:3}})">{{info.customer.name || info.customer.customer_name}}</span></span>
                        <span>电话：{{info.customer.mobile || info.customer.customer_mobile}}</span>
                    </p>

                    <div class="clear4 bd-b1 bd-gray"></div>

                    <div class="clear4"></div>

                    <div class="wb100">

                        <!--   列表   -->
                        <div class="wb100">

                            <div class="clear0"></div>

                                <el-table slot="list" :data="info.receipt" stripe border>

                                    <el-table-column prop="created_at" align="center" label="日期">
                                        <template slot-scope="scope">
                                            {{scope.row.created_at | _endTimeFormat}}
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="items_name" align="center" label="品项名称">
                                        <template slot-scope="scope">
                                            {{ scope.row.items_name }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="treatment_num" align="center" label="品项疗程">
                                        <template slot-scope="scope">
                                            {{ scope.row.treatment_num || scope.row.items_treatment_num }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="number_one" label="数量">
                                        <template slot-scope="scope">
                                            {{ scope.row.number_one }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="number" label="疗程总数">
                                        <template slot-scope="scope">
                                            {{ scope.row.number }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="payment" label="原价（元）">
                                        <template slot-scope="scope">
                                            {{ scope.row.price | _filterNumFormat }}
                                        </template>
                                    </el-table-column>
<!--                                    <el-table-column align="center" prop="payment" label="活动金额（元）">-->
<!--                                        <template slot-scope="scope">-->
<!--                                            {{ scope.row.activity_price | _filterNumFormat }}-->
<!--                                        </template>-->
<!--                                    </el-table-column>-->
                                    <el-table-column align="center" prop="price" label="应付金额（元）">
                                        <template slot-scope="scope">
                                            {{ scope.row.payment | _filterNumFormat }}
                                        </template>
                                    </el-table-column>

                                </el-table>

                            <div class="clear2"></div>

                            <p class="text-right f16px fc-gray4">
                                合计（元）： {{ sum.sumPrice | _filterNumFormat }}
                                <span class="mal20 mar20">折扣合计（元）：{{info.receipt_total.receipt_discount | _filterNumFormat}} </span>
                                客户应支付（元）：<span class="fc-red f24px">{{ sum.sumPayment | _filterNumFormat }}</span>
                            </p>

                            <div class="clear4"></div>

                        </div>

                        <div class="clear0"></div>

                    </div>
                </div>

            </div>

            <div class="wb42 fr bg-white">
                <div class="pal19 par19">

                    <template v-if="!isShowPay">
                        <div class="wb100">

                            <div class="clear4"></div>

                            <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                                <div class="clear0 bd-gray bd-b1"></div>
                                <div class="clear0 bd-gray bd-b1 mat5"></div>
                                <p class="absolute bg-white w200px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">请选择收款方式</p>
                            </div>
                            <div class="fr el-cursor" @click="dialogProceeds = true">
                                <i class="iconfont iconxinzeng1 fc-blue6"></i>
                                <span class="pal14 fc-blue6">新增其他收款方式</span>
                            </div>

                            <div class="clear3"></div>

                            <div class="pa25">

                                <div class="wb100 relative">
                                    <div class="wb100" @click="userPrice==0 || is_meter==1 ? '' :show.recharge = !show.recharge">
                                        <i class="iconfont iconchongzhikazhifu fc-orange1 f27px fl"></i>
                                        <div class="fl lh22px mal30" style="margin-top: -10px">
                                            <p>充值卡支付</p>
                                            <p>余额：{{userPrice}}
                                            </p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.recharge" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute" :disabled="userPrice==0 || is_meter==1" ></el-checkbox>
                                    <div class="wb100" v-show="show.recharge">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50px text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.recharge_debit " :max="userPrice" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="userGivePrice == 0 || is_meter==1 ? '' :show.givePrice = !show.givePrice">
                                        <i class="iconfont iconquan fc-red3 f27px fl"></i>
                                        <div class="fl lh22px mal30" style="margin-top: -10px">
                                            <p>券额支付</p>
                                            <p>余额：{{userGivePrice}}
                                            </p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.givePrice" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute" :disabled="userGivePrice == 0 || is_meter==1"></el-checkbox>
                                    <div class="wb100" v-show="show.givePrice">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50px text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.give_debit" :max="userGivePrice" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>

                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="show.alipay = !show.alipay">
                                        <i class="iconfont iconzhifubaozhifu fc-blue7 f27px fl"></i>
                                        <div class="fl lh30px mal30">
                                            <p>支付宝支付</p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.alipay" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                    <div class="wb100" v-show="show.alipay">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50rem text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.alipay" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="show.wechat_pay = !show.wechat_pay">
                                        <i class="iconfont iconweixinzhifu fc-green1 f27px fl"></i>
                                        <div class="fl lh30px mal30">
                                            <p>微信支付</p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.wechat_pay" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                    <div class="wb100" v-show="show.wechat_pay">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50rem text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.wechat_pay" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                    <div class="clear0"></div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="show.bank_card = !show.bank_card">
                                        <svg class="icon w40px h30px fl " aria-hidden="true">
                                            <use xlink:href="#iconyinlianzhifu"></use>
                                        </svg>
                                        <div class="fl lh30px mal18">
                                            <p>银行卡支付</p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.bank_card" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                    <div class="wb100" v-show="show.bank_card">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50rem text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.bank_card" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="show.cash = !show.cash">
                                        <i class="iconfont iconxianjinzhifu fc-brown f25px fl"></i>
                                        <div class="fl lh50rem mal30">
                                            <p>现金支付</p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.cash" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                    <div class="wb100" v-show="show.cash">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50rem text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.cash" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>

                                <div class="wb100 relative">
                                    <div class="wb100" @click="show.online_price = !show.online_price">
                                        <i class="iconfont iconqita fc-blue8 f27px fl"></i>
                                        <div class="fl lh50rem mal30">
                                            <p>其他支付</p>
                                        </div>
                                        <div class="clear0"></div>
                                    </div>
                                    <el-checkbox v-model="show.online_price" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                    <div class="wb100" v-show="show.online_price">
                                        <div class="clear4"></div>
                                        <div class="wb100 h50rem text-right">
                                            <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                            <input type="number" v-model="pay.online_price" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear4 bd-gray bd-b1"></div>
                                <div class="clear4"></div>
                                <div v-for="(item , index) in proceedsList" :key="index">
                                    <div class="wb100 relative">
                                        <div class="wb100" @click="item.ordersMethodStatus = !item.ordersMethodStatus">
                                            <i class="iconfont iconshoukuanfangshi fc-gray6 f27px fl"></i>
                                            <div class="fl lh50rem mal30">
                                                <p>{{item.name}}</p>
                                            </div>
                                            <div class="clear0"></div>
                                        </div>
                                        <el-checkbox v-model="item.ordersMethodStatus" style="z-index: 99; right: 0; top:0" class="fr mat5 absolute"></el-checkbox>
                                        <div class="wb100" v-show="item.ordersMethodStatus">
                                            <div class="clear4"></div>
                                            <div class="wb100 h50rem text-right">
                                                <span class="fl h50px lh50px f22px fc-gray3">￥</span>
                                                <input type="number" v-model="item.money" class="bg-none bd-none h50px lh50px mal30 fl w200px fc-gray3" placeholder="请输入"></input>
                                            </div>
                                        </div>
                                        <i class="el-icon-error fc-red absolute el-cursor" @click="removeProceeds(item.id)" style="right:-30px; top:8px;"></i>
                                    </div>
                                    <div class="clear4 bd-gray bd-b1"></div>
                                    <div class="clear4"></div>
                                </div>

                                <div class="wb100 text-right">
                                    <el-button type="primary" @click="openDialog">提交订单</el-button>
                                </div>

                            </div>

                        </div>
                    </template>

                    <template v-else>

                        <div class="clear4"></div>

                        <div class="wb100 f18px fc-gray4 h30px lh30px relative">
                            <div class="clear0 bd-gray bd-b1"></div>
                            <div class="clear0 bd-gray bd-b1 mat5"></div>
                            <p class="absolute bg-white w200px text-center" style="top:-10px; left: 0; right: 0; margin: 0 auto;">收款详情</p>
                        </div>

                        <div class="clear3"></div>

                        <div class="wb100">
                            <div class="wb40 fl lh30px">
                                <p class="fc-gray3 f16px">总收款（元）</p>
                                <p class="f24px fc-gray4">{{info.pay_mode.totalReceipts | _filterNumFormat}}</p>
                            </div>
                            <div class="wb40 fr lh30px">
                                <p class="fc-gray3 f16px">总欠款（元）</p>
                                <p class="f24px fc-gray4">{{info.pay_mode.arrearsPrice | _filterNumFormat}}</p>
                            </div>

                            <div class="clear4 bd-b1 bd-gray"></div>

                            <div class="clear4"></div>

                            <div class="wb100">
                                <div class="pa10">
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.recharge_debit > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">充值卡支付</p>
                                        <p class="absolute bg-white w100px text-right fc-orange1" style="top:-15px; right: 0;">{{info.pay_mode.recharge_debit | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.give_debit > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">券额支付</p>
                                        <p class="absolute bg-white w100px text-right fc-orange1" style="top:-15px; right: 0;">{{info.pay_mode.give_debit | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.alipay > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">支付宝支付</p>
                                        <p class="absolute bg-white w100px text-right fc-blue7" style="top:-15px; right: 0;">{{info.pay_mode.alipay | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.wechatPay > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">微信支付</p>
                                        <p class="absolute bg-white w100px text-right fc-green1" style="top:-15px; right: 0;">{{info.pay_mode.wechatPay | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.bank_card > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">银行卡支付</p>
                                        <p class="absolute bg-white w100px text-right fc-blue" style="top:-15px; right: 0;">{{info.pay_mode.bank_card | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.cash > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">现金支付</p>
                                        <p class="absolute bg-white w100px text-right fc-brown" style="top:-15px; right: 0;">{{info.pay_mode.cash | _filterNumFormat}}</p>
                                    </div>
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.online_price">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">其他支付</p>
                                        <p class="absolute bg-white w100px text-right fc-blue8" style="top:-15px; right: 0;">{{info.pay_mode.online_price | _filterNumFormat}}</p>
                                    </div>
                                    <!--                      还款                      -->
                                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="info.pay_mode.totalHuanKuanPrice > 0">
                                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">还款支付</p>
                                        <p class="absolute bg-white w100px text-right fc-blue" style="top:-15px; right: 0;">{{info.pay_mode.totalHuanKuanPrice | _filterNumFormat}}</p>
                                    </div>

                                    <template v-for="item in info.pay_mode.ordersMethodData  ">
                                        <template v-if="item.price >= 0 && item.price != ''">
                                            <div class="wb100 f16px fc-gray4 h30px lh30px relative">
                                                <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                                <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">{{item.name}}</p>
                                                <p class="absolute bg-white w100px text-right fc-gray6" style="top:-15px; right: 0;">{{item.price}}</p>
                                            </div>
                                        </template>
                                    </template>

                                </div>
                            </div>
                            

                            <div class="clear10"></div>

                            <div class="wb100 text-center">
                                <el-button type="danger" @click="dialogRepayment = true;repayPriceTow = repayPrice = info.pay_mode.arrearsPrice;" v-if="info.pay_mode.arrearsPrice > 0" class="w170px"> 还 款 </el-button>
                                <el-button type="primary" :disabled="true" v-else-if="info.is_refund == 2" class="w170px"> 已 退 款 </el-button>
                                <el-button type="primary" @click="pagesToUrl('AffirmChargeback')" v-else class="w170px" v-show="isSubmitShow"> 退 款 </el-button>
                            </div>

                            <div class="clear4"></div>

                        </div>

                    </template>

                </div>
            </div>
        </div>

        <!--    还款    -->
        <el-dialog title="确定还款" :visible.sync="dialogRepayment" width="400px">
            <div class="wb100 f16px lh40px tex-center">
                <p class="fc-gray3 f16px">还款金额</p>
                <p class="fc-gray4 f24px"> 
                    <el-input
                        placeholder="请输入内容"
                        v-model="repayPrice"
                        clearable>
                    </el-input> 
                    <!-- {{Math.abs(repayPrice) | _filterNumFormat}} -->
                </p>
            </div>

            <div class="clear"></div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRepayment = false">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="repayment">确 定</el-button>
                </template>
            </div>
        </el-dialog>

        <!--   确定收银弹窗   -->
        <el-dialog title="确定收银" :visible.sync="dialogPay" width="600px">
            <div class="wb100 fc-gray4">

                <div class="wb100 f16px fc-gray4" v-if="!isQiankuan">
                    <div class="wb50 fl">
                        <div class="pa5">
                            <div class="bg-gray pa15">
                                <p class="lh30px">应支付(元)</p>
                                <p class="f24px lh40px">{{ sum.sumPayment | _filterNumFormat }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="wb50 fr">
                        <div class="pa5">
                            <div class="bg-green pa15 fc-white">
                                <p class="lh30px">实际支付(元)</p>
                                <p class="f24px lh40px">{{ sum.userPayment | _filterNumFormat }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wb100 f16px fc-gray4" v-else>
                    <div class="wb33 fl">
                        <div class="pa5">
                            <div class="bg-gray pa15">
                                <p class="lh30px">应支付(元)</p>
                                <p class="f24px lh40px">{{ sum.sumPayment | _filterNumFormat }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="wb33 fl">
                        <div class="pa5">
                            <div class="bg-green pa15 Fwhite">
                                <p class="lh30px">实际支付(元)</p>
                                <p class="f24px lh40px">{{ sum.userPayment | _filterNumFormat }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="wb33 fl">
                        <div class="pa5">
                            <div class="bg-orange pa15 fc-white">
                                <p class="lh30px">欠款(元)</p>
                                <p class="f24px lh40px">{{ sum.userQiankuan | _filterNumFormat }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="clear3"></div>

                    <div class="pa10" v-if="isQiankuan">
                        <el-input type="textarea" v-model="describe" placeholder="请输入欠款说明" rows="4"></el-input>
                    </div>

                </div>


                <div class="clear3"></div>

                <div class="pa10">
                    
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.recharge && pay.recharge_debit >= 0 && pay.recharge_debit != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">充值卡支付</p>
                        <p class="absolute bg-white w100px text-right fc-orange1" style="top:-15px; right: 0;">{{pay.recharge_debit}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.givePrice && pay.give_debit >= 0 && pay.give_debit != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;" v-if="show.givePrice">券额支付</p>
                        <p class="absolute bg-white w100px text-right fc-blue7" style="top:-15px; right: 0;">{{pay.give_debit}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.alipay && pay.alipay >= 0 && pay.alipay != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;" v-if="show.alipay">支付宝支付</p>
                        <p class="absolute bg-white w100px text-right fc-blue7" style="top:-15px; right: 0;">{{pay.alipay}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.wechat_pay && pay.wechat_pay >= 0 && pay.wechat_pay != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">微信支付</p>
                        <p class="absolute bg-white w100px text-right fc-green1" style="top:-15px; right: 0;">{{pay.wechat_pay}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.bank_card && pay.bank_card >= 0 && pay.bank_card != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">银行卡支付</p>
                        <p class="absolute bg-white w100px text-right fc-blue" style="top:-15px; right: 0;">{{pay.bank_card}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.cash && pay.cash >= 0 && pay.cash != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">现金支付</p>
                        <p class="absolute bg-white w100px text-right fc-brown" style="top:-15px; right: 0;">{{pay.cash}}</p>
                    </div>
                    <div class="wb100 f16px fc-gray4 h30px lh30px relative" v-if="show.online_price && pay.online_price >= 0 && pay.online_price != ''">
                        <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                        <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">其他支付</p>
                        <p class="absolute bg-white w100px text-right fc-blue8" style="top:-15px; right: 0;">{{pay.online_price}}</p>
                    </div>

                    <template v-for="item in proceedsList ">

                        <template v-if="item.ordersMethodStatus && item.money >= 0 && item.money != ''">
                             <div class="wb100 f16px fc-gray4 h30px lh30px relative">
                                <div class="clear0" style="border-bottom: 1px dashed #e1e1e1"></div>
                                <p class="absolute bg-white w100px text-left" style="top:-15px; left: 0;">{{item.name}}</p>
                                <p class="absolute bg-white w100px text-right fc-gray6" style="top:-15px; right: 0;">{{item.money}}</p>
                            </div>
                        </template>

                    </template>

                </div>

                <div class="clear1"></div>

                <div class="pa10" v-if="show.online_price">
                    <el-input type="textarea" v-model="describe2" placeholder="请输入团购描述" rows="4"></el-input>
                </div>

            </div>

            <div class="clear"></div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPay = false">取 消</el-button>
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="myPay">确 定</el-button>
                </template>
            </div>
        </el-dialog>

         <!--   新增收款方式   -->
        <el-dialog title="新增收款方式" :visible.sync="dialogProceeds" width="420px" :before-close="clearForm"  custom-class="proceeds_box">
            <div class="content">
                <el-form ref="myProceedsForm" :model="proceedsForm" :rules='rules' label-width="80px">
                    <el-form-item label="收款方式" prop="name">
                        <el-input v-model="proceedsForm.name" placeholder="请输入新增收款方式名称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="clearForm">取 消</el-button>
                    <template v-if="proceedsDisabled">
                        <el-button type="primary" disabled>提交中...</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="addProceeds">确 定</el-button>
                    </template>
                </div>
            </div>
        </el-dialog>

    </div>

</template>

<script>

    import { formatArrayToMap } from "@/shop/utils/format"

    import { getOrdersEdit, checkOrdersStatus, printOrders, postArrearsRepayment , ordersMethodList , ordersMethodAdd , ordersMethodClose } from  "@/shop/assets/api/flow/order"
    import { prepaidByCustomer } from  "@/shop/assets/api/client/client"

    export default {
        name: "CollectMoney",
        components: {
        },
        data() {
            return {
                dialogPay: false,
                dialogRepayment: false,

                isEdit: false,
                disabled: false,
                isShowPay: false,

                pay:{},
                show:{
                    recharge: false,
                    givePrice: false,
                    alipay: false,
                    wechat_pay: false,
                    bank_card: false,
                    cash: false,
                    online_price: false,
                },
                isQiankuan: false,
                describe: '',
                describe2: '',
                info: {
                    orders: {},
                    customer: {},
                    receipt_total: {},
                    receipts: [],
                    pay_mode: {},
                },
                sum: {
                    sumPrice: 0,
                    sumPayment: 0,
                    userPayment: 0,
                    userQiankuan: 0,
                },

                appointment_id: '',
                orders_id: '',
                adviser_id: '',
                customer_id: '',
                id: '',

                userPrice: 0,
                userGivePrice: 0,
                repayPriceTow: "",
                repayPrice: "",
                isSubmitShow: true,

                is_meter: 0,

                proceedsList:[],
                dialogProceeds:false,
                proceedsDisabled: false,
                proceedsForm:{},
                rules:{
                    name: [{ required: true, message: '请输入新增收款方式名称', trigger: 'blur' }],
                },

            }
        },

        mounted() {

            this.appointment_id = this.$route.query.appointment_id
            this.orders_id = this.$route.query.orders_id
            this.adviser_id = this.$route.query.adviser_id
            this.customer_id = this.$route.query.customer_id
            this.id = this.$route.query.id
            this.isEdit = this.$route.query.isEdit ? true : false
            this.isShowPay = this.$route.query.isShowPay ? true : false

            prepaidByCustomer({
                customerId:  this.customer_id
            }).then(res=>{
                if(res.status == 0){
                    // this.userPrice = Number.parseFloat(res.data.price) + Number.parseFloat(res.data.givePrice)
                    this.userPrice = Number.parseFloat(res.data.price)
                    this.userGivePrice = Number.parseFloat(res.data.givePrice)
                }
            })

            if(!this.isEdit){
                //查看订单
                printOrders({
                    ordersId: this.orders_id || this.id,
                }).then(res=>{
                    if(res.status == 0) {
                        this.is_meter = res.data.is_meter
                        this.info = res.data
                        this.info.orders = {}
                        let sumPrice = 0
                        let sumPayment = 0
                        for(let i=0; i<this.info.receipt.length; i++){
                            sumPrice += Number.parseFloat(this.info.receipt[i].price)
                            sumPayment += Number.parseFloat(this.info.receipt[i].payment)
                            // sumPayment += this.info.receipt[i].price
                        }
                        this.info.receipt.forEach(v => {
                            if (v.is_meter == 1) {
                                this.isSubmitShow = false;
                            }
                        });
                        this.sum = {
                            sumPrice,
                            sumPayment
                        }
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error=>{
                    console.log('printOrders no');
                })

            }else{
                //开单&修改订单
                getOrdersEdit({
                    appointmentId: this.appointment_id,
                    ordersId: this.orders_id,
                    adviserId:	this.adviser_id,
                    customerId: this.customer_id,
                    id: this.id,
                }).then(res=>{
                    if(res.status == 0){
                        this.info = res.data
                        let sumPrice = 0
                        let sumPayment = 0
                        for(let i=0; i<this.info.receipts.length; i++){
                            sumPrice += Number.parseFloat(this.info.receipt[i].price)
                            sumPayment += Number.parseFloat(this.info.receipt[i].payment)
                            // sumPayment += this.info.receipts[i].price
                        }
                        this.sum = {
                            sumPrice,
                            sumPayment
                        }
                        if(!this.info.pay_mode) this.info.pay_mode = {}
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error',
                        });
                    }
                }).catch(error=>{
                    console.log('getOrdersEdit no');
                })
            }
            this.getProceeds()

        },
        methods: {

            //添加收款方式
            addProceeds(){
                this.$refs.myProceedsForm.validate((valid) => {
                    if (valid) {
                        this.proceedsDisabled = true;
                        ordersMethodAdd(this.proceedsForm).then(res => {
                            if(res.status == 0){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success',
                                    onClose:()=>{
                                        this.clearForm();
                                        // this.$router.go(0)
                                        this.getProceeds()
                                        this.proceedsDisabled = false;
                                    }
                                });
                            }
                            else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error',
                                    onClose:()=>{
                                        this.proceedsDisabled = false;
                                    }
                                });
                            }
                        }).catch(error => {
                            console.log('ordersMethodList-------no');
                            this.proceedsDisabled = false;
                        });
                    } else {
                        this.$message({
                            message: '请检查表单',
                            type: 'error',
                        })
                    }
                })
            },
            //删除收款方式
            removeProceeds(id){
                this.$confirm('是否删除该收款方式?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ordersMethodClose({id:id}).then(res => {
                        if(res.status == 0){
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                onClose:()=>{
                                    // this.$router.go(0)
                                    this.getProceeds()
                                }
                            });
                        }
                        else{
                            this.$message({
                                message: res.msg,
                                type: 'error',
                            });
                        }
                    }).catch(error => {
                        console.log('ordersMethodClose-------no');
                    });
                })
            },
            //获取收款方式列表
            getProceeds(){
                ordersMethodList({}).then(res => {
                    if(res.status == 0){
                        if(res.data.length > 0){
                            res.data.map((item , index) => {
                                item.ordersMethodStatus = false
                                item.money = ""
                            })
                            this.proceedsList = res.data

                        }
                    }
                }).catch(error => {
                    console.log('ordersMethodList-------no');
                });
            },


            //跳转页面
            pagesToUrl(str){
                switch (str) {
                case 'AffirmChargeback':
                    this.$router.push({  
                        path: 'AffirmChargeback',   
                        query: { 
                            id : this.orders_id || this.id,
                        }
                    })
                    break;
                default:
                    break;
                };
            },

            // 清除表单数据
            clearForm() {
                this.dialogProceeds = false;
                this.form = {
                    name:''
                }
            },

            openDialog(){

                let _m2 = 0

                // 小数及整数等所有数字正则 两位小数
                const REG_ALL_NUMBER = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/


                if(this.show.recharge){

                    if(!this.$base.isNull(this.pay.recharge_debit)){

                        if (!REG_ALL_NUMBER.test(this.pay.recharge_debit)) {
                            this.$message({
                                showClose: true,
                                message: '余额支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        }else{

                            if(Number.parseFloat(this.pay.recharge_debit) > Number.parseFloat(this.userPrice)){
                                this.pay.recharge_debit = Number.parseFloat(this.userPrice)
                            }

                            _m2 += Number.parseFloat(this.pay.recharge_debit)

                        }
                    }
                }

                if(this.show.givePrice){

                    if(!this.$base.isNull(this.pay.give_debit)){
                        if (!REG_ALL_NUMBER.test(this.pay.give_debit)) {
                            this.$message({
                                showClose: true,
                                message: '余额支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        }else{

                            if(Number.parseFloat(this.pay.give_debit) > Number.parseFloat(this.userGivePrice)){
                                this.pay.give_debit = Number.parseFloat(this.userGivePrice)
                            }

                            console.log(this.pay.give_debit)

                            _m2 += Number.parseFloat(this.pay.give_debit)
                        }
                    }
                }
                
                if(this.show.alipay){
                    if(!this.$base.isNull(this.pay.alipay)){
                        if (!REG_ALL_NUMBER.test(this.pay.alipay)) {
                            this.$message({
                                showClose: true,
                                message: '支付宝支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        }else{
                            _m2 += Number.parseFloat(this.pay.alipay)
                        }
                    }
                }if(this.show.wechat_pay){

                    if(!this.$base.isNull(this.pay.wechat_pay)) {
                        if (!REG_ALL_NUMBER.test(this.pay.wechat_pay)) {
                            this.$message({
                                showClose: true,
                                message: '微信支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        } else {
                            _m2 += Number.parseFloat(this.pay.wechat_pay)
                        }
                    }
                }if(this.show.bank_card){
                    if(!this.$base.isNull(this.pay.bank_card)) {
                        if (!REG_ALL_NUMBER.test(this.pay.bank_card)) {
                            this.$message({
                                showClose: true,
                                message: '银行卡支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        } else {
                            _m2 += Number.parseFloat(this.pay.bank_card)
                        }
                    }
                }if(this.show.cash){
                    if(!this.$base.isNull(this.pay.cash)) {
                        if (!REG_ALL_NUMBER.test(this.pay.cash)) {
                            this.$message({
                                showClose: true,
                                message: '现金支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        } else {
                            _m2 += Number.parseFloat(this.pay.cash)
                        }
                    }
                }if(this.show.online_price){
                    if(!this.$base.isNull(this.pay.online_price)) {
                        if (!REG_ALL_NUMBER.test(this.pay.online_price)) {
                            this.$message({
                                showClose: true,
                                message: '其他支付 金额只能是两位小数的数字',
                                type: 'error',
                            });
                            return
                        } else {
                            _m2 += Number.parseFloat(this.pay.online_price)
                        }
                    }
                }

                
                for(let i = 0; i<this.proceedsList.length; i++){
                    let item = this.proceedsList[i]
                    if(item.ordersMethodStatus){

                        if(item.money){
                            if(!this.$base.isNull(item.money)) {
                                if (!REG_ALL_NUMBER.test(item.money)) {
                                    this.$message({
                                        showClose: true,
                                        message: '金额只能是两位小数的数字',
                                        type: 'error',
                                    });
                                    return
                                } else {
                                    _m2 += Number.parseFloat(item.money)
                                }
                            }
                        }
                    }
                }

                //判断是否欠款
                let _m1 = Number.parseFloat(this.$base.twoDecimal(this.sum.sumPayment))

                if(_m2 > _m1){
                    this.$message({
                        showClose: true,
                        message: '支付金额不能大于应付金额',
                        type: 'error',
                    });
                    return
                }else if(_m2 < _m1){
                    //欠款
                    this.isQiankuan = true
                    //查询不计入业绩项目
                    let _tmp = this.info.receipt.find(item=>{
                        return item.is_meter == 1
                    })

                    if(!this.$base.isNull(_tmp)){
                        this.$message({
                            showClose: true,
                            message: '此订单包含不计入业绩品项，所以不能欠款',
                            type: 'error',
                        });
                        return
                    }

                    if(this.is_meter == 1){
                        this.$message({
                            showClose: true,
                            message: '此订单包含不计入业绩品项，所以不能欠款',
                            type: 'error',
                        });
                        return
                    }

                }else{
                    //刚好
                    this.isQiankuan = false
                }

                this.sum.userPayment = _m2
                this.sum.userQiankuan = this.$base.twoDecimal(_m1 - _m2)

                this.dialogPay = true

            },

            myPay(){

                //判断欠款描述必填
                if(this.isQiankuan){
                    if(this.$base.isNull(this.describe)){
                        this.$message({
                            showClose: true,
                            message: '欠款说明必填',
                            type: 'error',
                        });
                        return
                    }
                }

                //判断团购描述必填
                if(this.show.online_price){
                    if(this.$base.isNull(this.describe2)){
                        this.$message({
                            showClose: true,
                            message: '团购描述必填',
                            type: 'error',
                        });
                        return
                    }
                }

                let params = {}

                if(this.isQiankuan) params.describe = this.describe
                if(this.show.recharge)  params.recharge_debit = this.pay.recharge_debit 
                if(this.show.givePrice) params.give_debit = this.pay.give_debit
                if(this.show.alipay)  params.alipay = this.pay.alipay
                if(this.show.wechat_pay)  params.wechat_pay = this.pay.wechat_pay
                if(this.show.bank_card)  params.bank_card = this.pay.bank_card
                if(this.show.cash)  params.cash = this.pay.cash
                if(this.show.online_price){
                    params.online_price = this.pay.online_price
                    params.online_description = this.describe2
                }

                params.heji = this.sum.userPayment
                params.orders_id  = this.orders_id || this.id

                this.proceedsList.filter(item => item.ordersMethodStatus && item.money >= 0 && item.money != '')

                let _arr = this.proceedsList.filter(item => item.ordersMethodStatus && item.money >= 0 && item.money != '')

                let _arr2 = []

                for(let i=0; i< _arr.length; i++){
                    _arr2.push({
                        id: _arr[i].id,
                        money: _arr[i].money,
                    })
                }

                params.ordersMethod = JSON.stringify(_arr2)

                this.disabled = true

                checkOrdersStatus(params).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '收银成功',
                            type: 'success',
                            onClose:()=>{
                                this.$router.go(-1)
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

            repayment() {
                this.disabled = true
                postArrearsRepayment({
                    price: Number.parseFloat(this.repayPrice),
                    arrearsId: this.info.customer.arrears_id,
                }).then(res=>{
                    if(res.status == 0){
                        this.$message({
                            showClose: true,
                            message: '还款成功',
                            type: 'success',
                            onClose:()=>{
                                this.$router.go(0)
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
                    console.log('postArrearsRepayment no');
                    this.disabled = false
                })
            }
        },
        

    }

</script>

<style scoped lang="scss">

    .is-selected {
        color: #1989FA;
    }
</style>
<style>
.proceeds_box .el-dialog__header .el-dialog__title{
    font-size: 16px;
}
.proceeds_box .el-dialog__body{
  padding-top: 0;
}
.proceeds_box .el-dialog__body .content{
  /* overflow-y: scroll; */
  border-top: 1px solid #e5e5e5;
  padding-top: 18px;
}
.proceeds_box .el-dialog__body .content .dialog-footer{
    display: flex;
    justify-content: flex-end;
}
</style>