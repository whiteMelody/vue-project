<template>
  <div class="employeeSchedules f14px pa24">

    <div class="bg-white pal15 par15 pat25 pab25">

        <div class="wb100">
        <!--    设置排班表      -->

        <div class="wb10 fl lh40px bd-a1 bd-gray ">
          <div class="pal20 h40px bg-white1">
              员工姓名
          </div>
          <div class="clear"></div>

          <template v-for="(item,index) in list">
            <div class="pal20 h40px bd-t1 bd-gray over-hidden" @click="curIndex = index">
              <span class="fl h20px lh20px bd-blue6 bd-r2 wb100 mat10 fc-blue6" v-if="index == curIndex">
                {{item.member.name}}
              </span>
              <span class="lh40px" v-else>{{item.member.name}}</span>
            </div>
          </template>

        </div>

        <div class="wb88 fr">
            <el-calendar  v-model="value" :range="[startDay, endDay]">
            <template
                    slot="dateCell"
                    slot-scope="{date, data}" v-if="loaded">

                <template>

                    <p>{{data.day}}</p>

                    <div class="clear2"></div>

                    <el-dropdown @command="handleCommand" class="wb100">

                        <p class="bg-white bd-l2 bd-gray fc-gray4 pal15 h40px lh40px el-dropdown-link" v-if="getDay(data.day) == -1">
                            <span class="fl">未排班</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-yellow1 bd-l2 bd-yellow fc-yellow pal15 h40px lh40px el-dropdown-link" v-else-if="getDay(data.day) == 0">
                            <span class="fl">休息</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-blue1 bd-l2 bd-blue fc-blue pal15 h40px lh40px el-dropdown-link" v-else-if="getDay(data.day) == 1">
                            <span class="fl">白班</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-blue3 bd-l2 bg-blue3 fc-blue2 pal15 h40px lh40px el-dropdown-link" v-else-if="getDay(data.day) == 2">
                            <span class="fl">晚班</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-pink1 bd-l2 bd-pink fc-pink pal15 h40px lh40px el-dropdown-link" v-else-if="getDay(data.day) == 3">
                            <span class="fl">请假</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-red1 bd-l2 bg-red2 fc-red1 pal15 h40px lh40px el-dropdown-link" v-else-if="getDay(data.day) == 4">
                            <span class="fl">中班</span><span class="fr mar15 mal15"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </p>
                        <p class="bg-white bd-l2 bd-gray fc-gray4 pal15 h40px lh40px" v-else>
                            暂无数据
                        </p>

                        <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item :command="{ date: data.day, type: -1}">未排班</el-dropdown-item>
                              <el-dropdown-item :command="{ date: data.day, type: 0}">休息</el-dropdown-item>
                              <el-dropdown-item :command="{ date: data.day, type: 1}">白班</el-dropdown-item>
                              <el-dropdown-item :command="{ date: data.day, type: 2}">晚班</el-dropdown-item>
                              <el-dropdown-item :command="{ date: data.day, type: 3}">请假</el-dropdown-item>
                              <el-dropdown-item :command="{ date: data.day, type: 4}">中班</el-dropdown-item>
                          </el-dropdown-menu>
                  </el-dropdown>

                    <div class="clear2"></div>
                </template>

            </template>
          </el-calendar>

            <div class="clear0"></div>

            <div class="wb100 text-center">
                <template v-if="disabled">
                    <el-button type="primary" disabled>保存中...</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" @click="submit">保存排班</el-button>
                </template>
            </div>

        </div>

        <div class="clear0"></div>

      </div>

    </div>

  </div>
</template>

<script>

  import { getList, save } from "@/shop/assets/api/employeeSchedules/employeeSchedules";

  export default {
    name: "employeeSchedules",
    components: {

    },
    data() {
      return {
          value: new Date(),
        curIndex: 0,
          date: '',
        cycle: '',
        list: [],
        loaded: false,
          startDay: '',
          endDay: '',
          disabled: false,
      }
    },
    mounted() {

        let _date = this.$route.query.date

        let _d

        if(this.$base.isNull(_date)){
            _d = this.$base.dateTimeToDate(new Date(), 'cycle')
            this.startDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-01'
            this.endDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-' + this.getDayEnd(Number.parseFloat(_d.split('-')[0]), Number.parseFloat(_d.split('-')[1]))
            this.value = this.$base.dateTimeToDate(new Date(), 'Date')
        }else{
            _d = this.$base.dateTimeToDate(_date, 'cycle')
            this.startDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-01'
            this.endDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-' + this.getDayEnd(Number.parseFloat(_d.split('-')[0]), Number.parseFloat(_d.split('-')[1]))
            this.value = this.$base.dateTimeToDate(_date, 'Date')
        }



      this.cycle = _d.split('-')[0] + _d.split('-')[1]

      getList({ cycle: this.cycle}).then(res=>{
        if(res.status == 0){
            let _list = res.data.list
            let _cycle = res.data.cycle

            if(_list.length <=0)
                return

            for(let i=0; i<_list.length; i++){

                _list[i].datas = []
                let _day = 1

                for(let j=0; j<_list[i].list.length; j++){
                    let _item = _list[i].list[j]

                    for(let d=0; d<_item.day; d++){
                        _list[i].datas.push({
                            type: _item.type.value,
                            value: this.formatVal(_item.type.value),
                            date: _cycle + '-' + this.$base.addZero(_day)
                        })
                        _day ++
                    }

                }
            }

            this.list = _list
        }else{
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error',
          });
        }
        this.loaded = true
      }).catch(error=>{
        this.$message({
          showClose: true,
          message: error,
          type: 'error',
        });
      })

    },
    methods: {

        loadData(){


            getList({ cycle: this.cycle}).then(res=>{
                if(res.status == 0){
                    let _list = res.data.list
                    let _cycle = res.data.cycle

                    if(_list.length <=0)
                        return

                    for(let i=0; i<_list.length; i++){

                        _list[i].datas = []
                        let _day = 1

                        for(let j=0; j<_list[i].list.length; j++){
                            let _item = _list[i].list[j]

                            for(let d=0; d<_item.day; d++){
                                _list[i].datas.push({
                                    type: _item.type.value,
                                    value: this.formatVal(_item.type.value),
                                    date: _cycle + '-' + this.$base.addZero(_day)
                                })
                                _day ++
                            }

                        }
                    }

                    this.list = _list
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
                }
                this.loaded = true
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    message: error,
                    type: 'error',
                });
            })
        },

        changeIndex(){

        },

        getDayEnd(year, month){
            let _index = 0
            if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
                _index = 31
            }
            if(month == 4 || month == 6 || month == 9 || month == 11){
                _index = 30
            }
            if(month == 2){
                if(year%4 == 0 || year % 400 == 0){
                    _index = 29
                }else{
                    _index = 28
                }
            }
            return _index
        },

        handleCommand(command) {
          let _t = this.list[this.curIndex].datas.find(item => item.date == command.date)
          if(_t){
              _t.type = command.type
              _t.value = this.formatVal(command.type)
          }
        },

        formatVal(type){
          if(type == -1)    return '未排班'
          if(type == 0)    return '休息'
          if(type == 1)    return '白班'
          if(type == 2)    return '晚班'
          if(type == 3)    return '请假'
          if(type == 4)    return '中班'
        },

        getDay(day){
            let _t = this.list[this.curIndex].datas.find(item => item.date == day)
            if(_t)  return _t.type
            else    return -10
        },

        submit(){

            let data = []

            let _data = this.list[this.curIndex].datas

            for(let i=0; i< _data.length; i++){
                data.push({
                    today: _data[i].date.split('-')[2],
                    type: _data[i].type,
                })
            }

            this.disabled = true

            save({
                cycle: this.cycle,
                userId: this.list[this.curIndex].member.users_id,
                schedule: JSON.stringify(data),
            }).then(res=>{
                if(res.status == 0){
                    this.$message({
                        showClose: true,
                        message: '保存排班成功',
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

    },

      watch: {
          value(c, o){

              if(this.$base.dateTimeToDate(c, 'cycle') != this.$base.dateTimeToDate(o, 'cycle')){
                  let _d
                  _d = this.$base.dateTimeToDate(c, 'cycle')
                  this.startDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-01'
                  this.endDay = Number.parseFloat(_d.split('-')[0]) + '-' + Number.parseFloat(_d.split('-')[1]) + '-' + this.getDayEnd(Number.parseFloat(_d.split('-')[0]), Number.parseFloat(_d.split('-')[1]))
                  this.cycle = _d.split('-')[0] + _d.split('-')[1]
                  this.loadData()
              }
          },
      },

  }

</script>

<style scoped lang="scss">
  table{ border-top: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5; border-right: 1px dashed #E5E5E5;}
  table td{ min-width: 25px; border-left: 1px dashed #E5E5E5; padding: 10px 0 10px 5px; }
  /*.el-button--small{padding: 0 !important;}*/
</style>
