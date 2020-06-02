<template>
  <div class="bookingSchedule f14px">
    <div class="pa0 ma0 position">
      <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
          <el-form-item label>
              <el-select v-model="condition.s_id" placeholder="选择门店" readonly>
                  <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                              :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="appointmentSchedulingFn" class="h32px"></el-button>
      </el-form>
    </div>

  <div class="pa18">
    <el-calendar v-model="value">
      <template
              v-if="loaded"
              slot="dateCell"
              slot-scope="{date, data}">
          <div v-html="slotVal(data)" @click="dialogTableVisible = true;"></div>

      </template>
    </el-calendar>
  </div>

    <el-dialog :title="getDate + ' 预约排期'" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="gridData" style="max-height:500px;overflow-y: auto;">
        <el-table-column property="appointment_time" label="预约时间" width="170"></el-table-column>
        <el-table-column property="type" label="预约类型" width="150"></el-table-column>
        <el-table-column property="customer_name" label="客户" width="150"></el-table-column>
        <el-table-column property="adviser_name" :label="$store.getters.roleName.adviser" width="150"></el-table-column>
        <el-table-column property="technician_name" :label="$store.getters.roleName.technician" width="150"></el-table-column>
        <el-table-column property="content" label="备注"></el-table-column>
        <el-table-column property="status" label="状态" width="200">
          <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="w60px bg-green h24px lh24px fc-white fl text-center">已到店</span>
              <span v-else-if="scope.row.status == 0" class="w60px bg-orange h24px lh24px fc-white fl text-center">未到店</span>
              <span v-else-if="scope.row.status == 2" class="w60px bg-gray2 h24px lh24px fc-white fl text-center">已取消</span>
              <span v-else-if="scope.row.status == 3" class="w60px bg-gray2 h24px lh24px fc-white fl text-center">已过期</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>

import { appointmentScheduling , getAppointmentList } from "@/chain/assets/api/common/common"
import { getStore } from "@/chain/assets/api/shopData/shopData"
export default {
  name: "BookingSchedule",
  components: {

  },
  data() {
    return {
      condition:{
        s_id:''
      },
      loaded: false,
      value: new Date(),
      gridData: [],
      data: [],
      dialogTableVisible: false,
      getDate:'',
      storeList:[]
    }
  },
  watch: {
    value(c, o){
      if(this.dialogTableVisible == false){
        this.appointmentSchedulingFn()
      }
      else{
        this.getDate = this.$base.dateTimeToDate(c, 'chinese')
        this.appointmentListFn()
      }
    },
  },
  mounted() {
    //获取门店列表
      getStore().then(res => {
        if(res.status == 0){
            let _tmp = res.data
            for(let i=0; i<_tmp.length; i++){
                _tmp[i].isSelected = false
            }
            this.storeList = _tmp
            this.condition.s_id = _tmp[0].id
            this.appointmentSchedulingFn()
        }
    })
  },
  methods: {
    slotVal(data) {
      let _d = this.data.find(item => item.time == data.day )
      
      let _template
      if(_d) {

        if(data.isSelected)
        {
            if(_d.count == 0){
                return ` <div class="pa10 f14px lh40px text-center" v-else>
                  <p>${_d.time}<p>
                  <p class="f16px lh94px">暂无预约</p>
                </div>`;
            }else{
                return `<div class="pa10 f14px lh40px">
                    <span>${_d.time}<span>
                    <p class='f14px'>总预约：<span class="f20px">${_d.count}</span>人</p>
                    <p class="lh25px f14px">已到店：<span class="f16px">${_d.arrive}</span>人</p>
                    <p class="lh25px f14px">未到店：<span class="f16px">${_d.noArrive}</span>人</p>
                  </div>`;
            }
        }
        else
        {
            if(_d.count == 0){
                return ` <div class="pa10 f14px lh40px text-center fc-gray3" v-else>
                  <p>${_d.time}<p>
                  <p class="f16px lh94px">暂无预约</p>
                </div>`;
            }else {

                if(this.$base.dateTimeToDate(_d.time, 'time') > this.$base.dateTimeToDate(new Date(), 'time')){
                    return ` <div class="pa10 f14px lh40px fc-gray3 bg-blue10 bd-blue6 bd-a1" v-else>
                  <span>${_d.time}<span>
                  <p class='f14px'>总预约：<span class="f20px fc-gray4">${_d.count}</span><b class="fc-gray4 f14px el-fw">(人)</b></p>
                  <p class="lh25px f14px">已到店：<span class="f16px fc-green">${_d.arrive}</span><b class="fc-green f14px el-fw">(人)</b></p>
                  <p class="lh25px f14px">未到店：<span class="f16px fc-red">${_d.noArrive}</span><b class="fc-red f14px el-fw">(人)</b></p>
                </div>`;

                }else{
                    return ` <div class="pa10 f14px lh40px fc-gray3" v-else>
                  <span>${_d.time}<span>
                  <p class='f14px'>总预约：<span class="f20px fc-gray4">${_d.count}</span><b class="fc-gray4 f14px el-fw">(人)</b></p>
                  <p class="lh25px f14px">已到店：<span class="f16px fc-green">${_d.arrive}</span><b class="fc-green el-fw f14px">(人)</b></p>
                  <p class="lh25px f14px">未到店：<span class="f16px fc-red">${_d.noArrive}</span><b class="fc-red el-fw f14px">(人)</b></p>
                </div>`;
                }

            }
        }
      }else
          return ` <div class="pa10 f14px lh40px text-center fc-gray3" v-else>
                  <p>${_d.time}<p>
                  <p class="f16px lh94px">暂无预约</p>
                </div>`;
    },

    //排期表初始数据
    appointmentSchedulingFn(){
  
      this.loaded = false
      let date = this.$base.dateTimeToDate(this.value, 'cycle')
      let data = {
        time:date,
        s_id:this.condition.s_id
      };
      appointmentScheduling(data).then(res => {
        if(res.status == 0){
          this.data = res.data;
          this.loaded = true
        }
      });
    },

    //点击后排期数据
    appointmentListFn(){

      this.loaded = false
      let date = this.$base.dateTimeToDate(this.value, 'cycle')
      let data = {
        time:date,
        s_id:this.condition.s_id
      };
      appointmentScheduling(data).then(res => {
        if(res.status == 0){
          this.data = res.data;
          this.loaded = true

          let data = {
            startTime:this.$base.dateTimeToDate(this.value, 'startTime'),
            endTime:this.$base.dateTimeToDate(this.value, 'endTime'),
            start: 1,
            perpage: 99999999,
            order:9,
            s_id:this.condition.s_id
          };
          
          getAppointmentList(data).then(res => {
            if(res.status == 0){
              this.gridData = res.data.list;
            }
          });
        }
      });

      
    }
  },
}

</script>

<style>
.bookingSchedule .position {
  position: absolute;    
  left: 38px;
  top: 108px;
}
.is-selected {
  color: #1989FA;
}
.bookingSchedule .el-calendar__body {
  margin-top: 50px;
}
.bookingSchedule .el-calendar__header {
  padding: 0;
  height: 40px;
  padding: 0 20px;
  align-items: center;
}
</style>
