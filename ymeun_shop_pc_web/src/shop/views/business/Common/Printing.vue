<template>
  <div class="Printing bg-white">
    <div class="block" style="padding-bottom: 20px;">
      <div class="table-responsive">
        <!-- 收银-消费单 -->
        <table
          v-if="type == 1"
          ref="CashRegister"
          style="width: 832px;max-height: 300px; text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;   font-size: 6px">消费单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td
                style="width: 200px;padding-left: 3px;   font-size: 6px"
                colspan="2"
              >客户卡号:&nbsp;&nbsp;{{customerList.customer.customer_code}}</td>
              <td
                style="width: 92px;padding-left: 3px;   font-size: 6px"
                colspan="2"
              >姓名:&nbsp;&nbsp;{{customerList.customer.customer_name}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">营业时间:&nbsp;&nbsp;{{toDay}}</td>
              <td
                style="padding-left: 3px;width: 370px;   font-size: 6px"
                colspan="2"
              >消费时间:&nbsp;&nbsp;{{customerList.customer.orders_time}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">序号</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">项目/产品</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">次数</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.adviser}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.technician}}</td>
            </tr>
            <tr
              style="height: 19px;line-height: 19px;"
              v-for="(item, index) in customerList.receipt"
              :key="index"
            >
              <td style="padding-left: 3px;   font-size: 6px">{{index + 1}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{item.items_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.number_one}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.payment}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.adviser_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.technician_name}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="4">合计</td>
              <td
                style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"
                colspan="3"
              >{{customerList.receipt_total.receipt_payable}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">收银明细</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="7">
                支付宝:{{customerList.pay_mode.alipay}}
                微信:{{customerList.pay_mode.wechatPay}}
                银行卡:{{customerList.pay_mode.bank_card}}
                现金:{{customerList.pay_mode.cash}}
                其他:{{customerList.pay_mode.online_price}}
                充值扣款:{{customerList.pay_mode.recharge_debit}}
                券额:{{customerList.pay_mode.give_debit}}
                <template v-if="customerList.pay_mode.ordersMethodData">
                  <span style="font-size: 6px"  v-for="(item , index) in customerList.pay_mode.ordersMethodData" :key="index">
                    {{item.name + ":" + item.price}}
                  </span>
                </template>
                欠款:{{customerList.pay_mode.arrearsPrice}}
              </td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">还款支付</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="7">
                <template v-for="item in customerList.pay_mode.huanKuanData">
                  <p><span class="fl w184px">{{item.price}}</span> {{item.created_at}}</p>
                </template>
              </td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">备注:</td>
              <td
                style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"
                colspan="8"
              >{{customerList.customer.payment_str }}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td
                style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"
              >{{customerList.customer.username}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <!-- 退单-退款单 -->
        <table
          v-if="type == 2"
          ref="refund"
          style="width: 832px;max-height: 300px; text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;   font-size: 6px">退款单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td style="width: 200px;padding-left: 3px;   font-size: 6px" colspan="2">客户卡号:&nbsp;&nbsp;{{ReturnOfReceiptList.customer.orders_code}}</td>
              <td style="width: 92px;padding-left: 3px;   font-size: 6px" colspan="2">姓名:&nbsp;&nbsp;{{ReturnOfReceiptList.customer.customer_name}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">营业时间:&nbsp;&nbsp;{{toDay}}</td>
              <td style="padding-left: 3px;width: 370px;   font-size: 6px" colspan="2">退单时间:&nbsp;&nbsp;{{ReturnOfReceiptList.customer.refund_time}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">序号</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">项目/产品</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">总次数</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">未划扣次数</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.adviser}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.technician}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;"  v-for="(item, index) in ReturnOfReceiptList.receipt" :key="index">
              <td style="padding-left: 3px;   font-size: 6px">{{index + 1}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{item.items_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.number}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.not_number_one}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.adviser_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.technician_name}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="7">{{ReturnOfReceiptList.receipt_total.receipt_payable}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">备注</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="8">{{ReturnOfReceiptList.customer.describe}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{ReturnOfReceiptList.customer.operator}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">审核</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr> 
          </tbody>
        </table>

        <!-- 划扣-划扣明细单 -->
        <table
          v-if="type == 3"
          ref="Scratch"
          style="width: 832px;max-height: 300px; text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr style=" ">
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;  font-size: 6px">划扣明细单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td style="width: 200px;padding-left: 3px;   font-size: 6px" colspan="2">客户卡号:&nbsp;&nbsp;{{ScratchOrderList.customer.code}}</td>
              <td style="width: 92px;padding-left: 3px;   font-size: 6px" colspan="2">姓名:&nbsp;&nbsp;{{ScratchOrderList.customer.name}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">营业时间:&nbsp;&nbsp;{{ScratchOrderList.consume.business_time}}</td>
              <td style="padding-left: 3px;width: 370px;    font-size: 6px" colspan="2">消费时间:&nbsp;&nbsp;{{ScratchOrderList.consume.huakou_time}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">序号</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">项目/产品</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">划扣次数</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">单价</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">总价</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">预约{{$store.getters.roleName.adviser}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.technician}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;" v-for="(item, index) in ScratchOrderList.list" :key="index">
              <td style="padding-left: 3px;   font-size: 6px">{{index + 1}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{item.items_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.number}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.univalent}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.amount}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.adviser.name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.technician.name}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="3">合计</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">{{ScratchOrderList.consume.quantity}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="3">{{ScratchOrderList.consume.amount}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{ScratchOrderList.consume.fullname}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <!-- 还款单 -->
        <table
          v-if="type == 4"
          ref="repayment"
          style="width: 832px;max-height: 300px; text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;   font-size: 6px" >还款单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td style="width: 200px;padding-left: 3px;   font-size: 6px" colspan="2">客户卡号:&nbsp;&nbsp;{{PaymentSlipList.customer.customer_code}}</td>
              <td style="width: 92px;padding-left: 3px;  font-size: 6px;" colspan="2">姓名:&nbsp;&nbsp;{{PaymentSlipList.customer.customer_name}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">营业时间:&nbsp;&nbsp;{{toDay}}</td>
              <td style="padding-left: 3px;width: 370px;   font-size: 6px" colspan="2">还款时间:&nbsp;&nbsp;{{PaymentSlipList.customer.arrearsTime}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">序号</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">项目/产品</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">次数</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.adviser}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{$store.getters.roleName.technician}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;" v-for="(item, index) in PaymentSlipList.receipt" :key="index">
              <td style="padding-left: 3px;   font-size: 6px">{{index + 1}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{item.items_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.number}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.payment}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.adviser_name}}</td>
              <td style="padding-left: 3px;   font-size: 6px">{{item.technician_name}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="4">金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="4">{{PaymentSlipList.customer.receipt_payable}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">备注</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="4">欠款:{{PaymentSlipList.customer.ArrearsPrice}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="4">还款:{{PaymentSlipList.customer.RepaymentPrice}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{PaymentSlipList.customer.username}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <!-- 充值单 -->
        <table
          v-if="type == 5"
          ref="Recharge"
          style="width: 832px;max-height: 300px;  text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;   font-size: 6px">充值单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td style="width: 200px;padding-left: 3px;   font-size: 6px" colspan="2">客户卡号:&nbsp;&nbsp;{{RechargeSlipList.customerCode}}</td>
              <td style="width: 122px;padding-left: 3px;   font-size: 6px" colspan="2">姓名:&nbsp;&nbsp;{{RechargeSlipList.customerName}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">营业时间:&nbsp;&nbsp;{{toDay}}</td>
              <td style="padding-left: 3px;width: 370px;   font-size: 6px" colspan="2">充值时间:&nbsp;&nbsp;{{RechargeSlipList.prepaidTime}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">序号</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="1">充值金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">券额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">操作人</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">充值人员</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px;   font-size: 6px">1</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="1">{{RechargeSlipList.price}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{RechargeSlipList.getPrice}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{RechargeSlipList.loginName}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">{{RechargeSlipList.membersName}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">备注</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="8">{{RechargeSlipList.remark}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{RechargeSlipList.loginName}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">审核</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <!-- 合作企业 -->
        <table
          v-if="type == 6"
          ref="Cooperation"
          style="width: 832px;max-height: 300px;  text-align: left;margin: 10px auto"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td colspan="8" style="text-align: center;height: 20px;line-height: 20px;   font-size: 6px">合作企业消费单</td>
            </tr>
            <tr style="height: 19px;line-height: 19px; margin-top:20px;">
              <td style="width: 200px;padding-left: 3px;   font-size: 6px" colspan="2">客户卡号:&nbsp;&nbsp;{{CooperationSlipList.customerCode}}</td>
              <td style="width: 122px;padding-left: 3px;   font-size: 6px" colspan="2">姓名:&nbsp;&nbsp;{{CooperationSlipList.customerName}}</td>
              <td style="width: 170px;padding-left: 3px;   font-size: 6px" colspan="2">打印时间:&nbsp;&nbsp;{{CooperationSlipList.printingTime}}</td>
              <td style="padding-left: 3px;width: 370px;   font-size: 6px" colspan="2">消费时间:&nbsp;&nbsp;{{CooperationSlipList.orderTime}}</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">开单企业</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">开单类型</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="3">开单金额</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2">开单人及百分比</td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px;   font-size: 6px">{{CooperationSlipList.businessName}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">
                <span v-for="(item, index) in CooperationSlipList.type" :key="index">
                  {{item.name}}
                  <br>
                </span>
              </td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="3">{{CooperationSlipList.price | _FloatFormat}}</td>
              <td style="padding-left: 3px;   font-size: 6px" colspan="2">
                <span v-for="(item, index) in CooperationSlipList.member" :key="index">
                  {{item.name}}({{item.ratio}}%),
                  <br>
                </span>
              </td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">合计</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="6">{{CooperationSlipList.price | _FloatFormat}}</td>
            </tr>

            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">收银明细</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">支付宝:0.00</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan='2'>微信:0.00</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan='2'>银行卡:0.00</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">现金:{{CooperationSlipList.price | _FloatFormat}}</td>
            </tr>

            <tr>
              <td style="padding-left: 3px;  font-size: 6px" colspan="1"></td>
              <td style="padding-left: 3px;  font-size: 6px">其他:0.00</td>
              <td style="padding-left: 3px;  font-size: 6px" colspan="2">充值扣款:0.00</td>
              <td style="padding-left: 3px;  font-size: 6px"  colspan="2">券额:0.00</td>
              <td style="padding-left: 3px;  font-size: 6px">欠款:0.00</td>
            </tr>

            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">备注</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="8"></td>
            </tr>
            <tr style="height: 19px;line-height: 19px;">
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">POS/工号:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">{{CooperationSlipList.pos}}</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px"></td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px">客户签名:</td>
              <td style="padding-left: 3px; border-top: 1px solid #ddd;   font-size: 6px" colspan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center">
      <!-- 收银-消费单 -->
      <el-button type="primary" @click="consumptionClick" v-if="type == 1">打印</el-button>
      <!-- 退单管理-退款 -->
      <el-button type="primary" @click="refundClick" v-if="type == 2">打印</el-button>
      <!-- 划扣-消费明细单 -->
      <el-button type="primary" @click="ScratchClick" v-if="type == 3">打印</el-button>
      <!-- 还款 -->
      <el-button type="primary" @click="repaymentClick" v-if="type == 4">打印</el-button>
      <!-- 充值 -->
      <el-button type="primary" @click="RechargeClick" v-if="type == 5">打印</el-button>
      <!-- 合作企业 -->
      <el-button type="primary" @click="CooperationClick" v-if="type == 6">打印</el-button>
      <el-button @click="ReturnClick">取消</el-button>
    </div>
  </div>
</template>

<script>
import { 
  PrintConsumption, 
  ReturnOfReceipt,
  ScratchOrder,
  PaymentSlip,
  RechargeSlip,
  CooperationSlip
} from "@/shop/assets/api/common/common";
export default {
  name: "Printing",
  components: {},
  data() {
    return {
      type: "",
      toDay: "",
      ID: "",
      command: "",
      // 退单管理
      ReturnOfReceiptList:{
        customer:{},
        receipt_total:{}
      },
      // 收银-消费
      customerList: {
        customer: {},
        receipt_total: {},
        pay_mode: {}
      },
      // 划扣打印
      ScratchOrderList:{
        customer:{},
        consume:{}
      },
      // 还款
      PaymentSlipList:{},
      // 充值
      RechargeSlipList:{},
      CooperationSlipList:{}
    };
  },
  methods: {
    // 时间
    timeData() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.toDay = currentdate;
    },
    // 返回
    ReturnClick() {
      this.$router.go(-1);
    },
    // 收银-消费单
    consumptionClick() {
      this.$print(this.$refs.CashRegister);
    },
    // 退单管理-退款
    refundClick() {
      this.$print(this.$refs.refund);
    },
    // 划扣-消费明细单
    ScratchClick() {
      this.$print(this.$refs.Scratch);
    },
    // 还款
    repaymentClick() {
      this.$print(this.$refs.repayment);
    },
    // 充值
    RechargeClick() {
      this.$print(this.$refs.Recharge);
    },
    // 合作企业
    CooperationClick() {
      this.$print(this.$refs.Cooperation);
    },

    // 收银打印数据
    consumptionData() {
      PrintConsumption({ ordersId: this.ID }).then(res => {
        if (res.status == 0) {
          this.customerList = res.data;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    },

    // 退单-退款单
    refundData() {
      ReturnOfReceipt({ mark: this.ID }).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.ReturnOfReceiptList = res.data;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    },

    // 划扣-消费明细
    ScratchOrderData() {

      let params = {
        customerId:this.ID
      }

      if(this.command){
        params = {
          consumeCommand: this.command
        }
      }

      ScratchOrder(params).then(res => {
        if (res.status == 0) {
          this.ScratchOrderList = res.data;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    },

    // 还款
    PaymentSlipData() {
      PaymentSlip({ordersId :this.ID}).then(res => {
        if (res.status == 0) {
          this.PaymentSlipList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    },

    // 充值
    RechargeSlipData() {
      RechargeSlip({command :this.ID}).then(res => {
        if (res.status == 0) {
          this.RechargeSlipList = res.data;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    },


    // 合作企业
    CooperationData() {
      CooperationSlip({id :this.ID}).then(res => {
        if (res.status == 0) {
          this.CooperationSlipList = res.data;
        }else {
          this.$message({
            message: res.msg,
            type: "error",
            duration:'1000',
            onClose:() => {
              this.$router.go(-1);
            }
          });
        }
      });
    }


  },
  created() {
    // 获取id
    this.type = this.$route.query.type;
    this.ID = this.$route.query.id;
    this.command = this.$route.query.command;

    // 时间
    this.timeData();
    if (this.$route.query.type == 1) {
      this.consumptionData();
    }else if (this.$route.query.type == 2) {
      this.refundData();
    }else if (this.$route.query.type == 3) {
      this.ScratchOrderData();
    }else if (this.$route.query.type == 4) {
      this.PaymentSlipData();
    }else if (this.$route.query.type == 5) {
      this.RechargeSlipData();
    }else if (this.$route.query.type == 6) {
      this.CooperationData();
    }


  }
};
</script>

<style scoped lang="scss">
.Printing {
  margin: 0 0.2rem;
  .text-center {
    padding-bottom: 40px;
  }
}
</style>
