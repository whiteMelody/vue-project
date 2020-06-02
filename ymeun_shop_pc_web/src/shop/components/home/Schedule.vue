<template>
  <div class="Schedule">
  
        <div class="timer_text">
            <div v-for="(item , index) in startTimer" :key="index">
                <span>{{item.timer}}</span>
                <p :class="{ active : item.start == 1}" v-if="index != startTimer.length-1">
                    <a v-for="(itemName , indexName) in item.textArr" :key="indexName" v-show="itemName != ''"><i>{{itemName}}</i></a>
                </p>
            </div>
            <b class="noData" v-show="noData">暂无预约信息</b>
        </div>

        
  </div>
</template>
<script>
export default {
    name:'Schedule',
    data(){
      return{
        defaultData:[
            {"timer":"07:00","start":0,'textArr':[]},
            {"timer":"08:00","start":0,'textArr':[]},
            {"timer":"09:00","start":0,'textArr':[]},
            {"timer":"10:00","start":0,'textArr':[]},
            {"timer":"11:00","start":0,'textArr':[]},
            {"timer":"12:00","start":0,'textArr':[]},
            {"timer":"13:00","start":0,'textArr':[]},
            {"timer":"14:00","start":0,'textArr':[]},
            {"timer":"15:00","start":0,'textArr':[]},
            {"timer":"16:00","start":0,'textArr':[]},
            {"timer":"17:00","start":0,'textArr':[]},
            {"timer":"18:00","start":0,'textArr':[]},
            {"timer":"19:00","start":0,'textArr':[]},
            {"timer":"20:00","start":0,'textArr':[]},
            {"timer":"21:00","start":0,'textArr':[]},
            {"timer":"22:00","start":0,'textArr':[]}
        ],  
        startTimer:[],
        activeTimer:[],
        timerList:[],
        noData:false
      }
    },
    watch: {
        scheduleData(newName, oldName) {
            if(newName == ''){
                this.noData = true
            }else{
                this.noData = false
            }
            
            this.timerList = newName;
            this.startTimer =  JSON.parse(JSON.stringify(this.defaultData));
            this.activeTimer = []
            this.timerList.map((item , index) => {
                var startTimerText = parseInt(item.start.split(':')[0]);
                var endTimerTextOne = parseInt(item.end.split(':')[0]);
                var endTimerTextTow = parseInt(item.end.split(':')[1]);
                var sText = item.txtTalk;
                this.setDateDifferenceValue(startTimerText,endTimerTextOne,endTimerTextTow,sText);
            })
            // console.log(JSON.stringify(this.activeTimer));
            for (let i = 0; i < this.activeTimer.length; i++) {
 
                const element = this.activeTimer[i];
                this.startTimer.map((item , index) => {
                    var num = parseInt(item.timer.split(':')[0]);
                    if(element.num == num){
                        item.start = 1;
                        item.textArr.push(element.txtTalk)
                    }
                })
            }
        }
    },
    props:['scheduleData'],
    components:{
    },
    methods:{
        setDateDifferenceValue(startNum , endNum , endNum2 , str){
            
            if(endNum > startNum)
            {
                if(endNum2 > 0)
                {
                    for (let i = startNum; i <= endNum; i++) {
                        var obj = {}
                        switch (i) {
                            case startNum:
                                obj.num  = i;
                                obj.txtTalk  = str;
                                this.activeTimer.push(obj);
                                break;
                            default:
                                obj.txtTalk = "";
                                obj.num  = i;
                                this.activeTimer.push(obj);
                                break;
                        }
      
                    }
                }
                else
                {
                    for (let i = startNum; i < endNum; i++) {
                        var obj = {}
                        switch (i) {
                            case startNum:
                                obj.num  = i;
                                obj.txtTalk  = str;
                                this.activeTimer.push(obj);
                                break;

                            default:
                                obj.txtTalk = "";
                                obj.num  = i;
                                this.activeTimer.push(obj);
                                break;
                        }
                    }
                }
            }
            else
            {
                var obj = {
                    txtTalk:str,
                    num : startNum
                }
                this.activeTimer.push(obj);
            }
        },

    },

    // 创建前状态
    beforeCreate(){
    },

    // 创建完毕状态 
    created(){
        
    },

    // 挂载前状态
    beforeMount(){
    },

    // 挂载结束状态
    mounted(){
    },
    
    // 更新前状态
    beforeUpdate(){
    },

    // 更新完成状态
    updated(){
    },

    // 销毁前状态
    beforeDestroy(){
    },

    // 销毁完成状态
    destroyed(){
    } 
    
}
</script>
<style lang="scss" scoped>
.Schedule{
    display: flex;
    overflow-y: auto;
    height: 500px;
    width: 100%;
    .timer_text{
        display: flex;
        height: 100%;
        width:100%;
        justify-content: center;
        flex-direction: column;
        margin-top: 20px;
        position: relative;
        b{
            position: absolute;
            left: .8rem;
            font-weight:normal;
            font-size: 20px;
        }
        div{
            color: #999;
            font-size: 12px;
            display: flex;
            height: 100%;
            flex:1;
            align-items:center;
            position: relative;
            top: 0;
            padding-left: .6rem;
            span{
                position: absolute;
                top: -6px;
                left: 0;
            }
            p{
                border-left: 2px solid #F2F2F2;
                width: 2.2rem;
                display: flex;
                flex-direction: column;
                min-height: 32px;
                background: #fff;
                justify-content: center;
                a{
                    padding-left: .2rem;
                    color: #04776C;
                    display: block;
                    line-height: 32px;
                    width: 2rem;
                    i{
                        font-style: normal;
                    }
                }
              
            }
            .active{
                border-left: 2px solid #04776C;
                background: #FFECE6;
            }
        }
        
    }
    .timer_box{
        height: 94%;
        width: 2rem;
        margin-left: .2rem;
        background: #FFECE6;
        color: #04776C;
        padding:0 .2rem;
        overflow-y: auto;
        p{
            line-height: 26px;
        }
    }
}
</style>



    
