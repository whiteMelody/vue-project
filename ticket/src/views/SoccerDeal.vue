<template>
  <div id="ticket_detail_page" class="warpper-black-4 wb100" :style="'min-height: '+ myHeight +'px;'">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'购票明细'" :back="true"></navTitle>

    <div class="wb100">

      <div class="pa15">
        <template v-for="(item,key) in matchList">
          <div class="wb100 warpper-black-3">
            <div class=" relative" style="padding: 10px 85px 0 35px;">

              <div class="w20px lh40px absolute F14 Fblack-2" style="top: 15px; left: 15px;">
                {{key + 1}}
              </div>

              <div class="wb100 lh20px Fwhite-1 F12">
                <template v-for="item2 in item.lotMatchList">
                  <p>
                    {{weekFormat(item2.weekId)}}
                    {{item2.teamId}}
                    {{item2.hTeam}} vs {{item2.vTeam}}
                  </p>

                  <template v-for="item3 in item2.lotList">
                    <p :class="item3.checkResult == 1 ? 'Fred' : 'Fblack-2'">{{getLotValue(item3.LotId, item3.lotResult)}}（{{item3.lossRadio || '-'}}）</p>
                  </template>

                  <div class="clear h10px"></div>
                </template>
              </div>

              <div class="w80px text-right absolute Fgray-3 lh40px F14" style="top: 15px; right: 15px;">

                <template v-if="item.ticketStatus == 1">
                  <p class="Fblack-2 lh30px">等待委托</p>
                </template>
                <template v-if="item.ticketStatus == 2">
                  <p class="Fblue lh60px">等待开奖</p>
                </template>
                <template v-if="item.ticketStatus == 3">
                  <p class="Fred lh30px">已中奖</p>
                </template>
                <template v-if="item.ticketStatus == 4">
                  <p class="Fblack-2 lh30px">未中奖</p>
                </template>
                <template v-if="item.ticketStatus == 5">
                  <p class="Fred lh30px">出票失败</p>
                </template>
                <template v-if="item.ticketStatus == 6">
                  <p class="Fblue lh30px">等待出票</p>
                </template>
                <template v-if="item.ticketStatus == 8">
                  <p class="Fred lh30px">赛事取消</p>
                </template>
              </div>

            </div>

            <div class="clear bor-black4 bor-solid-1b"></div>

            <div class="pa15 lh20px Fwhite-1 F14">
              <div class="wb50 fl lh40px">
                {{playTypeformat(item.playType)}} {{item.betNumber}}注{{item.lotMulti}}倍
              </div>
              <div class="wb50 fr text-right">
                <p>金额：<span class="Fnum">{{twoDecimal(item.lotMoney)}}</span> 元</p>
                <p>奖金：<span class="Fnum Fred">{{twoDecimal(item.rewardMoney) || '0.00'}}</span> 元</p>
              </div>
            </div>

            <div class="clear1"></div>
          </div>

          <div class="clear1"></div>
        </template>
      </div>

    </div>

  </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        myHeight: 0,
        showDetail: true,
        showDetail2: false,
        showRule: false,
        ticketID: '',
        call: '',
        ticket: {},
        matchData: {},
        matchList: [],
        ticketInfo: {
          title: '',
          icon: '',
          lotteryType: '',
          type: 1
        }
      }
    },

    methods: {
      myBack() {
        if (Base.isNull(this.call)) {
          this.toLottery();
        } else {
            this.$router.push({ name: this.call });
        }
      },

      stringToDate(dateString) {
        if (dateString) {
          let arr1 = dateString.split(" ");
          let sdate = arr1[0].split('-');
          let sdate2 = arr1[1].split(':');
          let date = new Date(sdate[0], sdate[1]-1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
          return date;
        }
      },

      playTypeformat(str){
        let result = '';
        if(str == '502' || str == 502)
          result = '二串一';
        if(str == '503' || str == 503)
          result = '三串一';
        if(str == '504' || str == 504)
          result = '四串一';
        if(str == '505' || str == 505)
          result = '五串一';
        if(str == '506' || str == 506)
          result = '六串一';
        if(str == '507' || str == 507)
          result = '七串一';
        if(str == '508' || str == 508)
          result = '八串一';
        return result;
      },

      dateShort(str){
        return str.substring(str.length - 8);
      },

      dateShort2(str){
        return str.substring(5, str.length - 3);
      },

      dateFormat(str){
        return str.substring(0,4) + '-' + str.substring(4,6) + '-' + str.substring(6);
      },

      dayFormat(str){
        return str.substring(5,10);
      },

      timeFormat(str){
        return str.substring(10,16);
      },

      formatModifyOn(str){
          if(Base.isNull(str)){
              return '-';
          }else{
              return str.substring(str.length - 14);
          }
      },

      formatLotteryType(str){
        if(str == '502' || str == 502){
          return '2串1';
        }else if(str == '503' || str == 503){
          return '3串1';
        }else if(str == '504' || str == 504){
          return '4串1';
        }else if(str == '505' || str == 505){
          return '5串1';
        }else if(str == '506' || str == 506){
          return '6串1';
        }else if(str == '507' || str == 507){
          return '7串1';
        }else if(str == '508' || str == 508){
          return '8串1';
        }

      },

      playValFormat(str){
        return str;
      },

      getLotValue(type, vals){
          vals = vals + '';
          let _tmp = '', _arr = [];
          vals = vals.split(',');
          for(let i=0; i<vals.length; i++){
              let val = vals[i];
            if(type == 'FT001'){
              if(val == '3')  _tmp = '主胜';
              else if(val == '1')  _tmp = '平';
              else if(val == '0')  _tmp = '客胜';
            }else if(type == 'FT002'){
              if(val == '90')  _tmp = '胜其他';
              else if(val == '99')  _tmp = '平其他';
              else if(val == '09')  _tmp = '负其他';
              else{
                let __tmp = val.split('');
                _tmp = __tmp[0] + ':' + __tmp[1];
              }
            }else if(type == 'FT003'){
              if(val >= 7){
                _tmp = '7+球'
              }else{
                _tmp = val + '球';
              }
            }else if(type == 'FT004'){
              if(val == '33')   _tmp = '胜胜';
              else if(val == '31')   _tmp = '胜平';
              else if(val == '31')   _tmp = '胜负';
              else if(val == '13')   _tmp = '平胜';
              else if(val == '11')   _tmp = '平平';
              else if(val == '10')   _tmp = '平负';
              else if(val == '03')   _tmp = '负胜';
              else if(val == '01')   _tmp = '负平';
              else if(val == '00')   _tmp = '负负';
            }else if(type == 'FT006'){
              if(val == '3')  _tmp = '让球主胜';
              else if(val == '1')  _tmp = '让球平';
              else if(val == '0')  _tmp = '让球客胜';
            }
            _arr.push(_tmp);
          }
          return _arr.join('，');
      },

      playTypeFormat(str){
        if(str == 'FT001'){
          return '胜平负';
        }else if(str == 'FT002'){
          return '比分';
        }else if(str == 'FT003'){
          return '总进球';
        }else if(str == 'FT004'){
          return '半全场';
        }else if(str == 'FT005'){
          return '混合玩法';
        }else if(str == 'FT006'){
          return '让胜平负';
        }
      },

      weekFormat(str){
        if(str == 1)
          return '周一';
        if(str == 2)
          return '周二';
        if(str == 3)
          return '周三';
        if(str == 4)
          return '周四';
        if(str == 5)
          return '周五';
        if(str == 6)
          return '周六';
        if(str == 7)
          return '周日';
      },

      formatNum(_nums) {

        if(Base.isNull(_nums)){
          return '-';
        }

      },
      twoDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;

      },

      /**
       * 拆票
       * @param list 票组合
       * @param size 串数（比如2串1传2即可）
       * @returns {*}
       */
      ticketGroup(list, size){
        if(size < 2)
          return null;

        let _result = [];

        if(size == 2){
          //M串2
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              let _tmp = [];
              _tmp.push(list[0].selectData[i0]);
              _tmp.push(list[1].selectData[i1]);
              _result.push(_tmp);
            }
          }
        }else if(size == 3){
          //M串3
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                let _tmp = [];
                _tmp.push(list[0].selectData[i0]);
                _tmp.push(list[1].selectData[i1]);
                _tmp.push(list[2].selectData[i2]);
                _result.push(_tmp);
              }
            }
          }
        }else if(size == 4){
          //M串4
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  let _tmp = [];
                  _tmp.push(list[0].selectData[i0]);
                  _tmp.push(list[1].selectData[i1]);
                  _tmp.push(list[2].selectData[i2]);
                  _tmp.push(list[3].selectData[i3]);
                  _result.push(_tmp);
                }
              }
            }
          }
        }else if(size == 5){
          //M串5
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    let _tmp = [];
                    _tmp.push(list[0].selectData[i0]);
                    _tmp.push(list[1].selectData[i1]);
                    _tmp.push(list[2].selectData[i2]);
                    _tmp.push(list[3].selectData[i3]);
                    _tmp.push(list[4].selectData[i4]);
                    _result.push(_tmp);
                  }
                }
              }
            }
          }
        }else if(size == 6){
          //M串6
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      let _tmp = [];
                      _tmp.push(list[0].selectData[i0]);
                      _tmp.push(list[1].selectData[i1]);
                      _tmp.push(list[2].selectData[i2]);
                      _tmp.push(list[3].selectData[i3]);
                      _tmp.push(list[4].selectData[i4]);
                      _tmp.push(list[5].selectData[i5]);
                      _result.push(_tmp);
                    }
                  }
                }
              }
            }
          }
        }else if(size == 7){
          //M串7
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      for(let i6 = 0; i6< list[6].selectData.length; i6++) {
                        let _tmp = [];
                        _tmp.push(list[0].selectData[i0]);
                        _tmp.push(list[1].selectData[i1]);
                        _tmp.push(list[2].selectData[i2]);
                        _tmp.push(list[3].selectData[i3]);
                        _tmp.push(list[4].selectData[i4]);
                        _tmp.push(list[5].selectData[i5]);
                        _tmp.push(list[6].selectData[i6]);
                        _result.push(_tmp);
                      }
                    }
                  }
                }
              }
            }
          }
        }else if(size == 8){
          //M串8
          for(let i0 = 0; i0< list[0].selectData.length; i0++){
            for(let i1 = 0; i1< list[1].selectData.length; i1++){
              for(let i2 = 0; i2< list[2].selectData.length; i2++) {
                for(let i3 = 0; i3< list[3].selectData.length; i3++) {
                  for(let i4 = 0; i4< list[4].selectData.length; i4++) {
                    for(let i5 = 0; i5< list[5].selectData.length; i5++) {
                      for(let i6 = 0; i6< list[6].selectData.length; i6++) {
                        for (let i7 = 0; i7 < list[7].selectData.length; i7++) {
                          let _tmp = [];
                          _tmp.push(list[0].selectData[i0]);
                          _tmp.push(list[1].selectData[i1]);
                          _tmp.push(list[2].selectData[i2]);
                          _tmp.push(list[3].selectData[i3]);
                          _tmp.push(list[4].selectData[i4]);
                          _tmp.push(list[5].selectData[i5]);
                          _tmp.push(list[6].selectData[i6]);
                          _tmp.push(list[7].selectData[i7]);
                          _result.push(_tmp);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        return _result;

      },

    },

    mounted(){

      //- cnzz自定义统计
      // 测试完后请删除这条注数

      _czc.push(["_setAccount", "1271278320"]);
      _czc.push(['_trackEvent', 'SoccerDeal_page', 'onInit', '购彩明细','inited','SoccerDeal_init']);

      this.call = this.$route.params.call;

      this.myHeight = $(window).height();

//      var _ticketID = this.$route.params.ticketID;
      var _ticketID = this.$route.params.ticketID;

      this.fullscreenLoading = false;

      if (Base.isNull(_ticketID)) {
        this.$message({
          type: 'error',
          message: '未知错误'
        });
      } else {
        this.ticketID = _ticketID;

//        Interface.orderInfo(_ticketID, (data) => {
//
//            this.matchData = data.extendInfo;
//
//            let _tmp = data.returnJSON;
//
//            if (_tmp.lotteryType == 'FT001') {
//              _tmp.lotteryName = '竞足胜平负';
//            } else if (_tmp.lotteryType == 'FT002') {
//              _tmp.lotteryName = '竞足比分';
//            } else if (_tmp.lotteryType == 'FT003') {
//              _tmp.lotteryName = '竞足总进球';
//            } else if (_tmp.lotteryType == 'FT004') {
//              _tmp.lotteryName = '竞足半全场';
//            } else if (_tmp.lotteryType == 'FT005') {
//              _tmp.lotteryName = '竞足混合';
//            } else if (_tmp.lotteryType == 'FT006') {
//              _tmp.lotteryName = '竞足让分胜平负';
//            }
//
//            this.ticket = _tmp;
//
//        })

        Interface.orderTicket(_ticketID, (data) => {
          console.log(data);
          this.matchList = data.returnJSON;

        })

      }

    }

  }


</script>

