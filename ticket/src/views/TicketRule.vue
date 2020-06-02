<template>
  <div id="ticket_rule_page">

    <loader :show="fullscreenLoading"></loader>

    <navTitle :title="'中奖规则'" :back="true"></navTitle>

    <div class="wb100">

      <!--<div class="wb100 h50px relative warpper-red" style="z-index: 99999;">-->
      <!--<div class="w50px h50px fl" @click="myBack">-->
      <!--<div style="height: 18px; width:10px; float: left; margin-left: 15px; margin-top: 16px;" class="img-area"><img src="~@/assets/images/icon-back.png"></div>-->
      <!--</div>-->
      <!--<p class="wb70 text-over-hidden1 absolute text-center h50px lh50px F16 Fwhite" style="top: 0; left: 0; right: 0; margin: 0 auto;">{{title}}</p>-->
      <!--</div>-->

      <div class="wb100 Fgray-3 F14">
        <div class="pa15" >
          <div class="wb100" v-if="type == 2">
            <p class="lh30px">开奖时间：10分钟一期，每天84期</p>
            <p class="lh30px">玩法规则：每期开出3个号作为开奖号码，数字取值范围1-6</p>

          </div>

          <div class="wb100" v-if="type == 3">
            <p class="lh30px">开奖时间：10分钟开奖，每天97期</p>
            <p class="lh30px">玩法规则：每期从01-11开出5个号码作为中奖号码</p>

          </div>

          <div class="wb100" v-if="type == 1">
            <p class="lh30px">开奖时间：每周二、四、日21:30开奖</p>
            <p class="lh30px">玩法规则：<span class="Fred">6个红球</span>＋<span class="Fblue">1个蓝球</span>=1注（<span class="Fred">2元</span>）</p>
          </div>

          <div class="wb100" v-if="type == 4">
            <p class="lh30px">开奖时间：每周二、四、日21:30开奖</p>
            <p class="lh30px">玩法规则：<span class="Fred">5个前区</span>＋<span class="Fblue">2个后区</span>=1注（<span class="Fred">2元</span>）</p>
          </div>

          <p class="lh30px">奖项设置:</p>

          <div class="clear1"></div>

          <div class="wb100" v-if="type == 2 || type == 3">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="method" label="玩法" align="center" width="80">
              </el-table-column>
              <el-table-column prop="condition" label="中奖条件" align="center" >
              </el-table-column>
              <el-table-column prop="bonus" label="奖金(元)" align="center" width="80">
              </el-table-column>
            </el-table>
          </div>

          <div class="wb100" v-if="type == 1 || type == 4">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="method" label="玩法" align="center"  width="70">
              </el-table-column>
              <el-table-column prop="" label="中奖条件" align="center" >
                <template slot-scope="scope">

                  <template v-if="type == 1">
                    <img :src="scope.row.condition" class="wb90 pat5 pab5" v-if="scope.row.i== 1">
                    <img :src="scope.row.condition" class="wb75 pat5 pab5" v-if="scope.row.i== 2">
                    <img :src="scope.row.condition" class="wb80 pat5 pab5" v-if="scope.row.i== 3">
                    <img :src="scope.row.condition" class="wb75 pat5 pab5" v-if="scope.row.i== 4">
                    <img :src="scope.row.condition" class="wb60 pat5 pab5" v-if="scope.row.i== 5">
                    <img :src="scope.row.condition" class="wb40 pat5 pab5" v-if="scope.row.i== 6">
                  </template>

                  <template v-else>
                    <img :src="scope.row.condition" class="wb95 pat5 pab5" v-if="scope.row.i== 1">
                    <img :src="scope.row.condition" class="wb85 pat5 pab5" v-if="scope.row.i== 2">
                    <img :src="scope.row.condition" class="wb90 pat5 pab5" v-if="scope.row.i== 3">
                    <img :src="scope.row.condition" class="wb80 pat5 pab5" v-if="scope.row.i== 4">
                    <img :src="scope.row.condition" class="wb65 pat5 pab5" v-if="scope.row.i== 5">
                    <img :src="scope.row.condition" class="wb45 pat5 pab5" v-if="scope.row.i== 6">
                  </template>

                </template>
              </el-table-column>
              <el-table-column prop="explain" label="中奖说明" align="center" >
                <template slot-scope="scope">
                  <p>{{scope.row.explain}}</p>
                  <p v-if="scope.row.explain2">{{scope.row.explain2}}</p>
                  <p v-if="scope.row.explain3">{{scope.row.explain3}}</p>
                  <p v-if="scope.row.explain4">{{scope.row.explain4}}</p>
                </template>
              </el-table-column>
              </el-table-column>
              <el-table-column prop="bonus" label="奖金(元)" align="center" width="70">
              </el-table-column>
            </el-table>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import Base from '../assets/js/base.js'
  import Interface from '../assets/js/interface.js'

  import ssq_rule1 from '../assets/images/ssq_rule1.png'
  import ssq_rule2 from '../assets/images/ssq_rule2.png'
  import ssq_rule3 from '../assets/images/ssq_rule3.png'
  import ssq_rule4 from '../assets/images/ssq_rule4.png'
  import ssq_rule5 from '../assets/images/ssq_rule5.png'
  import ssq_rule6 from '../assets/images/ssq_rule6.png'

  import dlt_rule1 from '../assets/images/dlt_rule1.png'
  import dlt_rule2 from '../assets/images/dlt_rule2.png'
  import dlt_rule3 from '../assets/images/dlt_rule3.png'
  import dlt_rule4 from '../assets/images/dlt_rule4.png'
  import dlt_rule5 from '../assets/images/dlt_rule5.png'
  import dlt_rule6 from '../assets/images/dlt_rule6.png'

  export default{

    data (){
      return {
        fullscreenLoading: true,
        tableData: [],
        lotteryType: '',
        type: 0,
        title: ''
      }
    },

    methods: {
      myBack() {

        if (Base.isNull(this.call)) {
            this.$router.go(-1);
        } else {
            this.$router.push( { name: this.call} );
        }
      },
      getData() {

        if (this.type == 2) {
          this.tableData = [{
            method: '和值',
            condition: '开奖号码之和',
            bonus: '9-240'
          }, {
            method: '二不同号',
            condition: '不定位中2个号码',
            bonus: '8'
          }, {
            method: '二同号单选',
            condition: '中开奖号码',
            bonus: '80'
          }, {
            method: '二同号复选',
            condition: '中开奖号码中的对子',
            bonus: '15'
          }, {
            method: '三不同号',
            condition: '中开奖号码',
            bonus: '40'
          }, {
            method: '三同号单选',
            condition: '中开奖号码',
            bonus: '240'
          }, {
            method: '三同号通选',
            condition: '中开奖号码三同号中任一组',
            bonus: '40'
          }, {
            method: '三连号通选',
            condition: '中开奖号码三连号中任一组',
            bonus: '10'
          }];
        }
        if (this.type == 3) {
          this.tableData = [{
            method: '任选二',
            condition: '选2个号，猜中开奖任意2个号',
            bonus: '6'
          }, {
            method: '任选三',
            condition: '选3个号，猜中开奖任意3个号',
            bonus: '19'
          }, {
            method: '任选四',
            condition: '选4个号，猜中开奖任意4个号',
            bonus: '78'
          }, {
            method: '任选五',
            condition: '选5个号，猜中开奖任意5个号',
            bonus: '540'
          }, {
            method: '任选六',
            condition: '选6个号，猜中开奖任意5个号',
            bonus: '90'
          }, {
            method: '任选七',
            condition: '选7个号，猜中开奖任意5个号',
            bonus: '26'
          }, {
            method: '任选八',
            condition: '选8个号，猜中开奖任意5个号',
            bonus: '9'
          }, {
            method: '前一',
            condition: '选1个号,猜中开奖第1个号',
            bonus: '13'
          }, {
            method: '前二直选',
            condition: '选2个号与开奖前2个号相同且顺序一致',
            bonus: '130'
          }, {
            method: '前二组选',
            condition: '选2个号与开奖前2个号相同',
            bonus: '65'
          }, {
            method: '前三直选',
            condition: '选3个号与开奖前3个号相同且顺序一致',
            bonus: '1170'
          }, {
            method: '前三组选',
            condition: '选3个号与开奖前3个号相同',
            bonus: '195'
          }];
        }

        if (this.type == 1) {
          this.tableData = [{
            i: 1,
            method: '一等奖',
            condition: ssq_rule1,
            explain: '中6红＋1蓝',
            bonus: '浮动'
          }, {
            i: 2,
            method: '二等奖',
            condition: ssq_rule2,
            explain: '中6红',
            bonus: '浮动'
          }, {
            i: 3,
            method: '三等奖',
            condition: ssq_rule3,
            explain: '中5红＋1蓝',
            bonus: '3000'
          }, {
            i:4,
            method: '四等奖',
            condition: ssq_rule4,
            explain: '中5红',
            explain2: '中4红＋1蓝',
            bonus: '200'
          }, {
            i: 5,
            method: '五等奖',
            condition: ssq_rule5,
            explain: '中4红',
            explain2: '中3红＋1蓝',
            bonus: '10'
          }, {
            i: 6,
            method: '六等奖',
            condition: ssq_rule6,
            explain: '中2红＋1蓝',
            explain2: '中1红＋1蓝',
            explain3: '中1蓝',
            bonus: '5'
          }];
        }

        if (this.type == 4) {
          this.tableData = [{
            i: 1,
            method: '一等奖',
            condition: dlt_rule1,
            explain: '中5前＋2后',
            bonus: '浮动'
          }, {
            i: 2,
            method: '二等奖',
            condition: dlt_rule2,
            explain: '中5前＋1后',
            bonus: '浮动'
          }, {
            i: 3,
            method: '三等奖',
            condition: dlt_rule3,
            explain: '中5前',
            explain2: '中4前＋2后',
            bonus: '浮动'
          }, {
            i: 4,
            method: '四等奖',
            condition: dlt_rule4,
            explain: '中4前＋1后',
            explain2: '中3前＋2后',
            bonus: '200'
          }, {
            i: 5,
            method: '五等奖',
            condition: dlt_rule5,
            explain: '中4前',
            explain2: '中3前＋1后',
            explain3: '中2前＋2后',
            bonus: '10'
          }, {
            i: 6,
            method: '六等奖',
            condition: dlt_rule6,
            explain: '中3前',
            explain2: '中1前＋2后',
            explain3: '中2前＋1后',
            explain4: '中2后',
            bonus: '5'
          }];
        }
      }
    },

    mounted(){

      let _lotteryType = this.$route.params.lotteryType;

      if (Base.isNull(_lotteryType)) {
        _lotteryType = 'ssq';
      }

      let _tmp = Base.getLotteryType(_lotteryType);

      this.title = _tmp.name;
      this.type = _tmp.type;

      this.lotteryType = _lotteryType;

      this.getData();

      this.fullscreenLoading = false;

    }

  }


</script>

