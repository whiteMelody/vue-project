<template>
  <div class="bookingSchedule wb100 f14px">
    <div class="callBox" v-if="$store.getters.currentUser.role_id == 5">
      <div class="title">治疗间呼叫信息</div>
      <ul v-loading="isLoading" v-if="callList.length">
        <li v-for="(item, index) in callList" :key="index">
          <div class="cureRoom">
            <div class="CureRoomName">{{item.room.name}}</div>
            <div class="icon"><i class="iconfont">{{item.service.content}}</i></div>
            <em></em>
          </div>
          <div class="list">
            <div class="text">发起人：</div>
            <span>{{item.users.name}}</span>
          </div>
          <div class="list">
            <div class="text">客户：</div>
            <span>{{item.customer.name}}</span>
          </div>
          <div class="list">
            <div class="text">呼叫时间：</div>
            <span>{{$base.dateTimeToDate(item.launch_time, 'date')}}</span>
          </div>
          <div class="list">
            <div class="text">已呼叫：</div>
            <span class="month">{{item.msg}}</span>
          </div>
          <div class="bottom" v-if="item.isComplete" @click="completeCall(index,item.id)">立即处理</div>
          <div class="bottom1" v-else>正在处理....</div>
        </li>
        <li style="visibility: hidden"></li>
        <li style="visibility: hidden"></li>
        <li style="visibility: hidden"></li>
      </ul>
      <div class="textBox" v-else>暂无治疗间呼叫信息</div>
    </div>
    <el-calendar v-model="value">
      <template
              v-if="loaded"
              slot="dateCell"
              slot-scope="{date, data}">
          <div v-html="slotVal(data)" @click="dialogTableVisible = true;"></div>

      </template>
    </el-calendar>

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

import { appointmentScheduling , appointmentList } from "@/shop/assets/api/common/common";
import { CureRoomCallList,completeCall } from '@/shop/assets/api/cureRoom/cureRoom';
export default {
  name: "bookingSchedule",
  components: {

  },
  data() {
    return {
      loaded: false,
      isLoading: false,
      value: new Date(),
      gridData: [],
      data: [],
      dialogTableVisible: false,
      getDate:'',
      callList:[]
    }
  },
  watch: {
    value(c, o){
      if(this.dialogTableVisible == false){
        this.appointmentSchedulingFn()
      }else{
        this.getDate = this.$base.dateTimeToDate(c, 'chinese')
        this.appointmentListFn()
      }
    },
  },
  mounted() {
    this.CureRoomCallList()
    this.appointmentSchedulingFn()
  },
  methods: {
    // 呼叫信息列表
    CureRoomCallList() {
      this.isLoading = true;
      CureRoomCallList({status:0,strat:1,perpage:9999}).then( res => {
        if (res.status == 0) {
          res.data.list.forEach(v => {
            v.isComplete = true;
            // if (v.service.content == '零食') {
            //   v.icon = 'iconlaopo-';
            // }else if (v.service.content == '热水') {
            //   v.icon = 'iconlaopo-1';
            // }else if (v.service.content == '清洁') {
            //   v.icon = 'iconlaopo-3';
            // }else if (v.service.content == '呼叫') {
            //   v.icon = 'iconlaopo-4';
            // }else if (v.service.content == '音乐') {
            //   v.icon = 'iconlaopo-2';
            // }
          });
          this.callList = res.data.list;
          this.isLoading = false;
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },

    // 完成呼叫
    completeCall(index,id) {
      this.callList[index].isComplete = false;
      completeCall({id:id}).then(res => {
        if (res.status== 0) {
          this.$message({
              message: '处理完成',
              type: 'success',
              duration:'1500',
              onClose:() => {
                this.CureRoomCallList();
              }
          });
        }else {
          this.$message({
              message: res.msg,
              type: 'error',
              duration:'1500',
              onClose:() => {
                this.CureRoomCallList();
              }
          });
        }
      }).catch(error=>{
          this.$message({
              showClose: true,
              message: error,
              type: 'error',
          });
      })
    },
    slotVal(data) {
      let _d = this.data.find(item => item.time == data.day )
      
      let _template
      if(_d) {

        if(data.isSelected)
        {
            if(_d.count == 0){
                return ` <div class="pa10 f14px lh40px text-center fc-gray3" v-else>
                  <p>${_d.time}<p>
                  <p class="f16px lh94px">暂无预约</p>
                </div>`;
            }else{
                return `<div class="pa10 f14px lh40px">
                    <span>${_d.time}<span>
                    <p>总预约：<span class="f18px">${_d.count}</span>人</p>
                    <p class="lh25px">已到店：<span class="f18px">${_d.arrive}</span>人</p>
                    <p class="lh25px">未到店：<span class="f18px">${_d.noArrive}</span>人</p>
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
                  <p>总预约：<span class="f18px fc-gray4">${_d.count}</span>人</p>
                  <p class="lh25px">已到店：<span class="f18px fc-green">${_d.arrive}</span>人</p>
                  <p class="lh25px">未到店：<span class="f18px fc-red">${_d.noArrive}</span>人</p>
                </div>`;

                }else{
                    return ` <div class="pa10 f14px lh40px fc-gray3" v-else>
                  <span>${_d.time}<span>
                  <p>总预约：<span class="f18px fc-gray4">${_d.count}</span>人</p>
                  <p class="lh25px">已到店：<span class="f18px fc-green">${_d.arrive}</span>人</p>
                  <p class="lh25px">未到店：<span class="f18px fc-red">${_d.noArrive}</span>人</p>
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
          };
          
          appointmentList(data).then(res => {
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

<style scoped lang="scss">
  .is-selected {
    color: #1989FA;
  }
  .bookingSchedule {
    .callBox {
      margin: 20px;
      padding: 0 20px;
      background-color: #fff;
      .title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      ul {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 16%;
          border: 1px solid #e5e5e5;
          padding: 0 20px;
          margin-bottom: 20px;
          .cureRoom {
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            margin-top: 23px;
            margin-bottom: 30px;
            .cureRoomName {
              font-size:16px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(51,51,51,1);
            }
            .icon {
              width:90px;
              height:90px;
              border:1px solid rgba(229,229,229,1);
              border-radius:50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 20px;
              i {
                font-size: 24px;
                color: #333;
              }
            }
            em {
              margin-top: 20px;
              width: 35%;
              height: 1px;
              background-color: #e5e5e5;
            }
          }
          .list {
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            .text {
              color: #666;
            }
            span {
              color: #333;
              &.month {
                color: #FF5722;
              }
            }
          }
          .bottom {
            width: 100%;
            height:34px;
            background:rgba(13,201,229,1);
            border-radius:2px;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            text-align: center;
            line-height: 34px;
            margin: 20px 0;
            cursor: pointer;
            &:hover {
              opacity: 0.7;
            }
          }
          .bottom1 {
            width: 100%;
            height:34px;
            background:rgba(13,201,229,1);
            opacity: 0.5;
            border-radius:2px;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            text-align: center;
            line-height: 34px;
            margin: 20px 0;
            cursor: pointer;
          }
        }
      }
      .textBox {
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #333;
      }
    }
  }
</style>
