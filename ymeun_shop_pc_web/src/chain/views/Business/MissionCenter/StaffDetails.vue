<template>
  <div class="staffDetails">
    <div class="listMain">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
            <div v-html="slotVal(data.day)"></div>
          </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
import { getEmployeeEetails } from "@/chain/assets/api/task/task";
export default {
  name: "staffDetails",
  data() {
    return {
      value: new Date(),
      userID: "",
      roleID: "",
      data: []
    };
  },
  components: {},
  methods: {
    slotVal(day) {
      let _d = this.data.find(item => item.time == day )
      let _template


      if(_d) {


        let str = `<div class="list">
                    任务完成：&nbsp;${_d.taskComplete} &nbsp;&nbsp;
                    <span class="spanCheng">${_d.taskPercentage}</span>
                  </div>`

        if(_d.taskPercentage == '无任务'){
          str = `<div class="list">
                    任务完成：&nbsp;${_d.taskComplete} &nbsp;&nbsp;
                    <span>${_d.taskPercentage}</span>
                  </div>`
        }else{
          str = `<div class="list">
                    任务完成：&nbsp;${_d.taskComplete} &nbsp;&nbsp;
                    <span class="spanCheng">${_d.taskPercentage}</span>
                  </div>`
        }

        let str2 = `<div class="list">
                回访完成：&nbsp;${_d.reviewComplete} &nbsp;&nbsp;
      <span class="spanJin">${_d.reviewPercentage}</span>
                </div>`


        if(_d.reviewPercentage == '无回访'){
          str2 = `<div class="list">
                回访完成：&nbsp;${_d.reviewComplete} &nbsp;&nbsp;
      <span>${_d.reviewPercentage}</span>
                </div>`
        }else{
          str2 = `<div class="list">
                回访完成：&nbsp;${_d.reviewComplete} &nbsp;&nbsp;
      <span class="spanJin">${_d.reviewPercentage}</span>
                </div>`
        }

        // str + str2 +

        return ` <div class="bodyDiv">
            <ul>
              <li>
                <p class="f16px">${_d.time}</p>
                <div class="listBox">` + 
                `<div class="list">销售业绩：&nbsp;${_d.payment} 元</div>
                  <div class="list">成交人头&nbsp;${_d.head} 人</div>
                  <div class="list">成交人次&nbsp;${_d.weight} 次</div>
                  <div class="list">划扣业绩：&nbsp;${_d.consumePrice} 元</div>
                  <div class="list">划扣人头：&nbsp;${_d.consumeNum} 人</div>
                  <div class="list">划扣人次：&nbsp;${_d.consumeFrequency} 次</div>
                </div>
              </li>
            </ul>
          </div>`;
      }else
        return  '<p style="display: flex;align-items: center;justify-content: center;height: 100%;"><span class="f16px fc-gray3">暂无数据</span><p>'
    },

    staffData() {

      let date = this.$base.dateTimeToDate(this.value, 'cycle')

      let data = {
        usersId: this.userID,
        roleId: this.roleID,
        date
      };

      getEmployeeEetails(data).then(res => {
        if(res.status == 0) {
          this.data = res.data;
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })

    }
  },

  watch: {
    value(c, o){
      this.staffData()
    },
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.userID = this.$route.query.userID;
    this.roleID = this.$route.query.roleID;
    this.staffData();
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

<style lang="scss" >
@import "./StaffDetails.scss";
</style>

<style lang="scss">
.staffDetails .listMain .el-calendar__body {
  padding: 0;
}
.staffDetails .current div,.staffDetails .next div{
  height: 100%;
}
</style>
    
