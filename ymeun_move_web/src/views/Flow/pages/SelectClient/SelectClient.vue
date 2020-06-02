<template>
<!-- 咨询 -->
  <div class="SelectClient" :style="'min-height:'+ minHeight +'px' ">
    <!--   header   -->
    <!-- <Header :title="'选择顾客'" :back="true"></Header> -->

    <div class="wb100 bg-white fixed">
          <div class="pa20">
              <div class="wb85 fl h60rem radius6 bg-gray">
                  <i class="iconsousuo iconfont f30rem fc-gray4 fl mal20 mat15"></i>
                  <input type="text" class="bg-none bd-none h30rem lh30rem mat13 fl mal10 w400rem f26rem fc-gray3" v-model="kw" placeholder="请输入顾客姓名或电话..."></input>
              </div>
              <div class="fr lh60rem fc-gray4 f28rem" @click="closeSearch">
                  取消
              </div>
              <div class="clear0"></div>
          </div>
      </div>
    <div class="infinite-list-wrapper">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance="20"
      >
        <li v-for="(item,index) in listData" class="list-item" :key="index" @click="selectClient(index)">
          <p>{{item.name}}({{item.mobile}})</p>
        </li>
      </ul>
      <span v-if="loading">加载中...</span>
      <span v-if="noMore">没有更多了</span>
    </div>
  </div>
</template>
<script>
import Header from "../../../../components/Header";
import { getConsumeList } from '@/assets/api/Flow/SelectClient';
export default {
  name: "SelectClient",
  data() {
    return {
      minHeight:0,
      liIndex:null,
      listData: [],
      loading: false,
      disabled: false,
      noMore:false,
      kw: '',
      timeout: 0,
      params: {
        kw: '',
        start: 0,       // 页码
        perpage: 10,     // 数量
      },

      
    };
  },
  components: {
    Header
  },
  watch: {
    kw(curVal, oldVal) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.clear()
        this.params.kw = curVal
        this.load()
      }, 500);
    }
  },
  methods: {

    closeSearch(){
      this.params.kw = ''
      this.$emit('cloneChild')
    },

    selectClient(index){
      let data = {
        name : this.listData[index].name,
        id : this.listData[index].id,
      }
      this.$emit('cloneChild', data)
    },
    clear(){
      this.params.start = 0
      this.listData = []
      this.disabled = false
      this.noMore = false
      this.loading = false
    },
    load () {
      if (this.disabled || this.loading) return
      
      this.disabled = true
      this.loading = true
      this.params.start++
      getConsumeList(this.params).then((res) => {
        if (res.status == 0) {
          let listData = res.data.list

          if (listData.length < this.params.perpage) {
            //已经到底了
            this.listData = this.listData.concat(listData)
            this.disabled = true
            this.noMore = true
            this.loading = false
          }else{
            this.listData = this.listData.concat(listData)
            this.disabled = false
            this.loading = false
          }
        } else {
          //没有数据
          this.disabled = true
          this.noMore = true
          this.loading = false
        }
      }).catch((e)=>{
          console.log(e)
      })
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
    this.minHeight = window.innerHeight
    this.load()
    //  if(this.listData.length >= 10)
    //   {
    //     this.disabled = false
    //     this.noMore = false
    //   }
    //   else
    //   {
    //     this.disabled = true
    //     this.noMore = true
    //   }


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
@import "./SelectClient.scss";
</style>