<template>
  <div class="ClientLevel" :style="'min-height: '+minHeight+'px;'" v-loading="loading">
    <div class="haeder">客户设置</div>
    <div class="mian">
      <div class="level border">
        <div class="title">客户等级设置</div>

        <div class="label" v-for="(item, index) in customerLevel" :key="index">
          <span class="mar20 spanWidth">{{item.name}}</span>

          <div class="input" v-if="item.name == 'A++'">
            
            <!-- <el-input-number v-model="item.min" :controls="false" :max="getMax(index)"></el-input-number> -->

            <el-input placeholder="请输入金额" type="number" @change="disabled = false" v-model.trim="item.min">
              <div slot="prepend">≥</div>
            </el-input>
          </div>

          <div class="input" v-else>
            <div class="half">
              <!-- <div class="left_left">≥</div>
              <div class="inputNumber">
                <el-input-number placeholder="请输入金额" class="wb100" v-model="item.min" @change="disabled = false" :controls="false" :max="getMax(index)"></el-input-number>
              </div> -->
              <el-input placeholder="请输入金额" type="number"  @change="getMin(index)" v-model.trim="item.min" :disabled="item.name == 'E'">
                <template slot="prepend">≥</template>
              </el-input>
            </div>
            <div class="text">至</div>
            <div class="half">
              <!-- <div class="left_left">{{lessThen}}</div>
              <div class="inputNumber">
                <el-input-number placeholder="请输入金额" class="wb100" v-model="item.min" @change="disabled = false" :controls="false" :min="getMin(index)"></el-input-number>
              </div> -->
              <el-input placeholder="请输入金额" type="number" @change="getMax(index)" v-model.trim="item.max">
                <template slot="prepend">{{lessThen}}</template>
              </el-input>
            </div>
          </div>

          <span class="mal10">元</span>
        </div>

        <div class="notes">注：在输入框中输入金额，客户处于的等级按照该金额区间的值去取</div>
      </div>

      <div class="level">
        <div class="title">客户活跃设置</div>

        <div class="label" v-for="(item, index) in ActiveList" :key="index">
          <span class="mar20 spanDayWidth">{{item.name}}</span>
          <div class="inputDay">
            <el-input placeholder="请输入天数" type="number" @change="changed(item)" v-model.trim="item.model"></el-input>
          </div>
          <span class="mal20">{{item.text}}</span>
        </div>

        
        <!-- <div class="label">
          <span class="mar20 spanDayWidth">流失客户</span>
          <div class="inputDay">
            <el-input placeholder="请输入天数" type="number" @change="changed" v-model.trim="customerActive.loss"></el-input>
          </div>
          <span class="mal20">天内未到店</span>
        </div>

        <div class="label">
          <span class="mar20 spanDayWidth">预流失客户</span>
          <div class="inputDay">
            <el-input placeholder="请输入天数" type="number" @change="changed" :max="customerActive.loss" :min='0' v-model.trim="customerActive.wastage"></el-input>
          </div>
          <span class="mal20">天内未到店</span>
        </div>

        <div class="label">
          <span class="mar20 spanDayWidth">活跃客户</span>
          <div class="inputDay">
            <el-input placeholder="请输入天数" type="number" @change="changed" :max="customerActive.wastage" :min='0' v-model.trim="customerActive.brisk"></el-input>
          </div>
          <span class="mal20">天内到过店</span>
        </div> -->

        <div class="notes">注：在输入框中输入未到店天数，每个级别的用户按照未到店天数去区别</div>
      </div>
    </div>
    <div class="button">
      <el-button type="primary" :disabled="disabled" @click="submit" v-if="SaveSettings">保存设置</el-button>
      <el-button type="primary" disabled v-else>保存中...</el-button>
    </div>
  </div>
</template>
<script>
import { settingList, saveSetting } from "@/shop/assets/api/client/client";
export default {
  name: "ClientLevel",
  data() {
    return {
      minHeight: 0,
      disabled: true,
      SaveSettings: true,
      loading: true,
      customerLevel: [],
      customerActive: {},
      ActiveList: [],
      lessThen:'<'
    };
  },
  components: {},
  methods: {
    changed(v) {
      this.disabled = false;
      if (v.name == '流失客户') {
        if (v.model < 0) {
          v.model = '';
        }else {
          this.customerActive.loss = v.model;
        }
      }else if (v.name == '预流失客户') {
        if (parseInt(v.model) > parseInt(this.customerActive.loss) || parseInt(v.model) < parseInt(this.customerActive.brisk) || parseInt(v.model) < 0) {
          v.model = '';
        }else {
          this.customerActive.wastage = v.model;
        }
      }else  if(v.name == '活跃客户'){
        if (parseInt(v.model) > parseInt(this.customerActive.wastage) || parseInt(v.model) < 0) {
          v.model = '';
        }else {
          this.customerActive.brisk = v.model;
        }
      }
    },

    getMin(i) {
      this.disabled = false;
      let max = parseInt(this.customerLevel[i].max);
      let min = parseInt(this.customerLevel[i].min);
      if (min > max) {
        this.customerLevel[i].min =  parseInt(this.customerLevel[i].max) -1;
      }else if (min < 0) {
        this.customerLevel[i].min = '';
      }
    },

    getMax(i) {
      this.disabled = false;
      let min = parseInt(this.customerLevel[i-1].min);
      let max = parseInt(this.customerLevel[i].max);
      if (i > 6) {
        let maxOne = parseInt(this.customerLevel[i+1].max);
        if (max < 0) {
          this.customerLevel[i].max = '';
        }else if (max > min || max < maxOne) {
          this.customerLevel[i].max = parseInt(this.customerLevel[i-1].min);
        }
      }else {
        if (max < 0) {
          this.customerLevel[i].max = '';
        }else if (max > min) {
          this.customerLevel[i].max = parseInt(this.customerLevel[i-1].min);
        }
      }
    },

    // getMax(i){
    //   if((this.customerLevel[i-1])){
    //     return this.customerLevel[i-1].min
    //   }
    // },

    // getMin(i){
    //   if((this.customerLevel[i+1])){
    //     return this.customerLevel[i+1].max
    //   }
    // },

    settingList() {
      settingList()
        .then(res => {
          if (res.status == 0) {
            this.customerActive = JSON.parse(res.data.list.active);
            let _list = [
              { name: "流失客户", model: this.customerActive.loss,text:'天内未到店' },
              { name: "预流失客户", model: this.customerActive.wastage,text:'天内未到店' },
              { name: "活跃客户", model: this.customerActive.brisk,text:'天内到过店' }
            ];
            this.customerLevel = JSON.parse(res.data.list.rank);
            this.ActiveList = _list;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log("settingList no");
        });
    },
    submit() {
      saveSetting({
        rank: JSON.stringify(this.customerLevel),
        active: JSON.stringify(this.customerActive)
      })
        .then(res => {
          this.SaveSettings = false;
          if (res.status == 0) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: "1000",
              onClose: () => {
                this.$router.go();
              }
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: "1000",
              onClose: () => {
                this.SaveSettings = true;
              }
            });
          }
        })
        .catch(error => {
          console.log("saveSetting no");
        });
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {},

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.settingList();
    this.minHeight = window.innerHeight - 144;
  },

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
@import "./ClientLevel.scss";
</style>
<style>
.el-input-group--prepend .el-input__inner {
  padding-right: 0;
}
.el-input--small .el-input__inner {
  padding-right: 0;
}
.el-input-group__prepend {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  background-color: #fff;
  padding: 0 0.15rem;
}
.el-input-number.is-without-controls .el-input__inner {
  border-radius: 0px;
}
</style>
