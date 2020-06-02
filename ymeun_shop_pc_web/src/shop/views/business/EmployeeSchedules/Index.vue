<template>
  <div class="employeeSchedules f14px pa24">

    <div class="bg-white pal15 par15 pat25 pab25">

      <div class="wb100">
        <el-button type="primary" @click="$router.push({name: 'SetSchedules', query:{ date: year + '-' + $base.addZero(month) + '-01' } })">设置排班</el-button>
        <div class="fr">
          <el-button round class="mar20" @click="loadCur">回到本月</el-button>
            <i class="el-icon-caret-left" @click="changeMonth('prev')"></i>
            {{year}}年{{month}}月员工排班
            <i class="el-icon-caret-right" @click="changeMonth('next')"></i>
        </div>
      </div>

      <div class="clear3"></div>

      <div class="wb100">

        <template>
          <table class="wb100">
            <thead>
              <tr class="lh25px">
                <td class="lh50px">
                  <div class="fc-gray4 text-center">
                    员工
                    <div class="clear0"></div>
                    <span class="fl bd-b2 bd-gray w15px"></span>
                  </div>
                </td>
                <template v-for="item in dayList">
                  <td class="text-center">
                    <p class="fc-gray4">{{item.day}}</p>
                    <div v-if="item.week == '周六' || item.week == '周日'" class="fc-red f12px ">
                      {{item.week}}
                      <div class="clear0"></div>
                      <span class="fl bd-b2 bd-red w15px"></span>
                    </div>
                    <div v-else class="f12px fc-gray3">{{item.week}}
                      <div class="clear0"></div>
                      <span class="fl bd-b2 bd-gray w15px"></span>
                    </div>
                  </td>
                </template>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in list">
                <tr>
                  <td class="text-center">{{item.member.name}}</td>
                  <template v-for="item2 in item.list">
                    <td :colspan="item2.day" class="pat10 pab10 pal0">
                      <template v-if="item2.type.value == -1">
                        <p class="bg-white bd-l2 bd-gray fc-gray4 pal15 h40px lh40px over-hidden">未排班</p>
                      </template>
                      <template v-else-if="item2.type.value == 0">
                        <p class="bg-yellow1 bd-l2 bd-yellow fc-yellow pal15 h40px lh40px over-hidden">休息</p>
                      </template>
                      <template v-else-if="item2.type.value == 1">
                        <p class="bg-blue1 bd-l2 bd-blue fc-blue pal15 h40px lh40px over-hidden">白班</p>
                      </template>
                      <template v-else-if="item2.type.value == 2">
                        <p class="bg-blue3 bd-l2 bg-blue3 fc-blue2 pal15 h40px lh40px over-hidden">夜班</p>
                      </template>
                      <template v-else-if="item2.type.value == 3">
                        <p class="bg-pink1 bd-l2 bd-pink fc-pink pal15 h40px lh40px over-hidden">请假</p>
                      </template>
                      <template v-else-if="item2.type.value == 4">
                        <p class="bg-red1 bd-l2 bg-red2 fc-red1 pal15 h40px lh40px over-hidden">中班</p>
                      </template>
                    </td>
                  </template>
                </tr>
              </template>

            </tbody>
          </table>
        </template>

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
        cycle: '',
        dayList: [],
        list: [],
        oldList: [],
          year: 2019,
          month: 6,
      }
    },
    mounted() {

        let _d = this.$base.dateTimeToDate(new Date(), 'cycle')
        this.year = Number.parseFloat(_d.split('-')[0])
        this.month = Number.parseFloat(_d.split('-')[1])
        this.cycle = this.year + '' + this.$base.addZero(this.month)
        this.dayList = this.getDayOfMonth(this.year, this.month)
        this.loadData()

    },
    methods: {

        loadCur(){
            let _d = this.$base.dateTimeToDate(new Date(), 'cycle')
            this.year = Number.parseFloat(_d.split('-')[0])
            this.month = Number.parseFloat(_d.split('-')[1])
            this.cycle = this.year + '' + this.$base.addZero(this.month)
            this.dayList = this.getDayOfMonth(this.year, this.month)
            this.loadData()
        },

        loadData(){
            getList({cycle: this.cycle}).then(res=>{
                if(res.status == 0){
                    let _list = res.data.list

                  if(_list.length > 0){
                    //获取用户信息
                    this.oldList = JSON.parse(JSON.stringify(_list))

                    let _day = this.getDayEnd(this.year, this.month)

                    for(let i=0; i<this.oldList.length; i++){
                      this.oldList[i].list = [{
                        day: _day,
                        type: {label: "白", value: "1"}
                      }]
                    }
                    this.list = _list
                  }else{
                    this.list = this.oldList
                  }

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

        },

        changeMonth(type){
            if(type == 'prev'){
                this.month --
                if(this.month<=0){
                    this.month = 12
                    this.year --
                }
            }else{
                this.month ++
                if(this.month>=13){
                    this.month = 1
                    this.year ++
                }
            }

            this.cycle = this.year + '' + this.$base.addZero(this.month)

            this.dayList = this.getDayOfMonth(this.year, this.month)

            this.loadData()
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

      getDayOfMonth(year, month){
        let _arr = []
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
        for(let i=1; i<=_index; i++){
          let day = year + '-' + this.$base.addZero(month) + '-' + this.$base.addZero(i)
          _arr.push({
            day: this.$base.addZero(i),
            week: this.$base.dateTimeToDate(day, 'week')
          })
        }
        return _arr
      },
    },


  }

</script>

<style scoped lang="scss">
  table{ border-top: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5; border-right: 1px dashed #E5E5E5;}
  table td{ min-width: 25px; border-left: 1px dashed #E5E5E5; padding: 10px 0 10px 5px; }
</style>
