<template>
  <div id="lottery_d11_order_page">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <el-dialog
        :visible.sync="dialogBuySuccess"
        :show-close="false"
        size="large">

        <p class="text-center F24">购买成功</p>

        <div class="clear1"></div>

        <p class="Fgray-3 text-center F16">购买成功，请关注出票状态，祝您中奖</p>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="wb100">
          <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="back">
            返回
          </div>

          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="toDetail">
            查看详情
          </div>
        </div>

        <div class="clear"></div>

      </el-dialog>

      <el-dialog
        :visible.sync="dialogBuyTicket"
        size="large"
        :show-close="false">

        <p class="text-center F24">提示</p>

        <div class="clear1"></div>

        <p class="Fgray-3 text-center F16 lh20px">{{cur.number}}期已到截止投注时间，您的投注将会投至<span class="Fnum">{{next.number}}</span>期</p>

        <div class="clear1"></div>
        <div class="clear1"></div>

        <div class="wb100">
          <div class="wb40 text-center radius5 Fred h38px lh38px bor-red bor-solid-1a F16 fl" @click="dialogBuyTicket = false">
            取消
          </div>

          <div class="wb40 text-center radius5 h38px lh38px pa1 fr warpper-red Fwhite F16" @click="submitOrder(true)">
            确定
          </div>
        </div>

        <div class="clear"></div>

      </el-dialog>

      <!--<ticket-agreement :show="dialogAgreement" v-on:closecall="closeCallback"></ticket-agreement>-->

      <div class="agreement">
        <el-dialog
          :visible.sync="dialogAgreement"
          :show-close="false"
          size="large"
        >
          <div class="fr" style="margin-top: -20px" @click="toBack"><img class="w20px"src="~@/assets/images/close.png"></div>
          <div class="clear1 h5px"></div>
          <div v-html="contents" style="height: 320px; overflow-y: auto;"></div>
        </el-dialog>
      </div>


      <div class="clear1"></div>
      <div class="pal15 par15 text-center Fgray-3 F14">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="wb100 h40px lh40px bor-gray bor-solid-1a Fgray-3 warpper-white" @click="myBack">
              + 手动添加
            </div>
          </el-col>
          <el-col :span="8">
            <div class="wb100 h40px lh40px bor-gray bor-solid-1a warpper-white" @click="randomSelect">
              + 机选1注
            </div>
          </el-col>
          <el-col :span="8">
            <div class="wb100 h40px lh40px bor-gray bor-solid-1a warpper-white" @click="emptyall">
              <img src="~@/assets/images/icon-clear.png" class="h20px middle"> 清空全部
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="clear"></div>

      <div class="pa15">
        <template v-for="(item,key) in ticket">


          <div class="pat15 pab15 par30 pal50 lh25px bor-gray bor-solid-1a F14 relative warpper-white">

            <div class="h50px w25px absolute" @click="removeTicket(item.original.id)" style="left: 15px; top: 15px;">
              <img src="~@/assets/images/icon-remove.png" style="float: left; margin-top: 15px; width: 20px;">
            </div>

            <router-link :to="{ name: 'LotteryD11', query:{ ticketID: item.original.id }, params:{ playIndex: item.original.playType } }">
              <div class="wb100">
                <p>
                  <span class="Fred Fnum">{{item.numbers}}</span>
                </p>
                <p class="Fgray-2 F12 Fnum">{{item.title}} {{item.num}}注 {{item.num * 2}}元</p>
                <div class="h50px w25px absolute" style="right: 0; top: 15px;">
                  <img src="~@/assets/images/arrow-right.png" class="fr h16px mal15 mar15" style="margin-top: 17px;">
                </div>
              </div>
            </router-link>

          </div>

          <div class="clear1"></div>

        </template>
      </div>

      <div class="center over-hidden F14 Fgray-3" style="width: 233px" v-if="ticket.length>0">

        <!--<div class="fl" @click="cancel"><el-checkbox v-model="checked" style="z-index: -1"></el-checkbox></div>-->
        <div class="fl mal5">购彩表示您已同意《<span class="Fblue" @click="dialogAgreement = true">用户购彩协议</span>》</div>

      </div>

      <div class="text-center F16" style="color: #999999" v-else>亲，你还没投注哦~</div>


      <div class="clear h120px"></div>

      <!--<div class="wb100 fixed warpper-white" style="bottom: 100px;">-->
      <!--<div class="pa15 F14 Fgray-3 lh30px">-->
      <!--<span class="fl">-->
      <!--连续追-->
      <!--</span>-->
      <!--<div class="fl mal10 mar10">-->
      <!--<el-input-number size="small" v-model="periods" @change="periodsChange" :min="1" :max="999" />-->
      <!--</div>-->
      <!--<span class="fl">-->
      <!--期（最多可追999期）-->
      <!--</span>-->
      <!--</div>-->
      <!--</div>-->

      <div class="wb100 bor-gray bor-solid-1t fixed warpper-white" style="bottom: 0;">

        <div class="pal15 par15 h30px lh30px pat5 pab5 warpper-gray-1 bor-gray bor-solid-1t bor-solid-1b relative">
          <span class="fl Fgray-3 F14">余额：<span class="Fred Fnum">￥{{user.accountBalance}}</span></span>

          <div class="w90px center Fgray-3 F14 absolute" style=" left:0 ; right: 0; margin: 0 auto;">
            <span class="fl w20px text-left">投</span>
            <div class="fl">
              <el-input-number type="tel" class="fl text-center" size="small" v-model="multiple" :controls="false" @change="multipleChange" :min="1" :max="9999" />
            </div>
            <span class="fr w20px text-right">倍</span>
          </div>

        </div>

        <div class="pat10 pab10 relative h40px">
          <!--<div class="w80px text-center radius5 Fred h38px lh38px bor-red bor-solid-1a absolute F14" @click="openTrace" style="left: 15px; top: 10px;">-->
          <!--追号投注-->
          <!--</div>-->

          <div class="w80px text-center radius5 h38px lh38px pa1 absolute F14" :class="lock == true ? 'warpper-gray-2 Fwhite' : 'warpper-red Fwhite'" @click="submitOrder" style="right: 15px; top: 10px;">
            立即支付
          </div>

          <div class="  lh20px h20px F14 Fgray-3 fl pa10 Fnum">

            <p>{{sumNum}}注 {{multiple}}倍 {{periods}}期 共<span class="Fred">{{sumPrice}}</span>元</p>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<style>
  .el-input-number--small{ width: 50px;}
</style>

<script>

  import Base from '../../assets/js/base.js'
  import Interface from '../../assets/js/interface.js'
  import Bg from '../../assets/images/bg-more.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        _width: 0,
        _height: 0,
        multiple: 1,
        periods: 1,
        sumNum: 0,
        sumPrice: 0,
        playType: 0,
        ticketID: '',
        lottery_type: 'D11',
        cur: {},
        next: {},
        user: {
          accountBalance: 0,
          nickName: ''
        },
        lock: true,
        dialogBuySuccess: false,
        dialogAgreement: false,
        dialogLogin: false,
        dialogBuyTicket: false,
        dialogPay: false,
        dialogConserve: false,
        duplex: true,
        ticket: [],
        checked: true,
        contents: '<div class="F15 lh25px">\n<p class="text-center">\u5F69\u7968\u901A\u670D\u52A1\u534F\u8BAE</p>\n<p>2016\u5E7406\u670816\u65E5</p>\n<p>\u4E00\u3001\u76F8\u5173\u5B9A\u4E49</p>\n<p>1\u3001\u7528\u6237\uFF1A\u6307\u5728\u5F69\u7968\u901A\u6CE8\u518C\u767B\u8BB0\uFF0C\u5E76\u5F97\u5230\u5F69\u7968\u901A\u5728\u7EBF\u8BA4\u53EF\uFF0C\u6709\u8D44\u683C\u4EAB\u53D7\u5F69\u7968\u901A\u670D\u52A1\u7684\u6CE8\u518C\u4F1A\u5458\u3002</p>\n<p>2\u3001\u4EE3\u8D2D\uFF1A\u6307\u7528\u6237\u4EE5\u6CE8\u518C\u7684\u7528\u6237\u540D\u5355\u72EC\u59D4\u6258\u8D2D\u4E70\u67D0\u5F69\u79CD\uFF0C\u7528\u6237\u5BF9\u6240\u8D2D\u4E70\u7684\u5F69\u7968\u62E5\u6709\u5B8C\u6574\u7684\u5956\u91D1\u83B7\u5F97\u6743\u5229\u3002</p>\n<p>3\u3001\u5408\u4E70\uFF1A\u6307\u4E0D\u540C\u7684\u7528\u6237\u5408\u4F5C\u8D2D\u4E70\u67D0\u5F69\u79CD\uFF0C\u5404\u7528\u6237\u6309\u8D2D\u4E70\u91D1\u989D\u6309\u4EFD\u989D\u62E5\u6709\u6240\u8D2D\u4E70\u5F69\u7968\u7684\u5956\u91D1\u83B7\u5F97\u6743\u5229\u3002</p>\n<p>4\u3001\u9884\u4ED8\u6B3E\u8D26\u6237\uFF1A\u6307\u7528\u6237\u6309\u5F69\u7968\u901A\u7684\u8981\u6C42\uFF0C\u5728\u7F51\u7AD9\u4E0A\u8BBE\u7ACB\u7684\u8D26\u6237\uFF0C\u4E13\u95E8\u7528\u4E8E\u5B58\u653E\u9884\u4ED8\u6B3E\u3002</p>\n<p>5\u3001\u9884\u4ED8\u6B3E\uFF1A\u6307\u7528\u6237\u5B58\u653E\u5728\u9884\u4ED8\u6B3E\u8D26\u6237\u4E2D\u7684\u6B3E\u9879\uFF0C\u4E13\u95E8\u7528\u4E8E\u59D4\u6258\u5F69\u7968\u901A\u8D2D\u4E70\u7528\u6237\u6307\u5B9A\u7684\u5F69\u7968\uFF0C\u4EE5\u53CA\u5F69\u7968\u901A\u63D0\u4F9B\u7684\u5176\u4ED6\u670D\u52A1\u548C\u4EA7\u54C1\u3002</p>\n<p>6\u3001\u7528\u6237\u8D44\u6599\uFF1A\u6307\u7528\u6237\u5728\u6CE8\u518C\u65F6\u63D0\u4F9B\u7684\u4E2A\u4EBA\u4FE1\u606F\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\uFF1A\u7528\u6237\u540D\u3001\u6CE8\u518C\u8D26\u6237\u5BC6\u7801\u3001\u94F6\u884C\u5361\u8D26\u6237\u53CA\u5BC6\u7801\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u7B49\u3002</p>\n<p>\u4E8C\u3001\u672C\u534F\u8BAE\u670D\u52A1\u8303\u56F4</p>\n<p>\u672C\u534F\u8BAE\u670D\u52A1\u8303\u56F4\u5305\u62EC\uFF1A\u63D0\u4F9B\u4EE3\u8D2D\u548C\u5408\u4E70\u5E73\u53F0\uFF1B\u63D0\u4F9B\u5F69\u7968\u76F8\u5173\u8D44\u8BAF\uFF1B\u63D0\u4F9B\u5F69\u7968\u4FE1\u606F\u4EA4\u4E92\u5E73\u53F0\uFF1B\u63D0\u4F9B\u5728\u7EBF\u9884\u4ED8\u652F\u4ED8\u7ED3\u7B97\u670D\u52A1\u3002</p>\n<p>\u4E09\u3001\u7528\u6237\u7684\u6743\u5229</p>\n<p>1\u3001\u8D26\u6237\u7BA1\u7406\u6743\u3002\u7528\u6237\u6709\u6743\u968F\u65F6\u67E5\u8BE2\u7528\u6237\u8D44\u6599\uFF0C\u5E76\u53EF\u5BF9\u7528\u6237\u540D\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u4EE5\u5916\u7684\u4FE1\u606F\u8FDB\u884C\u4FEE\u6539\u3002</p>\n<p>2\u3001\u514D\u8D39\u4F7F\u7528\u6743\u3002\u7528\u6237\u6709\u6743\u514D\u8D39\u4F7F\u7528\u5F69\u7968\u901A\u7684\u5F69\u7968\u6295\u6CE8\u59D4\u6258\u7CFB\u7EDF\u4EE5\u53CA\u514D\u8D39\u83B7\u5F97\u5F69\u7968\u8D44\u8BAF\u3002</p>\n<p>3\u3001\u5F69\u7968\u67E5\u8BE2\u6743\u3002\u7528\u6237\u901A\u8FC7\u5F69\u7968\u901A\u59D4\u6258\u5F69\u7968\u4EE3\u8D2D\u3001\u5408\u4E70\u6210\u529F\u540E\uFF0C\u6709\u6743\u514D\u8D39\u5728\u5F69\u7968\u901A\u67E5\u8BE2\u6240\u4EE3\u8D2D\u3001\u5408\u4E70\u5F69\u7968\u7684\u72B6\u6001\u3002</p>\n<p>4\u3001\u5956\u91D1\u83B7\u5F97\u6743\u3002\u7528\u6237\u901A\u8FC7\u5F69\u7968\u901A\u59D4\u6258\u4EE3\u8D2D\u3001\u5408\u4E70\u5F69\u7968\u6210\u529F\u7684\uFF0C\u82E5\u5F69\u7968\u4E2D\u5956\uFF0C\u7528\u6237\u6709\u6743\u83B7\u5F97\u76F8\u5E94\u5956\u91D1\u3002</p>\n<p>5\u3001\u9884\u4ED8\u6B3E\u8D26\u6237\u6838\u67E5\u6743\u3002\u7528\u6237\u53EF\u4EE5\u968F\u65F6\u5BF9\u9884\u4ED8\u6B3E\u8D26\u6237\u8FDB\u884C\u8D44\u91D1\u4F59\u989D\u6838\u67E5\u3002</p>\n<p>6\u3001\u7533\u8BF7\u63D0\u6B3E\u6743\u3002\u7528\u6237\u5728\u4EFB\u4F55\u65F6\u95F4\u90FD\u53EF\u5BF9\u81EA\u5DF1\u7684\u9884\u4ED8\u6B3E\u4F59\u989D\u7533\u8BF7\u63D0\u6B3E\uFF0C\u5F69\u7968\u901A\u5728\u6838\u5BF9\u7528\u6237\u8D44\u91D1\u6765\u6E90\u6B63\u5E38\u7684\u60C5\u51B5\u4E0B\uFF0C\u5728\u6536\u5230\u63D0\u6B3E\u8BF7\u6C423\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5C06\u7528\u6237\u9884\u4ED8\u6B3E\u4E2D\u9700\u63D0\u53D6\u7684\u6B3E\u9879\u8F6C\u8D26\u5230\u7528\u6237\u6CE8\u518C\u7684\u94F6\u884C\u8D26\u6237\u4E0A\u3002\u7528\u6237\u63D0\u6B3E\u8F6C\u8D26\u6240\u4EA7\u751F\u7684\u94F6\u884C\u8D39\u7528\u7531\u7528\u6237\u627F\u62C5\u3002\n<p>\u56DB\u3001\u7528\u6237\u7684\u4E49\u52A1</p>\n<p>1\u3001\u5168\u9762\u9075\u5B88\u672C\u534F\u8BAE\u7684\u4E49\u52A1\u3002\u5728\u6CE8\u518C\u767B\u8BB0\u6210\u4E3A\u5F69\u7968\u901A\u7528\u6237\u4E4B\u524D\uFF0C\u987B\u8BA4\u771F\u9605\u8BFB\u3001\u7406\u89E3\u672C\u534F\u8BAE\u5404\u6761\u6B3E\uFF0C\u4E00\u7ECF\u6CE8\u518C\u6210\u529F\u5373\u89C6\u4E3A\u540C\u610F\u672C\u534F\u8BAE\u5168\u90E8\u6761\u6B3E\u3002\n<p>2\u3001\u5982\u5B9E\u63D0\u4F9B\u7528\u6237\u8D44\u6599\u4E49\u52A1\u3002\u4E3A\u4FDD\u969C\u7528\u6237\u7684\u5408\u6CD5\u6743\u76CA\uFF0C\u907F\u514D\u5728\u4E2D\u5956\u65F6\u51FA\u73B0\u7528\u6237\u6CE8\u518C\u8D44\u6599\u4E0E\u771F\u5B9E\u60C5\u51B5\u4E0D\u7B26\u5BFC\u81F4\u5151\u5956\u4E0D\u80FD\u7B49\u60C5\u51B5\uFF0C\u8BF7\u7528\u6237\u6309\u7167\u771F\u5B9E\u3001\u5168\u9762\u3001\u51C6\u786E\u7684\u539F\u5219\u63D0\u4F9B\u7528\u6237\u8D44\u6599\u3002\u56E0\u7528\u6237\u8D44\u6599\u4E0D\u771F\u5B9E\u3001\u4E0D\u5168\u9762\u3001\u4E0D\u51C6\u786E\u9020\u6210\u4E0D\u80FD\u5151\u5956\u3001\u4E0D\u80FD\u63D0\u6B3E\u3001\u4E0D\u80FD\u6CE8\u9500\u7B49\u60C5\u51B5\uFF0C\u7531\u7528\u6237\u627F\u62C5\u5168\u90E8\u8D23\u4EFB\u3002\n<p>3\u3001\u5BF9\u5E94\u6CE8\u518C\u4E49\u52A1\u3002\u4E00\u4E2A\u7528\u6237\u540D\u3001\u4E00\u4E2A\u8EAB\u4EFD\u8BC1\u53F7\u3001\u4E00\u4E2A\u7528\u6237\u7684\u771F\u5B9E\u59D3\u540D\u53EA\u80FD\u6709\u6548\u6CE8\u518C\u4E00\u6B21\uFF0C\u4E14\u4E09\u8005\u4E4B\u95F4\u5FC5\u987B\u4E00\u4E00\u5BF9\u5E94\u3002\u4E25\u7981\u4EFB\u4F55\u5F62\u5F0F\u7684\u91CD\u590D\u6CE8\u518C\u53CA\u591A\u6B21\u6076\u610F\u6CE8\u518C\uFF0C\u56E0\u6B64\u800C\u9020\u6210\u7684\u4E00\u5207\u540E\u679C\uFF0C\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002 \u540C\u65F6\uFF0C\u4E3A\u4FDD\u8BC1\u7528\u6237\u64CD\u4F5C\u9884\u4ED8\u6B3E\u8D26\u6237\u7684\u5B89\u5168\u6027\uFF0C\u7528\u6237\u5E94\u4EE5\u4E00\u4E2A\u94F6\u884C\u5361\u8D26\u6237\u5BF9\u5E94\u4E00\u4E2A\u7528\u6237\u771F\u5B9E\u59D3\u540D\u540D\uFF0C\u56E0\u94F6\u884C\u5361\u8D26\u6237\u4E0E\u7528\u6237\u771F\u5B9E\u59D3\u540D\u4E0D\u80FD\u4E00\u4E00\u5BF9\u5E94\u800C\u4EA7\u751F\u7684\u4E0D\u5229\u540E\u679C\uFF0C\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002\n<p>4\u3001\u4FDD\u6301\u7528\u6237\u540D\u4E49\u52A1\u3002\u4E3A\u4FDD\u62A4\u7528\u6237\u8D26\u6237\u548C\u9884\u4ED8\u6B3E\u8D26\u6237\u7684\u5B89\u5168\u6027\uFF0C\u7528\u6237\u540D\u3001\u7528\u6237\u771F\u5B9E\u59D3\u540D\u3001\u8EAB\u4EFD\u8BC1\u53F7\u7801\u4E00\u7ECF\u6CE8\u518C\u786E\u8BA4\u540E\uFF0C\u4E0D\u5F97\u518D\u884C\u66F4\u6539\u3002\n<p>5\u3001\u4FDD\u62A4\u8D26\u6237\u8D44\u6599\u4E49\u52A1\u3002\u7528\u6237\u8D26\u6237\u8D44\u6599\u5305\u62EC\u7528\u6237\u5BC6\u7801\u3001\u4E2A\u4EBA\u8D26\u6237\u4EE5\u53CA\u7528\u6237\u8D26\u6237\u64CD\u4F5C\u6240\u9700\u7684\u8D44\u6599\u3002\u7528\u6237\u52A1\u5FC5\u5BF9\u5176\u8D26\u6237\u8D44\u6599\u81EA\u884C\u4FDD\u5BC6\uFF0C\u4EE5\u514D\u8D26\u6237\u8D44\u6599\u88AB\u76D7\u7528\u6216\u7BE1\u6539\u3002\u56E0\u7528\u6237\u4FDD\u62A4\u4E0D\u5468\u5BFC\u81F4\u8D26\u6237\u8D44\u6599\u88AB\u76D7\u7528\u6216\u7BE1\u6539\u800C\u7ED9\u7528\u6237\u9020\u6210\u7684\u4EFB\u4F55\u635F\u5931\u53CA\u6CD5\u5F8B\u8D23\u4EFB\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002\n<p>6\u3001\u9075\u5B88\u7F51\u7EDC\u5B89\u5168\u7BA1\u7406\u7684\u4E49\u52A1\u3002\u7528\u6237\u4E0D\u5F97\u5229\u7528\u5F69\u7968\u901A\u5371\u5BB3\u56FD\u5BB6\u5B89\u5168\u53CA\u4FB5\u72AF\u516C\u6C11\u7684\u5408\u6CD5\u6743\u76CA\uFF0C\u4E0D\u5F97\u5229\u7528\u5F69\u7968\u901A\u5236\u4F5C\u3001\u590D\u5236\u548C\u4F20\u64AD\u6CD5\u89C4\u89C4\u5B9A\u7684\u6709\u5BB3\u4FE1\u606F\u3002\n<p>7\u3001\u627F\u62C5\u94F6\u884C\u8D39\u7528\u7684\u4E49\u52A1\u3002\u5728\u7533\u8BF7\u63D0\u53D6\u9884\u4ED8\u6B3E\u6216\u56E0\u5408\u540C\u7EC8\u6B62\u8FD4\u8FD8\u9884\u4ED8\u6B3E\u7684\u60C5\u51B5\u4E0B\uFF0C\u6B3E\u9879\u4ECE\u9884\u4ED8\u6B3E\u8D26\u6237\u8F6C\u8D26\u81F3\u7528\u6237\u94F6\u884C\u5361\u7684\u94F6\u884C\u8D39\u7528\u7531\u7528\u6237\u627F\u62C5\u3002\n<p>\u4E94\u3001\u5F69\u7968\u901A\u7684\u6743\u5229</p>\n<p>1\u3001\u7BA1\u7406\u7528\u6237\u8D26\u6237\u7684\u6743\u5229\u3002\u5982\u679C\u7528\u6237\u63D0\u4F9B\u7684\u8D44\u6599\u5305\u542B\u6709\u7B2C\u56DB\u6761\u7B2C3\u6B3E\u591A\u6B21\u6076\u610F\u6CE8\u518C\u4FE1\u606F\u6216\u7B2C6\u6B3E\u6240\u5217\u4FE1\u606F\uFF0C\u5F69\u7968\u901A\u4FDD\u7559\u6CE8\u9500\u5176\u7528\u6237\u8D26\u6237\u6216\u8005\u9650\u5236\u5176\u4F7F\u7528\u5168\u90E8\u6216\u90E8\u5206\u670D\u52A1\u5185\u5BB9\u7684\u6743\u5229\u3002\u4E00\u7ECF\u53D1\u73B0\u7528\u6237\u5229\u7528\u5F69\u7968\u901A\u5236\u4F5C\u3001\u590D\u5236\u548C\u4F20\u64AD\u7684\u4FE1\u606F\u660E\u663E\u5C5E\u4E8E\u7B2C\u4E09\u6761\u7B2C6\u6B3E\u6240\u5217\u4FE1\u606F\u4E4B\u4E00\u7684\uFF0C\u5F69\u7968\u901A\u5C06\u7ACB\u5373\u91C7\u53D6\u5C4F\u853D\u4FE1\u606F\u3001\u53D1\u51FA\u8B66\u544A\u3001\u76F4\u81F3\u5173\u95ED\u7528\u6237\u8D26\u6237\u7B49\u63AA\u65BD\u3002\u5F69\u7968\u901A\u5C06\u4FDD\u5B58\u6709\u5173\u8BB0\u5F55\uFF0C\u5E76\u5411\u56FD\u5BB6\u6709\u5173\u673A\u5173\u62A5\u544A\uFF0C\u7528\u6237\u7684\u7684\u7CFB\u7EDF\u8BB0\u5F55\u5C06\u4F5C\u4E3A\u7528\u6237\u8FDD\u53CD\u6CD5\u5F8B\u6CD5\u89C4\u7684\u8BC1\u636E\u3002\n<p>2\u3001\u4FEE\u6539\u672C\u534F\u8BAE\u6761\u6B3E\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u6709\u6743\u5728\u5FC5\u8981\u65F6\u4FEE\u6539\u534F\u8BAE\u6761\u6B3E\uFF0C\u534F\u8BAE\u6761\u6B3E\u4E00\u65E6\u53D1\u751F\u53D8\u52A8\uFF0C\u5C06\u4F1A\u5728\u5F69\u7968\u901A\u76F8\u5173\u9875\u9762\u4E0A\u63D0\u793A\u6216\u516C\u544A\u4FEE\u6539\u5185\u5BB9\u3002\u5982\u679C\u4E0D\u540C\u610F\u6240\u6539\u52A8\u7684\u5185\u5BB9\uFF0C\u7528\u6237\u53EF\u4EE5\u4E3B\u52A8\u53D6\u6D88\u83B7\u5F97\u7684\u670D\u52A1\u6216\u6CE8\u9500\u7528\u6237\u8EAB\u4EFD\u3002\u5982\u679C\u7528\u6237\u7EE7\u7EED\u4EAB\u7528\u670D\u52A1\uFF0C\u5219\u89C6\u4E3A\u63A5\u53D7\u670D\u52A1\u6761\u6B3E\u7684\u53D8\u52A8\u3002\u5F69\u7968\u901A\u4FDD\u7559\u968F\u65F6\u4FEE\u6539\u6216\u4E2D\u65AD\u670D\u52A1\u800C\u4E0D\u9700\u77E5\u4F1A\u7528\u6237\u7684\u6743\u5229\u3002\u4E3B\u8981\u5305\u62EC\u4EE5\u4E0B\u60C5\u51B5\uFF1A\n<p>\uFF081\uFF09\u589E\u52A0\u6216\u51CF\u5C11\u5F69\u7968\u54C1\u79CD\u3002\u5F69\u7968\u901A\u4EE3\u8D2D\u548C\u5408\u4E70\u7684\u5F69\u7968\u54C1\u79CD\u4EE5\u5F53\u671F\u53EF\u4EE5\u5B9E\u73B0\u8D2D\u4E70\u7684\u54C1\u79CD\u4E3A\u51C6\uFF0C\u957F\u671F\u6216\u4E34\u65F6\u589E\u52A0\u6216\u51CF\u5C11\u5F69\u7968\u54C1\u79CD\u5747\u4E0D\u9700\u4E8B\u5148\u544A\u77E5\u7528\u6237\u3002\n<p>\uFF082\uFF09\u8C03\u6574\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u4EE3\u8D2D\u548C\u5408\u4E70\u670D\u52A1\u622A\u6B62\u65F6\u95F4\u4E00\u822C\u4E3A\u5F53\u671F\u5B98\u65B9\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\u524D2\u5C0F\u65F6\uFF0C\u5F69\u7968\u901A\u6709\u6743\u6839\u636E\u5F69\u7968\u79CD\u7C7B\u548C\u5F53\u671F\u9500\u552E\u60C5\u51B5\u8C03\u6574\u5F69\u7968\u9500\u552E\u622A\u6B62\u65F6\u95F4\uFF0C\u800C\u4E0D\u9700\u4E8B\u5148\u544A\u77E5\u7528\u6237\u3002\n<p>3\u3001\u4EE5\u9884\u4ED8\u6B3E\u4EE3\u8D2D\u5F69\u7968\u7684\u6743\u5229\u548C\u4E49\u52A1\u3002\u5728\u7528\u6237\u5411\u5F69\u7968\u901A\u63D0\u51FA\u4EE3\u8D2D\u8BF7\u6C42\u540E\uFF0C\u5F69\u7968\u901A\u6709\u6743\u4ECE\u5176\u9884\u4ED8\u6B3E\u8D26\u6237\u63D0\u53D6\u8BF7\u6C42\u4EE3\u8D2D\u6240\u9700\u7684\u6B3E\u9879\u91D1\u989D\uFF0C\u4EE3\u4E3A\u5411\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u7533\u8D2D\u7528\u6237\u6307\u5B9A\u7684\u5F69\u7968\u3002\n<p>4\u3001\u4EE3\u4E3A\u5151\u5956\u3001\u9886\u53D6\u5956\u91D1\u3001\u5206\u914D\u5956\u91D1\u7684\u6743\u5229\u548C\u4E49\u52A1\u3002\u5728\u5F69\u7968\u4E2D\u5956\u60C5\u51B5\u4E0B\uFF0C\u7531\u5F69\u7968\u901A\u8D1F\u8D23\u4EE3\u7406\u5151\u5956\u3001\u9886\u53D6\u5956\u91D1\u4E8B\u5B9C\uFF0C\u5E76\u5728\u5F00\u5956\u540E\u76843\u4E2A\u5DE5\u4F5C\u65E5\u5185\u628A\u7A0E\u540E\u5956\u91D1\u6309\u6BD4\u4F8B\u8FDB\u884C\u5206\u914D\uFF0C\u76F4\u63A5\u6C47\u5165\u4E2D\u5956\u7528\u6237\u4E4B\u9884\u4ED8\u6B3E\u8D26\u6237\u3002\n<p>5\u3001\u5236\u6B62\u6076\u610F\u63D0\u6B3E\u6216\u8F6C\u8D26\u7684\u6743\u5229\u3002\u5F69\u7968\u901A\u6709\u6743\u62D2\u7EDD\u9884\u4ED8\u6B3E\u8D26\u6237\u8D44\u91D1\u901A\u8FC7\u5F69\u7968\u901A\u63D0\u73B0\u6216\u8F6C\u81F3\u5176\u4ED6\u975E\u6CE8\u518C\u94F6\u884C\u8D26\u6237\u7684\u884C\u4E3A\uFF0C\u4E00\u65E6\u53D1\u73B0\u6076\u610F\u63D0\u73B0\u6216\u8F6C\u8D26\u884C\u4E3A\uFF0C\u5F69\u7968\u901A\u6709\u6743\u5236\u6B62\u5E76\u5C06\u6B3E\u9879\u9000\u56DE\u539F\u8D26\u6237\u3002\n<p>6\u3001\u5236\u6B62\u672A\u6EE118\u5468\u5C81\u7684\u672A\u6210\u5E74\u4EBA\u8D2D\u4E70\u5F69\u7968\u7684\u6743\u5229\u3002</p>\n<p>\u516D\u3001\u5F69\u7968\u901A\u7684\u4E49\u52A1</p>\n<p>1\u3001\u7528\u6237\u8D26\u6237\u8D44\u6599\u4FDD\u62A4\u4E49\u52A1\u3002\u5F69\u7968\u901A\u5BF9\u7528\u6237\u8D26\u6237\u8D44\u6599\u63D0\u4F9B\u6700\u5927\u9650\u5EA6\u7684\u5B89\u5168\u4FDD\u62A4\u3002\u5F53\u5F69\u7968\u901A\u7528\u6237\u6D89\u5ACC\u76D7\u7528\u4ED6\u4EBA\u7B2C\u4E09\u65B9\u652F\u4ED8\u6E20\u9053\uFF08\u5982\uFF1A\u94F6\u8054\u3001\u8D22\u4ED8\u901A\u3001\u652F\u4ED8\u5B9D\u7B49\uFF09\u8D26\u6237\u8D44\u91D1\uFF0C\u6216\u6D89\u5ACC\u5176\u7B2C\u4E09\u65B9\u652F\u4ED8\u6E20\u9053\u8D26\u6237\u88AB\u76D7\u7528\u7684\uFF0C\u5E94\u6D89\u5ACC\u88AB\u76D7\u7528\u4EBA\u6216\u7B2C\u4E09\u65B9\u652F\u4ED8\u516C\u53F8\u7684\u8981\u6C42\uFF0C\u5728\u5176\u627F\u8BFA\u4EC5\u5C06\u7528\u6237\u8D44\u6599\u7528\u4E8E\u6D89\u5ACC\u76D7\u7528\u4E8B\u4EF6\u5E76\u4E88\u4EE5\u4FDD\u5BC6\u7684\u524D\u63D0\u4E0B\uFF0C\u5F69\u7968\u901A\u5C06\u5411\u8BF7\u6C42\u65B9\u63D0\u4F9B\u6D89\u5ACC\u76D7\u7528\u4EBA\u7684\u7528\u6237\u8D44\u6599\u3002\u5F69\u7968\u901A\u7528\u6237\u540C\u610F\u653E\u5F03\u5728\u6B64\u60C5\u51B5\u4E0B\u5411\u5F69\u7968\u901A\u8FFD\u7A76\u4EFB\u4F55\u8D23\u4EFB\u7684\u6743\u5229\u3002</p>\n<p>2\u3001\u516C\u5E03\u4E2D\u5956\u60C5\u51B5\u7684\u4E49\u52A1\u3002\u5728\u5B98\u65B9\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u53D1\u5E03\u4E2D\u5956\u7ED3\u679C\u540E\u4E03\u4E2A\u5DE5\u4F5C\u65E5\u5185\uFF0C\u5F69\u7968\u901A\u5728\u7F51\u7AD9\u4E2D\u516C\u5E03\u4E2D\u5956\u53F7\u7801\u53CA\u5956\u91D1\u5206\u914D\u60C5\u51B5\uFF0C\u5E76\u4EE5\u5B98\u65B9\u5F69\u7968\u53D1\u884C\u673A\u6784\u548C\u9500\u552E\u673A\u6784\u516C\u5E03\u7684\u4E2D\u5956\u60C5\u51B5\u4E3A\u51C6\u3002</p>\n<p>3\u3001\u63D0\u4F9B\u9884\u4ED8\u6B3E\u5BF9\u8D26\u5355\u7684\u4E49\u52A1\u3002\u5728\u7F51\u7AD9\u4E0A\u5411\u7528\u6237\u63D0\u4F9B\u9884\u4ED8\u6B3E\u5BF9\u8D26\u5355\u3002</p>\n<p>4\u3001\u9884\u4ED8\u6B3E\u8F6C\u8D26\u4E49\u52A1\u3002\u7528\u6237\u5728\u4EFB\u4F55\u65F6\u95F4\u90FD\u53EF\u5BF9\u81EA\u5DF1\u7684\u9884\u4ED8\u6B3E\u4F59\u989D\u7533\u8BF7\u63D0\u6B3E\uFF0C\u5F69\u7968\u901A\u5728\u6838\u5BF9\u7528\u6237\u8D44\u91D1\u6765\u6E90\u6B63\u5E38\u7684\u60C5\u51B5\u4E0B\uFF0C\u5728\u6536\u5230\u63D0\u6B3E\u8BF7\u6C423\u4E2A\u5DE5\u4F5C\u65E5\u5185\u5C06\u7528\u6237\u9884\u4ED8\u6B3E\u4E2D\u9700\u63D0\u53D6\u7684\u6B3E\u9879\u8F6C\u8D26\u5230\u7528\u6237\u6CE8\u518C\u7684\u94F6\u884C\u8D26\u6237\u4E0A\u3002</p>\n<p>\u4E03\u3001\u5927\u989D\u5956\u91D1\u7A0E\u7968\u5F00\u5177</p>\n<p>\u7528\u6237\u5728\u5F69\u7968\u901A\u4EE3\u8D2D\u6216\u5408\u4E70\u5F69\u7968\u83B7\u5F97\u4E2D\u5FC3\u5151\u5956\u7684\u5927\u989D\u5956\u91D1\u7684\uFF0C\u7531\u5F69\u7968\u901A\u4EE3\u4E3A\u5151\u5956\u3002\u6839\u636E\u5404\u5F69\u7968\u4E2D\u5FC3\u4E0E\u5F69\u7968\u901A\u7684\u534F\u8BAE\uFF0C\u5956\u91D1\u7A0E\u7968\u53EA\u80FD\u5F00\u5177\u81F3\u5728\u5404\u5F69\u7968\u4E2D\u5FC3\u5907\u6848\u7684\u5F69\u7968\u901A\u5151\u5956\u4EBA\u5458\u540D\u4E0B\uFF0C\u800C\u65E0\u6CD5\u76F4\u63A5\u5F00\u5177\u81F3\u5177\u4F53\u83B7\u5956\u4EBA\u540D\u4E0B\u3002\u5F69\u7968\u901A\u53EF\u51FA\u5177\u516C\u51FD\u4E3A\u83B7\u5956\u4EBA\u63D0\u4F9B\u5956\u91D1\u6765\u6E90\u8BC1\u660E\u3002</p>\n<p>\u516B\u3001\u534F\u8BAE\u6210\u7ACB\u3001\u53D8\u66F4\u548C\u7EC8\u6B62</p>\n<p>1\u3001\u56E0\u7F51\u7EDC\u6545\u969C\u3001\u8D85\u8FC7\u6307\u5B9A\u8D2D\u4E70\u65F6\u95F4\u3001\u9884\u4ED8\u6B3E\u91D1\u989D\u4E0D\u8DB3\u7B49\u539F\u56E0\uFF0C\u672A\u80FD\u5B8C\u6210\u4EE3\u8D2D\u51FA\u7968\u7684\uFF0C\u89C6\u4E3A\u672C\u6B21\u4EE3\u8D2D\u6216\u5408\u4E70\u59D4\u6258\u672A\u6210\u7ACB\u3002\u5F69\u7968\u901A\u4E0E\u7528\u6237\u53D6\u5F97\u8054\u7CFB\u540E\uFF0C\u4EE5\u53CC\u65B9\u786E\u8BA4\u7684\u65B9\u5F0F\uFF0C\u8FD4\u8FD8\u9884\u4ED8\u8D44\u91D1\u3002</p>\n<p>2\u3001\u5F69\u7968\u901A\u6709\u6743\u5BF9\u672C\u534F\u8BAE\u6761\u6B3E\u8FDB\u884C\u53D8\u66F4\u800C\u65E0\u9700\u4E8B\u5148\u901A\u77E5\u7528\u6237\u3002</p>\n<p>3\u3001\u4EFB\u4F55\u4E00\u65B9\u672A\u80FD\u5C65\u884C\u672C\u534F\u8BAE\u89C4\u5B9A\u7684\u4EFB\u4F55\u4E49\u52A1\uFF0C\u4E14\u5728\u6536\u5230\u53E6\u4E00\u65B9\u53D1\u51FA\u66F4\u6B63\u901A\u77E515\u65E5\u5185\u672A\u80FD\u6539\u6B63\u9519\u8BEF\u7684\uFF0C\u5747\u88AB\u89C6\u4E3A\u81EA\u52A8\u653E\u5F03\u672C\u534F\u8BAE\uFF0C\u534F\u8BAE\u540C\u65F6\u7EC8\u6B62\u3002</p>\n<p>\u4E5D\u3001\u8FDD\u7EA6\u8D23\u4EFB</p>\n<p>1\u3001\u4EFB\u4F55\u4E00\u65B9\u672A\u80FD\u5C65\u884C\u672C\u534F\u8BAE\u89C4\u5B9A\u7684\u4EFB\u4F55\u4E49\u52A1\uFF0C\u4E14\u5728\u6536\u5230\u53E6\u4E00\u65B9\u53D1\u51FA\u66F4\u6B63\u901A\u77E515\u65E5\u5185\u672A\u80FD\u6539\u6B63\u9519\u8BEF\u7684\uFF0C\u5747\u88AB\u89C6\u4E3A\u81EA\u52A8\u653E\u5F03\u672C\u534F\u8BAE\uFF0C\u534F\u8BAE\u540C\u65F6\u7EC8\u6B62\u3002\u53E6\u4E00\u65B9\u5C06\u6709\u6743\u5C31\u56E0\u5BF9\u65B9\u653E\u5F03\u534F\u8BAE\u800C\u9020\u6210\u7684\u7ECF\u6D4E\u635F\u5931\u8FDB\u884C\u8FFD\u507F\u3002</p>\n<p>2\u3001\u56E0\u4EFB\u4F55\u4E00\u65B9\u51FA\u73B0\u8FDD\u53CD\u6CD5\u5F8B\u7684\u884C\u4E3A\u6216\u672C\u534F\u8BAE\u7EA6\u5B9A\u7684\u8FDD\u7EA6\u884C\u4E3A\uFF0C\u90FD\u5E94\u7531\u8D23\u4EFB\u65B9\u81EA\u884C\u8D1F\u8D23\u5E76\u8865\u507F\u7531\u6B64\u7ED9\u5BF9\u65B9\u9020\u6210\u7684\u635F\u5931\u3002</p>\n<p>\u5341\u3001\u514D\u8D23\u6761\u6B3E</p>\n<p>\u53D1\u751F\u4E0B\u5217\u60C5\u51B5\u65F6\uFF0C\u5F69\u7968\u901A\u4E0D\u4E88\u627F\u62C5\u4EFB\u4F55\u6CD5\u5F8B\u8D23\u4EFB\uFF1A</p>\n<p>1\u3001\u7528\u6237\u8D44\u6599\u6CC4\u9732\u3002\u7531\u4E8E\u7528\u6237\u5C06\u5BC6\u7801\u544A\u77E5\u4ED6\u4EBA\u6216\u4E0E\u4ED6\u4EBA\u5171\u4EAB\u6CE8\u518C\u8D26\u6237\uFF0C\u6216\u7531\u4E8E\u7528\u6237\u7684\u758F\u5FFD\uFF0C\u7531\u6B64\u5BFC\u81F4\u7684\u4EFB\u4F55\u4E2A\u4EBA\u8D44\u6599\u6CC4\u9732\uFF0C\u4EE5\u53CA\u7531\u6B64\u4EA7\u751F\u7684\u7EA0\u7EB7\u3002\u65E0\u8BBA\u4F55\u79CD\u539F\u56E0\u5BFC\u81F4\u7684\u7528\u6237\u8D44\u6599\u672A\u6388\u6743\u4F7F\u7528\u3001\u4FEE\u6539\uFF0C\u7528\u6237\u5BC6\u7801\u3001\u4E2A\u4EBA\u8D26\u6237\u6216\u6CE8\u518C\u4FE1\u606F\u88AB\u672A\u6388\u6743\u7BE1\u6539\u3001\u76D7\u7528\u800C\u4EA7\u751F\u7684\u4E00\u5207\u540E\u679C\u3002</p>\n<p>2\u3001\u4E0D\u53EF\u6297\u529B\u53CA\u4E0D\u53EF\u9884\u89C1\u7684\u60C5\u52BF\u53D1\u751F\u3002\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u60C5\u52BF\u5305\u62EC\uFF1A\u81EA\u7136\u707E\u5BB3\u3001\u653F\u5E9C\u884C\u4E3A\u3001\u7F62\u5DE5\u3001\u6218\u4E89\u7B49\uFF1B\u9ED1\u5BA2\u653B\u51FB\u3001\u8BA1\u7B97\u673A\u75C5\u6BD2\u4FB5\u5165\u6216\u53D1\u4F5C\u3001\u653F\u5E9C\u7BA1\u5236\u3001\u5F69\u7968\u53D1\u884C\u548C\u9500\u552E\u673A\u6784\u7684\u539F\u56E0\u3001\u5F69\u7968\u51FA\u7968\u673A\u6216\u670D\u52A1\u7684\u6545\u969C\u3001\u7F51\u7EDC\u6545\u969C\u3001\u56FD\u5BB6\u653F\u7B56\u53D8\u5316\u3001\u6CD5\u5F8B\u6CD5\u89C4\u4E4B\u53D8\u5316\u7B49\u3002\u56E0\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u60C5\u52BF\u9020\u6210\uFF1A\u6682\u65F6\u6027\u5173\u95ED\uFF0C\u7528\u6237\u8D44\u6599\u6216\u4EE3\u8D2D\u3001\u5408\u4E70\u59D4\u6258\u6307\u4EE4\u6CC4\u9732\u3001\u4E22\u5931\u3001\u88AB\u76D7\u7528\u3001\u88AB\u7BE1\u6539\uFF0C\u59D4\u6258\u4EE3\u8D2D\u3001\u5408\u4E70\u5931\u8D25\uFF0C\u5F69\u7968\u901A\u672A\u80FD\u6536\u5230\u59D4\u6258\u6307\u4EE4\u7B49\uFF0C\u4EE5\u53CA\u7531\u6B64\u4EA7\u751F\u7684\u7EA0\u7EB7\u3002\u56E0\u4E0D\u53EF\u6297\u529B\u548C\u4E0D\u53EF\u9884\u89C1\u7684\u60C5\u52BF\u9020\u6210\u672C\u534F\u8BAE\u4E0D\u80FD\u5C65\u884C\u7684\u3002</p>\n<p>3\u3001\u7528\u6237\u539F\u56E0\u6216\u7B2C\u4E09\u65B9\u539F\u56E0\u9020\u6210\u635F\u5931\u3002\u7531\u4E8E\u7528\u6237\u81EA\u8EAB\u539F\u56E0\u3001\u6216\u8FDD\u53CD\u6CD5\u5F8B\u6CD5\u89C4\uFF0C\u4EE5\u53CA\u7B2C\u4E09\u65B9\u7684\u539F\u56E0\uFF0C\u9020\u6210\u7528\u6237\u65E0\u6CD5\u4F7F\u7528\u5F69\u7968\u901A\u670D\u52A1\u6216\u4EA7\u751F\u5176\u4ED6\u635F\u5931\u7684\u3002</p>\n<p>4\u3001\u7528\u6237\u4EE3\u8D2D\u3001\u5408\u4E70\u7684\u5F69\u7968\u800C\u4EA7\u751F\u7684\u635F\u5931\u3002\u7528\u6237\u6839\u636E\u672C\u534F\u8BAE\u8FDB\u884C\u4EE3\u8D2D\u3001\u5408\u4E70\u59D4\u6258\u6295\u6CE8\u800C\u53D1\u751F\u7684\u76F4\u63A5\u3001\u95F4\u63A5\u3001\u5076\u7136\u3001\u7279\u6B8A\u53CA\u7EE7\u8D77\u7684\u635F\u5BB3\u3002</p>\n<p>5\u3001\u7528\u6237\u4F7F\u7528\u94FE\u63A5\u6216\u4E0B\u8F7D\u8D44\u6599\u4EA7\u751F\u7684\u635F\u5BB3\u3002\u7531\u4E8E\u4F7F\u7528\u4E0E\u5F69\u7968\u901A\u94FE\u63A5\u7684\u5176\u5B83\u7F51\u7AD9\uFF0C\u6216\u8005\u4F7F\u7528\u901A\u8FC7\u5F69\u7968\u901A\u4E0B\u8F7D\u6216\u53D6\u5F97\u7684\u8D44\u6599\uFF0C\u9020\u6210\u7528\u6237\u8D44\u6599\u6CC4\u9732\u3001\u7528\u6237\u7535\u8111\u7CFB\u7EDF\u635F\u574F\u7B49\u60C5\u51B5\u53CA\u7531\u6B64\u800C\u5BFC\u81F4\u7684\u4EFB\u4F55\u4E89\u8BAE\u548C\u540E\u679C\u3002</p>\n<p>\u5341\u4E00\u3001\u6CD5\u5F8B\u9002\u7528\u548C\u7BA1\u8F96</p>\n<p>\u672C\u534F\u8BAE\u9002\u7528\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6CD5\u5F8B\uFF0C\u53D1\u751F\u7684\u4E89\u8BAE\u63D0\u4EA4\u91CD\u5E86\u5E02\u4EF2\u88C1\u59D4\u5458\u4F1A\uFF0C\u5176\u4EF2\u88C1\u88C1\u51B3\u662F\u7EC8\u5C40\u7684\u3002</p>\n<p>\u5341\u4E8C\u3001\u5728\u6CD5\u5F8B\u5141\u8BB8\u8303\u56F4\u5185\uFF0C\u672C\u534F\u8BAE\u6700\u7EC8\u89E3\u91CA\u6743\u5F52\u5F69\u7968\u901A\u6240\u6709\u3002</p>\n</div>',
      }
    },

    methods: {
      init() {

        Interface.userBaseInfo( (data) => {
          if (data) {
            if (Base.isNull(data.returnJSON)) {
              //未登录
            } else {
              //已登录
              this.user = data.returnJSON;
              Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
            }
          } else {
            //获取失败
          }
        });

        var ticket = window.sessionStorage.getItem("d11_ticket");

        if (Base.isNull(ticket)) {
          this.ticket = [];
          this.calculate();
          this.fullscreenLoading = false;
          return false;
        }

        ticket = JSON.parse(ticket);

        this.ticket = [];

        if (Base.isNull(ticket) || ticket.length == 0) {
          this.calculate();
          this.fullscreenLoading = false;
          return false;
        }

        //重组票

        //                console.log(ticket);

        for (var i = 0; i < ticket.length; i++) {
          var original = ticket[i];
          //                    let _item = ticket[i].numbers;
          //                    let _num = ticket[i].num;
          //                    let _type = ticket[i].playType;

          var _title = '';

          if (ticket[i].playType == 0) {
            _title = '任选二';
          }if (ticket[i].playType == 1) {
            _title = '任选三';
          }if (ticket[i].playType == 2) {
            _title = '任选四';
          }if (ticket[i].playType == 3) {
            _title = '任选五';
          }if (ticket[i].playType == 4) {
            _title = '任选六';
          }if (ticket[i].playType == 5) {
            _title = '任选七';
          }if (ticket[i].playType == 6) {
            _title = '任选八';
          }if (ticket[i].playType == 7) {
            _title = '前一';
          }if (ticket[i].playType == 8) {
            _title = '前二直选';
          }if (ticket[i].playType == 9) {
            _title = '前二组选';
          }if (ticket[i].playType == 10) {
            _title = '前三直选';
          }if (ticket[i].playType == 11) {
            _title = '前三组选';
          }

          if (ticket[i].playType == 8) {
            //前二直选
            this.ticket.push({
              title: _title,
              num: ticket[i].num,
              numbers: ticket[i].numbers.split(',').join(' '),
              original: original
            });
          } else if (ticket[i].playType == 10) {
            //前三直选
            this.ticket.push({
              title: _title,
              num: ticket[i].num,
              numbers: ticket[i].numbers.split(',').join(' '),
              original: original
            });
          } else {
            this.ticket.push({
              title: _title,
              num: ticket[i].num,
              numbers: ticket[i].numbers.split(',').join(' '),
              original: original
            });
          }
        }

        if (this.ticket.length > 0) {
          this.ticket = this.ticket.reverse();
          this.lock = false;
          this.calculate();
          this.fullscreenLoading = false;
        }

      },
      cancel() {

        this.checked = !this.checked;
      },
      closeCallback(val) {

        console.log(val);

        if (val == 'close') {
          this.dialogAgreement = false;
        }
      },
      openTrace() {},
      loginCallback(val) {

        if (val == 'cancel') {
          this.dialogLogin = false;
          this.$message({
            type: 'info',
            message: '取消登录'
          });
        }

        if (val == 'success') {
          this.dialogLogin = false;
          //登录成功
          this.$message({
            type: 'success',
            message: '登录成功'
          });

          Interface.userBaseInfo( (data) => {

            if (data) {
              if (Base.isNull(data.returnJSON)) {
                //未登录
              } else {
                //已登录
                this.user = data.returnJSON;

                Base.setCookie('userInfo', JSON.stringify(data.returnJSON));
              }
            } else {
              //获取失败
            }
          });
        }
      },
      payCallback(val) {

        if (val == 'cancel') {
          this.dialogPay = false;
          this.$message({
            type: 'info',
            message: '取消充值'
          });
        }

        if (val == 'success') {
          this.dialogPay = false;
          //充值成功
          this.$message({
            type: 'success',
            message: '充值成功'
          });
        }
      },

      myBack() {
        if (Base.isNull(this.call)) {
//            this.$router.go(-1);
          this.$router.replace({ name: 'LotteryD11', params:{ playIndex: this.playIndex } });
        } else {
            this.$router.replace({ name: this.call });
        }
      },

      toBack() {
        this.dialogAgreement = false;
      },
      toDetail() {

        if (Base.isNull(this.ticketID)) {
          //投注失败
        } else {
            this.$router.push({ name: 'TicketDetail', params:{ ticketID: this.ticketID } });
        }

        this.dialogBuySuccess = false;
      },
      back() {
        this.dialogBuySuccess = false;
      },
      calculate() {

        var ticket = window.sessionStorage.getItem('d11_ticket');

        if (Base.isNull(ticket)) {
          this.sumNum = 0;
          this.sumPrice = 0;
          this.multiple = 1;
          this.periods = 1;
          this.lock = true;
          return false;
        }

        ticket = JSON.parse(ticket);

        if (Base.isNull(ticket)) {
          this.sumNum = 0;
          this.sumPrice = 0;
          this.multiple = 1;
          this.periods = 1;
          this.lock = true;
          return false;
        }

        var _sumNum = 0;
        var _sumMultiple = 0;

        for (var i = 0; i < ticket.length; i++) {
          _sumNum += ticket[i].num;
        }

        _sumMultiple = this.multiple;

        this.sumNum = _sumNum;

        this.sumPrice = _sumNum * 2 * _sumMultiple * this.periods;

        //                console.log(_sumNum)

        if (_sumNum > 0) {
          this.lock = false;
        } else {
          this.lock = true;
        }
      },
      multipleChange(val) {
        this.multiple = val;
        this.calculate();
      },
      periodsChange(val) {
        this.periods = val;
        this.calculate();
      },
      removeTicket(id) {
        Base.delTicketByID(id, 'd11');
        this.init();
      },

      //清空全部
      emptyall() {
          window.sessionStorage.setItem('d11_ticket', JSON.stringify([]));
        this.init();
        this.calculate();
      },

      //机选
      randomSelect() {

        var _rball = [];

        _rball.push(Base.addZero(Base.random_num(1, 11)));

        var _length = 0;

        if (this.typeIndex == 0) _length = 1;

        if (this.typeIndex == 1) _length = 2;

        if (this.typeIndex == 2) _length = 3;

        if (this.typeIndex == 3) _length = 4;

        if (this.typeIndex == 4) _length = 5;

        if (this.typeIndex == 5) _length = 6;

        if (this.typeIndex == 6) _length = 7;

        if (this.typeIndex == 8) _length = 1;

        if (this.typeIndex == 9) _length = 1;

        if (this.typeIndex == 10) _length = 2;

        if (this.typeIndex == 11) _length = 2;

        for (var i = 0; i < _length; i++) {
          var rd = Base.addZero(Base.random_num(1, 11));
          var _flag = true;
          for (var _i = 0; _i < _rball.length; _i++) {
            //去重
            if (rd == _rball[_i]) {
              _flag = false;
              break;
            }
          }
          if (_flag) {
            _rball.push(rd);
          } else {
            i--;
          }
        }

        if (this.typeIndex == 8) {
          //前二直选

          var _result = _rball.join(" | ");
          var _result2 = _rball.slice(0, 1);
          var _result3 = _rball.slice(1, 2);

          //                    console.log(_rball)

          var ticket = window.sessionStorage.getItem('d11_ticket');

          if (Base.isNull(ticket)) ticket = [];else ticket = JSON.parse(ticket);

          ticket.push({
            id: Base.getUuid(),
            num: 1,
            numbers: _result,
            numbers2: _result2,
            numbers3: _result3,
            playType: this.typeIndex
          });

          window.sessionStorage.setItem('d11_ticket', JSON.stringify(ticket));

          this.init();

          this.calculate();
        } else if (this.typeIndex == 10) {
          //前三直选

          var _result5 = _rball.join(" | ");
          var _result6 = _rball.slice(0, 1);
          var _result7 = _rball.slice(1, 2);
          var _result4 = _rball.slice(2, 3);

          var _ticket = window.sessionStorage.getItem('d11_ticket');

          if (Base.isNull(_ticket)) _ticket = [];else _ticket = JSON.parse(_ticket);

          _ticket.push({
            id: Base.getUuid(),
            num: 1,
            numbers: _result5,
            numbers2: _result6,
            numbers3: _result7,
            numbers4: _result4,
            playType: this.typeIndex
          });
          window.sessionStorage.setItem('d11_ticket', JSON.stringify(_ticket));

          this.init();
        } else {
          //普通
          var _result8 = _rball.join(",");

          var _ticket2 = window.sessionStorage.getItem('d11_ticket');

          if (Base.isNull(_ticket2)) _ticket2 = [];else _ticket2 = JSON.parse(_ticket2);

          _ticket2.push({
            id: Base.getUuid(),
            num: 1,
            numbers: _result8,
            playType: this.typeIndex
          });
          window.sessionStorage.setItem('d11_ticket', JSON.stringify(_ticket2));

          this.init();
        }
      },
      submitOrder(flag) {

        if (this.lock == true) {
          return false;
        }

        this.lock = true;

        //判断用户登录，这里弹出登录
        var _userID = Interface.getUserId();

        if (_userID == 0) {
            this.$router.push({ name: 'Login', params: { call: true } });
          return false;
        }else{
          //判断余额,余额不足弹出充值界面
//          if (Interface.getBalance() < this.sumPrice) {
//              this.$router.push({ name: 'Recharge', params: { call: true, money: this.sumPrice - Interface.getBalance() } })
//            return false;
//          }
        }

//        if (this.checked == false) {
//          this.$message({
//            type: 'info',
//            message: '需要同意《用户购彩协议》，才可以购买'
//          });
//          this.lock = false;
//          return false;
//        }

        //重组票

        var _anteCodeList = [];

        var ticket = window.sessionStorage.getItem("d11_ticket");

        ticket = JSON.parse(ticket);

        //                console.log(ticket);
        //
        //                return false;

        var _playType = 0;
        var _numbers = 0;

        var _ticketList = [];

        for (var i = 0; i < ticket.length; i++) {

          //                    num == 1
          //                    let _this = ticket[i];
          //                console.log(ticket[i])


          if (ticket[i].playType == 8) {
            _playType = 9;
            _numbers = ticket[i].numbers.split(' | ').join('|');
          } else if (ticket[i].playType == 10) {
            _playType = 10;
            _numbers = ticket[i].numbers.split(' | ').join('|');
          } else if (ticket[i].playType == 0) {
            _playType = 2;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 1) {
            _playType = 3;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 2) {
            _playType = 4;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 3) {
            _playType = 5;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 4) {
            _playType = 6;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 5) {
            _playType = 7;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 6) {
            _playType = 8;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 7) {
            _playType = 1;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 9) {
            _playType = 11;
            _numbers = ticket[i].numbers;
          } else if (ticket[i].playType == 11) {
            _playType = 12;
            _numbers = ticket[i].numbers;
          }

          //                    _anteCodeList.push({
          //                        ticketType : ticket[i].num == 1 ? 0 : 1,
          //                        anteCode : _numbers,
          //                    })

          _ticketList.push({
            playType: _playType,
            anteCodeList: [{
              ticketType: ticket[i].num == 1 ? 0 : 1,
              anteCode: _numbers
            }]
          });
        }

//                console.log(_ticketList);

        //                return false;


        //判断奖期
        Interface.awardPeriod(this.lottery_type, (data) => {

          var _tmp = data.returnJSON.reverse();

          //判断期数

          var _timer = 0;

          var _now = new Date().getTime();

          _timer = Math.round((Base.get_unix_time(_tmp[1].stopTime) - _now) / 1000);

          var _number = 0;

          if (_timer < 30) {
            //下一期
            if(flag == true){
              _number = this.next.number;
              this.dialogBuyTicket = false;
              this.lock = false;
            }else{
              //提示
              this.dialogBuyTicket = true;
              this.cur = _tmp[1];
              this.next = _tmp[0];
              this.lock = false;
              return false;
            }
          }else{
            _number = _tmp[1].number;
          }

          if (_number!=0) {

            Interface.d11Ticket(_ticketList, this.lottery_type, _number, this.multiple, (data, errorMsg) => {

              if (data) {

                //- 2017年6月14日16:55:51
                //下单成功，清空所有临时票
                window.sessionStorage.setItem("d11_ticket", JSON.stringify([]));

                //- 2017年12月4日18:10:12
                //- 新增余额补款模式
                if(data.returnJSON.tradeResult == 1){
                  //余额购买成功
                  this.dialogBuySuccess = true;
                  this.ticketID = data.returnJSON.ticketID;
                  this.init();
                }else if(data.returnJSON.tradeResult == 2){
                  //下单成功，需要补款

                  //生成待支付订单

                  let tmpOrder = {
                    money: this.sumPrice,
                    lotteryType: this.lottery_type,
                    tradeNo: data.returnJSON.tradeNo
                  }

                  window.sessionStorage.setItem("tmpOrder", JSON.stringify(tmpOrder));

                  this.$router.push({ name: 'Pay' });
                }else{
                  //支付失败
                  this.$message({
                    type: 'error',
                    message: errorMsg || '购买失败'
                  });
                }

              } else {
                this.$message({
                  type: 'error',
                  message: errorMsg
                });
              }
            });
          }
        });
      }
    },

    mounted(){

      let lottery_type = window.sessionStorage.getItem("d11PlayType");

      if(Base.isNull(lottery_type)){
        //默认值
        lottery_type = 'D11';
      }

      this.lottery_type = lottery_type;

      this.width = $(window).width();
      this.height = $(window).height();

      this.width_ball = Math.floor((this.width - 6 * 12 - 30) / 7);

      let playIndex = this.$route.params.playIndex;

      if (Base.isNull(playIndex)) {
        playIndex = 0;
      }
      this.typeIndex = playIndex;

      this.init();


    }

  }


</script>

