<template>

  <div id="soccer_list_page" class="warpper-black-4" :style="' width:100%; min-height: '+ height +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <div class="wb100">

      <div class="wb100 pat10 pab10 warpper-black-3 h25px">
        <div class="wb100">
          <div class="wb33333 fl text-center" v-for="(item,key) in navList">
            <template v-if="key == 1">
              <router-link :to="{ name: 'SoccerList' }">
                <div class="wb100">
                  <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                </div>
              </router-link>
            </template>
            <template v-else-if="key == 2">
              <router-link :to="{ name: 'SoccerRule' }">
                <div class="wb100">
                  <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
                </div>
              </router-link>
            </template>
            <template v-else>
              <router-link :to="{ name: 'Soccer' }">
                <span class="nav" :class="current == key ? 'nav-active' : ''">{{item}}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <div class="clear"></div>

      <div class="wb100 Fblack-2 F14">

        <div class="pa15">
          <p>玩法说明： </p>
          <div class="clear1"></div>
          <p>足球比赛由两支队伍在专用足球场地竞赛，每队11名队员，法定比赛时间为90分钟，</p>
          <div class="clear1"></div>
          <p>竞彩足球彩票竞猜的比赛结果为90分钟加上伤停补时的时间里的结果</p>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <p>目前竞彩足球推出5种玩法，分别为：</p>
          <div class="clear1"></div>
          <p>胜平负玩法：竞猜两支球队，在全场90分钟（不含加时和点球）的 “胜”、“平”、“负”结果进行投注。</p>
          <div class="clear1"></div>
          <p>例如：曼联（主队）VS利物浦（客队）</p>
          <div class="clear1"></div>
          <p>让球胜平负玩法：当两支球队实力悬殊较大时，采取让球的方式确定双方的胜平负关系。让球的数量确定后将维持不变。</p>
          <div class="clear1"></div>
          <p>让球分为主队让球和客队让球，分别为：主队让1球，表示为“主队（-1）”；客队让2球，表示为“主队（+2）”。</p>
          <div class="clear1"></div>
          <p>例如：国米（-1）VS尤文 </p>
          <div class="clear1"></div>
          <p>比分玩法：竞猜两支球队，对该场比赛在全场90分钟（不含加时和点球）的具体比分结果进行投注，共设置31种比分结果选项。 <p>
          <div class="clear1"></div>
          <p>总进球玩法：竞猜两支球队，对该场比赛在全场90分钟（不含加时和点球）比赛双方的进球总数结果进行投注，共设置8种总进球数结果选项。 <p>
          <div class="clear1"></div>
          <p>半全场玩法：对主队在上半场45分钟和全场90分钟（不含加时和点球）的“胜”、“平”、“负”结果分别进行投注，共设置9种比赛结果选项<p>
          <div class="clear1"></div>
          <p>过关方式：<p>
          <div class="clear1"></div>
          <p>选择1种投注结果的为单式投注；选择2种或2种以上投注结果的为复式投注。<p>
          <div class="clear1"></div>
          <p>彩民选择1场比赛进行投注的为单场投注；选择2场或2场以上比赛进行串联投注的为过关投注。在过关投注中，所选比赛的结果全部竞猜正确才能中奖。 <p>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <p>奖金计算： <p>
          <div class="clear1"></div>
          <p>竞彩足球过关玩法奖金以出票时的出票赔率为准。<p>
          <div class="clear1"></div>
          <p>奖金=出票赔率连乘×2.00元×倍数。<p>
          <div class="clear1"></div>
          <p>竞彩足球单关固定奖金以出票时刻的赔率为准。<p>
          <div class="clear1"></div>
          <p>奖金=出票赔率×2.00元×倍数。<p>
          <div class="clear1"></div>
          <div class="clear1"></div>
          <p>特殊情况：<p>
          <div class="clear1"></div>
          <p>延期比赛：<p>
          <div class="clear1"></div>
          <p>推迟时间未超过36小时则算正常算奖。 <p>
          <div class="clear1"></div>
          <p>推迟时间超过36小时或无法确定时间，则该场为无效场次，按比赛取消算奖。<p>
          <div class="clear1"></div>
          <p>取消比赛算奖：单关固定玩法返还投注金额，过关投注该场赔率按1.0计算奖金。<p>
          <div class="clear1"></div>
          <p>中断比赛：<p>
          <div class="clear1"></div>
          <p>36小时内继续完成比赛则算正常算奖。<p>
          <div class="clear1"></div>
          <p>36小时内未完成比赛则该场为无效场次，按比赛取消算奖。<p>
          <div class="clear1"></div>
          <p>取消比赛算奖：单关固定玩法返还投注金额，过关投注该场赔率按1.0计算奖金。<p>
          <div class="clear1"></div>

        </div>

        <div class="clear1"></div>
      </div>

    </div>

  </div>
</template>

<style>

</style>

<script>

  import Base from '../assets/js/base.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        navList: ['投注', '开奖', '规则'],
        current: 2,
        height: 0,
      }
    },

    mounted(){
      this.fullscreenLoading = false;

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'SoccerRule_page', 'onInit', '足彩规则页','inited','SoccerRule_init']);
    }

  }


</script>

