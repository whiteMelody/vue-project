<template>
  <div class="MessageList" :style="'min-height: '+boxMaxHeight+'px;'">
    <div class="messageBox" v-if="noNewsYet">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in messageList"
            :key="index"
            :class="{liActive:index == optionActive}"
            @click="indexClick(index,item)"
          >
            <div class="liTop" :class="item.read_time_adtive ? '' : 'liTopActive'">
              <div class="tips" v-show="item.read_time_adtive"></div>
              <div class="title">{{item.title}}</div>
              <div>{{item.created_at | _endTimeFormat}}</div>
            </div>
            <div
              class="liContent"
              :class="item.read_time_adtive ? '' : 'liContentActive'"
              v-html="item.content"
            ></div>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="title" v-show="rightActive">
          <div>{{dataList.title}}</div>
          <div>{{dataList.created_at | _endTimeFormat}}</div>
        </div>
        <div class="content" v-html="dataList.content"></div>
      </div>
    </div>

    <div class="noMesaggBox" v-else>
      <img src="@/chain/assets/images/noNews.png" alt>
      <div>暂无消息通知</div>
    </div>
  </div>
</template>
<script>
import { getMessage, getMessageRead, getUnreadMessage } from "@/chain/assets/api/message/message";

export default {
  name: "MessageList",
  data() {
    return {
      boxMaxHeight:"",
      messageList: [],
      optionActive: null,
      noNewsYet: true,
      dataList: {},
      rightActive: false,
    };
  },
  components: {},
  methods: {
    indexClick(index, item) {
      this.rightActive = true;
      this.optionActive = index;
      this.dataList = item;
      if (this.messageList[index].read_time_adtive == true) {
        this.messageList[index].read_time_adtive = false;
        getMessageRead({ messageId: item.id }).then(res => {
          //更新消息仓库
          getUnreadMessage().then(res => {
            if (res.status == 0) {
                this.$store.commit('SET_MESSAGE_COUNT', res.data.total)
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error',
              });
            }
          }).catch(error=>{
            console.log("getUnreadMessage no");
          })

        });



      }
    },
    DataList() {
      getMessage({ start: 1, perpage: 99999 }).then(res => {
        if (res.status == 0) {
          this.messageList = res.data.list;
          if (res.data.list.length) {
            res.data.list.map((item, index) => {
              if (item.read_time == 0) {
                item.read_time_adtive = true;
              } else {
                item.read_time_adtive = false;
              }
            });
         }else {
           this.noNewsYet = false;
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
    }
  },

  // 创建前状态
  beforeCreate() {},

  // 创建完毕状态
  created() {
    this.DataList();
  },

  // 挂载前状态
  beforeMount() {},

  // 挂载结束状态
  mounted() {
    this.boxMaxHeight = window.innerHeight - 100;
  },

  // 更新前状态
  beforeUpdate() {},

  // 更新完成状态
  updated() {},

  // 销毁前状态
  beforeDestroy() {},

  // 销毁完成状态
  destroyed() {},

  // 侦听器
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "./MessageList.scss";
</style>


    
